import{a as C,d as fe,u as F,j as s,n as je,g as na,r as ka}from"./vendor-B9KbAPe3.js";import{s as Ba,Q as $a,V as Ga,W as he,r as J,f as G,g as z,X as aa,Y as ar,Z as ia,$ as za,a0 as Ha,B as X,a1 as ce,a2 as Na,a3 as La,a4 as Ua,a5 as ee,a6 as hr,a7 as Wa,a8 as Ka,a9 as Fa,aa as oa,ab as Va,ac as sa,ad as Xa,ae as Ja,af as Ya,ag as ca,T as pr,ah as Qa,ai as Za,i as ei,aj as la,ak as ti,N as ri,al as gr}from"./index-rP0bBy5s.js";import{ag as ni,aG as ai,I as vr,aH as ii,T as ua,C as oi,J as si,aI as ci,N as li,aF as Q,j as Te,g as V,aC as ui,aB as di,aJ as fi,aK as hi,aL as pi,aM as gi,aN as vi,aO as mi,a6 as bi,aP as yi,D as xi,d as _i,h as wi,aQ as Ci,H as Si,X as Ri,aR as ji,aS as Ti,i as qi}from"./mui-D5L4kO0I.js";import{a as be,c as da,r as te,d as Oi,b as ye,e as Pi}from"./isObjectLike-Ddue8m3w.js";import"./hls-CWTT-7hy.js";const Ei=16,Ai=10,Mi=(e,t,r)=>{if(e==null||t==null||r<=0)return null;const n=Math.max(0,Math.min(r-1,Math.floor(e))),a=Math.max(0,Math.min(r-1,Math.floor(t)));return a<n?null:{start:n,end:a}},Di=(e,t,r,n)=>{const a=Mi(e,t,r);if(a)for(let i=a.start;i<=a.end;i++)n(i)},Ii=(e,t)=>{if(e){if(Array.isArray(e)){for(let r=0;r<e.length;r++){const n=e[r];n&&t(r,n)}return}for(const[r,n]of Object.entries(e)){if(!n)continue;const a=Number(r);Number.isFinite(a)&&t(a,n)}}},ki=(e,t)=>{if(!e)return 0;const r=e.Length||t||0,n=e.Size||0;if(r<=0)return n>0?100:0;const a=Math.min(n,r);return Math.min(100,a/r*100)},Bi=(e,t,r,n)=>{if(!(n!=null&&n.length))return t>=2?t:0;if(n.some(o=>o.Reader===e))return 5;if(t>=2)return t;if(r)return 0;let i=0;for(const o of n){if(o.Reader==null||o.Start==null||o.End==null)continue;const c=o.Reader,u=o.End;if(e<c||e>u)continue;let d=2;if(e===c+1)d=4;else{const g=Math.max(1,u-c),h=c+Math.max(2,Math.floor(g*.45));e<=h?d=3:e<=h+5&&(d=2)}d>i&&(i=d)}return i>0?i:t},fa=e=>e===2?"H":e===3?"R":e===4?"N":e===5?"A":"",$i=(e,t,r,n,a,i)=>{const o=ki(t,r),c=!!(t!=null&&t.Completed)||o>=100,u=(t==null?void 0:t.Priority)||0;return{percentage:c?100:o,priority:Bi(e,u,c,i),completed:c,isReader:n,isReaderRange:a,pieceStart:e,pieceEnd:e}},ha=(e,t)=>{const r=e.PiecesCount??0;if(r<=0)return null;const n=e.Readers||[];let a=0;if(n.length>0){let h=r;for(const m of n)m.Reader!=null&&m.Reader>=0&&m.Reader<r&&m.Reader<h&&(h=m.Reader);a=h<r?h:0}const i=e.PiecesLength||0,o=i>0?Math.max(1,Math.round((e.Capacity||0)/i)):t,c=Math.max(t,64);let u=Math.min(r,Math.max(t,o),c);u=Math.max(1,u);let d=a-Math.floor(u/2);d<0&&(d=0);let g=d+u-1;return g>=r&&(g=r-1,d=Math.max(0,g-u+1)),{start:d,end:g,readerPiece:a}},Gi=(e,t)=>{const r=e.PiecesCount??0,n=ha(e,t);if(!n||r<=0)return{cells:[],piecesCount:r,bucketSize:1,windowStart:0,windowEnd:-1};const a=e.PiecesLength||0,i=e.Readers||[],o=new Map;Ii(e.Pieces,(g,h)=>{g>=n.start&&g<=n.end&&o.set(g,h)});const c=new Set,u=new Set;for(const g of i)g.Reader!=null&&g.Reader>=n.start&&g.Reader<=n.end&&c.add(g.Reader),Di(g.Start,g.End,r,h=>{h>=n.start&&h<=n.end&&u.add(h)});const d=[];for(let g=n.start;g<=n.end;g++)d.push($i(g,o.get(g),a,c.has(g),u.has(g),i));return{cells:d,piecesCount:r,bucketSize:1,windowStart:n.start,windowEnd:n.end}},zi=(e,t=!1)=>{const r=t?Ai:Ei,n=t?31:24;return!e||e<=0?10*r:Math.max(1,Math.floor(e/n))*r},pe=100,Hi=400,Ni=2e3,mr=e=>e!=null&&e.length?e.map(t=>`${t.Reader??""}:${t.Start??""}-${t.End??""}`).join("|"):"",br=e=>{if(!e)return"";if(Array.isArray(e)){let r="";for(let n=0;n<e.length;n++){const a=e[n];a&&(r+=`${n}:${a.Size??0}:${a.Priority??0};`)}return r}let t="";for(const[r,n]of Object.entries(e))n&&(t+=`${r}:${n.Size??0}:${n.Priority??0};`);return t},yr=(e,t)=>e.Filled===t.Filled&&e.Capacity===t.Capacity&&e.PiecesCount===t.PiecesCount&&e.PiecesLength===t.PiecesLength&&mr(e.Readers)===mr(t.Readers)&&br(e.Pieces)===br(t.Pieces),Li=e=>{const[t,r]=C.useState({}),n=C.useRef(!0),a=C.useRef(null),i=C.useRef(!1),o=C.useRef({}),c=C.useRef(Date.now()),u=C.useRef(pe);return C.useEffect(()=>()=>{n.current=!1},[]),C.useEffect(()=>{if(!e){a.current&&clearTimeout(a.current);return}let d=!1;const g=()=>{d||(a.current=setTimeout(h,u.current))},h=()=>{d||i.current||document.hidden||(i.current=!0,fe.post($a(),{action:"get",hash:e}).then(({data:y})=>{if(!n.current||d)return;const S=y||{};if(yr(o.current,S)){Date.now()-c.current>=Ni&&(u.current=Hi);return}c.current=Date.now(),u.current=pe,o.current=S,r(S)}).catch(()=>{!n.current||d||yr(o.current,{})||(c.current=Date.now(),u.current=pe,o.current={},r({}))}).finally(()=>{i.current=!1,document.hidden||g()}))};h();const m=()=>{if(document.hidden){a.current&&clearTimeout(a.current);return}u.current=pe,h()};return document.addEventListener("visibilitychange",m),()=>{d=!0,a.current&&clearTimeout(a.current),document.removeEventListener("visibilitychange",m)}},[e]),t},Ui=(e,t)=>C.useMemo(()=>Gi(e,t),[e,t]),Wi=()=>{const[e,t]=C.useState();return C.useEffect(()=>{let r=!1;return fe.post(Ba(),{action:"get"}).then(({data:n})=>{r||t(n)}),()=>{r=!0}},[]),e};function Ki({title:e,onClose:t,onBack:r}){const{t:n}=F();return s.jsx(ni,{sx:{position:"relative",...Ga&&{paddingTop:"30px"}},children:s.jsxs(ai,{children:[r&&s.jsx(vr,{edge:"start",color:"inherit",onClick:r,"aria-label":n("Back",{defaultValue:"Back"}),children:s.jsx(ii,{})}),s.jsx(ua,{variant:"h6",sx:{marginLeft:"5px",flex:1},children:e}),s.jsx(vr,{autoFocus:!0,color:"inherit",onClick:t,"aria-label":n("Close",{defaultValue:"Close"}),sx:{marginRight:"-10px"},children:s.jsx(oi,{})})]})})}var pa=(function(){if(typeof Map<"u")return Map;function e(t,r){var n=-1;return t.some(function(a,i){return a[0]===r?(n=i,!0):!1}),n}return(function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(r){var n=e(this.__entries__,r),a=this.__entries__[n];return a&&a[1]},t.prototype.set=function(r,n){var a=e(this.__entries__,r);~a?this.__entries__[a][1]=n:this.__entries__.push([r,n])},t.prototype.delete=function(r){var n=this.__entries__,a=e(n,r);~a&&n.splice(a,1)},t.prototype.has=function(r){return!!~e(this.__entries__,r)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(r,n){n===void 0&&(n=null);for(var a=0,i=this.__entries__;a<i.length;a++){var o=i[a];r.call(n,o[1],o[0])}},t})()})(),ir=typeof window<"u"&&typeof document<"u"&&window.document===document,ve=(function(){return typeof je<"u"&&je.Math===Math?je:typeof self<"u"&&self.Math===Math?self:typeof window<"u"&&window.Math===Math?window:Function("return this")()})(),Fi=(function(){return typeof requestAnimationFrame=="function"?requestAnimationFrame.bind(ve):function(e){return setTimeout(function(){return e(Date.now())},1e3/60)}})(),Vi=2;function Xi(e,t){var r=!1,n=!1,a=0;function i(){r&&(r=!1,e()),n&&c()}function o(){Fi(i)}function c(){var u=Date.now();if(r){if(u-a<Vi)return;n=!0}else r=!0,n=!1,setTimeout(o,t);a=u}return c}var Ji=20,Yi=["top","right","bottom","left","width","height","size","weight"],Qi=typeof MutationObserver<"u",Zi=(function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=Xi(this.refresh.bind(this),Ji)}return e.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},e.prototype.removeObserver=function(t){var r=this.observers_,n=r.indexOf(t);~n&&r.splice(n,1),!r.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){var t=this.updateObservers_();t&&this.refresh()},e.prototype.updateObservers_=function(){var t=this.observers_.filter(function(r){return r.gatherActive(),r.hasActive()});return t.forEach(function(r){return r.broadcastActive()}),t.length>0},e.prototype.connect_=function(){!ir||this.connected_||(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),Qi?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){!ir||!this.connected_||(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(t){var r=t.propertyName,n=r===void 0?"":r,a=Yi.some(function(i){return!!~n.indexOf(i)});a&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e})(),ga=(function(e,t){for(var r=0,n=Object.keys(t);r<n.length;r++){var a=n[r];Object.defineProperty(e,a,{value:t[a],enumerable:!1,writable:!1,configurable:!0})}return e}),ae=(function(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView;return t||ve}),va=xe(0,0,0,0);function me(e){return parseFloat(e)||0}function xr(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return t.reduce(function(n,a){var i=e["border-"+a+"-width"];return n+me(i)},0)}function eo(e){for(var t=["top","right","bottom","left"],r={},n=0,a=t;n<a.length;n++){var i=a[n],o=e["padding-"+i];r[i]=me(o)}return r}function to(e){var t=e.getBBox();return xe(0,0,t.width,t.height)}function ro(e){var t=e.clientWidth,r=e.clientHeight;if(!t&&!r)return va;var n=ae(e).getComputedStyle(e),a=eo(n),i=a.left+a.right,o=a.top+a.bottom,c=me(n.width),u=me(n.height);if(n.boxSizing==="border-box"&&(Math.round(c+i)!==t&&(c-=xr(n,"left","right")+i),Math.round(u+o)!==r&&(u-=xr(n,"top","bottom")+o)),!ao(e)){var d=Math.round(c+i)-t,g=Math.round(u+o)-r;Math.abs(d)!==1&&(c-=d),Math.abs(g)!==1&&(u-=g)}return xe(a.left,a.top,c,u)}var no=(function(){return typeof SVGGraphicsElement<"u"?function(e){return e instanceof ae(e).SVGGraphicsElement}:function(e){return e instanceof ae(e).SVGElement&&typeof e.getBBox=="function"}})();function ao(e){return e===ae(e).document.documentElement}function io(e){return ir?no(e)?to(e):ro(e):va}function oo(e){var t=e.x,r=e.y,n=e.width,a=e.height,i=typeof DOMRectReadOnly<"u"?DOMRectReadOnly:Object,o=Object.create(i.prototype);return ga(o,{x:t,y:r,width:n,height:a,top:r,right:t+n,bottom:a+r,left:t}),o}function xe(e,t,r,n){return{x:e,y:t,width:r,height:n}}var so=(function(){function e(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=xe(0,0,0,0),this.target=t}return e.prototype.isActive=function(){var t=io(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},e})(),co=(function(){function e(t,r){var n=oo(r);ga(this,{target:t,contentRect:n})}return e})(),lo=(function(){function e(t,r,n){if(this.activeObservations_=[],this.observations_=new pa,typeof t!="function")throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=r,this.callbackCtx_=n}return e.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof ae(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)||(r.set(t,new so(t)),this.controller_.addObserver(this),this.controller_.refresh())}},e.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof ae(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)&&(r.delete(t),r.size||this.controller_.removeObserver(this))}},e.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},e.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach(function(r){r.isActive()&&t.activeObservations_.push(r)})},e.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,r=this.activeObservations_.map(function(n){return new co(n.target,n.broadcastRect())});this.callback_.call(t,r,t),this.clearActive()}},e.prototype.clearActive=function(){this.activeObservations_.splice(0)},e.prototype.hasActive=function(){return this.activeObservations_.length>0},e})(),ma=typeof WeakMap<"u"?new WeakMap:new pa,ba=(function(){function e(t){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var r=Zi.getInstance(),n=new lo(t,r,this);ma.set(this,n)}return e})();["observe","unobserve","disconnect"].forEach(function(e){ba.prototype[e]=function(){var t;return(t=ma.get(this))[e].apply(t,arguments)}});var uo=(function(){return typeof ve.ResizeObserver<"u"?ve.ResizeObserver:ba})(),fo=["client","offset","scroll","bounds","margin"];function _r(e){var t=[];return fo.forEach(function(r){e[r]&&t.push(r)}),t}function wr(e,t){var r={};if(t.indexOf("client")>-1&&(r.client={top:e.clientTop,left:e.clientLeft,width:e.clientWidth,height:e.clientHeight}),t.indexOf("offset")>-1&&(r.offset={top:e.offsetTop,left:e.offsetLeft,width:e.offsetWidth,height:e.offsetHeight}),t.indexOf("scroll")>-1&&(r.scroll={top:e.scrollTop,left:e.scrollLeft,width:e.scrollWidth,height:e.scrollHeight}),t.indexOf("bounds")>-1){var n=e.getBoundingClientRect();r.bounds={top:n.top,right:n.right,bottom:n.bottom,left:n.left,width:n.width,height:n.height}}if(t.indexOf("margin")>-1){var a=getComputedStyle(e);r.margin={top:a?parseInt(a.marginTop):0,right:a?parseInt(a.marginRight):0,bottom:a?parseInt(a.marginBottom):0,left:a?parseInt(a.marginLeft):0}}return r}function ho(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView;return t||window}function po(e){return function(t){var r,n;return n=r=(function(a){si(i,a);function i(){for(var c,u=arguments.length,d=new Array(u),g=0;g<u;g++)d[g]=arguments[g];return c=a.call.apply(a,[this].concat(d))||this,c.state={contentRect:{entry:{},client:{},offset:{},scroll:{},bounds:{},margin:{}}},c._animationFrameID=null,c._resizeObserver=null,c._node=null,c._window=null,c.measure=function(h){var m=wr(c._node,_r(c.props));h&&(m.entry=h[0].contentRect),c._animationFrameID=c._window.requestAnimationFrame(function(){c._resizeObserver!==null&&(c.setState({contentRect:m}),typeof c.props.onResize=="function"&&c.props.onResize(m))})},c._handleRef=function(h){c._resizeObserver!==null&&c._node!==null&&c._resizeObserver.unobserve(c._node),c._node=h,c._window=ho(c._node);var m=c.props.innerRef;m&&(typeof m=="function"?m(c._node):m.current=c._node),c._resizeObserver!==null&&c._node!==null&&c._resizeObserver.observe(c._node)},c}var o=i.prototype;return o.componentDidMount=function(){this._resizeObserver=this._window!==null&&this._window.ResizeObserver?new this._window.ResizeObserver(this.measure):new uo(this.measure),this._node!==null&&(this._resizeObserver.observe(this._node),typeof this.props.onResize=="function"&&this.props.onResize(wr(this._node,_r(this.props))))},o.componentWillUnmount=function(){this._window!==null&&this._window.cancelAnimationFrame(this._animationFrameID),this._resizeObserver!==null&&(this._resizeObserver.disconnect(),this._resizeObserver=null)},o.render=function(){var u=this.props;u.innerRef,u.onResize;var d=ci(u,["innerRef","onResize"]);return C.createElement(t,li({},d,{measureRef:this._handleRef,measure:this.measure,contentRect:this.state.contentRect}))},i})(C.Component),r.propTypes={client:Q.bool,offset:Q.bool,scroll:Q.bool,bounds:Q.bool,margin:Q.bool,innerRef:Q.oneOfType([Q.object,Q.func]),onResize:Q.func},n}}var sr=po()(function(e){var t=e.measure,r=e.measureRef,n=e.contentRect,a=e.children;return a({measure:t,measureRef:r,contentRect:n})});sr.displayName="Measure";sr.propTypes.children=Q.func;var qe,Cr;function go(){if(Cr)return qe;Cr=1;function e(){this.__data__=[],this.size=0}return qe=e,qe}var Oe,Sr;function ya(){if(Sr)return Oe;Sr=1;function e(t,r){return t===r||t!==t&&r!==r}return Oe=e,Oe}var Pe,Rr;function _e(){if(Rr)return Pe;Rr=1;var e=ya();function t(r,n){for(var a=r.length;a--;)if(e(r[a][0],n))return a;return-1}return Pe=t,Pe}var Ee,jr;function vo(){if(jr)return Ee;jr=1;var e=_e(),t=Array.prototype,r=t.splice;function n(a){var i=this.__data__,o=e(i,a);if(o<0)return!1;var c=i.length-1;return o==c?i.pop():r.call(i,o,1),--this.size,!0}return Ee=n,Ee}var Ae,Tr;function mo(){if(Tr)return Ae;Tr=1;var e=_e();function t(r){var n=this.__data__,a=e(n,r);return a<0?void 0:n[a][1]}return Ae=t,Ae}var Me,qr;function bo(){if(qr)return Me;qr=1;var e=_e();function t(r){return e(this.__data__,r)>-1}return Me=t,Me}var De,Or;function yo(){if(Or)return De;Or=1;var e=_e();function t(r,n){var a=this.__data__,i=e(a,r);return i<0?(++this.size,a.push([r,n])):a[i][1]=n,this}return De=t,De}var Ie,Pr;function we(){if(Pr)return Ie;Pr=1;var e=go(),t=vo(),r=mo(),n=bo(),a=yo();function i(o){var c=-1,u=o==null?0:o.length;for(this.clear();++c<u;){var d=o[c];this.set(d[0],d[1])}}return i.prototype.clear=e,i.prototype.delete=t,i.prototype.get=r,i.prototype.has=n,i.prototype.set=a,Ie=i,Ie}var ke,Er;function xo(){if(Er)return ke;Er=1;var e=we();function t(){this.__data__=new e,this.size=0}return ke=t,ke}var Be,Ar;function _o(){if(Ar)return Be;Ar=1;function e(t){var r=this.__data__,n=r.delete(t);return this.size=r.size,n}return Be=e,Be}var $e,Mr;function wo(){if(Mr)return $e;Mr=1;function e(t){return this.__data__.get(t)}return $e=e,$e}var Ge,Dr;function Co(){if(Dr)return Ge;Dr=1;function e(t){return this.__data__.has(t)}return Ge=e,Ge}var ze,Ir;function xa(){if(Ir)return ze;Ir=1;var e=be(),t=da(),r="[object AsyncFunction]",n="[object Function]",a="[object GeneratorFunction]",i="[object Proxy]";function o(c){if(!t(c))return!1;var u=e(c);return u==n||u==a||u==r||u==i}return ze=o,ze}var He,kr;function So(){if(kr)return He;kr=1;var e=te(),t=e["__core-js_shared__"];return He=t,He}var Ne,Br;function Ro(){if(Br)return Ne;Br=1;var e=So(),t=(function(){var n=/[^.]+$/.exec(e&&e.keys&&e.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""})();function r(n){return!!t&&t in n}return Ne=r,Ne}var Le,$r;function _a(){if($r)return Le;$r=1;var e=Function.prototype,t=e.toString;function r(n){if(n!=null){try{return t.call(n)}catch{}try{return n+""}catch{}}return""}return Le=r,Le}var Ue,Gr;function jo(){if(Gr)return Ue;Gr=1;var e=xa(),t=Ro(),r=da(),n=_a(),a=/[\\^$.*+?()[\]{}|]/g,i=/^\[object .+?Constructor\]$/,o=Function.prototype,c=Object.prototype,u=o.toString,d=c.hasOwnProperty,g=RegExp("^"+u.call(d).replace(a,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function h(m){if(!r(m)||t(m))return!1;var y=e(m)?g:i;return y.test(n(m))}return Ue=h,Ue}var We,zr;function To(){if(zr)return We;zr=1;function e(t,r){return t==null?void 0:t[r]}return We=e,We}var Ke,Hr;function ie(){if(Hr)return Ke;Hr=1;var e=jo(),t=To();function r(n,a){var i=t(n,a);return e(i)?i:void 0}return Ke=r,Ke}var Fe,Nr;function cr(){if(Nr)return Fe;Nr=1;var e=ie(),t=te(),r=e(t,"Map");return Fe=r,Fe}var Ve,Lr;function Ce(){if(Lr)return Ve;Lr=1;var e=ie(),t=e(Object,"create");return Ve=t,Ve}var Xe,Ur;function qo(){if(Ur)return Xe;Ur=1;var e=Ce();function t(){this.__data__=e?e(null):{},this.size=0}return Xe=t,Xe}var Je,Wr;function Oo(){if(Wr)return Je;Wr=1;function e(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r}return Je=e,Je}var Ye,Kr;function Po(){if(Kr)return Ye;Kr=1;var e=Ce(),t="__lodash_hash_undefined__",r=Object.prototype,n=r.hasOwnProperty;function a(i){var o=this.__data__;if(e){var c=o[i];return c===t?void 0:c}return n.call(o,i)?o[i]:void 0}return Ye=a,Ye}var Qe,Fr;function Eo(){if(Fr)return Qe;Fr=1;var e=Ce(),t=Object.prototype,r=t.hasOwnProperty;function n(a){var i=this.__data__;return e?i[a]!==void 0:r.call(i,a)}return Qe=n,Qe}var Ze,Vr;function Ao(){if(Vr)return Ze;Vr=1;var e=Ce(),t="__lodash_hash_undefined__";function r(n,a){var i=this.__data__;return this.size+=this.has(n)?0:1,i[n]=e&&a===void 0?t:a,this}return Ze=r,Ze}var et,Xr;function Mo(){if(Xr)return et;Xr=1;var e=qo(),t=Oo(),r=Po(),n=Eo(),a=Ao();function i(o){var c=-1,u=o==null?0:o.length;for(this.clear();++c<u;){var d=o[c];this.set(d[0],d[1])}}return i.prototype.clear=e,i.prototype.delete=t,i.prototype.get=r,i.prototype.has=n,i.prototype.set=a,et=i,et}var tt,Jr;function Do(){if(Jr)return tt;Jr=1;var e=Mo(),t=we(),r=cr();function n(){this.size=0,this.__data__={hash:new e,map:new(r||t),string:new e}}return tt=n,tt}var rt,Yr;function Io(){if(Yr)return rt;Yr=1;function e(t){var r=typeof t;return r=="string"||r=="number"||r=="symbol"||r=="boolean"?t!=="__proto__":t===null}return rt=e,rt}var nt,Qr;function Se(){if(Qr)return nt;Qr=1;var e=Io();function t(r,n){var a=r.__data__;return e(n)?a[typeof n=="string"?"string":"hash"]:a.map}return nt=t,nt}var at,Zr;function ko(){if(Zr)return at;Zr=1;var e=Se();function t(r){var n=e(this,r).delete(r);return this.size-=n?1:0,n}return at=t,at}var it,en;function Bo(){if(en)return it;en=1;var e=Se();function t(r){return e(this,r).get(r)}return it=t,it}var ot,tn;function $o(){if(tn)return ot;tn=1;var e=Se();function t(r){return e(this,r).has(r)}return ot=t,ot}var st,rn;function Go(){if(rn)return st;rn=1;var e=Se();function t(r,n){var a=e(this,r),i=a.size;return a.set(r,n),this.size+=a.size==i?0:1,this}return st=t,st}var ct,nn;function wa(){if(nn)return ct;nn=1;var e=Do(),t=ko(),r=Bo(),n=$o(),a=Go();function i(o){var c=-1,u=o==null?0:o.length;for(this.clear();++c<u;){var d=o[c];this.set(d[0],d[1])}}return i.prototype.clear=e,i.prototype.delete=t,i.prototype.get=r,i.prototype.has=n,i.prototype.set=a,ct=i,ct}var lt,an;function zo(){if(an)return lt;an=1;var e=we(),t=cr(),r=wa(),n=200;function a(i,o){var c=this.__data__;if(c instanceof e){var u=c.__data__;if(!t||u.length<n-1)return u.push([i,o]),this.size=++c.size,this;c=this.__data__=new r(u)}return c.set(i,o),this.size=c.size,this}return lt=a,lt}var ut,on;function Ho(){if(on)return ut;on=1;var e=we(),t=xo(),r=_o(),n=wo(),a=Co(),i=zo();function o(c){var u=this.__data__=new e(c);this.size=u.size}return o.prototype.clear=t,o.prototype.delete=r,o.prototype.get=n,o.prototype.has=a,o.prototype.set=i,ut=o,ut}var dt,sn;function No(){if(sn)return dt;sn=1;var e="__lodash_hash_undefined__";function t(r){return this.__data__.set(r,e),this}return dt=t,dt}var ft,cn;function Lo(){if(cn)return ft;cn=1;function e(t){return this.__data__.has(t)}return ft=e,ft}var ht,ln;function Uo(){if(ln)return ht;ln=1;var e=wa(),t=No(),r=Lo();function n(a){var i=-1,o=a==null?0:a.length;for(this.__data__=new e;++i<o;)this.add(a[i])}return n.prototype.add=n.prototype.push=t,n.prototype.has=r,ht=n,ht}var pt,un;function Wo(){if(un)return pt;un=1;function e(t,r){for(var n=-1,a=t==null?0:t.length;++n<a;)if(r(t[n],n,t))return!0;return!1}return pt=e,pt}var gt,dn;function Ko(){if(dn)return gt;dn=1;function e(t,r){return t.has(r)}return gt=e,gt}var vt,fn;function Ca(){if(fn)return vt;fn=1;var e=Uo(),t=Wo(),r=Ko(),n=1,a=2;function i(o,c,u,d,g,h){var m=u&n,y=o.length,S=c.length;if(y!=S&&!(m&&S>y))return!1;var x=h.get(o),w=h.get(c);if(x&&w)return x==c&&w==o;var j=-1,_=!0,T=u&a?new e:void 0;for(h.set(o,c),h.set(c,o);++j<y;){var q=o[j],A=c[j];if(d)var R=m?d(A,q,j,c,o,h):d(q,A,j,o,c,h);if(R!==void 0){if(R)continue;_=!1;break}if(T){if(!t(c,function(l,f){if(!r(T,f)&&(q===l||g(q,l,u,d,h)))return T.push(f)})){_=!1;break}}else if(!(q===A||g(q,A,u,d,h))){_=!1;break}}return h.delete(o),h.delete(c),_}return vt=i,vt}var mt,hn;function Fo(){if(hn)return mt;hn=1;var e=te(),t=e.Uint8Array;return mt=t,mt}var bt,pn;function Vo(){if(pn)return bt;pn=1;function e(t){var r=-1,n=Array(t.size);return t.forEach(function(a,i){n[++r]=[i,a]}),n}return bt=e,bt}var yt,gn;function Xo(){if(gn)return yt;gn=1;function e(t){var r=-1,n=Array(t.size);return t.forEach(function(a){n[++r]=a}),n}return yt=e,yt}var xt,vn;function Jo(){if(vn)return xt;vn=1;var e=Oi(),t=Fo(),r=ya(),n=Ca(),a=Vo(),i=Xo(),o=1,c=2,u="[object Boolean]",d="[object Date]",g="[object Error]",h="[object Map]",m="[object Number]",y="[object RegExp]",S="[object Set]",x="[object String]",w="[object Symbol]",j="[object ArrayBuffer]",_="[object DataView]",T=e?e.prototype:void 0,q=T?T.valueOf:void 0;function A(R,l,f,b,p,v,O){switch(f){case _:if(R.byteLength!=l.byteLength||R.byteOffset!=l.byteOffset)return!1;R=R.buffer,l=l.buffer;case j:return!(R.byteLength!=l.byteLength||!v(new t(R),new t(l)));case u:case d:case m:return r(+R,+l);case g:return R.name==l.name&&R.message==l.message;case y:case x:return R==l+"";case h:var M=a;case S:var P=b&o;if(M||(M=i),R.size!=l.size&&!P)return!1;var N=O.get(R);if(N)return N==l;b|=c,O.set(R,l);var H=n(M(R),M(l),b,p,v,O);return O.delete(R),H;case w:if(q)return q.call(R)==q.call(l)}return!1}return xt=A,xt}var _t,mn;function Yo(){if(mn)return _t;mn=1;function e(t,r){for(var n=-1,a=r.length,i=t.length;++n<a;)t[i+n]=r[n];return t}return _t=e,_t}var wt,bn;function lr(){if(bn)return wt;bn=1;var e=Array.isArray;return wt=e,wt}var Ct,yn;function Qo(){if(yn)return Ct;yn=1;var e=Yo(),t=lr();function r(n,a,i){var o=a(n);return t(n)?o:e(o,i(n))}return Ct=r,Ct}var St,xn;function Zo(){if(xn)return St;xn=1;function e(t,r){for(var n=-1,a=t==null?0:t.length,i=0,o=[];++n<a;){var c=t[n];r(c,n,t)&&(o[i++]=c)}return o}return St=e,St}var Rt,_n;function es(){if(_n)return Rt;_n=1;function e(){return[]}return Rt=e,Rt}var jt,wn;function ts(){if(wn)return jt;wn=1;var e=Zo(),t=es(),r=Object.prototype,n=r.propertyIsEnumerable,a=Object.getOwnPropertySymbols,i=a?function(o){return o==null?[]:(o=Object(o),e(a(o),function(c){return n.call(o,c)}))}:t;return jt=i,jt}var Tt,Cn;function rs(){if(Cn)return Tt;Cn=1;function e(t,r){for(var n=-1,a=Array(t);++n<t;)a[n]=r(n);return a}return Tt=e,Tt}var qt,Sn;function ns(){if(Sn)return qt;Sn=1;var e=be(),t=ye(),r="[object Arguments]";function n(a){return t(a)&&e(a)==r}return qt=n,qt}var Ot,Rn;function as(){if(Rn)return Ot;Rn=1;var e=ns(),t=ye(),r=Object.prototype,n=r.hasOwnProperty,a=r.propertyIsEnumerable,i=e((function(){return arguments})())?e:function(o){return t(o)&&n.call(o,"callee")&&!a.call(o,"callee")};return Ot=i,Ot}var le={exports:{}},Pt,jn;function is(){if(jn)return Pt;jn=1;function e(){return!1}return Pt=e,Pt}le.exports;var Tn;function Sa(){return Tn||(Tn=1,(function(e,t){var r=te(),n=is(),a=t&&!t.nodeType&&t,i=a&&!0&&e&&!e.nodeType&&e,o=i&&i.exports===a,c=o?r.Buffer:void 0,u=c?c.isBuffer:void 0,d=u||n;e.exports=d})(le,le.exports)),le.exports}var Et,qn;function os(){if(qn)return Et;qn=1;var e=9007199254740991,t=/^(?:0|[1-9]\d*)$/;function r(n,a){var i=typeof n;return a=a??e,!!a&&(i=="number"||i!="symbol"&&t.test(n))&&n>-1&&n%1==0&&n<a}return Et=r,Et}var At,On;function Ra(){if(On)return At;On=1;var e=9007199254740991;function t(r){return typeof r=="number"&&r>-1&&r%1==0&&r<=e}return At=t,At}var Mt,Pn;function ss(){if(Pn)return Mt;Pn=1;var e=be(),t=Ra(),r=ye(),n="[object Arguments]",a="[object Array]",i="[object Boolean]",o="[object Date]",c="[object Error]",u="[object Function]",d="[object Map]",g="[object Number]",h="[object Object]",m="[object RegExp]",y="[object Set]",S="[object String]",x="[object WeakMap]",w="[object ArrayBuffer]",j="[object DataView]",_="[object Float32Array]",T="[object Float64Array]",q="[object Int8Array]",A="[object Int16Array]",R="[object Int32Array]",l="[object Uint8Array]",f="[object Uint8ClampedArray]",b="[object Uint16Array]",p="[object Uint32Array]",v={};v[_]=v[T]=v[q]=v[A]=v[R]=v[l]=v[f]=v[b]=v[p]=!0,v[n]=v[a]=v[w]=v[i]=v[j]=v[o]=v[c]=v[u]=v[d]=v[g]=v[h]=v[m]=v[y]=v[S]=v[x]=!1;function O(M){return r(M)&&t(M.length)&&!!v[e(M)]}return Mt=O,Mt}var Dt,En;function cs(){if(En)return Dt;En=1;function e(t){return function(r){return t(r)}}return Dt=e,Dt}var ue={exports:{}};ue.exports;var An;function ls(){return An||(An=1,(function(e,t){var r=Pi(),n=t&&!t.nodeType&&t,a=n&&!0&&e&&!e.nodeType&&e,i=a&&a.exports===n,o=i&&r.process,c=(function(){try{var u=a&&a.require&&a.require("util").types;return u||o&&o.binding&&o.binding("util")}catch{}})();e.exports=c})(ue,ue.exports)),ue.exports}var It,Mn;function ja(){if(Mn)return It;Mn=1;var e=ss(),t=cs(),r=ls(),n=r&&r.isTypedArray,a=n?t(n):e;return It=a,It}var kt,Dn;function us(){if(Dn)return kt;Dn=1;var e=rs(),t=as(),r=lr(),n=Sa(),a=os(),i=ja(),o=Object.prototype,c=o.hasOwnProperty;function u(d,g){var h=r(d),m=!h&&t(d),y=!h&&!m&&n(d),S=!h&&!m&&!y&&i(d),x=h||m||y||S,w=x?e(d.length,String):[],j=w.length;for(var _ in d)(g||c.call(d,_))&&!(x&&(_=="length"||y&&(_=="offset"||_=="parent")||S&&(_=="buffer"||_=="byteLength"||_=="byteOffset")||a(_,j)))&&w.push(_);return w}return kt=u,kt}var Bt,In;function ds(){if(In)return Bt;In=1;var e=Object.prototype;function t(r){var n=r&&r.constructor,a=typeof n=="function"&&n.prototype||e;return r===a}return Bt=t,Bt}var $t,kn;function fs(){if(kn)return $t;kn=1;function e(t,r){return function(n){return t(r(n))}}return $t=e,$t}var Gt,Bn;function hs(){if(Bn)return Gt;Bn=1;var e=fs(),t=e(Object.keys,Object);return Gt=t,Gt}var zt,$n;function ps(){if($n)return zt;$n=1;var e=ds(),t=hs(),r=Object.prototype,n=r.hasOwnProperty;function a(i){if(!e(i))return t(i);var o=[];for(var c in Object(i))n.call(i,c)&&c!="constructor"&&o.push(c);return o}return zt=a,zt}var Ht,Gn;function gs(){if(Gn)return Ht;Gn=1;var e=xa(),t=Ra();function r(n){return n!=null&&t(n.length)&&!e(n)}return Ht=r,Ht}var Nt,zn;function vs(){if(zn)return Nt;zn=1;var e=us(),t=ps(),r=gs();function n(a){return r(a)?e(a):t(a)}return Nt=n,Nt}var Lt,Hn;function ms(){if(Hn)return Lt;Hn=1;var e=Qo(),t=ts(),r=vs();function n(a){return e(a,r,t)}return Lt=n,Lt}var Ut,Nn;function bs(){if(Nn)return Ut;Nn=1;var e=ms(),t=1,r=Object.prototype,n=r.hasOwnProperty;function a(i,o,c,u,d,g){var h=c&t,m=e(i),y=m.length,S=e(o),x=S.length;if(y!=x&&!h)return!1;for(var w=y;w--;){var j=m[w];if(!(h?j in o:n.call(o,j)))return!1}var _=g.get(i),T=g.get(o);if(_&&T)return _==o&&T==i;var q=!0;g.set(i,o),g.set(o,i);for(var A=h;++w<y;){j=m[w];var R=i[j],l=o[j];if(u)var f=h?u(l,R,j,o,i,g):u(R,l,j,i,o,g);if(!(f===void 0?R===l||d(R,l,c,u,g):f)){q=!1;break}A||(A=j=="constructor")}if(q&&!A){var b=i.constructor,p=o.constructor;b!=p&&"constructor"in i&&"constructor"in o&&!(typeof b=="function"&&b instanceof b&&typeof p=="function"&&p instanceof p)&&(q=!1)}return g.delete(i),g.delete(o),q}return Ut=a,Ut}var Wt,Ln;function ys(){if(Ln)return Wt;Ln=1;var e=ie(),t=te(),r=e(t,"DataView");return Wt=r,Wt}var Kt,Un;function xs(){if(Un)return Kt;Un=1;var e=ie(),t=te(),r=e(t,"Promise");return Kt=r,Kt}var Ft,Wn;function _s(){if(Wn)return Ft;Wn=1;var e=ie(),t=te(),r=e(t,"Set");return Ft=r,Ft}var Vt,Kn;function ws(){if(Kn)return Vt;Kn=1;var e=ie(),t=te(),r=e(t,"WeakMap");return Vt=r,Vt}var Xt,Fn;function Cs(){if(Fn)return Xt;Fn=1;var e=ys(),t=cr(),r=xs(),n=_s(),a=ws(),i=be(),o=_a(),c="[object Map]",u="[object Object]",d="[object Promise]",g="[object Set]",h="[object WeakMap]",m="[object DataView]",y=o(e),S=o(t),x=o(r),w=o(n),j=o(a),_=i;return(e&&_(new e(new ArrayBuffer(1)))!=m||t&&_(new t)!=c||r&&_(r.resolve())!=d||n&&_(new n)!=g||a&&_(new a)!=h)&&(_=function(T){var q=i(T),A=q==u?T.constructor:void 0,R=A?o(A):"";if(R)switch(R){case y:return m;case S:return c;case x:return d;case w:return g;case j:return h}return q}),Xt=_,Xt}var Jt,Vn;function Ss(){if(Vn)return Jt;Vn=1;var e=Ho(),t=Ca(),r=Jo(),n=bs(),a=Cs(),i=lr(),o=Sa(),c=ja(),u=1,d="[object Arguments]",g="[object Array]",h="[object Object]",m=Object.prototype,y=m.hasOwnProperty;function S(x,w,j,_,T,q){var A=i(x),R=i(w),l=A?g:a(x),f=R?g:a(w);l=l==d?h:l,f=f==d?h:f;var b=l==h,p=f==h,v=l==f;if(v&&o(x)){if(!o(w))return!1;A=!0,b=!1}if(v&&!b)return q||(q=new e),A||c(x)?t(x,w,j,_,T,q):r(x,w,l,j,_,T,q);if(!(j&u)){var O=b&&y.call(x,"__wrapped__"),M=p&&y.call(w,"__wrapped__");if(O||M){var P=O?x.value():x,N=M?w.value():w;return q||(q=new e),T(P,N,j,_,q)}}return v?(q||(q=new e),n(x,w,j,_,T,q)):!1}return Jt=S,Jt}var Yt,Xn;function Rs(){if(Xn)return Yt;Xn=1;var e=Ss(),t=ye();function r(n,a,i,o,c){return n===a?!0:n==null||a==null||!t(n)&&!t(a)?n!==n&&a!==a:e(n,a,i,o,r,c)}return Yt=r,Yt}var Qt,Jn;function js(){if(Jn)return Qt;Jn=1;var e=Rs();function t(r,n){return e(r,n)}return Qt=t,Qt}var Ts=js();const or=na(Ts),ur={dark:{default:{borderWidth:1,pieceSize:20,gapBetweenPieces:4,borderColor:J("#fff",.16),completeColor:he.dark.primary,backgroundColor:"#2e3438",readerColor:"#0a0a0a",readerHaloColor:J("#fff",.55),rangeColor:"#cda184",rangeEmptyColor:J("#cda184",.3)},mini:{cacheMaxHeight:420,borderWidth:2,pieceSize:26,gapBetweenPieces:5,borderColor:J("#fff",.2),completeColor:he.dark.primary,backgroundColor:"#3a4145",readerColor:"#0a0a0a",readerHaloColor:J("#fff",.5),rangeColor:"#cda184",rangeEmptyColor:J("#cda184",.32)}},light:{default:{borderWidth:1,pieceSize:20,gapBetweenPieces:4,borderColor:"#d0e6da",completeColor:he.light.primary,backgroundColor:"#ffffff",readerColor:"#000",readerHaloColor:J("#fff",.9),rangeColor:"#7e6bc4",rangeEmptyColor:J("#afa6e3",.32)},mini:{cacheMaxHeight:420,borderWidth:2,pieceSize:26,gapBetweenPieces:5,borderColor:"#b7d9c8",completeColor:he.light.primary,backgroundColor:"#f4faf7",readerColor:"#0a0a0a",readerHaloColor:J("#fff",.9),rangeColor:"#7e6bc4",rangeEmptyColor:J("#afa6e3",.36)}}},qs=(e,t,r,n=0)=>{const a=e.pieceSize,i=e.gapBetweenPieces;if(!t||t<=0)return{pieceSize:a,gap:i};if(r){const o=t<280?7:t<400?9:11,c=Math.floor((t-8)/o)-i;return{pieceSize:Math.max(22,Math.min(28,c>0?c:a)),gap:Math.max(4,Math.min(i,6))}}return{pieceSize:Math.max(18,a),gap:Math.max(4,i)}},Yn=z.div`
  margin-top: 10px;
  text-transform: uppercase;
  align-self: center;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: ${({$themeType:e})=>e==="dark"?"rgba(255, 255, 255, 0.55)":"rgba(0, 0, 0, 0.5)"};
`,Os=z.div`
  position: absolute;
  z-index: 2;
  pointer-events: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.3;
  white-space: nowrap;
  background: rgba(20, 28, 24, 0.92);
  color: #fff;
`,Ps=z.div`
  width: 100%;
  min-width: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  position: relative;

  ${({$isMini:e,$themeType:t})=>e?G`
          display: grid;
          justify-content: center;
          max-height: ${ur[t??"light"].mini.cacheMaxHeight}px;
        `:G`
          max-height: min(70vh, 640px);
        `}

  canvas {
    display: block;
    max-width: 100%;
  }
`,Es=e=>Math.max(0,Math.min(1,e)),As=(e,t,r,n,a)=>{e.fillStyle=n,e.fillRect(0,0,t,t);const i=Es(r/100);if(i<=0)return;if(i>=1){e.fillStyle=a,e.fillRect(0,0,t,t);return}const o=Math.max(2,Math.round(t*i));e.fillStyle=a,e.fillRect(0,t-o,t,Math.min(o,t))},oe=(e,t,r,n)=>{const a=n/2;e.lineWidth=n,e.strokeStyle=r,e.strokeRect(a,a,t-n,t-n)},Ms=({ctx:e,cells:t,canvasWidth:r,canvasHeight:n,piecesInOneRow:a,pieceSize:i,gap:o,startingX:c,theme:u,variant:d,isSnakeDebugMode:g,isMini:h})=>{const m=ur[u][d],{borderWidth:y,backgroundColor:S,borderColor:x,completeColor:w,readerColor:j,readerHaloColor:_,rangeColor:T,rangeEmptyColor:q}=m;e.clearRect(0,0,r,n),e.imageSmoothingEnabled=!1;const A=y%2===1?.5:0,R=u==="dark",l=q||(R?"rgba(205, 161, 132, 0.28)":"rgba(175, 166, 227, 0.32)");for(let f=0;f<t.length;f++){const b=t[f]||{percentage:0,priority:0},p=b.percentage||0,v=!!b.completed||p>=100,O=p>0&&!v,M=!!b.isReader,P=!!b.isReaderRange,N=f%a,H=Math.floor(f/a),K=c+N*(i+o)+A,L=H*(i+o)+A;e.save(),e.translate(K,L);const B=P&&!v&&!O?l:S;if(As(e,i,v?100:p,B,O||v?w:B),M?(_&&oe(e,i,_,h?4:3),oe(e,i,j,h?2.5:2)):P?oe(e,i,T,2):O||v?oe(e,i,w,Math.max(y,2)):oe(e,i,x,y),g){const W=fa(b.priority||0);if(W){const U=Math.max(9,Math.min(h?13:11,Math.floor(i*.55)));e.font=`bold ${U}px ui-monospace, SFMono-Regular, Menlo, monospace`,e.textAlign="center",e.textBaseline="middle";const E=i/2,I=i/2;e.lineWidth=3,e.strokeStyle=R?"rgba(0,0,0,0.85)":"rgba(255,255,255,0.95)",e.strokeText(W,E,I),e.fillStyle=R?"#fff":"#1a1a1a",e.fillText(W,E,I)}}e.restore()}},Ds=(e,t,r)=>{const n=Math.min(window.devicePixelRatio||1,2);e.width=Math.max(1,Math.round(t*n)),e.height=Math.max(1,Math.round(r*n)),e.style.width=`${t}px`,e.style.height=`${r}px`;const a=e.getContext("2d");return a?(a.setTransform(n,0,0,n,0,0),a):null},Is=(e,t,r)=>{const{piecesInOneRow:n,pieceSize:a,gap:i,startingX:o,cellCount:c}=r;if(n<1||c<1||a<=0)return-1;const u=a+i,d=e-o;if(d<0||t<0)return-1;const g=Math.floor(d/u),h=Math.floor(t/u);if(g<0||g>=n)return-1;const m=d-g*u,y=t-h*u;if(m>a||y>a)return-1;const S=h*n+g;return S<0||S>=c?-1:S},ks=()=>({percentage:0,priority:0,isReader:!1,isReaderRange:!1}),Bs=({cache:e,isMini:t,mode:r,isSnakeDebugMode:n})=>{const{t:a}=F(),o=(r||(t?"mini":"detailed"))==="mini",[c,u]=C.useState({width:0,height:0}),{width:d}=c,g=C.useRef(null),h=C.useRef(null),m=C.useRef(null),y=C.useRef(0),S=C.useRef(!0),x=C.useRef(0),[w,j]=C.useState(null),_=C.useMemo(()=>zi(d,o),[d,o]),T=Ui(e,_),q=T.cells,A=o?"mini":"default",{isDarkMode:R}=C.useContext(aa),l=R?ar.DARK:ar.LIGHT,f=ur[l][A],{cacheMaxHeight:b}=f,{pieceSize:p,gap:v}=C.useMemo(()=>qs(f,d,o,q.length),[f,d,o,q.length]),O=d>0?o?Math.max(d-8,d*.96):d:0,M=p+v,P=O>0?Math.max(1,Math.floor(O/M)):0,N=C.useMemo(()=>P?q:[],[q,P]),H=P>0?Math.ceil((O-M*P)/2):0,K=o?4:6,L=P>0?Math.max(N.length>0?Math.ceil(N.length/P):K,K)*M:0,B=C.useMemo(()=>N.length>0?N:Array.from({length:Math.max(P,1)*K},ks),[N,P,K]);C.useEffect(()=>{const E=g.current;if(!(!E||!O||!L||!P))return cancelAnimationFrame(y.current),y.current=requestAnimationFrame(()=>{const I=Ds(E,O,L);I&&Ms({ctx:I,cells:B,canvasWidth:O,canvasHeight:L,piecesInOneRow:P,pieceSize:p,gap:v,startingX:H,theme:l,variant:A,isSnakeDebugMode:n,isMini:o})}),()=>cancelAnimationFrame(y.current)},[L,O,P,H,p,v,B,A,o,l,n]),C.useEffect(()=>{if(!h.current||!P||M<=0||!S.current)return;const E=ha(e,_);if(!E||T.windowStart==null)return;const I=E.readerPiece-T.windowStart;if(I<0)return;const k=Math.floor(I/P)*M,$=h.current,Y=$.scrollTop,Re=Y+$.clientHeight;(k<Y||k+M>Re)&&($.scrollTop=Math.max(0,k-$.clientHeight/3))},[e,_,T.windowStart,P,M,B]),C.useEffect(()=>{const E=h.current;if(!E)return;const I=()=>{S.current=!1,window.clearTimeout(x.current),x.current=window.setTimeout(()=>{S.current=!0},4e3)};return E.addEventListener("wheel",I,{passive:!0}),E.addEventListener("touchstart",I,{passive:!0}),E.addEventListener("pointerdown",I),()=>{window.clearTimeout(x.current),E.removeEventListener("wheel",I),E.removeEventListener("touchstart",I),E.removeEventListener("pointerdown",I)}},[d]);const W=C.useCallback(E=>{const I=E.pieceStart,D=E.pieceEnd;if(I==null)return"";const k=E.completed||(E.percentage||0)>=99.5?100:Math.round(E.percentage||0),$=fa(E.priority||0),Y=$?` · ${$}`:"";return D!=null&&D!==I?a("SnakeTooltipBucket",{start:I,end:D,fill:k})+Y:a("SnakeTooltipPiece",{id:I,fill:k})+Y},[a]),U=C.useCallback(E=>{if(!P){j(null);return}const I=g.current,D=m.current;if(!I||!D)return;const k=I.getBoundingClientRect(),$=D.getBoundingClientRect(),Y=E.clientX-k.left,Re=E.clientY-k.top,dr=Is(Y,Re,{piecesInOneRow:P,pieceSize:p,gap:v,startingX:H,cellCount:B.length});if(dr<0){j(null);return}const fr=W(B[dr]);if(!fr){j(null);return}j({x:E.clientX-$.left+12,y:E.clientY-$.top+12,text:fr})},[P,p,v,H,B,W]);return s.jsx(sr,{bounds:!0,onResize:({bounds:E})=>E&&u(E),children:({measureRef:E})=>s.jsxs("div",{style:{display:"flex",flexDirection:"column",width:"100%",minWidth:0,position:"relative"},ref:I=>{m.current=I,E(I)},children:[s.jsx(Ps,{ref:h,$themeType:l,$isMini:o,children:P>0&&L>0?s.jsx("canvas",{ref:g,onMouseMove:U,onMouseLeave:()=>j(null)}):null}),w&&s.jsx(Os,{style:{left:w.x,top:w.y},children:w.text}),T.windowStart!=null&&T.windowEnd!=null&&T.windowEnd>=T.windowStart&&s.jsx(Yn,{$themeType:l,children:a("SnakeFocusRange",{start:T.windowStart,end:T.windowEnd})}),o&&b!=null&&L>=b&&s.jsx(Yn,{$themeType:l,children:a("ScrollDown")})]})})},Ta=C.memo(Bs,(e,t)=>e.isMini===t.isMini&&e.mode===t.mode&&e.isSnakeDebugMode===t.isSnakeDebugMode&&or(e.cache.Pieces,t.cache.Pieces)&&or(e.cache.Readers,t.cache.Readers)&&e.cache.PiecesCount===t.cache.PiecesCount&&e.cache.PiecesLength===t.cache.PiecesLength&&e.cache.Capacity===t.cache.Capacity&&e.cache.Filled===t.cache.Filled),qa=G`
  ${({theme:{table:{defaultPrimaryColor:e}}})=>G`
    &::before {
      content: '';
      width: 10px;
      height: 10px;
      background: ${e};
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `}
`,$s=z.table`
  ${({theme:{table:{defaultPrimaryColor:e,rowBGColor:t,viewedRowBGColor:r,dividerColor:n,rowFontColor:a}}})=>G`
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.8125rem;
    width: 100%;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    color: ${a};

    thead tr {
      background: ${e};
      color: #fff;
      text-align: left;
      text-transform: uppercase;
      font-size: 0.75rem;
      font-weight: 500;
    }

    th,
    td {
      padding: 10px 12px;
    }

    tbody tr {
      border-bottom: 1px solid ${n};
      background: ${t};

      &:last-of-type {
        border-bottom: 2px solid ${e};
      }

      &.viewed-file-row {
        background: ${r};
      }
    }

    td {
      &.viewed-file-indicator {
        position: relative;

        ${qa}
      }
    }

    .button-cell {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
      gap: 6px;
      min-width: 0;
      width: 100%;

      > * {
        min-width: 0;
        display: flex;
      }

      .MuiButton-root {
        width: 100%;
        min-width: 0;
        min-height: 32px;
        height: 32px;
        padding: 0 8px;
        font-size: 12px;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .MuiButton-outlined {
        border-color: rgba(0, 152, 121, 0.45);
      }
    }

    @media (max-width: 970px) {
      display: none;
    }
  `}
`,Gs=z.div`
  display: none;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 970px) {
    display: grid;
  }

  @media (max-width: 820px) {
    gap: 15px;
    grid-template-columns: 1fr;
  }
`,zs=z.div`
  ${({$isViewed:e,theme:{table:{defaultPrimaryColor:t,defaultSecondaryColor:r,defaultTertiaryColor:n,shortTableButtonsBGColor:a,viewedPrimaryColor:i,viewedSecondaryColor:o,viewedTertiaryColor:c}}})=>G`
    display: grid;
    width: 100%;
    grid-template-rows: repeat(3, max-content);
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

    .short-table {
      &-name {
        background: ${e?i:t};
        display: grid;
        place-items: center;
        padding: 15px;
        color: #fff;
        text-transform: uppercase;
        font-size: 13px;
        font-weight: 600;

        @media (max-width: 880px) {
          font-size: 12px;
          padding: 10px;
        }
      }
      &-data {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: ${e?"max-content":"1fr"};
        grid-auto-columns: 1fr;
      }
      &-field {
        display: grid;
        grid-template-rows: 30px 1fr;
        background: ${e?i:t};
        &:not(:last-child) {
          border-right: 1px solid ${e?i:t};
        }

        &-name {
          background: ${e?o:r};
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 500;
          display: grid;
          place-items: center;
          padding: 0 10px;

          @media (max-width: 880px) {
            font-size: 11px;
          }
        }

        &-value {
          background: ${e?c:n};
          display: grid;
          place-items: center;
          color: #fff;
          font-size: 13px;
          padding: 12px 10px;
          position: relative;

          @media (max-width: 880px) {
            font-size: 12px;
            padding: 10px 8px;
          }
        }
      }

      &-viewed-indicator {
        ${e&&qa}
      }

      &-buttons {
        padding: 20px;
        border-bottom: 2px solid ${e?i:t};
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        align-items: center;
        gap: 20px;
        background: ${a};

        .MuiButton-root {
          min-height: 44px;
        }

        @media (max-width: 410px) {
          gap: 10px;
          grid-template-columns: 1fr;
        }
      }
    }
  `}
`;var se={},Zt,Qn;function Hs(){return Qn||(Qn=1,Zt=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,r=[],n=0;n<e.rangeCount;n++)r.push(e.getRangeAt(n));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||r.forEach(function(a){e.addRange(a)}),t&&t.focus()}}),Zt}var er,Zn;function Ns(){if(Zn)return er;Zn=1;var e=Hs(),t={"text/plain":"Text","text/html":"Url",default:"Text"},r="Copy to clipboard: #{key}, Enter";function n(i){var o=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return i.replace(/#{\s*key\s*}/g,o)}function a(i,o){var c,u,d,g,h,m,y=!1;o||(o={}),c=o.debug||!1;try{d=e(),g=document.createRange(),h=document.getSelection(),m=document.createElement("span"),m.textContent=i,m.ariaHidden="true",m.style.all="unset",m.style.position="fixed",m.style.top=0,m.style.clip="rect(0, 0, 0, 0)",m.style.whiteSpace="pre",m.style.webkitUserSelect="text",m.style.MozUserSelect="text",m.style.msUserSelect="text",m.style.userSelect="text",m.addEventListener("copy",function(x){if(x.stopPropagation(),o.format)if(x.preventDefault(),typeof x.clipboardData>"u"){c&&console.warn("unable to use e.clipboardData"),c&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var w=t[o.format]||t.default;window.clipboardData.setData(w,i)}else x.clipboardData.clearData(),x.clipboardData.setData(o.format,i);o.onCopy&&(x.preventDefault(),o.onCopy(x.clipboardData))}),document.body.appendChild(m),g.selectNodeContents(m),h.addRange(g);var S=document.execCommand("copy");if(!S)throw new Error("copy command was unsuccessful");y=!0}catch(x){c&&console.error("unable to copy using execCommand: ",x),c&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(o.format||"text",i),o.onCopy&&o.onCopy(window.clipboardData),y=!0}catch(w){c&&console.error("unable to copy using clipboardData: ",w),c&&console.error("falling back to prompt"),u=n("message"in o?o.message:r),window.prompt(u,i)}}finally{h&&(typeof h.removeRange=="function"?h.removeRange(g):h.removeAllRanges()),m&&document.body.removeChild(m),d()}return y}return er=a,er}var ea;function Ls(){if(ea)return se;ea=1,Object.defineProperty(se,"__esModule",{value:!0}),se.CopyToClipboard=void 0;var e=n(Ns()),t=n(ka()),r=["text","onCopy","options","children"];function n(l){return l&&l.__esModule?l:{default:l}}function a(l){"@babel/helpers - typeof";return a=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(f){return typeof f}:function(f){return f&&typeof Symbol=="function"&&f.constructor===Symbol&&f!==Symbol.prototype?"symbol":typeof f},a(l)}function i(l,f){var b=Object.keys(l);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(l);f&&(p=p.filter(function(v){return Object.getOwnPropertyDescriptor(l,v).enumerable})),b.push.apply(b,p)}return b}function o(l){for(var f=1;f<arguments.length;f++){var b=arguments[f]!=null?arguments[f]:{};f%2?i(Object(b),!0).forEach(function(p){T(l,p,b[p])}):Object.getOwnPropertyDescriptors?Object.defineProperties(l,Object.getOwnPropertyDescriptors(b)):i(Object(b)).forEach(function(p){Object.defineProperty(l,p,Object.getOwnPropertyDescriptor(b,p))})}return l}function c(l,f){if(l==null)return{};var b,p,v=u(l,f);if(Object.getOwnPropertySymbols){var O=Object.getOwnPropertySymbols(l);for(p=0;p<O.length;p++)b=O[p],f.indexOf(b)===-1&&{}.propertyIsEnumerable.call(l,b)&&(v[b]=l[b])}return v}function u(l,f){if(l==null)return{};var b={};for(var p in l)if({}.hasOwnProperty.call(l,p)){if(f.indexOf(p)!==-1)continue;b[p]=l[p]}return b}function d(l,f){if(!(l instanceof f))throw new TypeError("Cannot call a class as a function")}function g(l,f){for(var b=0;b<f.length;b++){var p=f[b];p.enumerable=p.enumerable||!1,p.configurable=!0,"value"in p&&(p.writable=!0),Object.defineProperty(l,q(p.key),p)}}function h(l,f,b){return f&&g(l.prototype,f),Object.defineProperty(l,"prototype",{writable:!1}),l}function m(l,f,b){return f=w(f),y(l,x()?Reflect.construct(f,b||[],w(l).constructor):f.apply(l,b))}function y(l,f){if(f&&(a(f)=="object"||typeof f=="function"))return f;if(f!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return S(l)}function S(l){if(l===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return l}function x(){try{var l=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(x=function(){return!!l})()}function w(l){return w=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(f){return f.__proto__||Object.getPrototypeOf(f)},w(l)}function j(l,f){if(typeof f!="function"&&f!==null)throw new TypeError("Super expression must either be null or a function");l.prototype=Object.create(f&&f.prototype,{constructor:{value:l,writable:!0,configurable:!0}}),Object.defineProperty(l,"prototype",{writable:!1}),f&&_(l,f)}function _(l,f){return _=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(b,p){return b.__proto__=p,b},_(l,f)}function T(l,f,b){return(f=q(f))in l?Object.defineProperty(l,f,{value:b,enumerable:!0,configurable:!0,writable:!0}):l[f]=b,l}function q(l){var f=A(l,"string");return a(f)=="symbol"?f:f+""}function A(l,f){if(a(l)!="object"||!l)return l;var b=l[Symbol.toPrimitive];if(b!==void 0){var p=b.call(l,f);if(a(p)!="object")return p;throw new TypeError("@@toPrimitive must return a primitive value.")}return(f==="string"?String:Number)(l)}var R=se.CopyToClipboard=(function(l){function f(){var b;d(this,f);for(var p=arguments.length,v=new Array(p),O=0;O<p;O++)v[O]=arguments[O];return b=m(this,f,[].concat(v)),T(b,"onClick",function(M){var P=b.props,N=P.text,H=P.onCopy,K=P.children,L=P.options,B=t.default.Children.only(K),W=(0,e.default)(N,L);H&&H(N,W),B!=null&&B.props&&typeof B.props.onClick=="function"&&B.props.onClick(M)}),b}return j(f,l),h(f,[{key:"render",value:function(){var p=this.props;p.text,p.onCopy,p.options;var v=p.children,O=c(p,r),M=t.default.Children.only(v);return t.default.cloneElement(M,o(o({},O),{},{onClick:this.onClick}))}}])})(t.default.PureComponent);return T(R,"defaultProps",{onCopy:void 0,options:void 0}),se}var tr,ta;function Us(){if(ta)return tr;ta=1;var e=Ls(),t=e.CopyToClipboard;return t.CopyToClipboard=t,tr=t,tr}var Oa=Us();const Ws=na(Oa),ge={width:"100%",minWidth:0};function ra({preloadLabel:e,onPreload:t,playerSupported:r,playerTitle:n,playerSrc:a,downloadSrc:i,hls:o,heartbeatSrc:c,onPlayerNotSupported:u,openLinkHref:d,showOpenLink:g,copyText:h,externalPlayers:m}){const{t:y}=F(),S=ia();return s.jsxs("div",{className:"button-cell",children:[s.jsx(Te,{title:e,children:s.jsx(V,{onClick:t,variant:"outlined",color:"primary",size:"small",sx:ge,children:e})}),r?s.jsx(za,{title:n,videoSrc:a,downloadSrc:i,hls:o,heartbeatSrc:c,onNotSupported:u,inlineTrigger:!0}):g&&d&&s.jsx(Te,{title:y("OpenLink"),children:s.jsx(V,{component:"a",href:d,target:"_blank",rel:"noreferrer",variant:"outlined",color:"primary",size:"small",sx:ge,children:y("OpenLink")})}),m.map(x=>s.jsx(Te,{title:x.label,children:s.jsx(V,{component:"a",href:x.href,variant:"outlined",color:"primary",size:"small",sx:ge,children:x.label})},x.label)),s.jsx(Ws,{text:h,onCopy:()=>S==null?void 0:S.showToast({message:y("Copied",{defaultValue:"Copied"}),severity:"success"}),children:s.jsx(V,{variant:"outlined",color:"primary",size:"small",sx:ge,children:y("CopyLink")})})]})}X.addHandler("episode",/(\d{1,4})[- |. ]серия|серия[- |. ](\d{1,4})/i,{type:"integer"});X.addHandler("season",/sezon[- |. ](\d{1,3})|(\d{1,3})[- |. ]sezon/i,{type:"integer"});X.addHandler("season",/сезон[- |. ](\d{1,3})|(\d{1,3})[- |. ]сезон/i,{type:"integer"});const Ks=C.memo(({playableFileList:e,viewedFileList:t,selectedSeason:r,seasonAmount:n,hash:a})=>{const{t:i}=F(),[o,c]=C.useState({}),u=Ha(),d=p=>fetch(`${hr()}?link=${a}&index=${p}&preload`),g=(p,v)=>`${hr()}/${encodeURIComponent(p.split("\\").pop().split("/").pop())}?link=${a}&index=${v}&play`,h=(p,v)=>{const O=Wa(p,u);return{key:`${v}:${O?"gst":"stream"}`,src:O?Fa(a,v):g(p,v),hls:O,heartbeatSrc:O?Ka(a):""}},m=p=>{c(v=>({...v,[p]:!0}))},y=!!(e!=null&&e.find(({path:p})=>X.parse(p).episode)),S=!!(e!=null&&e.find(({path:p})=>X.parse(p).season)),x=!!(e!=null&&e.find(({path:p})=>X.parse(p).resolution)),w=((e==null?void 0:e.length)??0)>1&&!y,j=ce("isVlcUsed"),_=ce("isInfuseUsed"),T=ce("isSenPlayerUsed"),q=ce("isIinaUsed"),A=Na(),R=La(),l=Ua(),f=!A||!(l&&_)&&!(l&&T)&&!j&&!(R&&q),b=(p,v,O,M)=>{const P=[];return l&&_&&P.push({label:i("Infuse"),href:v}),l&&T&&P.push({label:i("SenPlayer"),href:O}),j&&P.push({label:"VLC",href:`vlc://${p}`}),R&&q&&P.push({label:"IINA",href:M}),P};return e!=null&&e.length?s.jsxs(s.Fragment,{children:[s.jsxs($s,{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{style:{width:"0"},children:i("Viewed")}),s.jsx("th",{children:i("Name")}),S&&(n==null?void 0:n.length)===1&&s.jsx("th",{style:{width:"0"},children:i("Season")}),y&&s.jsx("th",{style:{width:"0"},children:i("Episode")}),x&&s.jsx("th",{style:{width:"0"},children:i("Resolution")}),s.jsx("th",{style:{width:"100px"},children:i("Size")}),s.jsx("th",{style:{width:"340px"},children:i("Actions")})]})}),s.jsx("tbody",{children:e.map(({id:p,path:v,length:O})=>{const{title:M,resolution:P,episode:N,season:H}=X.parse(v),K=t==null?void 0:t.includes(p),L=g(v,p),B=h(v,p),W=!o[B.key],U=new URL(L,window.location.href),E=`infuse://x-callback-url/play?url=${encodeURIComponent(U.toString())}`,I=`senplayer://x-callback-url/play?url=${encodeURIComponent(U.toString())}`,D=`iina://weblink?url=${encodeURIComponent(U.toString())}`;return(H===r||!(n!=null&&n.length))&&s.jsxs("tr",{className:K?"viewed-file-row":void 0,children:[s.jsx("td",{"data-label":"viewed","aria-label":"viewed",className:K?"viewed-file-indicator":void 0}),s.jsx("td",{"data-label":"name",children:w?v:M}),S&&(n==null?void 0:n.length)===1&&s.jsx("td",{"data-label":"season",children:H}),y&&s.jsx("td",{"data-label":"episode",children:N}),x&&s.jsx("td",{"data-label":"resolution",children:P}),s.jsx("td",{"data-label":"size",children:ee(O)}),s.jsx("td",{children:s.jsx(ra,{preloadLabel:i("Preload"),onPreload:()=>d(p),playerSupported:W,playerTitle:M,playerSrc:B.src,downloadSrc:L,hls:B.hls,heartbeatSrc:B.heartbeatSrc,onPlayerNotSupported:()=>m(B.key),openLinkHref:L,showOpenLink:f,copyText:U.toString(),externalPlayers:b(U,E,I,D)})})]},p)})})]}),s.jsx(Gs,{children:e.map(({id:p,path:v,length:O})=>{const{title:M,resolution:P,episode:N,season:H}=X.parse(v),K=t==null?void 0:t.includes(p),L=g(v,p),B=h(v,p),W=!o[B.key],U=new URL(L,window.location.href),E=`infuse://x-callback-url/play?url=${encodeURIComponent(U.toString())}`,I=`senplayer://x-callback-url/play?url=${encodeURIComponent(U.toString())}`,D=`iina://weblink?url=${encodeURIComponent(U.toString())}`;return(H===r||!(n!=null&&n.length))&&s.jsxs(zs,{$isViewed:K,children:[s.jsx("div",{className:"short-table-name",children:w?v:M}),s.jsxs("div",{className:"short-table-data",children:[K&&s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:i("Viewed")}),s.jsx("div",{className:"short-table-field-value",children:s.jsx("div",{className:"short-table-viewed-indicator"})})]}),S&&(n==null?void 0:n.length)===1&&s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:i("Season")}),s.jsx("div",{className:"short-table-field-value",children:H})]}),y&&s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:i("Episode")}),s.jsx("div",{className:"short-table-field-value",children:N})]}),x&&s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:i("Resolution")}),s.jsx("div",{className:"short-table-field-value",children:P})]}),s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:i("Size")}),s.jsx("div",{className:"short-table-field-value",children:ee(O)})]})]}),s.jsx("div",{className:"short-table-buttons",children:s.jsx(ra,{preloadLabel:i("Preload"),onPreload:()=>d(p),playerSupported:W,playerTitle:M,playerSrc:B.src,downloadSrc:L,hls:B.hls,heartbeatSrc:B.heartbeatSrc,onPlayerNotSupported:()=>m(B.key),openLinkHref:L,showOpenLink:f,copyText:U.toString(),externalPlayers:b(U,E,I,D)})})]},p)})})]}):i("NoPlayableFiles")},(e,t)=>or(e,t)),Fs=z.div`
  ${({theme:{dialogTorrentDetailsContent:{torrentFilesSectionBGColor:e}}})=>G`
    display: grid;
    grid-template-columns: minmax(0, 70%) minmax(0, 1fr);
    grid-template-rows: repeat(2, min-content);
    grid-template-areas:
      'main cache'
      'file-list file-list';
    min-width: 0;
    min-height: 100%;
    background: ${e};

    @media (max-width: 1200px) {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: repeat(3, min-content);
      grid-template-areas:
        'main'
        'cache'
        'file-list';
    }
  `}
`,Vs=z.div`
  ${({$poster:e,theme:{dialogTorrentDetailsContent:{posterBGColor:t}}})=>G`
    height: 400px;
    border-radius: 5px;
    overflow: hidden;
    align-self: center;

    ${e?G`
            img {
              border-radius: 5px;
              height: 100%;
              width: 100%;
              max-width: 100%;
              object-fit: cover;
            }
          `:G`
            width: 300px;
            display: grid;
            place-items: center;
            background: ${t};

            svg {
              transform: scale(2.5) translateY(-3px);
            }
          `}

    @media (max-width: 1280px) {
      align-self: start;
    }

    @media (max-width: 840px) {
      ${e?G`
              height: 200px;
            `:G`
              display: none;
            `}
    }
  `}
`,Xs=z.section`
  ${({theme:{dialogTorrentDetailsContent:{gradientStartColor:e,gradientEndColor:t}}})=>G`
    grid-area: main;
    padding: 24px;
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 20px;
    background: linear-gradient(145deg, ${e}, ${t});

    @media (max-width: 840px) {
      grid-template-columns: 1fr;
    }

    @media (max-width: 800px) {
      padding: 16px;
      gap: 16px;
    }

    @media (max-width: 420px) {
      padding: 12px;
      gap: 12px;
    }
  `}
`,Js=z.section`
  ${({theme:{dialogTorrentDetailsContent:{cacheSectionBGColor:e}}})=>G`
    grid-area: cache;
    align-self: start;
    padding: 24px;
    display: grid;
    align-content: start;
    grid-template-rows: min-content min-content min-content;
    background: ${e};
    min-width: 0;

    @media (max-width: 800px) {
      padding: 16px;
    }

    @media (max-width: 420px) {
      padding: 12px;
    }
  `}
`,Ys=z.section`
  ${({theme:{dialogTorrentDetailsContent:{torrentFilesSectionBGColor:e}}})=>G`
    grid-area: file-list;
    padding: 40px;
    box-shadow: inset 3px 25px 8px -25px rgba(0, 0, 0, 0.5);
    background: ${e};
    min-height: 100%;

    @media (max-width: 800px) {
      padding: 20px;
    }
  `}
`,de=z.div`
  ${({$mb:e,theme:{dialogTorrentDetailsContent:{subNameFontColor:t}}})=>G`
    ${e&&`margin-top: ${e/3}px`};
    ${e&&`margin-bottom: ${e}px`};
    line-height: 1.35;
    font-size: 14px;
    color: ${t};

    @media (max-width: 800px) {
      ${e&&`margin-top: ${e/4}px`};
      ${e&&`margin-bottom: ${e/2}px`};
      font-size: 13px;
    }
  `}
`,Z=z.div`
  ${({$color:e,$mb:t,theme:{dialogTorrentDetailsContent:{titleFontColor:r}}})=>G`
    ${t&&`margin-bottom: ${t}px`};
    font-size: 20px;
    font-weight: 400;
    line-height: 1.2;
    word-break: break-word;
    color: ${e||r};

    @media (max-width: 800px) {
      font-size: 17px;
      line-height: 1.2;
      ${t&&`margin-bottom: ${t/2}px`};
    }
  `}
`,Qs=z.div`
  margin-bottom: 20px;
`,Pa=z.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
  gap: 20px;

  @media (max-width: 800px) {
    gap: 15px;
  }
  @media (max-width: 410px) {
    gap: 10px;
  }

  ${({$detailedView:e})=>e?G`
          @media (max-width: 800px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          @media (max-width: 410px) {
            grid-template-columns: minmax(0, 1fr);
          }
        `:G`
          @media (max-width: 800px) {
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
          }
          @media (max-width: 480px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          @media (max-width: 390px) {
            grid-template-columns: minmax(0, 1fr);
          }
        `}
`,Zs=z.div`
  display: grid;
  grid-template-columns: 36px 1fr;
  grid-template-rows: min-content 40px;
  grid-template-areas:
    'title title'
    'icon value';

  > * {
    display: grid;
    place-items: center;
  }

  @media (max-width: 800px) {
    grid-template-columns: 30px 1fr;
    grid-template-rows: min-content 36px;
  }
`,ec=z.div`
  ${({theme:{dialogTorrentDetailsContent:{titleFontColor:e}}})=>G`
    grid-area: title;
    justify-self: start;
    text-transform: uppercase;
    font-size: 11px;
    margin-bottom: 2px;
    font-weight: 500;
    color: ${e};
  `}
`,tc=z.div`
  ${({$bgColor:e,$fontColor:t})=>G`
    grid-area: icon;
    color: ${t||J("#fff",.8)};
    background: ${e};
    border-radius: 8px 0 0 8px;

    @media (max-width: 800px) {
      > svg {
        width: 50%;
      }
    }
  `}
`,rc=z.div`
  ${({$bgColor:e,$fontColor:t,theme:{dialogTorrentDetailsContent:{widgetFontColor:r}}})=>G`
    grid-area: value;
    font-size: 15px;
    font-weight: 500;
    padding: 0 16px 0 0;
    color: ${t||r};
    background: ${e};
    border-radius: 0 8px 8px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;

    @media (max-width: 800px) {
      font-size: 13px;
      padding: 0 12px 0 0;
    }
  `}
`,nc=z.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.12);
  margin: 20px 0;
`,ac=z.div`
  ${({theme:{dialogTorrentDetailsContent:{torrentFilesSectionBGColor:e}}})=>G`
    overflow: auto;
    min-height: 100%;
    background: ${e};
  `}
`,ic=z.section`
  ${({theme:{detailedView:{gradientStartColor:e,gradientEndColor:t}}})=>G`
    padding: 40px;
    background: linear-gradient(145deg, ${e}, ${t});

    @media (max-width: 800px) {
      padding: 20px;
    }
  `}
`,oc=z.section`
  ${({theme:{detailedView:{cacheSectionBGColor:e}}})=>G`
    padding: 40px;
    box-shadow: inset 3px 25px 8px -25px rgba(0, 0, 0, 0.5);
    background: ${e};
    flex: 1;

    @media (max-width: 800px) {
      padding: 20px;
    }
  `}
`;function re({icon:e,title:t,value:r,iconBg:n,valueBg:a,fontColor:i}){return s.jsxs(Zs,{children:[s.jsx(ec,{children:t}),s.jsx(tc,{$bgColor:n,$fontColor:i,children:s.jsx(e,{})}),s.jsx(rc,{$bgColor:a,$fontColor:i,children:r})]})}const{LIGHT:sc,DARK:cc}=ar,lc={light:{downloadSpeed:{iconBGColor:"#118f00",valueBGColor:"#13a300"},uploadSpeed:{iconBGColor:"#0146ad",valueBGColor:"#0058db"},peers:{iconBGColor:"#cdc118",valueBGColor:"#d8cb18",fontColor:"#1a1a1a"},piecesCount:{iconBGColor:"#b6c95e",valueBGColor:"#c0d076"},piecesLength:{iconBGColor:"#0982c8",valueBGColor:"#098cd7"},status:{iconBGColor:"#aea25b",valueBGColor:"#b4aa6e"},size:{iconBGColor:"#9b01ad",valueBGColor:"#ac03bf"},category:{iconBGColor:"#914820",valueBGColor:"#c9632c"}},dark:{downloadSpeed:{iconBGColor:"#0c6600",valueBGColor:"#0d7000"},uploadSpeed:{iconBGColor:"#003f9e",valueBGColor:"#0047b3"},peers:{iconBGColor:"#a69c11",valueBGColor:"#b4a913",fontColor:"#1a1a1a"},piecesCount:{iconBGColor:"#8da136",valueBGColor:"#99ae3d"},piecesLength:{iconBGColor:"#07659c",valueBGColor:"#0872af"},status:{iconBGColor:"#938948",valueBGColor:"#9f9450"},size:{iconBGColor:"#81008f",valueBGColor:"#9102a1"},category:{iconBGColor:"#914820",valueBGColor:"#c9632c"}}};function ne(e){const{isDarkMode:t}=C.useContext(aa);return lc[t?cc:sc][e]}const Ea=({data:e})=>{const{t}=F(),{iconBGColor:r,valueBGColor:n}=ne("downloadSpeed");return s.jsx(re,{title:t("DownloadSpeed"),value:oa(e)||`0 ${t("bps")}`,iconBg:r,valueBg:n,icon:ui})},Aa=({data:e})=>{const{t}=F(),{iconBGColor:r,valueBGColor:n}=ne("uploadSpeed");return s.jsx(re,{title:t("UploadSpeed"),value:oa(e)||`0 ${t("bps")}`,iconBg:r,valueBg:n,icon:di})},Ma=({data:e})=>{const{t}=F(),{iconBGColor:r,valueBGColor:n,fontColor:a}=ne("peers");return s.jsx(re,{title:t("Peers"),value:Va(e)||"0 / 0 · 0",iconBg:r,valueBg:n,fontColor:a,icon:fi})},uc=({data:e})=>{const{t}=F(),{iconBGColor:r,valueBGColor:n}=ne("piecesCount");return s.jsx(re,{title:t("PiecesCount"),value:e,iconBg:r,valueBg:n,icon:pi})},dc=({data:e})=>{const{t}=F(),{iconBGColor:r,valueBGColor:n}=ne("piecesLength");return s.jsx(re,{title:t("PiecesLength"),value:ee(e),iconBg:r,valueBg:n,icon:gi})},Da=({stat:e})=>{const{t}=F(),r={[ca]:t("TorrentGettingInfo"),[Ya]:t("TorrentPreload"),[Ja]:t("TorrentWorking"),[Xa]:t("TorrentClosed"),[sa]:t("TorrentInDb")},{iconBGColor:n,valueBGColor:a}=ne("status");return s.jsx(re,{title:t("TorrentStatus"),value:e!=null?r[e]:void 0,iconBg:n,valueBg:a,icon:vi})},Ia=({data:e})=>{const{t}=F(),{iconBGColor:r,valueBGColor:n}=ne("size");return s.jsx(re,{title:t("TorrentSize"),value:ee(e),iconBg:r,valueBg:n,icon:hi})},fc=({data:e})=>{const{t}=F(),{iconBGColor:r,valueBGColor:n}=ne("category"),a=pr.findIndex(o=>o.key===e),i=pr.find(o=>o.key===e);return e?s.jsx(re,{title:t("Category"),value:a>=0?t(i.name):e.length>1?e.charAt(0).toUpperCase()+e.slice(1):e,iconBg:r,valueBg:n,icon:mi}):null};function hc({downloadSpeed:e,uploadSpeed:t,torrent:r,torrentSize:n,PiecesCount:a,PiecesLength:i,stat:o,cache:c,isSnakeDebugMode:u,setIsSnakeDebugMode:d}){const{t:g}=F();return s.jsxs(s.Fragment,{children:[s.jsxs(ic,{children:[s.jsx(Z,{$mb:20,children:g("Data")}),s.jsxs(Pa,{$detailedView:!0,children:[s.jsx(Ea,{data:e}),s.jsx(Aa,{data:t}),s.jsx(Ma,{data:r}),s.jsx(Ia,{data:n}),s.jsx(uc,{data:a}),s.jsx(dc,{data:i}),s.jsx(Da,{stat:o})]})]}),s.jsxs(oc,{children:[s.jsx(Z,{$mb:20,children:s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[s.jsx("span",{children:g("Cache")}),s.jsx(bi,{control:s.jsx(yi,{color:"primary",checked:u,disableRipple:!0,onChange:({target:{checked:h}})=>{d(h),Qa("isSnakeDebugMode",h)}}),label:g("DebugMode"),labelPlacement:"start"})]})}),s.jsx(Ta,{cache:c,mode:"detailed",isSnakeDebugMode:u})]})]})}const rr=z.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px 16px;
  align-items: stretch;

  &:not(:last-child) {
    margin-bottom: 24px;
  }

  > a,
  > span {
    display: flex;
    min-width: 0;
    width: 100%;
  }

  > .MuiButton-root,
  > a > .MuiButton-root,
  > span > .MuiButton-root {
    width: 100%;
    min-height: 44px;
    height: 100%;
    box-sizing: border-box;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`,nr=z.div`
  ${({$mb:e,theme:{torrentFunctions:{fontColor:t}}})=>G`
    ${e&&`margin-bottom: ${e}px`};
    font-size: 13px;
    font-weight: 500;
    line-height: 1.2;
    color: ${t};

    @media (max-width: 800px) {
      font-size: 12px;
      ${e&&`margin-bottom: ${e/1.5}px`};
    }
  `}
`,pc=C.memo(({hash:e,viewedFileList:t,playableFileList:r,name:n,title:a,setViewedFileList:i})=>{var _;const{t:o}=F(),c=ia(),[u,d]=C.useState(null),g=t==null?void 0:t[(t==null?void 0:t.length)-1],h=(_=r==null?void 0:r.find(({id:T})=>T===g))==null?void 0:_.path,m=(r==null?void 0:r.length)===1,y=h?X.parse(h):null,S=`${Za()}/${encodeURIComponent(n||a||"file")}.m3u?link=${e}&m3u`,x=`${S}&fromlast`,w=`magnet:?xt=urn:btih:${e}&dn=${encodeURIComponent(n||a||"")}`,j=()=>{u==="drop"&&fe.post(ei(),{action:"drop",hash:e}).then(()=>c==null?void 0:c.showToast({message:o("DropTorrent"),severity:"success"})).catch(()=>c==null?void 0:c.showToast({message:o("PlaybackError"),severity:"error"})),u==="views"&&fe.post(la(),{action:"rem",hash:e,file_index:-1}).then(()=>{i(),c==null||c.showToast({message:o("RemoveViews"),severity:"success"})}).catch(()=>c==null?void 0:c.showToast({message:o("PlaybackError"),severity:"error"})),d(null)};return s.jsxs(s.Fragment,{children:[!m&&!!(t!=null&&t.length)&&s.jsxs(s.Fragment,{children:[s.jsx(nr,{children:o("DownloadPlaylist")}),s.jsxs(de,{$mb:10,children:[o("LatestFilePlayed")," ",s.jsxs("strong",{children:[y==null?void 0:y.title,".",(y==null?void 0:y.season)&&s.jsxs(s.Fragment,{children:[" ",o("Season"),": ",y==null?void 0:y.season,". ",o("Episode"),": ",y==null?void 0:y.episode,"."]})]})]}),s.jsxs(rr,{children:[s.jsx(V,{component:"a",href:S,variant:"contained",color:"primary",size:"large",children:o("Full")}),s.jsx(V,{component:"a",href:x,variant:"contained",color:"primary",size:"large",children:o("FromLatestFile")})]})]}),s.jsx(nr,{$mb:10,children:o("TorrentState")}),s.jsxs(rr,{children:[s.jsx(V,{onClick:()=>d("views"),variant:"outlined",color:"primary",size:"large",children:o("RemoveViews")}),s.jsx(V,{onClick:()=>d("drop"),variant:"contained",color:"error",size:"large",children:o("DropTorrent")})]}),s.jsx(nr,{$mb:10,children:o("Info")}),s.jsxs(rr,{children:[(m||!(t!=null&&t.length))&&s.jsx(V,{component:"a",href:S,variant:"contained",color:"primary",size:"large",children:o("DownloadPlaylist")}),s.jsx(Oa.CopyToClipboard,{text:w,onCopy:()=>c==null?void 0:c.showToast({message:o("Copied"),severity:"success"}),children:s.jsx(V,{variant:"contained",color:"primary",size:"large",children:o("CopyHash")})})]}),s.jsxs(xi,{open:u!=null,onClose:()=>d(null),"aria-labelledby":"torrent-fn-confirm-title",children:[s.jsx(_i,{id:"torrent-fn-confirm-title",children:o(u==="drop"?"DropTorrent":"RemoveViews")}),s.jsx(wi,{children:s.jsx(Ci,{children:o(u==="drop"?"ConfirmDropTorrent":"ConfirmRemoveViews")})}),s.jsxs(Si,{children:[s.jsx(V,{autoFocus:!0,onClick:()=>d(null),variant:"outlined",color:"primary",children:o("Cancel")}),s.jsx(V,{onClick:j,variant:"contained",color:u==="drop"?"error":"primary",children:o("OK")})]})]})]})}),gc=()=>s.jsx("div",{style:{minHeight:"80vh",display:"grid",placeItems:"center"},children:s.jsx(qi,{color:"secondary"})}),vc=e=>({id:e.id??e.Id??0,path:e.path??e.Path??"",length:e.length??e.Length??0});function wc({closeDialog:e,torrent:t}){var I;const{t:r}=F(),[n,a]=C.useState(!0),[i,o]=C.useState(!1),[c,u]=C.useState(),[d,g]=C.useState(),[h,m]=C.useState(null),[y,S]=C.useState(),[x,w]=C.useState(ce("isSnakeDebugMode")),{poster:j,hash:_,title:T,category:q,name:A,stat:R,download_speed:l,upload_speed:f,torrent_size:b,file_stats:p}=t,v=Li(_),O=Wi(),{Capacity:M,PiecesCount:P,PiecesLength:N,Filled:H}=v;C.useEffect(()=>{if(d&&h===null){const D=[];d.forEach(({path:k})=>{const $=X.parse(k).season;$&&!D.includes($)&&D.push($)}),D.length&&S(D[0]),m(D.sort((k,$)=>k-$))}},[d,h]),C.useEffect(()=>{g(p==null?void 0:p.map(vc).filter(({path:D})=>ti(D)))},[p]),C.useEffect(()=>{const D=!!Object.entries(v).length,k=R!==ca&&R!==sa;!D&&!n&&a(!0),D&&n&&k&&a(!1)},[R,v,n]),C.useEffect(()=>{fe.post(la(),{action:"list",hash:_}).then(({data:D})=>{if(D){const k=D.map($=>$.file_index).sort(($,Y)=>$-Y);u(k)}else u(void 0)})},[_]);const K=O==null?void 0:O.PreloadCache,L=(M||0)/100*(K||0),B=L>33554432?L:33554432,W=M&&M>0?M:B,U=W>0&&H!=null&&H>0?Math.min(100,Math.round(H*100/W)):null,E=()=>{const D=[],k=A?X.parse(A):null;T!==A?D.push(gr(T||"")):k!=null&&k.title&&D.push(gr(k.title)),k!=null&&k.year&&!String(D[0]||"").includes(String(k.year))&&D.push(k.year),k!=null&&k.resolution&&!String(D[0]||"").includes(String(k.resolution))&&D.push(k.resolution);const $=D.join(". ");return $[$.length-1]==="."&&$[$.length-2]==="."?`${$}.`:$};return s.jsxs(s.Fragment,{children:[s.jsx(Ki,{onClose:e,title:r(i?"DetailedCacheView.header":"TorrentDetails"),...i&&{onBack:()=>o(!1)}}),s.jsx(ac,{style:{...i&&{display:"flex",flexDirection:"column"}},children:n?s.jsx(gc,{}):i?s.jsx(hc,{downloadSpeed:l,uploadSpeed:f,torrent:t,torrentSize:b,PiecesCount:P,PiecesLength:N,stat:R,cache:v,isSnakeDebugMode:x,setIsSnakeDebugMode:w}):s.jsxs(Fs,{children:[s.jsxs(Xs,{children:[s.jsx(Vs,{$poster:!!j,children:j?s.jsx("img",{alt:"poster",src:j}):s.jsx(ri,{})}),s.jsxs("div",{children:[T&&A!==T?E().length>90?s.jsxs(s.Fragment,{children:[s.jsx(Z,{children:X.parse(A||"").title}),s.jsx(de,{$mb:20,children:E()})]}):s.jsxs(s.Fragment,{children:[s.jsx(Z,{children:E()}),s.jsx(de,{$mb:20,children:(I=X.parse(A||""))==null?void 0:I.title})]}):s.jsx(Z,{$mb:20,children:E()}),s.jsxs(Pa,{children:[s.jsx(Ea,{data:l}),s.jsx(Aa,{data:f}),s.jsx(Ma,{data:t}),s.jsx(Ia,{data:b}),s.jsx(Da,{stat:R}),s.jsx(fc,{data:q})]}),s.jsx(nc,{}),s.jsx(pc,{hash:_,viewedFileList:c,playableFileList:d,name:A,title:T,setViewedFileList:u})]})]}),s.jsxs(Js,{children:[s.jsxs(Qs,{children:[s.jsx(Z,{$mb:12,children:r("Buffer")}),B<=33554432&&s.jsx(de,{children:r("BufferNote")}),s.jsxs(Ri,{spacing:1,sx:{mt:.5},children:[s.jsxs(ua,{component:"div",variant:"body2",fontWeight:600,textAlign:"center","aria-label":`${ee(H||0)} / ${ee(W)}`,children:[`${ee(H||0)} / ${ee(W)}`,U!=null?` · ${U}%`:""]}),s.jsx(ji,{variant:"determinate",value:U??0,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":U??0,sx:{height:10,borderRadius:1}})]})]}),s.jsx(Ta,{isMini:!0,cache:v,isSnakeDebugMode:x}),s.jsx(V,{style:{marginTop:"20px",width:"100%"},variant:"outlined",color:"primary",size:"large",onClick:()=>o(!0),children:r("DetailedCacheView.button")})]}),s.jsxs(Ys,{children:[s.jsx(Z,{$mb:20,children:r("TorrentContent")}),((h==null?void 0:h.length)??0)>1&&s.jsxs(s.Fragment,{children:[s.jsx(de,{$mb:7,children:r("SelectSeason")}),s.jsx(Ti,{style:{marginBottom:"30px",flexWrap:"wrap",rowGap:8},color:"secondary",children:h.map(D=>s.jsx(V,{variant:y===D?"contained":"outlined",onClick:()=>S(D),children:D},D))}),s.jsxs(Z,{$mb:20,children:[r("Season")," ",y]})]}),s.jsx(Ks,{hash:_,playableFileList:d,viewedFileList:c,selectedSeason:y,seasonAmount:h})]})]})})]})}export{wc as default};
