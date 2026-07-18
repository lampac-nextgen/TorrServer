import{a as x,d as ye,u as U,j as c,n as De,g as ha,r as Va}from"./vendor-B9KbAPe3.js";import{V as _r,s as Xa,W as Ya,X as _e,j as te,Y as pa,Z as hr,$ as ga,a0 as Ja,m as I,r as K,a1 as Za,a2 as Qa,E as Z,a3 as ge,a4 as eo,a5 as to,a6 as ro,a7 as oe,a8 as xr,a9 as no,aa as ao,ab as oo,ac as va,ad as io,ae as ma,af as so,ag as co,ah as lo,ai as ba,T as Cr,aj as uo,ak as fo,h as ho,al as ya,am as po,N as go,an as wr}from"./index-qlJepFVn.js";import{bs as vo,m as Sr,bt as mo,ai as Te,aE as bo,s as yo,b5 as _o,_ as xo,br as re,e as H,as as z,T as ke,B as J,aj as Co,aB as ce,bp as wo,bo as So,bu as Ro,bv as To,bw as jo,bx as qo,by as Oo,bf as Rr,z as Ao,U as Mo,au as Po,aA as Eo,aF as Do,bz as ko,aV as Io,f as $o,aZ as Tr,q as Bo,C as Go}from"./mui-CQrYzQbN.js";import{_ as zo,a as Ho,D as Lo,S as No,T as _a,b as Uo}from"./mui-x-BsuPfBex.js";import{a as je,c as xa,r as ie,d as Wo,b as qe,e as Fo}from"./isObjectLike-Ddue8m3w.js";import"./hls-CWTT-7hy.js";const Ko=16,Vo=10,Xo=(e,t,r)=>{if(e==null||t==null||r<=0)return null;const n=Math.max(0,Math.min(r-1,Math.floor(e))),a=Math.max(0,Math.min(r-1,Math.floor(t)));return a<n?null:{start:n,end:a}},Yo=(e,t,r,n)=>{const a=Xo(e,t,r);if(a)for(let i=a.start;i<=a.end;i++)n(i)},Jo=(e,t)=>{if(e){if(Array.isArray(e)){for(let r=0;r<e.length;r++){const n=e[r];n&&t(r,n)}return}for(const[r,n]of Object.entries(e)){if(!n)continue;const a=Number(r);Number.isFinite(a)&&t(a,n)}}},Zo=(e,t)=>{if(!e)return 0;const r=e.Length||t||0,n=e.Size||0;if(r<=0)return n>0?100:0;const a=Math.min(n,r);return Math.min(100,a/r*100)},Qo=(e,t,r,n)=>{if(!(n!=null&&n.length))return t>=2?t:0;if(n.some(o=>o.Reader===e))return 5;if(t>=2)return t;if(r)return 0;let i=0;for(const o of n){if(o.Reader==null||o.Start==null||o.End==null)continue;const s=o.Reader,l=o.End;if(e<s||e>l)continue;let d=2;if(e===s+1)d=4;else{const h=Math.max(1,l-s),p=s+Math.max(2,Math.floor(h*.45));e<=p?d=3:e<=p+5&&(d=2)}d>i&&(i=d)}return i>0?i:t},Ca=e=>e===2?"H":e===3?"R":e===4?"N":e===5?"A":"",ei=(e,t,r,n,a,i)=>{const o=Zo(t,r),s=!!(t!=null&&t.Completed)||o>=100,l=(t==null?void 0:t.Priority)||0;return{percentage:s?100:o,priority:Qo(e,l,s,i),completed:s,isReader:n,isReaderRange:a,pieceStart:e,pieceEnd:e}},wa=(e,t)=>{const r=e.PiecesCount??0;if(r<=0)return null;const n=e.Readers||[];let a=0;if(n.length>0){let p=-1;for(const v of n)v.Reader!=null&&v.Reader>=0&&v.Reader<r&&v.Reader>p&&(p=v.Reader);a=p>=0?p:0}const i=e.PiecesLength||0,o=i>0?Math.max(1,Math.round((e.Capacity||0)/i)):t,s=Math.max(t,64);let l=Math.min(r,Math.max(t,o),s);l=Math.max(1,l);let d=a-Math.floor(l/2);d<0&&(d=0);let h=d+l-1;return h>=r&&(h=r-1,d=Math.max(0,h-l+1)),{start:d,end:h,readerPiece:a}},ti=(e,t)=>{const r=e.PiecesCount??0,n=wa(e,t);if(!n||r<=0)return{cells:[],piecesCount:r,bucketSize:1,windowStart:0,windowEnd:-1};const a=e.PiecesLength||0,i=e.Readers||[],o=new Map;Jo(e.Pieces,(h,p)=>{h>=n.start&&h<=n.end&&o.set(h,p)});const s=new Set,l=new Set;for(const h of i)h.Reader!=null&&h.Reader>=n.start&&h.Reader<=n.end&&s.add(h.Reader),Yo(h.Start,h.End,r,p=>{p>=n.start&&p<=n.end&&l.add(p)});const d=[];for(let h=n.start;h<=n.end;h++)d.push(ei(h,o.get(h),a,s.has(h),l.has(h),i));return{cells:d,piecesCount:r,bucketSize:1,windowStart:n.start,windowEnd:n.end}},ri=(e,t=!1)=>{const r=t?Vo:Ko,n=t?31:24;return!e||e<=0?10*r:Math.max(1,Math.floor(e/n))*r},xe=100,ni=400,ai=2e3,jr=e=>e!=null&&e.length?e.map(t=>`${t.Reader??""}:${t.Start??""}-${t.End??""}`).join("|"):"",qr=e=>{if(!e)return"";if(Array.isArray(e)){let r="";for(let n=0;n<e.length;n++){const a=e[n];a&&(r+=`${n}:${a.Size??0}:${a.Priority??0};`)}return r}let t="";for(const[r,n]of Object.entries(e))n&&(t+=`${r}:${n.Size??0}:${n.Priority??0};`);return t},Or=(e,t)=>e.Filled===t.Filled&&e.Capacity===t.Capacity&&e.PiecesCount===t.PiecesCount&&e.PiecesLength===t.PiecesLength&&jr(e.Readers)===jr(t.Readers)&&qr(e.Pieces)===qr(t.Pieces),oi=e=>{const[t,r]=x.useState({}),n=x.useRef(!0),a=x.useRef(null),i=x.useRef(!1),o=x.useRef({}),s=x.useRef(Date.now()),l=x.useRef(xe);return x.useEffect(()=>()=>{n.current=!1},[]),x.useEffect(()=>{if(!e){a.current&&clearTimeout(a.current);return}let d=!1;const h=()=>{d||(a.current=setTimeout(p,l.current))},p=()=>{d||i.current||document.hidden||(i.current=!0,ye.post(Ya(),{action:"get",hash:e}).then(({data:b})=>{if(!n.current||d)return;const R=b||{};if(Or(o.current,R)){Date.now()-s.current>=ai&&(l.current=ni);return}s.current=Date.now(),l.current=xe,o.current=R,r(R)}).catch(()=>{!n.current||d||Or(o.current,{})||(s.current=Date.now(),l.current=xe,o.current={},r({}))}).finally(()=>{i.current=!1,document.hidden||h()}))};p();const v=()=>{if(document.hidden){a.current&&clearTimeout(a.current);return}l.current=xe,p()};return document.addEventListener("visibilitychange",v),()=>{d=!0,a.current&&clearTimeout(a.current),document.removeEventListener("visibilitychange",v)}},[e]),t},ii=(e,t)=>x.useMemo(()=>ti(e,t),[e,t]),si=()=>{const[e,t]=x.useState(),[r,n]=x.useState(0);return x.useEffect(()=>{const a=()=>n(i=>i+1);return window.addEventListener(_r,a),()=>window.removeEventListener(_r,a)},[]),x.useEffect(()=>{let a=!1;return ye.post(Xa(),{action:"get"}).then(({data:i})=>{a||t(i)}),()=>{a=!0}},[r]),e},ci=yo(_o)`
  && {
    position: relative;
    padding-top: var(--safe-top);
  }
`;function li({title:e,onClose:t,onBack:r}){const{t:n}=U();return c.jsx(ci,{children:c.jsxs(vo,{children:[r&&c.jsx(Sr,{edge:"start",color:"inherit",onClick:r,"aria-label":n("Back",{defaultValue:"Back"}),children:c.jsx(mo,{})}),c.jsx(Te,{variant:"h6",sx:{marginLeft:"5px",flex:1},children:e}),c.jsx(Sr,{color:"inherit",onClick:t,"aria-label":n("Close",{defaultValue:"Close"}),sx:{marginRight:"-10px"},children:c.jsx(bo,{})})]})})}var Sa=(function(){if(typeof Map<"u")return Map;function e(t,r){var n=-1;return t.some(function(a,i){return a[0]===r?(n=i,!0):!1}),n}return(function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(r){var n=e(this.__entries__,r),a=this.__entries__[n];return a&&a[1]},t.prototype.set=function(r,n){var a=e(this.__entries__,r);~a?this.__entries__[a][1]=n:this.__entries__.push([r,n])},t.prototype.delete=function(r){var n=this.__entries__,a=e(n,r);~a&&n.splice(a,1)},t.prototype.has=function(r){return!!~e(this.__entries__,r)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(r,n){n===void 0&&(n=null);for(var a=0,i=this.__entries__;a<i.length;a++){var o=i[a];r.call(n,o[1],o[0])}},t})()})(),pr=typeof window<"u"&&typeof document<"u"&&window.document===document,we=(function(){return typeof De<"u"&&De.Math===Math?De:typeof self<"u"&&self.Math===Math?self:typeof window<"u"&&window.Math===Math?window:Function("return this")()})(),ui=(function(){return typeof requestAnimationFrame=="function"?requestAnimationFrame.bind(we):function(e){return setTimeout(function(){return e(Date.now())},1e3/60)}})(),di=2;function fi(e,t){var r=!1,n=!1,a=0;function i(){r&&(r=!1,e()),n&&s()}function o(){ui(i)}function s(){var l=Date.now();if(r){if(l-a<di)return;n=!0}else r=!0,n=!1,setTimeout(o,t);a=l}return s}var hi=20,pi=["top","right","bottom","left","width","height","size","weight"],gi=typeof MutationObserver<"u",vi=(function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=fi(this.refresh.bind(this),hi)}return e.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},e.prototype.removeObserver=function(t){var r=this.observers_,n=r.indexOf(t);~n&&r.splice(n,1),!r.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){var t=this.updateObservers_();t&&this.refresh()},e.prototype.updateObservers_=function(){var t=this.observers_.filter(function(r){return r.gatherActive(),r.hasActive()});return t.forEach(function(r){return r.broadcastActive()}),t.length>0},e.prototype.connect_=function(){!pr||this.connected_||(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),gi?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){!pr||!this.connected_||(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(t){var r=t.propertyName,n=r===void 0?"":r,a=pi.some(function(i){return!!~n.indexOf(i)});a&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e})(),Ra=(function(e,t){for(var r=0,n=Object.keys(t);r<n.length;r++){var a=n[r];Object.defineProperty(e,a,{value:t[a],enumerable:!1,writable:!1,configurable:!0})}return e}),ue=(function(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView;return t||we}),Ta=Oe(0,0,0,0);function Se(e){return parseFloat(e)||0}function Ar(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return t.reduce(function(n,a){var i=e["border-"+a+"-width"];return n+Se(i)},0)}function mi(e){for(var t=["top","right","bottom","left"],r={},n=0,a=t;n<a.length;n++){var i=a[n],o=e["padding-"+i];r[i]=Se(o)}return r}function bi(e){var t=e.getBBox();return Oe(0,0,t.width,t.height)}function yi(e){var t=e.clientWidth,r=e.clientHeight;if(!t&&!r)return Ta;var n=ue(e).getComputedStyle(e),a=mi(n),i=a.left+a.right,o=a.top+a.bottom,s=Se(n.width),l=Se(n.height);if(n.boxSizing==="border-box"&&(Math.round(s+i)!==t&&(s-=Ar(n,"left","right")+i),Math.round(l+o)!==r&&(l-=Ar(n,"top","bottom")+o)),!xi(e)){var d=Math.round(s+i)-t,h=Math.round(l+o)-r;Math.abs(d)!==1&&(s-=d),Math.abs(h)!==1&&(l-=h)}return Oe(a.left,a.top,s,l)}var _i=(function(){return typeof SVGGraphicsElement<"u"?function(e){return e instanceof ue(e).SVGGraphicsElement}:function(e){return e instanceof ue(e).SVGElement&&typeof e.getBBox=="function"}})();function xi(e){return e===ue(e).document.documentElement}function Ci(e){return pr?_i(e)?bi(e):yi(e):Ta}function wi(e){var t=e.x,r=e.y,n=e.width,a=e.height,i=typeof DOMRectReadOnly<"u"?DOMRectReadOnly:Object,o=Object.create(i.prototype);return Ra(o,{x:t,y:r,width:n,height:a,top:r,right:t+n,bottom:a+r,left:t}),o}function Oe(e,t,r,n){return{x:e,y:t,width:r,height:n}}var Si=(function(){function e(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=Oe(0,0,0,0),this.target=t}return e.prototype.isActive=function(){var t=Ci(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},e})(),Ri=(function(){function e(t,r){var n=wi(r);Ra(this,{target:t,contentRect:n})}return e})(),Ti=(function(){function e(t,r,n){if(this.activeObservations_=[],this.observations_=new Sa,typeof t!="function")throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=r,this.callbackCtx_=n}return e.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof ue(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)||(r.set(t,new Si(t)),this.controller_.addObserver(this),this.controller_.refresh())}},e.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(t instanceof ue(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)&&(r.delete(t),r.size||this.controller_.removeObserver(this))}},e.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},e.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach(function(r){r.isActive()&&t.activeObservations_.push(r)})},e.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,r=this.activeObservations_.map(function(n){return new Ri(n.target,n.broadcastRect())});this.callback_.call(t,r,t),this.clearActive()}},e.prototype.clearActive=function(){this.activeObservations_.splice(0)},e.prototype.hasActive=function(){return this.activeObservations_.length>0},e})(),ja=typeof WeakMap<"u"?new WeakMap:new Sa,qa=(function(){function e(t){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var r=vi.getInstance(),n=new Ti(t,r,this);ja.set(this,n)}return e})();["observe","unobserve","disconnect"].forEach(function(e){qa.prototype[e]=function(){var t;return(t=ja.get(this))[e].apply(t,arguments)}});var ji=(function(){return typeof we.ResizeObserver<"u"?we.ResizeObserver:qa})(),qi=["client","offset","scroll","bounds","margin"];function Mr(e){var t=[];return qi.forEach(function(r){e[r]&&t.push(r)}),t}function Pr(e,t){var r={};if(t.indexOf("client")>-1&&(r.client={top:e.clientTop,left:e.clientLeft,width:e.clientWidth,height:e.clientHeight}),t.indexOf("offset")>-1&&(r.offset={top:e.offsetTop,left:e.offsetLeft,width:e.offsetWidth,height:e.offsetHeight}),t.indexOf("scroll")>-1&&(r.scroll={top:e.scrollTop,left:e.scrollLeft,width:e.scrollWidth,height:e.scrollHeight}),t.indexOf("bounds")>-1){var n=e.getBoundingClientRect();r.bounds={top:n.top,right:n.right,bottom:n.bottom,left:n.left,width:n.width,height:n.height}}if(t.indexOf("margin")>-1){var a=getComputedStyle(e);r.margin={top:a?parseInt(a.marginTop):0,right:a?parseInt(a.marginRight):0,bottom:a?parseInt(a.marginBottom):0,left:a?parseInt(a.marginLeft):0}}return r}function Oi(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView;return t||window}function Ai(e){return function(t){var r,n;return n=r=(function(a){zo(i,a);function i(){for(var s,l=arguments.length,d=new Array(l),h=0;h<l;h++)d[h]=arguments[h];return s=a.call.apply(a,[this].concat(d))||this,s.state={contentRect:{entry:{},client:{},offset:{},scroll:{},bounds:{},margin:{}}},s._animationFrameID=null,s._resizeObserver=null,s._node=null,s._window=null,s.measure=function(p){var v=Pr(s._node,Mr(s.props));p&&(v.entry=p[0].contentRect),s._animationFrameID=s._window.requestAnimationFrame(function(){s._resizeObserver!==null&&(s.setState({contentRect:v}),typeof s.props.onResize=="function"&&s.props.onResize(v))})},s._handleRef=function(p){s._resizeObserver!==null&&s._node!==null&&s._resizeObserver.unobserve(s._node),s._node=p,s._window=Oi(s._node);var v=s.props.innerRef;v&&(typeof v=="function"?v(s._node):v.current=s._node),s._resizeObserver!==null&&s._node!==null&&s._resizeObserver.observe(s._node)},s}var o=i.prototype;return o.componentDidMount=function(){this._resizeObserver=this._window!==null&&this._window.ResizeObserver?new this._window.ResizeObserver(this.measure):new ji(this.measure),this._node!==null&&(this._resizeObserver.observe(this._node),typeof this.props.onResize=="function"&&this.props.onResize(Pr(this._node,Mr(this.props))))},o.componentWillUnmount=function(){this._window!==null&&this._window.cancelAnimationFrame(this._animationFrameID),this._resizeObserver!==null&&(this._resizeObserver.disconnect(),this._resizeObserver=null)},o.render=function(){var l=this.props;l.innerRef,l.onResize;var d=Ho(l,["innerRef","onResize"]);return x.createElement(t,xo({},d,{measureRef:this._handleRef,measure:this.measure,contentRect:this.state.contentRect}))},i})(x.Component),r.propTypes={client:re.bool,offset:re.bool,scroll:re.bool,bounds:re.bool,margin:re.bool,innerRef:re.oneOfType([re.object,re.func]),onResize:re.func},n}}var gr=Ai()(function(e){var t=e.measure,r=e.measureRef,n=e.contentRect,a=e.children;return a({measure:t,measureRef:r,contentRect:n})});gr.displayName="Measure";gr.propTypes.children=re.func;var Ie,Er;function Mi(){if(Er)return Ie;Er=1;function e(){this.__data__=[],this.size=0}return Ie=e,Ie}var $e,Dr;function Oa(){if(Dr)return $e;Dr=1;function e(t,r){return t===r||t!==t&&r!==r}return $e=e,$e}var Be,kr;function Ae(){if(kr)return Be;kr=1;var e=Oa();function t(r,n){for(var a=r.length;a--;)if(e(r[a][0],n))return a;return-1}return Be=t,Be}var Ge,Ir;function Pi(){if(Ir)return Ge;Ir=1;var e=Ae(),t=Array.prototype,r=t.splice;function n(a){var i=this.__data__,o=e(i,a);if(o<0)return!1;var s=i.length-1;return o==s?i.pop():r.call(i,o,1),--this.size,!0}return Ge=n,Ge}var ze,$r;function Ei(){if($r)return ze;$r=1;var e=Ae();function t(r){var n=this.__data__,a=e(n,r);return a<0?void 0:n[a][1]}return ze=t,ze}var He,Br;function Di(){if(Br)return He;Br=1;var e=Ae();function t(r){return e(this.__data__,r)>-1}return He=t,He}var Le,Gr;function ki(){if(Gr)return Le;Gr=1;var e=Ae();function t(r,n){var a=this.__data__,i=e(a,r);return i<0?(++this.size,a.push([r,n])):a[i][1]=n,this}return Le=t,Le}var Ne,zr;function Me(){if(zr)return Ne;zr=1;var e=Mi(),t=Pi(),r=Ei(),n=Di(),a=ki();function i(o){var s=-1,l=o==null?0:o.length;for(this.clear();++s<l;){var d=o[s];this.set(d[0],d[1])}}return i.prototype.clear=e,i.prototype.delete=t,i.prototype.get=r,i.prototype.has=n,i.prototype.set=a,Ne=i,Ne}var Ue,Hr;function Ii(){if(Hr)return Ue;Hr=1;var e=Me();function t(){this.__data__=new e,this.size=0}return Ue=t,Ue}var We,Lr;function $i(){if(Lr)return We;Lr=1;function e(t){var r=this.__data__,n=r.delete(t);return this.size=r.size,n}return We=e,We}var Fe,Nr;function Bi(){if(Nr)return Fe;Nr=1;function e(t){return this.__data__.get(t)}return Fe=e,Fe}var Ke,Ur;function Gi(){if(Ur)return Ke;Ur=1;function e(t){return this.__data__.has(t)}return Ke=e,Ke}var Ve,Wr;function Aa(){if(Wr)return Ve;Wr=1;var e=je(),t=xa(),r="[object AsyncFunction]",n="[object Function]",a="[object GeneratorFunction]",i="[object Proxy]";function o(s){if(!t(s))return!1;var l=e(s);return l==n||l==a||l==r||l==i}return Ve=o,Ve}var Xe,Fr;function zi(){if(Fr)return Xe;Fr=1;var e=ie(),t=e["__core-js_shared__"];return Xe=t,Xe}var Ye,Kr;function Hi(){if(Kr)return Ye;Kr=1;var e=zi(),t=(function(){var n=/[^.]+$/.exec(e&&e.keys&&e.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""})();function r(n){return!!t&&t in n}return Ye=r,Ye}var Je,Vr;function Ma(){if(Vr)return Je;Vr=1;var e=Function.prototype,t=e.toString;function r(n){if(n!=null){try{return t.call(n)}catch{}try{return n+""}catch{}}return""}return Je=r,Je}var Ze,Xr;function Li(){if(Xr)return Ze;Xr=1;var e=Aa(),t=Hi(),r=xa(),n=Ma(),a=/[\\^$.*+?()[\]{}|]/g,i=/^\[object .+?Constructor\]$/,o=Function.prototype,s=Object.prototype,l=o.toString,d=s.hasOwnProperty,h=RegExp("^"+l.call(d).replace(a,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function p(v){if(!r(v)||t(v))return!1;var b=e(v)?h:i;return b.test(n(v))}return Ze=p,Ze}var Qe,Yr;function Ni(){if(Yr)return Qe;Yr=1;function e(t,r){return t==null?void 0:t[r]}return Qe=e,Qe}var et,Jr;function de(){if(Jr)return et;Jr=1;var e=Li(),t=Ni();function r(n,a){var i=t(n,a);return e(i)?i:void 0}return et=r,et}var tt,Zr;function vr(){if(Zr)return tt;Zr=1;var e=de(),t=ie(),r=e(t,"Map");return tt=r,tt}var rt,Qr;function Pe(){if(Qr)return rt;Qr=1;var e=de(),t=e(Object,"create");return rt=t,rt}var nt,en;function Ui(){if(en)return nt;en=1;var e=Pe();function t(){this.__data__=e?e(null):{},this.size=0}return nt=t,nt}var at,tn;function Wi(){if(tn)return at;tn=1;function e(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r}return at=e,at}var ot,rn;function Fi(){if(rn)return ot;rn=1;var e=Pe(),t="__lodash_hash_undefined__",r=Object.prototype,n=r.hasOwnProperty;function a(i){var o=this.__data__;if(e){var s=o[i];return s===t?void 0:s}return n.call(o,i)?o[i]:void 0}return ot=a,ot}var it,nn;function Ki(){if(nn)return it;nn=1;var e=Pe(),t=Object.prototype,r=t.hasOwnProperty;function n(a){var i=this.__data__;return e?i[a]!==void 0:r.call(i,a)}return it=n,it}var st,an;function Vi(){if(an)return st;an=1;var e=Pe(),t="__lodash_hash_undefined__";function r(n,a){var i=this.__data__;return this.size+=this.has(n)?0:1,i[n]=e&&a===void 0?t:a,this}return st=r,st}var ct,on;function Xi(){if(on)return ct;on=1;var e=Ui(),t=Wi(),r=Fi(),n=Ki(),a=Vi();function i(o){var s=-1,l=o==null?0:o.length;for(this.clear();++s<l;){var d=o[s];this.set(d[0],d[1])}}return i.prototype.clear=e,i.prototype.delete=t,i.prototype.get=r,i.prototype.has=n,i.prototype.set=a,ct=i,ct}var lt,sn;function Yi(){if(sn)return lt;sn=1;var e=Xi(),t=Me(),r=vr();function n(){this.size=0,this.__data__={hash:new e,map:new(r||t),string:new e}}return lt=n,lt}var ut,cn;function Ji(){if(cn)return ut;cn=1;function e(t){var r=typeof t;return r=="string"||r=="number"||r=="symbol"||r=="boolean"?t!=="__proto__":t===null}return ut=e,ut}var dt,ln;function Ee(){if(ln)return dt;ln=1;var e=Ji();function t(r,n){var a=r.__data__;return e(n)?a[typeof n=="string"?"string":"hash"]:a.map}return dt=t,dt}var ft,un;function Zi(){if(un)return ft;un=1;var e=Ee();function t(r){var n=e(this,r).delete(r);return this.size-=n?1:0,n}return ft=t,ft}var ht,dn;function Qi(){if(dn)return ht;dn=1;var e=Ee();function t(r){return e(this,r).get(r)}return ht=t,ht}var pt,fn;function es(){if(fn)return pt;fn=1;var e=Ee();function t(r){return e(this,r).has(r)}return pt=t,pt}var gt,hn;function ts(){if(hn)return gt;hn=1;var e=Ee();function t(r,n){var a=e(this,r),i=a.size;return a.set(r,n),this.size+=a.size==i?0:1,this}return gt=t,gt}var vt,pn;function Pa(){if(pn)return vt;pn=1;var e=Yi(),t=Zi(),r=Qi(),n=es(),a=ts();function i(o){var s=-1,l=o==null?0:o.length;for(this.clear();++s<l;){var d=o[s];this.set(d[0],d[1])}}return i.prototype.clear=e,i.prototype.delete=t,i.prototype.get=r,i.prototype.has=n,i.prototype.set=a,vt=i,vt}var mt,gn;function rs(){if(gn)return mt;gn=1;var e=Me(),t=vr(),r=Pa(),n=200;function a(i,o){var s=this.__data__;if(s instanceof e){var l=s.__data__;if(!t||l.length<n-1)return l.push([i,o]),this.size=++s.size,this;s=this.__data__=new r(l)}return s.set(i,o),this.size=s.size,this}return mt=a,mt}var bt,vn;function ns(){if(vn)return bt;vn=1;var e=Me(),t=Ii(),r=$i(),n=Bi(),a=Gi(),i=rs();function o(s){var l=this.__data__=new e(s);this.size=l.size}return o.prototype.clear=t,o.prototype.delete=r,o.prototype.get=n,o.prototype.has=a,o.prototype.set=i,bt=o,bt}var yt,mn;function as(){if(mn)return yt;mn=1;var e="__lodash_hash_undefined__";function t(r){return this.__data__.set(r,e),this}return yt=t,yt}var _t,bn;function os(){if(bn)return _t;bn=1;function e(t){return this.__data__.has(t)}return _t=e,_t}var xt,yn;function is(){if(yn)return xt;yn=1;var e=Pa(),t=as(),r=os();function n(a){var i=-1,o=a==null?0:a.length;for(this.__data__=new e;++i<o;)this.add(a[i])}return n.prototype.add=n.prototype.push=t,n.prototype.has=r,xt=n,xt}var Ct,_n;function ss(){if(_n)return Ct;_n=1;function e(t,r){for(var n=-1,a=t==null?0:t.length;++n<a;)if(r(t[n],n,t))return!0;return!1}return Ct=e,Ct}var wt,xn;function cs(){if(xn)return wt;xn=1;function e(t,r){return t.has(r)}return wt=e,wt}var St,Cn;function Ea(){if(Cn)return St;Cn=1;var e=is(),t=ss(),r=cs(),n=1,a=2;function i(o,s,l,d,h,p){var v=l&n,b=o.length,R=s.length;if(b!=R&&!(v&&R>b))return!1;var _=p.get(o),S=p.get(s);if(_&&S)return _==s&&S==o;var T=-1,w=!0,O=l&a?new e:void 0;for(p.set(o,s),p.set(s,o);++T<b;){var q=o[T],D=s[T];if(d)var j=v?d(D,q,T,s,o,p):d(q,D,T,o,s,p);if(j!==void 0){if(j)continue;w=!1;break}if(O){if(!t(s,function(u,f){if(!r(O,f)&&(q===u||h(q,u,l,d,p)))return O.push(f)})){w=!1;break}}else if(!(q===D||h(q,D,l,d,p))){w=!1;break}}return p.delete(o),p.delete(s),w}return St=i,St}var Rt,wn;function ls(){if(wn)return Rt;wn=1;var e=ie(),t=e.Uint8Array;return Rt=t,Rt}var Tt,Sn;function us(){if(Sn)return Tt;Sn=1;function e(t){var r=-1,n=Array(t.size);return t.forEach(function(a,i){n[++r]=[i,a]}),n}return Tt=e,Tt}var jt,Rn;function ds(){if(Rn)return jt;Rn=1;function e(t){var r=-1,n=Array(t.size);return t.forEach(function(a){n[++r]=a}),n}return jt=e,jt}var qt,Tn;function fs(){if(Tn)return qt;Tn=1;var e=Wo(),t=ls(),r=Oa(),n=Ea(),a=us(),i=ds(),o=1,s=2,l="[object Boolean]",d="[object Date]",h="[object Error]",p="[object Map]",v="[object Number]",b="[object RegExp]",R="[object Set]",_="[object String]",S="[object Symbol]",T="[object ArrayBuffer]",w="[object DataView]",O=e?e.prototype:void 0,q=O?O.valueOf:void 0;function D(j,u,f,m,y,C,P){switch(f){case w:if(j.byteLength!=u.byteLength||j.byteOffset!=u.byteOffset)return!1;j=j.buffer,u=u.buffer;case T:return!(j.byteLength!=u.byteLength||!C(new t(j),new t(u)));case l:case d:case v:return r(+j,+u);case h:return j.name==u.name&&j.message==u.message;case b:case _:return j==u+"";case p:var k=a;case R:var g=m&o;if(k||(k=i),j.size!=u.size&&!g)return!1;var A=P.get(j);if(A)return A==u;m|=s,P.set(j,u);var M=n(k(j),k(u),m,y,C,P);return P.delete(j),M;case S:if(q)return q.call(j)==q.call(u)}return!1}return qt=D,qt}var Ot,jn;function hs(){if(jn)return Ot;jn=1;function e(t,r){for(var n=-1,a=r.length,i=t.length;++n<a;)t[i+n]=r[n];return t}return Ot=e,Ot}var At,qn;function mr(){if(qn)return At;qn=1;var e=Array.isArray;return At=e,At}var Mt,On;function ps(){if(On)return Mt;On=1;var e=hs(),t=mr();function r(n,a,i){var o=a(n);return t(n)?o:e(o,i(n))}return Mt=r,Mt}var Pt,An;function gs(){if(An)return Pt;An=1;function e(t,r){for(var n=-1,a=t==null?0:t.length,i=0,o=[];++n<a;){var s=t[n];r(s,n,t)&&(o[i++]=s)}return o}return Pt=e,Pt}var Et,Mn;function vs(){if(Mn)return Et;Mn=1;function e(){return[]}return Et=e,Et}var Dt,Pn;function ms(){if(Pn)return Dt;Pn=1;var e=gs(),t=vs(),r=Object.prototype,n=r.propertyIsEnumerable,a=Object.getOwnPropertySymbols,i=a?function(o){return o==null?[]:(o=Object(o),e(a(o),function(s){return n.call(o,s)}))}:t;return Dt=i,Dt}var kt,En;function bs(){if(En)return kt;En=1;function e(t,r){for(var n=-1,a=Array(t);++n<t;)a[n]=r(n);return a}return kt=e,kt}var It,Dn;function ys(){if(Dn)return It;Dn=1;var e=je(),t=qe(),r="[object Arguments]";function n(a){return t(a)&&e(a)==r}return It=n,It}var $t,kn;function _s(){if(kn)return $t;kn=1;var e=ys(),t=qe(),r=Object.prototype,n=r.hasOwnProperty,a=r.propertyIsEnumerable,i=e((function(){return arguments})())?e:function(o){return t(o)&&n.call(o,"callee")&&!a.call(o,"callee")};return $t=i,$t}var ve={exports:{}},Bt,In;function xs(){if(In)return Bt;In=1;function e(){return!1}return Bt=e,Bt}ve.exports;var $n;function Da(){return $n||($n=1,(function(e,t){var r=ie(),n=xs(),a=t&&!t.nodeType&&t,i=a&&!0&&e&&!e.nodeType&&e,o=i&&i.exports===a,s=o?r.Buffer:void 0,l=s?s.isBuffer:void 0,d=l||n;e.exports=d})(ve,ve.exports)),ve.exports}var Gt,Bn;function Cs(){if(Bn)return Gt;Bn=1;var e=9007199254740991,t=/^(?:0|[1-9]\d*)$/;function r(n,a){var i=typeof n;return a=a??e,!!a&&(i=="number"||i!="symbol"&&t.test(n))&&n>-1&&n%1==0&&n<a}return Gt=r,Gt}var zt,Gn;function ka(){if(Gn)return zt;Gn=1;var e=9007199254740991;function t(r){return typeof r=="number"&&r>-1&&r%1==0&&r<=e}return zt=t,zt}var Ht,zn;function ws(){if(zn)return Ht;zn=1;var e=je(),t=ka(),r=qe(),n="[object Arguments]",a="[object Array]",i="[object Boolean]",o="[object Date]",s="[object Error]",l="[object Function]",d="[object Map]",h="[object Number]",p="[object Object]",v="[object RegExp]",b="[object Set]",R="[object String]",_="[object WeakMap]",S="[object ArrayBuffer]",T="[object DataView]",w="[object Float32Array]",O="[object Float64Array]",q="[object Int8Array]",D="[object Int16Array]",j="[object Int32Array]",u="[object Uint8Array]",f="[object Uint8ClampedArray]",m="[object Uint16Array]",y="[object Uint32Array]",C={};C[w]=C[O]=C[q]=C[D]=C[j]=C[u]=C[f]=C[m]=C[y]=!0,C[n]=C[a]=C[S]=C[i]=C[T]=C[o]=C[s]=C[l]=C[d]=C[h]=C[p]=C[v]=C[b]=C[R]=C[_]=!1;function P(k){return r(k)&&t(k.length)&&!!C[e(k)]}return Ht=P,Ht}var Lt,Hn;function Ss(){if(Hn)return Lt;Hn=1;function e(t){return function(r){return t(r)}}return Lt=e,Lt}var me={exports:{}};me.exports;var Ln;function Rs(){return Ln||(Ln=1,(function(e,t){var r=Fo(),n=t&&!t.nodeType&&t,a=n&&!0&&e&&!e.nodeType&&e,i=a&&a.exports===n,o=i&&r.process,s=(function(){try{var l=a&&a.require&&a.require("util").types;return l||o&&o.binding&&o.binding("util")}catch{}})();e.exports=s})(me,me.exports)),me.exports}var Nt,Nn;function Ia(){if(Nn)return Nt;Nn=1;var e=ws(),t=Ss(),r=Rs(),n=r&&r.isTypedArray,a=n?t(n):e;return Nt=a,Nt}var Ut,Un;function Ts(){if(Un)return Ut;Un=1;var e=bs(),t=_s(),r=mr(),n=Da(),a=Cs(),i=Ia(),o=Object.prototype,s=o.hasOwnProperty;function l(d,h){var p=r(d),v=!p&&t(d),b=!p&&!v&&n(d),R=!p&&!v&&!b&&i(d),_=p||v||b||R,S=_?e(d.length,String):[],T=S.length;for(var w in d)(h||s.call(d,w))&&!(_&&(w=="length"||b&&(w=="offset"||w=="parent")||R&&(w=="buffer"||w=="byteLength"||w=="byteOffset")||a(w,T)))&&S.push(w);return S}return Ut=l,Ut}var Wt,Wn;function js(){if(Wn)return Wt;Wn=1;var e=Object.prototype;function t(r){var n=r&&r.constructor,a=typeof n=="function"&&n.prototype||e;return r===a}return Wt=t,Wt}var Ft,Fn;function qs(){if(Fn)return Ft;Fn=1;function e(t,r){return function(n){return t(r(n))}}return Ft=e,Ft}var Kt,Kn;function Os(){if(Kn)return Kt;Kn=1;var e=qs(),t=e(Object.keys,Object);return Kt=t,Kt}var Vt,Vn;function As(){if(Vn)return Vt;Vn=1;var e=js(),t=Os(),r=Object.prototype,n=r.hasOwnProperty;function a(i){if(!e(i))return t(i);var o=[];for(var s in Object(i))n.call(i,s)&&s!="constructor"&&o.push(s);return o}return Vt=a,Vt}var Xt,Xn;function Ms(){if(Xn)return Xt;Xn=1;var e=Aa(),t=ka();function r(n){return n!=null&&t(n.length)&&!e(n)}return Xt=r,Xt}var Yt,Yn;function Ps(){if(Yn)return Yt;Yn=1;var e=Ts(),t=As(),r=Ms();function n(a){return r(a)?e(a):t(a)}return Yt=n,Yt}var Jt,Jn;function Es(){if(Jn)return Jt;Jn=1;var e=ps(),t=ms(),r=Ps();function n(a){return e(a,r,t)}return Jt=n,Jt}var Zt,Zn;function Ds(){if(Zn)return Zt;Zn=1;var e=Es(),t=1,r=Object.prototype,n=r.hasOwnProperty;function a(i,o,s,l,d,h){var p=s&t,v=e(i),b=v.length,R=e(o),_=R.length;if(b!=_&&!p)return!1;for(var S=b;S--;){var T=v[S];if(!(p?T in o:n.call(o,T)))return!1}var w=h.get(i),O=h.get(o);if(w&&O)return w==o&&O==i;var q=!0;h.set(i,o),h.set(o,i);for(var D=p;++S<b;){T=v[S];var j=i[T],u=o[T];if(l)var f=p?l(u,j,T,o,i,h):l(j,u,T,i,o,h);if(!(f===void 0?j===u||d(j,u,s,l,h):f)){q=!1;break}D||(D=T=="constructor")}if(q&&!D){var m=i.constructor,y=o.constructor;m!=y&&"constructor"in i&&"constructor"in o&&!(typeof m=="function"&&m instanceof m&&typeof y=="function"&&y instanceof y)&&(q=!1)}return h.delete(i),h.delete(o),q}return Zt=a,Zt}var Qt,Qn;function ks(){if(Qn)return Qt;Qn=1;var e=de(),t=ie(),r=e(t,"DataView");return Qt=r,Qt}var er,ea;function Is(){if(ea)return er;ea=1;var e=de(),t=ie(),r=e(t,"Promise");return er=r,er}var tr,ta;function $s(){if(ta)return tr;ta=1;var e=de(),t=ie(),r=e(t,"Set");return tr=r,tr}var rr,ra;function Bs(){if(ra)return rr;ra=1;var e=de(),t=ie(),r=e(t,"WeakMap");return rr=r,rr}var nr,na;function Gs(){if(na)return nr;na=1;var e=ks(),t=vr(),r=Is(),n=$s(),a=Bs(),i=je(),o=Ma(),s="[object Map]",l="[object Object]",d="[object Promise]",h="[object Set]",p="[object WeakMap]",v="[object DataView]",b=o(e),R=o(t),_=o(r),S=o(n),T=o(a),w=i;return(e&&w(new e(new ArrayBuffer(1)))!=v||t&&w(new t)!=s||r&&w(r.resolve())!=d||n&&w(new n)!=h||a&&w(new a)!=p)&&(w=function(O){var q=i(O),D=q==l?O.constructor:void 0,j=D?o(D):"";if(j)switch(j){case b:return v;case R:return s;case _:return d;case S:return h;case T:return p}return q}),nr=w,nr}var ar,aa;function zs(){if(aa)return ar;aa=1;var e=ns(),t=Ea(),r=fs(),n=Ds(),a=Gs(),i=mr(),o=Da(),s=Ia(),l=1,d="[object Arguments]",h="[object Array]",p="[object Object]",v=Object.prototype,b=v.hasOwnProperty;function R(_,S,T,w,O,q){var D=i(_),j=i(S),u=D?h:a(_),f=j?h:a(S);u=u==d?p:u,f=f==d?p:f;var m=u==p,y=f==p,C=u==f;if(C&&o(_)){if(!o(S))return!1;D=!0,m=!1}if(C&&!m)return q||(q=new e),D||s(_)?t(_,S,T,w,O,q):r(_,S,u,T,w,O,q);if(!(T&l)){var P=m&&b.call(_,"__wrapped__"),k=y&&b.call(S,"__wrapped__");if(P||k){var g=P?_.value():_,A=k?S.value():S;return q||(q=new e),O(g,A,T,w,q)}}return C?(q||(q=new e),n(_,S,T,w,O,q)):!1}return ar=R,ar}var or,oa;function Hs(){if(oa)return or;oa=1;var e=zs(),t=qe();function r(n,a,i,o,s){return n===a?!0:n==null||a==null||!t(n)&&!t(a)?n!==n&&a!==a:e(n,a,i,o,r,s)}return or=r,or}var ir,ia;function Ls(){if(ia)return ir;ia=1;var e=Hs();function t(r,n){return e(r,n)}return ir=t,ir}var Ns=Ls();const Re=ha(Ns),br={dark:{default:{borderWidth:1,pieceSize:20,gapBetweenPieces:4,borderColor:te("#fff",.28),completeColor:_e.dark.primary,backgroundColor:"#1a2822",readerColor:"#0a0a0a",readerHaloColor:te("#fff",.55),rangeColor:"#cda184",rangeEmptyColor:te("#cda184",.3)},mini:{cacheMaxHeight:420,borderWidth:2,pieceSize:26,gapBetweenPieces:5,borderColor:te("#fff",.32),completeColor:_e.dark.primary,backgroundColor:"#1f3028",readerColor:"#0a0a0a",readerHaloColor:te("#fff",.5),rangeColor:"#cda184",rangeEmptyColor:te("#cda184",.32)}},light:{default:{borderWidth:1,pieceSize:20,gapBetweenPieces:4,borderColor:"#d0e6da",completeColor:_e.light.primary,backgroundColor:"#ffffff",readerColor:"#000",readerHaloColor:te("#fff",.9),rangeColor:"#7e6bc4",rangeEmptyColor:te("#afa6e3",.32)},mini:{cacheMaxHeight:420,borderWidth:2,pieceSize:26,gapBetweenPieces:5,borderColor:"#b7d9c8",completeColor:_e.light.primary,backgroundColor:"#f4faf7",readerColor:"#0a0a0a",readerHaloColor:te("#fff",.9),rangeColor:"#7e6bc4",rangeEmptyColor:te("#afa6e3",.36)}}},Us=(e,t,r,n=0)=>{const a=e.pieceSize,i=e.gapBetweenPieces;if(!t||t<=0)return{pieceSize:a,gap:i};if(r){const o=t<280?7:t<400?9:11,s=Math.floor((t-8)/o)-i;return{pieceSize:Math.max(22,Math.min(28,s>0?s:a)),gap:Math.max(4,Math.min(i,6))}}return{pieceSize:Math.max(18,a),gap:Math.max(4,i)}},sa=z.div`
  margin-top: var(--ts-space-sm);
  text-transform: uppercase;
  align-self: center;
  font-size: var(--ts-font-label);
  letter-spacing: 0.4px;
  color: ${({$themeType:e})=>e==="dark"?"rgba(255, 255, 255, 0.55)":"rgba(0, 0, 0, 0.5)"};
`,Ws=z.div`
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
`,Fs=z.div`
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
`,Ks=e=>Math.max(0,Math.min(1,e)),Vs=(e,t,r,n,a)=>{e.fillStyle=n,e.fillRect(0,0,t,t);const i=Ks(r/100);if(i<=0)return;if(i>=1){e.fillStyle=a,e.fillRect(0,0,t,t);return}const o=Math.max(2,Math.round(t*i));e.fillStyle=a,e.fillRect(0,t-o,t,Math.min(o,t))},he=(e,t,r,n)=>{const a=n/2;e.lineWidth=n,e.strokeStyle=r,e.strokeRect(a,a,t-n,t-n)},Xs=({ctx:e,cells:t,canvasWidth:r,canvasHeight:n,piecesInOneRow:a,pieceSize:i,gap:o,startingX:s,theme:l,variant:d,isSnakeDebugMode:h,isMini:p})=>{const v=br[l][d],{borderWidth:b,backgroundColor:R,borderColor:_,completeColor:S,readerColor:T,readerHaloColor:w,rangeColor:O,rangeEmptyColor:q}=v;e.clearRect(0,0,r,n),e.imageSmoothingEnabled=!1;const D=b%2===1?.5:0,j=l==="dark",u=q||(j?"rgba(205, 161, 132, 0.28)":"rgba(175, 166, 227, 0.32)");for(let f=0;f<t.length;f++){const m=t[f]||{percentage:0,priority:0},y=m.percentage||0,C=!!m.completed||y>=100,P=y>0&&!C,k=!!m.isReader,g=!!m.isReaderRange,A=f%a,M=Math.floor(f/a),N=s+A*(i+o)+D,L=M*(i+o)+D;e.save(),e.translate(N,L);const W=g&&!C&&!P?u:R;if(Vs(e,i,C?100:y,W,P||C?S:W),k?(w&&he(e,i,w,p?4:3),he(e,i,T,p?2.5:2)):g?he(e,i,O,2):P||C?he(e,i,S,Math.max(b,2)):he(e,i,_,b),h){const V=Ca(m.priority||0);if(V){const fe=Math.max(9,Math.min(p?13:11,Math.floor(i*.55)));e.font=`bold ${fe}px ui-monospace, SFMono-Regular, Menlo, monospace`,e.textAlign="center",e.textBaseline="middle";const E=i/2,$=i/2;e.lineWidth=3,e.strokeStyle=j?"rgba(0,0,0,0.85)":"rgba(255,255,255,0.95)",e.strokeText(V,E,$),e.fillStyle=j?"#fff":"#1a1a1a",e.fillText(V,E,$)}}e.restore()}},Ys=(e,t,r)=>{const n=Math.min(window.devicePixelRatio||1,2);e.width=Math.max(1,Math.round(t*n)),e.height=Math.max(1,Math.round(r*n)),e.style.width=`${t}px`,e.style.height=`${r}px`;const a=e.getContext("2d");return a?(a.setTransform(n,0,0,n,0,0),a):null},Js=(e,t,r)=>{const{piecesInOneRow:n,pieceSize:a,gap:i,startingX:o,cellCount:s}=r;if(n<1||s<1||a<=0)return-1;const l=a+i,d=e-o;if(d<0||t<0)return-1;const h=Math.floor(d/l),p=Math.floor(t/l);if(h<0||h>=n)return-1;const v=d-h*l,b=t-p*l;if(v>a||b>a)return-1;const R=p*n+h;return R<0||R>=s?-1:R},Zs=()=>({percentage:0,priority:0,isReader:!1,isReaderRange:!1}),Qs=({cache:e,isMini:t,mode:r,isSnakeDebugMode:n})=>{const{t:a}=U(),o=(r||(t?"mini":"detailed"))==="mini",[s,l]=x.useState({width:0,height:0}),{width:d}=s,h=x.useRef(null),p=x.useRef(null),v=x.useRef(null),b=x.useRef(0),R=x.useRef(!0),_=x.useRef(0),[S,T]=x.useState(null),w=x.useMemo(()=>ri(d,o),[d,o]),O=ii(e,w),q=O.cells,D=o?"mini":"default",{isDarkMode:j}=x.useContext(pa),u=j?hr.DARK:hr.LIGHT,f=br[u][D],{cacheMaxHeight:m}=f,{pieceSize:y,gap:C}=x.useMemo(()=>Us(f,d,o,q.length),[f,d,o,q.length]),P=d>0?o?Math.max(d-8,d*.96):d:0,k=y+C,g=P>0?Math.max(1,Math.floor(P/k)):0,A=x.useMemo(()=>g?q:[],[q,g]),M=g>0?Math.ceil((P-k*g)/2):0,N=o?4:6,L=g>0?Math.max(A.length>0?Math.ceil(A.length/g):N,N)*k:0,W=x.useMemo(()=>A.length>0?A:Array.from({length:Math.max(g,1)*N},Zs),[A,g,N]);x.useEffect(()=>{const E=h.current;if(!(!E||!P||!L||!g))return cancelAnimationFrame(b.current),b.current=requestAnimationFrame(()=>{const $=Ys(E,P,L);$&&Xs({ctx:$,cells:W,canvasWidth:P,canvasHeight:L,piecesInOneRow:g,pieceSize:y,gap:C,startingX:M,theme:u,variant:D,isSnakeDebugMode:n,isMini:o})}),()=>cancelAnimationFrame(b.current)},[L,P,g,M,y,C,W,D,o,u,n]),x.useEffect(()=>{if(!p.current||!g||k<=0||!R.current)return;const E=wa(e,w);if(!E||O.windowStart==null)return;const $=E.readerPiece-O.windowStart;if($<0)return;const X=Math.floor($/g)*k,Y=p.current,ee=Y.scrollTop,le=ee+Y.clientHeight;(X<ee||X+k>le)&&(Y.scrollTop=Math.max(0,X-Y.clientHeight/3))},[e,w,O.windowStart,g,k,W]),x.useEffect(()=>{const E=p.current;if(!E)return;const $=()=>{R.current=!1,window.clearTimeout(_.current),_.current=window.setTimeout(()=>{R.current=!0},4e3)};return E.addEventListener("wheel",$,{passive:!0}),E.addEventListener("touchstart",$,{passive:!0}),E.addEventListener("pointerdown",$),()=>{window.clearTimeout(_.current),E.removeEventListener("wheel",$),E.removeEventListener("touchstart",$),E.removeEventListener("pointerdown",$)}},[d]);const V=x.useCallback(E=>{const $=E.pieceStart,Q=E.pieceEnd;if($==null)return"";const X=E.completed||(E.percentage||0)>=99.5?100:Math.round(E.percentage||0),Y=Ca(E.priority||0),ee=Y?` · ${Y}`:"";return Q!=null&&Q!==$?a("SnakeTooltipBucket",{start:$,end:Q,fill:X})+ee:a("SnakeTooltipPiece",{id:$,fill:X})+ee},[a]),fe=x.useCallback(E=>{if(!g){T(null);return}const $=h.current,Q=v.current;if(!$||!Q)return;const X=$.getBoundingClientRect(),Y=Q.getBoundingClientRect(),ee=E.clientX-X.left,le=E.clientY-X.top,B=Js(ee,le,{piecesInOneRow:g,pieceSize:y,gap:C,startingX:M,cellCount:W.length});if(B<0){T(null);return}const G=V(W[B]);if(!G){T(null);return}T({x:E.clientX-Y.left+12,y:E.clientY-Y.top+12,text:G})},[g,y,C,M,W,V]);return c.jsx(gr,{bounds:!0,onResize:({bounds:E})=>E&&l(E),children:({measureRef:E})=>c.jsxs("div",{style:{display:"flex",flexDirection:"column",width:"100%",minWidth:0,position:"relative"},ref:$=>{v.current=$,E($)},children:[c.jsx(Fs,{ref:p,$themeType:u,$isMini:o,children:g>0&&L>0?c.jsx("canvas",{ref:h,onMouseMove:fe,onMouseLeave:()=>T(null)}):null}),S&&c.jsx(Ws,{style:{left:S.x,top:S.y},children:S.text}),O.windowStart!=null&&O.windowEnd!=null&&O.windowEnd>=O.windowStart&&c.jsx(sa,{$themeType:u,children:a("SnakeFocusRange",{start:O.windowStart,end:O.windowEnd})}),o&&m!=null&&L>=m&&c.jsx(sa,{$themeType:u,children:a("ScrollDown")})]})})},$a=x.memo(Qs,(e,t)=>e.isMini===t.isMini&&e.mode===t.mode&&e.isSnakeDebugMode===t.isSnakeDebugMode&&Re(e.cache.Pieces,t.cache.Pieces)&&Re(e.cache.Readers,t.cache.Readers)&&e.cache.PiecesCount===t.cache.PiecesCount&&e.cache.PiecesLength===t.cache.PiecesLength&&e.cache.Capacity===t.cache.Capacity&&e.cache.Filled===t.cache.Filled);var pe={},sr,ca;function ec(){return ca||(ca=1,sr=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,r=[],n=0;n<e.rangeCount;n++)r.push(e.getRangeAt(n));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||r.forEach(function(a){e.addRange(a)}),t&&t.focus()}}),sr}var cr,la;function tc(){if(la)return cr;la=1;var e=ec(),t={"text/plain":"Text","text/html":"Url",default:"Text"},r="Copy to clipboard: #{key}, Enter";function n(i){var o=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return i.replace(/#{\s*key\s*}/g,o)}function a(i,o){var s,l,d,h,p,v,b=!1;o||(o={}),s=o.debug||!1;try{d=e(),h=document.createRange(),p=document.getSelection(),v=document.createElement("span"),v.textContent=i,v.ariaHidden="true",v.style.all="unset",v.style.position="fixed",v.style.top=0,v.style.clip="rect(0, 0, 0, 0)",v.style.whiteSpace="pre",v.style.webkitUserSelect="text",v.style.MozUserSelect="text",v.style.msUserSelect="text",v.style.userSelect="text",v.addEventListener("copy",function(_){if(_.stopPropagation(),o.format)if(_.preventDefault(),typeof _.clipboardData>"u"){s&&console.warn("unable to use e.clipboardData"),s&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var S=t[o.format]||t.default;window.clipboardData.setData(S,i)}else _.clipboardData.clearData(),_.clipboardData.setData(o.format,i);o.onCopy&&(_.preventDefault(),o.onCopy(_.clipboardData))}),document.body.appendChild(v),h.selectNodeContents(v),p.addRange(h);var R=document.execCommand("copy");if(!R)throw new Error("copy command was unsuccessful");b=!0}catch(_){s&&console.error("unable to copy using execCommand: ",_),s&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(o.format||"text",i),o.onCopy&&o.onCopy(window.clipboardData),b=!0}catch(S){s&&console.error("unable to copy using clipboardData: ",S),s&&console.error("falling back to prompt"),l=n("message"in o?o.message:r),window.prompt(l,i)}}finally{p&&(typeof p.removeRange=="function"?p.removeRange(h):p.removeAllRanges()),v&&document.body.removeChild(v),d()}return b}return cr=a,cr}var ua;function rc(){if(ua)return pe;ua=1,Object.defineProperty(pe,"__esModule",{value:!0}),pe.CopyToClipboard=void 0;var e=n(tc()),t=n(Va()),r=["text","onCopy","options","children"];function n(u){return u&&u.__esModule?u:{default:u}}function a(u){"@babel/helpers - typeof";return a=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(f){return typeof f}:function(f){return f&&typeof Symbol=="function"&&f.constructor===Symbol&&f!==Symbol.prototype?"symbol":typeof f},a(u)}function i(u,f){var m=Object.keys(u);if(Object.getOwnPropertySymbols){var y=Object.getOwnPropertySymbols(u);f&&(y=y.filter(function(C){return Object.getOwnPropertyDescriptor(u,C).enumerable})),m.push.apply(m,y)}return m}function o(u){for(var f=1;f<arguments.length;f++){var m=arguments[f]!=null?arguments[f]:{};f%2?i(Object(m),!0).forEach(function(y){O(u,y,m[y])}):Object.getOwnPropertyDescriptors?Object.defineProperties(u,Object.getOwnPropertyDescriptors(m)):i(Object(m)).forEach(function(y){Object.defineProperty(u,y,Object.getOwnPropertyDescriptor(m,y))})}return u}function s(u,f){if(u==null)return{};var m,y,C=l(u,f);if(Object.getOwnPropertySymbols){var P=Object.getOwnPropertySymbols(u);for(y=0;y<P.length;y++)m=P[y],f.indexOf(m)===-1&&{}.propertyIsEnumerable.call(u,m)&&(C[m]=u[m])}return C}function l(u,f){if(u==null)return{};var m={};for(var y in u)if({}.hasOwnProperty.call(u,y)){if(f.indexOf(y)!==-1)continue;m[y]=u[y]}return m}function d(u,f){if(!(u instanceof f))throw new TypeError("Cannot call a class as a function")}function h(u,f){for(var m=0;m<f.length;m++){var y=f[m];y.enumerable=y.enumerable||!1,y.configurable=!0,"value"in y&&(y.writable=!0),Object.defineProperty(u,q(y.key),y)}}function p(u,f,m){return f&&h(u.prototype,f),Object.defineProperty(u,"prototype",{writable:!1}),u}function v(u,f,m){return f=S(f),b(u,_()?Reflect.construct(f,m||[],S(u).constructor):f.apply(u,m))}function b(u,f){if(f&&(a(f)=="object"||typeof f=="function"))return f;if(f!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return R(u)}function R(u){if(u===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return u}function _(){try{var u=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(_=function(){return!!u})()}function S(u){return S=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(f){return f.__proto__||Object.getPrototypeOf(f)},S(u)}function T(u,f){if(typeof f!="function"&&f!==null)throw new TypeError("Super expression must either be null or a function");u.prototype=Object.create(f&&f.prototype,{constructor:{value:u,writable:!0,configurable:!0}}),Object.defineProperty(u,"prototype",{writable:!1}),f&&w(u,f)}function w(u,f){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(m,y){return m.__proto__=y,m},w(u,f)}function O(u,f,m){return(f=q(f))in u?Object.defineProperty(u,f,{value:m,enumerable:!0,configurable:!0,writable:!0}):u[f]=m,u}function q(u){var f=D(u,"string");return a(f)=="symbol"?f:f+""}function D(u,f){if(a(u)!="object"||!u)return u;var m=u[Symbol.toPrimitive];if(m!==void 0){var y=m.call(u,f);if(a(y)!="object")return y;throw new TypeError("@@toPrimitive must return a primitive value.")}return(f==="string"?String:Number)(u)}var j=pe.CopyToClipboard=(function(u){function f(){var m;d(this,f);for(var y=arguments.length,C=new Array(y),P=0;P<y;P++)C[P]=arguments[P];return m=v(this,f,[].concat(C)),O(m,"onClick",function(k){var g=m.props,A=g.text,M=g.onCopy,N=g.children,L=g.options,W=t.default.Children.only(N),V=(0,e.default)(A,L);M&&M(A,V),W!=null&&W.props&&typeof W.props.onClick=="function"&&W.props.onClick(k)}),m}return T(f,u),p(f,[{key:"render",value:function(){var y=this.props;y.text,y.onCopy,y.options;var C=y.children,P=s(y,r),k=t.default.Children.only(C);return t.default.cloneElement(k,o(o({},P),{},{onClick:this.onClick}))}}])})(t.default.PureComponent);return O(j,"defaultProps",{onCopy:void 0,options:void 0}),pe}var lr,da;function nc(){if(da)return lr;da=1;var e=rc(),t=e.CopyToClipboard;return t.CopyToClipboard=t,lr=t,lr}var Ba=nc();const ac=ha(Ba),Ce={width:"100%",minWidth:0};function fa({preloadLabel:e,onPreload:t,playerSupported:r,playerTitle:n,playerSrc:a,downloadSrc:i,hls:o,heartbeatSrc:s,onPlayerNotSupported:l,openLinkHref:d,showOpenLink:h,copyText:p,externalPlayers:v}){const{t:b}=U(),R=ga();return c.jsxs("div",{className:"button-cell",children:[c.jsx(ke,{title:e,children:c.jsx(J,{onClick:t,variant:"outlined",color:"primary",size:"small",sx:Ce,children:e})}),r?c.jsx(Ja,{title:n,videoSrc:a,downloadSrc:i,hls:o,heartbeatSrc:s,onNotSupported:l,inlineTrigger:!0}):h&&d&&c.jsx(ke,{title:b("OpenLink"),children:c.jsx(J,{component:"a",href:d,target:"_blank",rel:"noreferrer",variant:"outlined",color:"primary",size:"small",sx:Ce,children:b("OpenLink")})}),v.map(_=>c.jsx(ke,{title:_.label,children:c.jsx(J,{component:"a",href:_.href,variant:"outlined",color:"primary",size:"small",sx:Ce,children:_.label})},_.label)),c.jsx(ac,{text:p,onCopy:()=>R==null?void 0:R.showToast({message:b("Copied",{defaultValue:"Copied"}),severity:"success"}),children:c.jsx(J,{variant:"outlined",color:"primary",size:"small",sx:Ce,children:b("CopyLink")})})]})}const Ga=e=>{const{table:{defaultPrimaryColor:t}}=K(e);return H`
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
  `};z.table`
  ${({theme:e})=>{const{table:{defaultPrimaryColor:t,rowBGColor:r,viewedRowBGColor:n,dividerColor:a,rowFontColor:i,outlinedButtonBorderColor:o}}=K(e);return H`
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.8125rem;
    width: 100%;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    color: ${i};

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

        ${Ga(e)}
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

    ${I("shortTable")} {
      display: none;
    }
  `}}
`;const oc=z.div`
  display: none;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);

  ${I("shortTable")} {
    display: grid;
  }

  ${I("tablet")} {
    gap: 15px;
    grid-template-columns: 1fr;
  }
`,ic=z.div`
  ${({$isViewed:e,theme:t})=>{const{table:{defaultPrimaryColor:r,defaultSecondaryColor:n,defaultTertiaryColor:a,shortTableButtonsBGColor:i,viewedPrimaryColor:o,viewedSecondaryColor:s,viewedTertiaryColor:l}}=K(t);return H`
    display: grid;
    width: 100%;
    grid-template-rows: repeat(3, max-content);
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

    .short-table {
      &-name {
        background: ${e?o:r};
        display: grid;
        place-items: center;
        padding: 15px;
        color: #fff;
        text-transform: uppercase;
        font-size: 13px;
        font-weight: 600;
        word-break: break-word;

        ${I("tablet")} {
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
        background: ${e?o:r};
        &:not(:last-child) {
          border-right: 1px solid ${e?o:r};
        }

        &-name {
          background: ${e?s:n};
          color: #fff;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 500;
          display: grid;
          place-items: center;
          padding: 0 10px;

          ${I("tablet")} {
            font-size: 12px;
          }
        }

        &-value {
          background: ${e?l:a};
          display: grid;
          place-items: center;
          color: #fff;
          font-size: 13px;
          padding: 12px 10px;
          position: relative;

          ${I("tablet")} {
            font-size: 12px;
            padding: 10px 8px;
          }
        }
      }

      &-viewed-indicator {
        ${e&&Ga(t)}
      }

      &-buttons {
        padding: 12px;
        border-bottom: 2px solid ${e?o:r};
        background: ${i};

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

        ${I("phone")} {
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
`;Z.addHandler("episode",/(\d{1,4})[- |. ]серия|серия[- |. ](\d{1,4})/i,{type:"integer"});Z.addHandler("season",/sezon[- |. ](\d{1,3})|(\d{1,3})[- |. ]sezon/i,{type:"integer"});Z.addHandler("season",/сезон[- |. ](\d{1,3})|(\d{1,3})[- |. ]сезон/i,{type:"integer"});const sc=x.memo(({playableFileList:e,viewedFileList:t,selectedSeason:r,seasonAmount:n,hash:a})=>{const{t:i}=U(),o=Co(Za("shortTable")),[s,l]=x.useState({}),d=Qa(),h=g=>fetch(`${xr()}?link=${a}&index=${g}&preload`),p=(g,A)=>`${xr()}/${encodeURIComponent(g.split("\\").pop().split("/").pop())}?link=${a}&index=${A}&play`,v=(g,A)=>{const M=no(g,d);return{key:`${A}:${M?"gst":"stream"}`,src:M?oo(a,A):p(g,A),hls:M,heartbeatSrc:M?ao(a):""}},b=g=>{l(A=>({...A,[g]:!0}))},R=!!(e!=null&&e.find(({path:g})=>Z.parse(g).episode)),_=!!(e!=null&&e.find(({path:g})=>Z.parse(g).season)),S=!!(e!=null&&e.find(({path:g})=>Z.parse(g).resolution)),T=((e==null?void 0:e.length)??0)>1&&!R,w=ge("isVlcUsed"),O=ge("isInfuseUsed"),q=ge("isSenPlayerUsed"),D=ge("isIinaUsed"),j=eo(),u=to(),f=ro(),m=!j||!(f&&O)&&!(f&&q)&&!w&&!(u&&D),y=(g,A,M,N)=>{const L=[];return f&&O&&L.push({label:i("Infuse"),href:A}),f&&q&&L.push({label:i("SenPlayer"),href:M}),w&&L.push({label:"VLC",href:`vlc://${g}`}),u&&D&&L.push({label:"IINA",href:N}),L},C=x.useMemo(()=>e!=null&&e.length?e.filter(({path:g})=>{const{season:A}=Z.parse(g);return A===r||!(n!=null&&n.length)}):[],[e,r,n]),P=x.useMemo(()=>C.map(g=>{const A=Z.parse(g.path),M=p(g.path,g.id),N=v(g.path,g.id),L=new URL(M,window.location.href);return{id:g.id,name:T?g.path:A.title||g.path,season:A.season,episode:A.episode,resolution:A.resolution,size:g.length,viewed:(t==null?void 0:t.includes(g.id))??!1,path:g.path,link:M,player:N,fullLink:L.toString(),infuseLink:`infuse://x-callback-url/play?url=${encodeURIComponent(L.toString())}`,senPlayerLink:`senplayer://x-callback-url/play?url=${encodeURIComponent(L.toString())}`,iinaLink:`iina://weblink?url=${encodeURIComponent(L.toString())}`}}),[C,t,T,a,d,s]),k=x.useMemo(()=>{const g=[{field:"viewed",headerName:i("Viewed"),width:70,renderCell:A=>A.value?c.jsx(ce,{sx:{width:10,height:10,borderRadius:"50%",bgcolor:"success.main",m:"auto"}}):null},{field:"name",headerName:i("Name"),flex:1,minWidth:160}];return _&&(n==null?void 0:n.length)===1&&g.push({field:"season",headerName:i("Season"),width:80}),R&&g.push({field:"episode",headerName:i("Episode"),width:80}),S&&g.push({field:"resolution",headerName:i("Resolution"),width:100}),g.push({field:"size",headerName:i("Size"),width:100,valueFormatter:A=>oe(A)}),g.push({field:"actions",headerName:i("Actions"),width:360,sortable:!1,filterable:!1,disableColumnMenu:!0,renderCell:A=>{const M=A.row,N=!s[M.player.key];return c.jsx(fa,{preloadLabel:i("Preload"),onPreload:()=>h(M.id),playerSupported:N,playerTitle:M.name,playerSrc:M.player.src,downloadSrc:M.link,hls:M.player.hls,heartbeatSrc:M.player.heartbeatSrc,onPlayerNotSupported:()=>b(M.player.key),openLinkHref:M.link,showOpenLink:m,copyText:M.fullLink,externalPlayers:y(new URL(M.fullLink),M.infuseLink,M.senPlayerLink,M.iinaLink)})}}),g},[i,_,R,S,n,s,m]);return e!=null&&e.length?o?c.jsx(oc,{children:P.map(g=>c.jsxs(ic,{$isViewed:g.viewed,children:[c.jsx("div",{className:"short-table-name",children:g.name}),c.jsxs("div",{className:"short-table-data",children:[g.viewed&&c.jsxs("div",{className:"short-table-field",children:[c.jsx("div",{className:"short-table-field-name",children:i("Viewed")}),c.jsx("div",{className:"short-table-field-value",children:c.jsx("div",{className:"short-table-viewed-indicator"})})]}),c.jsxs("div",{className:"short-table-field",children:[c.jsx("div",{className:"short-table-field-name",children:i("Size")}),c.jsx("div",{className:"short-table-field-value",children:oe(g.size)})]})]}),c.jsx("div",{className:"short-table-buttons",children:c.jsx(fa,{preloadLabel:i("Preload"),onPreload:()=>h(g.id),playerSupported:!s[g.player.key],playerTitle:g.name,playerSrc:g.player.src,downloadSrc:g.link,hls:g.player.hls,heartbeatSrc:g.player.heartbeatSrc,onPlayerNotSupported:()=>b(g.player.key),openLinkHref:g.link,showOpenLink:m,copyText:g.fullLink,externalPlayers:y(new URL(g.fullLink),g.infuseLink,g.senPlayerLink,g.iinaLink)})})]},g.id))}):c.jsx(ce,{sx:{width:"100%",minHeight:240,height:Math.min(480,56+P.length*64)},children:c.jsx(Lo,{rows:P,columns:k,density:"compact",disableRowSelectionOnClick:!0,getRowHeight:()=>"auto",pageSizeOptions:[25,50,100],initialState:{pagination:{paginationModel:{pageSize:25}}},sx:{border:0,"& .MuiDataGrid-cell":{py:.75,alignItems:"flex-start"},"& .button-cell":{display:"flex",flexWrap:"wrap",gap:.5,width:"100%"}}})}):i("NoPlayableFiles")},(e,t)=>Re(e,t));function cc(e){const t={id:"root",label:"/",children:new Map,files:[]};for(const r of e){const n=r.path.replace(/\\/g,"/").split("/").filter(Boolean);if(n.length<=1){t.files.push(r);continue}let a=t;for(let i=0;i<n.length-1;i++){const o=n[i],s=`${a.id}/${o}`;a.children.has(o)||a.children.set(o,{id:s,label:o,children:new Map,files:[]}),a=a.children.get(o)}a.files.push(r)}return t}function za(e){const t=[...e.files];for(const r of e.children.values())t.push(...za(r));return t}function Ha(e){return[...e.children.values()].map(t=>c.jsx(_a,{itemId:t.id,label:t.label,children:Ha(t)},t.id))}function lc({playableFileList:e,viewedFileList:t,selectedSeason:r,seasonAmount:n,hash:a}){const{t:i}=U(),o=x.useMemo(()=>cc(e),[e]),s=o.children.size>0,[l,d]=x.useState("root"),h=x.useMemo(()=>{if(l==="root")return o;const v=b=>{if(b.id===l)return b;for(const R of b.children.values()){const _=v(R);if(_)return _}return null};return v(o)||o},[o,l]),p=x.useMemo(()=>l==="root"?e:za(h),[l,h,e]);return c.jsxs(ce,{sx:{display:"grid",gridTemplateColumns:s?{xs:"1fr",md:"220px 1fr"}:"1fr",gap:1.5,minHeight:280,width:"100%"},children:[s&&c.jsxs(ce,{sx:{borderRight:{md:1},borderColor:"divider",pr:{md:1},maxHeight:420,overflow:"auto"},children:[c.jsx(Te,{variant:"caption",color:"text.secondary",sx:{display:"block",mb:.5},children:i("Folders",{defaultValue:"Folders"})}),c.jsx(No,{selectedItems:l,onSelectedItemsChange:(v,b)=>d(b||"root"),children:c.jsx(_a,{itemId:"root",label:i("AllFiles",{defaultValue:"All files"}),children:Ha(o)})})]}),c.jsx(sc,{playableFileList:p,viewedFileList:t,selectedSeason:r,seasonAmount:n,hash:a})]})}const uc=x.memo(e=>{var r;const{t}=U();return(r=e.playableFileList)!=null&&r.length?c.jsx(lc,{playableFileList:e.playableFileList,viewedFileList:e.viewedFileList,selectedSeason:e.selectedSeason,seasonAmount:e.seasonAmount,hash:e.hash}):c.jsx(c.Fragment,{children:t("NoPlayableFiles")})},Re),dc=z.div`
  display: grid;
  grid-template-columns: minmax(0, 70%) minmax(0, 1fr);
  grid-template-rows: repeat(2, min-content);
  grid-template-areas:
    'main cache'
    'file-list file-list';
  min-width: 0;

  /* Stack main|cache when dialog is in the fullscreen band (≤960) */
  ${I("dialog")} {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: repeat(3, min-content);
    grid-template-areas:
      'main'
      'cache'
      'file-list';
  }
`,fc=z.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
`,hc=z.div`
  ${({$poster:e,theme:t})=>{const{dialogTorrentDetailsContent:{posterBGColor:r}}=K(t);return H`
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

    ${I("desktop")} {
      align-self: start;
    }

    ${I("tablet")} {
      ${e?H`
              height: 200px;
            `:H`
              display: none;
            `}}
    }
  `}}
`,pc=z.section`
  ${({theme:e})=>{const{dialogTorrentDetailsContent:{gradientStartColor:t,gradientEndColor:r}}=K(e);return H`
    grid-area: main;
    padding: 40px;
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 30px;
    background: linear-gradient(145deg, ${t}, ${r});

    ${I("tablet")} {
      grid-template-columns: 1fr;
      padding: 20px;
    }
  `}}
`,gc=z.section`
  ${({theme:e})=>{const{dialogTorrentDetailsContent:{cacheSectionBGColor:t}}=K(e);return H`
    grid-area: cache;
    padding: 40px;
    display: grid;
    align-content: start;
    grid-template-rows: min-content min-content min-content;
    background: ${t};
    min-width: 0;

    ${I("tablet")} {
      padding: 20px;
    }
  `}}
`,vc=z.section`
  ${({theme:e})=>{const{dialogTorrentDetailsContent:{torrentFilesSectionBGColor:t}}=K(e);return H`
    grid-area: file-list;
    padding: 40px;
    box-shadow: inset 3px 25px 8px -25px rgba(0, 0, 0, 0.5);
    background: ${t};

    ${I("tablet")} {
      padding: 20px;
    }
  `}}
`,be=z.div`
  ${({$mb:e,theme:t})=>{const{dialogTorrentDetailsContent:{subNameFontColor:r}}=K(t);return H`
    ${e&&`margin-top: ${e/3}px`};
    ${e&&`margin-bottom: ${e}px`};
    line-height: 1.2;
    color: ${r};

    ${I("tablet")} {
      ${e&&`margin-top: ${e/4}px`};
      ${e&&`margin-bottom: ${e/2}px`};
      font-size: 14px;
    }
  `}}
`,ae=z.div`
  ${({$color:e,$mb:t,theme:r})=>{const{dialogTorrentDetailsContent:{titleFontColor:n}}=K(r);return H`
    ${t&&`margin-bottom: ${t}px`};
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.15;
    word-break: break-word;
    color: ${e||n};

    ${I("tablet")} {
      font-size: 1.25rem;
      line-height: 1.2;
      ${t&&`margin-bottom: ${t/2}px`};
    }

    ${I("mobile")} {
      font-size: 1.125rem;
    }
  `}}
`,mc=z.div`
  margin-bottom: 20px;
`,La=z.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(max-content, 220px));
  gap: 20px;

  ${I("tablet")} {
    gap: 15px;
  }
  ${I("phone")} {
    gap: 10px;
  }

  ${({$detailedView:e})=>e?H`
          ${I("tablet")} {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          ${I("phone")} {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        `:H`
          ${I("tablet")} {
            grid-template-columns: repeat(auto-fit, minmax(max-content, 185px));
          }
          ${I("compact")} {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          ${I("phone")} {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        `}
`,bc=z.div`
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

  ${I("tablet")} {
    grid-template-columns: 30px 1fr;
    grid-template-rows: min-content 40px;
  }
`,yc=z.div`
  ${({theme:e})=>{const{dialogTorrentDetailsContent:{titleFontColor:t}}=K(e);return H`
    grid-area: title;
    justify-self: start;
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 2px;
    font-weight: 600;
    color: ${t};
  `}}
`,_c=z.div`
  ${({$bgColor:e,$fontColor:t})=>H`
    grid-area: icon;
    color: ${t||te("#fff",.8)};
    background: ${e};
    border-radius: 5px 0 0 5px;

    ${I("tablet")} {
      > svg {
        width: 50%;
      }
    }
  `}}
`,xc=z.div`
  ${({$bgColor:e,$fontColor:t,theme:r})=>{const{dialogTorrentDetailsContent:{widgetFontColor:n}}=K(r);return H`
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

    ${I("tablet")} {
      font-size: 18px;
      padding: 0 16px 0 0;
    }
  `}}
`,Cc=z.div`
  ${({theme:e})=>{const{addDialog:{separatorColor:t}}=K(e);return H`
    height: 1px;
    background-color: ${t};
    margin: 30px 0;
  `}}
`,wc=z.section`
  ${({theme:e})=>{const{detailedView:{gradientStartColor:t,gradientEndColor:r}}=K(e);return H`
    padding: 40px;
    background: linear-gradient(145deg, ${t}, ${r});

    ${I("mobile")} {
      padding: 20px;
    }
  `}}
`,Sc=z.section`
  ${({theme:e})=>{const{detailedView:{cacheSectionBGColor:t}}=K(e);return H`
    padding: 40px;
    box-shadow: inset 3px 25px 8px -25px rgba(0, 0, 0, 0.5);
    background: ${t};
    flex: 1;

    ${I("mobile")} {
      padding: 20px;
    }
  `}}
`;function ne({icon:e,title:t,value:r,iconBg:n,valueBg:a,fontColor:i}){return c.jsxs(bc,{children:[c.jsx(yc,{children:t}),c.jsx(_c,{$bgColor:n,$fontColor:i,children:c.jsx(e,{})}),c.jsx(xc,{$bgColor:a,$fontColor:i,children:r})]})}const{LIGHT:Rc,DARK:Tc}=hr,jc={light:{downloadSpeed:{iconBGColor:"#118f00",valueBGColor:"#13a300"},uploadSpeed:{iconBGColor:"#0146ad",valueBGColor:"#0058db"},peers:{iconBGColor:"#cdc118",valueBGColor:"#d8cb18",fontColor:"#1a1a1a"},piecesCount:{iconBGColor:"#b6c95e",valueBGColor:"#c0d076"},piecesLength:{iconBGColor:"#0982c8",valueBGColor:"#098cd7"},status:{iconBGColor:"#aea25b",valueBGColor:"#b4aa6e"},size:{iconBGColor:"#9b01ad",valueBGColor:"#ac03bf"},category:{iconBGColor:"#914820",valueBGColor:"#c9632c"}},dark:{downloadSpeed:{iconBGColor:"#0c6600",valueBGColor:"#0d7000"},uploadSpeed:{iconBGColor:"#003f9e",valueBGColor:"#0047b3"},peers:{iconBGColor:"#a69c11",valueBGColor:"#b4a913",fontColor:"#1a1a1a"},piecesCount:{iconBGColor:"#8da136",valueBGColor:"#99ae3d"},piecesLength:{iconBGColor:"#07659c",valueBGColor:"#0872af"},status:{iconBGColor:"#938948",valueBGColor:"#9f9450"},size:{iconBGColor:"#81008f",valueBGColor:"#9102a1"},category:{iconBGColor:"#914820",valueBGColor:"#c9632c"}}};function se(e){const{isDarkMode:t}=x.useContext(pa);return jc[t?Tc:Rc][e]}const Na=({data:e})=>{const{t}=U(),{iconBGColor:r,valueBGColor:n}=se("downloadSpeed");return c.jsx(ne,{title:t("DownloadSpeed"),value:va(e)||`0 ${t("bps")}`,iconBg:r,valueBg:n,icon:wo})},Ua=({data:e})=>{const{t}=U(),{iconBGColor:r,valueBGColor:n}=se("uploadSpeed");return c.jsx(ne,{title:t("UploadSpeed"),value:va(e)||`0 ${t("bps")}`,iconBg:r,valueBg:n,icon:So})},Wa=({data:e})=>{const{t}=U(),{iconBGColor:r,valueBGColor:n,fontColor:a}=se("peers");return c.jsx(ne,{title:t("Peers"),value:io(e)||"0 / 0 · 0",iconBg:r,valueBg:n,fontColor:a,icon:Ro})},qc=({data:e})=>{const{t}=U(),{iconBGColor:r,valueBGColor:n}=se("piecesCount");return c.jsx(ne,{title:t("PiecesCount"),value:e,iconBg:r,valueBg:n,icon:jo})},Oc=({data:e})=>{const{t}=U(),{iconBGColor:r,valueBGColor:n}=se("piecesLength");return c.jsx(ne,{title:t("PiecesLength"),value:oe(e),iconBg:r,valueBg:n,icon:qo})},Fa=({stat:e})=>{const{t}=U(),r={[ba]:t("TorrentGettingInfo"),[lo]:t("TorrentPreload"),[co]:t("TorrentWorking"),[so]:t("TorrentClosed"),[ma]:t("TorrentInDb")},{iconBGColor:n,valueBGColor:a}=se("status");return c.jsx(ne,{title:t("TorrentStatus"),value:e!=null?r[e]:void 0,iconBg:n,valueBg:a,icon:Oo})},Ka=({data:e})=>{const{t}=U(),{iconBGColor:r,valueBGColor:n}=se("size");return c.jsx(ne,{title:t("TorrentSize"),value:oe(e),iconBg:r,valueBg:n,icon:To})},Ac=({data:e})=>{const{t}=U(),{iconBGColor:r,valueBGColor:n}=se("category"),a=Cr.findIndex(o=>o.key===e),i=Cr.find(o=>o.key===e);return e?c.jsx(ne,{title:t("Category"),value:a>=0?t(i.name):e.length>1?e.charAt(0).toUpperCase()+e.slice(1):e,iconBg:r,valueBg:n,icon:Rr}):c.jsx(ne,{title:t("Category"),value:"—",iconBg:r,valueBg:n,icon:Rr})};function Mc({downloadSpeed:e,uploadSpeed:t,torrent:r,torrentSize:n,PiecesCount:a,PiecesLength:i,stat:o,cache:s,isSnakeDebugMode:l,setIsSnakeDebugMode:d}){const{t:h}=U();return c.jsxs(c.Fragment,{children:[c.jsxs(wc,{children:[c.jsx(ae,{$mb:20,children:h("Data")}),c.jsxs(La,{$detailedView:!0,children:[c.jsx(Na,{data:e}),c.jsx(Ua,{data:t}),c.jsx(Wa,{data:r}),c.jsx(Ka,{data:n}),c.jsx(qc,{data:a}),c.jsx(Oc,{data:i}),c.jsx(Fa,{stat:o})]})]}),c.jsxs(Sc,{children:[c.jsx(ae,{$mb:20,children:c.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[c.jsx("span",{children:h("Cache")}),c.jsx(Ao,{control:c.jsx(Mo,{color:"primary",checked:l,disableRipple:!0,onChange:({target:{checked:p}})=>{d(p),uo("isSnakeDebugMode",p)}}),label:h("DebugMode"),labelPlacement:"start"})]})}),c.jsx($a,{cache:s,mode:"detailed",isSnakeDebugMode:l})]})]})}const ur=30;function Pc({downloadSpeed:e,uploadSpeed:t}){const{t:r}=U(),[n,a]=x.useState(()=>Array(ur).fill(0)),[i,o]=x.useState(()=>Array(ur).fill(0)),s=x.useRef(0);x.useEffect(()=>{const d=Math.max(0,e??0),h=Math.max(0,t??0);a(p=>[...p.slice(1),d]),o(p=>[...p.slice(1),h]),s.current+=1},[e,t]);const l=x.useMemo(()=>Array.from({length:ur},(d,h)=>h),[]);return c.jsxs(ce,{sx:{width:"100%",minWidth:0},children:[c.jsxs(Te,{variant:"caption",color:"text.secondary",sx:{mb:.5,display:"block"},children:[r("DownloadSpeed")," / ",r("UploadSpeed")]}),c.jsx(Uo,{height:120,series:[{data:n,label:r("DownloadSpeed"),showMark:!1,area:!0},{data:i,label:r("UploadSpeed"),showMark:!1}],xAxis:[{data:l,hideTooltip:!0}],yAxis:[{width:40}],margin:{left:0,right:8,top:8,bottom:8},hideLegend:!0})]})}const dr=z.div`
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

  ${I("mobile")} {
    grid-template-columns: 1fr;
  }
`,fr=z.div`
  ${({$mb:e,theme:t})=>{const{torrentFunctions:{fontColor:r}}=K(t);return H`
    ${e&&`margin-bottom: ${e}px`};
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2;
    color: ${r};

    ${I("mobile")} {
      font-size: 13px;
      font-weight: 400;
      ${e&&`margin-bottom: ${e/1.5}px`};
    }
  `}}
`,Ec=x.memo(({hash:e,viewedFileList:t,playableFileList:r,name:n,title:a,setViewedFileList:i})=>{var w;const{t:o}=U(),s=ga(),[l,d]=x.useState(null),h=t==null?void 0:t[(t==null?void 0:t.length)-1],p=(w=r==null?void 0:r.find(({id:O})=>O===h))==null?void 0:w.path,v=(r==null?void 0:r.length)===1,b=p?Z.parse(p):null,R=`${fo()}/${encodeURIComponent(n||a||"file")}.m3u?link=${e}&m3u`,_=`${R}&fromlast`,S=`magnet:?xt=urn:btih:${e}&dn=${encodeURIComponent(n||a||"")}`,T=()=>{l==="drop"&&ye.post(ho(),{action:"drop",hash:e}).then(()=>s==null?void 0:s.showToast({message:o("DropTorrent"),severity:"success"})).catch(()=>s==null?void 0:s.showToast({message:o("PlaybackError"),severity:"error"})),l==="views"&&ye.post(ya(),{action:"rem",hash:e,file_index:-1}).then(()=>{i(),s==null||s.showToast({message:o("RemoveViews"),severity:"success"})}).catch(()=>s==null?void 0:s.showToast({message:o("PlaybackError"),severity:"error"})),d(null)};return c.jsxs(c.Fragment,{children:[!v&&!!(t!=null&&t.length)&&c.jsxs(c.Fragment,{children:[c.jsx(fr,{children:o("DownloadPlaylist")}),c.jsxs(be,{$mb:10,children:[o("LatestFilePlayed")," ",c.jsxs("strong",{children:[b==null?void 0:b.title,".",(b==null?void 0:b.season)&&c.jsxs(c.Fragment,{children:[" ",o("Season"),": ",b==null?void 0:b.season,". ",o("Episode"),": ",b==null?void 0:b.episode,"."]})]})]}),c.jsxs(dr,{children:[c.jsx(J,{component:"a",href:R,variant:"contained",color:"primary",size:"large",children:o("Full")}),c.jsx(J,{component:"a",href:_,variant:"contained",color:"primary",size:"large",children:o("FromLatestFile")})]})]}),c.jsx(fr,{$mb:10,children:o("TorrentState")}),c.jsxs(dr,{children:[c.jsx(J,{onClick:()=>d("views"),variant:"outlined",color:"primary",size:"large",children:o("RemoveViews")}),c.jsx(J,{onClick:()=>d("drop"),variant:"contained",color:"error",size:"large",children:o("DropTorrent")})]}),c.jsx(fr,{$mb:10,children:o("Info")}),c.jsxs(dr,{children:[(v||!(t!=null&&t.length))&&c.jsx(J,{component:"a",href:R,variant:"contained",color:"primary",size:"large",children:o("DownloadPlaylist")}),c.jsx(Ba.CopyToClipboard,{text:S,onCopy:()=>s==null?void 0:s.showToast({message:o("Copied"),severity:"success"}),children:c.jsx(J,{variant:"contained",color:"primary",size:"large",children:o("CopyHash")})})]}),c.jsxs(Po,{open:l!=null,onClose:()=>d(null),"aria-labelledby":"torrent-fn-confirm-title",children:[c.jsx(Eo,{id:"torrent-fn-confirm-title",children:o(l==="drop"?"DropTorrent":"RemoveViews")}),c.jsx(Do,{children:c.jsx(ko,{children:o(l==="drop"?"ConfirmDropTorrent":"ConfirmRemoveViews")})}),c.jsxs(Io,{children:[c.jsx(J,{autoFocus:!0,onClick:()=>d(null),variant:"outlined",color:"primary",children:o("Cancel")}),c.jsx(J,{onClick:T,variant:"contained",color:l==="drop"?"error":"primary",children:o("OK")})]})]})]})}),Dc=()=>c.jsx("div",{style:{minHeight:160,display:"grid",placeItems:"center",padding:24},children:c.jsx(Go,{color:"secondary"})}),kc=e=>({id:e.id??e.Id??0,path:e.path??e.Path??"",length:e.length??e.Length??0});function Lc({closeDialog:e,torrent:t}){var le;const{t:r}=U(),{dialogTorrentDetailsContent:{bufferTrailStartColor:n,bufferTrailEndColor:a,bufferEmptyTrackColor:i,bufferTrackBorderColor:o}}=K($o()),[s,l]=x.useState(!0),[d,h]=x.useState(!1),[p,v]=x.useState(),[b,R]=x.useState(),[_,S]=x.useState(null),[T,w]=x.useState(),[O,q]=x.useState(ge("isSnakeDebugMode")),{poster:D,hash:j,title:u,category:f,name:m,stat:y,download_speed:C,upload_speed:P,torrent_size:k,file_stats:g}=t,A=oi(j),M=si(),{Capacity:N,PiecesCount:L,PiecesLength:W,Filled:V}=A;x.useEffect(()=>{if(b&&_===null){const B=[];b.forEach(({path:G})=>{const F=Z.parse(G).season;F&&!B.includes(F)&&B.push(F)}),B.length&&w(B[0]),S(B.sort((G,F)=>G-F))}},[b,_]),x.useEffect(()=>{R(g==null?void 0:g.map(kc).filter(({path:B})=>po(B)))},[g]),x.useEffect(()=>{const B=!!Object.entries(A).length,G=y!==ba&&y!==ma;!B&&!s&&l(!0),B&&s&&G&&l(!1)},[y,A,s]),x.useEffect(()=>{ye.post(ya(),{action:"list",hash:j}).then(({data:B})=>{if(B){const G=B.map(F=>F.file_index).sort((F,yr)=>F-yr);v(G)}else v(void 0)})},[j]);const fe=M==null?void 0:M.PreloadCache,E=(N||0)/100*(fe||0),$=E>33554432?E:33554432,Q=N&&N>0?N:$,X=Q>0&&V!=null&&V>0?Math.min(100,Math.round(V*100/Q)):null,Y=N&&N>0&&E>0?Math.min(100,Math.round(E*100/N)):null,ee=()=>{const B=[],G=m?Z.parse(m):null;u!==m?B.push(wr(u||"")):G!=null&&G.title&&B.push(wr(G.title)),G!=null&&G.year&&!String(B[0]||"").includes(String(G.year))&&B.push(G.year),G!=null&&G.resolution&&!String(B[0]||"").includes(String(G.resolution))&&B.push(G.resolution);const F=B.join(". ");return F[F.length-1]==="."&&F[F.length-2]==="."?`${F}.`:F};return c.jsxs(c.Fragment,{children:[c.jsx(li,{onClose:e,title:r(d?"DetailedCacheView.header":"TorrentDetails"),...d&&{onBack:()=>h(!1)}}),c.jsx(fc,{children:s?c.jsx(Dc,{}):d?c.jsx(Mc,{downloadSpeed:C,uploadSpeed:P,torrent:t,torrentSize:k,PiecesCount:L,PiecesLength:W,stat:y,cache:A,isSnakeDebugMode:O,setIsSnakeDebugMode:q}):c.jsxs(dc,{children:[c.jsxs(pc,{children:[c.jsx(hc,{$poster:!!D,children:D?c.jsx("img",{alt:"poster",src:D}):c.jsx(go,{})}),c.jsxs("div",{children:[u&&m!==u?ee().length>90?c.jsxs(c.Fragment,{children:[c.jsx(ae,{children:Z.parse(m||"").title}),c.jsx(be,{$mb:20,children:ee()})]}):c.jsxs(c.Fragment,{children:[c.jsx(ae,{children:ee()}),c.jsx(be,{$mb:20,children:(le=Z.parse(m||""))==null?void 0:le.title})]}):c.jsx(ae,{$mb:20,children:ee()}),c.jsxs(La,{children:[c.jsx(Na,{data:C}),c.jsx(Ua,{data:P}),c.jsx(Wa,{data:t}),c.jsx(Ka,{data:k}),c.jsx(Fa,{stat:y}),c.jsx(Ac,{data:f})]}),c.jsx(Pc,{downloadSpeed:C,uploadSpeed:P}),c.jsx(Cc,{}),c.jsx(Ec,{hash:j,viewedFileList:p,playableFileList:b,name:m,title:u,setViewedFileList:v})]})]}),c.jsxs(gc,{children:[c.jsxs(mc,{children:[c.jsx(ae,{$mb:12,children:r("Buffer")}),$<=33554432&&c.jsx(be,{children:r("BufferNote")}),c.jsxs(Tr,{spacing:1,sx:{mt:.5},children:[c.jsxs(Te,{component:"div",variant:"body2",sx:{fontWeight:400,textAlign:"center"},"aria-label":`${oe(V||0)} / ${oe(Q)}`,children:[`${oe(V||0)} / ${oe(Q)}`,X!=null?` · ${X}%`:""]}),c.jsxs(ce,{sx:{position:"relative"},children:[c.jsx(Bo,{variant:"determinate",value:X??0,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":X??0,sx:{height:10,borderRadius:1,border:`1px solid ${o}`,backgroundColor:i,"& .MuiLinearProgress-bar":{borderRadius:1,background:`linear-gradient(90deg, ${n}, ${a})`}}}),Y!=null&&Y>0&&c.jsx(ce,{"aria-hidden":!0,title:r("SettingsDialog.PreloadCache"),sx:{position:"absolute",left:`${Y}%`,top:-2,bottom:-2,width:2,ml:"-1px",borderRadius:1,bgcolor:o,boxShadow:`0 0 0 1px ${i}`,pointerEvents:"none"}})]})]})]}),c.jsx($a,{mode:"mini",cache:A,isSnakeDebugMode:O}),c.jsx(J,{style:{marginTop:"20px",width:"100%"},variant:"outlined",color:"primary",size:"large",onClick:()=>h(!0),children:r("DetailedCacheView.button")})]}),c.jsxs(vc,{children:[c.jsx(ae,{$mb:20,children:r("TorrentContent")}),((_==null?void 0:_.length)??0)>1&&c.jsxs(c.Fragment,{children:[c.jsx(be,{$mb:7,children:r("SelectSeason")}),c.jsx(Tr,{direction:"row",useFlexGap:!0,spacing:1,sx:{flexWrap:"wrap",mb:"30px"},children:_.map(B=>c.jsx(J,{color:"secondary",variant:T===B?"contained":"outlined",onClick:()=>w(B),children:B},B))}),c.jsxs(ae,{$mb:20,children:[r("Season")," ",T]})]}),c.jsx(uc,{hash:j,playableFileList:b,viewedFileList:p,selectedSeason:T,seasonAmount:_})]})]})})]})}export{Lc as default};
