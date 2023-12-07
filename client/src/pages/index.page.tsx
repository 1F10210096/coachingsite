import type {
  BosyuuListModel,
  GameListModel,
  UserSummaryModel,
} from 'commonTypesWithClient/models';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import getGameListImagePath from 'src/utils/gameListPng';
import styles from './index.module.css';
const Home = () => {
  const [label, setLabel] = useState('');
  const [userUUID, setUserUUID] = useState('');
  const [gameList, setGamelist] = useState<GameListModel[]>([]);
  const fetchGames = async () => {
    try {
      const response = await apiClient.fetchGames.post();
      setGamelist(response.body);
      console.log(response.body);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };
  useEffect(() => {
    fetchGames();
  }, []);
  // Homeコンポーネント内
  const [userList, setUserlist] = useState<UserSummaryModel[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.fetchUsers.post();
      setUserlist(response.body);
      console.log(response.body);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const [user, setUser] = useState(null);

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

  const calculateRateWidth = (rating: number): number => {
    console.log(rating * 30);
    return rating * 30;
  };

  const [recruitList, setRecruitlist] = useState<BosyuuListModel[]>([]);

  const fetchRecruit = async () => {
    try {
      const response = await apiClient.fetchRecritList.post();
      setRecruitlist(response.body);
      console.log(response.body);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };
  useEffect(() => {
    fetchRecruit();
  }, []);

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.allContainer}>
        <div className={styles.container}>
          <div className={styles.coachTitle}>人気のゲーム</div>
          <div className={styles.gameList}>
            {gameList.map((game, index) => (
              <div key={game.id} className={styles.gameItem}>
                <img
                  key={index}
                  className={styles.gameIconContainer}
                  src={`/gameLists/${getGameListImagePath(game.id)}`}
                  alt={`Rank: ${game.title}`}
                />
                <div className={styles.gameTitle}>{game.title}</div>
              </div>
            ))}
          </div>
          <div className={styles.divide}> </div>
        </div>
        <div className={styles.coachContainer}>
          <div className={styles.coachTitle2}>人気のコーチ</div>
          <div className={styles.userList}>
            {userList.map((user) => (
              <div key={user.name} className={styles.userSummary}>
                <img src={user.imageUrl} alt={user.name} className={styles.userImage} />
                <span className={styles.rate}>
                  ★★★★★
                  <span
                    className={styles.rateInner}
                    style={{ width: `${calculateRateWidth(user.rating)}px` }}
                  >
                    ★★★★★
                  </span>
                </span>

                <div className={styles.userName}>{user.name}</div>
                <div className={styles.myProfile}>{user.myProfile}</div>
              </div>
            ))}
          </div>
          <div className={styles.divide2}> </div>
        </div>
        <div className={styles.recruitContainer}>
          <div className={styles.recruitListTitle}>人気の募集</div>
          <div className={styles.recruitList}>
            {recruitList.map((recruitList, index) => (
              <div key={recruitList.id} className={styles.recruitSummary}>
                <div className={styles.recruitListImage}>
                  <img
                    key={index}
                    className={styles.gameIconContainer2}
                    src={`/gameLists2/${getGameListImagePath(recruitList.gameId)}`}
                    alt={`Rank: ${recruitList.title}`}
                  />
                </div>
                <h3 className={styles.recruitDetailTitle}>{recruitList.title}</h3>
                <h3 className={styles.recruitDetailLessonType}>
                  {recruitList.lessonType.map((type, index) => (
                    <button key={index} className={styles.lessonType}>
                      {type}
                    </button>
                  ))}
                </h3>
                <p className={styles.recruitDetail}>{recruitList.descriptionDetail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
