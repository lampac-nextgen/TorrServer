import{u as ke,a as o,d as f,j as t,m as ce}from"./vendor-B9KbAPe3.js";import{f as de,g as u,u as Ce,s as Re,p as H,S as Ee,a as Ae,b as De,c as Me,D as Be,t as se,d as ne,e as Le,h as Fe,i as $e}from"./index-DqMjsvCS.js";import{f as Ne,aB as Pe,ae as He,af as Ie,o as I,ab as Ke,g as re,a7 as _e,a8 as We,aC as qe,aD as Oe,i as ae,T as Qe,J as K,I as Ue,aE as Ge,a0 as oe,A as ie}from"./mui-CPnJ2Xhg.js";import"./hls-CWTT-7hy.js";function Ve(r,s){var d;(d=r.current)==null||d.abort();const c=new AbortController;r.current=c;const x=++s.current;return{ac:c,gen:x}}function A(r,s,c){return r===s&&!c.aborted}const Je=u.div`
  ${({theme:{settingsDialog:{contentBG:r}}})=>de`
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
`,Xe=u.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 16px 20px 0;

  @media (max-width: 600px) {
    padding: 12px 12px 0;
  }
`,Ye=u.div`
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
`,Ze=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  flex-shrink: 0;
  margin-bottom: 8px;
  padding: 4px 0;
`,et=u.div`
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  opacity: 0.75;
  white-space: nowrap;
`,tt=u.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  margin: 0 -4px;
  padding: 0 4px 12px;
`,le=u.div`
  display: grid;
  place-items: center;
  min-height: 160px;
  padding: 24px 12px;
  text-align: center;
  opacity: 0.7;
`,st=u.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,nt=u.li`
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
`,rt=u.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,at=u.div`
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
`,ot=u.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`,it=u.div`
  display: flex;
  align-items: center;
  justify-content: center;
