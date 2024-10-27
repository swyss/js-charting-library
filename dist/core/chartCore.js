"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
        return typeof o;
    } : function (o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}

function _getRequireWildcardCache(e) {
    if ("function" != typeof WeakMap) return null;
    var r = new WeakMap(), t = new WeakMap();
    return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
        return e ? t : r;
    })(e);
}

function _interopRequireWildcard(e, r) {
    if (!r && e && e.__esModule) return e;
    if (null === e || "object" != _typeof(e) && "function" != typeof e) return {"default": e};
    var t = _getRequireWildcardCache(r);
    if (t && t.has(e)) return t.get(e);
    var n = {__proto__: null}, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
        var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
        i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
    }
    return n["default"] = e, t && t.set(e, n), n;
}

function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
}

function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {writable: !1}), e;
}

function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}

function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}

// src/core/chartCore.js
var ChartCore = /*#__PURE__*/function () {
    function ChartCore(_ref) {
        var elementId = _ref.elementId,
            data = _ref.data,
            type = _ref.type,
            options = _ref.options;
        _classCallCheck(this, ChartCore);
        this.elementId = elementId;
        this.data = data;
        this.type = type;
        this.options = options;
        this.init();
    }

    return _createClass(ChartCore, [{
        key: "init",
        value: function init() {
            // Initialization logic
            this.createChart();
        }
    }, {
        key: "createChart",
        value: function createChart() {
            var _this = this;
            // Dynamically import the chart module based on type
            (function (specifier) {
                return new Promise(function (r) {
                    return r(specifier);
                }).then(function (s) {
                    return _interopRequireWildcard(require(s));
                });
            })("../charts/".concat(this.type, "Chart.js")).then(function (module) {
                var ChartType = module["default"];
                new ChartType(_this.elementId, _this.data, _this.options);
            })["catch"](function (error) {
                console.error("Chart type \"".concat(_this.type, "\" is not supported."), error);
            });
        }
    }]);
}();
var _default = exports["default"] = ChartCore;