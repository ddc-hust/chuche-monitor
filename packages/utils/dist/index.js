(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["chuche-monitor"] = {}));
})(this, (function (exports) { 'use strict';

  function isType(type) {
      return function (value) {
          return Object.prototype.toString.call(value) === "[object ".concat(type, "]");
      };
  }
  /**
   * 检测变量类型
   * @param type
   */
  var variableTypeDetection = {
      isNumber: isType('Number'),
      isString: isType('String'),
      isBoolean: isType('Boolean'),
      isNull: isType('Null'),
      isUndefined: isType('Undefined'),
      isSymbol: isType('Symbol'),
      isFunction: isType('Function'),
      isObject: isType('Object'),
      isArray: isType('Array'),
      isProcess: isType('process'),
      isWindow: isType('Window'),
  };
  function isError(error) {
      switch (Object.prototype.toString.call(error)) {
          case '[object Error]':
              return true;
          case '[object Exception]':
              return true;
          case '[object DOMException]':
              return true;
          default:
              return false;
      }
  }
  /**
   * 检查是否是空对象
   */
  function isEmptyObject(obj) {
      return variableTypeDetection.isObject(obj) && Object.keys(obj).length === 0;
  }
  function isEmpty(wat) {
      return ((variableTypeDetection.isString(wat) && wat.trim() === '') || wat === undefined || wat === null);
  }
  function isExistProperty(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
  }

  // 获取当前的时间戳
  function getTimestamp() {
      return Date.now();
  }
  function typeofAny(target) {
      return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
  }
  // 验证选项的类型
  function validateOption(target, targetName, expectType) {
      if (!target)
          return false;
      if (typeofAny(target) === expectType)
          return true;
      console.error("web-see: ".concat(targetName, "\u671F\u671B\u4F20\u5165").concat(expectType, "\u7C7B\u578B\uFF0C\u76EE\u524D\u662F").concat(typeofAny(target), "\u7C7B\u578B"));
  }
  function generateUUID() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      });
      return uuid;
  }
  function getLocationHref() {
      if (typeof document === 'undefined' || document.location == null)
          return '';
      return document.location.href;
  }
  function unknownToString(target) {
      if (variableTypeDetection.isString(target)) {
          return target;
      }
      if (variableTypeDetection.isUndefined(target)) {
          return 'undefined';
      }
      return JSON.stringify(target);
  }

  // 获取全局变量
  function getGlobal() {
      return window;
  }
  var _global = getGlobal();
  var _support = getGlobalSupport();
  _support.replaceFlag = _support.replaceFlag || {};
  var replaceFlag = _support.replaceFlag;
  function setFlag(replaceType, isSet) {
      if (replaceFlag[replaceType])
          return;
      replaceFlag[replaceType] = isSet;
  }
  function getFlag(replaceType) {
      return replaceFlag[replaceType] ? true : false;
  }
  // 获取全部变量__webSee__的引用地址，这是干啥的？？？
  function getGlobalSupport() {
      _global.__chucheMonitor__ = _global.__chucheMonitor__ || {};
      return _global.__chucheMonitor__;
  }

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

  function setSilentFlag(_a) {
      var _b = _a.silentXhr, silentXhr = _b === void 0 ? true : _b, _c = _a.silentFetch, silentFetch = _c === void 0 ? true : _c, _d = _a.silentClick, silentClick = _d === void 0 ? true : _d, _e = _a.silentHistory, silentHistory = _e === void 0 ? true : _e, _f = _a.silentError, silentError = _f === void 0 ? true : _f, _g = _a.silentHashchange, silentHashchange = _g === void 0 ? true : _g, _h = _a.silentUnhandledrejection, silentUnhandledrejection = _h === void 0 ? true : _h, _j = _a.silentWhiteScreen, silentWhiteScreen = _j === void 0 ? false : _j;
      setFlag(EVENTTYPES.XHR, !silentXhr);
      setFlag(EVENTTYPES.FETCH, !silentFetch);
      setFlag(EVENTTYPES.CLICK, !silentClick);
      setFlag(EVENTTYPES.HISTORY, !silentHistory);
      setFlag(EVENTTYPES.ERROR, !silentError);
      setFlag(EVENTTYPES.HASHCHANGE, !silentHashchange);
      setFlag(EVENTTYPES.UNHANDLEDREJECTION, !silentUnhandledrejection);
      setFlag(EVENTTYPES.WHITESCREEN, !silentWhiteScreen);
  }

  var Queue = /** @class */ (function () {
      function Queue() {
          this.stack = [];
          this.isFlushing = false;
      }
      Queue.prototype.addFn = function (fn) {
          var _this = this;
          if (typeof fn !== 'function')
              return;
          if (!('requestIdleCallback' in _global || 'Promise' in _global)) {
              fn();
              return;
          }
          this.stack.push(fn);
          if (!this.isFlushing) {
              this.isFlushing = true;
              // 优先使用requestIdleCallback
              if ('requestIdleCallback' in _global) {
                  requestIdleCallback(function () { return _this.flushStack(); });
              }
              else {
                  // 其次使用微任务上报
                  Promise.resolve().then(function () { return _this.flushStack(); });
              }
          }
      };
      Queue.prototype.clear = function () {
          this.stack = [];
      };
      Queue.prototype.getStack = function () {
          return this.stack;
      };
      Queue.prototype.flushStack = function () {
          var temp = this.stack.slice(0);
          this.stack = [];
          this.isFlushing = false;
          for (var i = 0; i < temp.length; i++) {
              temp[i]();
          }
      };
      return Queue;
  }());

  /**
   * 原生try函数
   * ../param fn try中执行的函数体
   * ../param errorFn 报错时执行的函数体，将err传入
   */
  function nativeTryCatch(fn, errorFn) {
      try {
          fn();
      }
      catch (err) {
          if (errorFn) {
              errorFn(err);
          }
      }
  }

  exports.Queue = Queue;
  exports._global = _global;
  exports._support = _support;
  exports.generateUUID = generateUUID;
  exports.getFlag = getFlag;
  exports.getGlobal = getGlobal;
  exports.getGlobalSupport = getGlobalSupport;
  exports.getLocationHref = getLocationHref;
  exports.getTimestamp = getTimestamp;
  exports.isEmpty = isEmpty;
  exports.isEmptyObject = isEmptyObject;
  exports.isError = isError;
  exports.isExistProperty = isExistProperty;
  exports.nativeTryCatch = nativeTryCatch;
  exports.setFlag = setFlag;
  exports.setSilentFlag = setSilentFlag;
  exports.typeofAny = typeofAny;
  exports.unknownToString = unknownToString;
  exports.validateOption = validateOption;
  exports.variableTypeDetection = variableTypeDetection;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
