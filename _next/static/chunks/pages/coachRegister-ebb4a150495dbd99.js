(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[530],{3455:function(e,a,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/coachRegister",function(){return n(45917)}])},45917:function(e,a,n){"use strict";n.r(a),n.d(a,{default:function(){return index_page}});var s=n(85893),l=n(76718),t=n(41664),i=n.n(t),c=n(67294),o=n(82509),r=n(15103),_=n(48583),g=n(29854);let h=(0,r.cn)(0),u=(0,r.cn)(e=>e(h)>0),useLoading=()=>{let[e,a]=(0,_.KO)(h),[n]=(0,_.KO)(u),l=(0,c.useCallback)(()=>a(e+1),[e,a]),t=(0,c.useCallback)(()=>a(e-1),[e,a]);return{loadingElm:(0,s.jsx)(g.g,{visible:n}),addLoading:l,removeLoading:t}};var d=n(6729),m=n.n(d),index_page=()=>{let{addLoading:e,removeLoading:a}=useLoading(),[n,t]=(0,c.useState)(""),[r,_]=(0,c.useState)("");(0,c.useEffect)(()=>{let e=(0,o.lh)(),a=(0,l.Aj)(e,e=>{e?console.log("Logged in as:",e.email):console.log("No user logged in")});return()=>a()},[]);let loginEmail=async e=>{try{e.preventDefault();let a=await (0,o.fZ)(n,r);console.log("アカウント作成成功:",a),alert("アカウント作成成功しました")}catch(e){console.error("アカウント作成失敗:",e),alert("アカウント作成失敗: ".concat(e))}};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:m().container}),(0,s.jsx)("div",{className:m().loginTitle,children:"ログイン"}),(0,s.jsx)(i(),{href:"/signUp",children:(0,s.jsx)("div",{className:m().kaninn,children:"会員登録はこちら"})}),(0,s.jsx)("div",{className:m().loginContainer,children:(0,s.jsxs)("form",{className:m().loginForm,children:[(0,s.jsx)("label",{htmlFor:"username",className:m().mail,children:"メール"}),(0,s.jsx)("input",{type:"text",className:m().searchmail,placeholder:"メールアドレスを入力してください",value:n,onChange:e=>{t(e.target.value)}}),(0,s.jsx)("label",{htmlFor:"password",className:m().password,children:"パスワード"}),(0,s.jsx)("input",{type:"text",className:m().searchpass,placeholder:"パスワードを入力してください",value:r,onChange:e=>{_(e.target.value)}}),(0,s.jsx)("button",{type:"submit",className:m().loginButton,onClick:loginEmail,children:"ログイン"})]})})]})}},6729:function(e){e.exports={loginContainer:"coachRegister_loginContainer__zqOzs",loginForm:"coachRegister_loginForm__7_qGX",loginButton:"coachRegister_loginButton___4vZS",container:"coachRegister_container__LVff2",loginTitle:"coachRegister_loginTitle__0HNpP",kaninn:"coachRegister_kaninn__gp_2e",searchmail:"coachRegister_searchmail__OTme9",searchInput:"coachRegister_searchInput__ttMVK",mail:"coachRegister_mail__AOd5d",password:"coachRegister_password__DIL6I",searchpass:"coachRegister_searchpass__Hj9af"}}},function(e){e.O(0,[664,774,888,179],function(){return e(e.s=3455)}),_N_E=e.O()}]);