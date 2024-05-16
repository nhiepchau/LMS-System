import{_ as ce}from"./FileInput.vue_vue_type_script_setup_true_lang-BgTwTLOk.js";import{M as me,O as pe,X as I,ab as S,aD as fe,ae as ge,P as be,b as t,F as X,G as k,d as K,b4 as Q,J as ve,r as h,ai as _e,a as C,f as ye,w as f,m as he,k as _,i as H,g as D,l as Se,q as L,t as Y,u as $,c as B,L as xe,y as Pe,z as we,A as F,B as Ve,o as ke,s as Ce,H as De}from"./index-C1svi_0i.js";import{a as Te,h as O}from"./http-nrUfQssp.js";import{r as Ie,m as $e,s as Be,c as Fe,b as Ne,t as Ge,d as Re,e as Ue,p as qe,f as Ee,v as ze,h as Ae,i as He,j as Le,k as Oe,w as j,l as M,n as J,V as W,u as je}from"./course-BudutSGk.js";import{V as Me}from"./VDialog-Cono6XTE.js";const Je=me({itemsLength:{type:[Number,String],required:!0},...Ie(),...$e(),...Be()},"VDataTableServer"),We=pe()({name:"VDataTableServer",props:Je(),emits:{"update:modelValue":a=>!0,"update:page":a=>!0,"update:itemsPerPage":a=>!0,"update:sortBy":a=>!0,"update:options":a=>!0,"update:expanded":a=>!0,"update:groupBy":a=>!0},setup(a,w){let{attrs:g,slots:e}=w;const{groupBy:o}=Fe(a),{sortBy:n,multiSort:r,mustSort:u}=Ne(a),{page:b,itemsPerPage:y}=Ge(a),x=I(()=>parseInt(a.itemsLength,10)),{columns:d,headers:c}=Re(a,{groupBy:o,showSelect:S(a,"showSelect"),showExpand:S(a,"showExpand")}),{items:i}=Ue(a,d),{toggleSort:l}=qe({sortBy:n,multiSort:r,mustSort:u,page:b}),{opened:s,isGroupOpen:P,toggleGroup:m,extractRows:v}=Ee({groupBy:o,sortBy:n}),{pageCount:N,setItemsPerPage:Z}=ze({page:b,itemsPerPage:y,itemsLength:x}),{flatItems:G}=Ae(i,o,s),{isSelected:ee,select:ae,selectAll:te,toggleSelect:se,someSelected:oe,allSelected:le}=He(a,{allItems:i,currentPage:i}),{isExpanded:ne,toggleExpand:ie}=Le(a),R=I(()=>v(i.value));Oe({page:b,itemsPerPage:y,sortBy:n,groupBy:o,search:S(a,"search")}),fe("v-data-table",{toggleSort:l,sortBy:n}),ge({VDataTableRows:{hideNoData:S(a,"hideNoData"),noDataText:S(a,"noDataText"),loading:S(a,"loading"),loadingText:S(a,"loadingText")}});const p=I(()=>({page:b.value,itemsPerPage:y.value,sortBy:n.value,pageCount:N.value,toggleSort:l,setItemsPerPage:Z,someSelected:oe.value,allSelected:le.value,isSelected:ee,select:ae,selectAll:te,toggleSelect:se,isExpanded:ne,toggleExpand:ie,isGroupOpen:P,toggleGroup:m,items:R.value.map(T=>T.raw),internalItems:R.value,groupedItems:G.value,columns:d.value,headers:c.value}));be(()=>{const T=j.filterProps(a),re=M.filterProps(a),ue=J.filterProps(a),de=W.filterProps(a);return t(W,k({class:["v-data-table",{"v-data-table--loading":a.loading},a.class],style:a.style},de),{top:()=>{var V;return(V=e.top)==null?void 0:V.call(e,p.value)},default:()=>{var V,U,q,E,z,A;return e.default?e.default(p.value):t(X,null,[(V=e.colgroup)==null?void 0:V.call(e,p.value),t("thead",{class:"v-data-table__thead",role:"rowgroup"},[t(M,k(re,{sticky:a.fixedHeader}),e)]),(U=e.thead)==null?void 0:U.call(e,p.value),t("tbody",{class:"v-data-table__tbody",role:"rowgroup"},[(q=e["body.prepend"])==null?void 0:q.call(e,p.value),e.body?e.body(p.value):t(J,k(g,ue,{items:G.value}),e),(E=e["body.append"])==null?void 0:E.call(e,p.value)]),(z=e.tbody)==null?void 0:z.call(e,p.value),(A=e.tfoot)==null?void 0:A.call(e,p.value)])},bottom:()=>e.bottom?e.bottom(p.value):t(j,T,{prepend:e["footer.prepend"]})})})}}),Xe={class:"d-flex flex-row text-primary mb-2"},Ke=_("h2",{class:"my-auto"},"Import new file",-1),Qe={class:"mt-4"},Ye={class:"border-sm rounded pa-4 my-4 mx-auto",style:{height:"250px"}},Ze={class:"d-flex flex-row text-primary"},ea=_("h3",null,"Submission file",-1),aa={key:0,class:"mt-15"},ta={key:1,class:"text-center mt-10"},sa=K({__name:"UploadSubmission",props:{classId:{type:Number,required:!0}},emits:["openSubmissionCard"],setup(a,{emit:w}){const g=w,e=a,o=Q(),n=ve(),r=h(),u=h(!1),b=_e("create-notification"),y="http://127.0.0.1:8000";async function x(){if(r.value){const d=new FormData;d.append("submission_file",r.value),d.append("class_code",`${e.classId}`),console.log("FormData ",d),u.value=!0,await Te.post(`${y}/api/classes/${o.params.class_code}/submissions/upload`,d,{headers:{Authorization:`Bearer ${n.token}`,"Content-Type":"multipart/form-data"}}).then(function(c){var i;u.value=!1,g("openSubmissionCard",!1),b({type:"success",message:`Sent file ${(i=r.value)==null?void 0:i.name} successfully! Please wait few minutes for processing and analyzing data!`})}).catch(function(){u.value=!1,g("openSubmissionCard",!1),b({type:"error",message:"Something's wrong when uploading!"})})}}return(d,c)=>{const i=ce;return C(),ye(Ve,{class:"w-66 mx-auto text-secondary"},{default:f(()=>[t(he,null,{default:f(()=>[_("div",Xe,[Ke,t(H,{size:"md",class:"ml-2 my-auto"},{default:f(()=>[D("fas fa-chevron-right")]),_:1}),t(Se,{class:"ml-4 my-auto"},{default:f(()=>[D("Submissions")]),_:1})]),t(L),_("p",Qe,"Please import more submission data for the class "+Y($(o).params.class_code.toString().substring(6)),1),_("div",Ye,[_("div",Ze,[t(H,{class:"mr-2"},{default:f(()=>[D("fas fa-file-alt")]),_:1}),ea]),u.value?(C(),B("div",ta,[t(xe,{size:100,width:7,color:"primary",indeterminate:""})])):(C(),B("div",aa,[t(i,{idx:0,type:"Submission",onUploadFile:c[0]||(c[0]=l=>r.value=l)})]))])]),_:1}),t(L,{class:"my-1"}),t(Pe,null,{default:f(()=>[t(we),t(F,{text:"Close",class:"text-none bg-blue-lighten-5 text-blue-darken-2",onClick:c[1]||(c[1]=l=>g("openSubmissionCard",!1)),disabled:u.value},null,8,["disabled"]),t(F,{class:"text-none bg-primary",text:"Save",onClick:x,disabled:u.value},null,8,["disabled"])]),_:1})]),_:1})}}}),oa={class:"d-flex flex-row w-100 justify-space-between"},la={class:"text-primary"},ca=K({__name:"Submission",setup(a){const w=Q(),g=h(!1),e=h(0),o=w.params.class_code.toString(),n=h(25),r=h(!1),u=je();async function b(){const l=o.substring(6,12),{data:s}=await O.get(`/api/courses/${l}/classes/${o}`);e.value=s.pk,y.value=s.num_of_submissions}const y=h(0),x=h();async function d({page:l,itemsPerPage:s,sortBy:P}){r.value=!0,await c(l,s),r.value=!1}async function c(l,s){const{data:P}=await O.get(`/api/classes/${o}/submissions?page=${l}&items=${s}`);x.value=P.map(m=>({question_id:m.exercise,secured_student_id:m.student,started_time:m.started_time,submitted_time:m.submitted_time,time_taken:m.time_taken,score:m.score}))}ke(async()=>{await b(),await c(1,n.value)});const i=[{title:"question_id",align:"start",key:"question_id",sortable:!1},{title:"secured_student_id",align:"start",key:"secured_student_id",sortable:!1},{title:"started_time",align:"start",key:"started_time",sortable:!1},{title:"submitted_time",align:"start",key:"submitted_time",sortable:!1},{title:"time_taken",align:"start",key:"time_taken",sortable:!1},{title:"score",align:"center",key:"score",sortable:!1}];return(l,s)=>{const P=De,m=sa;return C(),B(X,null,[t(P),t(Ce,null,{default:f(()=>[_("div",oa,[_("h1",la," ["+Y($(o).substring(6))+"] Submissions ",1),_("div",null,[t(Me,{modelValue:g.value,"onUpdate:modelValue":s[2]||(s[2]=v=>g.value=v)},{activator:f(({props:v})=>[t(F,k({onClick:s[0]||(s[0]=N=>$(u).resetCourse()),variant:"flat"},v,{class:"text-none bg-primary text-white","prepend-icon":"fas fa-file-upload"}),{default:f(()=>[D("Import")]),_:2},1040)]),default:f(()=>[t(m,{classId:e.value,onOpenSubmissionCard:s[1]||(s[1]=v=>{g.value=v})},null,8,["classId"])]),_:1},8,["modelValue"])])]),t(We,{class:"border-sm rounded-lg mt-8","items-per-page":n.value,"onUpdate:itemsPerPage":s[3]||(s[3]=v=>n.value=v),items:x.value,headers:i,"items-length":y.value,loading:r.value,"item-value":"name","show-select":"","onUpdate:options":d},null,8,["items-per-page","items","items-length","loading"])]),_:1})],64)}}});export{ca as default};
