import{defineComponent as l,inject as a,provide as c}from"vue";import{render as p}from'../utils/render.js';let e=Symbol("ForcePortalRootContext");function u(){return a(e,!1)}let P=l({name:"ForcePortalRoot",props:{as:{type:[Object,String],default:"template"},force:{type:Boolean,default:!1}},setup(o,{slots:t,attrs:r}){return c(e,o.force),()=>{let{force:f,...n}=o;return p({theirProps:n,ourProps:{},slot:{},slots:t,attrs:r,name:"ForcePortalRoot"})}}});export{P as ForcePortalRoot,u as usePortalRoot};