`,_=r=>(r.Hash||r.Magnet||r.Link||r.Title||"").toLowerCase(),lt=(...r)=>{const s=new Set,c=[];for(const x of r)for(const d of x||[]){const g=_(d);if(g){if(s.has(g))continue;s.add(g)}c.push(d)}return c},ct=(r,s)=>{var c;if(ce(r)){const x=(c=r.response)==null?void 0:c.data;if(x!=null&&x.error)return String(x.error);if(r.message)return r.message}return r instanceof Error&&r.message?r.message:s};function pt({handleClose:r}){const{t:s}=ke(),[c,x]=o.useState(""),[d,g]=o.useState([]),[b,W]=o.useState(!1),[q,ue]=o.useState(!1),[v,O]=o.useState(!1),[he,Q]=o.useState(null),[U,G]=o.useState(""),[V,S]=o.useState(""),[D,xe]=o.useState([]),[pe,fe]=o.useState(!1),[J,ge]=o.useState(!1),[y,M]=o.useState(-1),[w,B]=o.useState("seeds"),[j,k]=o.useState("desc"),[be,me]=o.useState(!1),L=o.useRef(!1),X=o.useRef(null),m=o.useRef(0),Se=Ne("(max-width:930px)"),ye=Ce(r),C=J&&D.length>0,F=pe,T=C||F,we=C;o.useEffect(()=>{const e=new AbortController;return f.post(Re(),{action:"get"},{signal:e.signal}).then(({data:n})=>{if(n){const i=n.TorznabUrls||[],a=!!n.EnableTorznabSearch,l=!!n.EnableRutorSearch;xe(i),ge(a),fe(l),a&&i.length>0?M(-1):l&&M("rutor")}}).catch(n=>{!f.isCancel(n)&&(n==null||n.code)}).finally(()=>{e.signal.aborted||me(!0)}),()=>e.abort()},[]),o.useEffect(()=>()=>{var e;(e=X.current)==null||e.abort()},[]);const Y=async()=>{var i;if(!c||!T)return;const{ac:e,gen:n}=Ve(X,m);W(!0),ue(!0),g([]);try{if(y===-1){const E=[];if(C&&E.push(f.get(se(),{params:{query:c},signal:e.signal}).then(({data:p})=>p||[])),F&&E.push(f.get(ne(),{params:{query:c},signal:e.signal}).then(({data:p})=>p||[])),E.length===0){A(n,m.current,e.signal)&&S(s("Torznab.NoSearchSources"));return}const je=await Promise.allSettled(E);if(!A(n,m.current,e.signal))return;const N=[];let P;for(const p of je)p.status==="fulfilled"?N.push(p.value):!P&&!f.isCancel(p.reason)&&((i=p.reason)==null?void 0:i.code)!=="ERR_CANCELED"&&(P=p.reason);if(N.length===0)throw P||new Error(s("Torznab.SearchFailed"));const te=lt(...N);g(te),!L.current&&te.length>0&&(B("seeds"),k("desc"));return}let a=se();const l={query:c};y==="rutor"?a=ne():typeof y=="number"&&(l.index=y);const{data:z}=await f.get(a,{params:l,signal:e.signal});if(!A(n,m.current,e.signal))return;const h=z||[];g(h),!L.current&&h.length>0&&(B("seeds"),k("desc"))}catch(a){if(f.isCancel(a)||ce(a)&&a.code==="ERR_CANCELED"||!A(n,m.current,e.signal))return;S(ct(a,s("Torznab.SearchFailed")))}finally{n===m.current&&W(!1)}},Te=e=>{e.key==="Enter"&&Y()},$=async e=>{const n=_(e)||e.Title||"item";O(!0),Q(n);try{const i=e.Magnet||e.Link;if(!i){S(s("Torznab.NoLinkFound"));return}let a=e.Poster;if(!a&&e.Title){const l=Le(e.Title);if(l){const z=await Fe(l,"en"),[h]=z||[];h&&(a=h)}}await f.post($e(),{action:"add",link:i,title:e.Title,save_to_db:!0,poster:a||""}),G(s("Torznab.TorrentAddedSuccessfully"))}catch{S(s("Torznab.FailedToAddTorrent"))}finally{O(!1),Q(null)}},R=(e,n)=>{n!=="clickaway"&&(G(""),S(""))},ze=e=>{if(L.current=!0,w===e){k(n=>n==="asc"?"desc":"asc");return}B(e),k("desc")},Z=o.useMemo(()=>d.length===0?d:[...d].sort((n,i)=>{let a,l;switch(w){case"size":a=H(n.Size||"0"),l=H(i.Size||"0");break;case"seeds":a=n.Seed||0,l=i.Seed||0;break;case"peers":a=n.Peer||0,l=i.Peer||0;break;default:return 0}return a===l?0:j==="asc"?a<l?-1:1:a>l?-1:1}),[d,w,j]),ee=be?T?b?null:q&&d.length===0?s("Torznab.NoResultsFound"):null:J&&D.length===0?s("Torznab.NoIndexersConfigured"):s("Torznab.NoSearchSources"):null,ve=[{field:"size",label:s("Torznab.SortBySize")},{field:"seeds",label:s("Torznab.SortBySeeds")},{field:"peers",label:s("Torznab.SortByPeers")}];return t.jsxs(Ee,{open:!0,onClose:r,fullScreen:Se,fullWidth:!0,maxWidth:"md",ref:ye,children:[t.jsx(Ae,{children:s("Torznab.SearchTorrents")}),t.jsx(Je,{children:t.jsxs(Xe,{children:[t.jsxs(Ye,{children:[t.jsxs(Pe,{variant:"outlined",size:"small",className:"search-tracker",disabled:!T,children:[t.jsx(He,{children:s("Tracker")}),t.jsxs(Ie,{value:y,onChange:e=>M(e.target.value),label:s("Tracker"),children:[we&&t.jsx(I,{value:-1,children:s("AllTrackers")}),F&&t.jsx(I,{value:"rutor",children:s("Rutor")}),C&&D.map((e,n)=>t.jsx(I,{value:n,children:e.Name||e.Host},`${e.Host}-${e.Key}`))]})]}),t.jsx(Ke,{className:"search-query",label:s("Torznab.SearchQuery"),value:c,onChange:e=>x(e.target.value),onKeyDown:Te,variant:"outlined",size:"small",fullWidth:!0,placeholder:s("Torznab.SearchMoviesShows"),autoFocus:!0,disabled:!T}),t.jsx(re,{className:"search-submit",variant:"contained",color:"primary",onClick:Y,disabled:b||!T||!c,startIcon:De(b),children:s("Search")})]}),q&&d.length>0&&t.jsxs(Ze,{children:[t.jsx(et,{children:s("Torznab.ResultsCount",{count:d.length})}),t.jsx(_e,{exclusive:!0,size:"small",value:w,onChange:(e,n)=>{n&&ze(n)},"aria-label":s("Torznab.SortBy"),sx:{flexWrap:"wrap",gap:.5},children:ve.map(({field:e,label:n})=>{const i=w===e;return t.jsxs(We,{value:e,selected:i,title:s(i?j==="asc"?"Torznab.SortAscending":"Torznab.SortDescending":"Torznab.SortBy"),sx:{textTransform:"none",px:1.25,height:28,borderRadius:"14px !important",border:a=>`1px solid ${a.palette.divider} !important`,"&.Mui-selected":{fontWeight:600}},children:[n,i&&(j==="asc"?t.jsx(qe,{sx:{ml:.5,fontSize:14}}):t.jsx(Oe,{sx:{ml:.5,fontSize:14}}))]},e)})})]}),t.jsxs(tt,{children:[b&&t.jsx(le,{children:t.jsx(ae,{color:"secondary",size:32})}),!b&&ee&&t.jsx(le,{children:t.jsx(Qe,{variant:"body2",color:"text.secondary",children:ee})}),!b&&Z.length>0&&t.jsx(st,{children:Z.map((e,n)=>{const i=H(e.Size||"0"),a=Me(i),l=_(e)||`${e.Title||"item"}-${n}`,z=v&&he===l;return t.jsxs(nt,{role:"button",tabIndex:0,onClick:()=>!v&&$(e),onKeyDown:h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),v||$(e))},children:[t.jsxs(rt,{children:[t.jsx(at,{children:e.Title}),t.jsxs(ot,{children:[t.jsx(K,{size:"small",label:a,variant:"outlined"}),t.jsx(K,{size:"small",label:`S ${e.Seed||0}`,color:"success",variant:"outlined",sx:{bgcolor:"rgba(0, 167, 114, 0.12)"}}),t.jsx(K,{size:"small",label:`P ${e.Peer||0}`,variant:"outlined"})]})]}),t.jsx(it,{children:t.jsx(Ue,{edge:"end","aria-label":"add",onClick:h=>{h.stopPropagation(),$(e)},disabled:v,size:"small",sx:{minWidth:40,minHeight:40},children:z?t.jsx(ae,{size:18,color:"secondary"}):t.jsx(Ge,{color:"secondary"})})})]},l)})})]})]})}),t.jsx(oe,{open:!!U,autoHideDuration:1500,onClose:R,children:t.jsx(ie,{onClose:R,severity:"success",variant:"filled",sx:{width:"100%"},children:U})}),t.jsx(oe,{open:!!V,autoHideDuration:1500,onClose:R,children:t.jsx(ie,{onClose:R,severity:"error",variant:"filled",sx:{width:"100%"},children:V})}),t.jsx(Be,{children:t.jsx(re,{onClick:r,color:"secondary",variant:"outlined",children:s("Close")})})]})}export{pt as default};
