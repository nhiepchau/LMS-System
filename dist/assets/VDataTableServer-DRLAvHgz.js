import{r as X,m as Y,s as Z,c as $,d as ee,t as ae,e as te,u as oe,p as re,g as le,v as se,i as de,j as ue,k as ne,l as ie,w as f,V,n as x}from"./VDataTable-BRXGBBmZ.js";import{R as ce,T as me,u as m,ae as o,aV as ge,ah as ve,U as pe,b as r,F as be,v as g}from"./index-Cc2wFGp6.js";import{V as w}from"./VTable-DFDSBb63.js";const Pe=ce({itemsLength:{type:[Number,String],required:!0},...X(),...Y(),...Z()},"VDataTableServer"),he=me()({name:"VDataTableServer",props:Pe(),emits:{"update:modelValue":e=>!0,"update:page":e=>!0,"update:itemsPerPage":e=>!0,"update:sortBy":e=>!0,"update:options":e=>!0,"update:expanded":e=>!0,"update:groupBy":e=>!0},setup(e,B){let{attrs:I,slots:a}=B;const{groupBy:d}=$(e),{sortBy:l,multiSort:R,mustSort:k}=ee(e),{page:u,itemsPerPage:i}=ae(e),F=m(()=>parseInt(e.itemsLength,10)),{columns:v,headers:G}=te(e,{groupBy:d,showSelect:o(e,"showSelect"),showExpand:o(e,"showExpand")}),{items:n}=oe(e,v),{toggleSort:p}=re({sortBy:l,multiSort:R,mustSort:k,page:u}),{opened:E,isGroupOpen:H,toggleGroup:N,extractRows:_}=le({groupBy:d,sortBy:l}),{pageCount:C,setItemsPerPage:L}=se({page:u,itemsPerPage:i,itemsLength:F}),{flatItems:b}=de(n,d,E),{isSelected:O,select:j,selectAll:q,toggleSelect:A,someSelected:U,allSelected:W}=ue(e,{allItems:n,currentPage:n}),{isExpanded:z,toggleExpand:J}=ne(e),P=m(()=>_(n.value));ie({page:u,itemsPerPage:i,sortBy:l,groupBy:d,search:o(e,"search")}),ge("v-data-table",{toggleSort:p,sortBy:l}),ve({VDataTableRows:{hideNoData:o(e,"hideNoData"),noDataText:o(e,"noDataText"),loading:o(e,"loading"),loadingText:o(e,"loadingText")}});const t=m(()=>({page:u.value,itemsPerPage:i.value,sortBy:l.value,pageCount:C.value,toggleSort:p,setItemsPerPage:L,someSelected:U.value,allSelected:W.value,isSelected:O,select:j,selectAll:q,toggleSelect:A,isExpanded:z,toggleExpand:J,isGroupOpen:H,toggleGroup:N,items:P.value.map(c=>c.raw),internalItems:P.value,groupedItems:b.value,columns:v.value,headers:G.value}));pe(()=>{const c=f.filterProps(e),K=V.filterProps(e),M=x.filterProps(e),Q=w.filterProps(e);return r(w,g({class:["v-data-table",{"v-data-table--loading":e.loading},e.class],style:e.style},Q),{top:()=>{var s;return(s=a.top)==null?void 0:s.call(a,t.value)},default:()=>{var s,T,y,S,h,D;return a.default?a.default(t.value):r(be,null,[(s=a.colgroup)==null?void 0:s.call(a,t.value),r("thead",{class:"v-data-table__thead",role:"rowgroup"},[r(V,g(K,{sticky:e.fixedHeader}),a)]),(T=a.thead)==null?void 0:T.call(a,t.value),r("tbody",{class:"v-data-table__tbody",role:"rowgroup"},[(y=a["body.prepend"])==null?void 0:y.call(a,t.value),a.body?a.body(t.value):r(x,g(I,M,{items:b.value}),a),(S=a["body.append"])==null?void 0:S.call(a,t.value)]),(h=a.tbody)==null?void 0:h.call(a,t.value),(D=a.tfoot)==null?void 0:D.call(a,t.value)])},bottom:()=>a.bottom?a.bottom(t.value):r(f,c,{prepend:a["footer.prepend"]})})})}});export{he as V};
