(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[438],{7314:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/signUp",function(){return s(99882)}])},69359:function(e,n,s){"use strict";s.d(n,{v:function(){return BasicHeader}});var t=s(85893),i=s(94119),l=s(76718),a=s(41664),r=s.n(a),o=s(11163),c=s(67294),u=s(78759),d=s(82509),_=s(55293),h=s.n(_);let BasicHeader=e=>{let{user:n}=e,[s,a]=(0,c.useState)(""),[_,g]=(0,c.useState)(!0),[m,p]=(0,c.useState)(null),[x,j]=(0,c.useState)(null),[B,N]=(0,c.useState)(null),f=(0,o.useRouter)(),{value:C}=f.query,handleButtonClick=e=>{N(e)};(0,c.useEffect)(()=>{try{let e=(0,d.lh)(),n=(0,l.Aj)(e,async e=>{e?j(e.uid):j(null)});return()=>n()}catch(e){console.error("Error fetching users:",e)}},[]);let fetchRecruit=async()=>{try{if(null!==x){let e=await u.x.fetchMyProfile.post({body:{Id:x}});console.log(e.body),p(e.body.name)}g(!1)}catch(e){g(!1)}};return((0,c.useEffect)(()=>{fetchRecruit()},[x]),_)?(0,t.jsx)("div",{className:h().loading,children:"ローディング中..."}):(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)("div",{className:h().container,children:[(0,t.jsxs)("div",{className:h().searchContainer,children:[(0,t.jsx)("input",{type:"text",className:h().searchInput,placeholder:"何のゲームをお探しですか？",value:s,onChange:e=>a(e.target.value)}),(0,t.jsx)("button",{className:h().searchButton,onClick:()=>{console.log("検索: ".concat(s))}})]}),(0,t.jsx)("div",{className:h().contheme2,children:null!==m?(0,t.jsxs)("div",{className:h().userSection8,children:[(0,t.jsx)(r(),{href:"/selectDm",children:(0,t.jsx)("div",{className:h().roomButton,children:(0,t.jsx)(i.Z,{style:{fontSize:"26px",color:"#000000",marginRight:"18px"}})})}),(0,t.jsx)(r(),{href:"/userProfile",children:(0,t.jsxs)("span",{className:h().userName,children:["ようこそ,",(0,t.jsx)("span",{className:h().userName2,children:m}),"さん"]})}),(0,t.jsx)(r(),{href:"/bosyuuDescription",children:(0,t.jsx)("button",{className:h().redButton,children:"募集"})})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r(),{href:"/login",children:(0,t.jsx)("button",{className:h().kaninButton,children:"ログイン"})}),(0,t.jsx)(r(),{href:"/signUp",children:(0,t.jsx)("button",{className:h().loginButton,children:"会員登録"})}),(0,t.jsx)(r(),{href:"/signUp",children:(0,t.jsx)("button",{className:h().redButton,children:"コーチ登録"})})]})}),(0,t.jsxs)("div",{className:h().contheme,children:[(0,t.jsx)(r(),{href:"/",children:(0,t.jsx)("button",{className:void 0===C?h().selectedButton:h().button,onClick:()=>handleButtonClick("おすすめ"),children:"おすすめ"})}),(0,t.jsx)(r(),{href:"/recruit?value=1",children:(0,t.jsx)("button",{className:"1"===C?h().selectedButton:h().button,onClick:()=>handleButtonClick("VALORANT"),children:"VALORANT"})}),(0,t.jsx)(r(),{href:"/recruit?value=2",children:(0,t.jsx)("button",{className:"2"===C?h().selectedButton:h().button,onClick:()=>handleButtonClick("APEX"),children:"APEX"})}),(0,t.jsx)(r(),{href:"/recruit?value=3",children:(0,t.jsx)("button",{className:"3"===C?h().selectedButton:h().button,onClick:()=>handleButtonClick("LOL"),children:"LOL"})}),(0,t.jsxs)(r(),{href:"/recruit?value=4",children:[(0,t.jsx)("button",{className:"4"===C?h().selectedButton:h().button,onClick:()=>handleButtonClick("Fortnite"),children:"Fortnite"})," "]}),(0,t.jsxs)(r(),{href:"/recruit?value=5",children:[(0,t.jsx)("button",{className:"5"===C?h().selectedButton:h().button,onClick:()=>handleButtonClick("StreetFighter"),children:"StreetFighter"})," "]}),(0,t.jsxs)(r(),{href:"/recruit?value=7",children:[(0,t.jsx)("button",{className:"7"===C?h().selectedButton:h().button,onClick:()=>handleButtonClick("OverWatch2"),children:"OverWatch2"})," "]}),(0,t.jsx)(r(),{href:"/allSearch",children:(0,t.jsx)("button",{className:"8"===C?h().selectedButton:h().button,onClick:()=>handleButtonClick("すべて見る"),children:"すべて見る"})})]})]})})}},99882:function(e,n,s){"use strict";s.r(n);var t=s(85893),i=s(79686),l=s(94119),a=s(46403),r=s(65400),o=s.n(r),c=s(31059),u=s(97538),d=s(51024),_=s(94704),h=s(76718),g=s(41664),m=s.n(g),p=s(11163),x=s.n(p),j=s(67294),B=s(78759),N=s(82509),f=s(69359),C=s(32603),v=s.n(C);n.default=()=>{let[e,n]=(0,j.useState)(""),[s,r]=(0,j.useState)(""),[g,p]=(0,j.useState)(""),[C,b]=(0,j.useState)(""),[U,k]=(0,j.useState)(""),[w,S]=(0,j.useState)(),[y,H]=(0,j.useState)(!0),handleRegister=async n=>{n.preventDefault();try{console.log("アカウント作成開始");let n=(0,N.lh)(),s=await (0,h.Xb)(n,e,g);console.log("アカウント作成成功:",s);let t=s.user.uid;console.log("ユーザーID:",t);try{await (0,h.w$)(s.user)}catch(e){console.error("メールアドレスの確認メール送信に失敗:",e)}if(console.log("メールアドレスの確認メールを送信しました"),H(!1),!s||!s.user)throw Error("ユーザー情報の取得に失敗しました。");A(1)}catch(e){console.error("アカウント作成失敗:",e),alert("アカウント作成失敗: ".concat(e))}};(0,j.useEffect)(()=>{let e=(0,N.lh)(),n=(0,h.Aj)(e,async e=>{if(e&&e.emailVerified)try{await B.x.createUser.post({body:{userId:e.uid,userName:e.displayName||"匿名ユーザー"}}),alert("登録が完了しました"),x().push("http://localhost:3000/")}catch(e){console.error("データベースへの保存に失敗:",e)}});return()=>n()},[]);let[F,A]=(0,j.useState)(0);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(f.v,{user:w}),(0,t.jsxs)("div",{className:v().background,children:[(0,t.jsxs)("div",{className:v().container,children:[(0,t.jsx)("div",{className:v().container1,children:(0,t.jsx)("div",{className:v().loginTitle,children:"会員登録"})}),(0,t.jsx)(_.Z,{current:F,className:v().customStepsContainer,items:[{title:"アカウント情報入力",status:F>=0?"finish":"wait",icon:(0,t.jsx)(a.Z,{})},{title:"メール認証",status:F>=1?"finish":"wait",icon:(0,t.jsx)(l.Z,{})},{title:"完了",status:F>=2?"finish":"wait",icon:(0,t.jsx)(i.default,{})}]}),(0,t.jsx)(m(),{href:"/login",children:(0,t.jsx)("div",{className:v().kaninn,children:"ログインはこちら"})}),(0,t.jsx)("div",{className:v().containerAll,children:y?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:v().loginContainer1,children:[(0,t.jsx)("img",{src:"/icon/icon.png",alt:"User",className:v().png}),(0,t.jsx)("div",{className:v().title,children:"スキルアップを、もっと身近に。一律800円でゲームの頂へ。"}),(0,t.jsx)("div",{className:v().title2,children:"800円という手頃な価格で、ゲームのプロから直接学べるチャンスを提供します。プレイスタイルの改善、戦略の練習、または特定のゲームでのレベルアップに役立つコーチングを通じて、ゲームでの成功をサポートします。"})]}),(0,t.jsxs)("div",{className:v().loginContainer,children:[(0,t.jsxs)("div",{className:v().loginCon,children:[(0,t.jsx)("div",{className:v().loginC,children:(0,t.jsx)("div",{className:v().loginForm,children:"アカウント作成"})}),(0,t.jsx)("div",{className:v().loginForm2,children:(0,t.jsxs)(u.Z,{name:"basic",labelCol:{span:8},wrapperCol:{span:16},style:{display:"flex",position:"relative",flexDirection:"column",right:"10px",top:"10px",maxWidth:"500px",margin:"0 auto"},initialValues:{remember:!0},onFinish:e=>{console.log("Success:",e)},onFinishFailed:e=>{console.log("Failed:",e)},autoComplete:"off",children:[(0,t.jsxs)(u.Z.Item,{label:"Eメール等",name:"username",rules:[{required:!0,message:"Please input your username!"}],style:{fontSize:"18px"},children:[(0,t.jsx)(d.Z,{style:{height:"30px",fontSize:"16px"},value:e,onChange:e=>{n(e.target.value)}})," "]}),(0,t.jsx)(u.Z.Item,{label:"パスワード",name:"password",rules:[{required:!0,message:"Please input your password!"}],children:(0,t.jsx)(d.Z.Password,{value:e,onChange:e=>{p(e.target.value)}})}),(0,t.jsx)(u.Z.Item,{name:"remember",valuePropName:"checked",wrapperCol:{offset:8,span:16},children:(0,t.jsx)(c.Z,{className:v().loginButton2,children:"Remember me"})}),(0,t.jsx)(u.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,t.jsx)(o(),{className:v().loginButton1,type:"primary",htmlType:"submit",onClick:handleRegister,children:"作成"})})]})})]})," "]})]}):(0,t.jsxs)("div",{className:v().loginContainer2,children:[(0,t.jsxs)("div",{className:v().loginContainer3,children:[(0,t.jsx)("div",{className:v().logintitle,children:"メールアドレス受信確認用のメールを送信しました"}),(0,t.jsx)("div",{className:v().logintitle2,children:"メールをご確認いただき、メールに記載されたURLをクリックして、登録を完了してください。"})]}),(0,t.jsxs)("div",{className:v().loginContainer4,children:[(0,t.jsx)("div",{className:v().logintitle3,children:"メールが届かない場合"}),(0,t.jsx)("div",{className:v().logintitle4,children:"1. 迷惑メールフォルダに振り分けられていたり、フィルターや転送の設定によって受信ボックス以外の場所に保管されていないかをご確認ください。"}),(0,t.jsx)("div",{className:v().logintitle4,children:"2. メールアドレスが正しいかどうかをご確認ください。"}),(0,t.jsx)("div",{className:v().logintitle4,children:"3. メールの配信に時間がかかる場合があります。数分待ってから再度お試しください。"})]})," "]})})]})," "]})]})}},55293:function(e){e.exports={container:"BasicHeader_container__ASIaK",contheme:"BasicHeader_contheme__zTdPw",button:"BasicHeader_button__R08NF",contheme2:"BasicHeader_contheme2__RIUwH",kaninButton:"BasicHeader_kaninButton__CEv_8",loginButton:"BasicHeader_loginButton__n_4uq",redButton:"BasicHeader_redButton__R57u1",searchContainer:"BasicHeader_searchContainer__5csEn",searchInput:"BasicHeader_searchInput__HA9Ps",searchButton:"BasicHeader_searchButton__1KIkK",main:"BasicHeader_main__Vqufr",userBtn:"BasicHeader_userBtn__wlK48",userIcon:"BasicHeader_userIcon__UecGa",userContainer:"BasicHeader_userContainer__waGrV",userName:"BasicHeader_userName__KiR1h",userName2:"BasicHeader_userName2__ugag8",loading:"BasicHeader_loading__jW7n8",spin:"BasicHeader_spin__Mb5Hn",selectedButton:"BasicHeader_selectedButton__T8vja",userSection8:"BasicHeader_userSection8__L5ol4",iconblack:"BasicHeader_iconblack__lr8uA",roomButton:"BasicHeader_roomButton__fV8mf"}},32603:function(e){e.exports={background:"signUp_background__BL5CN",loginContainer:"signUp_loginContainer__495r7",customStepsContainer:"signUp_customStepsContainer__Um2Uc",loginForm:"signUp_loginForm__QO4g6",loginButton:"signUp_loginButton__RjZKN",container:"signUp_container__ZbPyI",container1:"signUp_container1__SxC_x",loginTitle:"signUp_loginTitle__qgDTw",png:"signUp_png__CPFZD",title:"signUp_title___uQud",title2:"signUp_title2__CSnwy",containerAll:"signUp_containerAll__Sg7SM",loginContainer1:"signUp_loginContainer1__vkITt",kaninn:"signUp_kaninn__AKrwH",searchmail:"signUp_searchmail__yzLwi",searchInput:"signUp_searchInput__sbttu",mail:"signUp_mail__0AthV",password:"signUp_password__8PBcJ",searchpass:"signUp_searchpass__PArfh",loginContainer2:"signUp_loginContainer2__S3404",loginContainer3:"signUp_loginContainer3__9Pm3D",logintitle:"signUp_logintitle__YH_UK",logintitle2:"signUp_logintitle2__jmswu",loginContainer4:"signUp_loginContainer4__kNJEZ",logintitle3:"signUp_logintitle3__ripXq",logintitle4:"signUp_logintitle4__Azo_0",loginCon:"signUp_loginCon__ekurK",loginForm2:"signUp_loginForm2__L9ttr",loginC:"signUp_loginC__j8qFh",loginButton1:"signUp_loginButton1__A5B1R",loginButton2:"signUp_loginButton2__8oEUm"}}},function(e){e.O(0,[664,119,704,461,774,888,179],function(){return e(e.s=7314)}),_N_E=e.O()}]);