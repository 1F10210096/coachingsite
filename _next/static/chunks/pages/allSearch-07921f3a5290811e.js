(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[711],{6285:function(e,a,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/allSearch",function(){return n(74067)}])},69359:function(e,a,n){"use strict";n.d(a,{v:function(){return BasicHeader}});var s=n(85893),l=n(94119),c=n(76718),t=n(41664),r=n.n(t),i=n(11163),h=n(67294),o=n(78759),d=n(82509),u=n(55293),_=n.n(u);let BasicHeader=e=>{let{user:a}=e,[n,t]=(0,h.useState)(""),[u,m]=(0,h.useState)(!0),[x,j]=(0,h.useState)(null),[C,N]=(0,h.useState)(null),[b,B]=(0,h.useState)(null),f=(0,i.useRouter)(),{value:S}=f.query,handleButtonClick=e=>{B(e)};(0,h.useEffect)(()=>{let e=(0,d.lh)(),a=(0,c.Aj)(e,async e=>{e?N(e.uid):N(null)});return()=>a()},[]);let fetchRecruit=async()=>{try{if(null!==C){let e=await o.x.fetchMyProfile.post({body:{Id:C}});console.log(e.body),j(e.body.name)}m(!1)}catch(e){m(!1)}};return((0,h.useEffect)(()=>{fetchRecruit()},[C]),u)?(0,s.jsx)("div",{className:_().loading,children:"ローディング中..."}):(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:_().container,children:[(0,s.jsxs)("div",{className:_().searchContainer,children:[(0,s.jsx)("input",{type:"text",className:_().searchInput,placeholder:"何のゲームをお探しですか？",value:n,onChange:e=>t(e.target.value)}),(0,s.jsx)("button",{className:_().searchButton,onClick:()=>{console.log("検索: ".concat(n))}})]}),(0,s.jsx)("div",{className:_().contheme2,children:null!==C?(0,s.jsxs)("div",{className:_().userSection8,children:[(0,s.jsx)(r(),{href:"/selectDm",children:(0,s.jsx)("div",{className:_().roomButton,children:(0,s.jsx)(l.Z,{style:{fontSize:"26px",color:"#000000",marginRight:"18px"}})})}),(0,s.jsx)(r(),{href:"/userProfile",children:(0,s.jsxs)("span",{className:_().userName,children:["ようこそ,",(0,s.jsx)("span",{className:_().userName2,children:x}),"さん"]})}),(0,s.jsx)(r(),{href:"/bosyuuDescription",children:(0,s.jsx)("button",{className:_().redButton,children:"募集"})})]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r(),{href:"/login",children:(0,s.jsx)("button",{className:_().kaninButton,children:"ログイン"})}),(0,s.jsx)(r(),{href:"/signUp",children:(0,s.jsx)("button",{className:_().loginButton,children:"会員登録"})}),(0,s.jsx)(r(),{href:"/signUp",children:(0,s.jsx)("button",{className:_().redButton,children:"コーチ登録"})})]})}),(0,s.jsxs)("div",{className:_().contheme,children:[(0,s.jsx)(r(),{href:"/",children:(0,s.jsx)("button",{className:(null==S?void 0:S.length)===0?_().selectedButton:_().button,onClick:()=>handleButtonClick("おすすめ"),children:"おすすめ"})}),(0,s.jsx)(r(),{href:"/recruit?value=1",children:(0,s.jsx)("button",{className:"1"===S?_().selectedButton:_().button,onClick:()=>handleButtonClick("VALORANT"),children:"VALORANT"})}),(0,s.jsx)(r(),{href:"/recruit?value=2",children:(0,s.jsx)("button",{className:_().button,children:"APEX"})}),(0,s.jsx)(r(),{href:"/recruit?value=3",children:(0,s.jsx)("button",{className:_().button,children:"LOL"})}),(0,s.jsx)("button",{className:_().button,children:"CSGO"}),(0,s.jsx)("button",{className:_().button,children:"COD 2"}),(0,s.jsx)("button",{className:_().button,children:"OverWatch2"}),(0,s.jsx)(r(),{href:"/allSearch",children:(0,s.jsx)("button",{className:_().button,children:"すべて見る"})})]})]})})}},74067:function(e,a,n){"use strict";n.r(a);var s=n(85893),l=n(76718),c=n(41664),t=n.n(c),r=n(11163),i=n(67294),h=n(82509),o=n(69359),d=n(78559),u=n.n(d);a.default=()=>{let e=(0,r.useRouter)(),[a,n]=(0,i.useState)(null),[c,d]=(0,i.useState)({FPS:!1,CardGame:!1,RPG:!1,FightingGame:!1,SmartphoneGame:!1});(0,i.useEffect)(()=>{let e=(0,h.lh)(),a=(0,l.Aj)(e,e=>{e?(console.log(e),n(e.uid)):n(null)});return()=>a()},[]);let handleCheckboxChange=a=>{let{name:n,checked:s}=a.target;d({...c,[n]:s}),e.push("../categoriesSearch?id=".concat(n))};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.v,{user:null!=a?a:void 0}),(0,s.jsxs)("div",{className:u().allContainer,children:[(0,s.jsxs)("div",{className:u().homeContainer,children:[(0,s.jsx)(t(),{href:"/",children:(0,s.jsx)("div",{className:u().home,children:"ホーム"})}),(0,s.jsx)("div",{className:u().home3,children:">"}),(0,s.jsx)("div",{className:u().home2,children:"ゲーム一覧"})]})," ",(0,s.jsx)("div",{className:u().allSearch1,children:(0,s.jsxs)("div",{className:u().allSearch,children:[(0,s.jsx)("h1",{className:u().title,children:"全ゲーム一覧"}),(0,s.jsxs)("div",{className:u().searchContainer,children:[(0,s.jsx)("div",{className:u().smallContainer,children:(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"checkbox",name:"FPS",checked:c.FPS,onChange:handleCheckboxChange}),"FPS"]})}),(0,s.jsx)("div",{className:u().smallContainer,children:(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"checkbox",name:"CardGame",checked:c.CardGame,onChange:handleCheckboxChange}),"カードゲーム"]})}),(0,s.jsx)("div",{className:u().smallContainer,children:(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"checkbox",name:"RPG",checked:c.RPG,onChange:handleCheckboxChange}),"RPG"]})}),(0,s.jsx)("div",{className:u().smallContainer,children:(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"checkbox",name:"FPS",checked:c.FightingGame,onChange:handleCheckboxChange}),"格闘ゲーム"]})}),(0,s.jsx)("div",{className:u().smallContainer,children:(0,s.jsxs)("label",{children:[(0,s.jsx)("input",{type:"checkbox",name:"FPS",checked:c.SmartphoneGame,onChange:handleCheckboxChange}),"スマホゲーム"]})})]})," "]})})]})]})}},55293:function(e){e.exports={container:"BasicHeader_container__ASIaK",contheme:"BasicHeader_contheme__zTdPw",button:"BasicHeader_button__R08NF",contheme2:"BasicHeader_contheme2__RIUwH",kaninButton:"BasicHeader_kaninButton__CEv_8",loginButton:"BasicHeader_loginButton__n_4uq",redButton:"BasicHeader_redButton__R57u1",searchContainer:"BasicHeader_searchContainer__5csEn",searchInput:"BasicHeader_searchInput__HA9Ps",searchButton:"BasicHeader_searchButton__1KIkK",main:"BasicHeader_main__Vqufr",userBtn:"BasicHeader_userBtn__wlK48",userIcon:"BasicHeader_userIcon__UecGa",userContainer:"BasicHeader_userContainer__waGrV",userName:"BasicHeader_userName__KiR1h",userName2:"BasicHeader_userName2__ugag8",loading:"BasicHeader_loading__jW7n8",spin:"BasicHeader_spin__Mb5Hn",selectedButton:"BasicHeader_selectedButton__T8vja",userSection8:"BasicHeader_userSection8__L5ol4",iconblack:"BasicHeader_iconblack__lr8uA",roomButton:"BasicHeader_roomButton__fV8mf"}},78559:function(e){e.exports={allContainer:"allSearch_allContainer__lPi8R",title:"allSearch_title__r_VAS",homeContainer:"allSearch_homeContainer__6TYUQ",home:"allSearch_home___y2Nf",home2:"allSearch_home2__tnf56",home3:"allSearch_home3__11B9k",allSearch1:"allSearch_allSearch1__5b1sv",allSearch:"allSearch_allSearch__sbbyt",searchContainer:"allSearch_searchContainer__leMFk",smallContainer:"allSearch_smallContainer__fG_nn",wa:"allSearch_wa___55Aq"}}},function(e){e.O(0,[664,119,774,888,179],function(){return e(e.s=6285)}),_N_E=e.O()}]);