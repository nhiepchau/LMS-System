import{d as w,ae as y,r as l,o as g,c as S,w as d,g as s,D as x,bL as I,$ as k,V,z as B,j as _,e as $,af as C,q as T,A as U,s as q,b as m,bM as A}from"./index-C_42H0vA.js";import{h}from"./http-nrUfQssp.js";import{V as L}from"./VForm-B-b5_Tfg.js";const N=m("h1",{class:"text-center my-10"},"Learning Outcome Evaluation Support",-1),z=m("br",null,null,-1),E={key:0,class:"text-error text-sm-center mt-4"},F=m("p",{class:"text-center"},[_("If you're student, please activate account before login at "),m("a",{href:"/register/"},"Activate page")],-1),P=w({__name:"Login",setup(D){const c=y(),n=l(!1),u=l(""),i=l(""),o=l(!1),p=l(!0);async function b(){n.value&&(o.value=!0,setTimeout(async()=>{const r=u.value.toString(),a=i.value.toString();await h.post("/api/users/login/",{username:u.value,password:i.value}).then(function(e){o.value=!1,h.interceptors.request.use(v=>(v.headers.Authorization=`Bearer ${e.data.access}`,v)),c.setLogin(r,a,e.data.access);const t=e.data.user;c.setUserInfo(`${t.first_name} ${t.last_name}`,t.is_teacher?"Teacher":"Student",t.email),sessionStorage.setItem("username",r),sessionStorage.setItem("password",a),sessionStorage.setItem("token",e.data.access),sessionStorage.setItem("fullname",`${t.first_name} ${t.last_name}`),sessionStorage.setItem("role",t.is_teacher?"Teacher":"Student"),sessionStorage.setItem("email",t.email),A.push({name:"homepage"})}).catch(()=>{p.value=!1,o.value=!1})},1e3))}function f(r){return!!r||"Field is required"}return(r,a)=>(g(),S(q,{class:"bg-grey-lighten-4 h-100",fluid:""},{default:d(()=>[N,s(U,{class:"mx-auto px-6 py-8","max-width":"400"},{default:d(()=>[s(x,{src:I,width:"8rem",class:"mb-8 mx-auto"}),s(L,{modelValue:n.value,"onUpdate:modelValue":a[2]||(a[2]=e=>n.value=e),onSubmit:k(b,["prevent"])},{default:d(()=>[s(V,{modelValue:u.value,"onUpdate:modelValue":a[0]||(a[0]=e=>u.value=e),readonly:o.value,rules:[f],class:"mb-2",label:"Username",clearable:""},null,8,["modelValue","readonly","rules"]),s(V,{modelValue:i.value,"onUpdate:modelValue":a[1]||(a[1]=e=>i.value=e),readonly:o.value,rules:[f],label:"Password",placeholder:"Enter your password",clearable:"",type:"password"},null,8,["modelValue","readonly","rules"]),z,s(B,{disabled:!n.value,loading:o.value,color:"info",size:"large",type:"submit",variant:"elevated",block:""},{default:d(()=>[_(" Sign In ")]),_:1},8,["disabled","loading"]),p.value?C("",!0):(g(),$("p",E,"Incorrect username or password!")),s(T,{class:"mt-8 mb-2"}),F]),_:1},8,["modelValue"])]),_:1})]),_:1}))}});export{P as default};
