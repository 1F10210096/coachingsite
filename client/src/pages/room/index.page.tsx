import assert from 'assert';
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
  const [rooms, setRooms] = useState([]);

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
  }, [userUUID]);

  const router = useRouter(); // useRouter フックを使用して router オブジェクトを取得
  // ...（既存の状態とuseEffect）

  // コメントがクリックされた時の処理
  const handleCommentClick = (roomId) => {
    router.push(`../dm?id=${roomId}`); // 適切なURLにリダイレクト
  };

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.title}>DM一覧</div>
        <div className={styles.roomList}>
          {rooms.map((room) => (
            <div
              key={room.id}
              className={styles.commentContainer}
              onClick={() => handleCommentClick(room.id)}
            >
              {room.commentUser &&
                room.latestComment && ( // commentUserとlatestCommentが存在する場合のみ表示
                  <>
                    <img src={room.commentUser.imageUrl} alt="User" className={styles.userImage} />
                    <div className={styles.userContainer}>
                    <div className={styles.userName}>{room.commentUser.name}</div>
                    <div className={styles.comment}>{room.latestComment.content}</div>{' '}
                    </div>
                    {/* コメントの内容を表示 */}
                  </>
                )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
