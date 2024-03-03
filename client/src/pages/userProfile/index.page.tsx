/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable max-lines */
import assert from 'assert';
import type {
  BosyuuListFrontModel,
  NewApplyData,
  UserListItem,
} from 'commonTypesWithClient/models';
import { onAuthStateChanged } from 'firebase/auth';
import type { DateTimeFormatOptions } from 'intl';
import { useRouter } from 'next/router';
import type { ChangeEvent, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth, logout } from 'src/utils/firebase';
import getGameListImagePath from 'src/utils/gameListPng';
import getImagePath from 'src/utils/gamePng';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';
// eslint-disable-next-line complexity
const UserProfile = () => {
  const router = useRouter();
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    // URLからmodalパラメータを取得
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (router.query.modal) {
      setModalContent(typeof router.query.modal === 'string' ? router.query.modal : '');
    }
  }, [router.query]);

  const [newName, setNewName] = useState('');
  const [like, setLike] = useState('');
  const [game, setGame] = useState('');
  const [zisseki, setZisseki] = useState('');
  const [newProfile, setNewProfile] = useState<string | null>('');
  const showModal = async (content: SetStateAction<string>) => {
    setModalContent(content);
  };
  const [Id, setUserUUID] = useState('');
  useEffect(() => {
    const auth = createAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ユーザーがログインしている場合、ユーザー情報をセット
        console.log(firebaseUser);
        console.log(firebaseUser.uid);
        setUserUUID(firebaseUser.uid);
      } else {
        console.log('error');
      }
    });

    // コンポーネントがアンマウントされる際に購読を解除
    return () => unsubscribe();
  }, []);

  const logOut = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      const userCredential = await logout();
      console.log('ログアウト成功:', userCredential);
      router.push(process.env.REACT_APP_REDIRECT_URL as string);
    } catch (error) {
      console.error('ログイン失敗:', error);
    }
  };

  const handleNewName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 8) {
      setNewName(e.target.value);
    }
  };

  const handleGame = (e: ChangeEvent<HTMLInputElement>) => {
    setGame(e.target.value);
  };

  const handleZisseki = (e: ChangeEvent<HTMLInputElement>) => {
    setZisseki(e.target.value);
  };

  const handleNewProfile = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewProfile(e.target.value);
    console.log(newProfile);
  };

  const [lookImage, setLookImage] = useState<string | null>('');

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setLookImage(fileUrl); // ローカルでのプレビュー用

      // 画像を読み込む
      const img = new Image();
      img.src = fileUrl;
      img.onload = () => {
        // canvasを使用して画像をリサイズ
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // リサイズ後のサイズを設定
        canvas.width = 800; // ここで希望の幅を設定
        canvas.height = (img.height * 800) / img.width; // アスペクト比を維持
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        // canvasから画像をBase64として取得
        const base64String = canvas.toDataURL('image/jpeg', 0.7); // 第二引数は品質設定（0.7は70%の品質）
        setSelectedFile(base64String); // Base64エンコードされた文字列を状態に設定
      };
    }
  };

  // フォーム送信時の処理
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Id) {
      const userId = Id;
      console.log(selectedFile);

      try {
        console.log(imageUrl);
        console.log(zisseki);
        await apiClient.updateProfile.post({
          body: { userId, like, newName, game, zisseki, selectedFile },
        });
        alert('プロフィール更新成功');
      } catch (error) {
        console.error('プロフィール更新エラー:', error);
      }
    } else {
      console.error('ユーザーがログインしていません。');
    }
  };

  const [recruitList, setMyRecruitlist] = useState<UserListItem[]>([]);
  const [user2, setUser2] = useState<NewApplyData[]>([]);



  type RoomType = {
    id: string; // または number など、id の実際の型に応じて変更
    // 他のプロパティがあればここに追加
  };

  const [myRoomList, setMyRoomlist] = useState<RoomType[]>([]);
  const fetchMyRoomList = async (roomId: string) => {
    try {
      console.log(roomId);
      const response = await apiClient.fetchMyRoomList.post({ body: { roomId } });
      console.log(response.body);
      setMyRoomlist(response.body);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  const fetchMyDmList = async (roomId: string) => {
    try {
      router.push(`../dm?id=${roomId}`);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const handleButtonClick = (id: string) => {
    setSelectedId(Number(id));
  };

  const handleSubmit4 = async () => {
    console.log('Submitted:', { selectedId, rating, review });

    assert('レビューが完了しました');
  };

  const handleSubmit2 = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // フォームのデフォルトの送信を防止
    console.log('Submitted:', { selectedId, rating, review });

    try {
      const response = await apiClient.reviewList.post({
        body: {
          selectedId: reviewId,
          rating,
          review,
        },
      });
      console.log('レビューが完了しました:', response);
      // レビュー送信後の処理をここに書く（例: 状態をクリアする、通知を表示する等）
    } catch (error) {
      console.error('レビュー送信エラー:', error);
    }
  };
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

  const [RecruitDetail, setRecruitDetail] = useState<BosyuuListFrontModel>();

  const showModal2 = async (content: SetStateAction<string>, Id: string) => {
    setModalContent(content);
    const response = await apiClient.fetachRecruitDetail.post({
      body: {
        Id,
      },
    });
    console.log(response.body);
    setId(response.body.bosyuuListFront.id);
    setTitle(response.body.bosyuuListFront.title);
    setDescription(response.body.bosyuuListFront.description);
    setNotes(response.body.bosyuuListFront.notes);
    setMyProfile(response.body.bosyuuListFront.myProfile);
    setDescriptionDetail(response.body.bosyuuListFront.descriptionDetail);
    setSuchedule(response.body.bosyuuListFront.suchedule);
    setSelectedGameIndex(response.body.bosyuuListFront.gameId);
    setLessonType(response.body.bosyuuListFront.lessonType);
    setSelectedMyRankIndex(response.body.bosyuuListFront.rank);
    setSelectedGameIndex(response.body.bosyuuListFront.gameId);
    setSelectedRanksIndex(response.body.bosyuuListFront.subjectRank);
  };
  const [reviewId, setReviewId] = useState('');

  const showModal4 = async (content: SetStateAction<string>, Id: string) => {
    setModalContent(content);
    setReviewId(Id);
  };
  const handleInputChangeTitle = (value: string) => {
    setTitle(value);
  };
  const handleInputChangeDescription = (value: string) => {
    setDescription(value);
  };

  const handleInputChangeNotes = (value: string) => {
    setNotes(value);
  };

  const handleInputChangeMyProfile = (value: string) => {
    setMyProfile(value);
  };
  const handleInputChangeDescriptionDetail = (value: string) => {
    setDescriptionDetail(value);
  };

  const handleInputChangeSushedule = (value: string) => {
    setSuchedule(value);
  };

  type GameKey = keyof typeof games;
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

  const submitEdit = async () => {
    // ここで編集内容をAPIに送信する
    // 成功したらモーダルを閉じるか、成功メッセージを表示
  };

  const [selectedGame, setSelectedGame] = useState<GameKey | undefined>();
  const [selectedMyRanks, setSelectedMyRanks] = useState<string>('');
  const [selectedMyRankIndex, setSelectedMyRankIndex] = useState<number>(0);
  const [selectedGameIndex, setSelectedGameIndex] = useState<number>(0);
  const [selectedRanksIndex, setSelectedRanksIndex] = useState<number[]>([]);
  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);
  const tags = ['初心者歓迎', '上級者歓迎', 'スパルタ指導', '仲良くワイワイ']; // 例としてのタグリスト
  const [gameId, setGameId] = useState<number>(0);
  const [id, setId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [rank, setRank] = useState<number>(0);
  const [subjectRank, setSubjectRank] = useState<number[]>([]);
  const [tag, setTag] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [myProfile, setMyProfile] = useState<string>('');
  const [descriptionDetail, setDescriptionDetail] = useState<string>('');
  const [suchedule, setSuchedule] = useState('');
  const [lessonType, setLessonType] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<Date>(new Date());
  const handleMyRankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRank = event.target.value;

    // 現在選択されているゲームのランク配列を取得
    const currentGameRanks = selectedGame ? games[selectedGame] : undefined;

    if (currentGameRanks) {
      const rankIndex = currentGameRanks.indexOf(selectedRank) + 1; // インデックスは0から始まるので、1を足す
      setSelectedMyRanks(event.target.value);
      setSelectedMyRankIndex(rankIndex);
    } else {
      // currentGameRanks が undefined の場合の処理
      // 例えば、エラーメッセージを表示する、何もしない、デフォルト値を設定するなど
    }
  };

  const handleGameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const gameName = event.target.value;
    if (['VALORANT', 'LOL', 'CSGO', 'COD 2', 'OverWatch2'].includes(gameName)) {
      setSelectedGame(gameName as GameKey);
    }

    // ゲームの名前からインデックスを見つける
    const gameIndex = Object.keys(games).indexOf(gameName) + 1; // インデックスは0から始まるので、1を足す
    if (['VALORANT', 'LOL', 'CSGO', 'COD 2', 'OverWatch2'].includes(event.target.value)) {
      setSelectedGame(event.target.value as GameKey);
    }

    // インデックスを保存する
    setSelectedGameIndex(gameIndex);

    // ランクの選択をリセット
    setSelectedRanks([]);
  };

  const handleRankChange = (rank: string) => {
    const ranksArray = selectedGame ? games[selectedGame] : undefined;

    // ランクの名前からインデックスを見つけます。
    const rankIndex = ranksArray?.indexOf(rank);

    // 選択されたランクの名前に基づいて状態を更新します。
    setSelectedRanks((prevRanks) =>
      prevRanks.includes(rank) ? prevRanks.filter((r) => r !== rank) : [...prevRanks, rank]
    );

    // 選択されたランクのインデックスに基づいて別の状態を更新します。
    // rankIndex が undefined の場合は処理を行わない
    if (typeof rankIndex === 'number') {
      setSelectedRanksIndex((prevRanksIndex) =>
        prevRanksIndex.includes(rankIndex)
          ? prevRanksIndex.filter((index) => index !== rankIndex)
          : [...prevRanksIndex, rankIndex]
      );
    }
  };

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit3 = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const unknownRanks = selectedMyRanks as unknown;
      const unknownGame = unknownRanks as number;
      const response = await apiClient.editBosyuu.post({
        body: {
          id,
          title,
          selectedGameIndex,
          selectedMyRankIndex,
          lessonType,
          selectedRanksIndex,
          selectedTags,
          description,
          suchedule,
          notes,
        },
      });
      assert('募集作成が完了しました');
      router.push(process.env.REACT_APP_REDIRECT_URL as string);
    } catch (error) {
      assert(error);
    }
  };

  const showModal5 = async () => {
    router.push(`/userProfileUser`);
  };

  return (
    <>
      <div className={styles.allContainer}>
        <BasicHeader user={Id} />
        <div className={styles.searchContainer}>
          <div className={styles.searchNameContainer}>設定画面</div>
          <div className={styles.searchNameContainer2}>
            <div className={`${styles.rankDropdown}`} onClick={showModal5}>
              プロフィール
              <span className={styles.dropdownIcon} />
            </div>
          </div>
          <div className={styles.searchNameContainer2}>
            <div
              className={`${styles.rankDropdown}`}
              onClick={() => showModal('applicationHistory')}
            >
              コーチング応募履歴
              <span className={styles.dropdownIcon} />
            </div>
          </div>
          <div className={styles.searchNameContainer2}>
            <div
              className={`${styles.rankDropdown}`}
              onClick={() => showModal('recruitmentHistory')}
            >
              コーチング募集履歴
              <span className={styles.dropdownIcon} />
            </div>
          </div>
          <div className={styles.searchNameContainer2}>
            <div className={`${styles.rankDropdown}`} onClick={() => showModal('logout')}>
              ログアウト
              <span className={styles.dropdownIcon} />
            </div>
          </div>

          {modalContent && (
            <div className={styles.helpwanted}>
              <div className={styles.modal}>
                {/* ここでモーダルの内容を条件付きでレンダリング */}
                {modalContent === 'profile' && (
                  <>
                    <div className={styles.container3}>
                      <div className={styles.title}>プロフィール設定</div>
                      <div className={styles.line} />

                      <form onSubmit={handleSubmit} className={styles.container2}>
                        <div className={styles.nameTitle}>名前</div>
                        <input
                          type="text"
                          name="name"
                          value={newName}
                          onChange={handleNewName}
                          placeholder="名前"
                          className={styles.name}
                        />
                        <div className={styles.nameTitle}>好きなゲーム</div>
                        <input
                          type="text"
                          name="game"
                          value={game}
                          onChange={handleGame}
                          placeholder="好きなゲーム名"
                          className={styles.name2}
                        />
                        <div className={styles.nameTitle}>実績</div>
                        <input
                          type="text"
                          name="rank"
                          value={zisseki}
                          className={styles.name2}
                          onChange={handleZisseki}
                          placeholder="ランク"
                        />
                        <div className={styles.nameTitle}>自己紹介</div>
                        <textarea
                          name="bio"
                          value={newProfile || ''}
                          onChange={handleNewProfile}
                          placeholder="自己紹介"
                          className={styles.name2}
                        />
                        <input
                          type="file"
                          name="profileImage"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                        {lookImage && (
                          <img src={lookImage} alt="プレビュー" className={styles.profileImage} />
                        )}
                        <button className={styles.button} type="submit">
                          プロフィール更新
                        </button>
                      </form>
                    </div>
                  </>
                )}
                {modalContent === 'applicationHistory' && (
                  <>
                    <div className={styles.title}>コーチング応募履歴</div>
                    <div className={styles.line} />

                    <>
                      <ul className={styles.box}>
                        {user2.map((recruit, index) => (
                          <div
                            key={index}
                            // onClick={() => fetchMyRoomList(recruit.id)}
                            className={styles.box2}
                          >
                            <div className={styles.titleContainer}>
                              <div className={styles.rank}>
                                <img
                                  key={index}
                                  className={styles.rankImage}
                                  src={`/gameLists2/${getGameListImagePath(recruit.bosyuu.gameId)}`}
                                  alt={`Rank: ${recruit.bosyuu.title}`}
                                />
                              </div>
                              <div className={styles.title2}>{recruit.bosyuu.title}</div>
                              <div className={styles.rank}>
                                <img
                                  src={getRankImage(recruit.bosyuu.gameId, recruit.bosyuu.rank)}
                                  className={styles.rankImage}
                                  alt={`Rank: ${recruit.bosyuu.rank}`}
                                />
                              </div>
                            </div>
                            <div className={styles.line2} />

                            <div className={styles.wrapper}>
                              <div className={styles.tag}>
                                <div className={styles.tagContainer}>
                                  {recruit.bosyuu.tag.map((tag, index) => (
                                    <p key={index} className={styles.tagText}>
                                      {tag}
                                    </p>
                                  ))}
                                </div>
                              </div>
                              <div className={styles.lessonType}>
                                <div className={styles.lessonTypeContainer}>
                                  {recruit.bosyuu.lessonType}
                                </div>
                              </div>
                              <div className={styles.subjectRank}>
                                <p className={styles.subjectRankTitle}>対象のランク:</p>
                                <div className={styles.subjectRankContainer}>
                                  {recruit.bosyuu.subjectRank.map((rank, index) => (
                                    <img
                                      key={index}
                                      src={getRankImage(recruit.bosyuu.gameId, rank)}
                                      className={styles.subjectRankImage}
                                      alt={`Rank: ${rank}`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className={styles.descriptionContainer}>
                                <p className={styles.descriptionTitle}>募集詳細:</p>
                                <p className={styles.description}>{recruit.bosyuu.description}</p>
                              </div>
                              <div className={styles.descriptionContainer}>
                                <p className={styles.descriptionTitle}>実績:</p>
                                <p className={styles.description}>{recruit.bosyuu.myProfile}</p>
                              </div>
                            </div>
                            <div className={styles.line3} />
                            <div className={styles.horizontalLayout}>
                              <button
                                className={styles.applyButton}
                                onClick={() => showModal4('review', recruit.id)}
                              >
                                <span className={styles.starIcon}>★</span>評価する
                              </button>
                            </div>
                            <div />
                            {/* <p>{recruit.description}</p> */}
                          </div>
                        ))}
                      </ul>
                      {/* <button onClick={fetchMyRecruitList}>コーチング応募履歴</button> */}
                    </>
                  </>
                )}
                {modalContent === 'review' && (
                  <>
                    <div className={styles.title}>評価</div>
                    <div className={styles.line} />
                    <form className={styles.container2} onSubmit={handleSubmit2}>
                      <div className={styles.nameTitle}>評価</div>
                      <input
                        type="text"
                        name="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder="評価"
                        className={styles.name}
                      />
                      <div className={styles.nameTitle}>感想</div>
                      <textarea
                        name="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="感想"
                        className={styles.name2}
                      />
                      <button className={styles.button} type="submit">
                        送信
                      </button>
                    </form>
                  </>
                )}
                {modalContent === 'change' && (
                  <>
                    {' '}
                    <div>
                      <label className={styles.mail}>対象ゲームを選択してください</label>
                      <select
                        id="game-select"
                        value={selectedGame}
                        onChange={handleGameChange}
                        className={styles.select}
                      >
                        <option value="" className={styles.mail}>
                          ゲームを選択してください
                        </option>
                        {Object.keys(games).map((game) => (
                          <option key={game} value={game} className={styles.mail}>
                            {game}
                          </option>
                        ))}
                      </select>
                      <label className={styles.myRank}>自分のランクを選択してください</label>
                      <select
                        id="rank-select"
                        value={selectedMyRanks}
                        onChange={handleMyRankChange}
                        className={styles.select2}
                        disabled={!selectedGame}
                      >
                        <option value="">自分のランクを選択してください</option>
                        {selectedGame &&
                        Object.prototype.hasOwnProperty.call(games, selectedGame) ? (
                          games[selectedGame].map((rank) => (
                            <option key={rank} value={rank}>
                              {rank}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled />
                        )}
                      </select>

                      {selectedGame && games[selectedGame].length > 0 ? (
                        <div>
                          <label htmlFor="rank-select" className={styles.subjectRank}>
                            対象ランクを選択してください
                          </label>
                          <div className={styles.pick}>
                            {games[selectedGame].map((rank) => (
                              <div key={rank} className={styles.rankItem}>
                                <input
                                  type="checkbox"
                                  id={rank}
                                  name={rank}
                                  checked={selectedRanks.includes(rank)}
                                  onChange={() => handleRankChange(rank)}
                                  className={styles.pick}
                                />
                                <label htmlFor={rank} className={styles.rankName}>
                                  {rank}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className={styles.noPick} />
                      )}

                      <input
                        type="text"
                        value={title}
                        onChange={(e) => handleInputChangeTitle(e.target.value)}
                      />
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => handleInputChangeDescription(e.target.value)}
                      />
                      <textarea
                        value={notes}
                        onChange={(e) => handleInputChangeNotes(e.target.value)}
                      />
                      <textarea
                        value={myProfile}
                        onChange={(e) => handleInputChangeMyProfile(e.target.value)}
                      />
                      <textarea
                        value={descriptionDetail}
                        onChange={(e) => handleInputChangeDescriptionDetail(e.target.value)}
                      />
                      <input
                        type="text"
                        value={suchedule}
                        onChange={(e) => handleInputChangeSushedule(e.target.value)}
                      />
                      <div className={styles.notes}>
                        タグを設定入力してください
                        {tags.map((tag) => (
                          <div key={tag} className={styles.tagItem}>
                            <input
                              type="checkbox"
                              id={tag}
                              name={tag}
                              checked={selectedTags.includes(tag)}
                              onChange={() => handleTagChange(tag)}
                              className={styles.pick}
                            />
                            <label htmlFor={tag}>{tag}</label>
                          </div>
                        ))}
                      </div>
                      {/* createdAtは編集しない、または日付ピッカーを使用 */}
                      <button onClick={handleSubmit3}>保存</button>
                    </div>
                  </>
                )}
                {modalContent === 'recruitmentHistory' && (
                  <div>
                    <div className={styles.title}>コーチング募集履歴</div>
                    <div className={styles.line} />
                    {recruitList.length > 0 ? (
                      <>
                        <ul className={styles.box}>
                          {recruitList.map((recruit, index) => (
                            <div
                              key={index}
                              // onClick={() => fetchMyRoomList(recruit.id)}
                              className={styles.box2}
                            >
                              <div className={styles.titleContainer}>
                                <div className={styles.rank}>
                                  <img
                                    key={index}
                                    className={styles.rankImage}
                                    src={`/gameLists2/${getGameListImagePath(recruit.gameId)}`}
                                    alt={`Rank: ${recruit.title}`}
                                  />
                                </div>
                                <div className={styles.title2}>{recruit.title}</div>
                                <div className={styles.rank}>
                                  <img
                                    src={getRankImage(recruit.gameId, recruit.rank)}
                                    className={styles.rankImage}
                                    alt={`Rank: ${recruit.rank}`}
                                  />
                                </div>
                              </div>
                              <div className={styles.line2} />

                              <div className={styles.wrapper}>
                                <div className={styles.tag}>
                                  <div className={styles.tagContainer}>
                                    {recruit.tag.map((tag, index) => (
                                      <p key={index} className={styles.tagText}>
                                        {tag}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                                <div className={styles.lessonType}>
                                  <div className={styles.lessonTypeContainer}>
                                    {recruit.lessonType}
                                  </div>
                                </div>
                                <div className={styles.subjectRank}>
                                  <p className={styles.subjectRankTitle}>対象のランク:</p>
                                  <div className={styles.subjectRankContainer}>
                                    {recruit.subjectRank.map((rank, index) => (
                                      <img
                                        key={index}
                                        src={getRankImage(recruit.gameId, rank)}
                                        className={styles.subjectRankImage}
                                        alt={`Rank: ${rank}`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div className={styles.descriptionContainer}>
                                  <p className={styles.descriptionTitle}>募集詳細:</p>
                                  <p className={styles.description}>{recruit.description}</p>
                                </div>
                                <div className={styles.descriptionContainer}>
                                  <p className={styles.descriptionTitle}>実績:</p>
                                  <p className={styles.description}>{recruit.myProfile}</p>
                                </div>
                              </div>
                              <div className={styles.line3} />
                              <div className={styles.horizontalLayout}>
                                <button
                                  className={styles.applyButton}
                                  onClick={() => showModal2('change', recruit.id)}
                                >
                                  編集する
                                </button>
                              </div>
                              <div />
                              {/* <p>{recruit.description}</p> */}
                            </div>
                          ))}
                        </ul>
                        {/* <button onClick={fetchMyRecruitList}>コーチング応募履歴</button> */}
                      </>
                    ) : (
                      <p className={styles.noRecruit}>募集履歴はありません。</p>
                    )}

                    {myRoomList.length > 0 && (
                      <div>
                        <h2>マイルームリスト</h2>
                        <ul>
                          {myRoomList.map((room, index) => (
                            <li key={index} onClick={() => fetchMyDmList(room.id)}>
                              <h3>{room.id}</h3>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                {modalContent === 'logout' && (
                  <>
                    <div className={styles.title}>ログアウト</div>
                    <div className={styles.line} />
                    <div className={styles.logout}>ログアウト処理しますか？</div>
                    <button onClick={logOut} className={styles.logoutButton}>
                      logout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>{' '}
      </div>
    </>
  );
};

export default UserProfile;
