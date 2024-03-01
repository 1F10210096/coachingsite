/* eslint-disable max-lines */
import type { BosyuuListModel, UserSummaryDetailModel } from 'commonTypesWithClient/models';
import { onAuthStateChanged } from 'firebase/auth';
import type { DateTimeFormatOptions } from 'intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import getImagePath from 'src/utils/gamePng';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';
import styles2 from './index2.module.css';

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
    const auth = createAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ユーザーがログインしている場合、ユーザー情報をセット
        console.log(firebaseUser);
        setUser(firebaseUser.uid);
      } else {
        console.log('ユーザーがログインしていません');
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchRecruit = async (name: string, rating: string, profile: string) => {
    try {
      console.log(name, rating, profile);
      const response = await apiClient.fetchUserRecritList.post({
        body: {
          name,
          rating,
          profile,
        },
      });
      const responseBody = response.body as unknown as {
        models: BosyuuListModel[];
        user: UserSummaryDetailModel;
      };

      setRecruitlist(responseBody.models);
      setUserDetail(responseBody.user);
      console.log(response.body);
      console.log(response.body);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };
  
  useEffect(() => {
    // Firebaseの認証状態を監視するロジック
    // ...
    // ルータークエリの値が更新されたときにfetchRecruitを呼び出す
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (name && rating && profile) {
      fetchRecruit(name as string, rating as string, profile as string);
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

  function formatDate(dateString: Date) {
    const options: DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
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
  const [sortCriteria, setSortCriteria] = useState('rank'); // デフォルトは「ランク順」

  const handleSortChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSortCriteria(e.target.value);
    // ここで選択されたソート基準に基づいてリストを並び替える処理を実行
    handleSortClick2();
  };
  const handleSortClick2 = () => {
    if (sortCriteria === 'rank') {
      // ランク順に並び替えるロジック
      const sortedList = [...RecruitList].sort((a, b) =>
        sortDescending ? b.rank - a.rank : a.rank - b.rank
      );
      setRecruitlist(sortedList);
    } else if (sortCriteria === 'update') {
      // 更新順に並び替えるロジック
      const sortedList = [...RecruitList].sort((a, b) => {
        // 文字列や他の形式の日付をDateオブジェクトに変換
        const timeA = new Date(a.updatedAt).getTime();
        const timeB = new Date(b.updatedAt).getTime();
        return sortDescending ? timeB - timeA : timeA - timeB;
      });
      setRecruitlist(sortedList);
    }
  };

  return (
    <div>
      <BasicHeader user={user} />
      <div className={styles.allContainer}>
        <div className={styles.homeContainer}>
          <Link href="/">
            <div className={styles.home}>ホーム</div>
          </Link>
          <div className={styles.home3}>{'>'}</div>
          <div className={styles.home2}>{userDetail?.name}</div>
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.home9}>コーチの情報</div>
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
                style={{
                  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
        <div className={styles2.gameTitleContainer}>
          <div className={styles2.gameTitle}>ゲーム一覧</div>
          <select className={styles2.gameSort} onChange={handleSortChange} value={sortCriteria}>
            <option value="rank">ランク順に並び替え</option>
            <option value="update">更新順に並び替え</option>
            {/* 他のソートオプションがあれば追加 */}
          </select>
        </div>
        <div className={styles2.helpwanted}>
          {currentItems.map((item) => (
            <div key={item.id} className={styles2.container} onClick={() => handleClick(item.id)}>
              <div className={styles2.flexContainer}>
                <img
                  src={
                    item.teacher.user.imageUrl !== null &&
                    item.teacher.user.imageUrl !== undefined &&
                    item.teacher.user.imageUrl !== ''
                      ? item.teacher.user.imageUrl
                      : 'default-image-url.jpg'
                  }
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
