/* eslint-disable max-lines */
import type { UserSummaryDetailModel, msgModel } from 'commonTypesWithClient/models';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Dm = () => {
  const [user, setUser] = useState('');
  const [comment, setComment] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [bosyuuId, setBosyuuId] = useState('');
  const [message, setMessage] = useState<msgModel[]>([]);
  const [userDetail, setUserDetail] = useState<UserSummaryDetailModel>();
  const router = useRouter();
  const id = router.query.id;

  const fetchRecruitDetail = async () => {
    try {
      console.log(user);
      const response = await apiClient.userReview.post({
        body: {
          Id: user,
        },
      });
      console.log(response);

      setUserDetail(response.body);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };
  const calculateRateWidth = (rating: number): number => {
    console.log(rating * 30);
    return rating * 30;
  };

  useEffect(() => {
    if (user) {
      fetchRecruitDetail();
    }
  }, [user]); // idAsString に依存

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ユーザーがログインしている場合、ユーザー情報をセット
        console.log(firebaseUser);
        setUser(firebaseUser.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchRoom = async () => {
    try {
      const response = await apiClient.fetchRoom.post({
        body: {
          Id: id,
          userId: user,
        },
      });
      console.log(response.body.participantIdentity, 'wdasdawda');
      setMessage(response.body.commentsWithImages);
      setUserNumber(response.body.participantIdentity);
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRoom();
    }
  }, [user]);

  const sendMessage = () => {
    if (!websocket || websocket.readyState !== WebSocket.OPEN) {
      console.error('WebSocketが開いていません');
      return;
    }

    // 送信するメッセージのデータ構造
    const messageData = {
      type: 'message',
      imageurl: userDetail?.imageUrl,
      roomId: id,
      userId: user,
      content: comment,
    };
    console.log(messageData);

    // メッセージをJSON形式でサーバーに送信
    websocket.send(JSON.stringify(messageData));
    fetchRoom();
  };

  const [websocket, setWebsocket] = useState(null);
  useEffect(() => {
    if (typeof user === 'string' && user.trim() !== '') {
      const newSocket = new WebSocket(`ws://localhost:8000?userId=${user}`);
      console.log(newSocket);
      // 接続が開かれたときのイベントハンドラ
      newSocket.onopen = function () {
        console.log('サーバーに接続しました');
        newSocket.send('こんにちは、サーバー！');
      };

      newSocket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        console.log(`[message] データを受信しました: `, data);

        if (data.type === 'url') {
          setApprovalUrl(data.url); // 受信したURLを状態にセット
        } else if (data.type === 'new-message') {
          console.log('新しいメッセージを受信しました:', data);
          
          setMessage((prevMessages) => [...prevMessages, data]);
        } else {
          // 他のメッセージタイプの処理...
          fetchRoom();
        }
      };

      setWebsocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  console.log(message);

  const createApprovalUrl = (roomId) => {
    return `https://yourapp.com/approve?roomId=${roomId}`;
  };

  const sendApply = async () => {
    if (!websocket || websocket.readyState !== WebSocket.OPEN) {
      console.error('WebSocketが開いていません');
      return;
    }

    // 承諾用のURLを作成
    const approvalUrl = createApprovalUrl(id);

    // WebSocketを通じてURLを送信するメッセージを作成
    const messageData = {
      type: 'apply', // メッセージの種類を指定
      roomId: id,
      userId: user,
      userNumber,
      url: approvalUrl, // 送信するURL
    };

    // メッセージをJSON形式でサーバーに送信
    websocket.send(JSON.stringify(messageData));

    console.log('承諾用URLを送信しました:', approvalUrl);
  };

  const handleUrlClick = async (approvalUrl) => {
    // 確認ダイアログを表示
    const confirmResult = window.confirm('本当に承諾しますか？');
  
    // ユーザーが「OK」をクリックした場合のみ処理を続行
    if (confirmResult) {
      console.log(approvalUrl);
      console.log(id);
      console.log(user);
      try {
        const response = await apiClient.recruitApprove.post({
          body: {
            Id: approvalUrl,
            bosyuuId,
            roomId: id,
            userId: user,
          },
        });
        // 必要に応じて成功時の処理をここに追加
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };
  

  const [approvalUrl, setApprovalUrl] = useState('');

  return (
    <>
      <div className={styles.container} />
      <div className={styles.parent}>
        <div className={styles.messageBox}>
          <div className={styles.messageBox2}>
            <div className={styles.messageBox1}>チャット欄</div>
            <div className={styles.line} />
          </div>
          <div className={styles.messageBox3}>
            {Array.isArray(message) &&
              message.map((msg, index) => (
                <div
                  key={index}
                  className={msg.userIdentity === 1 ? styles.messageLeft : styles.messageRight}
                >
                  <div className={styles.messageContainer}>
                    <img src={msg.userImageUrl} alt="User" className={styles.userImage2} />
                    <div className={styles.msgContent}>{msg.content}</div>{' '}
                    {/* contentプロパティをレンダリング */}
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.line2} />
          <div>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.messageInput}
            />
            <button onClick={sendMessage} className={styles.sendButton}>
              Send
            </button>
            {userNumber === 1 && (
              <button onClick={sendApply} className={styles.applayButton}>
                申し込む
              </button>
            )}
{approvalUrl && userNumber === 2 && (
  <div onClick={() => handleUrlClick(approvalUrl)} className={styles.applayButton2}>
    {'受諾ボタン'}
  </div>
)}
          </div>
        </div>
        <div className={styles.profileContainer}>
          <img src={userDetail?.imageUrl} alt={userDetail?.name} className={styles.userImage} />
          <div className={styles.nameContainer}>
            <div className={styles.name}>{userDetail?.name}</div>
          </div>
          <div className={styles.ratingContainer}>
            <span className={styles.rate}>
              ★★★★★
              <span
                className={styles.rateInner}
                style={{ width: `${calculateRateWidth(userDetail?.rating)}px` }}
              >
                ★★★★★
              </span>
            </span>
          </div>
          <div className={styles.rating}>{userDetail?.rating}</div>
          <div className={styles.achievementsContainer}>
            <div className={styles.achievementsTitle}>【実績】</div>
            <div className={styles.achievements}>{userDetail?.Achievements}</div>
          </div>
          <div className={styles.descriptionDetailContainer}>
            <div className={styles.descriptionTitle}>【自己紹介】</div>
            <div className={styles.descriptions}>{userDetail?.hitokoto}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dm;
