import{u as ke,a as o,d as f,j as t,m as de}from"./vendor-B9KbAPe3.js";import{f as W,g as d,u as Ce,s as Re,p as H,S as Ee,a as Ae,b as De,c as Me,D as $e,t as ne,d as re,e as Be,h as Le,i as Fe}from"./index-DtwYfyyw.js";import{f as Ne,ay as Pe,ab as He,ac as Ie,o as I,a8 as Ke,g as ae,az as _e,aA as We,aB as qe,aC as Oe,i as oe,T as Qe,I as Ue,aD as Ge,$ as ie,A as le}from"./mui-D5L4kO0I.js";import"./hls-CWTT-7hy.js";function Ve(r,s){var u;(u=r.current)==null||u.abort();const i=new AbortController;r.current=i;const h=++s.current;return{ac:i,gen:h}}function A(r,s,i){return r===s&&!i.aborted}const Je=d.div`
  ${({theme:{settingsDialog:{contentBG:r}}})=>W`
    background: ${r};
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
`,Xe=d.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 16px 20px 0;

  @media (max-width: 600px) {
    padding: 12px 12px 0;
  }
`,Ye=d.div`
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
`,Ze=d.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  flex-shrink: 0;
  margin-bottom: 8px;
  padding: 4px 0;
`,et=d.div`
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  opacity: 0.75;
  white-space: nowrap;
