import{d as _,ba as w,r as l,o as v,c as y,w as d,g as t,D as x,bL as S,$ as k,V as f,z as I,j as g,e as B,ae as C,q as T,A as q,s as A,b as i,bM as L}from"./index-2v8kRtHD.js";import{h as V}from"./http-UipYOg7Q.js";import{V as N}from"./VForm-BB1nP6dT.js";const U=i("h1",{class:"text-center my-10"},"Learning Outcome Evaluation Support",-1),z=i("br",null,null,-1),E={key:0,class:"text-error text-sm-center mt-4"},F=i("p",{class:"text-center"},[g("If you're student, please activate account before login at "),i("a",{href:"/register/"},"Activate page")],-1),J=_({__name:"Login",setup(D){const b=w(),r=l(!1),n=l(""),u=l(""),s=l(!1),c=l(!0);async function h(){r.value&&(s.value=!0,setTimeout(async()=>{const o=n.value.toString(),a=u.value.toString();await V.post("/api-token-auth/",{username:n.value,password:u.value}).then(function(e){console.log("JWT Token ",e.data.access),s.value=!1,V.interceptors.request.use(p=>(p.headers.Authorization=`Bearer ${e.data.access}`,p)),b.setLogin(o,a,e.data.access),sessionStorage.setItem("username",o),sessionStorage.setItem("password",a),sessionStorage.setItem("token",e.data.access),L.push({name:"homepage"})}).catch(()=>{c.value=!1,s.value=!1})},1e3))}function m(o){return!!o||"Field is required"}return(o,a)=>(v(),y(A,{class:"bg-grey-lighten-4 h-100",fluid:""},{default:d(()=>[U,t(q,{class:"mx-auto px-6 py-8","max-width":"400"},{default:d(()=>[t(x,{src:S,width:"8rem",class:"mb-8 mx-auto"}),t(N,{modelValue:r.value,"onUpdate:modelValue":a[2]||(a[2]=e=>r.value=e),onSubmit:k(h,["prevent"])},{default:d(()=>[t(f,{modelValue:n.value,"onUpdate:modelValue":a[0]||(a[0]=e=>n.value=e),readonly:s.value,rules:[m],class:"mb-2",label:"Username",clearable:""},null,8,["modelValue","readonly","rules"]),t(f,{modelValue:u.value,"onUpdate:modelValue":a[1]||(a[1]=e=>u.value=e),readonly:s.value,rules:[m],label:"Password",placeholder:"Enter your password",clearable:"",type:"password"},null,8,["modelValue","readonly","rules"]),z,t(I,{disabled:!r.value,loading:s.value,color:"info",size:"large",type:"submit",variant:"elevated",block:""},{default:d(()=>[g(" Sign In ")]),_:1},8,["disabled","loading"]),c.value?C("",!0):(v(),B("p",E,"Incorrect username or password!")),t(T,{class:"mt-8 mb-2"}),F]),_:1},8,["modelValue"])]),_:1})]),_:1}))}});export{J as default};
