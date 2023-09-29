import React, { useState } from 'react';
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
  };

  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
    setSelectedRanks([]); // ゲームが変わったらランクの選択をリセット
  };

  const handleRankChange = (rank) => {
    setSelectedRanks((prevRanks) =>
      prevRanks.includes(rank)
        ? prevRanks.filter((r) => r !== rank)
        : [...prevRanks, rank]
    );
  };

  const handleNextStep = () => {
    // 次のステップに進むためのロジック
    // 例えば、すべての選択が完了していることを確認するなど
    setStep(step + 1);
  };

  return (
    <div className={styles.a}>
      {step === 1 && (
        <>
          <label htmlFor="game-select" className={styles.mail}>
            対象ゲームを選択してください
          </label>
          <select
            id="game-select"
            value={selectedGame}
            onChange={handleGameChange}
            className={styles.select}
          >
            <option value="">ゲームを選択...</option>
            {Object.keys(games).map((game) => (
              <option key={game} value={game}>
                {game}
              </option>
            ))}
          </select>

          {selectedGame && (
            <div>
              <label htmlFor="rank-select" className={styles.mail}>
                対象ランクを選択してください
              </label>
              {games[selectedGame].map((rank) => (
                <div key={rank}>
                  <input
                    type="checkbox"
                    id={rank}
                    name={rank}
                    checked={selectedRanks.includes(rank)}
                    onChange={() => handleRankChange(rank)}
                  />
                  <label htmlFor={rank}>{rank}</label>
                </div>
              ))}
            </div>
          )}

          <button onClick={handleNextStep}>次へ</button>
        </>
      )}

      {step === 2 && (
        // ステップ2のコンテンツ
      )}

      {/* その他のステップのコンテンツ */}
    </div>
  );
};

export default YourComponent;
