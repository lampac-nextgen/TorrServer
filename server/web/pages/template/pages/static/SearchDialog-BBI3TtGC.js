import{u as Ce,a as o,d as x,j as t,m as ue}from"./vendor-B9KbAPe3.js";import{m as g,f as he,g as d,D as Re,L as Ee,s as Ae,p as I,S as De,d as $e,a as Me,b as Le,c as Be,t as ne,e as ae,h as Fe,i as Pe,j as Ne}from"./index-vMAwXXwB.js";import{e as He,u as Ie,aB as _e,ac as Ke,ad as qe,t as _,a9 as Ue,j as oe,a5 as We,a6 as Ge,aC as Oe,aD as Qe,m as ie,T as Ve,aE as K,I as Ye,aF as Je,$ as le,A as ce}from"./mui-DHevzUj8.js";import"./hls-CWTT-7hy.js";function Xe(n,s){var u;(u=n.current)==null||u.abort();const c=new AbortController;n.current=c;const p=++s.current;return{ac:c,gen:p}}function D(n,s,c){return n===s&&!c.aborted}const Ze=d.div`
  ${({theme:{settingsDialog:{contentBG:n}}})=>he`
    background: ${n};
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    max-height: calc(100dvh - var(--app-chrome-top) - var(--app-chrome-bottom));

    ${g("mobile")} {
      max-height: none;
      flex: 1 1 auto;
    }
  `}
`,et=d.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 16px 20px 0;

  ${g("compact")} {
    padding: 12px 12px 0;
  }
`,tt=d.div`
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
`,st=d.div`
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
`,rt=d.div`
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  opacity: 0.75;
  white-space: nowrap;
