/**
 * 事件类型, 设置为枚举类型
 */
export enum EVENTTYPES {
    PERFORMANCE = 'performance',
    WHITESCREEN = 'whiteScreen',
    VUE = 'vue',
    REACT = 'react', // 事件类型中不知道为什么会有react和vue的区别

    XHR = 'xhr',
    FETCH = 'fetch',
    CLICK = 'click',
    HISTORY = 'history',
    ERROR = 'error',
    HASHCHANGE = 'hashchange',
    UNHANDLEDREJECTION = 'unhandledrejection',
    RESOURCE = 'resource',
    DOM = 'dom',
    CUSTOM = 'custom',
    RECORDSCREEN = 'recordScreen',
}

/**
 * 状态， 设置为枚举类型
 */
export enum STATUS_CODE {
    ERROR = 'error',
    OK = 'ok',
}