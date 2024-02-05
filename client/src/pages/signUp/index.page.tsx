import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import router from 'next/router';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import styles from './index.module.css'; // スタイルシートは適宜調整してください

const Register = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const auth = createAuth(); // `createAuth` 関数を使用して `auth` オブジェクトを取得
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!userCredential || !userCredential.user) {
        throw new Error('ユーザー情報の取得に失敗しました。');
      }
      console.log('アカウント作成成功。UUID:', userCredential.user.uid);
      alert('アカウント作成成功しました');
      console.log(userId, userName);
      const response = await apiClient.createUser.post({ body: { userId, userName } });
      console.log(response);
      router.push('http://localhost:3000');
    } catch (error) {
      console.error('アカウント作成失敗:', error);
      alert(`アカウント作成失敗: ${error}`);
    }
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className={styles.container} />
      <div className={styles.loginTitle}>会員登録</div>
      <Link href="/login">
        <div className={styles.kaninn}>ログインはこちら</div>
      </Link>
      <div className={styles.loginContainer}>
        <form className={styles.loginForm}>
          <label htmlFor="username" className={styles.mail}>
            ニックネーム
          </label>
          <input
            type="text"
            className={styles.searchmail}
            placeholder="ユーザーネームを入力してください"
            value={userName}
            onChange={handleUserName}
          />
          <label htmlFor="username" className={styles.mail}>
            メール
          </label>
          <input
            type="text"
            className={styles.searchmail}
            placeholder="メールアドレスを入力してください"
            value={email}
            onChange={handleEmail}
          />

          <label htmlFor="username" className={styles.mail}>
            パスワード
          </label>
          <input
            type="text"
            className={styles.searchmail}
            placeholder="パスワードを入力してください"
            value={password}
            onChange={handlePassword}
          />

          <button type="submit" className={styles.loginButton} onClick={handleRegister}>
            ログイン
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
