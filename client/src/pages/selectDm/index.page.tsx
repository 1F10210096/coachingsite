import assert from 'assert';
import type { RoomWithLatestComment } from 'commonTypesWithClient/models';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';
const Home = () => {
  const [userUUID, setUserUUID] = useState('');
  const [user, setUser] = useState();
  const [rooms, setRooms] = useState<RoomWithLatestComment[]>([]);

  useEffect(() => {
    const auth = createAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ユーザーがログインしている場合、ユーザー情報をセット
        console.log(firebaseUser);
        setUserUUID(firebaseUser.uid);
      } else {
        console.log('ユーザーがログインしていません');
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchRoom = async () => {
    try {
      const response = await apiClient.fetchRooms.post({
        body: {
          userId: userUUID,
        },
      });
      setRooms(response.body);
      console.log(response.body);
    } catch (error) {
      assert(error);
    }
  };
  useEffect(() => {
    fetchRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userUUID]);

  const router = useRouter(); // useRouter フックを使用して router オブジェクトを取得
  // ...（既存の状態とuseEffect）

  // コメントがクリックされた時の処理
  const handleCommentClick = () => {
    router.push(`../dmCoach`); // 適切なURLにリダイレクト
  };

  // コメントがクリックされた時の処理
  const handleCommentClick2 = () => {
    router.push(`../dmRecieave`); // 適切なURLにリダイレクト
  };

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.title}>DM一覧</div>
          <div className={styles.container1}>
            <button
              type="button"
              onClick={() => {
                handleCommentClick();
              }}
              className={styles.bottone1}
            >
              <div className={styles.font}>先生用メッセージ一覧</div>
            </button>
            <button
              type="button"
              onClick={() => {
                handleCommentClick2();
              }}
              className={styles.bottone2}
            >
              {' '}
              <div className={styles.font}>生徒用メッセージ一覧 </div>
            </button>
          </div>
        </div>{' '}
      </div>
    </>
  );
};

export default Home;
