import { getFlag, nativeTryCatch, setFlag } from '@chuche-monitor/utils';
import { ReplaceHandler, ReplaceCallback } from '@chuche-monitor/types';
import { EVENTTYPES } from '@chuche-monitor/common';

const handlers: { [key in EVENTTYPES]?: ReplaceCallback[] } = {};

// subscribeEvent 设置标识，并将处理的方法放置到handlers中，{ xhr: [ funtion ] }
export function subscribeEvent(handler: ReplaceHandler): boolean {
  if (!handler || getFlag(handler.type)) return false;
  setFlag(handler.type, true);
  handlers[handler.type] = handlers[handler.type] || [];
  handlers[handler.type]?.push(handler.callback);
  console.log("订阅事件")
  return true;
}
export function notify(type: EVENTTYPES, data?: any): void {
  if (!type || !handlers[type]) return;
  // 获取对应事件的回调函数并执行，回调函数为addReplaceHandler事件中定义的事件
  console.log("通知事件的执行");
  handlers[type]?.forEach(callback => {
    nativeTryCatch(
      () => {
        callback(data);
      },
      () => {
      }
    );
  });
}
