/* eslint-disable max-lines */
import type { BosyuuListModel, UserSummaryDetailModel } from 'commonTypesWithClient/models';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import getImagePath from 'src/utils/gamePng';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';
import styles2 from './index2.module.css';
import Link from 'next/link';

const UserProfile = () => {
  const router = useRouter();
  const { name, rating, profile } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [RecruitList, setRecruitlist] = useState<BosyuuListModel[]>([]);
  const [userDetail, setUserDetail] = useState<UserSummaryDetailModel>();
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = RecruitList.slice(indexOfFirstItem, indexOfLastItem);

  const [user, setUser] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ユーザーがログインしている場合、ユーザー情報をセット
        console.log(firebaseUser);
        setUser(firebaseUser.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchRecruit = async (name, rating, profile) => {
    try {
      console.log(name, rating, profile);
      const response = await apiClient.fetchUserRecritList.post({
        body: {
          name,
          rating,
          profile,
        },
      });
      console.log(response.body);
      setRecruitlist(response.body.models);
      setUserDetail(response.body.user);

      console.log(response.body.user);
      console.log(response.body);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };
  useEffect(() => {
    // Firebaseの認証状態を監視するロジック
    // ...

    // ルータークエリの値が更新されたときにfetchRecruitを呼び出す
    if (name && rating && profile) {
      fetchRecruit(name, rating, profile);
    }
  }, [name, rating, profile]);

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
    }

    console.log(rank);
    console.log(directory);
    const rankImage = getImagePath(Id, rank);
    return `/${directory}/${rankImage}`;
  };

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date
      .toLocaleDateString('ja-JP', options)
      .replace(/\//g, '-')
      .replace(/(\d{4})-(\d{2})-(\d{2})/, '$1/$2/$3');
  }

  const handleClick = (id: string) => {
    router.push(`../recruitDetail?id=${id}`);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const calculateRateWidth = (rating: number): number => {
    console.log(rating * 30);
    return rating * 30;
  };

  const [sortDescending, setSortDescending] = useState(true);

  const handleSortClick = (list: BosyuuListModel[]): BosyuuListModel[] => {
    if (!Array.isArray(list)) {
      // もし list が配列でない場合、適切な処理を行ってください
      return list;
    }

    const sortedList = [...list].sort((a, b) =>
      sortDescending ? b.rank - a.rank : a.rank - b.rank
    );
    setRecruitlist(sortedList);
    return sortedList;
  };

  return (
    <div>
      <BasicHeader user={user} />
      <div className={styles.allContainer}>
      <div className={styles.homeContainer}>
          <Link href="/">
            <div className={styles.home}>ホーム</div>
          </Link>
          <div className={styles.home3}>></div>
<div className={styles.home2}>{userDetail?.name}</div>

        </div>
        <div className={styles.titleContainer}>コーチの情報</div>
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
        <div className={styles2.gameTitleContainer}>
        <div className={styles2.gameTitle}>ゲーム一覧</div>
        <div className={styles2.gameSort} onClick={() => handleSortClick(RecruitList)}>
          ランク順に並び替え
        </div>
        </div>
        <div className={styles2.helpwanted}>
          {currentItems.map((item) => (
            <div
              key={item.id}
              className={styles2.container}
              onClick={() => handleClick(item.id, item.gameId)}
            >
              <div className={styles2.flexContainer}>
                <img
                  src={item.teacher.user.imageUrl}
                  alt="User"
                  className={styles2.userImageDetail}
                />
                <p className={styles2.title}>{item.title}</p>
                <div className={styles2.rank}>
                  <img
                    src={getRankImage(item.gameId, item.rank)}
                    className={styles2.rankImage}
                    alt={`Rank: ${item.rank}`}
                  />
                </div>
              </div>
              <div className={styles2.line} />

              <div className={styles2.wrapper}>
                <div className={styles2.tag}>
                  <div className={styles2.tagContainer}>
                    {item.tag.map((tag, index) => (
                      <p key={index} className={styles2.tagText}>
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
                <div className={styles2.lessonType}>
                  <div className={styles2.lessonTypeContainer}>{item.lessonType}</div>
                </div>
                <div className={styles2.subjectRank}>
                  <p className={styles2.subjectRankTitle}>対象のランク:</p>
                  <div className={styles2.subjectRankContainer}>
                    {item.subjectRank.map((rank, index) => (
                      <img
                        key={index}
                        src={getRankImage(item.gameId, rank)}
                        className={styles2.subjectRankImage}
                        alt={`Rank: ${rank}`}
                      />
                    ))}
                  </div>
                </div>
                <div className={styles2.descriptionContainer}>
                  <p className={styles2.descriptionTitle}>募集詳細:</p>
                  <p className={styles2.description}>{item.description}</p>
                </div>
                <div className={styles2.descriptionContainer}>
                  <p className={styles2.descriptionTitle}>実績:</p>
                  <p className={styles2.description}>{item.myProfile}</p>
                </div>
              </div>
              <div className={styles2.line2} />
              <div className={styles2.horizontalLayout}>
                <button className={styles2.applyButton}>
                  <span className={styles2.starIcon}>★</span> いいねする
                </button>
                <div>
                  <p className={styles2.date}>掲載開始日： {formatDate(item.createdAt)}</p>
                  <p className={styles2.date}>情報更新日： {formatDate(item.updatedAt)}</p>
                </div>
              </div>
            </div>
          ))}
          <div className={styles2.selectPage}>
            {currentPage > 1 && <button onClick={handlePreviousPage}>前へ</button>}
            {RecruitList.length > indexOfLastItem && <button onClick={handleNextPage}>次へ</button>}
          </div>
        </div>
        {/* その他のユーザー情報の表示 */}
      </div>
    </div>
  );
};

export default UserProfile;
