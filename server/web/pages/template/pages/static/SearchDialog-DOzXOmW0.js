import{u as ke,a as o,d as f,j as t,m as ce}from"./vendor-B9KbAPe3.js";import{f as de,g as d,D as Ce,L as Re,u as Ee,s as Ae,p as H,S as De,a as Le,b as Me,c as Be,t as se,d as ne,e as Fe,h as Ne,i as $e}from"./index-C5-c242n.js";import{e as Pe,aB as He,ae as Ie,af as _e,v as I,ab as Ke,l as re,a7 as qe,a8 as Oe,aC as Ue,aD as We,n as ae,T as Qe,Q as _,I as Ge,aE as Ve,a1 as oe,A as ie}from"./mui-C7bVulSz.js";import"./hls-CWTT-7hy.js";function Ye(r,s){var u;(u=r.current)==null||u.abort();const c=new AbortController;r.current=c;const x=++s.current;return{ac:c,gen:x}}function A(r,s,c){return r===s&&!c.aborted}const Je=d.div`
  ${({theme:{settingsDialog:{contentBG:r}}})=>de`
    background: ${r};
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    max-height: calc(100dvh - 160px);

    @media (max-width: 930px) {
      max-height: none;
      flex: 1 1 auto;
    }
  `}
`,Xe=d.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 16px 20px 0;

  @media (max-width: 600px) {
    padding: 12px 12px 0;
  }
