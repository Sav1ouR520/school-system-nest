import{a1 as ke,Y as S,y as e,b1 as we,u as Q,by as $e,a9 as K,aa as b,d as O,af as I,bH as Se,bI as ue,aq as Ce,bJ as ce,bt as de,aD as Te,ac as te,o as h,a as C,f as v,b as N,n as A,l as L,t as H,e as k,c as _,k as P,an as Ee,ao as j,as as z,av as pe,ar as E,am as Fe,aZ as Le,A as fe,z as q,j as U,bK as Pe,bL as Re,bM as _e,aJ as De,aA as Ue,a2 as Ne,ag as G,bN as Oe,bO as Me,a3 as ae,ae as Be,aE as Ae,ay as je,a6 as Ie,bw as se,ap as oe}from"./index-3c1f20cf.js";import{t as ee,l as me,m as x,x as J,v as qe}from"./moment-a900c884.js";const ve=Symbol("uploadContextKey");var Ke={name:"en",el:{colorpicker:{confirm:"OK",clear:"Clear",defaultLabel:"color picker",description:"current color is {color}. press enter to select a new color."},datepicker:{now:"Now",today:"Today",cancel:"Cancel",clear:"Clear",confirm:"OK",dateTablePrompt:"Use the arrow keys and enter to select the day of the month",monthTablePrompt:"Use the arrow keys and enter to select the month",yearTablePrompt:"Use the arrow keys and enter to select the year",selectedDate:"Selected date",selectDate:"Select date",selectTime:"Select time",startDate:"Start Date",startTime:"Start Time",endDate:"End Date",endTime:"End Time",prevYear:"Previous Year",nextYear:"Next Year",prevMonth:"Previous Month",nextMonth:"Next Month",year:"",month1:"January",month2:"February",month3:"March",month4:"April",month5:"May",month6:"June",month7:"July",month8:"August",month9:"September",month10:"October",month11:"November",month12:"December",week:"week",weeks:{sun:"Sun",mon:"Mon",tue:"Tue",wed:"Wed",thu:"Thu",fri:"Fri",sat:"Sat"},weeksFull:{sun:"Sunday",mon:"Monday",tue:"Tuesday",wed:"Wednesday",thu:"Thursday",fri:"Friday",sat:"Saturday"},months:{jan:"Jan",feb:"Feb",mar:"Mar",apr:"Apr",may:"May",jun:"Jun",jul:"Jul",aug:"Aug",sep:"Sep",oct:"Oct",nov:"Nov",dec:"Dec"}},inputNumber:{decrease:"decrease number",increase:"increase number"},select:{loading:"Loading",noMatch:"No matching data",noData:"No data",placeholder:"Select"},dropdown:{toggleDropdown:"Toggle Dropdown"},cascader:{noMatch:"No matching data",loading:"Loading",placeholder:"Select",noData:"No data"},pagination:{goto:"Go to",pagesize:"/page",total:"Total {total}",pageClassifier:"",deprecationWarning:"Deprecated usages detected, please refer to the el-pagination documentation for more details"},dialog:{close:"Close this dialog"},drawer:{close:"Close this dialog"},messagebox:{title:"Message",confirm:"OK",cancel:"Cancel",error:"Illegal input",close:"Close this dialog"},upload:{deleteTip:"press delete to remove",delete:"Delete",preview:"Preview",continue:"Continue"},slider:{defaultLabel:"slider between {min} and {max}",defaultRangeStartLabel:"pick start value",defaultRangeEndLabel:"pick end value"},table:{emptyText:"No Data",confirmFilter:"Confirm",resetFilter:"Reset",clearFilter:"All",sumText:"Sum"},tree:{emptyText:"No Data"},transfer:{noMatch:"No matching data",noData:"No data",titles:["List 1","List 2"],filterPlaceholder:"Enter keyword",noCheckedFormat:"{total} items",hasCheckedFormat:"{checked}/{total} checked"},image:{error:"FAILED"},pageHeader:{title:"Back"},popconfirm:{confirmButtonText:"Yes",cancelButtonText:"No"}}};const We=t=>(a,o)=>ze(a,o,e(t)),ze=(t,a,o)=>$e(o,t,t).replace(/\{(\w+)\}/g,(n,f)=>{var d;return`${(d=a==null?void 0:a[f])!=null?d:`{${f}}`}`}),He=t=>{const a=S(()=>e(t).name),o=we(t)?t:Q(t);return{lang:a,locale:o,t:We(t)}},Je=()=>{const t=ke("locale");return He(S(()=>t.value||Ke))},Ye=K({type:{type:String,default:"line",values:["line","circle","dashboard"]},percentage:{type:Number,default:0,validator:t=>t>=0&&t<=100},status:{type:String,default:"",values:["","success","exception","warning"]},indeterminate:{type:Boolean,default:!1},duration:{type:Number,default:3},strokeWidth:{type:Number,default:6},strokeLinecap:{type:b(String),default:"round"},textInside:{type:Boolean,default:!1},width:{type:Number,default:126},showText:{type:Boolean,default:!0},color:{type:b([String,Array,Function]),default:""},format:{type:b(Function),default:t=>`${t}%`}}),Ve=["aria-valuenow"],Xe={viewBox:"0 0 100 100"},Ge=["d","stroke","stroke-width"],xe=["d","stroke","opacity","stroke-linecap","stroke-width"],Ze={key:0},Qe=O({name:"ElProgress"}),et=O({...Qe,props:Ye,setup(t){const a=t,o={success:"#13ce66",exception:"#ff4949",warning:"#e6a23c",default:"#20a0ff"},n=I("progress"),f=S(()=>({width:`${a.percentage}%`,animationDuration:`${a.duration}s`,backgroundColor:B(a.percentage)})),d=S(()=>(a.strokeWidth/a.width*100).toFixed(1)),m=S(()=>["circle","dashboard"].includes(a.type)?Number.parseInt(`${50-Number.parseFloat(d.value)/2}`,10):0),T=S(()=>{const l=m.value,R=a.type==="dashboard";return`
          M 50 50
          m 0 ${R?"":"-"}${l}
          a ${l} ${l} 0 1 1 0 ${R?"-":""}${l*2}
          a ${l} ${l} 0 1 1 0 ${R?"":"-"}${l*2}
          `}),w=S(()=>2*Math.PI*m.value),c=S(()=>a.type==="dashboard"?.75:1),$=S(()=>`${-1*w.value*(1-c.value)/2}px`),y=S(()=>({strokeDasharray:`${w.value*c.value}px, ${w.value}px`,strokeDashoffset:$.value})),r=S(()=>({strokeDasharray:`${w.value*c.value*(a.percentage/100)}px, ${w.value}px`,strokeDashoffset:$.value,transition:"stroke-dasharray 0.6s ease 0s, stroke 0.6s ease, opacity ease 0.6s"})),u=S(()=>{let l;return a.color?l=B(a.percentage):l=o[a.status]||o.default,l}),s=S(()=>a.status==="warning"?Se:a.type==="line"?a.status==="success"?ue:Ce:a.status==="success"?ce:de),p=S(()=>a.type==="line"?12+a.strokeWidth*.4:a.width*.111111+2),g=S(()=>a.format(a.percentage));function i(l){const R=100/l.length;return l.map((F,M)=>te(F)?{color:F,percentage:(M+1)*R}:F).sort((F,M)=>F.percentage-M.percentage)}const B=l=>{var R;const{color:D}=a;if(Te(D))return D(l);if(te(D))return D;{const F=i(D);for(const M of F)if(M.percentage>l)return M.color;return(R=F[F.length-1])==null?void 0:R.color}};return(l,R)=>(h(),C("div",{class:v([e(n).b(),e(n).m(l.type),e(n).is(l.status),{[e(n).m("without-text")]:!l.showText,[e(n).m("text-inside")]:l.textInside}]),role:"progressbar","aria-valuenow":l.percentage,"aria-valuemin":"0","aria-valuemax":"100"},[l.type==="line"?(h(),C("div",{key:0,class:v(e(n).b("bar"))},[N("div",{class:v(e(n).be("bar","outer")),style:A({height:`${l.strokeWidth}px`})},[N("div",{class:v([e(n).be("bar","inner"),{[e(n).bem("bar","inner","indeterminate")]:l.indeterminate}]),style:A(e(f))},[(l.showText||l.$slots.default)&&l.textInside?(h(),C("div",{key:0,class:v(e(n).be("bar","innerText"))},[L(l.$slots,"default",{percentage:l.percentage},()=>[N("span",null,H(e(g)),1)])],2)):k("v-if",!0)],6)],6)],2)):(h(),C("div",{key:1,class:v(e(n).b("circle")),style:A({height:`${l.width}px`,width:`${l.width}px`})},[(h(),C("svg",Xe,[N("path",{class:v(e(n).be("circle","track")),d:e(T),stroke:`var(${e(n).cssVarName("fill-color-light")}, #e5e9f2)`,"stroke-width":e(d),fill:"none",style:A(e(y))},null,14,Ge),N("path",{class:v(e(n).be("circle","path")),d:e(T),stroke:e(u),fill:"none",opacity:l.percentage?1:0,"stroke-linecap":l.strokeLinecap,"stroke-width":e(d),style:A(e(r))},null,14,xe)]))],6)),(l.showText||l.$slots.default)&&!l.textInside?(h(),C("div",{key:2,class:v(e(n).e("text")),style:A({fontSize:`${e(p)}px`})},[L(l.$slots,"default",{percentage:l.percentage},()=>[l.status?(h(),_(e(j),{key:1},{default:P(()=>[(h(),_(Ee(e(s))))]),_:1})):(h(),C("span",Ze,H(e(g)),1))])],6)):k("v-if",!0)],10,Ve))}});var tt=z(et,[["__file","/home/runner/work/element-plus/element-plus/packages/components/progress/src/progress.vue"]]);const at=pe(tt),st="ElUpload";class ot extends Error{constructor(a,o,n,f){super(a),this.name="UploadAjaxError",this.status=o,this.method=n,this.url=f}}function ne(t,a,o){let n;return o.response?n=`${o.response.error||o.response}`:o.responseText?n=`${o.responseText}`:n=`fail to ${a.method} ${t} ${o.status}`,new ot(n,o.status,a.method,t)}function nt(t){const a=t.responseText||t.response;if(!a)return a;try{return JSON.parse(a)}catch{return a}}const rt=t=>{typeof XMLHttpRequest>"u"&&ee(st,"XMLHttpRequest is undefined");const a=new XMLHttpRequest,o=t.action;a.upload&&a.upload.addEventListener("progress",d=>{const m=d;m.percent=d.total>0?d.loaded/d.total*100:0,t.onProgress(m)});const n=new FormData;if(t.data)for(const[d,m]of Object.entries(t.data))Array.isArray(m)?n.append(d,...m):n.append(d,m);n.append(t.filename,t.file,t.file.name),a.addEventListener("error",()=>{t.onError(ne(o,t,a))}),a.addEventListener("load",()=>{if(a.status<200||a.status>=300)return t.onError(ne(o,t,a));t.onSuccess(nt(a))}),a.open(t.method,o,!0),t.withCredentials&&"withCredentials"in a&&(a.withCredentials=!0);const f=t.headers||{};if(f instanceof Headers)f.forEach((d,m)=>a.setRequestHeader(m,d));else for(const[d,m]of Object.entries(f))me(m)||a.setRequestHeader(d,String(m));return a.send(n),a},he=["text","picture","picture-card"];let lt=1;const Z=()=>Date.now()+lt++,ye=K({action:{type:String,default:"#"},headers:{type:b(Object)},method:{type:String,default:"post"},data:{type:Object,default:()=>x({})},multiple:{type:Boolean,default:!1},name:{type:String,default:"file"},drag:{type:Boolean,default:!1},withCredentials:Boolean,showFileList:{type:Boolean,default:!0},accept:{type:String,default:""},type:{type:String,default:"select"},fileList:{type:b(Array),default:()=>x([])},autoUpload:{type:Boolean,default:!0},listType:{type:String,values:he,default:"text"},httpRequest:{type:b(Function),default:rt},disabled:Boolean,limit:Number}),it=K({...ye,beforeUpload:{type:b(Function),default:E},beforeRemove:{type:b(Function)},onRemove:{type:b(Function),default:E},onChange:{type:b(Function),default:E},onPreview:{type:b(Function),default:E},onSuccess:{type:b(Function),default:E},onProgress:{type:b(Function),default:E},onError:{type:b(Function),default:E},onExceed:{type:b(Function),default:E}}),ut=K({files:{type:b(Array),default:()=>x([])},disabled:{type:Boolean,default:!1},handlePreview:{type:b(Function),default:E},listType:{type:String,values:he,default:"text"}}),ct={remove:t=>!!t},dt=["onKeydown"],pt=["src"],ft=["onClick"],mt=["onClick"],vt=["onClick"],ht=O({name:"ElUploadList"}),yt=O({...ht,props:ut,emits:ct,setup(t,{emit:a}){const{t:o}=Je(),n=I("upload"),f=I("icon"),d=I("list"),m=J(),T=Q(!1),w=c=>{a("remove",c)};return(c,$)=>(h(),_(De,{tag:"ul",class:v([e(n).b("list"),e(n).bm("list",c.listType),e(n).is("disabled",e(m))]),name:e(d).b()},{default:P(()=>[(h(!0),C(Fe,null,Le(c.files,y=>(h(),C("li",{key:y.uid||y.name,class:v([e(n).be("list","item"),e(n).is(y.status),{focusing:T.value}]),tabindex:"0",onKeydown:fe(r=>!e(m)&&w(y),["delete"]),onFocus:$[0]||($[0]=r=>T.value=!0),onBlur:$[1]||($[1]=r=>T.value=!1),onClick:$[2]||($[2]=r=>T.value=!1)},[L(c.$slots,"default",{file:y},()=>[c.listType==="picture"||y.status!=="uploading"&&c.listType==="picture-card"?(h(),C("img",{key:0,class:v(e(n).be("list","item-thumbnail")),src:y.url,alt:""},null,10,pt)):k("v-if",!0),y.status==="uploading"||c.listType!=="picture-card"?(h(),C("div",{key:1,class:v(e(n).be("list","item-info"))},[N("a",{class:v(e(n).be("list","item-name")),onClick:q(r=>c.handlePreview(y),["prevent"])},[U(e(j),{class:v(e(f).m("document"))},{default:P(()=>[U(e(Pe))]),_:1},8,["class"]),N("span",{class:v(e(n).be("list","item-file-name"))},H(y.name),3)],10,ft),y.status==="uploading"?(h(),_(e(at),{key:0,type:c.listType==="picture-card"?"circle":"line","stroke-width":c.listType==="picture-card"?6:2,percentage:Number(y.percentage),style:A(c.listType==="picture-card"?"":"margin-top: 0.5rem")},null,8,["type","stroke-width","percentage","style"])):k("v-if",!0)],2)):k("v-if",!0),N("label",{class:v(e(n).be("list","item-status-label"))},[c.listType==="text"?(h(),_(e(j),{key:0,class:v([e(f).m("upload-success"),e(f).m("circle-check")])},{default:P(()=>[U(e(ue))]),_:1},8,["class"])):["picture-card","picture"].includes(c.listType)?(h(),_(e(j),{key:1,class:v([e(f).m("upload-success"),e(f).m("check")])},{default:P(()=>[U(e(ce))]),_:1},8,["class"])):k("v-if",!0)],2),e(m)?k("v-if",!0):(h(),_(e(j),{key:2,class:v(e(f).m("close")),onClick:r=>w(y)},{default:P(()=>[U(e(de))]),_:2},1032,["class","onClick"])),k(" Due to close btn only appears when li gets focused disappears after li gets blurred, thus keyboard navigation can never reach close btn"),k(" This is a bug which needs to be fixed "),k(" TODO: Fix the incorrect navigation interaction "),e(m)?k("v-if",!0):(h(),C("i",{key:3,class:v(e(f).m("close-tip"))},H(e(o)("el.upload.deleteTip")),3)),c.listType==="picture-card"?(h(),C("span",{key:4,class:v(e(n).be("list","item-actions"))},[N("span",{class:v(e(n).be("list","item-preview")),onClick:r=>c.handlePreview(y)},[U(e(j),{class:v(e(f).m("zoom-in"))},{default:P(()=>[U(e(Re))]),_:1},8,["class"])],10,mt),e(m)?k("v-if",!0):(h(),C("span",{key:0,class:v(e(n).be("list","item-delete")),onClick:r=>w(y)},[U(e(j),{class:v(e(f).m("delete"))},{default:P(()=>[U(e(_e))]),_:1},8,["class"])],10,vt))],2)):k("v-if",!0)])],42,dt))),128)),L(c.$slots,"append")]),_:3},8,["class","name"]))}});var re=z(yt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/upload/src/upload-list.vue"]]);const gt=K({disabled:{type:Boolean,default:!1}}),bt={file:t=>Ue(t)},kt=["onDrop","onDragover"],ge="ElUploadDrag",wt=O({name:ge}),$t=O({...wt,props:gt,emits:bt,setup(t,{emit:a}){const o=Ne(ve);o||ee(ge,"usage: <el-upload><el-upload-dragger /></el-upload>");const n=I("upload"),f=Q(!1),d=J(),m=w=>{if(d.value)return;f.value=!1;const c=Array.from(w.dataTransfer.files),$=o.accept.value;if(!$){a("file",c);return}const y=c.filter(r=>{const{type:u,name:s}=r,p=s.includes(".")?`.${s.split(".").pop()}`:"",g=u.replace(/\/.*$/,"");return $.split(",").map(i=>i.trim()).filter(i=>i).some(i=>i.startsWith(".")?p===i:/\/\*$/.test(i)?g===i.replace(/\/\*$/,""):/^[^/]+\/[^/]+$/.test(i)?u===i:!1)});a("file",y)},T=()=>{d.value||(f.value=!0)};return(w,c)=>(h(),C("div",{class:v([e(n).b("dragger"),e(n).is("dragover",f.value)]),onDrop:q(m,["prevent"]),onDragover:q(T,["prevent"]),onDragleave:c[0]||(c[0]=q($=>f.value=!1,["prevent"]))},[L(w.$slots,"default")],42,kt))}});var St=z($t,[["__file","/home/runner/work/element-plus/element-plus/packages/components/upload/src/upload-dragger.vue"]]);const Ct=K({...ye,beforeUpload:{type:b(Function),default:E},onRemove:{type:b(Function),default:E},onStart:{type:b(Function),default:E},onSuccess:{type:b(Function),default:E},onProgress:{type:b(Function),default:E},onError:{type:b(Function),default:E},onExceed:{type:b(Function),default:E}}),Tt=["onKeydown"],Et=["name","multiple","accept"],Ft=O({name:"ElUploadContent",inheritAttrs:!1}),Lt=O({...Ft,props:Ct,setup(t,{expose:a}){const o=t,n=I("upload"),f=J(),d=G({}),m=G(),T=s=>{if(s.length===0)return;const{autoUpload:p,limit:g,fileList:i,multiple:B,onStart:l,onExceed:R}=o;if(g&&i.length+s.length>g){R(s,i);return}B||(s=s.slice(0,1));for(const D of s){const F=D;F.uid=Z(),l(F),p&&w(F)}},w=async s=>{if(m.value.value="",!o.beforeUpload)return c(s);let p;try{p=await o.beforeUpload(s)}catch{p=!1}if(p===!1){o.onRemove(s);return}let g=s;p instanceof Blob&&(p instanceof File?g=p:g=new File([p],s.name,{type:s.type})),c(Object.assign(g,{uid:s.uid}))},c=s=>{const{headers:p,data:g,method:i,withCredentials:B,name:l,action:R,onProgress:D,onSuccess:F,onError:M,httpRequest:be}=o,{uid:Y}=s,V={headers:p||{},withCredentials:B,file:s,data:g,method:i,filename:l,action:R,onProgress:W=>{D(W,s)},onSuccess:W=>{F(W,s),delete d.value[Y]},onError:W=>{M(W,s),delete d.value[Y]}},X=be(V);d.value[Y]=X,X instanceof Promise&&X.then(V.onSuccess,V.onError)},$=s=>{const p=s.target.files;p&&T(Array.from(p))},y=()=>{f.value||(m.value.value="",m.value.click())},r=()=>{y()};return a({abort:s=>{Oe(d.value).filter(s?([g])=>String(s.uid)===g:()=>!0).forEach(([g,i])=>{i instanceof XMLHttpRequest&&i.abort(),delete d.value[g]})},upload:w}),(s,p)=>(h(),C("div",{class:v([e(n).b(),e(n).m(s.listType),e(n).is("drag",s.drag)]),tabindex:"0",onClick:y,onKeydown:fe(q(r,["self"]),["enter","space"])},[s.drag?(h(),_(St,{key:0,disabled:e(f),onFile:T},{default:P(()=>[L(s.$slots,"default")]),_:3},8,["disabled"])):L(s.$slots,"default",{key:1}),N("input",{ref_key:"inputRef",ref:m,class:v(e(n).e("input")),name:s.name,multiple:s.multiple,accept:s.accept,type:"file",onChange:$,onClick:p[0]||(p[0]=q(()=>{},["stop"]))},null,42,Et)],42,Tt))}});var le=z(Lt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/upload/src/upload-content.vue"]]);const ie="ElUpload",Pt=t=>{var a;(a=t.url)!=null&&a.startsWith("blob:")&&URL.revokeObjectURL(t.url)},Rt=(t,a)=>{const o=Me(t,"fileList",void 0,{passive:!0}),n=r=>o.value.find(u=>u.uid===r.uid);function f(r){var u;(u=a.value)==null||u.abort(r)}function d(r=["ready","uploading","success","fail"]){o.value=o.value.filter(u=>!r.includes(u.status))}const m=(r,u)=>{const s=n(u);s&&(console.error(r),s.status="fail",o.value.splice(o.value.indexOf(s),1),t.onError(r,s,o.value),t.onChange(s,o.value))},T=(r,u)=>{const s=n(u);s&&(t.onProgress(r,s,o.value),s.status="uploading",s.percentage=Math.round(r.percent))},w=(r,u)=>{const s=n(u);s&&(s.status="success",s.response=r,t.onSuccess(r,s,o.value),t.onChange(s,o.value))},c=r=>{me(r.uid)&&(r.uid=Z());const u={name:r.name,percentage:0,status:"ready",size:r.size,raw:r,uid:r.uid};if(t.listType==="picture-card"||t.listType==="picture")try{u.url=URL.createObjectURL(r)}catch(s){qe(ie,s.message),t.onError(s,u,o.value)}o.value=[...o.value,u],t.onChange(u,o.value)},$=async r=>{const u=r instanceof File?n(r):r;u||ee(ie,"file to be removed not found");const s=p=>{f(p);const g=o.value;g.splice(g.indexOf(p),1),t.onRemove(p,g),Pt(p)};t.beforeRemove?await t.beforeRemove(u,o.value)!==!1&&s(u):s(u)};function y(){o.value.filter(({status:r})=>r==="ready").forEach(({raw:r})=>{var u;return r&&((u=a.value)==null?void 0:u.upload(r))})}return ae(()=>t.listType,r=>{r!=="picture-card"&&r!=="picture"||(o.value=o.value.map(u=>{const{raw:s,url:p}=u;if(!p&&s)try{u.url=URL.createObjectURL(s)}catch(g){t.onError(g,u,o.value)}return u}))}),ae(o,r=>{for(const u of r)u.uid||(u.uid=Z()),u.status||(u.status="success")},{immediate:!0,deep:!0}),{uploadFiles:o,abort:f,clearFiles:d,handleError:m,handleProgress:T,handleStart:c,handleSuccess:w,handleRemove:$,submit:y}},_t=O({name:"ElUpload"}),Dt=O({..._t,props:it,setup(t,{expose:a}){const o=t,n=Be(),f=J(),d=G(),{abort:m,submit:T,clearFiles:w,uploadFiles:c,handleStart:$,handleError:y,handleRemove:r,handleSuccess:u,handleProgress:s}=Rt(o,d),p=S(()=>o.listType==="picture-card"),g=S(()=>({...o,fileList:c.value,onStart:$,onProgress:s,onSuccess:u,onError:y,onRemove:r}));return Ae(()=>{c.value.forEach(({url:i})=>{i!=null&&i.startsWith("blob:")&&URL.revokeObjectURL(i)})}),je(ve,{accept:Ie(o,"accept")}),a({abort:m,submit:T,clearFiles:w,handleStart:$,handleRemove:r}),(i,B)=>(h(),C("div",null,[e(p)&&i.showFileList?(h(),_(re,{key:0,disabled:e(f),"list-type":i.listType,files:e(c),"handle-preview":i.onPreview,onRemove:e(r)},se({append:P(()=>[U(le,oe({ref_key:"uploadRef",ref:d},e(g)),{default:P(()=>[e(n).trigger?L(i.$slots,"trigger",{key:0}):k("v-if",!0),!e(n).trigger&&e(n).default?L(i.$slots,"default",{key:1}):k("v-if",!0)]),_:3},16)]),_:2},[i.$slots.file?{name:"default",fn:P(({file:l})=>[L(i.$slots,"file",{file:l})])}:void 0]),1032,["disabled","list-type","files","handle-preview","onRemove"])):k("v-if",!0),!e(p)||e(p)&&!i.showFileList?(h(),_(le,oe({key:1,ref_key:"uploadRef",ref:d},e(g)),{default:P(()=>[e(n).trigger?L(i.$slots,"trigger",{key:0}):k("v-if",!0),!e(n).trigger&&e(n).default?L(i.$slots,"default",{key:1}):k("v-if",!0)]),_:3},16)):k("v-if",!0),i.$slots.trigger?L(i.$slots,"default",{key:2}):k("v-if",!0),L(i.$slots,"tip"),!e(p)&&i.showFileList?(h(),_(re,{key:3,disabled:e(f),"list-type":i.listType,files:e(c),"handle-preview":i.onPreview,onRemove:e(r)},se({_:2},[i.$slots.file?{name:"default",fn:P(({file:l})=>[L(i.$slots,"file",{file:l})])}:void 0]),1032,["disabled","list-type","files","handle-preview","onRemove"])):k("v-if",!0)]))}});var Ut=z(Dt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/upload/src/upload.vue"]]);const Mt=pe(Ut);export{Mt as E,Z as g,Je as u};