(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["chuche-monitor"] = factory());
})(this, (function () { 'use strict';

    function pkg1() {
        console.log("I am pkg1");
    }

    function pkg2() {
        pkg1();
        console.log("I am pkg2");
    }

    return pkg2;

}));
//# sourceMappingURL=index.js.map