`,Ze=d.div`
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
  background: ${({theme:{settingsDialog:{contentBG:r}}})=>r};

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

  @media (max-width: 600px) {
    .search-tracker {
      flex: 1 1 100%;
      min-width: 0;
    }

    .search-submit {
      min-width: 80px;
    }
  }

  @media (max-width: 420px) {
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
`,et=d.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  flex-shrink: 0;
  margin-bottom: 8px;
  padding: 4px 0;
`,tt=d.div`
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  opacity: 0.75;
  white-space: nowrap;
`,st=d.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  margin: 0 -4px;
  padding: 0 4px 12px;
`,le=d.div`
  display: grid;
  place-items: center;
  min-height: 160px;
  padding: 24px 12px;
  text-align: center;
  opacity: 0.7;
`,nt=d.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,rt=d.li`
  ${({theme:{app:{paperColor:r},addDialog:{separatorColor:s}}})=>de`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px 12px;
    align-items: center;
    padding: 10px 12px;
    border-radius: 6px;
    border: 1px solid ${s};
    background: ${r};
    cursor: pointer;
    transition: filter 0.15s ease;

    &:hover {
      filter: brightness(0.97);
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    @media (max-width: 600px) {
      padding: 8px 10px;
      gap: 6px 8px;
    }
  `}
`,at=d.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,ot=d.div`
  font-size: 13px;
  line-height: 1.35;
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;

  @media (max-width: 600px) {
    font-size: 12.5px;
  }
`,it=d.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`,lt=d.div`
  display: flex;
  align-items: center;
  justify-content: center;
`,ct=d(Ce)`
  @media (max-width: 420px) {
    .MuiButton-root {
      width: 100%;
    }
  }
`,K=r=>(r.Hash||r.Magnet||r.Link||r.Title||"").toLowerCase(),dt=(...r)=>{const s=new Set,c=[];for(const x of r)for(const u of x||[]){const g=K(u);if(g){if(s.has(g))continue;s.add(g)}c.push(u)}return c},ut=(r,s)=>{var c;if(ce(r)){const x=(c=r.response)==null?void 0:c.data;if(x!=null&&x.error)return String(x.error);if(r.message)return r.message}return r instanceof Error&&r.message?r.message:s};function gt({handleClose:r}){const{t:s}=ke(),[c,x]=o.useState(""),[u,g]=o.useState([]),[m,q]=o.useState(!1),[O,ue]=o.useState(!1),[v,U]=o.useState(!1),[he,W]=o.useState(null),[Q,G]=o.useState(""),[V,S]=o.useState(""),[D,xe]=o.useState([]),[pe,fe]=o.useState(!1),[Y,ge]=o.useState(!1),[y,L]=o.useState(-1),[w,M]=o.useState("seeds"),[j,k]=o.useState("desc"),[me,be]=o.useState(!1),B=o.useRef(!1),J=o.useRef(null),b=o.useRef(0),Se=Pe(Re),ye=Ee(r),C=Y&&D.length>0,F=pe,T=C||F,we=C;o.useEffect(()=>{const e=new AbortController;return f.post(Ae(),{action:"get"},{signal:e.signal}).then(({data:n})=>{if(n){const i=n.TorznabUrls||[],a=!!n.EnableTorznabSearch,l=!!n.EnableRutorSearch;xe(i),ge(a),fe(l),a&&i.length>0?L(-1):l&&L("rutor")}}).catch(n=>{!f.isCancel(n)&&(n==null||n.code)}).finally(()=>{e.signal.aborted||be(!0)}),()=>e.abort()},[]),o.useEffect(()=>()=>{var e;(e=J.current)==null||e.abort()},[]);const X=async()=>{var i;if(!c||!T)return;const{ac:e,gen:n}=Ye(J,b);q(!0),ue(!0),g([]);try{if(y===-1){const E=[];if(C&&E.push(f.get(se(),{params:{query:c},signal:e.signal}).then(({data:p})=>p||[])),F&&E.push(f.get(ne(),{params:{query:c},signal:e.signal}).then(({data:p})=>p||[])),E.length===0){A(n,b.current,e.signal)&&S(s("Torznab.NoSearchSources"));return}const je=await Promise.allSettled(E);if(!A(n,b.current,e.signal))return;const $=[];let P;for(const p of je)p.status==="fulfilled"?$.push(p.value):!P&&!f.isCancel(p.reason)&&((i=p.reason)==null?void 0:i.code)!=="ERR_CANCELED"&&(P=p.reason);if($.length===0)throw P||new Error(s("Torznab.SearchFailed"));const te=dt(...$);g(te),!B.current&&te.length>0&&(M("seeds"),k("desc"));return}let a=se();const l={query:c};y==="rutor"?a=ne():typeof y=="number"&&(l.index=y);const{data:z}=await f.get(a,{params:l,signal:e.signal});if(!A(n,b.current,e.signal))return;const h=z||[];g(h),!B.current&&h.length>0&&(M("seeds"),k("desc"))}catch(a){if(f.isCancel(a)||ce(a)&&a.code==="ERR_CANCELED"||!A(n,b.current,e.signal))return;S(ut(a,s("Torznab.SearchFailed")))}finally{n===b.current&&q(!1)}},Te=e=>{e.key==="Enter"&&X()},N=async e=>{const n=K(e)||e.Title||"item";U(!0),W(n);try{const i=e.Magnet||e.Link;if(!i){S(s("Torznab.NoLinkFound"));return}let a=e.Poster;if(!a&&e.Title){const l=Fe(e.Title);if(l){const z=await Ne(l,"en"),[h]=z||[];h&&(a=h)}}await f.post($e(),{action:"add",link:i,title:e.Title,save_to_db:!0,poster:a||""}),G(s("Torznab.TorrentAddedSuccessfully"))}catch{S(s("Torznab.FailedToAddTorrent"))}finally{U(!1),W(null)}},R=(e,n)=>{n!=="clickaway"&&(G(""),S(""))},ze=e=>{if(B.current=!0,w===e){k(n=>n==="asc"?"desc":"asc");return}M(e),k("desc")},Z=o.useMemo(()=>u.length===0?u:[...u].sort((n,i)=>{let a,l;switch(w){case"size":a=H(n.Size||"0"),l=H(i.Size||"0");break;case"seeds":a=n.Seed||0,l=i.Seed||0;break;case"peers":a=n.Peer||0,l=i.Peer||0;break;default:return 0}return a===l?0:j==="asc"?a<l?-1:1:a>l?-1:1}),[u,w,j]),ee=me?T?m?null:O&&u.length===0?s("Torznab.NoResultsFound"):null:Y&&D.length===0?s("Torznab.NoIndexersConfigured"):s("Torznab.NoSearchSources"):null,ve=[{field:"size",label:s("Torznab.SortBySize")},{field:"seeds",label:s("Torznab.SortBySeeds")},{field:"peers",label:s("Torznab.SortByPeers")}];return t.jsxs(De,{open:!0,onClose:r,fullScreen:Se,fullWidth:!0,maxWidth:"md",ref:ye,children:[t.jsx(Le,{children:s("Torznab.SearchTorrents")}),t.jsx(Je,{children:t.jsxs(Xe,{children:[t.jsxs(Ze,{children:[t.jsxs(He,{variant:"outlined",size:"small",className:"search-tracker",disabled:!T,children:[t.jsx(Ie,{children:s("Tracker")}),t.jsxs(_e,{value:y,onChange:e=>L(e.target.value),label:s("Tracker"),children:[we&&t.jsx(I,{value:-1,children:s("AllTrackers")}),F&&t.jsx(I,{value:"rutor",children:s("Rutor")}),C&&D.map((e,n)=>t.jsx(I,{value:n,children:e.Name||e.Host},`${e.Host}-${e.Key}`))]})]}),t.jsx(Ke,{className:"search-query",label:s("Torznab.SearchQuery"),value:c,onChange:e=>x(e.target.value),onKeyDown:Te,variant:"outlined",size:"small",fullWidth:!0,placeholder:s("Torznab.SearchMoviesShows"),autoFocus:!0,disabled:!T}),t.jsx(re,{className:"search-submit",variant:"contained",color:"primary",onClick:X,disabled:m||!T||!c,startIcon:Me(m),children:s("Search")})]}),O&&u.length>0&&t.jsxs(et,{children:[t.jsx(tt,{children:s("Torznab.ResultsCount",{count:u.length})}),t.jsx(qe,{exclusive:!0,size:"small",value:w,onChange:(e,n)=>{n&&ze(n)},"aria-label":s("Torznab.SortBy"),sx:{flexWrap:"wrap",gap:.5},children:ve.map(({field:e,label:n})=>{const i=w===e;return t.jsxs(Oe,{value:e,selected:i,title:s(i?j==="asc"?"Torznab.SortAscending":"Torznab.SortDescending":"Torznab.SortBy"),sx:{textTransform:"none",px:1.25,height:28,borderRadius:"14px !important",border:a=>`1px solid ${a.palette.divider} !important`,"&.Mui-selected":{fontWeight:600}},children:[n,i&&(j==="asc"?t.jsx(Ue,{sx:{ml:.5,fontSize:14}}):t.jsx(We,{sx:{ml:.5,fontSize:14}}))]},e)})})]}),t.jsxs(st,{children:[m&&t.jsx(le,{children:t.jsx(ae,{color:"secondary",size:32})}),!m&&ee&&t.jsx(le,{children:t.jsx(Qe,{variant:"body2",color:"text.secondary",children:ee})}),!m&&Z.length>0&&t.jsx(nt,{children:Z.map((e,n)=>{const i=H(e.Size||"0"),a=Be(i),l=K(e)||`${e.Title||"item"}-${n}`,z=v&&he===l;return t.jsxs(rt,{role:"button",tabIndex:0,onClick:()=>!v&&N(e),onKeyDown:h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),v||N(e))},children:[t.jsxs(at,{children:[t.jsx(ot,{children:e.Title}),t.jsxs(it,{children:[t.jsx(_,{size:"small",label:a,variant:"outlined"}),t.jsx(_,{size:"small",label:`S ${e.Seed||0}`,color:"success",variant:"outlined",sx:{bgcolor:"rgba(0, 167, 114, 0.12)"}}),t.jsx(_,{size:"small",label:`P ${e.Peer||0}`,variant:"outlined"})]})]}),t.jsx(lt,{children:t.jsx(Ge,{edge:"end","aria-label":"add",onClick:h=>{h.stopPropagation(),N(e)},disabled:v,size:"small",sx:{minWidth:40,minHeight:40},children:z?t.jsx(ae,{size:18,color:"secondary"}):t.jsx(Ve,{color:"secondary"})})})]},l)})})]})]})}),t.jsx(oe,{open:!!Q,autoHideDuration:1500,onClose:R,children:t.jsx(ie,{onClose:R,severity:"success",variant:"filled",sx:{width:"100%"},children:Q})}),t.jsx(oe,{open:!!V,autoHideDuration:1500,onClose:R,children:t.jsx(ie,{onClose:R,severity:"error",variant:"filled",sx:{width:"100%"},children:V})}),t.jsx(ct,{children:t.jsx(re,{onClick:r,color:"secondary",variant:"outlined",children:s("Close")})})]})}export{gt as default};
