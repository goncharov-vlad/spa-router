(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // ../spa-router-new/out/build/bundle.js
  var require_bundle = __commonJS({
    "../spa-router-new/out/build/bundle.js"(exports, module) {
      !function(t, e) {
        "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Router = e() : t.Router = e();
      }(exports, () => (() => {
        "use strict";
        var t = { 359: (t2, e2) => {
          Object.defineProperty(e2, "__esModule", { value: true }), e2.default = class {
            constructor(t3) {
              if ("/" !== t3[0])
                throw new Error("Route path template must start from slash");
              if (t3.indexOf("?") > -1)
                throw new Error("Route path template can't contain question mark");
              this.template = t3.trim(), this.parts = [], this.template.split("/").forEach((t4) => {
                const e3 = { element: t4 }, r = t4[0], o = t4[t4.length - 1];
                "{" === r && "}" === o && (e3.element = t4.substring(1).slice(0, -1).trim(), e3.isValue = true), this.parts.push(e3);
              });
            }
            fetchPathValues(t3) {
              const e3 = {};
              return t3.split("/").forEach((t4, r) => {
                const o = this.findPartByIndex(r);
                o && o.isValue && (e3[o.element] = t4);
              }), e3;
            }
            findPartByIndex(t3) {
              return this.parts[t3] || null;
            }
            getValueParts() {
              const t3 = [];
              return this.parts.forEach((e3) => {
                e3.isValue && t3.push(e3);
              }), t3;
            }
            makePath(t3) {
              const e3 = [];
              return this.parts.forEach((r) => e3.push(r.isValue ? t3[r.element] : r.element)), e3.join("/");
            }
            isPathMatch(t3) {
              const e3 = t3.split("/");
              let r = false;
              return e3.length !== this.parts.length || e3.forEach((t4, e4) => {
                const o = this.findPartByIndex(e4);
                o && !o.isValue && (r = t4 === o.element);
              }), r;
            }
          };
        }, 249: (t2, e2, r) => {
          Object.defineProperty(e2, "__esModule", { value: true });
          const o = r(699);
          e2.default = class {
            constructor(t3) {
              this.routes = [], t3.forEach((t4) => {
                const e3 = t4.pathTemplate.trim();
                if (this.findByPathTemplate(e3))
                  throw new Error("Route template must be unique");
                const r2 = new o.Route(e3, t4.action);
                this.routes.push(r2);
              });
            }
            findByPath(t3) {
              for (const e3 of this.routes)
                if (e3.isPathMatch(t3))
                  return e3;
              return null;
            }
            findByPathTemplate(t3) {
              for (const e3 of this.routes)
                if (e3.pathTemplate.template === t3)
                  return e3;
              return null;
            }
          };
        }, 787: (t2, e2, r) => {
          Object.defineProperty(e2, "__esModule", { value: true });
          const o = r(699);
          e2.default = class {
            constructor(t3, e3) {
              this.pathTemplate = new o.PathTemplate(t3), this.action = e3;
            }
            makePath(t3) {
              return this.pathTemplate.makePath(t3);
            }
            isPathMatch(t3) {
              return this.pathTemplate.isPathMatch(t3);
            }
            execute(t3) {
              this.action(t3);
            }
            fetchPathValues(t3) {
              return this.pathTemplate.fetchPathValues(t3);
            }
          };
        }, 682: (t2, e2, r) => {
          Object.defineProperty(e2, "__esModule", { value: true });
          const o = r(699);
          class s {
            constructor(t3) {
              const { stack: e3, notFoundAction: r2 } = t3;
              this.repository = new o.Repository(e3), this.notFoundAction = r2, window.onpopstate = () => this.execute(this.currentUrl, true), this.initLinks(), this.initMutationObserver(), this.execute(this.currentUrl, true);
            }
            get currentUrl() {
              return window.location.pathname + window.location.search;
            }
            initLinks() {
              const t3 = document.querySelectorAll("a[href]");
              for (const e3 of t3)
                e3.addEventListener("click", (t4) => this.onClickEvent(t4, e3));
            }
            initMutationObserver() {
              new MutationObserver((t3) => {
                t3.forEach((t4) => {
                  t4.addedNodes.forEach((t5) => {
                    t5 instanceof Element && "A" === t5.tagName && t5.hasAttribute("href") && t5.addEventListener("click", (e3) => this.onClickEvent(e3, t5));
                  });
                });
              }).observe(document.body, { childList: true, subtree: true });
            }
            onClickEvent(t3, e3) {
              if (t3.preventDefault(), "A" !== e3.tagName)
                throw new Error("Element must be link");
              let r2 = e3.getAttribute("href");
              r2 && "/" === r2[0] && (r2 = r2.trim(), r2 !== this.currentUrl && this.execute(r2));
            }
            execute(t3, e3 = false) {
              let r2 = "";
              t3.indexOf("?") > -1 && (r2 = t3.substring(t3.indexOf("?")));
              let o2 = this.notFoundAction, s2 = t3.replace(r2, "");
              o2 || (o2 = () => console.log("not-found"));
              const n = this.repository.findByPath(s2);
              if (n) {
                const t4 = n.fetchPathValues(s2);
                o2 = () => n.execute(t4), s2 = n.makePath(t4);
              }
              const i = s2 + r2;
              e3 ? window.history.replaceState({}, "", i) : window.history.pushState({}, "", i), o2();
            }
          }
          e2.default = s, e2.default = s, t2.exports = e2.default;
        }, 699: function(t2, e2, r) {
          var o = this && this.__importDefault || function(t3) {
            return t3 && t3.__esModule ? t3 : { default: t3 };
          };
          Object.defineProperty(e2, "__esModule", { value: true }), e2.PathTemplate = e2.Repository = e2.Route = void 0;
          const s = o(r(787));
          e2.Route = s.default;
          const n = o(r(249));
          e2.Repository = n.default;
          const i = o(r(359));
          e2.PathTemplate = i.default;
          const a = o(r(682));
          e2.default = a.default;
        } }, e = {};
        return function r(o) {
          var s = e[o];
          if (void 0 !== s)
            return s.exports;
          var n = e[o] = { exports: {} };
          return t[o].call(n.exports, n, n.exports, r), n.exports;
        }(682);
      })());
    }
  });

  // script.ts
  var import_spa_router = __toESM(require_bundle());
  var config = {
    notFoundAction: () => render({
      notFoundAction: "404 NOT FOUND"
    }),
    stack: [
      {
        pathTemplate: "/",
        action: () => render({
          pathTemplate: "/",
          yourOptionalParameter: "your optional value"
        })
      },
      {
        pathTemplate: "/contact",
        action: () => render({
          pathTemplate: "/contact",
          yourOptionalParameter: "your optional value"
        })
      },
      {
        pathTemplate: "/about",
        action: () => render({
          pathTemplate: "/about",
          yourOptionalParameter: "your optional value"
        })
      },
      {
        pathTemplate: "/another",
        action: () => render({
          pathTemplate: "/another",
          yourOptionalParameter: "your optional value"
        })
      },
      {
        pathTemplate: "/post/{postId}",
        action: (values) => render({
          pathTemplate: "/post/{postId}",
          yourOptionalParameter: "your optional value",
          values
        })
      },
      {
        pathTemplate: "/post/{postId}/comment/{commentId}",
        action: (values) => render({
          pathTemplate: "/post/{postId}/comment/{commentId}",
          yourOptionalParameter: "your optional value",
          values
        })
      }
    ]
  };
  var router = new import_spa_router.default(config);
  var render = (params) => {
    const json = {
      currentUrl: router.currentUrl,
      ...params
    };
    document.getElementById("json").innerHTML = JSON.stringify(json, void 0, 2);
  };
})();
