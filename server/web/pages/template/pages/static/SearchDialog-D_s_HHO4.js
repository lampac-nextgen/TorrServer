import{u as de,a as i,j as s,d as b,m as ue}from"./vendor-B9KbAPe3.js";import{r as V,m as S,D as Re,u as Ee,L as Me,s as Ae,p as O,S as De,d as Ne,a as $e,b as Be,f as Le,t as ae,c as ne,e as Fe,g as Pe,h as He}from"./index-BKq7mRND.js";import{au as pe,C as he,d as fe,ak as u,ag as _e,F as Ge,I as Ie,h as Oe,M as U,m as Ue,B as oe,ai as qe,N as Ve,bk as We,bl as Ke,af as Qe,aU as ie,ay as le}from"./mui-CgLukkAf.js";import{D as Ye}from"./mui-x-qYBHT7cz.js";import"./hls-CWTT-7hy.js";function Je({results:a,loading:t,adding:n,addingKey:p,resultDedupeKey:l,formatSize:f,onAdd:g}){const{t:m}=de(),j=i.useMemo(()=>a.map((h,k)=>({id:l(h)||`${h.Title||"item"}-${k}`,title:h.Title||"—",size:f(h),seeders:h.Seed??"—",peers:h.Peer??"—",item:h})),[a,l,f]),$=i.useMemo(()=>[{field:"title",headerName:m("Name",{defaultValue:"Name"}),flex:2,minWidth:180},{field:"size",headerName:m("Size",{defaultValue:"Size"}),width:100},{field:"seeders",headerName:m("Seeders",{defaultValue:"Seeders"}),width:90},{field:"peers",headerName:m("Peers",{defaultValue:"Peers"}),width:90}],[m]);return t?s.jsx(pe,{sx:{display:"grid",placeItems:"center",py:4},children:s.jsx(he,{color:"secondary",size:32})}):s.jsx(Ye,{rows:j,columns:$,density:"compact",disableRowSelectionOnClick:!0,pageSizeOptions:[25,50],initialState:{pagination:{paginationModel:{pageSize:25}}},onRowClick:h=>{n||g(h.row.item)},sx:{border:0,minHeight:280,height:"100%",cursor:n?"wait":"pointer",opacity:n?.7:1,"& .MuiDataGrid-row":{...p?{[`&[data-id="${p}"]`]:{bgcolor:"action.selected"}}:{}}}})}function Xe(a,t){var l;(l=a.current)==null||l.abort();const n=new AbortController;a.current=n;const p=++t.current;return{ac:n,gen:p}}function N(a,t,n){return a===t&&!n.aborted}const Ze=u.div`
  ${({theme:a})=>{const{settingsDialog:{contentBG:t}}=V(a);return fe`
    background: ${t};
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    max-height: calc(100dvh - var(--app-chrome-top) - var(--app-chrome-bottom));

    ${S("mobile")} {
      max-height: none;
      flex: 1 1 auto;
    }
  `}}
`,et=u.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 16px 20px 0;

  ${S("compact")} {
    padding: 12px 12px 0;
  }
