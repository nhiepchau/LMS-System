import{d as S,r as p,a as g,c as y,l as r,b as i,w as h,j as q,g as w,t as V,m as z,B as G,G as L,b3 as H,ba as M,b4 as Y,b5 as Z,bb as J,bc as K,bd as Q,I as X,Y as T,be as ee,b8 as A,u as W,bf as I,F as P,e as se,f as te,h as v,o as ae,v as oe,H as ne}from"./index-BFMTCsx2.js";import{V as le}from"./VDialog-DOtGhtWv.js";const re={class:"d-flex flex-row mt-2 justify-space-between",style:{width:"64%"}},ce={class:"d-flex flex-row"},ie={class:"my-auto text-dark-brown"},de=S({__name:"ExerciseItem",props:{exerciseCode:{type:String,default:""},exerciseName:{type:String,default:""},exerciseId:{type:Number,default:0},level:{type:String,default:""}},setup(C){const n=p(!1),c=C;return(_,a)=>(g(),y("div",re,[r("div",ce,[i(z,{class:"mr-4 my-auto",color:"sub"},{default:h(()=>[i(q,{size:"small",class:"mr-2","slot:prepend-icon":""},{default:h(()=>[w("fas fa-bolt")]),_:1}),w(" "+V(c.exerciseCode),1)]),_:1}),r("p",ie,V(c.exerciseName),1)]),i(le,{modelValue:n.value,"onUpdate:modelValue":a[0]||(a[0]=d=>n.value=d),class:"my-auto"},{activator:h(({props:d})=>[i(G,L({variant:"flat",width:"75"},d,{class:"text-none text-sub-chart"}),{default:h(()=>[w(" Details ")]),_:2},1040)]),_:1},8,["modelValue"])]))}}),ue={class:"d-flex flex-row justify-space-between w-100"},me={class:"mt-2 w-66"},_e={class:"d-flex flex-row mt-2"},pe={style:{width:"65%"},class:"mr-5"},fe={style:{width:"31%",height:"363px"}},be={class:"w-100 mt-8"},he=r("h3",null,"Suggested Exercises for Student",-1),ve={class:"mt-3"},ge=S({__name:"CombineChart",props:{title:{type:String,default:"Statistics"},classes:{type:Array,default:[]}},setup(C){H.register(M,Y,Z,J,K,Q);const n=p(""),c=p(),_=p(),a=p(),d=p(),u=C,m=X({chartData:{labels:[],datasets:[{label:"",backgroundColor:"",data:[],barThickness:0,borderWidth:0}]},secondChartData:{labels:[],datasets:[{label:"",backgroundColor:"",data:[],barThickness:0,borderWidth:0}]}}),b=T(()=>m.chartData),U=T(()=>m.secondChartData);async function $(t){await v.get(`/api/classes/${t}/students`).then(function(s){var o,e;const{data:l}=s;a.value=l.map(f=>({student_id:f.student_id,secured_student_id:f.secured_student_id,first_name:f.first_name,last_name:f.last_name})),c.value||(c.value=((e=(o=a.value)==null?void 0:o.at(0))==null?void 0:e.student_id)??0,B(n.value,c.value),N(n.value,c.value))})}function D(t,s){return(""+t).localeCompare(s)}async function F(t){const s=u.classes.find(l=>l.classCode===t);s&&await v.get(`/api/classes/${t}/labs/${s.num_of_lab}-post/overview`).then(function(l){const{data:o}=l;_.value=o.outcomes.sort(D),m.chartData={labels:o.outcomes.sort(D),datasets:[{label:"Passed",backgroundColor:"#4EA699",data:o.passed??[],barThickness:20,borderWidth:1},{label:"Failed",backgroundColor:"#C2D1CF",data:o.failed??[],barThickness:20,borderWidth:1}]}})}async function B(t,s){const l=u.classes.find(o=>o.classCode===t);if(l){const o=`${l.num_of_lab}-post`;await v.get(`/api/classes/${t}/students/${s}/from/${o}/to/${o}/progress`).then(function(e){var E;const{data:f}=e,x=(E=_.value)==null?void 0:E.map(k=>f[k][0]*100),R=x==null?void 0:x.map(k=>100-k);m.secondChartData={labels:_.value??[],datasets:[{label:"Passed",backgroundColor:"#222E50",data:x??[],barThickness:20,borderWidth:1},{label:"Failed",backgroundColor:"#C8D6F9",data:R,barThickness:20,borderWidth:1}]}})}}async function N(t,s){await v.get(`/api/classes/${t}/students/${s}/recommend`).then(function(l){const{data:o}=l;d.value=o.map(e=>({exercise_id:e.exercise_id,exercise_code:e.exercise_code,exercise_name:e.exercise_name,level:e.level}))})}const j={responsive:!0,indexAxis:"y",scales:{x:{stacked:!0},y:{stacked:!0}}},O={responsive:!0,indexAxis:"x",maintainAspectRatio:!1,scales:{x:{stacked:!0},y:{stacked:!0,max:100,beginAtZero:!0,ticks:{callback:function(t,s,l){return t+"%"}}}}};return ee(()=>{var t;n.value||(n.value=((t=u.classes.at(0))==null?void 0:t.classCode)??"",F(n.value),$(n.value))}),(t,s)=>{var o;const l=de;return g(),y("div",L({class:"pa-4 border-sm rounded-lg"},t.$attrs),[r("div",ue,[r("h3",me,V(u.title),1),i(A,{label:"Class",modelValue:n.value,"onUpdate:modelValue":[s[0]||(s[0]=e=>n.value=e),s[1]||(s[1]=e=>{F(e),$(e)})],items:u.classes.map(e=>e.classCode),variant:"solo",density:"compact",class:"mr-2","bg-color":"#F3F4F6",flat:""},null,8,["modelValue","items"]),i(A,{label:"Student ID",modelValue:c.value,"onUpdate:modelValue":[s[2]||(s[2]=e=>c.value=e),s[3]||(s[3]=e=>{B(n.value,e),N(n.value,e)})],items:(o=a.value)==null?void 0:o.map(e=>e.student_id),variant:"solo",density:"compact",class:"mr-2","bg-color":"#F3F4F6",flat:""},null,8,["modelValue","items"])]),r("div",_e,[r("div",pe,[i(W(I),{id:"my-chart-id",options:j,data:b.value},null,8,["data"])]),r("div",fe,[i(W(I),{id:"my-chart-id",options:O,data:U.value},null,8,["data"])])]),r("div",be,[he,r("div",ve,[(g(!0),y(P,null,se(d.value,e=>(g(),te(l,{exerciseCode:e.exercise_code,exerciseName:e.exercise_name},null,8,["exerciseCode","exerciseName"]))),256))])])],16)}}}),Ce=r("h1",null,"Report & Suggestion",-1),xe={class:"mt-5"},we=S({__name:"Report",setup(C){const n=p();async function c(){const{data:_}=await v.get("/api/classes");n.value=_.map(a=>{const[d,u]=a.course.split("-"),m=a.class_code.split("_")[0].substring(2);return{name:u,course_code:d,class_code:a.class_code,group:a.group,semester:m,num_of_lab:a.num_of_lab,num_of_students:a.num_of_students,num_submit_file:a.num_submit_file,num_of_exercises:a.num_of_exercises,num_of_submissions:a.num_of_submissions}})}return ae(()=>{c()}),(_,a)=>{const d=ne,u=ge;return g(),y(P,null,[i(d),i(oe,null,{default:h(()=>{var m;return[Ce,r("div",xe,[i(u,{class:"w-100",title:"Learning Outcome Performance",classes:(m=n.value)==null?void 0:m.map(b=>({name:b.name,classCode:b.class_code,num_of_lab:b.num_of_lab}))},null,8,["classes"])])]}),_:1})],64)}}});export{we as default};
