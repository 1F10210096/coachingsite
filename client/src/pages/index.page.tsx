import type { GameListModel } from 'commonTypesWithClient/models';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Home = () => {
  const [label, setLabel] = useState('');
  const [userUUID, setUserUUID] = useState('');
  const [gameList, setGamelist] = useState<GameListModel[]>([]);
  const fetchGames = async () => {
    try {
      const response = await apiClient.fetchGames.post();
      setGamelist(response.body);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };
  useEffect(() => {
    fetchGames();
  }, []);
  // Homeコンポーネント内

  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ユーザーがログインしている場合、ユーザー情報をセット
        console.log(firebaseUser);
        setUserUUID(firebaseUser.uid);
        setUser(firebaseUser);
      } else {
        // ユーザーがログアウトしている場合
        setUser(null);
      }
    });

    // コンポーネントがアンマウントされる際に購読を解除
    return () => unsubscribe();
  }, []);



  return (
    <>
 <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.coachTitle}>人気のゲーム</div>
        <div className={styles.gameList}>
          {gameList.map((game) => (
            <div key={game.id} className={styles.gameItem}>
              <div
                className={styles.gameIconContainer}
                style={{ backgroundImage: `url(${game.icon})` }} // ここで画像を設定
              />
              <div className={styles.gameTitle}>{game.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.coachTitle}>人気のコーチ</div>
        <div className={styles.gameList}>
          <div className={styles.container3}>a</div>
        </div>
      </div>
    </>
  );
};

export default Home;
