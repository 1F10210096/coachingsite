(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[172],{2701:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/bosyuuDescription",function(){return t(8390)}])},8390:function(e,s,t){"use strict";t.r(s);var n=t(5893),i=t(7596),a=t.n(i),c=t(6718),l=t(1163),o=t.n(l),r=t(7294),u=t(8759),d=t(2509),_=t(1999),p=t.n(_),m=t(1738),h=t.n(m);s.default=()=>{let[e,s]=(0,r.useState)(1),[t,i]=(0,r.useState)(),[l,_]=(0,r.useState)([]),[m,x]=(0,r.useState)(""),N={VALORANT:["アイアン","ブロンズ","シルバー","ゴールド","プラチナ","ダイヤ","アセンダント","イモータル","レディアント"],LOL:["アイアン","ブロンズ","シルバー","ゴールド","プラチナ","ダイヤ","マスター","グランドマスター","チャレンジャー"],CSGO:["ブロンズ","シルバー","ゴールド","プラチナ","ダイヤ","クラウン","エース"],"COD 2":["ブロンズ","シルバー","ゴールド","プラチナ","ダイヤ","クラウン","エース"],OverWatch2:["ブロンズ","シルバー","ゴールド","プラチナ","ダイヤ","クラウン","エース"]},b=["ゲーム選択","ランク選択","詳細情報","注意事項"],[j,v]=(0,r.useState)("");(0,r.useEffect)(()=>{let e=(0,d.lh)(),s=(0,c.Aj)(e,e=>{e?(console.log(e),v(e.uid)):v("")});return()=>s()},[]);let[g,y]=(0,r.useState)(0),[D,k]=(0,r.useState)(0),[C,S]=(0,r.useState)([]),handleRankChange=e=>{let s=t?N[t]:void 0,n=null==s?void 0:s.indexOf(e);_(s=>s.includes(e)?s.filter(s=>s!==e):[...s,e]),"number"==typeof n&&S(e=>e.includes(n)?e.filter(e=>e!==n):[...e,n])},handleNextStep=()=>{console.log(E),s(e+1)},[T,O]=(0,r.useState)(""),[f,w]=(0,r.useState)(""),[L,A]=(0,r.useState)(""),[E,F]=(0,r.useState)(""),[P,R]=(0,r.useState)(""),[I,X]=(0,r.useState)(""),[B,G]=(0,r.useState)([]),handleTagChange=e=>{B.includes(e)?G(B.filter(s=>s!==e)):G([...B,e])},handleSubmit=async e=>{console.log(E);try{console.log({user:j,title:T,selectedGameIndex:g,selectedMyRankIndex:D,selectedRanks:l,selectedTags:B,acheavement:E,description:f,suchedule:I,notes:P}),console.log(m),console.log(L),await u.x.createBosyuu.post({body:{user:j,title:T,selectedGameIndex:g,selectedMyRankIndex:D,lessonType:L,selectedRanksIndex:C,selectedTags:B,acheavement:E,description:f,suchedule:I,notes:P}}),a()("募集作成が完了しました"),o().push("http://localhost:3000/")}catch(e){a()(e)}};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:p().container}),(0,n.jsx)("div",{className:p().loginTitle,children:"コーチング募集"}),(0,n.jsx)("div",{className:p().step,children:Array.from({length:4},(e,s)=>s+1).map(s=>(0,n.jsx)("div",{children:(0,n.jsxs)("div",{className:p().stepContainer,children:[(0,n.jsx)("div",{className:"".concat(p().stepNumber," ").concat(e>=s?p().completedStepNumber:"")}),s<4&&(0,n.jsx)("div",{className:"".concat(p().stepNumberLine," ").concat(e>s?p().completedStepNumberLine:"")}),(0,n.jsx)("div",{className:p().stepTitle,children:b[s-1]})]})},s))}),1===e&&(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:p().as,children:[(0,n.jsx)("label",{className:p().mail,children:"対象ゲームを選択してください"}),(0,n.jsxs)("select",{id:"game-select",value:t,onChange:e=>{let s=e.target.value;["VALORANT","LOL","CSGO","COD 2","OverWatch2"].includes(s)&&i(s);let t=Object.keys(N).indexOf(s)+1;["VALORANT","LOL","CSGO","COD 2","OverWatch2"].includes(e.target.value)&&i(e.target.value),y(t),_([])},className:p().select,children:[(0,n.jsx)("option",{value:"",className:p().mail,children:"ゲームを選択してください"}),Object.keys(N).map(e=>(0,n.jsx)("option",{value:e,className:p().mail,children:e},e))]}),(0,n.jsx)("label",{className:p().myRank,children:"自分のランクを選択してください"}),(0,n.jsxs)("select",{id:"rank-select",value:m,onChange:e=>{let s=e.target.value,n=t?N[t]:void 0;if(n){let t=n.indexOf(s)+1;x(e.target.value),k(t)}},className:p().select2,disabled:!t,children:[(0,n.jsx)("option",{value:"",children:"自分のランクを選択してください"}),t&&Object.prototype.hasOwnProperty.call(N,t)?N[t].map(e=>(0,n.jsx)("option",{value:e,children:e},e)):(0,n.jsx)("option",{value:"",disabled:!0})]}),t&&N[t].length>0?(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{htmlFor:"rank-select",className:p().subjectRank,children:"対象ランクを選択してください"}),(0,n.jsx)("div",{className:p().pick,children:N[t].map(e=>(0,n.jsxs)("div",{className:p().rankItem,children:[(0,n.jsx)("input",{type:"checkbox",id:e,name:e,checked:l.includes(e),onChange:()=>handleRankChange(e),className:p().pick}),(0,n.jsx)("label",{htmlFor:e,className:p().rankName,children:e})]},e))})]}):(0,n.jsx)("div",{className:p().noPick}),(0,n.jsx)("button",{onClick:handleNextStep,className:p().next,children:"次へ"})]})}),2===e&&(0,n.jsxs)("div",{className:p().as,children:[(0,n.jsx)("div",{className:p().title,children:"募集タイトルを入力してください"}),(0,n.jsx)("textarea",{placeholder:"タイトルを入力してください",onChange:e=>{O(e.target.value)},className:p().input}),(0,n.jsx)("div",{className:p().description,children:"募集内容を入力してください"}),(0,n.jsx)("textarea",{placeholder:"募集内容を入力してください",onChange:e=>{w(e.target.value)},className:p().inputDescription}),(0,n.jsx)("div",{className:p().description,children:"レッスン形式を入力してください"}),(0,n.jsx)("textarea",{placeholder:"レッスン形式を入力してください",onChange:e=>{A(e.target.value)},className:p().inputDescription}),(0,n.jsx)("div",{className:p().acheavement,children:"実績を入力してください"}),(0,n.jsx)("textarea",{placeholder:"実績を入力してください",onChange:e=>{F(e.target.value)},className:p().inputAcheavement}),(0,n.jsx)("button",{onClick:handleNextStep,className:p().next2,children:"次へ"})]}),3===e&&(0,n.jsxs)("div",{className:p().as,children:[(0,n.jsx)("div",{className:p().title,children:"スケジュールを入力してください"}),(0,n.jsx)("textarea",{placeholder:"スケジュールを入力してください",onChange:e=>{X(e.target.value)},className:p().input}),(0,n.jsx)("div",{className:p().notes,children:"注意事項を入力してください"}),(0,n.jsx)("textarea",{placeholder:"注意事項を入力してください",onChange:e=>{R(e.target.value)},className:p().inputNotes}),(0,n.jsxs)("div",{className:p().notes,children:["タグを設定入力してください",["初心者歓迎","上級者歓迎","スパルタ指導","仲良くワイワイ"].map(e=>(0,n.jsxs)("div",{className:p().tagItem,children:[(0,n.jsx)("input",{type:"checkbox",id:e,name:e,checked:B.includes(e),onChange:()=>handleTagChange(e),className:p().pick}),(0,n.jsx)("label",{htmlFor:e,children:e})]},e))]}),(0,n.jsx)("button",{onClick:handleNextStep,className:p().next2,children:"次へ"})]}),4===e&&(0,n.jsx)("div",{className:h().as,children:(0,n.jsxs)("div",{className:h().allContainer,children:[(0,n.jsx)("div",{className:h().title,children:"入力内容はこの通りでいいですか？"}),(0,n.jsxs)("div",{className:h().subTitleContainer,children:[(0,n.jsx)("div",{className:h().subTitle,children:"ゲーム名"}),(0,n.jsx)("div",{className:h().content,children:t}),(0,n.jsx)("div",{className:h().subTitle,children:"自分のランク"}),(0,n.jsx)("div",{className:h().content,children:m}),(0,n.jsx)("div",{className:h().subTitle,children:"対象ランク"}),(0,n.jsx)("div",{className:h().content,children:l}),(0,n.jsx)("div",{className:h().subTitle,children:"募集タイトル"}),(0,n.jsx)("div",{className:h().content,children:T}),(0,n.jsx)("div",{className:h().subTitle,children:"募集内容"}),(0,n.jsx)("div",{className:h().content,children:f}),(0,n.jsx)("div",{className:h().subTitle,children:"レッスン形式"}),(0,n.jsx)("div",{className:h().content,children:L}),(0,n.jsx)("div",{className:h().subTitle,children:"実績"}),(0,n.jsx)("div",{className:h().content,children:E}),(0,n.jsx)("div",{className:h().subTitle,children:"スケジュール"}),(0,n.jsx)("div",{className:h().content,children:I}),(0,n.jsx)("div",{className:h().subTitle,children:"注意事項"}),(0,n.jsx)("div",{className:h().content,children:P}),(0,n.jsx)("div",{className:h().subTitle,children:"タグ"}),(0,n.jsx)("div",{className:h().content,children:B})]}),(0,n.jsx)("button",{className:h().next2,onClick:handleSubmit,children:"登録"})]})})]})}},1999:function(e){e.exports={loginContainer:"bosyuuDescription_loginContainer__X4nwB",loginForm:"bosyuuDescription_loginForm__DNp9P",loginButton:"bosyuuDescription_loginButton__GeCuc",container:"bosyuuDescription_container__r0kXw",loginTitle:"bosyuuDescription_loginTitle__nQjoJ",kaninn:"bosyuuDescription_kaninn__pXM2i",searchmail:"bosyuuDescription_searchmail__wbJXj",searchInput:"bosyuuDescription_searchInput__gKtn1",mail:"bosyuuDescription_mail__jy7N1",pick:"bosyuuDescription_pick__C_eDl",rankItem:"bosyuuDescription_rankItem__6POtX",rankName:"bosyuuDescription_rankName__mu3W2",next:"bosyuuDescription_next__k04w6",password:"bosyuuDescription_password__kFvI_",searchpass:"bosyuuDescription_searchpass__tUhwn",progressBarContainer:"bosyuuDescription_progressBarContainer__rPZ7j",step:"bosyuuDescription_step__1xlTv",stepContainer:"bosyuuDescription_stepContainer__gAqo7",as:"bosyuuDescription_as__tNr_g",stepNumber:"bosyuuDescription_stepNumber__NvF_7",stepNumberLine:"bosyuuDescription_stepNumberLine__0Hfeo",active:"bosyuuDescription_active__JeUNE",stepTitle:"bosyuuDescription_stepTitle__n0oEQ",select:"bosyuuDescription_select__gd4lb",completedStepNumber:"bosyuuDescription_completedStepNumber__9ZzOS",completedStepNumberLine:"bosyuuDescription_completedStepNumberLine__UTjaq",subjectRank:"bosyuuDescription_subjectRank__AVSeN",myRank:"bosyuuDescription_myRank__WEvcf",select2:"bosyuuDescription_select2___1vtX",title:"bosyuuDescription_title__1lrOG",input:"bosyuuDescription_input__ZUFBX",description:"bosyuuDescription_description__pAv93",inputDescription:"bosyuuDescription_inputDescription__nYm7j",acheavement:"bosyuuDescription_acheavement__TTcl9",inputAcheavement:"bosyuuDescription_inputAcheavement__F218Q",next2:"bosyuuDescription_next2__ehwzq",notes:"bosyuuDescription_notes__4g7N6",inputNotes:"bosyuuDescription_inputNotes__3o9U_",tagItem:"bosyuuDescription_tagItem__8O5Eg",noPick:"bosyuuDescription_noPick__WdOVj"}},1738:function(e){e.exports={as:"index2_as__PI7Ed",allContainer:"index2_allContainer__Wpwar",title:"index2_title__cr70P",content:"index2_content__hgOFc",subTitle:"index2_subTitle__gDJN9",subTitleContainer:"index2_subTitleContainer__GNE3G",next2:"index2_next2__aiUmU"}}},function(e){e.O(0,[596,774,888,179],function(){return e(e.s=2701)}),_N_E=e.O()}]);