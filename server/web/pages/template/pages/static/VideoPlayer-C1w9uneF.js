import{i as e}from"./rolldown-runtime-BgaNhQyE.js";import{A as t,C as n,M as r,O as i,b as a,l as o,o as s,r as c}from"./heroui-DMxKMzqy.js";import{i as l}from"./vendor-D73vhE3s.js";import{n as u,r as d}from"./ModalOpenContext-B5SCE0ZV.js";import{a as f,l as p,n as m}from"./authCredentials-CEke1uxF.js";import{t as h}from"./createLucideIcon-DycWlq1m.js";import{t as ee}from"./maximize-2-YP4IthaJ.js";import{t as te}from"./useTranslation-BnNnnMzO.js";import{F as ne,J as re,L as ie,P as ae,S as oe,Z as se,_ as ce,g as le,i as ue,o as de,ot as fe,r as pe,s as me,t as he}from"./index-qqUndgi1.js";import{d as ge,l as _e,u as ve}from"./dialogSizes-Dx4ujERB.js";import{t as ye}from"./hls-BgLaj4xL.js";var be=h(`minimize-2`,[[`path`,{d:`m14 10 7-7`,key:`oa77jy`}],[`path`,{d:`M20 10h-6V4`,key:`mjg0md`}],[`path`,{d:`m3 21 7-7`,key:`tjx5ai`}],[`path`,{d:`M4 14h6v6`,key:`rmj7iw`}]]),g=e(r(),1),xe=new Set([`style`,`children`,`ref`,`key`,`suppressContentEditableWarning`,`suppressHydrationWarning`,`dangerouslySetInnerHTML`]),Se={className:`class`,htmlFor:`for`};function Ce(e){return e.toLowerCase()}function we(e){if(typeof e==`boolean`)return e?``:void 0;if(typeof e!=`function`&&!(typeof e==`object`&&e))return e}function _({react:e,tagName:t,elementClass:n,events:r,displayName:i,defaultProps:a,toAttributeName:o=Ce,toAttributeValue:s=we}){let c=Number.parseInt(e.version)>=19,l=e.forwardRef((i,l)=>{let u=e.useRef(null),d=e.useRef(new Map),f={},p={},m={},h={};for(let[e,t]of Object.entries(i)){if(xe.has(e)){m[e]=t;continue}let r=o(Se[e]??e);if(n.prototype&&e in n.prototype&&!(e in(globalThis.HTMLElement?.prototype??{}))&&!n.observedAttributes?.some(e=>e===r)){h[e]=t;continue}if(e.startsWith(`on`)){f[e]=t;continue}let i=s(t);r&&i!=null&&(p[r]=String(i),c||(m[r]=i)),r&&c&&(i===we(t)?m[r]=t:m[r]=i)}if(typeof window<`u`){for(let t in f){let n=f[t],i=t.endsWith(`Capture`),a=(r?.[t]??t.slice(2).toLowerCase()).slice(0,i?-7:void 0);e.useLayoutEffect(()=>{let e=u?.current;if(!(!e||typeof n!=`function`))return e.addEventListener(a,n,i),()=>{e.removeEventListener(a,n,i)}},[u?.current,n])}e.useLayoutEffect(()=>{if(u.current===null)return;let e=new Map;for(let t in h)Te(u.current,t,h[t]),d.current.delete(t),e.set(t,h[t]);for(let[e,t]of d.current)Te(u.current,e,void 0);d.current=e})}if(typeof window>`u`&&n?.getTemplateHTML&&n?.shadowRootOptions){let{mode:t,delegatesFocus:r}=n.shadowRootOptions;m.children=[e.createElement(`template`,{shadowrootmode:t,shadowrootdelegatesfocus:r,dangerouslySetInnerHTML:{__html:n.getTemplateHTML(p,i)},key:`ce-la-react-ssr-template-shadow-root`}),m.children]}return e.createElement(t,{...a,...m,ref:e.useCallback(e=>{u.current=e,typeof l==`function`?l(e):l!==null&&(l.current=e)},[l])},m.children)});return l.displayName=i??n.name,l}function Te(e,t,n){e[t]=n,n==null&&t in(globalThis.HTMLElement?.prototype??{})&&e.removeAttribute(t)}var v={MEDIA_PLAY_REQUEST:`mediaplayrequest`,MEDIA_PAUSE_REQUEST:`mediapauserequest`,MEDIA_MUTE_REQUEST:`mediamuterequest`,MEDIA_UNMUTE_REQUEST:`mediaunmuterequest`,MEDIA_LOOP_REQUEST:`medialooprequest`,MEDIA_VOLUME_REQUEST:`mediavolumerequest`,MEDIA_SEEK_REQUEST:`mediaseekrequest`,MEDIA_AIRPLAY_REQUEST:`mediaairplayrequest`,MEDIA_ENTER_FULLSCREEN_REQUEST:`mediaenterfullscreenrequest`,MEDIA_EXIT_FULLSCREEN_REQUEST:`mediaexitfullscreenrequest`,MEDIA_PREVIEW_REQUEST:`mediapreviewrequest`,MEDIA_ENTER_PIP_REQUEST:`mediaenterpiprequest`,MEDIA_EXIT_PIP_REQUEST:`mediaexitpiprequest`,MEDIA_ENTER_CAST_REQUEST:`mediaentercastrequest`,MEDIA_EXIT_CAST_REQUEST:`mediaexitcastrequest`,MEDIA_SHOW_TEXT_TRACKS_REQUEST:`mediashowtexttracksrequest`,MEDIA_HIDE_TEXT_TRACKS_REQUEST:`mediahidetexttracksrequest`,MEDIA_SHOW_SUBTITLES_REQUEST:`mediashowsubtitlesrequest`,MEDIA_DISABLE_SUBTITLES_REQUEST:`mediadisablesubtitlesrequest`,MEDIA_TOGGLE_SUBTITLES_REQUEST:`mediatogglesubtitlesrequest`,MEDIA_PLAYBACK_RATE_REQUEST:`mediaplaybackraterequest`,MEDIA_RENDITION_REQUEST:`mediarenditionrequest`,MEDIA_AUDIO_TRACK_REQUEST:`mediaaudiotrackrequest`,MEDIA_SEEK_TO_LIVE_REQUEST:`mediaseektoliverequest`,REGISTER_MEDIA_STATE_RECEIVER:`registermediastatereceiver`,UNREGISTER_MEDIA_STATE_RECEIVER:`unregistermediastatereceiver`},y={MEDIA_CHROME_ATTRIBUTES:`mediachromeattributes`,MEDIA_CONTROLLER:`mediacontroller`},Ee={MEDIA_AIRPLAY_UNAVAILABLE:`mediaAirplayUnavailable`,MEDIA_AUDIO_TRACK_ENABLED:`mediaAudioTrackEnabled`,MEDIA_AUDIO_TRACK_LIST:`mediaAudioTrackList`,MEDIA_AUDIO_TRACK_UNAVAILABLE:`mediaAudioTrackUnavailable`,MEDIA_BUFFERED:`mediaBuffered`,MEDIA_CAST_UNAVAILABLE:`mediaCastUnavailable`,MEDIA_CHAPTERS_CUES:`mediaChaptersCues`,MEDIA_CURRENT_TIME:`mediaCurrentTime`,MEDIA_DURATION:`mediaDuration`,MEDIA_ENDED:`mediaEnded`,MEDIA_ERROR:`mediaError`,MEDIA_ERROR_CODE:`mediaErrorCode`,MEDIA_ERROR_MESSAGE:`mediaErrorMessage`,MEDIA_FULLSCREEN_UNAVAILABLE:`mediaFullscreenUnavailable`,MEDIA_HAS_PLAYED:`mediaHasPlayed`,MEDIA_HEIGHT:`mediaHeight`,MEDIA_IS_AIRPLAYING:`mediaIsAirplaying`,MEDIA_IS_CASTING:`mediaIsCasting`,MEDIA_IS_FULLSCREEN:`mediaIsFullscreen`,MEDIA_IS_PIP:`mediaIsPip`,MEDIA_LOADING:`mediaLoading`,MEDIA_MUTED:`mediaMuted`,MEDIA_LOOP:`mediaLoop`,MEDIA_PAUSED:`mediaPaused`,MEDIA_PIP_UNAVAILABLE:`mediaPipUnavailable`,MEDIA_PLAYBACK_RATE:`mediaPlaybackRate`,MEDIA_PREVIEW_CHAPTER:`mediaPreviewChapter`,MEDIA_PREVIEW_COORDS:`mediaPreviewCoords`,MEDIA_PREVIEW_IMAGE:`mediaPreviewImage`,MEDIA_PREVIEW_TIME:`mediaPreviewTime`,MEDIA_RENDITION_LIST:`mediaRenditionList`,MEDIA_RENDITION_SELECTED:`mediaRenditionSelected`,MEDIA_RENDITION_UNAVAILABLE:`mediaRenditionUnavailable`,MEDIA_SEEKABLE:`mediaSeekable`,MEDIA_STREAM_TYPE:`mediaStreamType`,MEDIA_SUBTITLES_LIST:`mediaSubtitlesList`,MEDIA_SUBTITLES_SHOWING:`mediaSubtitlesShowing`,MEDIA_TARGET_LIVE_WINDOW:`mediaTargetLiveWindow`,MEDIA_TIME_IS_LIVE:`mediaTimeIsLive`,MEDIA_VOLUME:`mediaVolume`,MEDIA_VOLUME_LEVEL:`mediaVolumeLevel`,MEDIA_VOLUME_UNAVAILABLE:`mediaVolumeUnavailable`,MEDIA_LANG:`mediaLang`,MEDIA_WIDTH:`mediaWidth`},De=Object.entries(Ee),b=De.reduce((e,[t,n])=>(e[t]=n.toLowerCase(),e),{}),Oe=De.reduce((e,[t,n])=>(e[t]=n.toLowerCase(),e),{USER_INACTIVE_CHANGE:`userinactivechange`,BREAKPOINTS_CHANGE:`breakpointchange`,BREAKPOINTS_COMPUTED:`breakpointscomputed`});Object.entries(Oe).reduce((e,[t,n])=>{let r=b[t];return r&&(e[n]=r),e},{userinactivechange:`userinactive`});var ke=Object.entries(b).reduce((e,[t,n])=>{let r=Oe[t];return r&&(e[n]=r),e},{userinactive:`userinactivechange`}),x={SUBTITLES:`subtitles`,CAPTIONS:`captions`,DESCRIPTIONS:`descriptions`,CHAPTERS:`chapters`,METADATA:`metadata`},S={DISABLED:`disabled`,HIDDEN:`hidden`,SHOWING:`showing`},Ae={MOUSE:`mouse`,PEN:`pen`,TOUCH:`touch`},C={UNAVAILABLE:`unavailable`,UNSUPPORTED:`unsupported`},w={LIVE:`live`,ON_DEMAND:`on-demand`,UNKNOWN:`unknown`},je={INLINE:`inline`,FULLSCREEN:`fullscreen`,PICTURE_IN_PICTURE:`picture-in-picture`};function T(e){return e?.map(Me).join(` `)}function Me(e){if(e){let{id:t,width:n,height:r}=e;return[t,n,r].filter(e=>e!=null).join(`:`)}}function Ne(e){return e?.map(Pe).join(` `)}function Pe(e){if(e){let{id:t,kind:n,language:r,label:i}=e;return[t,n,r,i].filter(e=>e!=null).join(`:`)}}function Fe(e){return typeof e==`number`&&!Number.isNaN(e)&&Number.isFinite(e)}var Ie=e=>new Promise(t=>setTimeout(t,e)),Le={en:{"Start airplay":`Start airplay`,"Stop airplay":`Stop airplay`,Audio:`Audio`,Captions:`Captions`,"Enable captions":`Enable captions`,"Disable captions":`Disable captions`,"Start casting":`Start casting`,"Stop casting":`Stop casting`,"Enter fullscreen mode":`Enter fullscreen mode`,"Exit fullscreen mode":`Exit fullscreen mode`,Mute:`Mute`,Unmute:`Unmute`,Loop:`Loop`,"Enter picture in picture mode":`Enter picture in picture mode`,"Exit picture in picture mode":`Exit picture in picture mode`,Play:`Play`,Pause:`Pause`,"Playback rate":`Playback rate`,"Playback rate {playbackRate}":`Playback rate {playbackRate}`,Quality:`Quality`,"Seek backward":`Seek backward`,"Seek forward":`Seek forward`,Settings:`Settings`,Auto:`Auto`,"audio player":`audio player`,"video player":`video player`,volume:`volume`,seek:`seek`,"closed captions":`closed captions`,"current playback rate":`current playback rate`,"playback time":`playback time`,"media loading":`media loading`,settings:`settings`,"audio tracks":`audio tracks`,quality:`quality`,play:`play`,pause:`pause`,mute:`mute`,unmute:`unmute`,"chapter: {chapterName}":`chapter: {chapterName}`,live:`live`,Off:`Off`,"start airplay":`start airplay`,"stop airplay":`stop airplay`,"start casting":`start casting`,"stop casting":`stop casting`,"enter fullscreen mode":`enter fullscreen mode`,"exit fullscreen mode":`exit fullscreen mode`,"enter picture in picture mode":`enter picture in picture mode`,"exit picture in picture mode":`exit picture in picture mode`,"seek to live":`seek to live`,"playing live":`playing live`,"seek back {seekOffset} seconds":`seek back {seekOffset} seconds`,"seek forward {seekOffset} seconds":`seek forward {seekOffset} seconds`,"Network Error":`Network Error`,"Decode Error":`Decode Error`,"Source Not Supported":`Source Not Supported`,"Encryption Error":`Encryption Error`,"A network error caused the media download to fail.":`A network error caused the media download to fail.`,"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":`A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.`,"An unsupported error occurred. The server or network failed, or your browser does not support this format.":`An unsupported error occurred. The server or network failed, or your browser does not support this format.`,"The media is encrypted and there are no keys to decrypt it.":`The media is encrypted and there are no keys to decrypt it.`,hour:`hour`,hours:`hours`,minute:`minute`,minutes:`minutes`,second:`second`,seconds:`seconds`,"{time} remaining":`{time} remaining`,"{currentTime} of {totalTime}":`{currentTime} of {totalTime}`,"video not loaded, unknown time.":`video not loaded, unknown time.`}},Re=globalThis.navigator?.language||`en`,ze=e=>{Re=e},Be=e=>{let[t]=Re.split(`-`);return Le[Re]?.[e]||Le[t]?.[e]||Le.en?.[e]||e},Ve=()=>{let[e]=Re.split(`-`);return Le[Re]?Re:Le[e]?e:`en`},E=(e,t={})=>Be(e).replace(/\{(\w+)\}/g,(e,n)=>n in t?String(t[n]):`{${n}}`),He=[{singular:`hour`,plural:`hours`},{singular:`minute`,plural:`minutes`},{singular:`second`,plural:`seconds`}],Ue=(e,t)=>`${e} ${E(e===1?He[t].singular:He[t].plural)}`,We=e=>{if(!Fe(e))return``;let t=Math.abs(e),n=t!==e,r=new Date(0,0,0,0,0,t,0),i=[r.getHours(),r.getMinutes(),r.getSeconds()].map((e,t)=>e&&Ue(e,t)).filter(e=>e).join(`, `);return n?E(`{time} remaining`,{time:i}):i};function Ge(e,t){let n=!1;e<0&&(n=!0,e=0-e),e=e<0?0:e;let r=Math.floor(e%60),i=Math.floor(e/60%60),a=Math.floor(e/3600),o=Math.floor(t/60%60),s=Math.floor(t/3600);return(isNaN(e)||e===1/0)&&(a=i=r=`0`),a=a>0||s>0?a+`:`:``,i=((a||o>=10)&&i<10?`0`+i:i)+`:`,r=r<10?`0`+r:r,(n?`-`:``)+a+i+r}Object.freeze({length:0,start(e){let t=e>>>0;if(t>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(e){let t=e>>>0;if(t>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);return 0}});var Ke=class{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}},qe=class extends Ke{},Je=class extends qe{constructor(){super(...arguments),this.role=null}},Ye=class{observe(){}unobserve(){}disconnect(){}},Xe={createElement:function(){return new Ze.HTMLElement},createElementNS:function(){return new Ze.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(e){return!1}},Ze={ResizeObserver:Ye,document:Xe,Node:qe,Element:Je,HTMLElement:class extends Je{constructor(){super(...arguments),this.innerHTML=``}get content(){return new Ze.DocumentFragment}},DocumentFragment:class extends Ke{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(e){return null},setItem(e,t){},removeItem(e){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return``}},matchMedia(e){return{matches:!1,media:e}},DOMParser:class{parseFromString(e,t){return{body:{textContent:e}}}}},Qe=`global`in globalThis&&(globalThis==null?void 0:globalThis.global)===globalThis||typeof window>`u`||window.customElements===void 0,$e=Object.keys(Ze).every(e=>e in globalThis),D=Qe&&!$e?Ze:globalThis,O=Qe&&!$e?Xe:globalThis.document,et=new WeakMap,tt=e=>{let t=et.get(e);return t||et.set(e,t=new Set),t},nt=new D.ResizeObserver(e=>{for(let t of e)for(let e of tt(t.target))e(t)});function rt(e,t){tt(e).add(t),nt.observe(e)}function it(e,t){let n=tt(e);n.delete(t),n.size||nt.unobserve(e)}function at(e){let t={};for(let n of e)t[n.name]=n.value;return t}function ot(e){return st(e)??ft(e,`media-controller`)}function st(e){let{MEDIA_CONTROLLER:t}=y,n=e.getAttribute(t);if(n)return mt(e)?.getElementById(n)}var ct=(e,t,n=`.value`)=>{let r=e.querySelector(n);r&&(r.textContent=t)},lt=(e,t)=>{let n=`slot[name="${t}"]`,r=e.shadowRoot.querySelector(n);return r?r.children:[]},ut=(e,t)=>lt(e,t)[0],dt=(e,t)=>!e||!t?!1:e?.contains(t)?!0:dt(e,t.getRootNode().host),ft=(e,t)=>e?e.closest(t)||ft(e.getRootNode().host,t):null;function pt(e=document){let t=e?.activeElement;return t?pt(t.shadowRoot)??t:null}function mt(e){let t=(e?.getRootNode)?.call(e);return t instanceof ShadowRoot||t instanceof Document?t:null}function ht(e,{depth:t=3,checkOpacity:n=!0,checkVisibilityCSS:r=!0}={}){if(e.checkVisibility)return e.checkVisibility({checkOpacity:n,checkVisibilityCSS:r});let i=e;for(;i&&t>0;){let e=getComputedStyle(i);if(n&&e.opacity===`0`||r&&e.visibility===`hidden`||e.display===`none`)return!1;i=i.parentElement,t--}return!0}function gt(e,t,n,r){let i=r.x-n.x,a=r.y-n.y,o=i*i+a*a;if(o===0)return 0;let s=((e-n.x)*i+(t-n.y)*a)/o;return Math.max(0,Math.min(1,s))}function k(e,t){return _t(e,e=>e===t)||vt(e,t)}function _t(e,t){let n;for(n of e.querySelectorAll(`style:not([media])`)??[]){let e;try{e=n.sheet?.cssRules}catch{continue}for(let n of e??[])if(t(n.selectorText))return n}}function vt(e,t){let n=e.querySelectorAll(`style:not([media])`)??[],r=n?.[n.length-1];if(!r?.sheet)return console.warn(`Media Chrome: No style sheet found on style tag of`,e),{style:{setProperty:()=>{},removeProperty:()=>``,getPropertyValue:()=>``}};let i=r?.sheet.insertRule(`${t}{}`,r.sheet.cssRules.length);return r.sheet.cssRules?.[i]}function A(e,t,n=NaN){let r=e.getAttribute(t);return r==null?n:+r}function j(e,t,n){let r=+n;if(n==null||Number.isNaN(r)){e.hasAttribute(t)&&e.removeAttribute(t);return}A(e,t,void 0)!==r&&e.setAttribute(t,`${r}`)}function M(e,t){return e.hasAttribute(t)}function N(e,t,n){if(n==null){e.hasAttribute(t)&&e.removeAttribute(t);return}M(e,t)!=n&&e.toggleAttribute(t,n)}function P(e,t,n=null){return e.getAttribute(t)??n}function F(e,t,n){if(n==null){e.hasAttribute(t)&&e.removeAttribute(t);return}let r=`${n}`;P(e,t,void 0)!==r&&e.setAttribute(t,r)}var yt=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},bt=(e,t,n)=>(yt(e,t,`read from private field`),n?n.call(e):t.get(e)),xt=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},St=(e,t,n,r)=>(yt(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),I;function Ct(e){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `}var wt=class extends D.HTMLElement{constructor(){if(super(),xt(this,I,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=at(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[y.MEDIA_CONTROLLER,b.MEDIA_PAUSED]}attributeChangedCallback(e,t,n){var r,i,a,o;e===y.MEDIA_CONTROLLER&&(t&&((i=(r=bt(this,I))?.unassociateElement)==null||i.call(r,this),St(this,I,null)),n&&this.isConnected&&(St(this,I,this.getRootNode()?.getElementById(n)),(o=(a=bt(this,I))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;this.tabIndex=-1,this.setAttribute(`aria-hidden`,`true`),St(this,I,Tt(this)),this.getAttribute(y.MEDIA_CONTROLLER)&&((t=(e=bt(this,I))?.associateElement)==null||t.call(e,this)),bt(this,I)&&(bt(this,I).addEventListener(`pointerdown`,this),bt(this,I).addEventListener(`click`,this),bt(this,I).hasAttribute(`tabindex`)||(bt(this,I).tabIndex=0))}disconnectedCallback(){var e,t,n,r;this.getAttribute(y.MEDIA_CONTROLLER)&&((t=(e=bt(this,I))?.unassociateElement)==null||t.call(e,this)),(n=bt(this,I))==null||n.removeEventListener(`pointerdown`,this),(r=bt(this,I))==null||r.removeEventListener(`click`,this),St(this,I,null)}handleEvent(e){let t=e.composedPath()?.[0];if([`video`,`media-controller`].includes(t?.localName)){if(e.type===`pointerdown`)this._pointerType=e.pointerType;else if(e.type===`click`){let{clientX:t,clientY:n}=e,{left:r,top:i,width:a,height:o}=this.getBoundingClientRect(),s=t-r,c=n-i;if(s<0||c<0||s>a||c>o||a===0&&o===0)return;let l=this._pointerType||`mouse`;if(this._pointerType=void 0,l===Ae.TOUCH){this.handleTap(e);return}else if(l===Ae.MOUSE||l===Ae.PEN){this.handleMouseClick(e);return}}}}get mediaPaused(){return M(this,b.MEDIA_PAUSED)}set mediaPaused(e){N(this,b.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){let t=this.mediaPaused?v.MEDIA_PLAY_REQUEST:v.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new D.CustomEvent(t,{composed:!0,bubbles:!0}))}};I=new WeakMap,wt.shadowRootOptions={mode:`open`},wt.getTemplateHTML=Ct;function Tt(e){let t=e.getAttribute(y.MEDIA_CONTROLLER);return t?e.getRootNode()?.getElementById(t):ft(e,`media-controller`)}D.customElements.get(`media-gesture-receiver`)||D.customElements.define(`media-gesture-receiver`,wt);var Et=wt,Dt=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},L=(e,t,n)=>(Dt(e,t,`read from private field`),n?n.call(e):t.get(e)),R=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Ot=(e,t,n,r)=>(Dt(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),kt=(e,t,n)=>(Dt(e,t,`access private method`),n),At,jt,Mt,Nt,Pt,Ft,It,Lt,Rt,zt,Bt,Vt,Ht,Ut,Wt,Gt,Kt,qt,Jt,Yt,z={AUDIO:`audio`,AUTOHIDE:`autohide`,BREAKPOINTS:`breakpoints`,GESTURES_DISABLED:`gesturesdisabled`,KEYBOARD_CONTROL:`keyboardcontrol`,NO_AUTOHIDE:`noautohide`,USER_INACTIVE:`userinactive`,AUTOHIDE_OVER_CONTROLS:`autohideovercontrols`};function Xt(e){return`
    <style>
      
      :host([${b.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
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

      :host(:not([${z.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
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

      
      :host([${z.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      
      :host([${z.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      
      :host(:not([${z.AUDIO}])[${z.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${z.AUDIO}])[${z.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${z.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${z.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${z.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
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

      
      :host(:not([${z.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      
      :host(:-webkit-full-screen) {
        
        width: 100% !important;
        height: 100% !important;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not([${z.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      
      :host([${z.USER_INACTIVE}]:not([${b.MEDIA_PAUSED}]):not([${b.MEDIA_IS_AIRPLAYING}]):not([${b.MEDIA_IS_CASTING}]):not([${z.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${z.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${z.USER_INACTIVE}]:not([${z.NO_AUTOHIDE}]):not([${b.MEDIA_PAUSED}]):not([${b.MEDIA_IS_CASTING}]):not([${z.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${z.USER_INACTIVE}][${z.AUTOHIDE_OVER_CONTROLS}]:not([${z.NO_AUTOHIDE}]):not([${b.MEDIA_PAUSED}]):not([${b.MEDIA_IS_CASTING}]):not([${z.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      
      :host(:not([${z.AUDIO}])[${b.MEDIA_HAS_PLAYED}]) slot[name=poster] {
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
        <template shadowrootmode="${Et.shadowRootOptions.mode}">
          ${Et.getTemplateHTML({})}
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
  `}var Zt=Object.values(b),Qt=`sm:384 md:576 lg:768 xl:960`;function $t(e){en(e.target,e.contentRect.width)}function en(e,t){if(!e.isConnected)return;let n=tn(e.getAttribute(z.BREAKPOINTS)??Qt),r=nn(n,t),i=!1;if(Object.keys(n).forEach(t=>{if(r.includes(t)){e.hasAttribute(`breakpoint${t}`)||(e.setAttribute(`breakpoint${t}`,``),i=!0);return}e.hasAttribute(`breakpoint${t}`)&&(e.removeAttribute(`breakpoint${t}`),i=!0)}),i){let t=new CustomEvent(Oe.BREAKPOINTS_CHANGE,{detail:r});e.dispatchEvent(t)}e.breakpointsComputed||(e.breakpointsComputed=!0,e.dispatchEvent(new CustomEvent(Oe.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}function tn(e){let t=e.split(/\s+/);return Object.fromEntries(t.map(e=>e.split(`:`)))}function nn(e,t){return Object.keys(e).filter(n=>t>=parseInt(e[n]))}var rn=class extends D.HTMLElement{constructor(){if(super(),R(this,Rt),R(this,Bt),R(this,Ht),R(this,Wt),R(this,Kt),R(this,At,void 0),R(this,jt,0),R(this,Mt,null),R(this,Nt,null),R(this,Pt,void 0),this.breakpointsComputed=!1,R(this,Ft,e=>{let t=this.media;for(let n of e){if(n.type!==`childList`)continue;let e=n.removedNodes;for(let r of e){if(r.slot!=`media`||n.target!=this)continue;let e=n.previousSibling&&n.previousSibling.previousElementSibling;if(!e||!t)this.mediaUnsetCallback(r);else{let t=e.slot!==`media`;for(;(e=e.previousSibling)!==null;)e.slot==`media`&&(t=!1);t&&this.mediaUnsetCallback(r)}}if(t)for(let e of n.addedNodes)e===t&&this.handleMediaUpdated(t)}}),R(this,It,!1),R(this,Lt,e=>{L(this,It)||(setTimeout(()=>{$t(e),Ot(this,It,!1)},0),Ot(this,It,!0))}),R(this,Jt,void 0),R(this,Yt,()=>{if(!L(this,Jt).assignedElements({flatten:!0}).length){L(this,Mt)&&this.mediaUnsetCallback(L(this,Mt));return}this.handleMediaUpdated(this.media)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=at(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}Ot(this,At,new MutationObserver(L(this,Ft)))}static get observedAttributes(){return[z.AUTOHIDE,z.GESTURES_DISABLED].concat(Zt).filter(e=>![b.MEDIA_RENDITION_LIST,b.MEDIA_AUDIO_TRACK_LIST,b.MEDIA_CHAPTERS_CUES,b.MEDIA_WIDTH,b.MEDIA_HEIGHT,b.MEDIA_ERROR,b.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,t,n){e.toLowerCase()==z.AUTOHIDE&&(this.autohide=n)}get media(){let e=this.querySelector(`:scope > [slot=media]`);return e?.nodeName==`SLOT`&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(Ot(this,Mt,e),e.localName.includes(`-`)&&await D.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;L(this,At).observe(this,{childList:!0,subtree:!0}),rt(this,L(this,Lt));let t=this.getAttribute(z.AUDIO)==null?E(`video player`):E(`audio player`);this.setAttribute(`role`,`region`),this.setAttribute(`aria-label`,t),this.handleMediaUpdated(this.media),this.setAttribute(z.USER_INACTIVE,``),en(this,this.getBoundingClientRect().width);let n=this.querySelector(`:scope > slot[slot=media]`);n&&(Ot(this,Jt,n),L(this,Jt).addEventListener(`slotchange`,L(this,Yt))),this.addEventListener(`pointerdown`,this),this.addEventListener(`pointermove`,this),this.addEventListener(`pointerup`,this),this.addEventListener(`mouseleave`,this),this.addEventListener(`keyup`,this),(e=D.window)==null||e.addEventListener(`mouseup`,this)}disconnectedCallback(){var e;it(this,L(this,Lt)),clearTimeout(L(this,Nt)),L(this,At).disconnect(),this.media&&this.mediaUnsetCallback(this.media),(e=D.window)==null||e.removeEventListener(`mouseup`,this),this.removeEventListener(`pointerdown`,this),this.removeEventListener(`pointermove`,this),this.removeEventListener(`pointerup`,this),this.removeEventListener(`mouseleave`,this),this.removeEventListener(`keyup`,this),L(this,Jt)&&(L(this,Jt).removeEventListener(`slotchange`,L(this,Yt)),Ot(this,Jt,null)),Ot(this,It,!1)}mediaSetCallback(e){}mediaUnsetCallback(e){Ot(this,Mt,null)}handleEvent(e){switch(e.type){case`pointerdown`:Ot(this,jt,e.timeStamp);break;case`pointermove`:kt(this,Rt,zt).call(this,e);break;case`pointerup`:kt(this,Bt,Vt).call(this,e);break;case`mouseleave`:kt(this,Ht,Ut).call(this);break;case`mouseup`:this.removeAttribute(z.KEYBOARD_CONTROL);break;case`keyup`:kt(this,Kt,qt).call(this),this.setAttribute(z.KEYBOARD_CONTROL,``);break}}set autohide(e){let t=Number(e);Ot(this,Pt,isNaN(t)?0:t)}get autohide(){return(L(this,Pt)===void 0?2:L(this,Pt)).toString()}get breakpoints(){return P(this,z.BREAKPOINTS)}set breakpoints(e){F(this,z.BREAKPOINTS,e)}get audio(){return M(this,z.AUDIO)}set audio(e){N(this,z.AUDIO,e)}get gesturesDisabled(){return M(this,z.GESTURES_DISABLED)}set gesturesDisabled(e){N(this,z.GESTURES_DISABLED,e)}get keyboardControl(){return M(this,z.KEYBOARD_CONTROL)}set keyboardControl(e){N(this,z.KEYBOARD_CONTROL,e)}get noAutohide(){return M(this,z.NO_AUTOHIDE)}set noAutohide(e){N(this,z.NO_AUTOHIDE,e)}get autohideOverControls(){return M(this,z.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){N(this,z.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return M(this,z.USER_INACTIVE)}set userInteractive(e){N(this,z.USER_INACTIVE,e)}};At=new WeakMap,jt=new WeakMap,Mt=new WeakMap,Nt=new WeakMap,Pt=new WeakMap,Ft=new WeakMap,It=new WeakMap,Lt=new WeakMap,Rt=new WeakSet,zt=function(e){if(e.pointerType!==`mouse`&&e.timeStamp-L(this,jt)<250)return;kt(this,Wt,Gt).call(this),clearTimeout(L(this,Nt));let t=this.hasAttribute(z.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(e.target)||t)&&kt(this,Kt,qt).call(this)},Bt=new WeakSet,Vt=function(e){if(e.pointerType===`touch`){let t=!this.hasAttribute(z.USER_INACTIVE);[this,this.media].includes(e.target)&&t?kt(this,Ht,Ut).call(this):kt(this,Kt,qt).call(this)}else e.composedPath().some(e=>[`media-play-button`,`media-fullscreen-button`].includes(e?.localName))&&kt(this,Kt,qt).call(this)},Ht=new WeakSet,Ut=function(){if(L(this,Pt)<0||this.hasAttribute(z.USER_INACTIVE))return;this.setAttribute(z.USER_INACTIVE,``);let e=new D.CustomEvent(Oe.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(e)},Wt=new WeakSet,Gt=function(){if(!this.hasAttribute(z.USER_INACTIVE))return;this.removeAttribute(z.USER_INACTIVE);let e=new D.CustomEvent(Oe.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(e)},Kt=new WeakSet,qt=function(){kt(this,Wt,Gt).call(this),clearTimeout(L(this,Nt));let e=parseInt(this.autohide);e<0||Ot(this,Nt,setTimeout(()=>{kt(this,Ht,Ut).call(this)},e*1e3))},Jt=new WeakMap,Yt=new WeakMap,rn.shadowRootOptions={mode:`open`},rn.getTemplateHTML=Xt,D.customElements.get(`media-container`)||D.customElements.define(`media-container`,rn);var an=rn,on=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},B=(e,t,n)=>(on(e,t,`read from private field`),n?n.call(e):t.get(e)),sn=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},cn=(e,t,n,r)=>(on(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),ln,un,dn,fn,pn,mn,hn=class{constructor(e,t,{defaultValue:n}={defaultValue:void 0}){sn(this,pn),sn(this,ln,void 0),sn(this,un,void 0),sn(this,dn,void 0),sn(this,fn,new Set),cn(this,ln,e),cn(this,un,t),cn(this,dn,new Set(n))}[Symbol.iterator](){return B(this,pn,mn).values()}get length(){return B(this,pn,mn).size}get value(){return[...B(this,pn,mn)].join(` `)??``}set value(e){e!==this.value&&(cn(this,fn,new Set),this.add(...e?.split(` `)??[]))}toString(){return this.value}item(e){return[...B(this,pn,mn)][e]}values(){return B(this,pn,mn).values()}forEach(e,t){B(this,pn,mn).forEach(e,t)}add(...e){var t;e.forEach(e=>B(this,fn).add(e)),!(this.value===``&&!B(this,ln)?.hasAttribute(`${B(this,un)}`))&&((t=B(this,ln))==null||t.setAttribute(`${B(this,un)}`,`${this.value}`))}remove(...e){var t;e.forEach(e=>B(this,fn).delete(e)),(t=B(this,ln))==null||t.setAttribute(`${B(this,un)}`,`${this.value}`)}contains(e){return B(this,pn,mn).has(e)}toggle(e,t){return t===void 0?this.contains(e)?(this.remove(e),!1):(this.add(e),!0):t?(this.add(e),!0):(this.remove(e),!1)}replace(e,t){return this.remove(e),this.add(t),e===t}};ln=new WeakMap,un=new WeakMap,dn=new WeakMap,fn=new WeakMap,pn=new WeakSet,mn=function(){return B(this,fn).size?B(this,fn):B(this,dn)};var gn=(e=``)=>e.split(/\s+/),_n=(e=``)=>{let[t,n,r]=e.split(`:`),i=r?decodeURIComponent(r):void 0;return{kind:t===`cc`?x.CAPTIONS:x.SUBTITLES,language:n,label:i}},vn=(e=``,t={})=>gn(e).map(e=>{let n=_n(e);return{...t,...n}}),yn=e=>e?Array.isArray(e)?e.map(e=>typeof e==`string`?_n(e):e):typeof e==`string`?vn(e):[e]:[],bn=({kind:e,label:t,language:n}={kind:`subtitles`})=>t?`${e===`captions`?`cc`:`sb`}:${n}:${encodeURIComponent(t)}`:n,xn=(e=[])=>Array.prototype.map.call(e,bn).join(` `),Sn=(e,t)=>n=>n[e]===t,Cn=e=>{let t=Object.entries(e).map(([e,t])=>Sn(e,t));return e=>t.every(t=>t(e))},wn=(e,t=[],n=[])=>{let r=yn(n).map(Cn);Array.from(t).filter(e=>r.some(t=>t(e))).forEach(t=>{t.mode=e})},Tn=(e,t=()=>!0)=>{if(!e?.textTracks)return[];let n=typeof t==`function`?t:Cn(t);return Array.from(e.textTracks).filter(n)},En=e=>!!e.mediaSubtitlesShowing?.length||e.hasAttribute(b.MEDIA_SUBTITLES_SHOWING),Dn=e=>{let{media:t,fullscreenElement:n}=e;try{let e=n&&`requestFullscreen`in n?`requestFullscreen`:n&&`webkitRequestFullScreen`in n?`webkitRequestFullScreen`:void 0;if(e){let t=n[e]?.call(n);if(t instanceof Promise)return t.catch(()=>{})}else t?.webkitEnterFullscreen?t.webkitEnterFullscreen():t?.requestFullscreen&&t.requestFullscreen()}catch(e){console.error(e)}},On=`exitFullscreen`in O?`exitFullscreen`:`webkitExitFullscreen`in O?`webkitExitFullscreen`:`webkitCancelFullScreen`in O?`webkitCancelFullScreen`:void 0,kn=e=>{let{documentElement:t}=e;if(On){let e=(t?.[On])?.call(t);if(e instanceof Promise)return e.catch(()=>{})}},An=`fullscreenElement`in O?`fullscreenElement`:`webkitFullscreenElement`in O?`webkitFullscreenElement`:void 0,jn=e=>{let{documentElement:t,media:n}=e,r=t?.[An];return!r&&`webkitDisplayingFullscreen`in n&&`webkitPresentationMode`in n&&n.webkitDisplayingFullscreen&&n.webkitPresentationMode===je.FULLSCREEN?n:r},Mn=e=>{let{media:t,documentElement:n,fullscreenElement:r=t}=e;if(!t||!n)return!1;let i=jn(e);if(!i)return!1;if(i===r||i===t)return!0;if(i.localName.includes(`-`)){let e=i.shadowRoot;if(!(An in e))return dt(i,r);for(;e?.[An];){if(e[An]===r)return!0;e=e[An]?.shadowRoot}}return!1},Nn=`fullscreenEnabled`in O?`fullscreenEnabled`:`webkitFullscreenEnabled`in O?`webkitFullscreenEnabled`:void 0,Pn=e=>{let{documentElement:t,media:n}=e;return!!t?.[Nn]||n&&`webkitSupportsFullscreen`in n},Fn,In=()=>{var e;return Fn||(Fn=((e=O)?.createElement)?.call(e,`video`),Fn)},Ln=async(e=In())=>{if(!e)return!1;let t=e.volume;e.volume=t/2+.1;let n=new AbortController,r=await Promise.race([Rn(e,n.signal),zn(e,t)]);return n.abort(),r},Rn=(e,t)=>new Promise(n=>{e.addEventListener(`volumechange`,()=>n(!0),{signal:t})}),zn=async(e,t)=>{for(let n=0;n<10;n++){if(e.volume===t)return!1;await Ie(10)}return e.volume!==t},Bn=/.*Version\/.*Safari\/.*/.test(D.navigator.userAgent),Vn=(e=In())=>D.matchMedia(`(display-mode: standalone)`).matches&&Bn?!1:typeof e?.requestPictureInPicture==`function`,Hn=(e=In())=>Pn({documentElement:O,media:e}),Un=Hn(),Wn=Vn(),Gn=!!D.WebKitPlaybackTargetAvailabilityEvent,Kn=!!D.chrome,qn=e=>Tn(e.media,e=>[x.SUBTITLES,x.CAPTIONS].includes(e.kind)).sort((e,t)=>e.kind>=t.kind?1:-1),Jn=e=>Tn(e.media,e=>e.mode===S.SHOWING&&[x.SUBTITLES,x.CAPTIONS].includes(e.kind)),Yn=(e,t)=>{let n=qn(e),r=Jn(e),i=!!r.length;if(n.length){if(t===!1||i&&t!==!0)wn(S.DISABLED,n,r);else if(t===!0||!i&&t!==!1){let t=n[0],{options:i}=e;if(!i?.noSubtitlesLangPref){let e=D.localStorage.getItem(`media-chrome-pref-subtitles-lang`),r=e?[e,...D.navigator.languages]:D.navigator.languages,i=n.filter(e=>r.some(t=>e.language.toLowerCase().startsWith(t.split(`-`)[0]))).sort((e,t)=>r.findIndex(t=>e.language.toLowerCase().startsWith(t.split(`-`)[0]))-r.findIndex(e=>t.language.toLowerCase().startsWith(e.split(`-`)[0])));i[0]&&(t=i[0])}let{language:a,label:o,kind:s}=t;wn(S.DISABLED,n,r),wn(S.SHOWING,n,[{language:a,label:o,kind:s}])}}},Xn=(e,t)=>e===t?!0:e==null||t==null||typeof e!=typeof t?!1:typeof e==`number`&&Number.isNaN(e)&&Number.isNaN(t)?!0:typeof e==`object`?Array.isArray(e)?Zn(e,t):Object.entries(e).every(([e,n])=>e in t&&Xn(n,t[e])):!1,Zn=(e,t)=>{let n=Array.isArray(e),r=Array.isArray(t);return n===r?n||r?e.length===t.length&&e.every((e,n)=>Xn(e,t[n])):!0:!1},Qn=Object.values(w),$n,er=Ln().then(e=>($n=e,$n)),tr=async(...e)=>{await Promise.all(e.filter(e=>e).map(async e=>{if(!(`localName`in e&&e instanceof D.HTMLElement))return;let t=e.localName;if(!t.includes(`-`))return;let n=D.customElements.get(t);n&&e instanceof n||(await D.customElements.whenDefined(t),D.customElements.upgrade(e))}))},nr=new D.DOMParser,rr=e=>e&&(nr.parseFromString(e,`text/html`).body.textContent||e),ir={mediaError:{get(e,t){let{media:n}=e;if(t?.type!==`playing`)return n?.error},mediaEvents:[`emptied`,`error`,`playing`]},mediaErrorCode:{get(e,t){let{media:n}=e;if(t?.type!==`playing`)return n?.error?.code},mediaEvents:[`emptied`,`error`,`playing`]},mediaErrorMessage:{get(e,t){let{media:n}=e;if(t?.type!==`playing`)return n?.error?.message??``},mediaEvents:[`emptied`,`error`,`playing`]},mediaWidth:{get(e){let{media:t}=e;return t?.videoWidth??0},mediaEvents:[`resize`]},mediaHeight:{get(e){let{media:t}=e;return t?.videoHeight??0},mediaEvents:[`resize`]},mediaPaused:{get(e){let{media:t}=e;return t?.paused??!0},set(e,t){var n;let{media:r}=t;r&&(e?r.pause():(n=r.play())==null||n.catch(()=>{}))},mediaEvents:[`play`,`playing`,`pause`,`emptied`]},mediaHasPlayed:{get(e,t){let{media:n}=e;return n?t?t.type===`playing`:!n.paused:!1},mediaEvents:[`playing`,`emptied`]},mediaEnded:{get(e){let{media:t}=e;return t?.ended??!1},mediaEvents:[`seeked`,`ended`,`emptied`]},mediaPlaybackRate:{get(e){let{media:t}=e;return t?.playbackRate??1},set(e,t){let{media:n}=t;n&&Number.isFinite(+e)&&(n.playbackRate=+e)},mediaEvents:[`ratechange`,`loadstart`]},mediaMuted:{get(e){let{media:t}=e;return t?.muted??!1},set(e,t){let{media:n,options:{noMutedPref:r}={}}=t;if(n){n.muted=e;try{let t=D.localStorage.getItem(`media-chrome-pref-muted`)!==null,i=n.hasAttribute(`muted`);if(r){t&&D.localStorage.removeItem(`media-chrome-pref-muted`);return}if(i&&!t)return;D.localStorage.setItem(`media-chrome-pref-muted`,e?`true`:`false`)}catch(e){console.debug(`Error setting muted pref`,e)}}},mediaEvents:[`volumechange`],stateOwnersUpdateHandlers:[(e,t)=>{let{options:{noMutedPref:n}}=t,{media:r}=t;if(!(!r||r.muted||n))try{let n=D.localStorage.getItem(`media-chrome-pref-muted`)===`true`;ir.mediaMuted.set(n,t),e(n)}catch(e){console.debug(`Error getting muted pref`,e)}}]},mediaLoop:{get(e){let{media:t}=e;return t?.loop},set(e,t){let{media:n}=t;n&&(n.loop=e)},mediaEvents:[`medialooprequest`]},mediaVolume:{get(e){let{media:t}=e;return t?.volume??1},set(e,t){let{media:n,options:{noVolumePref:r}={}}=t;if(n){try{e==null?D.localStorage.removeItem(`media-chrome-pref-volume`):!n.hasAttribute(`muted`)&&!r&&D.localStorage.setItem(`media-chrome-pref-volume`,e.toString())}catch(e){console.debug(`Error setting volume pref`,e)}Number.isFinite(+e)&&(n.volume=+e)}},mediaEvents:[`volumechange`],stateOwnersUpdateHandlers:[(e,t)=>{let{options:{noVolumePref:n}}=t;if(!n)try{let{media:n}=t;if(!n)return;let r=D.localStorage.getItem(`media-chrome-pref-volume`);if(r==null)return;ir.mediaVolume.set(+r,t),e(+r)}catch(e){console.debug(`Error getting volume pref`,e)}}]},mediaVolumeLevel:{get(e){let{media:t}=e;return t?.volume===void 0?`high`:t.muted||t.volume===0?`off`:t.volume<.5?`low`:t.volume<.75?`medium`:`high`},mediaEvents:[`volumechange`]},mediaCurrentTime:{get(e){let{media:t}=e;return t?.currentTime??0},set(e,t){let{media:n}=t;!n||!Fe(e)||(n.currentTime=e)},mediaEvents:[`timeupdate`,`loadedmetadata`]},mediaDuration:{get(e){let{media:t,options:{defaultDuration:n}={}}=e;return n&&(!t||!t.duration||Number.isNaN(t.duration)||!Number.isFinite(t.duration))?n:Number.isFinite(t?.duration)?t.duration:NaN},mediaEvents:[`durationchange`,`loadedmetadata`,`emptied`]},mediaLoading:{get(e){let{media:t}=e;return t?.readyState<3},mediaEvents:[`waiting`,`playing`,`emptied`]},mediaSeekable:{get(e){let{media:t}=e;if(!t?.seekable?.length)return;let n=t.seekable.start(0),r=t.seekable.end(t.seekable.length-1);if(!(!n&&!r))return[Number(n.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:[`loadedmetadata`,`emptied`,`progress`,`seekablechange`]},mediaBuffered:{get(e){let{media:t}=e,n=t?.buffered??[];return Array.from(n).map((e,t)=>[Number(n.start(t).toFixed(3)),Number(n.end(t).toFixed(3))])},mediaEvents:[`progress`,`emptied`]},mediaStreamType:{get(e){let{media:t,options:{defaultStreamType:n}={}}=e,r=[w.LIVE,w.ON_DEMAND].includes(n)?n:void 0;if(!t)return r;let{streamType:i}=t;if(Qn.includes(i))return i===w.UNKNOWN?r:i;let a=t.duration;return a===1/0?w.LIVE:Number.isFinite(a)?w.ON_DEMAND:r},mediaEvents:[`emptied`,`durationchange`,`loadedmetadata`,`streamtypechange`]},mediaTargetLiveWindow:{get(e){let{media:t}=e;if(!t)return NaN;let{targetLiveWindow:n}=t,r=ir.mediaStreamType.get(e);return(n==null||Number.isNaN(n))&&r===w.LIVE?0:n},mediaEvents:[`emptied`,`durationchange`,`loadedmetadata`,`streamtypechange`,`targetlivewindowchange`]},mediaTimeIsLive:{get(e){let{media:t,options:{liveEdgeOffset:n=10}={}}=e;if(!t)return!1;if(typeof t.liveEdgeStart==`number`)return!Number.isNaN(t.liveEdgeStart)&&t.currentTime>=t.liveEdgeStart;if(ir.mediaStreamType.get(e)!==w.LIVE)return!1;let r=t.seekable;if(!r)return!0;if(!r.length)return!1;let i=r.end(r.length-1)-n;return t.currentTime>=i},mediaEvents:[`playing`,`timeupdate`,`progress`,`waiting`,`emptied`]},mediaSubtitlesList:{get(e){return qn(e).map(({kind:e,label:t,language:n})=>({kind:e,label:t,language:n}))},mediaEvents:[`loadstart`],textTracksEvents:[`addtrack`,`removetrack`]},mediaSubtitlesShowing:{get(e){return Jn(e).map(({kind:e,label:t,language:n})=>({kind:e,label:t,language:n}))},mediaEvents:[`loadstart`],textTracksEvents:[`addtrack`,`removetrack`,`change`],stateOwnersUpdateHandlers:[(e,t)=>{var n,r;let{media:i,options:a}=t;if(!i)return;let o=e=>{a.defaultSubtitles&&(e&&![x.CAPTIONS,x.SUBTITLES].includes(e?.track?.kind)||Yn(t,!0))};return i.addEventListener(`loadstart`,o),(n=i.textTracks)==null||n.addEventListener(`addtrack`,o),(r=i.textTracks)==null||r.addEventListener(`removetrack`,o),()=>{var e,t;i.removeEventListener(`loadstart`,o),(e=i.textTracks)==null||e.removeEventListener(`addtrack`,o),(t=i.textTracks)==null||t.removeEventListener(`removetrack`,o)}}]},mediaChaptersCues:{get(e){let{media:t}=e;if(!t)return[];let[n]=Tn(t,{kind:x.CHAPTERS});return Array.from(n?.cues??[]).map(({text:e,startTime:t,endTime:n})=>({text:rr(e),startTime:t,endTime:n}))},mediaEvents:[`loadstart`,`loadedmetadata`],textTracksEvents:[`addtrack`,`removetrack`,`change`],stateOwnersUpdateHandlers:[(e,t)=>{let{media:n}=t;if(!n)return;let r=n.querySelector(`track[kind="chapters"][default][src]`),i=n.shadowRoot?.querySelector(`:is(video,audio) > track[kind="chapters"][default][src]`);return r?.addEventListener(`load`,e),i?.addEventListener(`load`,e),()=>{r?.removeEventListener(`load`,e),i?.removeEventListener(`load`,e)}}]},mediaIsPip:{get(e){let{media:t,documentElement:n}=e;if(!t||!n||!n.pictureInPictureElement)return!1;if(n.pictureInPictureElement===t)return!0;if(n.pictureInPictureElement instanceof HTMLMediaElement)return t.localName?.includes(`-`)?dt(t,n.pictureInPictureElement):!1;if(n.pictureInPictureElement.localName.includes(`-`)){let e=n.pictureInPictureElement.shadowRoot;for(;e?.pictureInPictureElement;){if(e.pictureInPictureElement===t)return!0;e=e.pictureInPictureElement?.shadowRoot}}return!1},set(e,t){let{media:n}=t;if(n)if(e){if(!O.pictureInPictureEnabled){console.warn(`MediaChrome: Picture-in-picture is not enabled`);return}if(!n.requestPictureInPicture){console.warn(`MediaChrome: The current media does not support picture-in-picture`);return}let e=()=>{console.warn(`MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.`)};n.requestPictureInPicture().catch(t=>{if(t.code===11){if(!n.src){console.warn(`MediaChrome: The media is not ready for picture-in-picture. It must have a src set.`);return}if(n.readyState===0&&n.preload===`none`){let t=()=>{n.removeEventListener(`loadedmetadata`,r),n.preload=`none`},r=()=>{n.requestPictureInPicture().catch(e),t()};n.addEventListener(`loadedmetadata`,r),n.preload=`metadata`,setTimeout(()=>{n.readyState===0&&e(),t()},1e3)}else throw t}else throw t})}else O.pictureInPictureElement&&O.exitPictureInPicture()},mediaEvents:[`enterpictureinpicture`,`leavepictureinpicture`]},mediaRenditionList:{get(e){let{media:t}=e;return[...t?.videoRenditions??[]].map(e=>({...e}))},mediaEvents:[`emptied`,`loadstart`],videoRenditionsEvents:[`addrendition`,`removerendition`]},mediaRenditionSelected:{get(e){let{media:t}=e;return t?.videoRenditions?.[t.videoRenditions?.selectedIndex]?.id},set(e,t){let{media:n}=t;if(!n?.videoRenditions){console.warn(`MediaController: Rendition selection not supported by this media.`);return}let r=e,i=Array.prototype.findIndex.call(n.videoRenditions,e=>e.id==r);n.videoRenditions.selectedIndex!=i&&(n.videoRenditions.selectedIndex=i)},mediaEvents:[`emptied`],videoRenditionsEvents:[`addrendition`,`removerendition`,`change`]},mediaAudioTrackList:{get(e){let{media:t}=e;return[...t?.audioTracks??[]]},mediaEvents:[`emptied`,`loadstart`],audioTracksEvents:[`addtrack`,`removetrack`]},mediaAudioTrackEnabled:{get(e){let{media:t}=e;return[...t?.audioTracks??[]].find(e=>e.enabled)?.id},set(e,t){let{media:n}=t;if(!n?.audioTracks){console.warn(`MediaChrome: Audio track selection not supported by this media.`);return}let r=e;for(let e of n.audioTracks)e.enabled=r==e.id},mediaEvents:[`emptied`],audioTracksEvents:[`addtrack`,`removetrack`,`change`]},mediaIsFullscreen:{get(e){return Mn(e)},set(e,t,n){var r;e?(Dn(t),n.detail&&!t.media?.inert&&((r=t.media)==null||r.focus())):kn(t)},rootEvents:[`fullscreenchange`,`webkitfullscreenchange`],mediaEvents:[`webkitbeginfullscreen`,`webkitendfullscreen`,`webkitpresentationmodechanged`]},mediaIsCasting:{get(e){let{media:t}=e;return!t?.remote||t.remote?.state===`disconnected`?!1:t.remote.state===`connected`},set(e,t){let{media:n}=t;if(n&&!(e&&n.remote?.state!==`disconnected`)&&!(!e&&n.remote?.state!==`connected`)){if(typeof n.remote.prompt!=`function`){console.warn(`MediaChrome: Casting is not supported in this environment`);return}n.remote.prompt().catch(()=>{})}},remoteEvents:[`connect`,`connecting`,`disconnect`]},mediaIsAirplaying:{get(){return!1},set(e,t){let{media:n}=t;if(n){if(!(n.webkitShowPlaybackTargetPicker&&D.WebKitPlaybackTargetAvailabilityEvent)){console.error(`MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment`);return}n.webkitShowPlaybackTargetPicker()}},mediaEvents:[`webkitcurrentplaybacktargetiswirelesschanged`]},mediaFullscreenUnavailable:{get(e){let{media:t}=e;if(!Un||!Hn(t))return C.UNSUPPORTED}},mediaPipUnavailable:{get(e){let{media:t}=e;if(!Wn||!Vn(t))return C.UNSUPPORTED;if(t?.disablePictureInPicture)return C.UNAVAILABLE}},mediaVolumeUnavailable:{get(e){let{media:t}=e;if($n===!1||t?.volume==null)return C.UNSUPPORTED},stateOwnersUpdateHandlers:[e=>{$n??er.then(t=>e(t?void 0:C.UNSUPPORTED))}]},mediaCastUnavailable:{get(e,{availability:t=`not-available`}={}){let{media:n}=e;if(!Kn||!n?.remote?.state)return C.UNSUPPORTED;if(!(t==null||t===`available`))return C.UNAVAILABLE},stateOwnersUpdateHandlers:[(e,t)=>{var n;let{media:r}=t;if(r)return r.disableRemotePlayback||r.hasAttribute(`disableremoteplayback`)||(n=r?.remote)==null||n.watchAvailability(t=>{e({availability:t?`available`:`not-available`})}).catch(t=>{t.name===`NotSupportedError`?e({availability:null}):e({availability:`not-available`})}),()=>{var e;(e=r?.remote)==null||e.cancelWatchAvailability().catch(()=>{})}}]},mediaAirplayUnavailable:{get(e,t){if(!Gn)return C.UNSUPPORTED;if(t?.availability===`not-available`)return C.UNAVAILABLE},mediaEvents:[`webkitplaybacktargetavailabilitychanged`],stateOwnersUpdateHandlers:[(e,t)=>{var n;let{media:r}=t;if(r)return r.disableRemotePlayback||r.hasAttribute(`disableremoteplayback`)||(n=r?.remote)==null||n.watchAvailability(t=>{e({availability:t?`available`:`not-available`})}).catch(t=>{t.name===`NotSupportedError`?e({availability:null}):e({availability:`not-available`})}),()=>{var e;(e=r?.remote)==null||e.cancelWatchAvailability().catch(()=>{})}}]},mediaRenditionUnavailable:{get(e){let{media:t}=e;if(!t?.videoRenditions)return C.UNSUPPORTED;if(!t.videoRenditions?.length)return C.UNAVAILABLE},mediaEvents:[`emptied`,`loadstart`],videoRenditionsEvents:[`addrendition`,`removerendition`]},mediaAudioTrackUnavailable:{get(e){let{media:t}=e;if(!t?.audioTracks)return C.UNSUPPORTED;if((t.audioTracks?.length??0)<=1)return C.UNAVAILABLE},mediaEvents:[`emptied`,`loadstart`],audioTracksEvents:[`addtrack`,`removetrack`]},mediaLang:{get(e){let{options:{mediaLang:t}={}}=e;return t??`en`}}},ar={[v.MEDIA_PREVIEW_REQUEST](e,t,{detail:n}){let{media:r}=t,i=n??void 0,a,o;if(r&&i!=null){let[e]=Tn(r,{kind:x.METADATA,label:`thumbnails`}),t=Array.prototype.find.call(e?.cues??[],(e,t,n)=>t===0?e.endTime>i:t===n.length-1?e.startTime<=i:e.startTime<=i&&e.endTime>i);if(t){let e=/'^(?:[a-z]+:)?\/\//i.test(t.text)?void 0:r?.querySelector(`track[label="thumbnails"]`)?.src,n=new URL(t.text,e);o=new URLSearchParams(n.hash).get(`#xywh`).split(`,`).map(e=>+e),a=n.href}}let s=e.mediaDuration.get(t),c=e.mediaChaptersCues.get(t).find((e,t,n)=>t===n.length-1&&s===e.endTime?e.startTime<=i&&e.endTime>=i:e.startTime<=i&&e.endTime>i)?.text;return n!=null&&c==null&&(c=``),{mediaPreviewTime:i,mediaPreviewImage:a,mediaPreviewCoords:o,mediaPreviewChapter:c}},[v.MEDIA_PAUSE_REQUEST](e,t){e.mediaPaused.set(!0,t)},[v.MEDIA_PLAY_REQUEST](e,t){let n=e.mediaStreamType.get(t)===w.LIVE,r=!t.options?.noAutoSeekToLive,i=e.mediaTargetLiveWindow.get(t)>0;if(n&&r&&!i){let n=e.mediaSeekable.get(t)?.[1];if(n){let r=n-(t.options?.seekToLiveOffset??0);e.mediaCurrentTime.set(r,t)}}e.mediaPaused.set(!1,t)},[v.MEDIA_PLAYBACK_RATE_REQUEST](e,t,{detail:n}){let r=n;e.mediaPlaybackRate.set(r,t)},[v.MEDIA_MUTE_REQUEST](e,t){e.mediaMuted.set(!0,t)},[v.MEDIA_UNMUTE_REQUEST](e,t){e.mediaVolume.get(t)||e.mediaVolume.set(.25,t),e.mediaMuted.set(!1,t)},[v.MEDIA_LOOP_REQUEST](e,t,{detail:n}){let r=!!n;return e.mediaLoop.set(r,t),{mediaLoop:r}},[v.MEDIA_VOLUME_REQUEST](e,t,{detail:n}){let r=n;r&&e.mediaMuted.get(t)&&e.mediaMuted.set(!1,t),e.mediaVolume.set(r,t)},[v.MEDIA_SEEK_REQUEST](e,t,{detail:n}){let r=n;e.mediaCurrentTime.set(r,t)},[v.MEDIA_SEEK_TO_LIVE_REQUEST](e,t){let n=e.mediaSeekable.get(t)?.[1];if(Number.isNaN(Number(n)))return;let r=n-(t.options?.seekToLiveOffset??0);e.mediaCurrentTime.set(r,t)},[v.MEDIA_SHOW_SUBTITLES_REQUEST](e,t,{detail:n}){let{options:r}=t,i=qn(t),a=yn(n),o=a[0]?.language;o&&!r.noSubtitlesLangPref&&D.localStorage.setItem(`media-chrome-pref-subtitles-lang`,o),wn(S.SHOWING,i,a)},[v.MEDIA_DISABLE_SUBTITLES_REQUEST](e,t,{detail:n}){let r=qn(t),i=n??[];wn(S.DISABLED,r,i)},[v.MEDIA_TOGGLE_SUBTITLES_REQUEST](e,t,{detail:n}){Yn(t,n)},[v.MEDIA_RENDITION_REQUEST](e,t,{detail:n}){let r=n;e.mediaRenditionSelected.set(r,t)},[v.MEDIA_AUDIO_TRACK_REQUEST](e,t,{detail:n}){let r=n;e.mediaAudioTrackEnabled.set(r,t)},[v.MEDIA_ENTER_PIP_REQUEST](e,t){e.mediaIsFullscreen.get(t)&&e.mediaIsFullscreen.set(!1,t),e.mediaIsPip.set(!0,t)},[v.MEDIA_EXIT_PIP_REQUEST](e,t){e.mediaIsPip.set(!1,t)},[v.MEDIA_ENTER_FULLSCREEN_REQUEST](e,t,n){e.mediaIsPip.get(t)&&e.mediaIsPip.set(!1,t),e.mediaIsFullscreen.set(!0,t,n)},[v.MEDIA_EXIT_FULLSCREEN_REQUEST](e,t){e.mediaIsFullscreen.set(!1,t)},[v.MEDIA_ENTER_CAST_REQUEST](e,t){e.mediaIsFullscreen.get(t)&&e.mediaIsFullscreen.set(!1,t),e.mediaIsCasting.set(!0,t)},[v.MEDIA_EXIT_CAST_REQUEST](e,t){e.mediaIsCasting.set(!1,t)},[v.MEDIA_AIRPLAY_REQUEST](e,t){e.mediaIsAirplaying.set(!0,t)}},or=({media:e,fullscreenElement:t,documentElement:n,stateMediator:r=ir,requestMap:i=ar,options:a={},monitorStateOwnersOnlyWithSubscriptions:o=!0})=>{let s=[],c={options:{...a}},l=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0}),u=e=>{e!=null&&(Xn(e,l)||(l=Object.freeze({...l,...e}),s.forEach(e=>e(l))))},d=()=>{let e=Object.entries(r).reduce((e,[t,{get:n}])=>(e[t]=n(c),e),{});u(e)},f={},p,m=async(e,t)=>{let n=!!p;if(p={...c,...p??{},...e},n)return;await tr(...Object.values(e));let i=s.length>0&&t===0&&o,a=c.media!==p.media,l=c.media?.textTracks!==p.media?.textTracks,m=c.media?.videoRenditions!==p.media?.videoRenditions,h=c.media?.audioTracks!==p.media?.audioTracks,ee=c.media?.remote!==p.media?.remote,te=c.documentElement!==p.documentElement,ne=!!c.media&&(a||i),re=!!c.media?.textTracks&&(l||i),ie=!!c.media?.videoRenditions&&(m||i),ae=!!c.media?.audioTracks&&(h||i),oe=!!c.media?.remote&&(ee||i),se=!!c.documentElement&&(te||i),ce=ne||re||ie||ae||oe||se,le=s.length===0&&t===1&&o,ue=!!p.media&&(a||le),de=!!p.media?.textTracks&&(l||le),fe=!!p.media?.videoRenditions&&(m||le),pe=!!p.media?.audioTracks&&(h||le),me=!!p.media?.remote&&(ee||le),he=!!p.documentElement&&(te||le),ge=ue||de||fe||pe||me||he;if(!(ce||ge)){Object.entries(p).forEach(([e,t])=>{c[e]=t}),d(),p=void 0;return}Object.entries(r).forEach(([e,{get:t,mediaEvents:n=[],textTracksEvents:r=[],videoRenditionsEvents:i=[],audioTracksEvents:a=[],remoteEvents:o=[],rootEvents:s=[],stateOwnersUpdateHandlers:l=[]}])=>{f[e]||(f[e]={});let d=n=>{let r=t(c,n);u({[e]:r})},m;m=f[e].mediaEvents,n.forEach(t=>{m&&ne&&(c.media.removeEventListener(t,m),f[e].mediaEvents=void 0),ue&&(p.media.addEventListener(t,d),f[e].mediaEvents=d)}),m=f[e].textTracksEvents,r.forEach(t=>{var n,r;m&&re&&((n=c.media.textTracks)==null||n.removeEventListener(t,m),f[e].textTracksEvents=void 0),de&&((r=p.media.textTracks)==null||r.addEventListener(t,d),f[e].textTracksEvents=d)}),m=f[e].videoRenditionsEvents,i.forEach(t=>{var n,r;m&&ie&&((n=c.media.videoRenditions)==null||n.removeEventListener(t,m),f[e].videoRenditionsEvents=void 0),fe&&((r=p.media.videoRenditions)==null||r.addEventListener(t,d),f[e].videoRenditionsEvents=d)}),m=f[e].audioTracksEvents,a.forEach(t=>{var n,r;m&&ae&&((n=c.media.audioTracks)==null||n.removeEventListener(t,m),f[e].audioTracksEvents=void 0),pe&&((r=p.media.audioTracks)==null||r.addEventListener(t,d),f[e].audioTracksEvents=d)}),m=f[e].remoteEvents,o.forEach(t=>{var n,r;m&&oe&&((n=c.media.remote)==null||n.removeEventListener(t,m),f[e].remoteEvents=void 0),me&&((r=p.media.remote)==null||r.addEventListener(t,d),f[e].remoteEvents=d)}),m=f[e].rootEvents,s.forEach(t=>{m&&se&&(c.documentElement.removeEventListener(t,m),f[e].rootEvents=void 0),he&&(p.documentElement.addEventListener(t,d),f[e].rootEvents=d)});let h=f[e].stateOwnersUpdateHandlers;if(h&&ce&&(Array.isArray(h)?h:[h]).forEach(e=>{typeof e==`function`&&e()}),ge){let t=l.map(e=>e(d,p)).filter(e=>typeof e==`function`);f[e].stateOwnersUpdateHandlers=t.length===1?t[0]:t}else ce&&(f[e].stateOwnersUpdateHandlers=void 0)}),Object.entries(p).forEach(([e,t])=>{c[e]=t}),d(),p=void 0};return m({media:e,fullscreenElement:t,documentElement:n,options:a}),{dispatch(e){let{type:t,detail:n}=e;if(i[t]&&l.mediaErrorCode==null){u(i[t](r,c,e));return}t===`mediaelementchangerequest`?m({media:n}):t===`fullscreenelementchangerequest`?m({fullscreenElement:n}):t===`documentelementchangerequest`?m({documentElement:n}):t===`optionschangerequest`&&(Object.entries(n??{}).forEach(([e,t])=>{c.options[e]=t}),d())},getState(){return l},subscribe(e){return m({},s.length+1),s.push(e),e(l),()=>{let t=s.indexOf(e);t>=0&&(m({},s.length-1),s.splice(t,1))}}}},sr=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},V=(e,t,n)=>(sr(e,t,`read from private field`),n?n.call(e):t.get(e)),cr=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},lr=(e,t,n,r)=>(sr(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),ur=(e,t,n)=>(sr(e,t,`access private method`),n),dr,fr,H,pr,mr,hr,gr,_r,vr,yr,br,xr,Sr,Cr,wr,Tr=[`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`Enter`,` `,`f`,`m`,`k`,`c`,`l`,`j`,`>`,`<`,`p`],Er=10,Dr=.025,Or=.25,kr=.25,Ar=2,U={DEFAULT_SUBTITLES:`defaultsubtitles`,DEFAULT_STREAM_TYPE:`defaultstreamtype`,DEFAULT_DURATION:`defaultduration`,FULLSCREEN_ELEMENT:`fullscreenelement`,HOTKEYS:`hotkeys`,KEYBOARD_BACKWARD_SEEK_OFFSET:`keyboardbackwardseekoffset`,KEYBOARD_FORWARD_SEEK_OFFSET:`keyboardforwardseekoffset`,KEYBOARD_DOWN_VOLUME_STEP:`keyboarddownvolumestep`,KEYBOARD_UP_VOLUME_STEP:`keyboardupvolumestep`,KEYS_USED:`keysused`,LANG:`lang`,LOOP:`loop`,LIVE_EDGE_OFFSET:`liveedgeoffset`,NO_AUTO_SEEK_TO_LIVE:`noautoseektolive`,NO_DEFAULT_STORE:`nodefaultstore`,NO_HOTKEYS:`nohotkeys`,NO_MUTED_PREF:`nomutedpref`,NO_SUBTITLES_LANG_PREF:`nosubtitleslangpref`,NO_VOLUME_PREF:`novolumepref`,SEEK_TO_LIVE_OFFSET:`seektoliveoffset`},jr=class extends rn{constructor(){super(),cr(this,vr),cr(this,xr),cr(this,Cr),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,cr(this,dr,new hn(this,U.HOTKEYS)),cr(this,fr,void 0),cr(this,H,void 0),cr(this,pr,null),cr(this,mr,void 0),cr(this,hr,void 0),cr(this,gr,e=>{var t;(t=V(this,H))==null||t.dispatch(e)}),cr(this,_r,void 0),cr(this,br,e=>{let{key:t,shiftKey:n}=e;if(!(n&&(t===`/`||t===`?`)||Tr.includes(t))){this.removeEventListener(`keyup`,V(this,br));return}this.keyboardShortcutHandler(e)}),this.associateElement(this);let e={};lr(this,mr,t=>{Object.entries(t).forEach(([t,n])=>{if(t in e&&e[t]===n)return;this.propagateMediaState(t,n);let r=t.toLowerCase(),i=new D.CustomEvent(ke[r],{composed:!0,detail:n});this.dispatchEvent(i)}),e=t})}static get observedAttributes(){return super.observedAttributes.concat(U.NO_HOTKEYS,U.HOTKEYS,U.DEFAULT_STREAM_TYPE,U.DEFAULT_SUBTITLES,U.DEFAULT_DURATION,U.NO_MUTED_PREF,U.NO_VOLUME_PREF,U.LANG,U.LOOP,U.LIVE_EDGE_OFFSET,U.SEEK_TO_LIVE_OFFSET,U.NO_AUTO_SEEK_TO_LIVE)}get mediaStore(){return V(this,H)}set mediaStore(e){var t;if(V(this,H)&&((t=V(this,hr))==null||t.call(this),lr(this,hr,void 0)),lr(this,H,e),!V(this,H)&&!this.hasAttribute(U.NO_DEFAULT_STORE)){ur(this,vr,yr).call(this);return}lr(this,hr,V(this,H)?.subscribe(V(this,mr)))}get fullscreenElement(){return V(this,fr)??this}set fullscreenElement(e){var t;this.hasAttribute(U.FULLSCREEN_ELEMENT)&&this.removeAttribute(U.FULLSCREEN_ELEMENT),lr(this,fr,e),(t=V(this,H))==null||t.dispatch({type:`fullscreenelementchangerequest`,detail:this.fullscreenElement})}get defaultSubtitles(){return M(this,U.DEFAULT_SUBTITLES)}set defaultSubtitles(e){N(this,U.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return P(this,U.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){F(this,U.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return A(this,U.DEFAULT_DURATION)}set defaultDuration(e){j(this,U.DEFAULT_DURATION,e)}get noHotkeys(){return M(this,U.NO_HOTKEYS)}set noHotkeys(e){N(this,U.NO_HOTKEYS,e)}get keysUsed(){return P(this,U.KEYS_USED)}set keysUsed(e){F(this,U.KEYS_USED,e)}get liveEdgeOffset(){return A(this,U.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){j(this,U.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return M(this,U.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){N(this,U.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return M(this,U.NO_VOLUME_PREF)}set noVolumePref(e){N(this,U.NO_VOLUME_PREF,e)}get noMutedPref(){return M(this,U.NO_MUTED_PREF)}set noMutedPref(e){N(this,U.NO_MUTED_PREF,e)}get noSubtitlesLangPref(){return M(this,U.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){N(this,U.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return M(this,U.NO_DEFAULT_STORE)}set noDefaultStore(e){N(this,U.NO_DEFAULT_STORE,e)}get resolvedLang(){return Ve()}attributeChangedCallback(e,t,n){var r,i,a,o,s,c,l,u,d,f;if(super.attributeChangedCallback(e,t,n),e===U.NO_HOTKEYS)n!==t&&n===``?(this.hasAttribute(U.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):n!==t&&n===null&&this.enableHotkeys();else if(e===U.HOTKEYS)V(this,dr).value=n;else if(e===U.DEFAULT_SUBTITLES&&n!==t)(r=V(this,H))==null||r.dispatch({type:`optionschangerequest`,detail:{defaultSubtitles:this.hasAttribute(U.DEFAULT_SUBTITLES)}});else if(e===U.DEFAULT_STREAM_TYPE)(i=V(this,H))==null||i.dispatch({type:`optionschangerequest`,detail:{defaultStreamType:this.getAttribute(U.DEFAULT_STREAM_TYPE)??void 0}});else if(e===U.LIVE_EDGE_OFFSET&&n!==t)(a=V(this,H))==null||a.dispatch({type:`optionschangerequest`,detail:{liveEdgeOffset:this.hasAttribute(U.LIVE_EDGE_OFFSET)?+this.getAttribute(U.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(U.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(U.SEEK_TO_LIVE_OFFSET):this.hasAttribute(U.LIVE_EDGE_OFFSET)?+this.getAttribute(U.LIVE_EDGE_OFFSET):void 0}});else if(e===U.SEEK_TO_LIVE_OFFSET&&n!==t)(o=V(this,H))==null||o.dispatch({type:`optionschangerequest`,detail:{seekToLiveOffset:this.hasAttribute(U.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(U.SEEK_TO_LIVE_OFFSET):this.hasAttribute(U.LIVE_EDGE_OFFSET)?+this.getAttribute(U.LIVE_EDGE_OFFSET):void 0}});else if(e===U.NO_AUTO_SEEK_TO_LIVE)(s=V(this,H))==null||s.dispatch({type:`optionschangerequest`,detail:{noAutoSeekToLive:this.hasAttribute(U.NO_AUTO_SEEK_TO_LIVE)}});else if(e===U.FULLSCREEN_ELEMENT){let e=n?this.getRootNode()?.getElementById(n):void 0;lr(this,fr,e),(c=V(this,H))==null||c.dispatch({type:`fullscreenelementchangerequest`,detail:this.fullscreenElement})}else e===U.LANG&&n!==t?(ze(n),(l=V(this,H))==null||l.dispatch({type:`optionschangerequest`,detail:{mediaLang:n}})):e===U.LOOP&&n!==t?(u=V(this,H))==null||u.dispatch({type:v.MEDIA_LOOP_REQUEST,detail:n!=null}):e===U.NO_VOLUME_PREF&&n!==t?(d=V(this,H))==null||d.dispatch({type:`optionschangerequest`,detail:{noVolumePref:this.hasAttribute(U.NO_VOLUME_PREF)}}):e===U.NO_MUTED_PREF&&n!==t&&((f=V(this,H))==null||f.dispatch({type:`optionschangerequest`,detail:{noMutedPref:this.hasAttribute(U.NO_MUTED_PREF)}}))}connectedCallback(){var e,t;this.associateElement(this),!V(this,H)&&!this.hasAttribute(U.NO_DEFAULT_STORE)&&ur(this,vr,yr).call(this),(e=V(this,H))==null||e.dispatch({type:`documentelementchangerequest`,detail:O}),(t=V(this,H))==null||t.dispatch({type:`fullscreenelementchangerequest`,detail:this.fullscreenElement}),super.connectedCallback(),V(this,H)&&!V(this,hr)&&lr(this,hr,V(this,H)?.subscribe(V(this,mr))),V(this,_r)!==void 0&&V(this,H)&&this.media&&setTimeout(()=>{var e;this.media?.textTracks?.length&&((e=V(this,H))==null||e.dispatch({type:v.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:V(this,_r)}))},0),this.hasAttribute(U.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}disconnectedCallback(){var e,t,n,r,i;if((e=super.disconnectedCallback)==null||e.call(this),this.disableHotkeys(),V(this,H)){let e=V(this,H).getState();lr(this,_r,!!e.mediaSubtitlesShowing?.length),(t=V(this,H))==null||t.dispatch({type:`fullscreenelementchangerequest`,detail:void 0}),(n=V(this,H))==null||n.dispatch({type:`documentelementchangerequest`,detail:void 0}),(r=V(this,H))==null||r.dispatch({type:v.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})}V(this,hr)&&((i=V(this,hr))==null||i.call(this),lr(this,hr,void 0)),this.unassociateElement(this),V(this,pr)&&(V(this,pr).remove(),lr(this,pr,null))}mediaSetCallback(e){var t;super.mediaSetCallback(e),(t=V(this,H))==null||t.dispatch({type:`mediaelementchangerequest`,detail:e}),e.hasAttribute(`tabindex`)||(e.tabIndex=-1)}mediaUnsetCallback(e){var t;super.mediaUnsetCallback(e),(t=V(this,H))==null||t.dispatch({type:`mediaelementchangerequest`,detail:void 0})}propagateMediaState(e,t){Hr(this.mediaStateReceivers,e,t)}associateElement(e){if(!e)return;let{associatedElementSubscriptions:t}=this;if(t.has(e))return;let n=Ur(e,this.registerMediaStateReceiver.bind(this),this.unregisterMediaStateReceiver.bind(this));Object.values(v).forEach(t=>{e.addEventListener(t,V(this,gr))}),t.set(e,n)}unassociateElement(e){if(!e)return;let{associatedElementSubscriptions:t}=this;t.has(e)&&(t.get(e)(),t.delete(e),Object.values(v).forEach(t=>{e.removeEventListener(t,V(this,gr))}))}registerMediaStateReceiver(e){if(!e)return;let t=this.mediaStateReceivers;t.indexOf(e)>-1||(t.push(e),V(this,H)&&Object.entries(V(this,H).getState()).forEach(([t,n])=>{Hr([e],t,n)}))}unregisterMediaStateReceiver(e){let t=this.mediaStateReceivers,n=t.indexOf(e);n<0||t.splice(n,1)}enableHotkeys(){this.addEventListener(`keydown`,ur(this,xr,Sr))}disableHotkeys(){this.removeEventListener(`keydown`,ur(this,xr,Sr)),this.removeEventListener(`keyup`,V(this,br))}get hotkeys(){return V(this,dr)}set hotkeys(e){F(this,U.HOTKEYS,e)}keyboardShortcutHandler(e){let t=e.target;if((t.getAttribute(U.KEYS_USED)?.split(` `)??t?.keysUsed??[]).map(e=>e===`Space`?` `:e).filter(Boolean).includes(e.key))return;let n,r,i;if(!V(this,dr).contains(`no${e.key.toLowerCase()}`)&&!(e.key===` `&&V(this,dr).contains(`nospace`))&&!(e.shiftKey&&(e.key===`/`||e.key===`?`)&&V(this,dr).contains(`noshift+/`)))switch(e.key){case` `:case`k`:n=V(this,H).getState().mediaPaused?v.MEDIA_PLAY_REQUEST:v.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new D.CustomEvent(n,{composed:!0,bubbles:!0}));break;case`m`:n=this.mediaStore.getState().mediaVolumeLevel===`off`?v.MEDIA_UNMUTE_REQUEST:v.MEDIA_MUTE_REQUEST,this.dispatchEvent(new D.CustomEvent(n,{composed:!0,bubbles:!0}));break;case`f`:n=this.mediaStore.getState().mediaIsFullscreen?v.MEDIA_EXIT_FULLSCREEN_REQUEST:v.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new D.CustomEvent(n,{composed:!0,bubbles:!0}));break;case`c`:this.dispatchEvent(new D.CustomEvent(v.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case`ArrowLeft`:case`j`:{let e=this.hasAttribute(U.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(U.KEYBOARD_BACKWARD_SEEK_OFFSET):Er;r=Math.max((this.mediaStore.getState().mediaCurrentTime??0)-e,0),i=new D.CustomEvent(v.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`ArrowRight`:case`l`:{let e=this.hasAttribute(U.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(U.KEYBOARD_FORWARD_SEEK_OFFSET):Er;r=Math.max((this.mediaStore.getState().mediaCurrentTime??0)+e,0),i=new D.CustomEvent(v.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`ArrowUp`:{let e=this.hasAttribute(U.KEYBOARD_UP_VOLUME_STEP)?+this.getAttribute(U.KEYBOARD_UP_VOLUME_STEP):Dr;r=Math.min((this.mediaStore.getState().mediaVolume??1)+e,1),i=new D.CustomEvent(v.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`ArrowDown`:{let e=this.hasAttribute(U.KEYBOARD_DOWN_VOLUME_STEP)?+this.getAttribute(U.KEYBOARD_DOWN_VOLUME_STEP):Dr;r=Math.max((this.mediaStore.getState().mediaVolume??1)-e,0),i=new D.CustomEvent(v.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`<`:{let e=this.mediaStore.getState().mediaPlaybackRate??1;r=Math.max(e-Or,kr).toFixed(2),i=new D.CustomEvent(v.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`>`:{let e=this.mediaStore.getState().mediaPlaybackRate??1;r=Math.min(e+Or,Ar).toFixed(2),i=new D.CustomEvent(v.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`/`:case`?`:e.shiftKey&&ur(this,Cr,wr).call(this);break;case`p`:n=this.mediaStore.getState().mediaIsPip?v.MEDIA_EXIT_PIP_REQUEST:v.MEDIA_ENTER_PIP_REQUEST,i=new D.CustomEvent(n,{composed:!0,bubbles:!0}),this.dispatchEvent(i);break;default:break}}};dr=new WeakMap,fr=new WeakMap,H=new WeakMap,pr=new WeakMap,mr=new WeakMap,hr=new WeakMap,gr=new WeakMap,_r=new WeakMap,vr=new WeakSet,yr=function(){this.mediaStore=or({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(U.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(U.DEFAULT_DURATION)?+this.getAttribute(U.DEFAULT_DURATION):void 0,defaultStreamType:this.getAttribute(U.DEFAULT_STREAM_TYPE)??void 0,liveEdgeOffset:this.hasAttribute(U.LIVE_EDGE_OFFSET)?+this.getAttribute(U.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(U.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(U.SEEK_TO_LIVE_OFFSET):this.hasAttribute(U.LIVE_EDGE_OFFSET)?+this.getAttribute(U.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(U.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(U.NO_VOLUME_PREF),noMutedPref:this.hasAttribute(U.NO_MUTED_PREF),noSubtitlesLangPref:this.hasAttribute(U.NO_SUBTITLES_LANG_PREF)}})},br=new WeakMap,xr=new WeakSet,Sr=function(e){let{metaKey:t,altKey:n,key:r,shiftKey:i}=e,a=i&&(r===`/`||r===`?`);if(a&&V(this,pr)?.open){this.removeEventListener(`keyup`,V(this,br));return}if(t||n||!a&&!Tr.includes(r)){this.removeEventListener(`keyup`,V(this,br));return}let o=e.target,s=o instanceof HTMLElement&&(o.tagName.toLowerCase()===`media-volume-range`||o.tagName.toLowerCase()===`media-time-range`);[` `,`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`].includes(r)&&!(V(this,dr).contains(`no${r.toLowerCase()}`)||r===` `&&V(this,dr).contains(`nospace`))&&!s&&e.preventDefault(),this.addEventListener(`keyup`,V(this,br),{once:!0})},Cr=new WeakSet,wr=function(){V(this,pr)||(lr(this,pr,O.createElement(`media-keyboard-shortcuts-dialog`)),this.appendChild(V(this,pr))),V(this,pr).open=!0};var Mr=Object.values(b),Nr=Object.values(Ee),Pr=e=>{var t;let{observedAttributes:n}=e.constructor;!n&&e.nodeName?.includes(`-`)&&(D.customElements.upgrade(e),{observedAttributes:n}=e.constructor);let r=((t=(e?.getAttribute)?.call(e,y.MEDIA_CHROME_ATTRIBUTES))?.split)?.call(t,/\s+/);return Array.isArray(n||r)?(n||r).filter(e=>Mr.includes(e)):[]},Fr=e=>(e.nodeName?.includes(`-`)&&D.customElements.get(e.nodeName?.toLowerCase())&&!(e instanceof D.customElements.get(e.nodeName.toLowerCase()))&&D.customElements.upgrade(e),Nr.some(t=>t in e)),Ir=e=>Fr(e)||!!Pr(e).length,Lr=e=>(e?.join)?.call(e,`:`),Rr={[b.MEDIA_SUBTITLES_LIST]:xn,[b.MEDIA_SUBTITLES_SHOWING]:xn,[b.MEDIA_SEEKABLE]:Lr,[b.MEDIA_BUFFERED]:e=>e?.map(Lr).join(` `),[b.MEDIA_PREVIEW_COORDS]:e=>e?.join(` `),[b.MEDIA_RENDITION_LIST]:T,[b.MEDIA_AUDIO_TRACK_LIST]:Ne},zr=async(e,t,n)=>{if(e.isConnected||await Ie(0),typeof n==`boolean`||n==null)return N(e,t,n);if(typeof n==`number`)return j(e,t,n);if(typeof n==`string`)return F(e,t,n);if(Array.isArray(n)&&!n.length)return e.removeAttribute(t);let r=Rr[t]?.call(Rr,n)??n;return e.setAttribute(t,r)},Br=e=>!!e.closest?.call(e,`*[slot="media"]`),Vr=(e,t)=>{if(Br(e))return;let n=(e,t)=>{Ir(e)&&t(e);let{children:n=[]}=e??{},r=e?.shadowRoot?.children??[];[...n,...r].forEach(e=>Vr(e,t))},r=e?.nodeName.toLowerCase();if(r.includes(`-`)&&!Ir(e)){D.customElements.whenDefined(r).then(()=>{n(e,t)});return}n(e,t)},Hr=(e,t,n)=>{e.forEach(e=>{if(t in e){e[t]=n;return}let r=Pr(e),i=t.toLowerCase();r.includes(i)&&zr(e,i,n)})},Ur=(e,t,n)=>{Vr(e,t);let r=e=>{t(e?.composedPath()[0]??e.target)},i=e=>{n(e?.composedPath()[0]??e.target)};e.addEventListener(v.REGISTER_MEDIA_STATE_RECEIVER,r),e.addEventListener(v.UNREGISTER_MEDIA_STATE_RECEIVER,i);let a=e=>{e.forEach(e=>{let{addedNodes:r=[],removedNodes:i=[],type:a,target:o,attributeName:s}=e;a===`childList`?(Array.prototype.forEach.call(r,e=>Vr(e,t)),Array.prototype.forEach.call(i,e=>Vr(e,n))):a===`attributes`&&s===y.MEDIA_CHROME_ATTRIBUTES&&(Ir(o)?t(o):n(o))})},o=[],s=e=>{let r=e.target;r.name!==`media`&&(o.forEach(e=>Vr(e,n)),o=[...r.assignedElements({flatten:!0})],o.forEach(e=>Vr(e,t)))};e.addEventListener(`slotchange`,s);let c=new MutationObserver(a);return c.observe(e,{childList:!0,attributes:!0,subtree:!0}),()=>{Vr(e,n),e.removeEventListener(`slotchange`,s),c.disconnect(),e.removeEventListener(v.REGISTER_MEDIA_STATE_RECEIVER,r),e.removeEventListener(v.UNREGISTER_MEDIA_STATE_RECEIVER,i)}};D.customElements.get(`media-controller`)||D.customElements.define(`media-controller`,jr);var Wr=jr,Gr={PLACEMENT:`placement`,BOUNDS:`bounds`};function Kr(e){return`
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
  `}var qr=class extends D.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{if(!ht(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;let e=this.placement;if(e===`left`||e===`right`){this.style.removeProperty(`--media-tooltip-offset-x`);return}let t=getComputedStyle(this),n=ft(this,`#`+this.bounds)??ot(this);if(!n)return;let{x:r,width:i}=n.getBoundingClientRect(),{x:a,width:o}=this.getBoundingClientRect(),s=a+o,c=r+i,l=t.getPropertyValue(`--media-tooltip-offset-x`),u=l?parseFloat(l.replace(`px`,``)):0,d=t.getPropertyValue(`--media-tooltip-container-margin`),f=d?parseFloat(d.replace(`px`,``)):0,p=a-r+u-f,m=s-c+u+f;if(p<0){this.style.setProperty(`--media-tooltip-offset-x`,`${p}px`);return}if(m>0){this.style.setProperty(`--media-tooltip-offset-x`,`${m}px`);return}this.style.removeProperty(`--media-tooltip-offset-x`)},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=at(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector(`#arrow`),Object.prototype.hasOwnProperty.call(this,`placement`)){let e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[Gr.PLACEMENT,Gr.BOUNDS]}get placement(){return P(this,Gr.PLACEMENT)}set placement(e){F(this,Gr.PLACEMENT,e)}get bounds(){return P(this,Gr.BOUNDS)}set bounds(e){F(this,Gr.BOUNDS,e)}};qr.shadowRootOptions={mode:`open`},qr.getTemplateHTML=Kr,D.customElements.get(`media-tooltip`)||D.customElements.define(`media-tooltip`,qr);var Jr=qr,Yr=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},W=(e,t,n)=>(Yr(e,t,`read from private field`),n?n.call(e):t.get(e)),Xr=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Zr=(e,t,n,r)=>(Yr(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Qr=(e,t,n)=>(Yr(e,t,`access private method`),n),$r,ei,ti,ni,ri,ii,ai,oi={TOOLTIP_PLACEMENT:`tooltipplacement`,DISABLED:`disabled`,NO_TOOLTIP:`notooltip`};function si(e,t={}){return`
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
        <template shadowrootmode="${Jr.shadowRootOptions.mode}">
          ${Jr.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(e)}
        </slot>
      </media-tooltip>
    </slot>
  `}function ci(e,t){return`
    <slot></slot>
  `}function li(){return``}var G=class extends D.HTMLElement{constructor(){if(super(),Xr(this,ii),Xr(this,$r,void 0),this.preventClick=!1,this.tooltipEl=null,Xr(this,ei,e=>{this.preventClick||this.handleClick(e),setTimeout(W(this,ti),0)}),Xr(this,ti,()=>{var e,t;(t=(e=this.tooltipEl)?.updateXOffset)==null||t.call(e)}),Xr(this,ni,e=>{let{key:t}=e;if(!this.keysUsed.includes(t)){this.removeEventListener(`keyup`,W(this,ni));return}this.preventClick||this.handleClick(e)}),Xr(this,ri,e=>{let{metaKey:t,altKey:n,key:r}=e;if(t||n||!this.keysUsed.includes(r)){this.removeEventListener(`keyup`,W(this,ni));return}this.addEventListener(`keyup`,W(this,ni),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=at(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}this.tooltipEl=this.shadowRoot.querySelector(`media-tooltip`)}static get observedAttributes(){return[`disabled`,oi.TOOLTIP_PLACEMENT,y.MEDIA_CONTROLLER,b.MEDIA_LANG]}enable(){this.addEventListener(`click`,W(this,ei)),this.addEventListener(`keydown`,W(this,ri)),this.tabIndex=0}disable(){this.removeEventListener(`click`,W(this,ei)),this.removeEventListener(`keydown`,W(this,ri)),this.removeEventListener(`keyup`,W(this,ni)),this.tabIndex=-1}attributeChangedCallback(e,t,n){var r,i,a,o;e===y.MEDIA_CONTROLLER?(t&&((i=(r=W(this,$r))?.unassociateElement)==null||i.call(r,this),Zr(this,$r,null)),n&&this.isConnected&&(Zr(this,$r,this.getRootNode()?.getElementById(n)),(o=(a=W(this,$r))?.associateElement)==null||o.call(a,this))):e===`disabled`&&n!==t?n==null?this.enable():this.disable():e===oi.TOOLTIP_PLACEMENT&&this.tooltipEl&&n!==t?this.tooltipEl.placement=n:e===b.MEDIA_LANG&&(this.shadowRoot.querySelector(`slot[name="tooltip-content"]`).innerHTML=this.constructor.getTooltipContentHTML()),W(this,ti).call(this)}connectedCallback(){var e,t;let{style:n}=k(this.shadowRoot,`:host`);n.setProperty(`display`,`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute(`disabled`)?this.disable():this.enable(),this.setAttribute(`role`,`button`);let r=this.getAttribute(y.MEDIA_CONTROLLER);r&&(Zr(this,$r,this.getRootNode()?.getElementById(r)),(t=(e=W(this,$r))?.associateElement)==null||t.call(e,this)),D.customElements.whenDefined(`media-tooltip`).then(()=>Qr(this,ii,ai).call(this))}disconnectedCallback(){var e,t;this.disable(),(t=(e=W(this,$r))?.unassociateElement)==null||t.call(e,this),Zr(this,$r,null),this.removeEventListener(`mouseenter`,W(this,ti)),this.removeEventListener(`focus`,W(this,ti)),this.removeEventListener(`click`,W(this,ei))}get keysUsed(){return[`Enter`,` `]}get tooltipPlacement(){return P(this,oi.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){F(this,oi.TOOLTIP_PLACEMENT,e)}get mediaController(){return P(this,y.MEDIA_CONTROLLER)}set mediaController(e){F(this,y.MEDIA_CONTROLLER,e)}get disabled(){return M(this,oi.DISABLED)}set disabled(e){N(this,oi.DISABLED,e)}get noTooltip(){return M(this,oi.NO_TOOLTIP)}set noTooltip(e){N(this,oi.NO_TOOLTIP,e)}handleClick(e){}};$r=new WeakMap,ei=new WeakMap,ti=new WeakMap,ni=new WeakMap,ri=new WeakMap,ii=new WeakSet,ai=function(){this.addEventListener(`mouseenter`,W(this,ti)),this.addEventListener(`focus`,W(this,ti)),this.addEventListener(`click`,W(this,ei));let e=this.tooltipPlacement;e&&this.tooltipEl&&(this.tooltipEl.placement=e)},G.shadowRootOptions={mode:`open`},G.getTemplateHTML=si,G.getSlotTemplateHTML=ci,G.getTooltipContentHTML=li,D.customElements.get(`media-chrome-button`)||D.customElements.define(`media-chrome-button`,G);var ui=G,di=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;function fi(e){return`
    <style>
      :host([${b.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${b.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${b.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
      :host(:not([${b.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${di}</slot>
      <slot name="exit">${di}</slot>
    </slot>
  `}function pi(){return`
    <slot name="tooltip-enter">${E(`start airplay`)}</slot>
    <slot name="tooltip-exit">${E(`stop airplay`)}</slot>
  `}var mi=e=>{let t=e.mediaIsAirplaying?E(`stop airplay`):E(`start airplay`);e.setAttribute(`aria-label`,t)},hi=class extends G{static get observedAttributes(){return[...super.observedAttributes,b.MEDIA_IS_AIRPLAYING,b.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),mi(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===b.MEDIA_IS_AIRPLAYING&&mi(this)}get mediaIsAirplaying(){return M(this,b.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){N(this,b.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return P(this,b.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){F(this,b.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){let e=new D.CustomEvent(v.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}};hi.getSlotTemplateHTML=fi,hi.getTooltipContentHTML=pi,D.customElements.get(`media-airplay-button`)||D.customElements.define(`media-airplay-button`,hi);var gi=hi,_i=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,vi=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function yi(e){return`
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
      <slot name="on">${_i}</slot>
      <slot name="off">${vi}</slot>
    </slot>
  `}function bi(){return`
    <slot name="tooltip-enable">${E(`Enable captions`)}</slot>
    <slot name="tooltip-disable">${E(`Disable captions`)}</slot>
  `}var xi=e=>{e.setAttribute(`aria-checked`,En(e).toString())},Si=class extends G{static get observedAttributes(){return[...super.observedAttributes,b.MEDIA_SUBTITLES_LIST,b.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`button`),this.setAttribute(`aria-label`,E(`closed captions`)),xi(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===b.MEDIA_SUBTITLES_SHOWING&&xi(this)}get mediaSubtitlesList(){return Ci(this,b.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){wi(this,b.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Ci(this,b.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){wi(this,b.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new D.CustomEvent(v.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}};Si.getSlotTemplateHTML=yi,Si.getTooltipContentHTML=bi;var Ci=(e,t)=>{let n=e.getAttribute(t);return n?vn(n):[]},wi=(e,t,n)=>{if(!n?.length){e.removeAttribute(t);return}let r=xn(n);e.getAttribute(t)!==r&&e.setAttribute(t,r)};D.customElements.get(`media-captions-button`)||D.customElements.define(`media-captions-button`,Si);var Ti=Si,Ei=`<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>`,Di=`<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>`;function Oi(e){return`
    <style>
      :host([${b.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${b.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${b.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
      :host(:not([${b.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Ei}</slot>
      <slot name="exit">${Di}</slot>
    </slot>
  `}function ki(){return`
    <slot name="tooltip-enter">${E(`Start casting`)}</slot>
    <slot name="tooltip-exit">${E(`Stop casting`)}</slot>
  `}var Ai=e=>{let t=e.mediaIsCasting?E(`stop casting`):E(`start casting`);e.setAttribute(`aria-label`,t)},ji=class extends G{static get observedAttributes(){return[...super.observedAttributes,b.MEDIA_IS_CASTING,b.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Ai(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===b.MEDIA_IS_CASTING&&Ai(this)}get mediaIsCasting(){return M(this,b.MEDIA_IS_CASTING)}set mediaIsCasting(e){N(this,b.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return P(this,b.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){F(this,b.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){let e=this.mediaIsCasting?v.MEDIA_EXIT_CAST_REQUEST:v.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new D.CustomEvent(e,{composed:!0,bubbles:!0}))}};ji.getSlotTemplateHTML=Oi,ji.getTooltipContentHTML=ki,D.customElements.get(`media-cast-button`)||D.customElements.define(`media-cast-button`,ji);var Mi=ji,Ni=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Pi=(e,t,n)=>(Ni(e,t,`read from private field`),n?n.call(e):t.get(e)),Fi=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Ii=(e,t,n,r)=>(Ni(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Li=(e,t,n)=>(Ni(e,t,`access private method`),n),Ri,zi,Bi,Vi,Hi,Ui,Wi,Gi,Ki,qi,Ji,Yi,Xi,Zi,Qi;function $i(e){return`
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
  `}function ea(e){return`
    <slot id="content"></slot>
  `}var ta={OPEN:`open`,ANCHOR:`anchor`},na=class extends D.HTMLElement{constructor(){super(),Fi(this,Vi),Fi(this,Ui),Fi(this,Gi),Fi(this,qi),Fi(this,Yi),Fi(this,Zi),Fi(this,Ri,!1),Fi(this,zi,null),Fi(this,Bi,null)}static get observedAttributes(){return[ta.OPEN,ta.ANCHOR]}get open(){return M(this,ta.OPEN)}set open(e){N(this,ta.OPEN,e)}handleEvent(e){switch(e.type){case`invoke`:Li(this,qi,Ji).call(this,e);break;case`focusout`:Li(this,Yi,Xi).call(this,e);break;case`keydown`:Li(this,Zi,Qi).call(this,e);break}}connectedCallback(){Li(this,Vi,Hi).call(this),this.role||=`dialog`,this.addEventListener(`invoke`,this),this.addEventListener(`focusout`,this),this.addEventListener(`keydown`,this)}disconnectedCallback(){this.removeEventListener(`invoke`,this),this.removeEventListener(`focusout`,this),this.removeEventListener(`keydown`,this)}attributeChangedCallback(e,t,n){Li(this,Vi,Hi).call(this),e===ta.OPEN&&n!==t&&(this.open?Li(this,Ui,Wi).call(this):Li(this,Gi,Ki).call(this))}focus(){Ii(this,zi,pt());let e=!this.dispatchEvent(new Event(`focus`,{composed:!0,cancelable:!0})),t=!this.dispatchEvent(new Event(`focusin`,{composed:!0,bubbles:!0,cancelable:!0}));e||t||this.querySelector(`[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]`)?.focus()}get keysUsed(){return[`Escape`,`Tab`]}};Ri=new WeakMap,zi=new WeakMap,Bi=new WeakMap,Vi=new WeakSet,Hi=function(){if(!Pi(this,Ri)&&(Ii(this,Ri,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);let e=at(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e),queueMicrotask(()=>{let{style:e}=k(this.shadowRoot,`:host`);e.setProperty(`transition`,`display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in`)})}},Ui=new WeakSet,Wi=function(){var e;(e=Pi(this,Bi))==null||e.setAttribute(`aria-expanded`,`true`),this.dispatchEvent(new Event(`open`,{composed:!0,bubbles:!0})),this.addEventListener(`transitionend`,()=>this.focus(),{once:!0})},Gi=new WeakSet,Ki=function(){var e;(e=Pi(this,Bi))==null||e.setAttribute(`aria-expanded`,`false`),this.dispatchEvent(new Event(`close`,{composed:!0,bubbles:!0}))},qi=new WeakSet,Ji=function(e){Ii(this,Bi,e.relatedTarget),dt(this,e.relatedTarget)||(this.open=!this.open)},Yi=new WeakSet,Xi=function(e){var t;dt(this,e.relatedTarget)||((t=Pi(this,zi))==null||t.focus(),Pi(this,Bi)&&Pi(this,Bi)!==e.relatedTarget&&this.open&&(this.open=!1))},Zi=new WeakSet,Qi=function(e){var t,n,r,i,a;let{key:o,ctrlKey:s,altKey:c,metaKey:l}=e;s||c||l||this.keysUsed.includes(o)&&(e.preventDefault(),e.stopPropagation(),o===`Tab`?(e.shiftKey?(n=(t=this.previousElementSibling)?.focus)==null||n.call(t):(i=(r=this.nextElementSibling)?.focus)==null||i.call(r),this.blur()):o===`Escape`&&((a=Pi(this,zi))==null||a.focus(),this.open=!1))},na.shadowRootOptions={mode:`open`},na.getTemplateHTML=$i,na.getSlotTemplateHTML=ea,D.customElements.get(`media-chrome-dialog`)||D.customElements.define(`media-chrome-dialog`,na);var ra=na,ia=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},K=(e,t,n)=>(ia(e,t,`read from private field`),n?n.call(e):t.get(e)),q=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},aa=(e,t,n,r)=>(ia(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),oa=(e,t,n)=>(ia(e,t,`access private method`),n),sa,ca,la,ua,da,fa,pa,ma,ha,ga,_a,va,ya,ba,xa,Sa,Ca,wa,Ta,Ea,Da,Oa,ka,Aa,ja;function Ma(e){return`
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
  `}function Na(e){return``}var Pa=class extends D.HTMLElement{constructor(){if(super(),q(this,ga),q(this,va),q(this,ba),q(this,Sa),q(this,wa),q(this,Ea),q(this,Oa),q(this,Aa),q(this,sa,void 0),q(this,ca,void 0),q(this,la,void 0),q(this,ua,void 0),q(this,da,{}),q(this,fa,[]),q(this,pa,()=>{if(this.range.matches(`:focus-visible`)){let{style:e}=k(this.shadowRoot,`:host`);e.setProperty(`--_focus-visible-box-shadow`,`var(--_focus-box-shadow)`)}}),q(this,ma,()=>{let{style:e}=k(this.shadowRoot,`:host`);e.removeProperty(`--_focus-visible-box-shadow`)}),q(this,ha,()=>{let e=this.shadowRoot.querySelector(`#segments-clipping`);e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=at(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}this.container=this.shadowRoot.querySelector(`#container`),aa(this,la,this.shadowRoot.querySelector(`#startpoint`)),aa(this,ua,this.shadowRoot.querySelector(`#endpoint`)),this.range=this.shadowRoot.querySelector(`#range`),this.appearance=this.shadowRoot.querySelector(`#appearance`)}static get observedAttributes(){return[`disabled`,`aria-disabled`,y.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,n){var r,i,a,o;e===y.MEDIA_CONTROLLER?(t&&((i=(r=K(this,sa))?.unassociateElement)==null||i.call(r,this),aa(this,sa,null)),n&&this.isConnected&&(aa(this,sa,this.getRootNode()?.getElementById(n)),(o=(a=K(this,sa))?.associateElement)==null||o.call(a,this))):(e===`disabled`||e===`aria-disabled`&&t!==n)&&(n==null?(this.range.removeAttribute(e),oa(this,va,ya).call(this)):(this.range.setAttribute(e,n),oa(this,ba,xa).call(this)))}connectedCallback(){var e,t;let{style:n}=k(this.shadowRoot,`:host`);n.setProperty(`display`,`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),K(this,da).pointer=k(this.shadowRoot,`#pointer`),K(this,da).progress=k(this.shadowRoot,`#progress`),K(this,da).thumb=k(this.shadowRoot,`#thumb, ::slotted([slot="thumb"])`),K(this,da).activeSegment=k(this.shadowRoot,`#segments-clipping rect:nth-child(0)`);let r=this.getAttribute(y.MEDIA_CONTROLLER);r&&(aa(this,sa,this.getRootNode()?.getElementById(r)),(t=(e=K(this,sa))?.associateElement)==null||t.call(e,this)),this.updateBar(),this.shadowRoot.addEventListener(`focusin`,K(this,pa)),this.shadowRoot.addEventListener(`focusout`,K(this,ma)),oa(this,va,ya).call(this),rt(this.container,K(this,ha))}disconnectedCallback(){var e,t;oa(this,ba,xa).call(this),(t=(e=K(this,sa))?.unassociateElement)==null||t.call(e,this),aa(this,sa,null),this.shadowRoot.removeEventListener(`focusin`,K(this,pa)),this.shadowRoot.removeEventListener(`focusout`,K(this,ma)),it(this.container,K(this,ha))}updatePointerBar(e){var t;(t=K(this,da).pointer)==null||t.style.setProperty(`width`,`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,t;let n=this.range.valueAsNumber*100;(e=K(this,da).progress)==null||e.style.setProperty(`width`,`${n}%`),(t=K(this,da).thumb)==null||t.style.setProperty(`left`,`${n}%`)}updateSegments(e){let t=this.shadowRoot.querySelector(`#segments-clipping`);if(t.textContent=``,this.container.classList.toggle(`segments`,!!e?.length),!e?.length)return;let n=[...new Set([+this.range.min,...e.flatMap(e=>[e.start,e.end]),+this.range.max])];aa(this,fa,[...n]);let r=n.pop();for(let[e,i]of n.entries()){let[a,o]=[e===0,e===n.length-1],s=a?`calc(var(--segments-gap) / -1)`:`${i*100}%`,c=`calc(${((o?r:n[e+1])-i)*100}%${a||o?``:` - var(--segments-gap)`})`,l=O.createElementNS(`http://www.w3.org/2000/svg`,`rect`),u=vt(this.shadowRoot,`#segments-clipping rect:nth-child(${e+1})`);u.style.setProperty(`x`,s),u.style.setProperty(`width`,c),t.append(l)}}getPointerRatio(e){return gt(e.clientX,e.clientY,K(this,la).getBoundingClientRect(),K(this,ua).getBoundingClientRect())}get dragging(){return this.hasAttribute(`dragging`)}handleEvent(e){switch(e.type){case`pointermove`:oa(this,Aa,ja).call(this,e);break;case`input`:this.updateBar();break;case`pointerenter`:oa(this,wa,Ta).call(this,e);break;case`pointerdown`:oa(this,Sa,Ca).call(this,e);break;case`pointerup`:oa(this,Ea,Da).call(this);break;case`pointerleave`:oa(this,Oa,ka).call(this);break}}get keysUsed(){return[`ArrowUp`,`ArrowRight`,`ArrowDown`,`ArrowLeft`]}};sa=new WeakMap,ca=new WeakMap,la=new WeakMap,ua=new WeakMap,da=new WeakMap,fa=new WeakMap,pa=new WeakMap,ma=new WeakMap,ha=new WeakMap,ga=new WeakSet,_a=function(e){let t=K(this,da).activeSegment;if(!t)return;let n=this.getPointerRatio(e),r=`#segments-clipping rect:nth-child(${K(this,fa).findIndex((e,t,r)=>{let i=r[t+1];return i!=null&&n>=e&&n<=i})+1})`;(t.selectorText!=r||!t.style.transform)&&(t.selectorText=r,t.style.setProperty(`transform`,`var(--media-range-segment-hover-transform, scaleY(2))`))},va=new WeakSet,ya=function(){this.hasAttribute(`disabled`)||!this.isConnected||(this.addEventListener(`input`,this),this.addEventListener(`pointerdown`,this),this.addEventListener(`pointerenter`,this))},ba=new WeakSet,xa=function(){var e,t;this.removeEventListener(`input`,this),this.removeEventListener(`pointerdown`,this),this.removeEventListener(`pointerenter`,this),this.removeEventListener(`pointerleave`,this),(e=D.window)==null||e.removeEventListener(`pointerup`,this),(t=D.window)==null||t.removeEventListener(`pointermove`,this)},Sa=new WeakSet,Ca=function(e){var t;aa(this,ca,e.composedPath().includes(this.range)),(t=D.window)==null||t.addEventListener(`pointerup`,this,{once:!0})},wa=new WeakSet,Ta=function(e){var t;e.pointerType!==`mouse`&&oa(this,Sa,Ca).call(this,e),this.addEventListener(`pointerleave`,this,{once:!0}),(t=D.window)==null||t.addEventListener(`pointermove`,this)},Ea=new WeakSet,Da=function(){var e;(e=D.window)==null||e.removeEventListener(`pointerup`,this),this.toggleAttribute(`dragging`,!1),this.range.disabled=this.hasAttribute(`disabled`)},Oa=new WeakSet,ka=function(){var e,t;this.removeEventListener(`pointerleave`,this),(e=D.window)==null||e.removeEventListener(`pointermove`,this),this.toggleAttribute(`dragging`,!1),this.range.disabled=this.hasAttribute(`disabled`),(t=K(this,da).activeSegment)==null||t.style.removeProperty(`transform`)},Aa=new WeakSet,ja=function(e){e.pointerType===`pen`&&e.buttons===0||(this.toggleAttribute(`dragging`,e.buttons===1||e.pointerType!==`mouse`),this.updatePointerBar(e),oa(this,ga,_a).call(this,e),this.dragging&&(e.pointerType!==`mouse`||!K(this,ca))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(e),this.range.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0}))))},Pa.shadowRootOptions={mode:`open`},Pa.getTemplateHTML=Ma,Pa.getContainerTemplateHTML=Na,D.customElements.get(`media-chrome-range`)||D.customElements.define(`media-chrome-range`,Pa);var Fa=Pa,Ia=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},La=(e,t,n)=>(Ia(e,t,`read from private field`),n?n.call(e):t.get(e)),Ra=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},za=(e,t,n,r)=>(Ia(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Ba;function Va(e){return`
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
  `}var Ha=class extends D.HTMLElement{constructor(){if(super(),Ra(this,Ba,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=at(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[y.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,n){var r,i,a,o;e===y.MEDIA_CONTROLLER&&(t&&((i=(r=La(this,Ba))?.unassociateElement)==null||i.call(r,this),za(this,Ba,null)),n&&this.isConnected&&(za(this,Ba,this.getRootNode()?.getElementById(n)),(o=(a=La(this,Ba))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;let n=this.getAttribute(y.MEDIA_CONTROLLER);n&&(za(this,Ba,this.getRootNode()?.getElementById(n)),(t=(e=La(this,Ba))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=La(this,Ba))?.unassociateElement)==null||t.call(e,this),za(this,Ba,null)}};Ba=new WeakMap,Ha.shadowRootOptions={mode:`open`},Ha.getTemplateHTML=Va,D.customElements.get(`media-control-bar`)||D.customElements.define(`media-control-bar`,Ha);var Ua=Ha,Wa=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Ga=(e,t,n)=>(Wa(e,t,`read from private field`),n?n.call(e):t.get(e)),Ka=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},qa=(e,t,n,r)=>(Wa(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Ja;function Ya(e,t={}){return`
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
  `}function Xa(e,t){return`
    <slot></slot>
  `}var Za=class extends D.HTMLElement{constructor(){if(super(),Ka(this,Ja,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=at(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[y.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,n){var r,i,a,o;e===y.MEDIA_CONTROLLER&&(t&&((i=(r=Ga(this,Ja))?.unassociateElement)==null||i.call(r,this),qa(this,Ja,null)),n&&this.isConnected&&(qa(this,Ja,this.getRootNode()?.getElementById(n)),(o=(a=Ga(this,Ja))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;let{style:n}=k(this.shadowRoot,`:host`);n.setProperty(`display`,`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);let r=this.getAttribute(y.MEDIA_CONTROLLER);r&&(qa(this,Ja,this.getRootNode()?.getElementById(r)),(t=(e=Ga(this,Ja))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=Ga(this,Ja))?.unassociateElement)==null||t.call(e,this),qa(this,Ja,null)}};Ja=new WeakMap,Za.shadowRootOptions={mode:`open`},Za.getTemplateHTML=Ya,Za.getSlotTemplateHTML=Xa,D.customElements.get(`media-text-display`)||D.customElements.define(`media-text-display`,Za);var Qa=Za,$a=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},eo=(e,t,n)=>($a(e,t,`read from private field`),n?n.call(e):t.get(e)),to=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},no=(e,t,n,r)=>($a(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),ro;function io(e,t){return`
    <slot>${Ge(t.mediaDuration)}</slot>
  `}var ao=class extends Za{constructor(){super(),to(this,ro,void 0),no(this,ro,this.shadowRoot.querySelector(`slot`)),eo(this,ro).textContent=Ge(this.mediaDuration??0)}static get observedAttributes(){return[...super.observedAttributes,b.MEDIA_DURATION]}attributeChangedCallback(e,t,n){e===b.MEDIA_DURATION&&(eo(this,ro).textContent=Ge(+n)),super.attributeChangedCallback(e,t,n)}get mediaDuration(){return A(this,b.MEDIA_DURATION)}set mediaDuration(e){j(this,b.MEDIA_DURATION,e)}};ro=new WeakMap,ao.getSlotTemplateHTML=io,D.customElements.get(`media-duration-display`)||D.customElements.define(`media-duration-display`,ao);var oo=ao,so={2:E(`Network Error`),3:E(`Decode Error`),4:E(`Source Not Supported`),5:E(`Encryption Error`)},co={2:E(`A network error caused the media download to fail.`),3:E(`A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.`),4:E(`An unsupported error occurred. The server or network failed, or your browser does not support this format.`),5:E(`The media is encrypted and there are no keys to decrypt it.`)},lo=e=>e.code===1?null:{title:so[e.code]??`Error ${e.code}`,message:co[e.code]??e.message},uo=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},fo=(e,t,n)=>(uo(e,t,`read from private field`),n?n.call(e):t.get(e)),po=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},mo=(e,t,n,r)=>(uo(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),ho;function go(e){return`
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
      ${vo({code:+e.mediaerrorcode,message:e.mediaerrormessage})}
    </slot>
  `}function _o(e){return e.code&&lo(e)!==null}function vo(e){let{title:t,message:n}=lo(e)??{},r=``;return t&&(r+=`<slot name="error-${e.code}-title"><h3>${t}</h3></slot>`),n&&(r+=`<slot name="error-${e.code}-message"><p>${n}</p></slot>`),r}var yo=[b.MEDIA_ERROR_CODE,b.MEDIA_ERROR_MESSAGE],bo=class extends na{constructor(){super(...arguments),po(this,ho,null)}static get observedAttributes(){return[...super.observedAttributes,...yo]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),!yo.includes(e))return;let r=this.mediaError??{code:this.mediaErrorCode,message:this.mediaErrorMessage};if(this.open=_o(r),this.open&&(this.shadowRoot.querySelector(`slot`).name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector(`#content`).innerHTML=this.formatErrorMessage(r),!this.hasAttribute(`aria-label`))){let{title:e}=lo(r);e&&this.setAttribute(`aria-label`,e)}}get mediaError(){return fo(this,ho)}set mediaError(e){mo(this,ho,e)}get mediaErrorCode(){return A(this,`mediaerrorcode`)}set mediaErrorCode(e){j(this,`mediaerrorcode`,e)}get mediaErrorMessage(){return P(this,`mediaerrormessage`)}set mediaErrorMessage(e){F(this,`mediaerrormessage`,e)}};ho=new WeakMap,bo.getSlotTemplateHTML=go,bo.formatErrorMessage=vo,D.customElements.get(`media-error-dialog`)||D.customElements.define(`media-error-dialog`,bo);var xo=bo,So=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Co=(e,t,n)=>(So(e,t,`read from private field`),n?n.call(e):t.get(e)),wo=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},To,Eo;function Do(e){return`
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
      ${Oo()}
    </slot>
  `}function Oo(){return`
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${[{keys:[`Space`,`k`],description:`Toggle Playback`},{keys:[`m`],description:`Toggle mute`},{keys:[`f`],description:`Toggle fullscreen`},{keys:[`c`],description:`Toggle captions or subtitles, if available`},{keys:[`p`],description:`Toggle Picture in Picture`},{keys:[`←`,`j`],description:`Seek back 10s`},{keys:[`→`,`l`],description:`Seek forward 10s`},{keys:[`↑`],description:`Turn volume up`},{keys:[`↓`],description:`Turn volume down`},{keys:[`< (SHIFT+,)`],description:`Decrease playback rate`},{keys:[`> (SHIFT+.)`],description:`Increase playback rate`}].map(({keys:e,description:t})=>`
      <tr>
        <td>
          <div class="key-combo">${e.map((e,t)=>t>0?`<span class="key-separator">or</span><span class="key">${e}</span>`:`<span class="key">${e}</span>`).join(``)}</div>
        </td>
        <td class="description">${t}</td>
      </tr>
    `).join(``)}</table>
  `}var ko=class extends na{constructor(){super(...arguments),wo(this,To,e=>{if(!this.open)return;let t=this.shadowRoot?.querySelector(`#content`);if(!t)return;let n=e.composedPath(),r=n[0]===this||n.includes(this),i=n.includes(t);r&&!i&&(this.open=!1)}),wo(this,Eo,e=>{if(!this.open)return;let t=e.shiftKey&&(e.key===`/`||e.key===`?`);(e.key===`Escape`||t)&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(this.open=!1,e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),this.open&&(this.addEventListener(`click`,Co(this,To)),document.addEventListener(`keydown`,Co(this,Eo)))}disconnectedCallback(){this.removeEventListener(`click`,Co(this,To)),document.removeEventListener(`keydown`,Co(this,Eo))}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===`open`&&(this.open?(this.addEventListener(`click`,Co(this,To)),document.addEventListener(`keydown`,Co(this,Eo))):(this.removeEventListener(`click`,Co(this,To)),document.removeEventListener(`keydown`,Co(this,Eo))))}};To=new WeakMap,Eo=new WeakMap,ko.getSlotTemplateHTML=Do,D.customElements.get(`media-keyboard-shortcuts-dialog`)||D.customElements.define(`media-keyboard-shortcuts-dialog`,ko);var Ao=ko,jo=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Mo=(e,t,n)=>(jo(e,t,`read from private field`),n?n.call(e):t.get(e)),No=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Po=(e,t,n,r)=>(jo(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Fo,Io=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,Lo=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;function Ro(e){return`
    <style>
      :host([${b.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${b.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${b.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
      :host(:not([${b.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Io}</slot>
      <slot name="exit">${Lo}</slot>
    </slot>
  `}function zo(){return`
    <slot name="tooltip-enter">${E(`Enter fullscreen mode`)}</slot>
    <slot name="tooltip-exit">${E(`Exit fullscreen mode`)}</slot>
  `}var Bo=e=>{let t=e.mediaIsFullscreen?E(`exit fullscreen mode`):E(`enter fullscreen mode`);e.setAttribute(`aria-label`,t)},Vo=class extends G{constructor(){super(...arguments),No(this,Fo,null)}static get observedAttributes(){return[...super.observedAttributes,b.MEDIA_IS_FULLSCREEN,b.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Bo(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===b.MEDIA_IS_FULLSCREEN&&Bo(this)}get mediaFullscreenUnavailable(){return P(this,b.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){F(this,b.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return M(this,b.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){N(this,b.MEDIA_IS_FULLSCREEN,e)}handleClick(e){Po(this,Fo,e);let t=Mo(this,Fo)instanceof PointerEvent,n=this.mediaIsFullscreen?new D.CustomEvent(v.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0}):new D.CustomEvent(v.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0,detail:t});this.dispatchEvent(n)}};Fo=new WeakMap,Vo.getSlotTemplateHTML=Ro,Vo.getTooltipContentHTML=zo,D.customElements.get(`media-fullscreen-button`)||D.customElements.define(`media-fullscreen-button`,Vo);var Ho=Vo,{MEDIA_TIME_IS_LIVE:Uo,MEDIA_PAUSED:Wo}=b,{MEDIA_SEEK_TO_LIVE_REQUEST:Go,MEDIA_PLAY_REQUEST:Ko}=v,qo=`<svg viewBox="0 0 6 12" aria-hidden="true"><circle cx="3" cy="6" r="2"></circle></svg>`;function Jo(e){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${Uo}]:not([${Wo}])) slot[name=indicator] > *,
      :host([${Uo}]:not([${Wo}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${Uo}]:not([${Wo}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${qo}</slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${E(`live`)}</slot>
  `}var Yo=e=>{let t=e.mediaPaused||!e.mediaTimeIsLive,n=E(t?`seek to live`:`playing live`);e.setAttribute(`aria-label`,n);let r=e.shadowRoot?.querySelector(`slot[name="text"]`);r&&(r.textContent=E(`live`)),t?e.removeAttribute(`aria-disabled`):e.setAttribute(`aria-disabled`,`true`)},Xo=class extends G{static get observedAttributes(){return[...super.observedAttributes,Uo,Wo]}connectedCallback(){super.connectedCallback(),Yo(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),Yo(this)}get mediaPaused(){return M(this,b.MEDIA_PAUSED)}set mediaPaused(e){N(this,b.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return M(this,b.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){N(this,b.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new D.CustomEvent(Go,{composed:!0,bubbles:!0})),this.hasAttribute(Wo)&&this.dispatchEvent(new D.CustomEvent(Ko,{composed:!0,bubbles:!0})))}};Xo.getSlotTemplateHTML=Jo,D.customElements.get(`media-live-button`)||D.customElements.define(`media-live-button`,Xo);var Zo=Xo,Qo=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},$o=(e,t,n)=>(Qo(e,t,`read from private field`),n?n.call(e):t.get(e)),es=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},ts=(e,t,n,r)=>(Qo(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),ns,rs,is={LOADING_DELAY:`loadingdelay`,NO_AUTOHIDE:`noautohide`},as=500,os=`
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
`;function ss(e){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${as}ms);
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

      :host([${b.MEDIA_LOADING}]:not([${b.MEDIA_PAUSED}])) slot[name=icon] > *,
      :host([${b.MEDIA_LOADING}]:not([${b.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 1);
        transition: opacity 0.15s var(--_loading-indicator-delay);
      }

      :host #status {
        visibility: var(--media-loading-indicator-opacity, hidden);
        transition: visibility 0.15s;
      }

      :host([${b.MEDIA_LOADING}]:not([${b.MEDIA_PAUSED}])) #status {
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

    <slot name="icon">${os}</slot>
    <div id="status" role="status" aria-live="polite">${E(`media loading`)}</div>
  `}var cs=class extends D.HTMLElement{constructor(){if(super(),es(this,ns,void 0),es(this,rs,as),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=at(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[y.MEDIA_CONTROLLER,b.MEDIA_PAUSED,b.MEDIA_LOADING,is.LOADING_DELAY]}attributeChangedCallback(e,t,n){var r,i,a,o;e===is.LOADING_DELAY&&t!==n?this.loadingDelay=Number(n):e===y.MEDIA_CONTROLLER&&(t&&((i=(r=$o(this,ns))?.unassociateElement)==null||i.call(r,this),ts(this,ns,null)),n&&this.isConnected&&(ts(this,ns,this.getRootNode()?.getElementById(n)),(o=(a=$o(this,ns))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;let n=this.getAttribute(y.MEDIA_CONTROLLER);n&&(ts(this,ns,this.getRootNode()?.getElementById(n)),(t=(e=$o(this,ns))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=$o(this,ns))?.unassociateElement)==null||t.call(e,this),ts(this,ns,null)}get loadingDelay(){return $o(this,rs)}set loadingDelay(e){ts(this,rs,e);let{style:t}=k(this.shadowRoot,`:host`);t.setProperty(`--_loading-indicator-delay`,`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return M(this,b.MEDIA_PAUSED)}set mediaPaused(e){N(this,b.MEDIA_PAUSED,e)}get mediaLoading(){return M(this,b.MEDIA_LOADING)}set mediaLoading(e){N(this,b.MEDIA_LOADING,e)}get mediaController(){return P(this,y.MEDIA_CONTROLLER)}set mediaController(e){F(this,y.MEDIA_CONTROLLER,e)}get noAutohide(){return M(this,is.NO_AUTOHIDE)}set noAutohide(e){N(this,is.NO_AUTOHIDE,e)}};ns=new WeakMap,rs=new WeakMap,cs.shadowRootOptions={mode:`open`},cs.getTemplateHTML=ss,D.customElements.get(`media-loading-indicator`)||D.customElements.define(`media-loading-indicator`,cs);var ls=cs,us=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,ds=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,fs=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;function ps(e){return`
    <style>
      :host(:not([${b.MEDIA_VOLUME_LEVEL}])) slot[name=icon] slot:not([name=high]),
      :host([${b.MEDIA_VOLUME_LEVEL}=high]) slot[name=icon] slot:not([name=high]) {
        display: none !important;
      }

      :host([${b.MEDIA_VOLUME_LEVEL}=off]) slot[name=icon] slot:not([name=off]) {
        display: none !important;
      }

      :host([${b.MEDIA_VOLUME_LEVEL}=low]) slot[name=icon] slot:not([name=low]) {
        display: none !important;
      }

      :host([${b.MEDIA_VOLUME_LEVEL}=medium]) slot[name=icon] slot:not([name=medium]) {
        display: none !important;
      }

      :host(:not([${b.MEDIA_VOLUME_LEVEL}=off])) slot[name=tooltip-unmute],
      :host([${b.MEDIA_VOLUME_LEVEL}=off]) slot[name=tooltip-mute] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="off">${us}</slot>
      <slot name="low">${ds}</slot>
      <slot name="medium">${ds}</slot>
      <slot name="high">${fs}</slot>
    </slot>
  `}function ms(){return`
    <slot name="tooltip-mute">${E(`Mute`)}</slot>
    <slot name="tooltip-unmute">${E(`Unmute`)}</slot>
  `}var hs=e=>{let t=e.mediaVolumeLevel===`off`?E(`unmute`):E(`mute`);e.setAttribute(`aria-label`,t)},gs=class extends G{static get observedAttributes(){return[...super.observedAttributes,b.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),hs(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===b.MEDIA_VOLUME_LEVEL&&hs(this)}get mediaVolumeLevel(){return P(this,b.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){F(this,b.MEDIA_VOLUME_LEVEL,e)}handleClick(){let e=this.mediaVolumeLevel===`off`?v.MEDIA_UNMUTE_REQUEST:v.MEDIA_MUTE_REQUEST;this.dispatchEvent(new D.CustomEvent(e,{composed:!0,bubbles:!0}))}};gs.getSlotTemplateHTML=ps,gs.getTooltipContentHTML=ms,D.customElements.get(`media-mute-button`)||D.customElements.define(`media-mute-button`,gs);var _s=gs,vs=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;function ys(e){return`
    <style>
      :host([${b.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      :host(:not([${b.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${b.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
      :host(:not([${b.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${vs}</slot>
      <slot name="exit">${vs}</slot>
    </slot>
  `}function bs(){return`
    <slot name="tooltip-enter">${E(`Enter picture in picture mode`)}</slot>
    <slot name="tooltip-exit">${E(`Exit picture in picture mode`)}</slot>
  `}var xs=e=>{let t=e.mediaIsPip?E(`exit picture in picture mode`):E(`enter picture in picture mode`);e.setAttribute(`aria-label`,t)},Ss=class extends G{static get observedAttributes(){return[...super.observedAttributes,b.MEDIA_IS_PIP,b.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),xs(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===b.MEDIA_IS_PIP&&xs(this)}get mediaPipUnavailable(){return P(this,b.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){F(this,b.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return M(this,b.MEDIA_IS_PIP)}set mediaIsPip(e){N(this,b.MEDIA_IS_PIP,e)}handleClick(){let e=this.mediaIsPip?v.MEDIA_EXIT_PIP_REQUEST:v.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new D.CustomEvent(e,{composed:!0,bubbles:!0}))}};Ss.getSlotTemplateHTML=ys,Ss.getTooltipContentHTML=bs,D.customElements.get(`media-pip-button`)||D.customElements.define(`media-pip-button`,Ss);var Cs=Ss,ws=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Ts=(e,t,n)=>(ws(e,t,`read from private field`),n?n.call(e):t.get(e)),Es=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Ds,Os={RATES:`rates`},ks=[1,1.2,1.5,1.7,2];function As(e){return Math.round(e*100)/100}function js(e){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${e.mediaplaybackrate?As(+e.mediaplaybackrate):1}x</slot>
  `}function Ms(){return E(`Playback rate`)}var Ns=class extends G{constructor(){super(),Es(this,Ds,new hn(this,Os.RATES,{defaultValue:ks})),this.container=this.shadowRoot.querySelector(`slot[name="icon"]`),this.container.innerHTML=`${As(this.mediaPlaybackRate??1)}x`}static get observedAttributes(){return[...super.observedAttributes,b.MEDIA_PLAYBACK_RATE,Os.RATES]}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),e===Os.RATES&&(Ts(this,Ds).value=n),e===b.MEDIA_PLAYBACK_RATE){let e=n?+n:NaN,t=As(Number.isNaN(e)?1:e);this.container.innerHTML=`${t}x`,this.setAttribute(`aria-label`,E(`Playback rate {playbackRate}`,{playbackRate:t}))}}get rates(){return Ts(this,Ds)}set rates(e){e?Array.isArray(e)?Ts(this,Ds).value=e.join(` `):typeof e==`string`&&(Ts(this,Ds).value=e):Ts(this,Ds).value=``}get mediaPlaybackRate(){return A(this,b.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){j(this,b.MEDIA_PLAYBACK_RATE,e)}handleClick(){let e=Array.from(Ts(this,Ds).values(),e=>+e).sort((e,t)=>e-t),t=e.find(e=>e>this.mediaPlaybackRate)??e[0]??1,n=new D.CustomEvent(v.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:t});this.dispatchEvent(n)}};Ds=new WeakMap,Ns.getSlotTemplateHTML=js,Ns.getTooltipContentHTML=Ms,D.customElements.get(`media-playback-rate-button`)||D.customElements.define(`media-playback-rate-button`,Ns);var Ps=Ns,Fs=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,Is=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;function Ls(e){return`
    <style>
      :host([${b.MEDIA_PAUSED}]) slot[name=pause],
      :host(:not([${b.MEDIA_PAUSED}])) slot[name=play] {
        display: none !important;
      }

      :host([${b.MEDIA_PAUSED}]) slot[name=tooltip-pause],
      :host(:not([${b.MEDIA_PAUSED}])) slot[name=tooltip-play] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="play">${Fs}</slot>
      <slot name="pause">${Is}</slot>
    </slot>
  `}function Rs(){return`
    <slot name="tooltip-play">${E(`Play`)}</slot>
    <slot name="tooltip-pause">${E(`Pause`)}</slot>
  `}var zs=e=>{let t=e.mediaPaused?E(`play`):E(`pause`);e.setAttribute(`aria-label`,t)},Bs=class extends G{static get observedAttributes(){return[...super.observedAttributes,b.MEDIA_PAUSED,b.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),zs(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),(e===b.MEDIA_PAUSED||e===b.MEDIA_LANG)&&zs(this)}get mediaPaused(){return M(this,b.MEDIA_PAUSED)}set mediaPaused(e){N(this,b.MEDIA_PAUSED,e)}handleClick(){let e=this.mediaPaused?v.MEDIA_PLAY_REQUEST:v.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new D.CustomEvent(e,{composed:!0,bubbles:!0}))}};Bs.getSlotTemplateHTML=Ls,Bs.getTooltipContentHTML=Rs,D.customElements.get(`media-play-button`)||D.customElements.define(`media-play-button`,Bs);var Vs=Bs,Hs={PLACEHOLDER_SRC:`placeholdersrc`,SRC:`src`};function Us(e){return`
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
  `}var Ws=e=>{e.style.removeProperty(`background-image`)},Gs=(e,t)=>{e.style[`background-image`]=`url('${t}')`},Ks=class extends D.HTMLElement{static get observedAttributes(){return[Hs.PLACEHOLDER_SRC,Hs.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=at(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector(`#image`)}attributeChangedCallback(e,t,n){e===Hs.SRC&&(n==null?this.image.removeAttribute(Hs.SRC):this.image.setAttribute(Hs.SRC,n)),e===Hs.PLACEHOLDER_SRC&&(n==null?Ws(this.image):Gs(this.image,n))}get placeholderSrc(){return P(this,Hs.PLACEHOLDER_SRC)}set placeholderSrc(e){F(this,Hs.SRC,e)}get src(){return P(this,Hs.SRC)}set src(e){F(this,Hs.SRC,e)}};Ks.shadowRootOptions={mode:`open`},Ks.getTemplateHTML=Us,D.customElements.get(`media-poster-image`)||D.customElements.define(`media-poster-image`,Ks);var qs=Ks,Js=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Ys=(e,t,n)=>(Js(e,t,`read from private field`),n?n.call(e):t.get(e)),Xs=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Zs=(e,t,n,r)=>(Js(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Qs,$s=class extends Za{constructor(){super(),Xs(this,Qs,void 0),Zs(this,Qs,this.shadowRoot.querySelector(`slot`))}static get observedAttributes(){return[...super.observedAttributes,b.MEDIA_PREVIEW_CHAPTER,b.MEDIA_LANG]}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),(e===b.MEDIA_PREVIEW_CHAPTER||e===b.MEDIA_LANG)&&n!==t&&n!=null)if(Ys(this,Qs).textContent=n,n!==``){let e=E(`chapter: {chapterName}`,{chapterName:n});this.setAttribute(`aria-valuetext`,e)}else this.removeAttribute(`aria-valuetext`)}get mediaPreviewChapter(){return P(this,b.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){F(this,b.MEDIA_PREVIEW_CHAPTER,e)}};Qs=new WeakMap,D.customElements.get(`media-preview-chapter-display`)||D.customElements.define(`media-preview-chapter-display`,$s);var ec=$s,tc=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},nc=(e,t,n)=>(tc(e,t,`read from private field`),n?n.call(e):t.get(e)),rc=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},ic=(e,t,n,r)=>(tc(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),ac;function oc(e){return`
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
  `}var sc=class extends D.HTMLElement{constructor(){if(super(),rc(this,ac,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=at(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[y.MEDIA_CONTROLLER,b.MEDIA_PREVIEW_IMAGE,b.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,t;let n=this.getAttribute(y.MEDIA_CONTROLLER);n&&(ic(this,ac,this.getRootNode()?.getElementById(n)),(t=(e=nc(this,ac))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=nc(this,ac))?.unassociateElement)==null||t.call(e,this),ic(this,ac,null)}attributeChangedCallback(e,t,n){var r,i,a,o;[b.MEDIA_PREVIEW_IMAGE,b.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===y.MEDIA_CONTROLLER&&(t&&((i=(r=nc(this,ac))?.unassociateElement)==null||i.call(r,this),ic(this,ac,null)),n&&this.isConnected&&(ic(this,ac,this.getRootNode()?.getElementById(n)),(o=(a=nc(this,ac))?.associateElement)==null||o.call(a,this)))}get mediaPreviewImage(){return P(this,b.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){F(this,b.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){let e=this.getAttribute(b.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(e=>+e)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(b.MEDIA_PREVIEW_COORDS);return}this.setAttribute(b.MEDIA_PREVIEW_COORDS,e.join(` `))}update(){let e=this.mediaPreviewCoords,t=this.mediaPreviewImage;if(!(e&&t))return;let[n,r,i,a]=e,o=t.split(`#`)[0],s=getComputedStyle(this),{maxWidth:c,maxHeight:l,minWidth:u,minHeight:d}=s,f=s.getPropertyValue(`--media-preview-thumbnail-object-fit`).trim()||`contain`,p,m;if(f===`fill`){let e=parseInt(c)/i,t=parseInt(l)/a,n=parseInt(u)/i,r=parseInt(d)/a;p=e<1?e:Math.max(e,n),m=t<1?t:Math.max(t,r)}else{let e=Math.min(parseInt(c)/i,parseInt(l)/a),t=Math.max(parseInt(u)/i,parseInt(d)/a),n=e<1?e:t>1?t:1;p=n,m=n}let{style:h}=k(this.shadowRoot,`:host`),ee=k(this.shadowRoot,`img`).style,te=this.shadowRoot.querySelector(`img`),ne=Math.min(p,m)<1?`min`:`max`;h.setProperty(`${ne}-width`,`initial`,`important`),h.setProperty(`${ne}-height`,`initial`,`important`),h.width=`${i*p}px`,h.height=`${a*m}px`;let re=()=>{ee.width=`${this.imgWidth*p}px`,ee.height=`${this.imgHeight*m}px`,ee.display=`block`};te.src!==o&&(te.onload=()=>{this.imgWidth=te.naturalWidth,this.imgHeight=te.naturalHeight,re(),te.onload=null},te.src=o,re()),re(),ee.transform=`translate(-${n*p}px, -${r*m}px)`}};ac=new WeakMap,sc.shadowRootOptions={mode:`open`},sc.getTemplateHTML=oc,D.customElements.get(`media-preview-thumbnail`)||D.customElements.define(`media-preview-thumbnail`,sc);var cc=sc,lc=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},uc=(e,t,n)=>(lc(e,t,`read from private field`),n?n.call(e):t.get(e)),dc=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},fc=(e,t,n,r)=>(lc(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),pc,mc=class extends Za{constructor(){super(),dc(this,pc,void 0),fc(this,pc,this.shadowRoot.querySelector(`slot`)),uc(this,pc).textContent=Ge(0)}static get observedAttributes(){return[...super.observedAttributes,b.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===b.MEDIA_PREVIEW_TIME&&n!=null&&(uc(this,pc).textContent=Ge(parseFloat(n)))}get mediaPreviewTime(){return A(this,b.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){j(this,b.MEDIA_PREVIEW_TIME,e)}};pc=new WeakMap,D.customElements.get(`media-preview-time-display`)||D.customElements.define(`media-preview-time-display`,mc);var hc=mc,gc={SEEK_OFFSET:`seekoffset`},_c=30,vc=e=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${e}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`;function yc(e,t){return`
    <slot name="icon">${vc(t.seekOffset)}</slot>
  `}var bc=(e,t)=>{e.setAttribute(`aria-label`,E(`seek back {seekOffset} seconds`,{seekOffset:t}))};function xc(){return E(`Seek backward`)}var Sc=0,Cc=class extends G{static get observedAttributes(){return[...super.observedAttributes,b.MEDIA_CURRENT_TIME,gc.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=A(this,gc.SEEK_OFFSET,_c)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),bc(this,this.seekOffset),e===gc.SEEK_OFFSET&&(this.seekOffset=A(this,gc.SEEK_OFFSET,_c))}get seekOffset(){return A(this,gc.SEEK_OFFSET,_c)}set seekOffset(e){j(this,gc.SEEK_OFFSET,e),this.setAttribute(`aria-label`,E(`seek back {seekOffset} seconds`,{seekOffset:this.seekOffset})),ct(ut(this,`icon`),this.seekOffset)}get mediaCurrentTime(){return A(this,b.MEDIA_CURRENT_TIME,Sc)}set mediaCurrentTime(e){j(this,b.MEDIA_CURRENT_TIME,e)}handleClick(){let e=Math.max(this.mediaCurrentTime-this.seekOffset,0),t=new D.CustomEvent(v.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}};Cc.getSlotTemplateHTML=yc,Cc.getTooltipContentHTML=xc,D.customElements.get(`media-seek-backward-button`)||D.customElements.define(`media-seek-backward-button`,Cc);var wc=Cc,Tc={SEEK_OFFSET:`seekoffset`},Ec=30,Dc=e=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${e}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`;function Oc(e,t){return`
    <slot name="icon">${Dc(t.seekOffset)}</slot>
  `}var kc=(e,t)=>{e.setAttribute(`aria-label`,E(`seek forward {seekOffset} seconds`,{seekOffset:t}))};function Ac(){return E(`Seek forward`)}var jc=0,Mc=class extends G{static get observedAttributes(){return[...super.observedAttributes,b.MEDIA_CURRENT_TIME,Tc.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=A(this,Tc.SEEK_OFFSET,Ec)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),kc(this,this.seekOffset),e===Tc.SEEK_OFFSET&&(this.seekOffset=A(this,Tc.SEEK_OFFSET,Ec))}get seekOffset(){return A(this,Tc.SEEK_OFFSET,Ec)}set seekOffset(e){j(this,Tc.SEEK_OFFSET,e),this.setAttribute(`aria-label`,E(`seek forward {seekOffset} seconds`,{seekOffset:this.seekOffset})),ct(ut(this,`icon`),this.seekOffset)}get mediaCurrentTime(){return A(this,b.MEDIA_CURRENT_TIME,jc)}set mediaCurrentTime(e){j(this,b.MEDIA_CURRENT_TIME,e)}handleClick(){let e=this.mediaCurrentTime+this.seekOffset,t=new D.CustomEvent(v.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}};Mc.getSlotTemplateHTML=Oc,Mc.getTooltipContentHTML=Ac,D.customElements.get(`media-seek-forward-button`)||D.customElements.define(`media-seek-forward-button`,Mc);var Nc=Mc,Pc=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Fc=(e,t,n)=>(Pc(e,t,`read from private field`),n?n.call(e):t.get(e)),Ic=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Lc=(e,t,n,r)=>(Pc(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Rc=(e,t,n)=>(Pc(e,t,`access private method`),n),zc,Bc,Vc,Hc,Uc,Wc,Gc,Kc,qc,Jc,Yc,Xc={REMAINING:`remaining`,SHOW_DURATION:`showduration`,NO_TOGGLE:`notoggle`},Zc=[...Object.values(Xc),b.MEDIA_CURRENT_TIME,b.MEDIA_DURATION,b.MEDIA_SEEKABLE],Qc=[`Enter`,` `],$c=`&nbsp;/&nbsp;`,el=(e,{timesSep:t=$c}={})=>{let n=e.mediaCurrentTime??0,[,r]=e.mediaSeekable??[],i=0;Number.isFinite(e.mediaDuration)?i=e.mediaDuration:Number.isFinite(r)&&(i=r);let a=e.remaining?Ge(0-(i-n)):Ge(n);return e.showDuration?`${a}${t}${Ge(i)}`:a},tl=e=>{let t=e.mediaCurrentTime,[,n]=e.mediaSeekable??[],r=null;if(Number.isFinite(e.mediaDuration)?r=e.mediaDuration:Number.isFinite(n)&&(r=n),t==null||r===null){e.setAttribute(`aria-description`,E(`video not loaded, unknown time.`));return}let i=e.remaining?We(0-(r-t)):We(t);if(!e.showDuration){e.setAttribute(`aria-description`,i);return}let a=E(`{currentTime} of {totalTime}`,{currentTime:i,totalTime:We(r)});e.setAttribute(`aria-description`,a)};function nl(e,t){return`
    <slot>${el(t)}</slot>
  `}var rl=e=>{e.setAttribute(`aria-label`,E(`playback time`))},il=class extends Za{constructor(){super(),Ic(this,Hc),Ic(this,Wc),Ic(this,Kc),Ic(this,Jc),Ic(this,zc,void 0),Ic(this,Bc,null),Ic(this,Vc,e=>{let{metaKey:t,altKey:n,key:r}=e;if(t||n||!Qc.includes(r)){this.removeEventListener(`keyup`,Fc(this,Bc));return}this.addEventListener(`keyup`,Fc(this,Bc))}),Lc(this,zc,this.shadowRoot.querySelector(`slot`)),Fc(this,zc).innerHTML=`${el(this)}`}static get observedAttributes(){return[...super.observedAttributes,...Zc,`disabled`]}connectedCallback(){let{style:e}=k(this.shadowRoot,`:host(:hover:not([notoggle]))`);e.setProperty(`cursor`,`var(--media-cursor, pointer)`),e.setProperty(`background`,`var(--media-control-hover-background, rgba(50 50 70 / .7))`),this.setAttribute(`aria-label`,E(`playback time`)),Rc(this,Kc,qc).call(this),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute(`remaining`)?this.removeAttribute(`remaining`):this.setAttribute(`remaining`,``))}disconnectedCallback(){this.disable(),Rc(this,Wc,Gc).call(this),super.disconnectedCallback()}attributeChangedCallback(e,t,n){rl(this),Zc.includes(e)?this.update():e===`disabled`&&n!==t?n==null?Rc(this,Kc,qc).call(this):Rc(this,Jc,Yc).call(this):e===Xc.NO_TOGGLE&&n!==t&&(this.noToggle?Rc(this,Jc,Yc).call(this):Rc(this,Kc,qc).call(this)),super.attributeChangedCallback(e,t,n)}enable(){this.noToggle||(this.tabIndex=0)}disable(){this.tabIndex=-1}get remaining(){return M(this,Xc.REMAINING)}set remaining(e){N(this,Xc.REMAINING,e)}get showDuration(){return M(this,Xc.SHOW_DURATION)}set showDuration(e){N(this,Xc.SHOW_DURATION,e)}get noToggle(){return M(this,Xc.NO_TOGGLE)}set noToggle(e){N(this,Xc.NO_TOGGLE,e)}get mediaDuration(){return A(this,b.MEDIA_DURATION)}set mediaDuration(e){j(this,b.MEDIA_DURATION,e)}get mediaCurrentTime(){return A(this,b.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){j(this,b.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){let e=this.getAttribute(b.MEDIA_SEEKABLE);if(e)return e.split(`:`).map(e=>+e)}set mediaSeekable(e){if(e==null){this.removeAttribute(b.MEDIA_SEEKABLE);return}this.setAttribute(b.MEDIA_SEEKABLE,e.join(`:`))}update(){let e=el(this);tl(this),e!==Fc(this,zc).innerHTML&&(Fc(this,zc).innerHTML=e)}};zc=new WeakMap,Bc=new WeakMap,Vc=new WeakMap,Hc=new WeakSet,Uc=function(){Fc(this,Bc)||(Lc(this,Bc,e=>{let{key:t}=e;if(!Qc.includes(t)){this.removeEventListener(`keyup`,Fc(this,Bc));return}this.toggleTimeDisplay()}),this.addEventListener(`keydown`,Fc(this,Vc)),this.addEventListener(`click`,this.toggleTimeDisplay))},Wc=new WeakSet,Gc=function(){Fc(this,Bc)&&(this.removeEventListener(`keyup`,Fc(this,Bc)),this.removeEventListener(`keydown`,Fc(this,Vc)),this.removeEventListener(`click`,this.toggleTimeDisplay),Lc(this,Bc,null))},Kc=new WeakSet,qc=function(){!this.noToggle&&!this.hasAttribute(`disabled`)&&(this.setAttribute(`role`,`button`),this.enable(),Rc(this,Hc,Uc).call(this))},Jc=new WeakSet,Yc=function(){this.removeAttribute(`role`),this.disable(),Rc(this,Wc,Gc).call(this)},il.getSlotTemplateHTML=nl,D.customElements.get(`media-time-display`)||D.customElements.define(`media-time-display`,il);var al=il,ol=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},J=(e,t,n)=>(ol(e,t,`read from private field`),n?n.call(e):t.get(e)),sl=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Y=(e,t,n,r)=>(ol(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),cl=(e,t,n,r)=>({set _(r){Y(e,t,r,n)},get _(){return J(e,t,r)}}),ll,ul,dl,fl,pl,ml,hl,gl,_l,vl,yl=class{constructor(e,t,n){sl(this,ll,void 0),sl(this,ul,void 0),sl(this,dl,void 0),sl(this,fl,void 0),sl(this,pl,void 0),sl(this,ml,void 0),sl(this,hl,void 0),sl(this,gl,void 0),sl(this,_l,0),sl(this,vl,(e=performance.now())=>{Y(this,_l,requestAnimationFrame(J(this,vl))),Y(this,fl,performance.now()-J(this,dl));let t=1e3/this.fps;if(J(this,fl)>t){Y(this,dl,e-J(this,fl)%t);let n=1e3/((e-J(this,ul))/++cl(this,pl)._),r=(e-J(this,ml))/1e3/this.duration,i=J(this,hl)+r*this.playbackRate;i-J(this,ll).valueAsNumber>0?Y(this,gl,this.playbackRate/this.duration/n):(Y(this,gl,.995*J(this,gl)),i=J(this,ll).valueAsNumber+J(this,gl)),this.callback(i)}}),Y(this,ll,e),this.callback=t,this.fps=n}start(){J(this,_l)===0&&(Y(this,dl,performance.now()),Y(this,ul,J(this,dl)),Y(this,pl,0),J(this,vl).call(this))}stop(){J(this,_l)!==0&&(cancelAnimationFrame(J(this,_l)),Y(this,_l,0))}update({start:e,duration:t,playbackRate:n}){let r=e-J(this,ll).valueAsNumber,i=Math.abs(t-this.duration);(r>0||r<-.03||i>=.5)&&this.callback(e),Y(this,hl,e),Y(this,ml,performance.now()),this.duration=t,this.playbackRate=n}};ll=new WeakMap,ul=new WeakMap,dl=new WeakMap,fl=new WeakMap,pl=new WeakMap,ml=new WeakMap,hl=new WeakMap,gl=new WeakMap,_l=new WeakMap,vl=new WeakMap;var bl=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},X=(e,t,n)=>(bl(e,t,`read from private field`),n?n.call(e):t.get(e)),Z=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},xl=(e,t,n,r)=>(bl(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Sl=(e,t,n)=>(bl(e,t,`access private method`),n),Cl,wl,Tl,El,Dl,Ol,kl,Al,jl,Ml,Nl,Pl,Fl,Il,Ll,Rl,zl,Bl,Vl,Hl,Ul,Wl,Gl,Kl,ql,Jl,Yl=e=>{let t=e.range,n=We(+Ql(e)),r=We(+e.mediaSeekableEnd),i=n&&r?E(`{currentTime} of {totalTime}`,{currentTime:n,totalTime:r}):E(`video not loaded, unknown time.`);t.setAttribute(`aria-valuetext`,i)};function Xl(e){return`
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

      :host(:is([${b.MEDIA_PREVIEW_IMAGE}], [${b.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }

      @media (hover: hover) {
        :host(:is([${b.MEDIA_PREVIEW_IMAGE}], [${b.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
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

      :host([${b.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
      :host([${b.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      @media (hover: hover) {
        :host([${b.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
        :host([${b.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
        }

        :host([${b.MEDIA_PREVIEW_TIME}]:hover) {
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

      :host([${b.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
      :host([${b.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-chapter-border-radius, 0);
        padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
        margin: var(--media-preview-chapter-margin, 0);
        min-width: 100%;
      }

      media-preview-chapter-display[${b.MEDIA_PREVIEW_CHAPTER}],
      ::slotted(media-preview-chapter-display[${b.MEDIA_PREVIEW_CHAPTER}]) {
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

      :host([${b.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
      :host([${b.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-time-border-radius,
          0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
        min-width: 100%;
      }

      :host([${b.MEDIA_PREVIEW_TIME}]:hover) {
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
          <template shadowrootmode="${cc.shadowRootOptions.mode}">
            ${cc.getTemplateHTML({})}
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
  `}var Zl=(e,t=e.mediaCurrentTime)=>{let n=Number.isFinite(e.mediaSeekableStart)?e.mediaSeekableStart:0,r=Number.isFinite(e.mediaDuration)?e.mediaDuration:e.mediaSeekableEnd;if(Number.isNaN(r))return 0;let i=(t-n)/(r-n);return Math.max(0,Math.min(i,1))},Ql=(e,t=e.range.valueAsNumber)=>{let n=Number.isFinite(e.mediaSeekableStart)?e.mediaSeekableStart:0,r=Number.isFinite(e.mediaDuration)?e.mediaDuration:e.mediaSeekableEnd;return Number.isNaN(r)?0:t*(r-n)+n},$l=class extends Pa{constructor(){super(),Z(this,Pl),Z(this,Ll),Z(this,zl),Z(this,Vl),Z(this,Ul),Z(this,Gl),Z(this,ql),Z(this,Cl,null),Z(this,wl,void 0),Z(this,Tl,void 0),Z(this,El,void 0),Z(this,Dl,void 0),Z(this,Ol,void 0),Z(this,kl,void 0),Z(this,Al,void 0),Z(this,jl,void 0),Z(this,Ml,void 0),Z(this,Nl,()=>{Sl(this,Pl,Fl).call(this)?X(this,wl).start():X(this,wl).stop()}),Z(this,Il,e=>{this.dragging||(Fe(e)&&(this.range.valueAsNumber=e),X(this,Ml)||this.updateBar())}),this.shadowRoot.querySelector(`#track`).insertAdjacentHTML(`afterbegin`,`<div id="buffered" part="buffered"></div>`),xl(this,Tl,this.shadowRoot.querySelectorAll(`[part~="box"]`)),xl(this,Dl,this.shadowRoot.querySelector(`[part~="preview-box"]`)),xl(this,Ol,this.shadowRoot.querySelector(`[part~="current-box"]`));let e=getComputedStyle(this);xl(this,kl,parseInt(e.getPropertyValue(`--media-box-padding-left`))),xl(this,Al,parseInt(e.getPropertyValue(`--media-box-padding-right`))),xl(this,wl,new yl(this.range,X(this,Il),60))}static get observedAttributes(){return[...super.observedAttributes,b.MEDIA_PAUSED,b.MEDIA_DURATION,b.MEDIA_SEEKABLE,b.MEDIA_CURRENT_TIME,b.MEDIA_PREVIEW_IMAGE,b.MEDIA_PREVIEW_TIME,b.MEDIA_PREVIEW_CHAPTER,b.MEDIA_BUFFERED,b.MEDIA_PLAYBACK_RATE,b.MEDIA_LOADING,b.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute(`aria-label`,E(`seek`)),X(this,Nl).call(this),xl(this,Cl,this.getRootNode()),(e=X(this,Cl))==null||e.addEventListener(`transitionstart`,this)}disconnectedCallback(){var e;super.disconnectedCallback(),X(this,wl).stop(),(e=X(this,Cl))==null||e.removeEventListener(`transitionstart`,this),xl(this,Cl,null)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),t!=n&&(e===b.MEDIA_CURRENT_TIME||e===b.MEDIA_PAUSED||e===b.MEDIA_ENDED||e===b.MEDIA_LOADING||e===b.MEDIA_DURATION||e===b.MEDIA_SEEKABLE?(X(this,wl).update({start:Zl(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),X(this,Nl).call(this),Yl(this)):e===b.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===b.MEDIA_DURATION||e===b.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=X(this,jl),this.updateBar()))}get mediaChaptersCues(){return X(this,jl)}set mediaChaptersCues(e){xl(this,jl,e),this.updateSegments(X(this,jl)?.map(e=>({start:Zl(this,e.startTime),end:Zl(this,e.endTime)})))}get mediaPaused(){return M(this,b.MEDIA_PAUSED)}set mediaPaused(e){N(this,b.MEDIA_PAUSED,e)}get mediaLoading(){return M(this,b.MEDIA_LOADING)}set mediaLoading(e){N(this,b.MEDIA_LOADING,e)}get mediaDuration(){return A(this,b.MEDIA_DURATION)}set mediaDuration(e){j(this,b.MEDIA_DURATION,e)}get mediaCurrentTime(){return A(this,b.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){j(this,b.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return A(this,b.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){j(this,b.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){let e=this.getAttribute(b.MEDIA_BUFFERED);return e?e.split(` `).map(e=>e.split(`:`).map(e=>+e)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(b.MEDIA_BUFFERED);return}let t=e.map(e=>e.join(`:`)).join(` `);this.setAttribute(b.MEDIA_BUFFERED,t)}get mediaSeekable(){let e=this.getAttribute(b.MEDIA_SEEKABLE);if(e)return e.split(`:`).map(e=>+e)}set mediaSeekable(e){if(e==null){this.removeAttribute(b.MEDIA_SEEKABLE);return}this.setAttribute(b.MEDIA_SEEKABLE,e.join(`:`))}get mediaSeekableEnd(){let[,e=this.mediaDuration]=this.mediaSeekable??[];return e}get mediaSeekableStart(){let[e=0]=this.mediaSeekable??[];return e}get mediaPreviewImage(){return P(this,b.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){F(this,b.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return A(this,b.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){j(this,b.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return M(this,b.MEDIA_ENDED)}set mediaEnded(e){N(this,b.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){let e=this.mediaBuffered;if(!e.length)return;let t;if(this.mediaEnded)t=1;else{let n=this.mediaCurrentTime,[,r=this.mediaSeekableStart]=e.find(([e,t])=>e<=n&&n<=t)??[];t=Zl(this,r)}let{style:n}=k(this.shadowRoot,`#buffered`);n.setProperty(`width`,`${t*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector(`slot[name="current"]`).assignedElements().length)return;let e=k(this.shadowRoot,`#current-rail`),t=k(this.shadowRoot,`[part~="current-box"]`),n=Sl(this,Ll,Rl).call(this,X(this,Ol)),r=Sl(this,zl,Bl).call(this,n,this.range.valueAsNumber),i=Sl(this,Vl,Hl).call(this,n,this.range.valueAsNumber);e.style.transform=`translateX(${r})`,e.style.setProperty(`--_range-width`,`${n.range.width}`),t.style.setProperty(`--_box-shift`,`${i}`),t.style.setProperty(`--_box-width`,`${n.box.width}px`),t.style.setProperty(`visibility`,`initial`)}handleEvent(e){switch(super.handleEvent(e),e.type){case`input`:Sl(this,ql,Jl).call(this);break;case`pointermove`:Sl(this,Ul,Wl).call(this,e);break;case`pointerup`:X(this,Ml)&&xl(this,Ml,!1);break;case`pointerdown`:xl(this,Ml,!0);break;case`pointerleave`:Sl(this,Gl,Kl).call(this,null);break;case`transitionstart`:dt(e.target,this)&&setTimeout(()=>X(this,Nl).call(this),0);break}}};Cl=new WeakMap,wl=new WeakMap,Tl=new WeakMap,El=new WeakMap,Dl=new WeakMap,Ol=new WeakMap,kl=new WeakMap,Al=new WeakMap,jl=new WeakMap,Ml=new WeakMap,Nl=new WeakMap,Pl=new WeakSet,Fl=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&ht(this)},Il=new WeakMap,Ll=new WeakSet,Rl=function(e){let t=((this.getAttribute(`bounds`)?ft(this,`#${this.getAttribute(`bounds`)}`):this.parentElement)??this).getBoundingClientRect(),n=this.range.getBoundingClientRect(),r=e.offsetWidth;return{box:{width:r,min:-(n.left-t.left-r/2),max:t.right-n.left-r/2},bounds:t,range:n}},zl=new WeakSet,Bl=function(e,t){let n=`${t*100}%`,{width:r,min:i,max:a}=e.box;if(!r)return n;if(Number.isNaN(i)||(n=`max(${`calc(1 / var(--_range-width) * 100 * ${i}% + var(--media-box-padding-left))`}, ${n})`),!Number.isNaN(a)){let e=`calc(1 / var(--_range-width) * 100 * ${a}% - var(--media-box-padding-right))`;n=`min(${n}, ${e})`}return n},Vl=new WeakSet,Hl=function(e,t){let{width:n,min:r,max:i}=e.box,a=t*e.range.width;if(a<r+X(this,kl)){let t=e.range.left-e.bounds.left-X(this,kl);return`${a-n/2+t}px`}if(a>i-X(this,Al)){let t=e.bounds.right-e.range.right-X(this,Al);return`${a+n/2-t-e.range.width}px`}return 0},Ul=new WeakSet,Wl=function(e){let t=[...X(this,Tl)].some(t=>e.composedPath().includes(t));if(!this.dragging&&(t||!e.composedPath().includes(this))){Sl(this,Gl,Kl).call(this,null);return}let n=this.mediaSeekableEnd;if(!n)return;let r=k(this.shadowRoot,`#preview-rail`),i=k(this.shadowRoot,`[part~="preview-box"]`),a=Sl(this,Ll,Rl).call(this,X(this,Dl)),o=(e.clientX-a.range.left)/a.range.width;o=Math.max(0,Math.min(1,o));let s=Sl(this,zl,Bl).call(this,a,o),c=Sl(this,Vl,Hl).call(this,a,o);r.style.transform=`translateX(${s})`,r.style.setProperty(`--_range-width`,`${a.range.width}`),i.style.setProperty(`--_box-shift`,`${c}`),i.style.setProperty(`--_box-width`,`${a.box.width}px`);let l=Math.round(X(this,El))-Math.round(o*n);Math.abs(l)<1&&o>.01&&o<.99||(xl(this,El,o*n),Sl(this,Gl,Kl).call(this,X(this,El)))},Gl=new WeakSet,Kl=function(e){this.dispatchEvent(new D.CustomEvent(v.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:e}))},ql=new WeakSet,Jl=function(){X(this,wl).stop();let e=Ql(this);this.dispatchEvent(new D.CustomEvent(v.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e}))},$l.shadowRootOptions={mode:`open`},$l.getContainerTemplateHTML=Xl,D.customElements.get(`media-time-range`)||D.customElements.define(`media-time-range`,$l);var eu=$l,tu=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},nu=(e,t,n)=>(tu(e,t,`read from private field`),n?n.call(e):t.get(e)),ru=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},iu,au=1,ou=e=>e.mediaMuted?0:e.mediaVolume,su=e=>`${Math.round(e*100)}%`,cu=class extends Pa{constructor(){super(...arguments),ru(this,iu,()=>{let e=this.range.value,t=new D.CustomEvent(v.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)})}static get observedAttributes(){return[...super.observedAttributes,b.MEDIA_VOLUME,b.MEDIA_MUTED,b.MEDIA_VOLUME_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),this.range.setAttribute(`aria-label`,E(`volume`)),this.range.addEventListener(`input`,nu(this,iu))}disconnectedCallback(){this.range.removeEventListener(`input`,nu(this,iu)),super.disconnectedCallback()}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),(e===b.MEDIA_VOLUME||e===b.MEDIA_MUTED)&&(this.range.valueAsNumber=ou(this),this.range.setAttribute(`aria-valuetext`,su(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return A(this,b.MEDIA_VOLUME,au)}set mediaVolume(e){j(this,b.MEDIA_VOLUME,e)}get mediaMuted(){return M(this,b.MEDIA_MUTED)}set mediaMuted(e){N(this,b.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return P(this,b.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){F(this,b.MEDIA_VOLUME_UNAVAILABLE,e)}};iu=new WeakMap,D.customElements.get(`media-volume-range`)||D.customElements.define(`media-volume-range`,cu);var lu=cu;function uu(e){return`
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

        :host([${b.MEDIA_LOOP}]) #checked-indicator {
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
    `}function du(){return E(`Loop`)}var fu=class extends G{constructor(){super(...arguments),this.container=null}static get observedAttributes(){return[...super.observedAttributes,b.MEDIA_LOOP]}connectedCallback(){super.connectedCallback(),this.container=this.shadowRoot?.querySelector(`#icon`)||null,this.container&&(this.container.textContent=E(`Loop`))}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===b.MEDIA_LOOP&&this.container&&this.setAttribute(`aria-checked`,this.mediaLoop?`true`:`false`)}get mediaLoop(){return M(this,b.MEDIA_LOOP)}set mediaLoop(e){N(this,b.MEDIA_LOOP,e)}handleClick(){let e=!this.mediaLoop,t=new D.CustomEvent(v.MEDIA_LOOP_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}};fu.getSlotTemplateHTML=uu,fu.getTooltipContentHTML=du,D.customElements.get(`media-loop-button`)||D.customElements.define(`media-loop-button`,fu);var pu=fu;function Q(e){if(typeof e==`boolean`)return e?``:void 0;if(typeof e!=`function`){if(Array.isArray(e)&&e.every(e=>typeof e==`string`||typeof e==`number`||typeof e==`boolean`))return e.join(` `);if(!(typeof e==`object`&&e))return e}}_({tagName:`media-gesture-receiver`,elementClass:Et,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),_({tagName:`media-container`,elementClass:an,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var mu=_({tagName:`media-controller`,elementClass:Wr,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});_({tagName:`media-tooltip`,elementClass:Jr,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),_({tagName:`media-chrome-button`,elementClass:ui,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),_({tagName:`media-airplay-button`,elementClass:gi,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var hu=_({tagName:`media-captions-button`,elementClass:Ti,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});_({tagName:`media-cast-button`,elementClass:Mi,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),_({tagName:`media-chrome-dialog`,elementClass:ra,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),_({tagName:`media-chrome-range`,elementClass:Fa,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var gu=_({tagName:`media-control-bar`,elementClass:Ua,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});_({tagName:`media-text-display`,elementClass:Qa,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),_({tagName:`media-duration-display`,elementClass:oo,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),_({tagName:`media-error-dialog`,elementClass:xo,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),_({tagName:`media-keyboard-shortcuts-dialog`,elementClass:Ao,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var _u=_({tagName:`media-fullscreen-button`,elementClass:Ho,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});_({tagName:`media-live-button`,elementClass:Zo,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var vu=_({tagName:`media-loading-indicator`,elementClass:ls,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),yu=_({tagName:`media-mute-button`,elementClass:_s,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),bu=_({tagName:`media-pip-button`,elementClass:Cs,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),xu=_({tagName:`media-playback-rate-button`,elementClass:Ps,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Su=_({tagName:`media-play-button`,elementClass:Vs,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});_({tagName:`media-poster-image`,elementClass:qs,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),_({tagName:`media-preview-chapter-display`,elementClass:ec,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),_({tagName:`media-preview-thumbnail`,elementClass:cc,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),_({tagName:`media-preview-time-display`,elementClass:hc,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var Cu=_({tagName:`media-seek-backward-button`,elementClass:wc,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),wu=_({tagName:`media-seek-forward-button`,elementClass:Nc,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Tu=_({tagName:`media-time-display`,elementClass:al,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Eu=_({tagName:`media-time-range`,elementClass:eu,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Du=_({tagName:`media-volume-range`,elementClass:lu,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});_({tagName:`media-loop-button`,elementClass:pu,react:g.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var $=t(),Ou={noTooltip:!0};function ku({isMobile:e,showPip:t,showCaptionsButton:n,topChrome:r,extraControls:i,children:a,className:o,style:s}){return(0,$.jsxs)(mu,{className:`ts-player ${o||``}`.trim(),autohide:`2`,style:s,children:[a,(0,$.jsx)(vu,{slot:`centered-chrome`}),(0,$.jsx)(`div`,{slot:`top-chrome`,className:`ts-player-top`,children:r}),(0,$.jsxs)(gu,{className:`ts-player-bar`,children:[(0,$.jsx)(Su,{...Ou,className:e?`ts-player-play-lg`:void 0}),(0,$.jsx)(Cu,{...Ou,seekOffset:10}),(0,$.jsx)(wu,{...Ou,seekOffset:10}),(0,$.jsx)(Tu,{showDuration:!0}),(0,$.jsx)(Eu,{}),(0,$.jsx)(yu,{...Ou}),e?null:(0,$.jsx)(Du,{}),i,n?(0,$.jsx)(hu,{...Ou}):null,(0,$.jsx)(xu,{...Ou,rates:[.75,1,1.25,1.5,2]}),t?(0,$.jsx)(bu,{...Ou}):null,(0,$.jsx)(_u,{...Ou})]})]})}var Au=e=>!!(e.canPlayType(`application/vnd.apple.mpegurl`)||e.canPlayType(`application/x-mpegURL`));function ju({enabled:e,open:t,videoRef:n,videoEpoch:r,src:i,playbackRate:a=1,onLoading:o,onError:s,onNotSupported:c,onSubtitleTracks:l,onSubtitleTrack:u,onDuration:d}){let m=(0,g.useRef)(null),h=(0,g.useRef)(o),ee=(0,g.useRef)(s),te=(0,g.useRef)(c),ne=(0,g.useRef)(l),re=(0,g.useRef)(u),ie=(0,g.useRef)(d);return(0,g.useEffect)(()=>{h.current=o,ee.current=s,te.current=c,ne.current=l,re.current=u,ie.current=d}),(0,g.useEffect)(()=>{let r=n.current;if(!e||!t||!r||!i)return;let o=null,s=!1;h.current?.(!0),ne.current?.([]);let c=()=>{let e=(o?.subtitleTracks||[]).map((e,t)=>({id:t,name:e.name,lang:e.lang}));ne.current?.(e)};if(ye.isSupported()){let e=f();o=new ye({xhrSetup:t=>{e&&t.setRequestHeader(`Authorization`,e)}}),m.current=o,o.on(ye.Events.MANIFEST_PARSED,()=>{c(),re.current?.(o?.subtitleTrack??-1),r.playbackRate=a,r.play().catch(()=>{})}),o.on(ye.Events.LEVEL_LOADED,(e,t)=>{let n=t.details?.totalduration;typeof n==`number`&&ie.current?.(n)}),o.on(ye.Events.SUBTITLE_TRACKS_UPDATED,c),o.on(ye.Events.SUBTITLE_TRACK_SWITCH,(e,t)=>re.current?.(t.id)),o.on(ye.Events.ERROR,(e,t)=>{!t.fatal||!o||(t.type===ye.ErrorTypes.NETWORK_ERROR?o.startLoad():t.type===ye.ErrorTypes.MEDIA_ERROR?o.recoverMediaError():(o.stopLoad(),h.current?.(!1),ee.current?.()))}),o.loadSource(i),o.attachMedia(r)}else Au(r)?(s=!0,r.src=p(i),r.load(),r.playbackRate=a,r.play().catch(()=>{})):te.current?.();return()=>{m.current===o&&(m.current=null),o?.destroy(),s&&(r.pause(),r.removeAttribute(`src`),r.load()),ne.current?.([]),re.current?.(-1)}},[e,t,n,r,i]),m}var Mu=5e3,Nu=5;function Pu({enabled:e,hash:t,fileIndex:n,title:r,initialTimecode:i=0,videoRef:a,onViewedChange:o}){let s=(0,g.useRef)(0),c=(0,g.useRef)(!1),l=(0,g.useRef)(o);(0,g.useEffect)(()=>{l.current=o},[o]),(0,g.useEffect)(()=>{c.current=!1},[t,n,i]);let u=(0,g.useCallback)(async i=>{if(!(!e||!t||n==null))try{await oe(t,n,i),ce({hash:t,fileIndex:n,title:r||t,fileName:r||String(n),timecode:i}),l.current?.()}catch{}},[e,t,n,r]);return{flushTimecode:(0,g.useCallback)(()=>{let t=a.current;!t||!e||u(t.currentTime)},[a,e,u]),onTimeUpdate:(0,g.useCallback)(()=>{let t=a.current;if(!t||!e)return;let n=Date.now();n-s.current<Mu||(s.current=n,u(t.currentTime))},[a,e,u]),applyResumeIfNeeded:(0,g.useCallback)(()=>{let e=a.current;if(!e||c.current)return;if(!(i>Nu)){c.current=!0;return}let t=e.duration;if(Number.isFinite(t)&&t>0&&i>=t-Nu){c.current=!0;return}e.currentTime=i,c.current=!0},[a,i]),saveTimecode:u}}var Fu=3e4;function Iu(e){switch(e.split(`?`)[0].split(`.`).pop()?.toLowerCase()){case`mp4`:return`video/mp4`;case`ogg`:case`ogv`:return`video/ogg`;case`webm`:return`video/webm`;default:return``}}var Lu=e=>!!(e.canPlayType(`application/vnd.apple.mpegurl`)||e.canPlayType(`application/x-mpegURL`)),Ru=()=>typeof document<`u`&&`pictureInPictureEnabled`in document&&!!document.pictureInPictureEnabled;function zu({videoSrc:e,downloadSrc:t=e,title:r,onNotSupported:f,hls:h=!1,heartbeatSrc:oe=``,showTrigger:ce=!0,inlineTrigger:xe=!1,inlineTriggerPrimary:Se=!1,initiallyOpen:Ce=!1,onClose:we,captionSrc:_,hash:Te,fileIndex:v,initialTimecode:y=0,trackTimecode:Ee=!1,onViewedChange:De,audioTracks:b=[],audioIndex:Oe=0,onAudioIndexChange:ke}){let{t:x}=te(),S=a(fe(`dialog`)),{setImmersive:Ae}=u(),C=(0,g.useRef)(null),w=(0,g.useRef)(f),je=(0,g.useRef)(null),[T,Me]=(0,g.useState)(Ce),[Ne,Pe]=(0,g.useState)(0),[Fe,Ie]=(0,g.useState)(!0),[Le,Re]=(0,g.useState)(!1),[ze,Be]=(0,g.useState)(!1),[Ve,E]=(0,g.useState)(!1),[He,Ue]=(0,g.useState)([]),[We,Ge]=(0,g.useState)(!1),[Ke,qe]=(0,g.useState)(Oe),[Je,Ye]=(0,g.useState)(e),[Xe,Ze]=(0,g.useState)(b),Qe=!!(Te&&v!=null&&Ee),$e=h&&!!Te&&v!=null&&Xe.length>1,D=Ru(),O=h?He.length>0:!!_,et=S?ve:Ve?_e:ge,tt=S?void 0:Ve?`min(86dvh, calc(100dvh - 4rem))`:`min(72dvh, 40rem)`,nt=(0,g.useCallback)(e=>{C.current=e,Pe(e=>e+1)},[]);(0,g.useEffect)(()=>{w.current=f},[f]),(0,g.useEffect)(()=>{Ye(e),qe(Oe),Ze(b),Re(!1),Ie(!0)},[e,Oe,b]),ju({enabled:h,open:T,videoRef:C,videoEpoch:Ne,src:Je,onLoading:Ie,onError:()=>Re(!0),onNotSupported:()=>w.current?.(),onSubtitleTracks:Ue});let{flushTimecode:rt,onTimeUpdate:it,applyResumeIfNeeded:at}=Pu({enabled:Qe,hash:Te,fileIndex:v,title:r,initialTimecode:y,videoRef:C,onViewedChange:De}),ot=(0,g.useCallback)(()=>Me(!0),[]),st=(0,g.useCallback)(()=>{rt(),Me(!1),Re(!1),Ge(!1),E(!1),we?.()},[rt,we]),ct=c({isOpen:T,onOpenChange:e=>{e?Me(!0):st()}});d(T),(0,g.useEffect)(()=>{if(!S||!T){Ae(!1);return}return Ae(!0),()=>Ae(!1)},[S,T,Ae]),(0,g.useEffect)(()=>{if(!T){he(null);return}return he(null),()=>he(null)},[T]),(0,g.useEffect)(()=>{let e=document.createElement(`video`);(h?ye.isSupported()||Lu(e):e.canPlayType(Iu(Je)))||w.current?.()},[h,Je]),(0,g.useEffect)(()=>{let e=C.current;if(!(!T||h||!e))return Ie(!0),e.src=p(Je),e.load(),e.play().catch(()=>{}),()=>{e.pause(),e.removeAttribute(`src`),e.load()}},[T,h,Ne,Je]),(0,g.useEffect)(()=>{if(!T||!oe)return;let e=window.setInterval(()=>{m(oe,{cache:`no-store`}).catch(()=>{})},Fu);return()=>window.clearInterval(e)},[oe,T]),(0,g.useEffect)(()=>{let e=()=>Be(!!document.fullscreenElement);return document.addEventListener(`fullscreenchange`,e),()=>document.removeEventListener(`fullscreenchange`,e)},[]),(0,g.useEffect)(()=>{let e=C.current;if(!e||je.current==null)return;let t=je.current,n=()=>{je.current!=null&&(e.currentTime=t,je.current=null,e.play().catch(()=>{}))};return e.addEventListener(`loadedmetadata`,n,{once:!0}),()=>e.removeEventListener(`loadedmetadata`,n)},[Ne,Je]),(0,g.useEffect)(()=>{if(!T||!h||!Te||v==null)return;if(b.length){Ze(b);return}let e=!1;return l.get(me(Te,v)).then(({data:t})=>{e||Ze(pe(t))}).catch(()=>{}),()=>{e=!0}},[T,h,Te,v,b]);let lt=e=>{if(!Te||v==null)return;let t=C.current;t&&(je.current=t.currentTime),qe(e),Ye(de(Te,v,e)),Ge(!1),ke?.(e)},ut=ne,dt=$e?(0,$.jsxs)(n,{isOpen:We,onOpenChange:Ge,children:[(0,$.jsx)(n.Trigger,{children:(0,$.jsx)(i,{isIconOnly:!0,variant:`ghost`,className:`${le} text-white hover-fine:bg-white/15`,"aria-label":x(`SelectAudioTrack`),children:(0,$.jsx)(se,{...ut,"aria-hidden":!0})})}),(0,$.jsxs)(n.Content,{placement:`bottom end`,className:`max-h-72 w-72 overflow-y-auto border border-white/10 bg-neutral-950/95 p-1 backdrop-blur-xl`,children:[(0,$.jsx)(`p`,{className:`px-2 py-1.5 text-[11px] font-semibold tracking-wide text-muted uppercase`,children:x(`SelectAudioTrack`)}),Xe.map((e,t)=>{let{title:n,meta:r}=ue(e,t);return(0,$.jsx)(i,{variant:t===Ke?`secondary`:`ghost`,className:`h-auto w-full justify-start gap-2 py-2`,onPress:()=>lt(t),children:(0,$.jsxs)(`span`,{className:`min-w-0 flex-1 text-left`,children:[(0,$.jsx)(`span`,{className:`block truncate text-sm font-medium`,children:n}),r?(0,$.jsx)(`span`,{className:`mt-0.5 block truncate text-xs text-muted`,children:r}):null]})},t)})]})]}):null,ft=S?null:(0,$.jsx)(i,{isIconOnly:!0,variant:`ghost`,className:`${le} text-white hover-fine:bg-white/15`,"aria-label":x(Ve?`ExitFullscreen`:`ExpandPlayer`),onPress:()=>E(e=>!e),children:Ve?(0,$.jsx)(be,{...ut,"aria-hidden":!0}):(0,$.jsx)(ee,{...ut,"aria-hidden":!0})});return(0,$.jsxs)($.Fragment,{children:[ce&&(xe?(0,$.jsxs)(i,{variant:Se?`primary`:`secondary`,size:`sm`,onPress:ot,className:Se?`min-h-10 shrink-0 px-3`:`min-h-10 min-w-[72px] max-w-full flex-1`,children:[Se?(0,$.jsx)(re,{...ae,fill:`currentColor`,"aria-hidden":!0}):null,x(`Play`)]}):(0,$.jsxs)(i,{variant:`secondary`,onPress:ot,children:[(0,$.jsx)(re,{...ae,"aria-hidden":!0}),x(`Play`)]})),(0,$.jsx)(s,{state:ct,children:(0,$.jsx)(s.Backdrop,{isDismissable:!ze,className:`bg-black/75 backdrop-blur-sm`,children:(0,$.jsx)(s.Container,{size:S?`full`:`lg`,scroll:`inside`,className:S?`ts-player-modal-full h-dvh p-0`:`p-4 sm:p-5`,children:(0,$.jsx)(s.Dialog,{className:S?`h-dvh max-h-dvh overflow-hidden rounded-none border-0 bg-black text-white shadow-none`:`overflow-hidden border border-white/10 bg-[#0a0e0c] text-white shadow-2xl shadow-black/50`,style:et,children:(0,$.jsxs)(s.Body,{className:S?`flex h-full min-h-0 flex-col gap-0 p-0`:`gap-0 p-0`,children:[Le?(0,$.jsxs)(`div`,{className:`space-y-3 p-4`,children:[(0,$.jsx)(o,{status:`danger`,children:x(`PlaybackError`)}),(0,$.jsx)(i,{variant:`secondary`,onPress:()=>window.open(t,`_blank`,`noopener,noreferrer`),children:x(`OpenLink`)})]}):(0,$.jsx)(ku,{isMobile:S,showPip:D,showCaptionsButton:O,className:S?`ts-player--mobile`:`ts-player--desktop`,style:S?{width:`100%`,height:`100%`}:{width:`100%`,maxHeight:tt,aspectRatio:`16 / 9`},topChrome:(0,$.jsxs)(`div`,{className:`flex items-start gap-2 px-3 pb-10 pt-[max(0.75rem,env(safe-area-inset-top))]`,children:[(0,$.jsx)(`p`,{className:`min-w-0 flex-1 truncate text-sm font-semibold text-white drop-shadow`,title:r||x(`Play`),children:r||x(`Play`)}),dt,ft,(0,$.jsx)(i,{isIconOnly:!0,variant:`ghost`,className:`${le} text-white hover-fine:bg-white/15`,"aria-label":x(`Close`),onPress:st,children:(0,$.jsx)(ie,{...ut,"aria-hidden":!0})})]}),extraControls:null,children:(0,$.jsx)(`video`,{slot:`media`,ref:nt,autoPlay:!0,playsInline:!0,crossOrigin:`anonymous`,className:`ts-player-video`,onTimeUpdate:()=>{it(),Fe&&Ie(!1)},onLoadedMetadata:()=>{Ie(!1),Re(!1),at()},onWaiting:()=>Ie(!0),onCanPlay:()=>{Ie(!1),Re(!1)},onPlaying:()=>Ie(!1),onPause:rt,onError:()=>{Ie(!1),Re(!0)},children:!h&&_?(0,$.jsx)(`track`,{kind:`captions`,src:_,srcLang:`und`,label:`Captions`,default:!0}):null},Je)}),Fe&&!Le?(0,$.jsx)(`div`,{className:`pointer-events-none absolute inset-0 grid place-items-center`}):null]})})})})})]})}export{zu as default};