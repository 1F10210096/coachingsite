/* eslint-disable max-lines */
import { Carousel } from 'antd';
import type { GameListModel, UserSummaryModel, newBosyuu } from 'commonTypesWithClient/models';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import getGameListIcon from 'src/utils/gameListIcon';
import styles from './index.module.css';
import { BasicUnder } from './@components/BasicUnder/BasicUnder';
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
  const [userList2, setUserlist2] = useState<UserSummaryModel[]>([]);
  const fetchUsers = async () => {
    try {
      const response = await apiClient.fetchUsers.post();
      setUserlist(response.body);
      console.log(response.body);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  const fetchUsers2 = async () => {
    try {
      const response = await apiClient.fetchUsers2.post();
      setUserlist2(response.body);
      console.log(response.body);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchUsers2();
  }, []);

  const [user, setUser] = useState();

  useEffect(() => {
    const auth = createAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ユーザーがログインしている場合、ユーザー情報をセット
        console.log(firebaseUser);
        setUserUUID(firebaseUser.uid);
        console.log(firebaseUser.uid);
      } else {
        console.log('ユーザーがログインしていません');
      }
    });
    return () => unsubscribe();
  }, []);

  const calculateRateWidth = (rating: number): number => {
    console.log(rating * 18);
    return rating * 18;
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

  const router = useRouter();

  const handleClick = (id: any) => {
    router.push(`/recruitDetail?id=${id}`);
  };

  const contentStyle: React.CSSProperties = {
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
    display: 'flex',
    flexDirection: 'column', // 垂直方向に要素を配置
    justifyContent: 'center', // コンテンツを縦方向の中心に配置
    alignItems: 'center', // コンテンツを横方向の中心に配置
  };

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <>
      <div className={styles.allContainer1}>
        <BasicHeader user={user} />
        <div className={styles.allContainer}>
          <Carousel afterChange={onChange}>
            <div>
              <img src={`1.png`} className={styles.img} />
            </div>
            <div>
              <Link href="/signUp">
                <img src={`2.png`} className={styles.img} />
              </Link>
            </div>
            <div>
              <img src={`3.png`} className={styles.img} />
            </div>
          </Carousel>
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
                      src={`/gameListsIcon/${getGameListIcon(game.id)}`}
                      alt={`Rank: ${game.title}`}
                    />
                    <div className={styles.gameTitle}>{game.title}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div className={styles.divide}> </div>
          </div>
          <div className={styles.container5}>
            <div className={styles.coachTitle6}>注目のコーチ</div>
            <div className={styles.userListContainer}>
              {userList2.map((user, index) => (
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
                  <div key={index} className={styles.userItem}>
                    <img src={user.imageUrl} alt={user.name} className={styles.userImage2} />
                    <div className={styles.userName2}>{user.name}</div>
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
                    <div className={styles.userImage}>
                      <img
                        src={user.imageUrl}
                        alt={user.name}
                        className={styles.userImageContainer}
                      />
                    </div>
                    <div className={styles.myProfile}>{user.games}</div>
                    <div className={styles.userName}>{user.name}</div>
                    <div className={styles.yoko}>
                      <span className={styles.rate}>
                        ★★★★★
                        <span
                          className={styles.rateInner}
                          style={{ width: `${calculateRateWidth(user.rating)}px` }}
                        >
                          ★★★★★
                        </span>
                      </span>
                      <div className={styles.rating}>{user.rating}</div>
                      <div className={styles.count}>( {user.applyCount} )</div>
                    </div>
                    <div className={styles.myProfile2}>{user.myProfile}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div className={styles.divide2}> </div>
          </div>
          <div className={styles.recruitContainer}>
            <div className={styles.recruitListTitle}>人気の募集</div>
            <Link href="/allSearch">
              <div className={styles.blueTitle2}>全て見る {'>'}</div>
            </Link>
            <div className={styles.recruitList}>
              {recruitList.map((recruitList, index) => (
                <div
                  key={recruitList.id}
                  className={styles.recruitSummary}
                  onClick={() => handleClick(recruitList.id)}
                >
                  <div key={index} className={styles.userSummary2}>
                    <div className={styles.userImage}>
                      <img src={recruitList.user.imageUrl} className={styles.userImageContainer} />
                    </div>
                    <div className={styles.myProfile}>{recruitList.user.myProfile}</div>
                    <div className={styles.userName}>{recruitList.title}</div>
                    <div className={styles.recruitContainer1}>
                      {recruitList.tag.map((recruit, index) => (
                        <button key={index} className={styles.lessonType}>
                          {recruit}
                        </button>
                      ))}
                    </div>

                    <div className={styles.r6}>詳細情報</div>
                    <p className={styles.recruitDetail}>{recruitList.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BasicUnder />
        </div>
      </div>
    </>
  );
};

export default Home;
