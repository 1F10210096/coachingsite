/* eslint-disable complexity */
/* eslint-disable max-lines */
import type { NewApplyData, UserListItem } from 'commonTypesWithClient/models';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import getGameListImagePath from 'src/utils/gameListPng';
import getImagePath from 'src/utils/gamePng';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';
const Login = () => {
  const [Id, setUserUUID] = useState('');
  useEffect(() => {
    const auth = createAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ユーザーがログインしている場合の処理
        console.log('Logged in as:', user.email);
        setUserUUID(user.uid);
      } else {
        // ユーザーがログインしていない場合の処理
        console.log('No user logged in');
      }
    });

    // コンポーネントのアンマウント時にリスナーを解除
    return () => unsubscribe();
  }, []);

  const [lookImage, setLookImage] = useState<string | null>('');
  const [newName, setNewName] = useState('');
  const [newProfile, setNewProfile] = useState<string | null>('');
  const [rating, setRating] = useState<number | null>(0);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [recruitList, setMyRecruitlist] = useState<UserListItem[]>([]);
  const fetchMyRecruitList = async () => {
    try {
      console.log(Id);
      const response1 = await apiClient.fetchAllMyProfile.post({ body: { Id } });
      console.log(response1.body);
      setNewName(response1.body.name);
      setNewProfile(response1.body.myProfile);
      setLookImage(response1.body.imageUrl);
      setRating(response1.body.rating);
      setImageUrl(response1.body.imageUrl || '');
      const response = await apiClient.fetchMyRecruitList.post({ body: { Id } });
      console.log(response.body);
      setMyRecruitlist(response.body.user);
      setUser2(response.body.user2);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    fetchMyRecruitList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Id]);

  const [user2, setUser2] = useState<NewApplyData[]>([]);

  const getRankImage = (Id: number, rank: number) => {
    let directory;
    console.log(Id);
    console.log(rank);
    if (Id === 1) {
      directory = 'valoRanks';
    } else if (Id === 2) {
      directory = 'apexRanks';
    } else if (Id === 3) {
      directory = 'lolRanks'; // Adding the lolRanks condition
    } else if (Id === 4) {
      directory = 'FORTNITERanks'; // Adding the lolRanks condition
    } else if (Id === 5) {
      directory = 'StreetFighterRanks'; // Adding the lolRanks condition
    } else if (Id === 6) {
      directory = 'yuugiouRanks'; // Adding the lolRanks condition
    } else if (Id === 7) {
      directory = 'overwatch2Ranks'; // Adding the lolRanks condition
    }

    console.log(rank);
    console.log(directory);
    const rankImage = getImagePath(Id, rank);
    return `/${directory}/${rankImage}`;
  };

  function showModal4(arg0: string, id: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <div className={styles.box1}>
        <BasicHeader user={Id} />
        <div className={styles.box}>
          <div className={styles.boxCon}>
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>ユーザー設定</div>
              <div className={styles.boxCon2}>
                <Link href="/userProfileAll">
                  <div className={styles.boxCon3}>プロフィール</div>
                </Link>
                <Link href="/like">
                  <div className={styles.boxCon3}>いいね一覧</div>
                </Link>
                <div className={styles.boxCon3}>コーチ募集一覧</div>
                <div className={styles.boxCon3}>応募一覧</div>
              </div>
            </div>
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>設定</div>
              <div className={styles.boxCon2}>
                <div className={styles.boxCon3}>個人情報設定</div>
              </div>
            </div>
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>ヘルプ</div>
              <div className={styles.boxCon2}>
                <Link href="/form">
                  <div className={styles.boxCon3}>お問い合わせ</div>
                </Link>
              </div>
            </div>
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>規約・ポリシー</div>

              <div className={styles.boxCon2}>
                <Link href="/terms">
                  <div className={styles.boxCon3}>利用規約等</div>
                </Link>
                <Link href="/privacy">
                  <div className={styles.boxCon3}>プライバシーポリシー</div>
                </Link>
              </div>
            </div>{' '}
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>ログアウト</div>
              <div className={styles.boxCon2}>
                <div className={styles.boxCon3}>ログアウト</div>
              </div>{' '}
            </div>
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>ログアウト</div>
              <div className={styles.boxCon2}>
                <div className={styles.boxCon3}>ログアウト等</div>
              </div>{' '}
            </div>
          </div>
        </div>
        <div className={styles.loginContainer}>
          <div className={styles.termsCon}>応募一覧</div>
          <>
            <ul className={styles.box4}>
              {user2.map((recruit, index) => (
                <div
                  key={index}
                  // onClick={() => fetchMyRoomList(recruit.id)}
                  className={styles.box2}
                >
                  <div className={styles.titleContainer}>
                    <div className={styles.rank}>
                      <img
                        key={index}
                        className={styles.rankImage}
                        src={`/gameLists2/${getGameListImagePath(recruit.bosyuu.gameId)}`}
                        alt={`Rank: ${recruit.bosyuu.title}`}
                      />
                    </div>
                    <div className={styles.title2}>{recruit.bosyuu.title}</div>
                    <div className={styles.rank}>
                      <img
                        src={getRankImage(recruit.bosyuu.gameId, recruit.bosyuu.rank)}
                        className={styles.rankImage}
                        alt={`Rank: ${recruit.bosyuu.rank}`}
                      />
                    </div>
                  </div>
                  <div className={styles.line2} />

                  <div className={styles.wrapper}>
                    <div className={styles.tag}>
                      <div className={styles.tagContainer}>
                        {recruit.bosyuu.tag.map((tag, index) => (
                          <p key={index} className={styles.tagText}>
                            {tag}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className={styles.lessonType}>
                      <div className={styles.lessonTypeContainer}>{recruit.bosyuu.lessonType}</div>
                    </div>
                    <div className={styles.subjectRank}>
                      <p className={styles.subjectRankTitle}>対象のランク:</p>
                      <div className={styles.subjectRankContainer}>
                        {recruit.bosyuu.subjectRank.map((rank, index) => (
                          <img
                            key={index}
                            src={getRankImage(recruit.bosyuu.gameId, rank)}
                            className={styles.subjectRankImage}
                            alt={`Rank: ${rank}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className={styles.descriptionContainer}>
                      <p className={styles.descriptionTitle}>募集詳細:</p>
                      <p className={styles.description}>{recruit.bosyuu.description}</p>
                    </div>
                    <div className={styles.descriptionContainer}>
                      <p className={styles.descriptionTitle}>実績:</p>
                      <p className={styles.description}>{recruit.bosyuu.myProfile}</p>
                    </div>
                  </div>
                  <div className={styles.line3} />
                  <div className={styles.horizontalLayout}>
                    <button
                      className={styles.applyButton}
                      onClick={() => showModal4('review', recruit.id)}
                    >
                      <span className={styles.starIcon}>★</span>評価する
                    </button>
                  </div>
                  <div />
                  {/* <p>{recruit.description}</p> */}
                </div>
              ))}
            </ul>
            {/* <button onClick={fetchMyRecruitList}>コーチング応募履歴</button> */}
          </>
        </div>
      </div>
    </>
  );
};

export default Login;
