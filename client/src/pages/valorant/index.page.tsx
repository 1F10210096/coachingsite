import type { BosyuuListModel } from 'commonTypesWithClient/models';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';

// eslint-disable-next-line complexity
const Valorant = () => {
  const [showRankCheckboxes, setShowRankCheckboxes] = useState(false);
  const [showMyRankCheckboxes, setShowMyRankCheckboxes] = useState(false);
  const [showTagCheckboxes, setShowTagCheckboxes] = useState(false);
  const [showRoleCheckboxes, setShowRoleCheckboxes] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [RecruitList, setRecruitlist] = useState<BosyuuListModel[]>([]);

  const [ranks, setRanks] = useState({
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

  const [Roles, setRoles] = useState({
    デュエリスト: false,
    イニシエーター: false,
    コントローラー: false,
    センチネル: false,
  });

  // チェックボックスの状態を切り替えるハンドラー
  const handleCheckboxChange = (rank) => {
    setRanks((prevRanks) => ({
      ...prevRanks,
      [rank]: !prevRanks[rank],
    }));
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

  const handleRoleCheckboxChange = (Role) => {
    setRoles((prevRoles) => ({
      ...prevRoles,
      [Role]: !prevRoles[Role],
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

  const fetchRecruitList = async () => {
    try {
      const Id = '1';
      const selectedRanks = Object.keys(ranks).filter((key) => ranks[key]);
      const selectedMyRanks = Object.keys(myranks).filter((key) => myranks[key]);
      const selectedTags = Object.keys(Tags).filter((key) => Tags[key]);
      const selectedRoles = Object.keys(Roles).filter((key) => Roles[key]);

      const response = await apiClient.fetchRecruit.post({
        body: {
          Id,
          ranks: selectedRanks,
          subjectRank: selectedMyRanks,
          tag: selectedTags,
          roles: selectedRoles,
        },
      });
      console.log(response);
      setRecruitlist(response.body);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };
  useEffect(() => {
    fetchRecruitList();
  }, []);

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
              {Object.keys(ranks).map((rank) => (
                <label key={rank}>
                  <input
                    type="checkbox"
                    checked={ranks[rank]}
                    onChange={() => handleCheckboxChange(rank)}
                  />
                  <span>{rank.charAt(0).toUpperCase() + rank.slice(1)}</span>{' '}
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
            className={`${styles.rankDropdown} ${showRoleCheckboxes ? styles.active : ''}`}
            onClick={() => setShowRoleCheckboxes(!showRoleCheckboxes)}
          >
            役割
            <span className={styles.dropdownIcon} />
          </div>
          {showRoleCheckboxes && (
            <div className={styles.rankCheckboxes}>
              {Object.keys(Roles).map((Role) => (
                <label key={Role}>
                  <input
                    type="checkbox"
                    checked={Roles[Role]}
                    onChange={() => handleRoleCheckboxChange(Role)}
                  />
                  <span>{Role.charAt(0).toUpperCase() + Role.slice(1)}</span>{' '}
                </label>
              ))}
            </div>
          )}
        </div>
        <div className={styles.search} onClick={fetchRecruitList}>
          検索
        </div>
      </div>

      <div className={styles.helpwanted} />
    </>
  );
};

export default Valorant;
