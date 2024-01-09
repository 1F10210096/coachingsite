import type { UserModel } from 'commonTypesWithClient/models';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './BasicHeader.module.css';

export const BasicHeader = ({ user }: { user?: UserModel }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [myProfile, setMyProfile] = useState([]);

  const [userId, setUserId] = useState('');

  const [selectedButton, setSelectedButton] = useState(null);

  const router = useRouter();

  // URLのクエリパラメーターからvalueを取得
  const { value } = router.query;
  console.log(value);

  // ボタンがクリックされたときに呼ばれる関数
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ユーザーがログインしている場合、ユーザー情報をセット
        console.log(firebaseUser);
        setUserId(firebaseUser.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchRecruit = async () => {
    try {
      setIsLoading(true); // ローディング開始
      const response = await apiClient.fetchMyProfile.post({
        body: { Id: userId },
      });
      setMyProfile(response.body);
      setIsLoading(false); // ローディング終了
    } catch (error) {
      console.error('プロファイルの取得に失敗しました:', error);
      setIsLoading(false); // エラーが発生してもローディング終了
    }
  };
  useEffect(() => {
    fetchRecruit();
  }, [userId]);

  const handleSearch = () => {
    // 検索処理をここに書く
    console.log(`検索: ${searchTerm}`);
  };

  if (isLoading) {
    return <div className={styles.loading}>ローディング中...</div>;
  }

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
          {user ? (
            <div className={styles.userSection8}>
              <Link href="/userProfile">
                <span className={styles.userName}>
                  ようこそ, <span className={styles.userName2}>{myProfile.name}</span>さん
                </span>
              </Link>
              <Link href="/bosyuuDescription">
                <button className={styles.redButton}>募集</button>
              </Link>
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
            <button
              className={!value ? styles.selectedButton : styles.button}
              onClick={() => handleButtonClick('おすすめ')}
            >
              おすすめ
            </button>
          </Link>
          <Link href="/recruit?value=1">
            <button
              className={value === '1' ? styles.selectedButton : styles.button}
              onClick={() => handleButtonClick('VALORANT')}
            >
              VALORANT
            </button>
          </Link>
          <Link href="/recruit?value=2">
            <button className={styles.button}>APEX</button>
          </Link>
          <Link href="/recruit?value=3">
            <button className={styles.button}>LOL</button>
          </Link>
          <button className={styles.button}>CSGO</button>
          <button className={styles.button}>COD 2</button>
          <button className={styles.button}>OverWatch2</button>
          <button className={styles.button}>すべて見る</button>
        </div>
      </div>
    </>
  );
};
