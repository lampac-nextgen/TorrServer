import{a as C,d as ve,u as V,j as s,n as Oe,g as sa,r as za}from"./vendor-B9KbAPe3.js";import{Q as gr,s as Ha,V as Na,W as La,X as me,r as ee,f as $,g as z,Y as ca,Z as sr,$ as la,a0 as Ua,a1 as Wa,B as Z,a2 as fe,a3 as Ka,a4 as Fa,a5 as Va,a6 as ne,a7 as vr,a8 as Xa,a9 as Ya,aa as Ja,ab as ua,ac as Za,ad as da,ae as Qa,af as ei,ag as ti,ah as fa,T as mr,ai as ri,aj as ni,i as ai,ak as ha,al as ii,am as oi,N as si,an as br}from"./index-mIJ8J0qe.js";import{aj as ci,aH as li,I as xr,aI as ui,T as pa,C as di,a as fi,aJ as hi,c as pi,aG as te,o as Ee,l as J,aD as gi,aC as vi,aK as mi,aL as bi,aM as xi,aN as yi,aO as _i,aP as wi,a9 as Ci,aQ as Si,D as Ri,i as ji,m as Ti,aR as qi,O as Oi,Z as Ei,B as yr,aS as Pi,aT as Mi,n as Ai}from"./mui-C7bVulSz.js";import{a as we,c as ga,r as ae,d as Di,b as Ce,e as Ii}from"./isObjectLike-Ddue8m3w.js";import"./hls-CWTT-7hy.js";const ki=16,$i=10,Bi=(e,t,r)=>{if(e==null||t==null||r<=0)return null;const n=Math.max(0,Math.min(r-1,Math.floor(e))),a=Math.max(0,Math.min(r-1,Math.floor(t)));return a<n?null:{start:n,end:a}},Gi=(e,t,r,n)=>{const a=Bi(e,t,r);if(a)for(let i=a.start;i<=a.end;i++)n(i)},zi=(e,t)=>{if(e){if(Array.isArray(e)){for(let r=0;r<e.length;r++){const n=e[r];n&&t(r,n)}return}for(const[r,n]of Object.entries(e)){if(!n)continue;const a=Number(r);Number.isFinite(a)&&t(a,n)}}},Hi=(e,t)=>{if(!e)return 0;const r=e.Length||t||0,n=e.Size||0;if(r<=0)return n>0?100:0;const a=Math.min(n,r);return Math.min(100,a/r*100)},Ni=(e,t,r,n)=>{if(!(n!=null&&n.length))return t>=2?t:0;if(n.some(o=>o.Reader===e))return 5;if(t>=2)return t;if(r)return 0;let i=0;for(const o of n){if(o.Reader==null||o.Start==null||o.End==null)continue;const c=o.Reader,u=o.End;if(e<c||e>u)continue;let d=2;if(e===c+1)d=4;else{const p=Math.max(1,u-c),g=c+Math.max(2,Math.floor(p*.45));e<=g?d=3:e<=g+5&&(d=2)}d>i&&(i=d)}return i>0?i:t},va=e=>e===2?"H":e===3?"R":e===4?"N":e===5?"A":"",Li=(e,t,r,n,a,i)=>{const o=Hi(t,r),c=!!(t!=null&&t.Completed)||o>=100,u=(t==null?void 0:t.Priority)||0;return{percentage:c?100:o,priority:Ni(e,u,c,i),completed:c,isReader:n,isReaderRange:a,pieceStart:e,pieceEnd:e}},ma=(e,t)=>{const r=e.PiecesCount??0;if(r<=0)return null;const n=e.Readers||[];let a=0;if(n.length>0){let g=-1;for(const v of n)v.Reader!=null&&v.Reader>=0&&v.Reader<r&&v.Reader>g&&(g=v.Reader);a=g>=0?g:0}const i=e.PiecesLength||0,o=i>0?Math.max(1,Math.round((e.Capacity||0)/i)):t,c=Math.max(t,64);let u=Math.min(r,Math.max(t,o),c);u=Math.max(1,u);let d=a-Math.floor(u/2);d<0&&(d=0);let p=d+u-1;return p>=r&&(p=r-1,d=Math.max(0,p-u+1)),{start:d,end:p,readerPiece:a}},Ui=(e,t)=>{const r=e.PiecesCount??0,n=ma(e,t);if(!n||r<=0)return{cells:[],piecesCount:r,bucketSize:1,windowStart:0,windowEnd:-1};const a=e.PiecesLength||0,i=e.Readers||[],o=new Map;zi(e.Pieces,(p,g)=>{p>=n.start&&p<=n.end&&o.set(p,g)});const c=new Set,u=new Set;for(const p of i)p.Reader!=null&&p.Reader>=n.start&&p.Reader<=n.end&&c.add(p.Reader),Gi(p.Start,p.End,r,g=>{g>=n.start&&g<=n.end&&u.add(g)});const d=[];for(let p=n.start;p<=n.end;p++)d.push(Li(p,o.get(p),a,c.has(p),u.has(p),i));return{cells:d,piecesCount:r,bucketSize:1,windowStart:n.start,windowEnd:n.end}},Wi=(e,t=!1)=>{const r=t?$i:ki,n=t?31:24;return!e||e<=0?10*r:Math.max(1,Math.floor(e/n))*r},be=100,Ki=400,Fi=2e3,_r=e=>e!=null&&e.length?e.map(t=>`${t.Reader??""}:${t.Start??""}-${t.End??""}`).join("|"):"",wr=e=>{if(!e)return"";if(Array.isArray(e)){let r="";for(let n=0;n<e.length;n++){const a=e[n];a&&(r+=`${n}:${a.Size??0}:${a.Priority??0};`)}return r}let t="";for(const[r,n]of Object.entries(e))n&&(t+=`${r}:${n.Size??0}:${n.Priority??0};`);return t},Cr=(e,t)=>e.Filled===t.Filled&&e.Capacity===t.Capacity&&e.PiecesCount===t.PiecesCount&&e.PiecesLength===t.PiecesLength&&_r(e.Readers)===_r(t.Readers)&&wr(e.Pieces)===wr(t.Pieces),Vi=e=>{const[t,r]=C.useState({}),n=C.useRef(!0),a=C.useRef(null),i=C.useRef(!1),o=C.useRef({}),c=C.useRef(Date.now()),u=C.useRef(be);return C.useEffect(()=>()=>{n.current=!1},[]),C.useEffect(()=>{if(!e){a.current&&clearTimeout(a.current);return}let d=!1;const p=()=>{d||(a.current=setTimeout(g,u.current))},g=()=>{d||i.current||document.hidden||(i.current=!0,ve.post(Na(),{action:"get",hash:e}).then(({data:x})=>{if(!n.current||d)return;const R=x||{};if(Cr(o.current,R)){Date.now()-c.current>=Fi&&(u.current=Ki);return}c.current=Date.now(),u.current=be,o.current=R,r(R)}).catch(()=>{!n.current||d||Cr(o.current,{})||(c.current=Date.now(),u.current=be,o.current={},r({}))}).finally(()=>{i.current=!1,document.hidden||p()}))};g();const v=()=>{if(document.hidden){a.current&&clearTimeout(a.current);return}u.current=be,g()};return document.addEventListener("visibilitychange",v),()=>{d=!0,a.current&&clearTimeout(a.current),document.removeEventListener("visibilitychange",v)}},[e]),t},Xi=(e,t)=>C.useMemo(()=>Ui(e,t),[e,t]),Yi=()=>{const[e,t]=C.useState(),[r,n]=C.useState(0);return C.useEffect(()=>{const a=()=>n(i=>i+1);return window.addEventListener(gr,a),()=>window.removeEventListener(gr,a)},[]),C.useEffect(()=>{let a=!1;return ve.post(Ha(),{action:"get"}).then(({data:i})=>{a||t(i)}),()=>{a=!0}},[r]),e};function Ji({title:e,onClose:t,onBack:r}){const{t:n}=V();return s.jsx(ci,{sx:{position:"relative",...La&&{paddingTop:"calc(12px + env(safe-area-inset-top, 0px))"}},children:s.jsxs(li,{children:[r&&s.jsx(xr,{edge:"start",color:"inherit",onClick:r,"aria-label":n("Back",{defaultValue:"Back"}),children:s.jsx(ui,{})}),s.jsx(pa,{variant:"h6",sx:{marginLeft:"5px",flex:1},children:e}),s.jsx(xr,{autoFocus:!0,color:"inherit",onClick:t,"aria-label":n("Close",{defaultValue:"Close"}),sx:{marginRight:"-10px"},children:s.jsx(di,{})})]})})}var ba=(function(){if(typeof Map<"u")return Map;function e(t,r){var n=-1;return t.some(function(a,i){return a[0]===r?(n=i,!0):!1}),n}return(function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(r){var n=e(this.__entries__,r),a=this.__entries__[n];return a&&a[1]},t.prototype.set=function(r,n){var a=e(this.__entries__,r);~a?this.__entries__[a][1]=n:this.__entries__.push([r,n])},t.prototype.delete=function(r){var n=this.__entries__,a=e(n,r);~a&&n.splice(a,1)},t.prototype.has=function(r){return!!~e(this.__entries__,r)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(r,n){n===void 0&&(n=null);for(var a=0,i=this.__entries__;a<i.length;a++){var o=i[a];r.call(n,o[1],o[0])}},t})()})(),cr=typeof window<"u"&&typeof document<"u"&&window.document===document,ye=(function(){return typeof Oe<"u"&&Oe.Math===Math?Oe:typeof self<"u"&&self.Math===Math?self:typeof window<"u"&&window.Math===Math?window:Function("return this")()})(),Zi=(function(){return typeof requestAnimationFrame=="function"?requestAnimationFrame.bind(ye):function(e){return setTimeout(function(){return e(Date.now())},1e3/60)}})(),Qi=2;function eo(e,t){var r=!1,n=!1,a=0;function i(){r&&(r=!1,e()),n&&c()}function o(){Zi(i)}function c(){var u=Date.now();if(r){if(u-a<Qi)return;n=!0}else r=!0,n=!1,setTimeout(o,t);a=u}return c}var to=20,ro=["top","right","bottom","left","width","height","size","weight"],no=typeof MutationObserver<"u",ao=(function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=eo(this.refresh.bind(this),to)}return e.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},e.prototype.removeObserver=function(t){var r=this.observers_,n=r.indexOf(t);~n&&r.splice(n,1),!r.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){var t=this.updateObservers_();t&&this.refresh()},e.prototype.updateObservers_=function(){var t=this.observers_.filter(function(r){return r.gatherActive(),r.hasActive()});return t.forEach(function(r){return r.broadcastActive()}),t.length>0},e.prototype.connect_=function(){!cr||this.connected_||(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),no?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){!cr||!this.connected_||(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(t){var r=t.propertyName,n=r===void 0?"":r,a=ro.some(function(i){return!!~n.indexOf(i)});a&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e})(),xa=(function(e,t){for(var r=0,n=Object.keys(t);r<n.length;r++){var a=n[r];Object.defineProperty(e,a,{value:t[a],enumerable:!1,writable:!1,configurable:!0})}return e}),ce=(function(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView;return t||ye}),ya=Se(0,0,0,0);function _e(e){return parseFloat(e)||0}function Sr(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return t.reduce(function(n,a){var i=e["border-"+a+"-width"];return n+_e(i)},0)}function io(e){for(var t=["top","right","bottom","left"],r={},n=0,a=t;n<a.length;n++){var i=a[n],o=e["padding-"+i];r[i]=_e(o)}return r}function oo(e){var t=e.getBBox();return Se(0,0,t.width,t.height)}function so(e){var t=e.clientWidth,r=e.clientHeight;if(!t&&!r)return ya;var n=ce(e).getComputedStyle(e),a=io(n),i=a.left+a.right,o=a.top+a.bottom,c=_e(n.width),u=_e(n.height);if(n.boxSizing==="border-box"&&(Math.round(c+i)!==t&&(c-=Sr(n,"left","right")+i),Math.round(u+o)!==r&&(u-=Sr(n,"top","bottom")+o)),!lo(e)){var d=Math.round(c+i)-t,p=Math.round(u+o)-r;Math.abs(d)!==1&&(c-=d),Math.abs(p)!==1&&(u-=p)}return Se(a.left,a.top,c,u)}var co=(function(){return typeof SVGGraphicsElement<"u"?function(e){return e instanceof ce(e).SVGGraphicsElement}:function(e){return e instanceof ce(e).SVGElement&&typeof e.getBBox=="function"}})();function lo(e){return e===ce(e).document.documentElement}function uo(e){return cr?co(e)?oo(e):so(e):ya}function fo(e){var t=e.x,r=e.y,n=e.width,a=e.height,i=typeof DOMRectReadOnly<"u"?DOMRectReadOnly:Object,o=Object.create(i.prototype);return xa(o,{x:t,y:r,width:n,height:a,top:r,right:t+n,bottom:a+r,left:t}),o}function Se(e,t,r,n){return{x:e,y:t,width:r,height:n}}var ho=(function(){function e(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=Se(0,0,0,0),this.target=t}return e.prototype.isActive=function(){var t=uo(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},e})(),po=(function(){function e(t,r){var n=fo(r);xa(this,{target:t,contentRect:n})}return e})(),go=(function(){function e(t,r,n){if(this.activeObservations_=[],this.observations_=new ba,typeof t!="function")throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=r,this.callbackCtx_=n}return e.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof ce(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)||(r.set(t,new ho(t)),this.controller_.addObserver(this),this.controller_.refresh())}},e.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof ce(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)&&(r.delete(t),r.size||this.controller_.removeObserver(this))}},e.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},e.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach(function(r){r.isActive()&&t.activeObservations_.push(r)})},e.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,r=this.activeObservations_.map(function(n){return new po(n.target,n.broadcastRect())});this.callback_.call(t,r,t),this.clearActive()}},e.prototype.clearActive=function(){this.activeObservations_.splice(0)},e.prototype.hasActive=function(){return this.activeObservations_.length>0},e})(),_a=typeof WeakMap<"u"?new WeakMap:new ba,wa=(function(){function e(t){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var r=ao.getInstance(),n=new go(t,r,this);_a.set(this,n)}return e})();["observe","unobserve","disconnect"].forEach(function(e){wa.prototype[e]=function(){var t;return(t=_a.get(this))[e].apply(t,arguments)}});var vo=(function(){return typeof ye.ResizeObserver<"u"?ye.ResizeObserver:wa})(),mo=["client","offset","scroll","bounds","margin"];function Rr(e){var t=[];return mo.forEach(function(r){e[r]&&t.push(r)}),t}function jr(e,t){var r={};if(t.indexOf("client")>-1&&(r.client={top:e.clientTop,left:e.clientLeft,width:e.clientWidth,height:e.clientHeight}),t.indexOf("offset")>-1&&(r.offset={top:e.offsetTop,left:e.offsetLeft,width:e.offsetWidth,height:e.offsetHeight}),t.indexOf("scroll")>-1&&(r.scroll={top:e.scrollTop,left:e.scrollLeft,width:e.scrollWidth,height:e.scrollHeight}),t.indexOf("bounds")>-1){var n=e.getBoundingClientRect();r.bounds={top:n.top,right:n.right,bottom:n.bottom,left:n.left,width:n.width,height:n.height}}if(t.indexOf("margin")>-1){var a=getComputedStyle(e);r.margin={top:a?parseInt(a.marginTop):0,right:a?parseInt(a.marginRight):0,bottom:a?parseInt(a.marginBottom):0,left:a?parseInt(a.marginLeft):0}}return r}function bo(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView;return t||window}function xo(e){return function(t){var r,n;return n=r=(function(a){fi(i,a);function i(){for(var c,u=arguments.length,d=new Array(u),p=0;p<u;p++)d[p]=arguments[p];return c=a.call.apply(a,[this].concat(d))||this,c.state={contentRect:{entry:{},client:{},offset:{},scroll:{},bounds:{},margin:{}}},c._animationFrameID=null,c._resizeObserver=null,c._node=null,c._window=null,c.measure=function(g){var v=jr(c._node,Rr(c.props));g&&(v.entry=g[0].contentRect),c._animationFrameID=c._window.requestAnimationFrame(function(){c._resizeObserver!==null&&(c.setState({contentRect:v}),typeof c.props.onResize=="function"&&c.props.onResize(v))})},c._handleRef=function(g){c._resizeObserver!==null&&c._node!==null&&c._resizeObserver.unobserve(c._node),c._node=g,c._window=bo(c._node);var v=c.props.innerRef;v&&(typeof v=="function"?v(c._node):v.current=c._node),c._resizeObserver!==null&&c._node!==null&&c._resizeObserver.observe(c._node)},c}var o=i.prototype;return o.componentDidMount=function(){this._resizeObserver=this._window!==null&&this._window.ResizeObserver?new this._window.ResizeObserver(this.measure):new vo(this.measure),this._node!==null&&(this._resizeObserver.observe(this._node),typeof this.props.onResize=="function"&&this.props.onResize(jr(this._node,Rr(this.props))))},o.componentWillUnmount=function(){this._window!==null&&this._window.cancelAnimationFrame(this._animationFrameID),this._resizeObserver!==null&&(this._resizeObserver.disconnect(),this._resizeObserver=null)},o.render=function(){var u=this.props;u.innerRef,u.onResize;var d=hi(u,["innerRef","onResize"]);return C.createElement(t,pi({},d,{measureRef:this._handleRef,measure:this.measure,contentRect:this.state.contentRect}))},i})(C.Component),r.propTypes={client:te.bool,offset:te.bool,scroll:te.bool,bounds:te.bool,margin:te.bool,innerRef:te.oneOfType([te.object,te.func]),onResize:te.func},n}}var ur=xo()(function(e){var t=e.measure,r=e.measureRef,n=e.contentRect,a=e.children;return a({measure:t,measureRef:r,contentRect:n})});ur.displayName="Measure";ur.propTypes.children=te.func;var Pe,Tr;function yo(){if(Tr)return Pe;Tr=1;function e(){this.__data__=[],this.size=0}return Pe=e,Pe}var Me,qr;function Ca(){if(qr)return Me;qr=1;function e(t,r){return t===r||t!==t&&r!==r}return Me=e,Me}var Ae,Or;function Re(){if(Or)return Ae;Or=1;var e=Ca();function t(r,n){for(var a=r.length;a--;)if(e(r[a][0],n))return a;return-1}return Ae=t,Ae}var De,Er;function _o(){if(Er)return De;Er=1;var e=Re(),t=Array.prototype,r=t.splice;function n(a){var i=this.__data__,o=e(i,a);if(o<0)return!1;var c=i.length-1;return o==c?i.pop():r.call(i,o,1),--this.size,!0}return De=n,De}var Ie,Pr;function wo(){if(Pr)return Ie;Pr=1;var e=Re();function t(r){var n=this.__data__,a=e(n,r);return a<0?void 0:n[a][1]}return Ie=t,Ie}var ke,Mr;function Co(){if(Mr)return ke;Mr=1;var e=Re();function t(r){return e(this.__data__,r)>-1}return ke=t,ke}var $e,Ar;function So(){if(Ar)return $e;Ar=1;var e=Re();function t(r,n){var a=this.__data__,i=e(a,r);return i<0?(++this.size,a.push([r,n])):a[i][1]=n,this}return $e=t,$e}var Be,Dr;function je(){if(Dr)return Be;Dr=1;var e=yo(),t=_o(),r=wo(),n=Co(),a=So();function i(o){var c=-1,u=o==null?0:o.length;for(this.clear();++c<u;){var d=o[c];this.set(d[0],d[1])}}return i.prototype.clear=e,i.prototype.delete=t,i.prototype.get=r,i.prototype.has=n,i.prototype.set=a,Be=i,Be}var Ge,Ir;function Ro(){if(Ir)return Ge;Ir=1;var e=je();function t(){this.__data__=new e,this.size=0}return Ge=t,Ge}var ze,kr;function jo(){if(kr)return ze;kr=1;function e(t){var r=this.__data__,n=r.delete(t);return this.size=r.size,n}return ze=e,ze}var He,$r;function To(){if($r)return He;$r=1;function e(t){return this.__data__.get(t)}return He=e,He}var Ne,Br;function qo(){if(Br)return Ne;Br=1;function e(t){return this.__data__.has(t)}return Ne=e,Ne}var Le,Gr;function Sa(){if(Gr)return Le;Gr=1;var e=we(),t=ga(),r="[object AsyncFunction]",n="[object Function]",a="[object GeneratorFunction]",i="[object Proxy]";function o(c){if(!t(c))return!1;var u=e(c);return u==n||u==a||u==r||u==i}return Le=o,Le}var Ue,zr;function Oo(){if(zr)return Ue;zr=1;var e=ae(),t=e["__core-js_shared__"];return Ue=t,Ue}var We,Hr;function Eo(){if(Hr)return We;Hr=1;var e=Oo(),t=(function(){var n=/[^.]+$/.exec(e&&e.keys&&e.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""})();function r(n){return!!t&&t in n}return We=r,We}var Ke,Nr;function Ra(){if(Nr)return Ke;Nr=1;var e=Function.prototype,t=e.toString;function r(n){if(n!=null){try{return t.call(n)}catch{}try{return n+""}catch{}}return""}return Ke=r,Ke}var Fe,Lr;function Po(){if(Lr)return Fe;Lr=1;var e=Sa(),t=Eo(),r=ga(),n=Ra(),a=/[\\^$.*+?()[\]{}|]/g,i=/^\[object .+?Constructor\]$/,o=Function.prototype,c=Object.prototype,u=o.toString,d=c.hasOwnProperty,p=RegExp("^"+u.call(d).replace(a,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function g(v){if(!r(v)||t(v))return!1;var x=e(v)?p:i;return x.test(n(v))}return Fe=g,Fe}var Ve,Ur;function Mo(){if(Ur)return Ve;Ur=1;function e(t,r){return t==null?void 0:t[r]}return Ve=e,Ve}var Xe,Wr;function le(){if(Wr)return Xe;Wr=1;var e=Po(),t=Mo();function r(n,a){var i=t(n,a);return e(i)?i:void 0}return Xe=r,Xe}var Ye,Kr;function dr(){if(Kr)return Ye;Kr=1;var e=le(),t=ae(),r=e(t,"Map");return Ye=r,Ye}var Je,Fr;function Te(){if(Fr)return Je;Fr=1;var e=le(),t=e(Object,"create");return Je=t,Je}var Ze,Vr;function Ao(){if(Vr)return Ze;Vr=1;var e=Te();function t(){this.__data__=e?e(null):{},this.size=0}return Ze=t,Ze}var Qe,Xr;function Do(){if(Xr)return Qe;Xr=1;function e(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r}return Qe=e,Qe}var et,Yr;function Io(){if(Yr)return et;Yr=1;var e=Te(),t="__lodash_hash_undefined__",r=Object.prototype,n=r.hasOwnProperty;function a(i){var o=this.__data__;if(e){var c=o[i];return c===t?void 0:c}return n.call(o,i)?o[i]:void 0}return et=a,et}var tt,Jr;function ko(){if(Jr)return tt;Jr=1;var e=Te(),t=Object.prototype,r=t.hasOwnProperty;function n(a){var i=this.__data__;return e?i[a]!==void 0:r.call(i,a)}return tt=n,tt}var rt,Zr;function $o(){if(Zr)return rt;Zr=1;var e=Te(),t="__lodash_hash_undefined__";function r(n,a){var i=this.__data__;return this.size+=this.has(n)?0:1,i[n]=e&&a===void 0?t:a,this}return rt=r,rt}var nt,Qr;function Bo(){if(Qr)return nt;Qr=1;var e=Ao(),t=Do(),r=Io(),n=ko(),a=$o();function i(o){var c=-1,u=o==null?0:o.length;for(this.clear();++c<u;){var d=o[c];this.set(d[0],d[1])}}return i.prototype.clear=e,i.prototype.delete=t,i.prototype.get=r,i.prototype.has=n,i.prototype.set=a,nt=i,nt}var at,en;function Go(){if(en)return at;en=1;var e=Bo(),t=je(),r=dr();function n(){this.size=0,this.__data__={hash:new e,map:new(r||t),string:new e}}return at=n,at}var it,tn;function zo(){if(tn)return it;tn=1;function e(t){var r=typeof t;return r=="string"||r=="number"||r=="symbol"||r=="boolean"?t!=="__proto__":t===null}return it=e,it}var ot,rn;function qe(){if(rn)return ot;rn=1;var e=zo();function t(r,n){var a=r.__data__;return e(n)?a[typeof n=="string"?"string":"hash"]:a.map}return ot=t,ot}var st,nn;function Ho(){if(nn)return st;nn=1;var e=qe();function t(r){var n=e(this,r).delete(r);return this.size-=n?1:0,n}return st=t,st}var ct,an;function No(){if(an)return ct;an=1;var e=qe();function t(r){return e(this,r).get(r)}return ct=t,ct}var lt,on;function Lo(){if(on)return lt;on=1;var e=qe();function t(r){return e(this,r).has(r)}return lt=t,lt}var ut,sn;function Uo(){if(sn)return ut;sn=1;var e=qe();function t(r,n){var a=e(this,r),i=a.size;return a.set(r,n),this.size+=a.size==i?0:1,this}return ut=t,ut}var dt,cn;function ja(){if(cn)return dt;cn=1;var e=Go(),t=Ho(),r=No(),n=Lo(),a=Uo();function i(o){var c=-1,u=o==null?0:o.length;for(this.clear();++c<u;){var d=o[c];this.set(d[0],d[1])}}return i.prototype.clear=e,i.prototype.delete=t,i.prototype.get=r,i.prototype.has=n,i.prototype.set=a,dt=i,dt}var ft,ln;function Wo(){if(ln)return ft;ln=1;var e=je(),t=dr(),r=ja(),n=200;function a(i,o){var c=this.__data__;if(c instanceof e){var u=c.__data__;if(!t||u.length<n-1)return u.push([i,o]),this.size=++c.size,this;c=this.__data__=new r(u)}return c.set(i,o),this.size=c.size,this}return ft=a,ft}var ht,un;function Ko(){if(un)return ht;un=1;var e=je(),t=Ro(),r=jo(),n=To(),a=qo(),i=Wo();function o(c){var u=this.__data__=new e(c);this.size=u.size}return o.prototype.clear=t,o.prototype.delete=r,o.prototype.get=n,o.prototype.has=a,o.prototype.set=i,ht=o,ht}var pt,dn;function Fo(){if(dn)return pt;dn=1;var e="__lodash_hash_undefined__";function t(r){return this.__data__.set(r,e),this}return pt=t,pt}var gt,fn;function Vo(){if(fn)return gt;fn=1;function e(t){return this.__data__.has(t)}return gt=e,gt}var vt,hn;function Xo(){if(hn)return vt;hn=1;var e=ja(),t=Fo(),r=Vo();function n(a){var i=-1,o=a==null?0:a.length;for(this.__data__=new e;++i<o;)this.add(a[i])}return n.prototype.add=n.prototype.push=t,n.prototype.has=r,vt=n,vt}var mt,pn;function Yo(){if(pn)return mt;pn=1;function e(t,r){for(var n=-1,a=t==null?0:t.length;++n<a;)if(r(t[n],n,t))return!0;return!1}return mt=e,mt}var bt,gn;function Jo(){if(gn)return bt;gn=1;function e(t,r){return t.has(r)}return bt=e,bt}var xt,vn;function Ta(){if(vn)return xt;vn=1;var e=Xo(),t=Yo(),r=Jo(),n=1,a=2;function i(o,c,u,d,p,g){var v=u&n,x=o.length,R=c.length;if(x!=R&&!(v&&R>x))return!1;var y=g.get(o),w=g.get(c);if(y&&w)return y==c&&w==o;var j=-1,_=!0,E=u&a?new e:void 0;for(g.set(o,c),g.set(c,o);++j<x;){var T=o[j],A=c[j];if(d)var S=v?d(A,T,j,c,o,g):d(T,A,j,o,c,g);if(S!==void 0){if(S)continue;_=!1;break}if(E){if(!t(c,function(l,f){if(!r(E,f)&&(T===l||p(T,l,u,d,g)))return E.push(f)})){_=!1;break}}else if(!(T===A||p(T,A,u,d,g))){_=!1;break}}return g.delete(o),g.delete(c),_}return xt=i,xt}var yt,mn;function Zo(){if(mn)return yt;mn=1;var e=ae(),t=e.Uint8Array;return yt=t,yt}var _t,bn;function Qo(){if(bn)return _t;bn=1;function e(t){var r=-1,n=Array(t.size);return t.forEach(function(a,i){n[++r]=[i,a]}),n}return _t=e,_t}var wt,xn;function es(){if(xn)return wt;xn=1;function e(t){var r=-1,n=Array(t.size);return t.forEach(function(a){n[++r]=a}),n}return wt=e,wt}var Ct,yn;function ts(){if(yn)return Ct;yn=1;var e=Di(),t=Zo(),r=Ca(),n=Ta(),a=Qo(),i=es(),o=1,c=2,u="[object Boolean]",d="[object Date]",p="[object Error]",g="[object Map]",v="[object Number]",x="[object RegExp]",R="[object Set]",y="[object String]",w="[object Symbol]",j="[object ArrayBuffer]",_="[object DataView]",E=e?e.prototype:void 0,T=E?E.valueOf:void 0;function A(S,l,f,b,h,m,q){switch(f){case _:if(S.byteLength!=l.byteLength||S.byteOffset!=l.byteOffset)return!1;S=S.buffer,l=l.buffer;case j:return!(S.byteLength!=l.byteLength||!m(new t(S),new t(l)));case u:case d:case v:return r(+S,+l);case p:return S.name==l.name&&S.message==l.message;case x:case y:return S==l+"";case g:var M=a;case R:var O=b&o;if(M||(M=i),S.size!=l.size&&!O)return!1;var B=q.get(S);if(B)return B==l;b|=c,q.set(S,l);var N=n(M(S),M(l),b,h,m,q);return q.delete(S),N;case w:if(T)return T.call(S)==T.call(l)}return!1}return Ct=A,Ct}var St,_n;function rs(){if(_n)return St;_n=1;function e(t,r){for(var n=-1,a=r.length,i=t.length;++n<a;)t[i+n]=r[n];return t}return St=e,St}var Rt,wn;function fr(){if(wn)return Rt;wn=1;var e=Array.isArray;return Rt=e,Rt}var jt,Cn;function ns(){if(Cn)return jt;Cn=1;var e=rs(),t=fr();function r(n,a,i){var o=a(n);return t(n)?o:e(o,i(n))}return jt=r,jt}var Tt,Sn;function as(){if(Sn)return Tt;Sn=1;function e(t,r){for(var n=-1,a=t==null?0:t.length,i=0,o=[];++n<a;){var c=t[n];r(c,n,t)&&(o[i++]=c)}return o}return Tt=e,Tt}var qt,Rn;function is(){if(Rn)return qt;Rn=1;function e(){return[]}return qt=e,qt}var Ot,jn;function os(){if(jn)return Ot;jn=1;var e=as(),t=is(),r=Object.prototype,n=r.propertyIsEnumerable,a=Object.getOwnPropertySymbols,i=a?function(o){return o==null?[]:(o=Object(o),e(a(o),function(c){return n.call(o,c)}))}:t;return Ot=i,Ot}var Et,Tn;function ss(){if(Tn)return Et;Tn=1;function e(t,r){for(var n=-1,a=Array(t);++n<t;)a[n]=r(n);return a}return Et=e,Et}var Pt,qn;function cs(){if(qn)return Pt;qn=1;var e=we(),t=Ce(),r="[object Arguments]";function n(a){return t(a)&&e(a)==r}return Pt=n,Pt}var Mt,On;function ls(){if(On)return Mt;On=1;var e=cs(),t=Ce(),r=Object.prototype,n=r.hasOwnProperty,a=r.propertyIsEnumerable,i=e((function(){return arguments})())?e:function(o){return t(o)&&n.call(o,"callee")&&!a.call(o,"callee")};return Mt=i,Mt}var he={exports:{}},At,En;function us(){if(En)return At;En=1;function e(){return!1}return At=e,At}he.exports;var Pn;function qa(){return Pn||(Pn=1,(function(e,t){var r=ae(),n=us(),a=t&&!t.nodeType&&t,i=a&&!0&&e&&!e.nodeType&&e,o=i&&i.exports===a,c=o?r.Buffer:void 0,u=c?c.isBuffer:void 0,d=u||n;e.exports=d})(he,he.exports)),he.exports}var Dt,Mn;function ds(){if(Mn)return Dt;Mn=1;var e=9007199254740991,t=/^(?:0|[1-9]\d*)$/;function r(n,a){var i=typeof n;return a=a??e,!!a&&(i=="number"||i!="symbol"&&t.test(n))&&n>-1&&n%1==0&&n<a}return Dt=r,Dt}var It,An;function Oa(){if(An)return It;An=1;var e=9007199254740991;function t(r){return typeof r=="number"&&r>-1&&r%1==0&&r<=e}return It=t,It}var kt,Dn;function fs(){if(Dn)return kt;Dn=1;var e=we(),t=Oa(),r=Ce(),n="[object Arguments]",a="[object Array]",i="[object Boolean]",o="[object Date]",c="[object Error]",u="[object Function]",d="[object Map]",p="[object Number]",g="[object Object]",v="[object RegExp]",x="[object Set]",R="[object String]",y="[object WeakMap]",w="[object ArrayBuffer]",j="[object DataView]",_="[object Float32Array]",E="[object Float64Array]",T="[object Int8Array]",A="[object Int16Array]",S="[object Int32Array]",l="[object Uint8Array]",f="[object Uint8ClampedArray]",b="[object Uint16Array]",h="[object Uint32Array]",m={};m[_]=m[E]=m[T]=m[A]=m[S]=m[l]=m[f]=m[b]=m[h]=!0,m[n]=m[a]=m[w]=m[i]=m[j]=m[o]=m[c]=m[u]=m[d]=m[p]=m[g]=m[v]=m[x]=m[R]=m[y]=!1;function q(M){return r(M)&&t(M.length)&&!!m[e(M)]}return kt=q,kt}var $t,In;function hs(){if(In)return $t;In=1;function e(t){return function(r){return t(r)}}return $t=e,$t}var pe={exports:{}};pe.exports;var kn;function ps(){return kn||(kn=1,(function(e,t){var r=Ii(),n=t&&!t.nodeType&&t,a=n&&!0&&e&&!e.nodeType&&e,i=a&&a.exports===n,o=i&&r.process,c=(function(){try{var u=a&&a.require&&a.require("util").types;return u||o&&o.binding&&o.binding("util")}catch{}})();e.exports=c})(pe,pe.exports)),pe.exports}var Bt,$n;function Ea(){if($n)return Bt;$n=1;var e=fs(),t=hs(),r=ps(),n=r&&r.isTypedArray,a=n?t(n):e;return Bt=a,Bt}var Gt,Bn;function gs(){if(Bn)return Gt;Bn=1;var e=ss(),t=ls(),r=fr(),n=qa(),a=ds(),i=Ea(),o=Object.prototype,c=o.hasOwnProperty;function u(d,p){var g=r(d),v=!g&&t(d),x=!g&&!v&&n(d),R=!g&&!v&&!x&&i(d),y=g||v||x||R,w=y?e(d.length,String):[],j=w.length;for(var _ in d)(p||c.call(d,_))&&!(y&&(_=="length"||x&&(_=="offset"||_=="parent")||R&&(_=="buffer"||_=="byteLength"||_=="byteOffset")||a(_,j)))&&w.push(_);return w}return Gt=u,Gt}var zt,Gn;function vs(){if(Gn)return zt;Gn=1;var e=Object.prototype;function t(r){var n=r&&r.constructor,a=typeof n=="function"&&n.prototype||e;return r===a}return zt=t,zt}var Ht,zn;function ms(){if(zn)return Ht;zn=1;function e(t,r){return function(n){return t(r(n))}}return Ht=e,Ht}var Nt,Hn;function bs(){if(Hn)return Nt;Hn=1;var e=ms(),t=e(Object.keys,Object);return Nt=t,Nt}var Lt,Nn;function xs(){if(Nn)return Lt;Nn=1;var e=vs(),t=bs(),r=Object.prototype,n=r.hasOwnProperty;function a(i){if(!e(i))return t(i);var o=[];for(var c in Object(i))n.call(i,c)&&c!="constructor"&&o.push(c);return o}return Lt=a,Lt}var Ut,Ln;function ys(){if(Ln)return Ut;Ln=1;var e=Sa(),t=Oa();function r(n){return n!=null&&t(n.length)&&!e(n)}return Ut=r,Ut}var Wt,Un;function _s(){if(Un)return Wt;Un=1;var e=gs(),t=xs(),r=ys();function n(a){return r(a)?e(a):t(a)}return Wt=n,Wt}var Kt,Wn;function ws(){if(Wn)return Kt;Wn=1;var e=ns(),t=os(),r=_s();function n(a){return e(a,r,t)}return Kt=n,Kt}var Ft,Kn;function Cs(){if(Kn)return Ft;Kn=1;var e=ws(),t=1,r=Object.prototype,n=r.hasOwnProperty;function a(i,o,c,u,d,p){var g=c&t,v=e(i),x=v.length,R=e(o),y=R.length;if(x!=y&&!g)return!1;for(var w=x;w--;){var j=v[w];if(!(g?j in o:n.call(o,j)))return!1}var _=p.get(i),E=p.get(o);if(_&&E)return _==o&&E==i;var T=!0;p.set(i,o),p.set(o,i);for(var A=g;++w<x;){j=v[w];var S=i[j],l=o[j];if(u)var f=g?u(l,S,j,o,i,p):u(S,l,j,i,o,p);if(!(f===void 0?S===l||d(S,l,c,u,p):f)){T=!1;break}A||(A=j=="constructor")}if(T&&!A){var b=i.constructor,h=o.constructor;b!=h&&"constructor"in i&&"constructor"in o&&!(typeof b=="function"&&b instanceof b&&typeof h=="function"&&h instanceof h)&&(T=!1)}return p.delete(i),p.delete(o),T}return Ft=a,Ft}var Vt,Fn;function Ss(){if(Fn)return Vt;Fn=1;var e=le(),t=ae(),r=e(t,"DataView");return Vt=r,Vt}var Xt,Vn;function Rs(){if(Vn)return Xt;Vn=1;var e=le(),t=ae(),r=e(t,"Promise");return Xt=r,Xt}var Yt,Xn;function js(){if(Xn)return Yt;Xn=1;var e=le(),t=ae(),r=e(t,"Set");return Yt=r,Yt}var Jt,Yn;function Ts(){if(Yn)return Jt;Yn=1;var e=le(),t=ae(),r=e(t,"WeakMap");return Jt=r,Jt}var Zt,Jn;function qs(){if(Jn)return Zt;Jn=1;var e=Ss(),t=dr(),r=Rs(),n=js(),a=Ts(),i=we(),o=Ra(),c="[object Map]",u="[object Object]",d="[object Promise]",p="[object Set]",g="[object WeakMap]",v="[object DataView]",x=o(e),R=o(t),y=o(r),w=o(n),j=o(a),_=i;return(e&&_(new e(new ArrayBuffer(1)))!=v||t&&_(new t)!=c||r&&_(r.resolve())!=d||n&&_(new n)!=p||a&&_(new a)!=g)&&(_=function(E){var T=i(E),A=T==u?E.constructor:void 0,S=A?o(A):"";if(S)switch(S){case x:return v;case R:return c;case y:return d;case w:return p;case j:return g}return T}),Zt=_,Zt}var Qt,Zn;function Os(){if(Zn)return Qt;Zn=1;var e=Ko(),t=Ta(),r=ts(),n=Cs(),a=qs(),i=fr(),o=qa(),c=Ea(),u=1,d="[object Arguments]",p="[object Array]",g="[object Object]",v=Object.prototype,x=v.hasOwnProperty;function R(y,w,j,_,E,T){var A=i(y),S=i(w),l=A?p:a(y),f=S?p:a(w);l=l==d?g:l,f=f==d?g:f;var b=l==g,h=f==g,m=l==f;if(m&&o(y)){if(!o(w))return!1;A=!0,b=!1}if(m&&!b)return T||(T=new e),A||c(y)?t(y,w,j,_,E,T):r(y,w,l,j,_,E,T);if(!(j&u)){var q=b&&x.call(y,"__wrapped__"),M=h&&x.call(w,"__wrapped__");if(q||M){var O=q?y.value():y,B=M?w.value():w;return T||(T=new e),E(O,B,j,_,T)}}return m?(T||(T=new e),n(y,w,j,_,E,T)):!1}return Qt=R,Qt}var er,Qn;function Es(){if(Qn)return er;Qn=1;var e=Os(),t=Ce();function r(n,a,i,o,c){return n===a?!0:n==null||a==null||!t(n)&&!t(a)?n!==n&&a!==a:e(n,a,i,o,r,c)}return er=r,er}var tr,ea;function Ps(){if(ea)return tr;ea=1;var e=Es();function t(r,n){return e(r,n)}return tr=t,tr}var Ms=Ps();const lr=sa(Ms),hr={dark:{default:{borderWidth:1,pieceSize:20,gapBetweenPieces:4,borderColor:ee("#fff",.28),completeColor:me.dark.primary,backgroundColor:"#1a2822",readerColor:"#0a0a0a",readerHaloColor:ee("#fff",.55),rangeColor:"#cda184",rangeEmptyColor:ee("#cda184",.3)},mini:{cacheMaxHeight:420,borderWidth:2,pieceSize:26,gapBetweenPieces:5,borderColor:ee("#fff",.32),completeColor:me.dark.primary,backgroundColor:"#1f3028",readerColor:"#0a0a0a",readerHaloColor:ee("#fff",.5),rangeColor:"#cda184",rangeEmptyColor:ee("#cda184",.32)}},light:{default:{borderWidth:1,pieceSize:20,gapBetweenPieces:4,borderColor:"#d0e6da",completeColor:me.light.primary,backgroundColor:"#ffffff",readerColor:"#000",readerHaloColor:ee("#fff",.9),rangeColor:"#7e6bc4",rangeEmptyColor:ee("#afa6e3",.32)},mini:{cacheMaxHeight:420,borderWidth:2,pieceSize:26,gapBetweenPieces:5,borderColor:"#b7d9c8",completeColor:me.light.primary,backgroundColor:"#f4faf7",readerColor:"#0a0a0a",readerHaloColor:ee("#fff",.9),rangeColor:"#7e6bc4",rangeEmptyColor:ee("#afa6e3",.36)}}},As=(e,t,r,n=0)=>{const a=e.pieceSize,i=e.gapBetweenPieces;if(!t||t<=0)return{pieceSize:a,gap:i};if(r){const o=t<280?7:t<400?9:11,c=Math.floor((t-8)/o)-i;return{pieceSize:Math.max(22,Math.min(28,c>0?c:a)),gap:Math.max(4,Math.min(i,6))}}return{pieceSize:Math.max(18,a),gap:Math.max(4,i)}},ta=z.div`
  margin-top: 10px;
  text-transform: uppercase;
  align-self: center;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: ${({$themeType:e})=>e==="dark"?"rgba(255, 255, 255, 0.55)":"rgba(0, 0, 0, 0.5)"};
`,Ds=z.div`
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
`,Is=z.div`
  width: 100%;
  min-width: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  position: relative;

  ${({$isMini:e,$themeType:t})=>e?$`
          display: grid;
          justify-content: center;
          max-height: ${hr[t??"light"].mini.cacheMaxHeight}px;
        `:$`
          max-height: min(70vh, 640px);
        `}

  canvas {
    display: block;
    max-width: 100%;
  }
`,ks=e=>Math.max(0,Math.min(1,e)),$s=(e,t,r,n,a)=>{e.fillStyle=n,e.fillRect(0,0,t,t);const i=ks(r/100);if(i<=0)return;if(i>=1){e.fillStyle=a,e.fillRect(0,0,t,t);return}const o=Math.max(2,Math.round(t*i));e.fillStyle=a,e.fillRect(0,t-o,t,Math.min(o,t))},ue=(e,t,r,n)=>{const a=n/2;e.lineWidth=n,e.strokeStyle=r,e.strokeRect(a,a,t-n,t-n)},Bs=({ctx:e,cells:t,canvasWidth:r,canvasHeight:n,piecesInOneRow:a,pieceSize:i,gap:o,startingX:c,theme:u,variant:d,isSnakeDebugMode:p,isMini:g})=>{const v=hr[u][d],{borderWidth:x,backgroundColor:R,borderColor:y,completeColor:w,readerColor:j,readerHaloColor:_,rangeColor:E,rangeEmptyColor:T}=v;e.clearRect(0,0,r,n),e.imageSmoothingEnabled=!1;const A=x%2===1?.5:0,S=u==="dark",l=T||(S?"rgba(205, 161, 132, 0.28)":"rgba(175, 166, 227, 0.32)");for(let f=0;f<t.length;f++){const b=t[f]||{percentage:0,priority:0},h=b.percentage||0,m=!!b.completed||h>=100,q=h>0&&!m,M=!!b.isReader,O=!!b.isReaderRange,B=f%a,N=Math.floor(f/a),H=c+B*(i+o)+A,L=N*(i+o)+A;e.save(),e.translate(H,L);const I=O&&!m&&!q?l:R;if($s(e,i,m?100:h,I,q||m?w:I),M?(_&&ue(e,i,_,g?4:3),ue(e,i,j,g?2.5:2)):O?ue(e,i,E,2):q||m?ue(e,i,w,Math.max(x,2)):ue(e,i,y,x),p){const U=va(b.priority||0);if(U){const W=Math.max(9,Math.min(g?13:11,Math.floor(i*.55)));e.font=`bold ${W}px ui-monospace, SFMono-Regular, Menlo, monospace`,e.textAlign="center",e.textBaseline="middle";const P=i/2,D=i/2;e.lineWidth=3,e.strokeStyle=S?"rgba(0,0,0,0.85)":"rgba(255,255,255,0.95)",e.strokeText(U,P,D),e.fillStyle=S?"#fff":"#1a1a1a",e.fillText(U,P,D)}}e.restore()}},Gs=(e,t,r)=>{const n=Math.min(window.devicePixelRatio||1,2);e.width=Math.max(1,Math.round(t*n)),e.height=Math.max(1,Math.round(r*n)),e.style.width=`${t}px`,e.style.height=`${r}px`;const a=e.getContext("2d");return a?(a.setTransform(n,0,0,n,0,0),a):null},zs=(e,t,r)=>{const{piecesInOneRow:n,pieceSize:a,gap:i,startingX:o,cellCount:c}=r;if(n<1||c<1||a<=0)return-1;const u=a+i,d=e-o;if(d<0||t<0)return-1;const p=Math.floor(d/u),g=Math.floor(t/u);if(p<0||p>=n)return-1;const v=d-p*u,x=t-g*u;if(v>a||x>a)return-1;const R=g*n+p;return R<0||R>=c?-1:R},Hs=()=>({percentage:0,priority:0,isReader:!1,isReaderRange:!1}),Ns=({cache:e,isMini:t,mode:r,isSnakeDebugMode:n})=>{const{t:a}=V(),o=(r||(t?"mini":"detailed"))==="mini",[c,u]=C.useState({width:0,height:0}),{width:d}=c,p=C.useRef(null),g=C.useRef(null),v=C.useRef(null),x=C.useRef(0),R=C.useRef(!0),y=C.useRef(0),[w,j]=C.useState(null),_=C.useMemo(()=>Wi(d,o),[d,o]),E=Xi(e,_),T=E.cells,A=o?"mini":"default",{isDarkMode:S}=C.useContext(ca),l=S?sr.DARK:sr.LIGHT,f=hr[l][A],{cacheMaxHeight:b}=f,{pieceSize:h,gap:m}=C.useMemo(()=>As(f,d,o,T.length),[f,d,o,T.length]),q=d>0?o?Math.max(d-8,d*.96):d:0,M=h+m,O=q>0?Math.max(1,Math.floor(q/M)):0,B=C.useMemo(()=>O?T:[],[T,O]),N=O>0?Math.ceil((q-M*O)/2):0,H=o?4:6,L=O>0?Math.max(B.length>0?Math.ceil(B.length/O):H,H)*M:0,I=C.useMemo(()=>B.length>0?B:Array.from({length:Math.max(O,1)*H},Hs),[B,O,H]);C.useEffect(()=>{const P=p.current;if(!(!P||!q||!L||!O))return cancelAnimationFrame(x.current),x.current=requestAnimationFrame(()=>{const D=Gs(P,q,L);D&&Bs({ctx:D,cells:I,canvasWidth:q,canvasHeight:L,piecesInOneRow:O,pieceSize:h,gap:m,startingX:N,theme:l,variant:A,isSnakeDebugMode:n,isMini:o})}),()=>cancelAnimationFrame(x.current)},[L,q,O,N,h,m,I,A,o,l,n]),C.useEffect(()=>{if(!g.current||!O||M<=0||!R.current)return;const P=ma(e,_);if(!P||E.windowStart==null)return;const D=P.readerPiece-E.windowStart;if(D<0)return;const X=Math.floor(D/O)*M,Y=g.current,Q=Y.scrollTop,se=Q+Y.clientHeight;(X<Q||X+M>se)&&(Y.scrollTop=Math.max(0,X-Y.clientHeight/3))},[e,_,E.windowStart,O,M,I]),C.useEffect(()=>{const P=g.current;if(!P)return;const D=()=>{R.current=!1,window.clearTimeout(y.current),y.current=window.setTimeout(()=>{R.current=!0},4e3)};return P.addEventListener("wheel",D,{passive:!0}),P.addEventListener("touchstart",D,{passive:!0}),P.addEventListener("pointerdown",D),()=>{window.clearTimeout(y.current),P.removeEventListener("wheel",D),P.removeEventListener("touchstart",D),P.removeEventListener("pointerdown",D)}},[d]);const U=C.useCallback(P=>{const D=P.pieceStart,K=P.pieceEnd;if(D==null)return"";const X=P.completed||(P.percentage||0)>=99.5?100:Math.round(P.percentage||0),Y=va(P.priority||0),Q=Y?` · ${Y}`:"";return K!=null&&K!==D?a("SnakeTooltipBucket",{start:D,end:K,fill:X})+Q:a("SnakeTooltipPiece",{id:D,fill:X})+Q},[a]),W=C.useCallback(P=>{if(!O){j(null);return}const D=p.current,K=v.current;if(!D||!K)return;const X=D.getBoundingClientRect(),Y=K.getBoundingClientRect(),Q=P.clientX-X.left,se=P.clientY-X.top,k=zs(Q,se,{piecesInOneRow:O,pieceSize:h,gap:m,startingX:N,cellCount:I.length});if(k<0){j(null);return}const G=U(I[k]);if(!G){j(null);return}j({x:P.clientX-Y.left+12,y:P.clientY-Y.top+12,text:G})},[O,h,m,N,I,U]);return s.jsx(ur,{bounds:!0,onResize:({bounds:P})=>P&&u(P),children:({measureRef:P})=>s.jsxs("div",{style:{display:"flex",flexDirection:"column",width:"100%",minWidth:0,position:"relative"},ref:D=>{v.current=D,P(D)},children:[s.jsx(Is,{ref:g,$themeType:l,$isMini:o,children:O>0&&L>0?s.jsx("canvas",{ref:p,onMouseMove:W,onMouseLeave:()=>j(null)}):null}),w&&s.jsx(Ds,{style:{left:w.x,top:w.y},children:w.text}),E.windowStart!=null&&E.windowEnd!=null&&E.windowEnd>=E.windowStart&&s.jsx(ta,{$themeType:l,children:a("SnakeFocusRange",{start:E.windowStart,end:E.windowEnd})}),o&&b!=null&&L>=b&&s.jsx(ta,{$themeType:l,children:a("ScrollDown")})]})})},Pa=C.memo(Ns,(e,t)=>e.isMini===t.isMini&&e.mode===t.mode&&e.isSnakeDebugMode===t.isSnakeDebugMode&&lr(e.cache.Pieces,t.cache.Pieces)&&lr(e.cache.Readers,t.cache.Readers)&&e.cache.PiecesCount===t.cache.PiecesCount&&e.cache.PiecesLength===t.cache.PiecesLength&&e.cache.Capacity===t.cache.Capacity&&e.cache.Filled===t.cache.Filled),Ma=$`
  ${({theme:{table:{defaultPrimaryColor:e}}})=>$`
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
`,Ls=z.table`
  ${({theme:{table:{defaultPrimaryColor:e,rowBGColor:t,viewedRowBGColor:r,dividerColor:n,rowFontColor:a,outlinedButtonBorderColor:i}}})=>$`
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

        ${Ma}
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
        border-color: ${i};
      }
    }

    @media (max-width: 970px) {
      display: none;
    }
  `}
`,Us=z.div`
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
`,Ws=z.div`
  ${({$isViewed:e,theme:{table:{defaultPrimaryColor:t,defaultSecondaryColor:r,defaultTertiaryColor:n,shortTableButtonsBGColor:a,viewedPrimaryColor:i,viewedSecondaryColor:o,viewedTertiaryColor:c}}})=>$`
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
            font-size: 12px;
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
        ${e&&Ma}
      }

      &-buttons {
        padding: 12px;
        border-bottom: 2px solid ${e?i:t};
        background: ${a};

        .button-cell {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          width: 100%;

          & > *:last-child:nth-child(odd) {
            grid-column: 1 / -1;
          }
        }

        .MuiButton-root {
          min-height: 40px;
          font-size: 12px;
          padding: 6px 8px;
        }

        @media (max-width: 410px) {
          padding: 10px;

          .button-cell {
            gap: 6px;
          }

          .MuiButton-root {
            min-height: 36px;
            font-size: 12px;
          }
        }
      }
    }
  `}
`;var de={},rr,ra;function Ks(){return ra||(ra=1,rr=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,r=[],n=0;n<e.rangeCount;n++)r.push(e.getRangeAt(n));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||r.forEach(function(a){e.addRange(a)}),t&&t.focus()}}),rr}var nr,na;function Fs(){if(na)return nr;na=1;var e=Ks(),t={"text/plain":"Text","text/html":"Url",default:"Text"},r="Copy to clipboard: #{key}, Enter";function n(i){var o=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return i.replace(/#{\s*key\s*}/g,o)}function a(i,o){var c,u,d,p,g,v,x=!1;o||(o={}),c=o.debug||!1;try{d=e(),p=document.createRange(),g=document.getSelection(),v=document.createElement("span"),v.textContent=i,v.ariaHidden="true",v.style.all="unset",v.style.position="fixed",v.style.top=0,v.style.clip="rect(0, 0, 0, 0)",v.style.whiteSpace="pre",v.style.webkitUserSelect="text",v.style.MozUserSelect="text",v.style.msUserSelect="text",v.style.userSelect="text",v.addEventListener("copy",function(y){if(y.stopPropagation(),o.format)if(y.preventDefault(),typeof y.clipboardData>"u"){c&&console.warn("unable to use e.clipboardData"),c&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var w=t[o.format]||t.default;window.clipboardData.setData(w,i)}else y.clipboardData.clearData(),y.clipboardData.setData(o.format,i);o.onCopy&&(y.preventDefault(),o.onCopy(y.clipboardData))}),document.body.appendChild(v),p.selectNodeContents(v),g.addRange(p);var R=document.execCommand("copy");if(!R)throw new Error("copy command was unsuccessful");x=!0}catch(y){c&&console.error("unable to copy using execCommand: ",y),c&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(o.format||"text",i),o.onCopy&&o.onCopy(window.clipboardData),x=!0}catch(w){c&&console.error("unable to copy using clipboardData: ",w),c&&console.error("falling back to prompt"),u=n("message"in o?o.message:r),window.prompt(u,i)}}finally{g&&(typeof g.removeRange=="function"?g.removeRange(p):g.removeAllRanges()),v&&document.body.removeChild(v),d()}return x}return nr=a,nr}var aa;function Vs(){if(aa)return de;aa=1,Object.defineProperty(de,"__esModule",{value:!0}),de.CopyToClipboard=void 0;var e=n(Fs()),t=n(za()),r=["text","onCopy","options","children"];function n(l){return l&&l.__esModule?l:{default:l}}function a(l){"@babel/helpers - typeof";return a=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(f){return typeof f}:function(f){return f&&typeof Symbol=="function"&&f.constructor===Symbol&&f!==Symbol.prototype?"symbol":typeof f},a(l)}function i(l,f){var b=Object.keys(l);if(Object.getOwnPropertySymbols){var h=Object.getOwnPropertySymbols(l);f&&(h=h.filter(function(m){return Object.getOwnPropertyDescriptor(l,m).enumerable})),b.push.apply(b,h)}return b}function o(l){for(var f=1;f<arguments.length;f++){var b=arguments[f]!=null?arguments[f]:{};f%2?i(Object(b),!0).forEach(function(h){E(l,h,b[h])}):Object.getOwnPropertyDescriptors?Object.defineProperties(l,Object.getOwnPropertyDescriptors(b)):i(Object(b)).forEach(function(h){Object.defineProperty(l,h,Object.getOwnPropertyDescriptor(b,h))})}return l}function c(l,f){if(l==null)return{};var b,h,m=u(l,f);if(Object.getOwnPropertySymbols){var q=Object.getOwnPropertySymbols(l);for(h=0;h<q.length;h++)b=q[h],f.indexOf(b)===-1&&{}.propertyIsEnumerable.call(l,b)&&(m[b]=l[b])}return m}function u(l,f){if(l==null)return{};var b={};for(var h in l)if({}.hasOwnProperty.call(l,h)){if(f.indexOf(h)!==-1)continue;b[h]=l[h]}return b}function d(l,f){if(!(l instanceof f))throw new TypeError("Cannot call a class as a function")}function p(l,f){for(var b=0;b<f.length;b++){var h=f[b];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(l,T(h.key),h)}}function g(l,f,b){return f&&p(l.prototype,f),Object.defineProperty(l,"prototype",{writable:!1}),l}function v(l,f,b){return f=w(f),x(l,y()?Reflect.construct(f,b||[],w(l).constructor):f.apply(l,b))}function x(l,f){if(f&&(a(f)=="object"||typeof f=="function"))return f;if(f!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return R(l)}function R(l){if(l===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return l}function y(){try{var l=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(y=function(){return!!l})()}function w(l){return w=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(f){return f.__proto__||Object.getPrototypeOf(f)},w(l)}function j(l,f){if(typeof f!="function"&&f!==null)throw new TypeError("Super expression must either be null or a function");l.prototype=Object.create(f&&f.prototype,{constructor:{value:l,writable:!0,configurable:!0}}),Object.defineProperty(l,"prototype",{writable:!1}),f&&_(l,f)}function _(l,f){return _=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(b,h){return b.__proto__=h,b},_(l,f)}function E(l,f,b){return(f=T(f))in l?Object.defineProperty(l,f,{value:b,enumerable:!0,configurable:!0,writable:!0}):l[f]=b,l}function T(l){var f=A(l,"string");return a(f)=="symbol"?f:f+""}function A(l,f){if(a(l)!="object"||!l)return l;var b=l[Symbol.toPrimitive];if(b!==void 0){var h=b.call(l,f);if(a(h)!="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return(f==="string"?String:Number)(l)}var S=de.CopyToClipboard=(function(l){function f(){var b;d(this,f);for(var h=arguments.length,m=new Array(h),q=0;q<h;q++)m[q]=arguments[q];return b=v(this,f,[].concat(m)),E(b,"onClick",function(M){var O=b.props,B=O.text,N=O.onCopy,H=O.children,L=O.options,I=t.default.Children.only(H),U=(0,e.default)(B,L);N&&N(B,U),I!=null&&I.props&&typeof I.props.onClick=="function"&&I.props.onClick(M)}),b}return j(f,l),g(f,[{key:"render",value:function(){var h=this.props;h.text,h.onCopy,h.options;var m=h.children,q=c(h,r),M=t.default.Children.only(m);return t.default.cloneElement(M,o(o({},q),{},{onClick:this.onClick}))}}])})(t.default.PureComponent);return E(S,"defaultProps",{onCopy:void 0,options:void 0}),de}var ar,ia;function Xs(){if(ia)return ar;ia=1;var e=Vs(),t=e.CopyToClipboard;return t.CopyToClipboard=t,ar=t,ar}var Aa=Xs();const Ys=sa(Aa),xe={width:"100%",minWidth:0};function oa({preloadLabel:e,onPreload:t,playerSupported:r,playerTitle:n,playerSrc:a,downloadSrc:i,hls:o,heartbeatSrc:c,onPlayerNotSupported:u,openLinkHref:d,showOpenLink:p,copyText:g,externalPlayers:v}){const{t:x}=V(),R=la();return s.jsxs("div",{className:"button-cell",children:[s.jsx(Ee,{title:e,children:s.jsx(J,{onClick:t,variant:"outlined",color:"primary",size:"small",sx:xe,children:e})}),r?s.jsx(Ua,{title:n,videoSrc:a,downloadSrc:i,hls:o,heartbeatSrc:c,onNotSupported:u,inlineTrigger:!0}):p&&d&&s.jsx(Ee,{title:x("OpenLink"),children:s.jsx(J,{component:"a",href:d,target:"_blank",rel:"noreferrer",variant:"outlined",color:"primary",size:"small",sx:xe,children:x("OpenLink")})}),v.map(y=>s.jsx(Ee,{title:y.label,children:s.jsx(J,{component:"a",href:y.href,variant:"outlined",color:"primary",size:"small",sx:xe,children:y.label})},y.label)),s.jsx(Ys,{text:g,onCopy:()=>R==null?void 0:R.showToast({message:x("Copied",{defaultValue:"Copied"}),severity:"success"}),children:s.jsx(J,{variant:"outlined",color:"primary",size:"small",sx:xe,children:x("CopyLink")})})]})}Z.addHandler("episode",/(\d{1,4})[- |. ]серия|серия[- |. ](\d{1,4})/i,{type:"integer"});Z.addHandler("season",/sezon[- |. ](\d{1,3})|(\d{1,3})[- |. ]sezon/i,{type:"integer"});Z.addHandler("season",/сезон[- |. ](\d{1,3})|(\d{1,3})[- |. ]сезон/i,{type:"integer"});const Js=C.memo(({playableFileList:e,viewedFileList:t,selectedSeason:r,seasonAmount:n,hash:a})=>{const{t:i}=V(),[o,c]=C.useState({}),u=Wa(),d=h=>fetch(`${vr()}?link=${a}&index=${h}&preload`),p=(h,m)=>`${vr()}/${encodeURIComponent(h.split("\\").pop().split("/").pop())}?link=${a}&index=${m}&play`,g=(h,m)=>{const q=Xa(h,u);return{key:`${m}:${q?"gst":"stream"}`,src:q?Ja(a,m):p(h,m),hls:q,heartbeatSrc:q?Ya(a):""}},v=h=>{c(m=>({...m,[h]:!0}))},x=!!(e!=null&&e.find(({path:h})=>Z.parse(h).episode)),R=!!(e!=null&&e.find(({path:h})=>Z.parse(h).season)),y=!!(e!=null&&e.find(({path:h})=>Z.parse(h).resolution)),w=((e==null?void 0:e.length)??0)>1&&!x,j=fe("isVlcUsed"),_=fe("isInfuseUsed"),E=fe("isSenPlayerUsed"),T=fe("isIinaUsed"),A=Ka(),S=Fa(),l=Va(),f=!A||!(l&&_)&&!(l&&E)&&!j&&!(S&&T),b=(h,m,q,M)=>{const O=[];return l&&_&&O.push({label:i("Infuse"),href:m}),l&&E&&O.push({label:i("SenPlayer"),href:q}),j&&O.push({label:"VLC",href:`vlc://${h}`}),S&&T&&O.push({label:"IINA",href:M}),O};return e!=null&&e.length?s.jsxs(s.Fragment,{children:[s.jsxs(Ls,{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{style:{width:"0"},children:i("Viewed")}),s.jsx("th",{children:i("Name")}),R&&(n==null?void 0:n.length)===1&&s.jsx("th",{style:{width:"0"},children:i("Season")}),x&&s.jsx("th",{style:{width:"0"},children:i("Episode")}),y&&s.jsx("th",{style:{width:"0"},children:i("Resolution")}),s.jsx("th",{style:{width:"100px"},children:i("Size")}),s.jsx("th",{style:{width:"340px"},children:i("Actions")})]})}),s.jsx("tbody",{children:e.map(({id:h,path:m,length:q})=>{const{title:M,resolution:O,episode:B,season:N}=Z.parse(m),H=t==null?void 0:t.includes(h),L=p(m,h),I=g(m,h),U=!o[I.key],W=new URL(L,window.location.href),P=`infuse://x-callback-url/play?url=${encodeURIComponent(W.toString())}`,D=`senplayer://x-callback-url/play?url=${encodeURIComponent(W.toString())}`,K=`iina://weblink?url=${encodeURIComponent(W.toString())}`;return(N===r||!(n!=null&&n.length))&&s.jsxs("tr",{className:H?"viewed-file-row":void 0,children:[s.jsx("td",{"data-label":"viewed","aria-label":"viewed",className:H?"viewed-file-indicator":void 0}),s.jsx("td",{"data-label":"name",children:w?m:M}),R&&(n==null?void 0:n.length)===1&&s.jsx("td",{"data-label":"season",children:N}),x&&s.jsx("td",{"data-label":"episode",children:B}),y&&s.jsx("td",{"data-label":"resolution",children:O}),s.jsx("td",{"data-label":"size",children:ne(q)}),s.jsx("td",{children:s.jsx(oa,{preloadLabel:i("Preload"),onPreload:()=>d(h),playerSupported:U,playerTitle:M,playerSrc:I.src,downloadSrc:L,hls:I.hls,heartbeatSrc:I.heartbeatSrc,onPlayerNotSupported:()=>v(I.key),openLinkHref:L,showOpenLink:f,copyText:W.toString(),externalPlayers:b(W,P,D,K)})})]},h)})})]}),s.jsx(Us,{children:e.map(({id:h,path:m,length:q})=>{const{title:M,resolution:O,episode:B,season:N}=Z.parse(m),H=t==null?void 0:t.includes(h),L=p(m,h),I=g(m,h),U=!o[I.key],W=new URL(L,window.location.href),P=`infuse://x-callback-url/play?url=${encodeURIComponent(W.toString())}`,D=`senplayer://x-callback-url/play?url=${encodeURIComponent(W.toString())}`,K=`iina://weblink?url=${encodeURIComponent(W.toString())}`;return(N===r||!(n!=null&&n.length))&&s.jsxs(Ws,{$isViewed:H,children:[s.jsx("div",{className:"short-table-name",children:w?m:M}),s.jsxs("div",{className:"short-table-data",children:[H&&s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:i("Viewed")}),s.jsx("div",{className:"short-table-field-value",children:s.jsx("div",{className:"short-table-viewed-indicator"})})]}),R&&(n==null?void 0:n.length)===1&&s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:i("Season")}),s.jsx("div",{className:"short-table-field-value",children:N})]}),x&&s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:i("Episode")}),s.jsx("div",{className:"short-table-field-value",children:B})]}),y&&s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:i("Resolution")}),s.jsx("div",{className:"short-table-field-value",children:O})]}),s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:i("Size")}),s.jsx("div",{className:"short-table-field-value",children:ne(q)})]})]}),s.jsx("div",{className:"short-table-buttons",children:s.jsx(oa,{preloadLabel:i("Preload"),onPreload:()=>d(h),playerSupported:U,playerTitle:M,playerSrc:I.src,downloadSrc:L,hls:I.hls,heartbeatSrc:I.heartbeatSrc,onPlayerNotSupported:()=>v(I.key),openLinkHref:L,showOpenLink:f,copyText:W.toString(),externalPlayers:b(W,P,D,K)})})]},h)})})]}):i("NoPlayableFiles")},(e,t)=>lr(e,t)),Zs=z.div`
  ${({theme:{dialogTorrentDetailsContent:{torrentFilesSectionBGColor:e}}})=>$`
    display: grid;
    grid-template-columns: minmax(0, 70%) minmax(0, 1fr);
    grid-template-rows: repeat(2, min-content);
    grid-template-areas:
      'main cache'
      'file-list file-list';
    min-width: 0;
    min-height: 100%;
    background: ${e};

    @media (max-width: 930px) {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: repeat(3, min-content);
      grid-template-areas:
        'main'
        'cache'
        'file-list';
    }
  `}
`,Qs=z.div`
  ${({$poster:e,theme:{dialogTorrentDetailsContent:{posterBGColor:t}}})=>$`
    height: 400px;
    border-radius: 5px;
    overflow: hidden;
    align-self: center;

    ${e?$`
            img {
              border-radius: 5px;
              height: 100%;
              width: 100%;
              max-width: 100%;
              object-fit: cover;
            }
          `:$`
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

    @media (max-width: 930px) {
      ${e?$`
              height: 200px;
            `:$`
              display: none;
            `}
    }
  `}
`,ec=z.section`
  ${({theme:{dialogTorrentDetailsContent:{gradientStartColor:e,gradientEndColor:t}}})=>$`
    grid-area: main;
    padding: 24px;
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 20px;
    background: linear-gradient(145deg, ${e}, ${t});

    @media (max-width: 930px) {
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
`,tc=z.section`
  ${({theme:{dialogTorrentDetailsContent:{cacheSectionBGColor:e}}})=>$`
    grid-area: cache;
    align-self: start;
    padding: 24px;
    display: grid;
    align-content: start;
    grid-template-rows: min-content min-content min-content;
    background: ${e};
    min-width: 0;

    @media (max-width: 800px) {
      padding: 16px 12px;
    }

    @media (max-width: 420px) {
      padding: 12px 10px;
      gap: 8px;
    }
  `}
`,rc=z.section`
  ${({theme:{dialogTorrentDetailsContent:{torrentFilesSectionBGColor:e}}})=>$`
    grid-area: file-list;
    padding: 40px;
    box-shadow: inset 3px 25px 8px -25px rgba(0, 0, 0, 0.5);
    background: ${e};
    min-height: 100%;

    @media (max-width: 800px) {
      padding: 16px 12px 20px;
    }

    @media (max-width: 420px) {
      padding: 12px 10px 16px;
    }
  `}
`,ge=z.div`
  ${({$mb:e,theme:{dialogTorrentDetailsContent:{subNameFontColor:t}}})=>$`
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
`,re=z.div`
  ${({$color:e,$mb:t,theme:{dialogTorrentDetailsContent:{titleFontColor:r}}})=>$`
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
`,nc=z.div`
  margin-bottom: 20px;
`,Da=z.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
  gap: 20px;

  @media (max-width: 800px) {
    gap: 15px;
  }
  @media (max-width: 410px) {
    gap: 10px;
  }

  ${({$detailedView:e})=>e?$`
          @media (max-width: 800px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          @media (max-width: 410px) {
            grid-template-columns: minmax(0, 1fr);
          }
        `:$`
          @media (max-width: 800px) {
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
          }
          @media (max-width: 480px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));

            & > *:last-child:nth-child(odd) {
              grid-column: 1 / -1;
            }
          }
          @media (max-width: 390px) {
            grid-template-columns: minmax(0, 1fr);
          }
        `}
`,ac=z.div`
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
`,ic=z.div`
  ${({theme:{dialogTorrentDetailsContent:{titleFontColor:e}}})=>$`
    grid-area: title;
    justify-self: start;
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 2px;
    font-weight: 500;
    color: ${e};
  `}
`,oc=z.div`
  ${({$bgColor:e,$fontColor:t})=>$`
    grid-area: icon;
    color: ${t||ee("#fff",.8)};
    background: ${e};
    border-radius: 8px 0 0 8px;

    @media (max-width: 800px) {
      > svg {
        width: 50%;
      }
    }
  `}
`,sc=z.div`
  ${({$bgColor:e,$fontColor:t,theme:{dialogTorrentDetailsContent:{widgetFontColor:r}}})=>$`
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
`,cc=z.div`
  ${({theme:{addDialog:{separatorColor:e}}})=>$`
    height: 1px;
    background-color: ${e};
    margin: 20px 0;
  `}
`,lc=z.div`
  ${({theme:{dialogTorrentDetailsContent:{torrentFilesSectionBGColor:e}}})=>$`
    overflow: auto;
    min-height: 100%;
    background: ${e};
  `}
`,uc=z.section`
  ${({theme:{detailedView:{gradientStartColor:e,gradientEndColor:t}}})=>$`
    padding: 40px;
    background: linear-gradient(145deg, ${e}, ${t});

    @media (max-width: 800px) {
      padding: 20px;
    }
  `}
`,dc=z.section`
  ${({theme:{detailedView:{cacheSectionBGColor:e}}})=>$`
    padding: 40px;
    box-shadow: inset 3px 25px 8px -25px rgba(0, 0, 0, 0.5);
    background: ${e};
    flex: 1;

    @media (max-width: 800px) {
      padding: 20px;
    }
  `}
`;function ie({icon:e,title:t,value:r,iconBg:n,valueBg:a,fontColor:i}){return s.jsxs(ac,{children:[s.jsx(ic,{children:t}),s.jsx(oc,{$bgColor:n,$fontColor:i,children:s.jsx(e,{})}),s.jsx(sc,{$bgColor:a,$fontColor:i,children:r})]})}const{LIGHT:fc,DARK:hc}=sr,pc={light:{downloadSpeed:{iconBGColor:"#118f00",valueBGColor:"#13a300"},uploadSpeed:{iconBGColor:"#0146ad",valueBGColor:"#0058db"},peers:{iconBGColor:"#cdc118",valueBGColor:"#d8cb18",fontColor:"#1a1a1a"},piecesCount:{iconBGColor:"#b6c95e",valueBGColor:"#c0d076"},piecesLength:{iconBGColor:"#0982c8",valueBGColor:"#098cd7"},status:{iconBGColor:"#aea25b",valueBGColor:"#b4aa6e"},size:{iconBGColor:"#9b01ad",valueBGColor:"#ac03bf"},category:{iconBGColor:"#914820",valueBGColor:"#c9632c"}},dark:{downloadSpeed:{iconBGColor:"#0c6600",valueBGColor:"#0d7000"},uploadSpeed:{iconBGColor:"#003f9e",valueBGColor:"#0047b3"},peers:{iconBGColor:"#a69c11",valueBGColor:"#b4a913",fontColor:"#1a1a1a"},piecesCount:{iconBGColor:"#8da136",valueBGColor:"#99ae3d"},piecesLength:{iconBGColor:"#07659c",valueBGColor:"#0872af"},status:{iconBGColor:"#938948",valueBGColor:"#9f9450"},size:{iconBGColor:"#81008f",valueBGColor:"#9102a1"},category:{iconBGColor:"#914820",valueBGColor:"#c9632c"}}};function oe(e){const{isDarkMode:t}=C.useContext(ca);return pc[t?hc:fc][e]}const Ia=({data:e})=>{const{t}=V(),{iconBGColor:r,valueBGColor:n}=oe("downloadSpeed");return s.jsx(ie,{title:t("DownloadSpeed"),value:ua(e)||`0 ${t("bps")}`,iconBg:r,valueBg:n,icon:gi})},ka=({data:e})=>{const{t}=V(),{iconBGColor:r,valueBGColor:n}=oe("uploadSpeed");return s.jsx(ie,{title:t("UploadSpeed"),value:ua(e)||`0 ${t("bps")}`,iconBg:r,valueBg:n,icon:vi})},$a=({data:e})=>{const{t}=V(),{iconBGColor:r,valueBGColor:n,fontColor:a}=oe("peers");return s.jsx(ie,{title:t("Peers"),value:Za(e)||"0 / 0 · 0",iconBg:r,valueBg:n,fontColor:a,icon:mi})},gc=({data:e})=>{const{t}=V(),{iconBGColor:r,valueBGColor:n}=oe("piecesCount");return s.jsx(ie,{title:t("PiecesCount"),value:e,iconBg:r,valueBg:n,icon:xi})},vc=({data:e})=>{const{t}=V(),{iconBGColor:r,valueBGColor:n}=oe("piecesLength");return s.jsx(ie,{title:t("PiecesLength"),value:ne(e),iconBg:r,valueBg:n,icon:yi})},Ba=({stat:e})=>{const{t}=V(),r={[fa]:t("TorrentGettingInfo"),[ti]:t("TorrentPreload"),[ei]:t("TorrentWorking"),[Qa]:t("TorrentClosed"),[da]:t("TorrentInDb")},{iconBGColor:n,valueBGColor:a}=oe("status");return s.jsx(ie,{title:t("TorrentStatus"),value:e!=null?r[e]:void 0,iconBg:n,valueBg:a,icon:_i})},Ga=({data:e})=>{const{t}=V(),{iconBGColor:r,valueBGColor:n}=oe("size");return s.jsx(ie,{title:t("TorrentSize"),value:ne(e),iconBg:r,valueBg:n,icon:bi})},mc=({data:e})=>{const{t}=V(),{iconBGColor:r,valueBGColor:n}=oe("category"),a=mr.findIndex(o=>o.key===e),i=mr.find(o=>o.key===e);return e?s.jsx(ie,{title:t("Category"),value:a>=0?t(i.name):e.length>1?e.charAt(0).toUpperCase()+e.slice(1):e,iconBg:r,valueBg:n,icon:wi}):null};function bc({downloadSpeed:e,uploadSpeed:t,torrent:r,torrentSize:n,PiecesCount:a,PiecesLength:i,stat:o,cache:c,isSnakeDebugMode:u,setIsSnakeDebugMode:d}){const{t:p}=V();return s.jsxs(s.Fragment,{children:[s.jsxs(uc,{children:[s.jsx(re,{$mb:20,children:p("Data")}),s.jsxs(Da,{$detailedView:!0,children:[s.jsx(Ia,{data:e}),s.jsx(ka,{data:t}),s.jsx($a,{data:r}),s.jsx(Ga,{data:n}),s.jsx(gc,{data:a}),s.jsx(vc,{data:i}),s.jsx(Ba,{stat:o})]})]}),s.jsxs(dc,{children:[s.jsx(re,{$mb:20,children:s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[s.jsx("span",{children:p("Cache")}),s.jsx(Ci,{control:s.jsx(Si,{color:"primary",checked:u,disableRipple:!0,onChange:({target:{checked:g}})=>{d(g),ri("isSnakeDebugMode",g)}}),label:p("DebugMode"),labelPlacement:"start"})]})}),s.jsx(Pa,{cache:c,mode:"detailed",isSnakeDebugMode:u})]})]})}const ir=z.div`
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
`,or=z.div`
  ${({$mb:e,theme:{torrentFunctions:{fontColor:t}}})=>$`
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
`,xc=C.memo(({hash:e,viewedFileList:t,playableFileList:r,name:n,title:a,setViewedFileList:i})=>{var _;const{t:o}=V(),c=la(),[u,d]=C.useState(null),p=t==null?void 0:t[(t==null?void 0:t.length)-1],g=(_=r==null?void 0:r.find(({id:E})=>E===p))==null?void 0:_.path,v=(r==null?void 0:r.length)===1,x=g?Z.parse(g):null,R=`${ni()}/${encodeURIComponent(n||a||"file")}.m3u?link=${e}&m3u`,y=`${R}&fromlast`,w=`magnet:?xt=urn:btih:${e}&dn=${encodeURIComponent(n||a||"")}`,j=()=>{u==="drop"&&ve.post(ai(),{action:"drop",hash:e}).then(()=>c==null?void 0:c.showToast({message:o("DropTorrent"),severity:"success"})).catch(()=>c==null?void 0:c.showToast({message:o("PlaybackError"),severity:"error"})),u==="views"&&ve.post(ha(),{action:"rem",hash:e,file_index:-1}).then(()=>{i(),c==null||c.showToast({message:o("RemoveViews"),severity:"success"})}).catch(()=>c==null?void 0:c.showToast({message:o("PlaybackError"),severity:"error"})),d(null)};return s.jsxs(s.Fragment,{children:[!v&&!!(t!=null&&t.length)&&s.jsxs(s.Fragment,{children:[s.jsx(or,{children:o("DownloadPlaylist")}),s.jsxs(ge,{$mb:10,children:[o("LatestFilePlayed")," ",s.jsxs("strong",{children:[x==null?void 0:x.title,".",(x==null?void 0:x.season)&&s.jsxs(s.Fragment,{children:[" ",o("Season"),": ",x==null?void 0:x.season,". ",o("Episode"),": ",x==null?void 0:x.episode,"."]})]})]}),s.jsxs(ir,{children:[s.jsx(J,{component:"a",href:R,variant:"contained",color:"primary",size:"large",children:o("Full")}),s.jsx(J,{component:"a",href:y,variant:"contained",color:"primary",size:"large",children:o("FromLatestFile")})]})]}),s.jsx(or,{$mb:10,children:o("TorrentState")}),s.jsxs(ir,{children:[s.jsx(J,{onClick:()=>d("views"),variant:"outlined",color:"primary",size:"large",children:o("RemoveViews")}),s.jsx(J,{onClick:()=>d("drop"),variant:"contained",color:"error",size:"large",children:o("DropTorrent")})]}),s.jsx(or,{$mb:10,children:o("Info")}),s.jsxs(ir,{children:[(v||!(t!=null&&t.length))&&s.jsx(J,{component:"a",href:R,variant:"contained",color:"primary",size:"large",children:o("DownloadPlaylist")}),s.jsx(Aa.CopyToClipboard,{text:w,onCopy:()=>c==null?void 0:c.showToast({message:o("Copied"),severity:"success"}),children:s.jsx(J,{variant:"contained",color:"primary",size:"large",children:o("CopyHash")})})]}),s.jsxs(Ri,{open:u!=null,onClose:()=>d(null),"aria-labelledby":"torrent-fn-confirm-title",children:[s.jsx(ji,{id:"torrent-fn-confirm-title",children:o(u==="drop"?"DropTorrent":"RemoveViews")}),s.jsx(Ti,{children:s.jsx(qi,{children:o(u==="drop"?"ConfirmDropTorrent":"ConfirmRemoveViews")})}),s.jsxs(Oi,{children:[s.jsx(J,{autoFocus:!0,onClick:()=>d(null),variant:"outlined",color:"primary",children:o("Cancel")}),s.jsx(J,{onClick:j,variant:"contained",color:u==="drop"?"error":"primary",children:o("OK")})]})]})]})}),yc=()=>s.jsx("div",{style:{minHeight:"80vh",display:"grid",placeItems:"center"},children:s.jsx(Ai,{color:"secondary"})}),_c=e=>({id:e.id??e.Id??0,path:e.path??e.Path??"",length:e.length??e.Length??0});function Tc({closeDialog:e,torrent:t}){var se;const{t:r}=V(),{dialogTorrentDetailsContent:{bufferTrailStartColor:n,bufferTrailEndColor:a,bufferEmptyTrackColor:i,bufferTrackBorderColor:o}}=ii(),[c,u]=C.useState(!0),[d,p]=C.useState(!1),[g,v]=C.useState(),[x,R]=C.useState(),[y,w]=C.useState(null),[j,_]=C.useState(),[E,T]=C.useState(fe("isSnakeDebugMode")),{poster:A,hash:S,title:l,category:f,name:b,stat:h,download_speed:m,upload_speed:q,torrent_size:M,file_stats:O}=t,B=Vi(S),N=Yi(),{Capacity:H,PiecesCount:L,PiecesLength:I,Filled:U}=B;C.useEffect(()=>{if(x&&y===null){const k=[];x.forEach(({path:G})=>{const F=Z.parse(G).season;F&&!k.includes(F)&&k.push(F)}),k.length&&_(k[0]),w(k.sort((G,F)=>G-F))}},[x,y]),C.useEffect(()=>{R(O==null?void 0:O.map(_c).filter(({path:k})=>oi(k)))},[O]),C.useEffect(()=>{const k=!!Object.entries(B).length,G=h!==fa&&h!==da;!k&&!c&&u(!0),k&&c&&G&&u(!1)},[h,B,c]),C.useEffect(()=>{ve.post(ha(),{action:"list",hash:S}).then(({data:k})=>{if(k){const G=k.map(F=>F.file_index).sort((F,pr)=>F-pr);v(G)}else v(void 0)})},[S]);const W=N==null?void 0:N.PreloadCache,P=(H||0)/100*(W||0),D=P>33554432?P:33554432,K=H&&H>0?H:D,X=K>0&&U!=null&&U>0?Math.min(100,Math.round(U*100/K)):null,Y=H&&H>0&&P>0?Math.min(100,Math.round(P*100/H)):null,Q=()=>{const k=[],G=b?Z.parse(b):null;l!==b?k.push(br(l||"")):G!=null&&G.title&&k.push(br(G.title)),G!=null&&G.year&&!String(k[0]||"").includes(String(G.year))&&k.push(G.year),G!=null&&G.resolution&&!String(k[0]||"").includes(String(G.resolution))&&k.push(G.resolution);const F=k.join(". ");return F[F.length-1]==="."&&F[F.length-2]==="."?`${F}.`:F};return s.jsxs(s.Fragment,{children:[s.jsx(Ji,{onClose:e,title:r(d?"DetailedCacheView.header":"TorrentDetails"),...d&&{onBack:()=>p(!1)}}),s.jsx(lc,{style:{...d&&{display:"flex",flexDirection:"column"}},children:c?s.jsx(yc,{}):d?s.jsx(bc,{downloadSpeed:m,uploadSpeed:q,torrent:t,torrentSize:M,PiecesCount:L,PiecesLength:I,stat:h,cache:B,isSnakeDebugMode:E,setIsSnakeDebugMode:T}):s.jsxs(Zs,{children:[s.jsxs(ec,{children:[s.jsx(Qs,{$poster:!!A,children:A?s.jsx("img",{alt:"poster",src:A}):s.jsx(si,{})}),s.jsxs("div",{children:[l&&b!==l?Q().length>90?s.jsxs(s.Fragment,{children:[s.jsx(re,{children:Z.parse(b||"").title}),s.jsx(ge,{$mb:20,children:Q()})]}):s.jsxs(s.Fragment,{children:[s.jsx(re,{children:Q()}),s.jsx(ge,{$mb:20,children:(se=Z.parse(b||""))==null?void 0:se.title})]}):s.jsx(re,{$mb:20,children:Q()}),s.jsxs(Da,{children:[s.jsx(Ia,{data:m}),s.jsx(ka,{data:q}),s.jsx($a,{data:t}),s.jsx(Ga,{data:M}),s.jsx(Ba,{stat:h}),s.jsx(mc,{data:f})]}),s.jsx(cc,{}),s.jsx(xc,{hash:S,viewedFileList:g,playableFileList:x,name:b,title:l,setViewedFileList:v})]})]}),s.jsxs(tc,{children:[s.jsxs(nc,{children:[s.jsx(re,{$mb:12,children:r("Buffer")}),D<=33554432&&s.jsx(ge,{children:r("BufferNote")}),s.jsxs(Ei,{spacing:1,sx:{mt:.5},children:[s.jsxs(pa,{component:"div",variant:"body2",fontWeight:600,textAlign:"center","aria-label":`${ne(U||0)} / ${ne(K)}`,children:[`${ne(U||0)} / ${ne(K)}`,X!=null?` · ${X}%`:""]}),s.jsxs(yr,{sx:{position:"relative"},children:[s.jsx(Pi,{variant:"determinate",value:X??0,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":X??0,sx:{height:10,borderRadius:1,border:`1px solid ${o}`,backgroundColor:i,"& .MuiLinearProgress-bar":{borderRadius:1,background:`linear-gradient(90deg, ${n}, ${a})`}}}),Y!=null&&Y>0&&s.jsx(yr,{"aria-hidden":!0,title:r("SettingsDialog.PreloadCache"),sx:{position:"absolute",left:`${Y}%`,top:-2,bottom:-2,width:2,ml:"-1px",borderRadius:1,bgcolor:o,boxShadow:`0 0 0 1px ${i}`,pointerEvents:"none"}})]})]})]}),s.jsx(Pa,{mode:"mini",cache:B,isSnakeDebugMode:E}),s.jsx(J,{style:{marginTop:"20px",width:"100%"},variant:"outlined",color:"primary",size:"large",onClick:()=>p(!0),children:r("DetailedCacheView.button")})]}),s.jsxs(rc,{children:[s.jsx(re,{$mb:20,children:r("TorrentContent")}),((y==null?void 0:y.length)??0)>1&&s.jsxs(s.Fragment,{children:[s.jsx(ge,{$mb:7,children:r("SelectSeason")}),s.jsx(Mi,{style:{marginBottom:"30px",flexWrap:"wrap",rowGap:8},color:"secondary",children:y.map(k=>s.jsx(J,{variant:j===k?"contained":"outlined",onClick:()=>_(k),children:k},k))}),s.jsxs(re,{$mb:20,children:[r("Season")," ",j]})]}),s.jsx(Js,{hash:S,playableFileList:x,viewedFileList:g,selectedSeason:j,seasonAmount:y})]})]})})]})}export{Tc as default};
