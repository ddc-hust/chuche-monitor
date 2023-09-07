import { getFlag, setFlag, nativeTryCatch } from '@chuche-monitor/utils';
import { SDK_VERSION, SDK_NAME, EVENTTYPES } from '@chuche-monitor/common';
import { InitOptions, VueInstance, ViewModel } from '@chuche-monitor/types';

import {
    subscribeEvent,
    notify,
    transportData,
    options,
    handleOptions,
    log
} from './core/index';

function init(options: InitOptions) {
    if (!options.dsn || !options.apikey) {
        return console.error(`web-see 缺少必须配置项：${!options.dsn ? 'dsn' : 'apikey'} `);
    }
    // if (!('fetch' in _global) || options.disabled) return;
    // 初始化配置
    handleOptions(options);
    // setupReplace();
}

function install(Vue: VueInstance, options: InitOptions) {
    if (getFlag(EVENTTYPES.VUE)) return;
    setFlag(EVENTTYPES.VUE, true);
    const handler = Vue.config.errorHandler;
    console.log('运行了core的注册，install方法');
    // vue项目在Vue.config.errorHandler中上报错误, 重写了vue项目的报错方式
    Vue.config.errorHandler = function (err: Error, vm: ViewModel, info: string): void {
        console.log('重写vue项目的报错');
        console.log(err);
        // HandleEvents.handleError(err);
        if (handler) handler.apply(null, [err, vm, info]);
    };
    init(options);
}

// react项目在ErrorBoundary中上报错误
function errorBoundary(err: Error): void {
    if (getFlag(EVENTTYPES.REACT)) return;
    setFlag(EVENTTYPES.REACT, true);
    // HandleEvents.handleError(err);
    console.log(err);
}

function use(plugin: any, option: any) {
    const instance = new plugin(option);
    if (
        !subscribeEvent({
            callback: data => {
                instance.transform(data);
            },
            type: instance.type,
        })
    )
        return;

    nativeTryCatch(() => {
        // instance.core({ transportData, breadcrumb, options, notify }); // 这里应该就是插件的加载
        instance.core({ transportData, undefined, options, notify });
        // 这里应该就是插件的加载,这里就是在运行插件的核心方法。上报性能数据了。后面的notify其实没有用到，只用到了transportdata
    });
}

export default {
    SDK_VERSION,
    SDK_NAME,
    init,
    install,
    errorBoundary,
    use,
    log,
}