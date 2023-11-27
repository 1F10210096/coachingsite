import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css'; // スタイルシートは適宜調整してください
const Register = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [coachContent, setCoachContent] = useState('');
  const [suchedule, setSuchedule] = useState('');
  const [OneWord, setOneWord] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedGame, setSelectedGame] = useState('');
  const [selectedRanks, setSelectedRanks] = useState([]);
  const games = {
    ゲーム1: ['ランク1', 'ランク2', 'ランク3'],
    ゲーム2: ['ランクA', 'ランクB', 'ランクC'],
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ユーザーがログインしている場合の処理
        console.log('Logged in as:', user.email);
      } else {
        // ユーザーがログインしていない場合の処理
        console.log('No user logged in');
      }
    });

    // コンポーネントのアンマウント時にリスナーを解除
    return () => unsubscribe();
  }, []);

  const userId = getAuth().currentUser.uid;

  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
  };

  const handleContent = (event) => {
    setCoachContent(event.target.value);
  };

  const handleSuchedule = (event) => {
    setSuchedule(event.target.value);
  };

  const handleOneWord = (event) => {
    setOneWord(event.target.value);
  };

  const handleRankChange = (rank) => {
    setSelectedRanks((prevRanks) => {
      if (prevRanks.includes(rank)) {
        // ランクがすでに選択されている場合は削除
        return prevRanks.filter((r) => r !== rank);
      } else {
        // ランクが選択されていない場合は追加
        return [...prevRanks, rank];
      }
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      // ここでユーザー登録処理
      // ...

      // 募集情報の送信
      const coachData = {
        userId,
        selectedGame,
        selectedRanks,
        coachContent,
        suchedule,
        OneWord,
        // その他必要なデータ
      };
      console.log(coachData);
    const response = await apiClient.createBosyuu.post({ body : {userId,selectedGame,selectedRanks,coachContent,suchedule,OneWord} });
      // 成功時の処理（例：リダイレクト等）
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <>
      <div className={styles.container} />
      <div className={styles.loginTitle}>コーチング募集</div>
      <div className={styles.loginContainer}>
        <form className={styles.loginForm}>
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

          <label htmlFor="username" className={styles.mail}>
            提供するコーチング内容を入力してください
          </label>
          <input
            type="text"
            className={styles.searchmail}
            placeholder="コーチング内容を入力してください"
            value={coachContent}
            onChange={handleContent}
          />
          <label htmlFor="username" className={styles.mail}>
            スケジュールを入力してください
          </label>
          <input
            type="text"
            className={styles.searchmail}
            placeholder="スケジュールを入力してください"
            value={suchedule}
            onChange={handleSuchedule}
          />
          <label htmlFor="username" className={styles.mail}>
            ひと言を入力してください
          </label>
          <input
            type="text"
            className={styles.searchmail}
            placeholder="ひと言を入力してください"
            value={OneWord}
            onChange={handleOneWord}
          />
          <button type="submit" className={styles.loginButton} onClick={handleRegister}>
            募集する
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
