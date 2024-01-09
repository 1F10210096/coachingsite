/* eslint-disable max-lines */
import type { BosyuuListModel } from 'commonTypesWithClient/models';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { default as getImagePath } from 'src/utils/gamePng';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';
import styles2 from './index2.module.css';
// eslint-disable-next-line complexity
const Valorant = () => {
  const router = useRouter();
  const value = router.query.value;
  const Id = Number(value);
  console.log(value);
  const [showRankCheckboxes, setShowRankCheckboxes] = useState(false);
  const [showMyRankCheckboxes, setShowMyRankCheckboxes] = useState(false);
  const [showTagCheckboxes, setShowTagCheckboxes] = useState(false);
  const [showLessonTypeCheckboxes, setShowLessonTypeCheckboxes] = useState(false);
  const [RecruitList, setRecruitlist] = useState<BosyuuListModel[]>([]);

  const [valoRanks, setValoRanks] = useState({
    アイアン: false,
    ブロンズ: false,
    シルバー: false,
    ゴールド: false,
    プラチナ: false,
    ダイヤモンド: false,
    アセンダント: false,
    イモータル: false,
    レディアント: false,
  });

  const [apexRanks, setApexRanks] = useState({
    ブロンズ: false,
    シルバー: false,
    ゴールド: false,
    プラチナ: false,
    ダイヤモンド: false,
    マスター: false,
    プレデター: false,
  });
  const [myValoRanks, setMyValoRanks] = useState({
    アイアン: false,
    ブロンズ: false,
    シルバー: false,
    ゴールド: false,
    プラチナ: false,
    ダイヤモンド: false,
    アセンダント: false,
    イモータル: false,
    レディアント: false,
  });

  const [myApexRanks, setMyApexRanks] = useState({
    ブロンズ: false,
    シルバー: false,
    ゴールド: false,
    プラチナ: false,
    ダイヤモンド: false,
    マスター: false,
    プレデター: false,
  });

  const [Tags, setTags] = useState({
    初心者歓迎: false,
    高ランク歓迎: false,
    スパルタ指導: false,
    仲良くワイワイ: false,
    上級者歓迎: false,
    エイム強化: false,
    メンタル強化: false,
    プロ志向: false,
  });

  const [LessonTypes, setLessonTypes] = useState({
    一緒にプレイ: false,
    ビデオで学ぼう: false,
    '1 on 1': false,
    プレイを振り返ろう: false,
    プレイを見てもらおう: false,
    プレイを一緒に見よう: false,
    ゲームを一緒に学ぼう: false,
  });

  const handleCheckboxChange = (rank) => {
    if (Id === 1) {
      setValoRanks((prevRanks) => ({
        ...prevRanks,
        [rank]: !prevRanks[rank],
      }));
    } else if (Id === 2) {
      setApexRanks((prevRanks) => ({
        ...prevRanks,
        [rank]: !prevRanks[rank],
      }));
    }
  };

  const handleMyRankCheckboxChange = (rank) => {
    if (Id === 1) {
      setMyValoRanks((prevRanks) => ({
        ...prevRanks,
        [rank]: !prevRanks[rank],
      }));
    } else if (Id === 2) {
      setMyApexRanks((prevRanks) => ({
        ...prevRanks,
        [rank]: !prevRanks[rank],
      }));
    }
  };

  const handleTagCheckboxChange = (Tag) => {
    setTags((prevTags) => ({
      ...prevTags,
      [Tag]: !prevTags[Tag],
    }));
  };

  const handleLessonTypeCheckboxChange = (LessonType) => {
    setLessonTypes((prevLessonTypes) => ({
      ...prevLessonTypes,
      [LessonType]: !prevLessonTypes[LessonType],
    }));
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ユーザーがログインしている場合、ユーザー情報をセット
        console.log(firebaseUser);
        setUser(firebaseUser);
      } else {
        // ユーザーがログアウトしている場合
        setUser(null);
      }
    });

    // コンポーネントがアンマウントされる際に購読を解除
    return () => unsubscribe();
  }, []);

  const getSelectedRanksIndices = (Id) => {
    if (Id === 1) {
      const selectedRanksIndices = Object.keys(valoRanks)
        .map((key, index) => ({ rank: key, index }))
        .filter((item) => valoRanks[item.rank])
        .map((item) => item.index);
      console.log(selectedRanksIndices);
      return selectedRanksIndices;
    } else if (Id === 2) {
      console.log('wdas');
      const selectedRanksIndices = Object.keys(apexRanks)
        .map((key, index) => ({ rank: key, index }))
        .filter((item) => apexRanks[item.rank])
        .map((item) => item.index);
      console.log(selectedRanksIndices);
      return selectedRanksIndices;
    }
  };

  const getSelectedMyRanksIndices = (Id) => {
    if (Id === 1) {
      const selectedRanksIndices = Object.keys(valoRanks)
        .map((key, index) => ({ rank: key, index }))
        .filter((item) => myValoRanks[item.rank])
        .map((item) => item.index);
      console.log(selectedRanksIndices);
      return selectedRanksIndices;
    } else if (Id === 2) {
      console.log('wdas');
      const selectedRanksIndices = Object.keys(apexRanks)
        .map((key, index) => ({ rank: key, index }))
        .filter((item) => myApexRanks[item.rank])
        .map((item) => item.index);
      console.log(selectedRanksIndices);
      return selectedRanksIndices;
    }
  };

  const handleClearButtonClick = () => {
    // クリアボタンが押されたときにIdが1の場合、Valoのランクをすべてfalseにする
    if (Id === 1) {
      setValoRanks({
        アイアン: false,
        ブロンズ: false,
        シルバー: false,
        ゴールド: false,
        プラチナ: false,
        ダイヤモンド: false,
        アセンダント: false,
        イモータル: false,
        レディアント: false,
      });

      setMyValoRanks({
        アイアン: false,
        ブロンズ: false,
        シルバー: false,
        ゴールド: false,
        プラチナ: false,
        ダイヤモンド: false,
        アセンダント: false,
        イモータル: false,
        レディアント: false,
      });
    }
    if (Id === 2) {
      // 他のランクや条件もすべてfalseにする
      setApexRanks({
        ブロンズ: false,
        シルバー: false,
        ゴールド: false,
        プラチナ: false,
        ダイヤモンド: false,
        マスター: false,
        プレデター: false,
      });

      setMyApexRanks({
        ブロンズ: false,
        シルバー: false,
        ゴールド: false,
        プラチナ: false,
        ダイヤモンド: false,
        マスター: false,
        プレデター: false,
      });
    }

    setTags({
      初心者歓迎: false,
      高ランク歓迎: false,
      スパルタ指導: false,
      仲良くワイワイ: false,
      上級者歓迎: false,
      エイム強化: false,
      メンタル強化: false,
      プロ志向: false,
    });

    setLessonTypes({
      一緒にプレイ: false,
      ビデオで学ぼう: false,
      '1 on 1': false,
      プレイを振り返ろう: false,
      プレイを見てもらおう: false,
      プレイを一緒に見よう: false,
      ゲームを一緒に学ぼう: false,
    });
  };

  // JSX内でクリアボタンを設置
  const fetchRecruitList = async () => {
    try {
      const rank = getSelectedRanksIndices(Id);

      const selectedMyRanksIndices = getSelectedMyRanksIndices(Id);
      const selectedTags = Object.keys(Tags).filter((key) => Tags[key]);
      const selectedLessonTypes = Object.keys(LessonTypes).filter((key) => LessonTypes[key]);

      const response = await apiClient.fetchRecruit.post({
        body: {
          Id,
          ranks: rank || [],
          subjectRank: selectedMyRanksIndices,
          tag: selectedTags,
          lessonTypes: selectedLessonTypes,
        },
      });
      console.log(response);
      setRecruitlist(response.body);
      console.log(RecruitList);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };
  useEffect(() => {
    fetchRecruitList();
  }, []);

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

  const ranksToDisplay = Id === 1 ? valoRanks : Id === 2 ? apexRanks : {};
  const myRanksToDisplay = Id === 1 ? myValoRanks : Id === 2 ? myApexRanks : {};
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = RecruitList.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
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
    <>
      <BasicHeader user={user} />
      <div className={styles.searchContainer}>
        <Link href="/">
          <div className={styles.searchNameContainer}>ホーム</div>
        </Link>
        {Id === 1 ? <div className={styles.searchNameContainer}>VALORANT</div> : null}
        {Id === 2 ? <div className={styles.searchNameContainer}>APEX</div> : null}
        {Id === 3 ? <div className={styles.searchNameContainer}>LOL</div> : null}
        <div className={styles.searchNameContainer}>検索条件</div>
        <div onClick={handleClearButtonClick} className={styles.blueTitle}>
          クリア
        </div>
        <div className={styles.searchNameContainer2}>
          <div
            className={`${styles.rankDropdown} ${showRankCheckboxes ? styles.active : ''}`}
            onClick={() => setShowRankCheckboxes(!showRankCheckboxes)}
          >
            コーチのランク
            <span className={styles.dropdownIcon} />
          </div>
          {showRankCheckboxes && (
            <div className={styles.rankCheckboxes}>
              {Object.keys(ranksToDisplay).map((rank) => (
                <label key={rank}>
                  <input
                    type="checkbox"
                    checked={ranksToDisplay[rank]}
                    onChange={() => handleCheckboxChange(rank)}
                  />
                  <span>{rank.charAt(0).toUpperCase() + rank.slice(1)}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        <div className={styles.searchNameContainer2}>
          <div
            className={`${styles.rankDropdown} ${showMyRankCheckboxes ? styles.active : ''}`}
            onClick={() => setShowMyRankCheckboxes(!showMyRankCheckboxes)}
          >
            対象のランク
            <span className={styles.dropdownIcon} />
          </div>
          {showMyRankCheckboxes && (
            <div className={styles.rankCheckboxes}>
              {Object.keys(myRanksToDisplay).map((myrank) => (
                <label key={myrank}>
                  <input
                    type="checkbox"
                    checked={myRanksToDisplay[myrank]}
                    onChange={() => handleMyRankCheckboxChange(myrank)}
                  />
                  <span>{myrank.charAt(0).toUpperCase() + myrank.slice(1)}</span>{' '}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className={styles.searchNameContainer2}>
          <div
            className={`${styles.rankDropdown} ${showTagCheckboxes ? styles.active : ''}`}
            onClick={() => setShowTagCheckboxes(!showTagCheckboxes)}
          >
            タグ
            <span className={styles.dropdownIcon} />
          </div>
          {showTagCheckboxes && (
            <div className={styles.rankCheckboxes}>
              {Object.keys(Tags).map((Tag) => (
                <label key={Tag}>
                  <input
                    type="checkbox"
                    checked={Tags[Tag]}
                    onChange={() => handleTagCheckboxChange(Tag)}
                  />
                  <span>{Tag.charAt(0).toUpperCase() + Tag.slice(1)}</span>{' '}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className={styles.searchNameContainer2}>
          <div
            className={`${styles.rankDropdown} ${showLessonTypeCheckboxes ? styles.active : ''}`}
            onClick={() => setShowLessonTypeCheckboxes(!showLessonTypeCheckboxes)}
          >
            レッスン形式
            <span className={styles.dropdownIcon} />
          </div>
          {showLessonTypeCheckboxes && (
            <div className={styles.rankCheckboxes}>
              {Object.keys(LessonTypes).map((LessonType) => (
                <label key={LessonType}>
                  <input
                    type="checkbox"
                    checked={LessonTypes[LessonType]}
                    onChange={() => handleLessonTypeCheckboxChange(LessonType)}
                  />
                  <span>{LessonType.charAt(0).toUpperCase() + LessonType.slice(1)}</span>{' '}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className={styles.search} onClick={fetchRecruitList}>
          検索
        </div>
      </div>
      <div className={styles2.gameTitle}>
        {Id === 1 ? <div>VALORANT</div> : null}
        {Id === 2 ? <div>APEX</div> : null}
        {Id === 3 ? <div>LOL</div> : null}
      </div>
      <div className={styles2.gameSort} onClick={() => handleSortClick(RecruitList)}>
        ランク順に並び替え
      </div>
      <div className={styles2.titleLine} />

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
                  src={getRankImage(Id, item.rank)}
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
                      src={getRankImage(Id, rank)}
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
    </>
  );
};

export default Valorant;
