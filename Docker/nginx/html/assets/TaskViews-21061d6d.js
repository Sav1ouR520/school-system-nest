import{d as h,aY as k,o as t,a as l,b as i,j as r,k as o,y as c,c as d,e as g,F as C,u as x,a3 as P,a_ as V,am as R,aZ as F,B as v,t as H,b1 as w}from"./index-249617c7.js";import{E as j}from"./el-scrollbar-82f68588.js";import{a as D,_ as M}from"./modifyTaskItem-bc58ed4f.js";import{E as S,a as U,b as G}from"./el-breadcrumb-item-539e22d1.js";import{c as L}from"./moment-176d9947.js";import{d as O}from"./filezip-5b0b7291.js";import"./el-progress-d3739031.js";const Y={flex:"","overflow-hidden":"","flex-grow":""},Z={"flex-grow":"","m-4":"","mt-0":"","rounded-xl":"","bg-white":""},q=h({__name:"taskMainItem",setup(b){const e=k();return(_,m)=>{const a=D,s=M,f=j;return t(),l("div",Y,[i("div",Z,[r(f,{"p-4":""},{default:o(()=>[c(e).type==="upload"?(t(),d(a,{key:0})):c(e).type==="modify"?(t(),d(s,{key:1})):g("",!0)]),_:1})])])}}}),z={"m-4":"","p-4":"","rounded-xl":"","bg-white":"","h-25":""},A=i("div",{flex:"","items-center":""},[i("span",{"font-bold":""},"群任务")],-1),J={flex:"","items-center":"","mr-1.5":"","h-8":""},K=h({__name:"taskHeaderItem",setup(b){const e=C(),_=()=>e.currentRoute.value.matched.slice(-2)[0].path,m=()=>e.currentRoute.value.matched.slice(-1)[0].path.split("/").slice(1),a=x(m()),s=x(_()),f=()=>e.push(s.value);P(e.currentRoute,()=>{s.value=_(),a.value=m()});const n=k(),y=V(),B=async()=>{O([n.id]).then(()=>{e.push("/main"),n.id="",n.type=null,y.update.type="group",y.update.time=n.time=new Date().valueOf(),w({message:"成功删除任务",type:"success"})}).catch(()=>w({message:"删除任务失败",type:"error"}))};return(W,p)=>{const E=S,I=U,$=L,N=G;return t(),l("div",z,[r(N,{onBack:p[1]||(p[1]=u=>f())},{breadcrumb:o(()=>[r(I,{separator:"/"},{default:o(()=>[(t(!0),l(R,null,F(c(a),(u,T)=>(t(),d(E,{key:T},{default:o(()=>[v(H(u[0].toUpperCase()+u.slice(1)),1)]),_:2},1024))),128))]),_:1})]),content:o(()=>[A]),extra:o(()=>[i("div",J,[c(n).type==="modify"?(t(),d($,{key:0,type:"danger",onClick:p[0]||(p[0]=u=>B())},{default:o(()=>[v("删除")]),_:1})):g("",!0)])]),_:1})])}}}),Q={key:0,flex:"","flex-col":"","flex-grow":""},re=h({__name:"TaskViews",setup(b){const e=k();return(_,m)=>{const a=K,s=q;return c(e).id!==""?(t(),l("div",Q,[r(a),r(s)])):g("",!0)}}});export{re as default};