`,nt=d.div`
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
`,at=d.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,ot=d.li`
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
`,it=d.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,lt=d.div`
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
`,ct=d.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`,dt=d.div`
  display: flex;
  align-items: center;
  justify-content: center;
`,ut=d(Re)`
  ${g("phone")} {
    .MuiButton-root {
      width: 100%;
    }
  }
`,q=n=>(n.Hash||n.Magnet||n.Link||n.Title||"").toLowerCase(),ht=(...n)=>{const s=new Set,c=[];for(const p of n)for(const u of p||[]){const m=q(u);if(m){if(s.has(m))continue;s.add(m)}c.push(u)}return c},pt=(n,s)=>{var c;if(ue(n)){const p=(c=n.response)==null?void 0:c.data;if(p!=null&&p.error)return String(p.error);if(n.message)return n.message}return n instanceof Error&&n.message?n.message:s};function St({handleClose:n}){const{t:s}=Ce(),[c,p]=o.useState(""),[u,m]=o.useState([]),[b,U]=o.useState(!1),[W,pe]=o.useState(!1),[j,G]=o.useState(!1),[fe,O]=o.useState(null),[Q,V]=o.useState(""),[Y,y]=o.useState(""),[$,xe]=o.useState([]),[ge,me]=o.useState(!1),[J,be]=o.useState(!1),[T,M]=o.useState(-1),[w,L]=o.useState("seeds"),[k,C]=o.useState("desc"),[Se,ye]=o.useState(!1),B=o.useRef(!1),X=o.useRef(null),S=o.useRef(0),Te=He(Ee),Z=Ie().palette.mode==="dark",R=J&&$.length>0,F=ge,z=R||F,we=R;o.useEffect(()=>{const e=new AbortController;return x.post(Ae(),{action:"get"},{signal:e.signal}).then(({data:r})=>{if(r){const i=r.TorznabUrls||[],a=!!r.EnableTorznabSearch,l=!!r.EnableRutorSearch;xe(i),be(a),me(l),a&&i.length>0?M(-1):l&&M("rutor")}}).catch(r=>{!x.isCancel(r)&&(r==null||r.code)}).finally(()=>{e.signal.aborted||ye(!0)}),()=>e.abort()},[]),o.useEffect(()=>()=>{var e;(e=X.current)==null||e.abort()},[]);const ee=async()=>{var i;if(!c||!z)return;const{ac:e,gen:r}=Xe(X,S);U(!0),pe(!0),m([]);try{if(T===-1){const A=[];if(R&&A.push(x.get(ne(),{params:{query:c},signal:e.signal}).then(({data:f})=>f||[])),F&&A.push(x.get(ae(),{params:{query:c},signal:e.signal}).then(({data:f})=>f||[])),A.length===0){D(r,S.current,e.signal)&&y(s("Torznab.NoSearchSources"));return}const ke=await Promise.allSettled(A);if(!D(r,S.current,e.signal))return;const N=[];let H;for(const f of ke)f.status==="fulfilled"?N.push(f.value):!H&&!x.isCancel(f.reason)&&((i=f.reason)==null?void 0:i.code)!=="ERR_CANCELED"&&(H=f.reason);if(N.length===0)throw H||new Error(s("Torznab.SearchFailed"));const re=ht(...N);m(re),!B.current&&re.length>0&&(L("seeds"),C("desc"));return}let a=ne();const l={query:c};T==="rutor"?a=ae():typeof T=="number"&&(l.index=T);const{data:v}=await x.get(a,{params:l,signal:e.signal});if(!D(r,S.current,e.signal))return;const h=v||[];m(h),!B.current&&h.length>0&&(L("seeds"),C("desc"))}catch(a){if(x.isCancel(a)||ue(a)&&a.code==="ERR_CANCELED"||!D(r,S.current,e.signal))return;y(pt(a,s("Torznab.SearchFailed")))}finally{r===S.current&&U(!1)}},ze=e=>{e.key==="Enter"&&ee()},P=async e=>{const r=q(e)||e.Title||"item";G(!0),O(r);try{const i=e.Magnet||e.Link;if(!i){y(s("Torznab.NoLinkFound"));return}let a=e.Poster;if(!a&&e.Title){const l=Fe(e.Title);if(l){const v=await Pe(l,"en"),[h]=v||[];h&&(a=h)}}await x.post(Ne(),{action:"add",link:i,title:e.Title,save_to_db:!0,poster:a||""}),V(s("Torznab.TorrentAddedSuccessfully"))}catch{y(s("Torznab.FailedToAddTorrent"))}finally{G(!1),O(null)}},E=(e,r)=>{r!=="clickaway"&&(V(""),y(""))},ve=e=>{if(B.current=!0,w===e){C(r=>r==="asc"?"desc":"asc");return}L(e),C("desc")},te=o.useMemo(()=>u.length===0?u:[...u].sort((r,i)=>{let a,l;switch(w){case"size":a=I(r.Size||"0"),l=I(i.Size||"0");break;case"seeds":a=r.Seed||0,l=i.Seed||0;break;case"peers":a=r.Peer||0,l=i.Peer||0;break;default:return 0}return a===l?0:k==="asc"?a<l?-1:1:a>l?-1:1}),[u,w,k]),se=Se?z?b?null:W&&u.length===0?s("Torznab.NoResultsFound"):null:J&&$.length===0?s("Torznab.NoIndexersConfigured"):s("Torznab.NoSearchSources"):null,je=[{field:"size",label:s("Torznab.SortBySize")},{field:"seeds",label:s("Torznab.SortBySeeds")},{field:"peers",label:s("Torznab.SortByPeers")}];return t.jsxs(De,{open:!0,onClose:n,fullScreen:Te,fullWidth:!0,maxWidth:"md",slotProps:{paper:{sx:$e}},children:[t.jsx(Me,{children:s("Torznab.SearchTorrents")}),t.jsx(Ze,{children:t.jsxs(et,{children:[t.jsxs(tt,{children:[t.jsxs(_e,{variant:"outlined",size:"small",className:"search-tracker",disabled:!z,children:[t.jsx(Ke,{children:s("Tracker")}),t.jsxs(qe,{value:T,onChange:e=>M(e.target.value),label:s("Tracker"),children:[we&&t.jsx(_,{value:-1,children:s("AllTrackers")}),F&&t.jsx(_,{value:"rutor",children:s("Rutor")}),R&&$.map((e,r)=>t.jsx(_,{value:r,children:e.Name||e.Host},`${e.Host}-${e.Key}`))]})]}),t.jsx(Ue,{className:"search-query",label:s("Torznab.SearchQuery"),value:c,onChange:e=>p(e.target.value),onKeyDown:ze,variant:"outlined",size:"small",fullWidth:!0,placeholder:s("Torznab.SearchMoviesShows"),autoFocus:!0,disabled:!z}),t.jsx(oe,{className:"search-submit",variant:"contained",color:"primary",onClick:ee,disabled:b||!z||!c,startIcon:Le(b),children:s("Search")})]}),W&&u.length>0&&t.jsxs(st,{children:[t.jsx(rt,{children:s("Torznab.ResultsCount",{count:u.length})}),t.jsx(We,{exclusive:!0,size:"small",value:w,onChange:(e,r)=>{r&&ve(r)},"aria-label":s("Torznab.SortBy"),sx:{flexWrap:"wrap",gap:.5},children:je.map(({field:e,label:r})=>{const i=w===e;return t.jsxs(Ge,{value:e,selected:i,title:s(i?k==="asc"?"Torznab.SortAscending":"Torznab.SortDescending":"Torznab.SortBy"),sx:{textTransform:"none",px:1.25,height:28,borderRadius:"14px !important",border:a=>`1px solid ${a.palette.divider} !important`,"&.Mui-selected":{fontWeight:500}},children:[r,i&&(k==="asc"?t.jsx(Oe,{sx:{ml:.5,fontSize:14}}):t.jsx(Qe,{sx:{ml:.5,fontSize:14}}))]},e)})})]}),t.jsxs(nt,{children:[b&&t.jsx(de,{children:t.jsx(ie,{color:"secondary",size:32})}),!b&&se&&t.jsx(de,{children:t.jsx(Ve,{variant:"body2",color:"text.secondary",children:se})}),!b&&te.length>0&&t.jsx(at,{children:te.map((e,r)=>{const i=I(e.Size||"0"),a=Be(i),l=q(e)||`${e.Title||"item"}-${r}`,v=j&&fe===l;return t.jsxs(ot,{role:"button",tabIndex:0,onClick:()=>!j&&P(e),onKeyDown:h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),j||P(e))},children:[t.jsxs(it,{children:[t.jsx(lt,{children:e.Title}),t.jsxs(ct,{children:[t.jsx(K,{size:"small",label:a,variant:"outlined"}),t.jsx(K,{size:"small",label:`S ${e.Seed||0}`,color:Z?"default":"success",variant:"outlined",sx:Z?{bgcolor:"rgba(255, 255, 255, 0.08)"}:{bgcolor:"rgba(0, 167, 114, 0.12)"}}),t.jsx(K,{size:"small",label:`P ${e.Peer||0}`,variant:"outlined"})]})]}),t.jsx(dt,{children:t.jsx(Ye,{edge:"end","aria-label":"add",onClick:h=>{h.stopPropagation(),P(e)},disabled:j,size:"small",sx:{minWidth:40,minHeight:40},children:v?t.jsx(ie,{size:18,color:"secondary"}):t.jsx(Je,{color:"secondary"})})})]},l)})})]})]})}),t.jsx(le,{open:!!Q,autoHideDuration:1500,onClose:E,children:t.jsx(ce,{onClose:E,severity:"success",variant:"filled",sx:{width:"100%"},children:Q})}),t.jsx(le,{open:!!Y,autoHideDuration:1500,onClose:E,children:t.jsx(ce,{onClose:E,severity:"error",variant:"filled",sx:{width:"100%"},children:Y})}),t.jsx(ut,{children:t.jsx(oe,{onClick:n,color:"secondary",variant:"outlined",children:s("Close")})})]})}export{St as default};
