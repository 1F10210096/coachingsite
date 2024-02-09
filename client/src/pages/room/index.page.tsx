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
  const handleCommentClick = (roomId: string) => {
    router.push(`../dm?id=${roomId}`); // 適切なURLにリダイレクト
  };

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.title}>DM一覧</div>
        <div className={styles.roomList}>
          {rooms.map(
            (room) =>
              room.latestComment && ( // この行を追加して、latestCommentがnullでないことを確認
                <div
                  key={room.latestComment.id} // latestCommentがnullでない場合のみ、このコードが実行されます
                  className={styles.commentContainer}
                  onClick={() =>
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    room.latestComment?.id && handleCommentClick(room.latestComment.roomId)
                  }
                  // ここでも同様
                >
                  {room.commentUser && (
                    <>
                      <img
                        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                        src={room.commentUser.imageUrl || ''}
                        alt="User"
                        className={styles.userImage}
                      />
                      <div className={styles.userContainer}>
                        <div className={styles.userName}>{room.commentUser.name}</div>
                        <div className={styles.comment}>{room.latestComment.content}</div>
                      </div>
                      {/* コメントの内容を表示 */}
                    </>
                  )}
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
