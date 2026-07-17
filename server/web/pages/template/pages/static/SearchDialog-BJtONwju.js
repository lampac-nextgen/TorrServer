import{u as ye,a as o,d as w,j as t,n as Se}from"./vendor-BrL-wjj_.js";import{f as T,g as c,u as we,s as Te,p as P,S as ze,a as je,b as ve,t as Z,c as ee,d as ke,e as Ce,h as $e}from"./index-BAwj1XGY.js";import{h as Re,aN as De,ar as Ae,as as Ee,x as H,ao as Me,m as te,p as L,U as Fe,Q as Be,b as Pe,I as He,aO as Le,S as se,i as ne}from"./mui-DhAGzh8N.js";import"./hls-CWTT-7hy.js";const Ne=c.div`
  ${({theme:{settingsDialog:{contentBG:n}}})=>T`
    background: ${n};
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    max-height: calc(100vh - 160px);

    @media (max-width: 930px) {
      max-height: none;
      flex: 1 1 auto;
    }
  `}
`,Ke=c.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 16px 20px 0;

  @media (max-width: 600px) {
    padding: 12px 12px 0;
  }
`,Ie=c.div`
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

  @media (max-width: 600px) {
    .search-tracker {
      flex: 1 1 100%;
      min-width: 0;
    }

    .search-submit {
      min-width: 80px;
    }
  }
`,Oe=c.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  flex-shrink: 0;
  margin-bottom: 8px;
  padding: 4px 0;
`,Qe=c.div`
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  opacity: 0.75;
  white-space: nowrap;
`,Ue=c.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`,qe=c.button`
  ${({$active:n,theme:{app:{paperColor:s},addDialog:{separatorColor:d}}})=>T`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 28px;
    padding: 0 10px;
    border-radius: 14px;
    border: 1px solid ${d};
    background: ${n?s:"transparent"};
    color: inherit;
    font-size: 12px;
    font-weight: ${n?600:400};
    cursor: pointer;
    line-height: 1;
    transition:
      background 0.15s ease,
      border-color 0.15s ease;

    &:hover {
      background: ${s};
    }

    svg {
      font-size: 14px;
    }
  `}
`,We=c.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  margin: 0 -4px;
  padding: 0 4px 12px;
`,re=c.div`
  display: grid;
  place-items: center;
  min-height: 160px;
  padding: 24px 12px;
  text-align: center;
  opacity: 0.7;
`,_e=c.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Ve=c.li`
  ${({theme:{app:{paperColor:n},addDialog:{separatorColor:s}}})=>T`
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

    @media (max-width: 600px) {
      padding: 8px 10px;
      gap: 6px 8px;
    }
  `}
`,Ge=c.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Je=c.div`
  font-size: 14px;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;

  @media (max-width: 600px) {
    font-size: 13px;
  }
`,Xe=c.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`,N=c.span`
  ${({$tone:n="neutral",theme:{addDialog:{separatorColor:s}}})=>{const d={neutral:{bg:s},seeds:{bg:"rgba(0, 167, 114, 0.22)"},peers:{bg:s}},{bg:p}=d[n];return T`
      display: inline-flex;
      align-items: center;
      height: 20px;
      padding: 0 8px;
      border-radius: 10px;
      font-size: 11px;
      font-variant-numeric: tabular-nums;
      line-height: 1;
      white-space: nowrap;
      background: ${p};
      opacity: 0.95;
    `}}
`,Ye=c.div`
  display: flex;
  align-items: center;
  justify-content: center;
`,Ze=c.div`
  ${({theme:{settingsDialog:{footerBG:n},addDialog:{separatorColor:s}}})=>T`
    padding: 16px 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    border-top: 1px solid ${s};
    background: ${n};
    flex-shrink: 0;

    @media (max-width: 600px) {
      padding: 12px;
    }
  `}
