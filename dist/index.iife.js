var very=function(t){"use strict";var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function n(t){var r={exports:{}};return t(r,r.exports),r.exports}var e=function(t){return t&&t.Math==Math&&t},o=e("object"==typeof globalThis&&globalThis)||e("object"==typeof window&&window)||e("object"==typeof self&&self)||e("object"==typeof r&&r)||function(){return this}()||Function("return this")(),i=function(t){try{return!!t()}catch(t){return!0}},u=!i((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),a={}.propertyIsEnumerable,c=Object.getOwnPropertyDescriptor,f={f:c&&!a.call({1:2},1)?function(t){var r=c(this,t);return!!r&&r.enumerable}:a},l=function(t,r){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:r}},s={}.toString,p=function(t){return s.call(t).slice(8,-1)},v="".split,y=i((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==p(t)?v.call(t,""):Object(t)}:Object,h=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t},d=function(t){return y(h(t))},g=function(t){return"object"==typeof t?null!==t:"function"==typeof t},b=function(t,r){if(!g(t))return t;var n,e;if(r&&"function"==typeof(n=t.toString)&&!g(e=n.call(t)))return e;if("function"==typeof(n=t.valueOf)&&!g(e=n.call(t)))return e;if(!r&&"function"==typeof(n=t.toString)&&!g(e=n.call(t)))return e;throw TypeError("Can't convert object to primitive value")},m={}.hasOwnProperty,S=function(t,r){return m.call(t,r)},w=o.document,O=g(w)&&g(w.createElement),j=!u&&!i((function(){return 7!=Object.defineProperty((t="div",O?w.createElement(t):{}),"a",{get:function(){return 7}}).a;var t})),x=Object.getOwnPropertyDescriptor,A={f:u?x:function(t,r){if(t=d(t),r=b(r,!0),j)try{return x(t,r)}catch(t){}if(S(t,r))return l(!f.f.call(t,r),t[r])}},E=function(t){if(!g(t))throw TypeError(String(t)+" is not an object");return t},T=Object.defineProperty,P={f:u?T:function(t,r,n){if(E(t),r=b(r,!0),E(n),j)try{return T(t,r,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[r]=n.value),t}},M=u?function(t,r,n){return P.f(t,r,l(1,n))}:function(t,r,n){return t[r]=n,t},C=function(t,r){try{M(o,t,r)}catch(n){o[t]=r}return r},I="__core-js_shared__",_=o[I]||C(I,{}),F=Function.toString;"function"!=typeof _.inspectSource&&(_.inspectSource=function(t){return F.call(t)});var W,k,L,N,z=_.inspectSource,D=o.WeakMap,$="function"==typeof D&&/native code/.test(z(D)),q=n((function(t){(t.exports=function(t,r){return _[t]||(_[t]=void 0!==r?r:{})})("versions",[]).push({version:"3.8.3",mode:"global",copyright:"© 2021 Denis Pushkarev (zloirock.ru)"})})),G=0,R=Math.random(),V=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++G+R).toString(36)},B=q("keys"),K={},U=o.WeakMap;if($){var Y=_.state||(_.state=new U),H=Y.get,J=Y.has,Q=Y.set;W=function(t,r){return r.facade=t,Q.call(Y,t,r),r},k=function(t){return H.call(Y,t)||{}},L=function(t){return J.call(Y,t)}}else{var X=B[N="state"]||(B[N]=V(N));K[X]=!0,W=function(t,r){return r.facade=t,M(t,X,r),r},k=function(t){return S(t,X)?t[X]:{}},L=function(t){return S(t,X)}}var Z,tt,rt={set:W,get:k,has:L,enforce:function(t){return L(t)?k(t):W(t,{})},getterFor:function(t){return function(r){var n;if(!g(r)||(n=k(r)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}},nt=n((function(t){var r=rt.get,n=rt.enforce,e=String(String).split("String");(t.exports=function(t,r,i,u){var a,c=!!u&&!!u.unsafe,f=!!u&&!!u.enumerable,l=!!u&&!!u.noTargetGet;"function"==typeof i&&("string"!=typeof r||S(i,"name")||M(i,"name",r),(a=n(i)).source||(a.source=e.join("string"==typeof r?r:""))),t!==o?(c?!l&&t[r]&&(f=!0):delete t[r],f?t[r]=i:M(t,r,i)):f?t[r]=i:C(r,i)})(Function.prototype,"toString",(function(){return"function"==typeof this&&r(this).source||z(this)}))})),et=o,ot=function(t){return"function"==typeof t?t:void 0},it=function(t,r){return arguments.length<2?ot(et[t])||ot(o[t]):et[t]&&et[t][r]||o[t]&&o[t][r]},ut=Math.ceil,at=Math.floor,ct=function(t){return isNaN(t=+t)?0:(t>0?at:ut)(t)},ft=Math.min,lt=function(t){return t>0?ft(ct(t),9007199254740991):0},st=Math.max,pt=Math.min,vt=function(t){return function(r,n,e){var o,i=d(r),u=lt(i.length),a=function(t,r){var n=ct(t);return n<0?st(n+r,0):pt(n,r)}(e,u);if(t&&n!=n){for(;u>a;)if((o=i[a++])!=o)return!0}else for(;u>a;a++)if((t||a in i)&&i[a]===n)return t||a||0;return!t&&-1}},yt={includes:vt(!0),indexOf:vt(!1)}.indexOf,ht=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"].concat("length","prototype"),dt={f:Object.getOwnPropertyNames||function(t){return function(t,r){var n,e=d(t),o=0,i=[];for(n in e)!S(K,n)&&S(e,n)&&i.push(n);for(;r.length>o;)S(e,n=r[o++])&&(~yt(i,n)||i.push(n));return i}(t,ht)}},gt={f:Object.getOwnPropertySymbols},bt=it("Reflect","ownKeys")||function(t){var r=dt.f(E(t)),n=gt.f;return n?r.concat(n(t)):r},mt=function(t,r){for(var n=bt(r),e=P.f,o=A.f,i=0;i<n.length;i++){var u=n[i];S(t,u)||e(t,u,o(r,u))}},St=/#|\.prototype\./,wt=function(t,r){var n=jt[Ot(t)];return n==At||n!=xt&&("function"==typeof r?i(r):!!r)},Ot=wt.normalize=function(t){return String(t).replace(St,".").toLowerCase()},jt=wt.data={},xt=wt.NATIVE="N",At=wt.POLYFILL="P",Et=wt,Tt=A.f,Pt=function(t,r){var n,e,i,u,a,c=t.target,f=t.global,l=t.stat;if(n=f?o:l?o[c]||C(c,{}):(o[c]||{}).prototype)for(e in r){if(u=r[e],i=t.noTargetGet?(a=Tt(n,e))&&a.value:n[e],!Et(f?e:c+(l?".":"#")+e,t.forced)&&void 0!==i){if(typeof u==typeof i)continue;mt(u,i)}(t.sham||i&&i.sham)&&M(u,"sham",!0),nt(n,e,u,t)}},Mt=Array.isArray||function(t){return"Array"==p(t)},Ct=function(t){return Object(h(t))},It=function(t,r,n){var e=b(r);e in t?P.f(t,e,l(0,n)):t[e]=n},_t=!!Object.getOwnPropertySymbols&&!i((function(){return!String(Symbol())})),Ft=_t&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,Wt=q("wks"),kt=o.Symbol,Lt=Ft?kt:kt&&kt.withoutSetter||V,Nt=function(t){return S(Wt,t)||(_t&&S(kt,t)?Wt[t]=kt[t]:Wt[t]=Lt("Symbol."+t)),Wt[t]},zt=Nt("species"),Dt=function(t,r){var n;return Mt(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!Mt(n.prototype)?g(n)&&null===(n=n[zt])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===r?0:r)},$t=it("navigator","userAgent")||"",qt=o.process,Gt=qt&&qt.versions,Rt=Gt&&Gt.v8;Rt?tt=(Z=Rt.split("."))[0]+Z[1]:$t&&(!(Z=$t.match(/Edge\/(\d+)/))||Z[1]>=74)&&(Z=$t.match(/Chrome\/(\d+)/))&&(tt=Z[1]);var Vt,Bt=tt&&+tt,Kt=Nt("species"),Ut=Nt("isConcatSpreadable"),Yt=9007199254740991,Ht="Maximum allowed index exceeded",Jt=Bt>=51||!i((function(){var t=[];return t[Ut]=!1,t.concat()[0]!==t})),Qt=(Vt="concat",Bt>=51||!i((function(){var t=[];return(t.constructor={})[Kt]=function(){return{foo:1}},1!==t[Vt](Boolean).foo}))),Xt=function(t){if(!g(t))return!1;var r=t[Ut];return void 0!==r?!!r:Mt(t)};Pt({target:"Array",proto:!0,forced:!Jt||!Qt},{concat:function(t){var r,n,e,o,i,u=Ct(this),a=Dt(u,0),c=0;for(r=-1,e=arguments.length;r<e;r++)if(Xt(i=-1===r?u:arguments[r])){if(c+(o=lt(i.length))>Yt)throw TypeError(Ht);for(n=0;n<o;n++,c++)n in i&&It(a,c,i[n])}else{if(c>=Yt)throw TypeError(Ht);It(a,c++,i)}return a.length=c,a}});var Zt,tr=Nt("match"),rr=function(t){if(function(t){var r;return g(t)&&(void 0!==(r=t[tr])?!!r:"RegExp"==p(t))}(t))throw TypeError("The method doesn't accept regular expressions");return t},nr=Nt("match"),er=A.f,or="".startsWith,ir=Math.min,ur=function(t){var r=/./;try{"/./"[t](r)}catch(n){try{return r[nr]=!1,"/./"[t](r)}catch(t){}}return!1}("startsWith");function ar(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,e=new Array(r);n<r;n++)e[n]=t[n];return e}function cr(t,r){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,r){if(t){if("string"==typeof t)return ar(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ar(t,r):void 0}}(t))||r&&t&&"number"==typeof t.length){n&&(t=n);var e=0;return function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=t[Symbol.iterator]()).next.bind(n)}Pt({target:"String",proto:!0,forced:!!(ur||(Zt=er(String.prototype,"startsWith"),!Zt||Zt.writable))&&!ur},{startsWith:function(t){var r=String(h(this));rr(t);var n=lt(ir(arguments.length>1?arguments[1]:void 0,r.length)),e=String(t);return or?or.call(r,e,n):r.slice(n,n+e.length)===e}});var fr="data-on-",lr=fr.length,sr=function(t,r,n,e){var o=function(t,r){var n="with(context) { return "+r+" }";if(t[r]){var e=new Function("context",n)(t);return function(){e.apply(t,arguments)}}var o=new Function("context","$event",n);return function(r){return o.call(t,t,r)}}(e,n);t.addEventListener(r,o)},pr=function t(r,n,e){void 0===e&&(e=!1),e||n(r,!1);for(var o=r.firstElementChild;o;){if(!o.hasAttribute("data-very-ignore")){var i=o.hasAttribute("data-component");n(o,i),!i&&t(o,n,!0)}o=o.nextElementSibling}},vr={},yr=function(t,r,n){var e;void 0===r&&(r=null),void 0===n&&(n=!1),r=null!=(e=r)?e:function(t){return vr[t.dataset.component]}(t);var o=[],i={};pr(t,(function(t,r){var n=t.dataset.ref;if(n){var e=i[n];i[n]=e?Array.isArray(e)?e.concat(e,t):[e,t]:t}if(!r){var u=function(t){for(var r=[],n=t.attributes.length,e=0;e<n;e++){var o=t.attributes[e],i=o.nodeName,u=o.nodeValue;i.startsWith(fr)&&r.push({el:t,event:i.substring(lr),expression:u})}return r.length&&r}(t);u&&o.push(u)}}));var u=r({el:t,refs:i});!function(t,r){for(var n,e=cr(t);!(n=e()).done;){var o=n.value,i=o.el,u=o.event,a=o.expression;sr(i,u,a,r)}}(o,u),t.$very=u,n||hr(t)},hr=function(t){for(var r in vr)for(var n=t.querySelectorAll("[data-component='"+r+"']"),e=0;e<n.length;e++){var o=n[e];yr(o,vr[r],!0)}};return t.mountComponent=yr,t.mountComponents=function(t){void 0===t&&(t=document.body),hr(t)},t.registerComponent=function(t,r){return vr[t]=r,r},Object.defineProperty(t,"__esModule",{value:!0}),t}({});