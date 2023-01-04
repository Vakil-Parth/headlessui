import{createContext as te,useContext as re,useMemo as k,useReducer as oe,useRef as K}from"react";import{forwardRefWithAs as V,render as $,compact as ne}from'../../utils/render.js';import{useId as J}from'../../hooks/use-id.js';import{match as ie}from'../../utils/match.js';import{useIsoMorphicEffect as j}from'../../hooks/use-iso-morphic-effect.js';import{Keys as g}from'../../components/keyboard.js';import{focusIn as q,Focus as w,FocusResult as Q,sortByDomNode as ae}from'../../utils/focus-management.js';import{useFlags as le}from'../../hooks/use-flags.js';import{Label as pe,useLabels as X}from'../../components/label/label.js';import{Description as se,useDescriptions as Y}from'../../components/description/description.js';import{useTreeWalker as ue}from'../../hooks/use-tree-walker.js';import{useSyncRefs as Z}from'../../hooks/use-sync-refs.js';import{Hidden as Te,Features as me}from'../../internal/hidden.js';import{attemptSubmit as be,objectToFormEntries as Re}from'../../utils/form.js';import{getOwnerDocument as ye}from'../../utils/owner.js';import{useEvent as b}from'../../hooks/use-event.js';import{useControllable as ge}from'../../hooks/use-controllable.js';import{isDisabledReactIssue7711 as z}from'../../utils/bugs.js';var ve=(t=>(t[t.RegisterOption=0]="RegisterOption",t[t.UnregisterOption=1]="UnregisterOption",t))(ve||{});let Oe={[0](a,n){let t=[...a.options,{id:n.id,element:n.element,propsRef:n.propsRef}];return{...a,options:ae(t,l=>l.element.current)}},[1](a,n){let t=a.options.slice(),l=a.options.findIndex(v=>v.id===n.id);return l===-1?a:(t.splice(l,1),{...a,options:t})}},B=te(null);B.displayName="RadioGroupContext";function ee(a){let n=re(B);if(n===null){let t=new Error(`<${a} /> is missing a parent <RadioGroup /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,ee),t}return n}function Ee(a,n){return ie(n.type,Oe,a,n)}let Pe="div",Ae=V(function(n,t){let{value:l,defaultValue:v,name:c,onChange:I,by:O=(e,r)=>e===r,disabled:E=!1,...M}=n,u=b(typeof O=="string"?(e,r)=>{let o=O;return(e==null?void 0:e[o])===(r==null?void 0:r[o])}:O),[S,P]=oe(Ee,{options:[]}),i=S.options,[R,_]=X(),[f,C]=Y(),U=`headlessui-radiogroup-${J()}`,A=K(null),h=Z(A,t),[p,G]=ge(l,I,v),D=k(()=>i.find(e=>!e.propsRef.current.disabled),[i]),F=k(()=>i.some(e=>u(e.propsRef.current.value,p)),[i,p]),T=b(e=>{var o;if(E||u(e,p))return!1;let r=(o=i.find(x=>u(x.propsRef.current.value,e)))==null?void 0:o.propsRef.current;return r!=null&&r.disabled?!1:(G==null||G(e),!0)});ue({container:A.current,accept(e){return e.getAttribute("role")==="radio"?NodeFilter.FILTER_REJECT:e.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(e){e.setAttribute("role","none")}});let H=b(e=>{let r=A.current;if(!r)return;let o=ye(r),x=i.filter(d=>d.propsRef.current.disabled===!1).map(d=>d.element.current);switch(e.key){case g.Enter:be(e.currentTarget);break;case g.ArrowLeft:case g.ArrowUp:if(e.preventDefault(),e.stopPropagation(),q(x,w.Previous|w.WrapAround)===Q.Success){let m=i.find(W=>W.element.current===(o==null?void 0:o.activeElement));m&&T(m.propsRef.current.value)}break;case g.ArrowRight:case g.ArrowDown:if(e.preventDefault(),e.stopPropagation(),q(x,w.Next|w.WrapAround)===Q.Success){let m=i.find(W=>W.element.current===(o==null?void 0:o.activeElement));m&&T(m.propsRef.current.value)}break;case g.Space:{e.preventDefault(),e.stopPropagation();let d=i.find(m=>m.element.current===(o==null?void 0:o.activeElement));d&&T(d.propsRef.current.value)}break}}),L=b(e=>(P({type:0,...e}),()=>P({type:1,id:e.id}))),s=k(()=>({registerOption:L,firstOption:D,containsCheckedOption:F,change:T,disabled:E,value:p,compare:u}),[L,D,F,T,E,p,u]),y={ref:h,id:U,role:"radiogroup","aria-labelledby":R,"aria-describedby":f,onKeyDown:H},N=k(()=>({value:p}),[p]);return<C name="RadioGroup.Description"><_ name="RadioGroup.Label"><B.Provider value={s}>{c!=null&&p!=null&&Re({[c]:p}).map(([e,r])=><Te features={me.Hidden}{...ne({key:e,as:"input",type:"radio",checked:r!=null,hidden:!0,readOnly:!0,name:e,value:r})}/>)}{$({ourProps:y,theirProps:M,slot:N,defaultTag:Pe,name:"RadioGroup"})}</B.Provider></_></C>});var he=(t=>(t[t.Empty=1]="Empty",t[t.Active=2]="Active",t))(he||{});let Ge="div",ke=V(function(n,t){let l=K(null),v=Z(l,t),c=`headlessui-radiogroup-option-${J()}`,[I,O]=X(),[E,M]=Y(),{addFlag:u,removeFlag:S,hasFlag:P}=le(1),{value:i,disabled:R=!1,..._}=n,f=K({value:i,disabled:R});j(()=>{f.current.value=i},[i,f]),j(()=>{f.current.disabled=R},[R,f]);let{registerOption:C,disabled:U,change:A,firstOption:h,containsCheckedOption:p,value:G,compare:D}=ee("RadioGroup.Option");j(()=>C({id:c,element:l,propsRef:f}),[c,C,l,n]);let F=b(r=>{var o;if(z(r.currentTarget))return r.preventDefault();!A(i)||(u(2),(o=l.current)==null||o.focus())}),T=b(r=>{if(z(r.currentTarget))return r.preventDefault();u(2)}),H=b(()=>S(2)),L=(h==null?void 0:h.id)===c,s=U||R,y=D(G,i),N={ref:v,id:c,role:"radio","aria-checked":y?"true":"false","aria-labelledby":I,"aria-describedby":E,"aria-disabled":s?!0:void 0,tabIndex:(()=>s?-1:y||!p&&L?0:-1)(),onClick:s?void 0:F,onFocus:s?void 0:T,onBlur:s?void 0:H},e=k(()=>({checked:y,disabled:s,active:P(2)}),[y,s,P]);return<M name="RadioGroup.Description"><O name="RadioGroup.Label">{$({ourProps:N,theirProps:_,slot:e,defaultTag:Ge,name:"RadioGroup.Option"})}</O></M>}),ot=Object.assign(Ae,{Option:ke,Label:pe,Description:se});export{ot as RadioGroup};
