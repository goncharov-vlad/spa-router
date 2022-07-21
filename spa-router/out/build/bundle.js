!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Router=e():t.Router=e()}(this,(()=>(()=>{"use strict";var t={359:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t){if("/"!==t[0])throw new Error("Route path template must start from slash");if(t.indexOf("?")>-1)throw new Error("Route path template can't contain question mark");this.template=t.trim(),this.parts=[],this.template.split("/").forEach((t=>{const e={element:t},r=t[0],o=t[t.length-1];"{"===r&&"}"===o&&(e.element=t.substring(1).slice(0,-1).trim(),e.isValue=!0),this.parts.push(e)}))}fetchPathValues(t){const e={};return t.split("/").forEach(((t,r)=>{const o=this.findPartByIndex(r);o&&o.isValue&&(e[o.element]=t)})),e}findPartByIndex(t){return this.parts[t]||null}getValueParts(){const t=[];return this.parts.forEach((e=>{e.isValue&&t.push(e)})),t}makePath(t){const e=[];return this.parts.forEach((r=>e.push(r.isValue?t[r.element]:r.element))),e.join("/")}isPathMatch(t){const e=t.split("/");let r=!1;return e.length!==this.parts.length||e.forEach(((t,e)=>{const o=this.findPartByIndex(e);o&&!o.isValue&&(r=t===o.element)})),r}}},249:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0});const o=r(699);e.default=class{constructor(t){this.routes=[],t.forEach((t=>{const e=t.pathTemplate.trim();if(this.findByPathTemplate(e))throw new Error("Route template must be unique");const r=new o.Route(e,t.action);this.routes.push(r)}))}findByPath(t){for(const e of this.routes)if(e.isPathMatch(t))return e;return null}findByPathTemplate(t){for(const e of this.routes)if(e.pathTemplate.template===t)return e;return null}}},787:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0});const o=r(699);e.default=class{constructor(t,e){this.pathTemplate=new o.PathTemplate(t),this.action=e}makePath(t){return this.pathTemplate.makePath(t)}isPathMatch(t){return this.pathTemplate.isPathMatch(t)}execute(t){this.action(t)}fetchPathValues(t){return this.pathTemplate.fetchPathValues(t)}}},682:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0});const o=r(699);class s{constructor(t){const{stack:e,notFoundAction:r}=t;this.repository=new o.Repository(e),this.notFoundAction=r,window.onpopstate=()=>this.execute(this.currentUrl,!0),this.initLinks(),this.initMutationObserver(),this.execute(this.currentUrl,!0)}get currentUrl(){return window.location.pathname+window.location.search}initLinks(){const t=document.querySelectorAll("a[href]");for(const e of t)e.addEventListener("click",(t=>this.onClickEvent(t,e)))}initMutationObserver(){new MutationObserver((t=>{t.forEach((t=>{t.addedNodes.forEach((t=>{t instanceof Element&&"A"===t.tagName&&t.hasAttribute("href")&&t.addEventListener("click",(e=>this.onClickEvent(e,t)))}))}))})).observe(document.body,{childList:!0,subtree:!0})}onClickEvent(t,e){if(t.preventDefault(),"A"!==e.tagName)throw new Error("Element must be link");let r=e.getAttribute("href");r&&"/"===r[0]&&(r=r.trim(),r!==this.currentUrl&&this.execute(r))}execute(t,e=!1){let r="";t.indexOf("?")>-1&&(r=t.substring(t.indexOf("?")));let o=this.notFoundAction,s=t.replace(r,"");o||(o=()=>console.log("not-found"));const n=this.repository.findByPath(s);if(n){const t=n.fetchPathValues(s);o=()=>n.execute(t),s=n.makePath(t)}const i=s+r;e?window.history.replaceState({},"",i):window.history.pushState({},"",i),o()}}e.default=s,e.default=s,t.exports=e.default},699:function(t,e,r){var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.PathTemplate=e.Repository=e.Route=void 0;const s=o(r(787));e.Route=s.default;const n=o(r(249));e.Repository=n.default;const i=o(r(359));e.PathTemplate=i.default;const a=o(r(682));e.default=a.default}},e={};return function r(o){var s=e[o];if(void 0!==s)return s.exports;var n=e[o]={exports:{}};return t[o].call(n.exports,n,n.exports,r),n.exports}(682)})()));