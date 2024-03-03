import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createAuth } from 'src/utils/firebase';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';
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
            <div className={styles.title}>プライバシーポリシー</div>
            <div className={styles.terms}>
              [サイト名]（以下、「当サイト」といいます。）は、当サイトの提供するコーチングサービス（以下、「本サービス」といいます。）における、ユーザーのプライバシー保護を非常に重要視しています。本プライバシーポリシーは、当サイトがユーザーから収集する情報とその情報の使用方法について説明します。
            </div>
            <div className={styles.smallTitle}>1. 収集する情報</div>
            <div className={styles.terms2}>
              当サイトは、本サービスの利用登録、利用時に以下の情報を収集することがあります。
            </div>
            <div className={styles.terms4}>
              <div className={styles.terms3}>・氏名、年齢、性別などの個人情報</div>
              <div className={styles.terms3}>・メールアドレス、電話番号などの連絡先情報</div>
              <div className={styles.terms3}>
                ・利用状況、アクセスログ、IPアドレスなどの技術的情報
              </div>
            </div>
            <div className={styles.smallTitle}>2. 情報の使用目的</div>
            <div className={styles.terms2}>
              当サイトが収集する情報は、以下の目的で使用されます。
            </div>
            <div className={styles.terms4}>
              <div className={styles.terms3}>・本サービスの提供・運営のため</div>
              <div className={styles.terms3}>・ユーザーサポート、問い合わせ対応のため</div>
              <div className={styles.terms3}>・サービス改善、新サービスの開発のため</div>
              <div className={styles.terms3}>・利用規約違反の調査のため</div>
              <div className={styles.terms3}>・マーケティング、広告の配信のため</div>
            </div>
            <div className={styles.smallTitle}>3. 情報の共有と開示</div>
            <div className={styles.terms2}>
              当サイトは、以下の場合を除き、ユーザーの個人情報を第三者に共有または開示しません。
            </div>
            <div className={styles.terms4}>
              <div className={styles.terms3}>・ユーザーの同意がある場合</div>
              <div className={styles.terms3}>・法令に基づく場合</div>
              <div className={styles.terms3}>
                ・ユーザーの生命、身体または財産の保護のために必要がある場合
              </div>
              <div className={styles.terms3}>
                ・国の機関または地方公共団体が法令の定める事務を遂行することに対して協力する必要がある場合
              </div>
            </div>
            <div className={styles.smallTitle2}> 4. 情報の保護</div>
            <div className={styles.terms2}>
              当サイトは、ユーザーの情報の安全性を保護するために、適切な物理的、技術的、管理的措置を講じます。また、情報への不正アクセスや情報の紛失、破壊、改ざん、漏洩を防ぐためのセキュリティ対策を実施しています。
            </div>
            <div className={styles.smallTitle3}>5. プライバシーポリシーの変更</div>
            <div className={styles.terms7}>
              当サイトは、必要に応じて本プライバシーポリシーを更新することがあります。変更後のプライバシーポリシーは、当サイト上に公開することにより効力を生じるものとします。
            </div>

            <div className={styles.smallTitle3}>6. お問い合わせ</div>
            <div className={styles.terms7}>
              本プライバシーポリシーに関するお問い合わせは、当サイトが指定する方法でご連絡ください。
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
