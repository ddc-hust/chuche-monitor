(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["chuche-monitor"] = {}));
})(this, (function (exports) { 'use strict';

    /**
     * 事件类型, 设置为枚举类型
     */
    exports.EVENTTYPES = void 0;
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
    })(exports.EVENTTYPES || (exports.EVENTTYPES = {}));
    /**
     * 状态， 设置为枚举类型
     */
    exports.STATUS_CODE = void 0;
    (function (STATUS_CODE) {
        STATUS_CODE["ERROR"] = "error";
        STATUS_CODE["OK"] = "ok";
    })(exports.STATUS_CODE || (exports.STATUS_CODE = {}));

    var name = "@chuche-monitor/core";
    var version = "1.1.0";
    var description = "";
    var main = "src/index.js";
    var publishConfig = {
    	main: "dist/index.js",
    	access: "public"
    };
    var scripts = {
    	test: "echo \"Error: no test specified\" && exit 1"
    };
    var keywords = [
    ];
    var author = "chuche";
    var license = "ISC";
    var dependencies = {
    	"@chuche-monitor/common": "workspace:^",
    	"@chuche-monitor/types": "workspace:^",
    	"@chuche-monitor/utils": "workspace:^"
    };
    var version$1 = {
    	name: name,
    	version: version,
    	description: description,
    	main: main,
    	publishConfig: publishConfig,
    	scripts: scripts,
    	keywords: keywords,
    	author: author,
    	license: license,
    	dependencies: dependencies
    };

    var SDK_NAME = 'chuche-monitor';
    var SDK_VERSION = version$1.version;

    exports.SDK_NAME = SDK_NAME;
    exports.SDK_VERSION = SDK_VERSION;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
