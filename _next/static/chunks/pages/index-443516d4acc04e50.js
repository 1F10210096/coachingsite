(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{89208:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(62052)}])},69359:function(e,a,t){"use strict";t.d(a,{v:function(){return BasicHeader}});var n=t(85893),i=t(94119),s=t(76718),r=t(41664),c=t.n(r),l=t(11163),o=t(67294),d=t(78759),_=t(82509),u=t(55293),h=t.n(u);let BasicHeader=e=>{let{user:a}=e,[t,r]=(0,o.useState)(""),[u,m]=(0,o.useState)(!0),[x,j]=(0,o.useState)(null),[g,N]=(0,o.useState)(null),[f,p]=(0,o.useState)(null),v=(0,l.useRouter)(),{value:B}=v.query,handleButtonClick=e=>{p(e)};(0,o.useEffect)(()=>{let e=(0,_.lh)(),a=(0,s.Aj)(e,async e=>{e&&e.emailVerified?(await d.x.createUser.post({body:{userId:e.uid,userName:e.displayName||"匿名ユーザー"}}),N(e.uid)):N(null)});return()=>a()},[]);let fetchRecruit=async()=>{try{if(m(!0),null!==g){let e=await d.x.fetchMyProfile.post({body:{Id:g}});console.log(e.body),j(e.body.name)}m(!1)}catch(e){m(!1)}};return((0,o.useEffect)(()=>{fetchRecruit()},[g]),u)?(0,n.jsx)("div",{className:h().loading,children:"ローディング中..."}):(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:h().container,children:[(0,n.jsxs)("div",{className:h().searchContainer,children:[(0,n.jsx)("input",{type:"text",className:h().searchInput,placeholder:"何のゲームをお探しですか？",value:t,onChange:e=>r(e.target.value)}),(0,n.jsx)("button",{className:h().searchButton,onClick:()=>{console.log("検索: ".concat(t))}})]}),(0,n.jsx)("div",{className:h().contheme2,children:null!==g?(0,n.jsxs)("div",{className:h().userSection8,children:[(0,n.jsx)(c(),{href:"/selectDm",children:(0,n.jsx)("div",{className:h().roomButton,children:(0,n.jsx)(i.Z,{style:{fontSize:"26px",color:"#000000",marginRight:"18px"}})})}),(0,n.jsx)(c(),{href:"/userProfile",children:(0,n.jsxs)("span",{className:h().userName,children:["ようこそ,",(0,n.jsx)("span",{className:h().userName2,children:x}),"さん"]})}),(0,n.jsx)(c(),{href:"/bosyuuDescription",children:(0,n.jsx)("button",{className:h().redButton,children:"募集"})})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(c(),{href:"/login",children:(0,n.jsx)("button",{className:h().kaninButton,children:"ログイン"})}),(0,n.jsx)(c(),{href:"/signUp",children:(0,n.jsx)("button",{className:h().loginButton,children:"会員登録"})}),(0,n.jsx)(c(),{href:"/signUp",children:(0,n.jsx)("button",{className:h().redButton,children:"コーチ登録"})})]})}),(0,n.jsxs)("div",{className:h().contheme,children:[(0,n.jsx)(c(),{href:"/",children:(0,n.jsx)("button",{className:(null==B?void 0:B.length)===0?h().selectedButton:h().button,onClick:()=>handleButtonClick("おすすめ"),children:"おすすめ"})}),(0,n.jsx)(c(),{href:"/recruit?value=1",children:(0,n.jsx)("button",{className:"1"===B?h().selectedButton:h().button,onClick:()=>handleButtonClick("VALORANT"),children:"VALORANT"})}),(0,n.jsx)(c(),{href:"/recruit?value=2",children:(0,n.jsx)("button",{className:h().button,children:"APEX"})}),(0,n.jsx)(c(),{href:"/recruit?value=3",children:(0,n.jsx)("button",{className:h().button,children:"LOL"})}),(0,n.jsx)("button",{className:h().button,children:"CSGO"}),(0,n.jsx)("button",{className:h().button,children:"COD 2"}),(0,n.jsx)("button",{className:h().button,children:"OverWatch2"}),(0,n.jsx)(c(),{href:"/allSearch",children:(0,n.jsx)("button",{className:h().button,children:"すべて見る"})})]})]})})}},62052:function(e,a,t){"use strict";t.r(a);var n=t(85893),i=t(76718),s=t(41664),r=t.n(s),c=t(67294),l=t(69359),o=t(78759),d=t(82509),_=t(52745),u=t(28535),h=t.n(u);a.default=()=>{let[e,a]=(0,c.useState)(""),[t,s]=(0,c.useState)([]),fetchGames=async()=>{try{let e=await o.x.fetchGames.post();s(e.body),console.log(e.body)}catch(e){console.error("ゲームの取得に失敗しました:",e)}};(0,c.useEffect)(()=>{fetchGames()},[]);let[u,m]=(0,c.useState)([]),fetchUsers=async()=>{try{let e=await o.x.fetchUsers.post();m(e.body),console.log(e.body)}catch(e){console.error("ゲームの取得に失敗しました:",e)}};(0,c.useEffect)(()=>{fetchUsers()},[]);let[x,j]=(0,c.useState)();(0,c.useEffect)(()=>{let e=(0,d.lh)(),t=(0,i.Aj)(e,e=>{e?(console.log(e),a(e.uid)):console.log("ユーザーがログインしていません")});return()=>t()},[]);let calculateRateWidth=e=>(console.log(30*e),30*e),[g,N]=(0,c.useState)([]),fetchRecruit=async()=>{try{let e=await o.x.fetchRecritList.post();N(e.body),console.log(e.body)}catch(e){console.error("ゲームの取得に失敗しました:",e)}};return(0,c.useEffect)(()=>{fetchRecruit()},[]),(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:h().allContainer1,children:[(0,n.jsx)(l.v,{user:x}),(0,n.jsxs)("div",{className:h().allContainer,children:[(0,n.jsxs)("div",{className:h().container,children:[(0,n.jsx)("div",{className:h().coachTitle,children:"人気のゲーム"}),(0,n.jsx)(r(),{href:"/allSearch",children:(0,n.jsxs)("div",{className:h().blueTitle,children:["全て見る ",">"]})}),(0,n.jsx)("div",{className:h().gameList,children:t.map((e,a)=>(0,n.jsx)(r(),{href:{pathname:"/recruit",query:{value:e.id}},children:(0,n.jsxs)("div",{className:h().gameItem,children:[(0,n.jsx)("img",{className:h().gameIconContainer,src:"/gameLists/".concat((0,_.Z)(e.id)),alt:"Rank: ".concat(e.title)},a),(0,n.jsx)("div",{className:h().gameTitle,children:e.title})]},e.id)},e.id))}),(0,n.jsx)("div",{className:h().divide,children:" "})]}),(0,n.jsxs)("div",{className:h().coachContainer,children:[(0,n.jsx)("div",{className:h().coachTitle2,children:"人気のコーチ"}),(0,n.jsx)("div",{className:h().userList,children:u.map(e=>(0,n.jsx)(r(),{href:{pathname:"/userRecruit",query:{name:e.name,rating:e.rating,profile:e.myProfile}},children:(0,n.jsxs)("div",{className:h().userSummary,children:[(0,n.jsx)("img",{src:e.imageUrl,alt:e.name,className:h().userImage}),(0,n.jsxs)("span",{className:h().rate,children:["★★★★★",(0,n.jsx)("span",{className:h().rateInner,style:{width:"".concat(calculateRateWidth(e.rating),"px")},children:"★★★★★"})]}),(0,n.jsx)("div",{className:h().userName,children:e.name}),(0,n.jsx)("div",{className:h().myProfile,children:e.myProfile})]},e.name)},e.name))}),(0,n.jsx)("div",{className:h().divide2,children:" "})]}),(0,n.jsxs)("div",{className:h().recruitContainer,children:[(0,n.jsx)("div",{className:h().recruitListTitle,children:"人気の募集"}),(0,n.jsxs)("div",{className:h().blueTitle2,children:["全て見る ",">"]}),(0,n.jsx)("div",{className:h().recruitList,children:g.map((e,a)=>(0,n.jsxs)("div",{className:h().recruitSummary,children:[(0,n.jsx)("div",{className:h().recruitListImage,children:(0,n.jsx)("img",{className:h().gameIconContainer2,src:"/gameLists2/".concat((0,_.Z)(e.gameId)),alt:"Rank: ".concat(e.title)},a)}),(0,n.jsx)("h3",{className:h().recruitDetailTitle,children:e.title}),(0,n.jsx)("div",{className:h().recruitContainer1,children:e.tag.map((e,a)=>(0,n.jsx)("button",{className:h().lessonType,children:e},a))}),(0,n.jsx)("div",{className:h().r6,children:"詳細情報"}),(0,n.jsx)("p",{className:h().recruitDetail,children:e.description})]},e.id))})]})]})]})})}},52745:function(e,a){"use strict";let t={1:"valorant.png",2:"apex.png",3:"lol.png",4:"csgo.png",5:"overwatch2.png",6:"fortnite.png"};a.Z=e=>(console.log(t[e]),t[e]||"default.png")},55293:function(e){e.exports={container:"BasicHeader_container__ASIaK",contheme:"BasicHeader_contheme__zTdPw",button:"BasicHeader_button__R08NF",contheme2:"BasicHeader_contheme2__RIUwH",kaninButton:"BasicHeader_kaninButton__CEv_8",loginButton:"BasicHeader_loginButton__n_4uq",redButton:"BasicHeader_redButton__R57u1",searchContainer:"BasicHeader_searchContainer__5csEn",searchInput:"BasicHeader_searchInput__HA9Ps",searchButton:"BasicHeader_searchButton__1KIkK",main:"BasicHeader_main__Vqufr",userBtn:"BasicHeader_userBtn__wlK48",userIcon:"BasicHeader_userIcon__UecGa",userContainer:"BasicHeader_userContainer__waGrV",userName:"BasicHeader_userName__KiR1h",userName2:"BasicHeader_userName2__ugag8",loading:"BasicHeader_loading__jW7n8",spin:"BasicHeader_spin__Mb5Hn",selectedButton:"BasicHeader_selectedButton__T8vja",userSection8:"BasicHeader_userSection8__L5ol4",iconblack:"BasicHeader_iconblack__lr8uA",roomButton:"BasicHeader_roomButton__fV8mf"}},28535:function(e){e.exports={title:"index_title__k0g7D",tasks:"index_tasks__ExTXY",container:"index_container___q52_",gameTitle:"index_gameTitle__nb4GW",coachTitle:"index_coachTitle__nGwif",coachTitle2:"index_coachTitle2__1Tgsc",coach:"index_coach__hd9W4",deleteBtn:"index_deleteBtn__wZo2L",gameList:"index_gameList__CdJ77",gameItem:"index_gameItem__xaRYo",gameTitle2:"index_gameTitle2__guuV9",gameIconContainer:"index_gameIconContainer__I2sU_",gameIcon:"index_gameIcon__lCSZ_",container3:"index_container3__koeiu",userSummary:"index_userSummary__UPzvZ",userImage:"index_userImage__19qBf",userName:"index_userName__fEfmk",myProfile:"index_myProfile__7vOSh",userList:"index_userList__B9qjD",allContainer:"index_allContainer__AJQn6",rate:"index_rate__3nw8F",rateInner:"index_rateInner__1IQ_A",coachContainer:"index_coachContainer__ey8QU",recruitContainer:"index_recruitContainer__jSOxB",recruitListTitle:"index_recruitListTitle___XNZS",recruitList:"index_recruitList__s1ho0",recruitSummary:"index_recruitSummary__rcjLt",recruitListImage:"index_recruitListImage__1dhK7",recruitDetailTitle:"index_recruitDetailTitle__R1ACy",gameIconContainer2:"index_gameIconContainer2__Ldl6e",divide:"index_divide__1YR2c",divide2:"index_divide2__HiYHN",recruitDetail:"index_recruitDetail__Cp4hO",recruitDetailLessonType:"index_recruitDetailLessonType__0bKDp",lessonType:"index_lessonType__EthPc",blueTitle:"index_blueTitle__oWf3y",blueTitle2:"index_blueTitle2__0872k",recruitContainer1:"index_recruitContainer1__q4pgc",allContainer1:"index_allContainer1__g5dBo",r6:"index_r6__a2Tnr"}}},function(e){e.O(0,[664,119,774,888,179],function(){return e(e.s=89208)}),_N_E=e.O()}]);