import{d as w,ba as x,r,o as _,c as h,w as d,g as l,D as U,bL as P,$ as S,V as t,z as k,j as B,ae as C,A as E,s as q,b as f,bM as I}from"./index-2v8kRtHD.js";import{V as N}from"./VForm-BB1nP6dT.js";const F=f("h1",{class:"text-center my-10"},"Learning Outcome Evaluation Support",-1),L=f("br",null,null,-1);const z=w({__name:"Register",setup(M){const b=x(),u=r(!1),i=r(""),p=r(""),c=r(""),n=r(""),V=r(""),s=r(!1),v=[function(o){return o?`${o}`.length<8?"Minimum password length is 8.":!0:"Password is required."}],y=[function(o){return o?o!==n.value?"Passwords do not match.":!0:"Password is required."}];async function g(){u.value&&(s.value=!0,setTimeout(()=>{b.setLogin(i.value.toString(),n.value.toString(),""),I.push({name:"homepage"})},1e3))}function m(o){return!!o||"Field is required"}return(o,e)=>(_(),h(q,{class:"bg-grey-lighten-4 h-100",fluid:""},{default:d(()=>[F,l(E,{class:"mx-auto px-6 py-8","max-width":"400"},{default:d(()=>[l(U,{src:P,width:"8rem",class:"mb-8 mx-auto"}),l(N,{modelValue:u.value,"onUpdate:modelValue":e[5]||(e[5]=a=>u.value=a),onSubmit:S(g,["prevent"])},{default:d(()=>[l(t,{modelValue:p.value,"onUpdate:modelValue":e[0]||(e[0]=a=>p.value=a),readonly:s.value,rules:[m],class:"mb-2",label:"Student ID",clearable:""},null,8,["modelValue","readonly","rules"]),l(t,{modelValue:c.value,"onUpdate:modelValue":e[1]||(e[1]=a=>c.value=a),readonly:s.value,rules:[m],class:"mb-2",label:"Email",type:"email",clearable:""},null,8,["modelValue","readonly","rules"]),l(t,{modelValue:i.value,"onUpdate:modelValue":e[2]||(e[2]=a=>i.value=a),readonly:s.value,rules:[m],class:"mb-2",label:"Username",clearable:""},null,8,["modelValue","readonly","rules"]),l(t,{modelValue:n.value,"onUpdate:modelValue":e[3]||(e[3]=a=>n.value=a),readonly:s.value,rules:v,label:"Password",placeholder:"Enter your password",clearable:"",type:"password"},null,8,["modelValue","readonly"]),l(t,{modelValue:V.value,"onUpdate:modelValue":e[4]||(e[4]=a=>V.value=a),readonly:s.value,rules:y,label:"Confirmed Password",placeholder:"Enter your password again",clearable:"",type:"password"},null,8,["modelValue","readonly"]),L,l(k,{disabled:!u.value,loading:s.value,color:"info",size:"large",type:"submit",variant:"elevated",block:""},{default:d(()=>[B(" Sign Up ")]),_:1},8,["disabled","loading"]),C("",!0)]),_:1},8,["modelValue"])]),_:1})]),_:1}))}});export{z as default};