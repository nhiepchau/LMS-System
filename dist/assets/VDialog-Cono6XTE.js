import{M as P,bf as y,bg as h,O as D,Y as S,bh as x,r as w,aW as B,ag as f,X as F,P as I,bi as v,b as g,af as O,G as m,ar as R,aN as T,bj as N}from"./index-C1svi_0i.js";const A=P({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...y({origin:"center center",scrollStrategy:"block",transition:{component:h},zIndex:2400})},"VDialog"),L=D()({name:"VDialog",props:A(),emits:{"update:modelValue":a=>!0},setup(a,p){let{slots:c}=p;const n=S(a,"modelValue"),{scopeId:V}=x(),t=w();function i(l){var r,s;const e=l.relatedTarget,o=l.target;if(e!==o&&((r=t.value)!=null&&r.contentEl)&&((s=t.value)!=null&&s.globalTop)&&![document,t.value.contentEl].includes(o)&&!t.value.contentEl.contains(o)){const u=N(t.value.contentEl);if(!u.length)return;const d=u[0],E=u[u.length-1];e===d?E.focus():d.focus()}}B&&f(()=>n.value&&a.retainFocus,l=>{l?document.addEventListener("focusin",i):document.removeEventListener("focusin",i)},{immediate:!0}),f(n,async l=>{var e,o;await T(),l?(e=t.value.contentEl)==null||e.focus({preventScroll:!0}):(o=t.value.activatorEl)==null||o.focus({preventScroll:!0})});const b=F(()=>m({"aria-haspopup":"dialog","aria-expanded":String(n.value)},a.activatorProps));return I(()=>{const l=v.filterProps(a);return g(v,m({ref:t,class:["v-dialog",{"v-dialog--fullscreen":a.fullscreen,"v-dialog--scrollable":a.scrollable},a.class],style:a.style},l,{modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,"aria-modal":"true",activatorProps:b.value,role:"dialog"},V),{activator:c.activator,default:function(){for(var e=arguments.length,o=new Array(e),r=0;r<e;r++)o[r]=arguments[r];return g(O,{root:"VDialog"},{default:()=>{var s;return[(s=c.default)==null?void 0:s.call(c,...o)]}})}})}),R({},t)}});export{L as V};
