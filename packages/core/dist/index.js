(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('error-stack-parser')) :
  typeof define === 'function' && define.amd ? define(['error-stack-parser'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["chuche-monitor"] = factory(global.ErrorStackParser));
})(this, (function (ErrorStackParser) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var ErrorStackParser__default = /*#__PURE__*/_interopDefaultLegacy(ErrorStackParser);

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
  function isEmpty(wat) {
      return ((variableTypeDetection.isString(wat) && wat.trim() === '') || wat === undefined || wat === null);
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

  var name = "@chuche-monitor/core";
  var version = "1.1.2";
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

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  function __generator(thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  }

  typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };

  // import { breadcrumb } from './breadcrumb';
  // import { options } from './options';
  /**
   * 用来上报数据，包含图片打点上报、xhr请求
   */
  var TransportData = /** @class */ (function () {
      function TransportData() {
          this.queue = new Queue(); // 消息队列
          this.apikey = ''; // 每个项目对应的唯一标识
          this.errorDsn = ''; // 监控上报接口的地址
          this.userId = ''; // 用户id
          this.useImgUpload = false; // 是否使用图片打点上报
          this.uuid = generateUUID(); // 每次页面加载的唯一标识
      }
      TransportData.prototype.beacon = function (url, data) {
          return navigator.sendBeacon(url, JSON.stringify(data));
      };
      TransportData.prototype.imgRequest = function (data, url) {
          var requestFun = function () {
              var img = new Image();
              var spliceStr = url.indexOf('?') === -1 ? '?' : '&';
              img.src = "".concat(url).concat(spliceStr, "data=").concat(encodeURIComponent(JSON.stringify(data)));
          };
          this.queue.addFn(requestFun);
      };
      TransportData.prototype.beforePost = function (data) {
          return __awaiter(this, void 0, void 0, function () {
              var transportData;
              return __generator(this, function (_a) {
                  transportData = this.getTransportData(data);
                  // 配置了beforeDataReport
                  if (typeof this.beforeDataReport === 'function') {
                      transportData = this.beforeDataReport(transportData);
                      if (!transportData)
                          return [2 /*return*/, false];
                  }
                  return [2 /*return*/, transportData];
              });
          });
      };
      TransportData.prototype.xhrPost = function (data, url) {
          return __awaiter(this, void 0, void 0, function () {
              var requestFun;
              return __generator(this, function (_a) {
                  requestFun = function () {
                      fetch("".concat(url), {
                          method: 'POST',
                          body: JSON.stringify(data),
                          headers: {
                              'Content-Type': 'application/json',
                          },
                      });
                  };
                  this.queue.addFn(requestFun);
                  return [2 /*return*/];
              });
          });
      };
      // 获取用户信息
      TransportData.prototype.getAuthInfo = function () {
          return {
              userId: this.userId || this.getAuthId() || '',
              sdkVersion: SDK_VERSION,
              apikey: this.apikey,
          };
      };
      TransportData.prototype.getAuthId = function () {
          if (typeof this.getUserId === 'function') {
              var id = this.getUserId();
              if (typeof id === 'string' || typeof id === 'number') {
                  return id;
              }
              else {
                  console.error("web-see userId: ".concat(id, " \u671F\u671B string \u6216 number \u7C7B\u578B\uFF0C\u4F46\u662F\u4F20\u5165 ").concat(typeof id));
              }
          }
          return '';
      };
      // 添加公共信息
      // 这里不要添加时间戳，比如接口报错，发生的时间和上报时间不一致
      TransportData.prototype.getTransportData = function (data) {
          var info = __assign(__assign(__assign({}, data), this.getAuthInfo()), { uuid: this.uuid, pageUrl: getLocationHref(), deviceInfo: _support.deviceInfo });
          // 性能数据、录屏、白屏检测等不需要附带用户行为
          var excludeRreadcrumb = [
              EVENTTYPES.PERFORMANCE,
              EVENTTYPES.RECORDSCREEN,
              EVENTTYPES.WHITESCREEN,
          ];
          if (!excludeRreadcrumb.includes(data.type)) ;
          return info;
      };
      // 判断请求是否为SDK配置的接口
      TransportData.prototype.isSdkTransportUrl = function (targetUrl) {
          var isSdkDsn = false;
          if (this.errorDsn && targetUrl.indexOf(this.errorDsn) !== -1) {
              isSdkDsn = true;
          }
          return isSdkDsn;
      };
      TransportData.prototype.bindOptions = function (options) {
          var dsn = options.dsn, apikey = options.apikey, beforeDataReport = options.beforeDataReport, userId = options.userId, getUserId = options.getUserId, useImgUpload = options.useImgUpload;
          validateOption(apikey, 'apikey', 'string') && (this.apikey = apikey);
          validateOption(dsn, 'dsn', 'string') && (this.errorDsn = dsn);
          validateOption(userId, 'userId', 'string') && (this.userId = userId || '');
          validateOption(useImgUpload, 'useImgUpload', 'boolean') &&
              (this.useImgUpload = useImgUpload || false);
          validateOption(beforeDataReport, 'beforeDataReport', 'function') &&
              (this.beforeDataReport = beforeDataReport);
          validateOption(getUserId, 'getUserId', 'function') && (this.getUserId = getUserId);
      };
      // 上报数据
      TransportData.prototype.send = function (data) {
          return __awaiter(this, void 0, void 0, function () {
              var dsn, result, value;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          dsn = this.errorDsn;
                          if (isEmpty(dsn)) {
                              console.error('web-see: dsn为空，没有传入监控错误上报的dsn地址，请在init中传入');
                              return [2 /*return*/];
                          }
                          return [4 /*yield*/, this.beforePost(data)];
                      case 1:
                          result = (_a.sent());
                          // if (isBrowserEnv && result) {
                          //     // 优先使用sendBeacon 上报，若数据量大，再使用图片打点上报和fetch上报
                          //     const value = this.beacon(dsn, result);
                          //     if (!value) {
                          //         return this.useImgUpload ? this.imgRequest(result, dsn) : this.xhrPost(result, dsn);
                          //     }
                          // }
                          if (result) {
                              value = this.beacon(dsn, result);
                              if (!value) {
                                  return [2 /*return*/, this.useImgUpload ? this.imgRequest(result, dsn) : this.xhrPost(result, dsn)];
                              }
                          }
                          return [2 /*return*/];
                  }
              });
          });
      };
      return TransportData;
  }());
  var transportData = _support.transportData || (_support.transportData = new TransportData());

  var Options = /** @class */ (function () {
      function Options() {
          this.dsn = ''; // 监控上报接口的地址
          this.throttleDelayTime = 0; // click事件的节流时长
          this.overTime = 10; // 接口超时时长
          this.whiteBoxElements = ['html', 'body', '#app', '#root']; // // 白屏检测的容器列表
          this.silentWhiteScreen = false; // 是否开启白屏检测
          this.skeletonProject = false; // 项目是否有骨架屏
          this.repeatCodeError = false; // 是否去除重复的代码错误，重复的错误只上报一次
      }
      Options.prototype.bindOptions = function (options) {
          var dsn = options.dsn, filterXhrUrlRegExp = options.filterXhrUrlRegExp, _a = options.throttleDelayTime, throttleDelayTime = _a === void 0 ? 0 : _a, _b = options.overTime, overTime = _b === void 0 ? 10 : _b, _c = options.silentWhiteScreen, silentWhiteScreen = _c === void 0 ? false : _c, _d = options.whiteBoxElements, whiteBoxElements = _d === void 0 ? ['html', 'body', '#app', '#root'] : _d, _e = options.skeletonProject, skeletonProject = _e === void 0 ? false : _e, handleHttpStatus = options.handleHttpStatus, _f = options.repeatCodeError, repeatCodeError = _f === void 0 ? false : _f;
          validateOption(dsn, 'dsn', 'string') && (this.dsn = dsn);
          validateOption(throttleDelayTime, 'throttleDelayTime', 'number') &&
              (this.throttleDelayTime = throttleDelayTime);
          validateOption(overTime, 'overTime', 'number') && (this.overTime = overTime);
          validateOption(filterXhrUrlRegExp, 'filterXhrUrlRegExp', 'regexp') &&
              (this.filterXhrUrlRegExp = filterXhrUrlRegExp);
          validateOption(silentWhiteScreen, 'silentWhiteScreen', 'boolean') &&
              (this.silentWhiteScreen = silentWhiteScreen);
          validateOption(skeletonProject, 'skeletonProject', 'boolean') &&
              (this.skeletonProject = skeletonProject);
          validateOption(whiteBoxElements, 'whiteBoxElements', 'array') &&
              (this.whiteBoxElements = whiteBoxElements);
          validateOption(handleHttpStatus, 'handleHttpStatus', 'function') &&
              (this.handleHttpStatus = handleHttpStatus);
          validateOption(repeatCodeError, 'repeatCodeError', 'boolean') &&
              (this.repeatCodeError = repeatCodeError);
      };
      return Options;
  }());
  var options = _support.options || (_support.options = new Options());
  function handleOptions(paramOptions) {
      // setSilentFlag 给全局添加已设置的标识，防止重复设置
      setSilentFlag(paramOptions);
      // 设置用户行为的配置项
      // breadcrumb.bindOptions(paramOptions);
      // transportData 配置上报的信息
      transportData.bindOptions(paramOptions);
      // 绑定其他配置项
      options.bindOptions(paramOptions);
  }

  var handlers = {};
  // subscribeEvent 设置标识，并将处理的方法放置到handlers中，{ xhr: [ funtion ] }
  function subscribeEvent(handler) {
      var _a;
      if (!handler || getFlag(handler.type))
          return false;
      setFlag(handler.type, true);
      handlers[handler.type] = handlers[handler.type] || [];
      (_a = handlers[handler.type]) === null || _a === void 0 ? void 0 : _a.push(handler.callback);
      console.log("订阅事件");
      return true;
  }
  function notify(type, data) {
      var _a;
      if (!type || !handlers[type])
          return;
      // 获取对应事件的回调函数并执行，回调函数为addReplaceHandler事件中定义的事件
      console.log("通知事件的执行");
      (_a = handlers[type]) === null || _a === void 0 ? void 0 : _a.forEach(function (callback) {
          nativeTryCatch(function () {
              callback(data);
          }, function () {
              // console.error(
              //   `web-see 重写事件notify的回调函数发生错误\nType:${type}\nName: ${getFunctionName(
              //     callback
              //   )}\nError: ${e}`
              // );
          });
      });
  }

  // 自定义上报事件
  function log(_a) {
      var _b = _a.message, message = _b === void 0 ? 'customMsg' : _b, _c = _a.error, error = _c === void 0 ? '' : _c, _d = _a.type, type = _d === void 0 ? EVENTTYPES.CUSTOM : _d;
      try {
          var errorInfo = {};
          if (isError(error)) {
              var result = ErrorStackParser__default["default"].parse(!error.target ? error : error.error || error.reason)[0];
              errorInfo = __assign(__assign({}, result), { line: result.lineNumber, column: result.columnNumber });
          }
          // breadcrumb.push({
          //   type,
          //   status: STATUS_CODE.ERROR,
          //   category: breadcrumb.getCategory(EVENTTYPES.CUSTOM), ''
          //   data: unknownToString(message),
          //   time: getTimestamp(),
          // });
          transportData.send(__assign({ type: type, status: STATUS_CODE.ERROR, message: unknownToString(message), time: getTimestamp() }, errorInfo));
      }
      catch (err) {
          // console.log('上报自定义事件时报错：', err);
      }
  }

  /**
   * 检测页面是否白屏
   * @param {function} callback - 回到函数获取检测结果
   * @param {boolean} skeletonProject - 页面是否有骨架屏
   * @param {array} whiteBoxElements - 容器列表，默认值为['html', 'body', '#app', '#root']
   */
  function openWhiteScreen(callback, _a) {
      // let _whiteLoopNum = 0;
      var skeletonProject = _a.skeletonProject, whiteBoxElements = _a.whiteBoxElements;
      // 项目有骨架屏
      if (skeletonProject) {
          if (document.readyState != 'complete') {
              idleCallback();
          }
      }
      else {
          // 页面加载完毕
          if (document.readyState === 'complete') {
              idleCallback(); // 页面加载完之后（页面和子资源加载完成，不包括动态资源）进行采样
          }
          else {
              _global.addEventListener('load', idleCallback);
          }
      }
      // 选中dom点的名称
      function getSelector(element) {
          if (element.id) {
              return '#' + element.id;
          }
          else if (element.className) {
              // div home => div.home
              return ('.' +
                  element.className
                      .split(' ')
                      .filter(function (item) { return !!item; })
                      .join('.'));
          }
          else {
              return element.nodeName.toLowerCase();
          }
      }
      // 判断采样点是否为容器节点
      function isContainer(element) {
          var selector = getSelector(element);
          // if (skeletonProject) {
          //   _whiteLoopNum ? _skeletonNowList.push(selector) : _skeletonInitList.push(selector);
          // }
          return (whiteBoxElements === null || whiteBoxElements === void 0 ? void 0 : whiteBoxElements.indexOf(selector)) != -1;
      }
      // 采样对比
      function sampling() {
          var emptyPoints = 0;
          for (var i = 1; i <= 9; i++) {
              var xElements = document.elementsFromPoint((_global.innerWidth * i) / 10, _global.innerHeight / 2);
              var yElements = document.elementsFromPoint(_global.innerWidth / 2, (_global.innerHeight * i) / 10);
              if (isContainer(xElements[0]))
                  emptyPoints++;
              // 中心点只计算一次
              if (i != 5) {
                  if (isContainer(yElements[0]))
                      emptyPoints++;
              }
          }
          // console.log('_skeletonInitList', _skeletonInitList, _skeletonNowList);
          // 页面正常渲染，停止轮训
          if (emptyPoints != 17) {
              // if (skeletonProject) {
              //   // 第一次不比较
              //   if (!_whiteLoopNum) return openWhiteLoop();
              //   // 比较前后dom是否一致
              //   if (_skeletonNowList.join() == _skeletonInitList.join())
              //     return callback({
              //       status: STATUS_CODE.ERROR,
              //     });
              // }
              if (_support._loopTimer) {
                  clearTimeout(_support._loopTimer);
                  _support._loopTimer = null;
              }
          }
          else {
              // 开启轮训
              if (!_support._loopTimer) {
                  openWhiteLoop();
              }
          }
          console.log("***********888888");
          console.log(emptyPoints);
          // 17个点都是容器节点算作白屏
          callback({
              status: emptyPoints == 17 ? STATUS_CODE.ERROR : STATUS_CODE.OK,
          });
      }
      // 开启白屏轮训
      function openWhiteLoop() {
          if (_support._loopTimer)
              return;
          _support._loopTimer = setInterval(function () {
              // if (skeletonProject) {
              //   _whiteLoopNum++;
              //   _skeletonNowList = [];
              // }
              idleCallback();
          }, 1000);
      }
      function idleCallback() {
          // if ('requestIdleCallback' in _global) {
          //   requestIdleCallback(deadline => {
          //     // timeRemaining：表示当前空闲时间的剩余时间
          //     if (deadline.timeRemaining() > 0) {
          //       sampling();
          //     }
          //   });
          // } else {
          //   sampling();
          // }
          sampling();
      }
  }

  // import { ErrorTarget, RouteHistory, HttpData } from '@chuche-monitor/types';
  var HandleEvents = {
      // 处理xhr、fetch回调
      // handleHttp(data: HttpData, type: EVENTTYPES): void {
      //   const result = httpTransform(data);
      //   // 添加用户行为，去掉自身上报的接口行为
      //   if (!data.url.includes(options.dsn)) {
      //     breadcrumb.push({
      //       type,
      //       category: breadcrumb.getCategory(type),
      //       data: result,
      //       status: result.status,
      //       time: data.time,
      //     });
      //   }
      //   if (result.status === 'error') {
      //     // 上报接口错误
      //     transportData.send({ ...result, type, status: STATUS_CODE.ERROR });
      //   }
      // },
      // handleError(ev: ErrorTarget): void {
      //   const target = ev.target;
      //   if (!target || (ev.target && !ev.target.localName)) {
      //     // vue和react捕获的报错使用ev解析，异步错误使用ev.error解析
      //     const stackFrame = ErrorStackParser.parse(!target ? ev : ev.error)[0];
      //     const { fileName, columnNumber, lineNumber } = stackFrame;
      //     const errorData = {
      //       type: EVENTTYPES.ERROR,
      //       status: STATUS_CODE.ERROR,
      //       time: getTimestamp(),
      //       message: ev.message,
      //       fileName,
      //       line: lineNumber,
      //       column: columnNumber,
      //     };
      //     breadcrumb.push({
      //       type: EVENTTYPES.ERROR,
      //       category: breadcrumb.getCategory(EVENTTYPES.ERROR),
      //       data: errorData,
      //       time: getTimestamp(),
      //       status: STATUS_CODE.ERROR,
      //     });
      //     const hash: string = getErrorUid(
      //       `${EVENTTYPES.ERROR}-${ev.message}-${fileName}-${columnNumber}`
      //     );
      //     // 开启repeatCodeError第一次报错才上报
      //     if (!options.repeatCodeError || (options.repeatCodeError && !hashMapExist(hash))) {
      //       return transportData.send(errorData);
      //     }
      //   }
      //   // 资源加载报错
      //   if (target?.localName) {
      //     // 提取资源加载的信息
      //     const data = resourceTransform(target);
      //     breadcrumb.push({
      //       type: EVENTTYPES.RESOURCE,
      //       category: breadcrumb.getCategory(EVENTTYPES.RESOURCE),
      //       status: STATUS_CODE.ERROR,
      //       time: getTimestamp(),
      //       data,
      //     });
      //     return transportData.send({
      //       ...data,
      //       type: EVENTTYPES.RESOURCE,
      //       status: STATUS_CODE.ERROR,
      //     });
      //   }
      // },
      // handleHistory(data: RouteHistory): void {
      //   const { from, to } = data;
      //   // 定义parsedFrom变量，值为relative
      //   const { relative: parsedFrom } = parseUrlToObj(from);
      //   const { relative: parsedTo } = parseUrlToObj(to);
      //   breadcrumb.push({
      //     type: EVENTTYPES.HISTORY,
      //     category: breadcrumb.getCategory(EVENTTYPES.HISTORY),
      //     data: {
      //       from: parsedFrom ? parsedFrom : '/',
      //       to: parsedTo ? parsedTo : '/',
      //     },
      //     time: getTimestamp(),
      //     status: STATUS_CODE.OK,
      //   });
      // },
      // handleHashchange(data: HashChangeEvent): void {
      //   const { oldURL, newURL } = data;
      //   const { relative: from } = parseUrlToObj(oldURL);
      //   const { relative: to } = parseUrlToObj(newURL);
      //   breadcrumb.push({
      //     type: EVENTTYPES.HASHCHANGE,
      //     category: breadcrumb.getCategory(EVENTTYPES.HASHCHANGE),
      //     data: {
      //       from,
      //       to,
      //     },
      //     time: getTimestamp(),
      //     status: STATUS_CODE.OK,
      //   });
      // },
      // handleUnhandleRejection(ev: PromiseRejectionEvent): void {
      //   const stackFrame = ErrorStackParser.parse(ev.reason)[0];
      //   const { fileName, columnNumber, lineNumber } = stackFrame;
      //   const message = unknownToString(ev.reason.message || ev.reason.stack);
      //   const data = {
      //     type: EVENTTYPES.UNHANDLEDREJECTION,
      //     status: STATUS_CODE.ERROR,
      //     time: getTimestamp(),
      //     message,
      //     fileName,
      //     line: lineNumber,
      //     column: columnNumber,
      //   };
      //   breadcrumb.push({
      //     type: EVENTTYPES.UNHANDLEDREJECTION,
      //     category: breadcrumb.getCategory(EVENTTYPES.UNHANDLEDREJECTION),
      //     time: getTimestamp(),
      //     status: STATUS_CODE.ERROR,
      //     data,
      //   });
      //   const hash: string = getErrorUid(
      //     `${EVENTTYPES.UNHANDLEDREJECTION}-${message}-${fileName}-${columnNumber}`
      //   );
      //   // 开启repeatCodeError第一次报错才上报
      //   if (!options.repeatCodeError || (options.repeatCodeError && !hashMapExist(hash))) {
      //     transportData.send(data);
      //   }
      // },
      handleWhiteScreen: function () {
          openWhiteScreen(function (res) {
              // 上报白屏检测信息
              console.log("上报白屏异常信息");
              console.log(res);
              transportData.send(__assign({ type: EVENTTYPES.WHITESCREEN, time: getTimestamp() }, res));
          }, options);
      },
  };

  function replace(type) {
      switch (type) {
          case EVENTTYPES.WHITESCREEN:
              whiteScreen();
              break;
      }
  }
  function addReplaceHandler(handler) {
      if (!subscribeEvent(handler))
          return;
      replace(handler.type);
  }
  function whiteScreen() {
      notify(EVENTTYPES.WHITESCREEN);
  }

  function setupReplace() {
      // 白屏检测
      addReplaceHandler({
          callback: function () {
              HandleEvents.handleWhiteScreen();
          },
          type: EVENTTYPES.WHITESCREEN,
      });
  }

  function init(options) {
      if (!options.dsn || !options.apikey) {
          return console.error("web-see \u7F3A\u5C11\u5FC5\u987B\u914D\u7F6E\u9879\uFF1A".concat(!options.dsn ? 'dsn' : 'apikey', " "));
      }
      // if (!('fetch' in _global) || options.disabled) return;
      // 初始化配置
      handleOptions(options);
      setupReplace();
  }
  function install(Vue, options) {
      if (getFlag(EVENTTYPES.VUE))
          return;
      setFlag(EVENTTYPES.VUE, true);
      var handler = Vue.config.errorHandler;
      console.log('运行了core的注册，install方法');
      // vue项目在Vue.config.errorHandler中上报错误, 重写了vue项目的报错方式
      Vue.config.errorHandler = function (err, vm, info) {
          console.log('重写vue项目的报错');
          console.log(err);
          // HandleEvents.handleError(err);
          if (handler)
              handler.apply(null, [err, vm, info]);
      };
      init(options);
  }
  // react项目在ErrorBoundary中上报错误
  function errorBoundary(err) {
      if (getFlag(EVENTTYPES.REACT))
          return;
      setFlag(EVENTTYPES.REACT, true);
      // HandleEvents.handleError(err);
      console.log(err);
  }
  function use(plugin, option) {
      var instance = new plugin(option);
      if (!subscribeEvent({
          callback: function (data) {
              instance.transform(data);
          },
          type: instance.type,
      }))
          return;
      nativeTryCatch(function () {
          // instance.core({ transportData, breadcrumb, options, notify }); // 这里应该就是插件的加载
          instance.core({ transportData: transportData, undefined: undefined, options: options, notify: notify });
          // 这里应该就是插件的加载,这里就是在运行插件的核心方法。上报性能数据了。后面的notify其实没有用到，只用到了transportdata
      });
  }
  var index = {
      SDK_VERSION: SDK_VERSION,
      SDK_NAME: SDK_NAME,
      init: init,
      install: install,
      errorBoundary: errorBoundary,
      use: use,
      log: log,
  };

  return index;

}));
//# sourceMappingURL=index.js.map
