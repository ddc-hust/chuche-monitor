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

export function getLCP(callback: Callback): void {
    const entryHandler = (list: any) => {
        for (const entry of list.getEntries()) {
            observer.disconnect();
            callback({
                name: 'LCP',
                value: entry.startTime,
                rating: entry.startTime > 2500 ? 'poor' : 'good',
            });
        }
    };
    const observer = new PerformanceObserver(entryHandler);
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
}

export function getFP(callback: Callback): void {
    const entryHandler = (list: any) => {
        for (const entry of list.getEntries()) {
            if (entry.name === 'first-paint') {
                observer.disconnect();
                callback({
                    name: 'FP',
                    value: entry.startTime,
                    rating: entry.startTime > 2500 ? 'poor' : 'good',
                });
            }
        }
    };
    const observer = new PerformanceObserver(entryHandler);
    observer.observe({ type: 'paint', buffered: true });
}

export function getOtherData(callback: Callback): void {
    const entryHandler = (entryList: any) => {
        const [entry] = entryList.getEntries();
        callback({
            name: 'domReady',
            value: entry.domContentLoadedEventEnd - entry.fetchStart,
            rating: (entry.domContentLoadedEventEnd - entry.fetchStart) > 2500 ? 'poor' : 'good',
        });
        callback({
            name: 'dnsTime',
            value: entry.domainLookupEnd - entry.domainLookupStart,
            rating: (entry.domContentLoadedEventEnd - entry.fetchStart) > 2500 ? 'poor' : 'good',
        });
        callback({
            name: 'response',
            value: entry.responseEnd - entry.responseStart,
            rating: (entry.responseEnd - entry.responseStart) > 2500 ? 'poor' : 'good',
        });
        callback({
            name: 'resources',
            value: entry.domComplete - entry.domContentLoadedEventEnd,
            rating: (entry.domComplete - entry.domContentLoadedEventEnd) > 2500 ? 'poor' : 'good',
        });
        callback({
            name: 'firstPackage',
            value: entry.responseStart - entry.domainLookupStart,
            rating: (entry.responseStart - entry.domainLookupStart) > 2500 ? 'poor' : 'good',
        });
        callback({
            name: 'pageFull',
            value: entry.loadEventStart - entry.fetchStart,
            rating: (entry.loadEventStart - entry.fetchStart) > 2500 ? 'poor' : 'good',
        });
    }
    const observer = new PerformanceObserver(entryHandler);
    observer.observe({ type: 'navigation' });
}



export function getPerformanceData(callback: Callback): void {
    getFCP(res => {
        callback(res);
    });
    getLCP(res => {
        callback(res);
    });
    getFP(res => {
        callback(res);
    });
    getOtherData(res => {
        callback(res);
    })
}