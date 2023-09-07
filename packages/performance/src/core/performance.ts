import { Callback } from '@chuche-monitor/types';

export function getFCP(callback: Callback): void { // 参数是一个函数，获取到数据后，调用这个函数，这个函数的参数是一个数据对象
    const entryHandler = (list: any) => {
        for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
                observer.disconnect();
                callback({
                    name: 'FCP',
                    value: entry.startTime,
                    rating: entry.startTime > 2500 ? 'poor' : 'good',
                });
            }
        }
    };
    const observer = new PerformanceObserver(entryHandler);
    observer.observe({ type: 'paint', buffered: true });
}