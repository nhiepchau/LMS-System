import{d as H,b3 as Q,bc as W,bd as X,by as Y,bz as ee,ba as te,b4 as ae,b5 as se,y as le,u as U,r as f,h as j,a as w,k as q,e as h,b as n,w as b,c as M,i as Z,t as E,P as T,b8 as O,H as z,bA as ne,v as re,F as G,V as oe,f as J,g as N,j as R,n as ue,p as de,q as K,s as ie,o as ce,m as me,x as pe,b7 as fe,_ as be}from"./index-Cc2wFGp6.js";import{V as ve}from"./VDataTableServer-DRLAvHgz.js";import{V as ge}from"./VDialog-m9a34H3S.js";import"./VDataTable-BRXGBBmZ.js";import"./VTable-DFDSBb63.js";const _e={class:"mt-4 d-flex flex-row w-100 justify-space-between"},ye={class:"w-33 d-flex flex-row"},he={key:1,class:"text-dark-grey text-sm-caption align-self-center"},Ce={class:"d-flex flex-row"},Ve=H({__name:"StudentProgressChart",props:{studentId:{type:Number,default:0},classCode:{type:String,default:""},numOfLab:{type:Number,default:0},startLab:{type:String,default:""},endLab:{type:String,default:""}},setup(A){Q.register(W,X,Y,ee,te,ae,se);const V=A,c=le({chartData:{labels:[],datasets:[{label:"",backgroundColor:"",data:[]}]},filterChartData:{labels:[],datasets:[{label:"",backgroundColor:"",data:[]}]}}),v=U(()=>c.filterChartData),m=f(V.startLab),p=f(V.endLab),d=f([]),g=f([]);function _(){const r=Array.from({length:V.numOfLab},(l,s)=>s+1).map(l=>l);let t=[];return r.forEach(l=>{t.push(`${l}-pre`),t.push(`${l}-in`),t.push(`${l}-post`)}),t}function L(){let r=_();const t=r.findIndex(s=>s===m.value),l=r.findIndex(s=>s==p.value);return t>l&&(p.value=r.at(t)??""),r.slice(t,l+1)}const F=U(()=>{let r=_();const t=r.findIndex(s=>s===m.value),l=r.findIndex(s=>s==p.value);return t>l&&(p.value=r.at(t)??""),m.value&&p.value&&S(),r.slice(t)});function I(r,t){return(""+r).localeCompare(t)}const $=[{primary:"#4EA699",sub:"#D3FFD3"},{primary:"#6F9CEB",sub:"#D3E1FF"},{primary:"#E15358",sub:"#FFD3D3"},{primary:"#FF7818",sub:"#FFD2B2"},{primary:"#663A82",sub:"#BCA0DC"},{primary:"#4F4F4F",sub:"#BABABA"}];async function S(){await j.get(`/api/classes/${V.classCode}/students/${V.studentId}/from/${m.value}/to/${p.value}/progress`).then(function(r){const{data:t}=r;g.value=Object.keys(t).filter(s=>s.toString().includes("L.O")&&!s.toString().includes("max")).sort(I),d.value.length<=0&&(d.value=g.value.filter((s,y)=>y<2));let l=g.value.map((s,y)=>({label:s,backgroundColor:$[y].primary,borderColor:$[y].primary,data:t[s].map(D=>D*100)}));l.push(...g.value.map((s,y)=>({label:`max_${s}`,backgroundColor:$[y].sub,borderColor:$[y].sub,data:t[`max_${s}`].map(D=>D*100)}))),c.chartData={labels:L(),datasets:l},P()})}function P(){let r=d.value.map(t=>t);r.push(...d.value.map(t=>`max_${t}`)),c.filterChartData={labels:c.chartData.labels,datasets:c.chartData.datasets.filter(t=>r.filter(l=>l==t.label).length>0)}}const B={responsive:!0,maintainAspectRatio:!0,indexAxis:"x",scales:{y:{beginAtZero:!0}}};return(r,t)=>(w(),q(G,null,[h("div",_e,[h("div",ye,[n(O,{label:"Outcomes",modelValue:d.value,"onUpdate:modelValue":[t[0]||(t[0]=l=>d.value=l),t[1]||(t[1]=()=>P())],items:g.value,variant:"solo","bg-color":"#F3F4F6",flat:"",multiple:"",density:"compact","single-line":""},{selection:b(({item:l,index:s})=>[s<2?(w(),M(Z,{key:0,class:"text-sm-caption"},{default:b(()=>[h("span",null,E(l.title),1)]),_:2},1024)):T("",!0),s===2?(w(),q("span",he," (+"+E(d.value.length-2)+" others) ",1)):T("",!0)]),_:1},8,["modelValue","items"])]),h("div",Ce,[n(O,{label:"Start lab",modelValue:m.value,"onUpdate:modelValue":t[2]||(t[2]=l=>m.value=l),items:_(),variant:"solo",density:"compact",class:"mr-2","bg-color":"#F3F4F6",flat:""},null,8,["modelValue","items"]),n(O,{label:"End lab",modelValue:p.value,"onUpdate:modelValue":[t[3]||(t[3]=l=>p.value=l),t[4]||(t[4]=()=>S())],items:F.value,variant:"solo",density:"compact","bg-color":"#F3F4F6",flat:""},null,8,["modelValue","items"])])]),h("div",re({class:"pa-4 border-sm rounded-lg"},r.$attrs),[n(z(ne),{data:v.value,options:B},null,8,["data"])],16)],64))}}),$e={class:"d-flex flex-row text-primary mb-2"},xe=h("h2",{class:"my-auto"},"Outcome Progress (%)",-1),Le=H({__name:"StudentDetail",props:{studentId:{type:Number,default:0},classCode:{type:String,default:""},numOfLab:{type:Number,default:0},startLab:{type:String,default:""},endLab:{type:String,default:""}},emits:["openDialog"],setup(A,{emit:V}){const c=A;function v(p,d,g){const _=`${p}`.substring(0,d),L=`${p}`.length;return _+g.repeat(L-d)}const m=V;return(p,d)=>{const g=Ve;return w(),M(ie,{class:"w-66 mx-auto text-secondary"},{default:b(()=>[n(oe,null,{default:b(()=>[h("div",$e,[xe,n(J,{size:"md",class:"ml-2 my-auto"},{default:b(()=>[N("fas fa-chevron-right")]),_:1}),n(Z,{class:"ml-4 my-auto"},{default:b(()=>[N("Student "+E(v(c.studentId,3,"*")),1)]),_:1})]),n(R),n(g,{studentId:c.studentId,startLab:c.startLab,endLab:c.endLab,numOfLab:c.numOfLab,classCode:c.classCode,class:"mb-4"},null,8,["studentId","startLab","endLab","numOfLab","classCode"])]),_:1}),n(R,{class:"my-1"}),n(ue,null,{default:b(()=>[n(de),n(K,{text:"Close",class:"text-none bg-blue-lighten-5 text-blue-darken-2 mr-4",onClick:d[0]||(d[0]=_=>m("openDialog",!1))})]),_:1})]),_:1})}}}),Fe={class:"d-flex flex-row w-100 justify-space-between"},Ie={class:"text-primary"},Se={class:"d-flex flex-row w-33"},Ae=H({__name:"Outcome",setup(A){const c=fe().params.class_code.toString(),v=f(""),m=f(""),p=f(!1),d=f(""),g=f(),_=f(),L=f([]),F=f(10),I=f(1),$=f(!1),S=f();async function P(){const u=c.substring(6,12);await j.get(`/api/courses/${u}/classes/${c}`).then(function(e){const{data:o}=e;_.value={num_of_lab:o.num_of_lab,num_of_students:o.num_of_students},v.value="1-pre",m.value="1-post",s(I.value,F.value)})}function B(){var o;const u=Array.from({length:(o=_.value)==null?void 0:o.num_of_lab},(i,C)=>C+1).map(i=>i);let e=[];return u.forEach(i=>{e.push(`${i}-pre`),e.push(`${i}-in`),e.push(`${i}-post`)}),e}const r=U(()=>{let u=B();const e=u.findIndex(i=>i===v.value),o=u.findIndex(i=>i==m.value);return e>o&&(m.value=u.at(e)??""),v.value&&m.value&&s(I.value,F.value),u.slice(e)});async function t({page:u,itemsPerPage:e,sortBy:o}){$.value=!0,v.value&&m.value&&await s(u,e)}function l(u,e){return(""+u).localeCompare(e)}async function s(u,e){const o=d.value&&d.value!==""?`&query=${d.value}`:"";await j.get(`/api/classes/${c}/students/all/from/${v.value}/to/${m.value}/progress?page=${u}&items=${e}${o}`).then(function(i){const{data:C}=i;L.value=C.length>0?Object.keys(C.at(0)).filter(a=>a.toString().includes("L.O")&&!a.toString().includes("max")).sort(l):[],S.value=C.map(a=>{let x={};return x.student=a.student,x.first_name=y(a.first_name,1,"x"),x.last_name=y(a.last_name,1,"x"),x.secured_student=a.secured_student,L.value.forEach(k=>{x[k]={start:a[k][0],end:a[k][1],max_start:a[`max_${k}`][0],max_end:a[`max_${k}`][1]}}),x}),$.value=!1})}function y(u,e,o){const i=`${u}`.substring(0,e),C=`${u}`.length;return i+o.repeat(C-e)}const D=U(()=>{const u=L.value.map(o=>({title:o,align:"center",sortable:!1,key:o,value:i=>`${i[o].start} / ${i[o].end}`})),e=[{title:"student_id",align:"start",key:"student",sortable:!1},{title:"first_name",align:"start",key:"first_name",sortable:!1},{title:"last_name",align:"start",key:"last_name",sortable:!1},{title:"secured_student_id",align:"start",key:"secured_student",sortable:!1}];return e.push(...u),e.push({title:"progress",align:"center",key:"progress",sortable:!1,value:o=>o.student}),e});return ce(async()=>{await P()}),(u,e)=>{const o=be,i=Le;return w(),q(G,null,[n(o),n(pe,null,{default:b(()=>{var C;return[h("div",Fe,[h("h1",Ie," ["+E(z(c).substring(6))+"] Learning Outcomes ",1),h("div",Se,[n(O,{label:"Start lab",modelValue:v.value,"onUpdate:modelValue":e[0]||(e[0]=a=>v.value=a),items:B(),variant:"solo",density:"compact",class:"mr-2","bg-color":"#F3F4F6",flat:""},null,8,["modelValue","items"]),n(O,{label:"End lab",modelValue:m.value,"onUpdate:modelValue":[e[1]||(e[1]=a=>m.value=a),e[2]||(e[2]=()=>s(I.value,F.value))],items:r.value,variant:"solo",density:"compact","bg-color":"#F3F4F6",flat:""},null,8,["modelValue","items"])])]),h("div",null,[n(me,{modelValue:d.value,"onUpdate:modelValue":e[3]||(e[3]=a=>d.value=a),variant:"outlined",color:"dark-grey",class:"w-50",density:"compact",placeholder:"Search student id...","hide-details":""},null,8,["modelValue"])]),n(ve,{class:"border-sm rounded-lg mt-2",page:I.value,"onUpdate:page":e[4]||(e[4]=a=>I.value=a),"items-per-page":F.value,"onUpdate:itemsPerPage":e[5]||(e[5]=a=>F.value=a),items:S.value,headers:D.value,"items-length":((C=_.value)==null?void 0:C.num_of_students)??0,loading:$.value,"item-value":"name","onUpdate:options":t},{"item.student":b(({value:a})=>[N(E(y(a,3,"*")),1)]),"item.progress":b(({value:a})=>[n(K,{icon:"",flat:"",variant:"plain",onClick:()=>{p.value=!0,g.value=a}},{default:b(()=>[n(J,{size:"small",class:"text-sub"},{default:b(()=>[N("fas fa-chart-simple")]),_:1})]),_:2},1032,["onClick"])]),_:1},8,["page","items-per-page","items","headers","items-length","loading"]),n(ge,{modelValue:p.value,"onUpdate:modelValue":e[7]||(e[7]=a=>p.value=a)},{default:b(()=>{var a;return[n(i,{studentId:g.value,startLab:v.value,endLab:m.value,numOfLab:((a=_.value)==null?void 0:a.num_of_lab)??0,classCode:z(c),onOpenDialog:e[6]||(e[6]=x=>p.value=x)},null,8,["studentId","startLab","endLab","numOfLab","classCode"])]}),_:1},8,["modelValue"])]}),_:1})],64)}}});export{Ae as default};