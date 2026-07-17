import{u as ke,a as i,d as f,j as t,m as de}from"./vendor-B9KbAPe3.js";import{f as D,g as d,u as Ce,s as Re,p as K,S as Ee,a as Ae,b as De,D as $e,t as re,c as ae,d as Me,e as Fe,h as Le}from"./index-Bm2ODQm6.js";import{f as Be,ax as Ne,aa as Pe,ab as He,o as I,a7 as Ke,g as oe,i as _,ay as Ie,az as _e,T as qe,I as Oe,aA as Qe,Z as ie,A as le}from"./mui-DbBBotEM.js";import"./hls-CWTT-7hy.js";function Ue(n,s){var u;(u=n.current)==null||u.abort();const o=new AbortController;n.current=o;const h=++s.current;return{ac:o,gen:h}}function A(n,s,o){return n===s&&!o.aborted}const We=d.div`
  ${({theme:{settingsDialog:{contentBG:n}}})=>D`
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
`,Ve=d.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 16px 20px 0;

  @media (max-width: 600px) {
    padding: 12px 12px 0;
  }
`,Ge=d.div`
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
`,Ze=d.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  flex-shrink: 0;
  margin-bottom: 8px;
  padding: 4px 0;
`,Je=d.div`
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  opacity: 0.75;
  white-space: nowrap;
