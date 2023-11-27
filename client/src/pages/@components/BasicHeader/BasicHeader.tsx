import type { UserModel } from 'commonTypesWithClient/models';
import Link from 'next/link';
import { useState } from 'react';
import styles from './BasicHeader.module.css';

export const BasicHeader = ({ user }: { user?: UserModel }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // 検索処理をここに書く
    console.log(`検索: ${searchTerm}`);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="何のゲームをお探しですか？"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchButton} onClick={handleSearch} />
        </div>
        <div className={styles.contheme2}>
          {/* ユーザーがログインしているかどうかを確認 */}
          {user ? (
            <div className={styles.userSection}>
              {/* ユーザー情報を表示 */}
              <span className={styles.userName}>ようこそ, {user.name}さん</span>
              <Link href="/userProfile">
                <button className={styles.profileButton}>プロフィール</button>
              </Link>
              <Link href="/bosyuu">
                <button className={styles.redButton}>募集</button>
              </Link>
              {/* その他のユーザー関連のオプション */}
            </div>
          ) : (
            <>
              <Link href="/login">
                <button className={styles.kaninButton}>ログイン</button>
              </Link>
              <Link href="/signUp">
                <button className={styles.loginButton}>会員登録</button>
              </Link>
              <Link href="/coachSignUp">
                <button className={styles.redButton}>コーチ登録</button>
              </Link>
            </>
          )}
        </div>
        <div className={styles.contheme}>
          <Link href="/">
            <button className={styles.button}>おすすめ</button>
          </Link>
          <Link href="/valorant">
            <button className={styles.button}>VALOLANT</button>
          </Link>
          <button className={styles.button}>スプラトゥーン</button>
          <button className={styles.button}>LOL</button>
          <button className={styles.button}>CSGO</button>
          <button className={styles.button}>COD 2</button>
          <button className={styles.button}>OverWatch2</button>
          <button className={styles.button}>すべて見る</button>
        </div>
      </div>
    </>
  );
};
