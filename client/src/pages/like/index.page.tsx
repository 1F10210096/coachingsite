/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-depth */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable max-lines */
import { Pagination } from 'antd';
import type { BosyuuListModel3, Favarite } from 'commonTypesWithClient/models';
import { onAuthStateChanged } from 'firebase/auth';
import type { DateTimeFormatOptions } from 'intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import { default as getImagePath } from 'src/utils/gamePng';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';

const Dm = () => {
  const [user, setUser] = useState('');
  const [RecruitList, setRecruitlist] = useState<BosyuuListModel3[]>([]);
  const [userDetail, setUserDetail] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = RecruitList.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const auth = createAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log(firebaseUser.uid);
        setUser(firebaseUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const [likedRecruits, setLikedRecruits] = useState<string[]>([]);

  const fetchMyProfile2 = async () => {
    try {
      console.log(user, 'user');
      const response = await apiClient.fetchAllMyProfile.post({
        body: {
          Id: user,
        },
      });
      setUserDetail(response.body);
      console.log(response.body, 'userDetail');
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    fetchMyProfile2();
  }, [user]);

  const fetchLike = async () => {
    try {
      console.log(user, 'user');
      const response = await apiClient.fetchAllLikes.post({
        body: {
          Id: user,
        },
      });
      const bosyuuLists = response.body.map((item: any) => item.bosyuuList);
      console.log(bosyuuLists, 'bosyuuLists');
      console.log(response.body, 'bosyuuListId');
      setRecruitlist(bosyuuLists);
      const likedIds = response.body.map((item:any) => item.bosyuuListId);
      console.log(likedIds, 'likedIds'); // デバッグ用に抽出したidを確認
      setLikedRecruits(likedIds);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    fetchLike();
  }, [user]);

  function formatDate(dateString: Date) {
    const options: DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date
      .toLocaleDateString('ja-JP', options)
      .replace(/\//g, '-')
      .replace(/(\d{4})-(\d{2})-(\d{2})/, '$1/$2/$3');
  }
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`../recruitDetail?id=${id}`);
  };

  const getRankImage = (Id: number, rank: number) => {
    let directory;
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
      directory = 'OverWatch2'; // Adding the lolRanks condition
    } else if (Id === 8) {
      directory = 'PUBGanks'; // Adding the lolRanks condition
    } else if (Id === 9) {
      directory = 'CSGO2Ranks'; // Adding the lolRanks condition
    }
    const rankImage = getImagePath(Id, rank);
    return `/${directory}/${rankImage}`;
  };
  const handleLikeClick = async (id: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const response = await apiClient.sendLike.post({
      body: {
        Id: id,
        myId: user,
      },
    });
    fetchLike();
  };

  const handleChangePage = (page: SetStateAction<number>) => {
    setCurrentPage(page);
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
    <>
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
            <div className={styles.home9}>自分の情報</div>
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
          <div className={styles.gameTitleContainer}>
            <div className={styles.gameTitle}>ゲーム一覧</div>
            <select className={styles.gameSort} onChange={handleSortChange} value={sortCriteria}>
              <option value="rank">ランク順に並び替え</option>
              <option value="update">更新順に並び替え</option>
              {/* 他のソートオプションがあれば追加 */}
            </select>
          </div>
          <div className={styles.helpwanted2}>
            {currentItems.map((item) => (
              <div key={item.id} className={styles.container2} onClick={() => handleClick(item.id)}>
                <div className={styles.flexContainer}>
                  <img
                    src={
                      item.teacher.user.imageUrl !== null &&
                      item.teacher.user.imageUrl !== undefined &&
                      item.teacher.user.imageUrl !== ''
                        ? item.teacher.user.imageUrl
                        : 'default-image-url.jpg'
                    }
                    alt="User"
                    className={styles.userImageDetail}
                  />

                  <p className={styles.title}>{item.title}</p>
                  <div className={styles.rank}>
                    <img
                      src={getRankImage(item.gameId, item.rank)}
                      className={styles.rankImage}
                      alt={`Rank: ${item.rank}`}
                    />
                  </div>
                </div>
                <div className={styles.line} />

                <div className={styles.wrapper}>
                  <div className={styles.tag}>
                    <div className={styles.tagContainer}>
                      {item.tag.map((tag, index) => (
                        <p key={index} className={styles.tagText}>
                          {tag}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className={styles.lessonType}>
                    <div className={styles.lessonTypeContainer}>{item.lessonType}</div>
                  </div>
                  <div className={styles.subjectRank}>
                    <p className={styles.subjectRankTitle}>対象のランク:</p>
                    <div className={styles.subjectRankContainer}>
                      {item.subjectRank.map((rank, index) => (
                        <img
                          key={index}
                          src={getRankImage(item.gameId, rank)}
                          className={styles.subjectRankImage}
                          alt={`Rank: ${rank}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className={styles.descriptionContainer}>
                    <p className={styles.descriptionTitle2}>募集詳細:</p>
                    <p className={styles.description}>{item.description}</p>
                  </div>
                  <div className={styles.descriptionContainer}>
                    <p className={styles.descriptionTitle2}>実績:</p>
                    <p className={styles.description}>{item.myProfile}</p>
                  </div>
                </div>
                <div className={styles.line2} />
                <div className={styles.horizontalLayout}>
                  <button
                    className={
                      likedRecruits.includes(item.id) ? styles.applyButton2 : styles.applyButton
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeClick(item.id, e);
                    }}
                  >
                    <span className={styles.starIcon}>★</span>{' '}
                    {likedRecruits.includes(item.id) ? 'いいね済み' : 'いいね'}
                  </button>
                  <div>
                    <p className={styles.date}>掲載開始日： {formatDate(item.createdAt)}</p>
                    <p className={styles.date}>情報更新日： {formatDate(item.updatedAt)}</p>
                  </div>
                </div>
              </div>
            ))}
            <Pagination
              current={currentPage}
              total={RecruitList.length}
              pageSize={itemsPerPage}
              onChange={handleChangePage}
              className={styles.pagenation}
            />
          </div>
          {/* その他のユーザー情報の表示 */}
        </div>
      </div>
    </>
  );
};

export default Dm;
