/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable max-lines */
import { SearchOutlined, UnorderedListOutlined } from '@ant-design/icons';
import type {
  ApexRankType,
  BosyuuListModel3,
  TagsType,
  ValoRankType,
} from 'commonTypesWithClient/models';
import { onAuthStateChanged } from 'firebase/auth';
import type { DateTimeFormatOptions } from 'intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import { default as getImagePath } from 'src/utils/gamePng';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';
import styles2 from './index2.module.css';
// eslint-disable-next-line complexity
const Valorant = () => {
  const router = useRouter();
  const value = router.query.value;
  const Id = Number(value);
  const [showRankCheckboxes, setShowRankCheckboxes] = useState(false);
  const [showMyRankCheckboxes, setShowMyRankCheckboxes] = useState(false);
  const [showTagCheckboxes, setShowTagCheckboxes] = useState(false);
  const [showWard, setShowWard] = useState(false);
  const [showLessonWard, setShowLessonWard] = useState(false);
  const [showLessonTypeCheckboxes, setShowLessonTypeCheckboxes] = useState(false);
  const [RecruitList, setRecruitlist] = useState<BosyuuListModel3[]>([]);

  type RankStatus = {
    [rank: string]: boolean;
  };
  //ad
  const games = {
    VALORANT: [
      'アイアン',
      'ブロンズ',
      'シルバー',
      'ゴールド',
      'プラチナ',
      'ダイヤ',
      'アセンダント',
      'イモータル',
      'レディアント',
    ],
    LOL: [
      'アイアン',
      'ブロンズ',
      'シルバー',
      'ゴールド',
      'プラチナ',
      'ダイヤ',
      'マスター',
      'グランドマスター',
      'チャレンジャー',
    ],
    CSGO: ['ブロンズ', 'シルバー', 'ゴールド', 'プラチナ', 'ダイヤ', 'クラウン', 'エース'],
    'COD 2': ['ブロンズ', 'シルバー', 'ゴールド', 'プラチナ', 'ダイヤ', 'クラウン', 'エース'],
    OverWatch2: ['ブロンズ', 'シルバー', 'ゴールド', 'プラチナ', 'ダイヤ', 'クラウン', 'エース'],
  };

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

  const [Tags, setTags] = useState<TagsType>({
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

  const handleCheckboxChange = (rank: keyof (ValoRankType | ApexRankType)) => {
    if (Id === 1) {
      console.log(rank);
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

  const handleMyRankCheckboxChange = (rank: keyof (ValoRankType | ApexRankType)) => {
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

  const handleTagCheckboxChange = (Tag: keyof TagsType) => {
    setTags((prevTags) => ({
      ...prevTags,
      [Tag]: !prevTags[Tag],
    }));
  };

  const [user, setUser] = useState('');

  useEffect(() => {
    const auth = createAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ユーザーがログインしている場合、ユーザー情報をセット
        console.log(firebaseUser);
        setUser(firebaseUser.uid);
      } else {
        // ユーザーがログアウトしている場合
      }
    });

    // コンポーネントがアンマウントされる際に購読を解除
    return () => unsubscribe();
  }, []);

  const getSelectedRanksIndices = (Id: number) => {
    let selectedRanksIndices: number[] = [];

    if (Id === 1) {
      console.log(valoRanks);
      selectedRanksIndices = Object.keys(valoRanks)
        .map((key, index) => ({ rank: key as keyof typeof valoRanks, index }))
        .filter((item) => valoRanks[item.rank])
        .map((item) => item.index);
      console.log(selectedRanksIndices);
      return selectedRanksIndices;
    } else if (Id === 2) {
      console.log(valoRanks);
      selectedRanksIndices = Object.keys(valoRanks)
        .map((key, index) => ({ rank: key as keyof typeof valoRanks, index }))
        .filter((item) => valoRanks[item.rank])
        .map((item) => item.index);
      console.log(selectedRanksIndices);
      return selectedRanksIndices;
    }
  };

  const getSelectedMyRanksIndices = (Id: number) => {
    if (Id === 1) {
      const selectedRanksIndices = Object.keys(valoRanks)
        .map((key, index) => ({ rank: key as keyof typeof myValoRanks, index }))
        .filter((item) => myValoRanks[item.rank])
        .map((item) => item.index);
      console.log(selectedRanksIndices);
      return selectedRanksIndices;
    } else if (Id === 2) {
      console.log('wdas');
      const selectedRanksIndices = Object.keys(apexRanks)
        .map((key, index) => ({ rank: key as keyof typeof myApexRanks, index }))
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

  const fetchRecruitList = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      const rank = getSelectedRanksIndices(Id) || [];
      const selectedMyRanksIndices = getSelectedMyRanksIndices(Id) || [];

      const selectedTags = Object.keys(Tags)
        .filter((key) => Tags[key as keyof typeof Tags])
        .map((key) => key as keyof typeof Tags);

      const selectedLessonTypes = Object.keys(LessonTypes)
        .filter((key) => LessonTypes[key as keyof typeof LessonTypes])
        .map((key) => key as keyof typeof LessonTypes);

      console.log(rank);

      const response = await apiClient.fetchRecruit.post({
        body: {
          Id,
          ranks: rank,
          subjectRank: selectedMyRanksIndices,
          tag: selectedTags,
          lessonWard,
          ward,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const ranksToDisplay: RankStatus = Id === 1 ? valoRanks : Id === 2 ? apexRanks : {};
  const myRanksToDisplay: RankStatus = Id === 1 ? myValoRanks : Id === 2 ? myApexRanks : {};
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

  const handleSortClick = (list: BosyuuListModel3[]): BosyuuListModel3[] => {
    const sortedList = [...list].sort((a, b) =>
      sortDescending ? b.rank - a.rank : a.rank - b.rank
    );
    setRecruitlist(sortedList);
    return sortedList;
  };

  const [activeCategory, setActiveCategory] = useState(null);

  const categories = {
    FPS: ['VALORANT', 'OverWatch2', 'APEX', 'CSGO2'],
    カードゲーム: ['ハースストーン', 'シャドウバース', 'マジックザギャザリング'],
    バトルロイヤル: ['PUBG', 'フォートナイト', 'APEX'],
    MOBA: ['LOL', 'DOTA2'],
    格闘ゲーム: ['ストリートファイター', '鉄拳'],
    // 他のカテゴリとゲームを追加
  };

  const handleClick2 = (category) => {
    setActiveCategory(category === activeCategory ? null : category);
  };

  const [sortCriteria, setSortCriteria] = useState('rank'); // デフォルトは「ランク順」

  const handleSortChange = (e) => {
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
      const sortedList = [...RecruitList].sort((a, b) =>
        sortDescending ? b.updatedAt - a.updatedAt : a.updatedAt - b.updatedAt
      );
      setRecruitlist(sortedList);
      // 更新順に並び替えるロジック
    }
  };

  const [ward, setWard] = useState('');

  const [lessonWard, setLessonWard] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWard(event.target.value); // 入力された値を state にセット
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLessonWard(event.target.value); // 入力された値を state にセット
  };

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.allContainer}>
        <div className={styles2.container4}>
          <div className={styles.homeContainer}>
            <Link href="/">
              <div className={styles.home}>ホーム</div>
            </Link>
            <div className={styles.home3}>{'>'}</div>
            {Id === 1 ? <div className={styles.home2}>VALORANT</div> : null}
            {Id === 2 ? <div className={styles.home2}>APEX</div> : null}
            {Id === 3 ? <div className={styles.home2}>LOL</div> : null}
          </div>
          <div className={styles.sContainer3}>
            <div className={styles.sContainer}>
              <div className={styles.searchContainer}>
                <div className={styles.categoryHeader2}>
                  <div className={styles.categoryIcon2}>
                    <SearchOutlined style={{ fontSize: '20px', color: '#000000' }} />
                  </div>
                  <div className={styles.searchNameContainer}>検索条件</div>
                  <div onClick={handleClearButtonClick} className={styles.blueTitle}>
                    クリア
                  </div>
                </div>
                <div className={styles.sd}>
                  <div className={styles.searchNameContainer2}>
                    <div
                      className={`${styles.rankDropdown} ${
                        showRankCheckboxes ? styles.active : ''
                      }`}
                      onClick={() => setShowRankCheckboxes(!showRankCheckboxes)}
                    >
                      <div className={styles.searchDetailContainer}>コーチのランク</div>
                      <span className={styles.dropdownIcon} />
                    </div>{' '}
                  </div>
                  <div className={styles.sea1}>
                    {showRankCheckboxes && (
                      <div className={styles.rankCheckboxes}>
                        {Object.keys(ranksToDisplay).map((rank) => (
                          <label key={rank}>
                            <input
                              type="checkbox"
                              checked={ranksToDisplay[rank]}
                              className={styles.sell}
                              onChange={() =>
                                handleCheckboxChange(rank as keyof (ValoRankType | ApexRankType))
                              }
                            />
                            <span>{rank.charAt(0).toUpperCase() + rank.slice(1)}</span>
                          </label>
                        ))}
                      </div>
                    )}{' '}
                  </div>
                </div>
                <div className={styles.searchNameContainer2}>
                  <div
                    className={`${styles.rankDropdown} ${
                      showMyRankCheckboxes ? styles.active : ''
                    }`}
                    onClick={() => setShowMyRankCheckboxes(!showMyRankCheckboxes)}
                  >
                    <div className={styles.searchDetailContainer}>対象のランク</div>
                    <span className={styles.dropdownIcon} />
                  </div>{' '}
                </div>
                <div className={styles.sea}>
                  {showMyRankCheckboxes && (
                    <div className={styles.rankCheckboxes}>
                      {Object.keys(myRanksToDisplay).map((myrank) => (
                        <label key={myrank}>
                          <input
                            type="checkbox"
                            className={styles.sell}
                            checked={myRanksToDisplay[myrank]}
                            onChange={() =>
                              handleMyRankCheckboxChange(
                                myrank as keyof (ValoRankType | ApexRankType)
                              )
                            }
                          />
                          <span>{myrank.charAt(0).toUpperCase() + myrank.slice(1)}</span>{' '}
                        </label>
                      ))}
                    </div>
                  )}
                </div>{' '}
                <div className={styles.searchNameContainer2}>
                  <div
                    className={`${styles.rankDropdown} ${showTagCheckboxes ? styles.active : ''}`}
                    onClick={() => setShowTagCheckboxes(!showTagCheckboxes)}
                  >
                    <div className={styles.searchDetailContainer}>タグ</div>
                    <span className={styles.dropdownIcon} />
                  </div>{' '}
                </div>
                <div className={styles.sea2}>
                  {showTagCheckboxes && (
                    <div className={styles.rankCheckboxes2}>
                      {Object.keys(Tags).map((Tag) => (
                        <label key={Tag} htmlFor={`tag-${Tag}`}>
                          <input
                            id={`tag-${Tag}`}
                            type="checkbox"
                            checked={Tags[Tag as keyof TagsType]}
                            onChange={() => handleTagCheckboxChange(Tag as keyof TagsType)}
                          />
                          {/* spanをinputの直後に配置 */}
                          <span className={styles.ra}>
                            {Tag.charAt(0).toUpperCase() + Tag.slice(1)}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}{' '}
                </div>
                <div className={styles.searchNameContainer2}>
                  <div
                    onClick={() => setShowLessonWard(!showLessonWard)}
                    className={`${styles.rankDropdown} ${showLessonWard ? styles.active : ''}`}
                  >
                    <div className={styles.searchDetailContainer}>レッスン形式検索</div>
                    <span className={styles.dropdownIcon} onChange={handleChange} />
                  </div>{' '}
                </div>
                {showLessonWard && (
                  <div className={styles.sea3}>
                    <input
                      type="text"
                      className={styles.searchInput}
                      onChange={handleChange2}
                      placeholder="レッスンタイプを入力してください"
                    />
                  </div>
                )}
                <div className={styles.searchNameContainer2}>
                  <div
                    onClick={() => setShowWard(!showWard)}
                    className={`${styles.rankDropdown} ${showWard ? styles.active : ''}`}
                  >
                    <div className={styles.searchDetailContainer}>ワード検索</div>
                    <span className={styles.dropdownIcon} />
                  </div>{' '}
                </div>
                {showWard && (
                  <div className={styles.sea2}>
                    <input
                      type="text"
                      className={styles.searchInput2}
                      onChange={handleChange}
                      placeholder="ワードを入力してください"
                    />
                  </div>
                )}
                <div className={styles.search} onClick={fetchRecruitList}>
                  検索
                </div>
              </div>
            </div>
            <div className={styles.sContainer2}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIcon}>
                  <UnorderedListOutlined style={{ fontSize: '20px', color: '#000000' }} />
                </div>
                <div className={styles.categoryTitle}>カテゴリ一覧</div>
              </div>
              {Object.keys(categories).map((category, index) => (
                <div key={index} onClick={() => handleClick2(category)}>
                  <h3 className={styles.category}>{category}</h3>
                  <div className={styles.categoryHeader}>
                    <div className={styles.categoryArrow}>
                      {activeCategory === category ? '▲' : '▼'}
                    </div>{' '}
                  </div>
                  {activeCategory === category && (
                    <div className={styles.gameList}>
                      {categories[category].map((game, idx) => (
                        <div key={idx} className={styles.gameItem}>
                          <div className={styles.gameItem2}>{game}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles2.subContanier}>
          <div className={styles2.gameTitleContainer}>
            <div className={styles2.gameTitle}>
              {Id === 1 ? <div>VALORANT</div> : null}
              {Id === 2 ? <div>APEX</div> : null}
              {Id === 3 ? <div>LOL</div> : null}
            </div>
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
                    src={item.teacher.user.imageUrl ?? 'placeholder-image-url.jpg'}
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
              {RecruitList.length > indexOfLastItem && (
                <button onClick={handleNextPage}>次へ</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Valorant;
