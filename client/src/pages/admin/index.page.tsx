import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Admin = () => {
  const [id, setId] = useState(0);
  const [title, setGameName] = useState('');
  const [genre, setCategory] = useState('');

  const fetchRecruitDetail = async () => {
    try {
      const response = await apiClient.createGame.post({
        body: {
          id,
          title,
          genre,
        },
      });
      console.log(response.body);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.loginTitle}>ゲーム一覧</div>

        <div className={styles.loginContainer}>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(Number(e.target.value))}
            placeholder="ID"
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setGameName(e.target.value)}
            placeholder="ゲーム名"
          />
          <input
            type="text"
            value={genre}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="カテゴリ"
          />
          <button onClick={fetchRecruitDetail}>送信</button>
        </div>
      </div>
    </>
  );
};

export default Admin;
