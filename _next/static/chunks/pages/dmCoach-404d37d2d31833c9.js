(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[89],{13530:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dmCoach",function(){return a(68616)}])},69359:function(e,t,a){"use strict";a.d(t,{v:function(){return BasicHeader}});var s=a(85893),n=a(94119),o=a(76718),c=a(41664),l=a.n(c),i=a(11163),d=a(67294),r=a(78759),m=a(82509),_=a(55293),h=a.n(_);let BasicHeader=e=>{let{user:t}=e,[a,c]=(0,d.useState)(""),[_,u]=(0,d.useState)(!0),[C,g]=(0,d.useState)(null),[x,p]=(0,d.useState)(null),[f,j]=(0,d.useState)(null),N=(0,i.useRouter)(),{value:v}=N.query,handleButtonClick=e=>{j(e)};(0,d.useEffect)(()=>{let e=(0,m.lh)(),t=(0,o.Aj)(e,async e=>{e?p(e.uid):p(null)});return()=>t()},[]);let fetchRecruit=async()=>{try{if(null!==x){let e=await r.x.fetchMyProfile.post({body:{Id:x}});console.log(e.body),g(e.body.name)}u(!1)}catch(e){u(!1)}};return((0,d.useEffect)(()=>{fetchRecruit()},[x]),_)?(0,s.jsx)("div",{className:h().loading,children:"ローディング中..."}):(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:h().container,children:[(0,s.jsxs)("div",{className:h().searchContainer,children:[(0,s.jsx)("input",{type:"text",className:h().searchInput,placeholder:"何のゲームをお探しですか？",value:a,onChange:e=>c(e.target.value)}),(0,s.jsx)("button",{className:h().searchButton,onClick:()=>{console.log("検索: ".concat(a))}})]}),(0,s.jsx)("div",{className:h().contheme2,children:null!==x?(0,s.jsxs)("div",{className:h().userSection8,children:[(0,s.jsx)(l(),{href:"/selectDm",children:(0,s.jsx)("div",{className:h().roomButton,children:(0,s.jsx)(n.Z,{style:{fontSize:"26px",color:"#000000",marginRight:"18px"}})})}),(0,s.jsx)(l(),{href:"/userProfile",children:(0,s.jsxs)("span",{className:h().userName,children:["ようこそ,",(0,s.jsx)("span",{className:h().userName2,children:C}),"さん"]})}),(0,s.jsx)(l(),{href:"/bosyuuDescription",children:(0,s.jsx)("button",{className:h().redButton,children:"募集"})})]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(l(),{href:"/login",children:(0,s.jsx)("button",{className:h().kaninButton,children:"ログイン"})}),(0,s.jsx)(l(),{href:"/signUp",children:(0,s.jsx)("button",{className:h().loginButton,children:"会員登録"})}),(0,s.jsx)(l(),{href:"/signUp",children:(0,s.jsx)("button",{className:h().redButton,children:"コーチ登録"})})]})}),(0,s.jsxs)("div",{className:h().contheme,children:[(0,s.jsx)(l(),{href:"/",children:(0,s.jsx)("button",{className:(null==v?void 0:v.length)===0?h().selectedButton:h().button,onClick:()=>handleButtonClick("おすすめ"),children:"おすすめ"})}),(0,s.jsx)(l(),{href:"/recruit?value=1",children:(0,s.jsx)("button",{className:"1"===v?h().selectedButton:h().button,onClick:()=>handleButtonClick("VALORANT"),children:"VALORANT"})}),(0,s.jsx)(l(),{href:"/recruit?value=2",children:(0,s.jsx)("button",{className:h().button,children:"APEX"})}),(0,s.jsx)(l(),{href:"/recruit?value=3",children:(0,s.jsx)("button",{className:h().button,children:"LOL"})}),(0,s.jsx)("button",{className:h().button,children:"CSGO"}),(0,s.jsx)("button",{className:h().button,children:"COD 2"}),(0,s.jsx)("button",{className:h().button,children:"OverWatch2"}),(0,s.jsx)(l(),{href:"/allSearch",children:(0,s.jsx)("button",{className:h().button,children:"すべて見る"})})]})]})})}},68616:function(e,t,a){"use strict";a.r(t);var s=a(85893),n=a(27596),o=a.n(n),c=a(76718),l=a(11163),i=a(67294),d=a(78759),r=a(82509),m=a(69359),_=a(69648),h=a.n(_);t.default=()=>{let[e,t]=(0,i.useState)(""),[a,n]=(0,i.useState)(""),[_,u]=(0,i.useState)(0),[C,g]=(0,i.useState)(""),[x,p]=(0,i.useState)([]),[f,j]=(0,i.useState)(null),[N,v]=(0,i.useState)(void 0),B=(0,l.useRouter)(),y=String(B.query.id),fetchRecruitDetail=async()=>{try{console.log(e);let t=await d.x.userReview.post({body:{Id:e}});if(console.log(t),v(t.body),"string"==typeof y){let e=await d.x.fetachRoomRecruitDetail.post({body:{Id:y}});console.log(e),j(e.body)}}catch(e){console.error("ゲームの取得に失敗しました:",e)}};(0,i.useEffect)(()=>{e&&fetchRecruitDetail()},[e]),(0,i.useEffect)(()=>{let e=(0,r.lh)(),a=(0,c.Aj)(e,e=>{e&&(console.log(e),t(e.uid))});return()=>a()},[]);let fetchRoom=async()=>{try{if("string"==typeof y){console.log(y);let t=await d.x.fetchRoom.post({body:{Id:y,userId:e}});console.log(t),p(t.body),console.log("dadaddfffffffff");let a=await d.x.fetchUserInfo.post({body:{Id:y,userId:e}});console.log(a.body),u(a.body)}}catch(e){console.error("ゲームの取得に失敗しました:",e)}};(0,i.useEffect)(()=>{let t;let fetchRoom=async()=>{try{if("string"==typeof y){console.log(y);let t=await d.x.fetchRoom.post({body:{Id:y,userId:e}});console.log(t),p(t.body),console.log("dadaddfffffffff");let a=await d.x.fetchUserInfo.post({body:{Id:y,userId:e}});console.log(a.body),u(a.body)}}catch(e){console.error("ゲームの取得に失敗しました:",e)}};return e&&fetchRoom(),()=>{t&&clearInterval(t)}},[e]);let sendMessage=async()=>{await d.x.sendMessage.post({body:{Id:y,userId:e,message:a}}),fetchRoom()},[I,b]=(0,i.useState)("");console.log(x);let sendApply=async()=>{var t;console.log(C),await d.x.sendApprove.post({body:{bosyuuId:null!==(t=null==f?void 0:f.id)&&void 0!==t?t:"defaultId",roomId:y,userId:e,date:A,time:E}}),console.log("承諾用URLを送信しました:",L)},handleUrlClick=async()=>{let t=window.confirm("本当に承諾しますか？");if(t){console.log(L),console.log(y),console.log(e),S(!1);try{"string"==typeof y&&"string"==typeof L&&"string"==typeof C&&"string"==typeof e&&await d.x.recruitApprove.post({body:{Id:L,bosyuuId:C,roomId:y,userId:e}})}catch(e){console.error("Error updating status:",e)}}},[T,k]=(0,i.useState)(!1),[R,w]=(0,i.useState)(!1),[H,S]=(0,i.useState)(!1),onCloseRecruit=()=>{k(!1)},onFinalClose=()=>{w(!1)},onApplyRecruit=()=>{k(!1),w(!0)},onApplyFinalRecruit=()=>{w(!1),sendApply()},[A,M]=(0,i.useState)(""),[E,U]=(0,i.useState)(""),handleDateChange=e=>{M(e.target.value)},handleTimeChange=e=>{U(e.target.value)},[O,D]=(0,i.useState)(),fetchApplay=async()=>{try{console.log(y);let e=await d.x.fetchApplay.post({body:{id:y}});console.log(e.body),D(e.body),U(e.body.time),M(e.body.date)}catch(e){o()(e)}};(0,i.useEffect)(()=>{fetchApplay()},[y]);let[L,F]=(0,i.useState)(""),[P,X]=(0,i.useState)("dmTitle3"),selectTitle=e=>{X(e),fetchRoom2(e)},[W,q]=(0,i.useState)([]),fetchRoom2=async t=>{try{let a;console.log(e),"dmTitle3"===t?(a=await d.x.fetchDmCoach.post({body:{userId:e}}),q(a.body),console.log(a.body)):"dmTitle4"===t&&(a=await d.x.fetchDm2Coach.post({body:{userId:e}}),q(a.body),console.log(a.body))}catch(e){console.error(e)}},[G,z]=(0,i.useState)("");(0,i.useEffect)(()=>{z(y)},[y]),(0,i.useEffect)(()=>{fetchRoom2(P)},[e,P]);let handleCommentClick=e=>{z(e),B.push("../dmCoach?id=".concat(e))};return(0,s.jsxs)(s.Fragment,{children:[" ",(0,s.jsxs)("div",{className:h().parent,children:[(0,s.jsx)(m.v,{user:e}),(0,s.jsx)("div",{className:h().containerBox2}),(0,s.jsxs)("div",{className:h().containerBox,children:[(0,s.jsxs)("div",{className:h().dmTitleContainer,children:[(0,s.jsx)("div",{className:h().dmTitle,children:"コーチ用メッセージ一覧"}),(0,s.jsxs)("div",{className:h().dmTitle2,children:[(0,s.jsx)("div",{className:"".concat(h().dmTitle3," ").concat("dmTitle3"===P?h().selected:""),onClick:()=>selectTitle("dmTitle3"),children:"未了承"}),(0,s.jsx)("div",{className:"".concat(h().dmTitle4," ").concat("dmTitle4"===P?h().selected:""),onClick:()=>selectTitle("dmTitle4"),children:"了承済み"})]})]}),(0,s.jsx)("div",{className:h().roomList,children:W.map(e=>e.latestComment&&(0,s.jsx)("div",{className:"".concat(h().commentContainer," ").concat(G===e.latestComment.roomId?h().selectedRoom:""),onClick:()=>{var t;return(null===(t=e.latestComment)||void 0===t?void 0:t.id)&&handleCommentClick(e.latestComment.roomId)},children:e.commentUser&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("img",{src:e.commentUser.imageUrl||"",alt:"User",className:h().userImage}),(0,s.jsxs)("div",{className:h().userContainer,children:[(0,s.jsx)("div",{className:h().userName,children:e.commentUser.name}),(0,s.jsx)("div",{className:h().comment,children:e.latestComment.content})]})]})},e.latestComment.id))})]}),(0,s.jsx)("div",{className:h().chatContainer,children:(0,s.jsx)("div",{className:h().title2,children:"チャット欄"})}),(0,s.jsxs)("div",{className:h().messageBox,children:[(0,s.jsxs)("div",{className:h().messageBox3,children:[(0,s.jsxs)("div",{className:h().overflow,children:[Array.isArray(x)&&x.map((e,t)=>(0,s.jsx)("div",{className:1===e.userIdentity?h().messageLeft:h().messageRight,children:1===e.userIdentity?(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:h().msgContent6,children:[e.userImageUrl&&(0,s.jsxs)("div",{className:h().userImageContainer,children:[(0,s.jsx)("img",{src:e.userImageUrl,alt:"User",className:h().userImage2})," "]}),(0,s.jsx)("div",{className:h().msgContent,children:e.content})]})}):(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:h().msgContent3,children:[(0,s.jsxs)("div",{className:h().msgContent2,children:[(0,s.jsx)("div",{className:h().msgContent,children:e.content}),e.userImageUrl&&(0,s.jsx)("img",{src:e.userImageUrl,alt:"User",className:h().userImage2})]})," "]})})},t))," "]})," "]}),(0,s.jsxs)("div",{className:h().mess,children:[(0,s.jsx)("input",{type:"text",value:a,onChange:e=>n(e.target.value),className:h().messageInput}),(0,s.jsx)("button",{onClick:sendMessage,className:h().sendButton1,children:"Send"}),1===_&&(0,s.jsx)("button",{onClick:()=>{k(!0)},className:h().applayButton,children:"申し込む"}),T&&(0,s.jsx)(function(e){let{isOpen:t}=e;return t?(0,s.jsx)("div",{className:h().modal,children:(0,s.jsxs)("div",{className:h().modalContent,children:[(0,s.jsxs)("div",{className:h().modalMsgContent,children:[(0,s.jsx)("div",{className:h().modalTitle,children:"お申込み確認"}),(0,s.jsx)("div",{className:h().modalMsg,children:"日付と時間を設定してください"}),(0,s.jsxs)("div",{className:h().dateTimePicker,children:[(0,s.jsx)("input",{type:"date",className:h().dateInput,value:A,onChange:handleDateChange}),(0,s.jsx)("input",{type:"time",className:h().timeInput,value:E,onChange:handleTimeChange})]})]}),(0,s.jsx)("button",{className:h().closeButton,onClick:onCloseRecruit,children:"閉じる"}),(0,s.jsx)("button",{className:h().applyButton5,onClick:onApplyRecruit,children:"申し込む"})]})}):null},{isOpen:T}),R&&(0,s.jsx)(function(e){let{isOpen:t}=e;return t?(0,s.jsx)("div",{className:h().modal,children:(0,s.jsxs)("div",{className:h().modalContent,children:[(0,s.jsxs)("div",{className:h().modalMsgContent,children:[(0,s.jsx)("div",{className:h().modalTitle,children:"最終お申込み確認"}),(0,s.jsx)("p",{className:h().title,children:null==f?void 0:f.title}),(0,s.jsx)("p",{className:h().title,children:null!==f&&(null==f?void 0:f.gameId)!==null&&(e=>{switch(e){case 1:return"VALORANT";case 2:return"APEX";case 3:return"LOL";default:return"Unknown Game"}})(f.gameId)}),(0,s.jsxs)("div",{className:h().dateMsg,children:["日時：",A]}),(0,s.jsxs)("div",{className:h().timeMsg,children:["時間：",E]}),(0,s.jsx)("div",{children:"本当に申し込みますか？"})]}),(0,s.jsx)("button",{className:h().closeButton,onClick:onFinalClose,children:"閉じる"}),(0,s.jsx)("button",{className:h().applyButton5,onClick:onApplyFinalRecruit,children:"申し込む"})]})}):null},{isOpen:R}),O&&2===_&&(0,s.jsx)("div",{onClick:()=>{S(!0)},className:h().applayButton2,children:"受諾ボタン"}),H&&(0,s.jsx)(function(e){let{isOpen:t}=e;return t?(console.log(I),console.log(null==f?void 0:f.gameId),(0,s.jsx)("div",{className:h().modal,children:(0,s.jsxs)("div",{className:h().modalContent,children:[(0,s.jsxs)("div",{className:h().modalMsgContent,children:[(0,s.jsx)("div",{className:h().modalTitle,children:"最終受諾確認"}),(0,s.jsx)("p",{className:h().title,children:null==f?void 0:f.title}),(0,s.jsx)("p",{className:h().title,children:null!==f&&(null==f?void 0:f.gameId)!==null&&(e=>{switch(e){case 1:return"VALORANT";case 2:return"APEX";case 3:return"LOL";default:return"Unknown Game"}})(f.gameId)}),(0,s.jsxs)("div",{className:h().dateMsg,children:["日時：",A]}),(0,s.jsxs)("div",{className:h().timeMsg,children:["時間：",E]}),(0,s.jsx)("div",{children:"本当に了承しますか？"})]}),(0,s.jsx)("button",{className:h().closeButton,onClick:onFinalClose,children:"閉じる"}),(0,s.jsx)("button",{className:h().applyButton5,onClick:handleUrlClick,children:"了承する"})]})})):null},{isOpen:H})]})]})]})]})}},55293:function(e){e.exports={container:"BasicHeader_container__ASIaK",contheme:"BasicHeader_contheme__zTdPw",button:"BasicHeader_button__R08NF",contheme2:"BasicHeader_contheme2__RIUwH",kaninButton:"BasicHeader_kaninButton__CEv_8",loginButton:"BasicHeader_loginButton__n_4uq",redButton:"BasicHeader_redButton__R57u1",searchContainer:"BasicHeader_searchContainer__5csEn",searchInput:"BasicHeader_searchInput__HA9Ps",searchButton:"BasicHeader_searchButton__1KIkK",main:"BasicHeader_main__Vqufr",userBtn:"BasicHeader_userBtn__wlK48",userIcon:"BasicHeader_userIcon__UecGa",userContainer:"BasicHeader_userContainer__waGrV",userName:"BasicHeader_userName__KiR1h",userName2:"BasicHeader_userName2__ugag8",loading:"BasicHeader_loading__jW7n8",spin:"BasicHeader_spin__Mb5Hn",selectedButton:"BasicHeader_selectedButton__T8vja",userSection8:"BasicHeader_userSection8__L5ol4",iconblack:"BasicHeader_iconblack__lr8uA",roomButton:"BasicHeader_roomButton__fV8mf"}},69648:function(e){e.exports={loginContainer:"dmCoach_loginContainer__86BmP",loginForm:"dmCoach_loginForm__C_pG7",loginButton:"dmCoach_loginButton__DIZC_",container:"dmCoach_container__88jPS",loginTitle:"dmCoach_loginTitle__45MBL",kaninn:"dmCoach_kaninn__9pA1H",searchmail:"dmCoach_searchmail__YpOCx",searchInput:"dmCoach_searchInput__SBzMf",mail:"dmCoach_mail__0GOJb",password:"dmCoach_password__tFiKw",searchpass:"dmCoach_searchpass__nHbhB",messageInput:"dmCoach_messageInput__oNdyM",sendButton1:"dmCoach_sendButton1__fjP_M",sendButton:"dmCoach_sendButton__4AcJb",message:"dmCoach_message__7J9mn",left:"dmCoach_left__JSRup",right:"dmCoach_right__57dze",messageLeft:"dmCoach_messageLeft__NWhz1",messageRight:"dmCoach_messageRight__LfRIS",messageContainer:"dmCoach_messageContainer__ySUkq",msgContent:"dmCoach_msgContent__xeBRW",msgContent6:"dmCoach_msgContent6__qC5i6",msgContent2:"dmCoach_msgContent2__BunWV",msgContent3:"dmCoach_msgContent3__o1qEO",userImage2:"dmCoach_userImage2__iWIJb",messageBox:"dmCoach_messageBox__M4S_w",messageBox3:"dmCoach_messageBox3__hUu2l",messageBox2:"dmCoach_messageBox2__NYXW8",messageBox1:"dmCoach_messageBox1__PYHeH",line:"dmCoach_line__pR7uH",line2:"dmCoach_line2__vX_CR",applayButton:"dmCoach_applayButton__nwjQE",applayButton2:"dmCoach_applayButton2__7M13o",profileContainer:"dmCoach_profileContainer__Og44S",userImage:"dmCoach_userImage__Mtx9S",ratingContainer:"dmCoach_ratingContainer__TgO_F",rate:"dmCoach_rate__lzi3x",rateInner:"dmCoach_rateInner__XZ7ax",rating:"dmCoach_rating__FrlJd",name:"dmCoach_name__h486k",nameContainer:"dmCoach_nameContainer__NwoR3",achievementsContainer:"dmCoach_achievementsContainer__MQYfe",achievements:"dmCoach_achievements__zPa72",achievementsTitle:"dmCoach_achievementsTitle__I9oFD",descriptionDetailContainer:"dmCoach_descriptionDetailContainer__xw1WH",descriptionTitle:"dmCoach_descriptionTitle__KOCPH",descriptions:"dmCoach_descriptions__G9lkn",parent:"dmCoach_parent__yTNIo",modal:"dmCoach_modal__0zWuv",modalContent:"dmCoach_modalContent__XkPAk",applyButton5:"dmCoach_applyButton5__tVGFX",closeButton:"dmCoach_closeButton__DOTkO",modalTitle:"dmCoach_modalTitle__kK_kL",modalMsgContent:"dmCoach_modalMsgContent__8iwb9",modalMsg:"dmCoach_modalMsg__eWhBI",dateTimePicker:"dmCoach_dateTimePicker__9_07E",dateInput:"dmCoach_dateInput__sW2hH",timeInput:"dmCoach_timeInput__Y_DSM",dateMsg:"dmCoach_dateMsg__LZqT0",timeMsg:"dmCoach_timeMsg__RE4qY",title:"dmCoach_title___eNWr",containerBox:"dmCoach_containerBox__PQmOh",dmTitleContainer:"dmCoach_dmTitleContainer__VskWI",dmTitle:"dmCoach_dmTitle__dtXtZ",dmTitle2:"dmCoach_dmTitle2__InK7O",dmTitle3:"dmCoach_dmTitle3__shuy_",dmTitle4:"dmCoach_dmTitle4__X0p3G",selected:"dmCoach_selected__w6lH8",roomList:"dmCoach_roomList__qaKRs",commentContainer:"dmCoach_commentContainer__XZJ8n",comment:"dmCoach_comment__L0922",userName:"dmCoach_userName__WhYJH",userContainer:"dmCoach_userContainer__ie2Gz",chatContainer:"dmCoach_chatContainer__gl_kH",title2:"dmCoach_title2__VhvgT",containerBox2:"dmCoach_containerBox2__Dv1pa",selectedRoom:"dmCoach_selectedRoom__vDDxE",mess:"dmCoach_mess__5iJ3E",overflow:"dmCoach_overflow__XcYUa",userImageContainer:"dmCoach_userImageContainer__Hc53I",participationConditions:"dmCoach_participationConditions__qd40M",check:"dmCoach_check__38Fim",checkBox:"dmCoach_checkBox__HYsqm",participationConditionsTitle:"dmCoach_participationConditionsTitle__dxdwm",modalTitle2:"dmCoach_modalTitle2__5sAhQ",modalRiyou:"dmCoach_modalRiyou__EDGF4",modalContent2:"dmCoach_modalContent2__Mb5iX",modalCon2:"dmCoach_modalCon2__6HA4z",modalTitle3:"dmCoach_modalTitle3__M13lc",tag:"dmCoach_tag__18J9F",tagtitle:"dmCoach_tagtitle__saXDw",timeInputNote:"dmCoach_timeInputNote__W_KHS",timeInputNotetitle:"dmCoach_timeInputNotetitle__PzEsU",timeContainer:"dmCoach_timeContainer__8DDET"}}},function(e){e.O(0,[664,119,596,774,888,179],function(){return e(e.s=13530)}),_N_E=e.O()}]);