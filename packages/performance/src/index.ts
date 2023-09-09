import { SdkBase, BasePlugin } from '@chuche-monitor/types';
import { EVENTTYPES, STATUS_CODE } from '@chuche-monitor/common';
import { getPerformanceData } from './core/performance';
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
        getPerformanceData((res: any) => {
            const { name, rating, value } = res;
            console.log(name, value);
            // 将获取的性能数据上报
            transportData.send({
                type: EVENTTYPES.PERFORMANCE,
                status: STATUS_CODE.OK,
                time: getTimestamp(),
                name,
                rating,
                value,
            })
        })
    }
    transform() { }

}