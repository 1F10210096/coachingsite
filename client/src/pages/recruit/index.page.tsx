/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable max-lines */
import { SearchOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import type {
  ApexRankType,
  BosyuuListModel3,
  FortNiteRankType,
  LolRankType,
  StreetFigherRankType,
  TagsType,
  ValoRankType,
  YuugiouRankType,
} from 'commonTypesWithClient/models';
import { onAuthStateChanged } from 'firebase/auth';
import type { DateTimeFormatOptions } from 'intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import { gameList } from 'src/utils/gameList';
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
  const games = gameList;

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

  const [lolRanks, setLolRanks] = useState({
    アイアン: false,
    ブロンズ: false,
    シルバー: false,
    ゴールド: false,
    プラチナ: false,
    ダイヤモンド: false,
    マスター: false,
    グランドマスター: false,
    チャレンジャー: false,
  });

  const [fortniteRanks, setFortniteRanks] = useState({
    ブロンズ: false,
    シルバー: false,
    ゴールド: false,
    プラチナ: false,
    ダイヤモンド: false,
    エリート: false,
    チャンピオン: false,
    アンリアル: false,
  });

  const [StreetFighterRanks, setStreetFighterRanks] = useState({
    ルーキー: false,
    ブロンズ: false,
    シルバー: false,
    ゴールド: false,
    プラチナ: false,
    ダイヤモンド: false,
    マスター: false,
  });

  const [yuugiouRanks, setYuugiouRanks] = useState({
    ルーキー: false,
    ブロンズ: false,
    シルバー: false,
    ゴールド: false,
    プラチナ: false,
    ダイヤモンド: false,
    マスター: false,
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

  const [myLolRanks, setMyLolRanks] = useState({
    アイアン: false,
    ブロンズ: false,
    シルバー: false,
    ゴールド: false,
    プラチナ: false,
    ダイヤモンド: false,
    マスター: false,
    グランドマスター: false,
    チャレンジャー: false,
  });

  const [myFortniteRanks, setMyFortniteRanks] = useState({
    ブロンズ: false,
    シルバー: false,
    ゴールド: false,
    プラチナ: false,
    ダイヤモンド: false,
    エリート: false,
    チャンピオン: false,
    アンリアル: false,
  });

  const [myStreetFighterRanks, setMyStreetFighterRanks] = useState({
    ルーキー: false,
    ブロンズ: false,
    シルバー: false,
    ゴールド: false,
    プラチナ: false,
    ダイヤモンド: false,
    マスター: false,
  });

  const [myYuugiouRanks, setMyYuugiouRanks] = useState({
    ルーキー: false,
    ブロンズ: false,
    シルバー: false,
    ゴールド: false,
    プラチナ: false,
    ダイヤモンド: false,
    マスター: false,
  });

  const [Tags, setTags] = useState<TagsType>({
    中級者歓迎: false,
    上級者向け: false,
    プロ向け: false,
    仲良くワイワイ: false,
    スパルタ指導: false,
    戦略: false,
    エイム強化: false,
    テクニック: false,
    キャラクター解析: false,
    マップ解析: false,
    武器ガイド: false,
    チームプレイ: false,
    ソロプレイ: false,
    メンタルトレーニング: false,
    ゲーム理論: false,
    パッチノート解説: false,
    リプレイ分析: false,
    'Q&Aセッション': false,
  });

  const handleCheckboxChange = (
    rank: keyof (
      | ValoRankType
      | ApexRankType
      | LolRankType
      | FortNiteRankType
      | StreetFigherRankType
      | YuugiouRankType
    )
  ) => {
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
    } else if (Id === 3) {
      setLolRanks((prevRanks) => ({
        ...prevRanks,
        [rank]: !prevRanks[rank],
      }));
    } else if (Id === 4) {
      setFortniteRanks((prevRanks) => ({
        ...prevRanks,
        [rank]: !prevRanks[rank],
      }));
    } else if (Id === 5) {
      setStreetFighterRanks((prevRanks) => ({
        ...prevRanks,
        [rank]: !prevRanks[rank],
      }));
    } else if (Id === 6) {
      setYuugiouRanks((prevRanks) => ({
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
    } else if (Id === 3) {
      setMyLolRanks((prevRanks) => ({
        ...prevRanks,
        [rank]: !prevRanks[rank],
      }));
    } else if (Id === 4) {
      setMyFortniteRanks((prevRanks) => ({
        ...prevRanks,
        [rank]: !prevRanks[rank],
      }));
    } else if (Id === 5) {
      setMyStreetFighterRanks((prevRanks) => ({
        ...prevRanks,
        [rank]: !prevRanks[rank],
      }));
    } else if (Id === 6) {
      setMyYuugiouRanks((prevRanks) => ({
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
      console.log(apexRanks);
      selectedRanksIndices = Object.keys(apexRanks)
        .map((key, index) => ({ rank: key as keyof typeof apexRanks, index }))
        .filter((item) => apexRanks[item.rank])
        .map((item) => item.index);
      console.log(selectedRanksIndices);
      return selectedRanksIndices;
    } else if (Id === 3) {
      console.log(lolRanks);
      selectedRanksIndices = Object.keys(lolRanks)
        .map((key, index) => ({ rank: key as keyof typeof lolRanks, index }))
        .filter((item) => lolRanks[item.rank])
        .map((item) => item.index);
      console.log(selectedRanksIndices);
      return selectedRanksIndices;
    } else if (Id === 4) {
      console.log(fortniteRanks);
      selectedRanksIndices = Object.keys(fortniteRanks)
        .map((key, index) => ({ rank: key as keyof typeof fortniteRanks, index }))
        .filter((item) => fortniteRanks[item.rank])
        .map((item) => item.index);
      console.log(selectedRanksIndices);
      return selectedRanksIndices;
    } else if (Id === 5) {
      console.log(StreetFighterRanks);
      selectedRanksIndices = Object.keys(StreetFighterRanks)
        .map((key, index) => ({ rank: key as keyof typeof StreetFighterRanks, index }))
        .filter((item) => StreetFighterRanks[item.rank])
        .map((item) => item.index);
      console.log(selectedRanksIndices);
      return selectedRanksIndices;
    } else if (Id === 6) {
      console.log(yuugiouRanks);
      selectedRanksIndices = Object.keys(yuugiouRanks)
        .map((key, index) => ({ rank: key as keyof typeof yuugiouRanks, index }))
        .filter((item) => yuugiouRanks[item.rank])
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
    } else if (Id === 3) {
      console.log('wdas');
      const selectedRanksIndices = Object.keys(lolRanks)
        .map((key, index) => ({ rank: key as keyof typeof myLolRanks, index }))
        .filter((item) => myLolRanks[item.rank])
        .map((item) => item.index);
      console.log(selectedRanksIndices);
      return selectedRanksIndices;
    } else if (Id === 4) {
      console.log('wdas');
      const selectedRanksIndices = Object.keys(fortniteRanks)
        .map((key, index) => ({ rank: key as keyof typeof myFortniteRanks, index }))
        .filter((item) => myFortniteRanks[item.rank])
        .map((item) => item.index);
      console.log(selectedRanksIndices);
      return selectedRanksIndices;
    } else if (Id === 5) {
      console.log('wdas');
      const selectedRanksIndices = Object.keys(StreetFighterRanks)
        .map((key, index) => ({ rank: key as keyof typeof myStreetFighterRanks, index }))
        .filter((item) => myStreetFighterRanks[item.rank])
        .map((item) => item.index);
      console.log(selectedRanksIndices);
      return selectedRanksIndices;
    } else if (Id === 6) {
      console.log('wdas');
      const selectedRanksIndices = Object.keys(yuugiouRanks)
        .map((key, index) => ({ rank: key as keyof typeof myYuugiouRanks, index }))
        .filter((item) => myYuugiouRanks[item.rank])
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

    if (Id === 3) {
      // 他のランクや条件もすべてfalseにする
      setLolRanks({
        アイアン: false,
        ブロンズ: false,
        シルバー: false,
        ゴールド: false,
        プラチナ: false,
        ダイヤモンド: false,
        マスター: false,
        グランドマスター: false,
        チャレンジャー: false,
      });

      setMyLolRanks({
        アイアン: false,
        ブロンズ: false,
        シルバー: false,
        ゴールド: false,
        プラチナ: false,
        ダイヤモンド: false,
        マスター: false,
        グランドマスター: false,
        チャレンジャー: false,
      });
    }

    if (Id === 4) {
      // 他のランクや条件もすべてfalseにする
      setFortniteRanks({
        ブロンズ: false,
        シルバー: false,
        ゴールド: false,
        プラチナ: false,
        ダイヤモンド: false,
        エリート: false,
        チャンピオン: false,
        アンリアル: false,
      });

      setMyFortniteRanks({
        ブロンズ: false,
        シルバー: false,
        ゴールド: false,
        プラチナ: false,
        ダイヤモンド: false,
        エリート: false,
        チャンピオン: false,
        アンリアル: false,
      });
    }
    if (Id === 5) {
      // 他のランクや条件もすべてfalseにする
      setStreetFighterRanks({
        ルーキー: false,
        ブロンズ: false,
        シルバー: false,
        ゴールド: false,
        プラチナ: false,
        ダイヤモンド: false,
        マスター: false,
      });

      setMyStreetFighterRanks({
        ルーキー: false,
        ブロンズ: false,
        シルバー: false,
        ゴールド: false,
        プラチナ: false,
        ダイヤモンド: false,
        マスター: false,
      });
    }
    if (Id === 6) {
      setYuugiouRanks({
        ルーキー: false,
        ブロンズ: false,
        シルバー: false,
        ゴールド: false,
        プラチナ: false,
        ダイヤモンド: false,
        マスター: false,
      });

      setMyYuugiouRanks({
        ルーキー: false,
        ブロンズ: false,
        シルバー: false,
        ゴールド: false,
        プラチナ: false,
        ダイヤモンド: false,
        マスター: false,
      });
    }

    setTags({
      中級者歓迎: false,
      上級者向け: false,
      プロ向け: false,
      仲良くワイワイ: false,
      スパルタ指導: false,
      戦略: false,
      エイム強化: false,
      テクニック: false,
      キャラクター解析: false,
      マップ解析: false,
      武器ガイド: false,
      チームプレイ: false,
      ソロプレイ: false,
      メンタルトレーニング: false,
      ゲーム理論: false,
      パッチノート解説: false,
      リプレイ分析: false,
      'Q&Aセッション': false,
    });

    // setLessonTypes({
    //   一緒にプレイ: false,
    //   ビデオで学ぼう: false,
    //   '1 on 1': false,
    //   プレイを振り返ろう: false,
    //   プレイを見てもらおう: false,
    //   プレイを一緒に見よう: false,
    //   ゲームを一緒に学ぼう: false,
    // });
  };

  const fetchRecruitList = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      const rank = getSelectedRanksIndices(Id) || [];
      const selectedMyRanksIndices = getSelectedMyRanksIndices(Id) || [];

      const selectedTags = Object.keys(Tags)
        .filter((key) => Tags[key as keyof typeof Tags])
        .map((key) => key as keyof typeof Tags);
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

  function formatDate(dateString: Date) {
    const options: DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date
      .toLocaleDateString('ja-JP', options)
      .replace(/\//g, '-')
      .replace(/(\d{4})-(\d{2})-(\d{2})/, '$1/$2/$3');
  }

  const ranksToDisplay: RankStatus =
    Id === 1
      ? valoRanks
      : Id === 2
      ? apexRanks
      : Id === 3
      ? lolRanks
      : Id === 4
      ? fortniteRanks
      : Id === 5
      ? StreetFighterRanks
      : Id === 6
      ? yuugiouRanks
      : {};
  const myRanksToDisplay: RankStatus =
    Id === 1
      ? myValoRanks
      : Id === 2
      ? myApexRanks
      : Id === 3
      ? myLolRanks
      : Id === 4
      ? myFortniteRanks
      : Id === 5
      ? myStreetFighterRanks
      : Id === 6
      ? myYuugiouRanks
      : {};
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = RecruitList.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const [sortDescending, setSortDescending] = useState(true);

  const handleSortClick = (list: BosyuuListModel3[]): BosyuuListModel3[] => {
    const sortedList = [...list].sort((a, b) =>
      sortDescending ? b.rank - a.rank : a.rank - b.rank
    );
    setRecruitlist(sortedList);
    return sortedList;
  };

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // リクルートページにゲーム名をパラメータとして渡す
  const gameValueMapping: {
    [key: string]: number | 'unknown';
    VALORANT: number;
    APEX: number;
    LOL: number;
    FORTNITE: number;
    ストリートファイター: number;
    '遊戯王 マスターデュエル': number;
    OverWatch2: number;
    PUBG: number;
    CSGO2: number;
  } = {
    VALORANT: 1,
    APEX: 2,
    LOL: 3,
    FORTNITE: 4,
    ストリートファイター: 5,
    '遊戯王 マスターデュエル': 6,
    OverWatch2: 7,
    PUBG: 8,
    CSGO2: 9,
  };

  // ゲームアイテムがクリックされたときに実行する関数
  const handleGameClick = (gameName: string) => {
    const value = gameValueMapping[gameName] || 'unknown'; // マッピングから数値を取得、未定義の場合は'unknown'
    // リクルートページにクエリパラメータとして数値を渡す
    router.push(`/recruit?value=${value}`);
  };
  const categories = {
    FPS: ['VALORANT', 'OverWatch2', 'APEX', 'CSGO2'],
    カードゲーム: ['遊戯王 マスターデュエル'],
    バトルロイヤル: ['PUBG', 'FORTNITE', 'APEX'],
    MOBA: ['LOL'],
    格闘ゲーム: ['ストリートファイター'],
    // 他のカテゴリとゲームを追加
  };
  const games1 = categories[activeCategory as keyof typeof categories];

  const handleClick2 = (category: string) => {
    setActiveCategory((prevState) => (prevState === category ? null : category));
  };
  const [sortCriteria, setSortCriteria] = useState('rank'); // デフォルトは「ランク順」

  const handleSortChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSortCriteria(e.target.value);
    // ここで選択されたソート基準に基づいてリストを並び替える処理を実行
    handleSortClick2(e.target.value);
  };
  const handleSortClick2 = (e: SetStateAction<string>) => {
    if (e === 'rank') {
      // ランク順に並び替えるロジック
      const sortedList = [...RecruitList].sort((a, b) =>
        sortDescending ? b.rank - a.rank : a.rank - b.rank
      );
      setRecruitlist(sortedList);
    } else if (e === 'update') {
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

  const [ward, setWard] = useState('');

  const [lessonWard, setLessonWard] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWard(event.target.value); // 入力された値を state にセット
  };
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLessonWard(event.target.value); // 入力された値を state にセット
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
    fetchRecruitList();
  };
  const [likedRecruits, setLikedRecruits] = useState<string[]>([]);
  const fetchLike = async () => {
    try {
      const response = await apiClient.fetchAllLike.post({
        body: {
          Id: user,
        },
      });
      if (response.body !== null) {
        const likedIds = response.body.map((item) => item.bosyuuListId);
        console.log(likedIds, 'likedIds'); // デバッグ用に抽出したidを確認
        setLikedRecruits(likedIds);
      }
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    fetchLike();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
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
            {Id === 4 ? <div className={styles.home2}>FORTNITE</div> : null}
            {Id === 5 ? <div className={styles.home2}>StreetFighter</div> : null}
            {Id === 6 ? <div className={styles.home2}>遊戯王 マスターデュエル</div> : null}
            {Id === 7 ? <div className={styles.home2}>OverWatch2</div> : null}
            {Id === 8 ? <div className={styles.home2}>PUBG</div> : null}
            {Id === 9 ? <div className={styles.home2}>CSGO2</div> : null}
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
                      <>
                        <div className={styles.line} />
                        <div className={styles.rankCheckboxes}>
                          {Object.keys(ranksToDisplay).map((rank) => (
                            <label key={rank}>
                              <input
                                type="checkbox"
                                checked={ranksToDisplay[rank]}
                                className={styles.sell}
                                onChange={() =>
                                  handleCheckboxChange(
                                    rank as keyof (
                                      | ValoRankType
                                      | ApexRankType
                                      | LolRankType
                                      | FortNiteRankType
                                      | StreetFigherRankType
                                      | YuugiouRankType
                                    )
                                  )
                                }
                              />
                              <span>{rank.charAt(0).toUpperCase() + rank.slice(1)}</span>
                            </label>
                          ))}
                        </div>
                      </>
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
                    <>
                      <div className={styles.line2} />
                      <div className={styles.rankCheckboxes}>
                        {Object.keys(myRanksToDisplay).map((myrank) => (
                          <label key={myrank}>
                            <input
                              type="checkbox"
                              className={styles.sell}
                              checked={myRanksToDisplay[myrank]}
                              onChange={() =>
                                handleMyRankCheckboxChange(
                                  myrank as keyof (
                                    | ValoRankType
                                    | ApexRankType
                                    | FortNiteRankType
                                    | StreetFigherRankType
                                    | YuugiouRankType
                                  )
                                )
                              }
                            />
                            <span>{myrank.charAt(0).toUpperCase() + myrank.slice(1)}</span>{' '}
                          </label>
                        ))}
                      </div>
                    </>
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
                    <>
                      <div className={styles.line2} />
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
                    </>
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
                  <>
                    <div className={styles.line3} />
                    <div className={styles.sea3}>
                      <input
                        type="text"
                        className={styles.searchInput}
                        onChange={handleChange2}
                        placeholder="レッスンタイプを入力"
                      />
                    </div>
                  </>
                )}
                <div className={styles.searchNameContainer2}>
                  <div
                    onClick={() => setShowWard(!showWard)}
                    className={`${styles.rankDropdown} ${showWard ? styles.active : ''}`}
                  >
                    <div className={styles.searchDetailContainer}>ワード検索</div>
                    <span className={styles.dropdownIcon} />
                  </div>{' '}
                  <div className={styles.line4} />
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
                      {activeCategory &&
                        categories[activeCategory as keyof typeof categories].map((game, idx) => (
                          <div
                            key={idx}
                            className={styles.gameItem}
                            onClick={() => handleGameClick(game)}
                          >
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
              {Id === 4 ? <div>FORTNITE</div> : null}
              {Id === 5 ? <div>StreetFighter</div> : null}
              {Id === 6 ? <div>遊戯王 マスターデュエル</div> : null}
              {Id === 7 ? <div>OverWatch2</div> : null}
              {Id === 8 ? <div>PUBG</div> : null}
              {Id === 9 ? <div>CSGO2</div> : null}
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
                  <button
                    className={
                      likedRecruits.includes(item.id) ? styles2.applyButton2 : styles2.applyButton
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeClick(item.id, e);
                    }}
                  >
                    <span className={styles2.starIcon}>★</span>{' '}
                    {likedRecruits.includes(item.id) ? 'いいね済み' : 'いいね'}
                  </button>
                  <div>
                    <p className={styles2.date}>掲載開始日： {formatDate(item.createdAt)}</p>
                    <p className={styles2.date}>情報更新日： {formatDate(item.updatedAt)}</p>
                  </div>
                </div>
              </div>
            ))}
            <Pagination
              current={currentPage}
              total={RecruitList.length}
              pageSize={itemsPerPage}
              onChange={handleChangePage}
              className={styles2.pagenation}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Valorant;
