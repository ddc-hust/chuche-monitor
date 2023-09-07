import { ChucheMonitor, Window } from '@chuche-monitor/types';


// 获取全局变量
export function getGlobal(): Window {
    return window as unknown as Window;
}

const _global = getGlobal();
const _support = getGlobalSupport();

_support.replaceFlag = _support.replaceFlag || {};
const replaceFlag = _support.replaceFlag;

export function setFlag(replaceType: string, isSet: boolean) { // 这个replaceType不知道是什么？，好像是事件类型
    if (replaceFlag[replaceType]) return;
    replaceFlag[replaceType] = isSet;
}
export function getFlag(replaceType: string) {
    return replaceFlag[replaceType] ? true : false;
}

// 获取全部变量__webSee__的引用地址，这是干啥的？？？
export function getGlobalSupport() {
    _global.__chucheMonitor__ = _global.__chucheMonitor__ || ({} as ChucheMonitor);
    return _global.__chucheMonitor__;
}
export { _global, _support };