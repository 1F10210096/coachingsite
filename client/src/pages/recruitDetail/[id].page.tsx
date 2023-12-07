import type { BosyuuListModel } from 'commonTypesWithClient/models';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import getRankImagePath from 'src/utils/gamePng';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import { useLoading } from '../@hooks/useLoading';
import styles from './index.module.css';

const Login = () => {
  const { addLoading, removeLoading } = useLoading();
  const [RecruitDetail, setRecruitDetail] = useState<BosyuuListModel>();
  const [user, setUser] = useState(null);

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

  const router = useRouter();

  const { id } = router.query;
  console.log(id);
  const idAsString = id as string;

  const fetchRecruitDetail = async () => {
    try {
      const response = await apiClient.fetachRecruitDetail.post({
        body: {
          Id: idAsString,
        },
      });
      setRecruitDetail(response.body);
      console.log(response.body);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };
  useEffect(() => {
    if (idAsString) {
      fetchRecruitDetail();
    }
  }, [idAsString]); // idAsString に依存

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.detail}>詳細情報</div>
      <div className={styles.container}>
        <div className={styles.detailContent}>
          <p className={styles.title}>{RecruitDetail?.title}</p>
          {RecruitDetail?.gameId === 1 && (
            <img
              className={styles.rank}
              src={`/valoRanks/${getRankImagePath(RecruitDetail?.rank)}`}
              alt={`Rank: ${RecruitDetail?.rank}`}
            />
          )}

          <p className={styles.subjectRankContainer}>
            コーチングの対象者:
            {RecruitDetail?.subjectRank.map((rank, index) => (
              <div key={index}>
                <img
                  className={styles.subjectRank}
                  src={`/valoRanks/${getRankImagePath(rank)}`}
                  alt={`Rank: ${rank}`}
                />
              </div>
            ))}
          </p>
          <p className={styles.tagContainer}>
            タグ:
            {RecruitDetail?.tag.map((tag, index) => (
              <div key={index} className={styles.tag}>
                <span>・{tag}</span>
              </div>
            ))}
          </p>
          <p className={styles.lessonTypeContainer}>
            コーチング方法:
            {RecruitDetail?.lessonType.map((lessonType, index) => (
              <div key={index} className={styles.lessonType}>
                <span>・{lessonType}</span>
              </div>
            ))}
          </p>
          <p className={styles.sucheduleContainer}>
            スケジュール
            <div className={styles.suchedule}>{RecruitDetail?.suchedule}</div>
          </p>
          <p className={styles.notesContainer}>
            注意事項
            <div className={styles.notes}>{RecruitDetail?.notes}</div>
          </p>
          <p className={styles.descriptionContainer}>
            詳細情報
            <div className={styles.description}>{RecruitDetail?.descriptionDetail}</div>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
