import type { GameListModel, UserSummaryModel, newBosyuu } from 'commonTypesWithClient/models';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import getGameListImagePath from 'src/utils/gameListPng';
import styles from './index.module.css';
const Home = () => {
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

  const [user, setUser] = useState();

  useEffect(() => {
    const auth = createAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ユーザーがログインしている場合、ユーザー情報をセット
        console.log(firebaseUser);
        setUserUUID(firebaseUser.uid);
      } else {
        console.log('ユーザーがログインしていません');
      }
    });
    return () => unsubscribe();
  }, []);

  const calculateRateWidth = (rating: number): number => {
    console.log(rating * 30);
    return rating * 30;
  };

  const [recruitList, setRecruitlist] = useState<newBosyuu[]>([]);

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

  const fetchUserRecruit = async () => {
    try {
      // const response = await apiClient.fetchUserRecritList.post();
      // setUserRecruitlist(response.body);
      // console.log(response.body);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.allContainer}>
        <div className={styles.container}>
          <div className={styles.coachTitle}>人気のゲーム</div>
          <Link href="/allSearch">
            <div className={styles.blueTitle}>全て見る {'>'}</div>
          </Link>
          <div className={styles.gameList}>
            {gameList.map((game, index) => (
              <Link
                key={game.id}
                href={{
                  pathname: '/recruit',
                  query: {
                    value: game.id,
                  },
                }}
              >
                <div key={game.id} className={styles.gameItem}>
                  <img
                    key={index}
                    className={styles.gameIconContainer}
                    src={`/gameLists/${getGameListImagePath(game.id)}`}
                    alt={`Rank: ${game.title}`}
                  />
                  <div className={styles.gameTitle}>{game.title}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.divide}> </div>
        </div>
        <div className={styles.coachContainer}>
          <div className={styles.coachTitle2}>人気のコーチ</div>
          <div className={styles.userList}>
            {userList.map((user) => (
              <Link
                key={user.name}
                href={{
                  pathname: '/userRecruit',
                  query: {
                    name: user.name,
                    rating: user.rating,
                    profile: user.myProfile,
                  },
                }}
              >
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
              </Link>
            ))}
          </div>
          <div className={styles.divide2}> </div>
        </div>
        <div className={styles.recruitContainer}>
          <div className={styles.recruitListTitle}>人気の募集</div>
          <div className={styles.blueTitle2}>全て見る {'>'}</div>
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
                <div className={styles.recruitContainer1}>
                  {recruitList.tag.map((recruit, index) => (
                    <button key={index} className={styles.lessonType}>
                      {recruit}
                    </button>
                  ))}
                </div>
                <p className={styles.recruitDetail}>{recruitList.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
