import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createAuth } from 'src/utils/firebase';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';
import { BasicUnder } from '../@components/BasicUnder/BasicUnder';
const Login = () => {
  const [Id, setUserUUID] = useState('');
  useEffect(() => {
    const auth = createAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ユーザーがログインしている場合の処理
        console.log('Logged in as:', user.email);
        setUserUUID(user.uid);
      } else {
        // ユーザーがログインしていない場合の処理
        console.log('No user logged in');
      }
    });

    // コンポーネントのアンマウント時にリスナーを解除
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className={styles.box1}>
        <BasicHeader user={Id} />
        <div className={styles.box}>
          <div className={styles.boxCon}>
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>ユーザー設定</div>
              <div className={styles.boxCon2}>
                <Link href="/userProfileAll">
                  <div className={styles.boxCon3}>プロフィール</div>
                </Link>
                <Link href="/like">
                  <div className={styles.boxCon3}>いいね一覧</div>
                </Link>
                <div className={styles.boxCon3}>コーチ募集一覧</div>
                <div className={styles.boxCon3}>応募一覧</div>
              </div>
            </div>
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>設定</div>
              <div className={styles.boxCon2}>
                <div className={styles.boxCon3}>個人情報設定</div>
              </div>
            </div>
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>ヘルプ</div>
              <div className={styles.boxCon2}>
                <Link href="/form">
                  <div className={styles.boxCon3}>お問い合わせ</div>
                </Link>
              </div>
            </div>
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>規約・ポリシー</div>
              <div className={styles.boxCon2}>
                <Link href="/terms">
                  <div className={styles.boxCon3}>利用規約等</div>
                </Link>
                <Link href="/privacy">
                  <div className={styles.boxCon3}>プライバシーポリシー</div>
                </Link>
              </div>
            </div>{' '}
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>ログアウト</div>
              <div className={styles.boxCon2}>
                <Link href="/logout">
                  <div className={styles.boxCon3}>ログアウト</div>
                </Link>
              </div>{' '}
            </div>
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>ログアウト</div>
              <div className={styles.boxCon2}>
                <Link href="/logout">
                  <div className={styles.boxCon3}>ログアウト等</div>
                </Link>
              </div>{' '}
            </div>
          </div>
        </div>
        <div className={styles.loginContainer}>
          <div className={styles.termsCon}>
            <div className={styles.title}>コーチングサイト利用規約</div>
            <div className={styles.terms}>
              本利用規約（以下、「本規約」といいます。）は、[サイト名]（以下、「当サイト」といいます。）が提供するコーチングサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。当サイトを利用するすべての利用者（以下、「ユーザー」といいます。）は、本規約に同意の上、本サービスを利用するものとします。
            </div>
            <div className={styles.smallTitle}>第1条（適用）</div>
            <div className={styles.terms2}>
              本規約は、ユーザーと当サイトとの間の本サービスの利用に関わる一切の関係に適用されます。
            </div>
            <div className={styles.smallTitle2}>2. 利用登録</div>
            <div className={styles.terms2}>
              利用登録希望者が当サイトの定める方法によって利用登録を申請し、当サイトがこれを承認することによって、利用登録が完了するものとします。
            </div>
            <div className={styles.terms2}>
              当サイトは、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあります。また、その理由については一切の開示義務を負わないものとします。
            </div>
            <div className={styles.terms4}>
              <div className={styles.terms3}>・申請に虚偽の事項があった場合</div>
              <div className={styles.terms3}>
                ・本規約に違反したことがある者からの申請である場合
              </div>
              <div className={styles.terms3}>
                ・その他、当サイトが利用登録を相当でないと判断した場合
              </div>
            </div>
            <div className={styles.smallTitle}>3. ユーザーIDおよびパスワードの管理</div>
            <div className={styles.terms2}>
              1.
              利用登録希望者が当サイトの定める方法によって利用登録を申請し、当サイトがこれを承認することによって、利用登録が完了するものとします。
            </div>
            <div className={styles.terms2}>
              2.
              当サイトは、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあります。また、その理由については一切の開示義務を負わないものとします。
            </div>
            <div className={styles.smallTitle2}> 4. 禁止事項</div>
            <div className={styles.terms2}>
              ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
            </div>
            <div className={styles.terms4}>
              <div className={styles.terms3}>・法令または公序良俗に違反する行為</div>
              <div className={styles.terms3}>・犯罪行為に関連する行為</div>
              <div className={styles.terms3}>
                ・当サイト、本サービスの他のユーザー、または第三者の著作権、商標権、その他の知的財産権を侵害する行為
              </div>
              <div className={styles.terms3}>
                ・当サイト、本サービスの運営を妨害するおそれのある行為
              </div>
              <div className={styles.terms3}>・その他、当サイトが不適切と判断する行為</div>
            </div>
            <div className={styles.smallTitle3}>5. 免責事項</div>
            <div className={styles.terms7}>
              1.
              当サイトは、本サービスに関連してユーザーが被ったいかなる損害についても、一切の責任を負わないものとします。
            </div>
            <div className={styles.terms7}>
              2.
              万が一、当サイトが責任を負うべき事由が生じた場合でも、当サイトは、ユーザーが実際に支払った金額を上限として損害賠償責任を負うものとします。
            </div>
            <div className={styles.smallTitle3}>6. 契約解除およびサービス利用制限</div>
            <div className={styles.terms7}>
              当サイトは、ユーザーが本規約のいずれかの条項に違反した場合、事前の通知なくして本サービスの利用を一時停止し、またはユーザーとの契約を解除することができるものとします。
            </div>
            <div className={styles.smallTitle3}>7. 規約の変更</div>
            <div className={styles.terms7}>
              当サイトは、必要と判断した場合には、ユーザーに通知することなく本規約を変更することができるものとします。本規約の変更後、本サービスの利用を続けた場合には、変更後の規約に同意したものとみなされます。
            </div>
            <div className={styles.smallTitle3}>8. 連絡方法</div>
            <div className={styles.terms7}>
              本サービスに関するお問い合わせや通知に関しては、当サイトが指定する方法で行うものとします。
            </div>
          </div>
        </div>
        <BasicUnder />
      </div>
    </>
  );
};

export default Login;
