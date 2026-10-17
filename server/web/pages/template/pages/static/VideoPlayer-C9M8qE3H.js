import{i as e}from"./rolldown-runtime-8BhlS34s.js";import{E as t,M as n,P as r,_ as i,f as a,g as o,k as s,r as c}from"./heroui-DWtHc1KV.js";import{i as l}from"./vendor-B1C8asKq.js";import{n as u,r as d}from"./ModalOpenContext-aHF7uYEQ.js";import{a as f,l as p,n as m}from"./authCredentials-52T04jxv.js";import{t as h}from"./createLucideIcon-tmLB1o8V.js";import{n as ee,t as te}from"./maximize-2-PjUa6y82.js";import{t as ne}from"./download-DPsoASoz.js";import{t as re}from"./useTranslation-BfUfTIX-.js";import{$t as ie,Bt as ae,It as oe,J as se,Lt as ce,Q as le,Xt as ue,_ as de,a as fe,b as pe,d as me,fn as he,g as ge,ht as _e,i as ve,ot as ye,s as be,ut as xe,y as Se,zt as Ce}from"./index-DPpIhEFQ.js";import{r as we,t as Te}from"./useTorrentDetail-DUOKe68s.js";import{t as Ee}from"./hls-BPUeZg91.js";var De={name:`minimize-2`,size:24,node:[[`path`,{d:`m14 10 7-7`,key:`oa77jy`}],[`path`,{d:`M20 10h-6V4`,key:`mjg0md`}],[`path`,{d:`m3 21 7-7`,key:`tjx5ai`}],[`path`,{d:`M4 14h6v6`,key:`rmj7iw`}]]};De.node;var Oe=h(De),g=e(r(),1),ke=10;function Ae(e){if(!e||typeof e!=`object`)return!0;let t=e,n=t.tagName;return n===`INPUT`||n===`TEXTAREA`||n===`SELECT`?!1:!t.isContentEditable}function je(e,t){if(t===` `||t===`Spacebar`)return e.paused?e.play():e.pause(),!0;let n=t===`ArrowRight`?ke:t===`ArrowLeft`?-10:0;if(!n)return!1;let r=Number.isFinite(e.duration)?e.duration:1/0;return e.currentTime=Math.min(Math.max(0,e.currentTime+n),r),!0}var Me=new Set([`style`,`children`,`ref`,`key`,`suppressContentEditableWarning`,`suppressHydrationWarning`,`dangerouslySetInnerHTML`]),Ne={className:`class`,htmlFor:`for`};function Pe(e){return e.toLowerCase()}function _(e){if(typeof e==`boolean`)return e?``:void 0;if(typeof e!=`function`&&!(typeof e==`object`&&e))return e}function v({react:e,tagName:t,elementClass:n,events:r,displayName:i,defaultProps:a,toAttributeName:o=Pe,toAttributeValue:s=_}){let c=Number.parseInt(e.version)>=19,l=e.forwardRef((i,l)=>{let u=e.useRef(null),d=e.useRef(new Map),f={},p={},m={},h={};for(let[e,t]of Object.entries(i)){if(Me.has(e)){m[e]=t;continue}let r=o(Ne[e]??e);if(n.prototype&&e in n.prototype&&!(e in(globalThis.HTMLElement?.prototype??{}))&&!n.observedAttributes?.some(e=>e===r)){h[e]=t;continue}if(e.startsWith(`on`)){f[e]=t;continue}let i=s(t);r&&i!=null&&(p[r]=String(i),c||(m[r]=i)),r&&c&&(m[r]=i===_(t)?t:i)}if(typeof window<`u`){for(let t in f){let n=f[t],i=t.endsWith(`Capture`),a=(r?.[t]??t.slice(2).toLowerCase()).slice(0,i?-7:void 0);e.useLayoutEffect(()=>{let e=u?.current;if(e&&typeof n==`function`)return e.addEventListener(a,n,i),()=>{e.removeEventListener(a,n,i)}},[u?.current,n])}e.useLayoutEffect(()=>{if(u.current===null)return;let e=new Map;for(let t in h)Fe(u.current,t,h[t]),d.current.delete(t),e.set(t,h[t]);for(let[e,t]of d.current)Fe(u.current,e,void 0);d.current=e})}if(typeof window>`u`&&n?.getTemplateHTML&&n?.shadowRootOptions){let{mode:t,delegatesFocus:r}=n.shadowRootOptions;m.children=[e.createElement(`template`,{shadowrootmode:t,shadowrootdelegatesfocus:r,dangerouslySetInnerHTML:{__html:n.getTemplateHTML(p,i)},key:`ce-la-react-ssr-template-shadow-root`}),m.children]}return e.createElement(t,{...a,...m,ref:e.useCallback(e=>{u.current=e,typeof l==`function`?l(e):l!==null&&(l.current=e)},[l])},m.children)});return l.displayName=i??n.name,l}function Fe(e,t,n){e[t]=n,n==null&&t in(globalThis.HTMLElement?.prototype??{})&&e.removeAttribute(t)}var y={MEDIA_PLAY_REQUEST:`mediaplayrequest`,MEDIA_PAUSE_REQUEST:`mediapauserequest`,MEDIA_MUTE_REQUEST:`mediamuterequest`,MEDIA_UNMUTE_REQUEST:`mediaunmuterequest`,MEDIA_LOOP_REQUEST:`medialooprequest`,MEDIA_VOLUME_REQUEST:`mediavolumerequest`,MEDIA_SEEK_REQUEST:`mediaseekrequest`,MEDIA_AIRPLAY_REQUEST:`mediaairplayrequest`,MEDIA_ENTER_FULLSCREEN_REQUEST:`mediaenterfullscreenrequest`,MEDIA_EXIT_FULLSCREEN_REQUEST:`mediaexitfullscreenrequest`,MEDIA_PREVIEW_REQUEST:`mediapreviewrequest`,MEDIA_ENTER_PIP_REQUEST:`mediaenterpiprequest`,MEDIA_EXIT_PIP_REQUEST:`mediaexitpiprequest`,MEDIA_ENTER_CAST_REQUEST:`mediaentercastrequest`,MEDIA_EXIT_CAST_REQUEST:`mediaexitcastrequest`,MEDIA_SHOW_TEXT_TRACKS_REQUEST:`mediashowtexttracksrequest`,MEDIA_HIDE_TEXT_TRACKS_REQUEST:`mediahidetexttracksrequest`,MEDIA_SHOW_SUBTITLES_REQUEST:`mediashowsubtitlesrequest`,MEDIA_DISABLE_SUBTITLES_REQUEST:`mediadisablesubtitlesrequest`,MEDIA_TOGGLE_SUBTITLES_REQUEST:`mediatogglesubtitlesrequest`,MEDIA_PLAYBACK_RATE_REQUEST:`mediaplaybackraterequest`,MEDIA_RENDITION_REQUEST:`mediarenditionrequest`,MEDIA_AUDIO_TRACK_REQUEST:`mediaaudiotrackrequest`,MEDIA_SEEK_TO_LIVE_REQUEST:`mediaseektoliverequest`,REGISTER_MEDIA_STATE_RECEIVER:`registermediastatereceiver`,UNREGISTER_MEDIA_STATE_RECEIVER:`unregistermediastatereceiver`},b={MEDIA_CHROME_ATTRIBUTES:`mediachromeattributes`,MEDIA_CONTROLLER:`mediacontroller`},Ie={MEDIA_AIRPLAY_UNAVAILABLE:`mediaAirplayUnavailable`,MEDIA_AUDIO_TRACK_ENABLED:`mediaAudioTrackEnabled`,MEDIA_AUDIO_TRACK_LIST:`mediaAudioTrackList`,MEDIA_AUDIO_TRACK_UNAVAILABLE:`mediaAudioTrackUnavailable`,MEDIA_BUFFERED:`mediaBuffered`,MEDIA_CAST_UNAVAILABLE:`mediaCastUnavailable`,MEDIA_CHAPTERS_CUES:`mediaChaptersCues`,MEDIA_CURRENT_TIME:`mediaCurrentTime`,MEDIA_DURATION:`mediaDuration`,MEDIA_ENDED:`mediaEnded`,MEDIA_ERROR:`mediaError`,MEDIA_ERROR_CODE:`mediaErrorCode`,MEDIA_ERROR_MESSAGE:`mediaErrorMessage`,MEDIA_FULLSCREEN_UNAVAILABLE:`mediaFullscreenUnavailable`,MEDIA_HAS_PLAYED:`mediaHasPlayed`,MEDIA_HEIGHT:`mediaHeight`,MEDIA_IS_AIRPLAYING:`mediaIsAirplaying`,MEDIA_IS_CASTING:`mediaIsCasting`,MEDIA_IS_FULLSCREEN:`mediaIsFullscreen`,MEDIA_IS_PIP:`mediaIsPip`,MEDIA_LOADING:`mediaLoading`,MEDIA_MUTED:`mediaMuted`,MEDIA_LOOP:`mediaLoop`,MEDIA_PAUSED:`mediaPaused`,MEDIA_PIP_UNAVAILABLE:`mediaPipUnavailable`,MEDIA_PLAYBACK_RATE:`mediaPlaybackRate`,MEDIA_PREVIEW_CHAPTER:`mediaPreviewChapter`,MEDIA_PREVIEW_COORDS:`mediaPreviewCoords`,MEDIA_PREVIEW_IMAGE:`mediaPreviewImage`,MEDIA_PREVIEW_TIME:`mediaPreviewTime`,MEDIA_RENDITION_LIST:`mediaRenditionList`,MEDIA_RENDITION_SELECTED:`mediaRenditionSelected`,MEDIA_RENDITION_UNAVAILABLE:`mediaRenditionUnavailable`,MEDIA_SEEKABLE:`mediaSeekable`,MEDIA_STREAM_TYPE:`mediaStreamType`,MEDIA_SUBTITLES_LIST:`mediaSubtitlesList`,MEDIA_SUBTITLES_SHOWING:`mediaSubtitlesShowing`,MEDIA_TARGET_LIVE_WINDOW:`mediaTargetLiveWindow`,MEDIA_TIME_IS_LIVE:`mediaTimeIsLive`,MEDIA_VOLUME:`mediaVolume`,MEDIA_VOLUME_LEVEL:`mediaVolumeLevel`,MEDIA_VOLUME_UNAVAILABLE:`mediaVolumeUnavailable`,MEDIA_LANG:`mediaLang`,MEDIA_WIDTH:`mediaWidth`},Le=Object.entries(Ie),x=Le.reduce((e,[t,n])=>(e[t]=n.toLowerCase(),e),{}),S=Le.reduce((e,[t,n])=>(e[t]=n.toLowerCase(),e),{USER_INACTIVE_CHANGE:`userinactivechange`,BREAKPOINTS_CHANGE:`breakpointchange`,BREAKPOINTS_COMPUTED:`breakpointscomputed`});Object.entries(S).reduce((e,[t,n])=>{let r=x[t];return r&&(e[n]=r),e},{userinactivechange:`userinactive`});var C=Object.entries(x).reduce((e,[t,n])=>{let r=S[t];return r&&(e[n]=r),e},{userinactive:`userinactivechange`}),w={SUBTITLES:`subtitles`,CAPTIONS:`captions`,DESCRIPTIONS:`descriptions`,CHAPTERS:`chapters`,METADATA:`metadata`},Re={DISABLED:`disabled`,HIDDEN:`hidden`,SHOWING:`showing`},ze={MOUSE:`mouse`,PEN:`pen`,TOUCH:`touch`},T={UNAVAILABLE:`unavailable`,UNSUPPORTED:`unsupported`},E={LIVE:`live`,ON_DEMAND:`on-demand`,UNKNOWN:`unknown`},Be={INLINE:`inline`,FULLSCREEN:`fullscreen`,PICTURE_IN_PICTURE:`picture-in-picture`};function Ve(e){return e?.map(He).join(` `)}function He(e){if(e){let{id:t,width:n,height:r}=e;return[t,n,r].filter(e=>e!=null).join(`:`)}}function Ue(e){return e?.map(We).join(` `)}function We(e){if(e){let{id:t,kind:n,language:r,label:i}=e;return[t,n,r,i].filter(e=>e!=null).join(`:`)}}function Ge(e){return typeof e==`number`&&!Number.isNaN(e)&&Number.isFinite(e)}var Ke=e=>new Promise(t=>setTimeout(t,e)),qe={en:{"Start airplay":`Start airplay`,"Stop airplay":`Stop airplay`,Audio:`Audio`,Captions:`Captions`,"Enable captions":`Enable captions`,"Disable captions":`Disable captions`,"Start casting":`Start casting`,"Stop casting":`Stop casting`,"Enter fullscreen mode":`Enter fullscreen mode`,"Exit fullscreen mode":`Exit fullscreen mode`,Mute:`Mute`,Unmute:`Unmute`,Loop:`Loop`,"Enter picture in picture mode":`Enter picture in picture mode`,"Exit picture in picture mode":`Exit picture in picture mode`,Play:`Play`,Pause:`Pause`,"Playback rate":`Playback rate`,"Playback rate {playbackRate}":`Playback rate {playbackRate}`,Quality:`Quality`,"Seek backward":`Seek backward`,"Seek forward":`Seek forward`,Settings:`Settings`,Auto:`Auto`,"audio player":`audio player`,"video player":`video player`,volume:`volume`,seek:`seek`,"closed captions":`closed captions`,"current playback rate":`current playback rate`,"playback time":`playback time`,"media loading":`media loading`,settings:`settings`,"audio tracks":`audio tracks`,quality:`quality`,play:`play`,pause:`pause`,mute:`mute`,unmute:`unmute`,"chapter: {chapterName}":`chapter: {chapterName}`,live:`live`,Off:`Off`,"start airplay":`start airplay`,"stop airplay":`stop airplay`,"start casting":`start casting`,"stop casting":`stop casting`,"enter fullscreen mode":`enter fullscreen mode`,"exit fullscreen mode":`exit fullscreen mode`,"enter picture in picture mode":`enter picture in picture mode`,"exit picture in picture mode":`exit picture in picture mode`,"seek to live":`seek to live`,"playing live":`playing live`,"seek back {seekOffset} seconds":`seek back {seekOffset} seconds`,"seek forward {seekOffset} seconds":`seek forward {seekOffset} seconds`,"Network Error":`Network Error`,"Decode Error":`Decode Error`,"Source Not Supported":`Source Not Supported`,"Encryption Error":`Encryption Error`,"A network error caused the media download to fail.":`A network error caused the media download to fail.`,"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":`A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.`,"An unsupported error occurred. The server or network failed, or your browser does not support this format.":`An unsupported error occurred. The server or network failed, or your browser does not support this format.`,"The media is encrypted and there are no keys to decrypt it.":`The media is encrypted and there are no keys to decrypt it.`,hour:`hour`,hours:`hours`,minute:`minute`,minutes:`minutes`,second:`second`,seconds:`seconds`,"{time} remaining":`{time} remaining`,"{currentTime} of {totalTime}":`{currentTime} of {totalTime}`,"video not loaded, unknown time.":`video not loaded, unknown time.`}},Je=globalThis.navigator?.language||`en`,Ye=e=>{Je=e},Xe=e=>{let[t]=Je.split(`-`);return qe[Je]?.[e]||qe[t]?.[e]||qe.en?.[e]||e},Ze=()=>{let[e]=Je.split(`-`);return qe[Je]?Je:qe[e]?e:`en`},D=(e,t={})=>Xe(e).replace(/\{(\w+)\}/g,(e,n)=>n in t?String(t[n]):`{${n}}`),Qe=[{singular:`hour`,plural:`hours`},{singular:`minute`,plural:`minutes`},{singular:`second`,plural:`seconds`}],$e=(e,t)=>`${e} ${D(e===1?Qe[t].singular:Qe[t].plural)}`,et=e=>{if(!Ge(e))return``;let t=Math.abs(e),n=t!==e,r=new Date(0,0,0,0,0,t,0),i=[r.getHours(),r.getMinutes(),r.getSeconds()].map((e,t)=>e&&$e(e,t)).filter(e=>e).join(`, `);return n?D(`{time} remaining`,{time:i}):t===0?$e(0,2):i};function tt(e,t){let n=!1;e<0&&(n=!0,e=0-e),e=e<0?0:e;let r=Math.floor(e%60),i=Math.floor(e/60%60),a=Math.floor(e/3600),o=Math.floor(t/60%60),s=Math.floor(t/3600);return(isNaN(e)||e===1/0)&&(a=i=r=`0`),a=a>0||s>0?a+`:`:``,i=((a||o>=10)&&i<10?`0`+i:i)+`:`,r=r<10?`0`+r:r,(n?`-`:``)+a+i+r}Object.freeze({length:0,start(e){let t=e>>>0;if(t>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(e){let t=e>>>0;if(t>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);return 0}});var nt=class{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}},rt=class extends nt{},it=class extends rt{constructor(){super(...arguments),this.role=null}},at=class{observe(){}unobserve(){}disconnect(){}},ot={createElement:function(){return new st.HTMLElement},createElementNS:function(){return new st.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(e){return!1}},st={ResizeObserver:at,document:ot,Node:rt,Element:it,HTMLElement:class extends it{constructor(){super(...arguments),this.innerHTML=``}get content(){return new st.DocumentFragment}},DocumentFragment:class extends nt{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(e){return null},setItem(e,t){},removeItem(e){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return``}},matchMedia(e){return{matches:!1,media:e}},DOMParser:class{parseFromString(e,t){return{body:{textContent:e}}}}},ct=`global`in globalThis&&(globalThis==null?void 0:globalThis.global)===globalThis||typeof window>`u`||window.customElements===void 0,lt=Object.keys(st).every(e=>e in globalThis),O=ct&&!lt?st:globalThis,k=ct&&!lt?ot:globalThis.document,ut=new WeakMap,dt=e=>{let t=ut.get(e);return t||ut.set(e,t=new Set),t},ft=new O.ResizeObserver(e=>{for(let t of e)for(let e of dt(t.target))e(t)});function pt(e,t){dt(e).add(t),ft.observe(e)}function mt(e,t){let n=dt(e);n.delete(t),n.size||ft.unobserve(e)}function ht(e){let t={};for(let n of e)t[n.name]=n.value;return t}function gt(e){return _t(e)??St(e,`media-controller`)}function _t(e){let{MEDIA_CONTROLLER:t}=b,n=e.getAttribute(t);if(n)return wt(e)?.getElementById(n)}var vt=(e,t,n=`.value`)=>{let r=e.querySelector(n);r&&(r.textContent=t)},yt=(e,t)=>{let n=`slot[name="${t}"]`,r=e.shadowRoot.querySelector(n);return r?r.children:[]},bt=(e,t)=>yt(e,t)[0],xt=(e,t)=>!e||!t?!1:e?.contains(t)?!0:xt(e,t.getRootNode().host),St=(e,t)=>e?e.closest(t)||St(e.getRootNode().host,t):null;function Ct(e=document){let t=e?.activeElement;return t?Ct(t.shadowRoot)??t:null}function wt(e){let t=(e?.getRootNode)?.call(e);return t instanceof ShadowRoot||t instanceof Document?t:null}function Tt(e,{depth:t=3,checkOpacity:n=!0,checkVisibilityCSS:r=!0}={}){if(e.checkVisibility)return e.checkVisibility({checkOpacity:n,checkVisibilityCSS:r});let i=e;for(;i&&t>0;){let e=getComputedStyle(i);if(n&&e.opacity===`0`||r&&e.visibility===`hidden`||e.display===`none`)return!1;i=i.parentElement,t--}return!0}function Et(e,t,n,r){let i=r.x-n.x,a=r.y-n.y,o=i*i+a*a;if(o===0)return 0;let s=((e-n.x)*i+(t-n.y)*a)/o;return Math.max(0,Math.min(1,s))}function A(e,t){return Dt(e,e=>e===t)||Ot(e,t)}function Dt(e,t){let n;for(n of e.querySelectorAll(`style:not([media])`)??[]){let e;try{e=n.sheet?.cssRules}catch{continue}for(let n of e??[])if(t(n.selectorText))return n}}function Ot(e,t){let n=e.querySelectorAll(`style:not([media])`)??[],r=n?.[n.length-1];if(!r?.sheet)return console.warn(`Media Chrome: No style sheet found on style tag of`,e),{style:{setProperty:()=>{},removeProperty:()=>``,getPropertyValue:()=>``}};let i=r?.sheet.insertRule(`${t}{}`,r.sheet.cssRules.length);return r.sheet.cssRules?.[i]}function j(e,t,n=NaN){let r=e.getAttribute(t);return r==null?n:+r}function M(e,t,n){let r=+n;n==null||Number.isNaN(r)?e.hasAttribute(t)&&e.removeAttribute(t):j(e,t,void 0)!==r&&e.setAttribute(t,`${r}`)}function N(e,t){return e.hasAttribute(t)}function P(e,t,n){n==null?e.hasAttribute(t)&&e.removeAttribute(t):N(e,t)!=n&&e.toggleAttribute(t,n)}function F(e,t,n=null){return e.getAttribute(t)??n}function I(e,t,n){if(n==null){e.hasAttribute(t)&&e.removeAttribute(t);return}let r=`${n}`;F(e,t,void 0)!==r&&e.setAttribute(t,r)}var kt=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},At=(e,t,n)=>(kt(e,t,`read from private field`),n?n.call(e):t.get(e)),jt=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Mt=(e,t,n,r)=>(kt(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),L;function Nt(e){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `}var Pt=class extends O.HTMLElement{constructor(){if(super(),jt(this,L,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=ht(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[b.MEDIA_CONTROLLER,x.MEDIA_PAUSED]}attributeChangedCallback(e,t,n){var r,i,a,o;e===b.MEDIA_CONTROLLER&&(t&&((i=(r=At(this,L))?.unassociateElement)==null||i.call(r,this),Mt(this,L,null)),n&&this.isConnected&&(Mt(this,L,this.getRootNode()?.getElementById(n)),(o=(a=At(this,L))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;this.tabIndex=-1,this.setAttribute(`aria-hidden`,`true`),Mt(this,L,Ft(this)),this.getAttribute(b.MEDIA_CONTROLLER)&&((t=(e=At(this,L))?.associateElement)==null||t.call(e,this)),At(this,L)&&(At(this,L).addEventListener(`pointerdown`,this),At(this,L).addEventListener(`click`,this),At(this,L).hasAttribute(`tabindex`)||(At(this,L).tabIndex=0))}disconnectedCallback(){var e,t,n,r;this.getAttribute(b.MEDIA_CONTROLLER)&&((t=(e=At(this,L))?.unassociateElement)==null||t.call(e,this)),(n=At(this,L))==null||n.removeEventListener(`pointerdown`,this),(r=At(this,L))==null||r.removeEventListener(`click`,this),Mt(this,L,null)}handleEvent(e){let t=e.composedPath()?.[0];if([`video`,`media-controller`].includes(t?.localName)){if(e.type===`pointerdown`)this._pointerType=e.pointerType;else if(e.type===`click`){let{clientX:t,clientY:n}=e,{left:r,top:i,width:a,height:o}=this.getBoundingClientRect(),s=t-r,c=n-i;if(s<0||c<0||s>a||c>o||a===0&&o===0)return;let l=this._pointerType||`mouse`;if(this._pointerType=void 0,l===ze.TOUCH){this.handleTap(e);return}if(l===ze.MOUSE||l===ze.PEN){this.handleMouseClick(e);return}}}}get mediaPaused(){return N(this,x.MEDIA_PAUSED)}set mediaPaused(e){P(this,x.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){let t=this.mediaPaused?y.MEDIA_PLAY_REQUEST:y.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new O.CustomEvent(t,{composed:!0,bubbles:!0}))}};L=new WeakMap,Pt.shadowRootOptions={mode:`open`},Pt.getTemplateHTML=Nt;function Ft(e){let t=e.getAttribute(b.MEDIA_CONTROLLER);return t?e.getRootNode()?.getElementById(t):St(e,`media-controller`)}O.customElements.get(`media-gesture-receiver`)||O.customElements.define(`media-gesture-receiver`,Pt);var It=Pt,Lt=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},R=(e,t,n)=>(Lt(e,t,`read from private field`),n?n.call(e):t.get(e)),z=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Rt=(e,t,n,r)=>(Lt(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),zt=(e,t,n)=>(Lt(e,t,`access private method`),n),Bt,Vt,Ht,Ut,Wt,Gt,Kt,qt,Jt,Yt,Xt,Zt,Qt,$t,en,tn,nn,rn,an,on,B={AUDIO:`audio`,AUTOHIDE:`autohide`,BREAKPOINTS:`breakpoints`,GESTURES_DISABLED:`gesturesdisabled`,KEYBOARD_CONTROL:`keyboardcontrol`,NO_AUTOHIDE:`noautohide`,USER_INACTIVE:`userinactive`,AUTOHIDE_OVER_CONTROLS:`autohideovercontrols`};function sn(e){return`
    <style>
      
      :host([${x.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
        outline: none;
      }

      :host {
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        line-height: 0;
        background-color: var(--media-background-color, #000);
        overflow: hidden;
      }

      :host(:not([${B.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-flow: column nowrap;
        align-items: start;
        pointer-events: none;
        background: none;
      }

      slot[name=media] {
        display: var(--media-slot-display, contents);
      }

      
      :host([${B.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      
      :host([${B.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      
      :host(:not([${B.AUDIO}])[${B.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${B.AUDIO}])[${B.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${B.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${B.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${B.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
        align-self: stretch;
        flex-grow: 1;
      }

      slot[name=middle-chrome] {
        display: inline;
        flex-grow: 1;
        pointer-events: none;
        background: none;
      }

      
      ::slotted([slot=media]),
      ::slotted([slot=poster]) {
        width: 100%;
        height: 100%;
      }

      
      :host(:not([${B.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      
      :host(:-webkit-full-screen) {
        
        width: 100% !important;
        height: 100% !important;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not([${B.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      
      :host([${B.USER_INACTIVE}]:not([${x.MEDIA_PAUSED}]):not([${x.MEDIA_IS_AIRPLAYING}]):not([${x.MEDIA_IS_CASTING}]):not([${B.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${B.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${B.USER_INACTIVE}]:not([${B.NO_AUTOHIDE}]):not([${x.MEDIA_PAUSED}]):not([${x.MEDIA_IS_CASTING}]):not([${B.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${B.USER_INACTIVE}][${B.AUTOHIDE_OVER_CONTROLS}]:not([${B.NO_AUTOHIDE}]):not([${x.MEDIA_PAUSED}]):not([${x.MEDIA_IS_CASTING}]):not([${B.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      
      :host(:not([${B.AUDIO}])[${x.MEDIA_HAS_PLAYED}]) slot[name=poster] {
        display: none;
      }

      ::slotted([role=dialog]) {
        width: 100%;
        height: 100%;
        align-self: center;
      }

      ::slotted([role=menu]) {
        align-self: end;
      }
    </style>

    <slot name="media" part="layer media-layer"></slot>
    <slot name="poster" part="layer poster-layer"></slot>
    <slot name="gestures-chrome" part="layer gesture-layer">
      <media-gesture-receiver slot="gestures-chrome">
        <template shadowrootmode="${It.shadowRootOptions.mode}">
          ${It.getTemplateHTML({})}
        </template>
      </media-gesture-receiver>
    </slot>
    <span part="layer vertical-layer">
      <slot name="top-chrome" part="top chrome"></slot>
      <slot name="middle-chrome" part="middle chrome"></slot>
      <slot name="centered-chrome" part="layer centered-layer center centered chrome"></slot>
      
      <slot part="bottom chrome"></slot>
    </span>
    <slot name="dialog" part="layer dialog-layer"></slot>
  `}var cn=Object.values(x),ln=`sm:384 md:576 lg:768 xl:960`;function un(e){dn(e.target,e.contentRect.width)}function dn(e,t){if(!e.isConnected)return;let n=fn(e.getAttribute(B.BREAKPOINTS)??ln),r=pn(n,t),i=!1;if(Object.keys(n).forEach(t=>{r.includes(t)?e.hasAttribute(`breakpoint${t}`)||(e.setAttribute(`breakpoint${t}`,``),i=!0):e.hasAttribute(`breakpoint${t}`)&&(e.removeAttribute(`breakpoint${t}`),i=!0)}),i){let t=new CustomEvent(S.BREAKPOINTS_CHANGE,{detail:r});e.dispatchEvent(t)}e.breakpointsComputed||(e.breakpointsComputed=!0,e.dispatchEvent(new CustomEvent(S.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}function fn(e){let t=e.split(/\s+/);return Object.fromEntries(t.map(e=>e.split(`:`)))}function pn(e,t){return Object.keys(e).filter(n=>t>=parseInt(e[n]))}var mn=class extends O.HTMLElement{constructor(){if(super(),z(this,Jt),z(this,Xt),z(this,Qt),z(this,en),z(this,nn),z(this,Bt,void 0),z(this,Vt,0),z(this,Ht,null),z(this,Ut,null),z(this,Wt,void 0),this.breakpointsComputed=!1,z(this,Gt,e=>{let t=this.media;for(let n of e){if(n.type!==`childList`)continue;let e=n.removedNodes;for(let r of e){if(r.slot!=`media`||n.target!=this)continue;let e=n.previousSibling&&n.previousSibling.previousElementSibling;if(!e||!t)this.mediaUnsetCallback(r);else{let t=e.slot!==`media`;for(;(e=e.previousSibling)!==null;)e.slot==`media`&&(t=!1);t&&this.mediaUnsetCallback(r)}}if(t)for(let e of n.addedNodes)e===t&&this.handleMediaUpdated(t)}}),z(this,Kt,!1),z(this,qt,e=>{R(this,Kt)||(setTimeout(()=>{un(e),Rt(this,Kt,!1)},0),Rt(this,Kt,!0))}),z(this,an,void 0),z(this,on,()=>{R(this,an).assignedElements({flatten:!0}).length?this.handleMediaUpdated(this.media):R(this,Ht)&&this.mediaUnsetCallback(R(this,Ht))}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=ht(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}Rt(this,Bt,new MutationObserver(R(this,Gt)))}static get observedAttributes(){return[B.AUTOHIDE,B.GESTURES_DISABLED].concat(cn).filter(e=>![x.MEDIA_RENDITION_LIST,x.MEDIA_AUDIO_TRACK_LIST,x.MEDIA_CHAPTERS_CUES,x.MEDIA_WIDTH,x.MEDIA_HEIGHT,x.MEDIA_ERROR,x.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,t,n){e.toLowerCase()==B.AUTOHIDE&&(this.autohide=n)}get media(){let e=this.querySelector(`:scope > [slot=media]`);return e?.nodeName==`SLOT`&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(Rt(this,Ht,e),e.localName.includes(`-`)&&await O.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;R(this,Bt).observe(this,{childList:!0,subtree:!0}),pt(this,R(this,qt));let t=this.getAttribute(B.AUDIO)==null?D(`video player`):D(`audio player`);this.setAttribute(`role`,`region`),this.setAttribute(`aria-label`,t),this.handleMediaUpdated(this.media),this.setAttribute(B.USER_INACTIVE,``),dn(this,this.getBoundingClientRect().width);let n=this.querySelector(`:scope > slot[slot=media]`);n&&(Rt(this,an,n),R(this,an).addEventListener(`slotchange`,R(this,on))),this.addEventListener(`pointerdown`,this),this.addEventListener(`pointermove`,this),this.addEventListener(`pointerup`,this),this.addEventListener(`mouseleave`,this),this.addEventListener(`keyup`,this),(e=O.window)==null||e.addEventListener(`mouseup`,this)}disconnectedCallback(){var e;mt(this,R(this,qt)),clearTimeout(R(this,Ut)),R(this,Bt).disconnect(),this.media&&this.mediaUnsetCallback(this.media),(e=O.window)==null||e.removeEventListener(`mouseup`,this),this.removeEventListener(`pointerdown`,this),this.removeEventListener(`pointermove`,this),this.removeEventListener(`pointerup`,this),this.removeEventListener(`mouseleave`,this),this.removeEventListener(`keyup`,this),R(this,an)&&(R(this,an).removeEventListener(`slotchange`,R(this,on)),Rt(this,an,null)),Rt(this,Kt,!1)}mediaSetCallback(e){}mediaUnsetCallback(e){Rt(this,Ht,null)}handleEvent(e){switch(e.type){case`pointerdown`:Rt(this,Vt,e.timeStamp);break;case`pointermove`:zt(this,Jt,Yt).call(this,e);break;case`pointerup`:zt(this,Xt,Zt).call(this,e);break;case`mouseleave`:zt(this,Qt,$t).call(this);break;case`mouseup`:this.removeAttribute(B.KEYBOARD_CONTROL);break;case`keyup`:zt(this,nn,rn).call(this),this.setAttribute(B.KEYBOARD_CONTROL,``)}}set autohide(e){let t=Number(e);Rt(this,Wt,isNaN(t)?0:t)}get autohide(){return(R(this,Wt)===void 0?2:R(this,Wt)).toString()}get breakpoints(){return F(this,B.BREAKPOINTS)}set breakpoints(e){I(this,B.BREAKPOINTS,e)}get audio(){return N(this,B.AUDIO)}set audio(e){P(this,B.AUDIO,e)}get gesturesDisabled(){return N(this,B.GESTURES_DISABLED)}set gesturesDisabled(e){P(this,B.GESTURES_DISABLED,e)}get keyboardControl(){return N(this,B.KEYBOARD_CONTROL)}set keyboardControl(e){P(this,B.KEYBOARD_CONTROL,e)}get noAutohide(){return N(this,B.NO_AUTOHIDE)}set noAutohide(e){P(this,B.NO_AUTOHIDE,e)}get autohideOverControls(){return N(this,B.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){P(this,B.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return N(this,B.USER_INACTIVE)}set userInteractive(e){P(this,B.USER_INACTIVE,e)}};Bt=new WeakMap,Vt=new WeakMap,Ht=new WeakMap,Ut=new WeakMap,Wt=new WeakMap,Gt=new WeakMap,Kt=new WeakMap,qt=new WeakMap,Jt=new WeakSet,Yt=function(e){if(e.pointerType!==`mouse`&&e.timeStamp-R(this,Vt)<250)return;zt(this,en,tn).call(this),clearTimeout(R(this,Ut));let t=this.hasAttribute(B.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(e.target)||t)&&zt(this,nn,rn).call(this)},Xt=new WeakSet,Zt=function(e){if(e.pointerType===`touch`){let t=!this.hasAttribute(B.USER_INACTIVE);[this,this.media].includes(e.target)&&t?zt(this,Qt,$t).call(this):zt(this,nn,rn).call(this)}else e.composedPath().some(e=>[`media-play-button`,`media-fullscreen-button`].includes(e?.localName))&&zt(this,nn,rn).call(this)},Qt=new WeakSet,$t=function(){if(R(this,Wt)<0||this.hasAttribute(B.USER_INACTIVE))return;this.setAttribute(B.USER_INACTIVE,``);let e=new O.CustomEvent(S.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(e)},en=new WeakSet,tn=function(){if(!this.hasAttribute(B.USER_INACTIVE))return;this.removeAttribute(B.USER_INACTIVE);let e=new O.CustomEvent(S.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(e)},nn=new WeakSet,rn=function(){zt(this,en,tn).call(this),clearTimeout(R(this,Ut));let e=parseInt(this.autohide);e<0||Rt(this,Ut,setTimeout(()=>{zt(this,Qt,$t).call(this)},e*1e3))},an=new WeakMap,on=new WeakMap,mn.shadowRootOptions={mode:`open`},mn.getTemplateHTML=sn,O.customElements.get(`media-container`)||O.customElements.define(`media-container`,mn);var hn=mn,gn=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},V=(e,t,n)=>(gn(e,t,`read from private field`),n?n.call(e):t.get(e)),_n=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},vn=(e,t,n,r)=>(gn(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),yn,bn,xn,Sn,Cn,wn,Tn=class{constructor(e,t,{defaultValue:n}={defaultValue:void 0}){_n(this,Cn),_n(this,yn,void 0),_n(this,bn,void 0),_n(this,xn,void 0),_n(this,Sn,new Set),vn(this,yn,e),vn(this,bn,t),vn(this,xn,new Set(n))}[Symbol.iterator](){return V(this,Cn,wn).values()}get length(){return V(this,Cn,wn).size}get value(){return[...V(this,Cn,wn)].join(` `)??``}set value(e){e!==this.value&&(vn(this,Sn,new Set),this.add(...e?.split(` `)??[]))}toString(){return this.value}item(e){return[...V(this,Cn,wn)][e]}values(){return V(this,Cn,wn).values()}forEach(e,t){V(this,Cn,wn).forEach(e,t)}add(...e){var t;e.forEach(e=>V(this,Sn).add(e)),(this.value!==``||V(this,yn)?.hasAttribute(`${V(this,bn)}`))&&((t=V(this,yn))==null||t.setAttribute(`${V(this,bn)}`,`${this.value}`))}remove(...e){var t;e.forEach(e=>V(this,Sn).delete(e)),(t=V(this,yn))==null||t.setAttribute(`${V(this,bn)}`,`${this.value}`)}contains(e){return V(this,Cn,wn).has(e)}toggle(e,t){return t===void 0?this.contains(e)?(this.remove(e),!1):(this.add(e),!0):t?(this.add(e),!0):(this.remove(e),!1)}replace(e,t){return this.remove(e),this.add(t),e===t}};yn=new WeakMap,bn=new WeakMap,xn=new WeakMap,Sn=new WeakMap,Cn=new WeakSet,wn=function(){return V(this,Sn).size?V(this,Sn):V(this,xn)};var En=(e=``)=>e.split(/\s+/),Dn=(e=``)=>{let[t,n,r]=e.split(`:`),i=r?decodeURIComponent(r):void 0;return{kind:t===`cc`?w.CAPTIONS:w.SUBTITLES,language:n,label:i}},On=(e=``,t={})=>En(e).map(e=>{let n=Dn(e);return{...t,...n}}),kn=e=>e?Array.isArray(e)?e.map(e=>typeof e==`string`?Dn(e):e):typeof e==`string`?On(e):[e]:[],An=({kind:e,label:t,language:n}={kind:`subtitles`})=>t?`${e===`captions`?`cc`:`sb`}:${n}:${encodeURIComponent(t)}`:n,jn=(e=[])=>Array.prototype.map.call(e,An).join(` `),Mn=(e,t)=>n=>n[e]===t,Nn=e=>{let t=Object.entries(e).map(([e,t])=>Mn(e,t));return e=>t.every(t=>t(e))},Pn=(e,t=[],n=[])=>{let r=kn(n).map(Nn);Array.from(t).filter(e=>r.some(t=>t(e))).forEach(t=>{t.mode=e})},Fn=(e,t=()=>!0)=>{if(!e?.textTracks)return[];let n=typeof t==`function`?t:Nn(t);return Array.from(e.textTracks).filter(n)},In=e=>!!e.mediaSubtitlesShowing?.length||e.hasAttribute(x.MEDIA_SUBTITLES_SHOWING),Ln=e=>{let{media:t,fullscreenElement:n}=e;try{let e=n&&`requestFullscreen`in n?`requestFullscreen`:n&&`webkitRequestFullScreen`in n?`webkitRequestFullScreen`:void 0;if(e){let t=n[e]?.call(n);if(t instanceof Promise)return t.catch(()=>{})}else t?.webkitEnterFullscreen?t.webkitEnterFullscreen():t?.requestFullscreen&&t.requestFullscreen()}catch(e){console.error(e)}},Rn=`exitFullscreen`in k?`exitFullscreen`:`webkitExitFullscreen`in k?`webkitExitFullscreen`:`webkitCancelFullScreen`in k?`webkitCancelFullScreen`:void 0,zn=e=>{let{documentElement:t}=e;if(Rn){let e=(t?.[Rn])?.call(t);if(e instanceof Promise)return e.catch(()=>{})}},Bn=`fullscreenElement`in k?`fullscreenElement`:`webkitFullscreenElement`in k?`webkitFullscreenElement`:void 0,Vn=e=>{let{documentElement:t,media:n}=e,r=t?.[Bn];return!r&&`webkitDisplayingFullscreen`in n&&`webkitPresentationMode`in n&&n.webkitDisplayingFullscreen&&n.webkitPresentationMode===Be.FULLSCREEN?n:r},Hn=e=>{let{media:t,documentElement:n,fullscreenElement:r=t}=e;if(!t||!n)return!1;let i=Vn(e);if(!i)return!1;if(i===r||i===t)return!0;if(i.localName.includes(`-`)){let e=i.shadowRoot;if(!(Bn in e))return xt(i,r);for(;e?.[Bn];){if(e[Bn]===r)return!0;e=e[Bn]?.shadowRoot}}return!1},Un=`fullscreenEnabled`in k?`fullscreenEnabled`:`webkitFullscreenEnabled`in k?`webkitFullscreenEnabled`:void 0,Wn=e=>{let{documentElement:t,media:n}=e;return!!t?.[Un]||n&&`webkitSupportsFullscreen`in n},Gn,Kn=()=>{var e;return Gn||(Gn=((e=k)?.createElement)?.call(e,`video`),Gn)},qn=async(e=Kn())=>{if(!e)return!1;let t=e.volume;e.volume=t/2+.1;let n=new AbortController,r=await Promise.race([Jn(e,n.signal),Yn(e,t)]);return n.abort(),r},Jn=(e,t)=>new Promise(n=>{e.addEventListener(`volumechange`,()=>n(!0),{signal:t})}),Yn=async(e,t)=>{for(let n=0;n<10;n++){if(e.volume===t)return!1;await Ke(10)}return e.volume!==t},Xn=/.*Version\/.*Safari\/.*/.test(O.navigator.userAgent),Zn=(e=Kn())=>O.matchMedia(`(display-mode: standalone)`).matches&&Xn?!1:typeof e?.requestPictureInPicture==`function`,Qn=(e=Kn())=>Wn({documentElement:k,media:e}),$n=Qn(),er=Zn(),tr=!!O.WebKitPlaybackTargetAvailabilityEvent,nr=!!O.chrome,rr=e=>Fn(e.media,e=>[w.SUBTITLES,w.CAPTIONS].includes(e.kind)).sort((e,t)=>e.kind>=t.kind?1:-1),ir=e=>Fn(e.media,e=>e.mode===Re.SHOWING&&[w.SUBTITLES,w.CAPTIONS].includes(e.kind)),ar=(e,t)=>{let n=rr(e),r=ir(e),i=!!r.length;if(n.length){if(t===!1||i&&t!==!0)Pn(Re.DISABLED,n,r);else if(t===!0||!i&&t!==!1){let t=n[0],{options:i}=e;if(!i?.noSubtitlesLangPref){let e=O.localStorage.getItem(`media-chrome-pref-subtitles-lang`),r=e?[e,...O.navigator.languages]:O.navigator.languages,i=n.filter(e=>r.some(t=>e.language.toLowerCase().startsWith(t.split(`-`)[0]))).sort((e,t)=>r.findIndex(t=>e.language.toLowerCase().startsWith(t.split(`-`)[0]))-r.findIndex(e=>t.language.toLowerCase().startsWith(e.split(`-`)[0])));i[0]&&(t=i[0])}let{language:a,label:o,kind:s}=t;Pn(Re.DISABLED,n,r),Pn(Re.SHOWING,n,[{language:a,label:o,kind:s}])}}},or=(e,t)=>e===t?!0:e==null||t==null||typeof e!=typeof t?!1:typeof e==`number`&&Number.isNaN(e)&&Number.isNaN(t)?!0:typeof e==`object`?Array.isArray(e)?sr(e,t):Object.entries(e).every(([e,n])=>e in t&&or(n,t[e])):!1,sr=(e,t)=>{let n=Array.isArray(e),r=Array.isArray(t);return n===r?n||r?e.length===t.length&&e.every((e,n)=>or(e,t[n])):!0:!1},cr=Object.values(E),lr,ur=qn().then(e=>(lr=e,lr)),dr=async(...e)=>{await Promise.all(e.filter(e=>e).map(async e=>{if(!(`localName`in e&&e instanceof O.HTMLElement))return;let t=e.localName;if(!t.includes(`-`))return;let n=O.customElements.get(t);n&&e instanceof n||(await O.customElements.whenDefined(t),O.customElements.upgrade(e))}))},fr=new O.DOMParser,pr=e=>e&&(fr.parseFromString(e,`text/html`).body.textContent||e),mr={mediaError:{get(e,t){let{media:n}=e;if(t?.type!==`playing`)return n?.error},mediaEvents:[`emptied`,`error`,`playing`]},mediaErrorCode:{get(e,t){let{media:n}=e;if(t?.type!==`playing`)return n?.error?.code},mediaEvents:[`emptied`,`error`,`playing`]},mediaErrorMessage:{get(e,t){let{media:n}=e;if(t?.type!==`playing`)return n?.error?.message??``},mediaEvents:[`emptied`,`error`,`playing`]},mediaWidth:{get(e){let{media:t}=e;return t?.videoWidth??0},mediaEvents:[`resize`]},mediaHeight:{get(e){let{media:t}=e;return t?.videoHeight??0},mediaEvents:[`resize`]},mediaPaused:{get(e){let{media:t}=e;return t?.paused??!0},set(e,t){var n;let{media:r}=t;r&&(e?r.pause():(n=r.play())==null||n.catch(()=>{}))},mediaEvents:[`play`,`playing`,`pause`,`emptied`]},mediaHasPlayed:{get(e,t){let{media:n}=e;return n?t?t.type===`playing`:!n.paused:!1},mediaEvents:[`playing`,`emptied`]},mediaEnded:{get(e){let{media:t}=e;return t?.ended??!1},mediaEvents:[`seeked`,`ended`,`emptied`]},mediaPlaybackRate:{get(e){let{media:t}=e;return t?.playbackRate??1},set(e,t){let{media:n}=t;n&&Number.isFinite(+e)&&(n.playbackRate=+e)},mediaEvents:[`ratechange`,`loadstart`]},mediaMuted:{get(e){let{media:t}=e;return t?.muted??!1},set(e,t){let{media:n,options:{noMutedPref:r}={}}=t;if(n){n.muted=e;try{let t=O.localStorage.getItem(`media-chrome-pref-muted`)!==null,i=n.hasAttribute(`muted`);if(r){t&&O.localStorage.removeItem(`media-chrome-pref-muted`);return}if(i&&!t)return;O.localStorage.setItem(`media-chrome-pref-muted`,e?`true`:`false`)}catch(e){console.debug(`Error setting muted pref`,e)}}},mediaEvents:[`volumechange`],stateOwnersUpdateHandlers:[(e,t)=>{let{options:{noMutedPref:n}}=t,{media:r}=t;if(!(!r||r.muted||n))try{let n=O.localStorage.getItem(`media-chrome-pref-muted`)===`true`;mr.mediaMuted.set(n,t),e(n)}catch(e){console.debug(`Error getting muted pref`,e)}}]},mediaLoop:{get(e){let{media:t}=e;return t?.loop},set(e,t){let{media:n}=t;n&&(n.loop=e)},mediaEvents:[`medialooprequest`]},mediaVolume:{get(e){let{media:t}=e;return t?.volume??1},set(e,t){let{media:n,options:{noVolumePref:r}={}}=t;if(n){try{e==null?O.localStorage.removeItem(`media-chrome-pref-volume`):!n.hasAttribute(`muted`)&&!r&&O.localStorage.setItem(`media-chrome-pref-volume`,e.toString())}catch(e){console.debug(`Error setting volume pref`,e)}Number.isFinite(+e)&&(n.volume=+e)}},mediaEvents:[`volumechange`],stateOwnersUpdateHandlers:[(e,t)=>{let{options:{noVolumePref:n}}=t;if(!n)try{let{media:n}=t;if(!n)return;let r=O.localStorage.getItem(`media-chrome-pref-volume`);if(r==null)return;mr.mediaVolume.set(+r,t),e(+r)}catch(e){console.debug(`Error getting volume pref`,e)}}]},mediaVolumeLevel:{get(e){let{media:t}=e;return t?.volume===void 0?`high`:t.muted||t.volume===0?`off`:t.volume<.5?`low`:t.volume<.75?`medium`:`high`},mediaEvents:[`volumechange`]},mediaCurrentTime:{get(e){let{media:t}=e;return t?.currentTime??0},set(e,t){let{media:n}=t;n&&Ge(e)&&(n.currentTime=e)},mediaEvents:[`timeupdate`,`loadedmetadata`,`seeking`]},mediaDuration:{get(e){let{media:t,options:{defaultDuration:n}={}}=e;return n&&(!t||!t.duration||Number.isNaN(t.duration)||!Number.isFinite(t.duration))?n:Number.isFinite(t?.duration)?t.duration:NaN},mediaEvents:[`durationchange`,`loadedmetadata`,`emptied`]},mediaLoading:{get(e){let{media:t}=e;return t?.readyState<3},mediaEvents:[`waiting`,`playing`,`emptied`]},mediaSeekable:{get(e){let{media:t}=e;if(!t?.seekable?.length)return;let n=t.seekable.start(0),r=t.seekable.end(t.seekable.length-1);if(n||r)return[Number(n.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:[`loadedmetadata`,`emptied`,`progress`,`seekablechange`]},mediaBuffered:{get(e){let{media:t}=e,n=t?.buffered??[];return Array.from(n).map((e,t)=>[Number(n.start(t).toFixed(3)),Number(n.end(t).toFixed(3))])},mediaEvents:[`progress`,`emptied`]},mediaStreamType:{get(e){let{media:t,options:{defaultStreamType:n}={}}=e,r=[E.LIVE,E.ON_DEMAND].includes(n)?n:void 0;if(!t)return r;let{streamType:i}=t;if(cr.includes(i))return i===E.UNKNOWN?r:i;let a=t.duration;return a===1/0?E.LIVE:Number.isFinite(a)?E.ON_DEMAND:r},mediaEvents:[`emptied`,`durationchange`,`loadedmetadata`,`streamtypechange`]},mediaTargetLiveWindow:{get(e){let{media:t}=e;if(!t)return NaN;let{targetLiveWindow:n}=t,r=mr.mediaStreamType.get(e);return(n==null||Number.isNaN(n))&&r===E.LIVE?0:n},mediaEvents:[`emptied`,`durationchange`,`loadedmetadata`,`streamtypechange`,`targetlivewindowchange`]},mediaTimeIsLive:{get(e){let{media:t,options:{liveEdgeOffset:n=10}={}}=e;if(!t)return!1;if(typeof t.liveEdgeStart==`number`)return!Number.isNaN(t.liveEdgeStart)&&t.currentTime>=t.liveEdgeStart;if(mr.mediaStreamType.get(e)!==E.LIVE)return!1;let r=t.seekable;if(!r)return!0;if(!r.length)return!1;let i=r.end(r.length-1)-n;return t.currentTime>=i},mediaEvents:[`playing`,`timeupdate`,`progress`,`waiting`,`emptied`]},mediaSubtitlesList:{get(e){return rr(e).map(({kind:e,label:t,language:n})=>({kind:e,label:t,language:n}))},mediaEvents:[`loadstart`],textTracksEvents:[`addtrack`,`removetrack`]},mediaSubtitlesShowing:{get(e){return ir(e).map(({kind:e,label:t,language:n})=>({kind:e,label:t,language:n}))},mediaEvents:[`loadstart`],textTracksEvents:[`addtrack`,`removetrack`,`change`],stateOwnersUpdateHandlers:[(e,t)=>{var n,r;let{media:i,options:a}=t;if(!i)return;let o=e=>{a.defaultSubtitles&&(!e||[w.CAPTIONS,w.SUBTITLES].includes(e?.track?.kind))&&ar(t,!0)};return i.addEventListener(`loadstart`,o),(n=i.textTracks)==null||n.addEventListener(`addtrack`,o),(r=i.textTracks)==null||r.addEventListener(`removetrack`,o),()=>{var e,t;i.removeEventListener(`loadstart`,o),(e=i.textTracks)==null||e.removeEventListener(`addtrack`,o),(t=i.textTracks)==null||t.removeEventListener(`removetrack`,o)}}]},mediaChaptersCues:{get(e){let{media:t}=e;if(!t)return[];let[n]=Fn(t,{kind:w.CHAPTERS});return Array.from(n?.cues??[]).map(({text:e,startTime:t,endTime:n})=>({text:pr(e),startTime:t,endTime:n}))},mediaEvents:[`loadstart`,`loadedmetadata`],textTracksEvents:[`addtrack`,`removetrack`,`change`],stateOwnersUpdateHandlers:[(e,t)=>{let{media:n}=t;if(!n)return;let r=n.querySelector(`track[kind="chapters"][default][src]`),i=n.shadowRoot?.querySelector(`:is(video,audio) > track[kind="chapters"][default][src]`);return r?.addEventListener(`load`,e),i?.addEventListener(`load`,e),()=>{r?.removeEventListener(`load`,e),i?.removeEventListener(`load`,e)}}]},mediaIsPip:{get(e){let{media:t,documentElement:n}=e;if(!t||!n||!n.pictureInPictureElement)return!1;if(n.pictureInPictureElement===t)return!0;if(n.pictureInPictureElement instanceof HTMLMediaElement)return t.localName?.includes(`-`)?xt(t,n.pictureInPictureElement):!1;if(n.pictureInPictureElement.localName.includes(`-`)){let e=n.pictureInPictureElement.shadowRoot;for(;e?.pictureInPictureElement;){if(e.pictureInPictureElement===t)return!0;e=e.pictureInPictureElement?.shadowRoot}}return!1},set(e,t){let{media:n}=t;if(n){if(e){if(!k.pictureInPictureEnabled){console.warn(`MediaChrome: Picture-in-picture is not enabled`);return}if(!n.requestPictureInPicture){console.warn(`MediaChrome: The current media does not support picture-in-picture`);return}let e=()=>{console.warn(`MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.`)};n.requestPictureInPicture().catch(t=>{if(t.code===11){if(!n.src){console.warn(`MediaChrome: The media is not ready for picture-in-picture. It must have a src set.`);return}if(n.readyState===0&&n.preload===`none`){let t=()=>{n.removeEventListener(`loadedmetadata`,r),n.preload=`none`},r=()=>{n.requestPictureInPicture().catch(e),t()};n.addEventListener(`loadedmetadata`,r),n.preload=`metadata`,setTimeout(()=>{n.readyState===0&&e(),t()},1e3)}else throw t}else throw t})}else k.pictureInPictureElement&&k.exitPictureInPicture()}},mediaEvents:[`enterpictureinpicture`,`leavepictureinpicture`]},mediaRenditionList:{get(e){let{media:t}=e;return[...t?.videoRenditions??[]].map(e=>({...e}))},mediaEvents:[`emptied`,`loadstart`],videoRenditionsEvents:[`addrendition`,`removerendition`]},mediaRenditionSelected:{get(e){let{media:t}=e;return t?.videoRenditions?.[t.videoRenditions?.selectedIndex]?.id},set(e,t){let{media:n}=t;if(!n?.videoRenditions){console.warn(`MediaController: Rendition selection not supported by this media.`);return}let r=e,i=Array.prototype.findIndex.call(n.videoRenditions,e=>e.id==r);n.videoRenditions.selectedIndex!=i&&(n.videoRenditions.selectedIndex=i)},mediaEvents:[`emptied`],videoRenditionsEvents:[`addrendition`,`removerendition`,`change`]},mediaAudioTrackList:{get(e){let{media:t}=e;return[...t?.audioTracks??[]]},mediaEvents:[`emptied`,`loadstart`],audioTracksEvents:[`addtrack`,`removetrack`]},mediaAudioTrackEnabled:{get(e){let{media:t}=e;return[...t?.audioTracks??[]].find(e=>e.enabled)?.id},set(e,t){let{media:n}=t;if(!n?.audioTracks){console.warn(`MediaChrome: Audio track selection not supported by this media.`);return}let r=e;for(let e of n.audioTracks)e.enabled=r==e.id},mediaEvents:[`emptied`],audioTracksEvents:[`addtrack`,`removetrack`,`change`]},mediaIsFullscreen:{get(e){return Hn(e)},set(e,t,n){var r;e?(Ln(t),n.detail&&!t.media?.inert&&((r=t.media)==null||r.focus())):zn(t)},rootEvents:[`fullscreenchange`,`webkitfullscreenchange`],mediaEvents:[`webkitbeginfullscreen`,`webkitendfullscreen`,`webkitpresentationmodechanged`]},mediaIsCasting:{get(e){let{media:t}=e;return!t?.remote||t.remote?.state===`disconnected`?!1:t.remote.state===`connected`},set(e,t){let{media:n}=t;n&&(e&&n.remote?.state!==`disconnected`||(e||n.remote?.state===`connected`)&&(typeof n.remote.prompt==`function`?n.remote.prompt().catch(()=>{}):console.warn(`MediaChrome: Casting is not supported in this environment`)))},remoteEvents:[`connect`,`connecting`,`disconnect`]},mediaIsAirplaying:{get(){return!1},set(e,t){let{media:n}=t;n&&(n.webkitShowPlaybackTargetPicker&&O.WebKitPlaybackTargetAvailabilityEvent?n.webkitShowPlaybackTargetPicker():console.error(`MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment`))},mediaEvents:[`webkitcurrentplaybacktargetiswirelesschanged`]},mediaFullscreenUnavailable:{get(e){let{media:t}=e;if(!$n||!Qn(t))return T.UNSUPPORTED}},mediaPipUnavailable:{get(e){let{media:t}=e;if(!er||!Zn(t))return T.UNSUPPORTED;if(t?.disablePictureInPicture)return T.UNAVAILABLE}},mediaVolumeUnavailable:{get(e){let{media:t}=e;if(lr===!1||t?.volume==null)return T.UNSUPPORTED},stateOwnersUpdateHandlers:[e=>{lr??ur.then(t=>e(t?void 0:T.UNSUPPORTED))}]},mediaCastUnavailable:{get(e,{availability:t=`not-available`}={}){let{media:n}=e;if(!nr||!n?.remote?.state)return T.UNSUPPORTED;if(t!=null&&t!==`available`)return T.UNAVAILABLE},stateOwnersUpdateHandlers:[(e,t)=>{var n;let{media:r}=t;if(r)return r.disableRemotePlayback||r.hasAttribute(`disableremoteplayback`)||(n=r?.remote)==null||n.watchAvailability(t=>{e({availability:t?`available`:`not-available`})}).catch(t=>{t.name===`NotSupportedError`?e({availability:null}):e({availability:`not-available`})}),()=>{var e;(e=r?.remote)==null||e.cancelWatchAvailability().catch(()=>{})}}]},mediaAirplayUnavailable:{get(e,t){if(!tr)return T.UNSUPPORTED;if(t?.availability===`not-available`)return T.UNAVAILABLE},mediaEvents:[`webkitplaybacktargetavailabilitychanged`],stateOwnersUpdateHandlers:[(e,t)=>{var n;let{media:r}=t;if(r)return r.disableRemotePlayback||r.hasAttribute(`disableremoteplayback`)||(n=r?.remote)==null||n.watchAvailability(t=>{e({availability:t?`available`:`not-available`})}).catch(t=>{t.name===`NotSupportedError`?e({availability:null}):e({availability:`not-available`})}),()=>{var e;(e=r?.remote)==null||e.cancelWatchAvailability().catch(()=>{})}}]},mediaRenditionUnavailable:{get(e){let{media:t}=e;if(!t?.videoRenditions)return T.UNSUPPORTED;if(!t.videoRenditions?.length)return T.UNAVAILABLE},mediaEvents:[`emptied`,`loadstart`],videoRenditionsEvents:[`addrendition`,`removerendition`]},mediaAudioTrackUnavailable:{get(e){let{media:t}=e;if(!t?.audioTracks)return T.UNSUPPORTED;if((t.audioTracks?.length??0)<=1)return T.UNAVAILABLE},mediaEvents:[`emptied`,`loadstart`],audioTracksEvents:[`addtrack`,`removetrack`]},mediaLang:{get(e){let{options:{mediaLang:t}={}}=e;return t??`en`}}},hr={[y.MEDIA_PREVIEW_REQUEST](e,t,{detail:n}){let{media:r}=t,i=n??void 0,a,o;if(r&&i!=null){let[e]=Fn(r,{kind:w.METADATA,label:`thumbnails`}),t=Array.prototype.find.call(e?.cues??[],(e,t,n)=>t===0?e.endTime>i:t===n.length-1?e.startTime<=i:e.startTime<=i&&e.endTime>i);if(t){let e=/'^(?:[a-z]+:)?\/\//i.test(t.text)?void 0:r?.querySelector(`track[label="thumbnails"]`)?.src,n=new URL(t.text,e);o=new URLSearchParams(n.hash).get(`#xywh`).split(`,`).map(e=>+e),a=n.href}}let s=e.mediaDuration.get(t),c=e.mediaChaptersCues.get(t).find((e,t,n)=>t===n.length-1&&s===e.endTime?e.startTime<=i&&e.endTime>=i:e.startTime<=i&&e.endTime>i)?.text;return n!=null&&c==null&&(c=``),{mediaPreviewTime:i,mediaPreviewImage:a,mediaPreviewCoords:o,mediaPreviewChapter:c}},[y.MEDIA_PAUSE_REQUEST](e,t){e.mediaPaused.set(!0,t)},[y.MEDIA_PLAY_REQUEST](e,t){let n=e.mediaStreamType.get(t)===E.LIVE,r=!t.options?.noAutoSeekToLive,i=e.mediaTargetLiveWindow.get(t)>0;if(n&&r&&!i){let n=e.mediaSeekable.get(t)?.[1];if(n){let r=n-(t.options?.seekToLiveOffset??0);e.mediaCurrentTime.set(r,t)}}e.mediaPaused.set(!1,t)},[y.MEDIA_PLAYBACK_RATE_REQUEST](e,t,{detail:n}){let r=n;e.mediaPlaybackRate.set(r,t)},[y.MEDIA_MUTE_REQUEST](e,t){e.mediaMuted.set(!0,t)},[y.MEDIA_UNMUTE_REQUEST](e,t){e.mediaVolume.get(t)||e.mediaVolume.set(.25,t),e.mediaMuted.set(!1,t)},[y.MEDIA_LOOP_REQUEST](e,t,{detail:n}){let r=!!n;return e.mediaLoop.set(r,t),{mediaLoop:r}},[y.MEDIA_VOLUME_REQUEST](e,t,{detail:n}){let r=n;r&&e.mediaMuted.get(t)&&e.mediaMuted.set(!1,t),e.mediaVolume.set(r,t)},[y.MEDIA_SEEK_REQUEST](e,t,{detail:n}){let r=n;e.mediaCurrentTime.set(r,t)},[y.MEDIA_SEEK_TO_LIVE_REQUEST](e,t){let n=e.mediaSeekable.get(t)?.[1];if(Number.isNaN(Number(n)))return;let r=n-(t.options?.seekToLiveOffset??0);e.mediaCurrentTime.set(r,t)},[y.MEDIA_SHOW_SUBTITLES_REQUEST](e,t,{detail:n}){let{options:r}=t,i=rr(t),a=kn(n),o=a[0]?.language;o&&!r.noSubtitlesLangPref&&O.localStorage.setItem(`media-chrome-pref-subtitles-lang`,o),Pn(Re.SHOWING,i,a)},[y.MEDIA_DISABLE_SUBTITLES_REQUEST](e,t,{detail:n}){let r=rr(t),i=n??[];Pn(Re.DISABLED,r,i)},[y.MEDIA_TOGGLE_SUBTITLES_REQUEST](e,t,{detail:n}){ar(t,n)},[y.MEDIA_RENDITION_REQUEST](e,t,{detail:n}){let r=n;e.mediaRenditionSelected.set(r,t)},[y.MEDIA_AUDIO_TRACK_REQUEST](e,t,{detail:n}){let r=n;e.mediaAudioTrackEnabled.set(r,t)},[y.MEDIA_ENTER_PIP_REQUEST](e,t){e.mediaIsFullscreen.get(t)&&e.mediaIsFullscreen.set(!1,t),e.mediaIsPip.set(!0,t)},[y.MEDIA_EXIT_PIP_REQUEST](e,t){e.mediaIsPip.set(!1,t)},[y.MEDIA_ENTER_FULLSCREEN_REQUEST](e,t,n){e.mediaIsPip.get(t)&&e.mediaIsPip.set(!1,t),e.mediaIsFullscreen.set(!0,t,n)},[y.MEDIA_EXIT_FULLSCREEN_REQUEST](e,t){e.mediaIsFullscreen.set(!1,t)},[y.MEDIA_ENTER_CAST_REQUEST](e,t){e.mediaIsFullscreen.get(t)&&e.mediaIsFullscreen.set(!1,t),e.mediaIsCasting.set(!0,t)},[y.MEDIA_EXIT_CAST_REQUEST](e,t){e.mediaIsCasting.set(!1,t)},[y.MEDIA_AIRPLAY_REQUEST](e,t){e.mediaIsAirplaying.set(!0,t)}},gr=({media:e,fullscreenElement:t,documentElement:n,stateMediator:r=mr,requestMap:i=hr,options:a={},monitorStateOwnersOnlyWithSubscriptions:o=!0})=>{let s=[],c={options:{...a}},l=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0}),u=e=>{e!=null&&(or(e,l)||(l=Object.freeze({...l,...e}),s.forEach(e=>e(l))))},d=()=>{let e=Object.entries(r).reduce((e,[t,{get:n}])=>(e[t]=n(c),e),{});u(e)},f={},p,m=async(e,t)=>{let n=!!p;if(p={...c,...p??{},...e},n)return;await dr(...Object.values(e));let i=s.length>0&&t===0&&o,a=c.media!==p.media,l=c.media?.textTracks!==p.media?.textTracks,m=c.media?.videoRenditions!==p.media?.videoRenditions,h=c.media?.audioTracks!==p.media?.audioTracks,ee=c.media?.remote!==p.media?.remote,te=c.documentElement!==p.documentElement,ne=!!c.media&&(a||i),re=!!c.media?.textTracks&&(l||i),ie=!!c.media?.videoRenditions&&(m||i),ae=!!c.media?.audioTracks&&(h||i),oe=!!c.media?.remote&&(ee||i),se=!!c.documentElement&&(te||i),ce=ne||re||ie||ae||oe||se,le=s.length===0&&t===1&&o,ue=!!p.media&&(a||le),de=!!p.media?.textTracks&&(l||le),fe=!!p.media?.videoRenditions&&(m||le),pe=!!p.media?.audioTracks&&(h||le),me=!!p.media?.remote&&(ee||le),he=!!p.documentElement&&(te||le),ge=ue||de||fe||pe||me||he;ce||ge?(Object.entries(r).forEach(([e,{get:t,mediaEvents:n=[],textTracksEvents:r=[],videoRenditionsEvents:i=[],audioTracksEvents:a=[],remoteEvents:o=[],rootEvents:s=[],stateOwnersUpdateHandlers:l=[]}])=>{f[e]||(f[e]={});let d=n=>{let r=t(c,n);u({[e]:r})},m;m=f[e].mediaEvents,n.forEach(t=>{m&&ne&&(c.media.removeEventListener(t,m),f[e].mediaEvents=void 0),ue&&(p.media.addEventListener(t,d),f[e].mediaEvents=d)}),m=f[e].textTracksEvents,r.forEach(t=>{var n,r;m&&re&&((n=c.media.textTracks)==null||n.removeEventListener(t,m),f[e].textTracksEvents=void 0),de&&((r=p.media.textTracks)==null||r.addEventListener(t,d),f[e].textTracksEvents=d)}),m=f[e].videoRenditionsEvents,i.forEach(t=>{var n,r;m&&ie&&((n=c.media.videoRenditions)==null||n.removeEventListener(t,m),f[e].videoRenditionsEvents=void 0),fe&&((r=p.media.videoRenditions)==null||r.addEventListener(t,d),f[e].videoRenditionsEvents=d)}),m=f[e].audioTracksEvents,a.forEach(t=>{var n,r;m&&ae&&((n=c.media.audioTracks)==null||n.removeEventListener(t,m),f[e].audioTracksEvents=void 0),pe&&((r=p.media.audioTracks)==null||r.addEventListener(t,d),f[e].audioTracksEvents=d)}),m=f[e].remoteEvents,o.forEach(t=>{var n,r;m&&oe&&((n=c.media.remote)==null||n.removeEventListener(t,m),f[e].remoteEvents=void 0),me&&((r=p.media.remote)==null||r.addEventListener(t,d),f[e].remoteEvents=d)}),m=f[e].rootEvents,s.forEach(t=>{m&&se&&(c.documentElement.removeEventListener(t,m),f[e].rootEvents=void 0),he&&(p.documentElement.addEventListener(t,d),f[e].rootEvents=d)});let h=f[e].stateOwnersUpdateHandlers;if(h&&ce&&(Array.isArray(h)?h:[h]).forEach(e=>{typeof e==`function`&&e()}),ge){let t=l.map(e=>e(d,p)).filter(e=>typeof e==`function`);f[e].stateOwnersUpdateHandlers=t.length===1?t[0]:t}else ce&&(f[e].stateOwnersUpdateHandlers=void 0)}),Object.entries(p).forEach(([e,t])=>{c[e]=t}),d(),p=void 0):(Object.entries(p).forEach(([e,t])=>{c[e]=t}),d(),p=void 0)};return m({media:e,fullscreenElement:t,documentElement:n,options:a}),{dispatch(e){let{type:t,detail:n}=e;i[t]&&l.mediaErrorCode==null?u(i[t](r,c,e)):t===`mediaelementchangerequest`?m({media:n}):t===`fullscreenelementchangerequest`?m({fullscreenElement:n}):t===`documentelementchangerequest`?m({documentElement:n}):t===`optionschangerequest`&&(Object.entries(n??{}).forEach(([e,t])=>{c.options[e]=t}),d())},getState(){return l},subscribe(e){return m({},s.length+1),s.push(e),e(l),()=>{let t=s.indexOf(e);t>=0&&(m({},s.length-1),s.splice(t,1))}}}},_r=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},H=(e,t,n)=>(_r(e,t,`read from private field`),n?n.call(e):t.get(e)),vr=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},yr=(e,t,n,r)=>(_r(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),br=(e,t,n)=>(_r(e,t,`access private method`),n),xr,Sr,U,Cr,wr,Tr,Er,Dr,Or,kr,Ar,jr,Mr,Nr,Pr,Fr=[`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`Enter`,` `,`f`,`m`,`k`,`c`,`l`,`j`,`>`,`<`,`p`],Ir=10,Lr=.025,Rr=.25,zr=.25,Br=2,W={DEFAULT_SUBTITLES:`defaultsubtitles`,DEFAULT_STREAM_TYPE:`defaultstreamtype`,DEFAULT_DURATION:`defaultduration`,FULLSCREEN_ELEMENT:`fullscreenelement`,HOTKEYS:`hotkeys`,KEYBOARD_BACKWARD_SEEK_OFFSET:`keyboardbackwardseekoffset`,KEYBOARD_FORWARD_SEEK_OFFSET:`keyboardforwardseekoffset`,KEYBOARD_DOWN_VOLUME_STEP:`keyboarddownvolumestep`,KEYBOARD_UP_VOLUME_STEP:`keyboardupvolumestep`,KEYS_USED:`keysused`,LANG:`lang`,LOOP:`loop`,LIVE_EDGE_OFFSET:`liveedgeoffset`,NO_AUTO_SEEK_TO_LIVE:`noautoseektolive`,NO_DEFAULT_STORE:`nodefaultstore`,NO_HOTKEYS:`nohotkeys`,NO_MUTED_PREF:`nomutedpref`,NO_SUBTITLES_LANG_PREF:`nosubtitleslangpref`,NO_VOLUME_PREF:`novolumepref`,SEEK_TO_LIVE_OFFSET:`seektoliveoffset`},Vr=class extends mn{constructor(){super(),vr(this,Or),vr(this,jr),vr(this,Nr),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,vr(this,xr,new Tn(this,W.HOTKEYS)),vr(this,Sr,void 0),vr(this,U,void 0),vr(this,Cr,null),vr(this,wr,void 0),vr(this,Tr,void 0),vr(this,Er,e=>{var t;(t=H(this,U))==null||t.dispatch(e)}),vr(this,Dr,void 0),vr(this,Ar,e=>{let{key:t,shiftKey:n}=e;n&&(t===`/`||t===`?`)||Fr.includes(t)?this.keyboardShortcutHandler(e):this.removeEventListener(`keyup`,H(this,Ar))}),this.associateElement(this);let e={};yr(this,wr,t=>{Object.entries(t).forEach(([t,n])=>{if(t in e&&e[t]===n)return;this.propagateMediaState(t,n);let r=t.toLowerCase(),i=new O.CustomEvent(C[r],{composed:!0,detail:n});this.dispatchEvent(i)}),e=t})}static get observedAttributes(){return super.observedAttributes.concat(W.NO_HOTKEYS,W.HOTKEYS,W.DEFAULT_STREAM_TYPE,W.DEFAULT_SUBTITLES,W.DEFAULT_DURATION,W.NO_MUTED_PREF,W.NO_VOLUME_PREF,W.LANG,W.LOOP,W.LIVE_EDGE_OFFSET,W.SEEK_TO_LIVE_OFFSET,W.NO_AUTO_SEEK_TO_LIVE)}get mediaStore(){return H(this,U)}set mediaStore(e){var t;H(this,U)&&((t=H(this,Tr))==null||t.call(this),yr(this,Tr,void 0)),yr(this,U,e),!H(this,U)&&!this.hasAttribute(W.NO_DEFAULT_STORE)?br(this,Or,kr).call(this):yr(this,Tr,H(this,U)?.subscribe(H(this,wr)))}get fullscreenElement(){return H(this,Sr)??this}set fullscreenElement(e){var t;this.hasAttribute(W.FULLSCREEN_ELEMENT)&&this.removeAttribute(W.FULLSCREEN_ELEMENT),yr(this,Sr,e),(t=H(this,U))==null||t.dispatch({type:`fullscreenelementchangerequest`,detail:this.fullscreenElement})}get defaultSubtitles(){return N(this,W.DEFAULT_SUBTITLES)}set defaultSubtitles(e){P(this,W.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return F(this,W.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){I(this,W.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return j(this,W.DEFAULT_DURATION)}set defaultDuration(e){M(this,W.DEFAULT_DURATION,e)}get noHotkeys(){return N(this,W.NO_HOTKEYS)}set noHotkeys(e){P(this,W.NO_HOTKEYS,e)}get keysUsed(){return F(this,W.KEYS_USED)}set keysUsed(e){I(this,W.KEYS_USED,e)}get liveEdgeOffset(){return j(this,W.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){M(this,W.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return N(this,W.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){P(this,W.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return N(this,W.NO_VOLUME_PREF)}set noVolumePref(e){P(this,W.NO_VOLUME_PREF,e)}get noMutedPref(){return N(this,W.NO_MUTED_PREF)}set noMutedPref(e){P(this,W.NO_MUTED_PREF,e)}get noSubtitlesLangPref(){return N(this,W.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){P(this,W.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return N(this,W.NO_DEFAULT_STORE)}set noDefaultStore(e){P(this,W.NO_DEFAULT_STORE,e)}get resolvedLang(){return Ze()}attributeChangedCallback(e,t,n){var r,i,a,o,s,c,l,u,d,f;if(super.attributeChangedCallback(e,t,n),e===W.NO_HOTKEYS)n!==t&&n===``?(this.hasAttribute(W.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):n!==t&&n===null&&this.enableHotkeys();else if(e===W.HOTKEYS)H(this,xr).value=n;else if(e===W.DEFAULT_SUBTITLES&&n!==t)(r=H(this,U))==null||r.dispatch({type:`optionschangerequest`,detail:{defaultSubtitles:this.hasAttribute(W.DEFAULT_SUBTITLES)}});else if(e===W.DEFAULT_STREAM_TYPE)(i=H(this,U))==null||i.dispatch({type:`optionschangerequest`,detail:{defaultStreamType:this.getAttribute(W.DEFAULT_STREAM_TYPE)??void 0}});else if(e===W.LIVE_EDGE_OFFSET&&n!==t)(a=H(this,U))==null||a.dispatch({type:`optionschangerequest`,detail:{liveEdgeOffset:this.hasAttribute(W.LIVE_EDGE_OFFSET)?+this.getAttribute(W.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(W.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(W.SEEK_TO_LIVE_OFFSET):this.hasAttribute(W.LIVE_EDGE_OFFSET)?+this.getAttribute(W.LIVE_EDGE_OFFSET):void 0}});else if(e===W.SEEK_TO_LIVE_OFFSET&&n!==t)(o=H(this,U))==null||o.dispatch({type:`optionschangerequest`,detail:{seekToLiveOffset:this.hasAttribute(W.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(W.SEEK_TO_LIVE_OFFSET):this.hasAttribute(W.LIVE_EDGE_OFFSET)?+this.getAttribute(W.LIVE_EDGE_OFFSET):void 0}});else if(e===W.NO_AUTO_SEEK_TO_LIVE)(s=H(this,U))==null||s.dispatch({type:`optionschangerequest`,detail:{noAutoSeekToLive:this.hasAttribute(W.NO_AUTO_SEEK_TO_LIVE)}});else if(e===W.FULLSCREEN_ELEMENT){let e=n?this.getRootNode()?.getElementById(n):void 0;yr(this,Sr,e),(c=H(this,U))==null||c.dispatch({type:`fullscreenelementchangerequest`,detail:this.fullscreenElement})}else e===W.LANG&&n!==t?(Ye(n),(l=H(this,U))==null||l.dispatch({type:`optionschangerequest`,detail:{mediaLang:n}})):e===W.LOOP&&n!==t?(u=H(this,U))==null||u.dispatch({type:y.MEDIA_LOOP_REQUEST,detail:n!=null}):e===W.NO_VOLUME_PREF&&n!==t?(d=H(this,U))==null||d.dispatch({type:`optionschangerequest`,detail:{noVolumePref:this.hasAttribute(W.NO_VOLUME_PREF)}}):e===W.NO_MUTED_PREF&&n!==t&&((f=H(this,U))==null||f.dispatch({type:`optionschangerequest`,detail:{noMutedPref:this.hasAttribute(W.NO_MUTED_PREF)}}))}connectedCallback(){var e,t;this.associateElement(this),!H(this,U)&&!this.hasAttribute(W.NO_DEFAULT_STORE)&&br(this,Or,kr).call(this),(e=H(this,U))==null||e.dispatch({type:`documentelementchangerequest`,detail:k}),(t=H(this,U))==null||t.dispatch({type:`fullscreenelementchangerequest`,detail:this.fullscreenElement}),super.connectedCallback(),H(this,U)&&!H(this,Tr)&&yr(this,Tr,H(this,U)?.subscribe(H(this,wr))),H(this,Dr)!==void 0&&H(this,U)&&this.media&&setTimeout(()=>{var e;this.media?.textTracks?.length&&((e=H(this,U))==null||e.dispatch({type:y.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:H(this,Dr)}))},0),this.hasAttribute(W.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}disconnectedCallback(){var e,t,n,r,i;if((e=super.disconnectedCallback)==null||e.call(this),this.disableHotkeys(),H(this,U)){let e=H(this,U).getState();yr(this,Dr,!!e.mediaSubtitlesShowing?.length),(t=H(this,U))==null||t.dispatch({type:`fullscreenelementchangerequest`,detail:void 0}),(n=H(this,U))==null||n.dispatch({type:`documentelementchangerequest`,detail:void 0}),(r=H(this,U))==null||r.dispatch({type:y.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})}H(this,Tr)&&((i=H(this,Tr))==null||i.call(this),yr(this,Tr,void 0)),this.unassociateElement(this),H(this,Cr)&&(H(this,Cr).remove(),yr(this,Cr,null))}mediaSetCallback(e){var t;super.mediaSetCallback(e),(t=H(this,U))==null||t.dispatch({type:`mediaelementchangerequest`,detail:e}),e.hasAttribute(`tabindex`)||(e.tabIndex=-1)}mediaUnsetCallback(e){var t;super.mediaUnsetCallback(e),(t=H(this,U))==null||t.dispatch({type:`mediaelementchangerequest`,detail:void 0})}propagateMediaState(e,t){Qr(this.mediaStateReceivers,e,t)}associateElement(e){if(!e)return;let{associatedElementSubscriptions:t}=this;if(t.has(e))return;let n=$r(e,this.registerMediaStateReceiver.bind(this),this.unregisterMediaStateReceiver.bind(this));Object.values(y).forEach(t=>{e.addEventListener(t,H(this,Er))}),t.set(e,n)}unassociateElement(e){if(!e)return;let{associatedElementSubscriptions:t}=this;t.has(e)&&(t.get(e)(),t.delete(e),Object.values(y).forEach(t=>{e.removeEventListener(t,H(this,Er))}))}registerMediaStateReceiver(e){if(!e)return;let t=this.mediaStateReceivers;t.indexOf(e)>-1||(t.push(e),H(this,U)&&Object.entries(H(this,U).getState()).forEach(([t,n])=>{Qr([e],t,n)}))}unregisterMediaStateReceiver(e){let t=this.mediaStateReceivers,n=t.indexOf(e);n<0||t.splice(n,1)}enableHotkeys(){this.addEventListener(`keydown`,br(this,jr,Mr))}disableHotkeys(){this.removeEventListener(`keydown`,br(this,jr,Mr)),this.removeEventListener(`keyup`,H(this,Ar))}get hotkeys(){return H(this,xr)}set hotkeys(e){I(this,W.HOTKEYS,e)}keyboardShortcutHandler(e){let t=e.target;if((t.getAttribute(W.KEYS_USED)?.split(` `)??t?.keysUsed??[]).map(e=>e===`Space`?` `:e).filter(Boolean).includes(e.key))return;let n,r,i;if(!H(this,xr).contains(`no${e.key.toLowerCase()}`)&&!(e.key===` `&&H(this,xr).contains(`nospace`))&&(!e.shiftKey||e.key!==`/`&&e.key!==`?`||!H(this,xr).contains(`noshift+/`)))switch(e.key){case` `:case`k`:n=H(this,U).getState().mediaPaused?y.MEDIA_PLAY_REQUEST:y.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new O.CustomEvent(n,{composed:!0,bubbles:!0}));break;case`m`:n=this.mediaStore.getState().mediaVolumeLevel===`off`?y.MEDIA_UNMUTE_REQUEST:y.MEDIA_MUTE_REQUEST,this.dispatchEvent(new O.CustomEvent(n,{composed:!0,bubbles:!0}));break;case`f`:n=this.mediaStore.getState().mediaIsFullscreen?y.MEDIA_EXIT_FULLSCREEN_REQUEST:y.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new O.CustomEvent(n,{composed:!0,bubbles:!0}));break;case`c`:this.dispatchEvent(new O.CustomEvent(y.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case`ArrowLeft`:case`j`:{let e=this.hasAttribute(W.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(W.KEYBOARD_BACKWARD_SEEK_OFFSET):Ir;r=Math.max((this.mediaStore.getState().mediaCurrentTime??0)-e,0),i=new O.CustomEvent(y.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`ArrowRight`:case`l`:{let e=this.hasAttribute(W.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(W.KEYBOARD_FORWARD_SEEK_OFFSET):Ir;r=Math.max((this.mediaStore.getState().mediaCurrentTime??0)+e,0),i=new O.CustomEvent(y.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`ArrowUp`:{let e=this.hasAttribute(W.KEYBOARD_UP_VOLUME_STEP)?+this.getAttribute(W.KEYBOARD_UP_VOLUME_STEP):Lr;r=Math.min((this.mediaStore.getState().mediaVolume??1)+e,1),i=new O.CustomEvent(y.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`ArrowDown`:{let e=this.hasAttribute(W.KEYBOARD_DOWN_VOLUME_STEP)?+this.getAttribute(W.KEYBOARD_DOWN_VOLUME_STEP):Lr;r=Math.max((this.mediaStore.getState().mediaVolume??1)-e,0),i=new O.CustomEvent(y.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`<`:{let e=this.mediaStore.getState().mediaPlaybackRate??1;r=Math.max(e-Rr,zr).toFixed(2),i=new O.CustomEvent(y.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`>`:{let e=this.mediaStore.getState().mediaPlaybackRate??1;r=Math.min(e+Rr,Br).toFixed(2),i=new O.CustomEvent(y.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`/`:case`?`:e.shiftKey&&br(this,Nr,Pr).call(this);break;case`p`:n=this.mediaStore.getState().mediaIsPip?y.MEDIA_EXIT_PIP_REQUEST:y.MEDIA_ENTER_PIP_REQUEST,i=new O.CustomEvent(n,{composed:!0,bubbles:!0}),this.dispatchEvent(i)}}};xr=new WeakMap,Sr=new WeakMap,U=new WeakMap,Cr=new WeakMap,wr=new WeakMap,Tr=new WeakMap,Er=new WeakMap,Dr=new WeakMap,Or=new WeakSet,kr=function(){this.mediaStore=gr({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(W.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(W.DEFAULT_DURATION)?+this.getAttribute(W.DEFAULT_DURATION):void 0,defaultStreamType:this.getAttribute(W.DEFAULT_STREAM_TYPE)??void 0,liveEdgeOffset:this.hasAttribute(W.LIVE_EDGE_OFFSET)?+this.getAttribute(W.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(W.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(W.SEEK_TO_LIVE_OFFSET):this.hasAttribute(W.LIVE_EDGE_OFFSET)?+this.getAttribute(W.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(W.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(W.NO_VOLUME_PREF),noMutedPref:this.hasAttribute(W.NO_MUTED_PREF),noSubtitlesLangPref:this.hasAttribute(W.NO_SUBTITLES_LANG_PREF)}})},Ar=new WeakMap,jr=new WeakSet,Mr=function(e){let{metaKey:t,altKey:n,key:r,shiftKey:i}=e,a=i&&(r===`/`||r===`?`);if(a&&H(this,Cr)?.open||t||n||!a&&!Fr.includes(r)){this.removeEventListener(`keyup`,H(this,Ar));return}let o=e.target,s=o instanceof HTMLElement&&(o.tagName.toLowerCase()===`media-volume-range`||o.tagName.toLowerCase()===`media-time-range`);[` `,`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`].includes(r)&&!(H(this,xr).contains(`no${r.toLowerCase()}`)||r===` `&&H(this,xr).contains(`nospace`))&&!s&&e.preventDefault(),this.addEventListener(`keyup`,H(this,Ar),{once:!0})},Nr=new WeakSet,Pr=function(){H(this,Cr)||(yr(this,Cr,k.createElement(`media-keyboard-shortcuts-dialog`)),this.appendChild(H(this,Cr))),H(this,Cr).open=!0};var Hr=Object.values(x),Ur=Object.values(Ie),Wr=e=>{var t;let{observedAttributes:n}=e.constructor;!n&&e.nodeName?.includes(`-`)&&(O.customElements.upgrade(e),{observedAttributes:n}=e.constructor);let r=((t=(e?.getAttribute)?.call(e,b.MEDIA_CHROME_ATTRIBUTES))?.split)?.call(t,/\s+/);return Array.isArray(n||r)?(n||r).filter(e=>Hr.includes(e)):[]},Gr=e=>(e.nodeName?.includes(`-`)&&O.customElements.get(e.nodeName?.toLowerCase())&&!(e instanceof O.customElements.get(e.nodeName.toLowerCase()))&&O.customElements.upgrade(e),Ur.some(t=>t in e)),Kr=e=>Gr(e)||!!Wr(e).length,qr=e=>(e?.join)?.call(e,`:`),Jr={[x.MEDIA_SUBTITLES_LIST]:jn,[x.MEDIA_SUBTITLES_SHOWING]:jn,[x.MEDIA_SEEKABLE]:qr,[x.MEDIA_BUFFERED]:e=>e?.map(qr).join(` `),[x.MEDIA_PREVIEW_COORDS]:e=>e?.join(` `),[x.MEDIA_RENDITION_LIST]:Ve,[x.MEDIA_AUDIO_TRACK_LIST]:Ue},Yr=async(e,t,n)=>{if(e.isConnected||await Ke(0),typeof n==`boolean`||n==null)return P(e,t,n);if(typeof n==`number`)return M(e,t,n);if(typeof n==`string`)return I(e,t,n);if(Array.isArray(n)&&!n.length)return e.removeAttribute(t);let r=Jr[t]?.call(Jr,n)??n;return e.setAttribute(t,r)},Xr=e=>!!e.closest?.call(e,`*[slot="media"]`),Zr=(e,t)=>{if(Xr(e))return;let n=(e,t)=>{Kr(e)&&t(e);let{children:n=[]}=e??{},r=e?.shadowRoot?.children??[];[...n,...r].forEach(e=>Zr(e,t))},r=e?.nodeName.toLowerCase();r.includes(`-`)&&!Kr(e)?O.customElements.whenDefined(r).then(()=>{n(e,t)}):n(e,t)},Qr=(e,t,n)=>{e.forEach(e=>{if(t in e){e[t]=n;return}let r=Wr(e),i=t.toLowerCase();r.includes(i)&&Yr(e,i,n)})},$r=(e,t,n)=>{Zr(e,t);let r=e=>{t(e?.composedPath()[0]??e.target)},i=e=>{n(e?.composedPath()[0]??e.target)};e.addEventListener(y.REGISTER_MEDIA_STATE_RECEIVER,r),e.addEventListener(y.UNREGISTER_MEDIA_STATE_RECEIVER,i);let a=e=>{e.forEach(e=>{let{addedNodes:r=[],removedNodes:i=[],type:a,target:o,attributeName:s}=e;a===`childList`?(Array.prototype.forEach.call(r,e=>Zr(e,t)),Array.prototype.forEach.call(i,e=>Zr(e,n))):a===`attributes`&&s===b.MEDIA_CHROME_ATTRIBUTES&&(Kr(o)?t(o):n(o))})},o=[],s=e=>{let r=e.target;r.name!==`media`&&(o.forEach(e=>Zr(e,n)),o=[...r.assignedElements({flatten:!0})],o.forEach(e=>Zr(e,t)))};e.addEventListener(`slotchange`,s);let c=new MutationObserver(a);return c.observe(e,{childList:!0,attributes:!0,subtree:!0}),()=>{Zr(e,n),e.removeEventListener(`slotchange`,s),c.disconnect(),e.removeEventListener(y.REGISTER_MEDIA_STATE_RECEIVER,r),e.removeEventListener(y.UNREGISTER_MEDIA_STATE_RECEIVER,i)}};O.customElements.get(`media-controller`)||O.customElements.define(`media-controller`,Vr);var ei=Vr,ti={PLACEMENT:`placement`,BOUNDS:`bounds`};function ni(e){return`
    <style>
      :host {
        --_tooltip-background-color: var(--media-tooltip-background-color, var(--media-secondary-color, rgba(20, 20, 30, .7)));
        --_tooltip-background: var(--media-tooltip-background, var(--_tooltip-background-color));
        --_tooltip-arrow-half-width: calc(var(--media-tooltip-arrow-width, 12px) / 2);
        --_tooltip-arrow-height: var(--media-tooltip-arrow-height, 5px);
        --_tooltip-arrow-background: var(--media-tooltip-arrow-color, var(--_tooltip-background-color));
        position: relative;
        pointer-events: none;
        display: var(--media-tooltip-display, inline-flex);
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        z-index: var(--media-tooltip-z-index, 1);
        background: var(--_tooltip-background);
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        font: var(--media-font,
          var(--media-font-weight, 400)
          var(--media-font-size, 13px) /
          var(--media-text-content-height, var(--media-control-height, 18px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        padding: var(--media-tooltip-padding, .35em .7em);
        border: var(--media-tooltip-border, none);
        border-radius: var(--media-tooltip-border-radius, 5px);
        filter: var(--media-tooltip-filter, drop-shadow(0 0 4px rgba(0, 0, 0, .2)));
        white-space: var(--media-tooltip-white-space, nowrap);
      }

      :host([hidden]) {
        display: none;
      }

      img, svg {
        display: inline-block;
      }

      #arrow {
        position: absolute;
        width: 0px;
        height: 0px;
        border-style: solid;
        display: var(--media-tooltip-arrow-display, block);
      }

      :host(:not([placement])),
      :host([placement="top"]) {
        position: absolute;
        bottom: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host(:not([placement])) #arrow,
      :host([placement="top"]) #arrow {
        top: 100%;
        left: 50%;
        border-width: var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width);
        border-color: var(--_tooltip-arrow-background) transparent transparent transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="right"]) {
        position: absolute;
        left: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="right"]) #arrow {
        top: 50%;
        right: 100%;
        border-width: var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0;
        border-color: transparent var(--_tooltip-arrow-background) transparent transparent;
        transform: translate(0, -50%);
      }

      :host([placement="bottom"]) {
        position: absolute;
        top: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host([placement="bottom"]) #arrow {
        bottom: 100%;
        left: 50%;
        border-width: 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width);
        border-color: transparent transparent var(--_tooltip-arrow-background) transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="left"]) {
        position: absolute;
        right: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="left"]) #arrow {
        top: 50%;
        left: 100%;
        border-width: var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height);
        border-color: transparent transparent transparent var(--_tooltip-arrow-background);
        transform: translate(0, -50%);
      }
      
      :host([placement="none"]) #arrow {
        display: none;
      }
    </style>
    <slot></slot>
    <div id="arrow"></div>
  `}var ri=class extends O.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{if(!Tt(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;let e=this.placement;if(e===`left`||e===`right`){this.style.removeProperty(`--media-tooltip-offset-x`);return}let t=getComputedStyle(this),n=St(this,`#`+this.bounds)??gt(this);if(!n)return;let{x:r,width:i}=n.getBoundingClientRect(),{x:a,width:o}=this.getBoundingClientRect(),s=a+o,c=r+i,l=t.getPropertyValue(`--media-tooltip-offset-x`),u=l?parseFloat(l.replace(`px`,``)):0,d=t.getPropertyValue(`--media-tooltip-container-margin`),f=d?parseFloat(d.replace(`px`,``)):0,p=a-r+u-f,m=s-c+u+f;p<0?this.style.setProperty(`--media-tooltip-offset-x`,`${p}px`):m>0?this.style.setProperty(`--media-tooltip-offset-x`,`${m}px`):this.style.removeProperty(`--media-tooltip-offset-x`)},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=ht(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector(`#arrow`),Object.prototype.hasOwnProperty.call(this,`placement`)){let e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[ti.PLACEMENT,ti.BOUNDS]}get placement(){return F(this,ti.PLACEMENT)}set placement(e){I(this,ti.PLACEMENT,e)}get bounds(){return F(this,ti.BOUNDS)}set bounds(e){I(this,ti.BOUNDS,e)}};ri.shadowRootOptions={mode:`open`},ri.getTemplateHTML=ni,O.customElements.get(`media-tooltip`)||O.customElements.define(`media-tooltip`,ri);var ii=ri,ai=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},G=(e,t,n)=>(ai(e,t,`read from private field`),n?n.call(e):t.get(e)),oi=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},si=(e,t,n,r)=>(ai(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),ci=(e,t,n)=>(ai(e,t,`access private method`),n),li,ui,di,fi,pi,mi,hi,gi={TOOLTIP_PLACEMENT:`tooltipplacement`,DISABLED:`disabled`,NO_TOOLTIP:`notooltip`};function _i(e,t={}){return`
    <style>
      :host {
        position: relative;
        font: var(--media-font,
          var(--media-font-weight, bold)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        padding: var(--media-button-padding, var(--media-control-padding, 10px));
        justify-content: var(--media-button-justify-content, center);
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        transition: background .15s linear;
        pointer-events: auto;
        cursor: var(--media-cursor, pointer);
        -webkit-tap-highlight-color: transparent;
      }

      
      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }
      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgba(50 50 70 / .7));
      }

      slot[name="icon"] {
        display: inline-flex;
        align-items: center;
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-button-icon-width);
        height: var(--media-button-icon-height, var(--media-control-height, 24px));
        transform: var(--media-button-icon-transform);
        transition: var(--media-button-icon-transition);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
      }

      media-tooltip {
        
        max-width: 0;
        overflow-x: clip;
        opacity: 0;
        transition: opacity .3s, max-width 0s 9s;
      }

      :host(:hover) media-tooltip,
      :host(:focus-visible) media-tooltip {
        max-width: 100vw;
        opacity: 1;
        transition: opacity .3s;
      }

      :host([notooltip]) slot[name="tooltip"] {
        display: none;
      }
    </style>

    ${this.getSlotTemplateHTML(e,t)}

    <slot name="tooltip">
      <media-tooltip part="tooltip" aria-hidden="true">
        <template shadowrootmode="${ii.shadowRootOptions.mode}">
          ${ii.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(e)}
        </slot>
      </media-tooltip>
    </slot>
  `}function vi(e,t){return`
    <slot></slot>
  `}function yi(){return``}var K=class extends O.HTMLElement{constructor(){if(super(),oi(this,mi),oi(this,li,void 0),this.preventClick=!1,this.tooltipEl=null,oi(this,ui,e=>{this.preventClick||this.handleClick(e),setTimeout(G(this,di),0)}),oi(this,di,()=>{var e,t;(t=(e=this.tooltipEl)?.updateXOffset)==null||t.call(e)}),oi(this,fi,e=>{let{key:t}=e;this.keysUsed.includes(t)?this.preventClick||this.handleClick(e):this.removeEventListener(`keyup`,G(this,fi))}),oi(this,pi,e=>{let{metaKey:t,altKey:n,key:r}=e;t||n||!this.keysUsed.includes(r)?this.removeEventListener(`keyup`,G(this,fi)):this.addEventListener(`keyup`,G(this,fi),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=ht(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}this.tooltipEl=this.shadowRoot.querySelector(`media-tooltip`)}static get observedAttributes(){return[`disabled`,gi.TOOLTIP_PLACEMENT,b.MEDIA_CONTROLLER,x.MEDIA_LANG]}enable(){this.addEventListener(`click`,G(this,ui)),this.addEventListener(`keydown`,G(this,pi)),this.tabIndex=0}disable(){this.removeEventListener(`click`,G(this,ui)),this.removeEventListener(`keydown`,G(this,pi)),this.removeEventListener(`keyup`,G(this,fi)),this.tabIndex=-1}attributeChangedCallback(e,t,n){var r,i,a,o;e===b.MEDIA_CONTROLLER?(t&&((i=(r=G(this,li))?.unassociateElement)==null||i.call(r,this),si(this,li,null)),n&&this.isConnected&&(si(this,li,this.getRootNode()?.getElementById(n)),(o=(a=G(this,li))?.associateElement)==null||o.call(a,this))):e===`disabled`&&n!==t?n==null?this.enable():this.disable():e===gi.TOOLTIP_PLACEMENT&&this.tooltipEl&&n!==t?this.tooltipEl.placement=n:e===x.MEDIA_LANG&&(this.shadowRoot.querySelector(`slot[name="tooltip-content"]`).innerHTML=this.constructor.getTooltipContentHTML()),G(this,di).call(this)}connectedCallback(){var e,t;let{style:n}=A(this.shadowRoot,`:host`);n.setProperty(`display`,`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute(`disabled`)?this.disable():this.enable(),this.setAttribute(`role`,`button`);let r=this.getAttribute(b.MEDIA_CONTROLLER);r&&(si(this,li,this.getRootNode()?.getElementById(r)),(t=(e=G(this,li))?.associateElement)==null||t.call(e,this)),O.customElements.whenDefined(`media-tooltip`).then(()=>ci(this,mi,hi).call(this))}disconnectedCallback(){var e,t;this.disable(),(t=(e=G(this,li))?.unassociateElement)==null||t.call(e,this),si(this,li,null),this.removeEventListener(`mouseenter`,G(this,di)),this.removeEventListener(`focus`,G(this,di)),this.removeEventListener(`click`,G(this,ui))}get keysUsed(){return[`Enter`,` `]}get tooltipPlacement(){return F(this,gi.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){I(this,gi.TOOLTIP_PLACEMENT,e)}get mediaController(){return F(this,b.MEDIA_CONTROLLER)}set mediaController(e){I(this,b.MEDIA_CONTROLLER,e)}get disabled(){return N(this,gi.DISABLED)}set disabled(e){P(this,gi.DISABLED,e)}get noTooltip(){return N(this,gi.NO_TOOLTIP)}set noTooltip(e){P(this,gi.NO_TOOLTIP,e)}handleClick(e){}};li=new WeakMap,ui=new WeakMap,di=new WeakMap,fi=new WeakMap,pi=new WeakMap,mi=new WeakSet,hi=function(){this.addEventListener(`mouseenter`,G(this,di)),this.addEventListener(`focus`,G(this,di)),this.addEventListener(`click`,G(this,ui));let e=this.tooltipPlacement;e&&this.tooltipEl&&(this.tooltipEl.placement=e)},K.shadowRootOptions={mode:`open`},K.getTemplateHTML=_i,K.getSlotTemplateHTML=vi,K.getTooltipContentHTML=yi,O.customElements.get(`media-chrome-button`)||O.customElements.define(`media-chrome-button`,K);var bi=K,xi=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;function Si(e){return`
    <style>
      :host([${x.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${x.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${x.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
      :host(:not([${x.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${xi}</slot>
      <slot name="exit">${xi}</slot>
    </slot>
  `}function Ci(){return`
    <slot name="tooltip-enter">${D(`start airplay`)}</slot>
    <slot name="tooltip-exit">${D(`stop airplay`)}</slot>
  `}var wi=e=>{let t=e.mediaIsAirplaying?D(`stop airplay`):D(`start airplay`);e.setAttribute(`aria-label`,t)},Ti=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_IS_AIRPLAYING,x.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),wi(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_IS_AIRPLAYING&&wi(this)}get mediaIsAirplaying(){return N(this,x.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){P(this,x.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return F(this,x.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){I(this,x.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){let e=new O.CustomEvent(y.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}};Ti.getSlotTemplateHTML=Si,Ti.getTooltipContentHTML=Ci,O.customElements.get(`media-airplay-button`)||O.customElements.define(`media-airplay-button`,Ti);var Ei=Ti,Di=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,Oi=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function ki(e){return`
    <style>
      :host([aria-checked="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([aria-checked="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-checked="true"]) slot[name=tooltip-enable],
      :host(:not([aria-checked="true"])) slot[name=tooltip-disable] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${Di}</slot>
      <slot name="off">${Oi}</slot>
    </slot>
  `}function Ai(){return`
    <slot name="tooltip-enable">${D(`Enable captions`)}</slot>
    <slot name="tooltip-disable">${D(`Disable captions`)}</slot>
  `}var ji=e=>{e.setAttribute(`aria-checked`,In(e).toString())},Mi=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_SUBTITLES_LIST,x.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`button`),this.setAttribute(`aria-label`,D(`closed captions`)),ji(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_SUBTITLES_SHOWING&&ji(this)}get mediaSubtitlesList(){return Ni(this,x.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Pi(this,x.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Ni(this,x.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Pi(this,x.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new O.CustomEvent(y.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}};Mi.getSlotTemplateHTML=ki,Mi.getTooltipContentHTML=Ai;var Ni=(e,t)=>{let n=e.getAttribute(t);return n?On(n):[]},Pi=(e,t,n)=>{if(!n?.length){e.removeAttribute(t);return}let r=jn(n);e.getAttribute(t)!==r&&e.setAttribute(t,r)};O.customElements.get(`media-captions-button`)||O.customElements.define(`media-captions-button`,Mi);var Fi=Mi,Ii=`<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>`,Li=`<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>`;function Ri(e){return`
    <style>
      :host([${x.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${x.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${x.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
      :host(:not([${x.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Ii}</slot>
      <slot name="exit">${Li}</slot>
    </slot>
  `}function zi(){return`
    <slot name="tooltip-enter">${D(`Start casting`)}</slot>
    <slot name="tooltip-exit">${D(`Stop casting`)}</slot>
  `}var Bi=e=>{let t=e.mediaIsCasting?D(`stop casting`):D(`start casting`);e.setAttribute(`aria-label`,t)},Vi=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_IS_CASTING,x.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Bi(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_IS_CASTING&&Bi(this)}get mediaIsCasting(){return N(this,x.MEDIA_IS_CASTING)}set mediaIsCasting(e){P(this,x.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return F(this,x.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){I(this,x.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){let e=this.mediaIsCasting?y.MEDIA_EXIT_CAST_REQUEST:y.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new O.CustomEvent(e,{composed:!0,bubbles:!0}))}};Vi.getSlotTemplateHTML=Ri,Vi.getTooltipContentHTML=zi,O.customElements.get(`media-cast-button`)||O.customElements.define(`media-cast-button`,Vi);var Hi=Vi,Ui=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Wi=(e,t,n)=>(Ui(e,t,`read from private field`),n?n.call(e):t.get(e)),Gi=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Ki=(e,t,n,r)=>(Ui(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),qi=(e,t,n)=>(Ui(e,t,`access private method`),n),Ji,Yi,Xi,Zi,Qi,$i,ea,ta,na,ra,ia,aa,oa,sa,ca;function la(e){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        display: var(--media-dialog-display, inline-flex);
        justify-content: center;
        align-items: center;
        
        transition-behavior: allow-discrete;
        visibility: hidden;
        opacity: 0;
        transform: translateY(2px) scale(.99);
        pointer-events: none;
      }

      :host([open]) {
        transition: display .2s, visibility 0s, opacity .2s ease-out, transform .15s ease-out;
        visibility: visible;
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      #content {
        display: flex;
        position: relative;
        box-sizing: border-box;
        width: min(320px, 100%);
        word-wrap: break-word;
        max-height: 100%;
        overflow: auto;
        text-align: center;
        line-height: 1.4;
      }
    </style>
    ${this.getSlotTemplateHTML(e)}
  `}function ua(e){return`
    <slot id="content"></slot>
  `}var da={OPEN:`open`,ANCHOR:`anchor`},fa=class extends O.HTMLElement{constructor(){super(),Gi(this,Zi),Gi(this,$i),Gi(this,ta),Gi(this,ra),Gi(this,aa),Gi(this,sa),Gi(this,Ji,!1),Gi(this,Yi,null),Gi(this,Xi,null)}static get observedAttributes(){return[da.OPEN,da.ANCHOR]}get open(){return N(this,da.OPEN)}set open(e){P(this,da.OPEN,e)}handleEvent(e){switch(e.type){case`invoke`:qi(this,ra,ia).call(this,e);break;case`focusout`:qi(this,aa,oa).call(this,e);break;case`keydown`:qi(this,sa,ca).call(this,e)}}connectedCallback(){qi(this,Zi,Qi).call(this),this.role||=`dialog`,this.addEventListener(`invoke`,this),this.addEventListener(`focusout`,this),this.addEventListener(`keydown`,this)}disconnectedCallback(){this.removeEventListener(`invoke`,this),this.removeEventListener(`focusout`,this),this.removeEventListener(`keydown`,this)}attributeChangedCallback(e,t,n){qi(this,Zi,Qi).call(this),e===da.OPEN&&n!==t&&(this.open?qi(this,$i,ea).call(this):qi(this,ta,na).call(this))}focus(){Ki(this,Yi,Ct());let e=!this.dispatchEvent(new Event(`focus`,{composed:!0,cancelable:!0})),t=!this.dispatchEvent(new Event(`focusin`,{composed:!0,bubbles:!0,cancelable:!0}));e||t||this.querySelector(`[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]`)?.focus()}get keysUsed(){return[`Escape`,`Tab`]}};Ji=new WeakMap,Yi=new WeakMap,Xi=new WeakMap,Zi=new WeakSet,Qi=function(){if(!Wi(this,Ji)&&(Ki(this,Ji,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);let e=ht(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e),queueMicrotask(()=>{let{style:e}=A(this.shadowRoot,`:host`);e.setProperty(`transition`,`display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in`)})}},$i=new WeakSet,ea=function(){var e;(e=Wi(this,Xi))==null||e.setAttribute(`aria-expanded`,`true`),this.dispatchEvent(new Event(`open`,{composed:!0,bubbles:!0})),this.addEventListener(`transitionend`,()=>this.focus(),{once:!0})},ta=new WeakSet,na=function(){var e;(e=Wi(this,Xi))==null||e.setAttribute(`aria-expanded`,`false`),this.dispatchEvent(new Event(`close`,{composed:!0,bubbles:!0}))},ra=new WeakSet,ia=function(e){Ki(this,Xi,e.relatedTarget),xt(this,e.relatedTarget)||(this.open=!this.open)},aa=new WeakSet,oa=function(e){var t;xt(this,e.relatedTarget)||((t=Wi(this,Yi))==null||t.focus(),Wi(this,Xi)&&Wi(this,Xi)!==e.relatedTarget&&this.open&&(this.open=!1))},sa=new WeakSet,ca=function(e){var t,n,r,i,a;let{key:o,ctrlKey:s,altKey:c,metaKey:l}=e;s||c||l||this.keysUsed.includes(o)&&(e.preventDefault(),e.stopPropagation(),o===`Tab`?(e.shiftKey?(n=(t=this.previousElementSibling)?.focus)==null||n.call(t):(i=(r=this.nextElementSibling)?.focus)==null||i.call(r),this.blur()):o===`Escape`&&((a=Wi(this,Yi))==null||a.focus(),this.open=!1))},fa.shadowRootOptions={mode:`open`},fa.getTemplateHTML=la,fa.getSlotTemplateHTML=ua,O.customElements.get(`media-chrome-dialog`)||O.customElements.define(`media-chrome-dialog`,fa);var pa=fa,ma=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},q=(e,t,n)=>(ma(e,t,`read from private field`),n?n.call(e):t.get(e)),J=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},ha=(e,t,n,r)=>(ma(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),ga=(e,t,n)=>(ma(e,t,`access private method`),n),_a,va,ya,ba,xa,Sa,Ca,wa,Ta,Ea,Da,Oa,ka,Aa,ja,Ma,Na,Pa,Fa,Ia,La,Ra,za,Ba,Va;function Ha(e){return`
    <style>
      :host {
        --_focus-box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        --_media-range-padding: var(--media-range-padding, var(--media-control-padding, 10px));

        box-shadow: var(--_focus-visible-box-shadow, none);
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        height: calc(var(--media-control-height, 24px) + 2 * var(--_media-range-padding));
        display: inline-flex;
        align-items: center;
        
        vertical-align: middle;
        box-sizing: border-box;
        position: relative;
        width: 100px;
        transition: background .15s linear;
        cursor: var(--media-cursor, pointer);
        pointer-events: auto;
        touch-action: none; 
      }

      
      input[type=range]:focus {
        outline: 0;
      }
      input[type=range]:focus::-webkit-slider-runnable-track {
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgb(50 50 70 / .7));
      }

      #leftgap {
        padding-left: var(--media-range-padding-left, var(--_media-range-padding));
      }

      #rightgap {
        padding-right: var(--media-range-padding-right, var(--_media-range-padding));
      }

      #startpoint,
      #endpoint {
        position: absolute;
      }

      #endpoint {
        right: 0;
      }

      #container {
        
        width: var(--media-range-track-width, 100%);
        transform: translate(var(--media-range-track-translate-x, 0px), var(--media-range-track-translate-y, 0px));
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        min-width: 40px;
      }

      #range {
        
        display: var(--media-time-range-hover-display, block);
        bottom: var(--media-time-range-hover-bottom, 0);
        height: var(--media-time-range-hover-height, max(100% , 25px));
        width: 100%;
        position: absolute;
        cursor: var(--media-cursor, pointer);

        -webkit-appearance: none; 
        -webkit-tap-highlight-color: transparent;
        background: transparent; 
        margin: 0;
        z-index: 1;
      }

      @media (hover: hover) {
        #range {
          bottom: var(--media-time-range-hover-bottom, 0);
          height: var(--media-time-range-hover-height, max(100%, 20px));
        }
      }

      
      
      #range::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: transparent;
        width: .1px;
        height: .1px;
      }

      
      #range::-moz-range-thumb {
        background: transparent;
        border: transparent;
        width: .1px;
        height: .1px;
      }

      #appearance {
        height: var(--media-range-track-height, 4px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        position: absolute;
        
        will-change: transform;
      }

      #track {
        background: var(--media-range-track-background, rgb(255 255 255 / .2));
        border-radius: var(--media-range-track-border-radius, 1px);
        border: var(--media-range-track-border, none);
        outline: var(--media-range-track-outline);
        outline-offset: var(--media-range-track-outline-offset);
        backdrop-filter: var(--media-range-track-backdrop-filter);
        -webkit-backdrop-filter: var(--media-range-track-backdrop-filter);
        box-shadow: var(--media-range-track-box-shadow, none);
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      #progress,
      #pointer {
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #progress {
        background: var(--media-range-bar-color, var(--media-primary-color, rgb(238 238 238)));
        transition: var(--media-range-track-transition);
      }

      #pointer {
        background: var(--media-range-track-pointer-background);
        border-right: var(--media-range-track-pointer-border-right);
        transition: visibility .25s, opacity .25s;
        visibility: hidden;
        opacity: 0;
      }

      @media (hover: hover) {
        :host(:hover) #pointer {
          transition: visibility .5s, opacity .5s;
          visibility: visible;
          opacity: 1;
        }
      }

      #thumb,
      ::slotted([slot=thumb]) {
        width: var(--media-range-thumb-width, 10px);
        height: var(--media-range-thumb-height, 10px);
        transition: var(--media-range-thumb-transition);
        transform: var(--media-range-thumb-transform, none);
        opacity: var(--media-range-thumb-opacity, 1);
        translate: -50%;
        position: absolute;
        left: 0;
        cursor: var(--media-cursor, pointer);
      }

      #thumb {
        border-radius: var(--media-range-thumb-border-radius, 10px);
        background: var(--media-range-thumb-background, var(--media-primary-color, rgb(238 238 238)));
        box-shadow: var(--media-range-thumb-box-shadow, 1px 1px 1px transparent);
        border: var(--media-range-thumb-border, none);
      }

      :host([disabled]) #thumb {
        background-color: #777;
      }

      .segments #appearance {
        height: var(--media-range-segment-hover-height, 7px);
      }

      #track {
        clip-path: url(#segments-clipping);
      }

      #segments {
        --segments-gap: var(--media-range-segments-gap, 2px);
        position: absolute;
        width: 100%;
        height: 100%;
      }

      #segments-clipping {
        transform: translateX(calc(var(--segments-gap) / 2));
      }

      #segments-clipping:empty {
        display: none;
      }

      #segments-clipping rect {
        height: var(--media-range-track-height, 4px);
        y: calc((var(--media-range-segment-hover-height, 7px) - var(--media-range-track-height, 4px)) / 2);
        transition: var(--media-range-segment-transition, transform .1s ease-in-out);
        transform: var(--media-range-segment-transform, scaleY(1));
        transform-origin: center;
      }

      /* Visible label for accessibility - positioned off-screen but technically visible (Firefox requires visible labels) */
      #range-label {
        position: absolute;
        left: -10000px;
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        pointer-events: none;
      }
    </style>
    <div id="leftgap"></div>
    <div id="container">
      <div id="startpoint"></div>
      <div id="endpoint"></div>
      <div id="appearance">
        <div id="track" part="track">
          <div id="pointer"></div>
          <div id="progress" part="progress"></div>
        </div>
        <slot name="thumb">
          <div id="thumb" part="thumb"></div>
        </slot>
        <svg id="segments" aria-hidden="true"><clipPath id="segments-clipping"></clipPath></svg>
      </div>
        <input id="range" type="range" min="0" max="1" step="any" value="0">
        <label for="range" id="range-label"></label>

      ${this.getContainerTemplateHTML(e)}
    </div>
    <div id="rightgap"></div>
  `}function Ua(e){return``}var Wa=class extends O.HTMLElement{constructor(){if(super(),J(this,Ea),J(this,Oa),J(this,Aa),J(this,Ma),J(this,Pa),J(this,Ia),J(this,Ra),J(this,Ba),J(this,_a,void 0),J(this,va,void 0),J(this,ya,void 0),J(this,ba,void 0),J(this,xa,{}),J(this,Sa,[]),J(this,Ca,()=>{if(this.range.matches(`:focus-visible`)){let{style:e}=A(this.shadowRoot,`:host`);e.setProperty(`--_focus-visible-box-shadow`,`var(--_focus-box-shadow)`)}}),J(this,wa,()=>{let{style:e}=A(this.shadowRoot,`:host`);e.removeProperty(`--_focus-visible-box-shadow`)}),J(this,Ta,()=>{let e=this.shadowRoot.querySelector(`#segments-clipping`);e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=ht(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}this.container=this.shadowRoot.querySelector(`#container`),ha(this,ya,this.shadowRoot.querySelector(`#startpoint`)),ha(this,ba,this.shadowRoot.querySelector(`#endpoint`)),this.range=this.shadowRoot.querySelector(`#range`),this.appearance=this.shadowRoot.querySelector(`#appearance`)}static get observedAttributes(){return[`disabled`,`aria-disabled`,b.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,n){var r,i,a,o;e===b.MEDIA_CONTROLLER?(t&&((i=(r=q(this,_a))?.unassociateElement)==null||i.call(r,this),ha(this,_a,null)),n&&this.isConnected&&(ha(this,_a,this.getRootNode()?.getElementById(n)),(o=(a=q(this,_a))?.associateElement)==null||o.call(a,this))):(e===`disabled`||e===`aria-disabled`&&t!==n)&&(n==null?(this.range.removeAttribute(e),ga(this,Oa,ka).call(this)):(this.range.setAttribute(e,n),ga(this,Aa,ja).call(this)))}connectedCallback(){var e,t;let{style:n}=A(this.shadowRoot,`:host`);n.setProperty(`display`,`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),q(this,xa).pointer=A(this.shadowRoot,`#pointer`),q(this,xa).progress=A(this.shadowRoot,`#progress`),q(this,xa).thumb=A(this.shadowRoot,`#thumb, ::slotted([slot="thumb"])`),q(this,xa).activeSegment=A(this.shadowRoot,`#segments-clipping rect:nth-child(0)`);let r=this.getAttribute(b.MEDIA_CONTROLLER);r&&(ha(this,_a,this.getRootNode()?.getElementById(r)),(t=(e=q(this,_a))?.associateElement)==null||t.call(e,this)),this.updateBar(),this.shadowRoot.addEventListener(`focusin`,q(this,Ca)),this.shadowRoot.addEventListener(`focusout`,q(this,wa)),ga(this,Oa,ka).call(this),pt(this.container,q(this,Ta))}disconnectedCallback(){var e,t;ga(this,Aa,ja).call(this),(t=(e=q(this,_a))?.unassociateElement)==null||t.call(e,this),ha(this,_a,null),this.shadowRoot.removeEventListener(`focusin`,q(this,Ca)),this.shadowRoot.removeEventListener(`focusout`,q(this,wa)),mt(this.container,q(this,Ta))}updatePointerBar(e){var t;(t=q(this,xa).pointer)==null||t.style.setProperty(`width`,`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,t;let n=this.range.valueAsNumber*100;(e=q(this,xa).progress)==null||e.style.setProperty(`width`,`${n}%`),(t=q(this,xa).thumb)==null||t.style.setProperty(`left`,`${n}%`)}updateSegments(e){let t=this.shadowRoot.querySelector(`#segments-clipping`);if(t.textContent=``,this.container.classList.toggle(`segments`,!!e?.length),!e?.length)return;let n=[...new Set([+this.range.min,...e.flatMap(e=>[e.start,e.end]),+this.range.max])];ha(this,Sa,[...n]);let r=n.pop();for(let[e,i]of n.entries()){let[a,o]=[e===0,e===n.length-1],s=a?`calc(var(--segments-gap) / -1)`:`${i*100}%`,c=`calc(${((o?r:n[e+1])-i)*100}%${a||o?``:` - var(--segments-gap)`})`,l=k.createElementNS(`http://www.w3.org/2000/svg`,`rect`),u=Ot(this.shadowRoot,`#segments-clipping rect:nth-child(${e+1})`);u.style.setProperty(`x`,s),u.style.setProperty(`width`,c),t.append(l)}}getPointerRatio(e){return Et(e.clientX,e.clientY,q(this,ya).getBoundingClientRect(),q(this,ba).getBoundingClientRect())}get dragging(){return this.hasAttribute(`dragging`)}handleEvent(e){switch(e.type){case`pointermove`:ga(this,Ba,Va).call(this,e);break;case`input`:this.updateBar();break;case`pointerenter`:ga(this,Pa,Fa).call(this,e);break;case`pointerdown`:ga(this,Ma,Na).call(this,e);break;case`pointerup`:ga(this,Ia,La).call(this);break;case`pointerleave`:ga(this,Ra,za).call(this)}}get keysUsed(){return[`ArrowUp`,`ArrowRight`,`ArrowDown`,`ArrowLeft`]}};_a=new WeakMap,va=new WeakMap,ya=new WeakMap,ba=new WeakMap,xa=new WeakMap,Sa=new WeakMap,Ca=new WeakMap,wa=new WeakMap,Ta=new WeakMap,Ea=new WeakSet,Da=function(e){let t=q(this,xa).activeSegment;if(!t)return;let n=this.getPointerRatio(e),r=`#segments-clipping rect:nth-child(${q(this,Sa).findIndex((e,t,r)=>{let i=r[t+1];return i!=null&&n>=e&&n<=i})+1})`;(t.selectorText!=r||!t.style.transform)&&(t.selectorText=r,t.style.setProperty(`transform`,`var(--media-range-segment-hover-transform, scaleY(2))`))},Oa=new WeakSet,ka=function(){!this.hasAttribute(`disabled`)&&this.isConnected&&(this.addEventListener(`input`,this),this.addEventListener(`pointerdown`,this),this.addEventListener(`pointerenter`,this))},Aa=new WeakSet,ja=function(){var e,t;this.removeEventListener(`input`,this),this.removeEventListener(`pointerdown`,this),this.removeEventListener(`pointerenter`,this),this.removeEventListener(`pointerleave`,this),(e=O.window)==null||e.removeEventListener(`pointerup`,this),(t=O.window)==null||t.removeEventListener(`pointermove`,this)},Ma=new WeakSet,Na=function(e){var t;ha(this,va,e.composedPath().includes(this.range)),(t=O.window)==null||t.addEventListener(`pointerup`,this,{once:!0})},Pa=new WeakSet,Fa=function(e){var t;e.pointerType!==`mouse`&&ga(this,Ma,Na).call(this,e),this.addEventListener(`pointerleave`,this,{once:!0}),(t=O.window)==null||t.addEventListener(`pointermove`,this)},Ia=new WeakSet,La=function(){var e;(e=O.window)==null||e.removeEventListener(`pointerup`,this),this.toggleAttribute(`dragging`,!1),this.range.disabled=this.hasAttribute(`disabled`)},Ra=new WeakSet,za=function(){var e,t;this.removeEventListener(`pointerleave`,this),(e=O.window)==null||e.removeEventListener(`pointermove`,this),this.toggleAttribute(`dragging`,!1),this.range.disabled=this.hasAttribute(`disabled`),(t=q(this,xa).activeSegment)==null||t.style.removeProperty(`transform`)},Ba=new WeakSet,Va=function(e){(e.pointerType!==`pen`||e.buttons!==0)&&(this.toggleAttribute(`dragging`,e.buttons===1||e.pointerType!==`mouse`),this.updatePointerBar(e),ga(this,Ea,Da).call(this,e),this.dragging&&(e.pointerType!==`mouse`||!q(this,va))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(e),this.range.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0}))))},Wa.shadowRootOptions={mode:`open`},Wa.getTemplateHTML=Ha,Wa.getContainerTemplateHTML=Ua,O.customElements.get(`media-chrome-range`)||O.customElements.define(`media-chrome-range`,Wa);var Ga=Wa,Ka=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},qa=(e,t,n)=>(Ka(e,t,`read from private field`),n?n.call(e):t.get(e)),Ja=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Ya=(e,t,n,r)=>(Ka(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Xa;function Za(e){return`
    <style>
      :host {
        
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-control-bar-display, inline-flex));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --media-loading-indicator-icon-height: 44px;
      }

      ::slotted(media-time-range),
      ::slotted(media-volume-range) {
        min-height: 100%;
      }

      ::slotted(media-time-range),
      ::slotted(media-clip-selector) {
        flex-grow: 1;
      }

      ::slotted([role="menu"]) {
        position: absolute;
      }
    </style>

    <slot></slot>
  `}var Qa=class extends O.HTMLElement{constructor(){if(super(),Ja(this,Xa,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=ht(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[b.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,n){var r,i,a,o;e===b.MEDIA_CONTROLLER&&(t&&((i=(r=qa(this,Xa))?.unassociateElement)==null||i.call(r,this),Ya(this,Xa,null)),n&&this.isConnected&&(Ya(this,Xa,this.getRootNode()?.getElementById(n)),(o=(a=qa(this,Xa))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;let n=this.getAttribute(b.MEDIA_CONTROLLER);n&&(Ya(this,Xa,this.getRootNode()?.getElementById(n)),(t=(e=qa(this,Xa))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=qa(this,Xa))?.unassociateElement)==null||t.call(e,this),Ya(this,Xa,null)}};Xa=new WeakMap,Qa.shadowRootOptions={mode:`open`},Qa.getTemplateHTML=Za,O.customElements.get(`media-control-bar`)||O.customElements.define(`media-control-bar`,Qa);var $a=Qa,eo=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},to=(e,t,n)=>(eo(e,t,`read from private field`),n?n.call(e):t.get(e)),no=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},ro=(e,t,n,r)=>(eo(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),io;function ao(e,t={}){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-text-background, var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7))));
        padding: var(--media-control-padding, 10px);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        pointer-events: auto;
      }

      
      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }

      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }
    </style>

    ${this.getSlotTemplateHTML(e,t)}
  `}function oo(e,t){return`
    <slot></slot>
  `}var so=class extends O.HTMLElement{constructor(){if(super(),no(this,io,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=ht(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[b.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,n){var r,i,a,o;e===b.MEDIA_CONTROLLER&&(t&&((i=(r=to(this,io))?.unassociateElement)==null||i.call(r,this),ro(this,io,null)),n&&this.isConnected&&(ro(this,io,this.getRootNode()?.getElementById(n)),(o=(a=to(this,io))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;let{style:n}=A(this.shadowRoot,`:host`);n.setProperty(`display`,`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);let r=this.getAttribute(b.MEDIA_CONTROLLER);r&&(ro(this,io,this.getRootNode()?.getElementById(r)),(t=(e=to(this,io))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=to(this,io))?.unassociateElement)==null||t.call(e,this),ro(this,io,null)}};io=new WeakMap,so.shadowRootOptions={mode:`open`},so.getTemplateHTML=ao,so.getSlotTemplateHTML=oo,O.customElements.get(`media-text-display`)||O.customElements.define(`media-text-display`,so);var co=so,lo=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},uo=(e,t,n)=>(lo(e,t,`read from private field`),n?n.call(e):t.get(e)),fo=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},po=(e,t,n,r)=>(lo(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),mo;function ho(e,t){return`
    <slot>${tt(t.mediaDuration)}</slot>
  `}var go=class extends so{constructor(){super(),fo(this,mo,void 0),po(this,mo,this.shadowRoot.querySelector(`slot`)),uo(this,mo).textContent=tt(this.mediaDuration??0)}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_DURATION]}attributeChangedCallback(e,t,n){e===x.MEDIA_DURATION&&(uo(this,mo).textContent=tt(+n)),super.attributeChangedCallback(e,t,n)}get mediaDuration(){return j(this,x.MEDIA_DURATION)}set mediaDuration(e){M(this,x.MEDIA_DURATION,e)}};mo=new WeakMap,go.getSlotTemplateHTML=ho,O.customElements.get(`media-duration-display`)||O.customElements.define(`media-duration-display`,go);var _o=go,vo={2:D(`Network Error`),3:D(`Decode Error`),4:D(`Source Not Supported`),5:D(`Encryption Error`)},yo={2:D(`A network error caused the media download to fail.`),3:D(`A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.`),4:D(`An unsupported error occurred. The server or network failed, or your browser does not support this format.`),5:D(`The media is encrypted and there are no keys to decrypt it.`)},bo=e=>e.code===1?null:{title:vo[e.code]??`Error ${e.code}`,message:yo[e.code]??e.message},xo=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},So=(e,t,n)=>(xo(e,t,`read from private field`),n?n.call(e):t.get(e)),Co=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},wo=(e,t,n,r)=>(xo(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),To;function Eo(e){return`
    <style>
      :host {
        background: rgb(20 20 30 / .8);
      }

      #content {
        display: block;
        padding: 1.2em 1.5em;
      }

      h3,
      p {
        margin-block: 0 .3em;
      }
    </style>
    <slot name="error-${e.mediaerrorcode}" id="content">
      ${Oo({code:+e.mediaerrorcode,message:e.mediaerrormessage})}
    </slot>
  `}function Do(e){return e.code&&bo(e)!==null}function Oo(e){let{title:t,message:n}=bo(e)??{},r=``;return t&&(r+=`<slot name="error-${e.code}-title"><h3>${t}</h3></slot>`),n&&(r+=`<slot name="error-${e.code}-message"><p>${n}</p></slot>`),r}var ko=[x.MEDIA_ERROR_CODE,x.MEDIA_ERROR_MESSAGE],Ao=class extends fa{constructor(){super(...arguments),Co(this,To,null)}static get observedAttributes(){return[...super.observedAttributes,...ko]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),!ko.includes(e))return;let r=this.mediaError??{code:this.mediaErrorCode,message:this.mediaErrorMessage};if(this.open=Do(r),this.open&&(this.shadowRoot.querySelector(`slot`).name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector(`#content`).innerHTML=this.formatErrorMessage(r),!this.hasAttribute(`aria-label`))){let{title:e}=bo(r);e&&this.setAttribute(`aria-label`,e)}}get mediaError(){return So(this,To)}set mediaError(e){wo(this,To,e)}get mediaErrorCode(){return j(this,`mediaerrorcode`)}set mediaErrorCode(e){M(this,`mediaerrorcode`,e)}get mediaErrorMessage(){return F(this,`mediaerrormessage`)}set mediaErrorMessage(e){I(this,`mediaerrormessage`,e)}};To=new WeakMap,Ao.getSlotTemplateHTML=Eo,Ao.formatErrorMessage=Oo,O.customElements.get(`media-error-dialog`)||O.customElements.define(`media-error-dialog`,Ao);var jo=Ao,Mo=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},No=(e,t,n)=>(Mo(e,t,`read from private field`),n?n.call(e):t.get(e)),Po=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Fo,Io;function Lo(e){return`
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        background: rgb(20 20 30 / .8);
        backdrop-filter: blur(10px);
      }

      #content {
        display: block;
        width: clamp(400px, 40vw, 700px);
        max-width: 90vw;
        text-align: left;
      }

      h2 {
        margin: 0 0 1.5rem 0;
        font-size: 1.5rem;
        font-weight: 500;
        text-align: center;
      }

      .shortcuts-table {
        width: 100%;
        border-collapse: collapse;
      }

      .shortcuts-table tr {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .shortcuts-table tr:last-child {
        border-bottom: none;
      }

      .shortcuts-table td {
        padding: 0.75rem 0.5rem;
      }

      .shortcuts-table td:first-child {
        text-align: right;
        padding-right: 1rem;
        width: 40%;
        min-width: 120px;
      }

      .shortcuts-table td:last-child {
        padding-left: 1rem;
      }

      .key {
        display: inline-block;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        font-weight: 500;
        min-width: 1.5rem;
        text-align: center;
        margin: 0 0.2rem;
      }

      .description {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.95rem;
      }

      .key-combo {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.3rem;
      }

      .key-separator {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.9rem;
      }
    </style>
    <slot id="content">
      ${Ro()}
    </slot>
  `}function Ro(){return`
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${[{keys:[`Space`,`k`],description:`Toggle Playback`},{keys:[`m`],description:`Toggle mute`},{keys:[`f`],description:`Toggle fullscreen`},{keys:[`c`],description:`Toggle captions or subtitles, if available`},{keys:[`p`],description:`Toggle Picture in Picture`},{keys:[`←`,`j`],description:`Seek back 10s`},{keys:[`→`,`l`],description:`Seek forward 10s`},{keys:[`↑`],description:`Turn volume up`},{keys:[`↓`],description:`Turn volume down`},{keys:[`< (SHIFT+,)`],description:`Decrease playback rate`},{keys:[`> (SHIFT+.)`],description:`Increase playback rate`}].map(({keys:e,description:t})=>`
      <tr>
        <td>
          <div class="key-combo">${e.map((e,t)=>t>0?`<span class="key-separator">or</span><span class="key">${e}</span>`:`<span class="key">${e}</span>`).join(``)}</div>
        </td>
        <td class="description">${t}</td>
      </tr>
    `).join(``)}</table>
  `}var zo=class extends fa{constructor(){super(...arguments),Po(this,Fo,e=>{if(!this.open)return;let t=this.shadowRoot?.querySelector(`#content`);if(!t)return;let n=e.composedPath(),r=n[0]===this||n.includes(this),i=n.includes(t);r&&!i&&(this.open=!1)}),Po(this,Io,e=>{if(!this.open)return;let t=e.shiftKey&&(e.key===`/`||e.key===`?`);(e.key===`Escape`||t)&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(this.open=!1,e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),this.open&&(this.addEventListener(`click`,No(this,Fo)),document.addEventListener(`keydown`,No(this,Io)))}disconnectedCallback(){this.removeEventListener(`click`,No(this,Fo)),document.removeEventListener(`keydown`,No(this,Io))}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===`open`&&(this.open?(this.addEventListener(`click`,No(this,Fo)),document.addEventListener(`keydown`,No(this,Io))):(this.removeEventListener(`click`,No(this,Fo)),document.removeEventListener(`keydown`,No(this,Io))))}};Fo=new WeakMap,Io=new WeakMap,zo.getSlotTemplateHTML=Lo,O.customElements.get(`media-keyboard-shortcuts-dialog`)||O.customElements.define(`media-keyboard-shortcuts-dialog`,zo);var Bo=zo,Vo=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Ho=(e,t,n)=>(Vo(e,t,`read from private field`),n?n.call(e):t.get(e)),Uo=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Wo=(e,t,n,r)=>(Vo(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Go,Ko=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,qo=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;function Jo(e){return`
    <style>
      :host([${x.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${x.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${x.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
      :host(:not([${x.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Ko}</slot>
      <slot name="exit">${qo}</slot>
    </slot>
  `}function Yo(){return`
    <slot name="tooltip-enter">${D(`Enter fullscreen mode`)}</slot>
    <slot name="tooltip-exit">${D(`Exit fullscreen mode`)}</slot>
  `}var Xo=e=>{let t=e.mediaIsFullscreen?D(`exit fullscreen mode`):D(`enter fullscreen mode`);e.setAttribute(`aria-label`,t)},Zo=class extends K{constructor(){super(...arguments),Uo(this,Go,null)}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_IS_FULLSCREEN,x.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Xo(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_IS_FULLSCREEN&&Xo(this)}get mediaFullscreenUnavailable(){return F(this,x.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){I(this,x.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return N(this,x.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){P(this,x.MEDIA_IS_FULLSCREEN,e)}handleClick(e){Wo(this,Go,e);let t=Ho(this,Go)instanceof PointerEvent,n=this.mediaIsFullscreen?new O.CustomEvent(y.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0}):new O.CustomEvent(y.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0,detail:t});this.dispatchEvent(n)}};Go=new WeakMap,Zo.getSlotTemplateHTML=Jo,Zo.getTooltipContentHTML=Yo,O.customElements.get(`media-fullscreen-button`)||O.customElements.define(`media-fullscreen-button`,Zo);var Qo=Zo,{MEDIA_TIME_IS_LIVE:$o,MEDIA_PAUSED:es}=x,{MEDIA_SEEK_TO_LIVE_REQUEST:ts,MEDIA_PLAY_REQUEST:ns}=y,rs=`<svg viewBox="0 0 6 12" aria-hidden="true"><circle cx="3" cy="6" r="2"></circle></svg>`;function is(e){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${$o}]:not([${es}])) slot[name=indicator] > *,
      :host([${$o}]:not([${es}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${$o}]:not([${es}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${rs}</slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${D(`live`)}</slot>
  `}var as=e=>{let t=e.mediaPaused||!e.mediaTimeIsLive,n=D(t?`seek to live`:`playing live`);e.setAttribute(`aria-label`,n);let r=e.shadowRoot?.querySelector(`slot[name="text"]`);r&&(r.textContent=D(`live`)),t?e.removeAttribute(`aria-disabled`):e.setAttribute(`aria-disabled`,`true`)},os=class extends K{static get observedAttributes(){return[...super.observedAttributes,$o,es]}connectedCallback(){super.connectedCallback(),as(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),as(this)}get mediaPaused(){return N(this,x.MEDIA_PAUSED)}set mediaPaused(e){P(this,x.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return N(this,x.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){P(this,x.MEDIA_TIME_IS_LIVE,e)}handleClick(){(this.mediaPaused||!this.mediaTimeIsLive)&&(this.dispatchEvent(new O.CustomEvent(ts,{composed:!0,bubbles:!0})),this.hasAttribute(es)&&this.dispatchEvent(new O.CustomEvent(ns,{composed:!0,bubbles:!0})))}};os.getSlotTemplateHTML=is,O.customElements.get(`media-live-button`)||O.customElements.define(`media-live-button`,os);var ss=os,cs=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},ls=(e,t,n)=>(cs(e,t,`read from private field`),n?n.call(e):t.get(e)),us=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},ds=(e,t,n,r)=>(cs(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),fs,ps,ms={LOADING_DELAY:`loadingdelay`,NO_AUTOHIDE:`noautohide`},hs=500,gs=`
<svg aria-hidden="true" viewBox="0 0 100 100">
  <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
    <animateTransform
       attributeName="transform"
       attributeType="XML"
       type="rotate"
       dur="1s"
       from="0 50 50"
       to="360 50 50"
       repeatCount="indefinite" />
  </path>
</svg>
`;function _s(e){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${hs}ms);
      }

      #status {
        color: rgba(0,0,0,0);
        width: 0px;
        height: 0px;
      }

      :host slot[name=icon] > *,
      :host ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 0);
        transition: opacity 0.15s;
      }

      :host([${x.MEDIA_LOADING}]:not([${x.MEDIA_PAUSED}])) slot[name=icon] > *,
      :host([${x.MEDIA_LOADING}]:not([${x.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 1);
        transition: opacity 0.15s var(--_loading-indicator-delay);
      }

      :host #status {
        visibility: var(--media-loading-indicator-opacity, hidden);
        transition: visibility 0.15s;
      }

      :host([${x.MEDIA_LOADING}]:not([${x.MEDIA_PAUSED}])) #status {
        visibility: var(--media-loading-indicator-opacity, visible);
        transition: visibility 0.15s var(--_loading-indicator-delay);
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-loading-indicator-icon-width);
        height: var(--media-loading-indicator-icon-height, 100px);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
      }
    </style>

    <slot name="icon">${gs}</slot>
    <div id="status" role="status" aria-live="polite">${D(`media loading`)}</div>
  `}var vs=class extends O.HTMLElement{constructor(){if(super(),us(this,fs,void 0),us(this,ps,hs),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=ht(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[b.MEDIA_CONTROLLER,x.MEDIA_PAUSED,x.MEDIA_LOADING,ms.LOADING_DELAY]}attributeChangedCallback(e,t,n){var r,i,a,o;e===ms.LOADING_DELAY&&t!==n?this.loadingDelay=Number(n):e===b.MEDIA_CONTROLLER&&(t&&((i=(r=ls(this,fs))?.unassociateElement)==null||i.call(r,this),ds(this,fs,null)),n&&this.isConnected&&(ds(this,fs,this.getRootNode()?.getElementById(n)),(o=(a=ls(this,fs))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;let n=this.getAttribute(b.MEDIA_CONTROLLER);n&&(ds(this,fs,this.getRootNode()?.getElementById(n)),(t=(e=ls(this,fs))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=ls(this,fs))?.unassociateElement)==null||t.call(e,this),ds(this,fs,null)}get loadingDelay(){return ls(this,ps)}set loadingDelay(e){ds(this,ps,e);let{style:t}=A(this.shadowRoot,`:host`);t.setProperty(`--_loading-indicator-delay`,`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return N(this,x.MEDIA_PAUSED)}set mediaPaused(e){P(this,x.MEDIA_PAUSED,e)}get mediaLoading(){return N(this,x.MEDIA_LOADING)}set mediaLoading(e){P(this,x.MEDIA_LOADING,e)}get mediaController(){return F(this,b.MEDIA_CONTROLLER)}set mediaController(e){I(this,b.MEDIA_CONTROLLER,e)}get noAutohide(){return N(this,ms.NO_AUTOHIDE)}set noAutohide(e){P(this,ms.NO_AUTOHIDE,e)}};fs=new WeakMap,ps=new WeakMap,vs.shadowRootOptions={mode:`open`},vs.getTemplateHTML=_s,O.customElements.get(`media-loading-indicator`)||O.customElements.define(`media-loading-indicator`,vs);var ys=vs,bs=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,xs=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,Ss=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;function Cs(e){return`
    <style>
      :host(:not([${x.MEDIA_VOLUME_LEVEL}])) slot[name=icon] slot:not([name=high]),
      :host([${x.MEDIA_VOLUME_LEVEL}=high]) slot[name=icon] slot:not([name=high]) {
        display: none !important;
      }

      :host([${x.MEDIA_VOLUME_LEVEL}=off]) slot[name=icon] slot:not([name=off]) {
        display: none !important;
      }

      :host([${x.MEDIA_VOLUME_LEVEL}=low]) slot[name=icon] slot:not([name=low]) {
        display: none !important;
      }

      :host([${x.MEDIA_VOLUME_LEVEL}=medium]) slot[name=icon] slot:not([name=medium]) {
        display: none !important;
      }

      :host(:not([${x.MEDIA_VOLUME_LEVEL}=off])) slot[name=tooltip-unmute],
      :host([${x.MEDIA_VOLUME_LEVEL}=off]) slot[name=tooltip-mute] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="off">${bs}</slot>
      <slot name="low">${xs}</slot>
      <slot name="medium">${xs}</slot>
      <slot name="high">${Ss}</slot>
    </slot>
  `}function ws(){return`
    <slot name="tooltip-mute">${D(`Mute`)}</slot>
    <slot name="tooltip-unmute">${D(`Unmute`)}</slot>
  `}var Ts=e=>{let t=e.mediaVolumeLevel===`off`?D(`unmute`):D(`mute`);e.setAttribute(`aria-label`,t)},Es=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),Ts(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_VOLUME_LEVEL&&Ts(this)}get mediaVolumeLevel(){return F(this,x.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){I(this,x.MEDIA_VOLUME_LEVEL,e)}handleClick(){let e=this.mediaVolumeLevel===`off`?y.MEDIA_UNMUTE_REQUEST:y.MEDIA_MUTE_REQUEST;this.dispatchEvent(new O.CustomEvent(e,{composed:!0,bubbles:!0}))}};Es.getSlotTemplateHTML=Cs,Es.getTooltipContentHTML=ws,O.customElements.get(`media-mute-button`)||O.customElements.define(`media-mute-button`,Es);var Ds=Es,Os=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;function ks(e){return`
    <style>
      :host([${x.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      :host(:not([${x.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${x.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
      :host(:not([${x.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Os}</slot>
      <slot name="exit">${Os}</slot>
    </slot>
  `}function As(){return`
    <slot name="tooltip-enter">${D(`Enter picture in picture mode`)}</slot>
    <slot name="tooltip-exit">${D(`Exit picture in picture mode`)}</slot>
  `}var js=e=>{let t=e.mediaIsPip?D(`exit picture in picture mode`):D(`enter picture in picture mode`);e.setAttribute(`aria-label`,t)},Ms=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_IS_PIP,x.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),js(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_IS_PIP&&js(this)}get mediaPipUnavailable(){return F(this,x.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){I(this,x.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return N(this,x.MEDIA_IS_PIP)}set mediaIsPip(e){P(this,x.MEDIA_IS_PIP,e)}handleClick(){let e=this.mediaIsPip?y.MEDIA_EXIT_PIP_REQUEST:y.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new O.CustomEvent(e,{composed:!0,bubbles:!0}))}};Ms.getSlotTemplateHTML=ks,Ms.getTooltipContentHTML=As,O.customElements.get(`media-pip-button`)||O.customElements.define(`media-pip-button`,Ms);var Ns=Ms,Ps=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Fs=(e,t,n)=>(Ps(e,t,`read from private field`),n?n.call(e):t.get(e)),Is=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Ls,Rs={RATES:`rates`},zs=[1,1.2,1.5,1.7,2];function Bs(e){return Math.round(e*100)/100}function Vs(e){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${e.mediaplaybackrate?Bs(+e.mediaplaybackrate):1}x</slot>
  `}function Hs(){return D(`Playback rate`)}var Us=class extends K{constructor(){super(),Is(this,Ls,new Tn(this,Rs.RATES,{defaultValue:zs})),this.container=this.shadowRoot.querySelector(`slot[name="icon"]`),this.container.innerHTML=`${Bs(this.mediaPlaybackRate??1)}x`}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PLAYBACK_RATE,Rs.RATES]}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),e===Rs.RATES&&(Fs(this,Ls).value=n),e===x.MEDIA_PLAYBACK_RATE){let e=n?+n:NaN,t=Bs(Number.isNaN(e)?1:e);this.container.innerHTML=`${t}x`,this.setAttribute(`aria-label`,D(`Playback rate {playbackRate}`,{playbackRate:t}))}}get rates(){return Fs(this,Ls)}set rates(e){e?Array.isArray(e)?Fs(this,Ls).value=e.join(` `):typeof e==`string`&&(Fs(this,Ls).value=e):Fs(this,Ls).value=``}get mediaPlaybackRate(){return j(this,x.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){M(this,x.MEDIA_PLAYBACK_RATE,e)}handleClick(){let e=Array.from(Fs(this,Ls).values(),e=>+e).sort((e,t)=>e-t),t=e.find(e=>e>this.mediaPlaybackRate)??e[0]??1,n=new O.CustomEvent(y.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:t});this.dispatchEvent(n)}};Ls=new WeakMap,Us.getSlotTemplateHTML=Vs,Us.getTooltipContentHTML=Hs,O.customElements.get(`media-playback-rate-button`)||O.customElements.define(`media-playback-rate-button`,Us);var Ws=Us,Gs=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,Ks=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;function qs(e){return`
    <style>
      :host([${x.MEDIA_PAUSED}]) slot[name=pause],
      :host(:not([${x.MEDIA_PAUSED}])) slot[name=play] {
        display: none !important;
      }

      :host([${x.MEDIA_PAUSED}]) slot[name=tooltip-pause],
      :host(:not([${x.MEDIA_PAUSED}])) slot[name=tooltip-play] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="play">${Gs}</slot>
      <slot name="pause">${Ks}</slot>
    </slot>
  `}function Js(){return`
    <slot name="tooltip-play">${D(`Play`)}</slot>
    <slot name="tooltip-pause">${D(`Pause`)}</slot>
  `}var Ys=e=>{let t=e.mediaPaused?D(`play`):D(`pause`);e.setAttribute(`aria-label`,t)},Xs=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PAUSED,x.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),Ys(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),(e===x.MEDIA_PAUSED||e===x.MEDIA_LANG)&&Ys(this)}get mediaPaused(){return N(this,x.MEDIA_PAUSED)}set mediaPaused(e){P(this,x.MEDIA_PAUSED,e)}handleClick(){let e=this.mediaPaused?y.MEDIA_PLAY_REQUEST:y.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new O.CustomEvent(e,{composed:!0,bubbles:!0}))}};Xs.getSlotTemplateHTML=qs,Xs.getTooltipContentHTML=Js,O.customElements.get(`media-play-button`)||O.customElements.define(`media-play-button`,Xs);var Zs=Xs,Qs={PLACEHOLDER_SRC:`placeholdersrc`,SRC:`src`};function $s(e){return`
    <style>
      :host {
        pointer-events: none;
        display: var(--media-poster-image-display, inline-block);
        box-sizing: border-box;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        background-repeat: no-repeat;
        background-position: var(--media-poster-image-background-position, var(--media-object-position, center));
        background-size: var(--media-poster-image-background-size, var(--media-object-fit, contain));
        object-fit: var(--media-object-fit, contain);
        object-position: var(--media-object-position, center);
      }
    </style>

    <img part="poster img" aria-hidden="true" id="image"/>
  `}var ec=e=>{e.style.removeProperty(`background-image`)},tc=(e,t)=>{e.style[`background-image`]=`url('${t}')`},nc=class extends O.HTMLElement{static get observedAttributes(){return[Qs.PLACEHOLDER_SRC,Qs.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=ht(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector(`#image`)}attributeChangedCallback(e,t,n){e===Qs.SRC&&(n==null?this.image.removeAttribute(Qs.SRC):this.image.setAttribute(Qs.SRC,n)),e===Qs.PLACEHOLDER_SRC&&(n==null?ec(this.image):tc(this.image,n))}get placeholderSrc(){return F(this,Qs.PLACEHOLDER_SRC)}set placeholderSrc(e){I(this,Qs.SRC,e)}get src(){return F(this,Qs.SRC)}set src(e){I(this,Qs.SRC,e)}};nc.shadowRootOptions={mode:`open`},nc.getTemplateHTML=$s,O.customElements.get(`media-poster-image`)||O.customElements.define(`media-poster-image`,nc);var rc=nc,ic=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},ac=(e,t,n)=>(ic(e,t,`read from private field`),n?n.call(e):t.get(e)),oc=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},sc=(e,t,n,r)=>(ic(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),cc,lc=class extends so{constructor(){super(),oc(this,cc,void 0),sc(this,cc,this.shadowRoot.querySelector(`slot`))}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PREVIEW_CHAPTER,x.MEDIA_LANG]}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),(e===x.MEDIA_PREVIEW_CHAPTER||e===x.MEDIA_LANG)&&n!==t&&n!=null){if(ac(this,cc).textContent=n,n!==``){let e=D(`chapter: {chapterName}`,{chapterName:n});this.setAttribute(`aria-valuetext`,e)}else this.removeAttribute(`aria-valuetext`)}}get mediaPreviewChapter(){return F(this,x.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){I(this,x.MEDIA_PREVIEW_CHAPTER,e)}};cc=new WeakMap,O.customElements.get(`media-preview-chapter-display`)||O.customElements.define(`media-preview-chapter-display`,lc);var uc=lc,dc=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},fc=(e,t,n)=>(dc(e,t,`read from private field`),n?n.call(e):t.get(e)),pc=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},mc=(e,t,n,r)=>(dc(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),hc;function gc(e){return`
    <style>
      :host {
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-preview-thumbnail-display, inline-block));
        overflow: hidden;
      }

      img {
        display: none;
        position: relative;
      }
    </style>
    <img crossorigin loading="eager" decoding="async">
  `}var _c=class extends O.HTMLElement{constructor(){if(super(),pc(this,hc,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=ht(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[b.MEDIA_CONTROLLER,x.MEDIA_PREVIEW_IMAGE,x.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,t;let n=this.getAttribute(b.MEDIA_CONTROLLER);n&&(mc(this,hc,this.getRootNode()?.getElementById(n)),(t=(e=fc(this,hc))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=fc(this,hc))?.unassociateElement)==null||t.call(e,this),mc(this,hc,null)}attributeChangedCallback(e,t,n){var r,i,a,o;[x.MEDIA_PREVIEW_IMAGE,x.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===b.MEDIA_CONTROLLER&&(t&&((i=(r=fc(this,hc))?.unassociateElement)==null||i.call(r,this),mc(this,hc,null)),n&&this.isConnected&&(mc(this,hc,this.getRootNode()?.getElementById(n)),(o=(a=fc(this,hc))?.associateElement)==null||o.call(a,this)))}get mediaPreviewImage(){return F(this,x.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){I(this,x.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){let e=this.getAttribute(x.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(e=>+e)}set mediaPreviewCoords(e){e?this.setAttribute(x.MEDIA_PREVIEW_COORDS,e.join(` `)):this.removeAttribute(x.MEDIA_PREVIEW_COORDS)}update(){let e=this.mediaPreviewCoords,t=this.mediaPreviewImage;if(!(e&&t))return;let[n,r,i,a]=e,o=t.split(`#`)[0],s=getComputedStyle(this),{maxWidth:c,maxHeight:l,minWidth:u,minHeight:d}=s,f=s.getPropertyValue(`--media-preview-thumbnail-object-fit`).trim()||`contain`,p,m;if(f===`fill`){let e=parseInt(c)/i,t=parseInt(l)/a,n=parseInt(u)/i,r=parseInt(d)/a;p=e<1?e:Math.max(e,n),m=t<1?t:Math.max(t,r)}else{let e=Math.min(parseInt(c)/i,parseInt(l)/a),t=Math.max(parseInt(u)/i,parseInt(d)/a),n=e<1?e:t>1?t:1;p=n,m=n}let{style:h}=A(this.shadowRoot,`:host`),ee=A(this.shadowRoot,`img`).style,te=this.shadowRoot.querySelector(`img`),ne=Math.min(p,m)<1?`min`:`max`;h.setProperty(`${ne}-width`,`initial`,`important`),h.setProperty(`${ne}-height`,`initial`,`important`),h.width=`${i*p}px`,h.height=`${a*m}px`;let re=()=>{ee.width=`${this.imgWidth*p}px`,ee.height=`${this.imgHeight*m}px`,ee.display=`block`};te.src!==o&&(te.onload=()=>{this.imgWidth=te.naturalWidth,this.imgHeight=te.naturalHeight,re(),te.onload=null},te.src=o,re()),re(),ee.transform=`translate(-${n*p}px, -${r*m}px)`}};hc=new WeakMap,_c.shadowRootOptions={mode:`open`},_c.getTemplateHTML=gc,O.customElements.get(`media-preview-thumbnail`)||O.customElements.define(`media-preview-thumbnail`,_c);var vc=_c,yc=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},bc=(e,t,n)=>(yc(e,t,`read from private field`),n?n.call(e):t.get(e)),xc=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Sc=(e,t,n,r)=>(yc(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Cc,wc=class extends so{constructor(){super(),xc(this,Cc,void 0),Sc(this,Cc,this.shadowRoot.querySelector(`slot`)),bc(this,Cc).textContent=tt(0)}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_PREVIEW_TIME&&n!=null&&(bc(this,Cc).textContent=tt(parseFloat(n)))}get mediaPreviewTime(){return j(this,x.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){M(this,x.MEDIA_PREVIEW_TIME,e)}};Cc=new WeakMap,O.customElements.get(`media-preview-time-display`)||O.customElements.define(`media-preview-time-display`,wc);var Tc=wc,Ec={SEEK_OFFSET:`seekoffset`},Dc=30,Oc=e=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${e}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`;function kc(e,t){return`
    <slot name="icon">${Oc(t.seekOffset)}</slot>
  `}var Ac=(e,t)=>{e.setAttribute(`aria-label`,D(`seek back {seekOffset} seconds`,{seekOffset:t}))};function jc(){return D(`Seek backward`)}var Mc=0,Nc=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_CURRENT_TIME,Ec.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=j(this,Ec.SEEK_OFFSET,Dc)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),Ac(this,this.seekOffset),e===Ec.SEEK_OFFSET&&(this.seekOffset=j(this,Ec.SEEK_OFFSET,Dc))}get seekOffset(){return j(this,Ec.SEEK_OFFSET,Dc)}set seekOffset(e){M(this,Ec.SEEK_OFFSET,e),this.setAttribute(`aria-label`,D(`seek back {seekOffset} seconds`,{seekOffset:this.seekOffset})),vt(bt(this,`icon`),this.seekOffset)}get mediaCurrentTime(){return j(this,x.MEDIA_CURRENT_TIME,Mc)}set mediaCurrentTime(e){M(this,x.MEDIA_CURRENT_TIME,e)}handleClick(){let e=Math.max(this.mediaCurrentTime-this.seekOffset,0),t=new O.CustomEvent(y.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}};Nc.getSlotTemplateHTML=kc,Nc.getTooltipContentHTML=jc,O.customElements.get(`media-seek-backward-button`)||O.customElements.define(`media-seek-backward-button`,Nc);var Pc=Nc,Fc={SEEK_OFFSET:`seekoffset`},Ic=30,Lc=e=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${e}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`;function Rc(e,t){return`
    <slot name="icon">${Lc(t.seekOffset)}</slot>
  `}var zc=(e,t)=>{e.setAttribute(`aria-label`,D(`seek forward {seekOffset} seconds`,{seekOffset:t}))};function Bc(){return D(`Seek forward`)}var Vc=0,Hc=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_CURRENT_TIME,Fc.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=j(this,Fc.SEEK_OFFSET,Ic)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),zc(this,this.seekOffset),e===Fc.SEEK_OFFSET&&(this.seekOffset=j(this,Fc.SEEK_OFFSET,Ic))}get seekOffset(){return j(this,Fc.SEEK_OFFSET,Ic)}set seekOffset(e){M(this,Fc.SEEK_OFFSET,e),this.setAttribute(`aria-label`,D(`seek forward {seekOffset} seconds`,{seekOffset:this.seekOffset})),vt(bt(this,`icon`),this.seekOffset)}get mediaCurrentTime(){return j(this,x.MEDIA_CURRENT_TIME,Vc)}set mediaCurrentTime(e){M(this,x.MEDIA_CURRENT_TIME,e)}handleClick(){let e=this.mediaCurrentTime+this.seekOffset,t=new O.CustomEvent(y.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}};Hc.getSlotTemplateHTML=Rc,Hc.getTooltipContentHTML=Bc,O.customElements.get(`media-seek-forward-button`)||O.customElements.define(`media-seek-forward-button`,Hc);var Uc=Hc,Wc=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Gc=(e,t,n)=>(Wc(e,t,`read from private field`),n?n.call(e):t.get(e)),Kc=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},qc=(e,t,n,r)=>(Wc(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Jc=(e,t,n)=>(Wc(e,t,`access private method`),n),Yc,Xc,Zc,Qc,$c,el,tl,nl,rl,il,al,ol={REMAINING:`remaining`,SHOW_DURATION:`showduration`,NO_TOGGLE:`notoggle`},sl=[...Object.values(ol),x.MEDIA_CURRENT_TIME,x.MEDIA_DURATION,x.MEDIA_SEEKABLE],cl=[`Enter`,` `],ll=`&nbsp;/&nbsp;`,ul=(e,{timesSep:t=ll}={})=>{let n=e.mediaCurrentTime??0,[,r]=e.mediaSeekable??[],i=0;Number.isFinite(e.mediaDuration)?i=e.mediaDuration:Number.isFinite(r)&&(i=r);let a=e.remaining?tt(0-(i-n)):tt(n);return e.showDuration?`${a}${t}${tt(i)}`:a},dl=e=>{let t=e.mediaCurrentTime,[,n]=e.mediaSeekable??[],r=null;if(Number.isFinite(e.mediaDuration)?r=e.mediaDuration:Number.isFinite(n)&&(r=n),t==null||r===null){e.setAttribute(`aria-description`,D(`video not loaded, unknown time.`));return}let i=e.remaining?et(0-(r-t)):et(t);if(!e.showDuration){e.setAttribute(`aria-description`,i);return}let a=D(`{currentTime} of {totalTime}`,{currentTime:i,totalTime:et(r)});e.setAttribute(`aria-description`,a)};function fl(e,t){return`
    <slot>${ul(t)}</slot>
  `}var pl=e=>{e.setAttribute(`aria-label`,D(`playback time`))},ml=class extends so{constructor(){super(),Kc(this,Qc),Kc(this,el),Kc(this,nl),Kc(this,il),Kc(this,Yc,void 0),Kc(this,Xc,null),Kc(this,Zc,e=>{let{metaKey:t,altKey:n,key:r}=e;t||n||!cl.includes(r)?this.removeEventListener(`keyup`,Gc(this,Xc)):this.addEventListener(`keyup`,Gc(this,Xc))}),qc(this,Yc,this.shadowRoot.querySelector(`slot`)),Gc(this,Yc).innerHTML=`${ul(this)}`}static get observedAttributes(){return[...super.observedAttributes,...sl,`disabled`]}connectedCallback(){let{style:e}=A(this.shadowRoot,`:host(:hover:not([notoggle]))`);e.setProperty(`cursor`,`var(--media-cursor, pointer)`),e.setProperty(`background`,`var(--media-control-hover-background, rgba(50 50 70 / .7))`),this.setAttribute(`aria-label`,D(`playback time`)),Jc(this,nl,rl).call(this),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute(`remaining`)?this.removeAttribute(`remaining`):this.setAttribute(`remaining`,``))}disconnectedCallback(){this.disable(),Jc(this,el,tl).call(this),super.disconnectedCallback()}attributeChangedCallback(e,t,n){pl(this),sl.includes(e)?this.update():e===`disabled`&&n!==t?n==null?Jc(this,nl,rl).call(this):Jc(this,il,al).call(this):e===ol.NO_TOGGLE&&n!==t&&(this.noToggle?Jc(this,il,al).call(this):Jc(this,nl,rl).call(this)),super.attributeChangedCallback(e,t,n)}enable(){this.noToggle||(this.tabIndex=0)}disable(){this.tabIndex=-1}get remaining(){return N(this,ol.REMAINING)}set remaining(e){P(this,ol.REMAINING,e)}get showDuration(){return N(this,ol.SHOW_DURATION)}set showDuration(e){P(this,ol.SHOW_DURATION,e)}get noToggle(){return N(this,ol.NO_TOGGLE)}set noToggle(e){P(this,ol.NO_TOGGLE,e)}get mediaDuration(){return j(this,x.MEDIA_DURATION)}set mediaDuration(e){M(this,x.MEDIA_DURATION,e)}get mediaCurrentTime(){return j(this,x.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){M(this,x.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){let e=this.getAttribute(x.MEDIA_SEEKABLE);if(e)return e.split(`:`).map(e=>+e)}set mediaSeekable(e){e==null?this.removeAttribute(x.MEDIA_SEEKABLE):this.setAttribute(x.MEDIA_SEEKABLE,e.join(`:`))}update(){let e=ul(this);dl(this),e!==Gc(this,Yc).innerHTML&&(Gc(this,Yc).innerHTML=e)}};Yc=new WeakMap,Xc=new WeakMap,Zc=new WeakMap,Qc=new WeakSet,$c=function(){Gc(this,Xc)||(qc(this,Xc,e=>{let{key:t}=e;cl.includes(t)?this.toggleTimeDisplay():this.removeEventListener(`keyup`,Gc(this,Xc))}),this.addEventListener(`keydown`,Gc(this,Zc)),this.addEventListener(`click`,this.toggleTimeDisplay))},el=new WeakSet,tl=function(){Gc(this,Xc)&&(this.removeEventListener(`keyup`,Gc(this,Xc)),this.removeEventListener(`keydown`,Gc(this,Zc)),this.removeEventListener(`click`,this.toggleTimeDisplay),qc(this,Xc,null))},nl=new WeakSet,rl=function(){!this.noToggle&&!this.hasAttribute(`disabled`)&&(this.setAttribute(`role`,`button`),this.enable(),Jc(this,Qc,$c).call(this))},il=new WeakSet,al=function(){this.removeAttribute(`role`),this.disable(),Jc(this,el,tl).call(this)},ml.getSlotTemplateHTML=fl,O.customElements.get(`media-time-display`)||O.customElements.define(`media-time-display`,ml);var hl=ml,gl=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Y=(e,t,n)=>(gl(e,t,`read from private field`),n?n.call(e):t.get(e)),_l=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},vl=(e,t,n,r)=>(gl(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),yl=(e,t,n,r)=>({set _(r){vl(e,t,r,n)},get _(){return Y(e,t,r)}}),bl,xl,Sl,Cl,wl,Tl,El,Dl,Ol,kl,Al=class{constructor(e,t,n){_l(this,bl,void 0),_l(this,xl,void 0),_l(this,Sl,void 0),_l(this,Cl,void 0),_l(this,wl,void 0),_l(this,Tl,void 0),_l(this,El,void 0),_l(this,Dl,void 0),_l(this,Ol,0),_l(this,kl,(e=performance.now())=>{vl(this,Ol,requestAnimationFrame(Y(this,kl))),vl(this,Cl,performance.now()-Y(this,Sl));let t=1e3/this.fps;if(Y(this,Cl)>t){vl(this,Sl,e-Y(this,Cl)%t);let n=1e3/((e-Y(this,xl))/++yl(this,wl)._),r=(e-Y(this,Tl))/1e3/this.duration,i=Y(this,El)+r*this.playbackRate;i-Y(this,bl).valueAsNumber>0?vl(this,Dl,this.playbackRate/this.duration/n):(vl(this,Dl,.995*Y(this,Dl)),i=Y(this,bl).valueAsNumber+Y(this,Dl)),this.callback(i)}}),vl(this,bl,e),this.callback=t,this.fps=n}start(){Y(this,Ol)===0&&(vl(this,Sl,performance.now()),vl(this,xl,Y(this,Sl)),vl(this,wl,0),Y(this,kl).call(this))}stop(){Y(this,Ol)!==0&&(cancelAnimationFrame(Y(this,Ol)),vl(this,Ol,0))}update({start:e,duration:t,playbackRate:n}){let r=e-Y(this,bl).valueAsNumber,i=Math.abs(t-this.duration);(r>0||r<-.5/t||i>=.5)&&this.callback(e),vl(this,El,e),vl(this,Tl,performance.now()),this.duration=t,this.playbackRate=n}};bl=new WeakMap,xl=new WeakMap,Sl=new WeakMap,Cl=new WeakMap,wl=new WeakMap,Tl=new WeakMap,El=new WeakMap,Dl=new WeakMap,Ol=new WeakMap,kl=new WeakMap;var jl=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},X=(e,t,n)=>(jl(e,t,`read from private field`),n?n.call(e):t.get(e)),Z=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Ml=(e,t,n,r)=>(jl(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Nl=(e,t,n)=>(jl(e,t,`access private method`),n),Pl,Fl,Il,Ll,Rl,zl,Bl,Vl,Hl,Ul,Wl,Gl,Kl,ql,Jl,Yl,Xl,Zl,Ql,$l,eu,tu,nu,ru,iu,au,ou=e=>{let t=e.range,n=et(+lu(e)),r=et(+e.mediaSeekableEnd),i=n&&r?D(`{currentTime} of {totalTime}`,{currentTime:n,totalTime:r}):D(`video not loaded, unknown time.`);t.setAttribute(`aria-valuetext`,i)};function su(e){return`
    <style>
      :host {
        --media-box-border-radius: 4px;
        --media-box-padding-left: 10px;
        --media-box-padding-right: 10px;
        --media-preview-border-radius: var(--media-box-border-radius);
        --media-box-arrow-offset: var(--media-box-border-radius);
        --_control-background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        --_preview-background: var(--media-preview-background, var(--_control-background));

        
        contain: layout;
      }

      #buffered {
        background: var(--media-time-range-buffered-color, rgb(255 255 255 / .4));
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #preview-rail,
      #current-rail {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 100%;
        pointer-events: none;
        will-change: transform;
      }

      [part~="box"] {
        width: min-content;
        
        position: absolute;
        bottom: 100%;
        flex-direction: column;
        align-items: center;
        transform: translateX(-50%);
      }

      [part~="current-box"] {
        display: var(--media-current-box-display, var(--media-box-display, flex));
        margin: var(--media-current-box-margin, var(--media-box-margin, 0 0 5px));
        visibility: hidden;
      }

      [part~="preview-box"] {
        display: var(--media-preview-box-display, var(--media-box-display, flex));
        margin: var(--media-preview-box-margin, var(--media-box-margin, 0 0 5px));
        transition-property: var(--media-preview-transition-property, visibility, opacity);
        transition-duration: var(--media-preview-transition-duration-out, .25s);
        transition-delay: var(--media-preview-transition-delay-out, 0s);
        visibility: hidden;
        opacity: 0;
      }

      :host(:is([${x.MEDIA_PREVIEW_IMAGE}], [${x.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }

      @media (hover: hover) {
        :host(:is([${x.MEDIA_PREVIEW_IMAGE}], [${x.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
          transition-duration: var(--media-preview-transition-duration-in, .5s);
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
          opacity: 1;
        }
      }

      media-preview-thumbnail,
      ::slotted(media-preview-thumbnail) {
        visibility: hidden;
        
        transition: visibility 0s .25s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-thumbnail-background, var(--_preview-background));
        box-shadow: var(--media-preview-thumbnail-box-shadow, 0 0 4px rgb(0 0 0 / .2));
        max-width: var(--media-preview-thumbnail-max-width, 180px);
        max-height: var(--media-preview-thumbnail-max-height, 160px);
        min-width: var(--media-preview-thumbnail-min-width, 120px);
        min-height: var(--media-preview-thumbnail-min-height, 80px);
        border: var(--media-preview-thumbnail-border);
        border-radius: var(--media-preview-thumbnail-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius) 0 0);
      }

      :host([${x.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
      :host([${x.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      @media (hover: hover) {
        :host([${x.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
        :host([${x.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
        }

        :host([${x.MEDIA_PREVIEW_TIME}]:hover) {
          --media-time-range-hover-display: block;
        }
      }

      media-preview-chapter-display,
      ::slotted(media-preview-chapter-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        visibility: hidden;
        
        transition: min-width 0s, border-radius 0s, margin 0s, padding 0s, visibility 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-chapter-background, var(--_preview-background));
        border-radius: var(--media-preview-chapter-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-chapter-padding, 3.5px 9px);
        margin: var(--media-preview-chapter-margin, 0 0 5px);
        text-shadow: var(--media-preview-chapter-text-shadow, 0 0 4px rgb(0 0 0 / .75));
      }

      :host([${x.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
      :host([${x.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-chapter-border-radius, 0);
        padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
        margin: var(--media-preview-chapter-margin, 0);
        min-width: 100%;
      }

      media-preview-chapter-display[${x.MEDIA_PREVIEW_CHAPTER}],
      ::slotted(media-preview-chapter-display[${x.MEDIA_PREVIEW_CHAPTER}]) {
        visibility: visible;
      }

      media-preview-chapter-display:not([aria-valuetext]),
      ::slotted(media-preview-chapter-display:not([aria-valuetext])) {
        display: none;
      }

      media-preview-time-display,
      ::slotted(media-preview-time-display),
      media-time-display,
      ::slotted(media-time-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        
        transition: min-width 0s, border-radius 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-time-background, var(--_preview-background));
        border-radius: var(--media-preview-time-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-time-padding, 3.5px 9px);
        margin: var(--media-preview-time-margin, 0);
        text-shadow: var(--media-preview-time-text-shadow, 0 0 4px rgb(0 0 0 / .75));
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50%)
        ));
      }

      :host([${x.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
      :host([${x.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-time-border-radius,
          0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
        min-width: 100%;
      }

      :host([${x.MEDIA_PREVIEW_TIME}]:hover) {
        --media-time-range-hover-display: block;
      }

      [part~="arrow"],
      ::slotted([part~="arrow"]) {
        display: var(--media-box-arrow-display, inline-block);
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2 + var(--media-box-arrow-offset)),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50% - var(--media-box-arrow-offset))
        ));
        
        border-color: transparent;
        border-top-color: var(--media-box-arrow-background, var(--_control-background));
        border-width: var(--media-box-arrow-border-width,
          var(--media-box-arrow-height, 5px) var(--media-box-arrow-width, 6px) 0);
        border-style: solid;
        justify-content: center;
        height: 0;
      }
    </style>
    <div id="preview-rail">
      <slot name="preview" part="box preview-box">
        <media-preview-thumbnail>
          <template shadowrootmode="${vc.shadowRootOptions.mode}">
            ${vc.getTemplateHTML({})}
          </template>
        </media-preview-thumbnail>
        <media-preview-chapter-display></media-preview-chapter-display>
        <media-preview-time-display></media-preview-time-display>
        <slot name="preview-arrow"><div part="arrow"></div></slot>
      </slot>
    </div>
    <div id="current-rail">
      <slot name="current" part="box current-box">
        
      </slot>
    </div>
  `}var cu=(e,t=e.mediaCurrentTime)=>{let n=Number.isFinite(e.mediaSeekableStart)?e.mediaSeekableStart:0,r=Number.isFinite(e.mediaDuration)?e.mediaDuration:e.mediaSeekableEnd;if(Number.isNaN(r))return 0;let i=(t-n)/(r-n);return Math.max(0,Math.min(i,1))},lu=(e,t=e.range.valueAsNumber)=>{let n=Number.isFinite(e.mediaSeekableStart)?e.mediaSeekableStart:0,r=Number.isFinite(e.mediaDuration)?e.mediaDuration:e.mediaSeekableEnd;return Number.isNaN(r)?0:t*(r-n)+n},uu=class extends Wa{constructor(){super(),Z(this,Gl),Z(this,Jl),Z(this,Xl),Z(this,Ql),Z(this,eu),Z(this,nu),Z(this,iu),Z(this,Pl,null),Z(this,Fl,void 0),Z(this,Il,void 0),Z(this,Ll,void 0),Z(this,Rl,void 0),Z(this,zl,void 0),Z(this,Bl,void 0),Z(this,Vl,void 0),Z(this,Hl,void 0),Z(this,Ul,void 0),Z(this,Wl,()=>{Nl(this,Gl,Kl).call(this)?X(this,Fl).start():X(this,Fl).stop()}),Z(this,ql,e=>{this.dragging||(Ge(e)&&(this.range.valueAsNumber=e),X(this,Ul)||this.updateBar())}),this.shadowRoot.querySelector(`#track`).insertAdjacentHTML(`afterbegin`,`<div id="buffered" part="buffered"></div>`),Ml(this,Il,this.shadowRoot.querySelectorAll(`[part~="box"]`)),Ml(this,Rl,this.shadowRoot.querySelector(`[part~="preview-box"]`)),Ml(this,zl,this.shadowRoot.querySelector(`[part~="current-box"]`));let e=getComputedStyle(this);Ml(this,Bl,parseInt(e.getPropertyValue(`--media-box-padding-left`))),Ml(this,Vl,parseInt(e.getPropertyValue(`--media-box-padding-right`))),Ml(this,Fl,new Al(this.range,X(this,ql),60))}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PAUSED,x.MEDIA_DURATION,x.MEDIA_SEEKABLE,x.MEDIA_CURRENT_TIME,x.MEDIA_PREVIEW_IMAGE,x.MEDIA_PREVIEW_TIME,x.MEDIA_PREVIEW_CHAPTER,x.MEDIA_BUFFERED,x.MEDIA_PLAYBACK_RATE,x.MEDIA_LOADING,x.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute(`aria-label`,D(`seek`)),X(this,Wl).call(this),Ml(this,Pl,this.getRootNode()),(e=X(this,Pl))==null||e.addEventListener(`transitionstart`,this)}disconnectedCallback(){var e;super.disconnectedCallback(),X(this,Fl).stop(),(e=X(this,Pl))==null||e.removeEventListener(`transitionstart`,this),Ml(this,Pl,null)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),t!=n&&(e===x.MEDIA_CURRENT_TIME||e===x.MEDIA_PAUSED||e===x.MEDIA_ENDED||e===x.MEDIA_LOADING||e===x.MEDIA_DURATION||e===x.MEDIA_SEEKABLE?(X(this,Fl).update({start:cu(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),X(this,Wl).call(this),ou(this)):e===x.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===x.MEDIA_DURATION||e===x.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=X(this,Hl),this.updateBar()))}get mediaChaptersCues(){return X(this,Hl)}set mediaChaptersCues(e){Ml(this,Hl,e),this.updateSegments(X(this,Hl)?.map(e=>({start:cu(this,e.startTime),end:cu(this,e.endTime)})))}get mediaPaused(){return N(this,x.MEDIA_PAUSED)}set mediaPaused(e){P(this,x.MEDIA_PAUSED,e)}get mediaLoading(){return N(this,x.MEDIA_LOADING)}set mediaLoading(e){P(this,x.MEDIA_LOADING,e)}get mediaDuration(){return j(this,x.MEDIA_DURATION)}set mediaDuration(e){M(this,x.MEDIA_DURATION,e)}get mediaCurrentTime(){return j(this,x.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){M(this,x.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return j(this,x.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){M(this,x.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){let e=this.getAttribute(x.MEDIA_BUFFERED);return e?e.split(` `).map(e=>e.split(`:`).map(e=>+e)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(x.MEDIA_BUFFERED);return}let t=e.map(e=>e.join(`:`)).join(` `);this.setAttribute(x.MEDIA_BUFFERED,t)}get mediaSeekable(){let e=this.getAttribute(x.MEDIA_SEEKABLE);if(e)return e.split(`:`).map(e=>+e)}set mediaSeekable(e){e==null?this.removeAttribute(x.MEDIA_SEEKABLE):this.setAttribute(x.MEDIA_SEEKABLE,e.join(`:`))}get mediaSeekableEnd(){let[,e=this.mediaDuration]=this.mediaSeekable??[];return e}get mediaSeekableStart(){let[e=0]=this.mediaSeekable??[];return e}get mediaPreviewImage(){return F(this,x.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){I(this,x.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return j(this,x.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){M(this,x.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return N(this,x.MEDIA_ENDED)}set mediaEnded(e){P(this,x.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){let e=this.mediaBuffered;if(!e.length)return;let t;if(this.mediaEnded)t=1;else{let n=this.mediaCurrentTime,[,r=this.mediaSeekableStart]=e.find(([e,t])=>e<=n&&n<=t)??[];t=cu(this,r)}let{style:n}=A(this.shadowRoot,`#buffered`);n.setProperty(`width`,`${t*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector(`slot[name="current"]`).assignedElements().length)return;let e=A(this.shadowRoot,`#current-rail`),t=A(this.shadowRoot,`[part~="current-box"]`),n=Nl(this,Jl,Yl).call(this,X(this,zl)),r=Nl(this,Xl,Zl).call(this,n,this.range.valueAsNumber),i=Nl(this,Ql,$l).call(this,n,this.range.valueAsNumber);e.style.transform=`translateX(${r})`,e.style.setProperty(`--_range-width`,`${n.range.width}`),t.style.setProperty(`--_box-shift`,`${i}`),t.style.setProperty(`--_box-width`,`${n.box.width}px`),t.style.setProperty(`visibility`,`initial`)}handleEvent(e){switch(super.handleEvent(e),e.type){case`input`:Nl(this,iu,au).call(this);break;case`pointermove`:Nl(this,eu,tu).call(this,e);break;case`pointerup`:X(this,Ul)&&Ml(this,Ul,!1);break;case`pointerdown`:Ml(this,Ul,!0);break;case`pointerleave`:Nl(this,nu,ru).call(this,null);break;case`transitionstart`:xt(e.target,this)&&setTimeout(()=>X(this,Wl).call(this),0)}}};Pl=new WeakMap,Fl=new WeakMap,Il=new WeakMap,Ll=new WeakMap,Rl=new WeakMap,zl=new WeakMap,Bl=new WeakMap,Vl=new WeakMap,Hl=new WeakMap,Ul=new WeakMap,Wl=new WeakMap,Gl=new WeakSet,Kl=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&Tt(this)},ql=new WeakMap,Jl=new WeakSet,Yl=function(e){let t=((this.getAttribute(`bounds`)?St(this,`#${this.getAttribute(`bounds`)}`):this.parentElement)??this).getBoundingClientRect(),n=this.range.getBoundingClientRect(),r=e.offsetWidth;return{box:{width:r,min:-(n.left-t.left-r/2),max:t.right-n.left-r/2},bounds:t,range:n}},Xl=new WeakSet,Zl=function(e,t){let n=`${t*100}%`,{width:r,min:i,max:a}=e.box;if(!r)return n;if(Number.isNaN(i)||(n=`max(${`calc(1 / var(--_range-width) * 100 * ${i}% + var(--media-box-padding-left))`}, ${n})`),!Number.isNaN(a)){let e=`calc(1 / var(--_range-width) * 100 * ${a}% - var(--media-box-padding-right))`;n=`min(${n}, ${e})`}return n},Ql=new WeakSet,$l=function(e,t){let{width:n,min:r,max:i}=e.box,a=t*e.range.width;if(a<r+X(this,Bl)){let t=e.range.left-e.bounds.left-X(this,Bl);return`${a-n/2+t}px`}if(a>i-X(this,Vl)){let t=e.bounds.right-e.range.right-X(this,Vl);return`${a+n/2-t-e.range.width}px`}return 0},eu=new WeakSet,tu=function(e){let t=[...X(this,Il)].some(t=>e.composedPath().includes(t));if(!this.dragging&&(t||!e.composedPath().includes(this))){Nl(this,nu,ru).call(this,null);return}let n=this.mediaSeekableEnd;if(!n)return;let r=A(this.shadowRoot,`#preview-rail`),i=A(this.shadowRoot,`[part~="preview-box"]`),a=Nl(this,Jl,Yl).call(this,X(this,Rl)),o=(e.clientX-a.range.left)/a.range.width;o=Math.max(0,Math.min(1,o));let s=Nl(this,Xl,Zl).call(this,a,o),c=Nl(this,Ql,$l).call(this,a,o);r.style.transform=`translateX(${s})`,r.style.setProperty(`--_range-width`,`${a.range.width}`),i.style.setProperty(`--_box-shift`,`${c}`),i.style.setProperty(`--_box-width`,`${a.box.width}px`);let l=Math.round(X(this,Ll))-Math.round(o*n);Math.abs(l)<1&&o>.01&&o<.99||(Ml(this,Ll,o*n),Nl(this,nu,ru).call(this,X(this,Ll)))},nu=new WeakSet,ru=function(e){this.dispatchEvent(new O.CustomEvent(y.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:e}))},iu=new WeakSet,au=function(){X(this,Fl).stop();let e=lu(this);this.dispatchEvent(new O.CustomEvent(y.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e}))},uu.shadowRootOptions={mode:`open`},uu.getContainerTemplateHTML=su,O.customElements.get(`media-time-range`)||O.customElements.define(`media-time-range`,uu);var du=uu,fu=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},pu=(e,t,n)=>(fu(e,t,`read from private field`),n?n.call(e):t.get(e)),mu=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},hu,gu=1,_u=e=>e.mediaMuted?0:e.mediaVolume,vu=e=>`${Math.round(e*100)}%`,yu=class extends Wa{constructor(){super(...arguments),mu(this,hu,()=>{let e=this.range.value,t=new O.CustomEvent(y.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)})}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_VOLUME,x.MEDIA_MUTED,x.MEDIA_VOLUME_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),this.range.setAttribute(`aria-label`,D(`volume`)),this.range.addEventListener(`input`,pu(this,hu))}disconnectedCallback(){this.range.removeEventListener(`input`,pu(this,hu)),super.disconnectedCallback()}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),(e===x.MEDIA_VOLUME||e===x.MEDIA_MUTED)&&(this.range.valueAsNumber=_u(this),this.range.setAttribute(`aria-valuetext`,vu(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return j(this,x.MEDIA_VOLUME,gu)}set mediaVolume(e){M(this,x.MEDIA_VOLUME,e)}get mediaMuted(){return N(this,x.MEDIA_MUTED)}set mediaMuted(e){P(this,x.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return F(this,x.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){I(this,x.MEDIA_VOLUME_UNAVAILABLE,e)}};hu=new WeakMap,O.customElements.get(`media-volume-range`)||O.customElements.define(`media-volume-range`,yu);var bu=yu;function xu(e){return`
      <style>
        :host {
          min-width: 4ch;
          padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          font-weight: var(--media-button-font-weight, normal);
        }

        #checked-indicator {
          display: none;
        }

        :host([${x.MEDIA_LOOP}]) #checked-indicator {
          display: block;
        }
      </style>
      
      <span id="icon">
     </span>

      <div id="checked-indicator">
        <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
          <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
        </svg>
      </div>
    `}function Su(){return D(`Loop`)}var Cu=class extends K{constructor(){super(...arguments),this.container=null}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_LOOP]}connectedCallback(){super.connectedCallback(),this.container=this.shadowRoot?.querySelector(`#icon`)||null,this.container&&(this.container.textContent=D(`Loop`))}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_LOOP&&this.container&&this.setAttribute(`aria-checked`,this.mediaLoop?`true`:`false`)}get mediaLoop(){return N(this,x.MEDIA_LOOP)}set mediaLoop(e){P(this,x.MEDIA_LOOP,e)}handleClick(){let e=!this.mediaLoop,t=new O.CustomEvent(y.MEDIA_LOOP_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}};Cu.getSlotTemplateHTML=xu,Cu.getTooltipContentHTML=Su,O.customElements.get(`media-loop-button`)||O.customElements.define(`media-loop-button`,Cu);var wu=Cu;function Q(e){if(typeof e==`boolean`)return e?``:void 0;if(typeof e!=`function`){if(Array.isArray(e)&&e.every(e=>typeof e==`string`||typeof e==`number`||typeof e==`boolean`))return e.join(` `);if(!(typeof e==`object`&&e))return e}}v({tagName:`media-gesture-receiver`,elementClass:It,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-container`,elementClass:hn,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var Tu=v({tagName:`media-controller`,elementClass:ei,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-tooltip`,elementClass:ii,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-chrome-button`,elementClass:bi,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-airplay-button`,elementClass:Ei,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var Eu=v({tagName:`media-captions-button`,elementClass:Fi,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-cast-button`,elementClass:Hi,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-chrome-dialog`,elementClass:pa,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-chrome-range`,elementClass:Ga,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var Du=v({tagName:`media-control-bar`,elementClass:$a,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-text-display`,elementClass:co,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-duration-display`,elementClass:_o,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-error-dialog`,elementClass:jo,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-keyboard-shortcuts-dialog`,elementClass:Bo,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var Ou=v({tagName:`media-fullscreen-button`,elementClass:Qo,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-live-button`,elementClass:ss,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-loading-indicator`,elementClass:ys,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var ku=v({tagName:`media-mute-button`,elementClass:Ds,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Au=v({tagName:`media-pip-button`,elementClass:Ns,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),ju=v({tagName:`media-playback-rate-button`,elementClass:Ws,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Mu=v({tagName:`media-play-button`,elementClass:Zs,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-poster-image`,elementClass:rc,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-preview-chapter-display`,elementClass:uc,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-preview-thumbnail`,elementClass:vc,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-preview-time-display`,elementClass:Tc,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var Nu=v({tagName:`media-seek-backward-button`,elementClass:Pc,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Pu=v({tagName:`media-seek-forward-button`,elementClass:Uc,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Fu=v({tagName:`media-time-display`,elementClass:hl,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Iu=v({tagName:`media-time-range`,elementClass:du,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Lu=v({tagName:`media-volume-range`,elementClass:bu,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-loop-button`,elementClass:wu,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var $=n(),Ru={noTooltip:!0};function zu({isMobile:e,showPip:t,showCaptionsButton:n,topChrome:r,extraControls:i,children:a,className:o,style:s}){return(0,$.jsxs)(Tu,{className:`ts-player ${o||``}`.trim(),autohide:`2`,style:s,children:[a,(0,$.jsx)(`div`,{slot:`top-chrome`,className:`ts-player-top`,children:r}),(0,$.jsxs)(Du,{className:`ts-player-bar`,children:[(0,$.jsx)(Mu,{...Ru,className:e?`ts-player-play-lg`:void 0}),(0,$.jsx)(Nu,{...Ru,seekOffset:10}),(0,$.jsx)(Pu,{...Ru,seekOffset:10}),(0,$.jsx)(Fu,{showDuration:!0}),(0,$.jsx)(Iu,{}),(0,$.jsx)(ku,{...Ru}),e?null:(0,$.jsx)(Lu,{}),i,n?(0,$.jsx)(Eu,{...Ru}):null,(0,$.jsx)(ju,{...Ru,rates:[.75,1,1.25,1.5,2]}),t?(0,$.jsx)(Au,{...Ru}):null,(0,$.jsx)(Ou,{...Ru})]})]})}var Bu=e=>!!(e.canPlayType(`application/vnd.apple.mpegurl`)||e.canPlayType(`application/x-mpegURL`));function Vu({enabled:e,open:t,videoRef:n,videoEpoch:r,src:i,playbackRate:a=1,onLoading:o,onError:s,onNotSupported:c,onSubtitleTracks:l,onSubtitleTrack:u,onDuration:d}){let m=(0,g.useRef)(null),h=(0,g.useRef)(o),ee=(0,g.useRef)(s),te=(0,g.useRef)(c),ne=(0,g.useRef)(l),re=(0,g.useRef)(u),ie=(0,g.useRef)(d);return(0,g.useEffect)(()=>{h.current=o,ee.current=s,te.current=c,ne.current=l,re.current=u,ie.current=d}),(0,g.useEffect)(()=>{let r=n.current;if(!e||!t||!r||!i)return;let o=null,s=!1;h.current?.(!0),ne.current?.([]);let c=()=>{let e=(o?.subtitleTracks||[]).map((e,t)=>({id:t,name:e.name,lang:e.lang}));ne.current?.(e)};if(Ee.isSupported()){let e=f();o=new Ee({xhrSetup:t=>{e&&t.setRequestHeader(`Authorization`,e)}}),m.current=o,o.on(Ee.Events.MANIFEST_PARSED,()=>{c(),re.current?.(o?.subtitleTrack??-1),r.playbackRate=a,r.play().catch(()=>{})}),o.on(Ee.Events.LEVEL_LOADED,(e,t)=>{let n=t.details?.totalduration;typeof n==`number`&&ie.current?.(n)}),o.on(Ee.Events.SUBTITLE_TRACKS_UPDATED,c),o.on(Ee.Events.SUBTITLE_TRACK_SWITCH,(e,t)=>re.current?.(t.id)),o.on(Ee.Events.ERROR,(e,t)=>{t.fatal&&o&&(t.type===Ee.ErrorTypes.NETWORK_ERROR?o.startLoad():t.type===Ee.ErrorTypes.MEDIA_ERROR?o.recoverMediaError():(o.stopLoad(),h.current?.(!1),ee.current?.()))}),o.loadSource(i),o.attachMedia(r)}else Bu(r)?(s=!0,r.src=p(i),r.load(),r.playbackRate=a,r.play().catch(()=>{})):te.current?.();return()=>{m.current===o&&(m.current=null),o?.destroy(),s&&(r.pause(),r.removeAttribute(`src`),r.load()),ne.current?.([]),re.current?.(-1)}},[e,t,n,r,i]),m}var Hu=5e3,Uu=5;function Wu({enabled:e,hash:t,fileIndex:n,title:r,initialTimecode:i=0,videoRef:a,onViewedChange:o}){let s=(0,g.useRef)(0),c=(0,g.useRef)(!1),l=(0,g.useRef)(o);(0,g.useEffect)(()=>{l.current=o},[o]),(0,g.useEffect)(()=>{c.current=!1},[t,n,i]);let u=(0,g.useCallback)(async i=>{if(e&&t&&n!=null)try{await _e(t,n,i),xe({hash:t,fileIndex:n,title:r||t,fileName:r||String(n),timecode:i}),l.current?.()}catch{}},[e,t,n,r]);return{flushTimecode:(0,g.useCallback)(()=>{let t=a.current;t&&e&&u(t.currentTime)},[a,e,u]),onTimeUpdate:(0,g.useCallback)(()=>{let t=a.current;if(!t||!e)return;let n=Date.now();n-s.current<Hu||(s.current=n,u(t.currentTime))},[a,e,u]),applyResumeIfNeeded:(0,g.useCallback)(()=>{let e=a.current;if(!e||c.current)return;if(!(i>Uu)){c.current=!0;return}let t=e.duration;Number.isFinite(t)&&t>0&&i>=t-Uu||(e.currentTime=i),c.current=!0},[a,i]),saveTimecode:u}}var Gu=3e4;function Ku({tip:e,children:t}){return(0,$.jsx)(`span`,{className:`inline-flex min-w-0 max-w-full items-center gap-1`,title:e,children:t})}function qu(e){switch(e.split(`?`)[0].split(`.`).pop()?.toLowerCase()){case`mp4`:return`video/mp4`;case`ogg`:case`ogv`:return`video/ogg`;case`webm`:return`video/webm`;default:return``}}var Ju=e=>!!(e.canPlayType(`application/vnd.apple.mpegurl`)||e.canPlayType(`application/x-mpegURL`)),Yu=()=>typeof document<`u`&&`pictureInPictureEnabled`in document&&!!document.pictureInPictureEnabled;function Xu({videoSrc:e,downloadSrc:n=e,title:r,onNotSupported:f,hls:h=!1,heartbeatSrc:_e=``,showTrigger:xe=!0,inlineTrigger:De=!1,inlineTriggerPrimary:ke=!1,initiallyOpen:Me=!1,onClose:Ne,captionSrc:Pe,hash:_,fileIndex:v,initialTimecode:Fe=0,trackTimecode:y=!1,onViewedChange:b,audioTracks:Ie=[],audioIndex:Le=0,onAudioIndexChange:x}){let{t:S}=re(),C=be(),{setImmersive:w}=u(),Re=(0,g.useRef)(null),ze=(0,g.useRef)(f),T=(0,g.useRef)(null),[E,Be]=(0,g.useState)(Me),[Ve,He]=(0,g.useState)(0),[Ue,We]=(0,g.useState)(!0),[Ge,Ke]=(0,g.useState)(!1),[qe,Je]=(0,g.useState)(!1),[Ye,Xe]=(0,g.useState)(!1),[Ze,D]=(0,g.useState)([]),[Qe,$e]=(0,g.useState)(!1),[et,tt]=(0,g.useState)(Le),[nt,rt]=(0,g.useState)(e),[it,at]=(0,g.useState)(Ie),{data:ot}=Te(E?_:void 0),st=we(_,{enabled:E&&!!_,fast:!1}),ct=!!(_&&v!=null&&y),lt=h&&!!_&&v!=null&&it.length>1,O=Yu(),k=h?Ze.length>0:!!Pe,ut=C?me:Ye?ge:de,dt=C?void 0:Ye?`min(86dvh, calc(100dvh - 4rem))`:`min(72dvh, 40rem)`,ft=(0,g.useCallback)(e=>{Re.current=e,He(e=>e+1)},[]);(0,g.useEffect)(()=>{ze.current=f},[f]),(0,g.useEffect)(()=>{rt(e),tt(Le),at(Ie),Ke(!1),We(!0)},[e,Le,Ie]),Vu({enabled:h,open:E,videoRef:Re,videoEpoch:Ve,src:nt,onLoading:We,onError:()=>Ke(!0),onNotSupported:()=>ze.current?.(),onSubtitleTracks:D});let{flushTimecode:pt,onTimeUpdate:mt,applyResumeIfNeeded:ht}=Wu({enabled:ct,hash:_,fileIndex:v,title:r,initialTimecode:Fe,videoRef:Re,onViewedChange:b}),gt=(0,g.useCallback)(()=>Be(!0),[]),_t=(0,g.useCallback)(()=>{pt(),Be(!1),Ke(!1),$e(!1),Xe(!1),Ne?.()},[pt,Ne]),vt=c({isOpen:E,onOpenChange:e=>{e?Be(!0):_t()}});d(E),(0,g.useEffect)(()=>{if(!C||!E)w(!1);else return w(!0),()=>w(!1)},[C,E,w]),(0,g.useEffect)(()=>{let e=document.createElement(`video`);(h?Ee.isSupported()||Ju(e):e.canPlayType(qu(nt)))||ze.current?.()},[h,nt]),(0,g.useEffect)(()=>{let e=Re.current;if(E&&!h&&e)return We(!0),e.src=p(nt),e.load(),e.play().catch(()=>{}),()=>{e.pause(),e.removeAttribute(`src`),e.load()}},[E,h,Ve,nt]),(0,g.useEffect)(()=>{if(!E||!_e)return;let e=window.setInterval(()=>{m(_e,{cache:`no-store`}).catch(()=>{})},Gu);return()=>window.clearInterval(e)},[_e,E]),(0,g.useEffect)(()=>{let e=()=>Je(!!document.fullscreenElement);return document.addEventListener(`fullscreenchange`,e),()=>document.removeEventListener(`fullscreenchange`,e)},[]),(0,g.useEffect)(()=>{if(!E||Ge)return;let e=e=>{if(e.metaKey||e.ctrlKey||e.altKey||e.repeat&&(e.key===` `||e.key===`Spacebar`)||!Ae(e.target))return;let t=Re.current;t&&je(t,e.key)&&(e.preventDefault(),e.stopPropagation())};return document.addEventListener(`keydown`,e,!0),()=>document.removeEventListener(`keydown`,e,!0)},[E,Ge]);let yt=(0,g.useCallback)(()=>{let e=document.createElement(`a`);e.href=p(n),e.download=``,document.body.appendChild(e),e.click(),document.body.removeChild(e)},[n]);(0,g.useEffect)(()=>{let e=Re.current;if(!e||T.current==null)return;let t=T.current,n=()=>{T.current!=null&&(e.currentTime=t,T.current=null,e.play().catch(()=>{}))};return e.addEventListener(`loadedmetadata`,n,{once:!0}),()=>e.removeEventListener(`loadedmetadata`,n)},[Ve,nt]),(0,g.useEffect)(()=>{if(!E||!h||!_||v==null)return;if(Ie.length){at(Ie);return}let e=!1;return l.get(pe(_,v)).then(({data:t})=>{e||at(ve(t))}).catch(()=>{}),()=>{e=!0}},[E,h,_,v,Ie]);let bt=e=>{if(!_||v==null)return;let t=Re.current;t&&(T.current=t.currentTime),tt(e),rt(Se(_,v,e)),$e(!1),x?.(e)},xt=ce,St=ot?.download_speed??0,Ct=ot?.active_peers,wt=ot?.total_peers??0,Tt=ot?.connected_seeders??0,Et=Ct==null?`—`:`${Ct}/${wt}`,A=Ct==null?`—`:`↑${Tt}`,Dt=se(st.Filled,st.Capacity)??`—`,Ot=_==null?null:(0,$.jsxs)(`div`,{className:`mt-0.5 flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] leading-none text-white/80 drop-shadow sm:text-xs`,"aria-label":`${S(`DownloadSpeed`)}, ${S(`Peers`)}, ${S(`CacheFilled`)}`,children:[(0,$.jsxs)(Ku,{tip:S(`DownloadSpeed`),children:[(0,$.jsx)(he,{className:`size-3 shrink-0`,strokeWidth:2.25,"aria-hidden":!0}),(0,$.jsx)(`span`,{className:`tabular-nums`,children:le(St)})]}),(0,$.jsxs)(Ku,{tip:S(`Peers`),children:[(0,$.jsx)(ae,{className:`size-3 shrink-0`,strokeWidth:2,"aria-hidden":!0}),(0,$.jsx)(`span`,{className:`tabular-nums`,children:Et}),(0,$.jsx)(`span`,{className:`tabular-nums text-white/70`,children:A})]}),(0,$.jsxs)(Ku,{tip:S(`CacheHint`),children:[(0,$.jsx)(ee,{className:`size-3 shrink-0`,strokeWidth:2,"aria-hidden":!0}),(0,$.jsx)(`span`,{className:`min-w-0 truncate tabular-nums`,children:Dt})]})]}),j=lt?(0,$.jsxs)(o,{isOpen:Qe,onOpenChange:$e,children:[(0,$.jsx)(o.Trigger,{children:(0,$.jsx)(t,{isIconOnly:!0,variant:`ghost`,className:`${ye} text-white hover-fine:bg-white/15`,"aria-label":S(`SelectAudioTrack`),children:(0,$.jsx)(ie,{...xt,"aria-hidden":!0})})}),(0,$.jsxs)(o.Content,{placement:`bottom end`,className:`max-h-72 w-72 overflow-y-auto border border-white/10 bg-neutral-950/95 p-1 backdrop-blur-xl`,children:[(0,$.jsx)(`p`,{className:`px-2 py-1.5 text-[11px] font-semibold tracking-wide text-muted uppercase`,children:S(`SelectAudioTrack`)}),it.map((e,n)=>{let{title:r,meta:i}=fe(e,n);return(0,$.jsx)(t,{variant:n===et?`secondary`:`ghost`,className:`h-auto w-full justify-start gap-2 py-2`,onPress:()=>bt(n),children:(0,$.jsxs)(`span`,{className:`min-w-0 flex-1 text-left`,children:[(0,$.jsx)(`span`,{className:`block truncate text-sm font-medium`,children:r}),i?(0,$.jsx)(`span`,{className:`mt-0.5 block truncate text-xs text-muted`,children:i}):null]})},n)})]})]}):null,M=C?null:(0,$.jsx)(t,{isIconOnly:!0,variant:`ghost`,className:`${ye} text-white hover-fine:bg-white/15`,"aria-label":S(Ye?`ExitFullscreen`:`ExpandPlayer`),onPress:()=>Xe(e=>!e),children:Ye?(0,$.jsx)(Oe,{...xt,"aria-hidden":!0}):(0,$.jsx)(te,{...xt,"aria-hidden":!0})});return(0,$.jsxs)($.Fragment,{children:[xe&&(De?(0,$.jsxs)(t,{variant:ke?`primary`:`secondary`,size:`sm`,onPress:gt,className:ke?`min-h-10 shrink-0 px-3`:`min-h-10 min-w-[72px] max-w-full flex-1`,children:[ke?(0,$.jsx)(ue,{...oe,fill:`currentColor`,"aria-hidden":!0}):null,S(`Play`)]}):(0,$.jsxs)(t,{variant:`secondary`,onPress:gt,children:[(0,$.jsx)(ue,{...oe,"aria-hidden":!0}),S(`Play`)]})),(0,$.jsx)(i,{state:vt,children:(0,$.jsx)(i.Backdrop,{isDismissable:!qe,className:`bg-black/75 backdrop-blur-sm`,children:(0,$.jsx)(i.Container,{size:C?`full`:`lg`,scroll:`inside`,placement:C?`center`:`auto`,className:C?`ts-player-modal-full p-0`:`p-4 sm:p-5`,children:(0,$.jsx)(i.Dialog,{className:C?`overflow-hidden rounded-none border-0 bg-black text-white shadow-none`:`overflow-hidden border border-white/10 bg-[#0a0e0c] text-white shadow-2xl shadow-black/50`,style:ut,children:(0,$.jsxs)(i.Body,{className:C?`flex h-full min-h-0 flex-col gap-0 p-0`:`gap-0 p-0`,children:[Ge?(0,$.jsxs)(`div`,{className:`space-y-3 p-4`,children:[(0,$.jsx)(s,{status:`danger`,children:S(`PlaybackError`)}),(0,$.jsx)(t,{variant:`secondary`,onPress:()=>window.open(n,`_blank`,`noopener,noreferrer`),children:S(`OpenLink`)})]}):(0,$.jsx)(zu,{isMobile:C,showPip:O,showCaptionsButton:k,className:C?`ts-player--mobile`:`ts-player--desktop`,style:C?{width:`100%`,height:`100%`}:{width:`100%`,maxHeight:dt,aspectRatio:`16 / 9`},topChrome:(0,$.jsxs)(`div`,{className:`flex items-start gap-2 px-3 pb-10 pt-[max(0.75rem,env(safe-area-inset-top))] pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))]`,children:[(0,$.jsxs)(`div`,{className:`min-w-0 flex-1`,children:[(0,$.jsx)(`p`,{className:`truncate text-sm font-semibold text-white drop-shadow`,title:r||S(`Play`),children:r||S(`Play`)}),Ot]}),j,M,(0,$.jsx)(t,{isIconOnly:!0,variant:`ghost`,className:`${ye} text-white hover-fine:bg-white/15`,"aria-label":S(`Close`),onPress:_t,children:(0,$.jsx)(Ce,{...xt,"aria-hidden":!0})})]}),extraControls:(0,$.jsx)(`button`,{type:`button`,className:`ts-player-download`,"aria-label":S(`Download`),onClick:yt,children:(0,$.jsx)(ne,{size:22,strokeWidth:1.75,"aria-hidden":!0})}),children:(0,$.jsx)(`video`,{slot:`media`,ref:ft,autoPlay:!0,playsInline:!0,crossOrigin:`anonymous`,className:`ts-player-video`,onTimeUpdate:()=>{mt(),Ue&&We(!1)},onLoadedMetadata:()=>{We(!1),Ke(!1),ht()},onWaiting:()=>We(!0),onCanPlay:()=>{We(!1),Ke(!1)},onPlaying:()=>We(!1),onPause:pt,onError:()=>{We(!1),Ke(!0)},children:!h&&Pe?(0,$.jsx)(`track`,{kind:`captions`,src:p(Pe),srcLang:`und`,label:`Captions`,default:!0}):null},nt)}),Ue&&!Ge?(0,$.jsx)(`div`,{className:`pointer-events-none absolute inset-0 z-10 grid place-items-center bg-black/55`,children:(0,$.jsxs)(`div`,{className:`flex flex-col items-center gap-3 px-4 text-center`,children:[(0,$.jsx)(a,{size:`lg`,color:`current`,className:`text-accent`}),(0,$.jsx)(`p`,{className:`text-sm font-medium text-white/90`,children:S(`Buffering`)})]})}):null]})})})})})]})}export{Xu as default};