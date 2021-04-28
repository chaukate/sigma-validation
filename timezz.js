function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj &&
                typeof Symbol === "function" &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };
    }
    return _typeof(obj);
}

!(function (e, t) {
    "object" ==
        (typeof exports === "undefined" ? "undefined" : _typeof(exports)) &&
        "object" == (typeof module === "undefined" ? "undefined" : _typeof(module))
        ? (module.exports = t())
        : "function" == typeof define && define.amd
            ? define("timezz", [], t)
            : "object" ==
                (typeof exports === "undefined" ? "undefined" : _typeof(exports))
                ? (exports.timezz = t())
                : (e.timezz = t());
})("undefined" == typeof self ? this : self, function () {
    return (function () {
        "use strict";

        var e = {};
        return (
            (function () {
                var t = e;

                function n(e) {
                    return (n =
                        "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator)
                            ? function (e) {
                                return _typeof(e);
                            }
                            : function (e) {
                                return e &&
                                    "function" == typeof Symbol &&
                                    e.constructor === Symbol &&
                                    e !== Symbol.prototype
                                    ? "symbol"
                                    : _typeof(e);
                            })(e);
                }

                function o(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var o = t[n];
                        (o.enumerable = o.enumerable || !1),
                            (o.configurable = !0),
                            "value" in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o);
                    }
                }

                var i = "[TimezZ]",
                    r = "https://github.com/BrooonS/timezz",
                    s = 36e5,
                    a = 864e5,
                    f = 31536e6,
                    c = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
                    u = ["years", "days", "hours", "minutes", "seconds"],
                    h = (function () {
                        function e(t, n) {
                            var o = this;
                            !(function (e, t) {
                                if (!(e instanceof t))
                                    throw new TypeError("Cannot call a class as a function");
                            })(this, e),
                                (this.elements = []),
                                (this.isDestroyed = !1),
                                (this.parseDate = function (e) {
                                    if (e instanceof Date) return new Date(e);

                                    if ("string" == typeof e && !/Z$/i.test(e)) {
                                        var t = e.match(c);

                                        if (t) {
                                            var n = t[2] - 1 || 0,
                                                o = (t[7] || "0").substring(0, 3);
                                            return new Date(
                                                t[1],
                                                n,
                                                t[3] || 1,
                                                t[4] || 0,
                                                t[5] || 0,
                                                t[6] || 0,
                                                o
                                            );
                                        }
                                    }

                                    return new Date(e);
                                }),
                                (this.checkFields = function (e) {
                                    var t = function t(_t, n) {
                                        void 0 !== e[_t] &&
                                            n.length &&
                                            console.warn(
                                                "".concat(i, ":"),
                                                "Parameter '"
                                                    .concat(_t, "' should be ")
                                                    .concat(
                                                        n.length > 1 ? "one of the types" : "the type",
                                                        ": "
                                                    )
                                                    .concat(n.join(", "), "."),
                                                o.elements.length > 1 ? o.elements : o.elements[0]
                                            );
                                    };

                                    "boolean" != typeof e.stop && t("stop", ["boolean"]),
                                        "boolean" != typeof e.canContinue &&
                                        t("canContinue", ["boolean"]),
                                        "function" != typeof e.beforeCreate &&
                                        t("beforeCreate", ["function"]),
                                        "function" != typeof e.beforeDestroy &&
                                        t("beforeDestroy", ["function"]),
                                        "function" != typeof e.update && t("update", ["function"]);
                                }),
                                (this.fixZero = function (e) {
                                    return e >= 10 ? "".concat(e) : "0".concat(e);
                                }),
                                (this.fixNumber = function (e) {
                                    return Math.floor(Math.abs(e));
                                }),
                                this.updateElements(t),
                                this.checkFields(n),
                                (this.date = this.parseDate(n.date)),
                                (this.stop = n.stop || !1),
                                (this.canContinue = n.canContinue || !1),
                                (this.withYears = n.withYears || !1),
                                (this.beforeCreate = n.beforeCreate),
                                (this.update = n.update),
                                "function" == typeof this.beforeCreate && this.beforeCreate(),
                                this.init();
                        }

                        var t, n;
                        return (
                            (t = e),
                            (n = [
                                {
                                    key: "init",
                                    value: function value() {
                                        this.isDestroyed = !1;
                                        var e =
                                            new Date(this.date).getTime() - new Date().getTime(),
                                            t = this.canContinue || e > 0,
                                            n = t && this.withYears ? this.fixNumber(e / f) : 0,
                                            o = {
                                                years: n,
                                                days: t
                                                    ? this.fixNumber(0 === n ? e / a : (e % f) / a)
                                                    : 0,
                                                hours: t ? this.fixNumber((e % a) / s) : 0,
                                                minutes: t ? this.fixNumber((e % s) / 6e4) : 0,
                                                seconds: t ? this.fixNumber((e % 6e4) / 1e3) : 0,
                                                distance: Math.abs(e),
                                                isTimeOver: e <= 0
                                            };
                                        ((t && !this.stop) || !this.timeout) && this.setHTML(o),
                                            "function" == typeof this.update && this.update(o),
                                            this.timeout ||
                                            (this.timeout = setInterval(this.init.bind(this), 1e3));
                                    }
                                },
                                {
                                    key: "setHTML",
                                    value: function value(e) {
                                        var t = this;
                                        for (var i = 0; i < this.elements.length; i++) {
                                            for (var j = 0; j < u.length; j++) {
                                                var ele = this.elements[i].querySelector("[data-".concat(u[j], "]"));
                                                if (ele !== null) {
                                                    r = t.fixZero(e[u[j]]);
                                                    ele && ele.innerHTML !== r && (ele.innerHTML = r);
                                                }
                                            }
                                        }
                                        //var t = this;
                                        //this.elements.forEach(function (n) {
                                        //    u.forEach(function (o) {
                                        //        var i = n.querySelector("[data-".concat(o, "]")),
                                        //            r = t.fixZero(e[o]);
                                        //        i && i.innerHTML !== r && (i.innerHTML = r);
                                        //    });
                                        //});
                                    }
                                },
                                {
                                    key: "updateElements",
                                    value: function value(e) {
                                        if (e)
                                            try {
                                                debugger;
                                                if ("string" == typeof e) {
                                                    this.elements = document.querySelectorAll(e);
                                                }
                                                else if ((Array.isArray(e) || e instanceof NodeList) &&
                                                    Array.from(e).every(function (e) {
                                                        return e instanceof HTMLElement;
                                                    })) {
                                                    this.elements = e;
                                                }
                                                else {
                                                    this.elements = [e]
                                                }
                                                // "string" == typeof e
                                                // ? (this.elements = Array.from(
                                                // document.querySelectorAll(e)
                                                // ))
                                                // : (Array.isArray(e) || e instanceof NodeList) &&
                                                // Array.from(e).every(function (e) {
                                                // return e instanceof HTMLElement;
                                                // })
                                                // ? (this.elements = Array.from(e))
                                                // : e instanceof HTMLElement && (this.elements = [e]);
                                            } catch (e) { }
                                    }
                                },
                                {
                                    key: "destroy",
                                    value: function value() {
                                        this.timeout &&
                                            (clearInterval(this.timeout), (this.timeout = null)),
                                            this.elements.forEach(function (e) {
                                                u.forEach(function (t) {
                                                    var n = e.querySelector("[data-".concat(t, "]"));
                                                    n && (n.innerHTML = "");
                                                });
                                            }),
                                            (this.isDestroyed = !0);
                                    }
                                }
                            ]) && o(t.prototype, n),
                            e
                        );
                    })(),
                    l = function l(e, t) {
                        if (void 0 === e)
                            throw new Error(
                                ""
                                    .concat(
                                        i,
                                        ": Elements aren't passed. Check documentation for more info. "
                                    )
                                    .concat(r)
                            );
                        if (
                            !t ||
                            "object" !== n(t) ||
                            ("string" != typeof t.date &&
                                "number" != typeof t.date &&
                                !(t.date instanceof Date))
                        )
                            throw new Error(
                                ""
                                    .concat(
                                        i,
                                        ": Date is invalid. Check documentation for more info. "
                                    )
                                    .concat(r)
                            );
                        return new h(e, t);
                    };

                (l.prototype = h.prototype), (t["default"] = l);
            })(),
            e["default"]
        );
    })();
});