`,tt=d.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  margin: 0 -4px;
  padding: 0 4px 12px;
`,ce=d.div`
  display: grid;
  place-items: center;
  min-height: 160px;
  padding: 24px 12px;
  text-align: center;
  opacity: 0.7;
`,st=d.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,nt=d.li`
  ${({theme:{app:{paperColor:r},addDialog:{separatorColor:s}}})=>W`
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
`,rt=d.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,at=d.div`
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
`,ot=d.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`,K=d.span`
  ${({$tone:r="neutral",theme:{addDialog:{separatorColor:s}}})=>{const i={neutral:{bg:s},seeds:{bg:"rgba(0, 167, 114, 0.22)"},peers:{bg:s}},{bg:h}=i[r];return W`
      display: inline-flex;
      align-items: center;
      height: 20px;
      padding: 0 8px;
      border-radius: 10px;
      font-size: 11px;
      font-variant-numeric: tabular-nums;
      line-height: 1;
      white-space: nowrap;
      background: ${h};
      opacity: 0.95;
    `}}
`,it=d.div`
  display: flex;
  align-items: center;
  justify-content: center;
`,_=r=>(r.Hash||r.Magnet||r.Link||r.Title||"").toLowerCase(),lt=(...r)=>{const s=new Set,i=[];for(const h of r)for(const u of h||[]){const g=_(u);if(g){if(s.has(g))continue;s.add(g)}i.push(u)}return i},ct=(r,s)=>{var i;if(de(r)){const h=(i=r.response)==null?void 0:i.data;if(h!=null&&h.error)return String(h.error);if(r.message)return r.message}return r instanceof Error&&r.message?r.message:s};function xt({handleClose:r}){const{t:s}=ke(),[i,h]=o.useState(""),[u,g]=o.useState([]),[b,q]=o.useState(!1),[O,ue]=o.useState(!1),[v,Q]=o.useState(!1),[he,U]=o.useState(null),[G,V]=o.useState(""),[J,S]=o.useState(""),[D,pe]=o.useState([]),[xe,fe]=o.useState(!1),[X,ge]=o.useState(!1),[y,M]=o.useState(-1),[w,$]=o.useState("seeds"),[j,k]=o.useState("desc"),[be,me]=o.useState(!1),B=o.useRef(!1),Y=o.useRef(null),m=o.useRef(0),Se=Ne("(max-width:930px)"),ye=Ce(r),C=X&&D.length>0,L=xe,T=C||L,we=C;o.useEffect(()=>{const e=new AbortController;return f.post(Re(),{action:"get"},{signal:e.signal}).then(({data:n})=>{if(n){const l=n.TorznabUrls||[],a=!!n.EnableTorznabSearch,c=!!n.EnableRutorSearch;pe(l),ge(a),fe(c),a&&l.length>0?M(-1):c&&M("rutor")}}).catch(n=>{!f.isCancel(n)&&(n==null||n.code)}).finally(()=>{e.signal.aborted||me(!0)}),()=>e.abort()},[]),o.useEffect(()=>()=>{var e;(e=Y.current)==null||e.abort()},[]);const Z=async()=>{var l;if(!i||!T)return;const{ac:e,gen:n}=Ve(Y,m);q(!0),ue(!0),g([]);try{if(y===-1){const E=[];if(C&&E.push(f.get(ne(),{params:{query:i},signal:e.signal}).then(({data:x})=>x||[])),L&&E.push(f.get(re(),{params:{query:i},signal:e.signal}).then(({data:x})=>x||[])),E.length===0){A(n,m.current,e.signal)&&S(s("Torznab.NoSearchSources"));return}const je=await Promise.allSettled(E);if(!A(n,m.current,e.signal))return;const N=[];let P;for(const x of je)x.status==="fulfilled"?N.push(x.value):!P&&!f.isCancel(x.reason)&&((l=x.reason)==null?void 0:l.code)!=="ERR_CANCELED"&&(P=x.reason);if(N.length===0)throw P||new Error(s("Torznab.SearchFailed"));const se=lt(...N);g(se),!B.current&&se.length>0&&($("seeds"),k("desc"));return}let a=ne();const c={query:i};y==="rutor"?a=re():typeof y=="number"&&(c.index=y);const{data:z}=await f.get(a,{params:c,signal:e.signal});if(!A(n,m.current,e.signal))return;const p=z||[];g(p),!B.current&&p.length>0&&($("seeds"),k("desc"))}catch(a){if(f.isCancel(a)||de(a)&&a.code==="ERR_CANCELED"||!A(n,m.current,e.signal))return;S(ct(a,s("Torznab.SearchFailed")))}finally{n===m.current&&q(!1)}},Te=e=>{e.key==="Enter"&&Z()},F=async e=>{const n=_(e)||e.Title||"item";Q(!0),U(n);try{const l=e.Magnet||e.Link;if(!l){S(s("Torznab.NoLinkFound"));return}let a=e.Poster;if(!a&&e.Title){const c=Be(e.Title);if(c){const z=await Le(c,"en"),[p]=z||[];p&&(a=p)}}await f.post(Fe(),{action:"add",link:l,title:e.Title,save_to_db:!0,poster:a||""}),V(s("Torznab.TorrentAddedSuccessfully"))}catch{S(s("Torznab.FailedToAddTorrent"))}finally{Q(!1),U(null)}},R=(e,n)=>{n!=="clickaway"&&(V(""),S(""))},ze=e=>{if(B.current=!0,w===e){k(n=>n==="asc"?"desc":"asc");return}$(e),k("desc")},ee=o.useMemo(()=>u.length===0?u:[...u].sort((n,l)=>{let a,c;switch(w){case"size":a=H(n.Size||"0"),c=H(l.Size||"0");break;case"seeds":a=n.Seed||0,c=l.Seed||0;break;case"peers":a=n.Peer||0,c=l.Peer||0;break;default:return 0}return a===c?0:j==="asc"?a<c?-1:1:a>c?-1:1}),[u,w,j]),te=be?T?b?null:O&&u.length===0?s("Torznab.NoResultsFound"):null:X&&D.length===0?s("Torznab.NoIndexersConfigured"):s("Torznab.NoSearchSources"):null,ve=[{field:"size",label:s("Torznab.SortBySize")},{field:"seeds",label:s("Torznab.SortBySeeds")},{field:"peers",label:s("Torznab.SortByPeers")}];return t.jsxs(Ee,{open:!0,onClose:r,fullScreen:Se,fullWidth:!0,maxWidth:"md",ref:ye,children:[t.jsx(Ae,{children:s("Torznab.SearchTorrents")}),t.jsx(Je,{children:t.jsxs(Xe,{children:[t.jsxs(Ye,{children:[t.jsxs(Pe,{variant:"outlined",size:"small",className:"search-tracker",disabled:!T,children:[t.jsx(He,{children:s("Tracker")}),t.jsxs(Ie,{value:y,onChange:e=>M(e.target.value),label:s("Tracker"),children:[we&&t.jsx(I,{value:-1,children:s("AllTrackers")}),L&&t.jsx(I,{value:"rutor",children:s("Rutor")}),C&&D.map((e,n)=>t.jsx(I,{value:n,children:e.Name||e.Host},`${e.Host}-${e.Key}`))]})]}),t.jsx(Ke,{className:"search-query",label:s("Torznab.SearchQuery"),value:i,onChange:e=>h(e.target.value),onKeyDown:Te,variant:"outlined",size:"small",fullWidth:!0,placeholder:s("Torznab.SearchMoviesShows"),autoFocus:!0,disabled:!T}),t.jsx(ae,{className:"search-submit",variant:"contained",color:"primary",onClick:Z,disabled:b||!T||!i,startIcon:De(b),children:s("Search")})]}),O&&u.length>0&&t.jsxs(Ze,{children:[t.jsx(et,{children:s("Torznab.ResultsCount",{count:u.length})}),t.jsx(_e,{exclusive:!0,size:"small",value:w,onChange:(e,n)=>{n&&ze(n)},"aria-label":s("Torznab.SortBy"),sx:{flexWrap:"wrap",gap:.5},children:ve.map(({field:e,label:n})=>{const l=w===e;return t.jsxs(We,{value:e,selected:l,title:s(l?j==="asc"?"Torznab.SortAscending":"Torznab.SortDescending":"Torznab.SortBy"),sx:{textTransform:"none",px:1.25,height:28,borderRadius:"14px !important",border:a=>`1px solid ${a.palette.divider} !important`,"&.Mui-selected":{fontWeight:600}},children:[n,l&&(j==="asc"?t.jsx(qe,{sx:{ml:.5,fontSize:14}}):t.jsx(Oe,{sx:{ml:.5,fontSize:14}}))]},e)})})]}),t.jsxs(tt,{children:[b&&t.jsx(ce,{children:t.jsx(oe,{color:"secondary",size:32})}),!b&&te&&t.jsx(ce,{children:t.jsx(Qe,{variant:"body2",color:"text.secondary",children:te})}),!b&&ee.length>0&&t.jsx(st,{children:ee.map((e,n)=>{const l=H(e.Size||"0"),a=Me(l),c=_(e)||`${e.Title||"item"}-${n}`,z=v&&he===c;return t.jsxs(nt,{role:"button",tabIndex:0,onClick:()=>!v&&F(e),onKeyDown:p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),v||F(e))},children:[t.jsxs(rt,{children:[t.jsx(at,{children:e.Title}),t.jsxs(ot,{children:[t.jsx(K,{$tone:"neutral",children:a}),t.jsxs(K,{$tone:"seeds",children:["S ",e.Seed||0]}),t.jsxs(K,{$tone:"peers",children:["P ",e.Peer||0]})]})]}),t.jsx(it,{children:t.jsx(Ue,{edge:"end","aria-label":"add",onClick:p=>{p.stopPropagation(),F(e)},disabled:v,size:"small",sx:{minWidth:40,minHeight:40},children:z?t.jsx(oe,{size:18,color:"secondary"}):t.jsx(Ge,{color:"secondary"})})})]},c)})})]})]})}),t.jsx(ie,{open:!!G,autoHideDuration:1500,onClose:R,children:t.jsx(le,{onClose:R,severity:"success",variant:"filled",sx:{width:"100%"},children:G})}),t.jsx(ie,{open:!!J,autoHideDuration:1500,onClose:R,children:t.jsx(le,{onClose:R,severity:"error",variant:"filled",sx:{width:"100%"},children:J})}),t.jsx($e,{children:t.jsx(ae,{onClick:r,color:"secondary",variant:"outlined",children:s("Close")})})]})}export{xt as default};
