(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[607],{35394:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/categoriesSearch",function(){return t(57748)}])},69359:function(e,a,t){"use strict";t.d(a,{v:function(){return BasicHeader}});var s=t(85893),n=t(94119),c=t(76718),r=t(41664),i=t.n(r),l=t(11163),o=t(67294),u=t(78759),h=t(82509),d=t(55293),_=t.n(d);let BasicHeader=e=>{let{user:a}=e,[t,r]=(0,o.useState)(""),[d,m]=(0,o.useState)(!0),[x,j]=(0,o.useState)(null),[B,N]=(0,o.useState)(null),[f,g]=(0,o.useState)(null),S=(0,l.useRouter)(),{value:v}=S.query,handleButtonClick=e=>{g(e)};(0,o.useEffect)(()=>{let e=(0,h.lh)(),a=(0,c.Aj)(e,async e=>{e?N(e.uid):N(null)});return()=>a()},[]);let fetchRecruit=async()=>{try{if(null!==B){let e=await u.x.fetchMyProfile.post({body:{Id:B}});console.log(e.body),j(e.body.name)}m(!1)}catch(e){m(!1)}};return((0,o.useEffect)(()=>{fetchRecruit()},[B]),d)?(0,s.jsx)("div",{className:_().loading,children:"ローディング中..."}):(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:_().container,children:[(0,s.jsxs)("div",{className:_().searchContainer,children:[(0,s.jsx)("input",{type:"text",className:_().searchInput,placeholder:"何のゲームをお探しですか？",value:t,onChange:e=>r(e.target.value)}),(0,s.jsx)("button",{className:_().searchButton,onClick:()=>{console.log("検索: ".concat(t))}})]}),(0,s.jsx)("div",{className:_().contheme2,children:null!==B?(0,s.jsxs)("div",{className:_().userSection8,children:[(0,s.jsx)(i(),{href:"/selectDm",children:(0,s.jsx)("div",{className:_().roomButton,children:(0,s.jsx)(n.Z,{style:{fontSize:"26px",color:"#000000",marginRight:"18px"}})})}),(0,s.jsx)(i(),{href:"/userProfile",children:(0,s.jsxs)("span",{className:_().userName,children:["ようこそ,",(0,s.jsx)("span",{className:_().userName2,children:x}),"さん"]})}),(0,s.jsx)(i(),{href:"/bosyuuDescription",children:(0,s.jsx)("button",{className:_().redButton,children:"募集"})})]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i(),{href:"/login",children:(0,s.jsx)("button",{className:_().kaninButton,children:"ログイン"})}),(0,s.jsx)(i(),{href:"/signUp",children:(0,s.jsx)("button",{className:_().loginButton,children:"会員登録"})}),(0,s.jsx)(i(),{href:"/signUp",children:(0,s.jsx)("button",{className:_().redButton,children:"コーチ登録"})})]})}),(0,s.jsxs)("div",{className:_().contheme,children:[(0,s.jsx)(i(),{href:"/",children:(0,s.jsx)("button",{className:(null==v?void 0:v.length)===0?_().selectedButton:_().button,onClick:()=>handleButtonClick("おすすめ"),children:"おすすめ"})}),(0,s.jsx)(i(),{href:"/recruit?value=1",children:(0,s.jsx)("button",{className:"1"===v?_().selectedButton:_().button,onClick:()=>handleButtonClick("VALORANT"),children:"VALORANT"})}),(0,s.jsx)(i(),{href:"/recruit?value=2",children:(0,s.jsx)("button",{className:_().button,children:"APEX"})}),(0,s.jsx)(i(),{href:"/recruit?value=3",children:(0,s.jsx)("button",{className:_().button,children:"LOL"})}),(0,s.jsx)("button",{className:_().button,children:"CSGO"}),(0,s.jsx)("button",{className:_().button,children:"COD 2"}),(0,s.jsx)("button",{className:_().button,children:"OverWatch2"}),(0,s.jsx)(i(),{href:"/allSearch",children:(0,s.jsx)("button",{className:_().button,children:"すべて見る"})})]})]})})}},57748:function(e,a,t){"use strict";t.r(a);var s=t(85893),n=t(76718),c=t(41664),r=t.n(c),i=t(11163),l=t(67294),o=t(78759),u=t(82509),h=t(69359),d=t(10207),_=t.n(d);a.default=()=>{let e=(0,i.useRouter)(),a=e.query.id,[t,c]=(0,l.useState)(null),[d,m]=(0,l.useState)({FPS:!1,CardGame:!1,RPG:!1,FightingGame:!1,SmartphoneGame:!1}),[x,j]=(0,l.useState)(1),[B,N]=(0,l.useState)([]);(0,l.useEffect)(()=>{let e=(0,u.lh)(),a=(0,n.Aj)(e,e=>{e?(console.log(e),c(e.uid)):c(null)});return()=>a()},[]);let fetchRecruitList=async()=>{try{if("string"==typeof a){let e=await o.x.fetchCategoriesRecruit.post({body:{Id:a}});N(e.body)}}catch(e){console.error("ゲームの取得に失敗しました:",e)}};(0,l.useEffect)(()=>{fetchRecruitList()},[]);let handleClick=a=>{e.push("../recruit?value=".concat(a))};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(h.v,{user:null!=t?t:void 0}),(0,s.jsxs)("div",{className:_().allContainer,children:[(0,s.jsxs)("div",{className:_().homeContainer,children:[(0,s.jsx)(r(),{href:"/",children:(0,s.jsx)("div",{className:_().home,children:"ホーム"})}),(0,s.jsx)("div",{className:_().home3,children:">"}),(0,s.jsx)("div",{className:_().home2,children:"ゲーム一覧"})]})," ",(0,s.jsx)("div",{className:_().allSearch1,children:(0,s.jsxs)("div",{className:_().allSearch,children:[(0,s.jsx)("h1",{className:_().title,children:"全ゲーム一覧"}),(0,s.jsxs)("div",{className:_().searchContainer,children:[(0,s.jsx)("div",{children:B.map(e=>(0,s.jsx)("div",{className:_().smallContainer,children:(0,s.jsx)("div",{onClick:()=>handleClick(e.id),children:e.title})},e.id))})," "]})]})})]})]})}},55293:function(e){e.exports={container:"BasicHeader_container__ASIaK",contheme:"BasicHeader_contheme__zTdPw",button:"BasicHeader_button__R08NF",contheme2:"BasicHeader_contheme2__RIUwH",kaninButton:"BasicHeader_kaninButton__CEv_8",loginButton:"BasicHeader_loginButton__n_4uq",redButton:"BasicHeader_redButton__R57u1",searchContainer:"BasicHeader_searchContainer__5csEn",searchInput:"BasicHeader_searchInput__HA9Ps",searchButton:"BasicHeader_searchButton__1KIkK",main:"BasicHeader_main__Vqufr",userBtn:"BasicHeader_userBtn__wlK48",userIcon:"BasicHeader_userIcon__UecGa",userContainer:"BasicHeader_userContainer__waGrV",userName:"BasicHeader_userName__KiR1h",userName2:"BasicHeader_userName2__ugag8",loading:"BasicHeader_loading__jW7n8",spin:"BasicHeader_spin__Mb5Hn",selectedButton:"BasicHeader_selectedButton__T8vja",userSection8:"BasicHeader_userSection8__L5ol4",iconblack:"BasicHeader_iconblack__lr8uA",roomButton:"BasicHeader_roomButton__fV8mf"}},10207:function(e){e.exports={allContainer:"categoriesSearch_allContainer___3Vmv",title:"categoriesSearch_title___oetF",allSearch1:"categoriesSearch_allSearch1__pI3wE",homeContainer:"categoriesSearch_homeContainer__5XN7v",home:"categoriesSearch_home__wWu1i",home2:"categoriesSearch_home2__hkIC6",home3:"categoriesSearch_home3__IFTLw",allSearch:"categoriesSearch_allSearch__F_zE1",searchContainer:"categoriesSearch_searchContainer__Ee7Ip",smallContainer:"categoriesSearch_smallContainer__jLIpV",aw:"categoriesSearch_aw__LG_21"}}},function(e){e.O(0,[664,119,774,888,179],function(){return e(e.s=35394)}),_N_E=e.O()}]);