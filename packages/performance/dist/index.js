(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["chuche-monitor"] = factory());
})(this, (function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var BasePlugin = /** @class */ (function () {
        function BasePlugin(type) {
            this.type = type;
        }
        return BasePlugin;
    }());

    /**
     * 事件类型, 设置为枚举类型
     */
    var EVENTTYPES;
    (function (EVENTTYPES) {
        EVENTTYPES["PERFORMANCE"] = "performance";
        EVENTTYPES["WHITESCREEN"] = "whiteScreen";
        EVENTTYPES["VUE"] = "vue";
        EVENTTYPES["REACT"] = "react";
        EVENTTYPES["XHR"] = "xhr";
        EVENTTYPES["FETCH"] = "fetch";
        EVENTTYPES["CLICK"] = "click";
        EVENTTYPES["HISTORY"] = "history";
        EVENTTYPES["ERROR"] = "error";
        EVENTTYPES["HASHCHANGE"] = "hashchange";
        EVENTTYPES["UNHANDLEDREJECTION"] = "unhandledrejection";
        EVENTTYPES["RESOURCE"] = "resource";
        EVENTTYPES["DOM"] = "dom";
        EVENTTYPES["CUSTOM"] = "custom";
        EVENTTYPES["RECORDSCREEN"] = "recordScreen";
    })(EVENTTYPES || (EVENTTYPES = {}));
    /**
     * 状态， 设置为枚举类型
     */
    var STATUS_CODE;
    (function (STATUS_CODE) {
        STATUS_CODE["ERROR"] = "error";
        STATUS_CODE["OK"] = "ok";
    })(STATUS_CODE || (STATUS_CODE = {}));

    function getFCP(callback) {
        var entryHandler = function (list) {
            for (var _i = 0, _a = list.getEntries(); _i < _a.length; _i++) {
                var entry = _a[_i];
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
        var observer = new PerformanceObserver(entryHandler);
        observer.observe({ type: 'paint', buffered: true });
    }

    // 获取当前的时间戳
    function getTimestamp() {
        return Date.now();
    }

    // 获取全局变量
    function getGlobal() {
        return window;
    }
    var _global = getGlobal();
    var _support = getGlobalSupport();
    _support.replaceFlag = _support.replaceFlag || {};
    _support.replaceFlag;
    // 获取全部变量__webSee__的引用地址，这是干啥的？？？
    function getGlobalSupport() {
        _global.__chucheMonitor__ = _global.__chucheMonitor__ || {};
        return _global.__chucheMonitor__;
    }

    var WebPerformance = /** @class */ (function (_super) {
        __extends(WebPerformance, _super);
        function WebPerformance() {
            var _this = _super.call(this, EVENTTYPES.PERFORMANCE) || this;
            _this.type = EVENTTYPES.PERFORMANCE;
            return _this;
        }
        WebPerformance.prototype.bindOptions = function () { };
        WebPerformance.prototype.core = function (_a) {
            var transportData = _a.transportData;
            console.log("运行了性能插件");
            // 获取FCP、LCP、TTFB、FID等指标
            getFCP(function (res) {
                // name指标名称、rating 评级、value数值
                var name = res.name, rating = res.rating, value = res.value;
                console.log("FCP数据的获取");
                transportData.send({
                    type: EVENTTYPES.PERFORMANCE,
                    status: STATUS_CODE.OK,
                    time: getTimestamp(),
                    name: name,
                    rating: rating,
                    value: value,
                });
            });
        };
        WebPerformance.prototype.transform = function () { };
        return WebPerformance;
    }(BasePlugin));

    return WebPerformance;

}));
//# sourceMappingURL=index.js.map
