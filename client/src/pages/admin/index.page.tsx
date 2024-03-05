/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable max-lines */
import type { gameListModel, newBosyuu, UserModel2 } from 'commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

//adminページ
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
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  const [games, setGames] = useState<gameListModel[]>([]);
  const [users, setUsers] = useState<UserModel2[]>([]);
  useEffect(() => {
    fetchGames();
    fetchUsers();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await apiClient.getGames.post();
      console.log(response.body); // APIクライアントのメソッドを適切なものに置き換えてください
      setGames(response.body);
    } catch (error) {
      console.error('ゲームリストの取得に失敗しました:', error);
    }
  };

  const [editGameId, setEditGameId] = useState<number | null>(0);
  const [editTitle, setEditTitle] = useState('');
  const [editGenre, setEditGenre] = useState('');

  const startEdit = (game: gameListModel) => {
    setEditGameId(game.id);
    setEditTitle(game.title);
    setEditGenre(game.genre);
  };

  const handleEditChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(editGameId, editTitle, editGenre);
    if (editGameId === null) {
      console.error('editGameId is null');
      return; // editGameIdがnullなら、ここで処理を中断
    }
    try {
      const response = await apiClient.updateGame.post({
        body: {
          id: editGameId,
          title: editTitle,
          genre: editGenre,
        },
      });
      console.log(response);
      setEditGameId(null); // 編集モードを終了
      fetchGames(); // ゲームリストを再読み込み
    } catch (error) {
      console.error('Failed to update game:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await apiClient.getUsers.post();
      console.log(response.body); // APIクライアントのメソッドを適切なものに置き換えてください
      setUsers(response.body);
    } catch (error) {
      console.error('ゲームリストの取得に失敗しました:', error);
    }
  };

  const [users1, setUsers1] = useState([]);
  const [editingUserId, setEditingUserId] = useState<string | null>('');
  const [userName, setUserName] = useState('');
  const [myProfile, setMyProfile] = useState('');
  const [rating, setRating] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const handleEditClick = (user: UserModel2) => {
    setEditingUserId(user.userId);
    setUserName(user.name);
    setMyProfile(user.myProfile || ''); // nullの場合は空文字列に変換
    setRating(user.rating || 3); // nullの場合は空文字列に変換
    setImageUrl(user.imageUrl || '');
  };

  const handleSaveClick = async (userId: string) => {
    try {
      console.log('編集しよう');
      console.log(userId, userName, myProfile, rating, imageUrl);
      // API呼び出しでユーザー情報を更新
      const response = await apiClient.updateUser.post({
        body: {
          userId,
          name: userName,
          myProfile,
          rating,
          imageUrl,
        },
      });
      console.log('Update success:', response);

      // 編集モードを終了し、ユーザーリストを再取得
      setEditingUserId(null);
      fetchUsers(); // ユーザーリストを再取得する関数を呼び出し
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const [recruitList, setRecruitlist] = useState<newBosyuu[]>([]);

  const fetchRecruit = async () => {
    try {
      const response = await apiClient.fetchRecruitListAll.post();
      setRecruitlist(response.body);
      console.log(response.body);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };
  useEffect(() => {
    fetchRecruit();
  }, []);

  const handleDeleteClick = async (id: string) => {
    try {
      console.log(id);
      const response = await apiClient.deleteBosyuu.post({
        body: {
          Id: id,
        },
      });
      fetchRecruit(); // ゲームリストを再読み込み
    } catch (error) {
      console.error('Failed to update game:', error);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.loginContainer1}>
          <div className={styles.loginTitle}>ゲーム一覧</div>
          <div className={styles.gameContainer}>
            {games.map((game) => (
              <div key={game.id}>
                {editGameId === game.id ? (
                  <form onSubmit={handleEditChange}>
                    <div className={styles.gameList}>
                      <div className={styles.title}>
                        <div className={styles.gameTitle}>Title: </div>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className={styles.gameTitle2}
                        />
                      </div>
                      <p className={styles.genre}>
                        <div className={styles.gameTitle}>Genre:</div>
                        <input
                          type="text"
                          value={editGenre}
                          onChange={(e) => setEditGenre(e.target.value)}
                          className={styles.gameTitle2}
                        />
                      </p>
                      <button type="submit">保存</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className={styles.gameList}>
                      <p className={styles.title}>
                        <div className={styles.gameTitle}>Title: </div>
                        <div className={styles.gameTitle2}>{game.title}</div>
                      </p>
                      <p className={styles.genre}>
                        <div className={styles.gameTitle}>Genre:</div>
                        <div className={styles.gameTitle2}>{game.genre}</div>
                      </p>
                      <button onClick={() => startEdit(game)}>編集</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>{' '}
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
          </div>{' '}
        </div>
        <div className={styles.userContainer}>
          <div className={styles.loginTitle}>ユーザー一覧</div>
          <div className={styles.gameContainer}>
            {users.map((user) => (
              <div key={user.userId} className={styles.gameList2}>
                {editingUserId === user.userId ? (
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                      type="text"
                      name="myProfile"
                      value={myProfile}
                      onChange={(e) => setMyProfile(e.target.value)}
                    />
                    <input
                      type="text"
                      name="rating"
                      value={rating.toString()} // 数値を文字列に変換してvalueに設定
                      onChange={(e) => {
                        const newRating = parseFloat(e.target.value); // 文字列を数値に変換
                        if (!isNaN(newRating)) {
                          // 変換結果がNaNでない場合のみ状態を更新
                          setRating(newRating);
                        }
                      }}
                    />
                    <input
                      type="text"
                      name="imageUrl"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <button onClick={() => handleSaveClick(user.userId)}>保存</button>
                  </div>
                ) : (
                  <div>
                    <p className={styles.title2}>
                      <span className={styles.gameTitle}>Name: </span>
                      <span className={styles.gameTitle2}>{user.name}</span>
                    </p>
                    <p className={styles.title2}>
                      <span className={styles.gameTitle}>Profile: </span>
                      <span className={styles.gameTitle2}>{user.myProfile}</span>
                    </p>
                    <p className={styles.title2}>
                      <span className={styles.gameTitle}>Rating: </span>
                      <span className={styles.gameTitle2}>{user.rating}</span>
                    </p>
                    <p className={styles.title2}>
                      <span className={styles.gameTitle}>Image: </span>
                      <span className={styles.gameTitle2}>{user.imageUrl}</span>
                    </p>
                    <button onClick={() => handleEditClick(user)}>編集</button>
                  </div>
                )}
                <div className={styles.gameTitle3} />
                {/* 必要に応じてgame, student, teacher, Commentの情報を追加 */}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.userContainer}>
          <div className={styles.loginTitle}>募集一覧</div>
          <div className={styles.gameContainer}>
            {recruitList.map((user) => (
              <div key={user.id} className={styles.gameList2}>
                <div>
                  <p className={styles.title2}>
                    <span className={styles.gameTitle}>Name: </span>
                    <span className={styles.gameTitle2}>{user.id}</span>
                  </p>
                  <p className={styles.title2}>
                    <span className={styles.gameTitle}>Profile: </span>
                    <span className={styles.gameTitle2}>{user.myProfile}</span>
                  </p>
                  <p className={styles.title2}>
                    <span className={styles.gameTitle}>Rating: </span>
                    <span className={styles.gameTitle2}>{user.rating}</span>
                  </p>
                  <p className={styles.title2}>
                    <span className={styles.gameTitle}>Image: </span>
                    <span className={styles.gameTitle2}>{user.imageUrl}</span>
                  </p>
                  <button onClick={() => handleDeleteClick(user.id)}>削除</button>
                </div>
                <div className={styles.gameTitle3} />
                {/* 必要に応じてgame, student, teacher, Commentの情報を追加 */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
