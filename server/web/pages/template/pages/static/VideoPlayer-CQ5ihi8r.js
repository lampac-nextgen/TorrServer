import{i as e}from"./rolldown-runtime-BgaNhQyE.js";import{A as t,C as n,M as r,O as i,b as a,l as o,o as s,r as c}from"./heroui-DMxKMzqy.js";import{i as l}from"./vendor-D73vhE3s.js";import{n as u,r as d}from"./ModalOpenContext-B5SCE0ZV.js";import{t as f}from"./createLucideIcon-DycWlq1m.js";import{t as p}from"./maximize-2-YP4IthaJ.js";import{t as m}from"./useTranslation-BnNnnMzO.js";import{D as h,I as ee,S as g,X as te,b as ne,i as re,it as ie,o as ae,q as oe,r as se,s as ce,t as le,x as ue,y as de}from"./index-6VkXz4JO.js";import{d as fe,l as pe,u as me}from"./dialogSizes-Dx4ujERB.js";import{t as he}from"./hls-BgLaj4xL.js";var ge=f(`minimize-2`,[[`path`,{d:`m14 10 7-7`,key:`oa77jy`}],[`path`,{d:`M20 10h-6V4`,key:`mjg0md`}],[`path`,{d:`m3 21 7-7`,key:`tjx5ai`}],[`path`,{d:`M4 14h6v6`,key:`rmj7iw`}]]),_=e(r(),1),_e=new Set([`style`,`children`,`ref`,`key`,`suppressContentEditableWarning`,`suppressHydrationWarning`,`dangerouslySetInnerHTML`]),ve={className:`class`,htmlFor:`for`};function ye(e){return e.toLowerCase()}function be(e){if(typeof e==`boolean`)return e?``:void 0;if(typeof e!=`function`&&!(typeof e==`object`&&e))return e}function v({react:e,tagName:t,elementClass:n,events:r,displayName:i,defaultProps:a,toAttributeName:o=ye,toAttributeValue:s=be}){let c=Number.parseInt(e.version)>=19,l=e.forwardRef((i,l)=>{let u=e.useRef(null),d=e.useRef(new Map),f={},p={},m={},h={};for(let[e,t]of Object.entries(i)){if(_e.has(e)){m[e]=t;continue}let r=o(ve[e]??e);if(n.prototype&&e in n.prototype&&!(e in(globalThis.HTMLElement?.prototype??{}))&&!n.observedAttributes?.some(e=>e===r)){h[e]=t;continue}if(e.startsWith(`on`)){f[e]=t;continue}let i=s(t);r&&i!=null&&(p[r]=String(i),c||(m[r]=i)),r&&c&&(i===be(t)?m[r]=t:m[r]=i)}if(typeof window<`u`){for(let t in f){let n=f[t],i=t.endsWith(`Capture`),a=(r?.[t]??t.slice(2).toLowerCase()).slice(0,i?-7:void 0);e.useLayoutEffect(()=>{let e=u?.current;if(!(!e||typeof n!=`function`))return e.addEventListener(a,n,i),()=>{e.removeEventListener(a,n,i)}},[u?.current,n])}e.useLayoutEffect(()=>{if(u.current===null)return;let e=new Map;for(let t in h)xe(u.current,t,h[t]),d.current.delete(t),e.set(t,h[t]);for(let[e,t]of d.current)xe(u.current,e,void 0);d.current=e})}if(typeof window>`u`&&n?.getTemplateHTML&&n?.shadowRootOptions){let{mode:t,delegatesFocus:r}=n.shadowRootOptions;m.children=[e.createElement(`template`,{shadowrootmode:t,shadowrootdelegatesfocus:r,dangerouslySetInnerHTML:{__html:n.getTemplateHTML(p,i)},key:`ce-la-react-ssr-template-shadow-root`}),m.children]}return e.createElement(t,{...a,...m,ref:e.useCallback(e=>{u.current=e,typeof l==`function`?l(e):l!==null&&(l.current=e)},[l])},m.children)});return l.displayName=i??n.name,l}function xe(e,t,n){e[t]=n,n==null&&t in(globalThis.HTMLElement?.prototype??{})&&e.removeAttribute(t)}var y={MEDIA_PLAY_REQUEST:`mediaplayrequest`,MEDIA_PAUSE_REQUEST:`mediapauserequest`,MEDIA_MUTE_REQUEST:`mediamuterequest`,MEDIA_UNMUTE_REQUEST:`mediaunmuterequest`,MEDIA_LOOP_REQUEST:`medialooprequest`,MEDIA_VOLUME_REQUEST:`mediavolumerequest`,MEDIA_SEEK_REQUEST:`mediaseekrequest`,MEDIA_AIRPLAY_REQUEST:`mediaairplayrequest`,MEDIA_ENTER_FULLSCREEN_REQUEST:`mediaenterfullscreenrequest`,MEDIA_EXIT_FULLSCREEN_REQUEST:`mediaexitfullscreenrequest`,MEDIA_PREVIEW_REQUEST:`mediapreviewrequest`,MEDIA_ENTER_PIP_REQUEST:`mediaenterpiprequest`,MEDIA_EXIT_PIP_REQUEST:`mediaexitpiprequest`,MEDIA_ENTER_CAST_REQUEST:`mediaentercastrequest`,MEDIA_EXIT_CAST_REQUEST:`mediaexitcastrequest`,MEDIA_SHOW_TEXT_TRACKS_REQUEST:`mediashowtexttracksrequest`,MEDIA_HIDE_TEXT_TRACKS_REQUEST:`mediahidetexttracksrequest`,MEDIA_SHOW_SUBTITLES_REQUEST:`mediashowsubtitlesrequest`,MEDIA_DISABLE_SUBTITLES_REQUEST:`mediadisablesubtitlesrequest`,MEDIA_TOGGLE_SUBTITLES_REQUEST:`mediatogglesubtitlesrequest`,MEDIA_PLAYBACK_RATE_REQUEST:`mediaplaybackraterequest`,MEDIA_RENDITION_REQUEST:`mediarenditionrequest`,MEDIA_AUDIO_TRACK_REQUEST:`mediaaudiotrackrequest`,MEDIA_SEEK_TO_LIVE_REQUEST:`mediaseektoliverequest`,REGISTER_MEDIA_STATE_RECEIVER:`registermediastatereceiver`,UNREGISTER_MEDIA_STATE_RECEIVER:`unregistermediastatereceiver`},b={MEDIA_CHROME_ATTRIBUTES:`mediachromeattributes`,MEDIA_CONTROLLER:`mediacontroller`},Se={MEDIA_AIRPLAY_UNAVAILABLE:`mediaAirplayUnavailable`,MEDIA_AUDIO_TRACK_ENABLED:`mediaAudioTrackEnabled`,MEDIA_AUDIO_TRACK_LIST:`mediaAudioTrackList`,MEDIA_AUDIO_TRACK_UNAVAILABLE:`mediaAudioTrackUnavailable`,MEDIA_BUFFERED:`mediaBuffered`,MEDIA_CAST_UNAVAILABLE:`mediaCastUnavailable`,MEDIA_CHAPTERS_CUES:`mediaChaptersCues`,MEDIA_CURRENT_TIME:`mediaCurrentTime`,MEDIA_DURATION:`mediaDuration`,MEDIA_ENDED:`mediaEnded`,MEDIA_ERROR:`mediaError`,MEDIA_ERROR_CODE:`mediaErrorCode`,MEDIA_ERROR_MESSAGE:`mediaErrorMessage`,MEDIA_FULLSCREEN_UNAVAILABLE:`mediaFullscreenUnavailable`,MEDIA_HAS_PLAYED:`mediaHasPlayed`,MEDIA_HEIGHT:`mediaHeight`,MEDIA_IS_AIRPLAYING:`mediaIsAirplaying`,MEDIA_IS_CASTING:`mediaIsCasting`,MEDIA_IS_FULLSCREEN:`mediaIsFullscreen`,MEDIA_IS_PIP:`mediaIsPip`,MEDIA_LOADING:`mediaLoading`,MEDIA_MUTED:`mediaMuted`,MEDIA_LOOP:`mediaLoop`,MEDIA_PAUSED:`mediaPaused`,MEDIA_PIP_UNAVAILABLE:`mediaPipUnavailable`,MEDIA_PLAYBACK_RATE:`mediaPlaybackRate`,MEDIA_PREVIEW_CHAPTER:`mediaPreviewChapter`,MEDIA_PREVIEW_COORDS:`mediaPreviewCoords`,MEDIA_PREVIEW_IMAGE:`mediaPreviewImage`,MEDIA_PREVIEW_TIME:`mediaPreviewTime`,MEDIA_RENDITION_LIST:`mediaRenditionList`,MEDIA_RENDITION_SELECTED:`mediaRenditionSelected`,MEDIA_RENDITION_UNAVAILABLE:`mediaRenditionUnavailable`,MEDIA_SEEKABLE:`mediaSeekable`,MEDIA_STREAM_TYPE:`mediaStreamType`,MEDIA_SUBTITLES_LIST:`mediaSubtitlesList`,MEDIA_SUBTITLES_SHOWING:`mediaSubtitlesShowing`,MEDIA_TARGET_LIVE_WINDOW:`mediaTargetLiveWindow`,MEDIA_TIME_IS_LIVE:`mediaTimeIsLive`,MEDIA_VOLUME:`mediaVolume`,MEDIA_VOLUME_LEVEL:`mediaVolumeLevel`,MEDIA_VOLUME_UNAVAILABLE:`mediaVolumeUnavailable`,MEDIA_LANG:`mediaLang`,MEDIA_WIDTH:`mediaWidth`},Ce=Object.entries(Se),x=Ce.reduce((e,[t,n])=>(e[t]=n.toLowerCase(),e),{}),we=Ce.reduce((e,[t,n])=>(e[t]=n.toLowerCase(),e),{USER_INACTIVE_CHANGE:`userinactivechange`,BREAKPOINTS_CHANGE:`breakpointchange`,BREAKPOINTS_COMPUTED:`breakpointscomputed`});Object.entries(we).reduce((e,[t,n])=>{let r=x[t];return r&&(e[n]=r),e},{userinactivechange:`userinactive`});var Te=Object.entries(x).reduce((e,[t,n])=>{let r=we[t];return r&&(e[n]=r),e},{userinactive:`userinactivechange`}),Ee={SUBTITLES:`subtitles`,CAPTIONS:`captions`,DESCRIPTIONS:`descriptions`,CHAPTERS:`chapters`,METADATA:`metadata`},S={DISABLED:`disabled`,HIDDEN:`hidden`,SHOWING:`showing`},C={MOUSE:`mouse`,PEN:`pen`,TOUCH:`touch`},w={UNAVAILABLE:`unavailable`,UNSUPPORTED:`unsupported`},De={LIVE:`live`,ON_DEMAND:`on-demand`,UNKNOWN:`unknown`},Oe={INLINE:`inline`,FULLSCREEN:`fullscreen`,PICTURE_IN_PICTURE:`picture-in-picture`};function ke(e){return e?.map(T).join(` `)}function T(e){if(e){let{id:t,width:n,height:r}=e;return[t,n,r].filter(e=>e!=null).join(`:`)}}function Ae(e){return e?.map(E).join(` `)}function E(e){if(e){let{id:t,kind:n,language:r,label:i}=e;return[t,n,r,i].filter(e=>e!=null).join(`:`)}}function je(e){return typeof e==`number`&&!Number.isNaN(e)&&Number.isFinite(e)}var Me=e=>new Promise(t=>setTimeout(t,e)),Ne={en:{"Start airplay":`Start airplay`,"Stop airplay":`Stop airplay`,Audio:`Audio`,Captions:`Captions`,"Enable captions":`Enable captions`,"Disable captions":`Disable captions`,"Start casting":`Start casting`,"Stop casting":`Stop casting`,"Enter fullscreen mode":`Enter fullscreen mode`,"Exit fullscreen mode":`Exit fullscreen mode`,Mute:`Mute`,Unmute:`Unmute`,Loop:`Loop`,"Enter picture in picture mode":`Enter picture in picture mode`,"Exit picture in picture mode":`Exit picture in picture mode`,Play:`Play`,Pause:`Pause`,"Playback rate":`Playback rate`,"Playback rate {playbackRate}":`Playback rate {playbackRate}`,Quality:`Quality`,"Seek backward":`Seek backward`,"Seek forward":`Seek forward`,Settings:`Settings`,Auto:`Auto`,"audio player":`audio player`,"video player":`video player`,volume:`volume`,seek:`seek`,"closed captions":`closed captions`,"current playback rate":`current playback rate`,"playback time":`playback time`,"media loading":`media loading`,settings:`settings`,"audio tracks":`audio tracks`,quality:`quality`,play:`play`,pause:`pause`,mute:`mute`,unmute:`unmute`,"chapter: {chapterName}":`chapter: {chapterName}`,live:`live`,Off:`Off`,"start airplay":`start airplay`,"stop airplay":`stop airplay`,"start casting":`start casting`,"stop casting":`stop casting`,"enter fullscreen mode":`enter fullscreen mode`,"exit fullscreen mode":`exit fullscreen mode`,"enter picture in picture mode":`enter picture in picture mode`,"exit picture in picture mode":`exit picture in picture mode`,"seek to live":`seek to live`,"playing live":`playing live`,"seek back {seekOffset} seconds":`seek back {seekOffset} seconds`,"seek forward {seekOffset} seconds":`seek forward {seekOffset} seconds`,"Network Error":`Network Error`,"Decode Error":`Decode Error`,"Source Not Supported":`Source Not Supported`,"Encryption Error":`Encryption Error`,"A network error caused the media download to fail.":`A network error caused the media download to fail.`,"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":`A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.`,"An unsupported error occurred. The server or network failed, or your browser does not support this format.":`An unsupported error occurred. The server or network failed, or your browser does not support this format.`,"The media is encrypted and there are no keys to decrypt it.":`The media is encrypted and there are no keys to decrypt it.`,hour:`hour`,hours:`hours`,minute:`minute`,minutes:`minutes`,second:`second`,seconds:`seconds`,"{time} remaining":`{time} remaining`,"{currentTime} of {totalTime}":`{currentTime} of {totalTime}`,"video not loaded, unknown time.":`video not loaded, unknown time.`}},Pe=globalThis.navigator?.language||`en`,Fe=e=>{Pe=e},Ie=e=>{let[t]=Pe.split(`-`);return Ne[Pe]?.[e]||Ne[t]?.[e]||Ne.en?.[e]||e},Le=()=>{let[e]=Pe.split(`-`);return Ne[Pe]?Pe:Ne[e]?e:`en`},D=(e,t={})=>Ie(e).replace(/\{(\w+)\}/g,(e,n)=>n in t?String(t[n]):`{${n}}`),Re=[{singular:`hour`,plural:`hours`},{singular:`minute`,plural:`minutes`},{singular:`second`,plural:`seconds`}],ze=(e,t)=>`${e} ${D(e===1?Re[t].singular:Re[t].plural)}`,Be=e=>{if(!je(e))return``;let t=Math.abs(e),n=t!==e,r=new Date(0,0,0,0,0,t,0),i=[r.getHours(),r.getMinutes(),r.getSeconds()].map((e,t)=>e&&ze(e,t)).filter(e=>e).join(`, `);return n?D(`{time} remaining`,{time:i}):i};function Ve(e,t){let n=!1;e<0&&(n=!0,e=0-e),e=e<0?0:e;let r=Math.floor(e%60),i=Math.floor(e/60%60),a=Math.floor(e/3600),o=Math.floor(t/60%60),s=Math.floor(t/3600);return(isNaN(e)||e===1/0)&&(a=i=r=`0`),a=a>0||s>0?a+`:`:``,i=((a||o>=10)&&i<10?`0`+i:i)+`:`,r=r<10?`0`+r:r,(n?`-`:``)+a+i+r}Object.freeze({length:0,start(e){let t=e>>>0;if(t>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(e){let t=e>>>0;if(t>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);return 0}});var He=class{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}},Ue=class extends He{},We=class extends Ue{constructor(){super(...arguments),this.role=null}},Ge=class{observe(){}unobserve(){}disconnect(){}},Ke={createElement:function(){return new qe.HTMLElement},createElementNS:function(){return new qe.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(e){return!1}},qe={ResizeObserver:Ge,document:Ke,Node:Ue,Element:We,HTMLElement:class extends We{constructor(){super(...arguments),this.innerHTML=``}get content(){return new qe.DocumentFragment}},DocumentFragment:class extends He{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(e){return null},setItem(e,t){},removeItem(e){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return``}},matchMedia(e){return{matches:!1,media:e}},DOMParser:class{parseFromString(e,t){return{body:{textContent:e}}}}},Je=`global`in globalThis&&(globalThis==null?void 0:globalThis.global)===globalThis||typeof window>`u`||window.customElements===void 0,Ye=Object.keys(qe).every(e=>e in globalThis),O=Je&&!Ye?qe:globalThis,k=Je&&!Ye?Ke:globalThis.document,Xe=new WeakMap,Ze=e=>{let t=Xe.get(e);return t||Xe.set(e,t=new Set),t},Qe=new O.ResizeObserver(e=>{for(let t of e)for(let e of Ze(t.target))e(t)});function $e(e,t){Ze(e).add(t),Qe.observe(e)}function et(e,t){let n=Ze(e);n.delete(t),n.size||Qe.unobserve(e)}function tt(e){let t={};for(let n of e)t[n.name]=n.value;return t}function nt(e){return rt(e)??ct(e,`media-controller`)}function rt(e){let{MEDIA_CONTROLLER:t}=b,n=e.getAttribute(t);if(n)return ut(e)?.getElementById(n)}var it=(e,t,n=`.value`)=>{let r=e.querySelector(n);r&&(r.textContent=t)},at=(e,t)=>{let n=`slot[name="${t}"]`,r=e.shadowRoot.querySelector(n);return r?r.children:[]},ot=(e,t)=>at(e,t)[0],st=(e,t)=>!e||!t?!1:e?.contains(t)?!0:st(e,t.getRootNode().host),ct=(e,t)=>e?e.closest(t)||ct(e.getRootNode().host,t):null;function lt(e=document){let t=e?.activeElement;return t?lt(t.shadowRoot)??t:null}function ut(e){let t=(e?.getRootNode)?.call(e);return t instanceof ShadowRoot||t instanceof Document?t:null}function dt(e,{depth:t=3,checkOpacity:n=!0,checkVisibilityCSS:r=!0}={}){if(e.checkVisibility)return e.checkVisibility({checkOpacity:n,checkVisibilityCSS:r});let i=e;for(;i&&t>0;){let e=getComputedStyle(i);if(n&&e.opacity===`0`||r&&e.visibility===`hidden`||e.display===`none`)return!1;i=i.parentElement,t--}return!0}function ft(e,t,n,r){let i=r.x-n.x,a=r.y-n.y,o=i*i+a*a;if(o===0)return 0;let s=((e-n.x)*i+(t-n.y)*a)/o;return Math.max(0,Math.min(1,s))}function A(e,t){return pt(e,e=>e===t)||mt(e,t)}function pt(e,t){let n;for(n of e.querySelectorAll(`style:not([media])`)??[]){let e;try{e=n.sheet?.cssRules}catch{continue}for(let n of e??[])if(t(n.selectorText))return n}}function mt(e,t){let n=e.querySelectorAll(`style:not([media])`)??[],r=n?.[n.length-1];if(!r?.sheet)return console.warn(`Media Chrome: No style sheet found on style tag of`,e),{style:{setProperty:()=>{},removeProperty:()=>``,getPropertyValue:()=>``}};let i=r?.sheet.insertRule(`${t}{}`,r.sheet.cssRules.length);return r.sheet.cssRules?.[i]}function j(e,t,n=NaN){let r=e.getAttribute(t);return r==null?n:+r}function M(e,t,n){let r=+n;if(n==null||Number.isNaN(r)){e.hasAttribute(t)&&e.removeAttribute(t);return}j(e,t,void 0)!==r&&e.setAttribute(t,`${r}`)}function N(e,t){return e.hasAttribute(t)}function P(e,t,n){if(n==null){e.hasAttribute(t)&&e.removeAttribute(t);return}N(e,t)!=n&&e.toggleAttribute(t,n)}function F(e,t,n=null){return e.getAttribute(t)??n}function I(e,t,n){if(n==null){e.hasAttribute(t)&&e.removeAttribute(t);return}let r=`${n}`;F(e,t,void 0)!==r&&e.setAttribute(t,r)}var ht=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},gt=(e,t,n)=>(ht(e,t,`read from private field`),n?n.call(e):t.get(e)),_t=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},vt=(e,t,n,r)=>(ht(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),L;function yt(e){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `}var bt=class extends O.HTMLElement{constructor(){if(super(),_t(this,L,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[b.MEDIA_CONTROLLER,x.MEDIA_PAUSED]}attributeChangedCallback(e,t,n){var r,i,a,o;e===b.MEDIA_CONTROLLER&&(t&&((i=(r=gt(this,L))?.unassociateElement)==null||i.call(r,this),vt(this,L,null)),n&&this.isConnected&&(vt(this,L,this.getRootNode()?.getElementById(n)),(o=(a=gt(this,L))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;this.tabIndex=-1,this.setAttribute(`aria-hidden`,`true`),vt(this,L,xt(this)),this.getAttribute(b.MEDIA_CONTROLLER)&&((t=(e=gt(this,L))?.associateElement)==null||t.call(e,this)),gt(this,L)&&(gt(this,L).addEventListener(`pointerdown`,this),gt(this,L).addEventListener(`click`,this),gt(this,L).hasAttribute(`tabindex`)||(gt(this,L).tabIndex=0))}disconnectedCallback(){var e,t,n,r;this.getAttribute(b.MEDIA_CONTROLLER)&&((t=(e=gt(this,L))?.unassociateElement)==null||t.call(e,this)),(n=gt(this,L))==null||n.removeEventListener(`pointerdown`,this),(r=gt(this,L))==null||r.removeEventListener(`click`,this),vt(this,L,null)}handleEvent(e){let t=e.composedPath()?.[0];if([`video`,`media-controller`].includes(t?.localName)){if(e.type===`pointerdown`)this._pointerType=e.pointerType;else if(e.type===`click`){let{clientX:t,clientY:n}=e,{left:r,top:i,width:a,height:o}=this.getBoundingClientRect(),s=t-r,c=n-i;if(s<0||c<0||s>a||c>o||a===0&&o===0)return;let l=this._pointerType||`mouse`;if(this._pointerType=void 0,l===C.TOUCH){this.handleTap(e);return}else if(l===C.MOUSE||l===C.PEN){this.handleMouseClick(e);return}}}}get mediaPaused(){return N(this,x.MEDIA_PAUSED)}set mediaPaused(e){P(this,x.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){let t=this.mediaPaused?y.MEDIA_PLAY_REQUEST:y.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new O.CustomEvent(t,{composed:!0,bubbles:!0}))}};L=new WeakMap,bt.shadowRootOptions={mode:`open`},bt.getTemplateHTML=yt;function xt(e){let t=e.getAttribute(b.MEDIA_CONTROLLER);return t?e.getRootNode()?.getElementById(t):ct(e,`media-controller`)}O.customElements.get(`media-gesture-receiver`)||O.customElements.define(`media-gesture-receiver`,bt);var St=bt,Ct=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},R=(e,t,n)=>(Ct(e,t,`read from private field`),n?n.call(e):t.get(e)),z=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},wt=(e,t,n,r)=>(Ct(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Tt=(e,t,n)=>(Ct(e,t,`access private method`),n),Et,Dt,Ot,kt,At,jt,Mt,Nt,Pt,Ft,It,Lt,Rt,zt,Bt,Vt,Ht,Ut,Wt,Gt,B={AUDIO:`audio`,AUTOHIDE:`autohide`,BREAKPOINTS:`breakpoints`,GESTURES_DISABLED:`gesturesdisabled`,KEYBOARD_CONTROL:`keyboardcontrol`,NO_AUTOHIDE:`noautohide`,USER_INACTIVE:`userinactive`,AUTOHIDE_OVER_CONTROLS:`autohideovercontrols`};function Kt(e){return`
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
        <template shadowrootmode="${St.shadowRootOptions.mode}">
          ${St.getTemplateHTML({})}
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
  `}var qt=Object.values(x),Jt=`sm:384 md:576 lg:768 xl:960`;function Yt(e){Xt(e.target,e.contentRect.width)}function Xt(e,t){if(!e.isConnected)return;let n=Zt(e.getAttribute(B.BREAKPOINTS)??Jt),r=Qt(n,t),i=!1;if(Object.keys(n).forEach(t=>{if(r.includes(t)){e.hasAttribute(`breakpoint${t}`)||(e.setAttribute(`breakpoint${t}`,``),i=!0);return}e.hasAttribute(`breakpoint${t}`)&&(e.removeAttribute(`breakpoint${t}`),i=!0)}),i){let t=new CustomEvent(we.BREAKPOINTS_CHANGE,{detail:r});e.dispatchEvent(t)}e.breakpointsComputed||(e.breakpointsComputed=!0,e.dispatchEvent(new CustomEvent(we.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}function Zt(e){let t=e.split(/\s+/);return Object.fromEntries(t.map(e=>e.split(`:`)))}function Qt(e,t){return Object.keys(e).filter(n=>t>=parseInt(e[n]))}var $t=class extends O.HTMLElement{constructor(){if(super(),z(this,Pt),z(this,It),z(this,Rt),z(this,Bt),z(this,Ht),z(this,Et,void 0),z(this,Dt,0),z(this,Ot,null),z(this,kt,null),z(this,At,void 0),this.breakpointsComputed=!1,z(this,jt,e=>{let t=this.media;for(let n of e){if(n.type!==`childList`)continue;let e=n.removedNodes;for(let r of e){if(r.slot!=`media`||n.target!=this)continue;let e=n.previousSibling&&n.previousSibling.previousElementSibling;if(!e||!t)this.mediaUnsetCallback(r);else{let t=e.slot!==`media`;for(;(e=e.previousSibling)!==null;)e.slot==`media`&&(t=!1);t&&this.mediaUnsetCallback(r)}}if(t)for(let e of n.addedNodes)e===t&&this.handleMediaUpdated(t)}}),z(this,Mt,!1),z(this,Nt,e=>{R(this,Mt)||(setTimeout(()=>{Yt(e),wt(this,Mt,!1)},0),wt(this,Mt,!0))}),z(this,Wt,void 0),z(this,Gt,()=>{if(!R(this,Wt).assignedElements({flatten:!0}).length){R(this,Ot)&&this.mediaUnsetCallback(R(this,Ot));return}this.handleMediaUpdated(this.media)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=tt(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}wt(this,Et,new MutationObserver(R(this,jt)))}static get observedAttributes(){return[B.AUTOHIDE,B.GESTURES_DISABLED].concat(qt).filter(e=>![x.MEDIA_RENDITION_LIST,x.MEDIA_AUDIO_TRACK_LIST,x.MEDIA_CHAPTERS_CUES,x.MEDIA_WIDTH,x.MEDIA_HEIGHT,x.MEDIA_ERROR,x.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,t,n){e.toLowerCase()==B.AUTOHIDE&&(this.autohide=n)}get media(){let e=this.querySelector(`:scope > [slot=media]`);return e?.nodeName==`SLOT`&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(wt(this,Ot,e),e.localName.includes(`-`)&&await O.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;R(this,Et).observe(this,{childList:!0,subtree:!0}),$e(this,R(this,Nt));let t=this.getAttribute(B.AUDIO)==null?D(`video player`):D(`audio player`);this.setAttribute(`role`,`region`),this.setAttribute(`aria-label`,t),this.handleMediaUpdated(this.media),this.setAttribute(B.USER_INACTIVE,``),Xt(this,this.getBoundingClientRect().width);let n=this.querySelector(`:scope > slot[slot=media]`);n&&(wt(this,Wt,n),R(this,Wt).addEventListener(`slotchange`,R(this,Gt))),this.addEventListener(`pointerdown`,this),this.addEventListener(`pointermove`,this),this.addEventListener(`pointerup`,this),this.addEventListener(`mouseleave`,this),this.addEventListener(`keyup`,this),(e=O.window)==null||e.addEventListener(`mouseup`,this)}disconnectedCallback(){var e;et(this,R(this,Nt)),clearTimeout(R(this,kt)),R(this,Et).disconnect(),this.media&&this.mediaUnsetCallback(this.media),(e=O.window)==null||e.removeEventListener(`mouseup`,this),this.removeEventListener(`pointerdown`,this),this.removeEventListener(`pointermove`,this),this.removeEventListener(`pointerup`,this),this.removeEventListener(`mouseleave`,this),this.removeEventListener(`keyup`,this),R(this,Wt)&&(R(this,Wt).removeEventListener(`slotchange`,R(this,Gt)),wt(this,Wt,null)),wt(this,Mt,!1)}mediaSetCallback(e){}mediaUnsetCallback(e){wt(this,Ot,null)}handleEvent(e){switch(e.type){case`pointerdown`:wt(this,Dt,e.timeStamp);break;case`pointermove`:Tt(this,Pt,Ft).call(this,e);break;case`pointerup`:Tt(this,It,Lt).call(this,e);break;case`mouseleave`:Tt(this,Rt,zt).call(this);break;case`mouseup`:this.removeAttribute(B.KEYBOARD_CONTROL);break;case`keyup`:Tt(this,Ht,Ut).call(this),this.setAttribute(B.KEYBOARD_CONTROL,``);break}}set autohide(e){let t=Number(e);wt(this,At,isNaN(t)?0:t)}get autohide(){return(R(this,At)===void 0?2:R(this,At)).toString()}get breakpoints(){return F(this,B.BREAKPOINTS)}set breakpoints(e){I(this,B.BREAKPOINTS,e)}get audio(){return N(this,B.AUDIO)}set audio(e){P(this,B.AUDIO,e)}get gesturesDisabled(){return N(this,B.GESTURES_DISABLED)}set gesturesDisabled(e){P(this,B.GESTURES_DISABLED,e)}get keyboardControl(){return N(this,B.KEYBOARD_CONTROL)}set keyboardControl(e){P(this,B.KEYBOARD_CONTROL,e)}get noAutohide(){return N(this,B.NO_AUTOHIDE)}set noAutohide(e){P(this,B.NO_AUTOHIDE,e)}get autohideOverControls(){return N(this,B.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){P(this,B.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return N(this,B.USER_INACTIVE)}set userInteractive(e){P(this,B.USER_INACTIVE,e)}};Et=new WeakMap,Dt=new WeakMap,Ot=new WeakMap,kt=new WeakMap,At=new WeakMap,jt=new WeakMap,Mt=new WeakMap,Nt=new WeakMap,Pt=new WeakSet,Ft=function(e){if(e.pointerType!==`mouse`&&e.timeStamp-R(this,Dt)<250)return;Tt(this,Bt,Vt).call(this),clearTimeout(R(this,kt));let t=this.hasAttribute(B.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(e.target)||t)&&Tt(this,Ht,Ut).call(this)},It=new WeakSet,Lt=function(e){if(e.pointerType===`touch`){let t=!this.hasAttribute(B.USER_INACTIVE);[this,this.media].includes(e.target)&&t?Tt(this,Rt,zt).call(this):Tt(this,Ht,Ut).call(this)}else e.composedPath().some(e=>[`media-play-button`,`media-fullscreen-button`].includes(e?.localName))&&Tt(this,Ht,Ut).call(this)},Rt=new WeakSet,zt=function(){if(R(this,At)<0||this.hasAttribute(B.USER_INACTIVE))return;this.setAttribute(B.USER_INACTIVE,``);let e=new O.CustomEvent(we.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(e)},Bt=new WeakSet,Vt=function(){if(!this.hasAttribute(B.USER_INACTIVE))return;this.removeAttribute(B.USER_INACTIVE);let e=new O.CustomEvent(we.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(e)},Ht=new WeakSet,Ut=function(){Tt(this,Bt,Vt).call(this),clearTimeout(R(this,kt));let e=parseInt(this.autohide);e<0||wt(this,kt,setTimeout(()=>{Tt(this,Rt,zt).call(this)},e*1e3))},Wt=new WeakMap,Gt=new WeakMap,$t.shadowRootOptions={mode:`open`},$t.getTemplateHTML=Kt,O.customElements.get(`media-container`)||O.customElements.define(`media-container`,$t);var en=$t,tn=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},V=(e,t,n)=>(tn(e,t,`read from private field`),n?n.call(e):t.get(e)),nn=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},rn=(e,t,n,r)=>(tn(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),an,on,sn,cn,ln,un,dn=class{constructor(e,t,{defaultValue:n}={defaultValue:void 0}){nn(this,ln),nn(this,an,void 0),nn(this,on,void 0),nn(this,sn,void 0),nn(this,cn,new Set),rn(this,an,e),rn(this,on,t),rn(this,sn,new Set(n))}[Symbol.iterator](){return V(this,ln,un).values()}get length(){return V(this,ln,un).size}get value(){return[...V(this,ln,un)].join(` `)??``}set value(e){e!==this.value&&(rn(this,cn,new Set),this.add(...e?.split(` `)??[]))}toString(){return this.value}item(e){return[...V(this,ln,un)][e]}values(){return V(this,ln,un).values()}forEach(e,t){V(this,ln,un).forEach(e,t)}add(...e){var t;e.forEach(e=>V(this,cn).add(e)),!(this.value===``&&!V(this,an)?.hasAttribute(`${V(this,on)}`))&&((t=V(this,an))==null||t.setAttribute(`${V(this,on)}`,`${this.value}`))}remove(...e){var t;e.forEach(e=>V(this,cn).delete(e)),(t=V(this,an))==null||t.setAttribute(`${V(this,on)}`,`${this.value}`)}contains(e){return V(this,ln,un).has(e)}toggle(e,t){return t===void 0?this.contains(e)?(this.remove(e),!1):(this.add(e),!0):t?(this.add(e),!0):(this.remove(e),!1)}replace(e,t){return this.remove(e),this.add(t),e===t}};an=new WeakMap,on=new WeakMap,sn=new WeakMap,cn=new WeakMap,ln=new WeakSet,un=function(){return V(this,cn).size?V(this,cn):V(this,sn)};var fn=(e=``)=>e.split(/\s+/),pn=(e=``)=>{let[t,n,r]=e.split(`:`),i=r?decodeURIComponent(r):void 0;return{kind:t===`cc`?Ee.CAPTIONS:Ee.SUBTITLES,language:n,label:i}},mn=(e=``,t={})=>fn(e).map(e=>{let n=pn(e);return{...t,...n}}),hn=e=>e?Array.isArray(e)?e.map(e=>typeof e==`string`?pn(e):e):typeof e==`string`?mn(e):[e]:[],gn=({kind:e,label:t,language:n}={kind:`subtitles`})=>t?`${e===`captions`?`cc`:`sb`}:${n}:${encodeURIComponent(t)}`:n,_n=(e=[])=>Array.prototype.map.call(e,gn).join(` `),vn=(e,t)=>n=>n[e]===t,yn=e=>{let t=Object.entries(e).map(([e,t])=>vn(e,t));return e=>t.every(t=>t(e))},bn=(e,t=[],n=[])=>{let r=hn(n).map(yn);Array.from(t).filter(e=>r.some(t=>t(e))).forEach(t=>{t.mode=e})},xn=(e,t=()=>!0)=>{if(!e?.textTracks)return[];let n=typeof t==`function`?t:yn(t);return Array.from(e.textTracks).filter(n)},Sn=e=>!!e.mediaSubtitlesShowing?.length||e.hasAttribute(x.MEDIA_SUBTITLES_SHOWING),Cn=e=>{let{media:t,fullscreenElement:n}=e;try{let e=n&&`requestFullscreen`in n?`requestFullscreen`:n&&`webkitRequestFullScreen`in n?`webkitRequestFullScreen`:void 0;if(e){let t=n[e]?.call(n);if(t instanceof Promise)return t.catch(()=>{})}else t?.webkitEnterFullscreen?t.webkitEnterFullscreen():t?.requestFullscreen&&t.requestFullscreen()}catch(e){console.error(e)}},wn=`exitFullscreen`in k?`exitFullscreen`:`webkitExitFullscreen`in k?`webkitExitFullscreen`:`webkitCancelFullScreen`in k?`webkitCancelFullScreen`:void 0,Tn=e=>{let{documentElement:t}=e;if(wn){let e=(t?.[wn])?.call(t);if(e instanceof Promise)return e.catch(()=>{})}},En=`fullscreenElement`in k?`fullscreenElement`:`webkitFullscreenElement`in k?`webkitFullscreenElement`:void 0,Dn=e=>{let{documentElement:t,media:n}=e,r=t?.[En];return!r&&`webkitDisplayingFullscreen`in n&&`webkitPresentationMode`in n&&n.webkitDisplayingFullscreen&&n.webkitPresentationMode===Oe.FULLSCREEN?n:r},On=e=>{let{media:t,documentElement:n,fullscreenElement:r=t}=e;if(!t||!n)return!1;let i=Dn(e);if(!i)return!1;if(i===r||i===t)return!0;if(i.localName.includes(`-`)){let e=i.shadowRoot;if(!(En in e))return st(i,r);for(;e?.[En];){if(e[En]===r)return!0;e=e[En]?.shadowRoot}}return!1},kn=`fullscreenEnabled`in k?`fullscreenEnabled`:`webkitFullscreenEnabled`in k?`webkitFullscreenEnabled`:void 0,An=e=>{let{documentElement:t,media:n}=e;return!!t?.[kn]||n&&`webkitSupportsFullscreen`in n},jn,Mn=()=>{var e;return jn||(jn=((e=k)?.createElement)?.call(e,`video`),jn)},Nn=async(e=Mn())=>{if(!e)return!1;let t=e.volume;e.volume=t/2+.1;let n=new AbortController,r=await Promise.race([Pn(e,n.signal),Fn(e,t)]);return n.abort(),r},Pn=(e,t)=>new Promise(n=>{e.addEventListener(`volumechange`,()=>n(!0),{signal:t})}),Fn=async(e,t)=>{for(let n=0;n<10;n++){if(e.volume===t)return!1;await Me(10)}return e.volume!==t},In=/.*Version\/.*Safari\/.*/.test(O.navigator.userAgent),Ln=(e=Mn())=>O.matchMedia(`(display-mode: standalone)`).matches&&In?!1:typeof e?.requestPictureInPicture==`function`,Rn=(e=Mn())=>An({documentElement:k,media:e}),zn=Rn(),Bn=Ln(),Vn=!!O.WebKitPlaybackTargetAvailabilityEvent,Hn=!!O.chrome,Un=e=>xn(e.media,e=>[Ee.SUBTITLES,Ee.CAPTIONS].includes(e.kind)).sort((e,t)=>e.kind>=t.kind?1:-1),Wn=e=>xn(e.media,e=>e.mode===S.SHOWING&&[Ee.SUBTITLES,Ee.CAPTIONS].includes(e.kind)),Gn=(e,t)=>{let n=Un(e),r=Wn(e),i=!!r.length;if(n.length){if(t===!1||i&&t!==!0)bn(S.DISABLED,n,r);else if(t===!0||!i&&t!==!1){let t=n[0],{options:i}=e;if(!i?.noSubtitlesLangPref){let e=O.localStorage.getItem(`media-chrome-pref-subtitles-lang`),r=e?[e,...O.navigator.languages]:O.navigator.languages,i=n.filter(e=>r.some(t=>e.language.toLowerCase().startsWith(t.split(`-`)[0]))).sort((e,t)=>r.findIndex(t=>e.language.toLowerCase().startsWith(t.split(`-`)[0]))-r.findIndex(e=>t.language.toLowerCase().startsWith(e.split(`-`)[0])));i[0]&&(t=i[0])}let{language:a,label:o,kind:s}=t;bn(S.DISABLED,n,r),bn(S.SHOWING,n,[{language:a,label:o,kind:s}])}}},Kn=(e,t)=>e===t?!0:e==null||t==null||typeof e!=typeof t?!1:typeof e==`number`&&Number.isNaN(e)&&Number.isNaN(t)?!0:typeof e==`object`?Array.isArray(e)?qn(e,t):Object.entries(e).every(([e,n])=>e in t&&Kn(n,t[e])):!1,qn=(e,t)=>{let n=Array.isArray(e),r=Array.isArray(t);return n===r?n||r?e.length===t.length&&e.every((e,n)=>Kn(e,t[n])):!0:!1},Jn=Object.values(De),Yn,Xn=Nn().then(e=>(Yn=e,Yn)),Zn=async(...e)=>{await Promise.all(e.filter(e=>e).map(async e=>{if(!(`localName`in e&&e instanceof O.HTMLElement))return;let t=e.localName;if(!t.includes(`-`))return;let n=O.customElements.get(t);n&&e instanceof n||(await O.customElements.whenDefined(t),O.customElements.upgrade(e))}))},Qn=new O.DOMParser,$n=e=>e&&(Qn.parseFromString(e,`text/html`).body.textContent||e),er={mediaError:{get(e,t){let{media:n}=e;if(t?.type!==`playing`)return n?.error},mediaEvents:[`emptied`,`error`,`playing`]},mediaErrorCode:{get(e,t){let{media:n}=e;if(t?.type!==`playing`)return n?.error?.code},mediaEvents:[`emptied`,`error`,`playing`]},mediaErrorMessage:{get(e,t){let{media:n}=e;if(t?.type!==`playing`)return n?.error?.message??``},mediaEvents:[`emptied`,`error`,`playing`]},mediaWidth:{get(e){let{media:t}=e;return t?.videoWidth??0},mediaEvents:[`resize`]},mediaHeight:{get(e){let{media:t}=e;return t?.videoHeight??0},mediaEvents:[`resize`]},mediaPaused:{get(e){let{media:t}=e;return t?.paused??!0},set(e,t){var n;let{media:r}=t;r&&(e?r.pause():(n=r.play())==null||n.catch(()=>{}))},mediaEvents:[`play`,`playing`,`pause`,`emptied`]},mediaHasPlayed:{get(e,t){let{media:n}=e;return n?t?t.type===`playing`:!n.paused:!1},mediaEvents:[`playing`,`emptied`]},mediaEnded:{get(e){let{media:t}=e;return t?.ended??!1},mediaEvents:[`seeked`,`ended`,`emptied`]},mediaPlaybackRate:{get(e){let{media:t}=e;return t?.playbackRate??1},set(e,t){let{media:n}=t;n&&Number.isFinite(+e)&&(n.playbackRate=+e)},mediaEvents:[`ratechange`,`loadstart`]},mediaMuted:{get(e){let{media:t}=e;return t?.muted??!1},set(e,t){let{media:n,options:{noMutedPref:r}={}}=t;if(n){n.muted=e;try{let t=O.localStorage.getItem(`media-chrome-pref-muted`)!==null,i=n.hasAttribute(`muted`);if(r){t&&O.localStorage.removeItem(`media-chrome-pref-muted`);return}if(i&&!t)return;O.localStorage.setItem(`media-chrome-pref-muted`,e?`true`:`false`)}catch(e){console.debug(`Error setting muted pref`,e)}}},mediaEvents:[`volumechange`],stateOwnersUpdateHandlers:[(e,t)=>{let{options:{noMutedPref:n}}=t,{media:r}=t;if(!(!r||r.muted||n))try{let n=O.localStorage.getItem(`media-chrome-pref-muted`)===`true`;er.mediaMuted.set(n,t),e(n)}catch(e){console.debug(`Error getting muted pref`,e)}}]},mediaLoop:{get(e){let{media:t}=e;return t?.loop},set(e,t){let{media:n}=t;n&&(n.loop=e)},mediaEvents:[`medialooprequest`]},mediaVolume:{get(e){let{media:t}=e;return t?.volume??1},set(e,t){let{media:n,options:{noVolumePref:r}={}}=t;if(n){try{e==null?O.localStorage.removeItem(`media-chrome-pref-volume`):!n.hasAttribute(`muted`)&&!r&&O.localStorage.setItem(`media-chrome-pref-volume`,e.toString())}catch(e){console.debug(`Error setting volume pref`,e)}Number.isFinite(+e)&&(n.volume=+e)}},mediaEvents:[`volumechange`],stateOwnersUpdateHandlers:[(e,t)=>{let{options:{noVolumePref:n}}=t;if(!n)try{let{media:n}=t;if(!n)return;let r=O.localStorage.getItem(`media-chrome-pref-volume`);if(r==null)return;er.mediaVolume.set(+r,t),e(+r)}catch(e){console.debug(`Error getting volume pref`,e)}}]},mediaVolumeLevel:{get(e){let{media:t}=e;return t?.volume===void 0?`high`:t.muted||t.volume===0?`off`:t.volume<.5?`low`:t.volume<.75?`medium`:`high`},mediaEvents:[`volumechange`]},mediaCurrentTime:{get(e){let{media:t}=e;return t?.currentTime??0},set(e,t){let{media:n}=t;!n||!je(e)||(n.currentTime=e)},mediaEvents:[`timeupdate`,`loadedmetadata`]},mediaDuration:{get(e){let{media:t,options:{defaultDuration:n}={}}=e;return n&&(!t||!t.duration||Number.isNaN(t.duration)||!Number.isFinite(t.duration))?n:Number.isFinite(t?.duration)?t.duration:NaN},mediaEvents:[`durationchange`,`loadedmetadata`,`emptied`]},mediaLoading:{get(e){let{media:t}=e;return t?.readyState<3},mediaEvents:[`waiting`,`playing`,`emptied`]},mediaSeekable:{get(e){let{media:t}=e;if(!t?.seekable?.length)return;let n=t.seekable.start(0),r=t.seekable.end(t.seekable.length-1);if(!(!n&&!r))return[Number(n.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:[`loadedmetadata`,`emptied`,`progress`,`seekablechange`]},mediaBuffered:{get(e){let{media:t}=e,n=t?.buffered??[];return Array.from(n).map((e,t)=>[Number(n.start(t).toFixed(3)),Number(n.end(t).toFixed(3))])},mediaEvents:[`progress`,`emptied`]},mediaStreamType:{get(e){let{media:t,options:{defaultStreamType:n}={}}=e,r=[De.LIVE,De.ON_DEMAND].includes(n)?n:void 0;if(!t)return r;let{streamType:i}=t;if(Jn.includes(i))return i===De.UNKNOWN?r:i;let a=t.duration;return a===1/0?De.LIVE:Number.isFinite(a)?De.ON_DEMAND:r},mediaEvents:[`emptied`,`durationchange`,`loadedmetadata`,`streamtypechange`]},mediaTargetLiveWindow:{get(e){let{media:t}=e;if(!t)return NaN;let{targetLiveWindow:n}=t,r=er.mediaStreamType.get(e);return(n==null||Number.isNaN(n))&&r===De.LIVE?0:n},mediaEvents:[`emptied`,`durationchange`,`loadedmetadata`,`streamtypechange`,`targetlivewindowchange`]},mediaTimeIsLive:{get(e){let{media:t,options:{liveEdgeOffset:n=10}={}}=e;if(!t)return!1;if(typeof t.liveEdgeStart==`number`)return!Number.isNaN(t.liveEdgeStart)&&t.currentTime>=t.liveEdgeStart;if(er.mediaStreamType.get(e)!==De.LIVE)return!1;let r=t.seekable;if(!r)return!0;if(!r.length)return!1;let i=r.end(r.length-1)-n;return t.currentTime>=i},mediaEvents:[`playing`,`timeupdate`,`progress`,`waiting`,`emptied`]},mediaSubtitlesList:{get(e){return Un(e).map(({kind:e,label:t,language:n})=>({kind:e,label:t,language:n}))},mediaEvents:[`loadstart`],textTracksEvents:[`addtrack`,`removetrack`]},mediaSubtitlesShowing:{get(e){return Wn(e).map(({kind:e,label:t,language:n})=>({kind:e,label:t,language:n}))},mediaEvents:[`loadstart`],textTracksEvents:[`addtrack`,`removetrack`,`change`],stateOwnersUpdateHandlers:[(e,t)=>{var n,r;let{media:i,options:a}=t;if(!i)return;let o=e=>{a.defaultSubtitles&&(e&&![Ee.CAPTIONS,Ee.SUBTITLES].includes(e?.track?.kind)||Gn(t,!0))};return i.addEventListener(`loadstart`,o),(n=i.textTracks)==null||n.addEventListener(`addtrack`,o),(r=i.textTracks)==null||r.addEventListener(`removetrack`,o),()=>{var e,t;i.removeEventListener(`loadstart`,o),(e=i.textTracks)==null||e.removeEventListener(`addtrack`,o),(t=i.textTracks)==null||t.removeEventListener(`removetrack`,o)}}]},mediaChaptersCues:{get(e){let{media:t}=e;if(!t)return[];let[n]=xn(t,{kind:Ee.CHAPTERS});return Array.from(n?.cues??[]).map(({text:e,startTime:t,endTime:n})=>({text:$n(e),startTime:t,endTime:n}))},mediaEvents:[`loadstart`,`loadedmetadata`],textTracksEvents:[`addtrack`,`removetrack`,`change`],stateOwnersUpdateHandlers:[(e,t)=>{let{media:n}=t;if(!n)return;let r=n.querySelector(`track[kind="chapters"][default][src]`),i=n.shadowRoot?.querySelector(`:is(video,audio) > track[kind="chapters"][default][src]`);return r?.addEventListener(`load`,e),i?.addEventListener(`load`,e),()=>{r?.removeEventListener(`load`,e),i?.removeEventListener(`load`,e)}}]},mediaIsPip:{get(e){let{media:t,documentElement:n}=e;if(!t||!n||!n.pictureInPictureElement)return!1;if(n.pictureInPictureElement===t)return!0;if(n.pictureInPictureElement instanceof HTMLMediaElement)return t.localName?.includes(`-`)?st(t,n.pictureInPictureElement):!1;if(n.pictureInPictureElement.localName.includes(`-`)){let e=n.pictureInPictureElement.shadowRoot;for(;e?.pictureInPictureElement;){if(e.pictureInPictureElement===t)return!0;e=e.pictureInPictureElement?.shadowRoot}}return!1},set(e,t){let{media:n}=t;if(n)if(e){if(!k.pictureInPictureEnabled){console.warn(`MediaChrome: Picture-in-picture is not enabled`);return}if(!n.requestPictureInPicture){console.warn(`MediaChrome: The current media does not support picture-in-picture`);return}let e=()=>{console.warn(`MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.`)};n.requestPictureInPicture().catch(t=>{if(t.code===11){if(!n.src){console.warn(`MediaChrome: The media is not ready for picture-in-picture. It must have a src set.`);return}if(n.readyState===0&&n.preload===`none`){let t=()=>{n.removeEventListener(`loadedmetadata`,r),n.preload=`none`},r=()=>{n.requestPictureInPicture().catch(e),t()};n.addEventListener(`loadedmetadata`,r),n.preload=`metadata`,setTimeout(()=>{n.readyState===0&&e(),t()},1e3)}else throw t}else throw t})}else k.pictureInPictureElement&&k.exitPictureInPicture()},mediaEvents:[`enterpictureinpicture`,`leavepictureinpicture`]},mediaRenditionList:{get(e){let{media:t}=e;return[...t?.videoRenditions??[]].map(e=>({...e}))},mediaEvents:[`emptied`,`loadstart`],videoRenditionsEvents:[`addrendition`,`removerendition`]},mediaRenditionSelected:{get(e){let{media:t}=e;return t?.videoRenditions?.[t.videoRenditions?.selectedIndex]?.id},set(e,t){let{media:n}=t;if(!n?.videoRenditions){console.warn(`MediaController: Rendition selection not supported by this media.`);return}let r=e,i=Array.prototype.findIndex.call(n.videoRenditions,e=>e.id==r);n.videoRenditions.selectedIndex!=i&&(n.videoRenditions.selectedIndex=i)},mediaEvents:[`emptied`],videoRenditionsEvents:[`addrendition`,`removerendition`,`change`]},mediaAudioTrackList:{get(e){let{media:t}=e;return[...t?.audioTracks??[]]},mediaEvents:[`emptied`,`loadstart`],audioTracksEvents:[`addtrack`,`removetrack`]},mediaAudioTrackEnabled:{get(e){let{media:t}=e;return[...t?.audioTracks??[]].find(e=>e.enabled)?.id},set(e,t){let{media:n}=t;if(!n?.audioTracks){console.warn(`MediaChrome: Audio track selection not supported by this media.`);return}let r=e;for(let e of n.audioTracks)e.enabled=r==e.id},mediaEvents:[`emptied`],audioTracksEvents:[`addtrack`,`removetrack`,`change`]},mediaIsFullscreen:{get(e){return On(e)},set(e,t,n){var r;e?(Cn(t),n.detail&&!t.media?.inert&&((r=t.media)==null||r.focus())):Tn(t)},rootEvents:[`fullscreenchange`,`webkitfullscreenchange`],mediaEvents:[`webkitbeginfullscreen`,`webkitendfullscreen`,`webkitpresentationmodechanged`]},mediaIsCasting:{get(e){let{media:t}=e;return!t?.remote||t.remote?.state===`disconnected`?!1:t.remote.state===`connected`},set(e,t){let{media:n}=t;if(n&&!(e&&n.remote?.state!==`disconnected`)&&!(!e&&n.remote?.state!==`connected`)){if(typeof n.remote.prompt!=`function`){console.warn(`MediaChrome: Casting is not supported in this environment`);return}n.remote.prompt().catch(()=>{})}},remoteEvents:[`connect`,`connecting`,`disconnect`]},mediaIsAirplaying:{get(){return!1},set(e,t){let{media:n}=t;if(n){if(!(n.webkitShowPlaybackTargetPicker&&O.WebKitPlaybackTargetAvailabilityEvent)){console.error(`MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment`);return}n.webkitShowPlaybackTargetPicker()}},mediaEvents:[`webkitcurrentplaybacktargetiswirelesschanged`]},mediaFullscreenUnavailable:{get(e){let{media:t}=e;if(!zn||!Rn(t))return w.UNSUPPORTED}},mediaPipUnavailable:{get(e){let{media:t}=e;if(!Bn||!Ln(t))return w.UNSUPPORTED;if(t?.disablePictureInPicture)return w.UNAVAILABLE}},mediaVolumeUnavailable:{get(e){let{media:t}=e;if(Yn===!1||t?.volume==null)return w.UNSUPPORTED},stateOwnersUpdateHandlers:[e=>{Yn??Xn.then(t=>e(t?void 0:w.UNSUPPORTED))}]},mediaCastUnavailable:{get(e,{availability:t=`not-available`}={}){let{media:n}=e;if(!Hn||!n?.remote?.state)return w.UNSUPPORTED;if(!(t==null||t===`available`))return w.UNAVAILABLE},stateOwnersUpdateHandlers:[(e,t)=>{var n;let{media:r}=t;if(r)return r.disableRemotePlayback||r.hasAttribute(`disableremoteplayback`)||(n=r?.remote)==null||n.watchAvailability(t=>{e({availability:t?`available`:`not-available`})}).catch(t=>{t.name===`NotSupportedError`?e({availability:null}):e({availability:`not-available`})}),()=>{var e;(e=r?.remote)==null||e.cancelWatchAvailability().catch(()=>{})}}]},mediaAirplayUnavailable:{get(e,t){if(!Vn)return w.UNSUPPORTED;if(t?.availability===`not-available`)return w.UNAVAILABLE},mediaEvents:[`webkitplaybacktargetavailabilitychanged`],stateOwnersUpdateHandlers:[(e,t)=>{var n;let{media:r}=t;if(r)return r.disableRemotePlayback||r.hasAttribute(`disableremoteplayback`)||(n=r?.remote)==null||n.watchAvailability(t=>{e({availability:t?`available`:`not-available`})}).catch(t=>{t.name===`NotSupportedError`?e({availability:null}):e({availability:`not-available`})}),()=>{var e;(e=r?.remote)==null||e.cancelWatchAvailability().catch(()=>{})}}]},mediaRenditionUnavailable:{get(e){let{media:t}=e;if(!t?.videoRenditions)return w.UNSUPPORTED;if(!t.videoRenditions?.length)return w.UNAVAILABLE},mediaEvents:[`emptied`,`loadstart`],videoRenditionsEvents:[`addrendition`,`removerendition`]},mediaAudioTrackUnavailable:{get(e){let{media:t}=e;if(!t?.audioTracks)return w.UNSUPPORTED;if((t.audioTracks?.length??0)<=1)return w.UNAVAILABLE},mediaEvents:[`emptied`,`loadstart`],audioTracksEvents:[`addtrack`,`removetrack`]},mediaLang:{get(e){let{options:{mediaLang:t}={}}=e;return t??`en`}}},tr={[y.MEDIA_PREVIEW_REQUEST](e,t,{detail:n}){let{media:r}=t,i=n??void 0,a,o;if(r&&i!=null){let[e]=xn(r,{kind:Ee.METADATA,label:`thumbnails`}),t=Array.prototype.find.call(e?.cues??[],(e,t,n)=>t===0?e.endTime>i:t===n.length-1?e.startTime<=i:e.startTime<=i&&e.endTime>i);if(t){let e=/'^(?:[a-z]+:)?\/\//i.test(t.text)?void 0:r?.querySelector(`track[label="thumbnails"]`)?.src,n=new URL(t.text,e);o=new URLSearchParams(n.hash).get(`#xywh`).split(`,`).map(e=>+e),a=n.href}}let s=e.mediaDuration.get(t),c=e.mediaChaptersCues.get(t).find((e,t,n)=>t===n.length-1&&s===e.endTime?e.startTime<=i&&e.endTime>=i:e.startTime<=i&&e.endTime>i)?.text;return n!=null&&c==null&&(c=``),{mediaPreviewTime:i,mediaPreviewImage:a,mediaPreviewCoords:o,mediaPreviewChapter:c}},[y.MEDIA_PAUSE_REQUEST](e,t){e.mediaPaused.set(!0,t)},[y.MEDIA_PLAY_REQUEST](e,t){let n=e.mediaStreamType.get(t)===De.LIVE,r=!t.options?.noAutoSeekToLive,i=e.mediaTargetLiveWindow.get(t)>0;if(n&&r&&!i){let n=e.mediaSeekable.get(t)?.[1];if(n){let r=n-(t.options?.seekToLiveOffset??0);e.mediaCurrentTime.set(r,t)}}e.mediaPaused.set(!1,t)},[y.MEDIA_PLAYBACK_RATE_REQUEST](e,t,{detail:n}){let r=n;e.mediaPlaybackRate.set(r,t)},[y.MEDIA_MUTE_REQUEST](e,t){e.mediaMuted.set(!0,t)},[y.MEDIA_UNMUTE_REQUEST](e,t){e.mediaVolume.get(t)||e.mediaVolume.set(.25,t),e.mediaMuted.set(!1,t)},[y.MEDIA_LOOP_REQUEST](e,t,{detail:n}){let r=!!n;return e.mediaLoop.set(r,t),{mediaLoop:r}},[y.MEDIA_VOLUME_REQUEST](e,t,{detail:n}){let r=n;r&&e.mediaMuted.get(t)&&e.mediaMuted.set(!1,t),e.mediaVolume.set(r,t)},[y.MEDIA_SEEK_REQUEST](e,t,{detail:n}){let r=n;e.mediaCurrentTime.set(r,t)},[y.MEDIA_SEEK_TO_LIVE_REQUEST](e,t){let n=e.mediaSeekable.get(t)?.[1];if(Number.isNaN(Number(n)))return;let r=n-(t.options?.seekToLiveOffset??0);e.mediaCurrentTime.set(r,t)},[y.MEDIA_SHOW_SUBTITLES_REQUEST](e,t,{detail:n}){let{options:r}=t,i=Un(t),a=hn(n),o=a[0]?.language;o&&!r.noSubtitlesLangPref&&O.localStorage.setItem(`media-chrome-pref-subtitles-lang`,o),bn(S.SHOWING,i,a)},[y.MEDIA_DISABLE_SUBTITLES_REQUEST](e,t,{detail:n}){let r=Un(t),i=n??[];bn(S.DISABLED,r,i)},[y.MEDIA_TOGGLE_SUBTITLES_REQUEST](e,t,{detail:n}){Gn(t,n)},[y.MEDIA_RENDITION_REQUEST](e,t,{detail:n}){let r=n;e.mediaRenditionSelected.set(r,t)},[y.MEDIA_AUDIO_TRACK_REQUEST](e,t,{detail:n}){let r=n;e.mediaAudioTrackEnabled.set(r,t)},[y.MEDIA_ENTER_PIP_REQUEST](e,t){e.mediaIsFullscreen.get(t)&&e.mediaIsFullscreen.set(!1,t),e.mediaIsPip.set(!0,t)},[y.MEDIA_EXIT_PIP_REQUEST](e,t){e.mediaIsPip.set(!1,t)},[y.MEDIA_ENTER_FULLSCREEN_REQUEST](e,t,n){e.mediaIsPip.get(t)&&e.mediaIsPip.set(!1,t),e.mediaIsFullscreen.set(!0,t,n)},[y.MEDIA_EXIT_FULLSCREEN_REQUEST](e,t){e.mediaIsFullscreen.set(!1,t)},[y.MEDIA_ENTER_CAST_REQUEST](e,t){e.mediaIsFullscreen.get(t)&&e.mediaIsFullscreen.set(!1,t),e.mediaIsCasting.set(!0,t)},[y.MEDIA_EXIT_CAST_REQUEST](e,t){e.mediaIsCasting.set(!1,t)},[y.MEDIA_AIRPLAY_REQUEST](e,t){e.mediaIsAirplaying.set(!0,t)}},nr=({media:e,fullscreenElement:t,documentElement:n,stateMediator:r=er,requestMap:i=tr,options:a={},monitorStateOwnersOnlyWithSubscriptions:o=!0})=>{let s=[],c={options:{...a}},l=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0}),u=e=>{e!=null&&(Kn(e,l)||(l=Object.freeze({...l,...e}),s.forEach(e=>e(l))))},d=()=>{let e=Object.entries(r).reduce((e,[t,{get:n}])=>(e[t]=n(c),e),{});u(e)},f={},p,m=async(e,t)=>{let n=!!p;if(p={...c,...p??{},...e},n)return;await Zn(...Object.values(e));let i=s.length>0&&t===0&&o,a=c.media!==p.media,l=c.media?.textTracks!==p.media?.textTracks,m=c.media?.videoRenditions!==p.media?.videoRenditions,h=c.media?.audioTracks!==p.media?.audioTracks,ee=c.media?.remote!==p.media?.remote,g=c.documentElement!==p.documentElement,te=!!c.media&&(a||i),ne=!!c.media?.textTracks&&(l||i),re=!!c.media?.videoRenditions&&(m||i),ie=!!c.media?.audioTracks&&(h||i),ae=!!c.media?.remote&&(ee||i),oe=!!c.documentElement&&(g||i),se=te||ne||re||ie||ae||oe,ce=s.length===0&&t===1&&o,le=!!p.media&&(a||ce),ue=!!p.media?.textTracks&&(l||ce),de=!!p.media?.videoRenditions&&(m||ce),fe=!!p.media?.audioTracks&&(h||ce),pe=!!p.media?.remote&&(ee||ce),me=!!p.documentElement&&(g||ce),he=le||ue||de||fe||pe||me;if(!(se||he)){Object.entries(p).forEach(([e,t])=>{c[e]=t}),d(),p=void 0;return}Object.entries(r).forEach(([e,{get:t,mediaEvents:n=[],textTracksEvents:r=[],videoRenditionsEvents:i=[],audioTracksEvents:a=[],remoteEvents:o=[],rootEvents:s=[],stateOwnersUpdateHandlers:l=[]}])=>{f[e]||(f[e]={});let d=n=>{let r=t(c,n);u({[e]:r})},m;m=f[e].mediaEvents,n.forEach(t=>{m&&te&&(c.media.removeEventListener(t,m),f[e].mediaEvents=void 0),le&&(p.media.addEventListener(t,d),f[e].mediaEvents=d)}),m=f[e].textTracksEvents,r.forEach(t=>{var n,r;m&&ne&&((n=c.media.textTracks)==null||n.removeEventListener(t,m),f[e].textTracksEvents=void 0),ue&&((r=p.media.textTracks)==null||r.addEventListener(t,d),f[e].textTracksEvents=d)}),m=f[e].videoRenditionsEvents,i.forEach(t=>{var n,r;m&&re&&((n=c.media.videoRenditions)==null||n.removeEventListener(t,m),f[e].videoRenditionsEvents=void 0),de&&((r=p.media.videoRenditions)==null||r.addEventListener(t,d),f[e].videoRenditionsEvents=d)}),m=f[e].audioTracksEvents,a.forEach(t=>{var n,r;m&&ie&&((n=c.media.audioTracks)==null||n.removeEventListener(t,m),f[e].audioTracksEvents=void 0),fe&&((r=p.media.audioTracks)==null||r.addEventListener(t,d),f[e].audioTracksEvents=d)}),m=f[e].remoteEvents,o.forEach(t=>{var n,r;m&&ae&&((n=c.media.remote)==null||n.removeEventListener(t,m),f[e].remoteEvents=void 0),pe&&((r=p.media.remote)==null||r.addEventListener(t,d),f[e].remoteEvents=d)}),m=f[e].rootEvents,s.forEach(t=>{m&&oe&&(c.documentElement.removeEventListener(t,m),f[e].rootEvents=void 0),me&&(p.documentElement.addEventListener(t,d),f[e].rootEvents=d)});let h=f[e].stateOwnersUpdateHandlers;if(h&&se&&(Array.isArray(h)?h:[h]).forEach(e=>{typeof e==`function`&&e()}),he){let t=l.map(e=>e(d,p)).filter(e=>typeof e==`function`);f[e].stateOwnersUpdateHandlers=t.length===1?t[0]:t}else se&&(f[e].stateOwnersUpdateHandlers=void 0)}),Object.entries(p).forEach(([e,t])=>{c[e]=t}),d(),p=void 0};return m({media:e,fullscreenElement:t,documentElement:n,options:a}),{dispatch(e){let{type:t,detail:n}=e;if(i[t]&&l.mediaErrorCode==null){u(i[t](r,c,e));return}t===`mediaelementchangerequest`?m({media:n}):t===`fullscreenelementchangerequest`?m({fullscreenElement:n}):t===`documentelementchangerequest`?m({documentElement:n}):t===`optionschangerequest`&&(Object.entries(n??{}).forEach(([e,t])=>{c.options[e]=t}),d())},getState(){return l},subscribe(e){return m({},s.length+1),s.push(e),e(l),()=>{let t=s.indexOf(e);t>=0&&(m({},s.length-1),s.splice(t,1))}}}},rr=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},H=(e,t,n)=>(rr(e,t,`read from private field`),n?n.call(e):t.get(e)),ir=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},ar=(e,t,n,r)=>(rr(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),or=(e,t,n)=>(rr(e,t,`access private method`),n),sr,cr,U,lr,ur,dr,fr,pr,mr,hr,gr,_r,vr,yr,br,xr=[`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`Enter`,` `,`f`,`m`,`k`,`c`,`l`,`j`,`>`,`<`,`p`],Sr=10,Cr=.025,wr=.25,Tr=.25,Er=2,W={DEFAULT_SUBTITLES:`defaultsubtitles`,DEFAULT_STREAM_TYPE:`defaultstreamtype`,DEFAULT_DURATION:`defaultduration`,FULLSCREEN_ELEMENT:`fullscreenelement`,HOTKEYS:`hotkeys`,KEYBOARD_BACKWARD_SEEK_OFFSET:`keyboardbackwardseekoffset`,KEYBOARD_FORWARD_SEEK_OFFSET:`keyboardforwardseekoffset`,KEYBOARD_DOWN_VOLUME_STEP:`keyboarddownvolumestep`,KEYBOARD_UP_VOLUME_STEP:`keyboardupvolumestep`,KEYS_USED:`keysused`,LANG:`lang`,LOOP:`loop`,LIVE_EDGE_OFFSET:`liveedgeoffset`,NO_AUTO_SEEK_TO_LIVE:`noautoseektolive`,NO_DEFAULT_STORE:`nodefaultstore`,NO_HOTKEYS:`nohotkeys`,NO_MUTED_PREF:`nomutedpref`,NO_SUBTITLES_LANG_PREF:`nosubtitleslangpref`,NO_VOLUME_PREF:`novolumepref`,SEEK_TO_LIVE_OFFSET:`seektoliveoffset`},Dr=class extends $t{constructor(){super(),ir(this,mr),ir(this,_r),ir(this,yr),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,ir(this,sr,new dn(this,W.HOTKEYS)),ir(this,cr,void 0),ir(this,U,void 0),ir(this,lr,null),ir(this,ur,void 0),ir(this,dr,void 0),ir(this,fr,e=>{var t;(t=H(this,U))==null||t.dispatch(e)}),ir(this,pr,void 0),ir(this,gr,e=>{let{key:t,shiftKey:n}=e;if(!(n&&(t===`/`||t===`?`)||xr.includes(t))){this.removeEventListener(`keyup`,H(this,gr));return}this.keyboardShortcutHandler(e)}),this.associateElement(this);let e={};ar(this,ur,t=>{Object.entries(t).forEach(([t,n])=>{if(t in e&&e[t]===n)return;this.propagateMediaState(t,n);let r=t.toLowerCase(),i=new O.CustomEvent(Te[r],{composed:!0,detail:n});this.dispatchEvent(i)}),e=t})}static get observedAttributes(){return super.observedAttributes.concat(W.NO_HOTKEYS,W.HOTKEYS,W.DEFAULT_STREAM_TYPE,W.DEFAULT_SUBTITLES,W.DEFAULT_DURATION,W.NO_MUTED_PREF,W.NO_VOLUME_PREF,W.LANG,W.LOOP,W.LIVE_EDGE_OFFSET,W.SEEK_TO_LIVE_OFFSET,W.NO_AUTO_SEEK_TO_LIVE)}get mediaStore(){return H(this,U)}set mediaStore(e){var t;if(H(this,U)&&((t=H(this,dr))==null||t.call(this),ar(this,dr,void 0)),ar(this,U,e),!H(this,U)&&!this.hasAttribute(W.NO_DEFAULT_STORE)){or(this,mr,hr).call(this);return}ar(this,dr,H(this,U)?.subscribe(H(this,ur)))}get fullscreenElement(){return H(this,cr)??this}set fullscreenElement(e){var t;this.hasAttribute(W.FULLSCREEN_ELEMENT)&&this.removeAttribute(W.FULLSCREEN_ELEMENT),ar(this,cr,e),(t=H(this,U))==null||t.dispatch({type:`fullscreenelementchangerequest`,detail:this.fullscreenElement})}get defaultSubtitles(){return N(this,W.DEFAULT_SUBTITLES)}set defaultSubtitles(e){P(this,W.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return F(this,W.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){I(this,W.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return j(this,W.DEFAULT_DURATION)}set defaultDuration(e){M(this,W.DEFAULT_DURATION,e)}get noHotkeys(){return N(this,W.NO_HOTKEYS)}set noHotkeys(e){P(this,W.NO_HOTKEYS,e)}get keysUsed(){return F(this,W.KEYS_USED)}set keysUsed(e){I(this,W.KEYS_USED,e)}get liveEdgeOffset(){return j(this,W.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){M(this,W.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return N(this,W.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){P(this,W.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return N(this,W.NO_VOLUME_PREF)}set noVolumePref(e){P(this,W.NO_VOLUME_PREF,e)}get noMutedPref(){return N(this,W.NO_MUTED_PREF)}set noMutedPref(e){P(this,W.NO_MUTED_PREF,e)}get noSubtitlesLangPref(){return N(this,W.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){P(this,W.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return N(this,W.NO_DEFAULT_STORE)}set noDefaultStore(e){P(this,W.NO_DEFAULT_STORE,e)}get resolvedLang(){return Le()}attributeChangedCallback(e,t,n){var r,i,a,o,s,c,l,u,d,f;if(super.attributeChangedCallback(e,t,n),e===W.NO_HOTKEYS)n!==t&&n===``?(this.hasAttribute(W.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):n!==t&&n===null&&this.enableHotkeys();else if(e===W.HOTKEYS)H(this,sr).value=n;else if(e===W.DEFAULT_SUBTITLES&&n!==t)(r=H(this,U))==null||r.dispatch({type:`optionschangerequest`,detail:{defaultSubtitles:this.hasAttribute(W.DEFAULT_SUBTITLES)}});else if(e===W.DEFAULT_STREAM_TYPE)(i=H(this,U))==null||i.dispatch({type:`optionschangerequest`,detail:{defaultStreamType:this.getAttribute(W.DEFAULT_STREAM_TYPE)??void 0}});else if(e===W.LIVE_EDGE_OFFSET&&n!==t)(a=H(this,U))==null||a.dispatch({type:`optionschangerequest`,detail:{liveEdgeOffset:this.hasAttribute(W.LIVE_EDGE_OFFSET)?+this.getAttribute(W.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(W.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(W.SEEK_TO_LIVE_OFFSET):this.hasAttribute(W.LIVE_EDGE_OFFSET)?+this.getAttribute(W.LIVE_EDGE_OFFSET):void 0}});else if(e===W.SEEK_TO_LIVE_OFFSET&&n!==t)(o=H(this,U))==null||o.dispatch({type:`optionschangerequest`,detail:{seekToLiveOffset:this.hasAttribute(W.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(W.SEEK_TO_LIVE_OFFSET):this.hasAttribute(W.LIVE_EDGE_OFFSET)?+this.getAttribute(W.LIVE_EDGE_OFFSET):void 0}});else if(e===W.NO_AUTO_SEEK_TO_LIVE)(s=H(this,U))==null||s.dispatch({type:`optionschangerequest`,detail:{noAutoSeekToLive:this.hasAttribute(W.NO_AUTO_SEEK_TO_LIVE)}});else if(e===W.FULLSCREEN_ELEMENT){let e=n?this.getRootNode()?.getElementById(n):void 0;ar(this,cr,e),(c=H(this,U))==null||c.dispatch({type:`fullscreenelementchangerequest`,detail:this.fullscreenElement})}else e===W.LANG&&n!==t?(Fe(n),(l=H(this,U))==null||l.dispatch({type:`optionschangerequest`,detail:{mediaLang:n}})):e===W.LOOP&&n!==t?(u=H(this,U))==null||u.dispatch({type:y.MEDIA_LOOP_REQUEST,detail:n!=null}):e===W.NO_VOLUME_PREF&&n!==t?(d=H(this,U))==null||d.dispatch({type:`optionschangerequest`,detail:{noVolumePref:this.hasAttribute(W.NO_VOLUME_PREF)}}):e===W.NO_MUTED_PREF&&n!==t&&((f=H(this,U))==null||f.dispatch({type:`optionschangerequest`,detail:{noMutedPref:this.hasAttribute(W.NO_MUTED_PREF)}}))}connectedCallback(){var e,t;this.associateElement(this),!H(this,U)&&!this.hasAttribute(W.NO_DEFAULT_STORE)&&or(this,mr,hr).call(this),(e=H(this,U))==null||e.dispatch({type:`documentelementchangerequest`,detail:k}),(t=H(this,U))==null||t.dispatch({type:`fullscreenelementchangerequest`,detail:this.fullscreenElement}),super.connectedCallback(),H(this,U)&&!H(this,dr)&&ar(this,dr,H(this,U)?.subscribe(H(this,ur))),H(this,pr)!==void 0&&H(this,U)&&this.media&&setTimeout(()=>{var e;this.media?.textTracks?.length&&((e=H(this,U))==null||e.dispatch({type:y.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:H(this,pr)}))},0),this.hasAttribute(W.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}disconnectedCallback(){var e,t,n,r,i;if((e=super.disconnectedCallback)==null||e.call(this),this.disableHotkeys(),H(this,U)){let e=H(this,U).getState();ar(this,pr,!!e.mediaSubtitlesShowing?.length),(t=H(this,U))==null||t.dispatch({type:`fullscreenelementchangerequest`,detail:void 0}),(n=H(this,U))==null||n.dispatch({type:`documentelementchangerequest`,detail:void 0}),(r=H(this,U))==null||r.dispatch({type:y.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})}H(this,dr)&&((i=H(this,dr))==null||i.call(this),ar(this,dr,void 0)),this.unassociateElement(this),H(this,lr)&&(H(this,lr).remove(),ar(this,lr,null))}mediaSetCallback(e){var t;super.mediaSetCallback(e),(t=H(this,U))==null||t.dispatch({type:`mediaelementchangerequest`,detail:e}),e.hasAttribute(`tabindex`)||(e.tabIndex=-1)}mediaUnsetCallback(e){var t;super.mediaUnsetCallback(e),(t=H(this,U))==null||t.dispatch({type:`mediaelementchangerequest`,detail:void 0})}propagateMediaState(e,t){Rr(this.mediaStateReceivers,e,t)}associateElement(e){if(!e)return;let{associatedElementSubscriptions:t}=this;if(t.has(e))return;let n=zr(e,this.registerMediaStateReceiver.bind(this),this.unregisterMediaStateReceiver.bind(this));Object.values(y).forEach(t=>{e.addEventListener(t,H(this,fr))}),t.set(e,n)}unassociateElement(e){if(!e)return;let{associatedElementSubscriptions:t}=this;t.has(e)&&(t.get(e)(),t.delete(e),Object.values(y).forEach(t=>{e.removeEventListener(t,H(this,fr))}))}registerMediaStateReceiver(e){if(!e)return;let t=this.mediaStateReceivers;t.indexOf(e)>-1||(t.push(e),H(this,U)&&Object.entries(H(this,U).getState()).forEach(([t,n])=>{Rr([e],t,n)}))}unregisterMediaStateReceiver(e){let t=this.mediaStateReceivers,n=t.indexOf(e);n<0||t.splice(n,1)}enableHotkeys(){this.addEventListener(`keydown`,or(this,_r,vr))}disableHotkeys(){this.removeEventListener(`keydown`,or(this,_r,vr)),this.removeEventListener(`keyup`,H(this,gr))}get hotkeys(){return H(this,sr)}set hotkeys(e){I(this,W.HOTKEYS,e)}keyboardShortcutHandler(e){let t=e.target;if((t.getAttribute(W.KEYS_USED)?.split(` `)??t?.keysUsed??[]).map(e=>e===`Space`?` `:e).filter(Boolean).includes(e.key))return;let n,r,i;if(!H(this,sr).contains(`no${e.key.toLowerCase()}`)&&!(e.key===` `&&H(this,sr).contains(`nospace`))&&!(e.shiftKey&&(e.key===`/`||e.key===`?`)&&H(this,sr).contains(`noshift+/`)))switch(e.key){case` `:case`k`:n=H(this,U).getState().mediaPaused?y.MEDIA_PLAY_REQUEST:y.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new O.CustomEvent(n,{composed:!0,bubbles:!0}));break;case`m`:n=this.mediaStore.getState().mediaVolumeLevel===`off`?y.MEDIA_UNMUTE_REQUEST:y.MEDIA_MUTE_REQUEST,this.dispatchEvent(new O.CustomEvent(n,{composed:!0,bubbles:!0}));break;case`f`:n=this.mediaStore.getState().mediaIsFullscreen?y.MEDIA_EXIT_FULLSCREEN_REQUEST:y.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new O.CustomEvent(n,{composed:!0,bubbles:!0}));break;case`c`:this.dispatchEvent(new O.CustomEvent(y.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case`ArrowLeft`:case`j`:{let e=this.hasAttribute(W.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(W.KEYBOARD_BACKWARD_SEEK_OFFSET):Sr;r=Math.max((this.mediaStore.getState().mediaCurrentTime??0)-e,0),i=new O.CustomEvent(y.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`ArrowRight`:case`l`:{let e=this.hasAttribute(W.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(W.KEYBOARD_FORWARD_SEEK_OFFSET):Sr;r=Math.max((this.mediaStore.getState().mediaCurrentTime??0)+e,0),i=new O.CustomEvent(y.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`ArrowUp`:{let e=this.hasAttribute(W.KEYBOARD_UP_VOLUME_STEP)?+this.getAttribute(W.KEYBOARD_UP_VOLUME_STEP):Cr;r=Math.min((this.mediaStore.getState().mediaVolume??1)+e,1),i=new O.CustomEvent(y.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`ArrowDown`:{let e=this.hasAttribute(W.KEYBOARD_DOWN_VOLUME_STEP)?+this.getAttribute(W.KEYBOARD_DOWN_VOLUME_STEP):Cr;r=Math.max((this.mediaStore.getState().mediaVolume??1)-e,0),i=new O.CustomEvent(y.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`<`:{let e=this.mediaStore.getState().mediaPlaybackRate??1;r=Math.max(e-wr,Tr).toFixed(2),i=new O.CustomEvent(y.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`>`:{let e=this.mediaStore.getState().mediaPlaybackRate??1;r=Math.min(e+wr,Er).toFixed(2),i=new O.CustomEvent(y.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`/`:case`?`:e.shiftKey&&or(this,yr,br).call(this);break;case`p`:n=this.mediaStore.getState().mediaIsPip?y.MEDIA_EXIT_PIP_REQUEST:y.MEDIA_ENTER_PIP_REQUEST,i=new O.CustomEvent(n,{composed:!0,bubbles:!0}),this.dispatchEvent(i);break;default:break}}};sr=new WeakMap,cr=new WeakMap,U=new WeakMap,lr=new WeakMap,ur=new WeakMap,dr=new WeakMap,fr=new WeakMap,pr=new WeakMap,mr=new WeakSet,hr=function(){this.mediaStore=nr({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(W.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(W.DEFAULT_DURATION)?+this.getAttribute(W.DEFAULT_DURATION):void 0,defaultStreamType:this.getAttribute(W.DEFAULT_STREAM_TYPE)??void 0,liveEdgeOffset:this.hasAttribute(W.LIVE_EDGE_OFFSET)?+this.getAttribute(W.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(W.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(W.SEEK_TO_LIVE_OFFSET):this.hasAttribute(W.LIVE_EDGE_OFFSET)?+this.getAttribute(W.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(W.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(W.NO_VOLUME_PREF),noMutedPref:this.hasAttribute(W.NO_MUTED_PREF),noSubtitlesLangPref:this.hasAttribute(W.NO_SUBTITLES_LANG_PREF)}})},gr=new WeakMap,_r=new WeakSet,vr=function(e){let{metaKey:t,altKey:n,key:r,shiftKey:i}=e,a=i&&(r===`/`||r===`?`);if(a&&H(this,lr)?.open){this.removeEventListener(`keyup`,H(this,gr));return}if(t||n||!a&&!xr.includes(r)){this.removeEventListener(`keyup`,H(this,gr));return}let o=e.target,s=o instanceof HTMLElement&&(o.tagName.toLowerCase()===`media-volume-range`||o.tagName.toLowerCase()===`media-time-range`);[` `,`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`].includes(r)&&!(H(this,sr).contains(`no${r.toLowerCase()}`)||r===` `&&H(this,sr).contains(`nospace`))&&!s&&e.preventDefault(),this.addEventListener(`keyup`,H(this,gr),{once:!0})},yr=new WeakSet,br=function(){H(this,lr)||(ar(this,lr,k.createElement(`media-keyboard-shortcuts-dialog`)),this.appendChild(H(this,lr))),H(this,lr).open=!0};var Or=Object.values(x),kr=Object.values(Se),Ar=e=>{var t;let{observedAttributes:n}=e.constructor;!n&&e.nodeName?.includes(`-`)&&(O.customElements.upgrade(e),{observedAttributes:n}=e.constructor);let r=((t=(e?.getAttribute)?.call(e,b.MEDIA_CHROME_ATTRIBUTES))?.split)?.call(t,/\s+/);return Array.isArray(n||r)?(n||r).filter(e=>Or.includes(e)):[]},jr=e=>(e.nodeName?.includes(`-`)&&O.customElements.get(e.nodeName?.toLowerCase())&&!(e instanceof O.customElements.get(e.nodeName.toLowerCase()))&&O.customElements.upgrade(e),kr.some(t=>t in e)),Mr=e=>jr(e)||!!Ar(e).length,Nr=e=>(e?.join)?.call(e,`:`),Pr={[x.MEDIA_SUBTITLES_LIST]:_n,[x.MEDIA_SUBTITLES_SHOWING]:_n,[x.MEDIA_SEEKABLE]:Nr,[x.MEDIA_BUFFERED]:e=>e?.map(Nr).join(` `),[x.MEDIA_PREVIEW_COORDS]:e=>e?.join(` `),[x.MEDIA_RENDITION_LIST]:ke,[x.MEDIA_AUDIO_TRACK_LIST]:Ae},Fr=async(e,t,n)=>{if(e.isConnected||await Me(0),typeof n==`boolean`||n==null)return P(e,t,n);if(typeof n==`number`)return M(e,t,n);if(typeof n==`string`)return I(e,t,n);if(Array.isArray(n)&&!n.length)return e.removeAttribute(t);let r=Pr[t]?.call(Pr,n)??n;return e.setAttribute(t,r)},Ir=e=>!!e.closest?.call(e,`*[slot="media"]`),Lr=(e,t)=>{if(Ir(e))return;let n=(e,t)=>{Mr(e)&&t(e);let{children:n=[]}=e??{},r=e?.shadowRoot?.children??[];[...n,...r].forEach(e=>Lr(e,t))},r=e?.nodeName.toLowerCase();if(r.includes(`-`)&&!Mr(e)){O.customElements.whenDefined(r).then(()=>{n(e,t)});return}n(e,t)},Rr=(e,t,n)=>{e.forEach(e=>{if(t in e){e[t]=n;return}let r=Ar(e),i=t.toLowerCase();r.includes(i)&&Fr(e,i,n)})},zr=(e,t,n)=>{Lr(e,t);let r=e=>{t(e?.composedPath()[0]??e.target)},i=e=>{n(e?.composedPath()[0]??e.target)};e.addEventListener(y.REGISTER_MEDIA_STATE_RECEIVER,r),e.addEventListener(y.UNREGISTER_MEDIA_STATE_RECEIVER,i);let a=e=>{e.forEach(e=>{let{addedNodes:r=[],removedNodes:i=[],type:a,target:o,attributeName:s}=e;a===`childList`?(Array.prototype.forEach.call(r,e=>Lr(e,t)),Array.prototype.forEach.call(i,e=>Lr(e,n))):a===`attributes`&&s===b.MEDIA_CHROME_ATTRIBUTES&&(Mr(o)?t(o):n(o))})},o=[],s=e=>{let r=e.target;r.name!==`media`&&(o.forEach(e=>Lr(e,n)),o=[...r.assignedElements({flatten:!0})],o.forEach(e=>Lr(e,t)))};e.addEventListener(`slotchange`,s);let c=new MutationObserver(a);return c.observe(e,{childList:!0,attributes:!0,subtree:!0}),()=>{Lr(e,n),e.removeEventListener(`slotchange`,s),c.disconnect(),e.removeEventListener(y.REGISTER_MEDIA_STATE_RECEIVER,r),e.removeEventListener(y.UNREGISTER_MEDIA_STATE_RECEIVER,i)}};O.customElements.get(`media-controller`)||O.customElements.define(`media-controller`,Dr);var Br=Dr,Vr={PLACEMENT:`placement`,BOUNDS:`bounds`};function Hr(e){return`
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
  `}var Ur=class extends O.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{if(!dt(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;let e=this.placement;if(e===`left`||e===`right`){this.style.removeProperty(`--media-tooltip-offset-x`);return}let t=getComputedStyle(this),n=ct(this,`#`+this.bounds)??nt(this);if(!n)return;let{x:r,width:i}=n.getBoundingClientRect(),{x:a,width:o}=this.getBoundingClientRect(),s=a+o,c=r+i,l=t.getPropertyValue(`--media-tooltip-offset-x`),u=l?parseFloat(l.replace(`px`,``)):0,d=t.getPropertyValue(`--media-tooltip-container-margin`),f=d?parseFloat(d.replace(`px`,``)):0,p=a-r+u-f,m=s-c+u+f;if(p<0){this.style.setProperty(`--media-tooltip-offset-x`,`${p}px`);return}if(m>0){this.style.setProperty(`--media-tooltip-offset-x`,`${m}px`);return}this.style.removeProperty(`--media-tooltip-offset-x`)},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector(`#arrow`),Object.prototype.hasOwnProperty.call(this,`placement`)){let e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[Vr.PLACEMENT,Vr.BOUNDS]}get placement(){return F(this,Vr.PLACEMENT)}set placement(e){I(this,Vr.PLACEMENT,e)}get bounds(){return F(this,Vr.BOUNDS)}set bounds(e){I(this,Vr.BOUNDS,e)}};Ur.shadowRootOptions={mode:`open`},Ur.getTemplateHTML=Hr,O.customElements.get(`media-tooltip`)||O.customElements.define(`media-tooltip`,Ur);var Wr=Ur,Gr=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},G=(e,t,n)=>(Gr(e,t,`read from private field`),n?n.call(e):t.get(e)),Kr=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},qr=(e,t,n,r)=>(Gr(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Jr=(e,t,n)=>(Gr(e,t,`access private method`),n),Yr,Xr,Zr,Qr,$r,ei,ti,ni={TOOLTIP_PLACEMENT:`tooltipplacement`,DISABLED:`disabled`,NO_TOOLTIP:`notooltip`};function ri(e,t={}){return`
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
        <template shadowrootmode="${Wr.shadowRootOptions.mode}">
          ${Wr.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(e)}
        </slot>
      </media-tooltip>
    </slot>
  `}function ii(e,t){return`
    <slot></slot>
  `}function ai(){return``}var K=class extends O.HTMLElement{constructor(){if(super(),Kr(this,ei),Kr(this,Yr,void 0),this.preventClick=!1,this.tooltipEl=null,Kr(this,Xr,e=>{this.preventClick||this.handleClick(e),setTimeout(G(this,Zr),0)}),Kr(this,Zr,()=>{var e,t;(t=(e=this.tooltipEl)?.updateXOffset)==null||t.call(e)}),Kr(this,Qr,e=>{let{key:t}=e;if(!this.keysUsed.includes(t)){this.removeEventListener(`keyup`,G(this,Qr));return}this.preventClick||this.handleClick(e)}),Kr(this,$r,e=>{let{metaKey:t,altKey:n,key:r}=e;if(t||n||!this.keysUsed.includes(r)){this.removeEventListener(`keyup`,G(this,Qr));return}this.addEventListener(`keyup`,G(this,Qr),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=tt(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}this.tooltipEl=this.shadowRoot.querySelector(`media-tooltip`)}static get observedAttributes(){return[`disabled`,ni.TOOLTIP_PLACEMENT,b.MEDIA_CONTROLLER,x.MEDIA_LANG]}enable(){this.addEventListener(`click`,G(this,Xr)),this.addEventListener(`keydown`,G(this,$r)),this.tabIndex=0}disable(){this.removeEventListener(`click`,G(this,Xr)),this.removeEventListener(`keydown`,G(this,$r)),this.removeEventListener(`keyup`,G(this,Qr)),this.tabIndex=-1}attributeChangedCallback(e,t,n){var r,i,a,o;e===b.MEDIA_CONTROLLER?(t&&((i=(r=G(this,Yr))?.unassociateElement)==null||i.call(r,this),qr(this,Yr,null)),n&&this.isConnected&&(qr(this,Yr,this.getRootNode()?.getElementById(n)),(o=(a=G(this,Yr))?.associateElement)==null||o.call(a,this))):e===`disabled`&&n!==t?n==null?this.enable():this.disable():e===ni.TOOLTIP_PLACEMENT&&this.tooltipEl&&n!==t?this.tooltipEl.placement=n:e===x.MEDIA_LANG&&(this.shadowRoot.querySelector(`slot[name="tooltip-content"]`).innerHTML=this.constructor.getTooltipContentHTML()),G(this,Zr).call(this)}connectedCallback(){var e,t;let{style:n}=A(this.shadowRoot,`:host`);n.setProperty(`display`,`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute(`disabled`)?this.disable():this.enable(),this.setAttribute(`role`,`button`);let r=this.getAttribute(b.MEDIA_CONTROLLER);r&&(qr(this,Yr,this.getRootNode()?.getElementById(r)),(t=(e=G(this,Yr))?.associateElement)==null||t.call(e,this)),O.customElements.whenDefined(`media-tooltip`).then(()=>Jr(this,ei,ti).call(this))}disconnectedCallback(){var e,t;this.disable(),(t=(e=G(this,Yr))?.unassociateElement)==null||t.call(e,this),qr(this,Yr,null),this.removeEventListener(`mouseenter`,G(this,Zr)),this.removeEventListener(`focus`,G(this,Zr)),this.removeEventListener(`click`,G(this,Xr))}get keysUsed(){return[`Enter`,` `]}get tooltipPlacement(){return F(this,ni.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){I(this,ni.TOOLTIP_PLACEMENT,e)}get mediaController(){return F(this,b.MEDIA_CONTROLLER)}set mediaController(e){I(this,b.MEDIA_CONTROLLER,e)}get disabled(){return N(this,ni.DISABLED)}set disabled(e){P(this,ni.DISABLED,e)}get noTooltip(){return N(this,ni.NO_TOOLTIP)}set noTooltip(e){P(this,ni.NO_TOOLTIP,e)}handleClick(e){}};Yr=new WeakMap,Xr=new WeakMap,Zr=new WeakMap,Qr=new WeakMap,$r=new WeakMap,ei=new WeakSet,ti=function(){this.addEventListener(`mouseenter`,G(this,Zr)),this.addEventListener(`focus`,G(this,Zr)),this.addEventListener(`click`,G(this,Xr));let e=this.tooltipPlacement;e&&this.tooltipEl&&(this.tooltipEl.placement=e)},K.shadowRootOptions={mode:`open`},K.getTemplateHTML=ri,K.getSlotTemplateHTML=ii,K.getTooltipContentHTML=ai,O.customElements.get(`media-chrome-button`)||O.customElements.define(`media-chrome-button`,K);var oi=K,si=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;function ci(e){return`
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
      <slot name="enter">${si}</slot>
      <slot name="exit">${si}</slot>
    </slot>
  `}function li(){return`
    <slot name="tooltip-enter">${D(`start airplay`)}</slot>
    <slot name="tooltip-exit">${D(`stop airplay`)}</slot>
  `}var ui=e=>{let t=e.mediaIsAirplaying?D(`stop airplay`):D(`start airplay`);e.setAttribute(`aria-label`,t)},di=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_IS_AIRPLAYING,x.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),ui(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_IS_AIRPLAYING&&ui(this)}get mediaIsAirplaying(){return N(this,x.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){P(this,x.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return F(this,x.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){I(this,x.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){let e=new O.CustomEvent(y.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}};di.getSlotTemplateHTML=ci,di.getTooltipContentHTML=li,O.customElements.get(`media-airplay-button`)||O.customElements.define(`media-airplay-button`,di);var fi=di,pi=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,mi=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function hi(e){return`
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
      <slot name="on">${pi}</slot>
      <slot name="off">${mi}</slot>
    </slot>
  `}function gi(){return`
    <slot name="tooltip-enable">${D(`Enable captions`)}</slot>
    <slot name="tooltip-disable">${D(`Disable captions`)}</slot>
  `}var _i=e=>{e.setAttribute(`aria-checked`,Sn(e).toString())},vi=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_SUBTITLES_LIST,x.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`button`),this.setAttribute(`aria-label`,D(`closed captions`)),_i(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_SUBTITLES_SHOWING&&_i(this)}get mediaSubtitlesList(){return yi(this,x.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){bi(this,x.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return yi(this,x.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){bi(this,x.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new O.CustomEvent(y.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}};vi.getSlotTemplateHTML=hi,vi.getTooltipContentHTML=gi;var yi=(e,t)=>{let n=e.getAttribute(t);return n?mn(n):[]},bi=(e,t,n)=>{if(!n?.length){e.removeAttribute(t);return}let r=_n(n);e.getAttribute(t)!==r&&e.setAttribute(t,r)};O.customElements.get(`media-captions-button`)||O.customElements.define(`media-captions-button`,vi);var xi=vi,Si=`<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>`,Ci=`<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>`;function wi(e){return`
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
      <slot name="enter">${Si}</slot>
      <slot name="exit">${Ci}</slot>
    </slot>
  `}function Ti(){return`
    <slot name="tooltip-enter">${D(`Start casting`)}</slot>
    <slot name="tooltip-exit">${D(`Stop casting`)}</slot>
  `}var Ei=e=>{let t=e.mediaIsCasting?D(`stop casting`):D(`start casting`);e.setAttribute(`aria-label`,t)},Di=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_IS_CASTING,x.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Ei(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_IS_CASTING&&Ei(this)}get mediaIsCasting(){return N(this,x.MEDIA_IS_CASTING)}set mediaIsCasting(e){P(this,x.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return F(this,x.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){I(this,x.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){let e=this.mediaIsCasting?y.MEDIA_EXIT_CAST_REQUEST:y.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new O.CustomEvent(e,{composed:!0,bubbles:!0}))}};Di.getSlotTemplateHTML=wi,Di.getTooltipContentHTML=Ti,O.customElements.get(`media-cast-button`)||O.customElements.define(`media-cast-button`,Di);var Oi=Di,ki=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Ai=(e,t,n)=>(ki(e,t,`read from private field`),n?n.call(e):t.get(e)),ji=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Mi=(e,t,n,r)=>(ki(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Ni=(e,t,n)=>(ki(e,t,`access private method`),n),Pi,Fi,Ii,Li,Ri,zi,Bi,Vi,Hi,Ui,Wi,Gi,Ki,qi,Ji;function Yi(e){return`
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
  `}function Xi(e){return`
    <slot id="content"></slot>
  `}var Zi={OPEN:`open`,ANCHOR:`anchor`},Qi=class extends O.HTMLElement{constructor(){super(),ji(this,Li),ji(this,zi),ji(this,Vi),ji(this,Ui),ji(this,Gi),ji(this,qi),ji(this,Pi,!1),ji(this,Fi,null),ji(this,Ii,null)}static get observedAttributes(){return[Zi.OPEN,Zi.ANCHOR]}get open(){return N(this,Zi.OPEN)}set open(e){P(this,Zi.OPEN,e)}handleEvent(e){switch(e.type){case`invoke`:Ni(this,Ui,Wi).call(this,e);break;case`focusout`:Ni(this,Gi,Ki).call(this,e);break;case`keydown`:Ni(this,qi,Ji).call(this,e);break}}connectedCallback(){Ni(this,Li,Ri).call(this),this.role||=`dialog`,this.addEventListener(`invoke`,this),this.addEventListener(`focusout`,this),this.addEventListener(`keydown`,this)}disconnectedCallback(){this.removeEventListener(`invoke`,this),this.removeEventListener(`focusout`,this),this.removeEventListener(`keydown`,this)}attributeChangedCallback(e,t,n){Ni(this,Li,Ri).call(this),e===Zi.OPEN&&n!==t&&(this.open?Ni(this,zi,Bi).call(this):Ni(this,Vi,Hi).call(this))}focus(){Mi(this,Fi,lt());let e=!this.dispatchEvent(new Event(`focus`,{composed:!0,cancelable:!0})),t=!this.dispatchEvent(new Event(`focusin`,{composed:!0,bubbles:!0,cancelable:!0}));e||t||this.querySelector(`[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]`)?.focus()}get keysUsed(){return[`Escape`,`Tab`]}};Pi=new WeakMap,Fi=new WeakMap,Ii=new WeakMap,Li=new WeakSet,Ri=function(){if(!Ai(this,Pi)&&(Mi(this,Pi,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);let e=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e),queueMicrotask(()=>{let{style:e}=A(this.shadowRoot,`:host`);e.setProperty(`transition`,`display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in`)})}},zi=new WeakSet,Bi=function(){var e;(e=Ai(this,Ii))==null||e.setAttribute(`aria-expanded`,`true`),this.dispatchEvent(new Event(`open`,{composed:!0,bubbles:!0})),this.addEventListener(`transitionend`,()=>this.focus(),{once:!0})},Vi=new WeakSet,Hi=function(){var e;(e=Ai(this,Ii))==null||e.setAttribute(`aria-expanded`,`false`),this.dispatchEvent(new Event(`close`,{composed:!0,bubbles:!0}))},Ui=new WeakSet,Wi=function(e){Mi(this,Ii,e.relatedTarget),st(this,e.relatedTarget)||(this.open=!this.open)},Gi=new WeakSet,Ki=function(e){var t;st(this,e.relatedTarget)||((t=Ai(this,Fi))==null||t.focus(),Ai(this,Ii)&&Ai(this,Ii)!==e.relatedTarget&&this.open&&(this.open=!1))},qi=new WeakSet,Ji=function(e){var t,n,r,i,a;let{key:o,ctrlKey:s,altKey:c,metaKey:l}=e;s||c||l||this.keysUsed.includes(o)&&(e.preventDefault(),e.stopPropagation(),o===`Tab`?(e.shiftKey?(n=(t=this.previousElementSibling)?.focus)==null||n.call(t):(i=(r=this.nextElementSibling)?.focus)==null||i.call(r),this.blur()):o===`Escape`&&((a=Ai(this,Fi))==null||a.focus(),this.open=!1))},Qi.shadowRootOptions={mode:`open`},Qi.getTemplateHTML=Yi,Qi.getSlotTemplateHTML=Xi,O.customElements.get(`media-chrome-dialog`)||O.customElements.define(`media-chrome-dialog`,Qi);var $i=Qi,ea=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},q=(e,t,n)=>(ea(e,t,`read from private field`),n?n.call(e):t.get(e)),J=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},ta=(e,t,n,r)=>(ea(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),na=(e,t,n)=>(ea(e,t,`access private method`),n),ra,ia,aa,oa,sa,ca,la,ua,da,fa,pa,ma,ha,ga,_a,va,ya,ba,xa,Sa,Ca,wa,Ta,Ea,Da;function Oa(e){return`
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
  `}function ka(e){return``}var Aa=class extends O.HTMLElement{constructor(){if(super(),J(this,fa),J(this,ma),J(this,ga),J(this,va),J(this,ba),J(this,Sa),J(this,wa),J(this,Ea),J(this,ra,void 0),J(this,ia,void 0),J(this,aa,void 0),J(this,oa,void 0),J(this,sa,{}),J(this,ca,[]),J(this,la,()=>{if(this.range.matches(`:focus-visible`)){let{style:e}=A(this.shadowRoot,`:host`);e.setProperty(`--_focus-visible-box-shadow`,`var(--_focus-box-shadow)`)}}),J(this,ua,()=>{let{style:e}=A(this.shadowRoot,`:host`);e.removeProperty(`--_focus-visible-box-shadow`)}),J(this,da,()=>{let e=this.shadowRoot.querySelector(`#segments-clipping`);e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=tt(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}this.container=this.shadowRoot.querySelector(`#container`),ta(this,aa,this.shadowRoot.querySelector(`#startpoint`)),ta(this,oa,this.shadowRoot.querySelector(`#endpoint`)),this.range=this.shadowRoot.querySelector(`#range`),this.appearance=this.shadowRoot.querySelector(`#appearance`)}static get observedAttributes(){return[`disabled`,`aria-disabled`,b.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,n){var r,i,a,o;e===b.MEDIA_CONTROLLER?(t&&((i=(r=q(this,ra))?.unassociateElement)==null||i.call(r,this),ta(this,ra,null)),n&&this.isConnected&&(ta(this,ra,this.getRootNode()?.getElementById(n)),(o=(a=q(this,ra))?.associateElement)==null||o.call(a,this))):(e===`disabled`||e===`aria-disabled`&&t!==n)&&(n==null?(this.range.removeAttribute(e),na(this,ma,ha).call(this)):(this.range.setAttribute(e,n),na(this,ga,_a).call(this)))}connectedCallback(){var e,t;let{style:n}=A(this.shadowRoot,`:host`);n.setProperty(`display`,`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),q(this,sa).pointer=A(this.shadowRoot,`#pointer`),q(this,sa).progress=A(this.shadowRoot,`#progress`),q(this,sa).thumb=A(this.shadowRoot,`#thumb, ::slotted([slot="thumb"])`),q(this,sa).activeSegment=A(this.shadowRoot,`#segments-clipping rect:nth-child(0)`);let r=this.getAttribute(b.MEDIA_CONTROLLER);r&&(ta(this,ra,this.getRootNode()?.getElementById(r)),(t=(e=q(this,ra))?.associateElement)==null||t.call(e,this)),this.updateBar(),this.shadowRoot.addEventListener(`focusin`,q(this,la)),this.shadowRoot.addEventListener(`focusout`,q(this,ua)),na(this,ma,ha).call(this),$e(this.container,q(this,da))}disconnectedCallback(){var e,t;na(this,ga,_a).call(this),(t=(e=q(this,ra))?.unassociateElement)==null||t.call(e,this),ta(this,ra,null),this.shadowRoot.removeEventListener(`focusin`,q(this,la)),this.shadowRoot.removeEventListener(`focusout`,q(this,ua)),et(this.container,q(this,da))}updatePointerBar(e){var t;(t=q(this,sa).pointer)==null||t.style.setProperty(`width`,`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,t;let n=this.range.valueAsNumber*100;(e=q(this,sa).progress)==null||e.style.setProperty(`width`,`${n}%`),(t=q(this,sa).thumb)==null||t.style.setProperty(`left`,`${n}%`)}updateSegments(e){let t=this.shadowRoot.querySelector(`#segments-clipping`);if(t.textContent=``,this.container.classList.toggle(`segments`,!!e?.length),!e?.length)return;let n=[...new Set([+this.range.min,...e.flatMap(e=>[e.start,e.end]),+this.range.max])];ta(this,ca,[...n]);let r=n.pop();for(let[e,i]of n.entries()){let[a,o]=[e===0,e===n.length-1],s=a?`calc(var(--segments-gap) / -1)`:`${i*100}%`,c=`calc(${((o?r:n[e+1])-i)*100}%${a||o?``:` - var(--segments-gap)`})`,l=k.createElementNS(`http://www.w3.org/2000/svg`,`rect`),u=mt(this.shadowRoot,`#segments-clipping rect:nth-child(${e+1})`);u.style.setProperty(`x`,s),u.style.setProperty(`width`,c),t.append(l)}}getPointerRatio(e){return ft(e.clientX,e.clientY,q(this,aa).getBoundingClientRect(),q(this,oa).getBoundingClientRect())}get dragging(){return this.hasAttribute(`dragging`)}handleEvent(e){switch(e.type){case`pointermove`:na(this,Ea,Da).call(this,e);break;case`input`:this.updateBar();break;case`pointerenter`:na(this,ba,xa).call(this,e);break;case`pointerdown`:na(this,va,ya).call(this,e);break;case`pointerup`:na(this,Sa,Ca).call(this);break;case`pointerleave`:na(this,wa,Ta).call(this);break}}get keysUsed(){return[`ArrowUp`,`ArrowRight`,`ArrowDown`,`ArrowLeft`]}};ra=new WeakMap,ia=new WeakMap,aa=new WeakMap,oa=new WeakMap,sa=new WeakMap,ca=new WeakMap,la=new WeakMap,ua=new WeakMap,da=new WeakMap,fa=new WeakSet,pa=function(e){let t=q(this,sa).activeSegment;if(!t)return;let n=this.getPointerRatio(e),r=`#segments-clipping rect:nth-child(${q(this,ca).findIndex((e,t,r)=>{let i=r[t+1];return i!=null&&n>=e&&n<=i})+1})`;(t.selectorText!=r||!t.style.transform)&&(t.selectorText=r,t.style.setProperty(`transform`,`var(--media-range-segment-hover-transform, scaleY(2))`))},ma=new WeakSet,ha=function(){this.hasAttribute(`disabled`)||!this.isConnected||(this.addEventListener(`input`,this),this.addEventListener(`pointerdown`,this),this.addEventListener(`pointerenter`,this))},ga=new WeakSet,_a=function(){var e,t;this.removeEventListener(`input`,this),this.removeEventListener(`pointerdown`,this),this.removeEventListener(`pointerenter`,this),this.removeEventListener(`pointerleave`,this),(e=O.window)==null||e.removeEventListener(`pointerup`,this),(t=O.window)==null||t.removeEventListener(`pointermove`,this)},va=new WeakSet,ya=function(e){var t;ta(this,ia,e.composedPath().includes(this.range)),(t=O.window)==null||t.addEventListener(`pointerup`,this,{once:!0})},ba=new WeakSet,xa=function(e){var t;e.pointerType!==`mouse`&&na(this,va,ya).call(this,e),this.addEventListener(`pointerleave`,this,{once:!0}),(t=O.window)==null||t.addEventListener(`pointermove`,this)},Sa=new WeakSet,Ca=function(){var e;(e=O.window)==null||e.removeEventListener(`pointerup`,this),this.toggleAttribute(`dragging`,!1),this.range.disabled=this.hasAttribute(`disabled`)},wa=new WeakSet,Ta=function(){var e,t;this.removeEventListener(`pointerleave`,this),(e=O.window)==null||e.removeEventListener(`pointermove`,this),this.toggleAttribute(`dragging`,!1),this.range.disabled=this.hasAttribute(`disabled`),(t=q(this,sa).activeSegment)==null||t.style.removeProperty(`transform`)},Ea=new WeakSet,Da=function(e){e.pointerType===`pen`&&e.buttons===0||(this.toggleAttribute(`dragging`,e.buttons===1||e.pointerType!==`mouse`),this.updatePointerBar(e),na(this,fa,pa).call(this,e),this.dragging&&(e.pointerType!==`mouse`||!q(this,ia))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(e),this.range.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0}))))},Aa.shadowRootOptions={mode:`open`},Aa.getTemplateHTML=Oa,Aa.getContainerTemplateHTML=ka,O.customElements.get(`media-chrome-range`)||O.customElements.define(`media-chrome-range`,Aa);var ja=Aa,Ma=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Na=(e,t,n)=>(Ma(e,t,`read from private field`),n?n.call(e):t.get(e)),Pa=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Fa=(e,t,n,r)=>(Ma(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Ia;function La(e){return`
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
  `}var Ra=class extends O.HTMLElement{constructor(){if(super(),Pa(this,Ia,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[b.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,n){var r,i,a,o;e===b.MEDIA_CONTROLLER&&(t&&((i=(r=Na(this,Ia))?.unassociateElement)==null||i.call(r,this),Fa(this,Ia,null)),n&&this.isConnected&&(Fa(this,Ia,this.getRootNode()?.getElementById(n)),(o=(a=Na(this,Ia))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;let n=this.getAttribute(b.MEDIA_CONTROLLER);n&&(Fa(this,Ia,this.getRootNode()?.getElementById(n)),(t=(e=Na(this,Ia))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=Na(this,Ia))?.unassociateElement)==null||t.call(e,this),Fa(this,Ia,null)}};Ia=new WeakMap,Ra.shadowRootOptions={mode:`open`},Ra.getTemplateHTML=La,O.customElements.get(`media-control-bar`)||O.customElements.define(`media-control-bar`,Ra);var za=Ra,Ba=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Va=(e,t,n)=>(Ba(e,t,`read from private field`),n?n.call(e):t.get(e)),Ha=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Ua=(e,t,n,r)=>(Ba(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Wa;function Ga(e,t={}){return`
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
  `}function Ka(e,t){return`
    <slot></slot>
  `}var qa=class extends O.HTMLElement{constructor(){if(super(),Ha(this,Wa,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[b.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,n){var r,i,a,o;e===b.MEDIA_CONTROLLER&&(t&&((i=(r=Va(this,Wa))?.unassociateElement)==null||i.call(r,this),Ua(this,Wa,null)),n&&this.isConnected&&(Ua(this,Wa,this.getRootNode()?.getElementById(n)),(o=(a=Va(this,Wa))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;let{style:n}=A(this.shadowRoot,`:host`);n.setProperty(`display`,`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);let r=this.getAttribute(b.MEDIA_CONTROLLER);r&&(Ua(this,Wa,this.getRootNode()?.getElementById(r)),(t=(e=Va(this,Wa))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=Va(this,Wa))?.unassociateElement)==null||t.call(e,this),Ua(this,Wa,null)}};Wa=new WeakMap,qa.shadowRootOptions={mode:`open`},qa.getTemplateHTML=Ga,qa.getSlotTemplateHTML=Ka,O.customElements.get(`media-text-display`)||O.customElements.define(`media-text-display`,qa);var Ja=qa,Ya=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Xa=(e,t,n)=>(Ya(e,t,`read from private field`),n?n.call(e):t.get(e)),Za=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Qa=(e,t,n,r)=>(Ya(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),$a;function eo(e,t){return`
    <slot>${Ve(t.mediaDuration)}</slot>
  `}var to=class extends qa{constructor(){super(),Za(this,$a,void 0),Qa(this,$a,this.shadowRoot.querySelector(`slot`)),Xa(this,$a).textContent=Ve(this.mediaDuration??0)}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_DURATION]}attributeChangedCallback(e,t,n){e===x.MEDIA_DURATION&&(Xa(this,$a).textContent=Ve(+n)),super.attributeChangedCallback(e,t,n)}get mediaDuration(){return j(this,x.MEDIA_DURATION)}set mediaDuration(e){M(this,x.MEDIA_DURATION,e)}};$a=new WeakMap,to.getSlotTemplateHTML=eo,O.customElements.get(`media-duration-display`)||O.customElements.define(`media-duration-display`,to);var no=to,ro={2:D(`Network Error`),3:D(`Decode Error`),4:D(`Source Not Supported`),5:D(`Encryption Error`)},io={2:D(`A network error caused the media download to fail.`),3:D(`A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.`),4:D(`An unsupported error occurred. The server or network failed, or your browser does not support this format.`),5:D(`The media is encrypted and there are no keys to decrypt it.`)},ao=e=>e.code===1?null:{title:ro[e.code]??`Error ${e.code}`,message:io[e.code]??e.message},oo=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},so=(e,t,n)=>(oo(e,t,`read from private field`),n?n.call(e):t.get(e)),co=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},lo=(e,t,n,r)=>(oo(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),uo;function fo(e){return`
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
      ${mo({code:+e.mediaerrorcode,message:e.mediaerrormessage})}
    </slot>
  `}function po(e){return e.code&&ao(e)!==null}function mo(e){let{title:t,message:n}=ao(e)??{},r=``;return t&&(r+=`<slot name="error-${e.code}-title"><h3>${t}</h3></slot>`),n&&(r+=`<slot name="error-${e.code}-message"><p>${n}</p></slot>`),r}var ho=[x.MEDIA_ERROR_CODE,x.MEDIA_ERROR_MESSAGE],go=class extends Qi{constructor(){super(...arguments),co(this,uo,null)}static get observedAttributes(){return[...super.observedAttributes,...ho]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),!ho.includes(e))return;let r=this.mediaError??{code:this.mediaErrorCode,message:this.mediaErrorMessage};if(this.open=po(r),this.open&&(this.shadowRoot.querySelector(`slot`).name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector(`#content`).innerHTML=this.formatErrorMessage(r),!this.hasAttribute(`aria-label`))){let{title:e}=ao(r);e&&this.setAttribute(`aria-label`,e)}}get mediaError(){return so(this,uo)}set mediaError(e){lo(this,uo,e)}get mediaErrorCode(){return j(this,`mediaerrorcode`)}set mediaErrorCode(e){M(this,`mediaerrorcode`,e)}get mediaErrorMessage(){return F(this,`mediaerrormessage`)}set mediaErrorMessage(e){I(this,`mediaerrormessage`,e)}};uo=new WeakMap,go.getSlotTemplateHTML=fo,go.formatErrorMessage=mo,O.customElements.get(`media-error-dialog`)||O.customElements.define(`media-error-dialog`,go);var _o=go,vo=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},yo=(e,t,n)=>(vo(e,t,`read from private field`),n?n.call(e):t.get(e)),bo=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},xo,So;function Co(e){return`
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
      ${wo()}
    </slot>
  `}function wo(){return`
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${[{keys:[`Space`,`k`],description:`Toggle Playback`},{keys:[`m`],description:`Toggle mute`},{keys:[`f`],description:`Toggle fullscreen`},{keys:[`c`],description:`Toggle captions or subtitles, if available`},{keys:[`p`],description:`Toggle Picture in Picture`},{keys:[`←`,`j`],description:`Seek back 10s`},{keys:[`→`,`l`],description:`Seek forward 10s`},{keys:[`↑`],description:`Turn volume up`},{keys:[`↓`],description:`Turn volume down`},{keys:[`< (SHIFT+,)`],description:`Decrease playback rate`},{keys:[`> (SHIFT+.)`],description:`Increase playback rate`}].map(({keys:e,description:t})=>`
      <tr>
        <td>
          <div class="key-combo">${e.map((e,t)=>t>0?`<span class="key-separator">or</span><span class="key">${e}</span>`:`<span class="key">${e}</span>`).join(``)}</div>
        </td>
        <td class="description">${t}</td>
      </tr>
    `).join(``)}</table>
  `}var To=class extends Qi{constructor(){super(...arguments),bo(this,xo,e=>{if(!this.open)return;let t=this.shadowRoot?.querySelector(`#content`);if(!t)return;let n=e.composedPath(),r=n[0]===this||n.includes(this),i=n.includes(t);r&&!i&&(this.open=!1)}),bo(this,So,e=>{if(!this.open)return;let t=e.shiftKey&&(e.key===`/`||e.key===`?`);(e.key===`Escape`||t)&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(this.open=!1,e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),this.open&&(this.addEventListener(`click`,yo(this,xo)),document.addEventListener(`keydown`,yo(this,So)))}disconnectedCallback(){this.removeEventListener(`click`,yo(this,xo)),document.removeEventListener(`keydown`,yo(this,So))}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===`open`&&(this.open?(this.addEventListener(`click`,yo(this,xo)),document.addEventListener(`keydown`,yo(this,So))):(this.removeEventListener(`click`,yo(this,xo)),document.removeEventListener(`keydown`,yo(this,So))))}};xo=new WeakMap,So=new WeakMap,To.getSlotTemplateHTML=Co,O.customElements.get(`media-keyboard-shortcuts-dialog`)||O.customElements.define(`media-keyboard-shortcuts-dialog`,To);var Eo=To,Do=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Oo=(e,t,n)=>(Do(e,t,`read from private field`),n?n.call(e):t.get(e)),ko=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Ao=(e,t,n,r)=>(Do(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),jo,Mo=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,No=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;function Po(e){return`
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
      <slot name="enter">${Mo}</slot>
      <slot name="exit">${No}</slot>
    </slot>
  `}function Fo(){return`
    <slot name="tooltip-enter">${D(`Enter fullscreen mode`)}</slot>
    <slot name="tooltip-exit">${D(`Exit fullscreen mode`)}</slot>
  `}var Io=e=>{let t=e.mediaIsFullscreen?D(`exit fullscreen mode`):D(`enter fullscreen mode`);e.setAttribute(`aria-label`,t)},Lo=class extends K{constructor(){super(...arguments),ko(this,jo,null)}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_IS_FULLSCREEN,x.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Io(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_IS_FULLSCREEN&&Io(this)}get mediaFullscreenUnavailable(){return F(this,x.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){I(this,x.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return N(this,x.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){P(this,x.MEDIA_IS_FULLSCREEN,e)}handleClick(e){Ao(this,jo,e);let t=Oo(this,jo)instanceof PointerEvent,n=this.mediaIsFullscreen?new O.CustomEvent(y.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0}):new O.CustomEvent(y.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0,detail:t});this.dispatchEvent(n)}};jo=new WeakMap,Lo.getSlotTemplateHTML=Po,Lo.getTooltipContentHTML=Fo,O.customElements.get(`media-fullscreen-button`)||O.customElements.define(`media-fullscreen-button`,Lo);var Ro=Lo,{MEDIA_TIME_IS_LIVE:zo,MEDIA_PAUSED:Bo}=x,{MEDIA_SEEK_TO_LIVE_REQUEST:Vo,MEDIA_PLAY_REQUEST:Ho}=y,Uo=`<svg viewBox="0 0 6 12" aria-hidden="true"><circle cx="3" cy="6" r="2"></circle></svg>`;function Wo(e){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${zo}]:not([${Bo}])) slot[name=indicator] > *,
      :host([${zo}]:not([${Bo}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${zo}]:not([${Bo}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${Uo}</slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${D(`live`)}</slot>
  `}var Go=e=>{let t=e.mediaPaused||!e.mediaTimeIsLive,n=D(t?`seek to live`:`playing live`);e.setAttribute(`aria-label`,n);let r=e.shadowRoot?.querySelector(`slot[name="text"]`);r&&(r.textContent=D(`live`)),t?e.removeAttribute(`aria-disabled`):e.setAttribute(`aria-disabled`,`true`)},Ko=class extends K{static get observedAttributes(){return[...super.observedAttributes,zo,Bo]}connectedCallback(){super.connectedCallback(),Go(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),Go(this)}get mediaPaused(){return N(this,x.MEDIA_PAUSED)}set mediaPaused(e){P(this,x.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return N(this,x.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){P(this,x.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new O.CustomEvent(Vo,{composed:!0,bubbles:!0})),this.hasAttribute(Bo)&&this.dispatchEvent(new O.CustomEvent(Ho,{composed:!0,bubbles:!0})))}};Ko.getSlotTemplateHTML=Wo,O.customElements.get(`media-live-button`)||O.customElements.define(`media-live-button`,Ko);var qo=Ko,Jo=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Yo=(e,t,n)=>(Jo(e,t,`read from private field`),n?n.call(e):t.get(e)),Xo=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Zo=(e,t,n,r)=>(Jo(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Qo,$o,es={LOADING_DELAY:`loadingdelay`,NO_AUTOHIDE:`noautohide`},ts=500,ns=`
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
`;function rs(e){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${ts}ms);
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

    <slot name="icon">${ns}</slot>
    <div id="status" role="status" aria-live="polite">${D(`media loading`)}</div>
  `}var is=class extends O.HTMLElement{constructor(){if(super(),Xo(this,Qo,void 0),Xo(this,$o,ts),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[b.MEDIA_CONTROLLER,x.MEDIA_PAUSED,x.MEDIA_LOADING,es.LOADING_DELAY]}attributeChangedCallback(e,t,n){var r,i,a,o;e===es.LOADING_DELAY&&t!==n?this.loadingDelay=Number(n):e===b.MEDIA_CONTROLLER&&(t&&((i=(r=Yo(this,Qo))?.unassociateElement)==null||i.call(r,this),Zo(this,Qo,null)),n&&this.isConnected&&(Zo(this,Qo,this.getRootNode()?.getElementById(n)),(o=(a=Yo(this,Qo))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;let n=this.getAttribute(b.MEDIA_CONTROLLER);n&&(Zo(this,Qo,this.getRootNode()?.getElementById(n)),(t=(e=Yo(this,Qo))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=Yo(this,Qo))?.unassociateElement)==null||t.call(e,this),Zo(this,Qo,null)}get loadingDelay(){return Yo(this,$o)}set loadingDelay(e){Zo(this,$o,e);let{style:t}=A(this.shadowRoot,`:host`);t.setProperty(`--_loading-indicator-delay`,`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return N(this,x.MEDIA_PAUSED)}set mediaPaused(e){P(this,x.MEDIA_PAUSED,e)}get mediaLoading(){return N(this,x.MEDIA_LOADING)}set mediaLoading(e){P(this,x.MEDIA_LOADING,e)}get mediaController(){return F(this,b.MEDIA_CONTROLLER)}set mediaController(e){I(this,b.MEDIA_CONTROLLER,e)}get noAutohide(){return N(this,es.NO_AUTOHIDE)}set noAutohide(e){P(this,es.NO_AUTOHIDE,e)}};Qo=new WeakMap,$o=new WeakMap,is.shadowRootOptions={mode:`open`},is.getTemplateHTML=rs,O.customElements.get(`media-loading-indicator`)||O.customElements.define(`media-loading-indicator`,is);var as=is,os=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,ss=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,cs=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;function ls(e){return`
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
      <slot name="off">${os}</slot>
      <slot name="low">${ss}</slot>
      <slot name="medium">${ss}</slot>
      <slot name="high">${cs}</slot>
    </slot>
  `}function us(){return`
    <slot name="tooltip-mute">${D(`Mute`)}</slot>
    <slot name="tooltip-unmute">${D(`Unmute`)}</slot>
  `}var ds=e=>{let t=e.mediaVolumeLevel===`off`?D(`unmute`):D(`mute`);e.setAttribute(`aria-label`,t)},fs=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),ds(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_VOLUME_LEVEL&&ds(this)}get mediaVolumeLevel(){return F(this,x.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){I(this,x.MEDIA_VOLUME_LEVEL,e)}handleClick(){let e=this.mediaVolumeLevel===`off`?y.MEDIA_UNMUTE_REQUEST:y.MEDIA_MUTE_REQUEST;this.dispatchEvent(new O.CustomEvent(e,{composed:!0,bubbles:!0}))}};fs.getSlotTemplateHTML=ls,fs.getTooltipContentHTML=us,O.customElements.get(`media-mute-button`)||O.customElements.define(`media-mute-button`,fs);var ps=fs,ms=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;function hs(e){return`
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
      <slot name="enter">${ms}</slot>
      <slot name="exit">${ms}</slot>
    </slot>
  `}function gs(){return`
    <slot name="tooltip-enter">${D(`Enter picture in picture mode`)}</slot>
    <slot name="tooltip-exit">${D(`Exit picture in picture mode`)}</slot>
  `}var _s=e=>{let t=e.mediaIsPip?D(`exit picture in picture mode`):D(`enter picture in picture mode`);e.setAttribute(`aria-label`,t)},vs=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_IS_PIP,x.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),_s(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_IS_PIP&&_s(this)}get mediaPipUnavailable(){return F(this,x.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){I(this,x.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return N(this,x.MEDIA_IS_PIP)}set mediaIsPip(e){P(this,x.MEDIA_IS_PIP,e)}handleClick(){let e=this.mediaIsPip?y.MEDIA_EXIT_PIP_REQUEST:y.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new O.CustomEvent(e,{composed:!0,bubbles:!0}))}};vs.getSlotTemplateHTML=hs,vs.getTooltipContentHTML=gs,O.customElements.get(`media-pip-button`)||O.customElements.define(`media-pip-button`,vs);var ys=vs,bs=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},xs=(e,t,n)=>(bs(e,t,`read from private field`),n?n.call(e):t.get(e)),Ss=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Cs,ws={RATES:`rates`},Ts=[1,1.2,1.5,1.7,2];function Es(e){return Math.round(e*100)/100}function Ds(e){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${e.mediaplaybackrate?Es(+e.mediaplaybackrate):1}x</slot>
  `}function Os(){return D(`Playback rate`)}var ks=class extends K{constructor(){super(),Ss(this,Cs,new dn(this,ws.RATES,{defaultValue:Ts})),this.container=this.shadowRoot.querySelector(`slot[name="icon"]`),this.container.innerHTML=`${Es(this.mediaPlaybackRate??1)}x`}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PLAYBACK_RATE,ws.RATES]}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),e===ws.RATES&&(xs(this,Cs).value=n),e===x.MEDIA_PLAYBACK_RATE){let e=n?+n:NaN,t=Es(Number.isNaN(e)?1:e);this.container.innerHTML=`${t}x`,this.setAttribute(`aria-label`,D(`Playback rate {playbackRate}`,{playbackRate:t}))}}get rates(){return xs(this,Cs)}set rates(e){e?Array.isArray(e)?xs(this,Cs).value=e.join(` `):typeof e==`string`&&(xs(this,Cs).value=e):xs(this,Cs).value=``}get mediaPlaybackRate(){return j(this,x.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){M(this,x.MEDIA_PLAYBACK_RATE,e)}handleClick(){let e=Array.from(xs(this,Cs).values(),e=>+e).sort((e,t)=>e-t),t=e.find(e=>e>this.mediaPlaybackRate)??e[0]??1,n=new O.CustomEvent(y.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:t});this.dispatchEvent(n)}};Cs=new WeakMap,ks.getSlotTemplateHTML=Ds,ks.getTooltipContentHTML=Os,O.customElements.get(`media-playback-rate-button`)||O.customElements.define(`media-playback-rate-button`,ks);var As=ks,js=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,Ms=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;function Ns(e){return`
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
      <slot name="play">${js}</slot>
      <slot name="pause">${Ms}</slot>
    </slot>
  `}function Ps(){return`
    <slot name="tooltip-play">${D(`Play`)}</slot>
    <slot name="tooltip-pause">${D(`Pause`)}</slot>
  `}var Fs=e=>{let t=e.mediaPaused?D(`play`):D(`pause`);e.setAttribute(`aria-label`,t)},Is=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PAUSED,x.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),Fs(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),(e===x.MEDIA_PAUSED||e===x.MEDIA_LANG)&&Fs(this)}get mediaPaused(){return N(this,x.MEDIA_PAUSED)}set mediaPaused(e){P(this,x.MEDIA_PAUSED,e)}handleClick(){let e=this.mediaPaused?y.MEDIA_PLAY_REQUEST:y.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new O.CustomEvent(e,{composed:!0,bubbles:!0}))}};Is.getSlotTemplateHTML=Ns,Is.getTooltipContentHTML=Ps,O.customElements.get(`media-play-button`)||O.customElements.define(`media-play-button`,Is);var Ls=Is,Rs={PLACEHOLDER_SRC:`placeholdersrc`,SRC:`src`};function zs(e){return`
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
  `}var Bs=e=>{e.style.removeProperty(`background-image`)},Vs=(e,t)=>{e.style[`background-image`]=`url('${t}')`},Hs=class extends O.HTMLElement{static get observedAttributes(){return[Rs.PLACEHOLDER_SRC,Rs.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector(`#image`)}attributeChangedCallback(e,t,n){e===Rs.SRC&&(n==null?this.image.removeAttribute(Rs.SRC):this.image.setAttribute(Rs.SRC,n)),e===Rs.PLACEHOLDER_SRC&&(n==null?Bs(this.image):Vs(this.image,n))}get placeholderSrc(){return F(this,Rs.PLACEHOLDER_SRC)}set placeholderSrc(e){I(this,Rs.SRC,e)}get src(){return F(this,Rs.SRC)}set src(e){I(this,Rs.SRC,e)}};Hs.shadowRootOptions={mode:`open`},Hs.getTemplateHTML=zs,O.customElements.get(`media-poster-image`)||O.customElements.define(`media-poster-image`,Hs);var Us=Hs,Ws=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Gs=(e,t,n)=>(Ws(e,t,`read from private field`),n?n.call(e):t.get(e)),Ks=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},qs=(e,t,n,r)=>(Ws(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Js,Ys=class extends qa{constructor(){super(),Ks(this,Js,void 0),qs(this,Js,this.shadowRoot.querySelector(`slot`))}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PREVIEW_CHAPTER,x.MEDIA_LANG]}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),(e===x.MEDIA_PREVIEW_CHAPTER||e===x.MEDIA_LANG)&&n!==t&&n!=null)if(Gs(this,Js).textContent=n,n!==``){let e=D(`chapter: {chapterName}`,{chapterName:n});this.setAttribute(`aria-valuetext`,e)}else this.removeAttribute(`aria-valuetext`)}get mediaPreviewChapter(){return F(this,x.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){I(this,x.MEDIA_PREVIEW_CHAPTER,e)}};Js=new WeakMap,O.customElements.get(`media-preview-chapter-display`)||O.customElements.define(`media-preview-chapter-display`,Ys);var Xs=Ys,Zs=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Qs=(e,t,n)=>(Zs(e,t,`read from private field`),n?n.call(e):t.get(e)),$s=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},ec=(e,t,n,r)=>(Zs(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),tc;function nc(e){return`
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
  `}var rc=class extends O.HTMLElement{constructor(){if(super(),$s(this,tc,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=tt(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[b.MEDIA_CONTROLLER,x.MEDIA_PREVIEW_IMAGE,x.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,t;let n=this.getAttribute(b.MEDIA_CONTROLLER);n&&(ec(this,tc,this.getRootNode()?.getElementById(n)),(t=(e=Qs(this,tc))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=Qs(this,tc))?.unassociateElement)==null||t.call(e,this),ec(this,tc,null)}attributeChangedCallback(e,t,n){var r,i,a,o;[x.MEDIA_PREVIEW_IMAGE,x.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===b.MEDIA_CONTROLLER&&(t&&((i=(r=Qs(this,tc))?.unassociateElement)==null||i.call(r,this),ec(this,tc,null)),n&&this.isConnected&&(ec(this,tc,this.getRootNode()?.getElementById(n)),(o=(a=Qs(this,tc))?.associateElement)==null||o.call(a,this)))}get mediaPreviewImage(){return F(this,x.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){I(this,x.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){let e=this.getAttribute(x.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(e=>+e)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(x.MEDIA_PREVIEW_COORDS);return}this.setAttribute(x.MEDIA_PREVIEW_COORDS,e.join(` `))}update(){let e=this.mediaPreviewCoords,t=this.mediaPreviewImage;if(!(e&&t))return;let[n,r,i,a]=e,o=t.split(`#`)[0],s=getComputedStyle(this),{maxWidth:c,maxHeight:l,minWidth:u,minHeight:d}=s,f=s.getPropertyValue(`--media-preview-thumbnail-object-fit`).trim()||`contain`,p,m;if(f===`fill`){let e=parseInt(c)/i,t=parseInt(l)/a,n=parseInt(u)/i,r=parseInt(d)/a;p=e<1?e:Math.max(e,n),m=t<1?t:Math.max(t,r)}else{let e=Math.min(parseInt(c)/i,parseInt(l)/a),t=Math.max(parseInt(u)/i,parseInt(d)/a),n=e<1?e:t>1?t:1;p=n,m=n}let{style:h}=A(this.shadowRoot,`:host`),ee=A(this.shadowRoot,`img`).style,g=this.shadowRoot.querySelector(`img`),te=Math.min(p,m)<1?`min`:`max`;h.setProperty(`${te}-width`,`initial`,`important`),h.setProperty(`${te}-height`,`initial`,`important`),h.width=`${i*p}px`,h.height=`${a*m}px`;let ne=()=>{ee.width=`${this.imgWidth*p}px`,ee.height=`${this.imgHeight*m}px`,ee.display=`block`};g.src!==o&&(g.onload=()=>{this.imgWidth=g.naturalWidth,this.imgHeight=g.naturalHeight,ne(),g.onload=null},g.src=o,ne()),ne(),ee.transform=`translate(-${n*p}px, -${r*m}px)`}};tc=new WeakMap,rc.shadowRootOptions={mode:`open`},rc.getTemplateHTML=nc,O.customElements.get(`media-preview-thumbnail`)||O.customElements.define(`media-preview-thumbnail`,rc);var ic=rc,ac=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},oc=(e,t,n)=>(ac(e,t,`read from private field`),n?n.call(e):t.get(e)),sc=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},cc=(e,t,n,r)=>(ac(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),lc,uc=class extends qa{constructor(){super(),sc(this,lc,void 0),cc(this,lc,this.shadowRoot.querySelector(`slot`)),oc(this,lc).textContent=Ve(0)}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_PREVIEW_TIME&&n!=null&&(oc(this,lc).textContent=Ve(parseFloat(n)))}get mediaPreviewTime(){return j(this,x.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){M(this,x.MEDIA_PREVIEW_TIME,e)}};lc=new WeakMap,O.customElements.get(`media-preview-time-display`)||O.customElements.define(`media-preview-time-display`,uc);var dc=uc,fc={SEEK_OFFSET:`seekoffset`},pc=30,mc=e=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${e}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`;function hc(e,t){return`
    <slot name="icon">${mc(t.seekOffset)}</slot>
  `}var gc=(e,t)=>{e.setAttribute(`aria-label`,D(`seek back {seekOffset} seconds`,{seekOffset:t}))};function _c(){return D(`Seek backward`)}var vc=0,yc=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_CURRENT_TIME,fc.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=j(this,fc.SEEK_OFFSET,pc)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),gc(this,this.seekOffset),e===fc.SEEK_OFFSET&&(this.seekOffset=j(this,fc.SEEK_OFFSET,pc))}get seekOffset(){return j(this,fc.SEEK_OFFSET,pc)}set seekOffset(e){M(this,fc.SEEK_OFFSET,e),this.setAttribute(`aria-label`,D(`seek back {seekOffset} seconds`,{seekOffset:this.seekOffset})),it(ot(this,`icon`),this.seekOffset)}get mediaCurrentTime(){return j(this,x.MEDIA_CURRENT_TIME,vc)}set mediaCurrentTime(e){M(this,x.MEDIA_CURRENT_TIME,e)}handleClick(){let e=Math.max(this.mediaCurrentTime-this.seekOffset,0),t=new O.CustomEvent(y.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}};yc.getSlotTemplateHTML=hc,yc.getTooltipContentHTML=_c,O.customElements.get(`media-seek-backward-button`)||O.customElements.define(`media-seek-backward-button`,yc);var bc=yc,xc={SEEK_OFFSET:`seekoffset`},Sc=30,Cc=e=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${e}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`;function wc(e,t){return`
    <slot name="icon">${Cc(t.seekOffset)}</slot>
  `}var Tc=(e,t)=>{e.setAttribute(`aria-label`,D(`seek forward {seekOffset} seconds`,{seekOffset:t}))};function Ec(){return D(`Seek forward`)}var Dc=0,Oc=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_CURRENT_TIME,xc.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=j(this,xc.SEEK_OFFSET,Sc)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),Tc(this,this.seekOffset),e===xc.SEEK_OFFSET&&(this.seekOffset=j(this,xc.SEEK_OFFSET,Sc))}get seekOffset(){return j(this,xc.SEEK_OFFSET,Sc)}set seekOffset(e){M(this,xc.SEEK_OFFSET,e),this.setAttribute(`aria-label`,D(`seek forward {seekOffset} seconds`,{seekOffset:this.seekOffset})),it(ot(this,`icon`),this.seekOffset)}get mediaCurrentTime(){return j(this,x.MEDIA_CURRENT_TIME,Dc)}set mediaCurrentTime(e){M(this,x.MEDIA_CURRENT_TIME,e)}handleClick(){let e=this.mediaCurrentTime+this.seekOffset,t=new O.CustomEvent(y.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}};Oc.getSlotTemplateHTML=wc,Oc.getTooltipContentHTML=Ec,O.customElements.get(`media-seek-forward-button`)||O.customElements.define(`media-seek-forward-button`,Oc);var kc=Oc,Ac=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},jc=(e,t,n)=>(Ac(e,t,`read from private field`),n?n.call(e):t.get(e)),Mc=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Nc=(e,t,n,r)=>(Ac(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Pc=(e,t,n)=>(Ac(e,t,`access private method`),n),Fc,Ic,Lc,Rc,zc,Bc,Vc,Hc,Uc,Wc,Gc,Kc={REMAINING:`remaining`,SHOW_DURATION:`showduration`,NO_TOGGLE:`notoggle`},qc=[...Object.values(Kc),x.MEDIA_CURRENT_TIME,x.MEDIA_DURATION,x.MEDIA_SEEKABLE],Jc=[`Enter`,` `],Yc=`&nbsp;/&nbsp;`,Xc=(e,{timesSep:t=Yc}={})=>{let n=e.mediaCurrentTime??0,[,r]=e.mediaSeekable??[],i=0;Number.isFinite(e.mediaDuration)?i=e.mediaDuration:Number.isFinite(r)&&(i=r);let a=e.remaining?Ve(0-(i-n)):Ve(n);return e.showDuration?`${a}${t}${Ve(i)}`:a},Zc=e=>{let t=e.mediaCurrentTime,[,n]=e.mediaSeekable??[],r=null;if(Number.isFinite(e.mediaDuration)?r=e.mediaDuration:Number.isFinite(n)&&(r=n),t==null||r===null){e.setAttribute(`aria-description`,D(`video not loaded, unknown time.`));return}let i=e.remaining?Be(0-(r-t)):Be(t);if(!e.showDuration){e.setAttribute(`aria-description`,i);return}let a=D(`{currentTime} of {totalTime}`,{currentTime:i,totalTime:Be(r)});e.setAttribute(`aria-description`,a)};function Qc(e,t){return`
    <slot>${Xc(t)}</slot>
  `}var $c=e=>{e.setAttribute(`aria-label`,D(`playback time`))},el=class extends qa{constructor(){super(),Mc(this,Rc),Mc(this,Bc),Mc(this,Hc),Mc(this,Wc),Mc(this,Fc,void 0),Mc(this,Ic,null),Mc(this,Lc,e=>{let{metaKey:t,altKey:n,key:r}=e;if(t||n||!Jc.includes(r)){this.removeEventListener(`keyup`,jc(this,Ic));return}this.addEventListener(`keyup`,jc(this,Ic))}),Nc(this,Fc,this.shadowRoot.querySelector(`slot`)),jc(this,Fc).innerHTML=`${Xc(this)}`}static get observedAttributes(){return[...super.observedAttributes,...qc,`disabled`]}connectedCallback(){let{style:e}=A(this.shadowRoot,`:host(:hover:not([notoggle]))`);e.setProperty(`cursor`,`var(--media-cursor, pointer)`),e.setProperty(`background`,`var(--media-control-hover-background, rgba(50 50 70 / .7))`),this.setAttribute(`aria-label`,D(`playback time`)),Pc(this,Hc,Uc).call(this),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute(`remaining`)?this.removeAttribute(`remaining`):this.setAttribute(`remaining`,``))}disconnectedCallback(){this.disable(),Pc(this,Bc,Vc).call(this),super.disconnectedCallback()}attributeChangedCallback(e,t,n){$c(this),qc.includes(e)?this.update():e===`disabled`&&n!==t?n==null?Pc(this,Hc,Uc).call(this):Pc(this,Wc,Gc).call(this):e===Kc.NO_TOGGLE&&n!==t&&(this.noToggle?Pc(this,Wc,Gc).call(this):Pc(this,Hc,Uc).call(this)),super.attributeChangedCallback(e,t,n)}enable(){this.noToggle||(this.tabIndex=0)}disable(){this.tabIndex=-1}get remaining(){return N(this,Kc.REMAINING)}set remaining(e){P(this,Kc.REMAINING,e)}get showDuration(){return N(this,Kc.SHOW_DURATION)}set showDuration(e){P(this,Kc.SHOW_DURATION,e)}get noToggle(){return N(this,Kc.NO_TOGGLE)}set noToggle(e){P(this,Kc.NO_TOGGLE,e)}get mediaDuration(){return j(this,x.MEDIA_DURATION)}set mediaDuration(e){M(this,x.MEDIA_DURATION,e)}get mediaCurrentTime(){return j(this,x.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){M(this,x.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){let e=this.getAttribute(x.MEDIA_SEEKABLE);if(e)return e.split(`:`).map(e=>+e)}set mediaSeekable(e){if(e==null){this.removeAttribute(x.MEDIA_SEEKABLE);return}this.setAttribute(x.MEDIA_SEEKABLE,e.join(`:`))}update(){let e=Xc(this);Zc(this),e!==jc(this,Fc).innerHTML&&(jc(this,Fc).innerHTML=e)}};Fc=new WeakMap,Ic=new WeakMap,Lc=new WeakMap,Rc=new WeakSet,zc=function(){jc(this,Ic)||(Nc(this,Ic,e=>{let{key:t}=e;if(!Jc.includes(t)){this.removeEventListener(`keyup`,jc(this,Ic));return}this.toggleTimeDisplay()}),this.addEventListener(`keydown`,jc(this,Lc)),this.addEventListener(`click`,this.toggleTimeDisplay))},Bc=new WeakSet,Vc=function(){jc(this,Ic)&&(this.removeEventListener(`keyup`,jc(this,Ic)),this.removeEventListener(`keydown`,jc(this,Lc)),this.removeEventListener(`click`,this.toggleTimeDisplay),Nc(this,Ic,null))},Hc=new WeakSet,Uc=function(){!this.noToggle&&!this.hasAttribute(`disabled`)&&(this.setAttribute(`role`,`button`),this.enable(),Pc(this,Rc,zc).call(this))},Wc=new WeakSet,Gc=function(){this.removeAttribute(`role`),this.disable(),Pc(this,Bc,Vc).call(this)},el.getSlotTemplateHTML=Qc,O.customElements.get(`media-time-display`)||O.customElements.define(`media-time-display`,el);var tl=el,nl=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Y=(e,t,n)=>(nl(e,t,`read from private field`),n?n.call(e):t.get(e)),rl=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},il=(e,t,n,r)=>(nl(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),al=(e,t,n,r)=>({set _(r){il(e,t,r,n)},get _(){return Y(e,t,r)}}),ol,sl,cl,ll,ul,dl,fl,pl,ml,hl,gl=class{constructor(e,t,n){rl(this,ol,void 0),rl(this,sl,void 0),rl(this,cl,void 0),rl(this,ll,void 0),rl(this,ul,void 0),rl(this,dl,void 0),rl(this,fl,void 0),rl(this,pl,void 0),rl(this,ml,0),rl(this,hl,(e=performance.now())=>{il(this,ml,requestAnimationFrame(Y(this,hl))),il(this,ll,performance.now()-Y(this,cl));let t=1e3/this.fps;if(Y(this,ll)>t){il(this,cl,e-Y(this,ll)%t);let n=1e3/((e-Y(this,sl))/++al(this,ul)._),r=(e-Y(this,dl))/1e3/this.duration,i=Y(this,fl)+r*this.playbackRate;i-Y(this,ol).valueAsNumber>0?il(this,pl,this.playbackRate/this.duration/n):(il(this,pl,.995*Y(this,pl)),i=Y(this,ol).valueAsNumber+Y(this,pl)),this.callback(i)}}),il(this,ol,e),this.callback=t,this.fps=n}start(){Y(this,ml)===0&&(il(this,cl,performance.now()),il(this,sl,Y(this,cl)),il(this,ul,0),Y(this,hl).call(this))}stop(){Y(this,ml)!==0&&(cancelAnimationFrame(Y(this,ml)),il(this,ml,0))}update({start:e,duration:t,playbackRate:n}){let r=e-Y(this,ol).valueAsNumber,i=Math.abs(t-this.duration);(r>0||r<-.03||i>=.5)&&this.callback(e),il(this,fl,e),il(this,dl,performance.now()),this.duration=t,this.playbackRate=n}};ol=new WeakMap,sl=new WeakMap,cl=new WeakMap,ll=new WeakMap,ul=new WeakMap,dl=new WeakMap,fl=new WeakMap,pl=new WeakMap,ml=new WeakMap,hl=new WeakMap;var _l=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},X=(e,t,n)=>(_l(e,t,`read from private field`),n?n.call(e):t.get(e)),Z=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},vl=(e,t,n,r)=>(_l(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),yl=(e,t,n)=>(_l(e,t,`access private method`),n),bl,xl,Sl,Cl,wl,Tl,El,Dl,Ol,kl,Al,jl,Ml,Nl,Pl,Fl,Il,Ll,Rl,zl,Bl,Vl,Hl,Ul,Wl,Gl,Kl=e=>{let t=e.range,n=Be(+Yl(e)),r=Be(+e.mediaSeekableEnd),i=n&&r?D(`{currentTime} of {totalTime}`,{currentTime:n,totalTime:r}):D(`video not loaded, unknown time.`);t.setAttribute(`aria-valuetext`,i)};function ql(e){return`
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
          <template shadowrootmode="${ic.shadowRootOptions.mode}">
            ${ic.getTemplateHTML({})}
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
  `}var Jl=(e,t=e.mediaCurrentTime)=>{let n=Number.isFinite(e.mediaSeekableStart)?e.mediaSeekableStart:0,r=Number.isFinite(e.mediaDuration)?e.mediaDuration:e.mediaSeekableEnd;if(Number.isNaN(r))return 0;let i=(t-n)/(r-n);return Math.max(0,Math.min(i,1))},Yl=(e,t=e.range.valueAsNumber)=>{let n=Number.isFinite(e.mediaSeekableStart)?e.mediaSeekableStart:0,r=Number.isFinite(e.mediaDuration)?e.mediaDuration:e.mediaSeekableEnd;return Number.isNaN(r)?0:t*(r-n)+n},Xl=class extends Aa{constructor(){super(),Z(this,jl),Z(this,Pl),Z(this,Il),Z(this,Rl),Z(this,Bl),Z(this,Hl),Z(this,Wl),Z(this,bl,null),Z(this,xl,void 0),Z(this,Sl,void 0),Z(this,Cl,void 0),Z(this,wl,void 0),Z(this,Tl,void 0),Z(this,El,void 0),Z(this,Dl,void 0),Z(this,Ol,void 0),Z(this,kl,void 0),Z(this,Al,()=>{yl(this,jl,Ml).call(this)?X(this,xl).start():X(this,xl).stop()}),Z(this,Nl,e=>{this.dragging||(je(e)&&(this.range.valueAsNumber=e),X(this,kl)||this.updateBar())}),this.shadowRoot.querySelector(`#track`).insertAdjacentHTML(`afterbegin`,`<div id="buffered" part="buffered"></div>`),vl(this,Sl,this.shadowRoot.querySelectorAll(`[part~="box"]`)),vl(this,wl,this.shadowRoot.querySelector(`[part~="preview-box"]`)),vl(this,Tl,this.shadowRoot.querySelector(`[part~="current-box"]`));let e=getComputedStyle(this);vl(this,El,parseInt(e.getPropertyValue(`--media-box-padding-left`))),vl(this,Dl,parseInt(e.getPropertyValue(`--media-box-padding-right`))),vl(this,xl,new gl(this.range,X(this,Nl),60))}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PAUSED,x.MEDIA_DURATION,x.MEDIA_SEEKABLE,x.MEDIA_CURRENT_TIME,x.MEDIA_PREVIEW_IMAGE,x.MEDIA_PREVIEW_TIME,x.MEDIA_PREVIEW_CHAPTER,x.MEDIA_BUFFERED,x.MEDIA_PLAYBACK_RATE,x.MEDIA_LOADING,x.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute(`aria-label`,D(`seek`)),X(this,Al).call(this),vl(this,bl,this.getRootNode()),(e=X(this,bl))==null||e.addEventListener(`transitionstart`,this)}disconnectedCallback(){var e;super.disconnectedCallback(),X(this,xl).stop(),(e=X(this,bl))==null||e.removeEventListener(`transitionstart`,this),vl(this,bl,null)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),t!=n&&(e===x.MEDIA_CURRENT_TIME||e===x.MEDIA_PAUSED||e===x.MEDIA_ENDED||e===x.MEDIA_LOADING||e===x.MEDIA_DURATION||e===x.MEDIA_SEEKABLE?(X(this,xl).update({start:Jl(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),X(this,Al).call(this),Kl(this)):e===x.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===x.MEDIA_DURATION||e===x.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=X(this,Ol),this.updateBar()))}get mediaChaptersCues(){return X(this,Ol)}set mediaChaptersCues(e){vl(this,Ol,e),this.updateSegments(X(this,Ol)?.map(e=>({start:Jl(this,e.startTime),end:Jl(this,e.endTime)})))}get mediaPaused(){return N(this,x.MEDIA_PAUSED)}set mediaPaused(e){P(this,x.MEDIA_PAUSED,e)}get mediaLoading(){return N(this,x.MEDIA_LOADING)}set mediaLoading(e){P(this,x.MEDIA_LOADING,e)}get mediaDuration(){return j(this,x.MEDIA_DURATION)}set mediaDuration(e){M(this,x.MEDIA_DURATION,e)}get mediaCurrentTime(){return j(this,x.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){M(this,x.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return j(this,x.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){M(this,x.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){let e=this.getAttribute(x.MEDIA_BUFFERED);return e?e.split(` `).map(e=>e.split(`:`).map(e=>+e)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(x.MEDIA_BUFFERED);return}let t=e.map(e=>e.join(`:`)).join(` `);this.setAttribute(x.MEDIA_BUFFERED,t)}get mediaSeekable(){let e=this.getAttribute(x.MEDIA_SEEKABLE);if(e)return e.split(`:`).map(e=>+e)}set mediaSeekable(e){if(e==null){this.removeAttribute(x.MEDIA_SEEKABLE);return}this.setAttribute(x.MEDIA_SEEKABLE,e.join(`:`))}get mediaSeekableEnd(){let[,e=this.mediaDuration]=this.mediaSeekable??[];return e}get mediaSeekableStart(){let[e=0]=this.mediaSeekable??[];return e}get mediaPreviewImage(){return F(this,x.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){I(this,x.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return j(this,x.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){M(this,x.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return N(this,x.MEDIA_ENDED)}set mediaEnded(e){P(this,x.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){let e=this.mediaBuffered;if(!e.length)return;let t;if(this.mediaEnded)t=1;else{let n=this.mediaCurrentTime,[,r=this.mediaSeekableStart]=e.find(([e,t])=>e<=n&&n<=t)??[];t=Jl(this,r)}let{style:n}=A(this.shadowRoot,`#buffered`);n.setProperty(`width`,`${t*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector(`slot[name="current"]`).assignedElements().length)return;let e=A(this.shadowRoot,`#current-rail`),t=A(this.shadowRoot,`[part~="current-box"]`),n=yl(this,Pl,Fl).call(this,X(this,Tl)),r=yl(this,Il,Ll).call(this,n,this.range.valueAsNumber),i=yl(this,Rl,zl).call(this,n,this.range.valueAsNumber);e.style.transform=`translateX(${r})`,e.style.setProperty(`--_range-width`,`${n.range.width}`),t.style.setProperty(`--_box-shift`,`${i}`),t.style.setProperty(`--_box-width`,`${n.box.width}px`),t.style.setProperty(`visibility`,`initial`)}handleEvent(e){switch(super.handleEvent(e),e.type){case`input`:yl(this,Wl,Gl).call(this);break;case`pointermove`:yl(this,Bl,Vl).call(this,e);break;case`pointerup`:X(this,kl)&&vl(this,kl,!1);break;case`pointerdown`:vl(this,kl,!0);break;case`pointerleave`:yl(this,Hl,Ul).call(this,null);break;case`transitionstart`:st(e.target,this)&&setTimeout(()=>X(this,Al).call(this),0);break}}};bl=new WeakMap,xl=new WeakMap,Sl=new WeakMap,Cl=new WeakMap,wl=new WeakMap,Tl=new WeakMap,El=new WeakMap,Dl=new WeakMap,Ol=new WeakMap,kl=new WeakMap,Al=new WeakMap,jl=new WeakSet,Ml=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&dt(this)},Nl=new WeakMap,Pl=new WeakSet,Fl=function(e){let t=((this.getAttribute(`bounds`)?ct(this,`#${this.getAttribute(`bounds`)}`):this.parentElement)??this).getBoundingClientRect(),n=this.range.getBoundingClientRect(),r=e.offsetWidth;return{box:{width:r,min:-(n.left-t.left-r/2),max:t.right-n.left-r/2},bounds:t,range:n}},Il=new WeakSet,Ll=function(e,t){let n=`${t*100}%`,{width:r,min:i,max:a}=e.box;if(!r)return n;if(Number.isNaN(i)||(n=`max(${`calc(1 / var(--_range-width) * 100 * ${i}% + var(--media-box-padding-left))`}, ${n})`),!Number.isNaN(a)){let e=`calc(1 / var(--_range-width) * 100 * ${a}% - var(--media-box-padding-right))`;n=`min(${n}, ${e})`}return n},Rl=new WeakSet,zl=function(e,t){let{width:n,min:r,max:i}=e.box,a=t*e.range.width;if(a<r+X(this,El)){let t=e.range.left-e.bounds.left-X(this,El);return`${a-n/2+t}px`}if(a>i-X(this,Dl)){let t=e.bounds.right-e.range.right-X(this,Dl);return`${a+n/2-t-e.range.width}px`}return 0},Bl=new WeakSet,Vl=function(e){let t=[...X(this,Sl)].some(t=>e.composedPath().includes(t));if(!this.dragging&&(t||!e.composedPath().includes(this))){yl(this,Hl,Ul).call(this,null);return}let n=this.mediaSeekableEnd;if(!n)return;let r=A(this.shadowRoot,`#preview-rail`),i=A(this.shadowRoot,`[part~="preview-box"]`),a=yl(this,Pl,Fl).call(this,X(this,wl)),o=(e.clientX-a.range.left)/a.range.width;o=Math.max(0,Math.min(1,o));let s=yl(this,Il,Ll).call(this,a,o),c=yl(this,Rl,zl).call(this,a,o);r.style.transform=`translateX(${s})`,r.style.setProperty(`--_range-width`,`${a.range.width}`),i.style.setProperty(`--_box-shift`,`${c}`),i.style.setProperty(`--_box-width`,`${a.box.width}px`);let l=Math.round(X(this,Cl))-Math.round(o*n);Math.abs(l)<1&&o>.01&&o<.99||(vl(this,Cl,o*n),yl(this,Hl,Ul).call(this,X(this,Cl)))},Hl=new WeakSet,Ul=function(e){this.dispatchEvent(new O.CustomEvent(y.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:e}))},Wl=new WeakSet,Gl=function(){X(this,xl).stop();let e=Yl(this);this.dispatchEvent(new O.CustomEvent(y.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e}))},Xl.shadowRootOptions={mode:`open`},Xl.getContainerTemplateHTML=ql,O.customElements.get(`media-time-range`)||O.customElements.define(`media-time-range`,Xl);var Zl=Xl,Ql=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},$l=(e,t,n)=>(Ql(e,t,`read from private field`),n?n.call(e):t.get(e)),eu=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},tu,nu=1,ru=e=>e.mediaMuted?0:e.mediaVolume,iu=e=>`${Math.round(e*100)}%`,au=class extends Aa{constructor(){super(...arguments),eu(this,tu,()=>{let e=this.range.value,t=new O.CustomEvent(y.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)})}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_VOLUME,x.MEDIA_MUTED,x.MEDIA_VOLUME_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),this.range.setAttribute(`aria-label`,D(`volume`)),this.range.addEventListener(`input`,$l(this,tu))}disconnectedCallback(){this.range.removeEventListener(`input`,$l(this,tu)),super.disconnectedCallback()}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),(e===x.MEDIA_VOLUME||e===x.MEDIA_MUTED)&&(this.range.valueAsNumber=ru(this),this.range.setAttribute(`aria-valuetext`,iu(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return j(this,x.MEDIA_VOLUME,nu)}set mediaVolume(e){M(this,x.MEDIA_VOLUME,e)}get mediaMuted(){return N(this,x.MEDIA_MUTED)}set mediaMuted(e){P(this,x.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return F(this,x.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){I(this,x.MEDIA_VOLUME_UNAVAILABLE,e)}};tu=new WeakMap,O.customElements.get(`media-volume-range`)||O.customElements.define(`media-volume-range`,au);var ou=au;function su(e){return`
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
    `}function cu(){return D(`Loop`)}var lu=class extends K{constructor(){super(...arguments),this.container=null}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_LOOP]}connectedCallback(){super.connectedCallback(),this.container=this.shadowRoot?.querySelector(`#icon`)||null,this.container&&(this.container.textContent=D(`Loop`))}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_LOOP&&this.container&&this.setAttribute(`aria-checked`,this.mediaLoop?`true`:`false`)}get mediaLoop(){return N(this,x.MEDIA_LOOP)}set mediaLoop(e){P(this,x.MEDIA_LOOP,e)}handleClick(){let e=!this.mediaLoop,t=new O.CustomEvent(y.MEDIA_LOOP_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}};lu.getSlotTemplateHTML=su,lu.getTooltipContentHTML=cu,O.customElements.get(`media-loop-button`)||O.customElements.define(`media-loop-button`,lu);var uu=lu;function Q(e){if(typeof e==`boolean`)return e?``:void 0;if(typeof e!=`function`){if(Array.isArray(e)&&e.every(e=>typeof e==`string`||typeof e==`number`||typeof e==`boolean`))return e.join(` `);if(!(typeof e==`object`&&e))return e}}v({tagName:`media-gesture-receiver`,elementClass:St,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-container`,elementClass:en,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var du=v({tagName:`media-controller`,elementClass:Br,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-tooltip`,elementClass:Wr,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-chrome-button`,elementClass:oi,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-airplay-button`,elementClass:fi,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var fu=v({tagName:`media-captions-button`,elementClass:xi,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-cast-button`,elementClass:Oi,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-chrome-dialog`,elementClass:$i,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-chrome-range`,elementClass:ja,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var pu=v({tagName:`media-control-bar`,elementClass:za,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-text-display`,elementClass:Ja,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-duration-display`,elementClass:no,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-error-dialog`,elementClass:_o,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-keyboard-shortcuts-dialog`,elementClass:Eo,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var mu=v({tagName:`media-fullscreen-button`,elementClass:Ro,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-live-button`,elementClass:qo,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var hu=v({tagName:`media-loading-indicator`,elementClass:as,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),gu=v({tagName:`media-mute-button`,elementClass:ps,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),_u=v({tagName:`media-pip-button`,elementClass:ys,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),vu=v({tagName:`media-playback-rate-button`,elementClass:As,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),yu=v({tagName:`media-play-button`,elementClass:Ls,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-poster-image`,elementClass:Us,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-preview-chapter-display`,elementClass:Xs,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-preview-thumbnail`,elementClass:ic,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-preview-time-display`,elementClass:dc,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var bu=v({tagName:`media-seek-backward-button`,elementClass:bc,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),xu=v({tagName:`media-seek-forward-button`,elementClass:kc,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Su=v({tagName:`media-time-display`,elementClass:tl,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Cu=v({tagName:`media-time-range`,elementClass:Zl,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),wu=v({tagName:`media-volume-range`,elementClass:ou,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-loop-button`,elementClass:uu,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var $=t(),Tu={noTooltip:!0};function Eu({isMobile:e,showPip:t,showCaptionsButton:n,topChrome:r,extraControls:i,children:a,className:o,style:s}){return(0,$.jsxs)(du,{className:`ts-player ${o||``}`.trim(),autohide:`2`,style:s,children:[a,(0,$.jsx)(hu,{slot:`centered-chrome`}),(0,$.jsx)(`div`,{slot:`top-chrome`,className:`ts-player-top`,children:r}),(0,$.jsxs)(pu,{className:`ts-player-bar`,children:[(0,$.jsx)(yu,{...Tu,className:e?`ts-player-play-lg`:void 0}),(0,$.jsx)(bu,{...Tu,seekOffset:10}),(0,$.jsx)(xu,{...Tu,seekOffset:10}),(0,$.jsx)(Su,{showDuration:!0}),(0,$.jsx)(Cu,{}),(0,$.jsx)(gu,{...Tu}),e?null:(0,$.jsx)(wu,{}),i,n?(0,$.jsx)(fu,{...Tu}):null,(0,$.jsx)(vu,{...Tu,rates:[.75,1,1.25,1.5,2]}),t?(0,$.jsx)(_u,{...Tu}):null,(0,$.jsx)(mu,{...Tu})]})]})}var Du=e=>!!(e.canPlayType(`application/vnd.apple.mpegurl`)||e.canPlayType(`application/x-mpegURL`));function Ou({enabled:e,open:t,video:n,src:r,playbackRate:i=1,onLoading:a,onError:o,onNotSupported:s,onSubtitleTracks:c,onSubtitleTrack:l,onDuration:u}){let d=(0,_.useRef)(null),f=(0,_.useRef)(a),p=(0,_.useRef)(o),m=(0,_.useRef)(s),h=(0,_.useRef)(c),ee=(0,_.useRef)(l),g=(0,_.useRef)(u);return(0,_.useEffect)(()=>{f.current=a,p.current=o,m.current=s,h.current=c,ee.current=l,g.current=u}),(0,_.useEffect)(()=>{if(!e||!t||!n||!r)return;let a=null,o=!1;f.current?.(!0),h.current?.([]);let s=()=>{let e=(a?.subtitleTracks||[]).map((e,t)=>({id:t,name:e.name,lang:e.lang}));h.current?.(e)};return he.isSupported()?(a=new he,d.current=a,a.on(he.Events.MANIFEST_PARSED,()=>{s(),ee.current?.(a?.subtitleTrack??-1),n.playbackRate=i,n.play().catch(()=>{})}),a.on(he.Events.LEVEL_LOADED,(e,t)=>{let n=t.details?.totalduration;typeof n==`number`&&g.current?.(n)}),a.on(he.Events.SUBTITLE_TRACKS_UPDATED,s),a.on(he.Events.SUBTITLE_TRACK_SWITCH,(e,t)=>ee.current?.(t.id)),a.on(he.Events.ERROR,(e,t)=>{!t.fatal||!a||(t.type===he.ErrorTypes.NETWORK_ERROR?a.startLoad():t.type===he.ErrorTypes.MEDIA_ERROR?a.recoverMediaError():(a.stopLoad(),f.current?.(!1),p.current?.()))}),a.loadSource(r),a.attachMedia(n)):Du(n)?(o=!0,n.src=r,n.load(),n.playbackRate=i,n.play().catch(()=>{})):m.current?.(),()=>{d.current===a&&(d.current=null),a?.destroy(),o&&(n.pause(),n.removeAttribute(`src`),n.load()),h.current?.([]),ee.current?.(-1)}},[e,t,n,r]),d}var ku=5e3,Au=5;function ju({enabled:e,hash:t,fileIndex:n,title:r,initialTimecode:i=0,video:a,onViewedChange:o}){let s=(0,_.useRef)(0),c=(0,_.useRef)(!1),l=(0,_.useRef)(o);(0,_.useEffect)(()=>{l.current=o},[o]),(0,_.useEffect)(()=>{c.current=!1},[t,n,i]);let u=(0,_.useCallback)(async i=>{if(!(!e||!t||n==null))try{await h(t,n,i),g({hash:t,fileIndex:n,title:r||t,fileName:r||String(n),timecode:i}),l.current?.()}catch{}},[e,t,n,r]);return{flushTimecode:(0,_.useCallback)(()=>{let t=a;!t||!e||u(t.currentTime)},[a,e,u]),onTimeUpdate:(0,_.useCallback)(()=>{let t=a;if(!t||!e)return;let n=Date.now();n-s.current<ku||(s.current=n,u(t.currentTime))},[a,e,u]),applyResumeIfNeeded:(0,_.useCallback)(()=>{let e=a;if(!e||c.current)return;if(!(i>Au)){c.current=!0;return}let t=e.duration;if(Number.isFinite(t)&&t>0&&i>=t-Au){c.current=!0;return}e.currentTime=i,c.current=!0},[a,i]),saveTimecode:u}}var Mu=3e4;function Nu(e){switch(e.split(`?`)[0].split(`.`).pop()?.toLowerCase()){case`mp4`:return`video/mp4`;case`ogg`:case`ogv`:return`video/ogg`;case`webm`:return`video/webm`;default:return``}}var Pu=e=>!!(e.canPlayType(`application/vnd.apple.mpegurl`)||e.canPlayType(`application/x-mpegURL`)),Fu=()=>typeof document<`u`&&`pictureInPictureEnabled`in document&&!!document.pictureInPictureEnabled;function Iu({videoSrc:e,downloadSrc:t=e,title:r,onNotSupported:f,hls:h=!1,heartbeatSrc:g=``,showTrigger:_e=!0,inlineTrigger:ve=!1,inlineTriggerPrimary:ye=!1,initiallyOpen:be=!1,onClose:v,captionSrc:xe,hash:y,fileIndex:b,initialTimecode:Se=0,trackTimecode:Ce=!1,onViewedChange:x,audioTracks:we=[],audioIndex:Te=0,onAudioIndexChange:Ee}){let{t:S}=m(),C=a(ie(`dialog`)),{setImmersive:w}=u(),De=(0,_.useRef)(null),Oe=(0,_.useRef)(f),ke=(0,_.useRef)(null),[T,Ae]=(0,_.useState)(be),[E,je]=(0,_.useState)(null),[Me,Ne]=(0,_.useState)(!0),[Pe,Fe]=(0,_.useState)(!1),[Ie,Le]=(0,_.useState)(!1),[D,Re]=(0,_.useState)(!1),[ze,Be]=(0,_.useState)([]),[Ve,He]=(0,_.useState)(!1),[Ue,We]=(0,_.useState)(Te),[Ge,Ke]=(0,_.useState)(e),[qe,Je]=(0,_.useState)(we),Ye=!!(y&&b!=null&&Ce),O=h&&!!y&&b!=null&&qe.length>1,k=Fu(),Xe=h?ze.length>0:!!xe,Ze=C?me:D?pe:fe,Qe=C?void 0:D?`min(86dvh, calc(100dvh - 4rem))`:`min(72dvh, 40rem)`,$e=(0,_.useCallback)(e=>{De.current=e,je(e)},[]);(0,_.useEffect)(()=>{Oe.current=f},[f]),(0,_.useEffect)(()=>{Ke(e),We(Te),Je(we),Fe(!1),Ne(!0)},[e,Te,we]),Ou({enabled:h,open:T,video:E,src:Ge,onLoading:Ne,onError:()=>Fe(!0),onNotSupported:()=>Oe.current?.(),onSubtitleTracks:Be});let{flushTimecode:et,onTimeUpdate:tt,applyResumeIfNeeded:nt}=ju({enabled:Ye,hash:y,fileIndex:b,title:r,initialTimecode:Se,video:E,onViewedChange:x}),rt=(0,_.useCallback)(()=>Ae(!0),[]),it=(0,_.useCallback)(()=>{et(),Ae(!1),Fe(!1),He(!1),Re(!1),v?.()},[et,v]),at=c({isOpen:T,onOpenChange:e=>{e?Ae(!0):it()}});d(T),(0,_.useEffect)(()=>{if(!C||!T){w(!1);return}return w(!0),()=>w(!1)},[C,T,w]),(0,_.useEffect)(()=>{if(!T){le(null);return}return le(null),()=>le(null)},[T]),(0,_.useEffect)(()=>{let e=document.createElement(`video`);(h?he.isSupported()||Pu(e):e.canPlayType(Nu(Ge)))||Oe.current?.()},[h,Ge]),(0,_.useEffect)(()=>{if(!(!T||h||!E))return Ne(!0),E.src=Ge,E.load(),E.play().catch(()=>{}),()=>{E.pause(),E.removeAttribute(`src`),E.load()}},[T,h,E,Ge]),(0,_.useEffect)(()=>{if(!T||!g)return;let e=window.setInterval(()=>{fetch(g,{cache:`no-store`}).catch(()=>{})},Mu);return()=>window.clearInterval(e)},[g,T]),(0,_.useEffect)(()=>{let e=()=>Le(!!document.fullscreenElement);return document.addEventListener(`fullscreenchange`,e),()=>document.removeEventListener(`fullscreenchange`,e)},[]),(0,_.useEffect)(()=>{if(!E||ke.current==null)return;let e=ke.current,t=()=>{ke.current!=null&&(E.currentTime=e,ke.current=null,E.play().catch(()=>{}))};return E.addEventListener(`loadedmetadata`,t,{once:!0}),()=>E.removeEventListener(`loadedmetadata`,t)},[E,Ge]),(0,_.useEffect)(()=>{if(!T||!h||!y||b==null)return;if(we.length){Je(we);return}let e=!1;return l.get(ce(y,b)).then(({data:t})=>{e||Je(se(t))}).catch(()=>{}),()=>{e=!0}},[T,h,y,b,we]);let ot=e=>{if(!y||b==null)return;let t=De.current;t&&(ke.current=t.currentTime),We(e),Ke(ae(y,b,e)),He(!1),Ee?.(e)},st=ne,ct=O?(0,$.jsxs)(n,{isOpen:Ve,onOpenChange:He,children:[(0,$.jsx)(n.Trigger,{children:(0,$.jsx)(i,{isIconOnly:!0,variant:`ghost`,className:`${ue} text-white hover-fine:bg-white/15`,"aria-label":S(`SelectAudioTrack`),children:(0,$.jsx)(te,{...st,"aria-hidden":!0})})}),(0,$.jsxs)(n.Content,{placement:`bottom end`,className:`max-h-72 w-72 overflow-y-auto border border-white/10 bg-neutral-950/95 p-1 backdrop-blur-xl`,children:[(0,$.jsx)(`p`,{className:`px-2 py-1.5 text-[11px] font-semibold tracking-wide text-muted uppercase`,children:S(`SelectAudioTrack`)}),qe.map((e,t)=>{let{title:n,meta:r}=re(e,t);return(0,$.jsx)(i,{variant:t===Ue?`secondary`:`ghost`,className:`h-auto w-full justify-start gap-2 py-2`,onPress:()=>ot(t),children:(0,$.jsxs)(`span`,{className:`min-w-0 flex-1 text-left`,children:[(0,$.jsx)(`span`,{className:`block truncate text-sm font-medium`,children:n}),r?(0,$.jsx)(`span`,{className:`mt-0.5 block truncate text-xs text-muted`,children:r}):null]})},t)})]})]}):null,lt=C?null:(0,$.jsx)(i,{isIconOnly:!0,variant:`ghost`,className:`${ue} text-white hover-fine:bg-white/15`,"aria-label":S(D?`ExitFullscreen`:`ExpandPlayer`),onPress:()=>Re(e=>!e),children:D?(0,$.jsx)(ge,{...st,"aria-hidden":!0}):(0,$.jsx)(p,{...st,"aria-hidden":!0})});return(0,$.jsxs)($.Fragment,{children:[_e&&(ve?(0,$.jsxs)(i,{variant:ye?`primary`:`secondary`,size:`sm`,onPress:rt,className:ye?`min-h-10 shrink-0 px-3`:`min-h-10 min-w-[72px] max-w-full flex-1`,children:[ye?(0,$.jsx)(oe,{...de,fill:`currentColor`,"aria-hidden":!0}):null,S(`Play`)]}):(0,$.jsxs)(i,{variant:`secondary`,onPress:rt,children:[(0,$.jsx)(oe,{...de,"aria-hidden":!0}),S(`Play`)]})),(0,$.jsx)(s,{state:at,children:(0,$.jsx)(s.Backdrop,{isDismissable:!Ie,className:`bg-black/75 backdrop-blur-sm`,children:(0,$.jsx)(s.Container,{size:C?`full`:`lg`,scroll:`inside`,className:C?`ts-player-modal-full h-dvh p-0`:`p-4 sm:p-5`,children:(0,$.jsx)(s.Dialog,{className:C?`h-dvh max-h-dvh overflow-hidden rounded-none border-0 bg-black text-white shadow-none`:`overflow-hidden border border-white/10 bg-[#0a0e0c] text-white shadow-2xl shadow-black/50`,style:Ze,children:(0,$.jsxs)(s.Body,{className:C?`flex h-full min-h-0 flex-col gap-0 p-0`:`gap-0 p-0`,children:[Pe?(0,$.jsxs)(`div`,{className:`space-y-3 p-4`,children:[(0,$.jsx)(o,{status:`danger`,children:S(`PlaybackError`)}),(0,$.jsx)(i,{variant:`secondary`,onPress:()=>window.open(t,`_blank`,`noopener,noreferrer`),children:S(`OpenLink`)})]}):(0,$.jsx)(Eu,{isMobile:C,showPip:k,showCaptionsButton:Xe,className:C?`ts-player--mobile`:`ts-player--desktop`,style:C?{width:`100%`,height:`100%`}:{width:`100%`,maxHeight:Qe,aspectRatio:`16 / 9`},topChrome:(0,$.jsxs)(`div`,{className:`flex items-start gap-2 px-3 pb-10 pt-[max(0.75rem,env(safe-area-inset-top))]`,children:[(0,$.jsx)(`p`,{className:`min-w-0 flex-1 truncate text-sm font-semibold text-white drop-shadow`,title:r||S(`Play`),children:r||S(`Play`)}),ct,lt,(0,$.jsx)(i,{isIconOnly:!0,variant:`ghost`,className:`${ue} text-white hover-fine:bg-white/15`,"aria-label":S(`Close`),onPress:it,children:(0,$.jsx)(ee,{...st,"aria-hidden":!0})})]}),extraControls:null,children:(0,$.jsx)(`video`,{slot:`media`,ref:$e,autoPlay:!0,playsInline:!0,crossOrigin:`anonymous`,className:`ts-player-video`,onTimeUpdate:()=>{tt(),Me&&Ne(!1)},onLoadedMetadata:()=>{Ne(!1),Fe(!1),nt()},onWaiting:()=>Ne(!0),onCanPlay:()=>{Ne(!1),Fe(!1)},onPlaying:()=>Ne(!1),onPause:et,onError:()=>{Ne(!1),Fe(!0)},children:!h&&xe?(0,$.jsx)(`track`,{kind:`captions`,src:xe,srcLang:`und`,label:`Captions`,default:!0}):null})}),Me&&!Pe?(0,$.jsx)(`div`,{className:`pointer-events-none absolute inset-0 grid place-items-center`}):null]})})})})})]})}export{Iu as default};