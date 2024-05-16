import{h as q}from"./http-nrUfQssp.js";import{V as O,a as Y,b as K,c as P,d as J,e as R}from"./VCombobox-BoULYBQF.js";import{d as S,o as L,r as V,a as m,c as y,b as e,w as s,F as C,e as D,f as w,g as b,t as h,h as Q,V as X,i as k,u as G,p as Z,j as ee,k as o,_ as se,l as I,n as te,m as T,q as N,s as B,v as A,x as H,y as z,z as W,A as $,B as j,C as ae,D as le,E as oe,G as ne,H as ue}from"./index-C1svi_0i.js";import{V as re}from"./VDialog-Cono6XTE.js";import{u as ie}from"./course-BudutSGk.js";const ce=p=>(Z("data-v-07d806ba"),p=p(),ee(),p),_e={key:0,class:"my-1"},me={key:1},de=ce(()=>o("span",{class:"text-dark-grey"},"/ 10",-1)),fe=S({__name:"LabContribution",props:{course_code:{type:String,default:""},class_code:{type:String,default:""},num_of_labs:{type:Number,default:0}},setup(p){const g=p;L(async()=>{await c()});function u(r,n,a){return a.indexOf(r)===n}const l=V({}),x=V(""),t=V(),d=Array.from({length:g.num_of_labs},(r,n)=>n+1).map(r=>r),f=V();async function c(){await q.get(`/api/courses/${g.course_code}/classes/${g.class_code}/labcontributions`).then(function(r){var a;const{data:n}=r;f.value=n.map(i=>({parent_outcome:i.parent_outcome,outcome_code:i.outcome_code,threshold:i.threshold,labs:i.labs})),t.value=n.map(i=>i.parent_outcome).filter(u),l.value=F(),x.value=((a=t.value)==null?void 0:a.at(0))??""})}function v(r){return d.reduce((n,a)=>n+(!r.labs[a-1]||r.labs[a-1]===-1?0:parseFloat(r.labs[a-1])),0)}function E(r,n){return(""+r.outcome).localeCompare(n.outcome)}function U(){const r=d.map(a=>({title:`Lab ${a}`,align:"start",sortable:!1,key:`lab_${a}`,value:i=>i.labs[a-1]})),n=[{title:"LO",align:"start",key:"outcome",sortable:!1}];return n.push(...r),n.push({title:"Total",align:"center",key:"total",width:180,sortable:!1,value:a=>d.reduce((i,_)=>i+(a.labs[_-1]!==-1?a.labs[_-1]:0),0)},{title:"Threshold",align:"center",sortable:!1,key:"threshold"},{title:"Edit",align:"center",sortable:!1,key:"edit"}),n}function F(){const r={};return t.value&&f.value&&t.value.forEach(n=>{var i;const a=((i=f.value)==null?void 0:i.filter(_=>_.parent_outcome==n))??[];r[n]=a.map(_=>({outcome:_.outcome_code,labs:_.labs,threshold:_.threshold})).sort(E)}),console.log("Contributions ",r),r}return(r,n)=>(m(),y(C,null,[e(Y,{modelValue:x.value,"onUpdate:modelValue":n[0]||(n[0]=a=>x.value=a)},{default:s(()=>[(m(!0),y(C,null,D(t.value,(a,i)=>(m(),w(O,{key:i,value:a},{default:s(()=>[b(h(a),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),e(J,{modelValue:x.value,"onUpdate:modelValue":n[1]||(n[1]=a=>x.value=a),class:"mt-2"},{default:s(()=>[(m(!0),y(C,null,D(t.value,(a,i)=>(m(),w(K,{key:i,value:a},{default:s(()=>[e(P,{headers:U(),items:l.value[a],"item-value":"outcome"},Q({"item.total":s(({item:_})=>[e(X,{"model-value":v(_)*100,color:"primary",rounded:"","rounded-bar":"",max:100},null,8,["model-value"])]),"item.edit":s(()=>[e(k,{size:"small",class:"text-dark-grey"},{default:s(()=>[b("fas fa-edit")]),_:1})]),"item.threshold":s(({value:_})=>[b(h(_)+" ",1),de]),_:2},[D(G(d),_=>({name:`item.lab_${_}`,fn:s(({item:M})=>[M.labs[_-1]!==-1?(m(),y("div",_e,h(`${M.labs[_-1]*100}%`),1)):(m(),y("div",me," --- "))])}))]),1032,["headers","items"])]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"])],64))}}),be=se(fe,[["__scopeId","data-v-07d806ba"]]),pe=S({__name:"LabItem",props:{label:String},setup(p){const g=p,u=V(["prelab","inlab","postlab"]);return(l,x)=>(m(),w(R,{modelValue:u.value,"onUpdate:modelValue":x[0]||(x[0]=t=>u.value=t),items:["prelab","inlab","postlab"],label:g.label,multiple:"",variant:"outlined",density:"compact"},{selection:s(({item:t})=>[(m(),w(I,{key:JSON.stringify(t),size:"small",class:te([t.value==="prelab"?"bg-blue-lighten-6 text-blue-darken-2":"",t.value==="inlab"?"bg-red-lighten-5 text-red-darken-2":"",t.value==="postlab"?"bg-green-lighten-5 text-green-darken-2":""])},{default:s(()=>[b(h(t.value),1)]),_:2},1032,["class"]))]),_:1},8,["modelValue","label"]))}}),ge={class:"d-flex flex-row text-primary mb-2"},xe={class:"my-auto"},he={class:"mt-4 d-flex flex-row"},ve={class:"w-50 px-2"},ye={class:"d-flex flex-row"},we=o("h3",{class:"my-auto"},"General Information",-1),Ve={class:"w-50 px-2"},ke={class:"d-flex flex-row"},Ce=o("h3",{class:"my-auto"},"Lab",-1),$e={class:"d-flex flex-row"},De=o("h3",{class:"my-auto"},"Learning outcome distribution",-1),Se=S({__name:"ClassDetail",props:{course_name:String,course_code:String,semester:String,group:String,class_code:String,num_of_labs:Number,num_submit_file:Number,num_of_submissions:Number,num_of_exercises:Number},emits:["openDialog"],setup(p,{emit:g}){const u=p,l=g;return(x,t)=>{const d=ae,f=pe,c=be;return m(),w(j,{class:"w-66 mx-auto text-secondary"},{default:s(()=>[e(T,null,{default:s(()=>[o("div",ge,[o("h2",xe,h(u.course_name),1),e(k,{size:"md",class:"ml-2 my-auto"},{default:s(()=>[b("fas fa-chevron-right")]),_:1}),e(I,{class:"ml-4 my-auto"},{default:s(()=>[b("HK"+h(u.semester),1)]),_:1}),e(k,{size:"md",class:"ml-2 my-auto"},{default:s(()=>[b("fas fa-chevron-right")]),_:1}),e(I,{class:"ml-4 my-auto"},{default:s(()=>[b(h(u.group),1)]),_:1})]),e(N),o("div",he,[o("div",ve,[o("div",ye,[e(k,{class:"my-auto mr-2 text-sub",size:"small"},{default:s(()=>[b("fas fa-info-circle")]),_:1}),we]),e(B,{class:"px-1"},{default:s(()=>[e(A,null,{default:s(()=>[e(H,null,{default:s(()=>[e(d,{class:"bg-green-lighten-5 text-dark-green",info:u.num_of_labs,typeInfo:"Labs"},null,8,["info"])]),_:1}),e(H,null,{default:s(()=>[e(d,{class:"bg-blue-lighten-5 text-sub",info:u.num_of_exercises,typeInfo:"Exercises"},null,8,["info"])]),_:1})]),_:1}),e(A,{class:"d-flex"},{default:s(()=>[e(H,null,{default:s(()=>[e(d,{class:"bg-green-lighten-5 text-dark-green",info:u.num_submit_file,typeInfo:"Submission files"},null,8,["info"])]),_:1}),e(H,null,{default:s(()=>[e(d,{class:"bg-blue-lighten-5 text-sub",info:u.num_of_submissions,typeInfo:"Submissions"},null,8,["info"])]),_:1})]),_:1})]),_:1})]),o("div",Ve,[o("div",ke,[e(k,{class:"my-auto mr-2 text-sub",size:"small"},{default:s(()=>[b("fas fa-bookmark")]),_:1}),Ce]),e(B,{class:"px-1"},{default:s(()=>[(m(!0),y(C,null,D(u.num_of_labs,v=>(m(),w(f,{label:`Lab ${v}`},null,8,["label"]))),256))]),_:1})])]),o("div",null,[o("div",$e,[e(k,{class:"my-auto mr-2 text-sub",size:"small"},{default:s(()=>[b("fas fa-check-circle")]),_:1}),De]),e(c,{class_code:u.class_code,course_code:u.course_code,num_of_labs:u.num_of_labs},null,8,["class_code","course_code","num_of_labs"])])]),_:1}),e(N,{class:"my-1"}),e(z,null,{default:s(()=>[e(W),e($,{text:"Close",class:"text-none bg-blue-lighten-5 text-blue-darken-2",onClick:t[0]||(t[0]=v=>l("openDialog",!1))}),e($,{class:"text-none bg-primary",text:"Save",onClick:t[1]||(t[1]=v=>l("openDialog",!1))})]),_:1})]),_:1})}}}),He={class:"text-secondary w-100"},Ie={class:"d-flex flex-row"},Ne={class:"w-75 my-2 d-flex flex-column align-start"},Be={class:"text-caption mb-auto font-weight-bold text-grey-darken-1"},Me={class:"text-h6"},Ae={class:"mr-2"},qe=S({__name:"ClassItem",props:{id:{type:Number,default:0},name:{type:String,required:!0},course_code:{type:String,required:!0},class_code:{type:String,required:!0},group:{type:String,required:!0},semester:{type:String,required:!0},num_of_labs:{type:Number,default:0},num_submit_file:{type:Number,default:0},num_of_submissions:{type:Number,default:0},num_of_exercises:{type:Number,default:0}},setup(p){const g=V(!1),u=["https://images.unsplash.com/photo-1542903660-eedba2cda473?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1587620931276-d97f425f62b9?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1715610984520-171b95b531c2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],l=p;return(x,t)=>{const d=Se;return m(),w(j,{color:"grey-lighten-3",variant:"outlined",class:"w-33"},{default:s(()=>[e(T,null,{default:s(()=>[o("div",He,[o("div",Ie,[e(le,{src:u[l.id%4],class:"my-2 mr-4"},null,8,["src"]),o("div",Ne,[o("div",Be,"[HK"+h(l.semester)+"] "+h(l.group),1),o("div",Me,h(l.name),1)])]),e(oe,{"bg-color":"blue-lighten-5",color:"blue-darken-2",class:"w-75 float-end text-blue-darken-2",variant:"solo",flat:"",density:"compact",label:"Class Code","model-value":l.course_code,readonly:""},null,8,["model-value"])])]),_:1}),e(N),e(z,null,{default:s(()=>[e(W),o("div",Ae,[e($,{to:`/class/${l.class_code}`,variant:"outlined",width:"75",class:"text-none text-primary"},{default:s(()=>[b(" View ")]),_:1},8,["to"]),e(re,{modelValue:g.value,"onUpdate:modelValue":t[1]||(t[1]=f=>g.value=f)},{activator:s(({props:f})=>[e($,ne({variant:"flat",width:"75"},f,{class:"text-none bg-primary"}),{default:s(()=>[b(" Detail ")]),_:2},1040)]),default:s(()=>[e(d,{onOpenDialog:t[0]||(t[0]=f=>g.value=f),course_name:l.name,semester:p.semester,group:l.group,class_code:l.class_code,course_code:l.course_code,num_of_labs:l.num_of_labs,num_submit_file:l.num_submit_file,num_of_exercises:l.num_of_exercises,num_of_submissions:l.num_of_submissions},null,8,["course_name","semester","group","class_code","course_code","num_of_labs","num_submit_file","num_of_exercises","num_of_submissions"])]),_:1},8,["modelValue"])])]),_:1})]),_:1})}}}),Le={class:"d-flex flex-row w-100 justify-space-between"},Ge=o("h1",{class:"text-primary"},"All classes",-1),Te={class:"mt-10",style:{display:"grid","grid-template-columns":"375px 375px auto",gap:"20px"}},Fe=S({__name:"Course",setup(p){const g=ie(),u=V();async function l(){const{data:x}=await q.get("/api/classes");u.value=x.map(t=>{const[d,f]=t.course.split("-"),c=t.class_code.split("_")[0].substring(2);return{name:f,course_code:d,class_code:t.class_code,group:t.group,semester:c,num_of_lab:t.num_of_lab,num_submit_file:t.num_submit_file,num_of_exercises:t.num_of_exercises,num_of_submissions:t.num_of_submissions}})}return L(()=>{l()}),(x,t)=>{const d=ue,f=qe;return m(),y(C,null,[e(d),e(B,null,{default:s(()=>[o("div",Le,[Ge,o("div",null,[e($,{variant:"outlined",class:"text-none text-primary mr-3","prepend-icon":"fas fa-file-download"},{default:s(()=>[b("Export")]),_:1}),e($,{to:"/class/create",onClick:t[0]||(t[0]=c=>G(g).resetCourse()),variant:"flat",height:"40",class:"text-none bg-primary text-white","prepend-icon":"fas fa-plus"},{default:s(()=>[b("New classes")]),_:1})])]),o("div",Te,[(m(!0),y(C,null,D(u.value,(c,v)=>(m(),w(f,{class:"mr-4 w-100",key:v,id:v,name:c.name,course_code:c.course_code,class_code:c.class_code,group:c.group,semester:c.semester,num_of_labs:c.num_of_lab,num_of_exercises:c.num_of_exercises,num_of_submissions:c.num_of_submissions,num_submit_file:c.num_submit_file},null,8,["id","name","course_code","class_code","group","semester","num_of_labs","num_of_exercises","num_of_submissions","num_submit_file"]))),128))])]),_:1})],64)}}});export{Fe as default};
