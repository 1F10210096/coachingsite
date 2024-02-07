/* eslint-disable max-lines */
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createAuth } from 'src/utils/firebase';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css'; // スタイルシートのパスを適切に設定
// eslint-disable-next-line complexity
const AllSearch = () => {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [categories, setCategories] = useState({
    FPS: false,
    CardGame: false,
    RPG: false,
    FightingGame: false,
    SmartphoneGame: false,
  });

  useEffect(() => {
    const auth = createAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log(firebaseUser);
        setUser(firebaseUser.uid);
      } else {
        // ユーザーがログアウトしている場合
        setUser(null);
      }
    });
    // コンポーネントがアンマウントされる際に購読を解除
    return () => unsubscribe();
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setCategories({
      ...categories,
      [name]: checked,
    });

    // チェックボックスの状態を更新した後にページ遷移
    router.push(`../categoriesSearch?id=${name}`);
  };

  const handleClick = (id: string) => {
    router.push(`../recruitDetail?id=${id}`);
  };

  return (
    <>
      <BasicHeader user={user ?? undefined} />

      <div className={styles.allContainer}>
        <div className={styles.homeContainer}>
          <Link href="/">
            <div className={styles.home}>ホーム</div>
          </Link>
          <div className={styles.home3} />
          <div className={styles.home2}>ゲーム一覧</div>
        </div>
        <div className={styles.allSearch}>
          <h1 className={styles.title}>全ゲーム一覧</h1>
          <div className={styles.searchContainer}>
            <div className={styles.smallContainer}>
              <label>
                <input
                  type="checkbox"
                  name="FPS"
                  checked={categories.FPS}
                  onChange={handleCheckboxChange}
                />
                FPS
              </label>
            </div>
            <div className={styles.smallContainer}>
              <label>
                <input
                  type="checkbox"
                  name="CardGame"
                  checked={categories.CardGame}
                  onChange={handleCheckboxChange}
                />
                カードゲーム
              </label>
            </div>
            <div className={styles.smallContainer}>
              <label>
                <input
                  type="checkbox"
                  name="RPG"
                  checked={categories.RPG}
                  onChange={handleCheckboxChange}
                />
                RPG
              </label>
            </div>
            <div className={styles.smallContainer}>
              <label>
                <input
                  type="checkbox"
                  name="FPS"
                  checked={categories.FightingGame}
                  onChange={handleCheckboxChange}
                />
                格闘ゲーム
              </label>
            </div>
            <div className={styles.smallContainer}>
              <label>
                <input
                  type="checkbox"
                  name="FPS"
                  checked={categories.SmartphoneGame}
                  onChange={handleCheckboxChange}
                />
                スマホゲーム
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllSearch;
