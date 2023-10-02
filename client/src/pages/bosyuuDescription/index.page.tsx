/* eslint-disable max-lines */
/* eslint-disable complexity */
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css'; // スタイルシートのパスを適切に設定

const YourComponent = () => {
  const [step, setStep] = useState(1); // ステップの状態
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedRanks, setSelectedRanks] = useState([]);
  const [selectedMyRanks, setSelectedMyRanks] = useState([]);
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
    PUBG: ['ブロンズ', 'シルバー', 'ゴールド', 'プラチナ', 'ダイヤ', 'クラウン', 'エース'],
  };

  const stepTitles = ['ゲーム選択', 'ランク選択', '詳細情報', '注意事項'];

  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ユーザーがログインしている場合、ユーザー情報をセット
        console.log(firebaseUser);
        setUser(firebaseUser.uid);
      } else {
        // ユーザーがログアウトしている場合
        setUser(null);
      }
    });

    // コンポーネントがアンマウントされる際に購読を解除
    return () => unsubscribe();
  }, []);

  const [selectedGameIndex, setSelectedGameIndex] = useState();
  const [selectedMyRankIndex, setSelectedMyRankIndex] = useState([]);
  const handleGameChange = (event) => {
    const gameName = event.target.value;
    setSelectedGame(gameName);

    // ゲームの名前からインデックスを見つける
    const gameIndex = Object.keys(games).indexOf(gameName) + 1; // インデックスは0から始まるので、1を足す
    setSelectedGame(event.target.value);
    // インデックスを保存する
    setSelectedGameIndex(gameIndex);

    // ランクの選択をリセット
    setSelectedRanks([]);
  };

  const handleMyRankChange = (event) => {
    const selectedRank = event.target.value;

    // 現在選択されているゲームのランク配列を取得
    const currentGameRanks = games[selectedGame];

    // 選択されたランクのインデックスを見つける
    const rankIndex = currentGameRanks.indexOf(selectedRank) + 1; // インデックスは0から始まるので、1を足す
    setSelectedMyRanks(event.target.value);
    // インデックスを保存する
    setSelectedMyRankIndex(rankIndex);
  };

  const [selectedRanksIndex, setSelectedRanksIndex] = useState([]);

  const handleRankChange = (rank) => {
    const ranksArray = games[selectedGame];

    // ランクの名前からインデックスを見つけます。
    const rankIndex = ranksArray.indexOf(rank);

    // 選択されたランクの名前に基づいて状態を更新します。
    setSelectedRanks((prevRanks) =>
      prevRanks.includes(rank) ? prevRanks.filter((r) => r !== rank) : [...prevRanks, rank]
    );

    // 選択されたランクのインデックスに基づいて別の状態を更新します。
    setSelectedRanksIndex((prevRanksIndex) =>
      prevRanksIndex.includes(rankIndex)
        ? prevRanksIndex.filter((index) => index !== rankIndex)
        : [...prevRanksIndex, rankIndex]
    );
  };

  const handleNextStep = () => {
    // 次のステップに進むためのロジック
    // 例えば、すべての選択が完了していることを確認するなど

    console.log(acheavement);

    setStep(step + 1);
  };

  const totalSteps = 4; // 総ステップ数

  const [title, setTitle] = useState(''); // React の state hook

  const handleChange = (event) => {
    setTitle(event.target.value); // 入力された値を state にセット
  };

  const [description, setDescription] = useState(''); // React の state hook

  const handleChangeDescription = (event) => {
    setDescription(event.target.value); // 入力された値を state にセット
  };

  const [acheavement, setAcheavement] = useState(''); // React の state hook

  const handleAcheavement = (event) => {
    setAcheavement(event.target.value); // 入力された値を state にセット
  };

  const [notes, setNotes] = useState('');
  const handleNotes = (event) => {
    setNotes(event.target.value); // 入力された値を state にセット
  };

  const [suchedule, setSuchedule] = useState('');
  const handleSuchedule = (event) => {
    setSuchedule(event.target.value); // 入力された値を state にセット
  };

  const tags = ['タグ1', 'タグ2', 'タグ3', 'タグ4']; // 例としてのタグリスト

  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(acheavement);
    try {
      const coachData = {
        user,
        title,
        selectedGameIndex,
        selectedMyRankIndex,
        selectedRanks,
        selectedTags,
        acheavement,
        description,
        suchedule,
        notes,
        // その他必要なデータ
      };
      console.log(coachData);
      console.log(selectedMyRanks);
      const unknownRanks = selectedMyRanks as unknown;
      const unknownGame = unknownRanks as number;
      const response = await apiClient.createBosyuu.post({
        body: {
          user,
          title,
          selectedGameIndex,
          selectedMyRankIndex,
          selectedRanksIndex,
          selectedTags,
          acheavement,
          description,
          suchedule,
          notes,
        },
      });
      // 成功時の処理（例：リダイレクト等）
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <>
      <div className={styles.progressBarContainer} />
      <div className={styles.container} />
      <div className={styles.loginTitle}>コーチング募集</div>
      <div className={styles.step}>
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNumber) => (
          <div key={stepNumber}>
            <div className={styles.stepContainer}>
              <div
                className={`${styles.stepNumber} ${
                  step >= stepNumber ? styles.completedStepNumber : ''
                }`}
              />
              {stepNumber < totalSteps && (
                <div
                  className={`${styles.stepNumberLine} ${
                    step > stepNumber ? styles.completedStepNumberLine : ''
                  }`}
                />
              )}
              <div className={styles.stepTitle}>{stepTitles[stepNumber - 1]}</div>
            </div>
          </div>
        ))}
      </div>
      {step === 1 && (
        <>
          <div className={styles.a}>
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
              {selectedGame && games.hasOwnProperty(selectedGame) ? (
                games[selectedGame].map((rank) => (
                  <option key={rank} value={rank}>
                    {rank}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  利用可能なランクがありません
                </option>
              )}
            </select>

            {selectedGame && games[selectedGame] ? (
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
              <div>選択したゲームに対応するランクはありません。</div>
            )}

            <button onClick={handleNextStep} className={styles.next}>
              次へ
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <div className={styles.a}>
          <div className={styles.title}>募集タイトルを入力してください</div>
          <input
            type="text"
            placeholder="タイトルを入力してください"
            onChange={handleChange} // ユーザーの入力を処理する関数
            className={styles.input} // スタイリングのためのCSSクラス
          />
          <div className={styles.description}>募集内容を入力してください</div>
          <input
            type="text"
            placeholder="募集内容を入力してください"
            onChange={handleChangeDescription} // ユーザーの入力を処理する関数
            className={styles.inputDescription} // スタイリングのためのCSSクラス
          />
          <div className={styles.acheavement}>実績を入力してください</div>
          <input
            type="text"
            placeholder="実績を入力してください"
            onChange={handleAcheavement} // ユーザーの入力を処理する関数
            className={styles.inputAcheavement} // スタイリングのためのCSSクラス
          />
          <button onClick={handleNextStep} className={styles.next2}>
            次へ
          </button>
        </div>
      )}

      {step === 3 && (
        <div className={styles.a}>
          <div className={styles.title}>スケジュールを入力してください</div>
          <input
            type="text"
            placeholder="スケジュールを入力してください"
            onChange={handleSuchedule} // ユーザーの入力を処理する関数
            className={styles.input} // スタイリングのためのCSSクラス
          />
          <div className={styles.notes}>注意事項を入力してください</div>
          <input
            type="text"
            placeholder="注意事項を入力してください"
            onChange={handleNotes} // ユーザーの入力を処理する関数
            className={styles.inputNotes} // スタイリングのためのCSSクラス
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
          <button onClick={handleNextStep} className={styles.next2}>
            次へ
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          {' '}
          <button onClick={handleSubmit}>登録</button>
        </div>
      )}
    </>
  );
};

export default YourComponent;
