import{R as p,a6 as b,c3 as v,T as F,c4 as V,r as y,U as R,b as h,aI as P}from"./index-Cc2wFGp6.js";const k=p({...b(),...v()},"VForm"),D=F()({name:"VForm",props:k(),emits:{"update:modelValue":o=>!0,submit:o=>!0},setup(o,i){let{slots:n,emit:c}=i;const r=V(o),s=y();function f(t){t.preventDefault(),r.reset()}function l(t){const a=t,e=r.validate();a.then=e.then.bind(e),a.catch=e.catch.bind(e),a.finally=e.finally.bind(e),c("submit",a),a.defaultPrevented||e.then(u=>{var m;let{valid:d}=u;d&&((m=s.value)==null||m.submit())}),a.preventDefault()}return R(()=>{var t;return h("form",{ref:s,class:["v-form",o.class],style:o.style,novalidate:!0,onReset:f,onSubmit:l},[(t=n.default)==null?void 0:t.call(n,r)])}),P(r,s)}});export{D as V};
