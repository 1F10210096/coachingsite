import assert from 'assert';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';
const Form = () => {
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

  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const response = await apiClient.form.post({
      body: {
        Id,
        message,
      },
    });
    // ここにAPI送信処理などを記述
    assert('送信完了しました');
  };

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
                <div className={styles.boxCon3}>お問い合わせ</div>
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
                <div className={styles.boxCon3}>ログアウト等</div>
              </div>{' '}
            </div>
          </div>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formTitle}>お問い合わせ</div>
          <p className={styles.formTitle2}>
            ご質問やご意見がございましたら、以下のフォームからお気軽にお問い合わせください。
          </p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formContainer2}>
              <label htmlFor="message" className={styles.form2}>
                メッセージ:
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={styles.form3}
              />
            </div>
            <button type="submit" className={styles.form4}>
              送信
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
