/* eslint-disable max-lines */
import type {
  BosyuuListFrontModel,
  UserSummaryDetailModel,
  reviewModel,
} from 'commonTypesWithClient/models';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import getImagePath from 'src/utils/gamePng';
import getTagImagePath from 'src/utils/tagPng';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';

const Login = () => {
  const [RecruitDetail, setRecruitDetail] = useState<BosyuuListFrontModel>();
  const [userDetail, setUserDetail] = useState<UserSummaryDetailModel>();
  const [reviews, setReviews] = useState<reviewModel[]>([]);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const id = router.query.id;
  console.log(id);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ユーザーがログインしている場合、ユーザー情報をセット
        console.log(firebaseUser);
        setUser(firebaseUser);
      } else {
        setUser(null);
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
      setRecruitDetail(response.body);
      // setUserDetail(responseUser.body);


      // setReviews(responseReview.body);
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
      const response = await apiClient.createRoom.post({
        body: {
          Id: RecruitDetail?.id,
          teacherId: RecruitDetail?.teacherId,
        },
      });
      setRecruitDetail(response.body);
      console.log(response.body);
      console.log(response.body.teacherId);

      setUserDetail(responseUser.body);

      const responseReview = await apiClient.fetchReview.post({
        body: {
          Id: response.body.id,
        },
      });

      setReviews(responseReview.body);
      console.log(reviews);
      console.log(responseReview.body);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.parent}>
        <div className={styles.detail}>詳細情報</div>
        <div className={styles.container}>
          <div className={styles.detailContent}>
            <div className={styles.titleContainer}>
              <img
                src={userDetail?.imageUrl}
                alt={userDetail?.name}
                className={styles.userImageDetail}
              />
              <p className={styles.title}>{RecruitDetail?.title}</p>
            </div>
            {RecruitDetail?.gameId === 1 && (
              <img
                className={styles.rank}
                src={getRankImage(RecruitDetail?.gameId, RecruitDetail?.rank)}
                // alt={`Rank: ${RecruitDetail?.rank}`}
              />
            )}

            <p className={styles.tagContainer}>
              【タグ】
              {RecruitDetail?.tag.map((tag, index) => (
                <div key={index} className={styles.tag}>
                  <img src={getTagImagePath(tag)} className={styles.tagImage} />
                </div>
              ))}
            </p>

            <p className={styles.descriptionContainer}>
              <div className={styles.descriptionTitle2}>【募集詳細】</div>
              <div className={styles.description}>{RecruitDetail?.descriptionDetail}</div>
            </p>
            <p className={styles.lessonTypeContainer}>
              【コーチング方法】
              {RecruitDetail?.lessonType.map((lessonType, index) => (
                <div key={index} className={styles.lessonType}>
                  <span>・{lessonType}</span>
                </div>
              ))}
            </p>
            <p className={styles.subjectRankContainer}>
              <div className={styles.subjectRankTitle}>【コーチングの対象者】</div>
              {RecruitDetail?.subjectRank.map((rank, index) => (
                <div key={index}>
                  <img
                    className={styles.subjectRank}
                    src={getRankImage(RecruitDetail?.gameId, rank)}
                    alt={`Rank: ${rank}`}
                  />
                </div>
              ))}
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
                style={{ width: `${calculateRateWidth(userDetail?.rating)}px` }}
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
          <div className={styles.reviewA}>
            {reviews.map((review, index) => (
              <>
                <div key={index} className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <img
                      src={review.imageUrl}
                      alt={review.imageUrl}
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
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
