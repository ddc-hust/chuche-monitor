import { STATUS_CODE } from '@chuche-monitor/common';
import { _global, _support } from '@chuche-monitor/utils';
import { Callback, InitOptions } from '@chuche-monitor/types';

/**
 * 检测页面是否白屏
 * @param {function} callback - 回到函数获取检测结果
 * @param {array} whiteBoxElements - 容器列表，默认值为['html', 'body', '#app', '#root']
 */

export function openWhiteScreen(
  callback: Callback,
  { whiteBoxElements }: InitOptions
) {
  let loopCount = 0;

  // 页面加载完毕
  if (document.readyState === 'complete') {
    idleCallback(); // 页面加载完之后（页面和子资源加载完成，不包括动态资源）进行采样
  } else {
    _global.addEventListener('load', idleCallback);
  }

  // 选中dom点的名称
  function getSelector(element: any) {
    if (element.id) {
      return '#' + element.id;
    } else if (element.className) {
      // div home => div.home
      return (
        '.' +
        element.className
          .split(' ')
          .filter((item: any) => !!item)
          .join('.')
      );
    } else {
      return element.nodeName.toLowerCase();
    }
  }
  // 判断采样点是否为容器节点
  function isContainer(element: HTMLElement) {
    const selector = getSelector(element);
    return whiteBoxElements?.indexOf(selector) != -1;
  }
  // 采样对比
  function sampling() {
    let emptyPoints = 0;
    for (let i = 1; i <= 9; i++) {
      const xElements = document.elementsFromPoint(
        (_global.innerWidth * i) / 10,
        _global.innerHeight / 2
      );
      const yElements = document.elementsFromPoint(
        _global.innerWidth / 2,
        (_global.innerHeight * i) / 10
      );
      if (isContainer(xElements[0] as HTMLElement)) emptyPoints++;
      // 中心点只计算一次
      if (i != 5) {
        if (isContainer(yElements[0] as HTMLElement)) emptyPoints++;
      }
    }

    // 页面正常渲染，停止轮训
    if (emptyPoints != 17) {
      if (_support._loopTimer) {
        clearTimeout(_support._loopTimer);
        _support._loopTimer = null;
      }
    } else {
      // 开启轮训
      if (!_support._loopTimer) {
        openWhiteLoop();
      }
    }
    console.log("空白区域采样点数：", emptyPoints);
    // 17个点都是容器节点算作白屏
    callback({
      status: emptyPoints == 17 ? STATUS_CODE.ERROR : STATUS_CODE.OK,
    });
  }
  // 开启白屏轮训
  function openWhiteLoop(): void {
    if (_support._loopTimer) return;
    _support._loopTimer = setInterval(() => {
      idleCallback();
      loopCount++;

      if (loopCount > 5) {
        clearInterval(_support._loopTimer);
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(_support._loopTimer);
    }, 5000);
  }

  function idleCallback() {
    sampling();
  }
}
