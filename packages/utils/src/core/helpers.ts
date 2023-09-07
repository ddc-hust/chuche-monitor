import { variableTypeDetection } from './verifyType';
// 获取当前的时间戳
export function getTimestamp(): number {
    return Date.now();
}

export function typeofAny(target: any): string { // 类型的获取，切割8到-1是因为，获取的字符串是"[object " 和 "]"这种形式的
    return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}

// 验证选项的类型
export function validateOption(target: any, targetName: string, expectType: string): any {
    if (!target) return false;
    if (typeofAny(target) === expectType) return true;
    console.error(`web-see: ${targetName}期望传入${expectType}类型，目前是${typeofAny(target)}类型`);
}

export function generateUUID(): string {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}

export function getLocationHref(): string {
    if (typeof document === 'undefined' || document.location == null) return '';
    return document.location.href;
}

export function unknownToString(target: unknown): string {
    if (variableTypeDetection.isString(target)) {
        return target as string;
    }
    if (variableTypeDetection.isUndefined(target)) {
        return 'undefined';
    }
    return JSON.stringify(target);
}