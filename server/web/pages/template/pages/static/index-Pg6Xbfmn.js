import{a as w,d as ge,u as X,j as c,n as qe,g as aa,r as $a}from"./vendor-B9KbAPe3.js";import{s as Ba,Q as Ga,V as za,W as ve,r as Z,f as $,g as z,X as ia,Y as or,Z as oa,$ as Ha,a0 as Na,B as Q,a1 as de,a2 as La,a3 as Ua,a4 as Wa,a5 as ne,a6 as pr,a7 as Ka,a8 as Fa,a9 as Va,aa as sa,ab as Xa,ac as ca,ad as Ja,ae as Ya,af as Qa,ag as la,T as gr,ah as Za,ai as ei,i as ti,aj as ua,ak as ri,al as ni,N as ai,am as vr}from"./index-DtwYfyyw.js";import{ag as ii,aG as oi,I as mr,aH as si,T as da,C as ci,J as li,aI as ui,N as di,aF as te,j as Oe,g as Y,aC as fi,aB as hi,aJ as pi,aK as gi,aL as vi,aM as mi,aN as bi,aO as yi,a6 as xi,aP as _i,D as Ci,d as wi,h as Si,aQ as Ri,H as ji,X as Ti,aR as qi,aS as Oi,i as Pi}from"./mui-D5L4kO0I.js";import{a as _e,c as fa,r as ae,d as Ei,b as Ce,e as Ai}from"./isObjectLike-Ddue8m3w.js";import"./hls-CWTT-7hy.js";const Mi=16,Di=10,Ii=(e,t,r)=>{if(e==null||t==null||r<=0)return null;const n=Math.max(0,Math.min(r-1,Math.floor(e))),a=Math.max(0,Math.min(r-1,Math.floor(t)));return a<n?null:{start:n,end:a}},ki=(e,t,r,n)=>{const a=Ii(e,t,r);if(a)for(let i=a.start;i<=a.end;i++)n(i)},$i=(e,t)=>{if(e){if(Array.isArray(e)){for(let r=0;r<e.length;r++){const n=e[r];n&&t(r,n)}return}for(const[r,n]of Object.entries(e)){if(!n)continue;const a=Number(r);Number.isFinite(a)&&t(a,n)}}},Bi=(e,t)=>{if(!e)return 0;const r=e.Length||t||0,n=e.Size||0;if(r<=0)return n>0?100:0;const a=Math.min(n,r);return Math.min(100,a/r*100)},Gi=(e,t,r,n)=>{if(!(n!=null&&n.length))return t>=2?t:0;if(n.some(o=>o.Reader===e))return 5;if(t>=2)return t;if(r)return 0;let i=0;for(const o of n){if(o.Reader==null||o.Start==null||o.End==null)continue;const s=o.Reader,u=o.End;if(e<s||e>u)continue;let d=2;if(e===s+1)d=4;else{const p=Math.max(1,u-s),g=s+Math.max(2,Math.floor(p*.45));e<=g?d=3:e<=g+5&&(d=2)}d>i&&(i=d)}return i>0?i:t},ha=e=>e===2?"H":e===3?"R":e===4?"N":e===5?"A":"",zi=(e,t,r,n,a,i)=>{const o=Bi(t,r),s=!!(t!=null&&t.Completed)||o>=100,u=(t==null?void 0:t.Priority)||0;return{percentage:s?100:o,priority:Gi(e,u,s,i),completed:s,isReader:n,isReaderRange:a,pieceStart:e,pieceEnd:e}},pa=(e,t)=>{const r=e.PiecesCount??0;if(r<=0)return null;const n=e.Readers||[];let a=0;if(n.length>0){let g=r;for(const v of n)v.Reader!=null&&v.Reader>=0&&v.Reader<r&&v.Reader<g&&(g=v.Reader);a=g<r?g:0}const i=e.PiecesLength||0,o=i>0?Math.max(1,Math.round((e.Capacity||0)/i)):t,s=Math.max(t,64);let u=Math.min(r,Math.max(t,o),s);u=Math.max(1,u);let d=a-Math.floor(u/2);d<0&&(d=0);let p=d+u-1;return p>=r&&(p=r-1,d=Math.max(0,p-u+1)),{start:d,end:p,readerPiece:a}},Hi=(e,t)=>{const r=e.PiecesCount??0,n=pa(e,t);if(!n||r<=0)return{cells:[],piecesCount:r,bucketSize:1,windowStart:0,windowEnd:-1};const a=e.PiecesLength||0,i=e.Readers||[],o=new Map;$i(e.Pieces,(p,g)=>{p>=n.start&&p<=n.end&&o.set(p,g)});const s=new Set,u=new Set;for(const p of i)p.Reader!=null&&p.Reader>=n.start&&p.Reader<=n.end&&s.add(p.Reader),ki(p.Start,p.End,r,g=>{g>=n.start&&g<=n.end&&u.add(g)});const d=[];for(let p=n.start;p<=n.end;p++)d.push(zi(p,o.get(p),a,s.has(p),u.has(p),i));return{cells:d,piecesCount:r,bucketSize:1,windowStart:n.start,windowEnd:n.end}},Ni=(e,t=!1)=>{const r=t?Di:Mi,n=t?31:24;return!e||e<=0?10*r:Math.max(1,Math.floor(e/n))*r},me=100,Li=400,Ui=2e3,br=e=>e!=null&&e.length?e.map(t=>`${t.Reader??""}:${t.Start??""}-${t.End??""}`).join("|"):"",yr=e=>{if(!e)return"";if(Array.isArray(e)){let r="";for(let n=0;n<e.length;n++){const a=e[n];a&&(r+=`${n}:${a.Size??0}:${a.Priority??0};`)}return r}let t="";for(const[r,n]of Object.entries(e))n&&(t+=`${r}:${n.Size??0}:${n.Priority??0};`);return t},xr=(e,t)=>e.Filled===t.Filled&&e.Capacity===t.Capacity&&e.PiecesCount===t.PiecesCount&&e.PiecesLength===t.PiecesLength&&br(e.Readers)===br(t.Readers)&&yr(e.Pieces)===yr(t.Pieces),Wi=e=>{const[t,r]=w.useState({}),n=w.useRef(!0),a=w.useRef(null),i=w.useRef(!1),o=w.useRef({}),s=w.useRef(Date.now()),u=w.useRef(me);return w.useEffect(()=>()=>{n.current=!1},[]),w.useEffect(()=>{if(!e){a.current&&clearTimeout(a.current);return}let d=!1;const p=()=>{d||(a.current=setTimeout(g,u.current))},g=()=>{d||i.current||document.hidden||(i.current=!0,ge.post(Ga(),{action:"get",hash:e}).then(({data:y})=>{if(!n.current||d)return;const R=y||{};if(xr(o.current,R)){Date.now()-s.current>=Ui&&(u.current=Li);return}s.current=Date.now(),u.current=me,o.current=R,r(R)}).catch(()=>{!n.current||d||xr(o.current,{})||(s.current=Date.now(),u.current=me,o.current={},r({}))}).finally(()=>{i.current=!1,document.hidden||p()}))};g();const v=()=>{if(document.hidden){a.current&&clearTimeout(a.current);return}u.current=me,g()};return document.addEventListener("visibilitychange",v),()=>{d=!0,a.current&&clearTimeout(a.current),document.removeEventListener("visibilitychange",v)}},[e]),t},Ki=(e,t)=>w.useMemo(()=>Hi(e,t),[e,t]),Fi=()=>{const[e,t]=w.useState();return w.useEffect(()=>{let r=!1;return ge.post(Ba(),{action:"get"}).then(({data:n})=>{r||t(n)}),()=>{r=!0}},[]),e};function Vi({title:e,onClose:t,onBack:r}){const{t:n}=X();return c.jsx(ii,{sx:{position:"relative",...za&&{paddingTop:"30px"}},children:c.jsxs(oi,{children:[r&&c.jsx(mr,{edge:"start",color:"inherit",onClick:r,"aria-label":n("Back",{defaultValue:"Back"}),children:c.jsx(si,{})}),c.jsx(da,{variant:"h6",sx:{marginLeft:"5px",flex:1},children:e}),c.jsx(mr,{autoFocus:!0,color:"inherit",onClick:t,"aria-label":n("Close",{defaultValue:"Close"}),sx:{marginRight:"-10px"},children:c.jsx(ci,{})})]})})}var ga=(function(){if(typeof Map<"u")return Map;function e(t,r){var n=-1;return t.some(function(a,i){return a[0]===r?(n=i,!0):!1}),n}return(function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(r){var n=e(this.__entries__,r),a=this.__entries__[n];return a&&a[1]},t.prototype.set=function(r,n){var a=e(this.__entries__,r);~a?this.__entries__[a][1]=n:this.__entries__.push([r,n])},t.prototype.delete=function(r){var n=this.__entries__,a=e(n,r);~a&&n.splice(a,1)},t.prototype.has=function(r){return!!~e(this.__entries__,r)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(r,n){n===void 0&&(n=null);for(var a=0,i=this.__entries__;a<i.length;a++){var o=i[a];r.call(n,o[1],o[0])}},t})()})(),sr=typeof window<"u"&&typeof document<"u"&&window.document===document,ye=(function(){return typeof qe<"u"&&qe.Math===Math?qe:typeof self<"u"&&self.Math===Math?self:typeof window<"u"&&window.Math===Math?window:Function("return this")()})(),Xi=(function(){return typeof requestAnimationFrame=="function"?requestAnimationFrame.bind(ye):function(e){return setTimeout(function(){return e(Date.now())},1e3/60)}})(),Ji=2;function Yi(e,t){var r=!1,n=!1,a=0;function i(){r&&(r=!1,e()),n&&s()}function o(){Xi(i)}function s(){var u=Date.now();if(r){if(u-a<Ji)return;n=!0}else r=!0,n=!1,setTimeout(o,t);a=u}return s}var Qi=20,Zi=["top","right","bottom","left","width","height","size","weight"],eo=typeof MutationObserver<"u",to=(function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=Yi(this.refresh.bind(this),Qi)}return e.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},e.prototype.removeObserver=function(t){var r=this.observers_,n=r.indexOf(t);~n&&r.splice(n,1),!r.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){var t=this.updateObservers_();t&&this.refresh()},e.prototype.updateObservers_=function(){var t=this.observers_.filter(function(r){return r.gatherActive(),r.hasActive()});return t.forEach(function(r){return r.broadcastActive()}),t.length>0},e.prototype.connect_=function(){!sr||this.connected_||(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),eo?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){!sr||!this.connected_||(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(t){var r=t.propertyName,n=r===void 0?"":r,a=Zi.some(function(i){return!!~n.indexOf(i)});a&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e})(),va=(function(e,t){for(var r=0,n=Object.keys(t);r<n.length;r++){var a=n[r];Object.defineProperty(e,a,{value:t[a],enumerable:!1,writable:!1,configurable:!0})}return e}),se=(function(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView;return t||ye}),ma=we(0,0,0,0);function xe(e){return parseFloat(e)||0}function _r(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return t.reduce(function(n,a){var i=e["border-"+a+"-width"];return n+xe(i)},0)}function ro(e){for(var t=["top","right","bottom","left"],r={},n=0,a=t;n<a.length;n++){var i=a[n],o=e["padding-"+i];r[i]=xe(o)}return r}function no(e){var t=e.getBBox();return we(0,0,t.width,t.height)}function ao(e){var t=e.clientWidth,r=e.clientHeight;if(!t&&!r)return ma;var n=se(e).getComputedStyle(e),a=ro(n),i=a.left+a.right,o=a.top+a.bottom,s=xe(n.width),u=xe(n.height);if(n.boxSizing==="border-box"&&(Math.round(s+i)!==t&&(s-=_r(n,"left","right")+i),Math.round(u+o)!==r&&(u-=_r(n,"top","bottom")+o)),!oo(e)){var d=Math.round(s+i)-t,p=Math.round(u+o)-r;Math.abs(d)!==1&&(s-=d),Math.abs(p)!==1&&(u-=p)}return we(a.left,a.top,s,u)}var io=(function(){return typeof SVGGraphicsElement<"u"?function(e){return e instanceof se(e).SVGGraphicsElement}:function(e){return e instanceof se(e).SVGElement&&typeof e.getBBox=="function"}})();function oo(e){return e===se(e).document.documentElement}function so(e){return sr?io(e)?no(e):ao(e):ma}function co(e){var t=e.x,r=e.y,n=e.width,a=e.height,i=typeof DOMRectReadOnly<"u"?DOMRectReadOnly:Object,o=Object.create(i.prototype);return va(o,{x:t,y:r,width:n,height:a,top:r,right:t+n,bottom:a+r,left:t}),o}function we(e,t,r,n){return{x:e,y:t,width:r,height:n}}var lo=(function(){function e(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=we(0,0,0,0),this.target=t}return e.prototype.isActive=function(){var t=so(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},e})(),uo=(function(){function e(t,r){var n=co(r);va(this,{target:t,contentRect:n})}return e})(),fo=(function(){function e(t,r,n){if(this.activeObservations_=[],this.observations_=new ga,typeof t!="function")throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=r,this.callbackCtx_=n}return e.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof se(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)||(r.set(t,new lo(t)),this.controller_.addObserver(this),this.controller_.refresh())}},e.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof se(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)&&(r.delete(t),r.size||this.controller_.removeObserver(this))}},e.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},e.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach(function(r){r.isActive()&&t.activeObservations_.push(r)})},e.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,r=this.activeObservations_.map(function(n){return new uo(n.target,n.broadcastRect())});this.callback_.call(t,r,t),this.clearActive()}},e.prototype.clearActive=function(){this.activeObservations_.splice(0)},e.prototype.hasActive=function(){return this.activeObservations_.length>0},e})(),ba=typeof WeakMap<"u"?new WeakMap:new ga,ya=(function(){function e(t){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var r=to.getInstance(),n=new fo(t,r,this);ba.set(this,n)}return e})();["observe","unobserve","disconnect"].forEach(function(e){ya.prototype[e]=function(){var t;return(t=ba.get(this))[e].apply(t,arguments)}});var ho=(function(){return typeof ye.ResizeObserver<"u"?ye.ResizeObserver:ya})(),po=["client","offset","scroll","bounds","margin"];function Cr(e){var t=[];return po.forEach(function(r){e[r]&&t.push(r)}),t}function wr(e,t){var r={};if(t.indexOf("client")>-1&&(r.client={top:e.clientTop,left:e.clientLeft,width:e.clientWidth,height:e.clientHeight}),t.indexOf("offset")>-1&&(r.offset={top:e.offsetTop,left:e.offsetLeft,width:e.offsetWidth,height:e.offsetHeight}),t.indexOf("scroll")>-1&&(r.scroll={top:e.scrollTop,left:e.scrollLeft,width:e.scrollWidth,height:e.scrollHeight}),t.indexOf("bounds")>-1){var n=e.getBoundingClientRect();r.bounds={top:n.top,right:n.right,bottom:n.bottom,left:n.left,width:n.width,height:n.height}}if(t.indexOf("margin")>-1){var a=getComputedStyle(e);r.margin={top:a?parseInt(a.marginTop):0,right:a?parseInt(a.marginRight):0,bottom:a?parseInt(a.marginBottom):0,left:a?parseInt(a.marginLeft):0}}return r}function go(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView;return t||window}function vo(e){return function(t){var r,n;return n=r=(function(a){li(i,a);function i(){for(var s,u=arguments.length,d=new Array(u),p=0;p<u;p++)d[p]=arguments[p];return s=a.call.apply(a,[this].concat(d))||this,s.state={contentRect:{entry:{},client:{},offset:{},scroll:{},bounds:{},margin:{}}},s._animationFrameID=null,s._resizeObserver=null,s._node=null,s._window=null,s.measure=function(g){var v=wr(s._node,Cr(s.props));g&&(v.entry=g[0].contentRect),s._animationFrameID=s._window.requestAnimationFrame(function(){s._resizeObserver!==null&&(s.setState({contentRect:v}),typeof s.props.onResize=="function"&&s.props.onResize(v))})},s._handleRef=function(g){s._resizeObserver!==null&&s._node!==null&&s._resizeObserver.unobserve(s._node),s._node=g,s._window=go(s._node);var v=s.props.innerRef;v&&(typeof v=="function"?v(s._node):v.current=s._node),s._resizeObserver!==null&&s._node!==null&&s._resizeObserver.observe(s._node)},s}var o=i.prototype;return o.componentDidMount=function(){this._resizeObserver=this._window!==null&&this._window.ResizeObserver?new this._window.ResizeObserver(this.measure):new ho(this.measure),this._node!==null&&(this._resizeObserver.observe(this._node),typeof this.props.onResize=="function"&&this.props.onResize(wr(this._node,Cr(this.props))))},o.componentWillUnmount=function(){this._window!==null&&this._window.cancelAnimationFrame(this._animationFrameID),this._resizeObserver!==null&&(this._resizeObserver.disconnect(),this._resizeObserver=null)},o.render=function(){var u=this.props;u.innerRef,u.onResize;var d=ui(u,["innerRef","onResize"]);return w.createElement(t,di({},d,{measureRef:this._handleRef,measure:this.measure,contentRect:this.state.contentRect}))},i})(w.Component),r.propTypes={client:te.bool,offset:te.bool,scroll:te.bool,bounds:te.bool,margin:te.bool,innerRef:te.oneOfType([te.object,te.func]),onResize:te.func},n}}var lr=vo()(function(e){var t=e.measure,r=e.measureRef,n=e.contentRect,a=e.children;return a({measure:t,measureRef:r,contentRect:n})});lr.displayName="Measure";lr.propTypes.children=te.func;var Pe,Sr;function mo(){if(Sr)return Pe;Sr=1;function e(){this.__data__=[],this.size=0}return Pe=e,Pe}var Ee,Rr;function xa(){if(Rr)return Ee;Rr=1;function e(t,r){return t===r||t!==t&&r!==r}return Ee=e,Ee}var Ae,jr;function Se(){if(jr)return Ae;jr=1;var e=xa();function t(r,n){for(var a=r.length;a--;)if(e(r[a][0],n))return a;return-1}return Ae=t,Ae}var Me,Tr;function bo(){if(Tr)return Me;Tr=1;var e=Se(),t=Array.prototype,r=t.splice;function n(a){var i=this.__data__,o=e(i,a);if(o<0)return!1;var s=i.length-1;return o==s?i.pop():r.call(i,o,1),--this.size,!0}return Me=n,Me}var De,qr;function yo(){if(qr)return De;qr=1;var e=Se();function t(r){var n=this.__data__,a=e(n,r);return a<0?void 0:n[a][1]}return De=t,De}var Ie,Or;function xo(){if(Or)return Ie;Or=1;var e=Se();function t(r){return e(this.__data__,r)>-1}return Ie=t,Ie}var ke,Pr;function _o(){if(Pr)return ke;Pr=1;var e=Se();function t(r,n){var a=this.__data__,i=e(a,r);return i<0?(++this.size,a.push([r,n])):a[i][1]=n,this}return ke=t,ke}var $e,Er;function Re(){if(Er)return $e;Er=1;var e=mo(),t=bo(),r=yo(),n=xo(),a=_o();function i(o){var s=-1,u=o==null?0:o.length;for(this.clear();++s<u;){var d=o[s];this.set(d[0],d[1])}}return i.prototype.clear=e,i.prototype.delete=t,i.prototype.get=r,i.prototype.has=n,i.prototype.set=a,$e=i,$e}var Be,Ar;function Co(){if(Ar)return Be;Ar=1;var e=Re();function t(){this.__data__=new e,this.size=0}return Be=t,Be}var Ge,Mr;function wo(){if(Mr)return Ge;Mr=1;function e(t){var r=this.__data__,n=r.delete(t);return this.size=r.size,n}return Ge=e,Ge}var ze,Dr;function So(){if(Dr)return ze;Dr=1;function e(t){return this.__data__.get(t)}return ze=e,ze}var He,Ir;function Ro(){if(Ir)return He;Ir=1;function e(t){return this.__data__.has(t)}return He=e,He}var Ne,kr;function _a(){if(kr)return Ne;kr=1;var e=_e(),t=fa(),r="[object AsyncFunction]",n="[object Function]",a="[object GeneratorFunction]",i="[object Proxy]";function o(s){if(!t(s))return!1;var u=e(s);return u==n||u==a||u==r||u==i}return Ne=o,Ne}var Le,$r;function jo(){if($r)return Le;$r=1;var e=ae(),t=e["__core-js_shared__"];return Le=t,Le}var Ue,Br;function To(){if(Br)return Ue;Br=1;var e=jo(),t=(function(){var n=/[^.]+$/.exec(e&&e.keys&&e.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""})();function r(n){return!!t&&t in n}return Ue=r,Ue}var We,Gr;function Ca(){if(Gr)return We;Gr=1;var e=Function.prototype,t=e.toString;function r(n){if(n!=null){try{return t.call(n)}catch{}try{return n+""}catch{}}return""}return We=r,We}var Ke,zr;function qo(){if(zr)return Ke;zr=1;var e=_a(),t=To(),r=fa(),n=Ca(),a=/[\\^$.*+?()[\]{}|]/g,i=/^\[object .+?Constructor\]$/,o=Function.prototype,s=Object.prototype,u=o.toString,d=s.hasOwnProperty,p=RegExp("^"+u.call(d).replace(a,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function g(v){if(!r(v)||t(v))return!1;var y=e(v)?p:i;return y.test(n(v))}return Ke=g,Ke}var Fe,Hr;function Oo(){if(Hr)return Fe;Hr=1;function e(t,r){return t==null?void 0:t[r]}return Fe=e,Fe}var Ve,Nr;function ce(){if(Nr)return Ve;Nr=1;var e=qo(),t=Oo();function r(n,a){var i=t(n,a);return e(i)?i:void 0}return Ve=r,Ve}var Xe,Lr;function ur(){if(Lr)return Xe;Lr=1;var e=ce(),t=ae(),r=e(t,"Map");return Xe=r,Xe}var Je,Ur;function je(){if(Ur)return Je;Ur=1;var e=ce(),t=e(Object,"create");return Je=t,Je}var Ye,Wr;function Po(){if(Wr)return Ye;Wr=1;var e=je();function t(){this.__data__=e?e(null):{},this.size=0}return Ye=t,Ye}var Qe,Kr;function Eo(){if(Kr)return Qe;Kr=1;function e(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r}return Qe=e,Qe}var Ze,Fr;function Ao(){if(Fr)return Ze;Fr=1;var e=je(),t="__lodash_hash_undefined__",r=Object.prototype,n=r.hasOwnProperty;function a(i){var o=this.__data__;if(e){var s=o[i];return s===t?void 0:s}return n.call(o,i)?o[i]:void 0}return Ze=a,Ze}var et,Vr;function Mo(){if(Vr)return et;Vr=1;var e=je(),t=Object.prototype,r=t.hasOwnProperty;function n(a){var i=this.__data__;return e?i[a]!==void 0:r.call(i,a)}return et=n,et}var tt,Xr;function Do(){if(Xr)return tt;Xr=1;var e=je(),t="__lodash_hash_undefined__";function r(n,a){var i=this.__data__;return this.size+=this.has(n)?0:1,i[n]=e&&a===void 0?t:a,this}return tt=r,tt}var rt,Jr;function Io(){if(Jr)return rt;Jr=1;var e=Po(),t=Eo(),r=Ao(),n=Mo(),a=Do();function i(o){var s=-1,u=o==null?0:o.length;for(this.clear();++s<u;){var d=o[s];this.set(d[0],d[1])}}return i.prototype.clear=e,i.prototype.delete=t,i.prototype.get=r,i.prototype.has=n,i.prototype.set=a,rt=i,rt}var nt,Yr;function ko(){if(Yr)return nt;Yr=1;var e=Io(),t=Re(),r=ur();function n(){this.size=0,this.__data__={hash:new e,map:new(r||t),string:new e}}return nt=n,nt}var at,Qr;function $o(){if(Qr)return at;Qr=1;function e(t){var r=typeof t;return r=="string"||r=="number"||r=="symbol"||r=="boolean"?t!=="__proto__":t===null}return at=e,at}var it,Zr;function Te(){if(Zr)return it;Zr=1;var e=$o();function t(r,n){var a=r.__data__;return e(n)?a[typeof n=="string"?"string":"hash"]:a.map}return it=t,it}var ot,en;function Bo(){if(en)return ot;en=1;var e=Te();function t(r){var n=e(this,r).delete(r);return this.size-=n?1:0,n}return ot=t,ot}var st,tn;function Go(){if(tn)return st;tn=1;var e=Te();function t(r){return e(this,r).get(r)}return st=t,st}var ct,rn;function zo(){if(rn)return ct;rn=1;var e=Te();function t(r){return e(this,r).has(r)}return ct=t,ct}var lt,nn;function Ho(){if(nn)return lt;nn=1;var e=Te();function t(r,n){var a=e(this,r),i=a.size;return a.set(r,n),this.size+=a.size==i?0:1,this}return lt=t,lt}var ut,an;function wa(){if(an)return ut;an=1;var e=ko(),t=Bo(),r=Go(),n=zo(),a=Ho();function i(o){var s=-1,u=o==null?0:o.length;for(this.clear();++s<u;){var d=o[s];this.set(d[0],d[1])}}return i.prototype.clear=e,i.prototype.delete=t,i.prototype.get=r,i.prototype.has=n,i.prototype.set=a,ut=i,ut}var dt,on;function No(){if(on)return dt;on=1;var e=Re(),t=ur(),r=wa(),n=200;function a(i,o){var s=this.__data__;if(s instanceof e){var u=s.__data__;if(!t||u.length<n-1)return u.push([i,o]),this.size=++s.size,this;s=this.__data__=new r(u)}return s.set(i,o),this.size=s.size,this}return dt=a,dt}var ft,sn;function Lo(){if(sn)return ft;sn=1;var e=Re(),t=Co(),r=wo(),n=So(),a=Ro(),i=No();function o(s){var u=this.__data__=new e(s);this.size=u.size}return o.prototype.clear=t,o.prototype.delete=r,o.prototype.get=n,o.prototype.has=a,o.prototype.set=i,ft=o,ft}var ht,cn;function Uo(){if(cn)return ht;cn=1;var e="__lodash_hash_undefined__";function t(r){return this.__data__.set(r,e),this}return ht=t,ht}var pt,ln;function Wo(){if(ln)return pt;ln=1;function e(t){return this.__data__.has(t)}return pt=e,pt}var gt,un;function Ko(){if(un)return gt;un=1;var e=wa(),t=Uo(),r=Wo();function n(a){var i=-1,o=a==null?0:a.length;for(this.__data__=new e;++i<o;)this.add(a[i])}return n.prototype.add=n.prototype.push=t,n.prototype.has=r,gt=n,gt}var vt,dn;function Fo(){if(dn)return vt;dn=1;function e(t,r){for(var n=-1,a=t==null?0:t.length;++n<a;)if(r(t[n],n,t))return!0;return!1}return vt=e,vt}var mt,fn;function Vo(){if(fn)return mt;fn=1;function e(t,r){return t.has(r)}return mt=e,mt}var bt,hn;function Sa(){if(hn)return bt;hn=1;var e=Ko(),t=Fo(),r=Vo(),n=1,a=2;function i(o,s,u,d,p,g){var v=u&n,y=o.length,R=s.length;if(y!=R&&!(v&&R>y))return!1;var x=g.get(o),C=g.get(s);if(x&&C)return x==s&&C==o;var j=-1,_=!0,P=u&a?new e:void 0;for(g.set(o,s),g.set(s,o);++j<y;){var T=o[j],M=s[j];if(d)var S=v?d(M,T,j,s,o,g):d(T,M,j,o,s,g);if(S!==void 0){if(S)continue;_=!1;break}if(P){if(!t(s,function(l,f){if(!r(P,f)&&(T===l||p(T,l,u,d,g)))return P.push(f)})){_=!1;break}}else if(!(T===M||p(T,M,u,d,g))){_=!1;break}}return g.delete(o),g.delete(s),_}return bt=i,bt}var yt,pn;function Xo(){if(pn)return yt;pn=1;var e=ae(),t=e.Uint8Array;return yt=t,yt}var xt,gn;function Jo(){if(gn)return xt;gn=1;function e(t){var r=-1,n=Array(t.size);return t.forEach(function(a,i){n[++r]=[i,a]}),n}return xt=e,xt}var _t,vn;function Yo(){if(vn)return _t;vn=1;function e(t){var r=-1,n=Array(t.size);return t.forEach(function(a){n[++r]=a}),n}return _t=e,_t}var Ct,mn;function Qo(){if(mn)return Ct;mn=1;var e=Ei(),t=Xo(),r=xa(),n=Sa(),a=Jo(),i=Yo(),o=1,s=2,u="[object Boolean]",d="[object Date]",p="[object Error]",g="[object Map]",v="[object Number]",y="[object RegExp]",R="[object Set]",x="[object String]",C="[object Symbol]",j="[object ArrayBuffer]",_="[object DataView]",P=e?e.prototype:void 0,T=P?P.valueOf:void 0;function M(S,l,f,b,h,m,q){switch(f){case _:if(S.byteLength!=l.byteLength||S.byteOffset!=l.byteOffset)return!1;S=S.buffer,l=l.buffer;case j:return!(S.byteLength!=l.byteLength||!m(new t(S),new t(l)));case u:case d:case v:return r(+S,+l);case p:return S.name==l.name&&S.message==l.message;case y:case x:return S==l+"";case g:var A=a;case R:var O=b&o;if(A||(A=i),S.size!=l.size&&!O)return!1;var B=q.get(S);if(B)return B==l;b|=s,q.set(S,l);var H=n(A(S),A(l),b,h,m,q);return q.delete(S),H;case C:if(T)return T.call(S)==T.call(l)}return!1}return Ct=M,Ct}var wt,bn;function Zo(){if(bn)return wt;bn=1;function e(t,r){for(var n=-1,a=r.length,i=t.length;++n<a;)t[i+n]=r[n];return t}return wt=e,wt}var St,yn;function dr(){if(yn)return St;yn=1;var e=Array.isArray;return St=e,St}var Rt,xn;function es(){if(xn)return Rt;xn=1;var e=Zo(),t=dr();function r(n,a,i){var o=a(n);return t(n)?o:e(o,i(n))}return Rt=r,Rt}var jt,_n;function ts(){if(_n)return jt;_n=1;function e(t,r){for(var n=-1,a=t==null?0:t.length,i=0,o=[];++n<a;){var s=t[n];r(s,n,t)&&(o[i++]=s)}return o}return jt=e,jt}var Tt,Cn;function rs(){if(Cn)return Tt;Cn=1;function e(){return[]}return Tt=e,Tt}var qt,wn;function ns(){if(wn)return qt;wn=1;var e=ts(),t=rs(),r=Object.prototype,n=r.propertyIsEnumerable,a=Object.getOwnPropertySymbols,i=a?function(o){return o==null?[]:(o=Object(o),e(a(o),function(s){return n.call(o,s)}))}:t;return qt=i,qt}var Ot,Sn;function as(){if(Sn)return Ot;Sn=1;function e(t,r){for(var n=-1,a=Array(t);++n<t;)a[n]=r(n);return a}return Ot=e,Ot}var Pt,Rn;function is(){if(Rn)return Pt;Rn=1;var e=_e(),t=Ce(),r="[object Arguments]";function n(a){return t(a)&&e(a)==r}return Pt=n,Pt}var Et,jn;function os(){if(jn)return Et;jn=1;var e=is(),t=Ce(),r=Object.prototype,n=r.hasOwnProperty,a=r.propertyIsEnumerable,i=e((function(){return arguments})())?e:function(o){return t(o)&&n.call(o,"callee")&&!a.call(o,"callee")};return Et=i,Et}var fe={exports:{}},At,Tn;function ss(){if(Tn)return At;Tn=1;function e(){return!1}return At=e,At}fe.exports;var qn;function Ra(){return qn||(qn=1,(function(e,t){var r=ae(),n=ss(),a=t&&!t.nodeType&&t,i=a&&!0&&e&&!e.nodeType&&e,o=i&&i.exports===a,s=o?r.Buffer:void 0,u=s?s.isBuffer:void 0,d=u||n;e.exports=d})(fe,fe.exports)),fe.exports}var Mt,On;function cs(){if(On)return Mt;On=1;var e=9007199254740991,t=/^(?:0|[1-9]\d*)$/;function r(n,a){var i=typeof n;return a=a??e,!!a&&(i=="number"||i!="symbol"&&t.test(n))&&n>-1&&n%1==0&&n<a}return Mt=r,Mt}var Dt,Pn;function ja(){if(Pn)return Dt;Pn=1;var e=9007199254740991;function t(r){return typeof r=="number"&&r>-1&&r%1==0&&r<=e}return Dt=t,Dt}var It,En;function ls(){if(En)return It;En=1;var e=_e(),t=ja(),r=Ce(),n="[object Arguments]",a="[object Array]",i="[object Boolean]",o="[object Date]",s="[object Error]",u="[object Function]",d="[object Map]",p="[object Number]",g="[object Object]",v="[object RegExp]",y="[object Set]",R="[object String]",x="[object WeakMap]",C="[object ArrayBuffer]",j="[object DataView]",_="[object Float32Array]",P="[object Float64Array]",T="[object Int8Array]",M="[object Int16Array]",S="[object Int32Array]",l="[object Uint8Array]",f="[object Uint8ClampedArray]",b="[object Uint16Array]",h="[object Uint32Array]",m={};m[_]=m[P]=m[T]=m[M]=m[S]=m[l]=m[f]=m[b]=m[h]=!0,m[n]=m[a]=m[C]=m[i]=m[j]=m[o]=m[s]=m[u]=m[d]=m[p]=m[g]=m[v]=m[y]=m[R]=m[x]=!1;function q(A){return r(A)&&t(A.length)&&!!m[e(A)]}return It=q,It}var kt,An;function us(){if(An)return kt;An=1;function e(t){return function(r){return t(r)}}return kt=e,kt}var he={exports:{}};he.exports;var Mn;function ds(){return Mn||(Mn=1,(function(e,t){var r=Ai(),n=t&&!t.nodeType&&t,a=n&&!0&&e&&!e.nodeType&&e,i=a&&a.exports===n,o=i&&r.process,s=(function(){try{var u=a&&a.require&&a.require("util").types;return u||o&&o.binding&&o.binding("util")}catch{}})();e.exports=s})(he,he.exports)),he.exports}var $t,Dn;function Ta(){if(Dn)return $t;Dn=1;var e=ls(),t=us(),r=ds(),n=r&&r.isTypedArray,a=n?t(n):e;return $t=a,$t}var Bt,In;function fs(){if(In)return Bt;In=1;var e=as(),t=os(),r=dr(),n=Ra(),a=cs(),i=Ta(),o=Object.prototype,s=o.hasOwnProperty;function u(d,p){var g=r(d),v=!g&&t(d),y=!g&&!v&&n(d),R=!g&&!v&&!y&&i(d),x=g||v||y||R,C=x?e(d.length,String):[],j=C.length;for(var _ in d)(p||s.call(d,_))&&!(x&&(_=="length"||y&&(_=="offset"||_=="parent")||R&&(_=="buffer"||_=="byteLength"||_=="byteOffset")||a(_,j)))&&C.push(_);return C}return Bt=u,Bt}var Gt,kn;function hs(){if(kn)return Gt;kn=1;var e=Object.prototype;function t(r){var n=r&&r.constructor,a=typeof n=="function"&&n.prototype||e;return r===a}return Gt=t,Gt}var zt,$n;function ps(){if($n)return zt;$n=1;function e(t,r){return function(n){return t(r(n))}}return zt=e,zt}var Ht,Bn;function gs(){if(Bn)return Ht;Bn=1;var e=ps(),t=e(Object.keys,Object);return Ht=t,Ht}var Nt,Gn;function vs(){if(Gn)return Nt;Gn=1;var e=hs(),t=gs(),r=Object.prototype,n=r.hasOwnProperty;function a(i){if(!e(i))return t(i);var o=[];for(var s in Object(i))n.call(i,s)&&s!="constructor"&&o.push(s);return o}return Nt=a,Nt}var Lt,zn;function ms(){if(zn)return Lt;zn=1;var e=_a(),t=ja();function r(n){return n!=null&&t(n.length)&&!e(n)}return Lt=r,Lt}var Ut,Hn;function bs(){if(Hn)return Ut;Hn=1;var e=fs(),t=vs(),r=ms();function n(a){return r(a)?e(a):t(a)}return Ut=n,Ut}var Wt,Nn;function ys(){if(Nn)return Wt;Nn=1;var e=es(),t=ns(),r=bs();function n(a){return e(a,r,t)}return Wt=n,Wt}var Kt,Ln;function xs(){if(Ln)return Kt;Ln=1;var e=ys(),t=1,r=Object.prototype,n=r.hasOwnProperty;function a(i,o,s,u,d,p){var g=s&t,v=e(i),y=v.length,R=e(o),x=R.length;if(y!=x&&!g)return!1;for(var C=y;C--;){var j=v[C];if(!(g?j in o:n.call(o,j)))return!1}var _=p.get(i),P=p.get(o);if(_&&P)return _==o&&P==i;var T=!0;p.set(i,o),p.set(o,i);for(var M=g;++C<y;){j=v[C];var S=i[j],l=o[j];if(u)var f=g?u(l,S,j,o,i,p):u(S,l,j,i,o,p);if(!(f===void 0?S===l||d(S,l,s,u,p):f)){T=!1;break}M||(M=j=="constructor")}if(T&&!M){var b=i.constructor,h=o.constructor;b!=h&&"constructor"in i&&"constructor"in o&&!(typeof b=="function"&&b instanceof b&&typeof h=="function"&&h instanceof h)&&(T=!1)}return p.delete(i),p.delete(o),T}return Kt=a,Kt}var Ft,Un;function _s(){if(Un)return Ft;Un=1;var e=ce(),t=ae(),r=e(t,"DataView");return Ft=r,Ft}var Vt,Wn;function Cs(){if(Wn)return Vt;Wn=1;var e=ce(),t=ae(),r=e(t,"Promise");return Vt=r,Vt}var Xt,Kn;function ws(){if(Kn)return Xt;Kn=1;var e=ce(),t=ae(),r=e(t,"Set");return Xt=r,Xt}var Jt,Fn;function Ss(){if(Fn)return Jt;Fn=1;var e=ce(),t=ae(),r=e(t,"WeakMap");return Jt=r,Jt}var Yt,Vn;function Rs(){if(Vn)return Yt;Vn=1;var e=_s(),t=ur(),r=Cs(),n=ws(),a=Ss(),i=_e(),o=Ca(),s="[object Map]",u="[object Object]",d="[object Promise]",p="[object Set]",g="[object WeakMap]",v="[object DataView]",y=o(e),R=o(t),x=o(r),C=o(n),j=o(a),_=i;return(e&&_(new e(new ArrayBuffer(1)))!=v||t&&_(new t)!=s||r&&_(r.resolve())!=d||n&&_(new n)!=p||a&&_(new a)!=g)&&(_=function(P){var T=i(P),M=T==u?P.constructor:void 0,S=M?o(M):"";if(S)switch(S){case y:return v;case R:return s;case x:return d;case C:return p;case j:return g}return T}),Yt=_,Yt}var Qt,Xn;function js(){if(Xn)return Qt;Xn=1;var e=Lo(),t=Sa(),r=Qo(),n=xs(),a=Rs(),i=dr(),o=Ra(),s=Ta(),u=1,d="[object Arguments]",p="[object Array]",g="[object Object]",v=Object.prototype,y=v.hasOwnProperty;function R(x,C,j,_,P,T){var M=i(x),S=i(C),l=M?p:a(x),f=S?p:a(C);l=l==d?g:l,f=f==d?g:f;var b=l==g,h=f==g,m=l==f;if(m&&o(x)){if(!o(C))return!1;M=!0,b=!1}if(m&&!b)return T||(T=new e),M||s(x)?t(x,C,j,_,P,T):r(x,C,l,j,_,P,T);if(!(j&u)){var q=b&&y.call(x,"__wrapped__"),A=h&&y.call(C,"__wrapped__");if(q||A){var O=q?x.value():x,B=A?C.value():C;return T||(T=new e),P(O,B,j,_,T)}}return m?(T||(T=new e),n(x,C,j,_,P,T)):!1}return Qt=R,Qt}var Zt,Jn;function Ts(){if(Jn)return Zt;Jn=1;var e=js(),t=Ce();function r(n,a,i,o,s){return n===a?!0:n==null||a==null||!t(n)&&!t(a)?n!==n&&a!==a:e(n,a,i,o,r,s)}return Zt=r,Zt}var er,Yn;function qs(){if(Yn)return er;Yn=1;var e=Ts();function t(r,n){return e(r,n)}return er=t,er}var Os=qs();const cr=aa(Os),fr={dark:{default:{borderWidth:1,pieceSize:20,gapBetweenPieces:4,borderColor:Z("#fff",.28),completeColor:ve.dark.primary,backgroundColor:"#1a2822",readerColor:"#0a0a0a",readerHaloColor:Z("#fff",.55),rangeColor:"#cda184",rangeEmptyColor:Z("#cda184",.3)},mini:{cacheMaxHeight:420,borderWidth:2,pieceSize:26,gapBetweenPieces:5,borderColor:Z("#fff",.32),completeColor:ve.dark.primary,backgroundColor:"#1f3028",readerColor:"#0a0a0a",readerHaloColor:Z("#fff",.5),rangeColor:"#cda184",rangeEmptyColor:Z("#cda184",.32)}},light:{default:{borderWidth:1,pieceSize:20,gapBetweenPieces:4,borderColor:"#d0e6da",completeColor:ve.light.primary,backgroundColor:"#ffffff",readerColor:"#000",readerHaloColor:Z("#fff",.9),rangeColor:"#7e6bc4",rangeEmptyColor:Z("#afa6e3",.32)},mini:{cacheMaxHeight:420,borderWidth:2,pieceSize:26,gapBetweenPieces:5,borderColor:"#b7d9c8",completeColor:ve.light.primary,backgroundColor:"#f4faf7",readerColor:"#0a0a0a",readerHaloColor:Z("#fff",.9),rangeColor:"#7e6bc4",rangeEmptyColor:Z("#afa6e3",.36)}}},Ps=(e,t,r,n=0)=>{const a=e.pieceSize,i=e.gapBetweenPieces;if(!t||t<=0)return{pieceSize:a,gap:i};if(r){const o=t<280?7:t<400?9:11,s=Math.floor((t-8)/o)-i;return{pieceSize:Math.max(22,Math.min(28,s>0?s:a)),gap:Math.max(4,Math.min(i,6))}}return{pieceSize:Math.max(18,a),gap:Math.max(4,i)}},Qn=z.div`
  margin-top: 10px;
  text-transform: uppercase;
  align-self: center;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: ${({$themeType:e})=>e==="dark"?"rgba(255, 255, 255, 0.55)":"rgba(0, 0, 0, 0.5)"};
`,Es=z.div`
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
`,As=z.div`
  width: 100%;
  min-width: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  position: relative;

  ${({$isMini:e,$themeType:t})=>e?$`
          display: grid;
          justify-content: center;
          max-height: ${fr[t??"light"].mini.cacheMaxHeight}px;
        `:$`
          max-height: min(70vh, 640px);
        `}

  canvas {
    display: block;
    max-width: 100%;
  }
`,Ms=e=>Math.max(0,Math.min(1,e)),Ds=(e,t,r,n,a)=>{e.fillStyle=n,e.fillRect(0,0,t,t);const i=Ms(r/100);if(i<=0)return;if(i>=1){e.fillStyle=a,e.fillRect(0,0,t,t);return}const o=Math.max(2,Math.round(t*i));e.fillStyle=a,e.fillRect(0,t-o,t,Math.min(o,t))},le=(e,t,r,n)=>{const a=n/2;e.lineWidth=n,e.strokeStyle=r,e.strokeRect(a,a,t-n,t-n)},Is=({ctx:e,cells:t,canvasWidth:r,canvasHeight:n,piecesInOneRow:a,pieceSize:i,gap:o,startingX:s,theme:u,variant:d,isSnakeDebugMode:p,isMini:g})=>{const v=fr[u][d],{borderWidth:y,backgroundColor:R,borderColor:x,completeColor:C,readerColor:j,readerHaloColor:_,rangeColor:P,rangeEmptyColor:T}=v;e.clearRect(0,0,r,n),e.imageSmoothingEnabled=!1;const M=y%2===1?.5:0,S=u==="dark",l=T||(S?"rgba(205, 161, 132, 0.28)":"rgba(175, 166, 227, 0.32)");for(let f=0;f<t.length;f++){const b=t[f]||{percentage:0,priority:0},h=b.percentage||0,m=!!b.completed||h>=100,q=h>0&&!m,A=!!b.isReader,O=!!b.isReaderRange,B=f%a,H=Math.floor(f/a),L=s+B*(i+o)+M,N=H*(i+o)+M;e.save(),e.translate(L,N);const k=O&&!m&&!q?l:R;if(Ds(e,i,m?100:h,k,q||m?C:k),A?(_&&le(e,i,_,g?4:3),le(e,i,j,g?2.5:2)):O?le(e,i,P,2):q||m?le(e,i,C,Math.max(y,2)):le(e,i,x,y),p){const W=ha(b.priority||0);if(W){const K=Math.max(9,Math.min(g?13:11,Math.floor(i*.55)));e.font=`bold ${K}px ui-monospace, SFMono-Regular, Menlo, monospace`,e.textAlign="center",e.textBaseline="middle";const E=i/2,D=i/2;e.lineWidth=3,e.strokeStyle=S?"rgba(0,0,0,0.85)":"rgba(255,255,255,0.95)",e.strokeText(W,E,D),e.fillStyle=S?"#fff":"#1a1a1a",e.fillText(W,E,D)}}e.restore()}},ks=(e,t,r)=>{const n=Math.min(window.devicePixelRatio||1,2);e.width=Math.max(1,Math.round(t*n)),e.height=Math.max(1,Math.round(r*n)),e.style.width=`${t}px`,e.style.height=`${r}px`;const a=e.getContext("2d");return a?(a.setTransform(n,0,0,n,0,0),a):null},$s=(e,t,r)=>{const{piecesInOneRow:n,pieceSize:a,gap:i,startingX:o,cellCount:s}=r;if(n<1||s<1||a<=0)return-1;const u=a+i,d=e-o;if(d<0||t<0)return-1;const p=Math.floor(d/u),g=Math.floor(t/u);if(p<0||p>=n)return-1;const v=d-p*u,y=t-g*u;if(v>a||y>a)return-1;const R=g*n+p;return R<0||R>=s?-1:R},Bs=()=>({percentage:0,priority:0,isReader:!1,isReaderRange:!1}),Gs=({cache:e,isMini:t,mode:r,isSnakeDebugMode:n})=>{const{t:a}=X(),o=(r||(t?"mini":"detailed"))==="mini",[s,u]=w.useState({width:0,height:0}),{width:d}=s,p=w.useRef(null),g=w.useRef(null),v=w.useRef(null),y=w.useRef(0),R=w.useRef(!0),x=w.useRef(0),[C,j]=w.useState(null),_=w.useMemo(()=>Ni(d,o),[d,o]),P=Ki(e,_),T=P.cells,M=o?"mini":"default",{isDarkMode:S}=w.useContext(ia),l=S?or.DARK:or.LIGHT,f=fr[l][M],{cacheMaxHeight:b}=f,{pieceSize:h,gap:m}=w.useMemo(()=>Ps(f,d,o,T.length),[f,d,o,T.length]),q=d>0?o?Math.max(d-8,d*.96):d:0,A=h+m,O=q>0?Math.max(1,Math.floor(q/A)):0,B=w.useMemo(()=>O?T:[],[T,O]),H=O>0?Math.ceil((q-A*O)/2):0,L=o?4:6,N=O>0?Math.max(B.length>0?Math.ceil(B.length/O):L,L)*A:0,k=w.useMemo(()=>B.length>0?B:Array.from({length:Math.max(O,1)*L},Bs),[B,O,L]);w.useEffect(()=>{const E=p.current;if(!(!E||!q||!N||!O))return cancelAnimationFrame(y.current),y.current=requestAnimationFrame(()=>{const D=ks(E,q,N);D&&Is({ctx:D,cells:k,canvasWidth:q,canvasHeight:N,piecesInOneRow:O,pieceSize:h,gap:m,startingX:H,theme:l,variant:M,isSnakeDebugMode:n,isMini:o})}),()=>cancelAnimationFrame(y.current)},[N,q,O,H,h,m,k,M,o,l,n]),w.useEffect(()=>{if(!g.current||!O||A<=0||!R.current)return;const E=pa(e,_);if(!E||P.windowStart==null)return;const D=E.readerPiece-P.windowStart;if(D<0)return;const J=Math.floor(D/O)*A,V=g.current,ee=V.scrollTop,I=ee+V.clientHeight;(J<ee||J+A>I)&&(V.scrollTop=Math.max(0,J-V.clientHeight/3))},[e,_,P.windowStart,O,A,k]),w.useEffect(()=>{const E=g.current;if(!E)return;const D=()=>{R.current=!1,window.clearTimeout(x.current),x.current=window.setTimeout(()=>{R.current=!0},4e3)};return E.addEventListener("wheel",D,{passive:!0}),E.addEventListener("touchstart",D,{passive:!0}),E.addEventListener("pointerdown",D),()=>{window.clearTimeout(x.current),E.removeEventListener("wheel",D),E.removeEventListener("touchstart",D),E.removeEventListener("pointerdown",D)}},[d]);const W=w.useCallback(E=>{const D=E.pieceStart,F=E.pieceEnd;if(D==null)return"";const J=E.completed||(E.percentage||0)>=99.5?100:Math.round(E.percentage||0),V=ha(E.priority||0),ee=V?` · ${V}`:"";return F!=null&&F!==D?a("SnakeTooltipBucket",{start:D,end:F,fill:J})+ee:a("SnakeTooltipPiece",{id:D,fill:J})+ee},[a]),K=w.useCallback(E=>{if(!O){j(null);return}const D=p.current,F=v.current;if(!D||!F)return;const J=D.getBoundingClientRect(),V=F.getBoundingClientRect(),ee=E.clientX-J.left,I=E.clientY-J.top,G=$s(ee,I,{piecesInOneRow:O,pieceSize:h,gap:m,startingX:H,cellCount:k.length});if(G<0){j(null);return}const U=W(k[G]);if(!U){j(null);return}j({x:E.clientX-V.left+12,y:E.clientY-V.top+12,text:U})},[O,h,m,H,k,W]);return c.jsx(lr,{bounds:!0,onResize:({bounds:E})=>E&&u(E),children:({measureRef:E})=>c.jsxs("div",{style:{display:"flex",flexDirection:"column",width:"100%",minWidth:0,position:"relative"},ref:D=>{v.current=D,E(D)},children:[c.jsx(As,{ref:g,$themeType:l,$isMini:o,children:O>0&&N>0?c.jsx("canvas",{ref:p,onMouseMove:K,onMouseLeave:()=>j(null)}):null}),C&&c.jsx(Es,{style:{left:C.x,top:C.y},children:C.text}),P.windowStart!=null&&P.windowEnd!=null&&P.windowEnd>=P.windowStart&&c.jsx(Qn,{$themeType:l,children:a("SnakeFocusRange",{start:P.windowStart,end:P.windowEnd})}),o&&b!=null&&N>=b&&c.jsx(Qn,{$themeType:l,children:a("ScrollDown")})]})})},qa=w.memo(Gs,(e,t)=>e.isMini===t.isMini&&e.mode===t.mode&&e.isSnakeDebugMode===t.isSnakeDebugMode&&cr(e.cache.Pieces,t.cache.Pieces)&&cr(e.cache.Readers,t.cache.Readers)&&e.cache.PiecesCount===t.cache.PiecesCount&&e.cache.PiecesLength===t.cache.PiecesLength&&e.cache.Capacity===t.cache.Capacity&&e.cache.Filled===t.cache.Filled),Oa=$`
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
`,zs=z.table`
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

        ${Oa}
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
`,Hs=z.div`
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
`,Ns=z.div`
  ${({$isViewed:e,theme:{table:{defaultPrimaryColor:t,defaultSecondaryColor:r,defaultTertiaryColor:n,shortTableButtonsBGColor:a,viewedPrimaryColor:i,viewedSecondaryColor:o,viewedTertiaryColor:s}}})=>$`
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
          background: ${e?s:n};
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
        ${e&&Oa}
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
`;var ue={},tr,Zn;function Ls(){return Zn||(Zn=1,tr=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,r=[],n=0;n<e.rangeCount;n++)r.push(e.getRangeAt(n));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||r.forEach(function(a){e.addRange(a)}),t&&t.focus()}}),tr}var rr,ea;function Us(){if(ea)return rr;ea=1;var e=Ls(),t={"text/plain":"Text","text/html":"Url",default:"Text"},r="Copy to clipboard: #{key}, Enter";function n(i){var o=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return i.replace(/#{\s*key\s*}/g,o)}function a(i,o){var s,u,d,p,g,v,y=!1;o||(o={}),s=o.debug||!1;try{d=e(),p=document.createRange(),g=document.getSelection(),v=document.createElement("span"),v.textContent=i,v.ariaHidden="true",v.style.all="unset",v.style.position="fixed",v.style.top=0,v.style.clip="rect(0, 0, 0, 0)",v.style.whiteSpace="pre",v.style.webkitUserSelect="text",v.style.MozUserSelect="text",v.style.msUserSelect="text",v.style.userSelect="text",v.addEventListener("copy",function(x){if(x.stopPropagation(),o.format)if(x.preventDefault(),typeof x.clipboardData>"u"){s&&console.warn("unable to use e.clipboardData"),s&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var C=t[o.format]||t.default;window.clipboardData.setData(C,i)}else x.clipboardData.clearData(),x.clipboardData.setData(o.format,i);o.onCopy&&(x.preventDefault(),o.onCopy(x.clipboardData))}),document.body.appendChild(v),p.selectNodeContents(v),g.addRange(p);var R=document.execCommand("copy");if(!R)throw new Error("copy command was unsuccessful");y=!0}catch(x){s&&console.error("unable to copy using execCommand: ",x),s&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(o.format||"text",i),o.onCopy&&o.onCopy(window.clipboardData),y=!0}catch(C){s&&console.error("unable to copy using clipboardData: ",C),s&&console.error("falling back to prompt"),u=n("message"in o?o.message:r),window.prompt(u,i)}}finally{g&&(typeof g.removeRange=="function"?g.removeRange(p):g.removeAllRanges()),v&&document.body.removeChild(v),d()}return y}return rr=a,rr}var ta;function Ws(){if(ta)return ue;ta=1,Object.defineProperty(ue,"__esModule",{value:!0}),ue.CopyToClipboard=void 0;var e=n(Us()),t=n($a()),r=["text","onCopy","options","children"];function n(l){return l&&l.__esModule?l:{default:l}}function a(l){"@babel/helpers - typeof";return a=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(f){return typeof f}:function(f){return f&&typeof Symbol=="function"&&f.constructor===Symbol&&f!==Symbol.prototype?"symbol":typeof f},a(l)}function i(l,f){var b=Object.keys(l);if(Object.getOwnPropertySymbols){var h=Object.getOwnPropertySymbols(l);f&&(h=h.filter(function(m){return Object.getOwnPropertyDescriptor(l,m).enumerable})),b.push.apply(b,h)}return b}function o(l){for(var f=1;f<arguments.length;f++){var b=arguments[f]!=null?arguments[f]:{};f%2?i(Object(b),!0).forEach(function(h){P(l,h,b[h])}):Object.getOwnPropertyDescriptors?Object.defineProperties(l,Object.getOwnPropertyDescriptors(b)):i(Object(b)).forEach(function(h){Object.defineProperty(l,h,Object.getOwnPropertyDescriptor(b,h))})}return l}function s(l,f){if(l==null)return{};var b,h,m=u(l,f);if(Object.getOwnPropertySymbols){var q=Object.getOwnPropertySymbols(l);for(h=0;h<q.length;h++)b=q[h],f.indexOf(b)===-1&&{}.propertyIsEnumerable.call(l,b)&&(m[b]=l[b])}return m}function u(l,f){if(l==null)return{};var b={};for(var h in l)if({}.hasOwnProperty.call(l,h)){if(f.indexOf(h)!==-1)continue;b[h]=l[h]}return b}function d(l,f){if(!(l instanceof f))throw new TypeError("Cannot call a class as a function")}function p(l,f){for(var b=0;b<f.length;b++){var h=f[b];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(l,T(h.key),h)}}function g(l,f,b){return f&&p(l.prototype,f),Object.defineProperty(l,"prototype",{writable:!1}),l}function v(l,f,b){return f=C(f),y(l,x()?Reflect.construct(f,b||[],C(l).constructor):f.apply(l,b))}function y(l,f){if(f&&(a(f)=="object"||typeof f=="function"))return f;if(f!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return R(l)}function R(l){if(l===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return l}function x(){try{var l=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(x=function(){return!!l})()}function C(l){return C=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(f){return f.__proto__||Object.getPrototypeOf(f)},C(l)}function j(l,f){if(typeof f!="function"&&f!==null)throw new TypeError("Super expression must either be null or a function");l.prototype=Object.create(f&&f.prototype,{constructor:{value:l,writable:!0,configurable:!0}}),Object.defineProperty(l,"prototype",{writable:!1}),f&&_(l,f)}function _(l,f){return _=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(b,h){return b.__proto__=h,b},_(l,f)}function P(l,f,b){return(f=T(f))in l?Object.defineProperty(l,f,{value:b,enumerable:!0,configurable:!0,writable:!0}):l[f]=b,l}function T(l){var f=M(l,"string");return a(f)=="symbol"?f:f+""}function M(l,f){if(a(l)!="object"||!l)return l;var b=l[Symbol.toPrimitive];if(b!==void 0){var h=b.call(l,f);if(a(h)!="object")return h;throw new TypeError("@@toPrimitive must return a primitive value.")}return(f==="string"?String:Number)(l)}var S=ue.CopyToClipboard=(function(l){function f(){var b;d(this,f);for(var h=arguments.length,m=new Array(h),q=0;q<h;q++)m[q]=arguments[q];return b=v(this,f,[].concat(m)),P(b,"onClick",function(A){var O=b.props,B=O.text,H=O.onCopy,L=O.children,N=O.options,k=t.default.Children.only(L),W=(0,e.default)(B,N);H&&H(B,W),k!=null&&k.props&&typeof k.props.onClick=="function"&&k.props.onClick(A)}),b}return j(f,l),g(f,[{key:"render",value:function(){var h=this.props;h.text,h.onCopy,h.options;var m=h.children,q=s(h,r),A=t.default.Children.only(m);return t.default.cloneElement(A,o(o({},q),{},{onClick:this.onClick}))}}])})(t.default.PureComponent);return P(S,"defaultProps",{onCopy:void 0,options:void 0}),ue}var nr,ra;function Ks(){if(ra)return nr;ra=1;var e=Ws(),t=e.CopyToClipboard;return t.CopyToClipboard=t,nr=t,nr}var Pa=Ks();const Fs=aa(Pa),be={width:"100%",minWidth:0};function na({preloadLabel:e,onPreload:t,playerSupported:r,playerTitle:n,playerSrc:a,downloadSrc:i,hls:o,heartbeatSrc:s,onPlayerNotSupported:u,openLinkHref:d,showOpenLink:p,copyText:g,externalPlayers:v}){const{t:y}=X(),R=oa();return c.jsxs("div",{className:"button-cell",children:[c.jsx(Oe,{title:e,children:c.jsx(Y,{onClick:t,variant:"outlined",color:"primary",size:"small",sx:be,children:e})}),r?c.jsx(Ha,{title:n,videoSrc:a,downloadSrc:i,hls:o,heartbeatSrc:s,onNotSupported:u,inlineTrigger:!0}):p&&d&&c.jsx(Oe,{title:y("OpenLink"),children:c.jsx(Y,{component:"a",href:d,target:"_blank",rel:"noreferrer",variant:"outlined",color:"primary",size:"small",sx:be,children:y("OpenLink")})}),v.map(x=>c.jsx(Oe,{title:x.label,children:c.jsx(Y,{component:"a",href:x.href,variant:"outlined",color:"primary",size:"small",sx:be,children:x.label})},x.label)),c.jsx(Fs,{text:g,onCopy:()=>R==null?void 0:R.showToast({message:y("Copied",{defaultValue:"Copied"}),severity:"success"}),children:c.jsx(Y,{variant:"outlined",color:"primary",size:"small",sx:be,children:y("CopyLink")})})]})}Q.addHandler("episode",/(\d{1,4})[- |. ]серия|серия[- |. ](\d{1,4})/i,{type:"integer"});Q.addHandler("season",/sezon[- |. ](\d{1,3})|(\d{1,3})[- |. ]sezon/i,{type:"integer"});Q.addHandler("season",/сезон[- |. ](\d{1,3})|(\d{1,3})[- |. ]сезон/i,{type:"integer"});const Vs=w.memo(({playableFileList:e,viewedFileList:t,selectedSeason:r,seasonAmount:n,hash:a})=>{const{t:i}=X(),[o,s]=w.useState({}),u=Na(),d=h=>fetch(`${pr()}?link=${a}&index=${h}&preload`),p=(h,m)=>`${pr()}/${encodeURIComponent(h.split("\\").pop().split("/").pop())}?link=${a}&index=${m}&play`,g=(h,m)=>{const q=Ka(h,u);return{key:`${m}:${q?"gst":"stream"}`,src:q?Va(a,m):p(h,m),hls:q,heartbeatSrc:q?Fa(a):""}},v=h=>{s(m=>({...m,[h]:!0}))},y=!!(e!=null&&e.find(({path:h})=>Q.parse(h).episode)),R=!!(e!=null&&e.find(({path:h})=>Q.parse(h).season)),x=!!(e!=null&&e.find(({path:h})=>Q.parse(h).resolution)),C=((e==null?void 0:e.length)??0)>1&&!y,j=de("isVlcUsed"),_=de("isInfuseUsed"),P=de("isSenPlayerUsed"),T=de("isIinaUsed"),M=La(),S=Ua(),l=Wa(),f=!M||!(l&&_)&&!(l&&P)&&!j&&!(S&&T),b=(h,m,q,A)=>{const O=[];return l&&_&&O.push({label:i("Infuse"),href:m}),l&&P&&O.push({label:i("SenPlayer"),href:q}),j&&O.push({label:"VLC",href:`vlc://${h}`}),S&&T&&O.push({label:"IINA",href:A}),O};return e!=null&&e.length?c.jsxs(c.Fragment,{children:[c.jsxs(zs,{children:[c.jsx("thead",{children:c.jsxs("tr",{children:[c.jsx("th",{style:{width:"0"},children:i("Viewed")}),c.jsx("th",{children:i("Name")}),R&&(n==null?void 0:n.length)===1&&c.jsx("th",{style:{width:"0"},children:i("Season")}),y&&c.jsx("th",{style:{width:"0"},children:i("Episode")}),x&&c.jsx("th",{style:{width:"0"},children:i("Resolution")}),c.jsx("th",{style:{width:"100px"},children:i("Size")}),c.jsx("th",{style:{width:"340px"},children:i("Actions")})]})}),c.jsx("tbody",{children:e.map(({id:h,path:m,length:q})=>{const{title:A,resolution:O,episode:B,season:H}=Q.parse(m),L=t==null?void 0:t.includes(h),N=p(m,h),k=g(m,h),W=!o[k.key],K=new URL(N,window.location.href),E=`infuse://x-callback-url/play?url=${encodeURIComponent(K.toString())}`,D=`senplayer://x-callback-url/play?url=${encodeURIComponent(K.toString())}`,F=`iina://weblink?url=${encodeURIComponent(K.toString())}`;return(H===r||!(n!=null&&n.length))&&c.jsxs("tr",{className:L?"viewed-file-row":void 0,children:[c.jsx("td",{"data-label":"viewed","aria-label":"viewed",className:L?"viewed-file-indicator":void 0}),c.jsx("td",{"data-label":"name",children:C?m:A}),R&&(n==null?void 0:n.length)===1&&c.jsx("td",{"data-label":"season",children:H}),y&&c.jsx("td",{"data-label":"episode",children:B}),x&&c.jsx("td",{"data-label":"resolution",children:O}),c.jsx("td",{"data-label":"size",children:ne(q)}),c.jsx("td",{children:c.jsx(na,{preloadLabel:i("Preload"),onPreload:()=>d(h),playerSupported:W,playerTitle:A,playerSrc:k.src,downloadSrc:N,hls:k.hls,heartbeatSrc:k.heartbeatSrc,onPlayerNotSupported:()=>v(k.key),openLinkHref:N,showOpenLink:f,copyText:K.toString(),externalPlayers:b(K,E,D,F)})})]},h)})})]}),c.jsx(Hs,{children:e.map(({id:h,path:m,length:q})=>{const{title:A,resolution:O,episode:B,season:H}=Q.parse(m),L=t==null?void 0:t.includes(h),N=p(m,h),k=g(m,h),W=!o[k.key],K=new URL(N,window.location.href),E=`infuse://x-callback-url/play?url=${encodeURIComponent(K.toString())}`,D=`senplayer://x-callback-url/play?url=${encodeURIComponent(K.toString())}`,F=`iina://weblink?url=${encodeURIComponent(K.toString())}`;return(H===r||!(n!=null&&n.length))&&c.jsxs(Ns,{$isViewed:L,children:[c.jsx("div",{className:"short-table-name",children:C?m:A}),c.jsxs("div",{className:"short-table-data",children:[L&&c.jsxs("div",{className:"short-table-field",children:[c.jsx("div",{className:"short-table-field-name",children:i("Viewed")}),c.jsx("div",{className:"short-table-field-value",children:c.jsx("div",{className:"short-table-viewed-indicator"})})]}),R&&(n==null?void 0:n.length)===1&&c.jsxs("div",{className:"short-table-field",children:[c.jsx("div",{className:"short-table-field-name",children:i("Season")}),c.jsx("div",{className:"short-table-field-value",children:H})]}),y&&c.jsxs("div",{className:"short-table-field",children:[c.jsx("div",{className:"short-table-field-name",children:i("Episode")}),c.jsx("div",{className:"short-table-field-value",children:B})]}),x&&c.jsxs("div",{className:"short-table-field",children:[c.jsx("div",{className:"short-table-field-name",children:i("Resolution")}),c.jsx("div",{className:"short-table-field-value",children:O})]}),c.jsxs("div",{className:"short-table-field",children:[c.jsx("div",{className:"short-table-field-name",children:i("Size")}),c.jsx("div",{className:"short-table-field-value",children:ne(q)})]})]}),c.jsx("div",{className:"short-table-buttons",children:c.jsx(na,{preloadLabel:i("Preload"),onPreload:()=>d(h),playerSupported:W,playerTitle:A,playerSrc:k.src,downloadSrc:N,hls:k.hls,heartbeatSrc:k.heartbeatSrc,onPlayerNotSupported:()=>v(k.key),openLinkHref:N,showOpenLink:f,copyText:K.toString(),externalPlayers:b(K,E,D,F)})})]},h)})})]}):i("NoPlayableFiles")},(e,t)=>cr(e,t)),Xs=z.div`
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

    @media (max-width: 1200px) {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: repeat(3, min-content);
      grid-template-areas:
        'main'
        'cache'
        'file-list';
    }
  `}
`,Js=z.div`
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

    @media (max-width: 840px) {
      ${e?$`
              height: 200px;
            `:$`
              display: none;
            `}
    }
  `}
`,Ys=z.section`
  ${({theme:{dialogTorrentDetailsContent:{gradientStartColor:e,gradientEndColor:t}}})=>$`
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
`,Qs=z.section`
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
      padding: 16px;
    }

    @media (max-width: 420px) {
      padding: 12px;
    }
  `}
`,Zs=z.section`
  ${({theme:{dialogTorrentDetailsContent:{torrentFilesSectionBGColor:e}}})=>$`
    grid-area: file-list;
    padding: 40px;
    box-shadow: inset 3px 25px 8px -25px rgba(0, 0, 0, 0.5);
    background: ${e};
    min-height: 100%;

    @media (max-width: 800px) {
      padding: 20px;
    }
  `}
`,pe=z.div`
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
`,ec=z.div`
  margin-bottom: 20px;
`,Ea=z.div`
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
          }
          @media (max-width: 390px) {
            grid-template-columns: minmax(0, 1fr);
          }
        `}
`,tc=z.div`
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
`,rc=z.div`
  ${({theme:{dialogTorrentDetailsContent:{titleFontColor:e}}})=>$`
    grid-area: title;
    justify-self: start;
    text-transform: uppercase;
    font-size: 11px;
    margin-bottom: 2px;
    font-weight: 500;
    color: ${e};
  `}
`,nc=z.div`
  ${({$bgColor:e,$fontColor:t})=>$`
    grid-area: icon;
    color: ${t||Z("#fff",.8)};
    background: ${e};
    border-radius: 8px 0 0 8px;

    @media (max-width: 800px) {
      > svg {
        width: 50%;
      }
    }
  `}
`,ac=z.div`
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
`,ic=z.div`
  ${({theme:{addDialog:{separatorColor:e}}})=>$`
    height: 1px;
    background-color: ${e};
    margin: 20px 0;
  `}
`,oc=z.div`
  ${({theme:{dialogTorrentDetailsContent:{torrentFilesSectionBGColor:e}}})=>$`
    overflow: auto;
    min-height: 100%;
    background: ${e};
  `}
`,sc=z.section`
  ${({theme:{detailedView:{gradientStartColor:e,gradientEndColor:t}}})=>$`
    padding: 40px;
    background: linear-gradient(145deg, ${e}, ${t});

    @media (max-width: 800px) {
      padding: 20px;
    }
  `}
`,cc=z.section`
  ${({theme:{detailedView:{cacheSectionBGColor:e}}})=>$`
    padding: 40px;
    box-shadow: inset 3px 25px 8px -25px rgba(0, 0, 0, 0.5);
    background: ${e};
    flex: 1;

    @media (max-width: 800px) {
      padding: 20px;
    }
  `}
`;function ie({icon:e,title:t,value:r,iconBg:n,valueBg:a,fontColor:i}){return c.jsxs(tc,{children:[c.jsx(rc,{children:t}),c.jsx(nc,{$bgColor:n,$fontColor:i,children:c.jsx(e,{})}),c.jsx(ac,{$bgColor:a,$fontColor:i,children:r})]})}const{LIGHT:lc,DARK:uc}=or,dc={light:{downloadSpeed:{iconBGColor:"#118f00",valueBGColor:"#13a300"},uploadSpeed:{iconBGColor:"#0146ad",valueBGColor:"#0058db"},peers:{iconBGColor:"#cdc118",valueBGColor:"#d8cb18",fontColor:"#1a1a1a"},piecesCount:{iconBGColor:"#b6c95e",valueBGColor:"#c0d076"},piecesLength:{iconBGColor:"#0982c8",valueBGColor:"#098cd7"},status:{iconBGColor:"#aea25b",valueBGColor:"#b4aa6e"},size:{iconBGColor:"#9b01ad",valueBGColor:"#ac03bf"},category:{iconBGColor:"#914820",valueBGColor:"#c9632c"}},dark:{downloadSpeed:{iconBGColor:"#0c6600",valueBGColor:"#0d7000"},uploadSpeed:{iconBGColor:"#003f9e",valueBGColor:"#0047b3"},peers:{iconBGColor:"#a69c11",valueBGColor:"#b4a913",fontColor:"#1a1a1a"},piecesCount:{iconBGColor:"#8da136",valueBGColor:"#99ae3d"},piecesLength:{iconBGColor:"#07659c",valueBGColor:"#0872af"},status:{iconBGColor:"#938948",valueBGColor:"#9f9450"},size:{iconBGColor:"#81008f",valueBGColor:"#9102a1"},category:{iconBGColor:"#914820",valueBGColor:"#c9632c"}}};function oe(e){const{isDarkMode:t}=w.useContext(ia);return dc[t?uc:lc][e]}const Aa=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=oe("downloadSpeed");return c.jsx(ie,{title:t("DownloadSpeed"),value:sa(e)||`0 ${t("bps")}`,iconBg:r,valueBg:n,icon:fi})},Ma=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=oe("uploadSpeed");return c.jsx(ie,{title:t("UploadSpeed"),value:sa(e)||`0 ${t("bps")}`,iconBg:r,valueBg:n,icon:hi})},Da=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n,fontColor:a}=oe("peers");return c.jsx(ie,{title:t("Peers"),value:Xa(e)||"0 / 0 · 0",iconBg:r,valueBg:n,fontColor:a,icon:pi})},fc=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=oe("piecesCount");return c.jsx(ie,{title:t("PiecesCount"),value:e,iconBg:r,valueBg:n,icon:vi})},hc=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=oe("piecesLength");return c.jsx(ie,{title:t("PiecesLength"),value:ne(e),iconBg:r,valueBg:n,icon:mi})},Ia=({stat:e})=>{const{t}=X(),r={[la]:t("TorrentGettingInfo"),[Qa]:t("TorrentPreload"),[Ya]:t("TorrentWorking"),[Ja]:t("TorrentClosed"),[ca]:t("TorrentInDb")},{iconBGColor:n,valueBGColor:a}=oe("status");return c.jsx(ie,{title:t("TorrentStatus"),value:e!=null?r[e]:void 0,iconBg:n,valueBg:a,icon:bi})},ka=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=oe("size");return c.jsx(ie,{title:t("TorrentSize"),value:ne(e),iconBg:r,valueBg:n,icon:gi})},pc=({data:e})=>{const{t}=X(),{iconBGColor:r,valueBGColor:n}=oe("category"),a=gr.findIndex(o=>o.key===e),i=gr.find(o=>o.key===e);return e?c.jsx(ie,{title:t("Category"),value:a>=0?t(i.name):e.length>1?e.charAt(0).toUpperCase()+e.slice(1):e,iconBg:r,valueBg:n,icon:yi}):null};function gc({downloadSpeed:e,uploadSpeed:t,torrent:r,torrentSize:n,PiecesCount:a,PiecesLength:i,stat:o,cache:s,isSnakeDebugMode:u,setIsSnakeDebugMode:d}){const{t:p}=X();return c.jsxs(c.Fragment,{children:[c.jsxs(sc,{children:[c.jsx(re,{$mb:20,children:p("Data")}),c.jsxs(Ea,{$detailedView:!0,children:[c.jsx(Aa,{data:e}),c.jsx(Ma,{data:t}),c.jsx(Da,{data:r}),c.jsx(ka,{data:n}),c.jsx(fc,{data:a}),c.jsx(hc,{data:i}),c.jsx(Ia,{stat:o})]})]}),c.jsxs(cc,{children:[c.jsx(re,{$mb:20,children:c.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[c.jsx("span",{children:p("Cache")}),c.jsx(xi,{control:c.jsx(_i,{color:"primary",checked:u,disableRipple:!0,onChange:({target:{checked:g}})=>{d(g),Za("isSnakeDebugMode",g)}}),label:p("DebugMode"),labelPlacement:"start"})]})}),c.jsx(qa,{cache:s,mode:"detailed",isSnakeDebugMode:u})]})]})}const ar=z.div`
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
`,ir=z.div`
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
`,vc=w.memo(({hash:e,viewedFileList:t,playableFileList:r,name:n,title:a,setViewedFileList:i})=>{var _;const{t:o}=X(),s=oa(),[u,d]=w.useState(null),p=t==null?void 0:t[(t==null?void 0:t.length)-1],g=(_=r==null?void 0:r.find(({id:P})=>P===p))==null?void 0:_.path,v=(r==null?void 0:r.length)===1,y=g?Q.parse(g):null,R=`${ei()}/${encodeURIComponent(n||a||"file")}.m3u?link=${e}&m3u`,x=`${R}&fromlast`,C=`magnet:?xt=urn:btih:${e}&dn=${encodeURIComponent(n||a||"")}`,j=()=>{u==="drop"&&ge.post(ti(),{action:"drop",hash:e}).then(()=>s==null?void 0:s.showToast({message:o("DropTorrent"),severity:"success"})).catch(()=>s==null?void 0:s.showToast({message:o("PlaybackError"),severity:"error"})),u==="views"&&ge.post(ua(),{action:"rem",hash:e,file_index:-1}).then(()=>{i(),s==null||s.showToast({message:o("RemoveViews"),severity:"success"})}).catch(()=>s==null?void 0:s.showToast({message:o("PlaybackError"),severity:"error"})),d(null)};return c.jsxs(c.Fragment,{children:[!v&&!!(t!=null&&t.length)&&c.jsxs(c.Fragment,{children:[c.jsx(ir,{children:o("DownloadPlaylist")}),c.jsxs(pe,{$mb:10,children:[o("LatestFilePlayed")," ",c.jsxs("strong",{children:[y==null?void 0:y.title,".",(y==null?void 0:y.season)&&c.jsxs(c.Fragment,{children:[" ",o("Season"),": ",y==null?void 0:y.season,". ",o("Episode"),": ",y==null?void 0:y.episode,"."]})]})]}),c.jsxs(ar,{children:[c.jsx(Y,{component:"a",href:R,variant:"contained",color:"primary",size:"large",children:o("Full")}),c.jsx(Y,{component:"a",href:x,variant:"contained",color:"primary",size:"large",children:o("FromLatestFile")})]})]}),c.jsx(ir,{$mb:10,children:o("TorrentState")}),c.jsxs(ar,{children:[c.jsx(Y,{onClick:()=>d("views"),variant:"outlined",color:"primary",size:"large",children:o("RemoveViews")}),c.jsx(Y,{onClick:()=>d("drop"),variant:"contained",color:"error",size:"large",children:o("DropTorrent")})]}),c.jsx(ir,{$mb:10,children:o("Info")}),c.jsxs(ar,{children:[(v||!(t!=null&&t.length))&&c.jsx(Y,{component:"a",href:R,variant:"contained",color:"primary",size:"large",children:o("DownloadPlaylist")}),c.jsx(Pa.CopyToClipboard,{text:C,onCopy:()=>s==null?void 0:s.showToast({message:o("Copied"),severity:"success"}),children:c.jsx(Y,{variant:"contained",color:"primary",size:"large",children:o("CopyHash")})})]}),c.jsxs(Ci,{open:u!=null,onClose:()=>d(null),"aria-labelledby":"torrent-fn-confirm-title",children:[c.jsx(wi,{id:"torrent-fn-confirm-title",children:o(u==="drop"?"DropTorrent":"RemoveViews")}),c.jsx(Si,{children:c.jsx(Ri,{children:o(u==="drop"?"ConfirmDropTorrent":"ConfirmRemoveViews")})}),c.jsxs(ji,{children:[c.jsx(Y,{autoFocus:!0,onClick:()=>d(null),variant:"outlined",color:"primary",children:o("Cancel")}),c.jsx(Y,{onClick:j,variant:"contained",color:u==="drop"?"error":"primary",children:o("OK")})]})]})]})}),mc=()=>c.jsx("div",{style:{minHeight:"80vh",display:"grid",placeItems:"center"},children:c.jsx(Pi,{color:"secondary"})}),bc=e=>({id:e.id??e.Id??0,path:e.path??e.Path??"",length:e.length??e.Length??0});function Sc({closeDialog:e,torrent:t}){var ee;const{t:r}=X(),{dialogTorrentDetailsContent:{bufferTrailStartColor:n,bufferTrailEndColor:a,bufferEmptyTrackColor:i,bufferTrackBorderColor:o}}=ri(),[s,u]=w.useState(!0),[d,p]=w.useState(!1),[g,v]=w.useState(),[y,R]=w.useState(),[x,C]=w.useState(null),[j,_]=w.useState(),[P,T]=w.useState(de("isSnakeDebugMode")),{poster:M,hash:S,title:l,category:f,name:b,stat:h,download_speed:m,upload_speed:q,torrent_size:A,file_stats:O}=t,B=Wi(S),H=Fi(),{Capacity:L,PiecesCount:N,PiecesLength:k,Filled:W}=B;w.useEffect(()=>{if(y&&x===null){const I=[];y.forEach(({path:G})=>{const U=Q.parse(G).season;U&&!I.includes(U)&&I.push(U)}),I.length&&_(I[0]),C(I.sort((G,U)=>G-U))}},[y,x]),w.useEffect(()=>{R(O==null?void 0:O.map(bc).filter(({path:I})=>ni(I)))},[O]),w.useEffect(()=>{const I=!!Object.entries(B).length,G=h!==la&&h!==ca;!I&&!s&&u(!0),I&&s&&G&&u(!1)},[h,B,s]),w.useEffect(()=>{ge.post(ua(),{action:"list",hash:S}).then(({data:I})=>{if(I){const G=I.map(U=>U.file_index).sort((U,hr)=>U-hr);v(G)}else v(void 0)})},[S]);const K=H==null?void 0:H.PreloadCache,E=(L||0)/100*(K||0),D=E>33554432?E:33554432,F=L&&L>0?L:D,J=F>0&&W!=null&&W>0?Math.min(100,Math.round(W*100/F)):null,V=()=>{const I=[],G=b?Q.parse(b):null;l!==b?I.push(vr(l||"")):G!=null&&G.title&&I.push(vr(G.title)),G!=null&&G.year&&!String(I[0]||"").includes(String(G.year))&&I.push(G.year),G!=null&&G.resolution&&!String(I[0]||"").includes(String(G.resolution))&&I.push(G.resolution);const U=I.join(". ");return U[U.length-1]==="."&&U[U.length-2]==="."?`${U}.`:U};return c.jsxs(c.Fragment,{children:[c.jsx(Vi,{onClose:e,title:r(d?"DetailedCacheView.header":"TorrentDetails"),...d&&{onBack:()=>p(!1)}}),c.jsx(oc,{style:{...d&&{display:"flex",flexDirection:"column"}},children:s?c.jsx(mc,{}):d?c.jsx(gc,{downloadSpeed:m,uploadSpeed:q,torrent:t,torrentSize:A,PiecesCount:N,PiecesLength:k,stat:h,cache:B,isSnakeDebugMode:P,setIsSnakeDebugMode:T}):c.jsxs(Xs,{children:[c.jsxs(Ys,{children:[c.jsx(Js,{$poster:!!M,children:M?c.jsx("img",{alt:"poster",src:M}):c.jsx(ai,{})}),c.jsxs("div",{children:[l&&b!==l?V().length>90?c.jsxs(c.Fragment,{children:[c.jsx(re,{children:Q.parse(b||"").title}),c.jsx(pe,{$mb:20,children:V()})]}):c.jsxs(c.Fragment,{children:[c.jsx(re,{children:V()}),c.jsx(pe,{$mb:20,children:(ee=Q.parse(b||""))==null?void 0:ee.title})]}):c.jsx(re,{$mb:20,children:V()}),c.jsxs(Ea,{children:[c.jsx(Aa,{data:m}),c.jsx(Ma,{data:q}),c.jsx(Da,{data:t}),c.jsx(ka,{data:A}),c.jsx(Ia,{stat:h}),c.jsx(pc,{data:f})]}),c.jsx(ic,{}),c.jsx(vc,{hash:S,viewedFileList:g,playableFileList:y,name:b,title:l,setViewedFileList:v})]})]}),c.jsxs(Qs,{children:[c.jsxs(ec,{children:[c.jsx(re,{$mb:12,children:r("Buffer")}),D<=33554432&&c.jsx(pe,{children:r("BufferNote")}),c.jsxs(Ti,{spacing:1,sx:{mt:.5},children:[c.jsxs(da,{component:"div",variant:"body2",fontWeight:600,textAlign:"center","aria-label":`${ne(W||0)} / ${ne(F)}`,children:[`${ne(W||0)} / ${ne(F)}`,J!=null?` · ${J}%`:""]}),c.jsx(qi,{variant:"determinate",value:J??0,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":J??0,sx:{height:10,borderRadius:1,border:`1px solid ${o}`,backgroundColor:i,"& .MuiLinearProgress-bar":{borderRadius:1,background:`linear-gradient(90deg, ${n}, ${a})`}}})]})]}),c.jsx(qa,{isMini:!0,cache:B,isSnakeDebugMode:P}),c.jsx(Y,{style:{marginTop:"20px",width:"100%"},variant:"outlined",color:"primary",size:"large",onClick:()=>p(!0),children:r("DetailedCacheView.button")})]}),c.jsxs(Zs,{children:[c.jsx(re,{$mb:20,children:r("TorrentContent")}),((x==null?void 0:x.length)??0)>1&&c.jsxs(c.Fragment,{children:[c.jsx(pe,{$mb:7,children:r("SelectSeason")}),c.jsx(Oi,{style:{marginBottom:"30px",flexWrap:"wrap",rowGap:8},color:"secondary",children:x.map(I=>c.jsx(Y,{variant:j===I?"contained":"outlined",onClick:()=>_(I),children:I},I))}),c.jsxs(re,{$mb:20,children:[r("Season")," ",j]})]}),c.jsx(Vs,{hash:S,playableFileList:y,viewedFileList:g,selectedSeason:j,seasonAmount:x})]})]})})]})}export{Sc as default};
