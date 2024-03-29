/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable complexity */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines */
import { MenuOutlined } from '@ant-design/icons';
import type {
  BosyuuListFrontModel,
  UserSummaryDetailModel,
  newBosyuu,
  reviewModel2,
} from 'commonTypesWithClient/models';
import { onAuthStateChanged } from 'firebase/auth';
import type { DateTimeFormatOptions } from 'intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import getImagePath from 'src/utils/gamePng';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import { BasicUnder } from '../@components/BasicUnder/BasicUnder';
import styles from './index.module.css';
import styles2 from './index2.module.css';
const Login = () => {
  const [RecruitDetail, setRecruitDetail] = useState<BosyuuListFrontModel | null>(null);
  const [userDetail, setUserDetail] = useState<UserSummaryDetailModel>();
  const [reviews, setReviews] = useState<reviewModel2[]>([]);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<string>('0');
  const [user, setUser] = useState('');
  const router = useRouter();
  const id = router.query.id;
  console.log(id);
  useEffect(() => {
    const auth = createAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ユーザーがログインしている場合、ユーザー情報をセット
        console.log(firebaseUser);
        setUser(firebaseUser.uid);
      } else {
        console.log('error');
      }
    });
    return () => unsubscribe();
  }, []);

  console.log(id);
  const idAsString = id as string;

  const fetchRecruitDetail = async () => {
    try {
      const response = await apiClient.fetachRecruitDetail.post({
        body: {
          Id: idAsString,
        },
      });
      console.log(response.body);
      setRecruitDetail(response.body.bosyuuListFront);
      setUserDetail(response.body.teacherProfile);

      setReviews(response.body.reviewList);
      const reviewCount = response.body.reviewList.length;
      console.log(reviewCount);
      setReviewCount(reviewCount);
      console.log('レビューの数:', reviewCount);
      if (response.body.reviewList && response.body.reviewList.length > 0) {
        // 各レビューの評価を合計
        const totalRating = response.body.reviewList.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        // 評価の合計をレビューの数で割って平均を求める
        console.log(totalRating);
        const averageRating = totalRating / response.body.reviewList.length;
        // 少数第一位までの平均評価をフォーマット
        const formattedAverageRating = averageRating.toFixed(1);

        console.log('レビューの平均評価 (少数第一位まで):', formattedAverageRating);

        // 文字列としてフォーマットされた平均評価を状態に保存
        // 注意: setAverageRatingは数値ではなく文字列を受け取るようになります
        setAverageRating(formattedAverageRating);
      } else {
        console.log('レビューがありません。');
        // 平均評価を0または適切な値に設定するか、状態の更新をスキップ
        setAverageRating('0');
      }
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    if (idAsString) {
      fetchRecruitDetail();
    }
  }, [idAsString]); // idAsString に依存

  const getRankImage = (gameId: number, rank: number) => {
    let directory;
    if (gameId === 1) {
      directory = 'valoRanks';
    } else if (gameId === 2) {
      directory = 'apexRanks';
    } else if (gameId === 3) {
      directory = 'lolRanks'; // Adding the lolRanks condition
    } else if (gameId === 4) {
      directory = 'FORTNITERanks'; // Adding the lolRanks condition
    } else if (gameId === 5) {
      directory = 'StreetFighterRanks'; // Adding the lolRanks condition
    } else if (gameId === 6) {
      directory = 'yuugiouRanks'; // Adding the lolRanks condition
    } else if (gameId === 7) {
      directory = 'OverWatch2'; // Adding the lolRanks condition
    } else if (gameId === 8) {
      directory = 'PUBGanks'; // Adding the lolRanks condition
    } else if (gameId === 9) {
      directory = 'CSGO2Ranks'; // Adding the lolRanks condition
    }

    const rankImage = getImagePath(gameId, rank);
    return `/${directory}/${rankImage}`;
  };

  const calculateRateWidth = (rating: number): number => {
    console.log(rating * 30);
    return rating * 30;
  };

  const calculateRateWidth2 = (rating: number): number => {
    return rating * 18;
  };

  const sendRoom = async () => {
    try {
      console.log(RecruitDetail?.id);
      console.log(user);
      if (RecruitDetail !== null) {
        const response = await apiClient.createRoom.post({
          body: {
            Id: RecruitDetail.id,
            myId: user,
          },
        });
        // setRecruitDetail(response.body);
        router.push(`../dmRecieave?id=${response.body.id}`);
      } else {
        // RecruitDetail が null の場合の処理
        // 例: エラーハンドリング、デフォルト値の設定など
      }
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  function formatDate(dateString: Date) {
    const options: DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date
      .toLocaleDateString('ja-JP', options)
      .replace(/\//g, '-')
      .replace(/(\d{4})-(\d{2})-(\d{2})/, '$1/$2/$3');
  }

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

  const copyUrlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('URLがクリップボードにコピーされました。');
    } catch (err) {
      console.error('クリップボードにコピーできませんでした。', err);
    }
  };
  const handleClick = (id: any) => {
    router.push(`/recruitDetail?id=${id}`);
  };

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles2.allContainer}>
        <div className={styles2.allCon4}>
          <div className={styles2.allCon5}>
            <div className={styles2.tate}>
              <div className={styles.homeContainer}>
                <Link href="/">
                  <div className={styles.home}>ホーム</div>
                </Link>
                <div className={styles.home3}>{'>'}</div>

                {RecruitDetail?.gameId !== null && RecruitDetail?.gameId !== undefined && (
                  <Link href={`/recruit/?value=${RecruitDetail.gameId}`}>
                    {RecruitDetail.gameId === 1 && <div className={styles.home2}>VALORANT</div>}
                    {RecruitDetail.gameId === 2 && <div className={styles.home2}>APEX</div>}
                    {RecruitDetail.gameId === 3 && <div className={styles.home2}>LOL</div>}{' '}
                    {RecruitDetail.gameId === 4 && <div className={styles.home2}>FORTNITE</div>}
                    {RecruitDetail.gameId === 5 && (
                      <div className={styles.home2}>StreetFighter</div>
                    )}
                    {RecruitDetail.gameId === 6 && <div className={styles.home2}>OverWatch2</div>}
                    {RecruitDetail.gameId === 7 && (
                      <div className={styles.home2}>遊戯王 マスターデュエル</div>
                    )}
                    {RecruitDetail.gameId === 8 && <div className={styles.home2}>PUBG</div>}
                    {RecruitDetail.gameId === 9 && <div className={styles.home2}>CSGO2</div>}
                  </Link>
                )}

                <div className={styles.home3}>{'>'}</div>

                <div className={styles.home4}>{RecruitDetail?.title}</div>
              </div>
              <div className={styles2.tateContainer}>
                <div className={styles2.titleContainer}>
                  <div className={styles2.titleContainer2}>
                    <div className={styles.userImage1}>
                      <img src={userDetail?.imageUrl} className={styles.userImageContainer} />
                    </div>
                    <div className={styles2.name2}>{userDetail?.name}</div>
                    <div className={styles2.titleContainer3}>
                      <MenuOutlined style={{ fontSize: '24px' }} onClick={copyUrlToClipboard} />
                    </div>
                  </div>
                  <div className={styles.userImage3}>
                    <img src={userDetail?.imageUrl} className={styles.userImageContainer2} />
                  </div>
                  <img src={userDetail?.imageUrl} className={styles.userImageContainer3} />
                </div>
                <div className={styles2.titleContainer5}>
                  <div className={styles2.titleContainer}>
                    <div className={styles2.titleContainer2}>
                      <img src={`/heart.png`} className={styles.img} />
                      <div className={styles2.title2}>
                        ユーザー評価<div className={styles.count2}>({reviewCount})</div>
                        <div className={styles2.ratingContainer2}>
                          <div className={styles2.ratingBig}>{averageRating}</div>
                          <div>/</div>
                          <div>平均</div>
                        </div>
                      </div>
                    </div>
                    {reviews.length === 0 ? ( // Check if the reviews array is empty
                      <div className={styles.noReviewsMessage}>まだレビューはありません。</div> // Display message if no reviews
                    ) : (
                      <div className={styles.reviewA}>
                        {reviews.map((review, index) => (
                          <div key={index} className={styles.review}>
                            <div className={styles.reviewHeader}>
                              <img
                                src={review.imageUrl ? review.imageUrl : undefined}
                                alt={review.imageUrl ? review.imageUrl : 'Default Alt Text'}
                                className={styles.reviewImage}
                              />
                              <div className={styles.tate}>
                                <div className={styles.reviewName}>{review.name}</div>
                                <div className={styles.subtitle}>skillSeed/{review.date}</div>
                              </div>
                              <div className={styles.ratingContainer2}>
                                <span className={styles.rate2}>
                                  ★★★★★
                                  <span
                                    className={styles.rateInner2}
                                    style={{ width: `${calculateRateWidth2(review.rating)}px` }}
                                  >
                                    ★★★★★
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className={styles.reviewDescription}>{review.review}</div>
                            <div className={styles.line2} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles2.allCon3}>
              <div className={styles2.container7}>
                <div className={styles2.titleContainer13}>{RecruitDetail?.title}</div>
                <div className={styles2.titleContainer9}>
                  <div className={styles2.titleContainer11}>800</div>
                  <div className={styles2.titleContainer12}>円</div>
                  <div className={styles2.titleContainer10}>/1時間</div>
                </div>
                {RecruitDetail &&
                  RecruitDetail.teacherId !== user && ( // ここで投稿主が自分かどうかをチェック
                    <button className={styles.button} onClick={sendRoom}>
                      チャットを開始して、コーチング日程を立てる
                    </button>
                  )}
                <div className={styles.line5} />
              </div>
              <div className={styles2.descriptionContainer}>
                <div className={styles2.descriptionContainer2}>
                  <div className={styles2.tate2}>
                    <img src={`/pro.png`} className={styles.imgUser} />
                    <div className={styles2.descriptionTitle}>募集詳細</div>
                  </div>
                  <div className={styles.description}>{RecruitDetail?.description}</div>
                  <div className={styles2.tate3}>
                    <img src={`/lesson.png`} className={styles.imgUser} />
                    <div className={styles2.descriptionTitle}>コーチング方法</div>
                  </div>
                  <div className={styles.description2}>{RecruitDetail?.lessonType}</div>
                  <div className={styles2.tate4}>
                    <img src={`/taisyou.png`} className={styles.imgUser} />
                    <div className={styles2.descriptionTitle}>コーチング対象者</div>
                  </div>
                  <div className={styles.rankImagesContainer}>
                    {RecruitDetail?.subjectRank &&
                      Array.isArray(RecruitDetail.subjectRank) &&
                      RecruitDetail.subjectRank.map((rank, index) => (
                        <div key={index} className={styles.aadw}>
                          <img
                            className={styles.subjectRank}
                            src={getRankImage(RecruitDetail?.gameId, rank)}
                            alt={`Rank: ${rank}`}
                          />
                        </div>
                      ))}
                  </div>
                  <div className={styles2.tate5}>
                    <img src={`/taisyou.png`} className={styles.imgUser} />
                    <div className={styles2.descriptionTitle}>注意事項</div>
                  </div>
                  <div className={styles.description3}>{RecruitDetail?.notes}</div>
                  <div className={styles2.tate6}>
                    <img src={`/taisyou.png`} className={styles.imgUser} />
                    <div className={styles2.descriptionTitle}>スケジュール</div>
                  </div>
                  <div className={styles.description4}>{RecruitDetail?.suchedule}</div>
                </div>
              </div>
            </div>
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
                    <div className={styles.userImage2}>
                      <img src={recruitList.user.imageUrl} className={styles.userImageContainer} />
                    </div>
                    <div className={styles.myProfile}>{recruitList.user.myProfile}</div>
                    <div className={styles.userName}>{recruitList.title}</div>
                    <div className={styles.recruitContainer1}>
                      {recruitList.tag.map((recruit, index) => (
                        <button key={index} className={styles.lessonType2}>
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
        </div>
        {/* <div className={styles2.titleContainer2}> 
            <img
              className={styles2.userImageDetail}
              src={`/gameLists/${getGameListImagePath(RecruitDetail?.gameId ?? 0)}`}
              alt={`Rank: ${RecruitDetail?.gameId}`}
            />

            <div className={styles2.nameContainer}>
              <div className={styles2.name}>{userDetail?.name}</div>
              <p className={styles2.title}>{RecruitDetail?.title}</p>
            </div>

            <img
              className={styles.rank}
              src={getRankImage(RecruitDetail?.gameId ?? 0, RecruitDetail?.rank ?? 0)}
              alt={`Rank: ${RecruitDetail?.rank}`}
            />
          </div> */}
        {/* <div className={styles2.line} /> */}
        {/* <div className={styles2.horizontalContainer}>
            <p className={styles2.tagContainer}>
              【タグ】
              {RecruitDetail &&
                Array.isArray(RecruitDetail.tag) &&
                RecruitDetail.tag.length > 0 && // 配列であり、長さが0より大きいことを確認
                RecruitDetail.tag.map((tag, index) => (
                  <div key={index} className={styles2.tag}>
                    <img src={getTagImagePath(tag)} className={styles2.tagImage} />
                  </div>
                ))}
            </p>
            <div>
              <p className={styles2.date}>
                掲載開始日： {RecruitDetail?.createdAt ? formatDate(RecruitDetail.createdAt) : ''}
              </p>
              <p className={styles2.date}>
                情報更新日： {RecruitDetail?.updatedAt ? formatDate(RecruitDetail.updatedAt) : ''}
              </p>
            </div>
          </div> */}
        {/* <div className={styles2.headerContainer}>
          <div className={styles2.titleSection}>
            <div className={styles2.titleBox}>
              <span className={styles2.titleText}>募集詳細</span>
            </div>
          </div>
        </div> */}
        {/* <div className={styles2.allparent}>
          <div className={styles2.parent2}>
            <div className={styles.parent}>
              <div className={styles.container}>
                <div className={styles.detailContent}>
                  <div className={styles2.horizontalLayout}>
                    <div className={styles.detail}>詳細情報</div>
                    <button className={styles2.applyButton}>
                      <span className={styles2.starIcon}>★</span> いいねする
                    </button>
                  </div>
                  <div className={styles.line4} />
                  <p className={styles.descriptionContainer}>
                    <div className={styles.descriptionTitle2}>【募集詳細】</div>
                    <div className={styles.description}>{RecruitDetail?.description}</div>
                  </p>
                  <p className={styles.lessonTypeContainer}>
                    <div className={styles.descriptionTitle2}>【コーチング方法】</div>
                    <div className={styles.description}>{RecruitDetail?.lessonType}</div>
                  </p>
                  <p className={styles.subjectRankContainer}>
                    <div className={styles.subjectRankTitle}>【コーチングの対象者】</div>
                    <div className={styles.rankImagesContainer}>
                      {RecruitDetail?.subjectRank &&
                        Array.isArray(RecruitDetail.subjectRank) &&
                        RecruitDetail.subjectRank.map((rank, index) => (
                          <div key={index} className={styles.aadw}>
                            <img
                              className={styles.subjectRank}
                              src={getRankImage(RecruitDetail?.gameId, rank)}
                              alt={`Rank: ${rank}`}
                            />
                          </div>
                        ))}
                    </div>
                  </p>
                  <p className={styles.notesContainer}>
                    【注意事項】
                    <div className={styles.notes}>{RecruitDetail?.notes}</div>
                  </p>

                  <p className={styles.sucheduleContainer}>
                    【スケジュール】
                    <div className={styles.suchedule}>{RecruitDetail?.suchedule}</div>
                  </p>
                  {RecruitDetail &&
                    RecruitDetail.teacherId !== user && ( // ここで投稿主が自分かどうかをチェック
                      <button className={styles.button} onClick={sendRoom}>
                        応募する
                      </button>
                    )}
                </div>
              </div>
              <div className={styles.mainContainer}>
                <div className={styles.userSummary}>
                  <div className={styles.userImage2}>
                    <img src={userDetail?.imageUrl} className={styles.userImageContainer} />
                  </div>
                  <div className={styles.myProfile}>{userDetail?.hitokoto}</div>
                  <div className={styles.userName}>{userDetail?.name}</div>
                  <div className={styles.yoko}>
                    <span className={styles.rate}>
                      ★★★★★
                      <span
                        className={styles.rateInner}
                        style={{ width: `${calculateRateWidth(userDetail?.rating)}px` }}
                      >
                        ★★★★★
                      </span>
                    </span>
                    <div className={styles.rating}>{userDetail?.rating}</div>
                    <div className={styles.count}>( {user.applyCount} )</div>
                  </div>
                  <div className={styles.myProfile2}>{userDetail?.Achievements}</div>
                </div>

                <div className={styles.reviewContainer}>
                  <div className={styles.reviewTitle}>レビュー</div>
                  <div className={styles.line} />
                  {reviews.length === 0 ? ( // Check if the reviews array is empty
                    <div className={styles.noReviewsMessage}>まだレビューはありません。</div> // Display message if no reviews
                  ) : (
                    <div className={styles.reviewA}>
                      {reviews.map((review, index) => (
                        <div key={index} className={styles.review}>
                          <div className={styles.reviewHeader}>
                            <img
                              src={review.imageUrl ? review.imageUrl : undefined}
                              alt={review.imageUrl ? review.imageUrl : 'Default Alt Text'}
                              className={styles.reviewImage}
                            />
                            <div className={styles.reviewName}>{review.name}</div>
                          </div>
                          <div className={styles.ratingContainer2}>
                            <span className={styles.rate2}>
                              ★★★★★
                              <span
                                className={styles.rateInner2}
                                style={{ width: `${calculateRateWidth2(review.rating)}px` }}
                              >
                                ★★★★★
                              </span>
                            </span>
                            <div className={styles.reviewRating}>{review.rating}</div>
                          </div>
                          <div className={styles.reviewDescription}>{review.review}</div>
                          <div className={styles.line2} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles3.recomendTitle}>
              <div className={styles3.titleText}>おすすめの募集</div>
              <div className={styles3.recruitList}>
                {recruitList.map((recruitList, index) => (
                  <div key={recruitList.id} className={styles3.recruitSummary}>
                    <div className={styles3.recruitListImage}>
                      <img
                        key={index}
                        className={styles3.gameIconContainer2}
                        src={`/gameLists2/${getGameListImagePathMain(recruitList.gameId)}`}
                        alt={`Rank: ${recruitList.title}`}
                      />
                    </div>
                    <h3 className={styles3.recruitDetailTitle}>{recruitList.title}</h3>
                    <div className={styles3.recruitContainer1}>
                      {recruitList.tag.map((recruit, index) => (
                        <button key={index} className={styles3.lessonType}>
                          {recruit}
                        </button>
                      ))}
                    </div>
                    <div className={styles3.r6}>詳細情報</div>
                    <p className={styles3.recruitDetail}>{recruitList.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Login;
