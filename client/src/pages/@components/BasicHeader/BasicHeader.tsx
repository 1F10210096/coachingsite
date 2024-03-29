/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable react/jsx-no-duplicate-props */
import { HeartOutlined, MailOutlined } from '@ant-design/icons';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import styles from './BasicHeader.module.css';
export const BasicHeader = ({ user }: { user?: string }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [myProfile, setMyProfile] = useState<string | null>(null);

  const [userId, setUserId] = useState<string | null>(null);

  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const router = useRouter();

  // URLのクエリパラメーターからvalueを取得
  const { value } = router.query;

  // ボタンがクリックされたときに呼ばれる関数
  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  useEffect(() => {
    try {
      const auth = createAuth();
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          // 保存が成功したら、適切なページにリダイレクト
          setUserId(firebaseUser.uid);
        } else {
          setUserId(null);
        }
      });
      return () => unsubscribe();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  const fetchRecruit = async () => {
    try {
      if (userId !== null) {
        const response = await apiClient.fetchMyProfile.post({
          body: { Id: userId },
        });
        console.log(response.body);
        setMyProfile(response.body.name);
      } else {
        // userId が null の場合の処理
      }
      setIsLoading(false); // ローディング終了
    } catch (error) {
      setIsLoading(false); // エラーが発生してもローディング終了
    }
  };
  useEffect(() => {
    fetchRecruit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {myProfile !== null ? (
            <div className={styles.userSection8}>
              <Link href="/like">
                <div className={styles.roomButton2}>
                  <HeartOutlined
                    style={{ fontSize: '26px', color: '#000000', marginRight: '18px' }}
                  />
                </div>
              </Link>

              <Link href="/selectDm">
                <div className={styles.roomButton}>
                  <MailOutlined
                    style={{ fontSize: '26px', color: '#000000', marginRight: '18px' }}
                  />
                </div>
              </Link>
              <Link href="/userProfileAll">
                <span className={styles.userName}>
                  ようこそ,
                  <span className={styles.userName2}>{myProfile}</span>さん
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
              <Link href="/signUp">
                <button className={styles.redButton2}>コーチ登録</button>
              </Link>
            </>
          )}
        </div>
        <div className={styles.contheme}>
          <Link href="/">
            <button
              className={value === undefined ? styles.selectedButton : styles.button}
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
            <button
              className={value === '2' ? styles.selectedButton : styles.button}
              onClick={() => handleButtonClick('APEX')}
            >
              APEX
            </button>
          </Link>
          <Link href="/recruit?value=3">
            <button
              className={value === '3' ? styles.selectedButton : styles.button}
              onClick={() => handleButtonClick('LOL')}
            >
              LOL
            </button>
          </Link>
          <Link href="/recruit?value=4">
            <button
              className={value === '4' ? styles.selectedButton : styles.button}
              onClick={() => handleButtonClick('Fortnite')}
            >
              Fortnite
            </button>{' '}
          </Link>
          <Link href="/recruit?value=5">
            <button
              className={value === '5' ? styles.selectedButton : styles.button}
              onClick={() => handleButtonClick('StreetFighter')}
            >
              StreetFighter
            </button>{' '}
          </Link>
          <Link href="/recruit?value=7">
            <button
              className={value === '7' ? styles.selectedButton : styles.button}
              onClick={() => handleButtonClick('OverWatch2')}
            >
              OverWatch2
            </button>{' '}
          </Link>
          <Link href="/allSearch">
            <button
              className={value === '8' ? styles.selectedButton : styles.button}
              onClick={() => handleButtonClick('すべて見る')}
            >
              すべて見る
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
