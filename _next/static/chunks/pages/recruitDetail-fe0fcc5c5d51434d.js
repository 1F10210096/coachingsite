(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[751],{63049:function(e,i,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/recruitDetail",function(){return a(49167)}])},69359:function(e,i,a){"use strict";a.d(i,{v:function(){return BasicHeader}});var n=a(85893),t=a(94119),r=a(76718),s=a(41664),l=a.n(s),c=a(11163),o=a(67294),d=a(78759),_=a(82509),u=a(55293),m=a.n(u);let BasicHeader=e=>{let{user:i}=e,[a,s]=(0,o.useState)(""),[u,h]=(0,o.useState)(!0),[x,g]=(0,o.useState)(null),[v,p]=(0,o.useState)(null),[j,N]=(0,o.useState)(null),C=(0,c.useRouter)(),{value:D}=C.query,handleButtonClick=e=>{N(e)};(0,o.useEffect)(()=>{let e=(0,_.lh)(),i=(0,r.Aj)(e,async e=>{e&&e.emailVerified?p(e.uid):p(null)});return()=>i()},[]);let fetchRecruit=async()=>{try{if(null!==v){let e=await d.x.fetchMyProfile.post({body:{Id:v}});console.log(e.body),g(e.body.name)}h(!1)}catch(e){h(!1)}};return((0,o.useEffect)(()=>{fetchRecruit()},[v]),u)?(0,n.jsx)("div",{className:m().loading,children:"ローディング中..."}):(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:m().container,children:[(0,n.jsxs)("div",{className:m().searchContainer,children:[(0,n.jsx)("input",{type:"text",className:m().searchInput,placeholder:"何のゲームをお探しですか？",value:a,onChange:e=>s(e.target.value)}),(0,n.jsx)("button",{className:m().searchButton,onClick:()=>{console.log("検索: ".concat(a))}})]}),(0,n.jsx)("div",{className:m().contheme2,children:null!==v?(0,n.jsxs)("div",{className:m().userSection8,children:[(0,n.jsx)(l(),{href:"/selectDm",children:(0,n.jsx)("div",{className:m().roomButton,children:(0,n.jsx)(t.Z,{style:{fontSize:"26px",color:"#000000",marginRight:"18px"}})})}),(0,n.jsx)(l(),{href:"/userProfile",children:(0,n.jsxs)("span",{className:m().userName,children:["ようこそ,",(0,n.jsx)("span",{className:m().userName2,children:x}),"さん"]})}),(0,n.jsx)(l(),{href:"/bosyuuDescription",children:(0,n.jsx)("button",{className:m().redButton,children:"募集"})})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l(),{href:"/login",children:(0,n.jsx)("button",{className:m().kaninButton,children:"ログイン"})}),(0,n.jsx)(l(),{href:"/signUp",children:(0,n.jsx)("button",{className:m().loginButton,children:"会員登録"})}),(0,n.jsx)(l(),{href:"/signUp",children:(0,n.jsx)("button",{className:m().redButton,children:"コーチ登録"})})]})}),(0,n.jsxs)("div",{className:m().contheme,children:[(0,n.jsx)(l(),{href:"/",children:(0,n.jsx)("button",{className:(null==D?void 0:D.length)===0?m().selectedButton:m().button,onClick:()=>handleButtonClick("おすすめ"),children:"おすすめ"})}),(0,n.jsx)(l(),{href:"/recruit?value=1",children:(0,n.jsx)("button",{className:"1"===D?m().selectedButton:m().button,onClick:()=>handleButtonClick("VALORANT"),children:"VALORANT"})}),(0,n.jsx)(l(),{href:"/recruit?value=2",children:(0,n.jsx)("button",{className:m().button,children:"APEX"})}),(0,n.jsx)(l(),{href:"/recruit?value=3",children:(0,n.jsx)("button",{className:m().button,children:"LOL"})}),(0,n.jsx)("button",{className:m().button,children:"CSGO"}),(0,n.jsx)("button",{className:m().button,children:"COD 2"}),(0,n.jsx)("button",{className:m().button,children:"OverWatch2"}),(0,n.jsx)(l(),{href:"/allSearch",children:(0,n.jsx)("button",{className:m().button,children:"すべて見る"})})]})]})})}},49167:function(e,i,a){"use strict";a.r(i),a.d(i,{default:function(){return index_page}});var n=a(85893),t=a(76718),r=a(41664),s=a.n(r),l=a(11163),c=a(67294),o=a(78759),d=a(82509),_=a(52745),u=a(8016);let m={初心者歓迎:"beginner.png",上級者歓迎:"wellplayer.png",エイム強化:"aim.png",プロ志向:"pro.png",スパルタ指導:"suparuta.png",メンタル強化:"heart.png",仲良くワイワイ:"friend.png"};var tagPng=e=>(console.log(e),"/tags/".concat(m[e]||"default.png")),h=a(69359),x=a(53187),g=a.n(x),v=a(57467),p=a.n(v),j=a(6198),N=a.n(j),index_page=()=>{var e,i,a;let[r,m]=(0,c.useState)(null),[x,v]=(0,c.useState)(),[j,C]=(0,c.useState)([]),[D,f]=(0,c.useState)(""),b=(0,l.useRouter)(),I=b.query.id;console.log(I),(0,c.useEffect)(()=>{let e=(0,d.lh)(),i=(0,t.Aj)(e,e=>{e?(console.log(e),f(e.uid)):console.log("error")});return()=>i()},[]),console.log(I);let fetchRecruitDetail=async()=>{try{let e=await o.x.fetachRecruitDetail.post({body:{Id:I}});console.log(e.body),m(e.body.bosyuuListFront),v(e.body.teacherProfile),C(e.body.reviewList)}catch(e){console.error("ゲームの取得に失敗しました:",e)}};(0,c.useEffect)(()=>{I&&fetchRecruitDetail()},[I]);let getRankImage=(e,i)=>{let a;1===e?(a="valoRanks",console.log("valoRanks")):2===e?a="apexRanks":3===e&&(a="lolRanks"),console.log(i),console.log(a);let n=(0,u.Z)(e,i);return"/".concat(a,"/").concat(n)},calculateRateWidth2=e=>(console.log(20*e),20*e),sendRoom=async()=>{try{if(console.log(null==r?void 0:r.id),console.log(D),null!==r){let e=await o.x.createRoom.post({body:{Id:r.id,myId:D}});b.push("../dmRecieave?id=".concat(e.body.id))}}catch(e){console.error("ゲームの取得に失敗しました:",e)}};function formatDate(e){let i=new Date(e);return i.toLocaleDateString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).replace(/\//g,"-").replace(/(\d{4})-(\d{2})-(\d{2})/,"$1/$2/$3")}let[y,R]=(0,c.useState)([]),fetchRecruit=async()=>{try{let e=await o.x.fetchRecritList.post();R(e.body),console.log(e.body)}catch(e){console.error("ゲームの取得に失敗しました:",e)}};return(0,c.useEffect)(()=>{fetchRecruit()},[]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(h.v,{user:D}),(0,n.jsxs)("div",{className:p().allContainer,children:[(0,n.jsxs)("div",{className:g().homeContainer,children:[(0,n.jsx)(s(),{href:"/",children:(0,n.jsx)("div",{className:g().home,children:"ホーム"})}),(0,n.jsx)("div",{className:g().home3,children:">"}),(null==r?void 0:r.gameId)!==null&&(null==r?void 0:r.gameId)!==void 0&&(0,n.jsxs)(s(),{href:"/recruit/?value=".concat(r.gameId),children:[1===r.gameId&&(0,n.jsx)("div",{className:g().home2,children:"VALORANT"}),2===r.gameId&&(0,n.jsx)("div",{className:g().home2,children:"APEX"}),3===r.gameId&&(0,n.jsx)("div",{className:g().home2,children:"LOL"})]}),(0,n.jsx)("div",{className:g().home3,children:">"}),(0,n.jsx)("div",{className:g().home4,children:null==r?void 0:r.title})]}),(0,n.jsx)("div",{className:p().titleContainer1,children:(0,n.jsx)("div",{className:p().title1,children:"募集詳細情報"})}),(0,n.jsxs)("div",{className:p().titleContainer,children:[(0,n.jsxs)("div",{className:p().titleContainer2,children:[(0,n.jsx)("img",{className:p().userImageDetail,src:"/gameLists/".concat((0,_.Z)(null!==(e=null==r?void 0:r.gameId)&&void 0!==e?e:0)),alt:"Rank: ".concat(null==r?void 0:r.gameId)}),(0,n.jsxs)("div",{className:p().nameContainer,children:[(0,n.jsx)("div",{className:p().name,children:null==x?void 0:x.name}),(0,n.jsx)("p",{className:p().title,children:null==r?void 0:r.title})]}),(null==r?void 0:r.gameId)===1&&(0,n.jsx)("img",{className:g().rank,src:getRankImage(null==r?void 0:r.gameId,null==r?void 0:r.rank)})]}),(0,n.jsx)("div",{className:p().line}),(0,n.jsxs)("div",{className:p().horizontalContainer,children:[" ",(0,n.jsxs)("p",{className:p().tagContainer,children:["【タグ】",r&&Array.isArray(r.tag)&&r.tag.length>0&&r.tag.map((e,i)=>(0,n.jsx)("div",{className:p().tag,children:(0,n.jsx)("img",{src:tagPng(e),className:p().tagImage})},i))]}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("p",{className:p().date,children:["掲載開始日： ",(null==r?void 0:r.createdAt)?formatDate(r.createdAt):""]}),(0,n.jsxs)("p",{className:p().date,children:["情報更新日： ",(null==r?void 0:r.updatedAt)?formatDate(r.updatedAt):""]})]})]})]}),(0,n.jsx)("div",{className:p().headerContainer,children:(0,n.jsx)("div",{className:p().titleSection,children:(0,n.jsx)("div",{className:p().titleBox,children:(0,n.jsx)("span",{className:p().titleText,children:"募集詳細"})})})}),(0,n.jsx)("div",{className:p().allparent,children:(0,n.jsxs)("div",{className:p().parent2,children:[(0,n.jsxs)("div",{className:g().parent,children:[(0,n.jsx)("div",{className:g().container,children:(0,n.jsxs)("div",{className:g().detailContent,children:[(0,n.jsxs)("div",{className:p().horizontalLayout,children:[(0,n.jsx)("div",{className:g().detail,children:"詳細情報"}),(0,n.jsxs)("button",{className:p().applyButton,children:[(0,n.jsx)("span",{className:p().starIcon,children:"★"})," いいねする"]})]}),(0,n.jsx)("div",{className:g().line4}),(0,n.jsxs)("p",{className:g().descriptionContainer,children:[(0,n.jsx)("div",{className:g().descriptionTitle2,children:"【募集詳細】"}),(0,n.jsx)("div",{className:g().description,children:null==r?void 0:r.description})]}),(0,n.jsxs)("p",{className:g().lessonTypeContainer,children:[(0,n.jsx)("div",{className:g().descriptionTitle2,children:"【コーチング方法】"}),(0,n.jsx)("div",{className:g().description,children:null==r?void 0:r.lessonType})]}),(0,n.jsxs)("p",{className:g().subjectRankContainer,children:[(0,n.jsx)("div",{className:g().subjectRankTitle,children:"【コーチングの対象者】"}),(0,n.jsx)("div",{className:g().rankImagesContainer,children:(null==r?void 0:r.subjectRank)&&Array.isArray(r.subjectRank)&&r.subjectRank.map((e,i)=>(0,n.jsx)("div",{className:g().aadw,children:(0,n.jsx)("img",{className:g().subjectRank,src:getRankImage(null==r?void 0:r.gameId,e),alt:"Rank: ".concat(e)})},i))})]}),(0,n.jsxs)("p",{className:g().notesContainer,children:["【注意事項】",(0,n.jsx)("div",{className:g().notes,children:null==r?void 0:r.notes})]}),(0,n.jsxs)("p",{className:g().sucheduleContainer,children:["【スケジュール】",(0,n.jsx)("div",{className:g().suchedule,children:null==r?void 0:r.suchedule})]}),r&&r.teacherId!==D&&(0,n.jsx)("button",{className:g().button,onClick:sendRoom,children:"応募する"})]})}),(0,n.jsxs)("div",{className:g().mainContainer,children:[(0,n.jsxs)("div",{className:g().profileContainer,children:[(0,n.jsx)("img",{src:null==x?void 0:x.imageUrl,alt:null==x?void 0:x.name,className:g().userImage}),(0,n.jsx)("div",{className:g().nameContainer,children:(0,n.jsx)("div",{className:g().name,children:null==x?void 0:x.name})}),(0,n.jsx)("div",{className:g().ratingContainer,children:(0,n.jsxs)("span",{className:g().rate,children:["★★★★★",(0,n.jsx)("span",{className:g().rateInner,style:{width:"".concat(x?(console.log(30*(a=null!==(i=null==x?void 0:x.rating)&&void 0!==i?i:0)),30*a):0,"px")},children:"★★★★★"})]})}),(0,n.jsx)("div",{className:g().rating,children:null==x?void 0:x.rating}),(0,n.jsxs)("div",{className:g().achievementsContainer,children:[(0,n.jsx)("div",{className:g().achievementsTitle,children:"【実績】"}),(0,n.jsx)("div",{className:g().achievements,children:null==x?void 0:x.Achievements})]}),(0,n.jsxs)("div",{className:g().descriptionDetailContainer,children:[(0,n.jsx)("div",{className:g().descriptionTitle,children:"【自己紹介】"}),(0,n.jsx)("div",{className:g().descriptions,children:null==x?void 0:x.hitokoto})]})]}),(0,n.jsxs)("div",{className:g().reviewContainer,children:[(0,n.jsx)("div",{className:g().reviewTitle,children:"レビュー"}),(0,n.jsx)("div",{className:g().line}),0===j.length?(0,n.jsx)("div",{className:g().noReviewsMessage,children:"まだレビューはありません。"}):(0,n.jsx)("div",{className:g().reviewA,children:j.map((e,i)=>(0,n.jsxs)("div",{className:g().review,children:[(0,n.jsxs)("div",{className:g().reviewHeader,children:[(0,n.jsx)("img",{src:e.imageUrl?e.imageUrl:void 0,alt:e.imageUrl?e.imageUrl:"Default Alt Text",className:g().reviewImage}),(0,n.jsx)("div",{className:g().reviewName,children:e.name})]}),(0,n.jsxs)("div",{className:g().ratingContainer2,children:[(0,n.jsxs)("span",{className:g().rate2,children:["★★★★★",(0,n.jsx)("span",{className:g().rateInner2,style:{width:"".concat(calculateRateWidth2(e.rating),"px")},children:"★★★★★"})]}),(0,n.jsx)("div",{className:g().reviewRating,children:e.rating})]}),(0,n.jsx)("div",{className:g().reviewDescription,children:e.review}),(0,n.jsx)("div",{className:g().line2})]},i))})]})]})]}),(0,n.jsxs)("div",{className:N().recomendTitle,children:[(0,n.jsx)("div",{className:N().titleText,children:"おすすめの募集"}),(0,n.jsx)("div",{className:N().recruitList,children:y.map((e,i)=>(0,n.jsxs)("div",{className:N().recruitSummary,children:[(0,n.jsx)("div",{className:N().recruitListImage,children:(0,n.jsx)("img",{className:N().gameIconContainer2,src:"/gameLists2/".concat((0,_.Z)(e.gameId)),alt:"Rank: ".concat(e.title)},i)}),(0,n.jsx)("h3",{className:N().recruitDetailTitle,children:e.title}),(0,n.jsx)("div",{className:N().recruitContainer1,children:e.tag.map((e,i)=>(0,n.jsx)("button",{className:N().lessonType,children:e},i))}),(0,n.jsx)("div",{className:N().r6,children:"詳細情報"}),(0,n.jsx)("p",{className:N().recruitDetail,children:e.description})]},e.id))})]})]})})," "]})]})}},52745:function(e,i){"use strict";let a={1:"valorant.png",2:"apex.png",3:"lol.png",4:"csgo.png",5:"overwatch2.png",6:"fortnite.png"};i.Z=e=>(console.log(a[e]),a[e]||"default.png")},8016:function(e,i){"use strict";let a={0:"iron.png",1:"bronze.png",2:"silver.png",3:"gold.png",4:"platinum.png",5:"diamond.png",6:"asendant.png",7:"immortal.png",8:"radiant.png"},n={0:"bronze.png",1:"silver.png",2:"gold.png",3:"platinum.png",4:"diamond.png",5:"master.png",6:"pre.png"},t={0:"iron.png",1:"bronze.png",2:"silver.png",3:"gold.png",4:"platinum.png",5:"emerald.png",6:"diamond.png",7:"master.png",8:"grandmaster.png",9:"challe.png"};i.Z=(e,i)=>{let r;return(1===e?r=a:2===e?r=n:3===e?r=t:console.log("default"),r)?"/".concat(r[i]||"default.png"):(console.log("default"),"/".concat("default.png"))}},55293:function(e){e.exports={container:"BasicHeader_container__ASIaK",contheme:"BasicHeader_contheme__zTdPw",button:"BasicHeader_button__R08NF",contheme2:"BasicHeader_contheme2__RIUwH",kaninButton:"BasicHeader_kaninButton__CEv_8",loginButton:"BasicHeader_loginButton__n_4uq",redButton:"BasicHeader_redButton__R57u1",searchContainer:"BasicHeader_searchContainer__5csEn",searchInput:"BasicHeader_searchInput__HA9Ps",searchButton:"BasicHeader_searchButton__1KIkK",main:"BasicHeader_main__Vqufr",userBtn:"BasicHeader_userBtn__wlK48",userIcon:"BasicHeader_userIcon__UecGa",userContainer:"BasicHeader_userContainer__waGrV",userName:"BasicHeader_userName__KiR1h",userName2:"BasicHeader_userName2__ugag8",loading:"BasicHeader_loading__jW7n8",spin:"BasicHeader_spin__Mb5Hn",selectedButton:"BasicHeader_selectedButton__T8vja",userSection8:"BasicHeader_userSection8__L5ol4",iconblack:"BasicHeader_iconblack__lr8uA",roomButton:"BasicHeader_roomButton__fV8mf"}},53187:function(e){e.exports={parent:"recruitDetail_parent__Esnkd",container:"recruitDetail_container__wkA6N",detail:"recruitDetail_detail__Ngd39",detailContent:"recruitDetail_detailContent__4RJx9",rank:"recruitDetail_rank__EDI6W",subjectRankContainer:"recruitDetail_subjectRankContainer__H7rBi",rankImagesContainer:"recruitDetail_rankImagesContainer__PfOzN",aadw:"recruitDetail_aadw__u5qGD",subjectRank:"recruitDetail_subjectRank__6X_z7",subjectRankTitle:"recruitDetail_subjectRankTitle__LBKM0",lessonTypeContainer:"recruitDetail_lessonTypeContainer__zszqp",lessonType:"recruitDetail_lessonType__DFS3Q",sucheduleContainer:"recruitDetail_sucheduleContainer___xcua",suchedule:"recruitDetail_suchedule__6DCA0",notesContainer:"recruitDetail_notesContainer__tCXb6",notes:"recruitDetail_notes__ykOGS",descriptionContainer:"recruitDetail_descriptionContainer__hvNV2",descriptionTitle2:"recruitDetail_descriptionTitle2__mSlMk",description:"recruitDetail_description__8MsLf",profileContainer:"recruitDetail_profileContainer__pLag6",userImage:"recruitDetail_userImage__eGcwP",ratingContainer:"recruitDetail_ratingContainer__iuZlw",rate:"recruitDetail_rate__kCR2P",rateInner:"recruitDetail_rateInner__h_17E",rating:"recruitDetail_rating__V8_nG",name:"recruitDetail_name__e3QXy",nameContainer:"recruitDetail_nameContainer__WK_yt",achievementsContainer:"recruitDetail_achievementsContainer__DzaMW",achievements:"recruitDetail_achievements__ha4i1",achievementsTitle:"recruitDetail_achievementsTitle__nVWhS",descriptionDetailContainer:"recruitDetail_descriptionDetailContainer__9DOrc",descriptionTitle:"recruitDetail_descriptionTitle__pjgVv",descriptions:"recruitDetail_descriptions__GTS77",gameImageContainer:"recruitDetail_gameImageContainer__38Gv0",gameImage:"recruitDetail_gameImage__L_xqT",button:"recruitDetail_button__jdL_a",reviewContainer:"recruitDetail_reviewContainer__Mq1vT",reviewTitle:"recruitDetail_reviewTitle__0ZL4g",review:"recruitDetail_review__mtQNr",reviewA:"recruitDetail_reviewA__uNeoE",reviewImage:"recruitDetail_reviewImage__5BXSZ",reviewName:"recruitDetail_reviewName__2E0ri",reviewRating:"recruitDetail_reviewRating__cWpDR",reviewDescription:"recruitDetail_reviewDescription__D4R5k",reviewHeader:"recruitDetail_reviewHeader__RMgMI",ratingContainer2:"recruitDetail_ratingContainer2__o_pgZ",rate2:"recruitDetail_rate2__ByLYo",rateInner2:"recruitDetail_rateInner2__IG9bi",line2:"recruitDetail_line2__XN22c",line:"recruitDetail_line__TTlNJ",line3:"recruitDetail_line3__1PloJ",noReviewsMessage:"recruitDetail_noReviewsMessage__DVppW",mainContainer:"recruitDetail_mainContainer__5Jaxm",line4:"recruitDetail_line4__Gp8n2",homeContainer:"recruitDetail_homeContainer__SaBAA",home:"recruitDetail_home__9gR7I",home2:"recruitDetail_home2__U5g5A",home3:"recruitDetail_home3__YAMGI",home4:"recruitDetail_home4__XU2eR"}},57467:function(e){e.exports={titleContainer:"index2_titleContainer__aL8u7",userImageDetail:"index2_userImageDetail__rtRv_",line:"index2_line__ubQ40",titleContainer2:"index2_titleContainer2___a0Ao",nameContainer:"index2_nameContainer__WUE4P",name:"index2_name__DJLXL",title:"index2_title__pdhCQ",tagContainer:"index2_tagContainer__OLnsR",tag:"index2_tag__nZfod",tagImage:"index2_tagImage__Y5nCE",headerContainer:"index2_headerContainer__SurIM",titleSection:"index2_titleSection__IH5Zk",titleBox:"index2_titleBox__QL_PS",titleText:"index2_titleText__jzbPb",line2:"index2_line2__0b_C2",titleContainer1:"index2_titleContainer1__eQ613",title1:"index2_title1__R6TgW",date:"index2_date__zwcvo",horizontalContainer:"index2_horizontalContainer__Goj4I",applyButton:"index2_applyButton__TiiEA",starIcon:"index2_starIcon__cb5gb",horizontalLayout:"index2_horizontalLayout__dIgL9",allparent:"index2_allparent__hqjMU",allContainer:"index2_allContainer__K1eYF",parent2:"index2_parent2__pbxYL"}},6198:function(e){e.exports={recomendTitle:"index3_recomendTitle__ZILrJ",recruitContainer1:"index3_recruitContainer1__nWECs",r6:"index3_r6__X3mrq",titleText:"index3_titleText__X81Xy",recruitList:"index3_recruitList__eycCL",recruitSummary:"index3_recruitSummary__ZWS48",recruitListImage:"index3_recruitListImage__5ztdi",recruitDetailTitle:"index3_recruitDetailTitle__ZWJjJ",gameIconContainer2:"index3_gameIconContainer2__f5_u7",divide:"index3_divide__nJPWC",divide2:"index3_divide2__0B2Or",recruitDetail:"index3_recruitDetail__6KD75",recruitDetailLessonType:"index3_recruitDetailLessonType__6A4Gu",lessonType:"index3_lessonType__u_YEE"}}},function(e){e.O(0,[664,119,774,888,179],function(){return e(e.s=63049)}),_N_E=e.O()}]);