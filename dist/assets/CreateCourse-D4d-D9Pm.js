import{_ as X,o as i,e as b,b as l,g as t,w as n,j as V,i as S,h as oe,F as p,d as F,r as x,a as Y,I as P,f as h,c as C,t as k,V as H,p as ue,k as re,J as $,K as O,L as ne,M as U,N as R,E as T,O as Z,P as de,Q as ie,R as ce,S as K,T as me,U as fe,W as ve,X as J,Y as _e,Z as be,G as pe,v as G,u as Ve,q as ye,$ as W,z as M,a0 as j,a1 as ge,a2 as ee,a3 as he,a4 as Ce,a5 as xe,a6 as ke,a7 as $e,a8 as B,a9 as Se,aa as Ie,ab as Le,ac as Be,ad as Ne,ae as z,s as we,H as De}from"./index-2v8kRtHD.js";import{b as w,a as A,d as D,c as E,V as Q}from"./VWindowItem-B2MEAlSD.js";import{V as ae}from"./VTable-B6NYblOx.js";import{u as te,_ as le}from"./FileInput.vue_vue_type_script_setup_true_lang-D1FWhtmc.js";const Pe={},Fe={class:"d-flex flex-row"},Oe=l("h3",{class:"my-auto text-primary"},"Analysis",-1),Ue=l("p",{class:"text-dark-grey"},"Process all of your input",-1),Re={class:"mt-16 mx-auto",style:{height:"200px",width:"80%"}},Ae={class:"ma-auto text-center"},Ee=l("p",{class:"mb-4 text-primary"},"100%",-1),Te=l("p",{class:"mt-4 text-primary"},"Done",-1);function Ge(e,r){return i(),b(p,null,[l("div",Fe,[t(S,{class:"my-auto mr-2 text-sub",size:"small"},{default:n(()=>[V("fas fa-undo-alt")]),_:1}),Oe]),Ue,l("div",Re,[l("div",Ae,[Ee,t(oe,{color:"blue-darken-1","model-value":"100",rounded:""}),Te])])],64)}const ze=X(Pe,[["render",Ge]]),q=e=>(ue("data-v-e2e74ae9"),e=e(),re(),e),He={class:"bg-grey"},Ke=q(()=>l("th",{class:"text-left"},"LO",-1)),We=q(()=>l("th",{class:"text-center"},"Total",-1)),Me=q(()=>l("th",{class:"text-center"},"Threshold",-1)),je={class:"text-center"},qe={class:"text-center"},Je=F({__name:"DistributionForm",props:{outcome:{type:String,default:""}},setup(e){const r=x(["L.O.1","L.O.2","L.O.3","L.O.4"]),a=x(""),c=x(["Lab 1","Lab 2","Lab 3","Lab 4"]),m=Y({weight:[{subLO:"L.O.1.1",labs:[0,0,0,0],threshold:5},{subLO:"L.O.1.2",labs:[0,0,0,0],threshold:7},{subLO:"L.O.1.3",labs:[0,0,0,0],threshold:5},{subLO:"L.O.1.4",labs:[0,0,0,0],threshold:8}]}),f=P(()=>{let d=Array();return m.weight.forEach(_=>{let s=0;_.labs.forEach(o=>{s+=o}),d.push(s)}),console.log(d),d});return(d,_)=>(i(),b(p,null,[t(A,{modelValue:a.value,"onUpdate:modelValue":_[0]||(_[0]=s=>a.value=s)},{default:n(()=>[(i(!0),b(p,null,h(r.value,(s,o)=>(i(),C(w,{key:o,value:s},{default:n(()=>[V(k(s),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),t(E,{modelValue:a.value,"onUpdate:modelValue":_[1]||(_[1]=s=>a.value=s),class:"mt-3"},{default:n(()=>[(i(!0),b(p,null,h(r.value,(s,o)=>(i(),C(D,{key:o,value:s},{default:n(()=>[t(ae,null,{default:n(()=>[l("thead",He,[l("tr",null,[Ke,(i(!0),b(p,null,h(c.value,(u,v)=>(i(),b("th",{class:"text-center",key:v},k(u),1))),128)),We,Me])]),l("tbody",null,[(i(!0),b(p,null,h(m.weight,(u,v)=>(i(),b("tr",{key:v},[l("td",null,k(u.subLO),1),(i(!0),b(p,null,h(c.value,(y,g)=>(i(),b("td",{key:g},[t(H,{placeholder:"%",density:"compact",flat:"",variant:"outlined",class:"my-1 text-sm-body-1",color:"dark-grey","onUpdate:modelValue":N=>{var I=u.labs;I[g]=parseInt(N),m.weight[v].labs=I}},null,8,["onUpdate:modelValue"])]))),128)),l("td",je,[t(S,{size:"small"},{default:n(()=>[V("fas fa-bolt")]),_:1}),V("  "+k(f.value[v])+"% ",1)]),l("td",qe,k(u.threshold),1)]))),128))])]),_:2},1024)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"])],64))}}),Qe=X(Je,[["__scopeId","data-v-e2e74ae9"]]),Xe={class:"mt-3 w-100"},Ye=l("h3",null,"Classes",-1),Ze=l("p",null,"Exercise for each class",-1),ea={class:"d-flex flex-row mt-5"},aa={class:"d-flex flex-row text-primary"},ta=l("h3",null,"Submissions file",-1),la={class:"mt-15"},sa=l("div",{class:"mt-3"},[l("h3",null,"Distribution"),l("p",null,"Exercise for each class")],-1),oa={class:"d-flex flex-row mt-5"},ua=l("h3",{class:"text-primary"},"Learning outcome distribution",-1),ra=l("p",{class:"text-dark-grey text-sm-body-2"},"Loading learning outcome details from your data",-1),na=F({__name:"SubmissionForm",setup(e){const r=x(""),a=x(""),m=te().getValidClasses();return(f,d)=>{const _=le,s=Qe;return i(),b(p,null,[t(A,{modelValue:r.value,"onUpdate:modelValue":d[0]||(d[0]=o=>r.value=o),class:"w-100"},{default:n(()=>[t(w,{class:"text-none",value:"Submissions"},{default:n(()=>[t(S,null,{default:n(()=>[V("fas fa-circle-check")]),_:1}),V("  Submissions")]),_:1}),t(w,{class:"text-none",value:"LODistribution"},{default:n(()=>[V("LO Distribution")]),_:1})]),_:1},8,["modelValue"]),t(E,{class:"mt-3 w-100",modelValue:r.value,"onUpdate:modelValue":d[5]||(d[5]=o=>r.value=o)},{default:n(()=>[t(D,{value:"Submissions"},{default:n(()=>[l("div",Xe,[Ye,Ze,l("div",ea,[t(A,{direction:"vertical",modelValue:a.value,"onUpdate:modelValue":d[1]||(d[1]=o=>a.value=o),class:"w-25"},{default:n(()=>[(i(!0),b(p,null,h($(m),(o,u)=>(i(),C(w,{key:u,value:o.Name},{default:n(()=>[V(k(o.Name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),t(E,{modelValue:a.value,"onUpdate:modelValue":d[2]||(d[2]=o=>a.value=o),class:"border-sm rounded w-75 pa-4",style:{height:"250px","margin-top":"-70px"}},{default:n(()=>[(i(!0),b(p,null,h($(m),(o,u)=>(i(),C(D,{key:u,value:o.Name},{default:n(()=>[l("div",aa,[t(S,{class:"mr-2"},{default:n(()=>[V("fas fa-file-alt")]),_:1}),ta]),l("div",la,[t(_,{idx:u,type:"Submission"},null,8,["idx"])])]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"])])])]),_:1}),t(D,{value:"LODistribution"},{default:n(()=>[sa,l("div",oa,[t(A,{direction:"vertical",modelValue:a.value,"onUpdate:modelValue":d[3]||(d[3]=o=>a.value=o),class:"w-25"},{default:n(()=>[(i(!0),b(p,null,h($(m),(o,u)=>(i(),C(w,{key:u,value:o.Name},{default:n(()=>[V(k(o.Name),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),t(E,{modelValue:a.value,"onUpdate:modelValue":d[4]||(d[4]=o=>a.value=o),class:"border-sm rounded w-75 pa-4",style:{height:"400px","margin-top":"-70px"}},{default:n(()=>[(i(!0),b(p,null,h($(m),(o,u)=>(i(),C(D,{key:u,value:o.Name},{default:n(()=>[ua,ra,t(s)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"])])]),_:1})]),_:1},8,["modelValue"])],64)}}}),da=O({...ne({falseIcon:"$radioOff",trueIcon:"$radioOn"})},"VRadio"),ia=U()({name:"VRadio",props:da(),setup(e,r){let{slots:a}=r;return R(()=>t(Z,T(e,{class:["v-radio",e.class],style:e.style,type:"radio"}),a)),{}}}),ca=O({height:{type:[Number,String],default:"auto"},...de(),...ie(ce(),["multiple"]),trueIcon:{type:K,default:"$radioOn"},falseIcon:{type:K,default:"$radioOff"},type:{type:String,default:"radio"}},"VRadioGroup"),ma=U()({name:"VRadioGroup",inheritAttrs:!1,props:ca(),emits:{"update:modelValue":e=>!0},setup(e,r){let{attrs:a,slots:c}=r;const m=me(),f=P(()=>e.id||`radio-group-${m}`),d=fe(e,"modelValue");return R(()=>{const[_,s]=ve(a),o=J.filterProps(e),u=Z.filterProps(e),v=c.label?c.label({label:e.label,props:{for:f.value}}):e.label;return t(J,T({class:["v-radio-group",e.class],style:e.style},_,o,{modelValue:d.value,"onUpdate:modelValue":y=>d.value=y,id:f.value}),{...c,default:y=>{let{id:g,messagesId:N,isDisabled:I,isReadonly:L}=y;return t(p,null,[v&&t(_e,{id:g.value},{default:()=>[v]}),t(be,T(u,{id:g.value,"aria-describedby":N.value,defaultsTarget:"VRadio",trueIcon:e.trueIcon,falseIcon:e.falseIcon,type:e.type,disabled:I.value,readonly:L.value,"aria-labelledby":v?g.value:void 0,multiple:!1},s,{modelValue:d.value,"onUpdate:modelValue":se=>d.value=se}),c)])}})}),{}}}),fa={class:"d-flex flex-row"},va=l("h3",{class:"my-auto text-primary"},"General Information",-1),_a={class:"d-flex flex-row mt-4"},ba=l("h3",{class:"my-auto text-primary"},"Classes",-1),pa=l("thead",null,[l("tr",null,[l("th",null,"Class"),l("th",{class:"w-50"},"Exercises file"),l("th",null,"Default")])],-1),Va={class:"w-50"},ya=F({__name:"CreateCourseForm",setup(e){const r=te(),a=x(""),c=x(""),m=x(),f=Y({classes:[{Name:"",Default:!1}]});pe(()=>{var _=r.getValidClasses();_.length>0&&(f.classes=_),a.value=r.selectedCourse.CourseName,c.value=r.selectedCourse.Semester,m.value=r.selectedCourse.NumOfLabs});function d(){f.classes.push({Name:"",Default:!1}),r.addClass({Name:"",Default:!1})}return(_,s)=>{const o=le;return i(),b(p,null,[l("div",fa,[t(S,{class:"my-auto mr-2 text-sub",size:"small"},{default:n(()=>[V("fas fa-info-circle")]),_:1}),va]),t(Ve,{class:"mt-4"},{default:n(()=>[t(G,{cols:"6"},{default:n(()=>[t(Q,{label:"Course Name",items:["Programming Fundamentals","Data Structure & Algorithm","Web Development","Crypto & Cybersecurity"],variant:"outlined",color:"sub","bg-color":"#F3F4F6",density:"comfortable",modelValue:a.value,"onUpdate:modelValue":[s[0]||(s[0]=u=>a.value=u),s[1]||(s[1]=u=>$(r).editCourse("CourseName",u??""))]},null,8,["modelValue"])]),_:1}),t(G,{cols:"3"},{default:n(()=>[t(Q,{label:"Semester",items:["HK232","HK231","HK222","HK221"],variant:"outlined",color:"sub","bg-color":"#F3F4F6",density:"comfortable",modelValue:c.value,"onUpdate:modelValue":[s[2]||(s[2]=u=>c.value=u),s[3]||(s[3]=u=>$(r).editCourse("Semester",u??""))]},null,8,["modelValue"])]),_:1}),t(G,{cols:"3"},{default:n(()=>[t(H,{"bg-color":"#F3F4F6",label:"No. of Lab",color:"sub",placeholder:"Enter number of labs",variant:"outlined",density:"comfortable",modelValue:m.value,"onUpdate:modelValue":[s[4]||(s[4]=u=>m.value=u),s[5]||(s[5]=u=>$(r).editCourse("NumOfLabs",parseInt(u)))]},null,8,["modelValue"])]),_:1})]),_:1}),t(ye,{class:"my-2"}),l("div",_a,[t(S,{class:"my-auto mr-2 text-sub",size:"small"},{default:n(()=>[V("far fa-calendar")]),_:1}),ba]),t(ae,null,{default:n(()=>[pa,l("tbody",null,[(i(!0),b(p,null,h(f.classes,(u,v)=>(i(),b("tr",{key:v},[l("td",null,[t(H,{rounded:"md","bg-color":"#F3F4F6",color:"sub",variant:"outlined",placeholder:"Class",class:"my-2",density:"compact",modelValue:u.Name,"onUpdate:modelValue":[y=>u.Name=y,y=>$(r).setClassName(v,u.Name)]},null,8,["modelValue","onUpdate:modelValue"])]),l("td",Va,[t(o,{idx:v,type:"Exercise"},null,8,["idx"])]),l("td",null,[t(ma,{color:"#4B7BEC",modelValue:u.Default,"onUpdate:modelValue":[y=>u.Default=y,y=>$(r).setClassDefault(v,u.Default)]},{default:n(()=>[t(ia,{class:"text-blue-darken-4",label:"Apply for other classes"})]),_:2},1032,["modelValue","onUpdate:modelValue"])])]))),128))])]),_:1}),t(M,{onClick:s[6]||(s[6]=W(u=>d(),["prevent"])),variant:"plain",class:"text-none text-primary","prepend-icon":"fas fa-plus"},{default:n(()=>[V("Add more class")]),_:1})],64)}}}),ga=O({divider:[Number,String],...j()},"VBreadcrumbsDivider"),ha=U()({name:"VBreadcrumbsDivider",props:ga(),setup(e,r){let{slots:a}=r;return R(()=>{var c;return t("li",{class:["v-breadcrumbs-divider",e.class],style:e.style},[((c=a==null?void 0:a.default)==null?void 0:c.call(a))??e.divider])}),{}}}),Ca=O({active:Boolean,activeClass:String,activeColor:String,color:String,disabled:Boolean,title:String,...j(),...ge(),...ee({tag:"li"})},"VBreadcrumbsItem"),xa=U()({name:"VBreadcrumbsItem",props:Ca(),setup(e,r){let{slots:a,attrs:c}=r;const m=he(e,c),f=P(()=>{var o;return e.active||((o=m.isActive)==null?void 0:o.value)}),d=P(()=>f.value?e.activeColor:e.color),{textColorClasses:_,textColorStyles:s}=Ce(d);return R(()=>t(e.tag,{class:["v-breadcrumbs-item",{"v-breadcrumbs-item--active":f.value,"v-breadcrumbs-item--disabled":e.disabled,[`${e.activeClass}`]:f.value&&e.activeClass},_.value,e.class],style:[s.value,e.style],"aria-current":f.value?"page":void 0},{default:()=>{var o,u;return[m.isLink.value?t("a",{class:"v-breadcrumbs-item--link",href:m.href.value,"aria-current":f.value?"page":void 0,onClick:m.navigate},[((u=a.default)==null?void 0:u.call(a))??e.title]):((o=a.default)==null?void 0:o.call(a))??e.title]}})),{}}}),ka=O({activeClass:String,activeColor:String,bgColor:String,color:String,disabled:Boolean,divider:{type:String,default:"/"},icon:K,items:{type:Array,default:()=>[]},...j(),...xe(),...ke(),...ee({tag:"ul"})},"VBreadcrumbs"),$a=U()({name:"VBreadcrumbs",props:ka(),setup(e,r){let{slots:a}=r;const{backgroundColorClasses:c,backgroundColorStyles:m}=$e(B(e,"bgColor")),{densityClasses:f}=Se(e),{roundedClasses:d}=Ie(e);Le({VBreadcrumbsDivider:{divider:B(e,"divider")},VBreadcrumbsItem:{activeClass:B(e,"activeClass"),activeColor:B(e,"activeColor"),color:B(e,"color"),disabled:B(e,"disabled")}});const _=P(()=>e.items.map(s=>typeof s=="string"?{item:{title:s},raw:s}:{item:s,raw:s}));return R(()=>{const s=!!(a.prepend||e.icon);return t(e.tag,{class:["v-breadcrumbs",c.value,f.value,d.value,e.class],style:[m.value,e.style]},{default:()=>{var o;return[s&&t("li",{key:"prepend",class:"v-breadcrumbs__prepend"},[a.prepend?t(Be,{key:"prepend-defaults",disabled:!e.icon,defaults:{VIcon:{icon:e.icon,start:!0}}},a.prepend):t(S,{key:"prepend-icon",start:!0,icon:e.icon},null)]),_.value.map((u,v,y)=>{var I;let{item:g,raw:N}=u;return t(p,null,[((I=a.item)==null?void 0:I.call(a,{item:g,index:v}))??t(xa,T({key:v,disabled:v>=y.length-1},typeof g=="string"?{title:g}:g),{default:a.title?()=>{var L;return(L=a.title)==null?void 0:L.call(a,{item:g,index:v})}:void 0}),v<y.length-1&&t(ha,null,{default:a.divider?()=>{var L;return(L=a.divider)==null?void 0:L.call(a,{item:N,index:v})}:void 0})])}),(o=a.default)==null?void 0:o.call(a)]}})}),{}}}),Sa=F({__name:"BreadCrumb",props:{activeIdx:{type:Number,default:0}},setup(e){const r=e,a=x([{title:"Classes & Exercises",icon:"fas fa-book",color:"#6F9CEB",disabled:!1},{title:"Submissions",icon:"fas fa-file-code",color:"",disabled:!0},{title:"Analysis",icon:"fas fa-chart-pie",color:"",disabled:!0}]);return Ne(()=>r.activeIdx,(c,m)=>{a.value.forEach(f=>{a.value[m].color="",a.value[m].disabled=!0,a.value[c].color="#6F9CEB",a.value[c].disabled=!1})}),(c,m)=>(i(),C($a,{items:a.value,rounded:"",class:"bg-grey py-6 border-sm"},{divider:n(()=>[t(S,{size:"xsmall"},{default:n(()=>[V("fas fa-chevron-right")]),_:1})]),title:n(({item:f})=>[t(S,{size:"small"},{default:n(()=>[V(k(f.icon),1)]),_:2},1024),V("  "+k(f.title),1)]),_:1},8,["items"]))}}),Ia=l("h1",null,"Create classes",-1),La={class:"border-sm px-3 py-5 rounded mt-4"},Ba={class:"mt-2 text-right"},Na=3,Oa=F({__name:"CreateCourse",setup(e){const r=x(0);return(a,c)=>{const m=De,f=Sa,d=ya,_=na,s=ze;return i(),b(p,null,[t(m),t(we,null,{default:n(()=>[Ia,t(f,{activeIdx:r.value,class:"my-2"},null,8,["activeIdx"]),l("div",La,[r.value===0?(i(),C(d,{key:0})):z("",!0),r.value===1?(i(),C(_,{key:1})):z("",!0),r.value===2?(i(),C(s,{key:2})):z("",!0)]),l("div",Ba,[t(M,{disabled:r.value<=0,variant:"plain",text:"Back","prepend-icon":"fas fa-arrow-left",class:"text-none bg-light-blue text-sub mr-3",onClick:c[0]||(c[0]=W(o=>r.value--,["prevent"]))},null,8,["disabled"]),t(M,{disabled:r.value+1>=Na,variant:"plain","append-icon":"fas fa-arrow-right",class:"text-none bg-primary",text:"Next",onClick:c[1]||(c[1]=W(o=>r.value++,["prevent"]))},null,8,["disabled"])])]),_:1})],64)}}});export{Oa as default};
