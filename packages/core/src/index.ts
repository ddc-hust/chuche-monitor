import { nativeTryCatch } from '@chuche-monitor/utils';
import { SDK_VERSION, SDK_NAME } from '@chuche-monitor/common';
import { InitOptions } from '@chuche-monitor/types';

import {
    subscribeEvent,
    notify,
    transportData,
    options,
    handleOptions,
    log,
    setupReplace,
    // HandleEvents,
} from './core/index';

function init(options: InitOptions) {
    // 初始化配置
    handleOptions(options);
    setupReplace();
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
        // 插件的加载
        instance.core({ transportData, undefined, options, notify });
    });
}

export default {
    SDK_VERSION,
    SDK_NAME,
    init,
    use,
    log,
}