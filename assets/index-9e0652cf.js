(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))h(l);new MutationObserver(l=>{for(const p of l)if(p.type==="childList")for(const d of p.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&h(d)}).observe(document,{childList:!0,subtree:!0});function f(l){const p={};return l.integrity&&(p.integrity=l.integrity),l.referrerPolicy&&(p.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?p.credentials="include":l.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function h(l){if(l.ep)return;l.ep=!0;const p=f(l);fetch(l.href,p)}})();const V={};function he(i){V.context=i}const ae=(i,s)=>i===s,Ot={equals:ae};let Wt=Vt;const j=1,ut=2,Yt={owned:null,cleanups:null,context:null,owner:null};var k=null;let z=null,_=null,b=null,W=null,at=0;function pe(i,s){const f=_,h=k,l=i.length===0,p=l?Yt:{owned:null,cleanups:null,context:null,owner:s===void 0?h:s},d=l?i:()=>i(()=>Ut(()=>dt(p)));k=p,_=null;try{return nt(d,!0)}finally{_=f,k=h}}function Z(i,s){s=s?Object.assign({},Ot,s):Ot;const f={value:i,observers:null,observerSlots:null,comparator:s.equals||void 0},h=l=>(typeof l=="function"&&(l=l(f.value)),jt(f,l));return[de.bind(f),h]}function rt(i,s,f){const h=qt(i,s,!1,j);pt(h)}function ft(i,s,f){Wt=ge;const h=qt(i,s,!1,j);h.user=!0,W?W.push(h):pt(h)}function Ut(i){if(_===null)return i();const s=_;_=null;try{return i()}finally{_=s}}function de(){const i=z;if(this.sources&&(this.state||i))if(this.state===j||i)pt(this);else{const s=b;b=null,nt(()=>lt(this),!1),b=s}if(_){const s=this.observers?this.observers.length:0;_.sources?(_.sources.push(this),_.sourceSlots.push(s)):(_.sources=[this],_.sourceSlots=[s]),this.observers?(this.observers.push(_),this.observerSlots.push(_.sources.length-1)):(this.observers=[_],this.observerSlots=[_.sources.length-1])}return this.value}function jt(i,s,f){let h=i.value;return(!i.comparator||!i.comparator(h,s))&&(i.value=s,i.observers&&i.observers.length&&nt(()=>{for(let l=0;l<i.observers.length;l+=1){const p=i.observers[l],d=z&&z.running;d&&z.disposed.has(p),(d&&!p.tState||!d&&!p.state)&&(p.pure?b.push(p):W.push(p),p.observers&&zt(p)),d||(p.state=j)}if(b.length>1e6)throw b=[],new Error},!1)),s}function pt(i){if(!i.fn)return;dt(i);const s=k,f=_,h=at;_=k=i,ye(i,i.value,h),_=f,k=s}function ye(i,s,f){let h;try{h=i.fn(s)}catch(l){return i.pure&&(i.state=j,i.owned&&i.owned.forEach(dt),i.owned=null),i.updatedAt=f+1,Jt(l)}(!i.updatedAt||i.updatedAt<=f)&&(i.updatedAt!=null&&"observers"in i?jt(i,h):i.value=h,i.updatedAt=f)}function qt(i,s,f,h=j,l){const p={fn:i,state:h,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:s,owner:k,context:null,pure:f};return k===null||k!==Yt&&(k.owned?k.owned.push(p):k.owned=[p]),p}function ct(i){const s=z;if(i.state===0||s)return;if(i.state===ut||s)return lt(i);if(i.suspense&&Ut(i.suspense.inFallback))return i.suspense.effects.push(i);const f=[i];for(;(i=i.owner)&&(!i.updatedAt||i.updatedAt<at);)(i.state||s)&&f.push(i);for(let h=f.length-1;h>=0;h--)if(i=f[h],i.state===j||s)pt(i);else if(i.state===ut||s){const l=b;b=null,nt(()=>lt(i,f[0]),!1),b=l}}function nt(i,s){if(b)return i();let f=!1;s||(b=[]),W?f=!0:W=[],at++;try{const h=i();return we(f),h}catch(h){f||(W=null),b=null,Jt(h)}}function we(i){if(b&&(Vt(b),b=null),i)return;const s=W;W=null,s.length&&nt(()=>Wt(s),!1)}function Vt(i){for(let s=0;s<i.length;s++)ct(i[s])}function ge(i){let s,f=0;for(s=0;s<i.length;s++){const h=i[s];h.user?i[f++]=h:ct(h)}for(V.context&&he(),s=0;s<f;s++)ct(i[s])}function lt(i,s){const f=z;i.state=0;for(let h=0;h<i.sources.length;h+=1){const l=i.sources[h];l.sources&&(l.state===j||f?l!==s&&(!l.updatedAt||l.updatedAt<at)&&ct(l):(l.state===ut||f)&&lt(l,s))}}function zt(i){const s=z;for(let f=0;f<i.observers.length;f+=1){const h=i.observers[f];(!h.state||s)&&(h.state=ut,h.pure?b.push(h):W.push(h),h.observers&&zt(h))}}function dt(i){let s;if(i.sources)for(;i.sources.length;){const f=i.sources.pop(),h=i.sourceSlots.pop(),l=f.observers;if(l&&l.length){const p=l.pop(),d=f.observerSlots.pop();h<l.length&&(p.sourceSlots[d]=h,l[h]=p,f.observerSlots[h]=d)}}if(i.owned){for(s=0;s<i.owned.length;s++)dt(i.owned[s]);i.owned=null}if(i.cleanups){for(s=0;s<i.cleanups.length;s++)i.cleanups[s]();i.cleanups=null}i.state=0,i.context=null}function xe(i){return i instanceof Error||typeof i=="string"?i:new Error("Unknown error")}function Jt(i){throw i=xe(i),i}function me(i,s){return Ut(()=>i(s||{}))}function Be(i,s,f){let h=f.length,l=s.length,p=h,d=0,o=0,y=s[l-1].nextSibling,m=null;for(;d<l||o<p;){if(s[d]===f[o]){d++,o++;continue}for(;s[l-1]===f[p-1];)l--,p--;if(l===d){const g=p<h?o?f[o-1].nextSibling:f[p-o]:y;for(;o<p;)i.insertBefore(f[o++],g)}else if(p===o)for(;d<l;)(!m||!m.has(s[d]))&&s[d].remove(),d++;else if(s[d]===f[p-1]&&f[o]===s[l-1]){const g=s[--l].nextSibling;i.insertBefore(f[o++],s[d++].nextSibling),i.insertBefore(f[--p],g),s[l]=f[p]}else{if(!m){m=new Map;let B=o;for(;B<p;)m.set(f[B],B++)}const g=m.get(s[d]);if(g!=null)if(o<g&&g<p){let B=d,R=1,x;for(;++B<l&&B<p&&!((x=m.get(s[B]))==null||x!==g+R);)R++;if(R>g-o){const $=s[d];for(;o<g;)i.insertBefore(f[o++],$)}else i.replaceChild(f[o++],s[d++])}else d++;else s[d++].remove()}}}function Ee(i,s,f,h={}){let l;return pe(p=>{l=p,s===document?i():Xt(s,i(),s.firstChild?null:void 0,f)},h.owner),()=>{l(),s.textContent=""}}function yt(i,s,f){const h=document.createElement("template");if(h.innerHTML=i,s&&h.innerHTML.split("<").length-1!==s)throw`The browser resolved template HTML does not match JSX input:
${h.innerHTML}

${i}. Is your HTML properly formed?`;let l=h.content.firstChild;return f&&(l=l.firstChild),l}function Ie(i,s,f){f==null?i.removeAttribute(s):i.setAttribute(s,f)}function Et(i,s){s==null?i.removeAttribute("class"):i.className=s}function Xt(i,s,f,h){if(f!==void 0&&!h&&(h=[]),typeof s!="function")return ht(i,s,h,f);rt(l=>ht(i,s(),l,f),h)}function ht(i,s,f,h,l){for(V.context&&!f&&(f=[...i.childNodes]);typeof f=="function";)f=f();if(s===f)return f;const p=typeof s,d=h!==void 0;if(i=d&&f[0]&&f[0].parentNode||i,p==="string"||p==="number"){if(V.context)return f;if(p==="number"&&(s=s.toString()),d){let o=f[0];o&&o.nodeType===3?o.data=s:o=document.createTextNode(s),f=K(i,f,h,o)}else f!==""&&typeof f=="string"?f=i.firstChild.data=s:f=i.textContent=s}else if(s==null||p==="boolean"){if(V.context)return f;f=K(i,f,h)}else{if(p==="function")return rt(()=>{let o=s();for(;typeof o=="function";)o=o();f=ht(i,o,f,h)}),()=>f;if(Array.isArray(s)){const o=[],y=f&&Array.isArray(f);if(Ft(o,s,f,l))return rt(()=>f=ht(i,o,f,h,!0)),()=>f;if(V.context){if(!o.length)return f;for(let m=0;m<o.length;m++)if(o[m].parentNode)return f=o}if(o.length===0){if(f=K(i,f,h),d)return f}else y?f.length===0?Ht(i,o,h):Be(i,f,o):(f&&K(i),Ht(i,o));f=o}else if(s instanceof Node){if(V.context&&s.parentNode)return f=d?[s]:s;if(Array.isArray(f)){if(d)return f=K(i,f,h,s);K(i,f,null,s)}else f==null||f===""||!i.firstChild?i.appendChild(s):i.replaceChild(s,i.firstChild);f=s}else console.warn("Unrecognized value. Skipped inserting",s)}return f}function Ft(i,s,f,h){let l=!1;for(let p=0,d=s.length;p<d;p++){let o=s[p],y=f&&f[p];if(o instanceof Node)i.push(o);else if(!(o==null||o===!0||o===!1))if(Array.isArray(o))l=Ft(i,o,y)||l;else if(typeof o=="function")if(h){for(;typeof o=="function";)o=o();l=Ft(i,Array.isArray(o)?o:[o],Array.isArray(y)?y:[y])||l}else i.push(o),l=!0;else{const m=String(o);m==="<!>"?y&&y.nodeType===8&&i.push(y):y&&y.nodeType===3&&y.data===m?i.push(y):i.push(document.createTextNode(m))}}return l}function Ht(i,s,f=null){for(let h=0,l=s.length;h<l;h++)i.insertBefore(s[h],f)}function K(i,s,f,h){if(f===void 0)return i.textContent="";const l=h||document.createTextNode("");if(s.length){let p=!1;for(let d=s.length-1;d>=0;d--){const o=s[d];if(l!==o){const y=o.parentNode===i;!p&&!d?y?i.replaceChild(l,o):i.insertBefore(l,f):y&&o.remove()}else p=!0}}else i.insertBefore(l,f);return[l]}var Kt={},wt={};wt.byteLength=Ue;wt.toByteArray=Se;wt.fromByteArray=Re;var G=[],P=[],Ae=typeof Uint8Array<"u"?Uint8Array:Array,It="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var Q=0,Fe=It.length;Q<Fe;++Q)G[Q]=It[Q],P[It.charCodeAt(Q)]=Q;P["-".charCodeAt(0)]=62;P["_".charCodeAt(0)]=63;function Qt(i){var s=i.length;if(s%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var f=i.indexOf("=");f===-1&&(f=s);var h=f===s?0:4-f%4;return[f,h]}function Ue(i){var s=Qt(i),f=s[0],h=s[1];return(f+h)*3/4-h}function Te(i,s,f){return(s+f)*3/4-f}function Se(i){var s,f=Qt(i),h=f[0],l=f[1],p=new Ae(Te(i,h,l)),d=0,o=l>0?h-4:h,y;for(y=0;y<o;y+=4)s=P[i.charCodeAt(y)]<<18|P[i.charCodeAt(y+1)]<<12|P[i.charCodeAt(y+2)]<<6|P[i.charCodeAt(y+3)],p[d++]=s>>16&255,p[d++]=s>>8&255,p[d++]=s&255;return l===2&&(s=P[i.charCodeAt(y)]<<2|P[i.charCodeAt(y+1)]>>4,p[d++]=s&255),l===1&&(s=P[i.charCodeAt(y)]<<10|P[i.charCodeAt(y+1)]<<4|P[i.charCodeAt(y+2)]>>2,p[d++]=s>>8&255,p[d++]=s&255),p}function _e(i){return G[i>>18&63]+G[i>>12&63]+G[i>>6&63]+G[i&63]}function Ce(i,s,f){for(var h,l=[],p=s;p<f;p+=3)h=(i[p]<<16&16711680)+(i[p+1]<<8&65280)+(i[p+2]&255),l.push(_e(h));return l.join("")}function Re(i){for(var s,f=i.length,h=f%3,l=[],p=16383,d=0,o=f-h;d<o;d+=p)l.push(Ce(i,d,d+p>o?o:d+p));return h===1?(s=i[f-1],l.push(G[s>>2]+G[s<<4&63]+"==")):h===2&&(s=(i[f-2]<<8)+i[f-1],l.push(G[s>>10]+G[s>>4&63]+G[s<<2&63]+"=")),l.join("")}var Tt={};/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */Tt.read=function(i,s,f,h,l){var p,d,o=l*8-h-1,y=(1<<o)-1,m=y>>1,g=-7,B=f?l-1:0,R=f?-1:1,x=i[s+B];for(B+=R,p=x&(1<<-g)-1,x>>=-g,g+=o;g>0;p=p*256+i[s+B],B+=R,g-=8);for(d=p&(1<<-g)-1,p>>=-g,g+=h;g>0;d=d*256+i[s+B],B+=R,g-=8);if(p===0)p=1-m;else{if(p===y)return d?NaN:(x?-1:1)*(1/0);d=d+Math.pow(2,h),p=p-m}return(x?-1:1)*d*Math.pow(2,p-h)};Tt.write=function(i,s,f,h,l,p){var d,o,y,m=p*8-l-1,g=(1<<m)-1,B=g>>1,R=l===23?Math.pow(2,-24)-Math.pow(2,-77):0,x=h?0:p-1,$=h?1:-1,I=s<0||s===0&&1/s<0?1:0;for(s=Math.abs(s),isNaN(s)||s===1/0?(o=isNaN(s)?1:0,d=g):(d=Math.floor(Math.log(s)/Math.LN2),s*(y=Math.pow(2,-d))<1&&(d--,y*=2),d+B>=1?s+=R/y:s+=R*Math.pow(2,1-B),s*y>=2&&(d++,y/=2),d+B>=g?(o=0,d=g):d+B>=1?(o=(s*y-1)*Math.pow(2,l),d=d+B):(o=s*Math.pow(2,B-1)*Math.pow(2,l),d=0));l>=8;i[f+x]=o&255,x+=$,o/=256,l-=8);for(d=d<<l|o,m+=l;m>0;i[f+x]=d&255,x+=$,d/=256,m-=8);i[f+x-$]|=I*128};/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */(function(i){const s=wt,f=Tt,h=typeof Symbol=="function"&&typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):null;i.Buffer=o,i.SlowBuffer=D,i.INSPECT_MAX_BYTES=50;const l=2147483647;i.kMaxLength=l,o.TYPED_ARRAY_SUPPORT=p(),!o.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error=="function"&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function p(){try{const r=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(r,t),r.foo()===42}catch{return!1}}Object.defineProperty(o.prototype,"parent",{enumerable:!0,get:function(){if(o.isBuffer(this))return this.buffer}}),Object.defineProperty(o.prototype,"offset",{enumerable:!0,get:function(){if(o.isBuffer(this))return this.byteOffset}});function d(r){if(r>l)throw new RangeError('The value "'+r+'" is invalid for option "size"');const t=new Uint8Array(r);return Object.setPrototypeOf(t,o.prototype),t}function o(r,t,e){if(typeof r=="number"){if(typeof t=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return B(r)}return y(r,t,e)}o.poolSize=8192;function y(r,t,e){if(typeof r=="string")return R(r,t);if(ArrayBuffer.isView(r))return $(r);if(r==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof r);if(H(r,ArrayBuffer)||r&&H(r.buffer,ArrayBuffer)||typeof SharedArrayBuffer<"u"&&(H(r,SharedArrayBuffer)||r&&H(r.buffer,SharedArrayBuffer)))return I(r,t,e);if(typeof r=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');const n=r.valueOf&&r.valueOf();if(n!=null&&n!==r)return o.from(n,t,e);const u=S(r);if(u)return u;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof r[Symbol.toPrimitive]=="function")return o.from(r[Symbol.toPrimitive]("string"),t,e);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof r)}o.from=function(r,t,e){return y(r,t,e)},Object.setPrototypeOf(o.prototype,Uint8Array.prototype),Object.setPrototypeOf(o,Uint8Array);function m(r){if(typeof r!="number")throw new TypeError('"size" argument must be of type number');if(r<0)throw new RangeError('The value "'+r+'" is invalid for option "size"')}function g(r,t,e){return m(r),r<=0?d(r):t!==void 0?typeof e=="string"?d(r).fill(t,e):d(r).fill(t):d(r)}o.alloc=function(r,t,e){return g(r,t,e)};function B(r){return m(r),d(r<0?0:F(r)|0)}o.allocUnsafe=function(r){return B(r)},o.allocUnsafeSlow=function(r){return B(r)};function R(r,t){if((typeof t!="string"||t==="")&&(t="utf8"),!o.isEncoding(t))throw new TypeError("Unknown encoding: "+t);const e=q(r,t)|0;let n=d(e);const u=n.write(r,t);return u!==e&&(n=n.slice(0,u)),n}function x(r){const t=r.length<0?0:F(r.length)|0,e=d(t);for(let n=0;n<t;n+=1)e[n]=r[n]&255;return e}function $(r){if(H(r,Uint8Array)){const t=new Uint8Array(r);return I(t.buffer,t.byteOffset,t.byteLength)}return x(r)}function I(r,t,e){if(t<0||r.byteLength<t)throw new RangeError('"offset" is outside of buffer bounds');if(r.byteLength<t+(e||0))throw new RangeError('"length" is outside of buffer bounds');let n;return t===void 0&&e===void 0?n=new Uint8Array(r):e===void 0?n=new Uint8Array(r,t):n=new Uint8Array(r,t,e),Object.setPrototypeOf(n,o.prototype),n}function S(r){if(o.isBuffer(r)){const t=F(r.length)|0,e=d(t);return e.length===0||r.copy(e,0,0,t),e}if(r.length!==void 0)return typeof r.length!="number"||Bt(r.length)?d(0):x(r);if(r.type==="Buffer"&&Array.isArray(r.data))return x(r.data)}function F(r){if(r>=l)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+l.toString(16)+" bytes");return r|0}function D(r){return+r!=r&&(r=0),o.alloc(+r)}o.isBuffer=function(t){return t!=null&&t._isBuffer===!0&&t!==o.prototype},o.compare=function(t,e){if(H(t,Uint8Array)&&(t=o.from(t,t.offset,t.byteLength)),H(e,Uint8Array)&&(e=o.from(e,e.offset,e.byteLength)),!o.isBuffer(t)||!o.isBuffer(e))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;let n=t.length,u=e.length;for(let c=0,a=Math.min(n,u);c<a;++c)if(t[c]!==e[c]){n=t[c],u=e[c];break}return n<u?-1:u<n?1:0},o.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(t.length===0)return o.alloc(0);let n;if(e===void 0)for(e=0,n=0;n<t.length;++n)e+=t[n].length;const u=o.allocUnsafe(e);let c=0;for(n=0;n<t.length;++n){let a=t[n];if(H(a,Uint8Array))c+a.length>u.length?(o.isBuffer(a)||(a=o.from(a)),a.copy(u,c)):Uint8Array.prototype.set.call(u,a,c);else if(o.isBuffer(a))a.copy(u,c);else throw new TypeError('"list" argument must be an Array of Buffers');c+=a.length}return u};function q(r,t){if(o.isBuffer(r))return r.length;if(ArrayBuffer.isView(r)||H(r,ArrayBuffer))return r.byteLength;if(typeof r!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof r);const e=r.length,n=arguments.length>2&&arguments[2]===!0;if(!n&&e===0)return 0;let u=!1;for(;;)switch(t){case"ascii":case"latin1":case"binary":return e;case"utf8":case"utf-8":return mt(r).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return e*2;case"hex":return e>>>1;case"base64":return Dt(r).length;default:if(u)return n?-1:mt(r).length;t=(""+t).toLowerCase(),u=!0}}o.byteLength=q;function v(r,t,e){let n=!1;if((t===void 0||t<0)&&(t=0),t>this.length||((e===void 0||e>this.length)&&(e=this.length),e<=0)||(e>>>=0,t>>>=0,e<=t))return"";for(r||(r="utf8");;)switch(r){case"hex":return re(this,t,e);case"utf8":case"utf-8":return Ct(this,t,e);case"ascii":return te(this,t,e);case"latin1":case"binary":return ee(this,t,e);case"base64":return Zt(this,t,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ne(this,t,e);default:if(n)throw new TypeError("Unknown encoding: "+r);r=(r+"").toLowerCase(),n=!0}}o.prototype._isBuffer=!0;function O(r,t,e){const n=r[t];r[t]=r[e],r[e]=n}o.prototype.swap16=function(){const t=this.length;if(t%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let e=0;e<t;e+=2)O(this,e,e+1);return this},o.prototype.swap32=function(){const t=this.length;if(t%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let e=0;e<t;e+=4)O(this,e,e+3),O(this,e+1,e+2);return this},o.prototype.swap64=function(){const t=this.length;if(t%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let e=0;e<t;e+=8)O(this,e,e+7),O(this,e+1,e+6),O(this,e+2,e+5),O(this,e+3,e+4);return this},o.prototype.toString=function(){const t=this.length;return t===0?"":arguments.length===0?Ct(this,0,t):v.apply(this,arguments)},o.prototype.toLocaleString=o.prototype.toString,o.prototype.equals=function(t){if(!o.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t?!0:o.compare(this,t)===0},o.prototype.inspect=function(){let t="";const e=i.INSPECT_MAX_BYTES;return t=this.toString("hex",0,e).replace(/(.{2})/g,"$1 ").trim(),this.length>e&&(t+=" ... "),"<Buffer "+t+">"},h&&(o.prototype[h]=o.prototype.inspect),o.prototype.compare=function(t,e,n,u,c){if(H(t,Uint8Array)&&(t=o.from(t,t.offset,t.byteLength)),!o.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(e===void 0&&(e=0),n===void 0&&(n=t?t.length:0),u===void 0&&(u=0),c===void 0&&(c=this.length),e<0||n>t.length||u<0||c>this.length)throw new RangeError("out of range index");if(u>=c&&e>=n)return 0;if(u>=c)return-1;if(e>=n)return 1;if(e>>>=0,n>>>=0,u>>>=0,c>>>=0,this===t)return 0;let a=c-u,w=n-e;const U=Math.min(a,w),A=this.slice(u,c),T=t.slice(e,n);for(let E=0;E<U;++E)if(A[E]!==T[E]){a=A[E],w=T[E];break}return a<w?-1:w<a?1:0};function it(r,t,e,n,u){if(r.length===0)return-1;if(typeof e=="string"?(n=e,e=0):e>2147483647?e=2147483647:e<-2147483648&&(e=-2147483648),e=+e,Bt(e)&&(e=u?0:r.length-1),e<0&&(e=r.length+e),e>=r.length){if(u)return-1;e=r.length-1}else if(e<0)if(u)e=0;else return-1;if(typeof t=="string"&&(t=o.from(t,n)),o.isBuffer(t))return t.length===0?-1:ot(r,t,e,n,u);if(typeof t=="number")return t=t&255,typeof Uint8Array.prototype.indexOf=="function"?u?Uint8Array.prototype.indexOf.call(r,t,e):Uint8Array.prototype.lastIndexOf.call(r,t,e):ot(r,[t],e,n,u);throw new TypeError("val must be string, number or Buffer")}function ot(r,t,e,n,u){let c=1,a=r.length,w=t.length;if(n!==void 0&&(n=String(n).toLowerCase(),n==="ucs2"||n==="ucs-2"||n==="utf16le"||n==="utf-16le")){if(r.length<2||t.length<2)return-1;c=2,a/=2,w/=2,e/=2}function U(T,E){return c===1?T[E]:T.readUInt16BE(E*c)}let A;if(u){let T=-1;for(A=e;A<a;A++)if(U(r,A)===U(t,T===-1?0:A-T)){if(T===-1&&(T=A),A-T+1===w)return T*c}else T!==-1&&(A-=A-T),T=-1}else for(e+w>a&&(e=a-w),A=e;A>=0;A--){let T=!0;for(let E=0;E<w;E++)if(U(r,A+E)!==U(t,E)){T=!1;break}if(T)return A}return-1}o.prototype.includes=function(t,e,n){return this.indexOf(t,e,n)!==-1},o.prototype.indexOf=function(t,e,n){return it(this,t,e,n,!0)},o.prototype.lastIndexOf=function(t,e,n){return it(this,t,e,n,!1)};function gt(r,t,e,n){e=Number(e)||0;const u=r.length-e;n?(n=Number(n),n>u&&(n=u)):n=u;const c=t.length;n>c/2&&(n=c/2);let a;for(a=0;a<n;++a){const w=parseInt(t.substr(a*2,2),16);if(Bt(w))return a;r[e+a]=w}return a}function St(r,t,e,n){return st(mt(t,r.length-e),r,e,n)}function _t(r,t,e,n){return st(ue(t),r,e,n)}function N(r,t,e,n){return st(Dt(t),r,e,n)}function M(r,t,e,n){return st(fe(t,r.length-e),r,e,n)}o.prototype.write=function(t,e,n,u){if(e===void 0)u="utf8",n=this.length,e=0;else if(n===void 0&&typeof e=="string")u=e,n=this.length,e=0;else if(isFinite(e))e=e>>>0,isFinite(n)?(n=n>>>0,u===void 0&&(u="utf8")):(u=n,n=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");const c=this.length-e;if((n===void 0||n>c)&&(n=c),t.length>0&&(n<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");u||(u="utf8");let a=!1;for(;;)switch(u){case"hex":return gt(this,t,e,n);case"utf8":case"utf-8":return St(this,t,e,n);case"ascii":case"latin1":case"binary":return _t(this,t,e,n);case"base64":return N(this,t,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return M(this,t,e,n);default:if(a)throw new TypeError("Unknown encoding: "+u);u=(""+u).toLowerCase(),a=!0}},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function Zt(r,t,e){return t===0&&e===r.length?s.fromByteArray(r):s.fromByteArray(r.slice(t,e))}function Ct(r,t,e){e=Math.min(r.length,e);const n=[];let u=t;for(;u<e;){const c=r[u];let a=null,w=c>239?4:c>223?3:c>191?2:1;if(u+w<=e){let U,A,T,E;switch(w){case 1:c<128&&(a=c);break;case 2:U=r[u+1],(U&192)===128&&(E=(c&31)<<6|U&63,E>127&&(a=E));break;case 3:U=r[u+1],A=r[u+2],(U&192)===128&&(A&192)===128&&(E=(c&15)<<12|(U&63)<<6|A&63,E>2047&&(E<55296||E>57343)&&(a=E));break;case 4:U=r[u+1],A=r[u+2],T=r[u+3],(U&192)===128&&(A&192)===128&&(T&192)===128&&(E=(c&15)<<18|(U&63)<<12|(A&63)<<6|T&63,E>65535&&E<1114112&&(a=E))}}a===null?(a=65533,w=1):a>65535&&(a-=65536,n.push(a>>>10&1023|55296),a=56320|a&1023),n.push(a),u+=w}return vt(n)}const Rt=4096;function vt(r){const t=r.length;if(t<=Rt)return String.fromCharCode.apply(String,r);let e="",n=0;for(;n<t;)e+=String.fromCharCode.apply(String,r.slice(n,n+=Rt));return e}function te(r,t,e){let n="";e=Math.min(r.length,e);for(let u=t;u<e;++u)n+=String.fromCharCode(r[u]&127);return n}function ee(r,t,e){let n="";e=Math.min(r.length,e);for(let u=t;u<e;++u)n+=String.fromCharCode(r[u]);return n}function re(r,t,e){const n=r.length;(!t||t<0)&&(t=0),(!e||e<0||e>n)&&(e=n);let u="";for(let c=t;c<e;++c)u+=ce[r[c]];return u}function ne(r,t,e){const n=r.slice(t,e);let u="";for(let c=0;c<n.length-1;c+=2)u+=String.fromCharCode(n[c]+n[c+1]*256);return u}o.prototype.slice=function(t,e){const n=this.length;t=~~t,e=e===void 0?n:~~e,t<0?(t+=n,t<0&&(t=0)):t>n&&(t=n),e<0?(e+=n,e<0&&(e=0)):e>n&&(e=n),e<t&&(e=t);const u=this.subarray(t,e);return Object.setPrototypeOf(u,o.prototype),u};function C(r,t,e){if(r%1!==0||r<0)throw new RangeError("offset is not uint");if(r+t>e)throw new RangeError("Trying to access beyond buffer length")}o.prototype.readUintLE=o.prototype.readUIntLE=function(t,e,n){t=t>>>0,e=e>>>0,n||C(t,e,this.length);let u=this[t],c=1,a=0;for(;++a<e&&(c*=256);)u+=this[t+a]*c;return u},o.prototype.readUintBE=o.prototype.readUIntBE=function(t,e,n){t=t>>>0,e=e>>>0,n||C(t,e,this.length);let u=this[t+--e],c=1;for(;e>0&&(c*=256);)u+=this[t+--e]*c;return u},o.prototype.readUint8=o.prototype.readUInt8=function(t,e){return t=t>>>0,e||C(t,1,this.length),this[t]},o.prototype.readUint16LE=o.prototype.readUInt16LE=function(t,e){return t=t>>>0,e||C(t,2,this.length),this[t]|this[t+1]<<8},o.prototype.readUint16BE=o.prototype.readUInt16BE=function(t,e){return t=t>>>0,e||C(t,2,this.length),this[t]<<8|this[t+1]},o.prototype.readUint32LE=o.prototype.readUInt32LE=function(t,e){return t=t>>>0,e||C(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+this[t+3]*16777216},o.prototype.readUint32BE=o.prototype.readUInt32BE=function(t,e){return t=t>>>0,e||C(t,4,this.length),this[t]*16777216+(this[t+1]<<16|this[t+2]<<8|this[t+3])},o.prototype.readBigUInt64LE=Y(function(t){t=t>>>0,X(t,"offset");const e=this[t],n=this[t+7];(e===void 0||n===void 0)&&tt(t,this.length-8);const u=e+this[++t]*2**8+this[++t]*2**16+this[++t]*2**24,c=this[++t]+this[++t]*2**8+this[++t]*2**16+n*2**24;return BigInt(u)+(BigInt(c)<<BigInt(32))}),o.prototype.readBigUInt64BE=Y(function(t){t=t>>>0,X(t,"offset");const e=this[t],n=this[t+7];(e===void 0||n===void 0)&&tt(t,this.length-8);const u=e*2**24+this[++t]*2**16+this[++t]*2**8+this[++t],c=this[++t]*2**24+this[++t]*2**16+this[++t]*2**8+n;return(BigInt(u)<<BigInt(32))+BigInt(c)}),o.prototype.readIntLE=function(t,e,n){t=t>>>0,e=e>>>0,n||C(t,e,this.length);let u=this[t],c=1,a=0;for(;++a<e&&(c*=256);)u+=this[t+a]*c;return c*=128,u>=c&&(u-=Math.pow(2,8*e)),u},o.prototype.readIntBE=function(t,e,n){t=t>>>0,e=e>>>0,n||C(t,e,this.length);let u=e,c=1,a=this[t+--u];for(;u>0&&(c*=256);)a+=this[t+--u]*c;return c*=128,a>=c&&(a-=Math.pow(2,8*e)),a},o.prototype.readInt8=function(t,e){return t=t>>>0,e||C(t,1,this.length),this[t]&128?(255-this[t]+1)*-1:this[t]},o.prototype.readInt16LE=function(t,e){t=t>>>0,e||C(t,2,this.length);const n=this[t]|this[t+1]<<8;return n&32768?n|4294901760:n},o.prototype.readInt16BE=function(t,e){t=t>>>0,e||C(t,2,this.length);const n=this[t+1]|this[t]<<8;return n&32768?n|4294901760:n},o.prototype.readInt32LE=function(t,e){return t=t>>>0,e||C(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},o.prototype.readInt32BE=function(t,e){return t=t>>>0,e||C(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},o.prototype.readBigInt64LE=Y(function(t){t=t>>>0,X(t,"offset");const e=this[t],n=this[t+7];(e===void 0||n===void 0)&&tt(t,this.length-8);const u=this[t+4]+this[t+5]*2**8+this[t+6]*2**16+(n<<24);return(BigInt(u)<<BigInt(32))+BigInt(e+this[++t]*2**8+this[++t]*2**16+this[++t]*2**24)}),o.prototype.readBigInt64BE=Y(function(t){t=t>>>0,X(t,"offset");const e=this[t],n=this[t+7];(e===void 0||n===void 0)&&tt(t,this.length-8);const u=(e<<24)+this[++t]*2**16+this[++t]*2**8+this[++t];return(BigInt(u)<<BigInt(32))+BigInt(this[++t]*2**24+this[++t]*2**16+this[++t]*2**8+n)}),o.prototype.readFloatLE=function(t,e){return t=t>>>0,e||C(t,4,this.length),f.read(this,t,!0,23,4)},o.prototype.readFloatBE=function(t,e){return t=t>>>0,e||C(t,4,this.length),f.read(this,t,!1,23,4)},o.prototype.readDoubleLE=function(t,e){return t=t>>>0,e||C(t,8,this.length),f.read(this,t,!0,52,8)},o.prototype.readDoubleBE=function(t,e){return t=t>>>0,e||C(t,8,this.length),f.read(this,t,!1,52,8)};function L(r,t,e,n,u,c){if(!o.isBuffer(r))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>u||t<c)throw new RangeError('"value" argument is out of bounds');if(e+n>r.length)throw new RangeError("Index out of range")}o.prototype.writeUintLE=o.prototype.writeUIntLE=function(t,e,n,u){if(t=+t,e=e>>>0,n=n>>>0,!u){const w=Math.pow(2,8*n)-1;L(this,t,e,n,w,0)}let c=1,a=0;for(this[e]=t&255;++a<n&&(c*=256);)this[e+a]=t/c&255;return e+n},o.prototype.writeUintBE=o.prototype.writeUIntBE=function(t,e,n,u){if(t=+t,e=e>>>0,n=n>>>0,!u){const w=Math.pow(2,8*n)-1;L(this,t,e,n,w,0)}let c=n-1,a=1;for(this[e+c]=t&255;--c>=0&&(a*=256);)this[e+c]=t/a&255;return e+n},o.prototype.writeUint8=o.prototype.writeUInt8=function(t,e,n){return t=+t,e=e>>>0,n||L(this,t,e,1,255,0),this[e]=t&255,e+1},o.prototype.writeUint16LE=o.prototype.writeUInt16LE=function(t,e,n){return t=+t,e=e>>>0,n||L(this,t,e,2,65535,0),this[e]=t&255,this[e+1]=t>>>8,e+2},o.prototype.writeUint16BE=o.prototype.writeUInt16BE=function(t,e,n){return t=+t,e=e>>>0,n||L(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=t&255,e+2},o.prototype.writeUint32LE=o.prototype.writeUInt32LE=function(t,e,n){return t=+t,e=e>>>0,n||L(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=t&255,e+4},o.prototype.writeUint32BE=o.prototype.writeUInt32BE=function(t,e,n){return t=+t,e=e>>>0,n||L(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=t&255,e+4};function bt(r,t,e,n,u){kt(t,n,u,r,e,7);let c=Number(t&BigInt(4294967295));r[e++]=c,c=c>>8,r[e++]=c,c=c>>8,r[e++]=c,c=c>>8,r[e++]=c;let a=Number(t>>BigInt(32)&BigInt(4294967295));return r[e++]=a,a=a>>8,r[e++]=a,a=a>>8,r[e++]=a,a=a>>8,r[e++]=a,e}function $t(r,t,e,n,u){kt(t,n,u,r,e,7);let c=Number(t&BigInt(4294967295));r[e+7]=c,c=c>>8,r[e+6]=c,c=c>>8,r[e+5]=c,c=c>>8,r[e+4]=c;let a=Number(t>>BigInt(32)&BigInt(4294967295));return r[e+3]=a,a=a>>8,r[e+2]=a,a=a>>8,r[e+1]=a,a=a>>8,r[e]=a,e+8}o.prototype.writeBigUInt64LE=Y(function(t,e=0){return bt(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))}),o.prototype.writeBigUInt64BE=Y(function(t,e=0){return $t(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))}),o.prototype.writeIntLE=function(t,e,n,u){if(t=+t,e=e>>>0,!u){const U=Math.pow(2,8*n-1);L(this,t,e,n,U-1,-U)}let c=0,a=1,w=0;for(this[e]=t&255;++c<n&&(a*=256);)t<0&&w===0&&this[e+c-1]!==0&&(w=1),this[e+c]=(t/a>>0)-w&255;return e+n},o.prototype.writeIntBE=function(t,e,n,u){if(t=+t,e=e>>>0,!u){const U=Math.pow(2,8*n-1);L(this,t,e,n,U-1,-U)}let c=n-1,a=1,w=0;for(this[e+c]=t&255;--c>=0&&(a*=256);)t<0&&w===0&&this[e+c+1]!==0&&(w=1),this[e+c]=(t/a>>0)-w&255;return e+n},o.prototype.writeInt8=function(t,e,n){return t=+t,e=e>>>0,n||L(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=t&255,e+1},o.prototype.writeInt16LE=function(t,e,n){return t=+t,e=e>>>0,n||L(this,t,e,2,32767,-32768),this[e]=t&255,this[e+1]=t>>>8,e+2},o.prototype.writeInt16BE=function(t,e,n){return t=+t,e=e>>>0,n||L(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=t&255,e+2},o.prototype.writeInt32LE=function(t,e,n){return t=+t,e=e>>>0,n||L(this,t,e,4,2147483647,-2147483648),this[e]=t&255,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4},o.prototype.writeInt32BE=function(t,e,n){return t=+t,e=e>>>0,n||L(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=t&255,e+4},o.prototype.writeBigInt64LE=Y(function(t,e=0){return bt(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),o.prototype.writeBigInt64BE=Y(function(t,e=0){return $t(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function Lt(r,t,e,n,u,c){if(e+n>r.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function Nt(r,t,e,n,u){return t=+t,e=e>>>0,u||Lt(r,t,e,4),f.write(r,t,e,n,23,4),e+4}o.prototype.writeFloatLE=function(t,e,n){return Nt(this,t,e,!0,n)},o.prototype.writeFloatBE=function(t,e,n){return Nt(this,t,e,!1,n)};function Mt(r,t,e,n,u){return t=+t,e=e>>>0,u||Lt(r,t,e,8),f.write(r,t,e,n,52,8),e+8}o.prototype.writeDoubleLE=function(t,e,n){return Mt(this,t,e,!0,n)},o.prototype.writeDoubleBE=function(t,e,n){return Mt(this,t,e,!1,n)},o.prototype.copy=function(t,e,n,u){if(!o.isBuffer(t))throw new TypeError("argument should be a Buffer");if(n||(n=0),!u&&u!==0&&(u=this.length),e>=t.length&&(e=t.length),e||(e=0),u>0&&u<n&&(u=n),u===n||t.length===0||this.length===0)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("Index out of range");if(u<0)throw new RangeError("sourceEnd out of bounds");u>this.length&&(u=this.length),t.length-e<u-n&&(u=t.length-e+n);const c=u-n;return this===t&&typeof Uint8Array.prototype.copyWithin=="function"?this.copyWithin(e,n,u):Uint8Array.prototype.set.call(t,this.subarray(n,u),e),c},o.prototype.fill=function(t,e,n,u){if(typeof t=="string"){if(typeof e=="string"?(u=e,e=0,n=this.length):typeof n=="string"&&(u=n,n=this.length),u!==void 0&&typeof u!="string")throw new TypeError("encoding must be a string");if(typeof u=="string"&&!o.isEncoding(u))throw new TypeError("Unknown encoding: "+u);if(t.length===1){const a=t.charCodeAt(0);(u==="utf8"&&a<128||u==="latin1")&&(t=a)}}else typeof t=="number"?t=t&255:typeof t=="boolean"&&(t=Number(t));if(e<0||this.length<e||this.length<n)throw new RangeError("Out of range index");if(n<=e)return this;e=e>>>0,n=n===void 0?this.length:n>>>0,t||(t=0);let c;if(typeof t=="number")for(c=e;c<n;++c)this[c]=t;else{const a=o.isBuffer(t)?t:o.from(t,u),w=a.length;if(w===0)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(c=0;c<n-e;++c)this[c+e]=a[c%w]}return this};const J={};function xt(r,t,e){J[r]=class extends e{constructor(){super(),Object.defineProperty(this,"message",{value:t.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${r}]`,this.stack,delete this.name}get code(){return r}set code(u){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:u,writable:!0})}toString(){return`${this.name} [${r}]: ${this.message}`}}}xt("ERR_BUFFER_OUT_OF_BOUNDS",function(r){return r?`${r} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError),xt("ERR_INVALID_ARG_TYPE",function(r,t){return`The "${r}" argument must be of type number. Received type ${typeof t}`},TypeError),xt("ERR_OUT_OF_RANGE",function(r,t,e){let n=`The value of "${r}" is out of range.`,u=e;return Number.isInteger(e)&&Math.abs(e)>2**32?u=Pt(String(e)):typeof e=="bigint"&&(u=String(e),(e>BigInt(2)**BigInt(32)||e<-(BigInt(2)**BigInt(32)))&&(u=Pt(u)),u+="n"),n+=` It must be ${t}. Received ${u}`,n},RangeError);function Pt(r){let t="",e=r.length;const n=r[0]==="-"?1:0;for(;e>=n+4;e-=3)t=`_${r.slice(e-3,e)}${t}`;return`${r.slice(0,e)}${t}`}function ie(r,t,e){X(t,"offset"),(r[t]===void 0||r[t+e]===void 0)&&tt(t,r.length-(e+1))}function kt(r,t,e,n,u,c){if(r>e||r<t){const a=typeof t=="bigint"?"n":"";let w;throw c>3?t===0||t===BigInt(0)?w=`>= 0${a} and < 2${a} ** ${(c+1)*8}${a}`:w=`>= -(2${a} ** ${(c+1)*8-1}${a}) and < 2 ** ${(c+1)*8-1}${a}`:w=`>= ${t}${a} and <= ${e}${a}`,new J.ERR_OUT_OF_RANGE("value",w,r)}ie(n,u,c)}function X(r,t){if(typeof r!="number")throw new J.ERR_INVALID_ARG_TYPE(t,"number",r)}function tt(r,t,e){throw Math.floor(r)!==r?(X(r,e),new J.ERR_OUT_OF_RANGE(e||"offset","an integer",r)):t<0?new J.ERR_BUFFER_OUT_OF_BOUNDS:new J.ERR_OUT_OF_RANGE(e||"offset",`>= ${e?1:0} and <= ${t}`,r)}const oe=/[^+/0-9A-Za-z-_]/g;function se(r){if(r=r.split("=")[0],r=r.trim().replace(oe,""),r.length<2)return"";for(;r.length%4!==0;)r=r+"=";return r}function mt(r,t){t=t||1/0;let e;const n=r.length;let u=null;const c=[];for(let a=0;a<n;++a){if(e=r.charCodeAt(a),e>55295&&e<57344){if(!u){if(e>56319){(t-=3)>-1&&c.push(239,191,189);continue}else if(a+1===n){(t-=3)>-1&&c.push(239,191,189);continue}u=e;continue}if(e<56320){(t-=3)>-1&&c.push(239,191,189),u=e;continue}e=(u-55296<<10|e-56320)+65536}else u&&(t-=3)>-1&&c.push(239,191,189);if(u=null,e<128){if((t-=1)<0)break;c.push(e)}else if(e<2048){if((t-=2)<0)break;c.push(e>>6|192,e&63|128)}else if(e<65536){if((t-=3)<0)break;c.push(e>>12|224,e>>6&63|128,e&63|128)}else if(e<1114112){if((t-=4)<0)break;c.push(e>>18|240,e>>12&63|128,e>>6&63|128,e&63|128)}else throw new Error("Invalid code point")}return c}function ue(r){const t=[];for(let e=0;e<r.length;++e)t.push(r.charCodeAt(e)&255);return t}function fe(r,t){let e,n,u;const c=[];for(let a=0;a<r.length&&!((t-=2)<0);++a)e=r.charCodeAt(a),n=e>>8,u=e%256,c.push(u),c.push(n);return c}function Dt(r){return s.toByteArray(se(r))}function st(r,t,e,n){let u;for(u=0;u<n&&!(u+e>=t.length||u>=r.length);++u)t[u+e]=r[u];return u}function H(r,t){return r instanceof t||r!=null&&r.constructor!=null&&r.constructor.name!=null&&r.constructor.name===t.name}function Bt(r){return r!==r}const ce=function(){const r="0123456789abcdef",t=new Array(256);for(let e=0;e<16;++e){const n=e*16;for(let u=0;u<16;++u)t[n+u]=r[e]+r[u]}return t}();function Y(r){return typeof BigInt>"u"?le:r}function le(){throw new Error("BigInt not supported")}})(Kt);var et=function(i){switch(typeof i){case"string":return i;case"boolean":return i?"true":"false";case"number":return isFinite(i)?i:"";default:return""}},be=function(i,s,f,h){return s=s||"&",f=f||"=",i===null&&(i=void 0),typeof i=="object"?Object.keys(i).map(function(l){var p=encodeURIComponent(et(l))+f;return Array.isArray(i[l])?i[l].map(function(d){return p+encodeURIComponent(et(d))}).join(s):p+encodeURIComponent(et(i[l]))}).filter(Boolean).join(s):h?encodeURIComponent(et(h))+f+encodeURIComponent(et(i)):""},$e=be;const Le=i=>{const{appId:s,appSecret:f}=i,[h,l]=Z(void 0),[p,d]=Z(void 0),[o,y]=Z(void 0),m=()=>`Basic ${Kt.Buffer.from(`${s}:${f}`).toString("base64")}`,g=()=>{const x=new FormData;x.append("grant_type","client_credentials"),x.append("username",s),x.append("password",f),x.append("scope","read"),fetch("https://www.reddit.com/api/v1/access_token",{method:"POST",headers:{Authorization:m()},body:x}).then(async $=>{if($.status!==200){console.error("AAAAA it failed to get reddit access token");return}const{access_token:I,expires_in:S,token_type:F}=await $.json();l(`${F} ${I}`),d(S/2)})};ft(()=>g());const B=x=>o()?o()[x]:void 0;return ft(()=>{const x=p();!x||x===0||setTimeout(g,x*1e3)}),{get:async(x,$,I)=>{if(!h()){console.warn("token not yet valid, skipping get request");return}const S={...I,after:B(x)??"",raw_json:1},F="https://oauth.reddit.com",D=$e(S),q=`${F}${$}?${D}`,v=await fetch(q,{method:"GET",headers:{Authorization:h()}});if(v.status===401){g();return}if(v.status!==200){console.error("AAAAA it failed to get reddit stuff");return}const O=await v.json();y(N=>({...N,[x]:O.data.after}));const it=O.data.children,ot=N=>N.kind==="t3"&&N.data.post_hint==="image"&&N.data.is_video===!1,gt=N=>N.data.over_18===!1&&N.data.thumbnail!=="nsfw";return it.filter(ot).filter(gt).map(N=>{const M=N.data;return{id:`${M.subreddit}_${M.id}`,authorName:M.author,createdAtUTC:M.created_utc,downs:M.downs,subreddit:M.subreddit,score:M.score,title:M.title,ups:M.ups,url:M.url}})},isReady:()=>h()!==void 0}},Ne="_App_lazw7_1",Me="_header_lazw7_8",Pe="_memeImage_lazw7_19",ke="_postHeader_lazw7_27",At={App:Ne,header:Me,memeImage:Pe,postHeader:ke},De=yt("<p>Loading your memes...</p>",2),Oe=yt('<img alt="meme">',1),He=yt("<div>Missing credentials</div>",2),Ge=yt("<div><div></div></div>",4),Gt=["memes","aww","ProgrammerHumor","okbuddyretard","funny","eyebleach","mademesmile"],We=()=>{const i=localStorage.getItem("app_id"),s=localStorage.getItem("app_secret"),{get:f,isReady:h}=Le({appId:i,appSecret:s}),[l,p]=Z([]),[d,o]=Z([]),[y,m]=Z(!1),g=()=>l().length===0?void 0:l()[0],B=I=>{let S=I.filter(F=>l().find(D=>D.id===F.id)===void 0);S=S.filter(F=>!d().includes(F.id)),p(F=>F.concat(S))},R=(I=3)=>{if(!h())return;const S=Gt[Math.floor(Math.random()*(Gt.length-1))];f(S,`/r/${S}/rising`,{g:"GLOBAL",timeframe:"day",limit:`${I}`}).then(B)};ft(()=>{!h()||y()||(R(),m(!0))});const x=()=>{if(document.hidden){if(!g())return;o(I=>I.concat(g().id)),p(I=>I.slice(1))}else R()};ft(()=>(document.addEventListener("visibilitychange",x),()=>document.removeEventListener("visibilitychange",x)));const $=()=>g()?(()=>{const I=Oe.cloneNode(!0);return rt(S=>{const F=g().url,D=At.memeImage;return F!==S._v$&&Ie(I,"src",S._v$=F),D!==S._v$2&&Et(I,S._v$2=D),S},{_v$:void 0,_v$2:void 0}),I})():De.cloneNode(!0);return!i||!s?He.cloneNode(!0):(()=>{const I=Ge.cloneNode(!0),S=I.firstChild;return Xt(I,$,null),rt(F=>{const D=At.App,q=At.postHeader;return D!==F._v$3&&Et(I,F._v$3=D),q!==F._v$4&&Et(S,F._v$4=q),F},{_v$3:void 0,_v$4:void 0}),I})()},Ye=document.getElementById("root");Ee(()=>me(We,{}),Ye);