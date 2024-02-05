import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import router from 'next/router';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { createAuth, loginWithEmail } from 'src/utils/firebase';
import { useLoading } from '../@hooks/useLoading';
import styles from './index.module.css';

const Login = () => {
  const { addLoading, removeLoading } = useLoading();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const auth = createAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ユーザーがログインしている場合の処理
        console.log('Logged in as:', user.email);
      } else {
        // ユーザーがログインしていない場合の処理
        console.log('No user logged in');
      }
    });

    // コンポーネントのアンマウント時にリスナーを解除
    return () => unsubscribe();
  }, []);

  const loginEmail = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      const userCredential = await loginWithEmail(email, password);
      console.log('ログイン成功:', userCredential);
      alert('ログイン成功!');
      router.push('http://localhost:3000/');
    } catch (error) {
      console.error('ログイン失敗:', error);
      alert(`ログイン失敗: ${error}`);
    }
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className={styles.container} />
      <div className={styles.box}>
        <div className={styles.loginTitle}>ログイン</div>
        <Link href="/signUp">
          <div className={styles.kaninn}>会員登録はこちら</div>
        </Link>
        <div className={styles.loginContainer}>
          <form className={styles.loginForm}>
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

            <label htmlFor="password" className={styles.password}>
              パスワード
            </label>
            <input
              type="text"
              className={styles.searchpass}
              placeholder="パスワードを入力してください"
              value={password}
              onChange={handlePassword}
            />

            <button type="submit" className={styles.loginButton} onClick={loginEmail}>
              ログイン
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