`,tt=u.div`
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
  background: ${({theme:a})=>V(a).settingsDialog.contentBG};

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

  ${S("compact")} {
    .search-tracker {
      flex: 1 1 100%;
      min-width: 0;
    }

    .search-submit {
      min-width: 80px;
    }
  }

  ${S("phone")} {
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
`,st=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  flex-shrink: 0;
  margin-bottom: 8px;
  padding: 4px 0;

  ${S("compact")} {
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
`,rt=u.div`
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  opacity: 0.75;
  white-space: nowrap;
`,at=u.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  margin: 0 -4px;
  padding: 0 4px 12px;
`,ce=u.div`
  display: grid;
  place-items: center;
  min-height: 160px;
  padding: 24px 12px;
  text-align: center;
  opacity: 0.7;
`;u.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;u.li`
  ${({theme:a})=>{const{app:{paperColor:t},addDialog:{separatorColor:n}}=V(a);return fe`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px 12px;
    align-items: center;
    padding: 10px 12px;
    border-radius: 6px;
    border: 1px solid ${n};
    background: ${t};
    cursor: pointer;
    transition: filter 0.15s ease;

    &:hover {
      filter: brightness(0.97);
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    ${S("compact")} {
      padding: 8px 10px;
      gap: 6px 8px;
    }
  `}}
`;u.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;u.div`
  font-size: 13px;
  line-height: 1.35;
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;

  ${S("compact")} {
    font-size: 12.5px;
  }
`;u.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`;u.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;const nt=u(Re)`
  ${S("phone")} {
    .MuiButton-root {
      width: 100%;
    }
  }
`,q=a=>(a.Hash||a.Magnet||a.Link||a.Title||"").toLowerCase(),ot=(...a)=>{const t=new Set,n=[];for(const p of a)for(const l of p||[]){const f=q(l);if(f){if(t.has(f))continue;t.add(f)}n.push(l)}return n},it=(a,t)=>{var n;if(ue(a)){const p=(n=a.response)==null?void 0:n.data;if(p!=null&&p.error)return String(p.error);if(a.message)return a.message}return a instanceof Error&&a.message?a.message:t};function ht({handleClose:a}){const{t}=de();Ee(!0);const[n,p]=i.useState(""),[l,f]=i.useState([]),[g,m]=i.useState(!1),[j,$]=i.useState(!1),[h,k]=i.useState(!1),[W,K]=i.useState(null),[Q,Y]=i.useState(""),[J,w]=i.useState(""),[B,xe]=i.useState([]),[ge,me]=i.useState(!1),[X,be]=i.useState(!1),[T,L]=i.useState(-1),[z,F]=i.useState("seeds"),[R,E]=i.useState("desc"),[Se,ye]=i.useState(!1),P=i.useRef(!1),Z=i.useRef(null),y=i.useRef(0),we=_e(Me),M=X&&B.length>0,H=ge,v=M||H,Te=M;i.useEffect(()=>{const e=new AbortController;return b.post(Ae(),{action:"get"},{signal:e.signal}).then(({data:r})=>{if(r){const c=r.TorznabUrls||[],o=!!r.EnableTorznabSearch,d=!!r.EnableRutorSearch;xe(c),be(o),me(d),o&&c.length>0?L(-1):d&&L("rutor")}}).catch(r=>{!b.isCancel(r)&&(r==null||r.code)}).finally(()=>{e.signal.aborted||ye(!0)}),()=>e.abort()},[]),i.useEffect(()=>()=>{var e;(e=Z.current)==null||e.abort()},[]);const ee=async()=>{var c;if(!n||!v)return;const{ac:e,gen:r}=Xe(Z,y);m(!0),$(!0),f([]);try{if(T===-1){const D=[];if(M&&D.push(b.get(ae(),{params:{query:n},signal:e.signal}).then(({data:x})=>x||[])),H&&D.push(b.get(ne(),{params:{query:n},signal:e.signal}).then(({data:x})=>x||[])),D.length===0){N(r,y.current,e.signal)&&w(t("Torznab.NoSearchSources"));return}const ke=await Promise.allSettled(D);if(!N(r,y.current,e.signal))return;const G=[];let I;for(const x of ke)x.status==="fulfilled"?G.push(x.value):!I&&!b.isCancel(x.reason)&&((c=x.reason)==null?void 0:c.code)!=="ERR_CANCELED"&&(I=x.reason);if(G.length===0)throw I||new Error(t("Torznab.SearchFailed"));const re=ot(...G);f(re),!P.current&&re.length>0&&(F("seeds"),E("desc"));return}let o=ae();const d={query:n};T==="rutor"?o=ne():typeof T=="number"&&(d.index=T);const{data:_}=await b.get(o,{params:d,signal:e.signal});if(!N(r,y.current,e.signal))return;const C=_||[];f(C),!P.current&&C.length>0&&(F("seeds"),E("desc"))}catch(o){if(b.isCancel(o)||ue(o)&&o.code==="ERR_CANCELED"||!N(r,y.current,e.signal))return;w(it(o,t("Torznab.SearchFailed")))}finally{r===y.current&&m(!1)}},ze=e=>{e.key==="Enter"&&ee()},ve=async e=>{const r=q(e)||e.Title||"item";k(!0),K(r);try{const c=e.Magnet||e.Link;if(!c){w(t("Torznab.NoLinkFound"));return}let o=e.Poster;if(!o&&e.Title){const d=Fe(e.Title);if(d){const _=await Pe(d,"en"),[C]=_||[];C&&(o=C)}}await b.post(He(),{action:"add",link:c,title:e.Title,save_to_db:!0,poster:o||""}),Y(t("Torznab.TorrentAddedSuccessfully"))}catch{w(t("Torznab.FailedToAddTorrent"))}finally{k(!1),K(null)}},A=(e,r)=>{r!=="clickaway"&&(Y(""),w(""))},Ce=e=>{if(P.current=!0,z===e){E(r=>r==="asc"?"desc":"asc");return}F(e),E("desc")},te=i.useMemo(()=>l.length===0?l:[...l].sort((r,c)=>{let o,d;switch(z){case"size":o=O(r.Size||"0"),d=O(c.Size||"0");break;case"seeds":o=r.Seed||0,d=c.Seed||0;break;case"peers":o=r.Peer||0,d=c.Peer||0;break;default:return 0}return o===d?0:R==="asc"?o<d?-1:1:o>d?-1:1}),[l,z,R]),se=Se?v?g?null:j&&l.length===0?t("Torznab.NoResultsFound"):null:X&&B.length===0?t("Torznab.NoIndexersConfigured"):t("Torznab.NoSearchSources"):null,je=[{field:"size",label:t("Torznab.SortBySize")},{field:"seeds",label:t("Torznab.SortBySeeds")},{field:"peers",label:t("Torznab.SortByPeers")}];return s.jsxs(De,{open:!0,onClose:a,fullScreen:we,fullWidth:!0,maxWidth:"md",slotProps:{paper:{sx:Ne}},children:[s.jsx($e,{children:t("Torznab.SearchTorrents")}),s.jsx(Ze,{children:s.jsxs(et,{children:[s.jsxs(tt,{children:[s.jsxs(Ge,{variant:"outlined",size:"small",className:"search-tracker",disabled:!v,children:[s.jsx(Ie,{children:t("Tracker")}),s.jsxs(Oe,{value:T,onChange:e=>L(e.target.value),label:t("Tracker"),children:[Te&&s.jsx(U,{value:-1,children:t("AllTrackers")}),H&&s.jsx(U,{value:"rutor",children:t("Rutor")}),M&&B.map((e,r)=>s.jsx(U,{value:r,children:e.Name||e.Host},`${e.Host}-${e.Key}`))]})]}),s.jsx(Ue,{className:"search-query",label:t("Torznab.SearchQuery"),value:n,onChange:e=>p(e.target.value),onKeyDown:ze,variant:"outlined",size:"small",fullWidth:!0,placeholder:t("Torznab.SearchMoviesShows"),autoFocus:!0,disabled:!v}),s.jsx(oe,{className:"search-submit",variant:"contained",color:"primary",onClick:ee,disabled:g||!v||!n,startIcon:Be(g),children:t("Search")})]}),j&&l.length>0&&s.jsxs(st,{children:[s.jsx(rt,{children:t("Torznab.ResultsCount",{count:l.length})}),s.jsx(qe,{exclusive:!0,size:"small",value:z,onChange:(e,r)=>{r&&Ce(r)},"aria-label":t("Torznab.SortBy"),sx:{flexWrap:"wrap",gap:.5},children:je.map(({field:e,label:r})=>{const c=z===e;return s.jsxs(Ve,{value:e,selected:c,title:t(c?R==="asc"?"Torznab.SortAscending":"Torznab.SortDescending":"Torznab.SortBy"),sx:{textTransform:"none",px:1.25,height:28,borderRadius:"14px !important",border:o=>`1px solid ${o.palette.divider} !important`,"&.Mui-selected":{fontWeight:500}},children:[r,c&&(R==="asc"?s.jsx(We,{sx:{ml:.5,fontSize:14}}):s.jsx(Ke,{sx:{ml:.5,fontSize:14}}))]},e)})})]}),s.jsxs(at,{children:[g&&s.jsx(ce,{children:s.jsx(he,{color:"secondary",size:32})}),!g&&se&&s.jsx(ce,{children:s.jsx(Qe,{variant:"body2",color:"text.secondary",children:se})}),!g&&te.length>0&&s.jsx(pe,{sx:{flex:1,minHeight:280,height:"100%"},children:s.jsx(Je,{results:te,loading:!1,adding:h,addingKey:W,resultDedupeKey:q,formatSize:e=>Le(O(e.Size||"0")),onAdd:ve})})]})]})}),s.jsx(ie,{open:!!Q,autoHideDuration:1500,onClose:A,children:s.jsx(le,{onClose:A,severity:"success",variant:"filled",sx:{width:"100%"},children:Q})}),s.jsx(ie,{open:!!J,autoHideDuration:1500,onClose:A,children:s.jsx(le,{onClose:A,severity:"error",variant:"filled",sx:{width:"100%"},children:J})}),s.jsx(nt,{children:s.jsx(oe,{onClick:a,color:"secondary",variant:"outlined",children:t("Close")})})]})}export{ht as default};
