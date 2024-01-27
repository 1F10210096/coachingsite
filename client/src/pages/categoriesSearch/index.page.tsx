/* eslint-disable max-lines */
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css'; // スタイルシートのパスを適切に設定
// eslint-disable-next-line complexity
const AllSearch = () => {
  const router = useRouter();
  const Id = router.query.id;
  const [user, setUser] = useState<string | null>(null);
  const [categories, setCategories] = useState({
    FPS: false,
    CardGame: false,
    RPG: false,
    FightingGame: false,
    SmartphoneGame: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  interface Game {
    id: string;
    title: string;
    // 他のプロパティがあればここに追加
  }
  const [gameList, setGamelist] = useState<Game[]>([]);


  useEffect(() => {
    const auth = getAuth();
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

  // const handleCheckboxChange = (event) => {
  //   setCategories({
  //     ...categories,
  //     [event.target.name]: event.target.checked,
  //   });
  //   // ここで任意の処理を行う。例えば、選択されたカテゴリに基づいてデータをフェッチするなど
  // };

  const fetchRecruitList = async () => {
    try {
      if (typeof Id === 'string') {
        const response = await apiClient.fetchCategoriesRecruit.post({
          body: {
            Id,
          },
        });
        setGamelist(response.body);
      } else {
        // Id が string でない場合の処理
      }
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };
  useEffect(() => {
    fetchRecruitList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (id: string) => {
    router.push(`../recruit?value=${id}`);
  };

  return (
    <>
      <BasicHeader user={user ?? undefined} />
      <div className={styles.allContainer}>
        <div className={styles.homeContainer}>
          <Link href="/">
            <div className={styles.home}>ホーム</div>
          </Link>
          {/* <div className={styles.home3}>></div> */}
          <div className={styles.home2}>ゲーム一覧</div>
        </div>
        <div className={styles.allSearch}>
          <h1 className={styles.title}>全ゲーム一覧</h1>
          <div className={styles.searchContainer}>
            <div>
              {gameList.map((game) => (
                <div key={game.id} className={styles.smallContainer}>
                  <div onClick={() => handleClick(game.id)}>{game.title}</div>
                </div>
              ))}
              {/* Other JSX elements */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllSearch;
