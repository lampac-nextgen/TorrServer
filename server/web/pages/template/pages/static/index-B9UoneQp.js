import{a as w,d as me,u as X,j as s,n as Ee,g as ua,r as La}from"./vendor-B9KbAPe3.js";import{V as vr,s as Ua,W as Wa,g as B,X as be,r as te,f as H,Y as da,Z as cr,m as k,$ as fa,a0 as Ka,a1 as Fa,E as Q,a2 as he,a3 as Va,a4 as Xa,a5 as Ya,a6 as oe,a7 as mr,a8 as Ja,a9 as Za,aa as Qa,ab as ha,ac as eo,ad as pa,ae as to,af as ro,ag as no,ah as ga,T as br,ai as ao,aj as oo,j as io,ak as va,al as so,am as co,N as lo,an as yr}from"./index-B1M9PjXs.js";import{aI as uo,I as _r,aJ as fo,T as ma,C as ho,ah as po,a as go,aK as vo,c as mo,aH as re,n as Pe,j as Z,aD as bo,aC as yo,aL as _o,aM as xo,aN as Co,aO as wo,aP as So,as as xr,a7 as Ro,aQ as jo,D as To,z as qo,l as Oo,aR as Eo,O as Po,Y as Cr,B as wr,aS as Mo,m as Ao}from"./mui-DHevzUj8.js";import{a as we,c as ba,r as ie,d as Do,b as Se,e as $o}from"./isObjectLike-Ddue8m3w.js";import"./hls-CWTT-7hy.js";const Io=16,ko=10,Bo=(e,t,r)=>{if(e==null||t==null||r<=0)return null;const n=Math.max(0,Math.min(r-1,Math.floor(e))),a=Math.max(0,Math.min(r-1,Math.floor(t)));return a<n?null:{start:n,end:a}},Go=(e,t,r,n)=>{const a=Bo(e,t,r);if(a)for(let o=a.start;o<=a.end;o++)n(o)},zo=(e,t)=>{if(e){if(Array.isArray(e)){for(let r=0;r<e.length;r++){const n=e[r];n&&t(r,n)}return}for(const[r,n]of Object.entries(e)){if(!n)continue;const a=Number(r);Number.isFinite(a)&&t(a,n)}}},Ho=(e,t)=>{if(!e)return 0;const r=e.Length||t||0,n=e.Size||0;if(r<=0)return n>0?100:0;const a=Math.min(n,r);return Math.min(100,a/r*100)},No=(e,t,r,n)=>{if(!(n!=null&&n.length))return t>=2?t:0;if(n.some(i=>i.Reader===e))return 5;if(t>=2)return t;if(r)return 0;let o=0;for(const i of n){if(i.Reader==null||i.Start==null||i.End==null)continue;const c=i.Reader,u=i.End;if(e<c||e>u)continue;let d=2;if(e===c+1)d=4;else{const p=Math.max(1,u-c),g=c+Math.max(2,Math.floor(p*.45));e<=g?d=3:e<=g+5&&(d=2)}d>o&&(o=d)}return o>0?o:t},ya=e=>e===2?"H":e===3?"R":e===4?"N":e===5?"A":"",Lo=(e,t,r,n,a,o)=>{const i=Ho(t,r),c=!!(t!=null&&t.Completed)||i>=100,u=(t==null?void 0:t.Priority)||0;return{percentage:c?100:i,priority:No(e,u,c,o),completed:c,isReader:n,isReaderRange:a,pieceStart:e,pieceEnd:e}},_a=(e,t)=>{const r=e.PiecesCount??0;if(r<=0)return null;const n=e.Readers||[];let a=0;if(n.length>0){let g=-1;for(const v of n)v.Reader!=null&&v.Reader>=0&&v.Reader<r&&v.Reader>g&&(g=v.Reader);a=g>=0?g:0}const o=e.PiecesLength||0,i=o>0?Math.max(1,Math.round((e.Capacity||0)/o)):t,c=Math.max(t,64);let u=Math.min(r,Math.max(t,i),c);u=Math.max(1,u);let d=a-Math.floor(u/2);d<0&&(d=0);let p=d+u-1;return p>=r&&(p=r-1,d=Math.max(0,p-u+1)),{start:d,end:p,readerPiece:a}},Uo=(e,t)=>{const r=e.PiecesCount??0,n=_a(e,t);if(!n||r<=0)return{cells:[],piecesCount:r,bucketSize:1,windowStart:0,windowEnd:-1};const a=e.PiecesLength||0,o=e.Readers||[],i=new Map;zo(e.Pieces,(p,g)=>{p>=n.start&&p<=n.end&&i.set(p,g)});const c=new Set,u=new Set;for(const p of o)p.Reader!=null&&p.Reader>=n.start&&p.Reader<=n.end&&c.add(p.Reader),Go(p.Start,p.End,r,g=>{g>=n.start&&g<=n.end&&u.add(g)});const d=[];for(let p=n.start;p<=n.end;p++)d.push(Lo(p,i.get(p),a,c.has(p),u.has(p),o));return{cells:d,piecesCount:r,bucketSize:1,windowStart:n.start,windowEnd:n.end}},Wo=(e,t=!1)=>{const r=t?ko:Io,n=t?31:24;return!e||e<=0?10*r:Math.max(1,Math.floor(e/n))*r},ye=100,Ko=400,Fo=2e3,Sr=e=>e!=null&&e.length?e.map(t=>`${t.Reader??""}:${t.Start??""}-${t.End??""}`).join("|"):"",Rr=e=>{if(!e)return"";if(Array.isArray(e)){let r="";for(let n=0;n<e.length;n++){const a=e[n];a&&(r+=`${n}:${a.Size??0}:${a.Priority??0};`)}return r}let t="";for(const[r,n]of Object.entries(e))n&&(t+=`${r}:${n.Size??0}:${n.Priority??0};`);return t},jr=(e,t)=>e.Filled===t.Filled&&e.Capacity===t.Capacity&&e.PiecesCount===t.PiecesCount&&e.PiecesLength===t.PiecesLength&&Sr(e.Readers)===Sr(t.Readers)&&Rr(e.Pieces)===Rr(t.Pieces),Vo=e=>{const[t,r]=w.useState({}),n=w.useRef(!0),a=w.useRef(null),o=w.useRef(!1),i=w.useRef({}),c=w.useRef(Date.now()),u=w.useRef(ye);return w.useEffect(()=>()=>{n.current=!1},[]),w.useEffect(()=>{if(!e){a.current&&clearTimeout(a.current);return}let d=!1;const p=()=>{d||(a.current=setTimeout(g,u.current))},g=()=>{d||o.current||document.hidden||(o.current=!0,me.post(Wa(),{action:"get",hash:e}).then(({data:y})=>{if(!n.current||d)return;const R=y||{};if(jr(i.current,R)){Date.now()-c.current>=Fo&&(u.current=Ko);return}c.current=Date.now(),u.current=ye,i.current=R,r(R)}).catch(()=>{!n.current||d||jr(i.current,{})||(c.current=Date.now(),u.current=ye,i.current={},r({}))}).finally(()=>{o.current=!1,document.hidden||p()}))};g();const v=()=>{if(document.hidden){a.current&&clearTimeout(a.current);return}u.current=ye,g()};return document.addEventListener("visibilitychange",v),()=>{d=!0,a.current&&clearTimeout(a.current),document.removeEventListener("visibilitychange",v)}},[e]),t},Xo=(e,t)=>w.useMemo(()=>Uo(e,t),[e,t]),Yo=()=>{const[e,t]=w.useState(),[r,n]=w.useState(0);return w.useEffect(()=>{const a=()=>n(o=>o+1);return window.addEventListener(vr,a),()=>window.removeEventListener(vr,a)},[]),w.useEffect(()=>{let a=!1;return me.post(Ua(),{action:"get"}).then(({data:o})=>{a||t(o)}),()=>{a=!0}},[r]),e},Jo=B(po)`
  && {
    position: relative;
    padding-top: var(--safe-top);
  }
`;function Zo({title:e,onClose:t,onBack:r}){const{t:n}=X();return s.jsx(Jo,{children:s.jsxs(uo,{children:[r&&s.jsx(_r,{edge:"start",color:"inherit",onClick:r,"aria-label":n("Back",{defaultValue:"Back"}),children:s.jsx(fo,{})}),s.jsx(ma,{variant:"h6",sx:{marginLeft:"5px",flex:1},children:e}),s.jsx(_r,{color:"inherit",onClick:t,"aria-label":n("Close",{defaultValue:"Close"}),sx:{marginRight:"-10px"},children:s.jsx(ho,{})})]})})}var xa=(function(){if(typeof Map<"u")return Map;function e(t,r){var n=-1;return t.some(function(a,o){return a[0]===r?(n=o,!0):!1}),n}return(function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(r){var n=e(this.__entries__,r),a=this.__entries__[n];return a&&a[1]},t.prototype.set=function(r,n){var a=e(this.__entries__,r);~a?this.__entries__[a][1]=n:this.__entries__.push([r,n])},t.prototype.delete=function(r){var n=this.__entries__,a=e(n,r);~a&&n.splice(a,1)},t.prototype.has=function(r){return!!~e(this.__entries__,r)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(r,n){n===void 0&&(n=null);for(var a=0,o=this.__entries__;a<o.length;a++){var i=o[a];r.call(n,i[1],i[0])}},t})()})(),lr=typeof window<"u"&&typeof document<"u"&&window.document===document,xe=(function(){return typeof Ee<"u"&&Ee.Math===Math?Ee:typeof self<"u"&&self.Math===Math?self:typeof window<"u"&&window.Math===Math?window:Function("return this")()})(),Qo=(function(){return typeof requestAnimationFrame=="function"?requestAnimationFrame.bind(xe):function(e){return setTimeout(function(){return e(Date.now())},1e3/60)}})(),ei=2;function ti(e,t){var r=!1,n=!1,a=0;function o(){r&&(r=!1,e()),n&&c()}function i(){Qo(o)}function c(){var u=Date.now();if(r){if(u-a<ei)return;n=!0}else r=!0,n=!1,setTimeout(i,t);a=u}return c}var ri=20,ni=["top","right","bottom","left","width","height","size","weight"],ai=typeof MutationObserver<"u",oi=(function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=ti(this.refresh.bind(this),ri)}return e.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},e.prototype.removeObserver=function(t){var r=this.observers_,n=r.indexOf(t);~n&&r.splice(n,1),!r.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){var t=this.updateObservers_();t&&this.refresh()},e.prototype.updateObservers_=function(){var t=this.observers_.filter(function(r){return r.gatherActive(),r.hasActive()});return t.forEach(function(r){return r.broadcastActive()}),t.length>0},e.prototype.connect_=function(){!lr||this.connected_||(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),ai?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){!lr||!this.connected_||(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(t){var r=t.propertyName,n=r===void 0?"":r,a=ni.some(function(o){return!!~n.indexOf(o)});a&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e})(),Ca=(function(e,t){for(var r=0,n=Object.keys(t);r<n.length;r++){var a=n[r];Object.defineProperty(e,a,{value:t[a],enumerable:!1,writable:!1,configurable:!0})}return e}),le=(function(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView;return t||xe}),wa=Re(0,0,0,0);function Ce(e){return parseFloat(e)||0}function Tr(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return t.reduce(function(n,a){var o=e["border-"+a+"-width"];return n+Ce(o)},0)}function ii(e){for(var t=["top","right","bottom","left"],r={},n=0,a=t;n<a.length;n++){var o=a[n],i=e["padding-"+o];r[o]=Ce(i)}return r}function si(e){var t=e.getBBox();return Re(0,0,t.width,t.height)}function ci(e){var t=e.clientWidth,r=e.clientHeight;if(!t&&!r)return wa;var n=le(e).getComputedStyle(e),a=ii(n),o=a.left+a.right,i=a.top+a.bottom,c=Ce(n.width),u=Ce(n.height);if(n.boxSizing==="border-box"&&(Math.round(c+o)!==t&&(c-=Tr(n,"left","right")+o),Math.round(u+i)!==r&&(u-=Tr(n,"top","bottom")+i)),!ui(e)){var d=Math.round(c+o)-t,p=Math.round(u+i)-r;Math.abs(d)!==1&&(c-=d),Math.abs(p)!==1&&(u-=p)}return Re(a.left,a.top,c,u)}var li=(function(){return typeof SVGGraphicsElement<"u"?function(e){return e instanceof le(e).SVGGraphicsElement}:function(e){return e instanceof le(e).SVGElement&&typeof e.getBBox=="function"}})();function ui(e){return e===le(e).document.documentElement}function di(e){return lr?li(e)?si(e):ci(e):wa}function fi(e){var t=e.x,r=e.y,n=e.width,a=e.height,o=typeof DOMRectReadOnly<"u"?DOMRectReadOnly:Object,i=Object.create(o.prototype);return Ca(i,{x:t,y:r,width:n,height:a,top:r,right:t+n,bottom:a+r,left:t}),i}function Re(e,t,r,n){return{x:e,y:t,width:r,height:n}}var hi=(function(){function e(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=Re(0,0,0,0),this.target=t}return e.prototype.isActive=function(){var t=di(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},e})(),pi=(function(){function e(t,r){var n=fi(r);Ca(this,{target:t,contentRect:n})}return e})(),gi=(function(){function e(t,r,n){if(this.activeObservations_=[],this.observations_=new xa,typeof t!="function")throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=r,this.callbackCtx_=n}return e.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof le(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)||(r.set(t,new hi(t)),this.controller_.addObserver(this),this.controller_.refresh())}},e.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof le(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)&&(r.delete(t),r.size||this.controller_.removeObserver(this))}},e.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},e.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach(function(r){r.isActive()&&t.activeObservations_.push(r)})},e.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,r=this.activeObservations_.map(function(n){return new pi(n.target,n.broadcastRect())});this.callback_.call(t,r,t),this.clearActive()}},e.prototype.clearActive=function(){this.activeObservations_.splice(0)},e.prototype.hasActive=function(){return this.activeObservations_.length>0},e})(),Sa=typeof WeakMap<"u"?new WeakMap:new xa,Ra=(function(){function e(t){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var r=oi.getInstance(),n=new gi(t,r,this);Sa.set(this,n)}return e})();["observe","unobserve","disconnect"].forEach(function(e){Ra.prototype[e]=function(){var t;return(t=Sa.get(this))[e].apply(t,arguments)}});var vi=(function(){return typeof xe.ResizeObserver<"u"?xe.ResizeObserver:Ra})(),mi=["client","offset","scroll","bounds","margin"];function qr(e){var t=[];return mi.forEach(function(r){e[r]&&t.push(r)}),t}function Or(e,t){var r={};if(t.indexOf("client")>-1&&(r.client={top:e.clientTop,left:e.clientLeft,width:e.clientWidth,height:e.clientHeight}),t.indexOf("offset")>-1&&(r.offset={top:e.offsetTop,left:e.offsetLeft,width:e.offsetWidth,height:e.offsetHeight}),t.indexOf("scroll")>-1&&(r.scroll={top:e.scrollTop,left:e.scrollLeft,width:e.scrollWidth,height:e.scrollHeight}),t.indexOf("bounds")>-1){var n=e.getBoundingClientRect();r.bounds={top:n.top,right:n.right,bottom:n.bottom,left:n.left,width:n.width,height:n.height}}if(t.indexOf("margin")>-1){var a=getComputedStyle(e);r.margin={top:a?parseInt(a.marginTop):0,right:a?parseInt(a.marginRight):0,bottom:a?parseInt(a.marginBottom):0,left:a?parseInt(a.marginLeft):0}}return r}function bi(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView;return t||window}function yi(e){return function(t){var r,n;return n=r=(function(a){go(o,a);function o(){for(var c,u=arguments.length,d=new Array(u),p=0;p<u;p++)d[p]=arguments[p];return c=a.call.apply(a,[this].concat(d))||this,c.state={contentRect:{entry:{},client:{},offset:{},scroll:{},bounds:{},margin:{}}},c._animationFrameID=null,c._resizeObserver=null,c._node=null,c._window=null,c.measure=function(g){var v=Or(c._node,qr(c.props));g&&(v.entry=g[0].contentRect),c._animationFrameID=c._window.requestAnimationFrame(function(){c._resizeObserver!==null&&(c.setState({contentRect:v}),typeof c.props.onResize=="function"&&c.props.onResize(v))})},c._handleRef=function(g){c._resizeObserver!==null&&c._node!==null&&c._resizeObserver.unobserve(c._node),c._node=g,c._window=bi(c._node);var v=c.props.innerRef;v&&(typeof v=="function"?v(c._node):v.current=c._node),c._resizeObserver!==null&&c._node!==null&&c._resizeObserver.observe(c._node)},c}var i=o.prototype;return i.componentDidMount=function(){this._resizeObserver=this._window!==null&&this._window.ResizeObserver?new this._window.ResizeObserver(this.measure):new vi(this.measure),this._node!==null&&(this._resizeObserver.observe(this._node),typeof this.props.onResize=="function"&&this.props.onResize(Or(this._node,qr(this.props))))},i.componentWillUnmount=function(){this._window!==null&&this._window.cancelAnimationFrame(this._animationFrameID),this._resizeObserver!==null&&(this._resizeObserver.disconnect(),this._resizeObserver=null)},i.render=function(){var u=this.props;u.innerRef,u.onResize;var d=vo(u,["innerRef","onResize"]);return w.createElement(t,mo({},d,{measureRef:this._handleRef,measure:this.measure,contentRect:this.state.contentRect}))},o})(w.Component),r.propTypes={client:re.bool,offset:re.bool,scroll:re.bool,bounds:re.bool,margin:re.bool,innerRef:re.oneOfType([re.object,re.func]),onResize:re.func},n}}var dr=yi()(function(e){var t=e.measure,r=e.measureRef,n=e.contentRect,a=e.children;return a({measure:t,measureRef:r,contentRect:n})});dr.displayName="Measure";dr.propTypes.children=re.func;var Me,Er;function _i(){if(Er)return Me;Er=1;function e(){this.__data__=[],this.size=0}return Me=e,Me}var Ae,Pr;function ja(){if(Pr)return Ae;Pr=1;function e(t,r){return t===r||t!==t&&r!==r}return Ae=e,Ae}var De,Mr;function je(){if(Mr)return De;Mr=1;var e=ja();function t(r,n){for(var a=r.length;a--;)if(e(r[a][0],n))return a;return-1}return De=t,De}var $e,Ar;function xi(){if(Ar)return $e;Ar=1;var e=je(),t=Array.prototype,r=t.splice;function n(a){var o=this.__data__,i=e(o,a);if(i<0)return!1;var c=o.length-1;return i==c?o.pop():r.call(o,i,1),--this.size,!0}return $e=n,$e}var Ie,Dr;function Ci(){if(Dr)return Ie;Dr=1;var e=je();function t(r){var n=this.__data__,a=e(n,r);return a<0?void 0:n[a][1]}return Ie=t,Ie}var ke,$r;function wi(){if($r)return ke;$r=1;var e=je();function t(r){return e(this.__data__,r)>-1}return ke=t,ke}var Be,Ir;function Si(){if(Ir)return Be;Ir=1;var e=je();function t(r,n){var a=this.__data__,o=e(a,r);return o<0?(++this.size,a.push([r,n])):a[o][1]=n,this}return Be=t,Be}var Ge,kr;function Te(){if(kr)return Ge;kr=1;var e=_i(),t=xi(),r=Ci(),n=wi(),a=Si();function o(i){var c=-1,u=i==null?0:i.length;for(this.clear();++c<u;){var d=i[c];this.set(d[0],d[1])}}return o.prototype.clear=e,o.prototype.delete=t,o.prototype.get=r,o.prototype.has=n,o.prototype.set=a,Ge=o,Ge}var ze,Br;function Ri(){if(Br)return ze;Br=1;var e=Te();function t(){this.__data__=new e,this.size=0}return ze=t,ze}var He,Gr;function ji(){if(Gr)return He;Gr=1;function e(t){var r=this.__data__,n=r.delete(t);return this.size=r.size,n}return He=e,He}var Ne,zr;function Ti(){if(zr)return Ne;zr=1;function e(t){return this.__data__.get(t)}return Ne=e,Ne}var Le,Hr;function qi(){if(Hr)return Le;Hr=1;function e(t){return this.__data__.has(t)}return Le=e,Le}var Ue,Nr;function Ta(){if(Nr)return Ue;Nr=1;var e=we(),t=ba(),r="[object AsyncFunction]",n="[object Function]",a="[object GeneratorFunction]",o="[object Proxy]";function i(c){if(!t(c))return!1;var u=e(c);return u==n||u==a||u==r||u==o}return Ue=i,Ue}var We,Lr;function Oi(){if(Lr)return We;Lr=1;var e=ie(),t=e["__core-js_shared__"];return We=t,We}var Ke,Ur;function Ei(){if(Ur)return Ke;Ur=1;var e=Oi(),t=(function(){var n=/[^.]+$/.exec(e&&e.keys&&e.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""})();function r(n){return!!t&&t in n}return Ke=r,Ke}var Fe,Wr;function qa(){if(Wr)return Fe;Wr=1;var e=Function.prototype,t=e.toString;function r(n){if(n!=null){try{return t.call(n)}catch{}try{return n+""}catch{}}return""}return Fe=r,Fe}var Ve,Kr;function Pi(){if(Kr)return Ve;Kr=1;var e=Ta(),t=Ei(),r=ba(),n=qa(),a=/[\\^$.*+?()[\]{}|]/g,o=/^\[object .+?Constructor\]$/,i=Function.prototype,c=Object.prototype,u=i.toString,d=c.hasOwnProperty,p=RegExp("^"+u.call(d).replace(a,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function g(v){if(!r(v)||t(v))return!1;var y=e(v)?p:o;return y.test(n(v))}return Ve=g,Ve}var Xe,Fr;function Mi(){if(Fr)return Xe;Fr=1;function e(t,r){return t==null?void 0:t[r]}return Xe=e,Xe}var Ye,Vr;function ue(){if(Vr)return Ye;Vr=1;var e=Pi(),t=Mi();function r(n,a){var o=t(n,a);return e(o)?o:void 0}return Ye=r,Ye}var Je,Xr;function fr(){if(Xr)return Je;Xr=1;var e=ue(),t=ie(),r=e(t,"Map");return Je=r,Je}var Ze,Yr;function qe(){if(Yr)return Ze;Yr=1;var e=ue(),t=e(Object,"create");return Ze=t,Ze}var Qe,Jr;function Ai(){if(Jr)return Qe;Jr=1;var e=qe();function t(){this.__data__=e?e(null):{},this.size=0}return Qe=t,Qe}var et,Zr;function Di(){if(Zr)return et;Zr=1;function e(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r}return et=e,et}var tt,Qr;function $i(){if(Qr)return tt;Qr=1;var e=qe(),t="__lodash_hash_undefined__",r=Object.prototype,n=r.hasOwnProperty;function a(o){var i=this.__data__;if(e){var c=i[o];return c===t?void 0:c}return n.call(i,o)?i[o]:void 0}return tt=a,tt}var rt,en;function Ii(){if(en)return rt;en=1;var e=qe(),t=Object.prototype,r=t.hasOwnProperty;function n(a){var o=this.__data__;return e?o[a]!==void 0:r.call(o,a)}return rt=n,rt}var nt,tn;function ki(){if(tn)return nt;tn=1;var e=qe(),t="__lodash_hash_undefined__";function r(n,a){var o=this.__data__;return this.size+=this.has(n)?0:1,o[n]=e&&a===void 0?t:a,this}return nt=r,nt}var at,rn;function Bi(){if(rn)return at;rn=1;var e=Ai(),t=Di(),r=$i(),n=Ii(),a=ki();function o(i){var c=-1,u=i==null?0:i.length;for(this.clear();++c<u;){var d=i[c];this.set(d[0],d[1])}}return o.prototype.clear=e,o.prototype.delete=t,o.prototype.get=r,o.prototype.has=n,o.prototype.set=a,at=o,at}var ot,nn;function Gi(){if(nn)return ot;nn=1;var e=Bi(),t=Te(),r=fr();function n(){this.size=0,this.__data__={hash:new e,map:new(r||t),string:new e}}return ot=n,ot}var it,an;function zi(){if(an)return it;an=1;function e(t){var r=typeof t;return r=="string"||r=="number"||r=="symbol"||r=="boolean"?t!=="__proto__":t===null}return it=e,it}var st,on;function Oe(){if(on)return st;on=1;var e=zi();function t(r,n){var a=r.__data__;return e(n)?a[typeof n=="string"?"string":"hash"]:a.map}return st=t,st}var ct,sn;function Hi(){if(sn)return ct;sn=1;var e=Oe();function t(r){var n=e(this,r).delete(r);return this.size-=n?1:0,n}return ct=t,ct}var lt,cn;function Ni(){if(cn)return lt;cn=1;var e=Oe();function t(r){return e(this,r).get(r)}return lt=t,lt}var ut,ln;function Li(){if(ln)return ut;ln=1;var e=Oe();function t(r){return e(this,r).has(r)}return ut=t,ut}var dt,un;function Ui(){if(un)return dt;un=1;var e=Oe();function t(r,n){var a=e(this,r),o=a.size;return a.set(r,n),this.size+=a.size==o?0:1,this}return dt=t,dt}var ft,dn;function Oa(){if(dn)return ft;dn=1;var e=Gi(),t=Hi(),r=Ni(),n=Li(),a=Ui();function o(i){var c=-1,u=i==null?0:i.length;for(this.clear();++c<u;){var d=i[c];this.set(d[0],d[1])}}return o.prototype.clear=e,o.prototype.delete=t,o.prototype.get=r,o.prototype.has=n,o.prototype.set=a,ft=o,ft}var ht,fn;function Wi(){if(fn)return ht;fn=1;var e=Te(),t=fr(),r=Oa(),n=200;function a(o,i){var c=this.__data__;if(c instanceof e){var u=c.__data__;if(!t||u.length<n-1)return u.push([o,i]),this.size=++c.size,this;c=this.__data__=new r(u)}return c.set(o,i),this.size=c.size,this}return ht=a,ht}var pt,hn;function Ki(){if(hn)return pt;hn=1;var e=Te(),t=Ri(),r=ji(),n=Ti(),a=qi(),o=Wi();function i(c){var u=this.__data__=new e(c);this.size=u.size}return i.prototype.clear=t,i.prototype.delete=r,i.prototype.get=n,i.prototype.has=a,i.prototype.set=o,pt=i,pt}var gt,pn;function Fi(){if(pn)return gt;pn=1;var e="__lodash_hash_undefined__";function t(r){return this.__data__.set(r,e),this}return gt=t,gt}var vt,gn;function Vi(){if(gn)return vt;gn=1;function e(t){return this.__data__.has(t)}return vt=e,vt}var mt,vn;function Xi(){if(vn)return mt;vn=1;var e=Oa(),t=Fi(),r=Vi();function n(a){var o=-1,i=a==null?0:a.length;for(this.__data__=new e;++o<i;)this.add(a[o])}return n.prototype.add=n.prototype.push=t,n.prototype.has=r,mt=n,mt}var bt,mn;function Yi(){if(mn)return bt;mn=1;function e(t,r){for(var n=-1,a=t==null?0:t.length;++n<a;)if(r(t[n],n,t))return!0;return!1}return bt=e,bt}var yt,bn;function Ji(){if(bn)return yt;bn=1;function e(t,r){return t.has(r)}return yt=e,yt}var _t,yn;function Ea(){if(yn)return _t;yn=1;var e=Xi(),t=Yi(),r=Ji(),n=1,a=2;function o(i,c,u,d,p,g){var v=u&n,y=i.length,R=c.length;if(y!=R&&!(v&&R>y))return!1;var _=g.get(i),C=g.get(c);if(_&&C)return _==c&&C==i;var j=-1,x=!0,E=u&a?new e:void 0;for(g.set(i,c),g.set(c,i);++j<y;){var T=i[j],A=c[j];if(d)var S=v?d(A,T,j,c,i,g):d(T,A,j,i,c,g);if(S!==void 0){if(S)continue;x=!1;break}if(E){if(!t(c,function(l,f){if(!r(E,f)&&(T===l||p(T,l,u,d,g)))return E.push(f)})){x=!1;break}}else if(!(T===A||p(T,A,u,d,g))){x=!1;break}}return g.delete(i),g.delete(c),x}return _t=o,_t}var xt,_n;function Zi(){if(_n)return xt;_n=1;var e=ie(),t=e.Uint8Array;return xt=t,xt}var Ct,xn;function Qi(){if(xn)return Ct;xn=1;function e(t){var r=-1,n=Array(t.size);return t.forEach(function(a,o){n[++r]=[o,a]}),n}return Ct=e,Ct}var wt,Cn;function es(){if(Cn)return wt;Cn=1;function e(t){var r=-1,n=Array(t.size);return t.forEach(function(a){n[++r]=a}),n}return wt=e,wt}var St,wn;function ts(){if(wn)return St;wn=1;var e=Do(),t=Zi(),r=ja(),n=Ea(),a=Qi(),o=es(),i=1,c=2,u="[object Boolean]",d="[object Date]",p="[object Error]",g="[object Map]",v="[object Number]",y="[object RegExp]",R="[object Set]",_="[object String]",C="[object Symbol]",j="[object ArrayBuffer]",x="[object DataView]",E=e?e.prototype:void 0,T=E?E.valueOf:void 0;function A(S,l,f,b,h,m,q){switch(f){case x:if(S.byteLength!=l.byteLength||S.byteOffset!=l.byteOffset)return!1;S=S.buffer,l=l.buffer;case j:return!(S.byteLength!=l.byteLength||!m(new t(S),new t(l)));case u:case d:case v:return r(+S,+l);case p:return S.name==l.name&&S.message==l.message;case y:case _:return S==l+"";case g:var M=a;case R:var O=b&i;if(M||(M=o),S.size!=l.size&&!O)return!1;var G=q.get(S);if(G)return G==l;b|=c,q.set(S,l);var L=n(M(S),M(l),b,h,m,q);return q.delete(S),L;case C:if(T)return T.call(S)==T.call(l)}return!1}return St=A,St}var Rt,Sn;function rs(){if(Sn)return Rt;Sn=1;function e(t,r){for(var n=-1,a=r.length,o=t.length;++n<a;)t[o+n]=r[n];return t}return Rt=e,Rt}var jt,Rn;function hr(){if(Rn)return jt;Rn=1;var e=Array.isArray;return jt=e,jt}var Tt,jn;function ns(){if(jn)return Tt;jn=1;var e=rs(),t=hr();function r(n,a,o){var i=a(n);return t(n)?i:e(i,o(n))}return Tt=r,Tt}var qt,Tn;function as(){if(Tn)return qt;Tn=1;function e(t,r){for(var n=-1,a=t==null?0:t.length,o=0,i=[];++n<a;){var c=t[n];r(c,n,t)&&(i[o++]=c)}return i}return qt=e,qt}var Ot,qn;function os(){if(qn)return Ot;qn=1;function e(){return[]}return Ot=e,Ot}var Et,On;function is(){if(On)return Et;On=1;var e=as(),t=os(),r=Object.prototype,n=r.propertyIsEnumerable,a=Object.getOwnPropertySymbols,o=a?function(i){return i==null?[]:(i=Object(i),e(a(i),function(c){return n.call(i,c)}))}:t;return Et=o,Et}var Pt,En;function ss(){if(En)return Pt;En=1;function e(t,r){for(var n=-1,a=Array(t);++n<t;)a[n]=r(n);return a}return Pt=e,Pt}var Mt,Pn;function cs(){if(Pn)return Mt;Pn=1;var e=we(),t=Se(),r="[object Arguments]";function n(a){return t(a)&&e(a)==r}return Mt=n,Mt}var At,Mn;function ls(){if(Mn)return At;Mn=1;var e=cs(),t=Se(),r=Object.prototype,n=r.hasOwnProperty,a=r.propertyIsEnumerable,o=e((function(){return arguments})())?e:function(i){return t(i)&&n.call(i,"callee")&&!a.call(i,"callee")};return At=o,At}var pe={exports:{}},Dt,An;function us(){if(An)return Dt;An=1;function e(){return!1}return Dt=e,Dt}pe.exports;var Dn;function Pa(){return Dn||(Dn=1,(function(e,t){var r=ie(),n=us(),a=t&&!t.nodeType&&t,o=a&&!0&&e&&!e.nodeType&&e,i=o&&o.exports===a,c=i?r.Buffer:void 0,u=c?c.isBuffer:void 0,d=u||n;e.exports=d})(pe,pe.exports)),pe.exports}var $t,$n;function ds(){if($n)return $t;$n=1;var e=9007199254740991,t=/^(?:0|[1-9]\d*)$/;function r(n,a){var o=typeof n;return a=a??e,!!a&&(o=="number"||o!="symbol"&&t.test(n))&&n>-1&&n%1==0&&n<a}return $t=r,$t}var It,In;function Ma(){if(In)return It;In=1;var e=9007199254740991;function t(r){return typeof r=="number"&&r>-1&&r%1==0&&r<=e}return It=t,It}var kt,kn;function fs(){if(kn)return kt;kn=1;var e=we(),t=Ma(),r=Se(),n="[object Arguments]",a="[object Array]",o="[object Boolean]",i="[object Date]",c="[object Error]",u="[object Function]",d="[object Map]",p="[object Number]",g="[object Object]",v="[object RegExp]",y="[object Set]",R="[object String]",_="[object WeakMap]",C="[object ArrayBuffer]",j="[object DataView]",x="[object Float32Array]",E="[object Float64Array]",T="[object Int8Array]",A="[object Int16Array]",S="[object Int32Array]",l="[object Uint8Array]",f="[object Uint8ClampedArray]",b="[object Uint16Array]",h="[object Uint32Array]",m={};m[x]=m[E]=m[T]=m[A]=m[S]=m[l]=m[f]=m[b]=m[h]=!0,m[n]=m[a]=m[C]=m[o]=m[j]=m[i]=m[c]=m[u]=m[d]=m[p]=m[g]=m[v]=m[y]=m[R]=m[_]=!1;function q(M){return r(M)&&t(M.length)&&!!m[e(M)]}return kt=q,kt}var Bt,Bn;function hs(){if(Bn)return Bt;Bn=1;function e(t){return function(r){return t(r)}}return Bt=e,Bt}var ge={exports:{}};ge.exports;var Gn;function ps(){return Gn||(Gn=1,(function(e,t){var r=$o(),n=t&&!t.nodeType&&t,a=n&&!0&&e&&!e.nodeType&&e,o=a&&a.exports===n,i=o&&r.process,c=(function(){try{var u=a&&a.require&&a.require("util").types;return u||i&&i.binding&&i.binding("util")}catch{}})();e.exports=c})(ge,ge.exports)),ge.exports}var Gt,zn;function Aa(){if(zn)return Gt;zn=1;var e=fs(),t=hs(),r=ps(),n=r&&r.isTypedArray,a=n?t(n):e;return Gt=a,Gt}var zt,Hn;function gs(){if(Hn)return zt;Hn=1;var e=ss(),t=ls(),r=hr(),n=Pa(),a=ds(),o=Aa(),i=Object.prototype,c=i.hasOwnProperty;function u(d,p){var g=r(d),v=!g&&t(d),y=!g&&!v&&n(d),R=!g&&!v&&!y&&o(d),_=g||v||y||R,C=_?e(d.length,String):[],j=C.length;for(var x in d)(p||c.call(d,x))&&!(_&&(x=="length"||y&&(x=="offset"||x=="parent")||R&&(x=="buffer"||x=="byteLength"||x=="byteOffset")||a(x,j)))&&C.push(x);return C}return zt=u,zt}var Ht,Nn;function vs(){if(Nn)return Ht;Nn=1;var e=Object.prototype;function t(r){var n=r&&r.constructor,a=typeof n=="function"&&n.prototype||e;return r===a}return Ht=t,Ht}var Nt,Ln;function ms(){if(Ln)return Nt;Ln=1;function e(t,r){return function(n){return t(r(n))}}return Nt=e,Nt}var Lt,Un;function bs(){if(Un)return Lt;Un=1;var e=ms(),t=e(Object.keys,Object);return Lt=t,Lt}var Ut,Wn;function ys(){if(Wn)return Ut;Wn=1;var e=vs(),t=bs(),r=Object.prototype,n=r.hasOwnProperty;function a(o){if(!e(o))return t(o);var i=[];for(var c in Object(o))n.call(o,c)&&c!="constructor"&&i.push(c);return i}return Ut=a,Ut}var Wt,Kn;function _s(){if(Kn)return Wt;Kn=1;var e=Ta(),t=Ma();function r(n){return n!=null&&t(n.length)&&!e(n)}return Wt=r,Wt}var Kt,Fn;function xs(){if(Fn)return Kt;Fn=1;var e=gs(),t=ys(),r=_s();function n(a){return r(a)?e(a):t(a)}return Kt=n,Kt}var Ft,Vn;function Cs(){if(Vn)return Ft;Vn=1;var e=ns(),t=is(),r=xs();function n(a){return e(a,r,t)}return Ft=n,Ft}var Vt,Xn;function ws(){if(Xn)return Vt;Xn=1;var e=Cs(),t=1,r=Object.prototype,n=r.hasOwnProperty;function a(o,i,c,u,d,p){var g=c&t,v=e(o),y=v.length,R=e(i),_=R.length;if(y!=_&&!g)return!1;for(var C=y;C--;){var j=v[C];if(!(g?j in i:n.call(i,j)))return!1}var x=p.get(o),E=p.get(i);if(x&&E)return x==i&&E==o;var T=!0;p.set(o,i),p.set(i,o);for(var A=g;++C<y;){j=v[C];var S=o[j],l=i[j];if(u)var f=g?u(l,S,j,i,o,p):u(S,l,j,o,i,p);if(!(f===void 0?S===l||d(S,l,c,u,p):f)){T=!1;break}A||(A=j=="constructor")}if(T&&!A){var b=o.constructor,h=i.constructor;b!=h&&"constructor"in o&&"constructor"in i&&!(typeof b=="function"&&b instanceof b&&typeof h=="function"&&h instanceof h)&&(T=!1)}return p.delete(o),p.delete(i),T}return Vt=a,Vt}var Xt,Yn;function Ss(){if(Yn)return Xt;Yn=1;var e=ue(),t=ie(),r=e(t,"DataView");return Xt=r,Xt}var Yt,Jn;function Rs(){if(Jn)return Yt;Jn=1;var e=ue(),t=ie(),r=e(t,"Promise");return Yt=r,Yt}var Jt,Zn;function js(){if(Zn)return Jt;Zn=1;var e=ue(),t=ie(),r=e(t,"Set");return Jt=r,Jt}var Zt,Qn;function Ts(){if(Qn)return Zt;Qn=1;var e=ue(),t=ie(),r=e(t,"WeakMap");return Zt=r,Zt}var Qt,ea;function qs(){if(ea)return Qt;ea=1;var e=Ss(),t=fr(),r=Rs(),n=js(),a=Ts(),o=we(),i=qa(),c="[object Map]",u="[object Object]",d="[object Promise]",p="[object Set]",g="[object WeakMap]",v="[object DataView]",y=i(e),R=i(t),_=i(r),C=i(n),j=i(a),x=o;return(e&&x(new e(new ArrayBuffer(1)))!=v||t&&x(new t)!=c||r&&x(r.resolve())!=d||n&&x(new n)!=p||a&&x(new a)!=g)&&(x=function(E){var T=o(E),A=T==u?E.constructor:void 0,S=A?i(A):"";if(S)switch(S){case y:return v;case R:return c;case _:return d;case C:return p;case j:return g}return T}),Qt=x,Qt}var er,ta;function Os(){if(ta)return er;ta=1;var e=Ki(),t=Ea(),r=ts(),n=ws(),a=qs(),o=hr(),i=Pa(),c=Aa(),u=1,d="[object Arguments]",p="[object Array]",g="[object Object]",v=Object.prototype,y=v.hasOwnProperty;function R(_,C,j,x,E,T){var A=o(_),S=o(C),l=A?p:a(_),f=S?p:a(C);l=l==d?g:l,f=f==d?g:f;var b=l==g,h=f==g,m=l==f;if(m&&i(_)){if(!i(C))return!1;A=!0,b=!1}if(m&&!b)return T||(T=new e),A||c(_)?t(_,C,j,x,E,T):r(_,C,l,j,x,E,T);if(!(j&u)){var q=b&&y.call(_,"__wrapped__"),M=h&&y.call(C,"__wrapped__");if(q||M){var O=q?_.value():_,G=M?C.value():C;return T||(T=new e),E(O,G,j,x,T)}}return m?(T||(T=new e),n(_,C,j,x,E,T)):!1}return er=R,er}var tr,ra;function Es(){if(ra)return tr;ra=1;var e=Os(),t=Se();function r(n,a,o,i,c){return n===a?!0:n==null||a==null||!t(n)&&!t(a)?n!==n&&a!==a:e(n,a,o,i,r,c)}return tr=r,tr}var rr,na;function Ps(){if(na)return rr;na=1;var e=Es();function t(r,n){return e(r,n)}return rr=t,rr}var Ms=Ps();const ur=ua(Ms),pr={dark:{default:{borderWidth:1,pieceSize:20,gapBetweenPieces:4,borderColor:te("#fff",.28),completeColor:be.dark.primary,backgroundColor:"#1a2822",readerColor:"#0a0a0a",readerHaloColor:te("#fff",.55),rangeColor:"#cda184",rangeEmptyColor:te("#cda184",.3)},mini:{cacheMaxHeight:420,borderWidth:2,pieceSize:26,gapBetweenPieces:5,borderColor:te("#fff",.32),completeColor:be.dark.primary,backgroundColor:"#1f3028",readerColor:"#0a0a0a",readerHaloColor:te("#fff",.5),rangeColor:"#cda184",rangeEmptyColor:te("#cda184",.32)}},light:{default:{borderWidth:1,pieceSize:20,gapBetweenPieces:4,borderColor:"#d0e6da",completeColor:be.light.primary,backgroundColor:"#ffffff",readerColor:"#000",readerHaloColor:te("#fff",.9),rangeColor:"#7e6bc4",rangeEmptyColor:te("#afa6e3",.32)},mini:{cacheMaxHeight:420,borderWidth:2,pieceSize:26,gapBetweenPieces:5,borderColor:"#b7d9c8",completeColor:be.light.primary,backgroundColor:"#f4faf7",readerColor:"#0a0a0a",readerHaloColor:te("#fff",.9),rangeColor:"#7e6bc4",rangeEmptyColor:te("#afa6e3",.36)}}},As=(e,t,r,n=0)=>{const a=e.pieceSize,o=e.gapBetweenPieces;if(!t||t<=0)return{pieceSize:a,gap:o};if(r){const i=t<280?7:t<400?9:11,c=Math.floor((t-8)/i)-o;return{pieceSize:Math.max(22,Math.min(28,c>0?c:a)),gap:Math.max(4,Math.min(o,6))}}return{pieceSize:Math.max(18,a),gap:Math.max(4,o)}},aa=B.div`
  margin-top: 10px;
  text-transform: uppercase;
  align-self: center;
  color: ${({$themeType:e})=>e==="dark"?"rgba(255, 255, 255, 0.55)":"rgba(0, 0, 0, 0.5)"};
`,Ds=B.div`
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
`,$s=B.div`
  width: 100%;
  min-width: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  position: relative;

  ${({$isMini:e,$themeType:t})=>e?H`
          display: grid;
          justify-content: center;
          max-height: ${pr[t??"light"].mini.cacheMaxHeight}px;
        `:H`
          max-height: min(70dvh, 640px);
        `}

  canvas {
    display: block;
    max-width: 100%;
  }
`,Is=e=>Math.max(0,Math.min(1,e)),ks=(e,t,r,n,a)=>{e.fillStyle=n,e.fillRect(0,0,t,t);const o=Is(r/100);if(o<=0)return;if(o>=1){e.fillStyle=a,e.fillRect(0,0,t,t);return}const i=Math.max(2,Math.round(t*o));e.fillStyle=a,e.fillRect(0,t-i,t,Math.min(i,t))},de=(e,t,r,n)=>{const a=n/2;e.lineWidth=n,e.strokeStyle=r,e.strokeRect(a,a,t-n,t-n)},Bs=({ctx:e,cells:t,canvasWidth:r,canvasHeight:n,piecesInOneRow:a,pieceSize:o,gap:i,startingX:c,theme:u,variant:d,isSnakeDebugMode:p,isMini:g})=>{const v=pr[u][d],{borderWidth:y,backgroundColor:R,borderColor:_,completeColor:C,readerColor:j,readerHaloColor:x,rangeColor:E,rangeEmptyColor:T}=v;e.clearRect(0,0,r,n),e.imageSmoothingEnabled=!1;const A=y%2===1?.5:0,S=u==="dark",l=T||(S?"rgba(205, 161, 132, 0.28)":"rgba(175, 166, 227, 0.32)");for(let f=0;f<t.length;f++){const b=t[f]||{percentage:0,priority:0},h=b.percentage||0,m=!!b.completed||h>=100,q=h>0&&!m,M=!!b.isReader,O=!!b.isReaderRange,G=f%a,L=Math.floor(f/a),N=c+G*(o+i)+A,U=L*(o+i)+A;e.save(),e.translate(N,U);const $=O&&!m&&!q?l:R;if(ks(e,o,m?100:h,$,q||m?C:$),M?(x&&de(e,o,x,g?4:3),de(e,o,j,g?2.5:2)):O?de(e,o,E,2):q||m?de(e,o,C,Math.max(y,2)):de(e,o,_,y),p){const W=ya(b.priority||0);if(W){const K=Math.max(9,Math.min(g?13:11,Math.floor(o*.55)));e.font=`bold ${K}px ui-monospace, SFMono-Regular, Menlo, monospace`,e.textAlign="center",e.textBaseline="middle";const P=o/2,D=o/2;e.lineWidth=3,e.strokeStyle=S?"rgba(0,0,0,0.85)":"rgba(255,255,255,0.95)",e.strokeText(W,P,D),e.fillStyle=S?"#fff":"#1a1a1a",e.fillText(W,P,D)}}e.restore()}},Gs=(e,t,r)=>{const n=Math.min(window.devicePixelRatio||1,2);e.width=Math.max(1,Math.round(t*n)),e.height=Math.max(1,Math.round(r*n)),e.style.width=`${t}px`,e.style.height=`${r}px`;const a=e.getContext("2d");return a?(a.setTransform(n,0,0,n,0,0),a):null},zs=(e,t,r)=>{const{piecesInOneRow:n,pieceSize:a,gap:o,startingX:i,cellCount:c}=r;if(n<1||c<1||a<=0)return-1;const u=a+o,d=e-i;if(d<0||t<0)return-1;const p=Math.floor(d/u),g=Math.floor(t/u);if(p<0||p>=n)return-1;const v=d-p*u,y=t-g*u;if(v>a||y>a)return-1;const R=g*n+p;return R<0||R>=c?-1:R},Hs=()=>({percentage:0,priority:0,isReader:!1,isReaderRange:!1}),Ns=({cache:e,isMini:t,mode:r,isSnakeDebugMode:n})=>{const{t:a}=X(),i=(r||(t?"mini":"detailed"))==="mini",[c,u]=w.useState({width:0,height:0}),{width:d}=c,p=w.useRef(null),g=w.useRef(null),v=w.useRef(null),y=w.useRef(0),R=w.useRef(!0),_=w.useRef(0),[C,j]=w.useState(null),x=w.useMemo(()=>Wo(d,i),[d,i]),E=Xo(e,x),T=E.cells,A=i?"mini":"default",{isDarkMode:S}=w.useContext(da),l=S?cr.DARK:cr.LIGHT,f=pr[l][A],{cacheMaxHeight:b}=f,{pieceSize:h,gap:m}=w.useMemo(()=>As(f,d,i,T.length),[f,d,i,T.length]),q=d>0?i?Math.max(d-8,d*.96):d:0,M=h+m,O=q>0?Math.max(1,Math.floor(q/M)):0,G=w.useMemo(()=>O?T:[],[T,O]),L=O>0?Math.ceil((q-M*O)/2):0,N=i?4:6,U=O>0?Math.max(G.length>0?Math.ceil(G.length/O):N,N)*M:0,$=w.useMemo(()=>G.length>0?G:Array.from({length:Math.max(O,1)*N},Hs),[G,O,N]);w.useEffect(()=>{const P=p.current;if(!(!P||!q||!U||!O))return cancelAnimationFrame(y.current),y.current=requestAnimationFrame(()=>{const D=Gs(P,q,U);D&&Bs({ctx:D,cells:$,canvasWidth:q,canvasHeight:U,piecesInOneRow:O,pieceSize:h,gap:m,startingX:L,theme:l,variant:A,isSnakeDebugMode:n,isMini:i})}),()=>cancelAnimationFrame(y.current)},[U,q,O,L,h,m,$,A,i,l,n]),w.useEffect(()=>{if(!g.current||!O||M<=0||!R.current)return;const P=_a(e,x);if(!P||E.windowStart==null)return;const D=P.readerPiece-E.windowStart;if(D<0)return;const Y=Math.floor(D/O)*M,J=g.current,ee=J.scrollTop,ce=ee+J.clientHeight;(Y<ee||Y+M>ce)&&(J.scrollTop=Math.max(0,Y-J.clientHeight/3))},[e,x,E.windowStart,O,M,$]),w.useEffect(()=>{const P=g.current;if(!P)return;const D=()=>{R.current=!1,window.clearTimeout(_.current),_.current=window.setTimeout(()=>{R.current=!0},4e3)};return P.addEventListener("wheel",D,{passive:!0}),P.addEventListener("touchstart",D,{passive:!0}),P.addEventListener("pointerdown",D),()=>{window.clearTimeout(_.current),P.removeEventListener("wheel",D),P.removeEventListener("touchstart",D),P.removeEventListener("pointerdown",D)}},[d]);const W=w.useCallback(P=>{const D=P.pieceStart,F=P.pieceEnd;if(D==null)return"";const Y=P.completed||(P.percentage||0)>=99.5?100:Math.round(P.percentage||0),J=ya(P.priority||0),ee=J?` · ${J}`:"";return F!=null&&F!==D?a("SnakeTooltipBucket",{start:D,end:F,fill:Y})+ee:a("SnakeTooltipPiece",{id:D,fill:Y})+ee},[a]),K=w.useCallback(P=>{if(!O){j(null);return}const D=p.current,F=v.current;if(!D||!F)return;const Y=D.getBoundingClientRect(),J=F.getBoundingClientRect(),ee=P.clientX-Y.left,ce=P.clientY-Y.top,I=zs(ee,ce,{piecesInOneRow:O,pieceSize:h,gap:m,startingX:L,cellCount:$.length});if(I<0){j(null);return}const z=W($[I]);if(!z){j(null);return}j({x:P.clientX-J.left+12,y:P.clientY-J.top+12,text:z})},[O,h,m,L,$,W]);return s.jsx(dr,{bounds:!0,onResize:({bounds:P})=>P&&u(P),children:({measureRef:P})=>s.jsxs("div",{style:{display:"flex",flexDirection:"column",width:"100%",minWidth:0,position:"relative"},ref:D=>{v.current=D,P(D)},children:[s.jsx($s,{ref:g,$themeType:l,$isMini:i,children:O>0&&U>0?s.jsx("canvas",{ref:p,onMouseMove:K,onMouseLeave:()=>j(null)}):null}),C&&s.jsx(Ds,{style:{left:C.x,top:C.y},children:C.text}),E.windowStart!=null&&E.windowEnd!=null&&E.windowEnd>=E.windowStart&&s.jsx(aa,{$themeType:l,children:a("SnakeFocusRange",{start:E.windowStart,end:E.windowEnd})}),i&&b!=null&&U>=b&&s.jsx(aa,{$themeType:l,children:a("ScrollDown")})]})})},Da=w.memo(Ns,(e,t)=>e.isMini===t.isMini&&e.mode===t.mode&&e.isSnakeDebugMode===t.isSnakeDebugMode&&ur(e.cache.Pieces,t.cache.Pieces)&&ur(e.cache.Readers,t.cache.Readers)&&e.cache.PiecesCount===t.cache.PiecesCount&&e.cache.PiecesLength===t.cache.PiecesLength&&e.cache.Capacity===t.cache.Capacity&&e.cache.Filled===t.cache.Filled),$a=H`
  ${({theme:{table:{defaultPrimaryColor:e}}})=>H`
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
`,Ls=B.table`
  ${({theme:{table:{defaultPrimaryColor:e,rowBGColor:t,viewedRowBGColor:r,dividerColor:n,rowFontColor:a,outlinedButtonBorderColor:o}}})=>H`
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

        ${$a}
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
        border-color: ${o};
      }
    }

    ${k("shortTable")} {
      display: none;
    }
  `}
`,Us=B.div`
  display: none;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);

  ${k("shortTable")} {
    display: grid;
  }

  ${k("tablet")} {
    gap: 15px;
    grid-template-columns: 1fr;
  }
`,Ws=B.div`
  ${({$isViewed:e,theme:{table:{defaultPrimaryColor:t,defaultSecondaryColor:r,defaultTertiaryColor:n,shortTableButtonsBGColor:a,viewedPrimaryColor:o,viewedSecondaryColor:i,viewedTertiaryColor:c}}})=>H`
    display: grid;
    width: 100%;
    grid-template-rows: repeat(3, max-content);
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

    .short-table {
      &-name {
        background: ${e?o:t};
        display: grid;
        place-items: center;
        padding: 15px;
        color: #fff;
        text-transform: uppercase;
        font-size: 13px;
        font-weight: 600;
        word-break: break-word;

        ${k("tablet")} {
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
        background: ${e?o:t};
        &:not(:last-child) {
          border-right: 1px solid ${e?o:t};
        }

        &-name {
          background: ${e?i:r};
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 500;
          display: grid;
          place-items: center;
          padding: 0 10px;

          ${k("tablet")} {
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

          ${k("tablet")} {
            font-size: 12px;
            padding: 10px 8px;
          }
        }
      }

      &-viewed-indicator {
        ${e&&$a}
      }

      &-buttons {
        padding: 12px;
        border-bottom: 2px solid ${e?o:t};
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
          min-height: 44px;
          font-size: 12px;
          padding: 6px 8px;
        }

        ${k("phone")} {
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
  `}
`;var fe={},nr,oa;function Ks(){return oa||(oa=1,nr=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,r=[],n=0;n<e.rangeCount;n++)r.push(e.getRangeAt(n));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||r.forEach(function(a){e.addRange(a)}),t&&t.focus()}}),nr}var ar,ia;function Fs(){if(ia)return ar;ia=1;var e=Ks(),t={"text/plain":"Text","text/html":"Url",default:"Text"},r="Copy to clipboard: #{key}, Enter";function n(o){var i=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return o.replace(/#{\s*key\s*}/g,i)}function a(o,i){var c,u,d,p,g,v,y=!1;i||(i={}),c=i.debug||!1;try{d=e(),p=document.createRange(),g=document.getSelection(),v=document.createElement("span"),v.textContent=o,v.ariaHidden="true",v.style.all="unset",v.style.position="fixed",v.style.top=0,v.style.clip="rect(0, 0, 0, 0)",v.style.whiteSpace="pre",v.style.webkitUserSelect="text",v.style.MozUserSelect="text",v.style.msUserSelect="text",v.style.userSelect="text",v.addEventListener("copy",function(_){if(_.stopPropagation(),i.format)if(_.preventDefault(),typeof _.clipboardData>"u"){c&&console.warn("unable to use e.clipboardData"),c&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var C=t[i.format]||t.default;window.clipboardData.setData(C,o)}else _.clipboardData.clearData(),_.clipboardData.setData(i.format,o);i.onCopy&&(_.preventDefault(),i.onCopy(_.clipboardData))}),document.body.appendChild(v),p.selectNodeContents(v),g.addRange(p);var R=document.execCommand("copy");if(!R)throw new Error("copy command was unsuccessful");y=!0}catch(_){c&&console.error("unable to copy using execCommand: ",_),c&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(i.format||"text",o),i.onCopy&&i.onCopy(window.clipboardData),y=!0}catch(C){c&&console.error("unable to copy using clipboardData: ",C),c&&console.error("falling back to prompt"),u=n("message"in i?i.message:r),window.prompt(u,o)}}finally{g&&(typeof g.removeRange=="function"?g.removeRange(p):g.removeAllRanges()),v&&document.body.removeChild(v),d()}return y}return ar=a,ar}var sa;function Vs(){if(sa)return fe;sa=1,Object.defineProperty(fe,"__esModule",{value:!0}),fe.CopyToClipboard=void 0;var e=n(Fs()),t=n(La()),r=["text","onCopy","options","children"];function n(l){return l&&l.__esModule?l:{default:l}}function a(l){"@babel/helpers - typeof";return a=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(f){return typeof f}:function(f){return f&&typeof Symbol=="function"&&f.constructor===Symbol&&f!==Symbol.prototype?"symbol":typeof f},a(l)}function o(l,f){var b=Object.keys(l);if(Object.getOwnPropertySymbols){var h=Object.getOwnPropertySymbols(l);f&&(h=h.filter(function(m){return Object.getOwnPropertyDescriptor(l,m).enumerable})),b.push.apply(b,h)}return b}function i(l){for(var f=1;f<arguments.length;f++){var b=arguments[f]!=null?arguments[f]:{};f%2?o(Object(b),!0).forEach(function(h){E(l,h,b[h])}):Object.getOwnPropertyDescriptors?Object.defineProperties(l,Object.getOwnPropertyDescriptors(b)):o(Object(b)).forEach(function(h){Object.defineProperty(l,h,Object.getOwnPropertyDescriptor(b,h))})}return l}function c(l,f){if(l==null)return{};var b,h,m=u(l,f);if(Object.getOwnPropertySymbols){var q=Object.getOwnPropertySymbols(l);for(h=0;h<q.length;h++)b=q[h],f.indexOf(b)===-1&&{}.propertyIsEnumerable.call(l,b)&&(m[b]=l[b])}return m}function u(l,f){if(l==null)return{};var b={};for(var h in l)if({}.hasOwnProperty.call(l,h)){if(f.indexOf(h)!==-1)continue;b[h]=l[h]}return b}function d(l,f){if(!(l instanceof f))throw new TypeError("Cannot call a class as a function")}function p(l,f){for(var b=0;b<f.length;b++){var h=f[b];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(l,T(h.key),h)}}function g(l,f,b){return f&&p(l.prototype,f),Object.defineProperty(l,"prototype",{writable:!1}),l}function v(l,f,b){return f=C(f),y(l,_()?Reflect.construct(f,b||[],C(l).constructor):f.apply(l,b))}function y(l,f){if(f&&(a(f)=="object"||typeof f=="function"))return f;if(f!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return R(l)}function R(l){if(l===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return l}function _(){try{var l=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(_=function(){return!!l})()}function C(l){return C=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(f){return f.__proto__||Object.getPrototypeOf(f)},C(l)}function j(l,f){if(typeof f!="function"&&f!==null)throw new TypeError("Super expression must either be null or a function");l.prototype=Object.create(f&&f.prototype,{constructor:{value:l,writable:!0,configurable:!0}}),Object.defineProperty(l,"prototype",{writable:!1}),f&&x(l,f)}function x(l,f){return x=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(b,h){return b.__proto__=h,b},x(l,f)}function E(l,f,b){return(f=T(f))in l?Object.defineProperty(l,f,{value:b,enumerable:!0,configurable:!0,writable:!0}):l[f]=b,l}function T(l){var f=A(l,"string");return a(f)=="symbol"?f:f+""}function A(l,f){if(a(l)!="object"||!l)return l;var b=l[Symbol.toPrimitive];if(b!==void 0){var h=b.call(l,f);if(a(h)!="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return(f==="string"?String:Number)(l)}var S=fe.CopyToClipboard=(function(l){function f(){var b;d(this,f);for(var h=arguments.length,m=new Array(h),q=0;q<h;q++)m[q]=arguments[q];return b=v(this,f,[].concat(m)),E(b,"onClick",function(M){var O=b.props,G=O.text,L=O.onCopy,N=O.children,U=O.options,$=t.default.Children.only(N),W=(0,e.default)(G,U);L&&L(G,W),$!=null&&$.props&&typeof $.props.onClick=="function"&&$.props.onClick(M)}),b}return j(f,l),g(f,[{key:"render",value:function(){var h=this.props;h.text,h.onCopy,h.options;var m=h.children,q=c(h,r),M=t.default.Children.only(m);return t.default.cloneElement(M,i(i({},q),{},{onClick:this.onClick}))}}])})(t.default.PureComponent);return E(S,"defaultProps",{onCopy:void 0,options:void 0}),fe}var or,ca;function Xs(){if(ca)return or;ca=1;var e=Vs(),t=e.CopyToClipboard;return t.CopyToClipboard=t,or=t,or}var Ia=Xs();const Ys=ua(Ia),_e={width:"100%",minWidth:0};function la({preloadLabel:e,onPreload:t,playerSupported:r,playerTitle:n,playerSrc:a,downloadSrc:o,hls:i,heartbeatSrc:c,onPlayerNotSupported:u,openLinkHref:d,showOpenLink:p,copyText:g,externalPlayers:v}){const{t:y}=X(),R=fa();return s.jsxs("div",{className:"button-cell",children:[s.jsx(Pe,{title:e,children:s.jsx(Z,{onClick:t,variant:"outlined",color:"primary",size:"small",sx:_e,children:e})}),r?s.jsx(Ka,{title:n,videoSrc:a,downloadSrc:o,hls:i,heartbeatSrc:c,onNotSupported:u,inlineTrigger:!0}):p&&d&&s.jsx(Pe,{title:y("OpenLink"),children:s.jsx(Z,{component:"a",href:d,target:"_blank",rel:"noreferrer",variant:"outlined",color:"primary",size:"small",sx:_e,children:y("OpenLink")})}),v.map(_=>s.jsx(Pe,{title:_.label,children:s.jsx(Z,{component:"a",href:_.href,variant:"outlined",color:"primary",size:"small",sx:_e,children:_.label})},_.label)),s.jsx(Ys,{text:g,onCopy:()=>R==null?void 0:R.showToast({message:y("Copied",{defaultValue:"Copied"}),severity:"success"}),children:s.jsx(Z,{variant:"outlined",color:"primary",size:"small",sx:_e,children:y("CopyLink")})})]})}Q.addHandler("episode",/(\d{1,4})[- |. ]серия|серия[- |. ](\d{1,4})/i,{type:"integer"});Q.addHandler("season",/sezon[- |. ](\d{1,3})|(\d{1,3})[- |. ]sezon/i,{type:"integer"});Q.addHandler("season",/сезон[- |. ](\d{1,3})|(\d{1,3})[- |. ]сезон/i,{type:"integer"});const Js=w.memo(({playableFileList:e,viewedFileList:t,selectedSeason:r,seasonAmount:n,hash:a})=>{const{t:o}=X(),[i,c]=w.useState({}),u=Fa(),d=h=>fetch(`${mr()}?link=${a}&index=${h}&preload`),p=(h,m)=>`${mr()}/${encodeURIComponent(h.split("\\").pop().split("/").pop())}?link=${a}&index=${m}&play`,g=(h,m)=>{const q=Ja(h,u);return{key:`${m}:${q?"gst":"stream"}`,src:q?Qa(a,m):p(h,m),hls:q,heartbeatSrc:q?Za(a):""}},v=h=>{c(m=>({...m,[h]:!0}))},y=!!(e!=null&&e.find(({path:h})=>Q.parse(h).episode)),R=!!(e!=null&&e.find(({path:h})=>Q.parse(h).season)),_=!!(e!=null&&e.find(({path:h})=>Q.parse(h).resolution)),C=((e==null?void 0:e.length)??0)>1&&!y,j=he("isVlcUsed"),x=he("isInfuseUsed"),E=he("isSenPlayerUsed"),T=he("isIinaUsed"),A=Va(),S=Xa(),l=Ya(),f=!A||!(l&&x)&&!(l&&E)&&!j&&!(S&&T),b=(h,m,q,M)=>{const O=[];return l&&x&&O.push({label:o("Infuse"),href:m}),l&&E&&O.push({label:o("SenPlayer"),href:q}),j&&O.push({label:"VLC",href:`vlc://${h}`}),S&&T&&O.push({label:"IINA",href:M}),O};return e!=null&&e.length?s.jsxs(s.Fragment,{children:[s.jsxs(Ls,{children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{style:{width:"0"},children:o("Viewed")}),s.jsx("th",{children:o("Name")}),R&&(n==null?void 0:n.length)===1&&s.jsx("th",{style:{width:"0"},children:o("Season")}),y&&s.jsx("th",{style:{width:"0"},children:o("Episode")}),_&&s.jsx("th",{style:{width:"0"},children:o("Resolution")}),s.jsx("th",{style:{width:"100px"},children:o("Size")}),s.jsx("th",{style:{width:"340px"},children:o("Actions")})]})}),s.jsx("tbody",{children:e.map(({id:h,path:m,length:q})=>{const{title:M,resolution:O,episode:G,season:L}=Q.parse(m),N=t==null?void 0:t.includes(h),U=p(m,h),$=g(m,h),W=!i[$.key],K=new URL(U,window.location.href),P=`infuse://x-callback-url/play?url=${encodeURIComponent(K.toString())}`,D=`senplayer://x-callback-url/play?url=${encodeURIComponent(K.toString())}`,F=`iina://weblink?url=${encodeURIComponent(K.toString())}`;return(L===r||!(n!=null&&n.length))&&s.jsxs("tr",{className:N?"viewed-file-row":void 0,children:[s.jsx("td",{"data-label":"viewed","aria-label":"viewed",className:N?"viewed-file-indicator":void 0}),s.jsx("td",{"data-label":"name",children:C?m:M}),R&&(n==null?void 0:n.length)===1&&s.jsx("td",{"data-label":"season",children:L}),y&&s.jsx("td",{"data-label":"episode",children:G}),_&&s.jsx("td",{"data-label":"resolution",children:O}),s.jsx("td",{"data-label":"size",children:oe(q)}),s.jsx("td",{children:s.jsx(la,{preloadLabel:o("Preload"),onPreload:()=>d(h),playerSupported:W,playerTitle:M,playerSrc:$.src,downloadSrc:U,hls:$.hls,heartbeatSrc:$.heartbeatSrc,onPlayerNotSupported:()=>v($.key),openLinkHref:U,showOpenLink:f,copyText:K.toString(),externalPlayers:b(K,P,D,F)})})]},h)})})]}),s.jsx(Us,{children:e.map(({id:h,path:m,length:q})=>{const{title:M,resolution:O,episode:G,season:L}=Q.parse(m),N=t==null?void 0:t.includes(h),U=p(m,h),$=g(m,h),W=!i[$.key],K=new URL(U,window.location.href),P=`infuse://x-callback-url/play?url=${encodeURIComponent(K.toString())}`,D=`senplayer://x-callback-url/play?url=${encodeURIComponent(K.toString())}`,F=`iina://weblink?url=${encodeURIComponent(K.toString())}`;return(L===r||!(n!=null&&n.length))&&s.jsxs(Ws,{$isViewed:N,children:[s.jsx("div",{className:"short-table-name",children:C?m:M}),s.jsxs("div",{className:"short-table-data",children:[N&&s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:o("Viewed")}),s.jsx("div",{className:"short-table-field-value",children:s.jsx("div",{className:"short-table-viewed-indicator"})})]}),R&&(n==null?void 0:n.length)===1&&s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:o("Season")}),s.jsx("div",{className:"short-table-field-value",children:L})]}),y&&s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:o("Episode")}),s.jsx("div",{className:"short-table-field-value",children:G})]}),_&&s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:o("Resolution")}),s.jsx("div",{className:"short-table-field-value",children:O})]}),s.jsxs("div",{className:"short-table-field",children:[s.jsx("div",{className:"short-table-field-name",children:o("Size")}),s.jsx("div",{className:"short-table-field-value",children:oe(q)})]})]}),s.jsx("div",{className:"short-table-buttons",children:s.jsx(la,{preloadLabel:o("Preload"),onPreload:()=>d(h),playerSupported:W,playerTitle:M,playerSrc:$.src,downloadSrc:U,hls:$.hls,heartbeatSrc:$.heartbeatSrc,onPlayerNotSupported:()=>v($.key),openLinkHref:U,showOpenLink:f,copyText:K.toString(),externalPlayers:b(K,P,D,F)})})]},h)})})]}):o("NoPlayableFiles")},(e,t)=>ur(e,t)),Zs=B.div`
  display: grid;
  grid-template-columns: minmax(0, 70%) minmax(0, 1fr);
  grid-template-rows: repeat(2, min-content);
  grid-template-areas:
    'main cache'
    'file-list file-list';
  min-width: 0;

  /* Stack main|cache when dialog is in the fullscreen band (≤960) */
  ${k("dialog")} {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: repeat(3, min-content);
    grid-template-areas:
      'main'
      'cache'
      'file-list';
  }
`,Qs=B.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
`,ec=B.div`
  ${({$poster:e,theme:{dialogTorrentDetailsContent:{posterBGColor:t}}})=>H`
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
            background: ${t};

            svg {
              transform: scale(2.5) translateY(-3px);
            }
          `}

    ${k("desktop")} {
      align-self: start;
    }

    ${k("tablet")} {
      ${e?H`
              height: 200px;
            `:H`
              display: none;
            `}
    }
  `}
`,tc=B.section`
  ${({theme:{dialogTorrentDetailsContent:{gradientStartColor:e,gradientEndColor:t}}})=>H`
    grid-area: main;
    padding: 40px;
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 30px;
    background: linear-gradient(145deg, ${e}, ${t});

    ${k("tablet")} {
      grid-template-columns: 1fr;
      padding: 20px;
    }
  `}
`,rc=B.section`
  ${({theme:{dialogTorrentDetailsContent:{cacheSectionBGColor:e}}})=>H`
    grid-area: cache;
    padding: 40px;
    display: grid;
    align-content: start;
    grid-template-rows: min-content min-content min-content;
    background: ${e};
    min-width: 0;

    ${k("tablet")} {
      padding: 20px;
    }
  `}
`,nc=B.section`
  ${({theme:{dialogTorrentDetailsContent:{torrentFilesSectionBGColor:e}}})=>H`
    grid-area: file-list;
    padding: 40px;
    box-shadow: inset 3px 25px 8px -25px rgba(0, 0, 0, 0.5);
    background: ${e};

    ${k("tablet")} {
      padding: 20px;
    }
  `}
`,ve=B.div`
  ${({$mb:e,theme:{dialogTorrentDetailsContent:{subNameFontColor:t}}})=>H`
    ${e&&`margin-top: ${e/3}px`};
    ${e&&`margin-bottom: ${e}px`};
    line-height: 1.2;
    color: ${t};

    ${k("tablet")} {
      ${e&&`margin-top: ${e/4}px`};
      ${e&&`margin-bottom: ${e/2}px`};
      font-size: 14px;
    }
  `}
`,ae=B.div`
  ${({$color:e,$mb:t,theme:{dialogTorrentDetailsContent:{titleFontColor:r}}})=>H`
    ${t&&`margin-bottom: ${t}px`};
    font-size: 34px;
    font-weight: 300;
    line-height: 1;
    word-break: break-word;
    color: ${e||r};

    ${k("tablet")} {
      font-size: 24px;
      line-height: 1.1;
      ${t&&`margin-bottom: ${t/2}px`};
    }
  `}
`,ac=B.div`
  margin-bottom: 20px;
`,ka=B.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(max-content, 220px));
  gap: 20px;

  ${k("tablet")} {
    gap: 15px;
  }
  ${k("phone")} {
    gap: 10px;
  }

  ${({$detailedView:e})=>e?H`
          ${k("tablet")} {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          ${k("phone")} {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        `:H`
          ${k("tablet")} {
            grid-template-columns: repeat(auto-fit, minmax(max-content, 185px));
          }
          ${k("compact")} {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          ${k("phone")} {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        `}
`,oc=B.div`
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

  ${k("tablet")} {
    grid-template-columns: 30px 1fr;
    grid-template-rows: min-content 40px;
  }
`,ic=B.div`
  ${({theme:{dialogTorrentDetailsContent:{titleFontColor:e}}})=>H`
    grid-area: title;
    justify-self: start;
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 2px;
    font-weight: 600;
    color: ${e};
  `}
`,sc=B.div`
  ${({$bgColor:e,$fontColor:t})=>H`
    grid-area: icon;
    color: ${t||te("#fff",.8)};
    background: ${e};
    border-radius: 5px 0 0 5px;

    ${k("tablet")} {
      > svg {
        width: 50%;
      }
    }
  `}
`,cc=B.div`
  ${({$bgColor:e,$fontColor:t,theme:{dialogTorrentDetailsContent:{widgetFontColor:r}}})=>H`
    grid-area: value;
    font-size: 24px;
    padding: 0 20px 0 0;
    color: ${t||r};
    background: ${e};
    border-radius: 0 5px 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;

    ${k("tablet")} {
      font-size: 18px;
      padding: 0 16px 0 0;
    }
  `}
`,lc=B.div`
  ${({theme:{addDialog:{separatorColor:e}}})=>H`
    height: 1px;
    background-color: ${e};
    margin: 30px 0;
  `}
`,uc=B.section`
  ${({theme:{detailedView:{gradientStartColor:e,gradientEndColor:t}}})=>H`
    padding: 40px;
    background: linear-gradient(145deg, ${e}, ${t});

    ${k("mobile")} {
      padding: 20px;
    }
  `}
`,dc=B.section`
  ${({theme:{detailedView:{cacheSectionBGColor:e}}})=>H`
    padding: 40px;
    box-shadow: inset 3px 25px 8px -25px rgba(0, 0, 0, 0.5);
    background: ${e};
    flex: 1;

    ${k("mobile")} {
      padding: 20px;
    }
  `}
`;function ne({icon:e,title:t,value:r,iconBg:n,valueBg:a,fontColor:o}){return s.jsxs(oc,{children:[s.jsx(ic,{children:t}),s.jsx(sc,{$bgColor:n,$fontColor:o,children:s.jsx(e,{})}),s.jsx(cc,{$bgColor:a,$fontColor:o,children:r})]})}const{LIGHT:fc,DARK:hc}=cr,pc={light:{downloadSpeed:{iconBGColor:"#118f00",valueBGColor:"#13a300"},uploadSpeed:{iconBGColor:"#0146ad",valueBGColor:"#0058db"},peers:{iconBGColor:"#cdc118",valueBGColor:"#d8cb18",fontColor:"#1a1a1a"},piecesCount:{iconBGColor:"#b6c95e",valueBGColor:"#c0d076"},piecesLength:{iconBGColor:"#0982c8",valueBGColor:"#098cd7"},status:{iconBGColor:"#aea25b",valueBGColor:"#b4aa6e"},size:{iconBGColor:"#9b01ad",valueBGColor:"#ac03bf"},category:{iconBGColor:"#914820",valueBGColor:"#c9632c"}},dark:{downloadSpeed:{iconBGColor:"#0c6600",valueBGColor:"#0d7000"},uploadSpeed:{iconBGColor:"#003f9e",valueBGColor:"#0047b3"},peers:{iconBGColor:"#a69c11",valueBGColor:"#b4a913",fontColor:"#1a1a1a"},piecesCount:{iconBGColor:"#8da136",valueBGColor:"#99ae3d"},piecesLength:{iconBGColor:"#07659c",valueBGColor:"#0872af"},status:{iconBGColor:"#938948",valueBGColor:"#9f9450"},size:{iconBGColor:"#81008f",valueBGColor:"#9102a1"},category:{iconBGColor:"#914820",valueBGColor:"#c9632c"}}};function se(e){const{isDarkMode:t}=w.useContext(da);return pc[t?hc:fc][e]}const Ba=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=se("downloadSpeed");return s.jsx(ne,{title:t("DownloadSpeed"),value:ha(e)||`0 ${t("bps")}`,iconBg:r,valueBg:n,icon:bo})},Ga=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=se("uploadSpeed");return s.jsx(ne,{title:t("UploadSpeed"),value:ha(e)||`0 ${t("bps")}`,iconBg:r,valueBg:n,icon:yo})},za=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n,fontColor:a}=se("peers");return s.jsx(ne,{title:t("Peers"),value:eo(e)||"0 / 0 · 0",iconBg:r,valueBg:n,fontColor:a,icon:_o})},gc=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=se("piecesCount");return s.jsx(ne,{title:t("PiecesCount"),value:e,iconBg:r,valueBg:n,icon:Co})},vc=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=se("piecesLength");return s.jsx(ne,{title:t("PiecesLength"),value:oe(e),iconBg:r,valueBg:n,icon:wo})},Ha=({stat:e})=>{const{t}=X(),r={[ga]:t("TorrentGettingInfo"),[no]:t("TorrentPreload"),[ro]:t("TorrentWorking"),[to]:t("TorrentClosed"),[pa]:t("TorrentInDb")},{iconBGColor:n,valueBGColor:a}=se("status");return s.jsx(ne,{title:t("TorrentStatus"),value:e!=null?r[e]:void 0,iconBg:n,valueBg:a,icon:So})},Na=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=se("size");return s.jsx(ne,{title:t("TorrentSize"),value:oe(e),iconBg:r,valueBg:n,icon:xo})},mc=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=se("category"),a=br.findIndex(i=>i.key===e),o=br.find(i=>i.key===e);return e?s.jsx(ne,{title:t("Category"),value:a>=0?t(o.name):e.length>1?e.charAt(0).toUpperCase()+e.slice(1):e,iconBg:r,valueBg:n,icon:xr}):s.jsx(ne,{title:t("Category"),value:"—",iconBg:r,valueBg:n,icon:xr})};function bc({downloadSpeed:e,uploadSpeed:t,torrent:r,torrentSize:n,PiecesCount:a,PiecesLength:o,stat:i,cache:c,isSnakeDebugMode:u,setIsSnakeDebugMode:d}){const{t:p}=X();return s.jsxs(s.Fragment,{children:[s.jsxs(uc,{children:[s.jsx(ae,{$mb:20,children:p("Data")}),s.jsxs(ka,{$detailedView:!0,children:[s.jsx(Ba,{data:e}),s.jsx(Ga,{data:t}),s.jsx(za,{data:r}),s.jsx(Na,{data:n}),s.jsx(gc,{data:a}),s.jsx(vc,{data:o}),s.jsx(Ha,{stat:i})]})]}),s.jsxs(dc,{children:[s.jsx(ae,{$mb:20,children:s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[s.jsx("span",{children:p("Cache")}),s.jsx(Ro,{control:s.jsx(jo,{color:"primary",checked:u,disableRipple:!0,onChange:({target:{checked:g}})=>{d(g),ao("isSnakeDebugMode",g)}}),label:p("DebugMode"),labelPlacement:"start"})]})}),s.jsx(Da,{cache:c,mode:"detailed",isSnakeDebugMode:u})]})]})}const ir=B.div`
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

  ${k("mobile")} {
    grid-template-columns: 1fr;
  }
`,sr=B.div`
  ${({$mb:e,theme:{torrentFunctions:{fontColor:t}}})=>H`
    ${e&&`margin-bottom: ${e}px`};
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;
    color: ${t};

    ${k("mobile")} {
      font-size: 13px;
      font-weight: 400;
      ${e&&`margin-bottom: ${e/1.5}px`};
    }
  `}
`,yc=w.memo(({hash:e,viewedFileList:t,playableFileList:r,name:n,title:a,setViewedFileList:o})=>{var x;const{t:i}=X(),c=fa(),[u,d]=w.useState(null),p=t==null?void 0:t[(t==null?void 0:t.length)-1],g=(x=r==null?void 0:r.find(({id:E})=>E===p))==null?void 0:x.path,v=(r==null?void 0:r.length)===1,y=g?Q.parse(g):null,R=`${oo()}/${encodeURIComponent(n||a||"file")}.m3u?link=${e}&m3u`,_=`${R}&fromlast`,C=`magnet:?xt=urn:btih:${e}&dn=${encodeURIComponent(n||a||"")}`,j=()=>{u==="drop"&&me.post(io(),{action:"drop",hash:e}).then(()=>c==null?void 0:c.showToast({message:i("DropTorrent"),severity:"success"})).catch(()=>c==null?void 0:c.showToast({message:i("PlaybackError"),severity:"error"})),u==="views"&&me.post(va(),{action:"rem",hash:e,file_index:-1}).then(()=>{o(),c==null||c.showToast({message:i("RemoveViews"),severity:"success"})}).catch(()=>c==null?void 0:c.showToast({message:i("PlaybackError"),severity:"error"})),d(null)};return s.jsxs(s.Fragment,{children:[!v&&!!(t!=null&&t.length)&&s.jsxs(s.Fragment,{children:[s.jsx(sr,{children:i("DownloadPlaylist")}),s.jsxs(ve,{$mb:10,children:[i("LatestFilePlayed")," ",s.jsxs("strong",{children:[y==null?void 0:y.title,".",(y==null?void 0:y.season)&&s.jsxs(s.Fragment,{children:[" ",i("Season"),": ",y==null?void 0:y.season,". ",i("Episode"),": ",y==null?void 0:y.episode,"."]})]})]}),s.jsxs(ir,{children:[s.jsx(Z,{component:"a",href:R,variant:"contained",color:"primary",size:"large",children:i("Full")}),s.jsx(Z,{component:"a",href:_,variant:"contained",color:"primary",size:"large",children:i("FromLatestFile")})]})]}),s.jsx(sr,{$mb:10,children:i("TorrentState")}),s.jsxs(ir,{children:[s.jsx(Z,{onClick:()=>d("views"),variant:"outlined",color:"primary",size:"large",children:i("RemoveViews")}),s.jsx(Z,{onClick:()=>d("drop"),variant:"contained",color:"error",size:"large",children:i("DropTorrent")})]}),s.jsx(sr,{$mb:10,children:i("Info")}),s.jsxs(ir,{children:[(v||!(t!=null&&t.length))&&s.jsx(Z,{component:"a",href:R,variant:"contained",color:"primary",size:"large",children:i("DownloadPlaylist")}),s.jsx(Ia.CopyToClipboard,{text:C,onCopy:()=>c==null?void 0:c.showToast({message:i("Copied"),severity:"success"}),children:s.jsx(Z,{variant:"contained",color:"primary",size:"large",children:i("CopyHash")})})]}),s.jsxs(To,{open:u!=null,onClose:()=>d(null),"aria-labelledby":"torrent-fn-confirm-title",children:[s.jsx(qo,{id:"torrent-fn-confirm-title",children:i(u==="drop"?"DropTorrent":"RemoveViews")}),s.jsx(Oo,{children:s.jsx(Eo,{children:i(u==="drop"?"ConfirmDropTorrent":"ConfirmRemoveViews")})}),s.jsxs(Po,{children:[s.jsx(Z,{autoFocus:!0,onClick:()=>d(null),variant:"outlined",color:"primary",children:i("Cancel")}),s.jsx(Z,{onClick:j,variant:"contained",color:u==="drop"?"error":"primary",children:i("OK")})]})]})]})}),_c=()=>s.jsx("div",{style:{minHeight:160,display:"grid",placeItems:"center",padding:24},children:s.jsx(Ao,{color:"secondary"})}),xc=e=>({id:e.id??e.Id??0,path:e.path??e.Path??"",length:e.length??e.Length??0});function Tc({closeDialog:e,torrent:t}){var ce;const{t:r}=X(),{dialogTorrentDetailsContent:{bufferTrailStartColor:n,bufferTrailEndColor:a,bufferEmptyTrackColor:o,bufferTrackBorderColor:i}}=so(),[c,u]=w.useState(!0),[d,p]=w.useState(!1),[g,v]=w.useState(),[y,R]=w.useState(),[_,C]=w.useState(null),[j,x]=w.useState(),[E,T]=w.useState(he("isSnakeDebugMode")),{poster:A,hash:S,title:l,category:f,name:b,stat:h,download_speed:m,upload_speed:q,torrent_size:M,file_stats:O}=t,G=Vo(S),L=Yo(),{Capacity:N,PiecesCount:U,PiecesLength:$,Filled:W}=G;w.useEffect(()=>{if(y&&_===null){const I=[];y.forEach(({path:z})=>{const V=Q.parse(z).season;V&&!I.includes(V)&&I.push(V)}),I.length&&x(I[0]),C(I.sort((z,V)=>z-V))}},[y,_]),w.useEffect(()=>{R(O==null?void 0:O.map(xc).filter(({path:I})=>co(I)))},[O]),w.useEffect(()=>{const I=!!Object.entries(G).length,z=h!==ga&&h!==pa;!I&&!c&&u(!0),I&&c&&z&&u(!1)},[h,G,c]),w.useEffect(()=>{me.post(va(),{action:"list",hash:S}).then(({data:I})=>{if(I){const z=I.map(V=>V.file_index).sort((V,gr)=>V-gr);v(z)}else v(void 0)})},[S]);const K=L==null?void 0:L.PreloadCache,P=(N||0)/100*(K||0),D=P>33554432?P:33554432,F=N&&N>0?N:D,Y=F>0&&W!=null&&W>0?Math.min(100,Math.round(W*100/F)):null,J=N&&N>0&&P>0?Math.min(100,Math.round(P*100/N)):null,ee=()=>{const I=[],z=b?Q.parse(b):null;l!==b?I.push(yr(l||"")):z!=null&&z.title&&I.push(yr(z.title)),z!=null&&z.year&&!String(I[0]||"").includes(String(z.year))&&I.push(z.year),z!=null&&z.resolution&&!String(I[0]||"").includes(String(z.resolution))&&I.push(z.resolution);const V=I.join(". ");return V[V.length-1]==="."&&V[V.length-2]==="."?`${V}.`:V};return s.jsxs(s.Fragment,{children:[s.jsx(Zo,{onClose:e,title:r(d?"DetailedCacheView.header":"TorrentDetails"),...d&&{onBack:()=>p(!1)}}),s.jsx(Qs,{children:c?s.jsx(_c,{}):d?s.jsx(bc,{downloadSpeed:m,uploadSpeed:q,torrent:t,torrentSize:M,PiecesCount:U,PiecesLength:$,stat:h,cache:G,isSnakeDebugMode:E,setIsSnakeDebugMode:T}):s.jsxs(Zs,{children:[s.jsxs(tc,{children:[s.jsx(ec,{$poster:!!A,children:A?s.jsx("img",{alt:"poster",src:A}):s.jsx(lo,{})}),s.jsxs("div",{children:[l&&b!==l?ee().length>90?s.jsxs(s.Fragment,{children:[s.jsx(ae,{children:Q.parse(b||"").title}),s.jsx(ve,{$mb:20,children:ee()})]}):s.jsxs(s.Fragment,{children:[s.jsx(ae,{children:ee()}),s.jsx(ve,{$mb:20,children:(ce=Q.parse(b||""))==null?void 0:ce.title})]}):s.jsx(ae,{$mb:20,children:ee()}),s.jsxs(ka,{children:[s.jsx(Ba,{data:m}),s.jsx(Ga,{data:q}),s.jsx(za,{data:t}),s.jsx(Na,{data:M}),s.jsx(Ha,{stat:h}),s.jsx(mc,{data:f})]}),s.jsx(lc,{}),s.jsx(yc,{hash:S,viewedFileList:g,playableFileList:y,name:b,title:l,setViewedFileList:v})]})]}),s.jsxs(rc,{children:[s.jsxs(ac,{children:[s.jsx(ae,{$mb:12,children:r("Buffer")}),D<=33554432&&s.jsx(ve,{children:r("BufferNote")}),s.jsxs(Cr,{spacing:1,sx:{mt:.5},children:[s.jsxs(ma,{component:"div",variant:"body2",fontWeight:400,textAlign:"center","aria-label":`${oe(W||0)} / ${oe(F)}`,children:[`${oe(W||0)} / ${oe(F)}`,Y!=null?` · ${Y}%`:""]}),s.jsxs(wr,{sx:{position:"relative"},children:[s.jsx(Mo,{variant:"determinate",value:Y??0,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Y??0,sx:{height:10,borderRadius:1,border:`1px solid ${i}`,backgroundColor:o,"& .MuiLinearProgress-bar":{borderRadius:1,background:`linear-gradient(90deg, ${n}, ${a})`}}}),J!=null&&J>0&&s.jsx(wr,{"aria-hidden":!0,title:r("SettingsDialog.PreloadCache"),sx:{position:"absolute",left:`${J}%`,top:-2,bottom:-2,width:2,ml:"-1px",borderRadius:1,bgcolor:i,boxShadow:`0 0 0 1px ${o}`,pointerEvents:"none"}})]})]})]}),s.jsx(Da,{mode:"mini",cache:G,isSnakeDebugMode:E}),s.jsx(Z,{style:{marginTop:"20px",width:"100%"},variant:"outlined",color:"primary",size:"large",onClick:()=>p(!0),children:r("DetailedCacheView.button")})]}),s.jsxs(nc,{children:[s.jsx(ae,{$mb:20,children:r("TorrentContent")}),((_==null?void 0:_.length)??0)>1&&s.jsxs(s.Fragment,{children:[s.jsx(ve,{$mb:7,children:r("SelectSeason")}),s.jsx(Cr,{direction:"row",useFlexGap:!0,flexWrap:"wrap",spacing:1,sx:{mb:"30px"},children:_.map(I=>s.jsx(Z,{color:"secondary",variant:j===I?"contained":"outlined",onClick:()=>x(I),children:I},I))}),s.jsxs(ae,{$mb:20,children:[r("Season")," ",j]})]}),s.jsx(Js,{hash:S,playableFileList:y,viewedFileList:g,selectedSeason:j,seasonAmount:_})]})]})})]})}export{Tc as default};
