/* eslint-disable max-lines */
import type { BosyuuListModel } from 'commonTypesWithClient/models';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
  const [searchQuery, setSearchQuery] = useState('');
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
  const [myranks, setMyRanks] = useState({
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

  const [Tags, setTags] = useState({
    初心者歓迎: false,
    高ランク歓迎: false,
    ストイック: false,
    仲良くワイワイ: false,
    うまくなりたい人必見: false,
  });

  const [LessonTypes, setLessonTypes] = useState({
    一緒にプレイ: false,
    ビデオで学ぼう: false,
    解説: false,
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

  const handleMyRankCheckboxChange = (myrank) => {
    setMyRanks((prevMyRanks) => ({
      ...prevMyRanks,
      [myrank]: !prevMyRanks[myrank],
    }));
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

  const fetchRecruitList = async () => {
    try {
      const rank = getSelectedRanksIndices(Id);

      const selectedMyRanksIndices = Object.keys(myranks)
        .map((key, index) => ({ rank: key, index }))
        .filter((item) => myranks[item.rank])
        .map((item) => item.index);
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

  const ranksToDisplay = Id === 1 ? valoRanks : Id === 2 ? apexRanks : {};
  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.searchContainer}>
        <div className={styles.searchNameContainer}>検索条件</div>
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
              {Object.keys(myranks).map((myrank) => (
                <label key={myrank}>
                  <input
                    type="checkbox"
                    checked={myranks[myrank]}
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

      <div className={styles2.helpwanted}>
        {RecruitList.map((item) => (
          <div
            key={item.id}
            className={styles2.container}
            onClick={() => handleClick(item.id, item.gameId)}
          >
            <p className={styles2.title}>{item.title}</p>
            <div className={styles2.rank}>
              <img
                src={getRankImage(Id, item.rank)}
                className={styles2.rankImage}
                alt={`Rank: ${item.rank}`}
              />
            </div>
            <div className={styles2.subjectRank}>
              <p>対象のランク:</p>
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
              <div className={styles2.lessonTypeContainer}>
                {item.lessonType?.map((LessonType, index) => (
                  <p key={index} className={styles2.lessonTypeText}>
                    {LessonType}
                  </p>
                ))}
              </div>
            </div>

            <p className={styles2.description}>ひと言：{item.description}</p>
            {/* <p>主題ランク: {item.subjectRank.join(', ')}</p>
            <p>タグ: {item.tag.length > 0 ? item.tag.join(', ') : 'なし'}</p>
            <p>教師ID: {item.teacherId}</p>
            <p>作成日: {new Date(item.createdAt).toLocaleString()}</p>
            <p>更新日: {new Date(item.updatedAt).toLocaleString()}</p> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Valorant;
