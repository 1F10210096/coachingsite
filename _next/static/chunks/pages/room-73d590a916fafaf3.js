(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[635],{35147:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/room",function(){return n(78186)}])},69359:function(e,t,n){"use strict";n.d(t,{v:function(){return BasicHeader}});var s=n(85893),r=n(94119),c=n(76718),a=n(41664),o=n.n(a),l=n(11163),i=n(67294),u=n(78759),d=n(82509),m=n(55293),h=n.n(m);let BasicHeader=e=>{let{user:t}=e,[n,a]=(0,i.useState)(""),[m,_]=(0,i.useState)(!0),[B,x]=(0,i.useState)(null),[j,f]=(0,i.useState)(null),[N,C]=(0,i.useState)(null),b=(0,l.useRouter)(),{value:v}=b.query,handleButtonClick=e=>{C(e)};(0,i.useEffect)(()=>{try{let e=(0,d.lh)(),t=(0,c.Aj)(e,async e=>{e?f(e.uid):f(null)});return()=>t()}catch(e){console.error("Error fetching users:",e)}},[]);let fetchRecruit=async()=>{try{if(null!==j){let e=await u.x.fetchMyProfile.post({body:{Id:j}});console.log(e.body),x(e.body.name)}_(!1)}catch(e){_(!1)}};return((0,i.useEffect)(()=>{fetchRecruit()},[j]),m)?(0,s.jsx)("div",{className:h().loading,children:"ローディング中..."}):(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:h().container,children:[(0,s.jsxs)("div",{className:h().searchContainer,children:[(0,s.jsx)("input",{type:"text",className:h().searchInput,placeholder:"何のゲームをお探しですか？",value:n,onChange:e=>a(e.target.value)}),(0,s.jsx)("button",{className:h().searchButton,onClick:()=>{console.log("検索: ".concat(n))}})]}),(0,s.jsx)("div",{className:h().contheme2,children:null!==B?(0,s.jsxs)("div",{className:h().userSection8,children:[(0,s.jsx)(o(),{href:"/selectDm",children:(0,s.jsx)("div",{className:h().roomButton,children:(0,s.jsx)(r.Z,{style:{fontSize:"26px",color:"#000000",marginRight:"18px"}})})}),(0,s.jsx)(o(),{href:"/userProfile",children:(0,s.jsxs)("span",{className:h().userName,children:["ようこそ,",(0,s.jsx)("span",{className:h().userName2,children:B}),"さん"]})}),(0,s.jsx)(o(),{href:"/bosyuuDescription",children:(0,s.jsx)("button",{className:h().redButton,children:"募集"})})]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o(),{href:"/login",children:(0,s.jsx)("button",{className:h().kaninButton,children:"ログイン"})}),(0,s.jsx)(o(),{href:"/signUp",children:(0,s.jsx)("button",{className:h().loginButton,children:"会員登録"})}),(0,s.jsx)(o(),{href:"/signUp",children:(0,s.jsx)("button",{className:h().redButton,children:"コーチ登録"})})]})}),(0,s.jsxs)("div",{className:h().contheme,children:[(0,s.jsx)(o(),{href:"/",children:(0,s.jsx)("button",{className:void 0===v?h().selectedButton:h().button,onClick:()=>handleButtonClick("おすすめ"),children:"おすすめ"})}),(0,s.jsx)(o(),{href:"/recruit?value=1",children:(0,s.jsx)("button",{className:"1"===v?h().selectedButton:h().button,onClick:()=>handleButtonClick("VALORANT"),children:"VALORANT"})}),(0,s.jsx)(o(),{href:"/recruit?value=2",children:(0,s.jsx)("button",{className:"2"===v?h().selectedButton:h().button,onClick:()=>handleButtonClick("APEX"),children:"APEX"})}),(0,s.jsx)(o(),{href:"/recruit?value=3",children:(0,s.jsx)("button",{className:"3"===v?h().selectedButton:h().button,onClick:()=>handleButtonClick("LOL"),children:"LOL"})}),(0,s.jsxs)(o(),{href:"/recruit?value=4",children:[(0,s.jsx)("button",{className:"4"===v?h().selectedButton:h().button,onClick:()=>handleButtonClick("Fortnite"),children:"Fortnite"})," "]}),(0,s.jsxs)(o(),{href:"/recruit?value=5",children:[(0,s.jsx)("button",{className:"5"===v?h().selectedButton:h().button,onClick:()=>handleButtonClick("StreetFighter"),children:"StreetFighter"})," "]}),(0,s.jsxs)(o(),{href:"/recruit?value=7",children:[(0,s.jsx)("button",{className:"7"===v?h().selectedButton:h().button,onClick:()=>handleButtonClick("OverWatch2"),children:"OverWatch2"})," "]}),(0,s.jsx)(o(),{href:"/allSearch",children:(0,s.jsx)("button",{className:"8"===v?h().selectedButton:h().button,onClick:()=>handleButtonClick("すべて見る"),children:"すべて見る"})})]})]})})}},78186:function(e,t,n){"use strict";n.r(t);var s=n(85893),r=n(27596),c=n.n(r),a=n(76718),o=n(11163),l=n(67294),i=n(78759),u=n(82509),d=n(69359),m=n(48598),h=n.n(m);t.default=()=>{let[e,t]=(0,l.useState)(""),[n,r]=(0,l.useState)(),[m,_]=(0,l.useState)([]);(0,l.useEffect)(()=>{let e=(0,u.lh)(),n=(0,a.Aj)(e,e=>{e?(console.log(e),t(e.uid)):console.log("ユーザーがログインしていません")});return()=>n()},[]);let fetchRoom=async()=>{try{let t=await i.x.fetchRooms.post({body:{userId:e}});_(t.body),console.log(t.body)}catch(e){c()(e)}};(0,l.useEffect)(()=>{fetchRoom()},[e]);let B=(0,o.useRouter)(),handleCommentClick=e=>{B.push("../dm?id=".concat(e))};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(d.v,{user:n}),(0,s.jsxs)("div",{className:h().container,children:[(0,s.jsx)("div",{className:h().title,children:"DM一覧"}),(0,s.jsx)("div",{className:h().roomList,children:m.map(e=>e.latestComment&&(0,s.jsx)("div",{className:h().commentContainer,onClick:()=>{var t;return(null===(t=e.latestComment)||void 0===t?void 0:t.id)&&handleCommentClick(e.latestComment.roomId)},children:e.commentUser&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("img",{src:e.commentUser.imageUrl||"",alt:"User",className:h().userImage}),(0,s.jsxs)("div",{className:h().userContainer,children:[(0,s.jsx)("div",{className:h().userName,children:e.commentUser.name}),(0,s.jsx)("div",{className:h().comment,children:e.latestComment.content})]})]})},e.latestComment.id))})]})]})}},55293:function(e){e.exports={container:"BasicHeader_container__ASIaK",contheme:"BasicHeader_contheme__zTdPw",button:"BasicHeader_button__R08NF",contheme2:"BasicHeader_contheme2__RIUwH",kaninButton:"BasicHeader_kaninButton__CEv_8",loginButton:"BasicHeader_loginButton__n_4uq",redButton:"BasicHeader_redButton__R57u1",searchContainer:"BasicHeader_searchContainer__5csEn",searchInput:"BasicHeader_searchInput__HA9Ps",searchButton:"BasicHeader_searchButton__1KIkK",main:"BasicHeader_main__Vqufr",userBtn:"BasicHeader_userBtn__wlK48",userIcon:"BasicHeader_userIcon__UecGa",userContainer:"BasicHeader_userContainer__waGrV",userName:"BasicHeader_userName__KiR1h",userName2:"BasicHeader_userName2__ugag8",loading:"BasicHeader_loading__jW7n8",spin:"BasicHeader_spin__Mb5Hn",selectedButton:"BasicHeader_selectedButton__T8vja",userSection8:"BasicHeader_userSection8__L5ol4",iconblack:"BasicHeader_iconblack__lr8uA",roomButton:"BasicHeader_roomButton__fV8mf"}},48598:function(e){e.exports={container:"room_container__E5hIM",title:"room_title__yQ5tQ",roomList:"room_roomList__sYlbf",commentContainer:"room_commentContainer__9LKDB",userImage:"room_userImage__bFvPx",comment:"room_comment__WSc4s",userName:"room_userName__Ch4WR",userContainer:"room_userContainer__Ms9y3"}}},function(e){e.O(0,[664,119,596,774,888,179],function(){return e(e.s=35147)}),_N_E=e.O()}]);