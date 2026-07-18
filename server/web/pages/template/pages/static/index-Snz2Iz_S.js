import{a as x,d as be,u as X,j as s,n as Ee,g as ha,r as Wa}from"./vendor-B9KbAPe3.js";import{V as _r,s as Fa,W as Ka,X as ye,j as re,Y as pa,Z as ur,r as Y,m as $,$ as ga,a0 as Va,a1 as Xa,E as ee,a2 as pe,a3 as Ya,a4 as Ja,a5 as Za,a6 as ie,a7 as xr,a8 as Qa,a9 as eo,aa as to,ab as va,ac as ro,ad as ma,ae as no,af as ao,ag as oo,ah as ba,T as Cr,ai as io,aj as so,h as co,ak as ya,al as lo,N as uo,am as wr}from"./index-BKq7mRND.js";import{bo as fo,l as Sr,bp as ho,af as pr,ax as po,s as go,b1 as vo,_ as mo,bn as ne,d as H,ak as z,T as Me,B as Q,bl as bo,bk as yo,bq as _o,br as xo,bs as Co,bt as wo,bu as So,bb as Rr,y as Ro,R as jo,au as dr,am as To,at as qo,az as Oo,bv as Po,aP as Eo,e as Mo,aT as jr,p as Ao,C as Do}from"./mui-CgLukkAf.js";import{_ as $o,a as Io,b as ko}from"./mui-x-qYBHT7cz.js";import{a as Se,c as _a,r as se,d as Bo,b as Re,e as Go}from"./isObjectLike-Ddue8m3w.js";import"./hls-CWTT-7hy.js";const zo=16,Ho=10,Lo=(e,t,r)=>{if(e==null||t==null||r<=0)return null;const n=Math.max(0,Math.min(r-1,Math.floor(e))),a=Math.max(0,Math.min(r-1,Math.floor(t)));return a<n?null:{start:n,end:a}},No=(e,t,r,n)=>{const a=Lo(e,t,r);if(a)for(let o=a.start;o<=a.end;o++)n(o)},Uo=(e,t)=>{if(e){if(Array.isArray(e)){for(let r=0;r<e.length;r++){const n=e[r];n&&t(r,n)}return}for(const[r,n]of Object.entries(e)){if(!n)continue;const a=Number(r);Number.isFinite(a)&&t(a,n)}}},Wo=(e,t)=>{if(!e)return 0;const r=e.Length||t||0,n=e.Size||0;if(r<=0)return n>0?100:0;const a=Math.min(n,r);return Math.min(100,a/r*100)},Fo=(e,t,r,n)=>{if(!(n!=null&&n.length))return t>=2?t:0;if(n.some(i=>i.Reader===e))return 5;if(t>=2)return t;if(r)return 0;let o=0;for(const i of n){if(i.Reader==null||i.Start==null||i.End==null)continue;const c=i.Reader,u=i.End;if(e<c||e>u)continue;let d=2;if(e===c+1)d=4;else{const h=Math.max(1,u-c),g=c+Math.max(2,Math.floor(h*.45));e<=g?d=3:e<=g+5&&(d=2)}d>o&&(o=d)}return o>0?o:t},xa=e=>e===2?"H":e===3?"R":e===4?"N":e===5?"A":"",Ko=(e,t,r,n,a,o)=>{const i=Wo(t,r),c=!!(t!=null&&t.Completed)||i>=100,u=(t==null?void 0:t.Priority)||0;return{percentage:c?100:i,priority:Fo(e,u,c,o),completed:c,isReader:n,isReaderRange:a,pieceStart:e,pieceEnd:e}},Ca=(e,t)=>{const r=e.PiecesCount??0;if(r<=0)return null;const n=e.Readers||[];let a=0;if(n.length>0){let g=-1;for(const v of n)v.Reader!=null&&v.Reader>=0&&v.Reader<r&&v.Reader>g&&(g=v.Reader);a=g>=0?g:0}const o=e.PiecesLength||0,i=o>0?Math.max(1,Math.round((e.Capacity||0)/o)):t,c=Math.max(t,64);let u=Math.min(r,Math.max(t,i),c);u=Math.max(1,u);let d=a-Math.floor(u/2);d<0&&(d=0);let h=d+u-1;return h>=r&&(h=r-1,d=Math.max(0,h-u+1)),{start:d,end:h,readerPiece:a}},Vo=(e,t)=>{const r=e.PiecesCount??0,n=Ca(e,t);if(!n||r<=0)return{cells:[],piecesCount:r,bucketSize:1,windowStart:0,windowEnd:-1};const a=e.PiecesLength||0,o=e.Readers||[],i=new Map;Uo(e.Pieces,(h,g)=>{h>=n.start&&h<=n.end&&i.set(h,g)});const c=new Set,u=new Set;for(const h of o)h.Reader!=null&&h.Reader>=n.start&&h.Reader<=n.end&&c.add(h.Reader),No(h.Start,h.End,r,g=>{g>=n.start&&g<=n.end&&u.add(g)});const d=[];for(let h=n.start;h<=n.end;h++)d.push(Ko(h,i.get(h),a,c.has(h),u.has(h),o));return{cells:d,piecesCount:r,bucketSize:1,windowStart:n.start,windowEnd:n.end}},Xo=(e,t=!1)=>{const r=t?Ho:zo,n=t?31:24;return!e||e<=0?10*r:Math.max(1,Math.floor(e/n))*r},_e=100,Yo=400,Jo=2e3,Tr=e=>e!=null&&e.length?e.map(t=>`${t.Reader??""}:${t.Start??""}-${t.End??""}`).join("|"):"",qr=e=>{if(!e)return"";if(Array.isArray(e)){let r="";for(let n=0;n<e.length;n++){const a=e[n];a&&(r+=`${n}:${a.Size??0}:${a.Priority??0};`)}return r}let t="";for(const[r,n]of Object.entries(e))n&&(t+=`${r}:${n.Size??0}:${n.Priority??0};`);return t},Or=(e,t)=>e.Filled===t.Filled&&e.Capacity===t.Capacity&&e.PiecesCount===t.PiecesCount&&e.PiecesLength===t.PiecesLength&&Tr(e.Readers)===Tr(t.Readers)&&qr(e.Pieces)===qr(t.Pieces),Zo=e=>{const[t,r]=x.useState({}),n=x.useRef(!0),a=x.useRef(null),o=x.useRef(!1),i=x.useRef({}),c=x.useRef(Date.now()),u=x.useRef(_e);return x.useEffect(()=>()=>{n.current=!1},[]),x.useEffect(()=>{if(!e){a.current&&clearTimeout(a.current);return}let d=!1;const h=()=>{d||(a.current=setTimeout(g,u.current))},g=()=>{d||o.current||document.hidden||(o.current=!0,be.post(Ka(),{action:"get",hash:e}).then(({data:y})=>{if(!n.current||d)return;const R=y||{};if(Or(i.current,R)){Date.now()-c.current>=Jo&&(u.current=Yo);return}c.current=Date.now(),u.current=_e,i.current=R,r(R)}).catch(()=>{!n.current||d||Or(i.current,{})||(c.current=Date.now(),u.current=_e,i.current={},r({}))}).finally(()=>{o.current=!1,document.hidden||h()}))};g();const v=()=>{if(document.hidden){a.current&&clearTimeout(a.current);return}u.current=_e,g()};return document.addEventListener("visibilitychange",v),()=>{d=!0,a.current&&clearTimeout(a.current),document.removeEventListener("visibilitychange",v)}},[e]),t},Qo=(e,t)=>x.useMemo(()=>Vo(e,t),[e,t]),ei=()=>{const[e,t]=x.useState(),[r,n]=x.useState(0);return x.useEffect(()=>{const a=()=>n(o=>o+1);return window.addEventListener(_r,a),()=>window.removeEventListener(_r,a)},[]),x.useEffect(()=>{let a=!1;return be.post(Fa(),{action:"get"}).then(({data:o})=>{a||t(o)}),()=>{a=!0}},[r]),e},ti=go(vo)`
  && {
    position: relative;
    padding-top: var(--safe-top);
  }
`;function ri({title:e,onClose:t,onBack:r}){const{t:n}=X();return s.jsx(ti,{children:s.jsxs(fo,{children:[r&&s.jsx(Sr,{edge:"start",color:"inherit",onClick:r,"aria-label":n("Back",{defaultValue:"Back"}),children:s.jsx(ho,{})}),s.jsx(pr,{variant:"h6",sx:{marginLeft:"5px",flex:1},children:e}),s.jsx(Sr,{color:"inherit",onClick:t,"aria-label":n("Close",{defaultValue:"Close"}),sx:{marginRight:"-10px"},children:s.jsx(po,{})})]})})}var wa=(function(){if(typeof Map<"u")return Map;function e(t,r){var n=-1;return t.some(function(a,o){return a[0]===r?(n=o,!0):!1}),n}return(function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(r){var n=e(this.__entries__,r),a=this.__entries__[n];return a&&a[1]},t.prototype.set=function(r,n){var a=e(this.__entries__,r);~a?this.__entries__[a][1]=n:this.__entries__.push([r,n])},t.prototype.delete=function(r){var n=this.__entries__,a=e(n,r);~a&&n.splice(a,1)},t.prototype.has=function(r){return!!~e(this.__entries__,r)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(r,n){n===void 0&&(n=null);for(var a=0,o=this.__entries__;a<o.length;a++){var i=o[a];r.call(n,i[1],i[0])}},t})()})(),fr=typeof window<"u"&&typeof document<"u"&&window.document===document,Ce=(function(){return typeof Ee<"u"&&Ee.Math===Math?Ee:typeof self<"u"&&self.Math===Math?self:typeof window<"u"&&window.Math===Math?window:Function("return this")()})(),ni=(function(){return typeof requestAnimationFrame=="function"?requestAnimationFrame.bind(Ce):function(e){return setTimeout(function(){return e(Date.now())},1e3/60)}})(),ai=2;function oi(e,t){var r=!1,n=!1,a=0;function o(){r&&(r=!1,e()),n&&c()}function i(){ni(o)}function c(){var u=Date.now();if(r){if(u-a<ai)return;n=!0}else r=!0,n=!1,setTimeout(i,t);a=u}return c}var ii=20,si=["top","right","bottom","left","width","height","size","weight"],ci=typeof MutationObserver<"u",li=(function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=oi(this.refresh.bind(this),ii)}return e.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},e.prototype.removeObserver=function(t){var r=this.observers_,n=r.indexOf(t);~n&&r.splice(n,1),!r.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){var t=this.updateObservers_();t&&this.refresh()},e.prototype.updateObservers_=function(){var t=this.observers_.filter(function(r){return r.gatherActive(),r.hasActive()});return t.forEach(function(r){return r.broadcastActive()}),t.length>0},e.prototype.connect_=function(){!fr||this.connected_||(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),ci?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){!fr||!this.connected_||(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(t){var r=t.propertyName,n=r===void 0?"":r,a=si.some(function(o){return!!~n.indexOf(o)});a&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e})(),Sa=(function(e,t){for(var r=0,n=Object.keys(t);r<n.length;r++){var a=n[r];Object.defineProperty(e,a,{value:t[a],enumerable:!1,writable:!1,configurable:!0})}return e}),ue=(function(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView;return t||Ce}),Ra=je(0,0,0,0);function we(e){return parseFloat(e)||0}function Pr(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return t.reduce(function(n,a){var o=e["border-"+a+"-width"];return n+we(o)},0)}function ui(e){for(var t=["top","right","bottom","left"],r={},n=0,a=t;n<a.length;n++){var o=a[n],i=e["padding-"+o];r[o]=we(i)}return r}function di(e){var t=e.getBBox();return je(0,0,t.width,t.height)}function fi(e){var t=e.clientWidth,r=e.clientHeight;if(!t&&!r)return Ra;var n=ue(e).getComputedStyle(e),a=ui(n),o=a.left+a.right,i=a.top+a.bottom,c=we(n.width),u=we(n.height);if(n.boxSizing==="border-box"&&(Math.round(c+o)!==t&&(c-=Pr(n,"left","right")+o),Math.round(u+i)!==r&&(u-=Pr(n,"top","bottom")+i)),!pi(e)){var d=Math.round(c+o)-t,h=Math.round(u+i)-r;Math.abs(d)!==1&&(c-=d),Math.abs(h)!==1&&(u-=h)}return je(a.left,a.top,c,u)}var hi=(function(){return typeof SVGGraphicsElement<"u"?function(e){return e instanceof ue(e).SVGGraphicsElement}:function(e){return e instanceof ue(e).SVGElement&&typeof e.getBBox=="function"}})();function pi(e){return e===ue(e).document.documentElement}function gi(e){return fr?hi(e)?di(e):fi(e):Ra}function vi(e){var t=e.x,r=e.y,n=e.width,a=e.height,o=typeof DOMRectReadOnly<"u"?DOMRectReadOnly:Object,i=Object.create(o.prototype);return Sa(i,{x:t,y:r,width:n,height:a,top:r,right:t+n,bottom:a+r,left:t}),i}function je(e,t,r,n){return{x:e,y:t,width:r,height:n}}var mi=(function(){function e(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=je(0,0,0,0),this.target=t}return e.prototype.isActive=function(){var t=gi(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},e})(),bi=(function(){function e(t,r){var n=vi(r);Sa(this,{target:t,contentRect:n})}return e})(),yi=(function(){function e(t,r,n){if(this.activeObservations_=[],this.observations_=new wa,typeof t!="function")throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=r,this.callbackCtx_=n}return e.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof ue(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)||(r.set(t,new mi(t)),this.controller_.addObserver(this),this.controller_.refresh())}},e.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof ue(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)&&(r.delete(t),r.size||this.controller_.removeObserver(this))}},e.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},e.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach(function(r){r.isActive()&&t.activeObservations_.push(r)})},e.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,r=this.activeObservations_.map(function(n){return new bi(n.target,n.broadcastRect())});this.callback_.call(t,r,t),this.clearActive()}},e.prototype.clearActive=function(){this.activeObservations_.splice(0)},e.prototype.hasActive=function(){return this.activeObservations_.length>0},e})(),ja=typeof WeakMap<"u"?new WeakMap:new wa,Ta=(function(){function e(t){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var r=li.getInstance(),n=new yi(t,r,this);ja.set(this,n)}return e})();["observe","unobserve","disconnect"].forEach(function(e){Ta.prototype[e]=function(){var t;return(t=ja.get(this))[e].apply(t,arguments)}});var _i=(function(){return typeof Ce.ResizeObserver<"u"?Ce.ResizeObserver:Ta})(),xi=["client","offset","scroll","bounds","margin"];function Er(e){var t=[];return xi.forEach(function(r){e[r]&&t.push(r)}),t}function Mr(e,t){var r={};if(t.indexOf("client")>-1&&(r.client={top:e.clientTop,left:e.clientLeft,width:e.clientWidth,height:e.clientHeight}),t.indexOf("offset")>-1&&(r.offset={top:e.offsetTop,left:e.offsetLeft,width:e.offsetWidth,height:e.offsetHeight}),t.indexOf("scroll")>-1&&(r.scroll={top:e.scrollTop,left:e.scrollLeft,width:e.scrollWidth,height:e.scrollHeight}),t.indexOf("bounds")>-1){var n=e.getBoundingClientRect();r.bounds={top:n.top,right:n.right,bottom:n.bottom,left:n.left,width:n.width,height:n.height}}if(t.indexOf("margin")>-1){var a=getComputedStyle(e);r.margin={top:a?parseInt(a.marginTop):0,right:a?parseInt(a.marginRight):0,bottom:a?parseInt(a.marginBottom):0,left:a?parseInt(a.marginLeft):0}}return r}function Ci(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView;return t||window}function wi(e){return function(t){var r,n;return n=r=(function(a){$o(o,a);function o(){for(var c,u=arguments.length,d=new Array(u),h=0;h<u;h++)d[h]=arguments[h];return c=a.call.apply(a,[this].concat(d))||this,c.state={contentRect:{entry:{},client:{},offset:{},scroll:{},bounds:{},margin:{}}},c._animationFrameID=null,c._resizeObserver=null,c._node=null,c._window=null,c.measure=function(g){var v=Mr(c._node,Er(c.props));g&&(v.entry=g[0].contentRect),c._animationFrameID=c._window.requestAnimationFrame(function(){c._resizeObserver!==null&&(c.setState({contentRect:v}),typeof c.props.onResize=="function"&&c.props.onResize(v))})},c._handleRef=function(g){c._resizeObserver!==null&&c._node!==null&&c._resizeObserver.unobserve(c._node),c._node=g,c._window=Ci(c._node);var v=c.props.innerRef;v&&(typeof v=="function"?v(c._node):v.current=c._node),c._resizeObserver!==null&&c._node!==null&&c._resizeObserver.observe(c._node)},c}var i=o.prototype;return i.componentDidMount=function(){this._resizeObserver=this._window!==null&&this._window.ResizeObserver?new this._window.ResizeObserver(this.measure):new _i(this.measure),this._node!==null&&(this._resizeObserver.observe(this._node),typeof this.props.onResize=="function"&&this.props.onResize(Mr(this._node,Er(this.props))))},i.componentWillUnmount=function(){this._window!==null&&this._window.cancelAnimationFrame(this._animationFrameID),this._resizeObserver!==null&&(this._resizeObserver.disconnect(),this._resizeObserver=null)},i.render=function(){var u=this.props;u.innerRef,u.onResize;var d=Io(u,["innerRef","onResize"]);return x.createElement(t,mo({},d,{measureRef:this._handleRef,measure:this.measure,contentRect:this.state.contentRect}))},o})(x.Component),r.propTypes={client:ne.bool,offset:ne.bool,scroll:ne.bool,bounds:ne.bool,margin:ne.bool,innerRef:ne.oneOfType([ne.object,ne.func]),onResize:ne.func},n}}var gr=wi()(function(e){var t=e.measure,r=e.measureRef,n=e.contentRect,a=e.children;return a({measure:t,measureRef:r,contentRect:n})});gr.displayName="Measure";gr.propTypes.children=ne.func;var Ae,Ar;function Si(){if(Ar)return Ae;Ar=1;function e(){this.__data__=[],this.size=0}return Ae=e,Ae}var De,Dr;function qa(){if(Dr)return De;Dr=1;function e(t,r){return t===r||t!==t&&r!==r}return De=e,De}var $e,$r;function Te(){if($r)return $e;$r=1;var e=qa();function t(r,n){for(var a=r.length;a--;)if(e(r[a][0],n))return a;return-1}return $e=t,$e}var Ie,Ir;function Ri(){if(Ir)return Ie;Ir=1;var e=Te(),t=Array.prototype,r=t.splice;function n(a){var o=this.__data__,i=e(o,a);if(i<0)return!1;var c=o.length-1;return i==c?o.pop():r.call(o,i,1),--this.size,!0}return Ie=n,Ie}var ke,kr;function ji(){if(kr)return ke;kr=1;var e=Te();function t(r){var n=this.__data__,a=e(n,r);return a<0?void 0:n[a][1]}return ke=t,ke}var Be,Br;function Ti(){if(Br)return Be;Br=1;var e=Te();function t(r){return e(this.__data__,r)>-1}return Be=t,Be}var Ge,Gr;function qi(){if(Gr)return Ge;Gr=1;var e=Te();function t(r,n){var a=this.__data__,o=e(a,r);return o<0?(++this.size,a.push([r,n])):a[o][1]=n,this}return Ge=t,Ge}var ze,zr;function qe(){if(zr)return ze;zr=1;var e=Si(),t=Ri(),r=ji(),n=Ti(),a=qi();function o(i){var c=-1,u=i==null?0:i.length;for(this.clear();++c<u;){var d=i[c];this.set(d[0],d[1])}}return o.prototype.clear=e,o.prototype.delete=t,o.prototype.get=r,o.prototype.has=n,o.prototype.set=a,ze=o,ze}var He,Hr;function Oi(){if(Hr)return He;Hr=1;var e=qe();function t(){this.__data__=new e,this.size=0}return He=t,He}var Le,Lr;function Pi(){if(Lr)return Le;Lr=1;function e(t){var r=this.__data__,n=r.delete(t);return this.size=r.size,n}return Le=e,Le}var Ne,Nr;function Ei(){if(Nr)return Ne;Nr=1;function e(t){return this.__data__.get(t)}return Ne=e,Ne}var Ue,Ur;function Mi(){if(Ur)return Ue;Ur=1;function e(t){return this.__data__.has(t)}return Ue=e,Ue}var We,Wr;function Oa(){if(Wr)return We;Wr=1;var e=Se(),t=_a(),r="[object AsyncFunction]",n="[object Function]",a="[object GeneratorFunction]",o="[object Proxy]";function i(c){if(!t(c))return!1;var u=e(c);return u==n||u==a||u==r||u==o}return We=i,We}var Fe,Fr;function Ai(){if(Fr)return Fe;Fr=1;var e=se(),t=e["__core-js_shared__"];return Fe=t,Fe}var Ke,Kr;function Di(){if(Kr)return Ke;Kr=1;var e=Ai(),t=(function(){var n=/[^.]+$/.exec(e&&e.keys&&e.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""})();function r(n){return!!t&&t in n}return Ke=r,Ke}var Ve,Vr;function Pa(){if(Vr)return Ve;Vr=1;var e=Function.prototype,t=e.toString;function r(n){if(n!=null){try{return t.call(n)}catch{}try{return n+""}catch{}}return""}return Ve=r,Ve}var Xe,Xr;function $i(){if(Xr)return Xe;Xr=1;var e=Oa(),t=Di(),r=_a(),n=Pa(),a=/[\\^$.*+?()[\]{}|]/g,o=/^\[object .+?Constructor\]$/,i=Function.prototype,c=Object.prototype,u=i.toString,d=c.hasOwnProperty,h=RegExp("^"+u.call(d).replace(a,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function g(v){if(!r(v)||t(v))return!1;var y=e(v)?h:o;return y.test(n(v))}return Xe=g,Xe}var Ye,Yr;function Ii(){if(Yr)return Ye;Yr=1;function e(t,r){return t==null?void 0:t[r]}return Ye=e,Ye}var Je,Jr;function de(){if(Jr)return Je;Jr=1;var e=$i(),t=Ii();function r(n,a){var o=t(n,a);return e(o)?o:void 0}return Je=r,Je}var Ze,Zr;function vr(){if(Zr)return Ze;Zr=1;var e=de(),t=se(),r=e(t,"Map");return Ze=r,Ze}var Qe,Qr;function Oe(){if(Qr)return Qe;Qr=1;var e=de(),t=e(Object,"create");return Qe=t,Qe}var et,en;function ki(){if(en)return et;en=1;var e=Oe();function t(){this.__data__=e?e(null):{},this.size=0}return et=t,et}var tt,tn;function Bi(){if(tn)return tt;tn=1;function e(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r}return tt=e,tt}var rt,rn;function Gi(){if(rn)return rt;rn=1;var e=Oe(),t="__lodash_hash_undefined__",r=Object.prototype,n=r.hasOwnProperty;function a(o){var i=this.__data__;if(e){var c=i[o];return c===t?void 0:c}return n.call(i,o)?i[o]:void 0}return rt=a,rt}var nt,nn;function zi(){if(nn)return nt;nn=1;var e=Oe(),t=Object.prototype,r=t.hasOwnProperty;function n(a){var o=this.__data__;return e?o[a]!==void 0:r.call(o,a)}return nt=n,nt}var at,an;function Hi(){if(an)return at;an=1;var e=Oe(),t="__lodash_hash_undefined__";function r(n,a){var o=this.__data__;return this.size+=this.has(n)?0:1,o[n]=e&&a===void 0?t:a,this}return at=r,at}var ot,on;function Li(){if(on)return ot;on=1;var e=ki(),t=Bi(),r=Gi(),n=zi(),a=Hi();function o(i){var c=-1,u=i==null?0:i.length;for(this.clear();++c<u;){var d=i[c];this.set(d[0],d[1])}}return o.prototype.clear=e,o.prototype.delete=t,o.prototype.get=r,o.prototype.has=n,o.prototype.set=a,ot=o,ot}var it,sn;function Ni(){if(sn)return it;sn=1;var e=Li(),t=qe(),r=vr();function n(){this.size=0,this.__data__={hash:new e,map:new(r||t),string:new e}}return it=n,it}var st,cn;function Ui(){if(cn)return st;cn=1;function e(t){var r=typeof t;return r=="string"||r=="number"||r=="symbol"||r=="boolean"?t!=="__proto__":t===null}return st=e,st}var ct,ln;function Pe(){if(ln)return ct;ln=1;var e=Ui();function t(r,n){var a=r.__data__;return e(n)?a[typeof n=="string"?"string":"hash"]:a.map}return ct=t,ct}var lt,un;function Wi(){if(un)return lt;un=1;var e=Pe();function t(r){var n=e(this,r).delete(r);return this.size-=n?1:0,n}return lt=t,lt}var ut,dn;function Fi(){if(dn)return ut;dn=1;var e=Pe();function t(r){return e(this,r).get(r)}return ut=t,ut}var dt,fn;function Ki(){if(fn)return dt;fn=1;var e=Pe();function t(r){return e(this,r).has(r)}return dt=t,dt}var ft,hn;function Vi(){if(hn)return ft;hn=1;var e=Pe();function t(r,n){var a=e(this,r),o=a.size;return a.set(r,n),this.size+=a.size==o?0:1,this}return ft=t,ft}var ht,pn;function Ea(){if(pn)return ht;pn=1;var e=Ni(),t=Wi(),r=Fi(),n=Ki(),a=Vi();function o(i){var c=-1,u=i==null?0:i.length;for(this.clear();++c<u;){var d=i[c];this.set(d[0],d[1])}}return o.prototype.clear=e,o.prototype.delete=t,o.prototype.get=r,o.prototype.has=n,o.prototype.set=a,ht=o,ht}var pt,gn;function Xi(){if(gn)return pt;gn=1;var e=qe(),t=vr(),r=Ea(),n=200;function a(o,i){var c=this.__data__;if(c instanceof e){var u=c.__data__;if(!t||u.length<n-1)return u.push([o,i]),this.size=++c.size,this;c=this.__data__=new r(u)}return c.set(o,i),this.size=c.size,this}return pt=a,pt}var gt,vn;function Yi(){if(vn)return gt;vn=1;var e=qe(),t=Oi(),r=Pi(),n=Ei(),a=Mi(),o=Xi();function i(c){var u=this.__data__=new e(c);this.size=u.size}return i.prototype.clear=t,i.prototype.delete=r,i.prototype.get=n,i.prototype.has=a,i.prototype.set=o,gt=i,gt}var vt,mn;function Ji(){if(mn)return vt;mn=1;var e="__lodash_hash_undefined__";function t(r){return this.__data__.set(r,e),this}return vt=t,vt}var mt,bn;function Zi(){if(bn)return mt;bn=1;function e(t){return this.__data__.has(t)}return mt=e,mt}var bt,yn;function Qi(){if(yn)return bt;yn=1;var e=Ea(),t=Ji(),r=Zi();function n(a){var o=-1,i=a==null?0:a.length;for(this.__data__=new e;++o<i;)this.add(a[o])}return n.prototype.add=n.prototype.push=t,n.prototype.has=r,bt=n,bt}var yt,_n;function es(){if(_n)return yt;_n=1;function e(t,r){for(var n=-1,a=t==null?0:t.length;++n<a;)if(r(t[n],n,t))return!0;return!1}return yt=e,yt}var _t,xn;function ts(){if(xn)return _t;xn=1;function e(t,r){return t.has(r)}return _t=e,_t}var xt,Cn;function Ma(){if(Cn)return xt;Cn=1;var e=Qi(),t=es(),r=ts(),n=1,a=2;function o(i,c,u,d,h,g){var v=u&n,y=i.length,R=c.length;if(y!=R&&!(v&&R>y))return!1;var _=g.get(i),w=g.get(c);if(_&&w)return _==c&&w==i;var j=-1,C=!0,P=u&a?new e:void 0;for(g.set(i,c),g.set(c,i);++j<y;){var T=i[j],A=c[j];if(d)var S=v?d(A,T,j,c,i,g):d(T,A,j,i,c,g);if(S!==void 0){if(S)continue;C=!1;break}if(P){if(!t(c,function(l,f){if(!r(P,f)&&(T===l||h(T,l,u,d,g)))return P.push(f)})){C=!1;break}}else if(!(T===A||h(T,A,u,d,g))){C=!1;break}}return g.delete(i),g.delete(c),C}return xt=o,xt}var Ct,wn;function rs(){if(wn)return Ct;wn=1;var e=se(),t=e.Uint8Array;return Ct=t,Ct}var wt,Sn;function ns(){if(Sn)return wt;Sn=1;function e(t){var r=-1,n=Array(t.size);return t.forEach(function(a,o){n[++r]=[o,a]}),n}return wt=e,wt}var St,Rn;function as(){if(Rn)return St;Rn=1;function e(t){var r=-1,n=Array(t.size);return t.forEach(function(a){n[++r]=a}),n}return St=e,St}var Rt,jn;function os(){if(jn)return Rt;jn=1;var e=Bo(),t=rs(),r=qa(),n=Ma(),a=ns(),o=as(),i=1,c=2,u="[object Boolean]",d="[object Date]",h="[object Error]",g="[object Map]",v="[object Number]",y="[object RegExp]",R="[object Set]",_="[object String]",w="[object Symbol]",j="[object ArrayBuffer]",C="[object DataView]",P=e?e.prototype:void 0,T=P?P.valueOf:void 0;function A(S,l,f,b,p,m,q){switch(f){case C:if(S.byteLength!=l.byteLength||S.byteOffset!=l.byteOffset)return!1;S=S.buffer,l=l.buffer;case j:return!(S.byteLength!=l.byteLength||!m(new t(S),new t(l)));case u:case d:case v:return r(+S,+l);case h:return S.name==l.name&&S.message==l.message;case y:case _:return S==l+"";case g:var M=a;case R:var O=b&i;if(M||(M=o),S.size!=l.size&&!O)return!1;var B=q.get(S);if(B)return B==l;b|=c,q.set(S,l);var N=n(M(S),M(l),b,p,m,q);return q.delete(S),N;case w:if(T)return T.call(S)==T.call(l)}return!1}return Rt=A,Rt}var jt,Tn;function is(){if(Tn)return jt;Tn=1;function e(t,r){for(var n=-1,a=r.length,o=t.length;++n<a;)t[o+n]=r[n];return t}return jt=e,jt}var Tt,qn;function mr(){if(qn)return Tt;qn=1;var e=Array.isArray;return Tt=e,Tt}var qt,On;function ss(){if(On)return qt;On=1;var e=is(),t=mr();function r(n,a,o){var i=a(n);return t(n)?i:e(i,o(n))}return qt=r,qt}var Ot,Pn;function cs(){if(Pn)return Ot;Pn=1;function e(t,r){for(var n=-1,a=t==null?0:t.length,o=0,i=[];++n<a;){var c=t[n];r(c,n,t)&&(i[o++]=c)}return i}return Ot=e,Ot}var Pt,En;function ls(){if(En)return Pt;En=1;function e(){return[]}return Pt=e,Pt}var Et,Mn;function us(){if(Mn)return Et;Mn=1;var e=cs(),t=ls(),r=Object.prototype,n=r.propertyIsEnumerable,a=Object.getOwnPropertySymbols,o=a?function(i){return i==null?[]:(i=Object(i),e(a(i),function(c){return n.call(i,c)}))}:t;return Et=o,Et}var Mt,An;function ds(){if(An)return Mt;An=1;function e(t,r){for(var n=-1,a=Array(t);++n<t;)a[n]=r(n);return a}return Mt=e,Mt}var At,Dn;function fs(){if(Dn)return At;Dn=1;var e=Se(),t=Re(),r="[object Arguments]";function n(a){return t(a)&&e(a)==r}return At=n,At}var Dt,$n;function hs(){if($n)return Dt;$n=1;var e=fs(),t=Re(),r=Object.prototype,n=r.hasOwnProperty,a=r.propertyIsEnumerable,o=e((function(){return arguments})())?e:function(i){return t(i)&&n.call(i,"callee")&&!a.call(i,"callee")};return Dt=o,Dt}var ge={exports:{}},$t,In;function ps(){if(In)return $t;In=1;function e(){return!1}return $t=e,$t}ge.exports;var kn;function Aa(){return kn||(kn=1,(function(e,t){var r=se(),n=ps(),a=t&&!t.nodeType&&t,o=a&&!0&&e&&!e.nodeType&&e,i=o&&o.exports===a,c=i?r.Buffer:void 0,u=c?c.isBuffer:void 0,d=u||n;e.exports=d})(ge,ge.exports)),ge.exports}var It,Bn;function gs(){if(Bn)return It;Bn=1;var e=9007199254740991,t=/^(?:0|[1-9]\d*)$/;function r(n,a){var o=typeof n;return a=a??e,!!a&&(o=="number"||o!="symbol"&&t.test(n))&&n>-1&&n%1==0&&n<a}return It=r,It}var kt,Gn;function Da(){if(Gn)return kt;Gn=1;var e=9007199254740991;function t(r){return typeof r=="number"&&r>-1&&r%1==0&&r<=e}return kt=t,kt}var Bt,zn;function vs(){if(zn)return Bt;zn=1;var e=Se(),t=Da(),r=Re(),n="[object Arguments]",a="[object Array]",o="[object Boolean]",i="[object Date]",c="[object Error]",u="[object Function]",d="[object Map]",h="[object Number]",g="[object Object]",v="[object RegExp]",y="[object Set]",R="[object String]",_="[object WeakMap]",w="[object ArrayBuffer]",j="[object DataView]",C="[object Float32Array]",P="[object Float64Array]",T="[object Int8Array]",A="[object Int16Array]",S="[object Int32Array]",l="[object Uint8Array]",f="[object Uint8ClampedArray]",b="[object Uint16Array]",p="[object Uint32Array]",m={};m[C]=m[P]=m[T]=m[A]=m[S]=m[l]=m[f]=m[b]=m[p]=!0,m[n]=m[a]=m[w]=m[o]=m[j]=m[i]=m[c]=m[u]=m[d]=m[h]=m[g]=m[v]=m[y]=m[R]=m[_]=!1;function q(M){return r(M)&&t(M.length)&&!!m[e(M)]}return Bt=q,Bt}var Gt,Hn;function ms(){if(Hn)return Gt;Hn=1;function e(t){return function(r){return t(r)}}return Gt=e,Gt}var ve={exports:{}};ve.exports;var Ln;function bs(){return Ln||(Ln=1,(function(e,t){var r=Go(),n=t&&!t.nodeType&&t,a=n&&!0&&e&&!e.nodeType&&e,o=a&&a.exports===n,i=o&&r.process,c=(function(){try{var u=a&&a.require&&a.require("util").types;return u||i&&i.binding&&i.binding("util")}catch{}})();e.exports=c})(ve,ve.exports)),ve.exports}var zt,Nn;function $a(){if(Nn)return zt;Nn=1;var e=vs(),t=ms(),r=bs(),n=r&&r.isTypedArray,a=n?t(n):e;return zt=a,zt}var Ht,Un;function ys(){if(Un)return Ht;Un=1;var e=ds(),t=hs(),r=mr(),n=Aa(),a=gs(),o=$a(),i=Object.prototype,c=i.hasOwnProperty;function u(d,h){var g=r(d),v=!g&&t(d),y=!g&&!v&&n(d),R=!g&&!v&&!y&&o(d),_=g||v||y||R,w=_?e(d.length,String):[],j=w.length;for(var C in d)(h||c.call(d,C))&&!(_&&(C=="length"||y&&(C=="offset"||C=="parent")||R&&(C=="buffer"||C=="byteLength"||C=="byteOffset")||a(C,j)))&&w.push(C);return w}return Ht=u,Ht}var Lt,Wn;function _s(){if(Wn)return Lt;Wn=1;var e=Object.prototype;function t(r){var n=r&&r.constructor,a=typeof n=="function"&&n.prototype||e;return r===a}return Lt=t,Lt}var Nt,Fn;function xs(){if(Fn)return Nt;Fn=1;function e(t,r){return function(n){return t(r(n))}}return Nt=e,Nt}var Ut,Kn;function Cs(){if(Kn)return Ut;Kn=1;var e=xs(),t=e(Object.keys,Object);return Ut=t,Ut}var Wt,Vn;function ws(){if(Vn)return Wt;Vn=1;var e=_s(),t=Cs(),r=Object.prototype,n=r.hasOwnProperty;function a(o){if(!e(o))return t(o);var i=[];for(var c in Object(o))n.call(o,c)&&c!="constructor"&&i.push(c);return i}return Wt=a,Wt}var Ft,Xn;function Ss(){if(Xn)return Ft;Xn=1;var e=Oa(),t=Da();function r(n){return n!=null&&t(n.length)&&!e(n)}return Ft=r,Ft}var Kt,Yn;function Rs(){if(Yn)return Kt;Yn=1;var e=ys(),t=ws(),r=Ss();function n(a){return r(a)?e(a):t(a)}return Kt=n,Kt}var Vt,Jn;function js(){if(Jn)return Vt;Jn=1;var e=ss(),t=us(),r=Rs();function n(a){return e(a,r,t)}return Vt=n,Vt}var Xt,Zn;function Ts(){if(Zn)return Xt;Zn=1;var e=js(),t=1,r=Object.prototype,n=r.hasOwnProperty;function a(o,i,c,u,d,h){var g=c&t,v=e(o),y=v.length,R=e(i),_=R.length;if(y!=_&&!g)return!1;for(var w=y;w--;){var j=v[w];if(!(g?j in i:n.call(i,j)))return!1}var C=h.get(o),P=h.get(i);if(C&&P)return C==i&&P==o;var T=!0;h.set(o,i),h.set(i,o);for(var A=g;++w<y;){j=v[w];var S=o[j],l=i[j];if(u)var f=g?u(l,S,j,i,o,h):u(S,l,j,o,i,h);if(!(f===void 0?S===l||d(S,l,c,u,h):f)){T=!1;break}A||(A=j=="constructor")}if(T&&!A){var b=o.constructor,p=i.constructor;b!=p&&"constructor"in o&&"constructor"in i&&!(typeof b=="function"&&b instanceof b&&typeof p=="function"&&p instanceof p)&&(T=!1)}return h.delete(o),h.delete(i),T}return Xt=a,Xt}var Yt,Qn;function qs(){if(Qn)return Yt;Qn=1;var e=de(),t=se(),r=e(t,"DataView");return Yt=r,Yt}var Jt,ea;function Os(){if(ea)return Jt;ea=1;var e=de(),t=se(),r=e(t,"Promise");return Jt=r,Jt}var Zt,ta;function Ps(){if(ta)return Zt;ta=1;var e=de(),t=se(),r=e(t,"Set");return Zt=r,Zt}var Qt,ra;function Es(){if(ra)return Qt;ra=1;var e=de(),t=se(),r=e(t,"WeakMap");return Qt=r,Qt}var er,na;function Ms(){if(na)return er;na=1;var e=qs(),t=vr(),r=Os(),n=Ps(),a=Es(),o=Se(),i=Pa(),c="[object Map]",u="[object Object]",d="[object Promise]",h="[object Set]",g="[object WeakMap]",v="[object DataView]",y=i(e),R=i(t),_=i(r),w=i(n),j=i(a),C=o;return(e&&C(new e(new ArrayBuffer(1)))!=v||t&&C(new t)!=c||r&&C(r.resolve())!=d||n&&C(new n)!=h||a&&C(new a)!=g)&&(C=function(P){var T=o(P),A=T==u?P.constructor:void 0,S=A?i(A):"";if(S)switch(S){case y:return v;case R:return c;case _:return d;case w:return h;case j:return g}return T}),er=C,er}var tr,aa;function As(){if(aa)return tr;aa=1;var e=Yi(),t=Ma(),r=os(),n=Ts(),a=Ms(),o=mr(),i=Aa(),c=$a(),u=1,d="[object Arguments]",h="[object Array]",g="[object Object]",v=Object.prototype,y=v.hasOwnProperty;function R(_,w,j,C,P,T){var A=o(_),S=o(w),l=A?h:a(_),f=S?h:a(w);l=l==d?g:l,f=f==d?g:f;var b=l==g,p=f==g,m=l==f;if(m&&i(_)){if(!i(w))return!1;A=!0,b=!1}if(m&&!b)return T||(T=new e),A||c(_)?t(_,w,j,C,P,T):r(_,w,l,j,C,P,T);if(!(j&u)){var q=b&&y.call(_,"__wrapped__"),M=p&&y.call(w,"__wrapped__");if(q||M){var O=q?_.value():_,B=M?w.value():w;return T||(T=new e),P(O,B,j,C,T)}}return m?(T||(T=new e),n(_,w,j,C,P,T)):!1}return tr=R,tr}var rr,oa;function Ds(){if(oa)return rr;oa=1;var e=As(),t=Re();function r(n,a,o,i,c){return n===a?!0:n==null||a==null||!t(n)&&!t(a)?n!==n&&a!==a:e(n,a,o,i,r,c)}return rr=r,rr}var nr,ia;function $s(){if(ia)return nr;ia=1;var e=Ds();function t(r,n){return e(r,n)}return nr=t,nr}var Is=$s();const hr=ha(Is),br={dark:{default:{borderWidth:1,pieceSize:20,gapBetweenPieces:4,borderColor:re("#fff",.28),completeColor:ye.dark.primary,backgroundColor:"#1a2822",readerColor:"#0a0a0a",readerHaloColor:re("#fff",.55),rangeColor:"#cda184",rangeEmptyColor:re("#cda184",.3)},mini:{cacheMaxHeight:420,borderWidth:2,pieceSize:26,gapBetweenPieces:5,borderColor:re("#fff",.32),completeColor:ye.dark.primary,backgroundColor:"#1f3028",readerColor:"#0a0a0a",readerHaloColor:re("#fff",.5),rangeColor:"#cda184",rangeEmptyColor:re("#cda184",.32)}},light:{default:{borderWidth:1,pieceSize:20,gapBetweenPieces:4,borderColor:"#d0e6da",completeColor:ye.light.primary,backgroundColor:"#ffffff",readerColor:"#000",readerHaloColor:re("#fff",.9),rangeColor:"#7e6bc4",rangeEmptyColor:re("#afa6e3",.32)},mini:{cacheMaxHeight:420,borderWidth:2,pieceSize:26,gapBetweenPieces:5,borderColor:"#b7d9c8",completeColor:ye.light.primary,backgroundColor:"#f4faf7",readerColor:"#0a0a0a",readerHaloColor:re("#fff",.9),rangeColor:"#7e6bc4",rangeEmptyColor:re("#afa6e3",.36)}}},ks=(e,t,r,n=0)=>{const a=e.pieceSize,o=e.gapBetweenPieces;if(!t||t<=0)return{pieceSize:a,gap:o};if(r){const i=t<280?7:t<400?9:11,c=Math.floor((t-8)/i)-o;return{pieceSize:Math.max(22,Math.min(28,c>0?c:a)),gap:Math.max(4,Math.min(o,6))}}return{pieceSize:Math.max(18,a),gap:Math.max(4,o)}},sa=z.div`
  margin-top: var(--ts-space-sm);
  text-transform: uppercase;
  align-self: center;
  font-size: var(--ts-font-label);
  letter-spacing: 0.4px;
  color: ${({$themeType:e})=>e==="dark"?"rgba(255, 255, 255, 0.55)":"rgba(0, 0, 0, 0.5)"};
`,Bs=z.div`
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
`,Gs=z.div`
  width: 100%;
  min-width: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  position: relative;

  ${({$isMini:e,$themeType:t})=>e?H`
          display: grid;
          justify-content: center;
          max-height: ${br[t??"light"].mini.cacheMaxHeight}px;
        `:H`
          max-height: min(70dvh, 640px);
        `}

  canvas {
    display: block;
    max-width: 100%;
  }
`,zs=e=>Math.max(0,Math.min(1,e)),Hs=(e,t,r,n,a)=>{e.fillStyle=n,e.fillRect(0,0,t,t);const o=zs(r/100);if(o<=0)return;if(o>=1){e.fillStyle=a,e.fillRect(0,0,t,t);return}const i=Math.max(2,Math.round(t*o));e.fillStyle=a,e.fillRect(0,t-i,t,Math.min(i,t))},fe=(e,t,r,n)=>{const a=n/2;e.lineWidth=n,e.strokeStyle=r,e.strokeRect(a,a,t-n,t-n)},Ls=({ctx:e,cells:t,canvasWidth:r,canvasHeight:n,piecesInOneRow:a,pieceSize:o,gap:i,startingX:c,theme:u,variant:d,isSnakeDebugMode:h,isMini:g})=>{const v=br[u][d],{borderWidth:y,backgroundColor:R,borderColor:_,completeColor:w,readerColor:j,readerHaloColor:C,rangeColor:P,rangeEmptyColor:T}=v;e.clearRect(0,0,r,n),e.imageSmoothingEnabled=!1;const A=y%2===1?.5:0,S=u==="dark",l=T||(S?"rgba(205, 161, 132, 0.28)":"rgba(175, 166, 227, 0.32)");for(let f=0;f<t.length;f++){const b=t[f]||{percentage:0,priority:0},p=b.percentage||0,m=!!b.completed||p>=100,q=p>0&&!m,M=!!b.isReader,O=!!b.isReaderRange,B=f%a,N=Math.floor(f/a),L=c+B*(o+i)+A,U=N*(o+i)+A;e.save(),e.translate(L,U);const I=O&&!m&&!q?l:R;if(Hs(e,o,m?100:p,I,q||m?w:I),M?(C&&fe(e,o,C,g?4:3),fe(e,o,j,g?2.5:2)):O?fe(e,o,P,2):q||m?fe(e,o,w,Math.max(y,2)):fe(e,o,_,y),h){const W=xa(b.priority||0);if(W){const F=Math.max(9,Math.min(g?13:11,Math.floor(o*.55)));e.font=`bold ${F}px ui-monospace, SFMono-Regular, Menlo, monospace`,e.textAlign="center",e.textBaseline="middle";const E=o/2,D=o/2;e.lineWidth=3,e.strokeStyle=S?"rgba(0,0,0,0.85)":"rgba(255,255,255,0.95)",e.strokeText(W,E,D),e.fillStyle=S?"#fff":"#1a1a1a",e.fillText(W,E,D)}}e.restore()}},Ns=(e,t,r)=>{const n=Math.min(window.devicePixelRatio||1,2);e.width=Math.max(1,Math.round(t*n)),e.height=Math.max(1,Math.round(r*n)),e.style.width=`${t}px`,e.style.height=`${r}px`;const a=e.getContext("2d");return a?(a.setTransform(n,0,0,n,0,0),a):null},Us=(e,t,r)=>{const{piecesInOneRow:n,pieceSize:a,gap:o,startingX:i,cellCount:c}=r;if(n<1||c<1||a<=0)return-1;const u=a+o,d=e-i;if(d<0||t<0)return-1;const h=Math.floor(d/u),g=Math.floor(t/u);if(h<0||h>=n)return-1;const v=d-h*u,y=t-g*u;if(v>a||y>a)return-1;const R=g*n+h;return R<0||R>=c?-1:R},Ws=()=>({percentage:0,priority:0,isReader:!1,isReaderRange:!1}),Fs=({cache:e,isMini:t,mode:r,isSnakeDebugMode:n})=>{const{t:a}=X(),i=(r||(t?"mini":"detailed"))==="mini",[c,u]=x.useState({width:0,height:0}),{width:d}=c,h=x.useRef(null),g=x.useRef(null),v=x.useRef(null),y=x.useRef(0),R=x.useRef(!0),_=x.useRef(0),[w,j]=x.useState(null),C=x.useMemo(()=>Xo(d,i),[d,i]),P=Qo(e,C),T=P.cells,A=i?"mini":"default",{isDarkMode:S}=x.useContext(pa),l=S?ur.DARK:ur.LIGHT,f=br[l][A],{cacheMaxHeight:b}=f,{pieceSize:p,gap:m}=x.useMemo(()=>ks(f,d,i,T.length),[f,d,i,T.length]),q=d>0?i?Math.max(d-8,d*.96):d:0,M=p+m,O=q>0?Math.max(1,Math.floor(q/M)):0,B=x.useMemo(()=>O?T:[],[T,O]),N=O>0?Math.ceil((q-M*O)/2):0,L=i?4:6,U=O>0?Math.max(B.length>0?Math.ceil(B.length/O):L,L)*M:0,I=x.useMemo(()=>B.length>0?B:Array.from({length:Math.max(O,1)*L},Ws),[B,O,L]);x.useEffect(()=>{const E=h.current;if(!(!E||!q||!U||!O))return cancelAnimationFrame(y.current),y.current=requestAnimationFrame(()=>{const D=Ns(E,q,U);D&&Ls({ctx:D,cells:I,canvasWidth:q,canvasHeight:U,piecesInOneRow:O,pieceSize:p,gap:m,startingX:N,theme:l,variant:A,isSnakeDebugMode:n,isMini:i})}),()=>cancelAnimationFrame(y.current)},[U,q,O,N,p,m,I,A,i,l,n]),x.useEffect(()=>{if(!g.current||!O||M<=0||!R.current)return;const E=Ca(e,C);if(!E||P.windowStart==null)return;const D=E.readerPiece-P.windowStart;if(D<0)return;const J=Math.floor(D/O)*M,Z=g.current,te=Z.scrollTop,le=te+Z.clientHeight;(J<te||J+M>le)&&(Z.scrollTop=Math.max(0,J-Z.clientHeight/3))},[e,C,P.windowStart,O,M,I]),x.useEffect(()=>{const E=g.current;if(!E)return;const D=()=>{R.current=!1,window.clearTimeout(_.current),_.current=window.setTimeout(()=>{R.current=!0},4e3)};return E.addEventListener("wheel",D,{passive:!0}),E.addEventListener("touchstart",D,{passive:!0}),E.addEventListener("pointerdown",D),()=>{window.clearTimeout(_.current),E.removeEventListener("wheel",D),E.removeEventListener("touchstart",D),E.removeEventListener("pointerdown",D)}},[d]);const W=x.useCallback(E=>{const D=E.pieceStart,K=E.pieceEnd;if(D==null)return"";const J=E.completed||(E.percentage||0)>=99.5?100:Math.round(E.percentage||0),Z=xa(E.priority||0),te=Z?` · ${Z}`:"";return K!=null&&K!==D?a("SnakeTooltipBucket",{start:D,end:K,fill:J})+te:a("SnakeTooltipPiece",{id:D,fill:J})+te},[a]),F=x.useCallback(E=>{if(!O){j(null);return}const D=h.current,K=v.current;if(!D||!K)return;const J=D.getBoundingClientRect(),Z=K.getBoundingClientRect(),te=E.clientX-J.left,le=E.clientY-J.top,k=Us(te,le,{piecesInOneRow:O,pieceSize:p,gap:m,startingX:N,cellCount:I.length});if(k<0){j(null);return}const G=W(I[k]);if(!G){j(null);return}j({x:E.clientX-Z.left+12,y:E.clientY-Z.top+12,text:G})},[O,p,m,N,I,W]);return s.jsx(gr,{bounds:!0,onResize:({bounds:E})=>E&&u(E),children:({measureRef:E})=>s.jsxs("div",{style:{display:"flex",flexDirection:"column",width:"100%",minWidth:0,position:"relative"},ref:D=>{v.current=D,E(D)},children:[s.jsx(Gs,{ref:g,$themeType:l,$isMini:i,children:O>0&&U>0?s.jsx("canvas",{ref:h,onMouseMove:F,onMouseLeave:()=>j(null)}):null}),w&&s.jsx(Bs,{style:{left:w.x,top:w.y},children:w.text}),P.windowStart!=null&&P.windowEnd!=null&&P.windowEnd>=P.windowStart&&s.jsx(sa,{$themeType:l,children:a("SnakeFocusRange",{start:P.windowStart,end:P.windowEnd})}),i&&b!=null&&U>=b&&s.jsx(sa,{$themeType:l,children:a("ScrollDown")})]})})},Ia=x.memo(Fs,(e,t)=>e.isMini===t.isMini&&e.mode===t.mode&&e.isSnakeDebugMode===t.isSnakeDebugMode&&hr(e.cache.Pieces,t.cache.Pieces)&&hr(e.cache.Readers,t.cache.Readers)&&e.cache.PiecesCount===t.cache.PiecesCount&&e.cache.PiecesLength===t.cache.PiecesLength&&e.cache.Capacity===t.cache.Capacity&&e.cache.Filled===t.cache.Filled),ka=e=>{const{table:{defaultPrimaryColor:t}}=Y(e);return H`
    &::before {
      content: '';
      width: 10px;
      height: 10px;
      background: ${t};
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `},Ks=z.table`
  ${({theme:e})=>{const{table:{defaultPrimaryColor:t,rowBGColor:r,viewedRowBGColor:n,dividerColor:a,rowFontColor:o,outlinedButtonBorderColor:i}}=Y(e);return H`
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.8125rem;
    width: 100%;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    color: ${o};

    thead tr {
      background: ${t};
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
      border-bottom: 1px solid ${a};
      background: ${r};

      &:last-of-type {
        border-bottom: 2px solid ${t};
      }

      &.viewed-file-row {
        background: ${n};
      }
    }

    td {
      &.viewed-file-indicator {
        position: relative;

        ${ka(e)}
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

    ${$("shortTable")} {
      display: none;
    }
  `}}
`,Vs=z.div`
  display: none;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);

  ${$("shortTable")} {
    display: grid;
  }

  ${$("tablet")} {
    gap: 15px;
    grid-template-columns: 1fr;
  }
`,Xs=z.div`
  ${({$isViewed:e,theme:t})=>{const{table:{defaultPrimaryColor:r,defaultSecondaryColor:n,defaultTertiaryColor:a,shortTableButtonsBGColor:o,viewedPrimaryColor:i,viewedSecondaryColor:c,viewedTertiaryColor:u}}=Y(t);return H`
    display: grid;
    width: 100%;
    grid-template-rows: repeat(3, max-content);
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

    .short-table {
      &-name {
        background: ${e?i:r};
        display: grid;
        place-items: center;
        padding: 15px;
        color: #fff;
        text-transform: uppercase;
        font-size: 13px;
        font-weight: 600;
        word-break: break-word;

        ${$("tablet")} {
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
        background: ${e?i:r};
        &:not(:last-child) {
          border-right: 1px solid ${e?i:r};
        }

        &-name {
          background: ${e?c:n};
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 500;
          display: grid;
          place-items: center;
          padding: 0 10px;

          ${$("tablet")} {
            font-size: 12px;
          }
        }

        &-value {
          background: ${e?u:a};
          display: grid;
          place-items: center;
          color: #fff;
          font-size: 13px;
          padding: 12px 10px;
          position: relative;

          ${$("tablet")} {
            font-size: 12px;
            padding: 10px 8px;
          }
        }
      }

      &-viewed-indicator {
        ${e&&ka(t)}
      }

      &-buttons {
        padding: 12px;
        border-bottom: 2px solid ${e?i:r};
        background: ${o};

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
          min-height: 44px;
          font-size: 12px;
          padding: 6px 8px;
        }

        ${$("phone")} {
          padding: 10px;

          .button-cell {
            gap: 6px;
          }

          .MuiButton-root {
            min-height: 44px;
            font-size: 12px;
          }
        }
      }
    }
  `}}
`;var he={},ar,ca;function Ys(){return ca||(ca=1,ar=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,r=[],n=0;n<e.rangeCount;n++)r.push(e.getRangeAt(n));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||r.forEach(function(a){e.addRange(a)}),t&&t.focus()}}),ar}var or,la;function Js(){if(la)return or;la=1;var e=Ys(),t={"text/plain":"Text","text/html":"Url",default:"Text"},r="Copy to clipboard: #{key}, Enter";function n(o){var i=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return o.replace(/#{\s*key\s*}/g,i)}function a(o,i){var c,u,d,h,g,v,y=!1;i||(i={}),c=i.debug||!1;try{d=e(),h=document.createRange(),g=document.getSelection(),v=document.createElement("span"),v.textContent=o,v.ariaHidden="true",v.style.all="unset",v.style.position="fixed",v.style.top=0,v.style.clip="rect(0, 0, 0, 0)",v.style.whiteSpace="pre",v.style.webkitUserSelect="text",v.style.MozUserSelect="text",v.style.msUserSelect="text",v.style.userSelect="text",v.addEventListener("copy",function(_){if(_.stopPropagation(),i.format)if(_.preventDefault(),typeof _.clipboardData>"u"){c&&console.warn("unable to use e.clipboardData"),c&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var w=t[i.format]||t.default;window.clipboardData.setData(w,o)}else _.clipboardData.clearData(),_.clipboardData.setData(i.format,o);i.onCopy&&(_.preventDefault(),i.onCopy(_.clipboardData))}),document.body.appendChild(v),h.selectNodeContents(v),g.addRange(h);var R=document.execCommand("copy");if(!R)throw new Error("copy command was unsuccessful");y=!0}catch(_){c&&console.error("unable to copy using execCommand: ",_),c&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(i.format||"text",o),i.onCopy&&i.onCopy(window.clipboardData),y=!0}catch(w){c&&console.error("unable to copy using clipboardData: ",w),c&&console.error("falling back to prompt"),u=n("message"in i?i.message:r),window.prompt(u,o)}}finally{g&&(typeof g.removeRange=="function"?g.removeRange(h):g.removeAllRanges()),v&&document.body.removeChild(v),d()}return y}return or=a,or}var ua;function Zs(){if(ua)return he;ua=1,Object.defineProperty(he,"__esModule",{value:!0}),he.CopyToClipboard=void 0;var e=n(Js()),t=n(Wa()),r=["text","onCopy","options","children"];function n(l){return l&&l.__esModule?l:{default:l}}function a(l){"@babel/helpers - typeof";return a=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(f){return typeof f}:function(f){return f&&typeof Symbol=="function"&&f.constructor===Symbol&&f!==Symbol.prototype?"symbol":typeof f},a(l)}function o(l,f){var b=Object.keys(l);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(l);f&&(p=p.filter(function(m){return Object.getOwnPropertyDescriptor(l,m).enumerable})),b.push.apply(b,p)}return b}function i(l){for(var f=1;f<arguments.length;f++){var b=arguments[f]!=null?arguments[f]:{};f%2?o(Object(b),!0).forEach(function(p){P(l,p,b[p])}):Object.getOwnPropertyDescriptors?Object.defineProperties(l,Object.getOwnPropertyDescriptors(b)):o(Object(b)).forEach(function(p){Object.defineProperty(l,p,Object.getOwnPropertyDescriptor(b,p))})}return l}function c(l,f){if(l==null)return{};var b,p,m=u(l,f);if(Object.getOwnPropertySymbols){var q=Object.getOwnPropertySymbols(l);for(p=0;p<q.length;p++)b=q[p],f.indexOf(b)===-1&&{}.propertyIsEnumerable.call(l,b)&&(m[b]=l[b])}return m}function u(l,f){if(l==null)return{};var b={};for(var p in l)if({}.hasOwnProperty.call(l,p)){if(f.indexOf(p)!==-1)continue;b[p]=l[p]}return b}function d(l,f){if(!(l instanceof f))throw new TypeError("Cannot call a class as a function")}function h(l,f){for(var b=0;b<f.length;b++){var p=f[b];p.enumerable=p.enumerable||!1,p.configurable=!0,"value"in p&&(p.writable=!0),Object.defineProperty(l,T(p.key),p)}}function g(l,f,b){return f&&h(l.prototype,f),Object.defineProperty(l,"prototype",{writable:!1}),l}function v(l,f,b){return f=w(f),y(l,_()?Reflect.construct(f,b||[],w(l).constructor):f.apply(l,b))}function y(l,f){if(f&&(a(f)=="object"||typeof f=="function"))return f;if(f!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return R(l)}function R(l){if(l===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return l}function _(){try{var l=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(_=function(){return!!l})()}function w(l){return w=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(f){return f.__proto__||Object.getPrototypeOf(f)},w(l)}function j(l,f){if(typeof f!="function"&&f!==null)throw new TypeError("Super expression must either be null or a function");l.prototype=Object.create(f&&f.prototype,{constructor:{value:l,writable:!0,configurable:!0}}),Object.defineProperty(l,"prototype",{writable:!1}),f&&C(l,f)}function C(l,f){return C=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(b,p){return b.__proto__=p,b},C(l,f)}function P(l,f,b){return(f=T(f))in l?Object.defineProperty(l,f,{value:b,enumerable:!0,configurable:!0,writable:!0}):l[f]=b,l}function T(l){var f=A(l,"string");return a(f)=="symbol"?f:f+""}function A(l,f){if(a(l)!="object"||!l)return l;var b=l[Symbol.toPrimitive];if(b!==void 0){var p=b.call(l,f);if(a(p)!="object")return p;throw new TypeError("@@toPrimitive must return a primitive value.")}return(f==="string"?String:Number)(l)}var S=he.CopyToClipboard=(function(l){function f(){var b;d(this,f);for(var p=arguments.length,m=new Array(p),q=0;q<p;q++)m[q]=arguments[q];return b=v(this,f,[].concat(m)),P(b,"onClick",function(M){var O=b.props,B=O.text,N=O.onCopy,L=O.children,U=O.options,I=t.default.Children.only(L),W=(0,e.default)(B,U);N&&N(B,W),I!=null&&I.props&&typeof I.props.onClick=="function"&&I.props.onClick(M)}),b}return j(f,l),g(f,[{key:"render",value:function(){var p=this.props;p.text,p.onCopy,p.options;var m=p.children,q=c(p,r),M=t.default.Children.only(m);return t.default.cloneElement(M,i(i({},q),{},{onClick:this.onClick}))}}])})(t.default.PureComponent);return P(S,"defaultProps",{onCopy:void 0,options:void 0}),he}var ir,da;function Qs(){if(da)return ir;da=1;var e=Zs(),t=e.CopyToClipboard;return t.CopyToClipboard=t,ir=t,ir}var Ba=Qs();const ec=ha(Ba),xe={width:"100%",minWidth:0};function fa({preloadLabel:e,onPreload:t,playerSupported:r,playerTitle:n,playerSrc:a,downloadSrc:o,hls:i,heartbeatSrc:c,onPlayerNotSupported:u,openLinkHref:d,showOpenLink:h,copyText:g,externalPlayers:v}){const{t:y}=X(),R=ga();return s.jsxs("div",{className:"button-cell",children:[s.jsx(Me,{title:e,children:s.jsx(Q,{onClick:t,variant:"outlined",color:"primary",size:"small",sx:xe,children:e})}),r?s.jsx(Va,{title:n,videoSrc:a,downloadSrc:o,hls:i,heartbeatSrc:c,onNotSupported:u,inlineTrigger:!0}):h&&d&&s.jsx(Me,{title:y("OpenLink"),children:s.jsx(Q,{component:"a",href:d,target:"_blank",rel:"noreferrer",variant:"outlined",color:"primary",size:"small",sx:xe,children:y("OpenLink")})}),v.map(_=>s.jsx(Me,{title:_.label,children:s.jsx(Q,{component:"a",href:_.href,variant:"outlined",color:"primary",size:"small",sx:xe,children:_.label})},_.label)),s.jsx(ec,{text:g,onCopy:()=>R==null?void 0:R.showToast({message:y("Copied",{defaultValue:"Copied"}),severity:"success"}),children:s.jsx(Q,{variant:"outlined",color:"primary",size:"small",sx:xe,children:y("CopyLink")})})]})}ee.addHandler("episode",/(\d{1,4})[- |. ]серия|серия[- |. ](\d{1,4})/i,{type:"integer"});ee.addHandler("season",/sezon[- |. ](\d{1,3})|(\d{1,3})[- |. ]sezon/i,{type:"integer"});ee.addHandler("season",/сезон[- |. ](\d{1,3})|(\d{1,3})[- |. ]сезон/i,{type:"integer"});const tc=x.memo(({playableFileList:e,viewedFileList:t,selectedSeason:r,seasonAmount:n,hash:a})=>{const{t:o}=X(),[i,c]=x.useState({}),u=Xa(),d=p=>fetch(`${xr()}?link=${a}&index=${p}&preload`),h=(p,m)=>`${xr()}/${encodeURIComponent(p.split("\\").pop().split("/").pop())}?link=${a}&index=${m}&play`,g=(p,m)=>{const q=Qa(p,u);return{key:`${m}:${q?"gst":"stream"}`,src:q?to(a,m):h(p,m),hls:q,heartbeatSrc:q?eo(a):""}},v=p=>{c(m=>({...m,[p]:!0}))},y=!!(e!=null&&e.find(({path:p})=>ee.parse(p).episode)),R=!!(e!=null&&e.find(({path:p})=>ee.parse(p).season)),_=!!(e!=null&&e.find(({path:p})=>ee.parse(p).resolution)),w=((e==null?void 0:e.length)??0)>1&&!y,j=pe("isVlcUsed"),C=pe("isInfuseUsed"),P=pe("isSenPlayerUsed"),T=pe("isIinaUsed"),A=Ya(),S=Ja(),l=Za(),f=!A||!(l&&C)&&!(l&&P)&&!j&&!(S&&T),b=(p,m,q,M)=>{const O=[];return l&&C&&O.push({label:o("Infuse"),href:m}),l&&P&&O.push({label:o("SenPlayer"),href:q}),j&&O.push({label:"VLC",href:`vlc://${p}`}),S&&T&&O.push({label:"IINA",href:M}),O};return e!=null&&e.length?s.jsxs(s.Fragment,{children:[s.jsxs(Ks,{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{style:{width:"0"},children:o("Viewed")}),s.jsx("th",{children:o("Name")}),R&&(n==null?void 0:n.length)===1&&s.jsx("th",{style:{width:"0"},children:o("Season")}),y&&s.jsx("th",{style:{width:"0"},children:o("Episode")}),_&&s.jsx("th",{style:{width:"0"},children:o("Resolution")}),s.jsx("th",{style:{width:"100px"},children:o("Size")}),s.jsx("th",{style:{width:"340px"},children:o("Actions")})]})}),s.jsx("tbody",{children:e.map(({id:p,path:m,length:q})=>{const{title:M,resolution:O,episode:B,season:N}=ee.parse(m),L=t==null?void 0:t.includes(p),U=h(m,p),I=g(m,p),W=!i[I.key],F=new URL(U,window.location.href),E=`infuse://x-callback-url/play?url=${encodeURIComponent(F.toString())}`,D=`senplayer://x-callback-url/play?url=${encodeURIComponent(F.toString())}`,K=`iina://weblink?url=${encodeURIComponent(F.toString())}`;return(N===r||!(n!=null&&n.length))&&s.jsxs("tr",{className:L?"viewed-file-row":void 0,children:[s.jsx("td",{"data-label":"viewed","aria-label":"viewed",className:L?"viewed-file-indicator":void 0}),s.jsx("td",{"data-label":"name",children:w?m:M}),R&&(n==null?void 0:n.length)===1&&s.jsx("td",{"data-label":"season",children:N}),y&&s.jsx("td",{"data-label":"episode",children:B}),_&&s.jsx("td",{"data-label":"resolution",children:O}),s.jsx("td",{"data-label":"size",children:ie(q)}),s.jsx("td",{children:s.jsx(fa,{preloadLabel:o("Preload"),onPreload:()=>d(p),playerSupported:W,playerTitle:M,playerSrc:I.src,downloadSrc:U,hls:I.hls,heartbeatSrc:I.heartbeatSrc,onPlayerNotSupported:()=>v(I.key),openLinkHref:U,showOpenLink:f,copyText:F.toString(),externalPlayers:b(F,E,D,K)})})]},p)})})]}),s.jsx(Vs,{children:e.map(({id:p,path:m,length:q})=>{const{title:M,resolution:O,episode:B,season:N}=ee.parse(m),L=t==null?void 0:t.includes(p),U=h(m,p),I=g(m,p),W=!i[I.key],F=new URL(U,window.location.href),E=`infuse://x-callback-url/play?url=${encodeURIComponent(F.toString())}`,D=`senplayer://x-callback-url/play?url=${encodeURIComponent(F.toString())}`,K=`iina://weblink?url=${encodeURIComponent(F.toString())}`;return(N===r||!(n!=null&&n.length))&&s.jsxs(Xs,{$isViewed:L,children:[s.jsx("div",{className:"short-table-name",children:w?m:M}),s.jsxs("div",{className:"short-table-data",children:[L&&s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:o("Viewed")}),s.jsx("div",{className:"short-table-field-value",children:s.jsx("div",{className:"short-table-viewed-indicator"})})]}),R&&(n==null?void 0:n.length)===1&&s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:o("Season")}),s.jsx("div",{className:"short-table-field-value",children:N})]}),y&&s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:o("Episode")}),s.jsx("div",{className:"short-table-field-value",children:B})]}),_&&s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:o("Resolution")}),s.jsx("div",{className:"short-table-field-value",children:O})]}),s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:o("Size")}),s.jsx("div",{className:"short-table-field-value",children:ie(q)})]})]}),s.jsx("div",{className:"short-table-buttons",children:s.jsx(fa,{preloadLabel:o("Preload"),onPreload:()=>d(p),playerSupported:W,playerTitle:M,playerSrc:I.src,downloadSrc:U,hls:I.hls,heartbeatSrc:I.heartbeatSrc,onPlayerNotSupported:()=>v(I.key),openLinkHref:U,showOpenLink:f,copyText:F.toString(),externalPlayers:b(F,E,D,K)})})]},p)})})]}):o("NoPlayableFiles")},(e,t)=>hr(e,t)),rc=z.div`
  display: grid;
  grid-template-columns: minmax(0, 70%) minmax(0, 1fr);
  grid-template-rows: repeat(2, min-content);
  grid-template-areas:
    'main cache'
    'file-list file-list';
  min-width: 0;

  /* Stack main|cache when dialog is in the fullscreen band (≤960) */
  ${$("dialog")} {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: repeat(3, min-content);
    grid-template-areas:
      'main'
      'cache'
      'file-list';
  }
`,nc=z.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
`,ac=z.div`
  ${({$poster:e,theme:t})=>{const{dialogTorrentDetailsContent:{posterBGColor:r}}=Y(t);return H`
    height: 400px;
    border-radius: 5px;
    overflow: hidden;
    align-self: center;

    ${e?H`
            img {
              border-radius: 5px;
              height: 100%;
            }
          `:H`
            width: 300px;
            display: grid;
            place-items: center;
            background: ${r};

            svg {
              transform: scale(2.5) translateY(-3px);
            }
          `}}

    ${$("desktop")} {
      align-self: start;
    }

    ${$("tablet")} {
      ${e?H`
              height: 200px;
            `:H`
              display: none;
            `}}
    }
  `}}
`,oc=z.section`
  ${({theme:e})=>{const{dialogTorrentDetailsContent:{gradientStartColor:t,gradientEndColor:r}}=Y(e);return H`
    grid-area: main;
    padding: 40px;
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 30px;
    background: linear-gradient(145deg, ${t}, ${r});

    ${$("tablet")} {
      grid-template-columns: 1fr;
      padding: 20px;
    }
  `}}
`,ic=z.section`
  ${({theme:e})=>{const{dialogTorrentDetailsContent:{cacheSectionBGColor:t}}=Y(e);return H`
    grid-area: cache;
    padding: 40px;
    display: grid;
    align-content: start;
    grid-template-rows: min-content min-content min-content;
    background: ${t};
    min-width: 0;

    ${$("tablet")} {
      padding: 20px;
    }
  `}}
`,sc=z.section`
  ${({theme:e})=>{const{dialogTorrentDetailsContent:{torrentFilesSectionBGColor:t}}=Y(e);return H`
    grid-area: file-list;
    padding: 40px;
    box-shadow: inset 3px 25px 8px -25px rgba(0, 0, 0, 0.5);
    background: ${t};

    ${$("tablet")} {
      padding: 20px;
    }
  `}}
`,me=z.div`
  ${({$mb:e,theme:t})=>{const{dialogTorrentDetailsContent:{subNameFontColor:r}}=Y(t);return H`
    ${e&&`margin-top: ${e/3}px`};
    ${e&&`margin-bottom: ${e}px`};
    line-height: 1.2;
    color: ${r};

    ${$("tablet")} {
      ${e&&`margin-top: ${e/4}px`};
      ${e&&`margin-bottom: ${e/2}px`};
      font-size: 14px;
    }
  `}}
`,oe=z.div`
  ${({$color:e,$mb:t,theme:r})=>{const{dialogTorrentDetailsContent:{titleFontColor:n}}=Y(r);return H`
    ${t&&`margin-bottom: ${t}px`};
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.15;
    word-break: break-word;
    color: ${e||n};

    ${$("tablet")} {
      font-size: 1.25rem;
      line-height: 1.2;
      ${t&&`margin-bottom: ${t/2}px`};
    }

    ${$("mobile")} {
      font-size: 1.125rem;
    }
  `}}
`,cc=z.div`
  margin-bottom: 20px;
`,Ga=z.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(max-content, 220px));
  gap: 20px;

  ${$("tablet")} {
    gap: 15px;
  }
  ${$("phone")} {
    gap: 10px;
  }

  ${({$detailedView:e})=>e?H`
          ${$("tablet")} {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          ${$("phone")} {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        `:H`
          ${$("tablet")} {
            grid-template-columns: repeat(auto-fit, minmax(max-content, 185px));
          }
          ${$("compact")} {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          ${$("phone")} {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        `}
`,lc=z.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: min-content 50px;
  grid-template-areas:
    'title title'
    'icon value';

  > * {
    display: grid;
    place-items: center;
  }

  ${$("tablet")} {
    grid-template-columns: 30px 1fr;
    grid-template-rows: min-content 40px;
  }
`,uc=z.div`
  ${({theme:e})=>{const{dialogTorrentDetailsContent:{titleFontColor:t}}=Y(e);return H`
    grid-area: title;
    justify-self: start;
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 2px;
    font-weight: 600;
    color: ${t};
  `}}
`,dc=z.div`
  ${({$bgColor:e,$fontColor:t})=>H`
    grid-area: icon;
    color: ${t||re("#fff",.8)};
    background: ${e};
    border-radius: 5px 0 0 5px;

    ${$("tablet")} {
      > svg {
        width: 50%;
      }
    }
  `}}
`,fc=z.div`
  ${({$bgColor:e,$fontColor:t,theme:r})=>{const{dialogTorrentDetailsContent:{widgetFontColor:n}}=Y(r);return H`
    grid-area: value;
    font-size: 24px;
    padding: 0 20px 0 0;
    color: ${t||n};
    background: ${e};
    border-radius: 0 5px 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;

    ${$("tablet")} {
      font-size: 18px;
      padding: 0 16px 0 0;
    }
  `}}
`,hc=z.div`
  ${({theme:e})=>{const{addDialog:{separatorColor:t}}=Y(e);return H`
    height: 1px;
    background-color: ${t};
    margin: 30px 0;
  `}}
`,pc=z.section`
  ${({theme:e})=>{const{detailedView:{gradientStartColor:t,gradientEndColor:r}}=Y(e);return H`
    padding: 40px;
    background: linear-gradient(145deg, ${t}, ${r});

    ${$("mobile")} {
      padding: 20px;
    }
  `}}
`,gc=z.section`
  ${({theme:e})=>{const{detailedView:{cacheSectionBGColor:t}}=Y(e);return H`
    padding: 40px;
    box-shadow: inset 3px 25px 8px -25px rgba(0, 0, 0, 0.5);
    background: ${t};
    flex: 1;

    ${$("mobile")} {
      padding: 20px;
    }
  `}}
`;function ae({icon:e,title:t,value:r,iconBg:n,valueBg:a,fontColor:o}){return s.jsxs(lc,{children:[s.jsx(uc,{children:t}),s.jsx(dc,{$bgColor:n,$fontColor:o,children:s.jsx(e,{})}),s.jsx(fc,{$bgColor:a,$fontColor:o,children:r})]})}const{LIGHT:vc,DARK:mc}=ur,bc={light:{downloadSpeed:{iconBGColor:"#118f00",valueBGColor:"#13a300"},uploadSpeed:{iconBGColor:"#0146ad",valueBGColor:"#0058db"},peers:{iconBGColor:"#cdc118",valueBGColor:"#d8cb18",fontColor:"#1a1a1a"},piecesCount:{iconBGColor:"#b6c95e",valueBGColor:"#c0d076"},piecesLength:{iconBGColor:"#0982c8",valueBGColor:"#098cd7"},status:{iconBGColor:"#aea25b",valueBGColor:"#b4aa6e"},size:{iconBGColor:"#9b01ad",valueBGColor:"#ac03bf"},category:{iconBGColor:"#914820",valueBGColor:"#c9632c"}},dark:{downloadSpeed:{iconBGColor:"#0c6600",valueBGColor:"#0d7000"},uploadSpeed:{iconBGColor:"#003f9e",valueBGColor:"#0047b3"},peers:{iconBGColor:"#a69c11",valueBGColor:"#b4a913",fontColor:"#1a1a1a"},piecesCount:{iconBGColor:"#8da136",valueBGColor:"#99ae3d"},piecesLength:{iconBGColor:"#07659c",valueBGColor:"#0872af"},status:{iconBGColor:"#938948",valueBGColor:"#9f9450"},size:{iconBGColor:"#81008f",valueBGColor:"#9102a1"},category:{iconBGColor:"#914820",valueBGColor:"#c9632c"}}};function ce(e){const{isDarkMode:t}=x.useContext(pa);return bc[t?mc:vc][e]}const za=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=ce("downloadSpeed");return s.jsx(ae,{title:t("DownloadSpeed"),value:va(e)||`0 ${t("bps")}`,iconBg:r,valueBg:n,icon:bo})},Ha=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=ce("uploadSpeed");return s.jsx(ae,{title:t("UploadSpeed"),value:va(e)||`0 ${t("bps")}`,iconBg:r,valueBg:n,icon:yo})},La=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n,fontColor:a}=ce("peers");return s.jsx(ae,{title:t("Peers"),value:ro(e)||"0 / 0 · 0",iconBg:r,valueBg:n,fontColor:a,icon:_o})},yc=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=ce("piecesCount");return s.jsx(ae,{title:t("PiecesCount"),value:e,iconBg:r,valueBg:n,icon:Co})},_c=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=ce("piecesLength");return s.jsx(ae,{title:t("PiecesLength"),value:ie(e),iconBg:r,valueBg:n,icon:wo})},Na=({stat:e})=>{const{t}=X(),r={[ba]:t("TorrentGettingInfo"),[oo]:t("TorrentPreload"),[ao]:t("TorrentWorking"),[no]:t("TorrentClosed"),[ma]:t("TorrentInDb")},{iconBGColor:n,valueBGColor:a}=ce("status");return s.jsx(ae,{title:t("TorrentStatus"),value:e!=null?r[e]:void 0,iconBg:n,valueBg:a,icon:So})},Ua=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=ce("size");return s.jsx(ae,{title:t("TorrentSize"),value:ie(e),iconBg:r,valueBg:n,icon:xo})},xc=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=ce("category"),a=Cr.findIndex(i=>i.key===e),o=Cr.find(i=>i.key===e);return e?s.jsx(ae,{title:t("Category"),value:a>=0?t(o.name):e.length>1?e.charAt(0).toUpperCase()+e.slice(1):e,iconBg:r,valueBg:n,icon:Rr}):s.jsx(ae,{title:t("Category"),value:"—",iconBg:r,valueBg:n,icon:Rr})};function Cc({downloadSpeed:e,uploadSpeed:t,torrent:r,torrentSize:n,PiecesCount:a,PiecesLength:o,stat:i,cache:c,isSnakeDebugMode:u,setIsSnakeDebugMode:d}){const{t:h}=X();return s.jsxs(s.Fragment,{children:[s.jsxs(pc,{children:[s.jsx(oe,{$mb:20,children:h("Data")}),s.jsxs(Ga,{$detailedView:!0,children:[s.jsx(za,{data:e}),s.jsx(Ha,{data:t}),s.jsx(La,{data:r}),s.jsx(Ua,{data:n}),s.jsx(yc,{data:a}),s.jsx(_c,{data:o}),s.jsx(Na,{stat:i})]})]}),s.jsxs(gc,{children:[s.jsx(oe,{$mb:20,children:s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[s.jsx("span",{children:h("Cache")}),s.jsx(Ro,{control:s.jsx(jo,{color:"primary",checked:u,disableRipple:!0,onChange:({target:{checked:g}})=>{d(g),io("isSnakeDebugMode",g)}}),label:h("DebugMode"),labelPlacement:"start"})]})}),s.jsx(Ia,{cache:c,mode:"detailed",isSnakeDebugMode:u})]})]})}const sr=30;function wc({downloadSpeed:e,uploadSpeed:t}){const{t:r}=X(),[n,a]=x.useState(()=>Array(sr).fill(0)),[o,i]=x.useState(()=>Array(sr).fill(0)),c=x.useRef(0);x.useEffect(()=>{const d=Math.max(0,e??0),h=Math.max(0,t??0);a(g=>[...g.slice(1),d]),i(g=>[...g.slice(1),h]),c.current+=1},[e,t]);const u=x.useMemo(()=>Array.from({length:sr},(d,h)=>h),[]);return s.jsxs(dr,{sx:{width:"100%",minWidth:0},children:[s.jsxs(pr,{variant:"caption",color:"text.secondary",sx:{mb:.5,display:"block"},children:[r("DownloadSpeed")," / ",r("UploadSpeed")]}),s.jsx(ko,{height:120,series:[{data:n,label:r("DownloadSpeed"),showMark:!1,area:!0},{data:o,label:r("UploadSpeed"),showMark:!1}],xAxis:[{data:u,hideTooltip:!0}],yAxis:[{width:40}],margin:{left:0,right:8,top:8,bottom:8},hideLegend:!0})]})}const cr=z.div`
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

  ${$("mobile")} {
    grid-template-columns: 1fr;
  }
`,lr=z.div`
  ${({$mb:e,theme:t})=>{const{torrentFunctions:{fontColor:r}}=Y(t);return H`
    ${e&&`margin-bottom: ${e}px`};
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;
    color: ${r};

    ${$("mobile")} {
      font-size: 13px;
      font-weight: 400;
      ${e&&`margin-bottom: ${e/1.5}px`};
    }
  `}}
`,Sc=x.memo(({hash:e,viewedFileList:t,playableFileList:r,name:n,title:a,setViewedFileList:o})=>{var C;const{t:i}=X(),c=ga(),[u,d]=x.useState(null),h=t==null?void 0:t[(t==null?void 0:t.length)-1],g=(C=r==null?void 0:r.find(({id:P})=>P===h))==null?void 0:C.path,v=(r==null?void 0:r.length)===1,y=g?ee.parse(g):null,R=`${so()}/${encodeURIComponent(n||a||"file")}.m3u?link=${e}&m3u`,_=`${R}&fromlast`,w=`magnet:?xt=urn:btih:${e}&dn=${encodeURIComponent(n||a||"")}`,j=()=>{u==="drop"&&be.post(co(),{action:"drop",hash:e}).then(()=>c==null?void 0:c.showToast({message:i("DropTorrent"),severity:"success"})).catch(()=>c==null?void 0:c.showToast({message:i("PlaybackError"),severity:"error"})),u==="views"&&be.post(ya(),{action:"rem",hash:e,file_index:-1}).then(()=>{o(),c==null||c.showToast({message:i("RemoveViews"),severity:"success"})}).catch(()=>c==null?void 0:c.showToast({message:i("PlaybackError"),severity:"error"})),d(null)};return s.jsxs(s.Fragment,{children:[!v&&!!(t!=null&&t.length)&&s.jsxs(s.Fragment,{children:[s.jsx(lr,{children:i("DownloadPlaylist")}),s.jsxs(me,{$mb:10,children:[i("LatestFilePlayed")," ",s.jsxs("strong",{children:[y==null?void 0:y.title,".",(y==null?void 0:y.season)&&s.jsxs(s.Fragment,{children:[" ",i("Season"),": ",y==null?void 0:y.season,". ",i("Episode"),": ",y==null?void 0:y.episode,"."]})]})]}),s.jsxs(cr,{children:[s.jsx(Q,{component:"a",href:R,variant:"contained",color:"primary",size:"large",children:i("Full")}),s.jsx(Q,{component:"a",href:_,variant:"contained",color:"primary",size:"large",children:i("FromLatestFile")})]})]}),s.jsx(lr,{$mb:10,children:i("TorrentState")}),s.jsxs(cr,{children:[s.jsx(Q,{onClick:()=>d("views"),variant:"outlined",color:"primary",size:"large",children:i("RemoveViews")}),s.jsx(Q,{onClick:()=>d("drop"),variant:"contained",color:"error",size:"large",children:i("DropTorrent")})]}),s.jsx(lr,{$mb:10,children:i("Info")}),s.jsxs(cr,{children:[(v||!(t!=null&&t.length))&&s.jsx(Q,{component:"a",href:R,variant:"contained",color:"primary",size:"large",children:i("DownloadPlaylist")}),s.jsx(Ba.CopyToClipboard,{text:w,onCopy:()=>c==null?void 0:c.showToast({message:i("Copied"),severity:"success"}),children:s.jsx(Q,{variant:"contained",color:"primary",size:"large",children:i("CopyHash")})})]}),s.jsxs(To,{open:u!=null,onClose:()=>d(null),"aria-labelledby":"torrent-fn-confirm-title",children:[s.jsx(qo,{id:"torrent-fn-confirm-title",children:i(u==="drop"?"DropTorrent":"RemoveViews")}),s.jsx(Oo,{children:s.jsx(Po,{children:i(u==="drop"?"ConfirmDropTorrent":"ConfirmRemoveViews")})}),s.jsxs(Eo,{children:[s.jsx(Q,{autoFocus:!0,onClick:()=>d(null),variant:"outlined",color:"primary",children:i("Cancel")}),s.jsx(Q,{onClick:j,variant:"contained",color:u==="drop"?"error":"primary",children:i("OK")})]})]})]})}),Rc=()=>s.jsx("div",{style:{minHeight:160,display:"grid",placeItems:"center",padding:24},children:s.jsx(Do,{color:"secondary"})}),jc=e=>({id:e.id??e.Id??0,path:e.path??e.Path??"",length:e.length??e.Length??0});function Ac({closeDialog:e,torrent:t}){var le;const{t:r}=X(),{dialogTorrentDetailsContent:{bufferTrailStartColor:n,bufferTrailEndColor:a,bufferEmptyTrackColor:o,bufferTrackBorderColor:i}}=Y(Mo()),[c,u]=x.useState(!0),[d,h]=x.useState(!1),[g,v]=x.useState(),[y,R]=x.useState(),[_,w]=x.useState(null),[j,C]=x.useState(),[P,T]=x.useState(pe("isSnakeDebugMode")),{poster:A,hash:S,title:l,category:f,name:b,stat:p,download_speed:m,upload_speed:q,torrent_size:M,file_stats:O}=t,B=Zo(S),N=ei(),{Capacity:L,PiecesCount:U,PiecesLength:I,Filled:W}=B;x.useEffect(()=>{if(y&&_===null){const k=[];y.forEach(({path:G})=>{const V=ee.parse(G).season;V&&!k.includes(V)&&k.push(V)}),k.length&&C(k[0]),w(k.sort((G,V)=>G-V))}},[y,_]),x.useEffect(()=>{R(O==null?void 0:O.map(jc).filter(({path:k})=>lo(k)))},[O]),x.useEffect(()=>{const k=!!Object.entries(B).length,G=p!==ba&&p!==ma;!k&&!c&&u(!0),k&&c&&G&&u(!1)},[p,B,c]),x.useEffect(()=>{be.post(ya(),{action:"list",hash:S}).then(({data:k})=>{if(k){const G=k.map(V=>V.file_index).sort((V,yr)=>V-yr);v(G)}else v(void 0)})},[S]);const F=N==null?void 0:N.PreloadCache,E=(L||0)/100*(F||0),D=E>33554432?E:33554432,K=L&&L>0?L:D,J=K>0&&W!=null&&W>0?Math.min(100,Math.round(W*100/K)):null,Z=L&&L>0&&E>0?Math.min(100,Math.round(E*100/L)):null,te=()=>{const k=[],G=b?ee.parse(b):null;l!==b?k.push(wr(l||"")):G!=null&&G.title&&k.push(wr(G.title)),G!=null&&G.year&&!String(k[0]||"").includes(String(G.year))&&k.push(G.year),G!=null&&G.resolution&&!String(k[0]||"").includes(String(G.resolution))&&k.push(G.resolution);const V=k.join(". ");return V[V.length-1]==="."&&V[V.length-2]==="."?`${V}.`:V};return s.jsxs(s.Fragment,{children:[s.jsx(ri,{onClose:e,title:r(d?"DetailedCacheView.header":"TorrentDetails"),...d&&{onBack:()=>h(!1)}}),s.jsx(nc,{children:c?s.jsx(Rc,{}):d?s.jsx(Cc,{downloadSpeed:m,uploadSpeed:q,torrent:t,torrentSize:M,PiecesCount:U,PiecesLength:I,stat:p,cache:B,isSnakeDebugMode:P,setIsSnakeDebugMode:T}):s.jsxs(rc,{children:[s.jsxs(oc,{children:[s.jsx(ac,{$poster:!!A,children:A?s.jsx("img",{alt:"poster",src:A}):s.jsx(uo,{})}),s.jsxs("div",{children:[l&&b!==l?te().length>90?s.jsxs(s.Fragment,{children:[s.jsx(oe,{children:ee.parse(b||"").title}),s.jsx(me,{$mb:20,children:te()})]}):s.jsxs(s.Fragment,{children:[s.jsx(oe,{children:te()}),s.jsx(me,{$mb:20,children:(le=ee.parse(b||""))==null?void 0:le.title})]}):s.jsx(oe,{$mb:20,children:te()}),s.jsxs(Ga,{children:[s.jsx(za,{data:m}),s.jsx(Ha,{data:q}),s.jsx(La,{data:t}),s.jsx(Ua,{data:M}),s.jsx(Na,{stat:p}),s.jsx(xc,{data:f})]}),s.jsx(wc,{downloadSpeed:m,uploadSpeed:q}),s.jsx(hc,{}),s.jsx(Sc,{hash:S,viewedFileList:g,playableFileList:y,name:b,title:l,setViewedFileList:v})]})]}),s.jsxs(ic,{children:[s.jsxs(cc,{children:[s.jsx(oe,{$mb:12,children:r("Buffer")}),D<=33554432&&s.jsx(me,{children:r("BufferNote")}),s.jsxs(jr,{spacing:1,sx:{mt:.5},children:[s.jsxs(pr,{component:"div",variant:"body2",sx:{fontWeight:400,textAlign:"center"},"aria-label":`${ie(W||0)} / ${ie(K)}`,children:[`${ie(W||0)} / ${ie(K)}`,J!=null?` · ${J}%`:""]}),s.jsxs(dr,{sx:{position:"relative"},children:[s.jsx(Ao,{variant:"determinate",value:J??0,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":J??0,sx:{height:10,borderRadius:1,border:`1px solid ${i}`,backgroundColor:o,"& .MuiLinearProgress-bar":{borderRadius:1,background:`linear-gradient(90deg, ${n}, ${a})`}}}),Z!=null&&Z>0&&s.jsx(dr,{"aria-hidden":!0,title:r("SettingsDialog.PreloadCache"),sx:{position:"absolute",left:`${Z}%`,top:-2,bottom:-2,width:2,ml:"-1px",borderRadius:1,bgcolor:i,boxShadow:`0 0 0 1px ${o}`,pointerEvents:"none"}})]})]})]}),s.jsx(Ia,{mode:"mini",cache:B,isSnakeDebugMode:P}),s.jsx(Q,{style:{marginTop:"20px",width:"100%"},variant:"outlined",color:"primary",size:"large",onClick:()=>h(!0),children:r("DetailedCacheView.button")})]}),s.jsxs(sc,{children:[s.jsx(oe,{$mb:20,children:r("TorrentContent")}),((_==null?void 0:_.length)??0)>1&&s.jsxs(s.Fragment,{children:[s.jsx(me,{$mb:7,children:r("SelectSeason")}),s.jsx(jr,{direction:"row",useFlexGap:!0,spacing:1,sx:{flexWrap:"wrap",mb:"30px"},children:_.map(k=>s.jsx(Q,{color:"secondary",variant:j===k?"contained":"outlined",onClick:()=>C(k),children:k},k))}),s.jsxs(oe,{$mb:20,children:[r("Season")," ",j]})]}),s.jsx(tc,{hash:S,playableFileList:y,viewedFileList:g,selectedSeason:j,seasonAmount:_})]})]})})]})}export{Ac as default};