`,Xe=d.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`,Ye=d.button`
  ${({$active:n,theme:{app:{paperColor:s},addDialog:{separatorColor:o}}})=>D`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 28px;
    padding: 0 10px;
    border-radius: 14px;
    border: 1px solid ${o};
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
`,et=d.div`
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
`,tt=d.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,st=d.li`
  ${({theme:{app:{paperColor:n},addDialog:{separatorColor:s}}})=>D`
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
`,nt=d.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,rt=d.div`
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
`,at=d.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`,q=d.span`
  ${({$tone:n="neutral",theme:{addDialog:{separatorColor:s}}})=>{const o={neutral:{bg:s},seeds:{bg:"rgba(0, 167, 114, 0.22)"},peers:{bg:s}},{bg:h}=o[n];return D`
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
`,ot=d.div`
  display: flex;
  align-items: center;
  justify-content: center;
`,O=n=>(n.Hash||n.Magnet||n.Link||n.Title||"").toLowerCase(),it=(...n)=>{const s=new Set,o=[];for(const h of n)for(const u of h||[]){const g=O(u);if(g){if(s.has(g))continue;s.add(g)}o.push(u)}return o},lt=(n,s)=>{var o;if(de(n)){const h=(o=n.response)==null?void 0:o.data;if(h!=null&&h.error)return String(h.error);if(n.message)return n.message}return n instanceof Error&&n.message?n.message:s};function pt({handleClose:n}){const{t:s}=ke(),[o,h]=i.useState(""),[u,g]=i.useState([]),[b,Q]=i.useState(!1),[U,ue]=i.useState(!1),[z,W]=i.useState(!1),[he,V]=i.useState(null),[G,Z]=i.useState(""),[J,S]=i.useState(""),[$,pe]=i.useState([]),[xe,fe]=i.useState(!1),[X,ge]=i.useState(!1),[y,M]=i.useState(-1),[j,F]=i.useState("seeds"),[v,k]=i.useState("desc"),[be,me]=i.useState(!1),L=i.useRef(!1),Y=i.useRef(null),m=i.useRef(0),Se=Be("(max-width:930px)"),ye=Ce(n),C=X&&$.length>0,B=xe,w=C||B,we=C;i.useEffect(()=>{const e=new AbortController;return f.post(Re(),{action:"get"},{signal:e.signal}).then(({data:r})=>{if(r){const l=r.TorznabUrls||[],a=!!r.EnableTorznabSearch,c=!!r.EnableRutorSearch;pe(l),ge(a),fe(c),a&&l.length>0?M(-1):c&&M("rutor")}}).catch(r=>{!f.isCancel(r)&&(r==null||r.code)}).finally(()=>{e.signal.aborted||me(!0)}),()=>e.abort()},[]),i.useEffect(()=>()=>{var e;(e=Y.current)==null||e.abort()},[]);const ee=async()=>{var l;if(!o||!w)return;const{ac:e,gen:r}=Ue(Y,m);Q(!0),ue(!0),g([]);try{if(y===-1){const E=[];if(C&&E.push(f.get(re(),{params:{query:o},signal:e.signal}).then(({data:x})=>x||[])),B&&E.push(f.get(ae(),{params:{query:o},signal:e.signal}).then(({data:x})=>x||[])),E.length===0){A(r,m.current,e.signal)&&S(s("Torznab.NoSearchSources"));return}const ve=await Promise.allSettled(E);if(!A(r,m.current,e.signal))return;const P=[];let H;for(const x of ve)x.status==="fulfilled"?P.push(x.value):!H&&!f.isCancel(x.reason)&&((l=x.reason)==null?void 0:l.code)!=="ERR_CANCELED"&&(H=x.reason);if(P.length===0)throw H||new Error(s("Torznab.SearchFailed"));const ne=it(...P);g(ne),!L.current&&ne.length>0&&(F("seeds"),k("desc"));return}let a=re();const c={query:o};y==="rutor"?a=ae():typeof y=="number"&&(c.index=y);const{data:T}=await f.get(a,{params:c,signal:e.signal});if(!A(r,m.current,e.signal))return;const p=T||[];g(p),!L.current&&p.length>0&&(F("seeds"),k("desc"))}catch(a){if(f.isCancel(a)||de(a)&&a.code==="ERR_CANCELED"||!A(r,m.current,e.signal))return;S(lt(a,s("Torznab.SearchFailed")))}finally{r===m.current&&Q(!1)}},Te=e=>{e.key==="Enter"&&ee()},N=async e=>{const r=O(e)||e.Title||"item";W(!0),V(r);try{const l=e.Magnet||e.Link;if(!l){S(s("Torznab.NoLinkFound"));return}let a=e.Poster;if(!a&&e.Title){const c=Me(e.Title);if(c){const T=await Fe(c,"en"),[p]=T||[];p&&(a=p)}}await f.post(Le(),{action:"add",link:l,title:e.Title,save_to_db:!0,poster:a||""}),Z(s("Torznab.TorrentAddedSuccessfully"))}catch{S(s("Torznab.FailedToAddTorrent"))}finally{W(!1),V(null)}},R=(e,r)=>{r!=="clickaway"&&(Z(""),S(""))},ze=e=>{if(L.current=!0,j===e){k(r=>r==="asc"?"desc":"asc");return}F(e),k("desc")},te=i.useMemo(()=>u.length===0?u:[...u].sort((r,l)=>{let a,c;switch(j){case"size":a=K(r.Size||"0"),c=K(l.Size||"0");break;case"seeds":a=r.Seed||0,c=l.Seed||0;break;case"peers":a=r.Peer||0,c=l.Peer||0;break;default:return 0}return a===c?0:v==="asc"?a<c?-1:1:a>c?-1:1}),[u,j,v]),se=be?w?b?null:U&&u.length===0?s("Torznab.NoResultsFound"):null:X&&$.length===0?s("Torznab.NoIndexersConfigured"):s("Torznab.NoSearchSources"):null,je=[{field:"size",label:s("Torznab.SortBySize")},{field:"seeds",label:s("Torznab.SortBySeeds")},{field:"peers",label:s("Torznab.SortByPeers")}];return t.jsxs(Ee,{open:!0,onClose:n,fullScreen:Se,fullWidth:!0,maxWidth:"md",ref:ye,children:[t.jsx(Ae,{children:s("Torznab.SearchTorrents")}),t.jsx(We,{children:t.jsxs(Ve,{children:[t.jsxs(Ge,{children:[t.jsxs(Ne,{variant:"outlined",size:"small",className:"search-tracker",disabled:!w,children:[t.jsx(Pe,{children:s("Tracker")}),t.jsxs(He,{value:y,onChange:e=>M(e.target.value),label:s("Tracker"),children:[we&&t.jsx(I,{value:-1,children:s("AllTrackers")}),B&&t.jsx(I,{value:"rutor",children:s("Rutor")}),C&&$.map((e,r)=>t.jsx(I,{value:r,children:e.Name||e.Host},`${e.Host}-${e.Key}`))]})]}),t.jsx(Ke,{className:"search-query",label:s("Torznab.SearchQuery"),value:o,onChange:e=>h(e.target.value),onKeyDown:Te,variant:"outlined",size:"small",fullWidth:!0,placeholder:s("Torznab.SearchMoviesShows"),autoFocus:!0,disabled:!w}),t.jsx(oe,{className:"search-submit",variant:"contained",color:"primary",onClick:ee,disabled:b||!w||!o,children:b?t.jsx(_,{size:22,color:"inherit"}):s("Search")})]}),U&&u.length>0&&t.jsxs(Ze,{children:[t.jsx(Je,{children:s("Torznab.ResultsCount",{count:u.length})}),t.jsx(Xe,{children:je.map(({field:e,label:r})=>{const l=j===e;return t.jsxs(Ye,{type:"button",$active:l,onClick:()=>ze(e),title:s(l?v==="asc"?"Torznab.SortAscending":"Torznab.SortDescending":"Torznab.SortBy"),children:[r,l&&(v==="asc"?t.jsx(Ie,{}):t.jsx(_e,{}))]},e)})})]}),t.jsxs(et,{children:[b&&t.jsx(ce,{children:t.jsx(_,{color:"secondary",size:32})}),!b&&se&&t.jsx(ce,{children:t.jsx(qe,{variant:"body2",color:"text.secondary",children:se})}),!b&&te.length>0&&t.jsx(tt,{children:te.map((e,r)=>{const l=K(e.Size||"0"),a=De(l),c=O(e)||`${e.Title||"item"}-${r}`,T=z&&he===c;return t.jsxs(st,{role:"button",tabIndex:0,onClick:()=>!z&&N(e),onKeyDown:p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),z||N(e))},children:[t.jsxs(nt,{children:[t.jsx(rt,{children:e.Title}),t.jsxs(at,{children:[t.jsx(q,{$tone:"neutral",children:a}),t.jsxs(q,{$tone:"seeds",children:["S ",e.Seed||0]}),t.jsxs(q,{$tone:"peers",children:["P ",e.Peer||0]})]})]}),t.jsx(ot,{children:t.jsx(Oe,{edge:"end","aria-label":"add",onClick:p=>{p.stopPropagation(),N(e)},disabled:z,size:"small",sx:{minWidth:40,minHeight:40},children:T?t.jsx(_,{size:18,color:"secondary"}):t.jsx(Qe,{color:"secondary"})})})]},c)})})]})]})}),t.jsx(ie,{open:!!G,autoHideDuration:1500,onClose:R,children:t.jsx(le,{onClose:R,severity:"success",variant:"filled",sx:{width:"100%"},children:G})}),t.jsx(ie,{open:!!J,autoHideDuration:1500,onClose:R,children:t.jsx(le,{onClose:R,severity:"error",variant:"filled",sx:{width:"100%"},children:J})}),t.jsx($e,{children:t.jsx(oe,{onClick:n,color:"secondary",variant:"outlined",children:s("Close")})})]})}export{pt as default};
