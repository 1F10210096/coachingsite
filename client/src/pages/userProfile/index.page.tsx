import { getAuth, onAuthStateChanged } from 'firebase/auth';
import router from 'next/router';
import type { ChangeEvent, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { logout } from 'src/utils/login';
import { uploadProfileImage } from 'src/utils/uploadProfile';
import styles from './index.module.css';
// eslint-disable-next-line complexity
const UserProfile = () => {
  const [modalContent, setModalContent] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [newName, setNewName] = useState('');
  const [newProfile, setNewProfile] = useState('');
  const showModal = (content: SetStateAction<string>) => {
    setModalContent(content);
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

  const logOut = async (event: React.FormEvent<HTMLFormElement>) => {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(file);
    }
  };

  // フォーム送信時の処理
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(imagePreview, 'imagePreview');
    const imageUrl = await uploadProfileImage(imagePreview);
    const userId = getAuth().currentUser.uid;
    console.log(userId, newName, newProfile, imageUrl);
    try {
      await apiClient.updateProfile.post({ body: { userId, newName, newProfile, imageUrl } });

      // 応答に基づいて何らかのアクションを実行
      // 例: ユーザーに通知する、状態を更新する、等
    } catch (error) {
      // エラーハンドリング
      console.error('プロフィール更新エラー:', error);
    }
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
                    {imagePreview && <img src={imagePreview} alt="プレビュー" />}
                    <button type="submit">プロフィール更新</button>
                  </form>
                </>
              )}
              {modalContent === 'applicationHistory' && <div>コーチング応募履歴</div>}
              {modalContent === 'recruitmentHistory' && <div>コーチング募集履歴</div>}
              {modalContent === 'logout' && <div>ログアウト処理</div>}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
