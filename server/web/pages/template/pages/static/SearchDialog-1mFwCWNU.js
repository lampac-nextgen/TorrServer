import{u as Re,a as o,d as x,j as t,m as ue}from"./vendor-B9KbAPe3.js";import{m as g,f as he,g as d,D as Ee,L as Ae,u as De,s as $e,p as I,S as Me,d as Le,a as Be,b as Fe,c as Pe,t as ne,e as ae,h as Ne,i as He,j as Ie}from"./index-CXI_85al.js";import{e as _e,u as Ke,az as qe,ac as Oe,ad as Ue,t as _,a9 as We,j as oe,a5 as Ge,a6 as Qe,aA as Ve,aB as Ye,m as ie,T as Je,aC as K,I as Xe,aD as Ze,$ as le,A as ce}from"./mui-CwZwH5yh.js";import"./hls-CWTT-7hy.js";function et(n,s){var u;(u=n.current)==null||u.abort();const c=new AbortController;n.current=c;const p=++s.current;return{ac:c,gen:p}}function D(n,s,c){return n===s&&!c.aborted}const tt=d.div`
  ${({theme:{settingsDialog:{contentBG:n}}})=>he`
    background: ${n};
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    max-height: calc(100dvh - 160px);

    ${g("mobile")} {
      max-height: none;
      flex: 1 1 auto;
    }
  `}
`,st=d.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 16px 20px 0;

  ${g("compact")} {
    padding: 12px 12px 0;
  }
`,rt=d.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  flex-wrap: wrap;
  flex-shrink: 0;
  margin-bottom: 12px;
  position: sticky;
  top: 0;
  z-index: 2;
  padding-bottom: 4px;
  background: ${({theme:{settingsDialog:{contentBG:n}}})=>n};

  .search-tracker {
    min-width: 150px;
    flex: 0 0 auto;
  }

  .search-query {
    flex: 1 1 200px;
    min-width: 0;
  }

  .search-submit {
    min-width: 100px;
    height: 40px;
    flex: 0 0 auto;
  }

  ${g("compact")} {
    .search-tracker {
      flex: 1 1 100%;
      min-width: 0;
    }

    .search-submit {
      min-width: 80px;
    }
  }

  ${g("phone")} {
    flex-direction: column;

    .search-query,
    .search-submit {
      flex: 1 1 100%;
      width: 100%;
      min-width: 0;
    }

    .search-submit {
      min-width: 0;
    }
  }
`,nt=d.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  flex-shrink: 0;
  margin-bottom: 8px;
  padding: 4px 0;

  ${g("compact")} {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;

    .MuiToggleButtonGroup-root {
      width: 100%;
      display: flex;
    }

    .MuiToggleButton-root {
      flex: 1 1 0;
    }
  }
`,at=d.div`
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  opacity: 0.75;
  white-space: nowrap;
