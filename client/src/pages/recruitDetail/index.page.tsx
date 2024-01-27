/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable complexity */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines */
import type {
  BosyuuListFrontModel,
  UserSummaryDetailModel,
  newBosyuu,
  reviewModel2,
} from 'commonTypesWithClient/models';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { DateTimeFormatOptions } from 'intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import getGameListImagePath from 'src/utils/gameListPng';
import getImagePath from 'src/utils/gamePng';
import getTagImagePath from 'src/utils/tagPng';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';
import styles2 from './index2.module.css';
import styles3 from './index3.module.css';
const Login = () => {
  const [RecruitDetail, setRecruitDetail] = useState<BosyuuListFrontModel | null>(null);
  const [userDetail, setUserDetail] = useState<UserSummaryDetailModel>();
  const [reviews, setReviews] = useState<reviewModel2[]>([]);
  const [user, setUser] = useState('');
  const router = useRouter();
  const id = router.query.id;
  console.log(id);
  useEffect(() => {
    const auth = getAuth();
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
      console.log('valoRanks');
    } else if (gameId === 2) {
      directory = 'apexRanks';
    } else if (gameId === 3) {
      directory = 'lolRanks'; // Adding the lolRanks condition
    }

    console.log(rank);
    console.log(directory);
    const rankImage = getImagePath(gameId, rank);
    return `/${directory}/${rankImage}`;
  };

  const calculateRateWidth = (rating: number): number => {
    console.log(rating * 30);
    return rating * 30;
  };

  const calculateRateWidth2 = (rating: number): number => {
    console.log(rating * 20);
    return rating * 20;
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
        router.push(`../dm?id=${response.body.id}`);
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

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.homeContainer}>
        <Link href="/">
          <div className={styles.home}>ホーム</div>
        </Link>
        <div className={styles.home3}>{'>'}</div>

        {RecruitDetail?.gameId !== null && RecruitDetail?.gameId !== undefined && (
          <Link href={`/recruit/?value=${RecruitDetail.gameId}`}>
            {RecruitDetail.gameId === 1 && <div className={styles.home2}>VALORANT</div>}
            {RecruitDetail.gameId === 2 && <div className={styles.home2}>APEX</div>}
            {RecruitDetail.gameId === 3 && <div className={styles.home2}>LOL</div>}
          </Link>
        )}

        <div className={styles.home3}>{'>'}</div>

        <div className={styles.home4}>{RecruitDetail?.title}</div>
      </div>

      <div className={styles2.titleContainer1}>
        <div className={styles2.title1}>募集詳細情報</div>
      </div>
      <div className={styles2.titleContainer}>
        <div className={styles2.titleContainer2}>
          <img
            className={styles2.userImageDetail}
            src={`/gameLists/${getGameListImagePath(RecruitDetail?.gameId ?? 0)}`}
            alt={`Rank: ${RecruitDetail?.gameId}`}
          />

          <div className={styles2.nameContainer}>
            <div className={styles2.name}>{userDetail?.name}</div>
            <p className={styles2.title}>{RecruitDetail?.title}</p>
          </div>
          {RecruitDetail?.gameId === 1 && (
            <img
              className={styles.rank}
              src={getRankImage(RecruitDetail?.gameId, RecruitDetail?.rank)}
              // alt={`Rank: ${RecruitDetail?.rank}`}
            />
          )}
        </div>
        <div className={styles2.line} />
        <div className={styles2.horizontalContainer}>
          {' '}
          {/* Parent container with flex */}
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
        </div>
      </div>

      <div className={styles2.headerContainer}>
        <div className={styles2.titleSection}>
          <div className={styles2.titleBox}>
            <span className={styles2.titleText}>募集詳細</span>
          </div>
        </div>
      </div>

      <div className={styles2.allparent}>
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
              <button className={styles.button} onClick={sendRoom}>
                応募する
              </button>
            </div>
          </div>
          <div className={styles.mainContainer}>
            <div className={styles.profileContainer}>
              <img src={userDetail?.imageUrl} alt={userDetail?.name} className={styles.userImage} />
              <div className={styles.nameContainer}>
                <div className={styles.name}>{userDetail?.name}</div>
              </div>
              <div className={styles.ratingContainer}>
                <span className={styles.rate}>
                  ★★★★★
                  <span
                    className={styles.rateInner}
                    style={{
                      width: `${userDetail ? calculateRateWidth(userDetail?.rating ?? 0) : 0}px`,
                    }}
                  >
                    ★★★★★
                  </span>
                </span>
              </div>
              <div className={styles.rating}>{userDetail?.rating}</div>
              <div className={styles.achievementsContainer}>
                <div className={styles.achievementsTitle}>【実績】</div>
                <div className={styles.achievements}>{userDetail?.Achievements}</div>
              </div>
              <div className={styles.descriptionDetailContainer}>
                <div className={styles.descriptionTitle}>【自己紹介】</div>
                <div className={styles.descriptions}>{userDetail?.hitokoto}</div>
              </div>
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
                    src={`/gameLists2/${getGameListImagePath(recruitList.gameId)}`}
                    alt={`Rank: ${recruitList.title}`}
                  />
                </div>
                <h3 className={styles3.recruitDetailTitle}>{recruitList.title}</h3>
                <h3 className={styles3.recruitDetailLessonType}>
                  <button key={index} className={styles3.lessonType}>
                    {recruitList.lessonType}
                  </button>
                </h3>
                <p className={styles3.recruitDetail}>{recruitList.descriptionDetail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
