import { EVENTTYPES } from '@chuche-monitor/common';
export interface Callback { // 这里定义了一个函数类型，参数是任意数量任意类型的，返回值也是任意类型
    (...args: any[]): any;
}

// sdk插件核心core
export interface SdkBase {
    transportData: any; // 数据上报
    breadcrumb: any; // 用户行为
    options: any; // 公共配置
    notify: any; // 发布消息
}

export abstract class BasePlugin {
    public type: string; // 插件类型
    constructor(type: string) {
        this.type = type;
    }
    abstract bindOptions(options: object): void; // 校验参数
    abstract core(sdkBase: SdkBase): void; // 核心方法
    abstract transform(data: any): void; // 数据转化
}

export interface Window {
    chrome: {
        app: {
            [key: string]: any;
        };
    };
    history: any;
    addEventListener: any;
    innerWidth: any;
    innerHeight: any;
    onpopstate: any;
    performance: any;
    __chucheMonitor__: { // 不知道这个webSee是干嘛的，改成chuche-montiro?
        [key: string]: any;
    };
}

export interface ChucheMonitor {
    hasError: false; // 某段时间代码是否报错
    events: string[]; // 存储录屏的信息
    recordScreenId: string; // 本次录屏的id
    _loopTimer: number; // 白屏循环检测的timer
    transportData: any; // 数据上报
    options: any; // 配置信息
    replaceFlag: {
        // 订阅消息
        [key: string]: any;
    };
    deviceInfo: {
        // 设备信息
        [key: string]: any;
    };
}

/**
 * 性能指标
 */
export interface PerformanceData {
    name: string; // FCP
    value: number; // 数值
    rating: string; // 等级
}

/**
 * 上报的数据接口
 */
export interface ReportData
    extends
    PerformanceData {
    type: string; // 事件类型
    pageUrl: string; // 页面地址
    time: number; // 发生时间
    uuid: string; // 页面唯一标识
    apikey: string; // 项目id
    status: string; // 事件状态
    sdkVersion: string; // 版本信息
    //  breadcrumb?: BreadcrumbData[]; // 用户行为

    // 设备信息
    deviceInfo: {
        browserVersion: string | number; // 版本号
        browser: string; // Chrome
        osVersion: string | number; // 电脑系统 10
        os: string; // 设备系统
        ua: string; // 设备详情
        device: string; // 设备种类描述
        device_type: string; // 设备种类，如pc
    };
}


export interface IAnyObject {
    [key: string]: any;
}

export type voidFun = (...args: any[]) => void;

export interface ReplaceHandler {
    type: EVENTTYPES;
    callback: Callback;
}

export type ReplaceCallback = (data: any) => void;