`,ot=d.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  margin: 0 -4px;
  padding: 0 4px 12px;
`,de=d.div`
  display: grid;
  place-items: center;
  min-height: 160px;
  padding: 24px 12px;
  text-align: center;
  opacity: 0.7;
`,it=d.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,lt=d.li`
  ${({theme:{app:{paperColor:n},addDialog:{separatorColor:s}}})=>he`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px 12px;
    align-items: center;
    padding: 10px 12px;
    border-radius: 6px;
    border: 1px solid ${s};
    background: ${n};
    cursor: pointer;
    transition: filter 0.15s ease;

    &:hover {
      filter: brightness(0.97);
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    ${g("compact")} {
      padding: 8px 10px;
      gap: 6px 8px;
    }
  `}
`,ct=d.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,dt=d.div`
  font-size: 13px;
  line-height: 1.35;
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;

  ${g("compact")} {
    font-size: 12.5px;
  }
`,ut=d.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`,ht=d.div`
  display: flex;
  align-items: center;
  justify-content: center;
`,pt=d(Ee)`
  ${g("phone")} {
    .MuiButton-root {
      width: 100%;
    }
  }
`,q=n=>(n.Hash||n.Magnet||n.Link||n.Title||"").toLowerCase(),ft=(...n)=>{const s=new Set,c=[];for(const p of n)for(const u of p||[]){const m=q(u);if(m){if(s.has(m))continue;s.add(m)}c.push(u)}return c},xt=(n,s)=>{var c;if(ue(n)){const p=(c=n.response)==null?void 0:c.data;if(p!=null&&p.error)return String(p.error);if(n.message)return n.message}return n instanceof Error&&n.message?n.message:s};function Tt({handleClose:n}){const{t:s}=Re(),[c,p]=o.useState(""),[u,m]=o.useState([]),[b,O]=o.useState(!1),[U,pe]=o.useState(!1),[j,W]=o.useState(!1),[fe,G]=o.useState(null),[Q,V]=o.useState(""),[Y,y]=o.useState(""),[$,xe]=o.useState([]),[ge,me]=o.useState(!1),[J,be]=o.useState(!1),[T,M]=o.useState(-1),[w,L]=o.useState("seeds"),[k,C]=o.useState("desc"),[Se,ye]=o.useState(!1),B=o.useRef(!1),X=o.useRef(null),S=o.useRef(0),Te=_e(Ae),Z=Ke().palette.mode==="dark",we=De(n),R=J&&$.length>0,F=ge,z=R||F,ze=R;o.useEffect(()=>{const e=new AbortController;return x.post($e(),{action:"get"},{signal:e.signal}).then(({data:r})=>{if(r){const i=r.TorznabUrls||[],a=!!r.EnableTorznabSearch,l=!!r.EnableRutorSearch;xe(i),be(a),me(l),a&&i.length>0?M(-1):l&&M("rutor")}}).catch(r=>{!x.isCancel(r)&&(r==null||r.code)}).finally(()=>{e.signal.aborted||ye(!0)}),()=>e.abort()},[]),o.useEffect(()=>()=>{var e;(e=X.current)==null||e.abort()},[]);const ee=async()=>{var i;if(!c||!z)return;const{ac:e,gen:r}=et(X,S);O(!0),pe(!0),m([]);try{if(T===-1){const A=[];if(R&&A.push(x.get(ne(),{params:{query:c},signal:e.signal}).then(({data:f})=>f||[])),F&&A.push(x.get(ae(),{params:{query:c},signal:e.signal}).then(({data:f})=>f||[])),A.length===0){D(r,S.current,e.signal)&&y(s("Torznab.NoSearchSources"));return}const Ce=await Promise.allSettled(A);if(!D(r,S.current,e.signal))return;const N=[];let H;for(const f of Ce)f.status==="fulfilled"?N.push(f.value):!H&&!x.isCancel(f.reason)&&((i=f.reason)==null?void 0:i.code)!=="ERR_CANCELED"&&(H=f.reason);if(N.length===0)throw H||new Error(s("Torznab.SearchFailed"));const re=ft(...N);m(re),!B.current&&re.length>0&&(L("seeds"),C("desc"));return}let a=ne();const l={query:c};T==="rutor"?a=ae():typeof T=="number"&&(l.index=T);const{data:v}=await x.get(a,{params:l,signal:e.signal});if(!D(r,S.current,e.signal))return;const h=v||[];m(h),!B.current&&h.length>0&&(L("seeds"),C("desc"))}catch(a){if(x.isCancel(a)||ue(a)&&a.code==="ERR_CANCELED"||!D(r,S.current,e.signal))return;y(xt(a,s("Torznab.SearchFailed")))}finally{r===S.current&&O(!1)}},ve=e=>{e.key==="Enter"&&ee()},P=async e=>{const r=q(e)||e.Title||"item";W(!0),G(r);try{const i=e.Magnet||e.Link;if(!i){y(s("Torznab.NoLinkFound"));return}let a=e.Poster;if(!a&&e.Title){const l=Ne(e.Title);if(l){const v=await He(l,"en"),[h]=v||[];h&&(a=h)}}await x.post(Ie(),{action:"add",link:i,title:e.Title,save_to_db:!0,poster:a||""}),V(s("Torznab.TorrentAddedSuccessfully"))}catch{y(s("Torznab.FailedToAddTorrent"))}finally{W(!1),G(null)}},E=(e,r)=>{r!=="clickaway"&&(V(""),y(""))},je=e=>{if(B.current=!0,w===e){C(r=>r==="asc"?"desc":"asc");return}L(e),C("desc")},te=o.useMemo(()=>u.length===0?u:[...u].sort((r,i)=>{let a,l;switch(w){case"size":a=I(r.Size||"0"),l=I(i.Size||"0");break;case"seeds":a=r.Seed||0,l=i.Seed||0;break;case"peers":a=r.Peer||0,l=i.Peer||0;break;default:return 0}return a===l?0:k==="asc"?a<l?-1:1:a>l?-1:1}),[u,w,k]),se=Se?z?b?null:U&&u.length===0?s("Torznab.NoResultsFound"):null:J&&$.length===0?s("Torznab.NoIndexersConfigured"):s("Torznab.NoSearchSources"):null,ke=[{field:"size",label:s("Torznab.SortBySize")},{field:"seeds",label:s("Torznab.SortBySeeds")},{field:"peers",label:s("Torznab.SortByPeers")}];return t.jsxs(Me,{open:!0,onClose:n,fullScreen:Te,fullWidth:!0,maxWidth:"md",slotProps:{paper:{ref:we,sx:Le}},children:[t.jsx(Be,{children:s("Torznab.SearchTorrents")}),t.jsx(tt,{children:t.jsxs(st,{children:[t.jsxs(rt,{children:[t.jsxs(qe,{variant:"outlined",size:"small",className:"search-tracker",disabled:!z,children:[t.jsx(Oe,{children:s("Tracker")}),t.jsxs(Ue,{value:T,onChange:e=>M(e.target.value),label:s("Tracker"),children:[ze&&t.jsx(_,{value:-1,children:s("AllTrackers")}),F&&t.jsx(_,{value:"rutor",children:s("Rutor")}),R&&$.map((e,r)=>t.jsx(_,{value:r,children:e.Name||e.Host},`${e.Host}-${e.Key}`))]})]}),t.jsx(We,{className:"search-query",label:s("Torznab.SearchQuery"),value:c,onChange:e=>p(e.target.value),onKeyDown:ve,variant:"outlined",size:"small",fullWidth:!0,placeholder:s("Torznab.SearchMoviesShows"),autoFocus:!0,disabled:!z}),t.jsx(oe,{className:"search-submit",variant:"contained",color:"primary",onClick:ee,disabled:b||!z||!c,startIcon:Fe(b),children:s("Search")})]}),U&&u.length>0&&t.jsxs(nt,{children:[t.jsx(at,{children:s("Torznab.ResultsCount",{count:u.length})}),t.jsx(Ge,{exclusive:!0,size:"small",value:w,onChange:(e,r)=>{r&&je(r)},"aria-label":s("Torznab.SortBy"),sx:{flexWrap:"wrap",gap:.5},children:ke.map(({field:e,label:r})=>{const i=w===e;return t.jsxs(Qe,{value:e,selected:i,title:s(i?k==="asc"?"Torznab.SortAscending":"Torznab.SortDescending":"Torznab.SortBy"),sx:{textTransform:"none",px:1.25,height:28,borderRadius:"14px !important",border:a=>`1px solid ${a.palette.divider} !important`,"&.Mui-selected":{fontWeight:500}},children:[r,i&&(k==="asc"?t.jsx(Ve,{sx:{ml:.5,fontSize:14}}):t.jsx(Ye,{sx:{ml:.5,fontSize:14}}))]},e)})})]}),t.jsxs(ot,{children:[b&&t.jsx(de,{children:t.jsx(ie,{color:"secondary",size:32})}),!b&&se&&t.jsx(de,{children:t.jsx(Je,{variant:"body2",color:"text.secondary",children:se})}),!b&&te.length>0&&t.jsx(it,{children:te.map((e,r)=>{const i=I(e.Size||"0"),a=Pe(i),l=q(e)||`${e.Title||"item"}-${r}`,v=j&&fe===l;return t.jsxs(lt,{role:"button",tabIndex:0,onClick:()=>!j&&P(e),onKeyDown:h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),j||P(e))},children:[t.jsxs(ct,{children:[t.jsx(dt,{children:e.Title}),t.jsxs(ut,{children:[t.jsx(K,{size:"small",label:a,variant:"outlined"}),t.jsx(K,{size:"small",label:`S ${e.Seed||0}`,color:Z?"default":"success",variant:"outlined",sx:Z?{bgcolor:"rgba(255, 255, 255, 0.08)"}:{bgcolor:"rgba(0, 167, 114, 0.12)"}}),t.jsx(K,{size:"small",label:`P ${e.Peer||0}`,variant:"outlined"})]})]}),t.jsx(ht,{children:t.jsx(Xe,{edge:"end","aria-label":"add",onClick:h=>{h.stopPropagation(),P(e)},disabled:j,size:"small",sx:{minWidth:40,minHeight:40},children:v?t.jsx(ie,{size:18,color:"secondary"}):t.jsx(Ze,{color:"secondary"})})})]},l)})})]})]})}),t.jsx(le,{open:!!Q,autoHideDuration:1500,onClose:E,children:t.jsx(ce,{onClose:E,severity:"success",variant:"filled",sx:{width:"100%"},children:Q})}),t.jsx(le,{open:!!Y,autoHideDuration:1500,onClose:E,children:t.jsx(ce,{onClose:E,severity:"error",variant:"filled",sx:{width:"100%"},children:Y})}),t.jsx(pt,{children:t.jsx(oe,{onClick:n,color:"secondary",variant:"outlined",children:s("Close")})})]})}export{Tt as default};
