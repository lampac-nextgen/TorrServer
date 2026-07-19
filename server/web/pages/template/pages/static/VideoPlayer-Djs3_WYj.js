import{i as e}from"./rolldown-runtime-BgaNhQyE.js";import{A as t,C as n,M as r,O as i,b as a,l as o,o as s,r as c,x as l}from"./heroui-DMxKMzqy.js";import{i as u}from"./vendor-D73vhE3s.js";import{n as d,r as f}from"./ModalOpenContext-B5SCE0ZV.js";import{a as p,l as m,n as h}from"./authCredentials-ycovNgUV.js";import{t as g}from"./createLucideIcon-DycWlq1m.js";import{t as ee}from"./maximize-2-YP4IthaJ.js";import{t as te}from"./useTranslation-BnNnnMzO.js";import{B as ne,L as re,R as ie,Z as ae,a as oe,c as se,et as ce,i as le,mt as ue,s as de,v as fe,w as pe,y as me}from"./index-BWT8-zQV.js";import{d as he,l as ge,u as _e}from"./dialogSizes-DYo2rf0H.js";import{t as ve}from"./hls-BgLaj4xL.js";var ye=g(`minimize-2`,[[`path`,{d:`m14 10 7-7`,key:`oa77jy`}],[`path`,{d:`M20 10h-6V4`,key:`mjg0md`}],[`path`,{d:`m3 21 7-7`,key:`tjx5ai`}],[`path`,{d:`M4 14h6v6`,key:`rmj7iw`}]]),_=e(r(),1),be=`torrserver:now-playing`,xe=e=>{try{window.dispatchEvent(new CustomEvent(be,{detail:e}))}catch{}},Se=new Set([`style`,`children`,`ref`,`key`,`suppressContentEditableWarning`,`suppressHydrationWarning`,`dangerouslySetInnerHTML`]),Ce={className:`class`,htmlFor:`for`};function we(e){return e.toLowerCase()}function Te(e){if(typeof e==`boolean`)return e?``:void 0;if(typeof e!=`function`&&!(typeof e==`object`&&e))return e}function v({react:e,tagName:t,elementClass:n,events:r,displayName:i,defaultProps:a,toAttributeName:o=we,toAttributeValue:s=Te}){let c=Number.parseInt(e.version)>=19,l=e.forwardRef((i,l)=>{let u=e.useRef(null),d=e.useRef(new Map),f={},p={},m={},h={};for(let[e,t]of Object.entries(i)){if(Se.has(e)){m[e]=t;continue}let r=o(Ce[e]??e);if(n.prototype&&e in n.prototype&&!(e in(globalThis.HTMLElement?.prototype??{}))&&!n.observedAttributes?.some(e=>e===r)){h[e]=t;continue}if(e.startsWith(`on`)){f[e]=t;continue}let i=s(t);r&&i!=null&&(p[r]=String(i),c||(m[r]=i)),r&&c&&(i===Te(t)?m[r]=t:m[r]=i)}if(typeof window<`u`){for(let t in f){let n=f[t],i=t.endsWith(`Capture`),a=(r?.[t]??t.slice(2).toLowerCase()).slice(0,i?-7:void 0);e.useLayoutEffect(()=>{let e=u?.current;if(!(!e||typeof n!=`function`))return e.addEventListener(a,n,i),()=>{e.removeEventListener(a,n,i)}},[u?.current,n])}e.useLayoutEffect(()=>{if(u.current===null)return;let e=new Map;for(let t in h)Ee(u.current,t,h[t]),d.current.delete(t),e.set(t,h[t]);for(let[e,t]of d.current)Ee(u.current,e,void 0);d.current=e})}if(typeof window>`u`&&n?.getTemplateHTML&&n?.shadowRootOptions){let{mode:t,delegatesFocus:r}=n.shadowRootOptions;m.children=[e.createElement(`template`,{shadowrootmode:t,shadowrootdelegatesfocus:r,dangerouslySetInnerHTML:{__html:n.getTemplateHTML(p,i)},key:`ce-la-react-ssr-template-shadow-root`}),m.children]}return e.createElement(t,{...a,...m,ref:e.useCallback(e=>{u.current=e,typeof l==`function`?l(e):l!==null&&(l.current=e)},[l])},m.children)});return l.displayName=i??n.name,l}function Ee(e,t,n){e[t]=n,n==null&&t in(globalThis.HTMLElement?.prototype??{})&&e.removeAttribute(t)}var y={MEDIA_PLAY_REQUEST:`mediaplayrequest`,MEDIA_PAUSE_REQUEST:`mediapauserequest`,MEDIA_MUTE_REQUEST:`mediamuterequest`,MEDIA_UNMUTE_REQUEST:`mediaunmuterequest`,MEDIA_LOOP_REQUEST:`medialooprequest`,MEDIA_VOLUME_REQUEST:`mediavolumerequest`,MEDIA_SEEK_REQUEST:`mediaseekrequest`,MEDIA_AIRPLAY_REQUEST:`mediaairplayrequest`,MEDIA_ENTER_FULLSCREEN_REQUEST:`mediaenterfullscreenrequest`,MEDIA_EXIT_FULLSCREEN_REQUEST:`mediaexitfullscreenrequest`,MEDIA_PREVIEW_REQUEST:`mediapreviewrequest`,MEDIA_ENTER_PIP_REQUEST:`mediaenterpiprequest`,MEDIA_EXIT_PIP_REQUEST:`mediaexitpiprequest`,MEDIA_ENTER_CAST_REQUEST:`mediaentercastrequest`,MEDIA_EXIT_CAST_REQUEST:`mediaexitcastrequest`,MEDIA_SHOW_TEXT_TRACKS_REQUEST:`mediashowtexttracksrequest`,MEDIA_HIDE_TEXT_TRACKS_REQUEST:`mediahidetexttracksrequest`,MEDIA_SHOW_SUBTITLES_REQUEST:`mediashowsubtitlesrequest`,MEDIA_DISABLE_SUBTITLES_REQUEST:`mediadisablesubtitlesrequest`,MEDIA_TOGGLE_SUBTITLES_REQUEST:`mediatogglesubtitlesrequest`,MEDIA_PLAYBACK_RATE_REQUEST:`mediaplaybackraterequest`,MEDIA_RENDITION_REQUEST:`mediarenditionrequest`,MEDIA_AUDIO_TRACK_REQUEST:`mediaaudiotrackrequest`,MEDIA_SEEK_TO_LIVE_REQUEST:`mediaseektoliverequest`,REGISTER_MEDIA_STATE_RECEIVER:`registermediastatereceiver`,UNREGISTER_MEDIA_STATE_RECEIVER:`unregistermediastatereceiver`},b={MEDIA_CHROME_ATTRIBUTES:`mediachromeattributes`,MEDIA_CONTROLLER:`mediacontroller`},De={MEDIA_AIRPLAY_UNAVAILABLE:`mediaAirplayUnavailable`,MEDIA_AUDIO_TRACK_ENABLED:`mediaAudioTrackEnabled`,MEDIA_AUDIO_TRACK_LIST:`mediaAudioTrackList`,MEDIA_AUDIO_TRACK_UNAVAILABLE:`mediaAudioTrackUnavailable`,MEDIA_BUFFERED:`mediaBuffered`,MEDIA_CAST_UNAVAILABLE:`mediaCastUnavailable`,MEDIA_CHAPTERS_CUES:`mediaChaptersCues`,MEDIA_CURRENT_TIME:`mediaCurrentTime`,MEDIA_DURATION:`mediaDuration`,MEDIA_ENDED:`mediaEnded`,MEDIA_ERROR:`mediaError`,MEDIA_ERROR_CODE:`mediaErrorCode`,MEDIA_ERROR_MESSAGE:`mediaErrorMessage`,MEDIA_FULLSCREEN_UNAVAILABLE:`mediaFullscreenUnavailable`,MEDIA_HAS_PLAYED:`mediaHasPlayed`,MEDIA_HEIGHT:`mediaHeight`,MEDIA_IS_AIRPLAYING:`mediaIsAirplaying`,MEDIA_IS_CASTING:`mediaIsCasting`,MEDIA_IS_FULLSCREEN:`mediaIsFullscreen`,MEDIA_IS_PIP:`mediaIsPip`,MEDIA_LOADING:`mediaLoading`,MEDIA_MUTED:`mediaMuted`,MEDIA_LOOP:`mediaLoop`,MEDIA_PAUSED:`mediaPaused`,MEDIA_PIP_UNAVAILABLE:`mediaPipUnavailable`,MEDIA_PLAYBACK_RATE:`mediaPlaybackRate`,MEDIA_PREVIEW_CHAPTER:`mediaPreviewChapter`,MEDIA_PREVIEW_COORDS:`mediaPreviewCoords`,MEDIA_PREVIEW_IMAGE:`mediaPreviewImage`,MEDIA_PREVIEW_TIME:`mediaPreviewTime`,MEDIA_RENDITION_LIST:`mediaRenditionList`,MEDIA_RENDITION_SELECTED:`mediaRenditionSelected`,MEDIA_RENDITION_UNAVAILABLE:`mediaRenditionUnavailable`,MEDIA_SEEKABLE:`mediaSeekable`,MEDIA_STREAM_TYPE:`mediaStreamType`,MEDIA_SUBTITLES_LIST:`mediaSubtitlesList`,MEDIA_SUBTITLES_SHOWING:`mediaSubtitlesShowing`,MEDIA_TARGET_LIVE_WINDOW:`mediaTargetLiveWindow`,MEDIA_TIME_IS_LIVE:`mediaTimeIsLive`,MEDIA_VOLUME:`mediaVolume`,MEDIA_VOLUME_LEVEL:`mediaVolumeLevel`,MEDIA_VOLUME_UNAVAILABLE:`mediaVolumeUnavailable`,MEDIA_LANG:`mediaLang`,MEDIA_WIDTH:`mediaWidth`},Oe=Object.entries(De),x=Oe.reduce((e,[t,n])=>(e[t]=n.toLowerCase(),e),{}),ke=Oe.reduce((e,[t,n])=>(e[t]=n.toLowerCase(),e),{USER_INACTIVE_CHANGE:`userinactivechange`,BREAKPOINTS_CHANGE:`breakpointchange`,BREAKPOINTS_COMPUTED:`breakpointscomputed`});Object.entries(ke).reduce((e,[t,n])=>{let r=x[t];return r&&(e[n]=r),e},{userinactivechange:`userinactive`});var Ae=Object.entries(x).reduce((e,[t,n])=>{let r=ke[t];return r&&(e[n]=r),e},{userinactive:`userinactivechange`}),S={SUBTITLES:`subtitles`,CAPTIONS:`captions`,DESCRIPTIONS:`descriptions`,CHAPTERS:`chapters`,METADATA:`metadata`},je={DISABLED:`disabled`,HIDDEN:`hidden`,SHOWING:`showing`},Me={MOUSE:`mouse`,PEN:`pen`,TOUCH:`touch`},C={UNAVAILABLE:`unavailable`,UNSUPPORTED:`unsupported`},w={LIVE:`live`,ON_DEMAND:`on-demand`,UNKNOWN:`unknown`},T={INLINE:`inline`,FULLSCREEN:`fullscreen`,PICTURE_IN_PICTURE:`picture-in-picture`};function Ne(e){return e?.map(Pe).join(` `)}function Pe(e){if(e){let{id:t,width:n,height:r}=e;return[t,n,r].filter(e=>e!=null).join(`:`)}}function Fe(e){return e?.map(Ie).join(` `)}function Ie(e){if(e){let{id:t,kind:n,language:r,label:i}=e;return[t,n,r,i].filter(e=>e!=null).join(`:`)}}function Le(e){return typeof e==`number`&&!Number.isNaN(e)&&Number.isFinite(e)}var Re=e=>new Promise(t=>setTimeout(t,e)),ze={en:{"Start airplay":`Start airplay`,"Stop airplay":`Stop airplay`,Audio:`Audio`,Captions:`Captions`,"Enable captions":`Enable captions`,"Disable captions":`Disable captions`,"Start casting":`Start casting`,"Stop casting":`Stop casting`,"Enter fullscreen mode":`Enter fullscreen mode`,"Exit fullscreen mode":`Exit fullscreen mode`,Mute:`Mute`,Unmute:`Unmute`,Loop:`Loop`,"Enter picture in picture mode":`Enter picture in picture mode`,"Exit picture in picture mode":`Exit picture in picture mode`,Play:`Play`,Pause:`Pause`,"Playback rate":`Playback rate`,"Playback rate {playbackRate}":`Playback rate {playbackRate}`,Quality:`Quality`,"Seek backward":`Seek backward`,"Seek forward":`Seek forward`,Settings:`Settings`,Auto:`Auto`,"audio player":`audio player`,"video player":`video player`,volume:`volume`,seek:`seek`,"closed captions":`closed captions`,"current playback rate":`current playback rate`,"playback time":`playback time`,"media loading":`media loading`,settings:`settings`,"audio tracks":`audio tracks`,quality:`quality`,play:`play`,pause:`pause`,mute:`mute`,unmute:`unmute`,"chapter: {chapterName}":`chapter: {chapterName}`,live:`live`,Off:`Off`,"start airplay":`start airplay`,"stop airplay":`stop airplay`,"start casting":`start casting`,"stop casting":`stop casting`,"enter fullscreen mode":`enter fullscreen mode`,"exit fullscreen mode":`exit fullscreen mode`,"enter picture in picture mode":`enter picture in picture mode`,"exit picture in picture mode":`exit picture in picture mode`,"seek to live":`seek to live`,"playing live":`playing live`,"seek back {seekOffset} seconds":`seek back {seekOffset} seconds`,"seek forward {seekOffset} seconds":`seek forward {seekOffset} seconds`,"Network Error":`Network Error`,"Decode Error":`Decode Error`,"Source Not Supported":`Source Not Supported`,"Encryption Error":`Encryption Error`,"A network error caused the media download to fail.":`A network error caused the media download to fail.`,"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":`A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.`,"An unsupported error occurred. The server or network failed, or your browser does not support this format.":`An unsupported error occurred. The server or network failed, or your browser does not support this format.`,"The media is encrypted and there are no keys to decrypt it.":`The media is encrypted and there are no keys to decrypt it.`,hour:`hour`,hours:`hours`,minute:`minute`,minutes:`minutes`,second:`second`,seconds:`seconds`,"{time} remaining":`{time} remaining`,"{currentTime} of {totalTime}":`{currentTime} of {totalTime}`,"video not loaded, unknown time.":`video not loaded, unknown time.`}},Be=globalThis.navigator?.language||`en`,Ve=e=>{Be=e},He=e=>{let[t]=Be.split(`-`);return ze[Be]?.[e]||ze[t]?.[e]||ze.en?.[e]||e},Ue=()=>{let[e]=Be.split(`-`);return ze[Be]?Be:ze[e]?e:`en`},E=(e,t={})=>He(e).replace(/\{(\w+)\}/g,(e,n)=>n in t?String(t[n]):`{${n}}`),We=[{singular:`hour`,plural:`hours`},{singular:`minute`,plural:`minutes`},{singular:`second`,plural:`seconds`}],Ge=(e,t)=>`${e} ${E(e===1?We[t].singular:We[t].plural)}`,Ke=e=>{if(!Le(e))return``;let t=Math.abs(e),n=t!==e,r=new Date(0,0,0,0,0,t,0),i=[r.getHours(),r.getMinutes(),r.getSeconds()].map((e,t)=>e&&Ge(e,t)).filter(e=>e).join(`, `);return n?E(`{time} remaining`,{time:i}):i};function qe(e,t){let n=!1;e<0&&(n=!0,e=0-e),e=e<0?0:e;let r=Math.floor(e%60),i=Math.floor(e/60%60),a=Math.floor(e/3600),o=Math.floor(t/60%60),s=Math.floor(t/3600);return(isNaN(e)||e===1/0)&&(a=i=r=`0`),a=a>0||s>0?a+`:`:``,i=((a||o>=10)&&i<10?`0`+i:i)+`:`,r=r<10?`0`+r:r,(n?`-`:``)+a+i+r}Object.freeze({length:0,start(e){let t=e>>>0;if(t>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(e){let t=e>>>0;if(t>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);return 0}});var Je=class{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}},Ye=class extends Je{},Xe=class extends Ye{constructor(){super(...arguments),this.role=null}},Ze=class{observe(){}unobserve(){}disconnect(){}},Qe={createElement:function(){return new $e.HTMLElement},createElementNS:function(){return new $e.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(e){return!1}},$e={ResizeObserver:Ze,document:Qe,Node:Ye,Element:Xe,HTMLElement:class extends Xe{constructor(){super(...arguments),this.innerHTML=``}get content(){return new $e.DocumentFragment}},DocumentFragment:class extends Je{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(e){return null},setItem(e,t){},removeItem(e){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return``}},matchMedia(e){return{matches:!1,media:e}},DOMParser:class{parseFromString(e,t){return{body:{textContent:e}}}}},et=`global`in globalThis&&(globalThis==null?void 0:globalThis.global)===globalThis||typeof window>`u`||window.customElements===void 0,tt=Object.keys($e).every(e=>e in globalThis),D=et&&!tt?$e:globalThis,O=et&&!tt?Qe:globalThis.document,nt=new WeakMap,rt=e=>{let t=nt.get(e);return t||nt.set(e,t=new Set),t},it=new D.ResizeObserver(e=>{for(let t of e)for(let e of rt(t.target))e(t)});function at(e,t){rt(e).add(t),it.observe(e)}function ot(e,t){let n=rt(e);n.delete(t),n.size||it.unobserve(e)}function k(e){let t={};for(let n of e)t[n.name]=n.value;return t}function st(e){return ct(e)??pt(e,`media-controller`)}function ct(e){let{MEDIA_CONTROLLER:t}=b,n=e.getAttribute(t);if(n)return ht(e)?.getElementById(n)}var lt=(e,t,n=`.value`)=>{let r=e.querySelector(n);r&&(r.textContent=t)},ut=(e,t)=>{let n=`slot[name="${t}"]`,r=e.shadowRoot.querySelector(n);return r?r.children:[]},dt=(e,t)=>ut(e,t)[0],ft=(e,t)=>!e||!t?!1:e?.contains(t)?!0:ft(e,t.getRootNode().host),pt=(e,t)=>e?e.closest(t)||pt(e.getRootNode().host,t):null;function mt(e=document){let t=e?.activeElement;return t?mt(t.shadowRoot)??t:null}function ht(e){let t=(e?.getRootNode)?.call(e);return t instanceof ShadowRoot||t instanceof Document?t:null}function gt(e,{depth:t=3,checkOpacity:n=!0,checkVisibilityCSS:r=!0}={}){if(e.checkVisibility)return e.checkVisibility({checkOpacity:n,checkVisibilityCSS:r});let i=e;for(;i&&t>0;){let e=getComputedStyle(i);if(n&&e.opacity===`0`||r&&e.visibility===`hidden`||e.display===`none`)return!1;i=i.parentElement,t--}return!0}function _t(e,t,n,r){let i=r.x-n.x,a=r.y-n.y,o=i*i+a*a;if(o===0)return 0;let s=((e-n.x)*i+(t-n.y)*a)/o;return Math.max(0,Math.min(1,s))}function A(e,t){return vt(e,e=>e===t)||yt(e,t)}function vt(e,t){let n;for(n of e.querySelectorAll(`style:not([media])`)??[]){let e;try{e=n.sheet?.cssRules}catch{continue}for(let n of e??[])if(t(n.selectorText))return n}}function yt(e,t){let n=e.querySelectorAll(`style:not([media])`)??[],r=n?.[n.length-1];if(!r?.sheet)return console.warn(`Media Chrome: No style sheet found on style tag of`,e),{style:{setProperty:()=>{},removeProperty:()=>``,getPropertyValue:()=>``}};let i=r?.sheet.insertRule(`${t}{}`,r.sheet.cssRules.length);return r.sheet.cssRules?.[i]}function j(e,t,n=NaN){let r=e.getAttribute(t);return r==null?n:+r}function M(e,t,n){let r=+n;if(n==null||Number.isNaN(r)){e.hasAttribute(t)&&e.removeAttribute(t);return}j(e,t,void 0)!==r&&e.setAttribute(t,`${r}`)}function N(e,t){return e.hasAttribute(t)}function P(e,t,n){if(n==null){e.hasAttribute(t)&&e.removeAttribute(t);return}N(e,t)!=n&&e.toggleAttribute(t,n)}function F(e,t,n=null){return e.getAttribute(t)??n}function I(e,t,n){if(n==null){e.hasAttribute(t)&&e.removeAttribute(t);return}let r=`${n}`;F(e,t,void 0)!==r&&e.setAttribute(t,r)}var bt=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},xt=(e,t,n)=>(bt(e,t,`read from private field`),n?n.call(e):t.get(e)),St=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Ct=(e,t,n,r)=>(bt(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),L;function wt(e){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `}var Tt=class extends D.HTMLElement{constructor(){if(super(),St(this,L,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=k(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[b.MEDIA_CONTROLLER,x.MEDIA_PAUSED]}attributeChangedCallback(e,t,n){var r,i,a,o;e===b.MEDIA_CONTROLLER&&(t&&((i=(r=xt(this,L))?.unassociateElement)==null||i.call(r,this),Ct(this,L,null)),n&&this.isConnected&&(Ct(this,L,this.getRootNode()?.getElementById(n)),(o=(a=xt(this,L))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;this.tabIndex=-1,this.setAttribute(`aria-hidden`,`true`),Ct(this,L,Et(this)),this.getAttribute(b.MEDIA_CONTROLLER)&&((t=(e=xt(this,L))?.associateElement)==null||t.call(e,this)),xt(this,L)&&(xt(this,L).addEventListener(`pointerdown`,this),xt(this,L).addEventListener(`click`,this),xt(this,L).hasAttribute(`tabindex`)||(xt(this,L).tabIndex=0))}disconnectedCallback(){var e,t,n,r;this.getAttribute(b.MEDIA_CONTROLLER)&&((t=(e=xt(this,L))?.unassociateElement)==null||t.call(e,this)),(n=xt(this,L))==null||n.removeEventListener(`pointerdown`,this),(r=xt(this,L))==null||r.removeEventListener(`click`,this),Ct(this,L,null)}handleEvent(e){let t=e.composedPath()?.[0];if([`video`,`media-controller`].includes(t?.localName)){if(e.type===`pointerdown`)this._pointerType=e.pointerType;else if(e.type===`click`){let{clientX:t,clientY:n}=e,{left:r,top:i,width:a,height:o}=this.getBoundingClientRect(),s=t-r,c=n-i;if(s<0||c<0||s>a||c>o||a===0&&o===0)return;let l=this._pointerType||`mouse`;if(this._pointerType=void 0,l===Me.TOUCH){this.handleTap(e);return}else if(l===Me.MOUSE||l===Me.PEN){this.handleMouseClick(e);return}}}}get mediaPaused(){return N(this,x.MEDIA_PAUSED)}set mediaPaused(e){P(this,x.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){let t=this.mediaPaused?y.MEDIA_PLAY_REQUEST:y.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new D.CustomEvent(t,{composed:!0,bubbles:!0}))}};L=new WeakMap,Tt.shadowRootOptions={mode:`open`},Tt.getTemplateHTML=wt;function Et(e){let t=e.getAttribute(b.MEDIA_CONTROLLER);return t?e.getRootNode()?.getElementById(t):pt(e,`media-controller`)}D.customElements.get(`media-gesture-receiver`)||D.customElements.define(`media-gesture-receiver`,Tt);var Dt=Tt,Ot=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},R=(e,t,n)=>(Ot(e,t,`read from private field`),n?n.call(e):t.get(e)),z=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},kt=(e,t,n,r)=>(Ot(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),At=(e,t,n)=>(Ot(e,t,`access private method`),n),jt,Mt,Nt,Pt,Ft,It,Lt,Rt,zt,Bt,Vt,Ht,Ut,Wt,Gt,Kt,qt,Jt,Yt,Xt,B={AUDIO:`audio`,AUTOHIDE:`autohide`,BREAKPOINTS:`breakpoints`,GESTURES_DISABLED:`gesturesdisabled`,KEYBOARD_CONTROL:`keyboardcontrol`,NO_AUTOHIDE:`noautohide`,USER_INACTIVE:`userinactive`,AUTOHIDE_OVER_CONTROLS:`autohideovercontrols`};function Zt(e){return`
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
        <template shadowrootmode="${Dt.shadowRootOptions.mode}">
          ${Dt.getTemplateHTML({})}
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
  `}var Qt=Object.values(x),$t=`sm:384 md:576 lg:768 xl:960`;function en(e){tn(e.target,e.contentRect.width)}function tn(e,t){if(!e.isConnected)return;let n=nn(e.getAttribute(B.BREAKPOINTS)??$t),r=rn(n,t),i=!1;if(Object.keys(n).forEach(t=>{if(r.includes(t)){e.hasAttribute(`breakpoint${t}`)||(e.setAttribute(`breakpoint${t}`,``),i=!0);return}e.hasAttribute(`breakpoint${t}`)&&(e.removeAttribute(`breakpoint${t}`),i=!0)}),i){let t=new CustomEvent(ke.BREAKPOINTS_CHANGE,{detail:r});e.dispatchEvent(t)}e.breakpointsComputed||(e.breakpointsComputed=!0,e.dispatchEvent(new CustomEvent(ke.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}function nn(e){let t=e.split(/\s+/);return Object.fromEntries(t.map(e=>e.split(`:`)))}function rn(e,t){return Object.keys(e).filter(n=>t>=parseInt(e[n]))}var an=class extends D.HTMLElement{constructor(){if(super(),z(this,zt),z(this,Vt),z(this,Ut),z(this,Gt),z(this,qt),z(this,jt,void 0),z(this,Mt,0),z(this,Nt,null),z(this,Pt,null),z(this,Ft,void 0),this.breakpointsComputed=!1,z(this,It,e=>{let t=this.media;for(let n of e){if(n.type!==`childList`)continue;let e=n.removedNodes;for(let r of e){if(r.slot!=`media`||n.target!=this)continue;let e=n.previousSibling&&n.previousSibling.previousElementSibling;if(!e||!t)this.mediaUnsetCallback(r);else{let t=e.slot!==`media`;for(;(e=e.previousSibling)!==null;)e.slot==`media`&&(t=!1);t&&this.mediaUnsetCallback(r)}}if(t)for(let e of n.addedNodes)e===t&&this.handleMediaUpdated(t)}}),z(this,Lt,!1),z(this,Rt,e=>{R(this,Lt)||(setTimeout(()=>{en(e),kt(this,Lt,!1)},0),kt(this,Lt,!0))}),z(this,Yt,void 0),z(this,Xt,()=>{if(!R(this,Yt).assignedElements({flatten:!0}).length){R(this,Nt)&&this.mediaUnsetCallback(R(this,Nt));return}this.handleMediaUpdated(this.media)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=k(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}kt(this,jt,new MutationObserver(R(this,It)))}static get observedAttributes(){return[B.AUTOHIDE,B.GESTURES_DISABLED].concat(Qt).filter(e=>![x.MEDIA_RENDITION_LIST,x.MEDIA_AUDIO_TRACK_LIST,x.MEDIA_CHAPTERS_CUES,x.MEDIA_WIDTH,x.MEDIA_HEIGHT,x.MEDIA_ERROR,x.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,t,n){e.toLowerCase()==B.AUTOHIDE&&(this.autohide=n)}get media(){let e=this.querySelector(`:scope > [slot=media]`);return e?.nodeName==`SLOT`&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(kt(this,Nt,e),e.localName.includes(`-`)&&await D.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;R(this,jt).observe(this,{childList:!0,subtree:!0}),at(this,R(this,Rt));let t=this.getAttribute(B.AUDIO)==null?E(`video player`):E(`audio player`);this.setAttribute(`role`,`region`),this.setAttribute(`aria-label`,t),this.handleMediaUpdated(this.media),this.setAttribute(B.USER_INACTIVE,``),tn(this,this.getBoundingClientRect().width);let n=this.querySelector(`:scope > slot[slot=media]`);n&&(kt(this,Yt,n),R(this,Yt).addEventListener(`slotchange`,R(this,Xt))),this.addEventListener(`pointerdown`,this),this.addEventListener(`pointermove`,this),this.addEventListener(`pointerup`,this),this.addEventListener(`mouseleave`,this),this.addEventListener(`keyup`,this),(e=D.window)==null||e.addEventListener(`mouseup`,this)}disconnectedCallback(){var e;ot(this,R(this,Rt)),clearTimeout(R(this,Pt)),R(this,jt).disconnect(),this.media&&this.mediaUnsetCallback(this.media),(e=D.window)==null||e.removeEventListener(`mouseup`,this),this.removeEventListener(`pointerdown`,this),this.removeEventListener(`pointermove`,this),this.removeEventListener(`pointerup`,this),this.removeEventListener(`mouseleave`,this),this.removeEventListener(`keyup`,this),R(this,Yt)&&(R(this,Yt).removeEventListener(`slotchange`,R(this,Xt)),kt(this,Yt,null)),kt(this,Lt,!1)}mediaSetCallback(e){}mediaUnsetCallback(e){kt(this,Nt,null)}handleEvent(e){switch(e.type){case`pointerdown`:kt(this,Mt,e.timeStamp);break;case`pointermove`:At(this,zt,Bt).call(this,e);break;case`pointerup`:At(this,Vt,Ht).call(this,e);break;case`mouseleave`:At(this,Ut,Wt).call(this);break;case`mouseup`:this.removeAttribute(B.KEYBOARD_CONTROL);break;case`keyup`:At(this,qt,Jt).call(this),this.setAttribute(B.KEYBOARD_CONTROL,``);break}}set autohide(e){let t=Number(e);kt(this,Ft,isNaN(t)?0:t)}get autohide(){return(R(this,Ft)===void 0?2:R(this,Ft)).toString()}get breakpoints(){return F(this,B.BREAKPOINTS)}set breakpoints(e){I(this,B.BREAKPOINTS,e)}get audio(){return N(this,B.AUDIO)}set audio(e){P(this,B.AUDIO,e)}get gesturesDisabled(){return N(this,B.GESTURES_DISABLED)}set gesturesDisabled(e){P(this,B.GESTURES_DISABLED,e)}get keyboardControl(){return N(this,B.KEYBOARD_CONTROL)}set keyboardControl(e){P(this,B.KEYBOARD_CONTROL,e)}get noAutohide(){return N(this,B.NO_AUTOHIDE)}set noAutohide(e){P(this,B.NO_AUTOHIDE,e)}get autohideOverControls(){return N(this,B.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){P(this,B.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return N(this,B.USER_INACTIVE)}set userInteractive(e){P(this,B.USER_INACTIVE,e)}};jt=new WeakMap,Mt=new WeakMap,Nt=new WeakMap,Pt=new WeakMap,Ft=new WeakMap,It=new WeakMap,Lt=new WeakMap,Rt=new WeakMap,zt=new WeakSet,Bt=function(e){if(e.pointerType!==`mouse`&&e.timeStamp-R(this,Mt)<250)return;At(this,Gt,Kt).call(this),clearTimeout(R(this,Pt));let t=this.hasAttribute(B.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(e.target)||t)&&At(this,qt,Jt).call(this)},Vt=new WeakSet,Ht=function(e){if(e.pointerType===`touch`){let t=!this.hasAttribute(B.USER_INACTIVE);[this,this.media].includes(e.target)&&t?At(this,Ut,Wt).call(this):At(this,qt,Jt).call(this)}else e.composedPath().some(e=>[`media-play-button`,`media-fullscreen-button`].includes(e?.localName))&&At(this,qt,Jt).call(this)},Ut=new WeakSet,Wt=function(){if(R(this,Ft)<0||this.hasAttribute(B.USER_INACTIVE))return;this.setAttribute(B.USER_INACTIVE,``);let e=new D.CustomEvent(ke.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(e)},Gt=new WeakSet,Kt=function(){if(!this.hasAttribute(B.USER_INACTIVE))return;this.removeAttribute(B.USER_INACTIVE);let e=new D.CustomEvent(ke.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(e)},qt=new WeakSet,Jt=function(){At(this,Gt,Kt).call(this),clearTimeout(R(this,Pt));let e=parseInt(this.autohide);e<0||kt(this,Pt,setTimeout(()=>{At(this,Ut,Wt).call(this)},e*1e3))},Yt=new WeakMap,Xt=new WeakMap,an.shadowRootOptions={mode:`open`},an.getTemplateHTML=Zt,D.customElements.get(`media-container`)||D.customElements.define(`media-container`,an);var on=an,sn=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},V=(e,t,n)=>(sn(e,t,`read from private field`),n?n.call(e):t.get(e)),cn=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},ln=(e,t,n,r)=>(sn(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),un,dn,fn,pn,mn,hn,gn=class{constructor(e,t,{defaultValue:n}={defaultValue:void 0}){cn(this,mn),cn(this,un,void 0),cn(this,dn,void 0),cn(this,fn,void 0),cn(this,pn,new Set),ln(this,un,e),ln(this,dn,t),ln(this,fn,new Set(n))}[Symbol.iterator](){return V(this,mn,hn).values()}get length(){return V(this,mn,hn).size}get value(){return[...V(this,mn,hn)].join(` `)??``}set value(e){e!==this.value&&(ln(this,pn,new Set),this.add(...e?.split(` `)??[]))}toString(){return this.value}item(e){return[...V(this,mn,hn)][e]}values(){return V(this,mn,hn).values()}forEach(e,t){V(this,mn,hn).forEach(e,t)}add(...e){var t;e.forEach(e=>V(this,pn).add(e)),!(this.value===``&&!V(this,un)?.hasAttribute(`${V(this,dn)}`))&&((t=V(this,un))==null||t.setAttribute(`${V(this,dn)}`,`${this.value}`))}remove(...e){var t;e.forEach(e=>V(this,pn).delete(e)),(t=V(this,un))==null||t.setAttribute(`${V(this,dn)}`,`${this.value}`)}contains(e){return V(this,mn,hn).has(e)}toggle(e,t){return t===void 0?this.contains(e)?(this.remove(e),!1):(this.add(e),!0):t?(this.add(e),!0):(this.remove(e),!1)}replace(e,t){return this.remove(e),this.add(t),e===t}};un=new WeakMap,dn=new WeakMap,fn=new WeakMap,pn=new WeakMap,mn=new WeakSet,hn=function(){return V(this,pn).size?V(this,pn):V(this,fn)};var _n=(e=``)=>e.split(/\s+/),vn=(e=``)=>{let[t,n,r]=e.split(`:`),i=r?decodeURIComponent(r):void 0;return{kind:t===`cc`?S.CAPTIONS:S.SUBTITLES,language:n,label:i}},yn=(e=``,t={})=>_n(e).map(e=>{let n=vn(e);return{...t,...n}}),bn=e=>e?Array.isArray(e)?e.map(e=>typeof e==`string`?vn(e):e):typeof e==`string`?yn(e):[e]:[],xn=({kind:e,label:t,language:n}={kind:`subtitles`})=>t?`${e===`captions`?`cc`:`sb`}:${n}:${encodeURIComponent(t)}`:n,Sn=(e=[])=>Array.prototype.map.call(e,xn).join(` `),Cn=(e,t)=>n=>n[e]===t,wn=e=>{let t=Object.entries(e).map(([e,t])=>Cn(e,t));return e=>t.every(t=>t(e))},Tn=(e,t=[],n=[])=>{let r=bn(n).map(wn);Array.from(t).filter(e=>r.some(t=>t(e))).forEach(t=>{t.mode=e})},En=(e,t=()=>!0)=>{if(!e?.textTracks)return[];let n=typeof t==`function`?t:wn(t);return Array.from(e.textTracks).filter(n)},Dn=e=>!!e.mediaSubtitlesShowing?.length||e.hasAttribute(x.MEDIA_SUBTITLES_SHOWING),On=e=>{let{media:t,fullscreenElement:n}=e;try{let e=n&&`requestFullscreen`in n?`requestFullscreen`:n&&`webkitRequestFullScreen`in n?`webkitRequestFullScreen`:void 0;if(e){let t=n[e]?.call(n);if(t instanceof Promise)return t.catch(()=>{})}else t?.webkitEnterFullscreen?t.webkitEnterFullscreen():t?.requestFullscreen&&t.requestFullscreen()}catch(e){console.error(e)}},kn=`exitFullscreen`in O?`exitFullscreen`:`webkitExitFullscreen`in O?`webkitExitFullscreen`:`webkitCancelFullScreen`in O?`webkitCancelFullScreen`:void 0,An=e=>{let{documentElement:t}=e;if(kn){let e=(t?.[kn])?.call(t);if(e instanceof Promise)return e.catch(()=>{})}},jn=`fullscreenElement`in O?`fullscreenElement`:`webkitFullscreenElement`in O?`webkitFullscreenElement`:void 0,Mn=e=>{let{documentElement:t,media:n}=e,r=t?.[jn];return!r&&`webkitDisplayingFullscreen`in n&&`webkitPresentationMode`in n&&n.webkitDisplayingFullscreen&&n.webkitPresentationMode===T.FULLSCREEN?n:r},Nn=e=>{let{media:t,documentElement:n,fullscreenElement:r=t}=e;if(!t||!n)return!1;let i=Mn(e);if(!i)return!1;if(i===r||i===t)return!0;if(i.localName.includes(`-`)){let e=i.shadowRoot;if(!(jn in e))return ft(i,r);for(;e?.[jn];){if(e[jn]===r)return!0;e=e[jn]?.shadowRoot}}return!1},Pn=`fullscreenEnabled`in O?`fullscreenEnabled`:`webkitFullscreenEnabled`in O?`webkitFullscreenEnabled`:void 0,Fn=e=>{let{documentElement:t,media:n}=e;return!!t?.[Pn]||n&&`webkitSupportsFullscreen`in n},In,Ln=()=>{var e;return In||(In=((e=O)?.createElement)?.call(e,`video`),In)},Rn=async(e=Ln())=>{if(!e)return!1;let t=e.volume;e.volume=t/2+.1;let n=new AbortController,r=await Promise.race([zn(e,n.signal),Bn(e,t)]);return n.abort(),r},zn=(e,t)=>new Promise(n=>{e.addEventListener(`volumechange`,()=>n(!0),{signal:t})}),Bn=async(e,t)=>{for(let n=0;n<10;n++){if(e.volume===t)return!1;await Re(10)}return e.volume!==t},Vn=/.*Version\/.*Safari\/.*/.test(D.navigator.userAgent),Hn=(e=Ln())=>D.matchMedia(`(display-mode: standalone)`).matches&&Vn?!1:typeof e?.requestPictureInPicture==`function`,Un=(e=Ln())=>Fn({documentElement:O,media:e}),Wn=Un(),Gn=Hn(),Kn=!!D.WebKitPlaybackTargetAvailabilityEvent,qn=!!D.chrome,Jn=e=>En(e.media,e=>[S.SUBTITLES,S.CAPTIONS].includes(e.kind)).sort((e,t)=>e.kind>=t.kind?1:-1),Yn=e=>En(e.media,e=>e.mode===je.SHOWING&&[S.SUBTITLES,S.CAPTIONS].includes(e.kind)),Xn=(e,t)=>{let n=Jn(e),r=Yn(e),i=!!r.length;if(n.length){if(t===!1||i&&t!==!0)Tn(je.DISABLED,n,r);else if(t===!0||!i&&t!==!1){let t=n[0],{options:i}=e;if(!i?.noSubtitlesLangPref){let e=D.localStorage.getItem(`media-chrome-pref-subtitles-lang`),r=e?[e,...D.navigator.languages]:D.navigator.languages,i=n.filter(e=>r.some(t=>e.language.toLowerCase().startsWith(t.split(`-`)[0]))).sort((e,t)=>r.findIndex(t=>e.language.toLowerCase().startsWith(t.split(`-`)[0]))-r.findIndex(e=>t.language.toLowerCase().startsWith(e.split(`-`)[0])));i[0]&&(t=i[0])}let{language:a,label:o,kind:s}=t;Tn(je.DISABLED,n,r),Tn(je.SHOWING,n,[{language:a,label:o,kind:s}])}}},Zn=(e,t)=>e===t?!0:e==null||t==null||typeof e!=typeof t?!1:typeof e==`number`&&Number.isNaN(e)&&Number.isNaN(t)?!0:typeof e==`object`?Array.isArray(e)?Qn(e,t):Object.entries(e).every(([e,n])=>e in t&&Zn(n,t[e])):!1,Qn=(e,t)=>{let n=Array.isArray(e),r=Array.isArray(t);return n===r?n||r?e.length===t.length&&e.every((e,n)=>Zn(e,t[n])):!0:!1},$n=Object.values(w),er,tr=Rn().then(e=>(er=e,er)),nr=async(...e)=>{await Promise.all(e.filter(e=>e).map(async e=>{if(!(`localName`in e&&e instanceof D.HTMLElement))return;let t=e.localName;if(!t.includes(`-`))return;let n=D.customElements.get(t);n&&e instanceof n||(await D.customElements.whenDefined(t),D.customElements.upgrade(e))}))},rr=new D.DOMParser,ir=e=>e&&(rr.parseFromString(e,`text/html`).body.textContent||e),ar={mediaError:{get(e,t){let{media:n}=e;if(t?.type!==`playing`)return n?.error},mediaEvents:[`emptied`,`error`,`playing`]},mediaErrorCode:{get(e,t){let{media:n}=e;if(t?.type!==`playing`)return n?.error?.code},mediaEvents:[`emptied`,`error`,`playing`]},mediaErrorMessage:{get(e,t){let{media:n}=e;if(t?.type!==`playing`)return n?.error?.message??``},mediaEvents:[`emptied`,`error`,`playing`]},mediaWidth:{get(e){let{media:t}=e;return t?.videoWidth??0},mediaEvents:[`resize`]},mediaHeight:{get(e){let{media:t}=e;return t?.videoHeight??0},mediaEvents:[`resize`]},mediaPaused:{get(e){let{media:t}=e;return t?.paused??!0},set(e,t){var n;let{media:r}=t;r&&(e?r.pause():(n=r.play())==null||n.catch(()=>{}))},mediaEvents:[`play`,`playing`,`pause`,`emptied`]},mediaHasPlayed:{get(e,t){let{media:n}=e;return n?t?t.type===`playing`:!n.paused:!1},mediaEvents:[`playing`,`emptied`]},mediaEnded:{get(e){let{media:t}=e;return t?.ended??!1},mediaEvents:[`seeked`,`ended`,`emptied`]},mediaPlaybackRate:{get(e){let{media:t}=e;return t?.playbackRate??1},set(e,t){let{media:n}=t;n&&Number.isFinite(+e)&&(n.playbackRate=+e)},mediaEvents:[`ratechange`,`loadstart`]},mediaMuted:{get(e){let{media:t}=e;return t?.muted??!1},set(e,t){let{media:n,options:{noMutedPref:r}={}}=t;if(n){n.muted=e;try{let t=D.localStorage.getItem(`media-chrome-pref-muted`)!==null,i=n.hasAttribute(`muted`);if(r){t&&D.localStorage.removeItem(`media-chrome-pref-muted`);return}if(i&&!t)return;D.localStorage.setItem(`media-chrome-pref-muted`,e?`true`:`false`)}catch(e){console.debug(`Error setting muted pref`,e)}}},mediaEvents:[`volumechange`],stateOwnersUpdateHandlers:[(e,t)=>{let{options:{noMutedPref:n}}=t,{media:r}=t;if(!(!r||r.muted||n))try{let n=D.localStorage.getItem(`media-chrome-pref-muted`)===`true`;ar.mediaMuted.set(n,t),e(n)}catch(e){console.debug(`Error getting muted pref`,e)}}]},mediaLoop:{get(e){let{media:t}=e;return t?.loop},set(e,t){let{media:n}=t;n&&(n.loop=e)},mediaEvents:[`medialooprequest`]},mediaVolume:{get(e){let{media:t}=e;return t?.volume??1},set(e,t){let{media:n,options:{noVolumePref:r}={}}=t;if(n){try{e==null?D.localStorage.removeItem(`media-chrome-pref-volume`):!n.hasAttribute(`muted`)&&!r&&D.localStorage.setItem(`media-chrome-pref-volume`,e.toString())}catch(e){console.debug(`Error setting volume pref`,e)}Number.isFinite(+e)&&(n.volume=+e)}},mediaEvents:[`volumechange`],stateOwnersUpdateHandlers:[(e,t)=>{let{options:{noVolumePref:n}}=t;if(!n)try{let{media:n}=t;if(!n)return;let r=D.localStorage.getItem(`media-chrome-pref-volume`);if(r==null)return;ar.mediaVolume.set(+r,t),e(+r)}catch(e){console.debug(`Error getting volume pref`,e)}}]},mediaVolumeLevel:{get(e){let{media:t}=e;return t?.volume===void 0?`high`:t.muted||t.volume===0?`off`:t.volume<.5?`low`:t.volume<.75?`medium`:`high`},mediaEvents:[`volumechange`]},mediaCurrentTime:{get(e){let{media:t}=e;return t?.currentTime??0},set(e,t){let{media:n}=t;!n||!Le(e)||(n.currentTime=e)},mediaEvents:[`timeupdate`,`loadedmetadata`]},mediaDuration:{get(e){let{media:t,options:{defaultDuration:n}={}}=e;return n&&(!t||!t.duration||Number.isNaN(t.duration)||!Number.isFinite(t.duration))?n:Number.isFinite(t?.duration)?t.duration:NaN},mediaEvents:[`durationchange`,`loadedmetadata`,`emptied`]},mediaLoading:{get(e){let{media:t}=e;return t?.readyState<3},mediaEvents:[`waiting`,`playing`,`emptied`]},mediaSeekable:{get(e){let{media:t}=e;if(!t?.seekable?.length)return;let n=t.seekable.start(0),r=t.seekable.end(t.seekable.length-1);if(!(!n&&!r))return[Number(n.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:[`loadedmetadata`,`emptied`,`progress`,`seekablechange`]},mediaBuffered:{get(e){let{media:t}=e,n=t?.buffered??[];return Array.from(n).map((e,t)=>[Number(n.start(t).toFixed(3)),Number(n.end(t).toFixed(3))])},mediaEvents:[`progress`,`emptied`]},mediaStreamType:{get(e){let{media:t,options:{defaultStreamType:n}={}}=e,r=[w.LIVE,w.ON_DEMAND].includes(n)?n:void 0;if(!t)return r;let{streamType:i}=t;if($n.includes(i))return i===w.UNKNOWN?r:i;let a=t.duration;return a===1/0?w.LIVE:Number.isFinite(a)?w.ON_DEMAND:r},mediaEvents:[`emptied`,`durationchange`,`loadedmetadata`,`streamtypechange`]},mediaTargetLiveWindow:{get(e){let{media:t}=e;if(!t)return NaN;let{targetLiveWindow:n}=t,r=ar.mediaStreamType.get(e);return(n==null||Number.isNaN(n))&&r===w.LIVE?0:n},mediaEvents:[`emptied`,`durationchange`,`loadedmetadata`,`streamtypechange`,`targetlivewindowchange`]},mediaTimeIsLive:{get(e){let{media:t,options:{liveEdgeOffset:n=10}={}}=e;if(!t)return!1;if(typeof t.liveEdgeStart==`number`)return!Number.isNaN(t.liveEdgeStart)&&t.currentTime>=t.liveEdgeStart;if(ar.mediaStreamType.get(e)!==w.LIVE)return!1;let r=t.seekable;if(!r)return!0;if(!r.length)return!1;let i=r.end(r.length-1)-n;return t.currentTime>=i},mediaEvents:[`playing`,`timeupdate`,`progress`,`waiting`,`emptied`]},mediaSubtitlesList:{get(e){return Jn(e).map(({kind:e,label:t,language:n})=>({kind:e,label:t,language:n}))},mediaEvents:[`loadstart`],textTracksEvents:[`addtrack`,`removetrack`]},mediaSubtitlesShowing:{get(e){return Yn(e).map(({kind:e,label:t,language:n})=>({kind:e,label:t,language:n}))},mediaEvents:[`loadstart`],textTracksEvents:[`addtrack`,`removetrack`,`change`],stateOwnersUpdateHandlers:[(e,t)=>{var n,r;let{media:i,options:a}=t;if(!i)return;let o=e=>{a.defaultSubtitles&&(e&&![S.CAPTIONS,S.SUBTITLES].includes(e?.track?.kind)||Xn(t,!0))};return i.addEventListener(`loadstart`,o),(n=i.textTracks)==null||n.addEventListener(`addtrack`,o),(r=i.textTracks)==null||r.addEventListener(`removetrack`,o),()=>{var e,t;i.removeEventListener(`loadstart`,o),(e=i.textTracks)==null||e.removeEventListener(`addtrack`,o),(t=i.textTracks)==null||t.removeEventListener(`removetrack`,o)}}]},mediaChaptersCues:{get(e){let{media:t}=e;if(!t)return[];let[n]=En(t,{kind:S.CHAPTERS});return Array.from(n?.cues??[]).map(({text:e,startTime:t,endTime:n})=>({text:ir(e),startTime:t,endTime:n}))},mediaEvents:[`loadstart`,`loadedmetadata`],textTracksEvents:[`addtrack`,`removetrack`,`change`],stateOwnersUpdateHandlers:[(e,t)=>{let{media:n}=t;if(!n)return;let r=n.querySelector(`track[kind="chapters"][default][src]`),i=n.shadowRoot?.querySelector(`:is(video,audio) > track[kind="chapters"][default][src]`);return r?.addEventListener(`load`,e),i?.addEventListener(`load`,e),()=>{r?.removeEventListener(`load`,e),i?.removeEventListener(`load`,e)}}]},mediaIsPip:{get(e){let{media:t,documentElement:n}=e;if(!t||!n||!n.pictureInPictureElement)return!1;if(n.pictureInPictureElement===t)return!0;if(n.pictureInPictureElement instanceof HTMLMediaElement)return t.localName?.includes(`-`)?ft(t,n.pictureInPictureElement):!1;if(n.pictureInPictureElement.localName.includes(`-`)){let e=n.pictureInPictureElement.shadowRoot;for(;e?.pictureInPictureElement;){if(e.pictureInPictureElement===t)return!0;e=e.pictureInPictureElement?.shadowRoot}}return!1},set(e,t){let{media:n}=t;if(n)if(e){if(!O.pictureInPictureEnabled){console.warn(`MediaChrome: Picture-in-picture is not enabled`);return}if(!n.requestPictureInPicture){console.warn(`MediaChrome: The current media does not support picture-in-picture`);return}let e=()=>{console.warn(`MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.`)};n.requestPictureInPicture().catch(t=>{if(t.code===11){if(!n.src){console.warn(`MediaChrome: The media is not ready for picture-in-picture. It must have a src set.`);return}if(n.readyState===0&&n.preload===`none`){let t=()=>{n.removeEventListener(`loadedmetadata`,r),n.preload=`none`},r=()=>{n.requestPictureInPicture().catch(e),t()};n.addEventListener(`loadedmetadata`,r),n.preload=`metadata`,setTimeout(()=>{n.readyState===0&&e(),t()},1e3)}else throw t}else throw t})}else O.pictureInPictureElement&&O.exitPictureInPicture()},mediaEvents:[`enterpictureinpicture`,`leavepictureinpicture`]},mediaRenditionList:{get(e){let{media:t}=e;return[...t?.videoRenditions??[]].map(e=>({...e}))},mediaEvents:[`emptied`,`loadstart`],videoRenditionsEvents:[`addrendition`,`removerendition`]},mediaRenditionSelected:{get(e){let{media:t}=e;return t?.videoRenditions?.[t.videoRenditions?.selectedIndex]?.id},set(e,t){let{media:n}=t;if(!n?.videoRenditions){console.warn(`MediaController: Rendition selection not supported by this media.`);return}let r=e,i=Array.prototype.findIndex.call(n.videoRenditions,e=>e.id==r);n.videoRenditions.selectedIndex!=i&&(n.videoRenditions.selectedIndex=i)},mediaEvents:[`emptied`],videoRenditionsEvents:[`addrendition`,`removerendition`,`change`]},mediaAudioTrackList:{get(e){let{media:t}=e;return[...t?.audioTracks??[]]},mediaEvents:[`emptied`,`loadstart`],audioTracksEvents:[`addtrack`,`removetrack`]},mediaAudioTrackEnabled:{get(e){let{media:t}=e;return[...t?.audioTracks??[]].find(e=>e.enabled)?.id},set(e,t){let{media:n}=t;if(!n?.audioTracks){console.warn(`MediaChrome: Audio track selection not supported by this media.`);return}let r=e;for(let e of n.audioTracks)e.enabled=r==e.id},mediaEvents:[`emptied`],audioTracksEvents:[`addtrack`,`removetrack`,`change`]},mediaIsFullscreen:{get(e){return Nn(e)},set(e,t,n){var r;e?(On(t),n.detail&&!t.media?.inert&&((r=t.media)==null||r.focus())):An(t)},rootEvents:[`fullscreenchange`,`webkitfullscreenchange`],mediaEvents:[`webkitbeginfullscreen`,`webkitendfullscreen`,`webkitpresentationmodechanged`]},mediaIsCasting:{get(e){let{media:t}=e;return!t?.remote||t.remote?.state===`disconnected`?!1:t.remote.state===`connected`},set(e,t){let{media:n}=t;if(n&&!(e&&n.remote?.state!==`disconnected`)&&!(!e&&n.remote?.state!==`connected`)){if(typeof n.remote.prompt!=`function`){console.warn(`MediaChrome: Casting is not supported in this environment`);return}n.remote.prompt().catch(()=>{})}},remoteEvents:[`connect`,`connecting`,`disconnect`]},mediaIsAirplaying:{get(){return!1},set(e,t){let{media:n}=t;if(n){if(!(n.webkitShowPlaybackTargetPicker&&D.WebKitPlaybackTargetAvailabilityEvent)){console.error(`MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment`);return}n.webkitShowPlaybackTargetPicker()}},mediaEvents:[`webkitcurrentplaybacktargetiswirelesschanged`]},mediaFullscreenUnavailable:{get(e){let{media:t}=e;if(!Wn||!Un(t))return C.UNSUPPORTED}},mediaPipUnavailable:{get(e){let{media:t}=e;if(!Gn||!Hn(t))return C.UNSUPPORTED;if(t?.disablePictureInPicture)return C.UNAVAILABLE}},mediaVolumeUnavailable:{get(e){let{media:t}=e;if(er===!1||t?.volume==null)return C.UNSUPPORTED},stateOwnersUpdateHandlers:[e=>{er??tr.then(t=>e(t?void 0:C.UNSUPPORTED))}]},mediaCastUnavailable:{get(e,{availability:t=`not-available`}={}){let{media:n}=e;if(!qn||!n?.remote?.state)return C.UNSUPPORTED;if(!(t==null||t===`available`))return C.UNAVAILABLE},stateOwnersUpdateHandlers:[(e,t)=>{var n;let{media:r}=t;if(r)return r.disableRemotePlayback||r.hasAttribute(`disableremoteplayback`)||(n=r?.remote)==null||n.watchAvailability(t=>{e({availability:t?`available`:`not-available`})}).catch(t=>{t.name===`NotSupportedError`?e({availability:null}):e({availability:`not-available`})}),()=>{var e;(e=r?.remote)==null||e.cancelWatchAvailability().catch(()=>{})}}]},mediaAirplayUnavailable:{get(e,t){if(!Kn)return C.UNSUPPORTED;if(t?.availability===`not-available`)return C.UNAVAILABLE},mediaEvents:[`webkitplaybacktargetavailabilitychanged`],stateOwnersUpdateHandlers:[(e,t)=>{var n;let{media:r}=t;if(r)return r.disableRemotePlayback||r.hasAttribute(`disableremoteplayback`)||(n=r?.remote)==null||n.watchAvailability(t=>{e({availability:t?`available`:`not-available`})}).catch(t=>{t.name===`NotSupportedError`?e({availability:null}):e({availability:`not-available`})}),()=>{var e;(e=r?.remote)==null||e.cancelWatchAvailability().catch(()=>{})}}]},mediaRenditionUnavailable:{get(e){let{media:t}=e;if(!t?.videoRenditions)return C.UNSUPPORTED;if(!t.videoRenditions?.length)return C.UNAVAILABLE},mediaEvents:[`emptied`,`loadstart`],videoRenditionsEvents:[`addrendition`,`removerendition`]},mediaAudioTrackUnavailable:{get(e){let{media:t}=e;if(!t?.audioTracks)return C.UNSUPPORTED;if((t.audioTracks?.length??0)<=1)return C.UNAVAILABLE},mediaEvents:[`emptied`,`loadstart`],audioTracksEvents:[`addtrack`,`removetrack`]},mediaLang:{get(e){let{options:{mediaLang:t}={}}=e;return t??`en`}}},or={[y.MEDIA_PREVIEW_REQUEST](e,t,{detail:n}){let{media:r}=t,i=n??void 0,a,o;if(r&&i!=null){let[e]=En(r,{kind:S.METADATA,label:`thumbnails`}),t=Array.prototype.find.call(e?.cues??[],(e,t,n)=>t===0?e.endTime>i:t===n.length-1?e.startTime<=i:e.startTime<=i&&e.endTime>i);if(t){let e=/'^(?:[a-z]+:)?\/\//i.test(t.text)?void 0:r?.querySelector(`track[label="thumbnails"]`)?.src,n=new URL(t.text,e);o=new URLSearchParams(n.hash).get(`#xywh`).split(`,`).map(e=>+e),a=n.href}}let s=e.mediaDuration.get(t),c=e.mediaChaptersCues.get(t).find((e,t,n)=>t===n.length-1&&s===e.endTime?e.startTime<=i&&e.endTime>=i:e.startTime<=i&&e.endTime>i)?.text;return n!=null&&c==null&&(c=``),{mediaPreviewTime:i,mediaPreviewImage:a,mediaPreviewCoords:o,mediaPreviewChapter:c}},[y.MEDIA_PAUSE_REQUEST](e,t){e.mediaPaused.set(!0,t)},[y.MEDIA_PLAY_REQUEST](e,t){let n=e.mediaStreamType.get(t)===w.LIVE,r=!t.options?.noAutoSeekToLive,i=e.mediaTargetLiveWindow.get(t)>0;if(n&&r&&!i){let n=e.mediaSeekable.get(t)?.[1];if(n){let r=n-(t.options?.seekToLiveOffset??0);e.mediaCurrentTime.set(r,t)}}e.mediaPaused.set(!1,t)},[y.MEDIA_PLAYBACK_RATE_REQUEST](e,t,{detail:n}){let r=n;e.mediaPlaybackRate.set(r,t)},[y.MEDIA_MUTE_REQUEST](e,t){e.mediaMuted.set(!0,t)},[y.MEDIA_UNMUTE_REQUEST](e,t){e.mediaVolume.get(t)||e.mediaVolume.set(.25,t),e.mediaMuted.set(!1,t)},[y.MEDIA_LOOP_REQUEST](e,t,{detail:n}){let r=!!n;return e.mediaLoop.set(r,t),{mediaLoop:r}},[y.MEDIA_VOLUME_REQUEST](e,t,{detail:n}){let r=n;r&&e.mediaMuted.get(t)&&e.mediaMuted.set(!1,t),e.mediaVolume.set(r,t)},[y.MEDIA_SEEK_REQUEST](e,t,{detail:n}){let r=n;e.mediaCurrentTime.set(r,t)},[y.MEDIA_SEEK_TO_LIVE_REQUEST](e,t){let n=e.mediaSeekable.get(t)?.[1];if(Number.isNaN(Number(n)))return;let r=n-(t.options?.seekToLiveOffset??0);e.mediaCurrentTime.set(r,t)},[y.MEDIA_SHOW_SUBTITLES_REQUEST](e,t,{detail:n}){let{options:r}=t,i=Jn(t),a=bn(n),o=a[0]?.language;o&&!r.noSubtitlesLangPref&&D.localStorage.setItem(`media-chrome-pref-subtitles-lang`,o),Tn(je.SHOWING,i,a)},[y.MEDIA_DISABLE_SUBTITLES_REQUEST](e,t,{detail:n}){let r=Jn(t),i=n??[];Tn(je.DISABLED,r,i)},[y.MEDIA_TOGGLE_SUBTITLES_REQUEST](e,t,{detail:n}){Xn(t,n)},[y.MEDIA_RENDITION_REQUEST](e,t,{detail:n}){let r=n;e.mediaRenditionSelected.set(r,t)},[y.MEDIA_AUDIO_TRACK_REQUEST](e,t,{detail:n}){let r=n;e.mediaAudioTrackEnabled.set(r,t)},[y.MEDIA_ENTER_PIP_REQUEST](e,t){e.mediaIsFullscreen.get(t)&&e.mediaIsFullscreen.set(!1,t),e.mediaIsPip.set(!0,t)},[y.MEDIA_EXIT_PIP_REQUEST](e,t){e.mediaIsPip.set(!1,t)},[y.MEDIA_ENTER_FULLSCREEN_REQUEST](e,t,n){e.mediaIsPip.get(t)&&e.mediaIsPip.set(!1,t),e.mediaIsFullscreen.set(!0,t,n)},[y.MEDIA_EXIT_FULLSCREEN_REQUEST](e,t){e.mediaIsFullscreen.set(!1,t)},[y.MEDIA_ENTER_CAST_REQUEST](e,t){e.mediaIsFullscreen.get(t)&&e.mediaIsFullscreen.set(!1,t),e.mediaIsCasting.set(!0,t)},[y.MEDIA_EXIT_CAST_REQUEST](e,t){e.mediaIsCasting.set(!1,t)},[y.MEDIA_AIRPLAY_REQUEST](e,t){e.mediaIsAirplaying.set(!0,t)}},sr=({media:e,fullscreenElement:t,documentElement:n,stateMediator:r=ar,requestMap:i=or,options:a={},monitorStateOwnersOnlyWithSubscriptions:o=!0})=>{let s=[],c={options:{...a}},l=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0}),u=e=>{e!=null&&(Zn(e,l)||(l=Object.freeze({...l,...e}),s.forEach(e=>e(l))))},d=()=>{let e=Object.entries(r).reduce((e,[t,{get:n}])=>(e[t]=n(c),e),{});u(e)},f={},p,m=async(e,t)=>{let n=!!p;if(p={...c,...p??{},...e},n)return;await nr(...Object.values(e));let i=s.length>0&&t===0&&o,a=c.media!==p.media,l=c.media?.textTracks!==p.media?.textTracks,m=c.media?.videoRenditions!==p.media?.videoRenditions,h=c.media?.audioTracks!==p.media?.audioTracks,g=c.media?.remote!==p.media?.remote,ee=c.documentElement!==p.documentElement,te=!!c.media&&(a||i),ne=!!c.media?.textTracks&&(l||i),re=!!c.media?.videoRenditions&&(m||i),ie=!!c.media?.audioTracks&&(h||i),ae=!!c.media?.remote&&(g||i),oe=!!c.documentElement&&(ee||i),se=te||ne||re||ie||ae||oe,ce=s.length===0&&t===1&&o,le=!!p.media&&(a||ce),ue=!!p.media?.textTracks&&(l||ce),de=!!p.media?.videoRenditions&&(m||ce),fe=!!p.media?.audioTracks&&(h||ce),pe=!!p.media?.remote&&(g||ce),me=!!p.documentElement&&(ee||ce),he=le||ue||de||fe||pe||me;if(!(se||he)){Object.entries(p).forEach(([e,t])=>{c[e]=t}),d(),p=void 0;return}Object.entries(r).forEach(([e,{get:t,mediaEvents:n=[],textTracksEvents:r=[],videoRenditionsEvents:i=[],audioTracksEvents:a=[],remoteEvents:o=[],rootEvents:s=[],stateOwnersUpdateHandlers:l=[]}])=>{f[e]||(f[e]={});let d=n=>{let r=t(c,n);u({[e]:r})},m;m=f[e].mediaEvents,n.forEach(t=>{m&&te&&(c.media.removeEventListener(t,m),f[e].mediaEvents=void 0),le&&(p.media.addEventListener(t,d),f[e].mediaEvents=d)}),m=f[e].textTracksEvents,r.forEach(t=>{var n,r;m&&ne&&((n=c.media.textTracks)==null||n.removeEventListener(t,m),f[e].textTracksEvents=void 0),ue&&((r=p.media.textTracks)==null||r.addEventListener(t,d),f[e].textTracksEvents=d)}),m=f[e].videoRenditionsEvents,i.forEach(t=>{var n,r;m&&re&&((n=c.media.videoRenditions)==null||n.removeEventListener(t,m),f[e].videoRenditionsEvents=void 0),de&&((r=p.media.videoRenditions)==null||r.addEventListener(t,d),f[e].videoRenditionsEvents=d)}),m=f[e].audioTracksEvents,a.forEach(t=>{var n,r;m&&ie&&((n=c.media.audioTracks)==null||n.removeEventListener(t,m),f[e].audioTracksEvents=void 0),fe&&((r=p.media.audioTracks)==null||r.addEventListener(t,d),f[e].audioTracksEvents=d)}),m=f[e].remoteEvents,o.forEach(t=>{var n,r;m&&ae&&((n=c.media.remote)==null||n.removeEventListener(t,m),f[e].remoteEvents=void 0),pe&&((r=p.media.remote)==null||r.addEventListener(t,d),f[e].remoteEvents=d)}),m=f[e].rootEvents,s.forEach(t=>{m&&oe&&(c.documentElement.removeEventListener(t,m),f[e].rootEvents=void 0),me&&(p.documentElement.addEventListener(t,d),f[e].rootEvents=d)});let h=f[e].stateOwnersUpdateHandlers;if(h&&se&&(Array.isArray(h)?h:[h]).forEach(e=>{typeof e==`function`&&e()}),he){let t=l.map(e=>e(d,p)).filter(e=>typeof e==`function`);f[e].stateOwnersUpdateHandlers=t.length===1?t[0]:t}else se&&(f[e].stateOwnersUpdateHandlers=void 0)}),Object.entries(p).forEach(([e,t])=>{c[e]=t}),d(),p=void 0};return m({media:e,fullscreenElement:t,documentElement:n,options:a}),{dispatch(e){let{type:t,detail:n}=e;if(i[t]&&l.mediaErrorCode==null){u(i[t](r,c,e));return}t===`mediaelementchangerequest`?m({media:n}):t===`fullscreenelementchangerequest`?m({fullscreenElement:n}):t===`documentelementchangerequest`?m({documentElement:n}):t===`optionschangerequest`&&(Object.entries(n??{}).forEach(([e,t])=>{c.options[e]=t}),d())},getState(){return l},subscribe(e){return m({},s.length+1),s.push(e),e(l),()=>{let t=s.indexOf(e);t>=0&&(m({},s.length-1),s.splice(t,1))}}}},cr=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},H=(e,t,n)=>(cr(e,t,`read from private field`),n?n.call(e):t.get(e)),lr=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},ur=(e,t,n,r)=>(cr(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),dr=(e,t,n)=>(cr(e,t,`access private method`),n),fr,pr,U,mr,hr,gr,_r,vr,yr,br,xr,Sr,Cr,wr,Tr,Er=[`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`Enter`,` `,`f`,`m`,`k`,`c`,`l`,`j`,`>`,`<`,`p`],Dr=10,Or=.025,kr=.25,Ar=.25,jr=2,W={DEFAULT_SUBTITLES:`defaultsubtitles`,DEFAULT_STREAM_TYPE:`defaultstreamtype`,DEFAULT_DURATION:`defaultduration`,FULLSCREEN_ELEMENT:`fullscreenelement`,HOTKEYS:`hotkeys`,KEYBOARD_BACKWARD_SEEK_OFFSET:`keyboardbackwardseekoffset`,KEYBOARD_FORWARD_SEEK_OFFSET:`keyboardforwardseekoffset`,KEYBOARD_DOWN_VOLUME_STEP:`keyboarddownvolumestep`,KEYBOARD_UP_VOLUME_STEP:`keyboardupvolumestep`,KEYS_USED:`keysused`,LANG:`lang`,LOOP:`loop`,LIVE_EDGE_OFFSET:`liveedgeoffset`,NO_AUTO_SEEK_TO_LIVE:`noautoseektolive`,NO_DEFAULT_STORE:`nodefaultstore`,NO_HOTKEYS:`nohotkeys`,NO_MUTED_PREF:`nomutedpref`,NO_SUBTITLES_LANG_PREF:`nosubtitleslangpref`,NO_VOLUME_PREF:`novolumepref`,SEEK_TO_LIVE_OFFSET:`seektoliveoffset`},Mr=class extends an{constructor(){super(),lr(this,yr),lr(this,Sr),lr(this,wr),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,lr(this,fr,new gn(this,W.HOTKEYS)),lr(this,pr,void 0),lr(this,U,void 0),lr(this,mr,null),lr(this,hr,void 0),lr(this,gr,void 0),lr(this,_r,e=>{var t;(t=H(this,U))==null||t.dispatch(e)}),lr(this,vr,void 0),lr(this,xr,e=>{let{key:t,shiftKey:n}=e;if(!(n&&(t===`/`||t===`?`)||Er.includes(t))){this.removeEventListener(`keyup`,H(this,xr));return}this.keyboardShortcutHandler(e)}),this.associateElement(this);let e={};ur(this,hr,t=>{Object.entries(t).forEach(([t,n])=>{if(t in e&&e[t]===n)return;this.propagateMediaState(t,n);let r=t.toLowerCase(),i=new D.CustomEvent(Ae[r],{composed:!0,detail:n});this.dispatchEvent(i)}),e=t})}static get observedAttributes(){return super.observedAttributes.concat(W.NO_HOTKEYS,W.HOTKEYS,W.DEFAULT_STREAM_TYPE,W.DEFAULT_SUBTITLES,W.DEFAULT_DURATION,W.NO_MUTED_PREF,W.NO_VOLUME_PREF,W.LANG,W.LOOP,W.LIVE_EDGE_OFFSET,W.SEEK_TO_LIVE_OFFSET,W.NO_AUTO_SEEK_TO_LIVE)}get mediaStore(){return H(this,U)}set mediaStore(e){var t;if(H(this,U)&&((t=H(this,gr))==null||t.call(this),ur(this,gr,void 0)),ur(this,U,e),!H(this,U)&&!this.hasAttribute(W.NO_DEFAULT_STORE)){dr(this,yr,br).call(this);return}ur(this,gr,H(this,U)?.subscribe(H(this,hr)))}get fullscreenElement(){return H(this,pr)??this}set fullscreenElement(e){var t;this.hasAttribute(W.FULLSCREEN_ELEMENT)&&this.removeAttribute(W.FULLSCREEN_ELEMENT),ur(this,pr,e),(t=H(this,U))==null||t.dispatch({type:`fullscreenelementchangerequest`,detail:this.fullscreenElement})}get defaultSubtitles(){return N(this,W.DEFAULT_SUBTITLES)}set defaultSubtitles(e){P(this,W.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return F(this,W.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){I(this,W.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return j(this,W.DEFAULT_DURATION)}set defaultDuration(e){M(this,W.DEFAULT_DURATION,e)}get noHotkeys(){return N(this,W.NO_HOTKEYS)}set noHotkeys(e){P(this,W.NO_HOTKEYS,e)}get keysUsed(){return F(this,W.KEYS_USED)}set keysUsed(e){I(this,W.KEYS_USED,e)}get liveEdgeOffset(){return j(this,W.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){M(this,W.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return N(this,W.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){P(this,W.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return N(this,W.NO_VOLUME_PREF)}set noVolumePref(e){P(this,W.NO_VOLUME_PREF,e)}get noMutedPref(){return N(this,W.NO_MUTED_PREF)}set noMutedPref(e){P(this,W.NO_MUTED_PREF,e)}get noSubtitlesLangPref(){return N(this,W.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){P(this,W.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return N(this,W.NO_DEFAULT_STORE)}set noDefaultStore(e){P(this,W.NO_DEFAULT_STORE,e)}get resolvedLang(){return Ue()}attributeChangedCallback(e,t,n){var r,i,a,o,s,c,l,u,d,f;if(super.attributeChangedCallback(e,t,n),e===W.NO_HOTKEYS)n!==t&&n===``?(this.hasAttribute(W.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):n!==t&&n===null&&this.enableHotkeys();else if(e===W.HOTKEYS)H(this,fr).value=n;else if(e===W.DEFAULT_SUBTITLES&&n!==t)(r=H(this,U))==null||r.dispatch({type:`optionschangerequest`,detail:{defaultSubtitles:this.hasAttribute(W.DEFAULT_SUBTITLES)}});else if(e===W.DEFAULT_STREAM_TYPE)(i=H(this,U))==null||i.dispatch({type:`optionschangerequest`,detail:{defaultStreamType:this.getAttribute(W.DEFAULT_STREAM_TYPE)??void 0}});else if(e===W.LIVE_EDGE_OFFSET&&n!==t)(a=H(this,U))==null||a.dispatch({type:`optionschangerequest`,detail:{liveEdgeOffset:this.hasAttribute(W.LIVE_EDGE_OFFSET)?+this.getAttribute(W.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(W.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(W.SEEK_TO_LIVE_OFFSET):this.hasAttribute(W.LIVE_EDGE_OFFSET)?+this.getAttribute(W.LIVE_EDGE_OFFSET):void 0}});else if(e===W.SEEK_TO_LIVE_OFFSET&&n!==t)(o=H(this,U))==null||o.dispatch({type:`optionschangerequest`,detail:{seekToLiveOffset:this.hasAttribute(W.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(W.SEEK_TO_LIVE_OFFSET):this.hasAttribute(W.LIVE_EDGE_OFFSET)?+this.getAttribute(W.LIVE_EDGE_OFFSET):void 0}});else if(e===W.NO_AUTO_SEEK_TO_LIVE)(s=H(this,U))==null||s.dispatch({type:`optionschangerequest`,detail:{noAutoSeekToLive:this.hasAttribute(W.NO_AUTO_SEEK_TO_LIVE)}});else if(e===W.FULLSCREEN_ELEMENT){let e=n?this.getRootNode()?.getElementById(n):void 0;ur(this,pr,e),(c=H(this,U))==null||c.dispatch({type:`fullscreenelementchangerequest`,detail:this.fullscreenElement})}else e===W.LANG&&n!==t?(Ve(n),(l=H(this,U))==null||l.dispatch({type:`optionschangerequest`,detail:{mediaLang:n}})):e===W.LOOP&&n!==t?(u=H(this,U))==null||u.dispatch({type:y.MEDIA_LOOP_REQUEST,detail:n!=null}):e===W.NO_VOLUME_PREF&&n!==t?(d=H(this,U))==null||d.dispatch({type:`optionschangerequest`,detail:{noVolumePref:this.hasAttribute(W.NO_VOLUME_PREF)}}):e===W.NO_MUTED_PREF&&n!==t&&((f=H(this,U))==null||f.dispatch({type:`optionschangerequest`,detail:{noMutedPref:this.hasAttribute(W.NO_MUTED_PREF)}}))}connectedCallback(){var e,t;this.associateElement(this),!H(this,U)&&!this.hasAttribute(W.NO_DEFAULT_STORE)&&dr(this,yr,br).call(this),(e=H(this,U))==null||e.dispatch({type:`documentelementchangerequest`,detail:O}),(t=H(this,U))==null||t.dispatch({type:`fullscreenelementchangerequest`,detail:this.fullscreenElement}),super.connectedCallback(),H(this,U)&&!H(this,gr)&&ur(this,gr,H(this,U)?.subscribe(H(this,hr))),H(this,vr)!==void 0&&H(this,U)&&this.media&&setTimeout(()=>{var e;this.media?.textTracks?.length&&((e=H(this,U))==null||e.dispatch({type:y.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:H(this,vr)}))},0),this.hasAttribute(W.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}disconnectedCallback(){var e,t,n,r,i;if((e=super.disconnectedCallback)==null||e.call(this),this.disableHotkeys(),H(this,U)){let e=H(this,U).getState();ur(this,vr,!!e.mediaSubtitlesShowing?.length),(t=H(this,U))==null||t.dispatch({type:`fullscreenelementchangerequest`,detail:void 0}),(n=H(this,U))==null||n.dispatch({type:`documentelementchangerequest`,detail:void 0}),(r=H(this,U))==null||r.dispatch({type:y.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})}H(this,gr)&&((i=H(this,gr))==null||i.call(this),ur(this,gr,void 0)),this.unassociateElement(this),H(this,mr)&&(H(this,mr).remove(),ur(this,mr,null))}mediaSetCallback(e){var t;super.mediaSetCallback(e),(t=H(this,U))==null||t.dispatch({type:`mediaelementchangerequest`,detail:e}),e.hasAttribute(`tabindex`)||(e.tabIndex=-1)}mediaUnsetCallback(e){var t;super.mediaUnsetCallback(e),(t=H(this,U))==null||t.dispatch({type:`mediaelementchangerequest`,detail:void 0})}propagateMediaState(e,t){Ur(this.mediaStateReceivers,e,t)}associateElement(e){if(!e)return;let{associatedElementSubscriptions:t}=this;if(t.has(e))return;let n=Wr(e,this.registerMediaStateReceiver.bind(this),this.unregisterMediaStateReceiver.bind(this));Object.values(y).forEach(t=>{e.addEventListener(t,H(this,_r))}),t.set(e,n)}unassociateElement(e){if(!e)return;let{associatedElementSubscriptions:t}=this;t.has(e)&&(t.get(e)(),t.delete(e),Object.values(y).forEach(t=>{e.removeEventListener(t,H(this,_r))}))}registerMediaStateReceiver(e){if(!e)return;let t=this.mediaStateReceivers;t.indexOf(e)>-1||(t.push(e),H(this,U)&&Object.entries(H(this,U).getState()).forEach(([t,n])=>{Ur([e],t,n)}))}unregisterMediaStateReceiver(e){let t=this.mediaStateReceivers,n=t.indexOf(e);n<0||t.splice(n,1)}enableHotkeys(){this.addEventListener(`keydown`,dr(this,Sr,Cr))}disableHotkeys(){this.removeEventListener(`keydown`,dr(this,Sr,Cr)),this.removeEventListener(`keyup`,H(this,xr))}get hotkeys(){return H(this,fr)}set hotkeys(e){I(this,W.HOTKEYS,e)}keyboardShortcutHandler(e){let t=e.target;if((t.getAttribute(W.KEYS_USED)?.split(` `)??t?.keysUsed??[]).map(e=>e===`Space`?` `:e).filter(Boolean).includes(e.key))return;let n,r,i;if(!H(this,fr).contains(`no${e.key.toLowerCase()}`)&&!(e.key===` `&&H(this,fr).contains(`nospace`))&&!(e.shiftKey&&(e.key===`/`||e.key===`?`)&&H(this,fr).contains(`noshift+/`)))switch(e.key){case` `:case`k`:n=H(this,U).getState().mediaPaused?y.MEDIA_PLAY_REQUEST:y.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new D.CustomEvent(n,{composed:!0,bubbles:!0}));break;case`m`:n=this.mediaStore.getState().mediaVolumeLevel===`off`?y.MEDIA_UNMUTE_REQUEST:y.MEDIA_MUTE_REQUEST,this.dispatchEvent(new D.CustomEvent(n,{composed:!0,bubbles:!0}));break;case`f`:n=this.mediaStore.getState().mediaIsFullscreen?y.MEDIA_EXIT_FULLSCREEN_REQUEST:y.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new D.CustomEvent(n,{composed:!0,bubbles:!0}));break;case`c`:this.dispatchEvent(new D.CustomEvent(y.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case`ArrowLeft`:case`j`:{let e=this.hasAttribute(W.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(W.KEYBOARD_BACKWARD_SEEK_OFFSET):Dr;r=Math.max((this.mediaStore.getState().mediaCurrentTime??0)-e,0),i=new D.CustomEvent(y.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`ArrowRight`:case`l`:{let e=this.hasAttribute(W.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(W.KEYBOARD_FORWARD_SEEK_OFFSET):Dr;r=Math.max((this.mediaStore.getState().mediaCurrentTime??0)+e,0),i=new D.CustomEvent(y.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`ArrowUp`:{let e=this.hasAttribute(W.KEYBOARD_UP_VOLUME_STEP)?+this.getAttribute(W.KEYBOARD_UP_VOLUME_STEP):Or;r=Math.min((this.mediaStore.getState().mediaVolume??1)+e,1),i=new D.CustomEvent(y.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`ArrowDown`:{let e=this.hasAttribute(W.KEYBOARD_DOWN_VOLUME_STEP)?+this.getAttribute(W.KEYBOARD_DOWN_VOLUME_STEP):Or;r=Math.max((this.mediaStore.getState().mediaVolume??1)-e,0),i=new D.CustomEvent(y.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`<`:{let e=this.mediaStore.getState().mediaPlaybackRate??1;r=Math.max(e-kr,Ar).toFixed(2),i=new D.CustomEvent(y.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`>`:{let e=this.mediaStore.getState().mediaPlaybackRate??1;r=Math.min(e+kr,jr).toFixed(2),i=new D.CustomEvent(y.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r}),this.dispatchEvent(i);break}case`/`:case`?`:e.shiftKey&&dr(this,wr,Tr).call(this);break;case`p`:n=this.mediaStore.getState().mediaIsPip?y.MEDIA_EXIT_PIP_REQUEST:y.MEDIA_ENTER_PIP_REQUEST,i=new D.CustomEvent(n,{composed:!0,bubbles:!0}),this.dispatchEvent(i);break;default:break}}};fr=new WeakMap,pr=new WeakMap,U=new WeakMap,mr=new WeakMap,hr=new WeakMap,gr=new WeakMap,_r=new WeakMap,vr=new WeakMap,yr=new WeakSet,br=function(){this.mediaStore=sr({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(W.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(W.DEFAULT_DURATION)?+this.getAttribute(W.DEFAULT_DURATION):void 0,defaultStreamType:this.getAttribute(W.DEFAULT_STREAM_TYPE)??void 0,liveEdgeOffset:this.hasAttribute(W.LIVE_EDGE_OFFSET)?+this.getAttribute(W.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(W.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(W.SEEK_TO_LIVE_OFFSET):this.hasAttribute(W.LIVE_EDGE_OFFSET)?+this.getAttribute(W.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(W.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(W.NO_VOLUME_PREF),noMutedPref:this.hasAttribute(W.NO_MUTED_PREF),noSubtitlesLangPref:this.hasAttribute(W.NO_SUBTITLES_LANG_PREF)}})},xr=new WeakMap,Sr=new WeakSet,Cr=function(e){let{metaKey:t,altKey:n,key:r,shiftKey:i}=e,a=i&&(r===`/`||r===`?`);if(a&&H(this,mr)?.open){this.removeEventListener(`keyup`,H(this,xr));return}if(t||n||!a&&!Er.includes(r)){this.removeEventListener(`keyup`,H(this,xr));return}let o=e.target,s=o instanceof HTMLElement&&(o.tagName.toLowerCase()===`media-volume-range`||o.tagName.toLowerCase()===`media-time-range`);[` `,`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`].includes(r)&&!(H(this,fr).contains(`no${r.toLowerCase()}`)||r===` `&&H(this,fr).contains(`nospace`))&&!s&&e.preventDefault(),this.addEventListener(`keyup`,H(this,xr),{once:!0})},wr=new WeakSet,Tr=function(){H(this,mr)||(ur(this,mr,O.createElement(`media-keyboard-shortcuts-dialog`)),this.appendChild(H(this,mr))),H(this,mr).open=!0};var Nr=Object.values(x),Pr=Object.values(De),Fr=e=>{var t;let{observedAttributes:n}=e.constructor;!n&&e.nodeName?.includes(`-`)&&(D.customElements.upgrade(e),{observedAttributes:n}=e.constructor);let r=((t=(e?.getAttribute)?.call(e,b.MEDIA_CHROME_ATTRIBUTES))?.split)?.call(t,/\s+/);return Array.isArray(n||r)?(n||r).filter(e=>Nr.includes(e)):[]},Ir=e=>(e.nodeName?.includes(`-`)&&D.customElements.get(e.nodeName?.toLowerCase())&&!(e instanceof D.customElements.get(e.nodeName.toLowerCase()))&&D.customElements.upgrade(e),Pr.some(t=>t in e)),Lr=e=>Ir(e)||!!Fr(e).length,Rr=e=>(e?.join)?.call(e,`:`),zr={[x.MEDIA_SUBTITLES_LIST]:Sn,[x.MEDIA_SUBTITLES_SHOWING]:Sn,[x.MEDIA_SEEKABLE]:Rr,[x.MEDIA_BUFFERED]:e=>e?.map(Rr).join(` `),[x.MEDIA_PREVIEW_COORDS]:e=>e?.join(` `),[x.MEDIA_RENDITION_LIST]:Ne,[x.MEDIA_AUDIO_TRACK_LIST]:Fe},Br=async(e,t,n)=>{if(e.isConnected||await Re(0),typeof n==`boolean`||n==null)return P(e,t,n);if(typeof n==`number`)return M(e,t,n);if(typeof n==`string`)return I(e,t,n);if(Array.isArray(n)&&!n.length)return e.removeAttribute(t);let r=zr[t]?.call(zr,n)??n;return e.setAttribute(t,r)},Vr=e=>!!e.closest?.call(e,`*[slot="media"]`),Hr=(e,t)=>{if(Vr(e))return;let n=(e,t)=>{Lr(e)&&t(e);let{children:n=[]}=e??{},r=e?.shadowRoot?.children??[];[...n,...r].forEach(e=>Hr(e,t))},r=e?.nodeName.toLowerCase();if(r.includes(`-`)&&!Lr(e)){D.customElements.whenDefined(r).then(()=>{n(e,t)});return}n(e,t)},Ur=(e,t,n)=>{e.forEach(e=>{if(t in e){e[t]=n;return}let r=Fr(e),i=t.toLowerCase();r.includes(i)&&Br(e,i,n)})},Wr=(e,t,n)=>{Hr(e,t);let r=e=>{t(e?.composedPath()[0]??e.target)},i=e=>{n(e?.composedPath()[0]??e.target)};e.addEventListener(y.REGISTER_MEDIA_STATE_RECEIVER,r),e.addEventListener(y.UNREGISTER_MEDIA_STATE_RECEIVER,i);let a=e=>{e.forEach(e=>{let{addedNodes:r=[],removedNodes:i=[],type:a,target:o,attributeName:s}=e;a===`childList`?(Array.prototype.forEach.call(r,e=>Hr(e,t)),Array.prototype.forEach.call(i,e=>Hr(e,n))):a===`attributes`&&s===b.MEDIA_CHROME_ATTRIBUTES&&(Lr(o)?t(o):n(o))})},o=[],s=e=>{let r=e.target;r.name!==`media`&&(o.forEach(e=>Hr(e,n)),o=[...r.assignedElements({flatten:!0})],o.forEach(e=>Hr(e,t)))};e.addEventListener(`slotchange`,s);let c=new MutationObserver(a);return c.observe(e,{childList:!0,attributes:!0,subtree:!0}),()=>{Hr(e,n),e.removeEventListener(`slotchange`,s),c.disconnect(),e.removeEventListener(y.REGISTER_MEDIA_STATE_RECEIVER,r),e.removeEventListener(y.UNREGISTER_MEDIA_STATE_RECEIVER,i)}};D.customElements.get(`media-controller`)||D.customElements.define(`media-controller`,Mr);var Gr=Mr,Kr={PLACEMENT:`placement`,BOUNDS:`bounds`};function qr(e){return`
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
  `}var Jr=class extends D.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{if(!gt(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;let e=this.placement;if(e===`left`||e===`right`){this.style.removeProperty(`--media-tooltip-offset-x`);return}let t=getComputedStyle(this),n=pt(this,`#`+this.bounds)??st(this);if(!n)return;let{x:r,width:i}=n.getBoundingClientRect(),{x:a,width:o}=this.getBoundingClientRect(),s=a+o,c=r+i,l=t.getPropertyValue(`--media-tooltip-offset-x`),u=l?parseFloat(l.replace(`px`,``)):0,d=t.getPropertyValue(`--media-tooltip-container-margin`),f=d?parseFloat(d.replace(`px`,``)):0,p=a-r+u-f,m=s-c+u+f;if(p<0){this.style.setProperty(`--media-tooltip-offset-x`,`${p}px`);return}if(m>0){this.style.setProperty(`--media-tooltip-offset-x`,`${m}px`);return}this.style.removeProperty(`--media-tooltip-offset-x`)},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=k(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector(`#arrow`),Object.prototype.hasOwnProperty.call(this,`placement`)){let e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[Kr.PLACEMENT,Kr.BOUNDS]}get placement(){return F(this,Kr.PLACEMENT)}set placement(e){I(this,Kr.PLACEMENT,e)}get bounds(){return F(this,Kr.BOUNDS)}set bounds(e){I(this,Kr.BOUNDS,e)}};Jr.shadowRootOptions={mode:`open`},Jr.getTemplateHTML=qr,D.customElements.get(`media-tooltip`)||D.customElements.define(`media-tooltip`,Jr);var Yr=Jr,Xr=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},G=(e,t,n)=>(Xr(e,t,`read from private field`),n?n.call(e):t.get(e)),Zr=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Qr=(e,t,n,r)=>(Xr(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),$r=(e,t,n)=>(Xr(e,t,`access private method`),n),ei,ti,ni,ri,ii,ai,oi,si={TOOLTIP_PLACEMENT:`tooltipplacement`,DISABLED:`disabled`,NO_TOOLTIP:`notooltip`};function ci(e,t={}){return`
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
        <template shadowrootmode="${Yr.shadowRootOptions.mode}">
          ${Yr.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(e)}
        </slot>
      </media-tooltip>
    </slot>
  `}function li(e,t){return`
    <slot></slot>
  `}function ui(){return``}var K=class extends D.HTMLElement{constructor(){if(super(),Zr(this,ai),Zr(this,ei,void 0),this.preventClick=!1,this.tooltipEl=null,Zr(this,ti,e=>{this.preventClick||this.handleClick(e),setTimeout(G(this,ni),0)}),Zr(this,ni,()=>{var e,t;(t=(e=this.tooltipEl)?.updateXOffset)==null||t.call(e)}),Zr(this,ri,e=>{let{key:t}=e;if(!this.keysUsed.includes(t)){this.removeEventListener(`keyup`,G(this,ri));return}this.preventClick||this.handleClick(e)}),Zr(this,ii,e=>{let{metaKey:t,altKey:n,key:r}=e;if(t||n||!this.keysUsed.includes(r)){this.removeEventListener(`keyup`,G(this,ri));return}this.addEventListener(`keyup`,G(this,ri),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=k(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}this.tooltipEl=this.shadowRoot.querySelector(`media-tooltip`)}static get observedAttributes(){return[`disabled`,si.TOOLTIP_PLACEMENT,b.MEDIA_CONTROLLER,x.MEDIA_LANG]}enable(){this.addEventListener(`click`,G(this,ti)),this.addEventListener(`keydown`,G(this,ii)),this.tabIndex=0}disable(){this.removeEventListener(`click`,G(this,ti)),this.removeEventListener(`keydown`,G(this,ii)),this.removeEventListener(`keyup`,G(this,ri)),this.tabIndex=-1}attributeChangedCallback(e,t,n){var r,i,a,o;e===b.MEDIA_CONTROLLER?(t&&((i=(r=G(this,ei))?.unassociateElement)==null||i.call(r,this),Qr(this,ei,null)),n&&this.isConnected&&(Qr(this,ei,this.getRootNode()?.getElementById(n)),(o=(a=G(this,ei))?.associateElement)==null||o.call(a,this))):e===`disabled`&&n!==t?n==null?this.enable():this.disable():e===si.TOOLTIP_PLACEMENT&&this.tooltipEl&&n!==t?this.tooltipEl.placement=n:e===x.MEDIA_LANG&&(this.shadowRoot.querySelector(`slot[name="tooltip-content"]`).innerHTML=this.constructor.getTooltipContentHTML()),G(this,ni).call(this)}connectedCallback(){var e,t;let{style:n}=A(this.shadowRoot,`:host`);n.setProperty(`display`,`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute(`disabled`)?this.disable():this.enable(),this.setAttribute(`role`,`button`);let r=this.getAttribute(b.MEDIA_CONTROLLER);r&&(Qr(this,ei,this.getRootNode()?.getElementById(r)),(t=(e=G(this,ei))?.associateElement)==null||t.call(e,this)),D.customElements.whenDefined(`media-tooltip`).then(()=>$r(this,ai,oi).call(this))}disconnectedCallback(){var e,t;this.disable(),(t=(e=G(this,ei))?.unassociateElement)==null||t.call(e,this),Qr(this,ei,null),this.removeEventListener(`mouseenter`,G(this,ni)),this.removeEventListener(`focus`,G(this,ni)),this.removeEventListener(`click`,G(this,ti))}get keysUsed(){return[`Enter`,` `]}get tooltipPlacement(){return F(this,si.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){I(this,si.TOOLTIP_PLACEMENT,e)}get mediaController(){return F(this,b.MEDIA_CONTROLLER)}set mediaController(e){I(this,b.MEDIA_CONTROLLER,e)}get disabled(){return N(this,si.DISABLED)}set disabled(e){P(this,si.DISABLED,e)}get noTooltip(){return N(this,si.NO_TOOLTIP)}set noTooltip(e){P(this,si.NO_TOOLTIP,e)}handleClick(e){}};ei=new WeakMap,ti=new WeakMap,ni=new WeakMap,ri=new WeakMap,ii=new WeakMap,ai=new WeakSet,oi=function(){this.addEventListener(`mouseenter`,G(this,ni)),this.addEventListener(`focus`,G(this,ni)),this.addEventListener(`click`,G(this,ti));let e=this.tooltipPlacement;e&&this.tooltipEl&&(this.tooltipEl.placement=e)},K.shadowRootOptions={mode:`open`},K.getTemplateHTML=ci,K.getSlotTemplateHTML=li,K.getTooltipContentHTML=ui,D.customElements.get(`media-chrome-button`)||D.customElements.define(`media-chrome-button`,K);var di=K,fi=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;function pi(e){return`
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
      <slot name="enter">${fi}</slot>
      <slot name="exit">${fi}</slot>
    </slot>
  `}function mi(){return`
    <slot name="tooltip-enter">${E(`start airplay`)}</slot>
    <slot name="tooltip-exit">${E(`stop airplay`)}</slot>
  `}var hi=e=>{let t=e.mediaIsAirplaying?E(`stop airplay`):E(`start airplay`);e.setAttribute(`aria-label`,t)},gi=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_IS_AIRPLAYING,x.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),hi(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_IS_AIRPLAYING&&hi(this)}get mediaIsAirplaying(){return N(this,x.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){P(this,x.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return F(this,x.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){I(this,x.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){let e=new D.CustomEvent(y.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}};gi.getSlotTemplateHTML=pi,gi.getTooltipContentHTML=mi,D.customElements.get(`media-airplay-button`)||D.customElements.define(`media-airplay-button`,gi);var _i=gi,vi=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,yi=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function bi(e){return`
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
      <slot name="on">${vi}</slot>
      <slot name="off">${yi}</slot>
    </slot>
  `}function xi(){return`
    <slot name="tooltip-enable">${E(`Enable captions`)}</slot>
    <slot name="tooltip-disable">${E(`Disable captions`)}</slot>
  `}var Si=e=>{e.setAttribute(`aria-checked`,Dn(e).toString())},Ci=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_SUBTITLES_LIST,x.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`button`),this.setAttribute(`aria-label`,E(`closed captions`)),Si(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_SUBTITLES_SHOWING&&Si(this)}get mediaSubtitlesList(){return wi(this,x.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Ti(this,x.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return wi(this,x.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Ti(this,x.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new D.CustomEvent(y.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}};Ci.getSlotTemplateHTML=bi,Ci.getTooltipContentHTML=xi;var wi=(e,t)=>{let n=e.getAttribute(t);return n?yn(n):[]},Ti=(e,t,n)=>{if(!n?.length){e.removeAttribute(t);return}let r=Sn(n);e.getAttribute(t)!==r&&e.setAttribute(t,r)};D.customElements.get(`media-captions-button`)||D.customElements.define(`media-captions-button`,Ci);var Ei=Ci,Di=`<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>`,Oi=`<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>`;function ki(e){return`
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
      <slot name="enter">${Di}</slot>
      <slot name="exit">${Oi}</slot>
    </slot>
  `}function Ai(){return`
    <slot name="tooltip-enter">${E(`Start casting`)}</slot>
    <slot name="tooltip-exit">${E(`Stop casting`)}</slot>
  `}var ji=e=>{let t=e.mediaIsCasting?E(`stop casting`):E(`start casting`);e.setAttribute(`aria-label`,t)},Mi=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_IS_CASTING,x.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),ji(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_IS_CASTING&&ji(this)}get mediaIsCasting(){return N(this,x.MEDIA_IS_CASTING)}set mediaIsCasting(e){P(this,x.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return F(this,x.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){I(this,x.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){let e=this.mediaIsCasting?y.MEDIA_EXIT_CAST_REQUEST:y.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new D.CustomEvent(e,{composed:!0,bubbles:!0}))}};Mi.getSlotTemplateHTML=ki,Mi.getTooltipContentHTML=Ai,D.customElements.get(`media-cast-button`)||D.customElements.define(`media-cast-button`,Mi);var Ni=Mi,Pi=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Fi=(e,t,n)=>(Pi(e,t,`read from private field`),n?n.call(e):t.get(e)),Ii=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Li=(e,t,n,r)=>(Pi(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Ri=(e,t,n)=>(Pi(e,t,`access private method`),n),zi,Bi,Vi,Hi,Ui,Wi,Gi,Ki,qi,Ji,Yi,Xi,Zi,Qi,$i;function ea(e){return`
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
  `}function ta(e){return`
    <slot id="content"></slot>
  `}var na={OPEN:`open`,ANCHOR:`anchor`},ra=class extends D.HTMLElement{constructor(){super(),Ii(this,Hi),Ii(this,Wi),Ii(this,Ki),Ii(this,Ji),Ii(this,Xi),Ii(this,Qi),Ii(this,zi,!1),Ii(this,Bi,null),Ii(this,Vi,null)}static get observedAttributes(){return[na.OPEN,na.ANCHOR]}get open(){return N(this,na.OPEN)}set open(e){P(this,na.OPEN,e)}handleEvent(e){switch(e.type){case`invoke`:Ri(this,Ji,Yi).call(this,e);break;case`focusout`:Ri(this,Xi,Zi).call(this,e);break;case`keydown`:Ri(this,Qi,$i).call(this,e);break}}connectedCallback(){Ri(this,Hi,Ui).call(this),this.role||=`dialog`,this.addEventListener(`invoke`,this),this.addEventListener(`focusout`,this),this.addEventListener(`keydown`,this)}disconnectedCallback(){this.removeEventListener(`invoke`,this),this.removeEventListener(`focusout`,this),this.removeEventListener(`keydown`,this)}attributeChangedCallback(e,t,n){Ri(this,Hi,Ui).call(this),e===na.OPEN&&n!==t&&(this.open?Ri(this,Wi,Gi).call(this):Ri(this,Ki,qi).call(this))}focus(){Li(this,Bi,mt());let e=!this.dispatchEvent(new Event(`focus`,{composed:!0,cancelable:!0})),t=!this.dispatchEvent(new Event(`focusin`,{composed:!0,bubbles:!0,cancelable:!0}));e||t||this.querySelector(`[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]`)?.focus()}get keysUsed(){return[`Escape`,`Tab`]}};zi=new WeakMap,Bi=new WeakMap,Vi=new WeakMap,Hi=new WeakSet,Ui=function(){if(!Fi(this,zi)&&(Li(this,zi,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);let e=k(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e),queueMicrotask(()=>{let{style:e}=A(this.shadowRoot,`:host`);e.setProperty(`transition`,`display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in`)})}},Wi=new WeakSet,Gi=function(){var e;(e=Fi(this,Vi))==null||e.setAttribute(`aria-expanded`,`true`),this.dispatchEvent(new Event(`open`,{composed:!0,bubbles:!0})),this.addEventListener(`transitionend`,()=>this.focus(),{once:!0})},Ki=new WeakSet,qi=function(){var e;(e=Fi(this,Vi))==null||e.setAttribute(`aria-expanded`,`false`),this.dispatchEvent(new Event(`close`,{composed:!0,bubbles:!0}))},Ji=new WeakSet,Yi=function(e){Li(this,Vi,e.relatedTarget),ft(this,e.relatedTarget)||(this.open=!this.open)},Xi=new WeakSet,Zi=function(e){var t;ft(this,e.relatedTarget)||((t=Fi(this,Bi))==null||t.focus(),Fi(this,Vi)&&Fi(this,Vi)!==e.relatedTarget&&this.open&&(this.open=!1))},Qi=new WeakSet,$i=function(e){var t,n,r,i,a;let{key:o,ctrlKey:s,altKey:c,metaKey:l}=e;s||c||l||this.keysUsed.includes(o)&&(e.preventDefault(),e.stopPropagation(),o===`Tab`?(e.shiftKey?(n=(t=this.previousElementSibling)?.focus)==null||n.call(t):(i=(r=this.nextElementSibling)?.focus)==null||i.call(r),this.blur()):o===`Escape`&&((a=Fi(this,Bi))==null||a.focus(),this.open=!1))},ra.shadowRootOptions={mode:`open`},ra.getTemplateHTML=ea,ra.getSlotTemplateHTML=ta,D.customElements.get(`media-chrome-dialog`)||D.customElements.define(`media-chrome-dialog`,ra);var ia=ra,aa=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},q=(e,t,n)=>(aa(e,t,`read from private field`),n?n.call(e):t.get(e)),J=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},oa=(e,t,n,r)=>(aa(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),sa=(e,t,n)=>(aa(e,t,`access private method`),n),ca,la,ua,da,fa,pa,ma,ha,ga,_a,va,ya,ba,xa,Sa,Ca,wa,Ta,Ea,Da,Oa,ka,Aa,ja,Ma;function Na(e){return`
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
  `}function Pa(e){return``}var Fa=class extends D.HTMLElement{constructor(){if(super(),J(this,_a),J(this,ya),J(this,xa),J(this,Ca),J(this,Ta),J(this,Da),J(this,ka),J(this,ja),J(this,ca,void 0),J(this,la,void 0),J(this,ua,void 0),J(this,da,void 0),J(this,fa,{}),J(this,pa,[]),J(this,ma,()=>{if(this.range.matches(`:focus-visible`)){let{style:e}=A(this.shadowRoot,`:host`);e.setProperty(`--_focus-visible-box-shadow`,`var(--_focus-box-shadow)`)}}),J(this,ha,()=>{let{style:e}=A(this.shadowRoot,`:host`);e.removeProperty(`--_focus-visible-box-shadow`)}),J(this,ga,()=>{let e=this.shadowRoot.querySelector(`#segments-clipping`);e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=k(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}this.container=this.shadowRoot.querySelector(`#container`),oa(this,ua,this.shadowRoot.querySelector(`#startpoint`)),oa(this,da,this.shadowRoot.querySelector(`#endpoint`)),this.range=this.shadowRoot.querySelector(`#range`),this.appearance=this.shadowRoot.querySelector(`#appearance`)}static get observedAttributes(){return[`disabled`,`aria-disabled`,b.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,n){var r,i,a,o;e===b.MEDIA_CONTROLLER?(t&&((i=(r=q(this,ca))?.unassociateElement)==null||i.call(r,this),oa(this,ca,null)),n&&this.isConnected&&(oa(this,ca,this.getRootNode()?.getElementById(n)),(o=(a=q(this,ca))?.associateElement)==null||o.call(a,this))):(e===`disabled`||e===`aria-disabled`&&t!==n)&&(n==null?(this.range.removeAttribute(e),sa(this,ya,ba).call(this)):(this.range.setAttribute(e,n),sa(this,xa,Sa).call(this)))}connectedCallback(){var e,t;let{style:n}=A(this.shadowRoot,`:host`);n.setProperty(`display`,`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),q(this,fa).pointer=A(this.shadowRoot,`#pointer`),q(this,fa).progress=A(this.shadowRoot,`#progress`),q(this,fa).thumb=A(this.shadowRoot,`#thumb, ::slotted([slot="thumb"])`),q(this,fa).activeSegment=A(this.shadowRoot,`#segments-clipping rect:nth-child(0)`);let r=this.getAttribute(b.MEDIA_CONTROLLER);r&&(oa(this,ca,this.getRootNode()?.getElementById(r)),(t=(e=q(this,ca))?.associateElement)==null||t.call(e,this)),this.updateBar(),this.shadowRoot.addEventListener(`focusin`,q(this,ma)),this.shadowRoot.addEventListener(`focusout`,q(this,ha)),sa(this,ya,ba).call(this),at(this.container,q(this,ga))}disconnectedCallback(){var e,t;sa(this,xa,Sa).call(this),(t=(e=q(this,ca))?.unassociateElement)==null||t.call(e,this),oa(this,ca,null),this.shadowRoot.removeEventListener(`focusin`,q(this,ma)),this.shadowRoot.removeEventListener(`focusout`,q(this,ha)),ot(this.container,q(this,ga))}updatePointerBar(e){var t;(t=q(this,fa).pointer)==null||t.style.setProperty(`width`,`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,t;let n=this.range.valueAsNumber*100;(e=q(this,fa).progress)==null||e.style.setProperty(`width`,`${n}%`),(t=q(this,fa).thumb)==null||t.style.setProperty(`left`,`${n}%`)}updateSegments(e){let t=this.shadowRoot.querySelector(`#segments-clipping`);if(t.textContent=``,this.container.classList.toggle(`segments`,!!e?.length),!e?.length)return;let n=[...new Set([+this.range.min,...e.flatMap(e=>[e.start,e.end]),+this.range.max])];oa(this,pa,[...n]);let r=n.pop();for(let[e,i]of n.entries()){let[a,o]=[e===0,e===n.length-1],s=a?`calc(var(--segments-gap) / -1)`:`${i*100}%`,c=`calc(${((o?r:n[e+1])-i)*100}%${a||o?``:` - var(--segments-gap)`})`,l=O.createElementNS(`http://www.w3.org/2000/svg`,`rect`),u=yt(this.shadowRoot,`#segments-clipping rect:nth-child(${e+1})`);u.style.setProperty(`x`,s),u.style.setProperty(`width`,c),t.append(l)}}getPointerRatio(e){return _t(e.clientX,e.clientY,q(this,ua).getBoundingClientRect(),q(this,da).getBoundingClientRect())}get dragging(){return this.hasAttribute(`dragging`)}handleEvent(e){switch(e.type){case`pointermove`:sa(this,ja,Ma).call(this,e);break;case`input`:this.updateBar();break;case`pointerenter`:sa(this,Ta,Ea).call(this,e);break;case`pointerdown`:sa(this,Ca,wa).call(this,e);break;case`pointerup`:sa(this,Da,Oa).call(this);break;case`pointerleave`:sa(this,ka,Aa).call(this);break}}get keysUsed(){return[`ArrowUp`,`ArrowRight`,`ArrowDown`,`ArrowLeft`]}};ca=new WeakMap,la=new WeakMap,ua=new WeakMap,da=new WeakMap,fa=new WeakMap,pa=new WeakMap,ma=new WeakMap,ha=new WeakMap,ga=new WeakMap,_a=new WeakSet,va=function(e){let t=q(this,fa).activeSegment;if(!t)return;let n=this.getPointerRatio(e),r=`#segments-clipping rect:nth-child(${q(this,pa).findIndex((e,t,r)=>{let i=r[t+1];return i!=null&&n>=e&&n<=i})+1})`;(t.selectorText!=r||!t.style.transform)&&(t.selectorText=r,t.style.setProperty(`transform`,`var(--media-range-segment-hover-transform, scaleY(2))`))},ya=new WeakSet,ba=function(){this.hasAttribute(`disabled`)||!this.isConnected||(this.addEventListener(`input`,this),this.addEventListener(`pointerdown`,this),this.addEventListener(`pointerenter`,this))},xa=new WeakSet,Sa=function(){var e,t;this.removeEventListener(`input`,this),this.removeEventListener(`pointerdown`,this),this.removeEventListener(`pointerenter`,this),this.removeEventListener(`pointerleave`,this),(e=D.window)==null||e.removeEventListener(`pointerup`,this),(t=D.window)==null||t.removeEventListener(`pointermove`,this)},Ca=new WeakSet,wa=function(e){var t;oa(this,la,e.composedPath().includes(this.range)),(t=D.window)==null||t.addEventListener(`pointerup`,this,{once:!0})},Ta=new WeakSet,Ea=function(e){var t;e.pointerType!==`mouse`&&sa(this,Ca,wa).call(this,e),this.addEventListener(`pointerleave`,this,{once:!0}),(t=D.window)==null||t.addEventListener(`pointermove`,this)},Da=new WeakSet,Oa=function(){var e;(e=D.window)==null||e.removeEventListener(`pointerup`,this),this.toggleAttribute(`dragging`,!1),this.range.disabled=this.hasAttribute(`disabled`)},ka=new WeakSet,Aa=function(){var e,t;this.removeEventListener(`pointerleave`,this),(e=D.window)==null||e.removeEventListener(`pointermove`,this),this.toggleAttribute(`dragging`,!1),this.range.disabled=this.hasAttribute(`disabled`),(t=q(this,fa).activeSegment)==null||t.style.removeProperty(`transform`)},ja=new WeakSet,Ma=function(e){e.pointerType===`pen`&&e.buttons===0||(this.toggleAttribute(`dragging`,e.buttons===1||e.pointerType!==`mouse`),this.updatePointerBar(e),sa(this,_a,va).call(this,e),this.dragging&&(e.pointerType!==`mouse`||!q(this,la))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(e),this.range.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0}))))},Fa.shadowRootOptions={mode:`open`},Fa.getTemplateHTML=Na,Fa.getContainerTemplateHTML=Pa,D.customElements.get(`media-chrome-range`)||D.customElements.define(`media-chrome-range`,Fa);var Ia=Fa,La=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Ra=(e,t,n)=>(La(e,t,`read from private field`),n?n.call(e):t.get(e)),za=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Ba=(e,t,n,r)=>(La(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Va;function Ha(e){return`
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
  `}var Ua=class extends D.HTMLElement{constructor(){if(super(),za(this,Va,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=k(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[b.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,n){var r,i,a,o;e===b.MEDIA_CONTROLLER&&(t&&((i=(r=Ra(this,Va))?.unassociateElement)==null||i.call(r,this),Ba(this,Va,null)),n&&this.isConnected&&(Ba(this,Va,this.getRootNode()?.getElementById(n)),(o=(a=Ra(this,Va))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;let n=this.getAttribute(b.MEDIA_CONTROLLER);n&&(Ba(this,Va,this.getRootNode()?.getElementById(n)),(t=(e=Ra(this,Va))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=Ra(this,Va))?.unassociateElement)==null||t.call(e,this),Ba(this,Va,null)}};Va=new WeakMap,Ua.shadowRootOptions={mode:`open`},Ua.getTemplateHTML=Ha,D.customElements.get(`media-control-bar`)||D.customElements.define(`media-control-bar`,Ua);var Wa=Ua,Ga=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Ka=(e,t,n)=>(Ga(e,t,`read from private field`),n?n.call(e):t.get(e)),qa=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Ja=(e,t,n,r)=>(Ga(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Ya;function Xa(e,t={}){return`
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
  `}function Za(e,t){return`
    <slot></slot>
  `}var Qa=class extends D.HTMLElement{constructor(){if(super(),qa(this,Ya,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=k(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[b.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,n){var r,i,a,o;e===b.MEDIA_CONTROLLER&&(t&&((i=(r=Ka(this,Ya))?.unassociateElement)==null||i.call(r,this),Ja(this,Ya,null)),n&&this.isConnected&&(Ja(this,Ya,this.getRootNode()?.getElementById(n)),(o=(a=Ka(this,Ya))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;let{style:n}=A(this.shadowRoot,`:host`);n.setProperty(`display`,`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);let r=this.getAttribute(b.MEDIA_CONTROLLER);r&&(Ja(this,Ya,this.getRootNode()?.getElementById(r)),(t=(e=Ka(this,Ya))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=Ka(this,Ya))?.unassociateElement)==null||t.call(e,this),Ja(this,Ya,null)}};Ya=new WeakMap,Qa.shadowRootOptions={mode:`open`},Qa.getTemplateHTML=Xa,Qa.getSlotTemplateHTML=Za,D.customElements.get(`media-text-display`)||D.customElements.define(`media-text-display`,Qa);var $a=Qa,eo=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},to=(e,t,n)=>(eo(e,t,`read from private field`),n?n.call(e):t.get(e)),no=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},ro=(e,t,n,r)=>(eo(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),io;function ao(e,t){return`
    <slot>${qe(t.mediaDuration)}</slot>
  `}var oo=class extends Qa{constructor(){super(),no(this,io,void 0),ro(this,io,this.shadowRoot.querySelector(`slot`)),to(this,io).textContent=qe(this.mediaDuration??0)}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_DURATION]}attributeChangedCallback(e,t,n){e===x.MEDIA_DURATION&&(to(this,io).textContent=qe(+n)),super.attributeChangedCallback(e,t,n)}get mediaDuration(){return j(this,x.MEDIA_DURATION)}set mediaDuration(e){M(this,x.MEDIA_DURATION,e)}};io=new WeakMap,oo.getSlotTemplateHTML=ao,D.customElements.get(`media-duration-display`)||D.customElements.define(`media-duration-display`,oo);var so=oo,co={2:E(`Network Error`),3:E(`Decode Error`),4:E(`Source Not Supported`),5:E(`Encryption Error`)},lo={2:E(`A network error caused the media download to fail.`),3:E(`A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.`),4:E(`An unsupported error occurred. The server or network failed, or your browser does not support this format.`),5:E(`The media is encrypted and there are no keys to decrypt it.`)},uo=e=>e.code===1?null:{title:co[e.code]??`Error ${e.code}`,message:lo[e.code]??e.message},fo=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},po=(e,t,n)=>(fo(e,t,`read from private field`),n?n.call(e):t.get(e)),mo=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},ho=(e,t,n,r)=>(fo(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),go;function _o(e){return`
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
      ${yo({code:+e.mediaerrorcode,message:e.mediaerrormessage})}
    </slot>
  `}function vo(e){return e.code&&uo(e)!==null}function yo(e){let{title:t,message:n}=uo(e)??{},r=``;return t&&(r+=`<slot name="error-${e.code}-title"><h3>${t}</h3></slot>`),n&&(r+=`<slot name="error-${e.code}-message"><p>${n}</p></slot>`),r}var bo=[x.MEDIA_ERROR_CODE,x.MEDIA_ERROR_MESSAGE],xo=class extends ra{constructor(){super(...arguments),mo(this,go,null)}static get observedAttributes(){return[...super.observedAttributes,...bo]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),!bo.includes(e))return;let r=this.mediaError??{code:this.mediaErrorCode,message:this.mediaErrorMessage};if(this.open=vo(r),this.open&&(this.shadowRoot.querySelector(`slot`).name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector(`#content`).innerHTML=this.formatErrorMessage(r),!this.hasAttribute(`aria-label`))){let{title:e}=uo(r);e&&this.setAttribute(`aria-label`,e)}}get mediaError(){return po(this,go)}set mediaError(e){ho(this,go,e)}get mediaErrorCode(){return j(this,`mediaerrorcode`)}set mediaErrorCode(e){M(this,`mediaerrorcode`,e)}get mediaErrorMessage(){return F(this,`mediaerrormessage`)}set mediaErrorMessage(e){I(this,`mediaerrormessage`,e)}};go=new WeakMap,xo.getSlotTemplateHTML=_o,xo.formatErrorMessage=yo,D.customElements.get(`media-error-dialog`)||D.customElements.define(`media-error-dialog`,xo);var So=xo,Co=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},wo=(e,t,n)=>(Co(e,t,`read from private field`),n?n.call(e):t.get(e)),To=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Eo,Do;function Oo(e){return`
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
      ${ko()}
    </slot>
  `}function ko(){return`
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${[{keys:[`Space`,`k`],description:`Toggle Playback`},{keys:[`m`],description:`Toggle mute`},{keys:[`f`],description:`Toggle fullscreen`},{keys:[`c`],description:`Toggle captions or subtitles, if available`},{keys:[`p`],description:`Toggle Picture in Picture`},{keys:[`←`,`j`],description:`Seek back 10s`},{keys:[`→`,`l`],description:`Seek forward 10s`},{keys:[`↑`],description:`Turn volume up`},{keys:[`↓`],description:`Turn volume down`},{keys:[`< (SHIFT+,)`],description:`Decrease playback rate`},{keys:[`> (SHIFT+.)`],description:`Increase playback rate`}].map(({keys:e,description:t})=>`
      <tr>
        <td>
          <div class="key-combo">${e.map((e,t)=>t>0?`<span class="key-separator">or</span><span class="key">${e}</span>`:`<span class="key">${e}</span>`).join(``)}</div>
        </td>
        <td class="description">${t}</td>
      </tr>
    `).join(``)}</table>
  `}var Ao=class extends ra{constructor(){super(...arguments),To(this,Eo,e=>{if(!this.open)return;let t=this.shadowRoot?.querySelector(`#content`);if(!t)return;let n=e.composedPath(),r=n[0]===this||n.includes(this),i=n.includes(t);r&&!i&&(this.open=!1)}),To(this,Do,e=>{if(!this.open)return;let t=e.shiftKey&&(e.key===`/`||e.key===`?`);(e.key===`Escape`||t)&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(this.open=!1,e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),this.open&&(this.addEventListener(`click`,wo(this,Eo)),document.addEventListener(`keydown`,wo(this,Do)))}disconnectedCallback(){this.removeEventListener(`click`,wo(this,Eo)),document.removeEventListener(`keydown`,wo(this,Do))}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===`open`&&(this.open?(this.addEventListener(`click`,wo(this,Eo)),document.addEventListener(`keydown`,wo(this,Do))):(this.removeEventListener(`click`,wo(this,Eo)),document.removeEventListener(`keydown`,wo(this,Do))))}};Eo=new WeakMap,Do=new WeakMap,Ao.getSlotTemplateHTML=Oo,D.customElements.get(`media-keyboard-shortcuts-dialog`)||D.customElements.define(`media-keyboard-shortcuts-dialog`,Ao);var jo=Ao,Mo=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},No=(e,t,n)=>(Mo(e,t,`read from private field`),n?n.call(e):t.get(e)),Po=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Fo=(e,t,n,r)=>(Mo(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),Io,Lo=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,Ro=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;function zo(e){return`
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
      <slot name="enter">${Lo}</slot>
      <slot name="exit">${Ro}</slot>
    </slot>
  `}function Bo(){return`
    <slot name="tooltip-enter">${E(`Enter fullscreen mode`)}</slot>
    <slot name="tooltip-exit">${E(`Exit fullscreen mode`)}</slot>
  `}var Vo=e=>{let t=e.mediaIsFullscreen?E(`exit fullscreen mode`):E(`enter fullscreen mode`);e.setAttribute(`aria-label`,t)},Ho=class extends K{constructor(){super(...arguments),Po(this,Io,null)}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_IS_FULLSCREEN,x.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Vo(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_IS_FULLSCREEN&&Vo(this)}get mediaFullscreenUnavailable(){return F(this,x.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){I(this,x.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return N(this,x.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){P(this,x.MEDIA_IS_FULLSCREEN,e)}handleClick(e){Fo(this,Io,e);let t=No(this,Io)instanceof PointerEvent,n=this.mediaIsFullscreen?new D.CustomEvent(y.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0}):new D.CustomEvent(y.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0,detail:t});this.dispatchEvent(n)}};Io=new WeakMap,Ho.getSlotTemplateHTML=zo,Ho.getTooltipContentHTML=Bo,D.customElements.get(`media-fullscreen-button`)||D.customElements.define(`media-fullscreen-button`,Ho);var Uo=Ho,{MEDIA_TIME_IS_LIVE:Wo,MEDIA_PAUSED:Go}=x,{MEDIA_SEEK_TO_LIVE_REQUEST:Ko,MEDIA_PLAY_REQUEST:qo}=y,Jo=`<svg viewBox="0 0 6 12" aria-hidden="true"><circle cx="3" cy="6" r="2"></circle></svg>`;function Yo(e){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${Wo}]:not([${Go}])) slot[name=indicator] > *,
      :host([${Wo}]:not([${Go}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${Wo}]:not([${Go}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${Jo}</slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${E(`live`)}</slot>
  `}var Xo=e=>{let t=e.mediaPaused||!e.mediaTimeIsLive,n=E(t?`seek to live`:`playing live`);e.setAttribute(`aria-label`,n);let r=e.shadowRoot?.querySelector(`slot[name="text"]`);r&&(r.textContent=E(`live`)),t?e.removeAttribute(`aria-disabled`):e.setAttribute(`aria-disabled`,`true`)},Zo=class extends K{static get observedAttributes(){return[...super.observedAttributes,Wo,Go]}connectedCallback(){super.connectedCallback(),Xo(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),Xo(this)}get mediaPaused(){return N(this,x.MEDIA_PAUSED)}set mediaPaused(e){P(this,x.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return N(this,x.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){P(this,x.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new D.CustomEvent(Ko,{composed:!0,bubbles:!0})),this.hasAttribute(Go)&&this.dispatchEvent(new D.CustomEvent(qo,{composed:!0,bubbles:!0})))}};Zo.getSlotTemplateHTML=Yo,D.customElements.get(`media-live-button`)||D.customElements.define(`media-live-button`,Zo);var Qo=Zo,$o=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},es=(e,t,n)=>($o(e,t,`read from private field`),n?n.call(e):t.get(e)),ts=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},ns=(e,t,n,r)=>($o(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),rs,is,as={LOADING_DELAY:`loadingdelay`,NO_AUTOHIDE:`noautohide`},os=500,ss=`
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
`;function cs(e){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${os}ms);
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

    <slot name="icon">${ss}</slot>
    <div id="status" role="status" aria-live="polite">${E(`media loading`)}</div>
  `}var ls=class extends D.HTMLElement{constructor(){if(super(),ts(this,rs,void 0),ts(this,is,os),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=k(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[b.MEDIA_CONTROLLER,x.MEDIA_PAUSED,x.MEDIA_LOADING,as.LOADING_DELAY]}attributeChangedCallback(e,t,n){var r,i,a,o;e===as.LOADING_DELAY&&t!==n?this.loadingDelay=Number(n):e===b.MEDIA_CONTROLLER&&(t&&((i=(r=es(this,rs))?.unassociateElement)==null||i.call(r,this),ns(this,rs,null)),n&&this.isConnected&&(ns(this,rs,this.getRootNode()?.getElementById(n)),(o=(a=es(this,rs))?.associateElement)==null||o.call(a,this)))}connectedCallback(){var e,t;let n=this.getAttribute(b.MEDIA_CONTROLLER);n&&(ns(this,rs,this.getRootNode()?.getElementById(n)),(t=(e=es(this,rs))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=es(this,rs))?.unassociateElement)==null||t.call(e,this),ns(this,rs,null)}get loadingDelay(){return es(this,is)}set loadingDelay(e){ns(this,is,e);let{style:t}=A(this.shadowRoot,`:host`);t.setProperty(`--_loading-indicator-delay`,`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return N(this,x.MEDIA_PAUSED)}set mediaPaused(e){P(this,x.MEDIA_PAUSED,e)}get mediaLoading(){return N(this,x.MEDIA_LOADING)}set mediaLoading(e){P(this,x.MEDIA_LOADING,e)}get mediaController(){return F(this,b.MEDIA_CONTROLLER)}set mediaController(e){I(this,b.MEDIA_CONTROLLER,e)}get noAutohide(){return N(this,as.NO_AUTOHIDE)}set noAutohide(e){P(this,as.NO_AUTOHIDE,e)}};rs=new WeakMap,is=new WeakMap,ls.shadowRootOptions={mode:`open`},ls.getTemplateHTML=cs,D.customElements.get(`media-loading-indicator`)||D.customElements.define(`media-loading-indicator`,ls);var us=ls,ds=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,fs=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,ps=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;function ms(e){return`
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
      <slot name="off">${ds}</slot>
      <slot name="low">${fs}</slot>
      <slot name="medium">${fs}</slot>
      <slot name="high">${ps}</slot>
    </slot>
  `}function hs(){return`
    <slot name="tooltip-mute">${E(`Mute`)}</slot>
    <slot name="tooltip-unmute">${E(`Unmute`)}</slot>
  `}var gs=e=>{let t=e.mediaVolumeLevel===`off`?E(`unmute`):E(`mute`);e.setAttribute(`aria-label`,t)},_s=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),gs(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_VOLUME_LEVEL&&gs(this)}get mediaVolumeLevel(){return F(this,x.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){I(this,x.MEDIA_VOLUME_LEVEL,e)}handleClick(){let e=this.mediaVolumeLevel===`off`?y.MEDIA_UNMUTE_REQUEST:y.MEDIA_MUTE_REQUEST;this.dispatchEvent(new D.CustomEvent(e,{composed:!0,bubbles:!0}))}};_s.getSlotTemplateHTML=ms,_s.getTooltipContentHTML=hs,D.customElements.get(`media-mute-button`)||D.customElements.define(`media-mute-button`,_s);var vs=_s,ys=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;function bs(e){return`
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
      <slot name="enter">${ys}</slot>
      <slot name="exit">${ys}</slot>
    </slot>
  `}function xs(){return`
    <slot name="tooltip-enter">${E(`Enter picture in picture mode`)}</slot>
    <slot name="tooltip-exit">${E(`Exit picture in picture mode`)}</slot>
  `}var Ss=e=>{let t=e.mediaIsPip?E(`exit picture in picture mode`):E(`enter picture in picture mode`);e.setAttribute(`aria-label`,t)},Cs=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_IS_PIP,x.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Ss(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_IS_PIP&&Ss(this)}get mediaPipUnavailable(){return F(this,x.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){I(this,x.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return N(this,x.MEDIA_IS_PIP)}set mediaIsPip(e){P(this,x.MEDIA_IS_PIP,e)}handleClick(){let e=this.mediaIsPip?y.MEDIA_EXIT_PIP_REQUEST:y.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new D.CustomEvent(e,{composed:!0,bubbles:!0}))}};Cs.getSlotTemplateHTML=bs,Cs.getTooltipContentHTML=xs,D.customElements.get(`media-pip-button`)||D.customElements.define(`media-pip-button`,Cs);var ws=Cs,Ts=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Es=(e,t,n)=>(Ts(e,t,`read from private field`),n?n.call(e):t.get(e)),Ds=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Os,ks={RATES:`rates`},As=[1,1.2,1.5,1.7,2];function js(e){return Math.round(e*100)/100}function Ms(e){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${e.mediaplaybackrate?js(+e.mediaplaybackrate):1}x</slot>
  `}function Ns(){return E(`Playback rate`)}var Ps=class extends K{constructor(){super(),Ds(this,Os,new gn(this,ks.RATES,{defaultValue:As})),this.container=this.shadowRoot.querySelector(`slot[name="icon"]`),this.container.innerHTML=`${js(this.mediaPlaybackRate??1)}x`}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PLAYBACK_RATE,ks.RATES]}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),e===ks.RATES&&(Es(this,Os).value=n),e===x.MEDIA_PLAYBACK_RATE){let e=n?+n:NaN,t=js(Number.isNaN(e)?1:e);this.container.innerHTML=`${t}x`,this.setAttribute(`aria-label`,E(`Playback rate {playbackRate}`,{playbackRate:t}))}}get rates(){return Es(this,Os)}set rates(e){e?Array.isArray(e)?Es(this,Os).value=e.join(` `):typeof e==`string`&&(Es(this,Os).value=e):Es(this,Os).value=``}get mediaPlaybackRate(){return j(this,x.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){M(this,x.MEDIA_PLAYBACK_RATE,e)}handleClick(){let e=Array.from(Es(this,Os).values(),e=>+e).sort((e,t)=>e-t),t=e.find(e=>e>this.mediaPlaybackRate)??e[0]??1,n=new D.CustomEvent(y.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:t});this.dispatchEvent(n)}};Os=new WeakMap,Ps.getSlotTemplateHTML=Ms,Ps.getTooltipContentHTML=Ns,D.customElements.get(`media-playback-rate-button`)||D.customElements.define(`media-playback-rate-button`,Ps);var Fs=Ps,Is=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,Ls=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;function Rs(e){return`
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
      <slot name="play">${Is}</slot>
      <slot name="pause">${Ls}</slot>
    </slot>
  `}function zs(){return`
    <slot name="tooltip-play">${E(`Play`)}</slot>
    <slot name="tooltip-pause">${E(`Pause`)}</slot>
  `}var Bs=e=>{let t=e.mediaPaused?E(`play`):E(`pause`);e.setAttribute(`aria-label`,t)},Vs=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PAUSED,x.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),Bs(this)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),(e===x.MEDIA_PAUSED||e===x.MEDIA_LANG)&&Bs(this)}get mediaPaused(){return N(this,x.MEDIA_PAUSED)}set mediaPaused(e){P(this,x.MEDIA_PAUSED,e)}handleClick(){let e=this.mediaPaused?y.MEDIA_PLAY_REQUEST:y.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new D.CustomEvent(e,{composed:!0,bubbles:!0}))}};Vs.getSlotTemplateHTML=Rs,Vs.getTooltipContentHTML=zs,D.customElements.get(`media-play-button`)||D.customElements.define(`media-play-button`,Vs);var Hs=Vs,Us={PLACEHOLDER_SRC:`placeholdersrc`,SRC:`src`};function Ws(e){return`
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
  `}var Gs=e=>{e.style.removeProperty(`background-image`)},Ks=(e,t)=>{e.style[`background-image`]=`url('${t}')`},qs=class extends D.HTMLElement{static get observedAttributes(){return[Us.PLACEHOLDER_SRC,Us.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=k(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector(`#image`)}attributeChangedCallback(e,t,n){e===Us.SRC&&(n==null?this.image.removeAttribute(Us.SRC):this.image.setAttribute(Us.SRC,n)),e===Us.PLACEHOLDER_SRC&&(n==null?Gs(this.image):Ks(this.image,n))}get placeholderSrc(){return F(this,Us.PLACEHOLDER_SRC)}set placeholderSrc(e){I(this,Us.SRC,e)}get src(){return F(this,Us.SRC)}set src(e){I(this,Us.SRC,e)}};qs.shadowRootOptions={mode:`open`},qs.getTemplateHTML=Ws,D.customElements.get(`media-poster-image`)||D.customElements.define(`media-poster-image`,qs);var Js=qs,Ys=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Xs=(e,t,n)=>(Ys(e,t,`read from private field`),n?n.call(e):t.get(e)),Zs=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Qs=(e,t,n,r)=>(Ys(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),$s,ec=class extends Qa{constructor(){super(),Zs(this,$s,void 0),Qs(this,$s,this.shadowRoot.querySelector(`slot`))}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PREVIEW_CHAPTER,x.MEDIA_LANG]}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),(e===x.MEDIA_PREVIEW_CHAPTER||e===x.MEDIA_LANG)&&n!==t&&n!=null)if(Xs(this,$s).textContent=n,n!==``){let e=E(`chapter: {chapterName}`,{chapterName:n});this.setAttribute(`aria-valuetext`,e)}else this.removeAttribute(`aria-valuetext`)}get mediaPreviewChapter(){return F(this,x.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){I(this,x.MEDIA_PREVIEW_CHAPTER,e)}};$s=new WeakMap,D.customElements.get(`media-preview-chapter-display`)||D.customElements.define(`media-preview-chapter-display`,ec);var tc=ec,nc=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},rc=(e,t,n)=>(nc(e,t,`read from private field`),n?n.call(e):t.get(e)),ic=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},ac=(e,t,n,r)=>(nc(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),oc;function sc(e){return`
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
  `}var cc=class extends D.HTMLElement{constructor(){if(super(),ic(this,oc,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=k(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[b.MEDIA_CONTROLLER,x.MEDIA_PREVIEW_IMAGE,x.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,t;let n=this.getAttribute(b.MEDIA_CONTROLLER);n&&(ac(this,oc,this.getRootNode()?.getElementById(n)),(t=(e=rc(this,oc))?.associateElement)==null||t.call(e,this))}disconnectedCallback(){var e,t;(t=(e=rc(this,oc))?.unassociateElement)==null||t.call(e,this),ac(this,oc,null)}attributeChangedCallback(e,t,n){var r,i,a,o;[x.MEDIA_PREVIEW_IMAGE,x.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===b.MEDIA_CONTROLLER&&(t&&((i=(r=rc(this,oc))?.unassociateElement)==null||i.call(r,this),ac(this,oc,null)),n&&this.isConnected&&(ac(this,oc,this.getRootNode()?.getElementById(n)),(o=(a=rc(this,oc))?.associateElement)==null||o.call(a,this)))}get mediaPreviewImage(){return F(this,x.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){I(this,x.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){let e=this.getAttribute(x.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(e=>+e)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(x.MEDIA_PREVIEW_COORDS);return}this.setAttribute(x.MEDIA_PREVIEW_COORDS,e.join(` `))}update(){let e=this.mediaPreviewCoords,t=this.mediaPreviewImage;if(!(e&&t))return;let[n,r,i,a]=e,o=t.split(`#`)[0],s=getComputedStyle(this),{maxWidth:c,maxHeight:l,minWidth:u,minHeight:d}=s,f=s.getPropertyValue(`--media-preview-thumbnail-object-fit`).trim()||`contain`,p,m;if(f===`fill`){let e=parseInt(c)/i,t=parseInt(l)/a,n=parseInt(u)/i,r=parseInt(d)/a;p=e<1?e:Math.max(e,n),m=t<1?t:Math.max(t,r)}else{let e=Math.min(parseInt(c)/i,parseInt(l)/a),t=Math.max(parseInt(u)/i,parseInt(d)/a),n=e<1?e:t>1?t:1;p=n,m=n}let{style:h}=A(this.shadowRoot,`:host`),g=A(this.shadowRoot,`img`).style,ee=this.shadowRoot.querySelector(`img`),te=Math.min(p,m)<1?`min`:`max`;h.setProperty(`${te}-width`,`initial`,`important`),h.setProperty(`${te}-height`,`initial`,`important`),h.width=`${i*p}px`,h.height=`${a*m}px`;let ne=()=>{g.width=`${this.imgWidth*p}px`,g.height=`${this.imgHeight*m}px`,g.display=`block`};ee.src!==o&&(ee.onload=()=>{this.imgWidth=ee.naturalWidth,this.imgHeight=ee.naturalHeight,ne(),ee.onload=null},ee.src=o,ne()),ne(),g.transform=`translate(-${n*p}px, -${r*m}px)`}};oc=new WeakMap,cc.shadowRootOptions={mode:`open`},cc.getTemplateHTML=sc,D.customElements.get(`media-preview-thumbnail`)||D.customElements.define(`media-preview-thumbnail`,cc);var lc=cc,uc=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},dc=(e,t,n)=>(uc(e,t,`read from private field`),n?n.call(e):t.get(e)),fc=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},pc=(e,t,n,r)=>(uc(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),mc,hc=class extends Qa{constructor(){super(),fc(this,mc,void 0),pc(this,mc,this.shadowRoot.querySelector(`slot`)),dc(this,mc).textContent=qe(0)}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_PREVIEW_TIME&&n!=null&&(dc(this,mc).textContent=qe(parseFloat(n)))}get mediaPreviewTime(){return j(this,x.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){M(this,x.MEDIA_PREVIEW_TIME,e)}};mc=new WeakMap,D.customElements.get(`media-preview-time-display`)||D.customElements.define(`media-preview-time-display`,hc);var gc=hc,_c={SEEK_OFFSET:`seekoffset`},vc=30,yc=e=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${e}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`;function bc(e,t){return`
    <slot name="icon">${yc(t.seekOffset)}</slot>
  `}var xc=(e,t)=>{e.setAttribute(`aria-label`,E(`seek back {seekOffset} seconds`,{seekOffset:t}))};function Sc(){return E(`Seek backward`)}var Cc=0,wc=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_CURRENT_TIME,_c.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=j(this,_c.SEEK_OFFSET,vc)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),xc(this,this.seekOffset),e===_c.SEEK_OFFSET&&(this.seekOffset=j(this,_c.SEEK_OFFSET,vc))}get seekOffset(){return j(this,_c.SEEK_OFFSET,vc)}set seekOffset(e){M(this,_c.SEEK_OFFSET,e),this.setAttribute(`aria-label`,E(`seek back {seekOffset} seconds`,{seekOffset:this.seekOffset})),lt(dt(this,`icon`),this.seekOffset)}get mediaCurrentTime(){return j(this,x.MEDIA_CURRENT_TIME,Cc)}set mediaCurrentTime(e){M(this,x.MEDIA_CURRENT_TIME,e)}handleClick(){let e=Math.max(this.mediaCurrentTime-this.seekOffset,0),t=new D.CustomEvent(y.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}};wc.getSlotTemplateHTML=bc,wc.getTooltipContentHTML=Sc,D.customElements.get(`media-seek-backward-button`)||D.customElements.define(`media-seek-backward-button`,wc);var Tc=wc,Ec={SEEK_OFFSET:`seekoffset`},Dc=30,Oc=e=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${e}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`;function kc(e,t){return`
    <slot name="icon">${Oc(t.seekOffset)}</slot>
  `}var Ac=(e,t)=>{e.setAttribute(`aria-label`,E(`seek forward {seekOffset} seconds`,{seekOffset:t}))};function jc(){return E(`Seek forward`)}var Mc=0,Nc=class extends K{static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_CURRENT_TIME,Ec.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=j(this,Ec.SEEK_OFFSET,Dc)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),Ac(this,this.seekOffset),e===Ec.SEEK_OFFSET&&(this.seekOffset=j(this,Ec.SEEK_OFFSET,Dc))}get seekOffset(){return j(this,Ec.SEEK_OFFSET,Dc)}set seekOffset(e){M(this,Ec.SEEK_OFFSET,e),this.setAttribute(`aria-label`,E(`seek forward {seekOffset} seconds`,{seekOffset:this.seekOffset})),lt(dt(this,`icon`),this.seekOffset)}get mediaCurrentTime(){return j(this,x.MEDIA_CURRENT_TIME,Mc)}set mediaCurrentTime(e){M(this,x.MEDIA_CURRENT_TIME,e)}handleClick(){let e=this.mediaCurrentTime+this.seekOffset,t=new D.CustomEvent(y.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}};Nc.getSlotTemplateHTML=kc,Nc.getTooltipContentHTML=jc,D.customElements.get(`media-seek-forward-button`)||D.customElements.define(`media-seek-forward-button`,Nc);var Pc=Nc,Fc=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Ic=(e,t,n)=>(Fc(e,t,`read from private field`),n?n.call(e):t.get(e)),Lc=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Rc=(e,t,n,r)=>(Fc(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),zc=(e,t,n)=>(Fc(e,t,`access private method`),n),Bc,Vc,Hc,Uc,Wc,Gc,Kc,qc,Jc,Yc,Xc,Zc={REMAINING:`remaining`,SHOW_DURATION:`showduration`,NO_TOGGLE:`notoggle`},Qc=[...Object.values(Zc),x.MEDIA_CURRENT_TIME,x.MEDIA_DURATION,x.MEDIA_SEEKABLE],$c=[`Enter`,` `],el=`&nbsp;/&nbsp;`,tl=(e,{timesSep:t=el}={})=>{let n=e.mediaCurrentTime??0,[,r]=e.mediaSeekable??[],i=0;Number.isFinite(e.mediaDuration)?i=e.mediaDuration:Number.isFinite(r)&&(i=r);let a=e.remaining?qe(0-(i-n)):qe(n);return e.showDuration?`${a}${t}${qe(i)}`:a},nl=e=>{let t=e.mediaCurrentTime,[,n]=e.mediaSeekable??[],r=null;if(Number.isFinite(e.mediaDuration)?r=e.mediaDuration:Number.isFinite(n)&&(r=n),t==null||r===null){e.setAttribute(`aria-description`,E(`video not loaded, unknown time.`));return}let i=e.remaining?Ke(0-(r-t)):Ke(t);if(!e.showDuration){e.setAttribute(`aria-description`,i);return}let a=E(`{currentTime} of {totalTime}`,{currentTime:i,totalTime:Ke(r)});e.setAttribute(`aria-description`,a)};function rl(e,t){return`
    <slot>${tl(t)}</slot>
  `}var il=e=>{e.setAttribute(`aria-label`,E(`playback time`))},al=class extends Qa{constructor(){super(),Lc(this,Uc),Lc(this,Gc),Lc(this,qc),Lc(this,Yc),Lc(this,Bc,void 0),Lc(this,Vc,null),Lc(this,Hc,e=>{let{metaKey:t,altKey:n,key:r}=e;if(t||n||!$c.includes(r)){this.removeEventListener(`keyup`,Ic(this,Vc));return}this.addEventListener(`keyup`,Ic(this,Vc))}),Rc(this,Bc,this.shadowRoot.querySelector(`slot`)),Ic(this,Bc).innerHTML=`${tl(this)}`}static get observedAttributes(){return[...super.observedAttributes,...Qc,`disabled`]}connectedCallback(){let{style:e}=A(this.shadowRoot,`:host(:hover:not([notoggle]))`);e.setProperty(`cursor`,`var(--media-cursor, pointer)`),e.setProperty(`background`,`var(--media-control-hover-background, rgba(50 50 70 / .7))`),this.setAttribute(`aria-label`,E(`playback time`)),zc(this,qc,Jc).call(this),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute(`remaining`)?this.removeAttribute(`remaining`):this.setAttribute(`remaining`,``))}disconnectedCallback(){this.disable(),zc(this,Gc,Kc).call(this),super.disconnectedCallback()}attributeChangedCallback(e,t,n){il(this),Qc.includes(e)?this.update():e===`disabled`&&n!==t?n==null?zc(this,qc,Jc).call(this):zc(this,Yc,Xc).call(this):e===Zc.NO_TOGGLE&&n!==t&&(this.noToggle?zc(this,Yc,Xc).call(this):zc(this,qc,Jc).call(this)),super.attributeChangedCallback(e,t,n)}enable(){this.noToggle||(this.tabIndex=0)}disable(){this.tabIndex=-1}get remaining(){return N(this,Zc.REMAINING)}set remaining(e){P(this,Zc.REMAINING,e)}get showDuration(){return N(this,Zc.SHOW_DURATION)}set showDuration(e){P(this,Zc.SHOW_DURATION,e)}get noToggle(){return N(this,Zc.NO_TOGGLE)}set noToggle(e){P(this,Zc.NO_TOGGLE,e)}get mediaDuration(){return j(this,x.MEDIA_DURATION)}set mediaDuration(e){M(this,x.MEDIA_DURATION,e)}get mediaCurrentTime(){return j(this,x.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){M(this,x.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){let e=this.getAttribute(x.MEDIA_SEEKABLE);if(e)return e.split(`:`).map(e=>+e)}set mediaSeekable(e){if(e==null){this.removeAttribute(x.MEDIA_SEEKABLE);return}this.setAttribute(x.MEDIA_SEEKABLE,e.join(`:`))}update(){let e=tl(this);nl(this),e!==Ic(this,Bc).innerHTML&&(Ic(this,Bc).innerHTML=e)}};Bc=new WeakMap,Vc=new WeakMap,Hc=new WeakMap,Uc=new WeakSet,Wc=function(){Ic(this,Vc)||(Rc(this,Vc,e=>{let{key:t}=e;if(!$c.includes(t)){this.removeEventListener(`keyup`,Ic(this,Vc));return}this.toggleTimeDisplay()}),this.addEventListener(`keydown`,Ic(this,Hc)),this.addEventListener(`click`,this.toggleTimeDisplay))},Gc=new WeakSet,Kc=function(){Ic(this,Vc)&&(this.removeEventListener(`keyup`,Ic(this,Vc)),this.removeEventListener(`keydown`,Ic(this,Hc)),this.removeEventListener(`click`,this.toggleTimeDisplay),Rc(this,Vc,null))},qc=new WeakSet,Jc=function(){!this.noToggle&&!this.hasAttribute(`disabled`)&&(this.setAttribute(`role`,`button`),this.enable(),zc(this,Uc,Wc).call(this))},Yc=new WeakSet,Xc=function(){this.removeAttribute(`role`),this.disable(),zc(this,Gc,Kc).call(this)},al.getSlotTemplateHTML=rl,D.customElements.get(`media-time-display`)||D.customElements.define(`media-time-display`,al);var ol=al,sl=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},Y=(e,t,n)=>(sl(e,t,`read from private field`),n?n.call(e):t.get(e)),cl=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},ll=(e,t,n,r)=>(sl(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),ul=(e,t,n,r)=>({set _(r){ll(e,t,r,n)},get _(){return Y(e,t,r)}}),dl,fl,pl,ml,hl,gl,_l,vl,yl,bl,xl=class{constructor(e,t,n){cl(this,dl,void 0),cl(this,fl,void 0),cl(this,pl,void 0),cl(this,ml,void 0),cl(this,hl,void 0),cl(this,gl,void 0),cl(this,_l,void 0),cl(this,vl,void 0),cl(this,yl,0),cl(this,bl,(e=performance.now())=>{ll(this,yl,requestAnimationFrame(Y(this,bl))),ll(this,ml,performance.now()-Y(this,pl));let t=1e3/this.fps;if(Y(this,ml)>t){ll(this,pl,e-Y(this,ml)%t);let n=1e3/((e-Y(this,fl))/++ul(this,hl)._),r=(e-Y(this,gl))/1e3/this.duration,i=Y(this,_l)+r*this.playbackRate;i-Y(this,dl).valueAsNumber>0?ll(this,vl,this.playbackRate/this.duration/n):(ll(this,vl,.995*Y(this,vl)),i=Y(this,dl).valueAsNumber+Y(this,vl)),this.callback(i)}}),ll(this,dl,e),this.callback=t,this.fps=n}start(){Y(this,yl)===0&&(ll(this,pl,performance.now()),ll(this,fl,Y(this,pl)),ll(this,hl,0),Y(this,bl).call(this))}stop(){Y(this,yl)!==0&&(cancelAnimationFrame(Y(this,yl)),ll(this,yl,0))}update({start:e,duration:t,playbackRate:n}){let r=e-Y(this,dl).valueAsNumber,i=Math.abs(t-this.duration);(r>0||r<-.03||i>=.5)&&this.callback(e),ll(this,_l,e),ll(this,gl,performance.now()),this.duration=t,this.playbackRate=n}};dl=new WeakMap,fl=new WeakMap,pl=new WeakMap,ml=new WeakMap,hl=new WeakMap,gl=new WeakMap,_l=new WeakMap,vl=new WeakMap,yl=new WeakMap,bl=new WeakMap;var Sl=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},X=(e,t,n)=>(Sl(e,t,`read from private field`),n?n.call(e):t.get(e)),Z=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},Cl=(e,t,n,r)=>(Sl(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),wl=(e,t,n)=>(Sl(e,t,`access private method`),n),Tl,El,Dl,Ol,kl,Al,jl,Ml,Nl,Pl,Fl,Il,Ll,Rl,zl,Bl,Vl,Hl,Ul,Wl,Gl,Kl,ql,Jl,Yl,Xl,Zl=e=>{let t=e.range,n=Ke(+eu(e)),r=Ke(+e.mediaSeekableEnd),i=n&&r?E(`{currentTime} of {totalTime}`,{currentTime:n,totalTime:r}):E(`video not loaded, unknown time.`);t.setAttribute(`aria-valuetext`,i)};function Ql(e){return`
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
          <template shadowrootmode="${lc.shadowRootOptions.mode}">
            ${lc.getTemplateHTML({})}
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
  `}var $l=(e,t=e.mediaCurrentTime)=>{let n=Number.isFinite(e.mediaSeekableStart)?e.mediaSeekableStart:0,r=Number.isFinite(e.mediaDuration)?e.mediaDuration:e.mediaSeekableEnd;if(Number.isNaN(r))return 0;let i=(t-n)/(r-n);return Math.max(0,Math.min(i,1))},eu=(e,t=e.range.valueAsNumber)=>{let n=Number.isFinite(e.mediaSeekableStart)?e.mediaSeekableStart:0,r=Number.isFinite(e.mediaDuration)?e.mediaDuration:e.mediaSeekableEnd;return Number.isNaN(r)?0:t*(r-n)+n},tu=class extends Fa{constructor(){super(),Z(this,Il),Z(this,zl),Z(this,Vl),Z(this,Ul),Z(this,Gl),Z(this,ql),Z(this,Yl),Z(this,Tl,null),Z(this,El,void 0),Z(this,Dl,void 0),Z(this,Ol,void 0),Z(this,kl,void 0),Z(this,Al,void 0),Z(this,jl,void 0),Z(this,Ml,void 0),Z(this,Nl,void 0),Z(this,Pl,void 0),Z(this,Fl,()=>{wl(this,Il,Ll).call(this)?X(this,El).start():X(this,El).stop()}),Z(this,Rl,e=>{this.dragging||(Le(e)&&(this.range.valueAsNumber=e),X(this,Pl)||this.updateBar())}),this.shadowRoot.querySelector(`#track`).insertAdjacentHTML(`afterbegin`,`<div id="buffered" part="buffered"></div>`),Cl(this,Dl,this.shadowRoot.querySelectorAll(`[part~="box"]`)),Cl(this,kl,this.shadowRoot.querySelector(`[part~="preview-box"]`)),Cl(this,Al,this.shadowRoot.querySelector(`[part~="current-box"]`));let e=getComputedStyle(this);Cl(this,jl,parseInt(e.getPropertyValue(`--media-box-padding-left`))),Cl(this,Ml,parseInt(e.getPropertyValue(`--media-box-padding-right`))),Cl(this,El,new xl(this.range,X(this,Rl),60))}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_PAUSED,x.MEDIA_DURATION,x.MEDIA_SEEKABLE,x.MEDIA_CURRENT_TIME,x.MEDIA_PREVIEW_IMAGE,x.MEDIA_PREVIEW_TIME,x.MEDIA_PREVIEW_CHAPTER,x.MEDIA_BUFFERED,x.MEDIA_PLAYBACK_RATE,x.MEDIA_LOADING,x.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute(`aria-label`,E(`seek`)),X(this,Fl).call(this),Cl(this,Tl,this.getRootNode()),(e=X(this,Tl))==null||e.addEventListener(`transitionstart`,this)}disconnectedCallback(){var e;super.disconnectedCallback(),X(this,El).stop(),(e=X(this,Tl))==null||e.removeEventListener(`transitionstart`,this),Cl(this,Tl,null)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),t!=n&&(e===x.MEDIA_CURRENT_TIME||e===x.MEDIA_PAUSED||e===x.MEDIA_ENDED||e===x.MEDIA_LOADING||e===x.MEDIA_DURATION||e===x.MEDIA_SEEKABLE?(X(this,El).update({start:$l(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),X(this,Fl).call(this),Zl(this)):e===x.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===x.MEDIA_DURATION||e===x.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=X(this,Nl),this.updateBar()))}get mediaChaptersCues(){return X(this,Nl)}set mediaChaptersCues(e){Cl(this,Nl,e),this.updateSegments(X(this,Nl)?.map(e=>({start:$l(this,e.startTime),end:$l(this,e.endTime)})))}get mediaPaused(){return N(this,x.MEDIA_PAUSED)}set mediaPaused(e){P(this,x.MEDIA_PAUSED,e)}get mediaLoading(){return N(this,x.MEDIA_LOADING)}set mediaLoading(e){P(this,x.MEDIA_LOADING,e)}get mediaDuration(){return j(this,x.MEDIA_DURATION)}set mediaDuration(e){M(this,x.MEDIA_DURATION,e)}get mediaCurrentTime(){return j(this,x.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){M(this,x.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return j(this,x.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){M(this,x.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){let e=this.getAttribute(x.MEDIA_BUFFERED);return e?e.split(` `).map(e=>e.split(`:`).map(e=>+e)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(x.MEDIA_BUFFERED);return}let t=e.map(e=>e.join(`:`)).join(` `);this.setAttribute(x.MEDIA_BUFFERED,t)}get mediaSeekable(){let e=this.getAttribute(x.MEDIA_SEEKABLE);if(e)return e.split(`:`).map(e=>+e)}set mediaSeekable(e){if(e==null){this.removeAttribute(x.MEDIA_SEEKABLE);return}this.setAttribute(x.MEDIA_SEEKABLE,e.join(`:`))}get mediaSeekableEnd(){let[,e=this.mediaDuration]=this.mediaSeekable??[];return e}get mediaSeekableStart(){let[e=0]=this.mediaSeekable??[];return e}get mediaPreviewImage(){return F(this,x.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){I(this,x.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return j(this,x.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){M(this,x.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return N(this,x.MEDIA_ENDED)}set mediaEnded(e){P(this,x.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){let e=this.mediaBuffered;if(!e.length)return;let t;if(this.mediaEnded)t=1;else{let n=this.mediaCurrentTime,[,r=this.mediaSeekableStart]=e.find(([e,t])=>e<=n&&n<=t)??[];t=$l(this,r)}let{style:n}=A(this.shadowRoot,`#buffered`);n.setProperty(`width`,`${t*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector(`slot[name="current"]`).assignedElements().length)return;let e=A(this.shadowRoot,`#current-rail`),t=A(this.shadowRoot,`[part~="current-box"]`),n=wl(this,zl,Bl).call(this,X(this,Al)),r=wl(this,Vl,Hl).call(this,n,this.range.valueAsNumber),i=wl(this,Ul,Wl).call(this,n,this.range.valueAsNumber);e.style.transform=`translateX(${r})`,e.style.setProperty(`--_range-width`,`${n.range.width}`),t.style.setProperty(`--_box-shift`,`${i}`),t.style.setProperty(`--_box-width`,`${n.box.width}px`),t.style.setProperty(`visibility`,`initial`)}handleEvent(e){switch(super.handleEvent(e),e.type){case`input`:wl(this,Yl,Xl).call(this);break;case`pointermove`:wl(this,Gl,Kl).call(this,e);break;case`pointerup`:X(this,Pl)&&Cl(this,Pl,!1);break;case`pointerdown`:Cl(this,Pl,!0);break;case`pointerleave`:wl(this,ql,Jl).call(this,null);break;case`transitionstart`:ft(e.target,this)&&setTimeout(()=>X(this,Fl).call(this),0);break}}};Tl=new WeakMap,El=new WeakMap,Dl=new WeakMap,Ol=new WeakMap,kl=new WeakMap,Al=new WeakMap,jl=new WeakMap,Ml=new WeakMap,Nl=new WeakMap,Pl=new WeakMap,Fl=new WeakMap,Il=new WeakSet,Ll=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&gt(this)},Rl=new WeakMap,zl=new WeakSet,Bl=function(e){let t=((this.getAttribute(`bounds`)?pt(this,`#${this.getAttribute(`bounds`)}`):this.parentElement)??this).getBoundingClientRect(),n=this.range.getBoundingClientRect(),r=e.offsetWidth;return{box:{width:r,min:-(n.left-t.left-r/2),max:t.right-n.left-r/2},bounds:t,range:n}},Vl=new WeakSet,Hl=function(e,t){let n=`${t*100}%`,{width:r,min:i,max:a}=e.box;if(!r)return n;if(Number.isNaN(i)||(n=`max(${`calc(1 / var(--_range-width) * 100 * ${i}% + var(--media-box-padding-left))`}, ${n})`),!Number.isNaN(a)){let e=`calc(1 / var(--_range-width) * 100 * ${a}% - var(--media-box-padding-right))`;n=`min(${n}, ${e})`}return n},Ul=new WeakSet,Wl=function(e,t){let{width:n,min:r,max:i}=e.box,a=t*e.range.width;if(a<r+X(this,jl)){let t=e.range.left-e.bounds.left-X(this,jl);return`${a-n/2+t}px`}if(a>i-X(this,Ml)){let t=e.bounds.right-e.range.right-X(this,Ml);return`${a+n/2-t-e.range.width}px`}return 0},Gl=new WeakSet,Kl=function(e){let t=[...X(this,Dl)].some(t=>e.composedPath().includes(t));if(!this.dragging&&(t||!e.composedPath().includes(this))){wl(this,ql,Jl).call(this,null);return}let n=this.mediaSeekableEnd;if(!n)return;let r=A(this.shadowRoot,`#preview-rail`),i=A(this.shadowRoot,`[part~="preview-box"]`),a=wl(this,zl,Bl).call(this,X(this,kl)),o=(e.clientX-a.range.left)/a.range.width;o=Math.max(0,Math.min(1,o));let s=wl(this,Vl,Hl).call(this,a,o),c=wl(this,Ul,Wl).call(this,a,o);r.style.transform=`translateX(${s})`,r.style.setProperty(`--_range-width`,`${a.range.width}`),i.style.setProperty(`--_box-shift`,`${c}`),i.style.setProperty(`--_box-width`,`${a.box.width}px`);let l=Math.round(X(this,Ol))-Math.round(o*n);Math.abs(l)<1&&o>.01&&o<.99||(Cl(this,Ol,o*n),wl(this,ql,Jl).call(this,X(this,Ol)))},ql=new WeakSet,Jl=function(e){this.dispatchEvent(new D.CustomEvent(y.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:e}))},Yl=new WeakSet,Xl=function(){X(this,El).stop();let e=eu(this);this.dispatchEvent(new D.CustomEvent(y.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e}))},tu.shadowRootOptions={mode:`open`},tu.getContainerTemplateHTML=Ql,D.customElements.get(`media-time-range`)||D.customElements.define(`media-time-range`,tu);var nu=tu,ru=(e,t,n)=>{if(!t.has(e))throw TypeError(`Cannot `+n)},iu=(e,t,n)=>(ru(e,t,`read from private field`),n?n.call(e):t.get(e)),au=(e,t,n)=>{if(t.has(e))throw TypeError(`Cannot add the same private member more than once`);t instanceof WeakSet?t.add(e):t.set(e,n)},ou,su=1,cu=e=>e.mediaMuted?0:e.mediaVolume,lu=e=>`${Math.round(e*100)}%`,uu=class extends Fa{constructor(){super(...arguments),au(this,ou,()=>{let e=this.range.value,t=new D.CustomEvent(y.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)})}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_VOLUME,x.MEDIA_MUTED,x.MEDIA_VOLUME_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),this.range.setAttribute(`aria-label`,E(`volume`)),this.range.addEventListener(`input`,iu(this,ou))}disconnectedCallback(){this.range.removeEventListener(`input`,iu(this,ou)),super.disconnectedCallback()}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),(e===x.MEDIA_VOLUME||e===x.MEDIA_MUTED)&&(this.range.valueAsNumber=cu(this),this.range.setAttribute(`aria-valuetext`,lu(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return j(this,x.MEDIA_VOLUME,su)}set mediaVolume(e){M(this,x.MEDIA_VOLUME,e)}get mediaMuted(){return N(this,x.MEDIA_MUTED)}set mediaMuted(e){P(this,x.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return F(this,x.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){I(this,x.MEDIA_VOLUME_UNAVAILABLE,e)}};ou=new WeakMap,D.customElements.get(`media-volume-range`)||D.customElements.define(`media-volume-range`,uu);var du=uu;function fu(e){return`
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
    `}function pu(){return E(`Loop`)}var mu=class extends K{constructor(){super(...arguments),this.container=null}static get observedAttributes(){return[...super.observedAttributes,x.MEDIA_LOOP]}connectedCallback(){super.connectedCallback(),this.container=this.shadowRoot?.querySelector(`#icon`)||null,this.container&&(this.container.textContent=E(`Loop`))}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===x.MEDIA_LOOP&&this.container&&this.setAttribute(`aria-checked`,this.mediaLoop?`true`:`false`)}get mediaLoop(){return N(this,x.MEDIA_LOOP)}set mediaLoop(e){P(this,x.MEDIA_LOOP,e)}handleClick(){let e=!this.mediaLoop,t=new D.CustomEvent(y.MEDIA_LOOP_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}};mu.getSlotTemplateHTML=fu,mu.getTooltipContentHTML=pu,D.customElements.get(`media-loop-button`)||D.customElements.define(`media-loop-button`,mu);var hu=mu;function Q(e){if(typeof e==`boolean`)return e?``:void 0;if(typeof e!=`function`){if(Array.isArray(e)&&e.every(e=>typeof e==`string`||typeof e==`number`||typeof e==`boolean`))return e.join(` `);if(!(typeof e==`object`&&e))return e}}v({tagName:`media-gesture-receiver`,elementClass:Dt,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-container`,elementClass:on,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var gu=v({tagName:`media-controller`,elementClass:Gr,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-tooltip`,elementClass:Yr,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-chrome-button`,elementClass:di,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-airplay-button`,elementClass:_i,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var _u=v({tagName:`media-captions-button`,elementClass:Ei,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-cast-button`,elementClass:Ni,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-chrome-dialog`,elementClass:ia,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-chrome-range`,elementClass:Ia,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var vu=v({tagName:`media-control-bar`,elementClass:Wa,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-text-display`,elementClass:$a,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-duration-display`,elementClass:so,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-error-dialog`,elementClass:So,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-keyboard-shortcuts-dialog`,elementClass:jo,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var yu=v({tagName:`media-fullscreen-button`,elementClass:Uo,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-live-button`,elementClass:Qo,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var bu=v({tagName:`media-loading-indicator`,elementClass:us,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),xu=v({tagName:`media-mute-button`,elementClass:vs,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Su=v({tagName:`media-pip-button`,elementClass:ws,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Cu=v({tagName:`media-playback-rate-button`,elementClass:Fs,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),wu=v({tagName:`media-play-button`,elementClass:Hs,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-poster-image`,elementClass:Js,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-preview-chapter-display`,elementClass:tc,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-preview-thumbnail`,elementClass:lc,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),v({tagName:`media-preview-time-display`,elementClass:gc,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var Tu=v({tagName:`media-seek-backward-button`,elementClass:Tc,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Eu=v({tagName:`media-seek-forward-button`,elementClass:Pc,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Du=v({tagName:`media-time-display`,elementClass:ol,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),Ou=v({tagName:`media-time-range`,elementClass:nu,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}}),ku=v({tagName:`media-volume-range`,elementClass:du,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});v({tagName:`media-loop-button`,elementClass:hu,react:_.default,toAttributeValue:Q,defaultProps:{suppressHydrationWarning:!0}});var $=t(),Au={noTooltip:!0};function ju({isMobile:e,showPip:t,showCaptionsButton:n,topChrome:r,extraControls:i,children:a,className:o,style:s}){return(0,$.jsxs)(gu,{className:`ts-player ${o||``}`.trim(),autohide:`2`,style:s,children:[a,(0,$.jsx)(bu,{slot:`centered-chrome`}),(0,$.jsx)(`div`,{slot:`top-chrome`,className:`ts-player-top`,children:r}),(0,$.jsxs)(vu,{className:`ts-player-bar`,children:[(0,$.jsx)(wu,{...Au,className:e?`ts-player-play-lg`:void 0}),(0,$.jsx)(Tu,{...Au,seekOffset:10}),(0,$.jsx)(Eu,{...Au,seekOffset:10}),(0,$.jsx)(Du,{showDuration:!0}),(0,$.jsx)(Ou,{}),(0,$.jsx)(xu,{...Au}),e?null:(0,$.jsx)(ku,{}),i,n?(0,$.jsx)(_u,{...Au}):null,(0,$.jsx)(Cu,{...Au,rates:[.75,1,1.25,1.5,2]}),t?(0,$.jsx)(Su,{...Au}):null,(0,$.jsx)(yu,{...Au})]})]})}var Mu=e=>!!(e.canPlayType(`application/vnd.apple.mpegurl`)||e.canPlayType(`application/x-mpegURL`));function Nu({enabled:e,open:t,videoRef:n,videoEpoch:r,src:i,playbackRate:a=1,onLoading:o,onError:s,onNotSupported:c,onSubtitleTracks:l,onSubtitleTrack:u,onDuration:d}){let f=(0,_.useRef)(null),h=(0,_.useRef)(o),g=(0,_.useRef)(s),ee=(0,_.useRef)(c),te=(0,_.useRef)(l),ne=(0,_.useRef)(u),re=(0,_.useRef)(d);return(0,_.useEffect)(()=>{h.current=o,g.current=s,ee.current=c,te.current=l,ne.current=u,re.current=d}),(0,_.useEffect)(()=>{let r=n.current;if(!e||!t||!r||!i)return;let o=null,s=!1;h.current?.(!0),te.current?.([]);let c=()=>{let e=(o?.subtitleTracks||[]).map((e,t)=>({id:t,name:e.name,lang:e.lang}));te.current?.(e)};if(ve.isSupported()){let e=p();o=new ve({xhrSetup:t=>{e&&t.setRequestHeader(`Authorization`,e)}}),f.current=o,o.on(ve.Events.MANIFEST_PARSED,()=>{c(),ne.current?.(o?.subtitleTrack??-1),r.playbackRate=a,r.play().catch(()=>{})}),o.on(ve.Events.LEVEL_LOADED,(e,t)=>{let n=t.details?.totalduration;typeof n==`number`&&re.current?.(n)}),o.on(ve.Events.SUBTITLE_TRACKS_UPDATED,c),o.on(ve.Events.SUBTITLE_TRACK_SWITCH,(e,t)=>ne.current?.(t.id)),o.on(ve.Events.ERROR,(e,t)=>{!t.fatal||!o||(t.type===ve.ErrorTypes.NETWORK_ERROR?o.startLoad():t.type===ve.ErrorTypes.MEDIA_ERROR?o.recoverMediaError():(o.stopLoad(),h.current?.(!1),g.current?.()))}),o.loadSource(i),o.attachMedia(r)}else Mu(r)?(s=!0,r.src=m(i),r.load(),r.playbackRate=a,r.play().catch(()=>{})):ee.current?.();return()=>{f.current===o&&(f.current=null),o?.destroy(),s&&(r.pause(),r.removeAttribute(`src`),r.load()),te.current?.([]),ne.current?.(-1)}},[e,t,n,r,i]),f}var Pu=5e3,Fu=5;function Iu({enabled:e,hash:t,fileIndex:n,title:r,initialTimecode:i=0,videoRef:a,onViewedChange:o}){let s=(0,_.useRef)(0),c=(0,_.useRef)(!1),l=(0,_.useRef)(o);(0,_.useEffect)(()=>{l.current=o},[o]),(0,_.useEffect)(()=>{c.current=!1},[t,n,i]);let u=(0,_.useCallback)(async i=>{if(!(!e||!t||n==null))try{await pe(t,n,i),me({hash:t,fileIndex:n,title:r||t,fileName:r||String(n),timecode:i}),l.current?.()}catch{}},[e,t,n,r]);return{flushTimecode:(0,_.useCallback)(()=>{let t=a.current;!t||!e||u(t.currentTime)},[a,e,u]),onTimeUpdate:(0,_.useCallback)(()=>{let t=a.current;if(!t||!e)return;let n=Date.now();n-s.current<Pu||(s.current=n,u(t.currentTime))},[a,e,u]),applyResumeIfNeeded:(0,_.useCallback)(()=>{let e=a.current;if(!e||c.current)return;if(!(i>Fu)){c.current=!0;return}let t=e.duration;if(Number.isFinite(t)&&t>0&&i>=t-Fu){c.current=!0;return}e.currentTime=i,c.current=!0},[a,i]),saveTimecode:u}}var Lu=3e4;function Ru(e){switch(e.split(`?`)[0].split(`.`).pop()?.toLowerCase()){case`mp4`:return`video/mp4`;case`ogg`:case`ogv`:return`video/ogg`;case`webm`:return`video/webm`;default:return``}}var zu=e=>!!(e.canPlayType(`application/vnd.apple.mpegurl`)||e.canPlayType(`application/x-mpegURL`)),Bu=()=>typeof document<`u`&&`pictureInPictureEnabled`in document&&!!document.pictureInPictureEnabled;function Vu({videoSrc:e,downloadSrc:t=e,title:r,onNotSupported:p,hls:g=!1,heartbeatSrc:pe=``,showTrigger:me=!0,inlineTrigger:be=!1,inlineTriggerPrimary:Se=!1,initiallyOpen:Ce=!1,onClose:we,captionSrc:Te,hash:v,fileIndex:Ee,initialTimecode:y=0,trackTimecode:b=!1,onViewedChange:De,audioTracks:Oe=[],audioIndex:x=0,onAudioIndexChange:ke}){let{t:Ae}=te(),S=a(ue(`dialog`)),{setImmersive:je}=d(),Me=(0,_.useRef)(null),C=(0,_.useRef)(p),w=(0,_.useRef)(null),[T,Ne]=(0,_.useState)(Ce),[Pe,Fe]=(0,_.useState)(0),[Ie,Le]=(0,_.useState)(!0),[Re,ze]=(0,_.useState)(!1),[Be,Ve]=(0,_.useState)(!1),[He,Ue]=(0,_.useState)(!1),[E,We]=(0,_.useState)([]),[Ge,Ke]=(0,_.useState)(!1),[qe,Je]=(0,_.useState)(x),[Ye,Xe]=(0,_.useState)(e),[Ze,Qe]=(0,_.useState)(Oe),$e=!!(v&&Ee!=null&&b),et=g&&!!v&&Ee!=null&&Ze.length>1,tt=Bu(),D=g?E.length>0:!!Te,O=S?_e:He?ge:he,nt=S?void 0:He?`min(86dvh, calc(100dvh - 4rem))`:`min(72dvh, 40rem)`,rt=(0,_.useCallback)(e=>{Me.current=e,Fe(e=>e+1)},[]);(0,_.useEffect)(()=>{C.current=p},[p]),(0,_.useEffect)(()=>{Xe(e),Je(x),Qe(Oe),ze(!1),Le(!0)},[e,x,Oe]),Nu({enabled:g,open:T,videoRef:Me,videoEpoch:Pe,src:Ye,onLoading:Le,onError:()=>ze(!0),onNotSupported:()=>C.current?.(),onSubtitleTracks:We});let{flushTimecode:it,onTimeUpdate:at,applyResumeIfNeeded:ot}=Iu({enabled:$e,hash:v,fileIndex:Ee,title:r,initialTimecode:y,videoRef:Me,onViewedChange:De}),k=(0,_.useCallback)(()=>Ne(!0),[]),st=(0,_.useCallback)(()=>{it(),Ne(!1),ze(!1),Ke(!1),Ue(!1),we?.()},[it,we]),ct=c({isOpen:T,onOpenChange:e=>{e?Ne(!0):st()}});f(T),(0,_.useEffect)(()=>{if(!S||!T){je(!1);return}return je(!0),()=>je(!1)},[S,T,je]),(0,_.useEffect)(()=>{if(!T){xe(null);return}return xe(null),()=>xe(null)},[T]),(0,_.useEffect)(()=>{let e=document.createElement(`video`);(g?ve.isSupported()||zu(e):e.canPlayType(Ru(Ye)))||C.current?.()},[g,Ye]),(0,_.useEffect)(()=>{let e=Me.current;if(!(!T||g||!e))return Le(!0),e.src=m(Ye),e.load(),e.play().catch(()=>{}),()=>{e.pause(),e.removeAttribute(`src`),e.load()}},[T,g,Pe,Ye]),(0,_.useEffect)(()=>{if(!T||!pe)return;let e=window.setInterval(()=>{h(pe,{cache:`no-store`}).catch(()=>{})},Lu);return()=>window.clearInterval(e)},[pe,T]),(0,_.useEffect)(()=>{let e=()=>Ve(!!document.fullscreenElement);return document.addEventListener(`fullscreenchange`,e),()=>document.removeEventListener(`fullscreenchange`,e)},[]),(0,_.useEffect)(()=>{let e=Me.current;if(!e||w.current==null)return;let t=w.current,n=()=>{w.current!=null&&(e.currentTime=t,w.current=null,e.play().catch(()=>{}))};return e.addEventListener(`loadedmetadata`,n,{once:!0}),()=>e.removeEventListener(`loadedmetadata`,n)},[Pe,Ye]),(0,_.useEffect)(()=>{if(!T||!g||!v||Ee==null)return;if(Oe.length){Qe(Oe);return}let e=!1;return u.get(se(v,Ee)).then(({data:t})=>{e||Qe(le(t))}).catch(()=>{}),()=>{e=!0}},[T,g,v,Ee,Oe]);let lt=e=>{if(!v||Ee==null)return;let t=Me.current;t&&(w.current=t.currentTime),Je(e),Xe(de(v,Ee,e)),Ke(!1),ke?.(e)},ut=ie,dt=et?(0,$.jsxs)(n,{isOpen:Ge,onOpenChange:Ke,children:[(0,$.jsx)(n.Trigger,{children:(0,$.jsx)(i,{isIconOnly:!0,variant:`ghost`,className:`${fe} text-white hover-fine:bg-white/15`,"aria-label":Ae(`SelectAudioTrack`),children:(0,$.jsx)(ce,{...ut,"aria-hidden":!0})})}),(0,$.jsxs)(n.Content,{placement:`bottom end`,className:`max-h-72 w-72 overflow-y-auto border border-white/10 bg-neutral-950/95 p-1 backdrop-blur-xl`,children:[(0,$.jsx)(`p`,{className:`px-2 py-1.5 text-[11px] font-semibold tracking-wide text-muted uppercase`,children:Ae(`SelectAudioTrack`)}),Ze.map((e,t)=>{let{title:n,meta:r}=oe(e,t);return(0,$.jsx)(i,{variant:t===qe?`secondary`:`ghost`,className:`h-auto w-full justify-start gap-2 py-2`,onPress:()=>lt(t),children:(0,$.jsxs)(`span`,{className:`min-w-0 flex-1 text-left`,children:[(0,$.jsx)(`span`,{className:`block truncate text-sm font-medium`,children:n}),r?(0,$.jsx)(`span`,{className:`mt-0.5 block truncate text-xs text-muted`,children:r}):null]})},t)})]})]}):null,ft=S?null:(0,$.jsx)(i,{isIconOnly:!0,variant:`ghost`,className:`${fe} text-white hover-fine:bg-white/15`,"aria-label":Ae(He?`ExitFullscreen`:`ExpandPlayer`),onPress:()=>Ue(e=>!e),children:He?(0,$.jsx)(ye,{...ut,"aria-hidden":!0}):(0,$.jsx)(ee,{...ut,"aria-hidden":!0})});return(0,$.jsxs)($.Fragment,{children:[me&&(be?(0,$.jsxs)(i,{variant:Se?`primary`:`secondary`,size:`sm`,onPress:k,className:Se?`min-h-10 shrink-0 px-3`:`min-h-10 min-w-[72px] max-w-full flex-1`,children:[Se?(0,$.jsx)(ae,{...re,fill:`currentColor`,"aria-hidden":!0}):null,Ae(`Play`)]}):(0,$.jsxs)(i,{variant:`secondary`,onPress:k,children:[(0,$.jsx)(ae,{...re,"aria-hidden":!0}),Ae(`Play`)]})),(0,$.jsx)(s,{state:ct,children:(0,$.jsx)(s.Backdrop,{isDismissable:!Be,className:`bg-black/75 backdrop-blur-sm`,children:(0,$.jsx)(s.Container,{size:S?`full`:`lg`,scroll:`inside`,className:S?`ts-player-modal-full h-dvh p-0`:`p-4 sm:p-5`,children:(0,$.jsx)(s.Dialog,{className:S?`h-dvh max-h-dvh overflow-hidden rounded-none border-0 bg-black text-white shadow-none`:`overflow-hidden border border-white/10 bg-[#0a0e0c] text-white shadow-2xl shadow-black/50`,style:O,children:(0,$.jsxs)(s.Body,{className:S?`flex h-full min-h-0 flex-col gap-0 p-0`:`gap-0 p-0`,children:[Re?(0,$.jsxs)(`div`,{className:`space-y-3 p-4`,children:[(0,$.jsx)(o,{status:`danger`,children:Ae(`PlaybackError`)}),(0,$.jsx)(i,{variant:`secondary`,onPress:()=>window.open(t,`_blank`,`noopener,noreferrer`),children:Ae(`OpenLink`)})]}):(0,$.jsx)(ju,{isMobile:S,showPip:tt,showCaptionsButton:D,className:S?`ts-player--mobile`:`ts-player--desktop`,style:S?{width:`100%`,height:`100%`}:{width:`100%`,maxHeight:nt,aspectRatio:`16 / 9`},topChrome:(0,$.jsxs)(`div`,{className:`flex items-start gap-2 px-3 pb-10 pt-[max(0.75rem,env(safe-area-inset-top))] pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))]`,children:[(0,$.jsx)(`p`,{className:`min-w-0 flex-1 truncate text-sm font-semibold text-white drop-shadow`,title:r||Ae(`Play`),children:r||Ae(`Play`)}),dt,ft,(0,$.jsx)(i,{isIconOnly:!0,variant:`ghost`,className:`${fe} text-white hover-fine:bg-white/15`,"aria-label":Ae(`Close`),onPress:st,children:(0,$.jsx)(ne,{...ut,"aria-hidden":!0})})]}),extraControls:null,children:(0,$.jsx)(`video`,{slot:`media`,ref:rt,autoPlay:!0,playsInline:!0,crossOrigin:`anonymous`,className:`ts-player-video`,onTimeUpdate:()=>{at(),Ie&&Le(!1)},onLoadedMetadata:()=>{Le(!1),ze(!1),ot()},onWaiting:()=>Le(!0),onCanPlay:()=>{Le(!1),ze(!1)},onPlaying:()=>Le(!1),onPause:it,onError:()=>{Le(!1),ze(!0)},children:!g&&Te?(0,$.jsx)(`track`,{kind:`captions`,src:Te,srcLang:`und`,label:`Captions`,default:!0}):null},Ye)}),Ie&&!Re?(0,$.jsx)(`div`,{className:`pointer-events-none absolute inset-0 z-10 grid place-items-center bg-black/55`,children:(0,$.jsxs)(`div`,{className:`flex flex-col items-center gap-3 px-4 text-center`,children:[(0,$.jsx)(l,{size:`lg`,color:`current`,className:`text-accent`}),(0,$.jsx)(`p`,{className:`text-sm font-medium text-white/90`,children:Ae(`Buffering`)})]})}):null]})})})})})]})}export{Vu as default};