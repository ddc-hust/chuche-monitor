import { SdkBase, BasePlugin } from '@chuche-monitor/types';
import { EVENTTYPES, STATUS_CODE } from '@chuche-monitor/common';
import { getFCP } from './core/performance';
import { getTimestamp, _global } from '@chuche-monitor/utils';

export default class WebPerformance extends BasePlugin {
    type: string;
    constructor() {
        super(EVENTTYPES.PERFORMANCE);
        this.type = EVENTTYPES.PERFORMANCE;
    }
    bindOptions() { }
    core({ transportData }: SdkBase): void {  // 核心方法
        console.log("运行了性能插件");
        // 获取FCP、LCP、TTFB、FID等指标
        getFCP((res: any) => {  // 在参数中就可以获取到监测的数据
            // name指标名称、rating 评级、value数值
            const { name, rating, value } = res;
            console.log("FCP数据的获取");
            transportData.send({  // 不知道这个transportData的send函数是在哪里定义的
                type: EVENTTYPES.PERFORMANCE,
                status: STATUS_CODE.OK,
                time: getTimestamp(),
                name,
                rating,
                value,
            });
        });
    }
    transform() { }

}