var very=function(t){"use strict";var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function r(t){var n={exports:{}};return t(n,n.exports),n.exports}var e=function(t){return t&&t.Math==Math&&t},o=e("object"==typeof globalThis&&globalThis)||e("object"==typeof window&&window)||e("object"==typeof self&&self)||e("object"==typeof n&&n)||function(){return this}()||Function("return this")(),i=function(t){try{return!!t()}catch(t){return!0}},u=!i((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),c={}.propertyIsEnumerable,a=Object.getOwnPropertyDescriptor,f={f:a&&!c.call({1:2},1)?function(t){var n=a(this,t);return!!n&&n.enumerable}:c},l=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}},s={}.toString,p=function(t){return s.call(t).slice(8,-1)},y="".split,v=i((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==p(t)?y.call(t,""):Object(t)}:Object,h=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t},d=function(t){return v(h(t))},g=function(t){return"object"==typeof t?null!==t:"function"==typeof t},b=function(t,n){if(!g(t))return t;var r,e;if(n&&"function"==typeof(r=t.toString)&&!g(e=r.call(t)))return e;if("function"==typeof(r=t.valueOf)&&!g(e=r.call(t)))return e;if(!n&&"function"==typeof(r=t.toString)&&!g(e=r.call(t)))return e;throw TypeError("Can't convert object to primitive value")},m={}.hasOwnProperty,w=function(t,n){return m.call(t,n)},S=o.document,O=g(S)&&g(S.createElement),j=!u&&!i((function(){return 7!=Object.defineProperty((t="div",O?S.createElement(t):{}),"a",{get:function(){return 7}}).a;var t})),E=Object.getOwnPropertyDescriptor,x={f:u?E:function(t,n){if(t=d(t),n=b(n,!0),j)try{return E(t,n)}catch(t){}if(w(t,n))return l(!f.f.call(t,n),t[n])}},T=function(t){if(!g(t))throw TypeError(String(t)+" is not an object");return t},A=Object.defineProperty,P={f:u?A:function(t,n,r){if(T(t),n=b(n,!0),T(r),j)try{return A(t,n,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return"value"in r&&(t[n]=r.value),t}},M=u?function(t,n,r){return P.f(t,n,l(1,r))}:function(t,n,r){return t[n]=r,t},C=function(t,n){try{M(o,t,n)}catch(r){o[t]=n}return n},_="__core-js_shared__",k=o[_]||C(_,{}),F=Function.toString;"function"!=typeof k.inspectSource&&(k.inspectSource=function(t){return F.call(t)});var W,I,L,N,q=k.inspectSource,z=o.WeakMap,D="function"==typeof z&&/native code/.test(q(z)),G=r((function(t){(t.exports=function(t,n){return k[t]||(k[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.8.3",mode:"global",copyright:"© 2021 Denis Pushkarev (zloirock.ru)"})})),R=0,V=Math.random(),B=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++R+V).toString(36)},K=G("keys"),Y={},$=o.WeakMap;if(D){var H=k.state||(k.state=new $),J=H.get,Q=H.has,U=H.set;W=function(t,n){return n.facade=t,U.call(H,t,n),n},I=function(t){return J.call(H,t)||{}},L=function(t){return Q.call(H,t)}}else{var X=K[N="state"]||(K[N]=B(N));Y[X]=!0,W=function(t,n){return n.facade=t,M(t,X,n),n},I=function(t){return w(t,X)?t[X]:{}},L=function(t){return w(t,X)}}var Z,tt={set:W,get:I,has:L,enforce:function(t){return L(t)?I(t):W(t,{})},getterFor:function(t){return function(n){var r;if(!g(n)||(r=I(n)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return r}}},nt=r((function(t){var n=tt.get,r=tt.enforce,e=String(String).split("String");(t.exports=function(t,n,i,u){var c,a=!!u&&!!u.unsafe,f=!!u&&!!u.enumerable,l=!!u&&!!u.noTargetGet;"function"==typeof i&&("string"!=typeof n||w(i,"name")||M(i,"name",n),(c=r(i)).source||(c.source=e.join("string"==typeof n?n:""))),t!==o?(a?!l&&t[n]&&(f=!0):delete t[n],f?t[n]=i:M(t,n,i)):f?t[n]=i:C(n,i)})(Function.prototype,"toString",(function(){return"function"==typeof this&&n(this).source||q(this)}))})),rt=o,et=function(t){return"function"==typeof t?t:void 0},ot=function(t,n){return arguments.length<2?et(rt[t])||et(o[t]):rt[t]&&rt[t][n]||o[t]&&o[t][n]},it=Math.ceil,ut=Math.floor,ct=function(t){return isNaN(t=+t)?0:(t>0?ut:it)(t)},at=Math.min,ft=function(t){return t>0?at(ct(t),9007199254740991):0},lt=Math.max,st=Math.min,pt=function(t){return function(n,r,e){var o,i=d(n),u=ft(i.length),c=function(t,n){var r=ct(t);return r<0?lt(r+n,0):st(r,n)}(e,u);if(t&&r!=r){for(;u>c;)if((o=i[c++])!=o)return!0}else for(;u>c;c++)if((t||c in i)&&i[c]===r)return t||c||0;return!t&&-1}},yt={includes:pt(!0),indexOf:pt(!1)}.indexOf,vt=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"].concat("length","prototype"),ht={f:Object.getOwnPropertyNames||function(t){return function(t,n){var r,e=d(t),o=0,i=[];for(r in e)!w(Y,r)&&w(e,r)&&i.push(r);for(;n.length>o;)w(e,r=n[o++])&&(~yt(i,r)||i.push(r));return i}(t,vt)}},dt={f:Object.getOwnPropertySymbols},gt=ot("Reflect","ownKeys")||function(t){var n=ht.f(T(t)),r=dt.f;return r?n.concat(r(t)):n},bt=function(t,n){for(var r=gt(n),e=P.f,o=x.f,i=0;i<r.length;i++){var u=r[i];w(t,u)||e(t,u,o(n,u))}},mt=/#|\.prototype\./,wt=function(t,n){var r=Ot[St(t)];return r==Et||r!=jt&&("function"==typeof n?i(n):!!n)},St=wt.normalize=function(t){return String(t).replace(mt,".").toLowerCase()},Ot=wt.data={},jt=wt.NATIVE="N",Et=wt.POLYFILL="P",xt=wt,Tt=x.f,At=function(t,n){var r,e,i,u,c,a=t.target,f=t.global,l=t.stat;if(r=f?o:l?o[a]||C(a,{}):(o[a]||{}).prototype)for(e in n){if(u=n[e],i=t.noTargetGet?(c=Tt(r,e))&&c.value:r[e],!xt(f?e:a+(l?".":"#")+e,t.forced)&&void 0!==i){if(typeof u==typeof i)continue;bt(u,i)}(t.sham||i&&i.sham)&&M(u,"sham",!0),nt(r,e,u,t)}},Pt=!!Object.getOwnPropertySymbols&&!i((function(){return!String(Symbol())})),Mt=Pt&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,Ct=G("wks"),_t=o.Symbol,kt=Mt?_t:_t&&_t.withoutSetter||B,Ft=function(t){return w(Ct,t)||(Pt&&w(_t,t)?Ct[t]=_t[t]:Ct[t]=kt("Symbol."+t)),Ct[t]},Wt=Ft("match"),It=function(t){if(function(t){var n;return g(t)&&(void 0!==(n=t[Wt])?!!n:"RegExp"==p(t))}(t))throw TypeError("The method doesn't accept regular expressions");return t},Lt=Ft("match"),Nt=x.f,qt="".startsWith,zt=Math.min,Dt=function(t){var n=/./;try{"/./"[t](n)}catch(r){try{return n[Lt]=!1,"/./"[t](n)}catch(t){}}return!1}("startsWith");At({target:"String",proto:!0,forced:!!(Dt||(Z=Nt(String.prototype,"startsWith"),!Z||Z.writable))&&!Dt},{startsWith:function(t){var n=String(h(this));It(t);var r=ft(zt(arguments.length>1?arguments[1]:void 0,n.length)),e=String(t);return qt?qt.call(n,e,r):n.slice(r,r+e.length)===e}});var Gt,Rt,Vt="data-on-",Bt=Vt.length,Kt=function(t,n,r,e){var o=function(t,n){var r="with(context) { return "+n+" }";if(t[n]){var e=new Function("context",r)(t);return function(){e.apply(t,arguments)}}var o=new Function("context","$event",r);return function(n){return o.call(t,t,n)}}(e,r);t.addEventListener(n,o)},Yt=Array.isArray||function(t){return"Array"==p(t)},$t=function(t){return Object(h(t))},Ht=function(t,n,r){var e=b(n);e in t?P.f(t,e,l(0,r)):t[e]=r},Jt=Ft("species"),Qt=function(t,n){var r;return Yt(t)&&("function"!=typeof(r=t.constructor)||r!==Array&&!Yt(r.prototype)?g(r)&&null===(r=r[Jt])&&(r=void 0):r=void 0),new(void 0===r?Array:r)(0===n?0:n)},Ut=ot("navigator","userAgent")||"",Xt=o.process,Zt=Xt&&Xt.versions,tn=Zt&&Zt.v8;tn?Rt=(Gt=tn.split("."))[0]+Gt[1]:Ut&&(!(Gt=Ut.match(/Edge\/(\d+)/))||Gt[1]>=74)&&(Gt=Ut.match(/Chrome\/(\d+)/))&&(Rt=Gt[1]);var nn,rn=Rt&&+Rt,en=Ft("species"),on=Ft("isConcatSpreadable"),un=9007199254740991,cn="Maximum allowed index exceeded",an=rn>=51||!i((function(){var t=[];return t[on]=!1,t.concat()[0]!==t})),fn=(nn="concat",rn>=51||!i((function(){var t=[];return(t.constructor={})[en]=function(){return{foo:1}},1!==t[nn](Boolean).foo}))),ln=function(t){if(!g(t))return!1;var n=t[on];return void 0!==n?!!n:Yt(t)};At({target:"Array",proto:!0,forced:!an||!fn},{concat:function(t){var n,r,e,o,i,u=$t(this),c=Qt(u,0),a=0;for(n=-1,e=arguments.length;n<e;n++)if(ln(i=-1===n?u:arguments[n])){if(a+(o=ft(i.length))>un)throw TypeError(cn);for(r=0;r<o;r++,a++)r in i&&Ht(c,a,i[r])}else{if(a>=un)throw TypeError(cn);Ht(c,a++,i)}return c.length=a,c}});var sn=function t(n,r,e){void 0===e&&(e=!1),e||r(n);for(var o=n.firstElementChild;o;)o.hasAttribute("data-component")||o.hasAttribute("data-very-ignore")||(o.style.backgroundColor="yellow",r(o),t(o,r,!0)),o=o.nextElementSibling},pn={},yn=function(t,n,r){var e;void 0===n&&(n=null),void 0===r&&(r=!1);var o=function(t){for(var n={},r=t.querySelectorAll("[data-ref]"),e=0;e<r.length;e++){var o=r[e],i=o.dataset.ref,u=n[i];n[i]=u?Array.isArray(u)?u.concat(u,o):[u,o]:o}return n}(t),i=(n=null!=(e=n)?e:function(t){return pn[t.dataset.component]}(t))({el:t,refs:o});sn(t,(function(t){return function(t,n){for(var r=t.attributes.length,e=0;e<r;e++){var o=t.attributes[e],i=o.nodeName,u=o.nodeValue;i.startsWith(Vt)&&Kt(t,i.substring(Bt),u,n)}}(t,i)})),r||vn(t)},vn=function(t){for(var n in pn)for(var r=t.querySelectorAll("[data-component='"+n+"']"),e=0;e<r.length;e++){var o=r[e];yn(o,pn[n],!0)}};return t.mountComponent=yn,t.mountComponents=function(t){void 0===t&&(t=document.body),vn(t)},t.registerComponent=function(t,n){return pn[t]=n,n},Object.defineProperty(t,"__esModule",{value:!0}),t}({});