`,K=n=>(n.Hash||n.Magnet||n.Link||n.Title||"").toLowerCase(),et=(...n)=>{const s=new Set,d=[];for(const p of n)for(const h of p||[]){const x=K(h);if(x){if(s.has(x))continue;s.add(x)}d.push(h)}return d},tt=(n,s)=>{var d;if(Se(n)){const p=(d=n.response)==null?void 0:d.data;if(p!=null&&p.error)return String(p.error);if(n.message)return n.message}return n instanceof Error&&n.message?n.message:s};function ot({handleClose:n}){const{t:s}=ye(),[d,p]=o.useState(""),[h,x]=o.useState([]),[g,I]=o.useState(!1),[O,ae]=o.useState(!1),[z,Q]=o.useState(!1),[oe,U]=o.useState(null),[q,W]=o.useState(""),[_,b]=o.useState(""),[R,ie]=o.useState([]),[le,ce]=o.useState(!1),[V,de]=o.useState(!1),[m,D]=o.useState(-1),[j,A]=o.useState("seeds"),[v,k]=o.useState("desc"),[ue,pe]=o.useState(!1),E=o.useRef(!1),he=Re("(max-width:930px)"),xe=we(n),C=V&&R.length>0,M=le,y=C||M,fe=C;o.useEffect(()=>{w.post(Te(),{action:"get"}).then(({data:e})=>{if(e){const r=e.TorznabUrls||[],i=!!e.EnableTorznabSearch,a=!!e.EnableRutorSearch;ie(r),de(i),ce(a),i&&r.length>0?D(-1):a&&D("rutor")}}).catch(()=>{}).finally(()=>pe(!0))},[]);const G=async()=>{if(!(!d||!y)){I(!0),ae(!0),x([]);try{if(m===-1){const l=[];if(C&&l.push(w.get(Z(),{params:{query:d}}).then(({data:f})=>f||[])),M&&l.push(w.get(ee(),{params:{query:d}}).then(({data:f})=>f||[])),l.length===0){b(s("Torznab.NoSearchSources"));return}const S=await Promise.allSettled(l),u=[];let B;for(const f of S)f.status==="fulfilled"?u.push(f.value):B||(B=f.reason);if(u.length===0)throw B||new Error(s("Torznab.SearchFailed"));const Y=et(...u);x(Y),!E.current&&Y.length>0&&(A("seeds"),k("desc"));return}let e=Z();const r={query:d};m==="rutor"?e=ee():typeof m=="number"&&(r.index=m);const{data:i}=await w.get(e,{params:r}),a=i||[];x(a),!E.current&&a.length>0&&(A("seeds"),k("desc"))}catch(e){b(tt(e,s("Torznab.SearchFailed")))}finally{I(!1)}}},ge=e=>{e.key==="Enter"&&G()},F=async e=>{const r=K(e)||e.Title||"item";Q(!0),U(r);try{const i=e.Magnet||e.Link;if(!i){b(s("Torznab.NoLinkFound"));return}let a=e.Poster;if(!a&&e.Title){const l=ke(e.Title);if(l){const S=await Ce(l,"en"),[u]=S||[];u&&(a=u)}}await w.post($e(),{action:"add",link:i,title:e.Title,save_to_db:!0,poster:a||""}),W(s("Torznab.TorrentAddedSuccessfully"))}catch{b(s("Torznab.FailedToAddTorrent"))}finally{Q(!1),U(null)}},$=(e,r)=>{r!=="clickaway"&&(W(""),b(""))},be=e=>{if(E.current=!0,j===e){k(r=>r==="asc"?"desc":"asc");return}A(e),k("desc")},J=o.useMemo(()=>h.length===0?h:[...h].sort((r,i)=>{let a,l;switch(j){case"size":a=P(r.Size||"0"),l=P(i.Size||"0");break;case"seeds":a=r.Seed||0,l=i.Seed||0;break;case"peers":a=r.Peer||0,l=i.Peer||0;break;default:return 0}return a===l?0:v==="asc"?a<l?-1:1:a>l?-1:1}),[h,j,v]),X=ue?y?g?null:O&&h.length===0?s("Torznab.NoResultsFound"):null:V&&R.length===0?s("Torznab.NoIndexersConfigured"):s("Torznab.NoSearchSources"):null,me=[{field:"size",label:s("Torznab.SortBySize")},{field:"seeds",label:s("Torznab.SortBySeeds")},{field:"peers",label:s("Torznab.SortByPeers")}];return t.jsxs(ze,{open:!0,onClose:n,fullScreen:he,fullWidth:!0,maxWidth:"md",ref:xe,children:[t.jsx(je,{children:s("Torznab.SearchTorrents")}),t.jsx(Ne,{children:t.jsxs(Ke,{children:[t.jsxs(Ie,{children:[t.jsxs(De,{variant:"outlined",size:"small",className:"search-tracker",disabled:!y,children:[t.jsx(Ae,{children:s("Tracker")}),t.jsxs(Ee,{value:m,onChange:e=>D(e.target.value),label:s("Tracker"),children:[fe&&t.jsx(H,{value:-1,children:s("AllTrackers")}),M&&t.jsx(H,{value:"rutor",children:s("Rutor")}),C&&R.map((e,r)=>t.jsx(H,{value:r,children:e.Name||e.Host},`${e.Host}-${e.Key}`))]})]}),t.jsx(Me,{className:"search-query",label:s("Torznab.SearchQuery"),value:d,onChange:e=>p(e.target.value),onKeyDown:ge,variant:"outlined",size:"small",fullWidth:!0,placeholder:s("Torznab.SearchMoviesShows"),autoFocus:!0,disabled:!y}),t.jsx(te,{className:"search-submit",variant:"contained",color:"primary",onClick:G,disabled:g||!y||!d,children:g?t.jsx(L,{size:22,color:"inherit"}):s("Search")})]}),O&&h.length>0&&t.jsxs(Oe,{children:[t.jsx(Qe,{children:s("Torznab.ResultsCount",{count:h.length})}),t.jsx(Ue,{children:me.map(({field:e,label:r})=>{const i=j===e;return t.jsxs(qe,{type:"button",$active:i,onClick:()=>be(e),title:s(i?v==="asc"?"Torznab.SortAscending":"Torznab.SortDescending":"Torznab.SortBy"),children:[r,i&&(v==="asc"?t.jsx(Fe,{}):t.jsx(Be,{}))]},e)})})]}),t.jsxs(We,{children:[g&&t.jsx(re,{children:t.jsx(L,{color:"secondary",size:32})}),!g&&X&&t.jsx(re,{children:t.jsx(Pe,{variant:"body2",color:"text.secondary",children:X})}),!g&&J.length>0&&t.jsx(_e,{children:J.map((e,r)=>{const i=P(e.Size||"0"),a=ve(i),l=K(e)||`${e.Title||"item"}-${r}`,S=z&&oe===l;return t.jsxs(Ve,{role:"button",tabIndex:0,onClick:()=>!z&&F(e),onKeyDown:u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),z||F(e))},children:[t.jsxs(Ge,{children:[t.jsx(Je,{children:e.Title}),t.jsxs(Xe,{children:[t.jsx(N,{$tone:"neutral",children:a}),t.jsxs(N,{$tone:"seeds",children:["S ",e.Seed||0]}),t.jsxs(N,{$tone:"peers",children:["P ",e.Peer||0]})]})]}),t.jsx(Ye,{children:t.jsx(He,{edge:"end","aria-label":"add",onClick:u=>{u.stopPropagation(),F(e)},disabled:z,size:"small",sx:{minWidth:40,minHeight:40},children:S?t.jsx(L,{size:18,color:"secondary"}):t.jsx(Le,{color:"secondary"})})})]},l)})})]})]})}),t.jsx(se,{open:!!q,autoHideDuration:1500,onClose:$,children:t.jsx(ne,{onClose:$,severity:"success",variant:"filled",sx:{width:"100%"},children:q})}),t.jsx(se,{open:!!_,autoHideDuration:1500,onClose:$,children:t.jsx(ne,{onClose:$,severity:"error",variant:"filled",sx:{width:"100%"},children:_})}),t.jsx(Ze,{children:t.jsx(te,{onClick:n,color:"secondary",variant:"outlined",children:s("Close")})})]})}export{ot as default};
//# sourceMappingURL=SearchDialog-BJtONwju.js.map
