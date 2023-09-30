/* eslint-disable complexity */
import { useState } from 'react';
import styles from './index.module.css'; // スタイルシートのパスを適切に設定

const YourComponent = () => {
  const [step, setStep] = useState(1); // ステップの状態
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedRanks, setSelectedRanks] = useState([]);

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

  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
    setSelectedRanks([]); // ゲームが変わったらランクの選択をリセット
  };

  const handleRankChange = (rank) => {
    setSelectedRanks((prevRanks) =>
      prevRanks.includes(rank) ? prevRanks.filter((r) => r !== rank) : [...prevRanks, rank]
    );
  };

  const handleNextStep = () => {
    // 次のステップに進むためのロジック
    // 例えば、すべての選択が完了していることを確認するなど
    setStep(step + 1);
  };

  const totalSteps = 4; // 総ステップ数

  const [title, setTitle] = useState(''); // React の state hook

  const handleChange = (event) => {
    setTitle(event.target.value); // 入力された値を state にセット
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
              value={selectedRanks}
              onChange={handleRankChange}
              className={styles.select2}
              disabled={!selectedGame} // ゲームが選択されていない場合は無効化
            >
              <option value="">自分のランクを選択してください</option>
              {selectedGame &&
                games[selectedGame].map((rank) => (
                  <option key={rank} value={rank}>
                    {rank}
                  </option>
                ))}
            </select>

            {selectedGame && (
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
            placeholder="タイトル"
            onChange={handleChange} // ユーザーの入力を処理する関数
            className={styles.input} // スタイリングのためのCSSクラス
          />
          <button onClick={handleNextStep}>次へ</button>
        </div>
      )}

      {step === 3 && (
        <div>
          {' '}
          <button onClick={handleNextStep}>次へ</button>
        </div>
      )}

      {step === 4 && (
        <div>
          {' '}
          <button onClick={handleNextStep}>次へ</button>
        </div>
      )}
    </>
  );
};

export default YourComponent;
