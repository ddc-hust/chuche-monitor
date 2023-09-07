(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["chuche-monitor"] = {}));
})(this, (function (exports) { 'use strict';

    var BasePlugin = /** @class */ (function () {
        function BasePlugin(type) {
            this.type = type;
        }
        return BasePlugin;
    }());

    exports.BasePlugin = BasePlugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
