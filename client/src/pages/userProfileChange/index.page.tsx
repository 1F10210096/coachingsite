/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';
const Form = () => {
  const [Id, setUserUUID] = useState('');
  useEffect(() => {
    const auth = createAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ユーザーがログインしている場合の処理
        console.log('Logged in as:', user.email);
        setUserUUID(user.uid);
      } else {
        // ユーザーがログインしていない場合の処理
        console.log('No user logged in');
      }
    });

    // コンポーネントのアンマウント時にリスナーを解除
    return () => unsubscribe();
  }, []);

  const [lookImage, setLookImage] = useState<string | null>('');
  const [newName, setNewName] = useState('');
  const [newProfile, setNewProfile] = useState<string>('');
  const [rating, setRating] = useState<number | null>(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fetchMyRecruitList = async () => {
    try {
      console.log(Id);
      const response1 = await apiClient.fetchAllMyProfile.post({ body: { Id } });
      console.log(response1.body);
      setNewName(response1.body.name);
      setNewProfile(response1.body.myProfile);
      setLookImage(response1.body.imageUrl);
      setRating(response1.body.rating);
      setSelectedFile(response1.body.imageUrl);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    fetchMyRecruitList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Id]);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Id) {
      const userId = Id;
      console.log(selectedFile);

      try {
        console.log(imageUrl);
        await apiClient.updateProfile.post({
          body: { userId, newName, myProfile: newProfile, selectedFile },
        });
        alert('プロフィール更新成功');
      } catch (error) {
        console.error('プロフィール更新エラー:', error);
      }
    } else {
      console.error('ユーザーがログインしていません。');
    }
  };

  const handleNewName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 8) {
      setNewName(e.target.value);
    }
  };

  const handleNewProfile = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewProfile(e.target.value);
    console.log(newProfile);
  };

  return (
    <>
      <div className={styles.box1}>
        <BasicHeader user={Id} />
        <div className={styles.box}>
          <div className={styles.boxCon}>
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>ユーザー設定</div>
              <div className={styles.boxCon2}>
                <Link href="/userProfileAll">
                  <div className={styles.boxCon3}>プロフィール</div>
                </Link>
                <Link href="/like">
                  <div className={styles.boxCon3}>いいね一覧</div>
                </Link>
                <div className={styles.boxCon3}>コーチ募集一覧</div>
                <div className={styles.boxCon3}>応募一覧</div>
              </div>
            </div>
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>設定</div>
              <div className={styles.boxCon2}>
                <div className={styles.boxCon3}>個人情報設定</div>
              </div>
            </div>
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>ヘルプ</div>
              <div className={styles.boxCon2}>
                <div className={styles.boxCon3}>お問い合わせ</div>
              </div>
            </div>
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>規約・ポリシー</div>

              <div className={styles.boxCon2}>
                <Link href="/terms">
                  <div className={styles.boxCon3}>利用規約等</div>
                </Link>
                <Link href="/privacy">
                  <div className={styles.boxCon3}>プライバシーポリシー</div>
                </Link>
              </div>
            </div>{' '}
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>ログアウト</div>
              <div className={styles.boxCon2}>
                <div className={styles.boxCon3}>ログアウト</div>
              </div>{' '}
            </div>
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>ログアウト</div>
              <div className={styles.boxCon2}>
                <div className={styles.boxCon3}>ログアウト</div>
              </div>{' '}
            </div>
          </div>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formTitle}>プロフィール設定</div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="file"
              name="profileImage"
              className={styles.syasin}
              onChange={handleImageChange}
              accept="image/*"
            />
            {lookImage && <img src={lookImage} alt="プレビュー" className={styles.profileImage} />}
            <div className={styles.formContainer2}>
              <label htmlFor="message" className={styles.form2}>
                ユーザー名:
              </label>
              <input
                type="text"
                value={newName}
                onChange={handleNewName}
                className={styles.searchpass2}
              />
              <label htmlFor="message" className={styles.form5}>
                自己紹介:
              </label>
              <textarea
                id="message"
                value={newProfile || ''}
                onChange={handleNewProfile}
                className={styles.form3}
              />
            </div>
            <button type="submit" className={styles.form4}>
              送信
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
