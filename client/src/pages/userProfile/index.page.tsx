/* eslint-disable max-lines */
import type { NewApp, UserListItem } from 'commonTypesWithClient/models';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import type { ChangeEvent, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { logout } from 'src/utils/login';
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
  const [newProfile, setNewProfile] = useState('');
  const showModal = (content: SetStateAction<string>) => {
    setModalContent(content);
  };
  const [Id, setUserUUID] = useState('');
  useEffect(() => {
    const auth = getAuth();
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
      router.push('http://localhost:3000/');
    } catch (error) {
      console.error('ログイン失敗:', error);
    }
  };

  const [profileRank, setProfileRank] = useState({
    gameName: '',
    rank: '',
  });

  const handleNewName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleNewProfile = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewProfile(e.target.value);
  };

  const [lookImage, setLookImage] = useState('');

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setLookImage(fileUrl); // ローカルでのプレビュー用

      // ファイルをBase64にエンコード
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = e.target?.result;
        setSelectedFile(base64String as string); // Base64エンコードされた文字列を状態に設定
      };
      reader.readAsDataURL(file);
    }
  };
  // フォーム送信時の処理
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = getAuth().currentUser;

    if (user) {
      const userId = user.uid;
      console.log(selectedFile);

      try {
        console.log(imageUrl);
        await apiClient.updateProfile.post({
          body: { selectedFile },
        });
      } catch (error) {
        console.error('プロフィール更新エラー:', error);
      }
    } else {
      console.error('ユーザーがログインしていません。');
    }
  };

  const [recruitList, setMyRecruitlist] = useState<UserListItem[]>([]);
  const [user2, setUser2] = useState<NewApp[]>([]);
  type UserType = {
    id: number;
    name: string;
    // その他のプロパティ...
  };
  const fetchMyRecruitList = async () => {
    try {
      console.log(Id);
      const response = await apiClient.fetchMyRecruitList.post({ body: { Id } });
      console.log(response.body);
      setMyRecruitlist(response.body.user);
      setUser2(response.body.user2);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    fetchMyRecruitList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Id]);

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

  const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ここで評価と感想を処理
    console.log('Submitted:', { selectedId, rating, review });
    const response = await apiClient.reviewList.post({
      body: {
        selectedId: selectedId !== null ? selectedId.toString() : '',
        rating,
        review,
      },
    });
  };

  return (
    <>
      <div className={styles.container} />
      <div className={styles.searchContainer}>
        <div className={styles.searchNameContainer}>設定画面</div>
        <div className={styles.searchNameContainer2}>
          <div className={`${styles.rankDropdown}`} onClick={() => showModal('profile')}>
            プロフィール
            <span className={styles.dropdownIcon} />
          </div>
        </div>
        <div className={styles.searchNameContainer2}>
          <div className={`${styles.rankDropdown}`} onClick={() => showModal('applicationHistory')}>
            コーチング応募履歴
            <span className={styles.dropdownIcon} />
          </div>
        </div>
        <div className={styles.searchNameContainer2}>
          <div className={`${styles.rankDropdown}`} onClick={() => showModal('recruitmentHistory')}>
            コーチング募集履歴
            <span className={styles.dropdownIcon} />
          </div>
        </div>
        <div className={styles.searchNameContainer2}>
          <div className={`${styles.rankDropdown}`} onClick={() => showModal('logout')}>
            ログアウト
            <span className={styles.dropdownIcon} />
            <button onClick={logOut}>logout</button>
          </div>
        </div>

        {modalContent && (
          <div className={styles.helpwanted}>
            <div className={styles.modal}>
              {/* ここでモーダルの内容を条件付きでレンダリング */}
              {modalContent === 'profile' && (
                <>
                  <div>プロフィール設定</div>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="name"
                      value={newName}
                      onChange={handleNewName}
                      placeholder="名前"
                    />
                    <input
                      type="text"
                      name="game"
                      value={profileRank.gameName}
                      // onChange={handleInputChange}
                      placeholder="ゲーム名"
                    />
                    <input
                      type="text"
                      name="rank"
                      value={profileRank.rank}
                      // onChange={handleInputChange}
                      placeholder="ランク"
                    />
                    <textarea
                      name="bio"
                      value={newProfile}
                      onChange={handleNewProfile}
                      placeholder="自己紹介"
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
                    <button type="submit">プロフィール更新</button>
                  </form>
                </>
              )}
              {modalContent === 'applicationHistory' && (
                <>
                  <div>コーチング応募履歴</div>
                  <ul>
                    {user2.map((application, index) => (
                      <div key={index}>
                        <div>
                          応募ID: {application.id}
                          <button onClick={() => handleButtonClick(application.id)}>
                            評価する
                          </button>
                        </div>
                        {selectedId === Number(application.id) && (
                          <form onSubmit={handleSubmit2}>
                            <div>
                              <label>
                                評価：
                                <input
                                  type="number"
                                  value={rating}
                                  onChange={(e) => setRating(e.target.value)}
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                感想：
                                <textarea
                                  value={review}
                                  onChange={(e) => setReview(e.target.value)}
                                />
                              </label>
                            </div>
                            <button type="submit">送信</button>
                          </form>
                        )}
                      </div>
                    ))}
                  </ul>
                </>
              )}
              {modalContent === 'recruitmentHistory' && (
                <div>
                  <button onClick={fetchMyRecruitList}>コーチング応募履歴</button>
                  {recruitList.length > 0 ? (
                    <ul>
                      {recruitList.map((recruit, index) => (
                        <li key={index} onClick={() => fetchMyRoomList(recruit.id)}>
                          <h3>{recruit.title}</h3>
                          <p>{recruit.description}</p>
                          {/* 他の必要な情報をここに追加 */}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>募集履歴はありません。</p>
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
              {modalContent === 'logout' && <div>ログアウト処理</div>}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
