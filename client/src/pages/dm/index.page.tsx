/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
  const [RecruitDetail, setRecruitDetail] = useState<BosyuuListFrontModel | null>(null);
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

      const detailResponse = await apiClient.fetachRoomRecruitDetail.post({
        body: {
          Id: id,
        },
      });
      console.log(detailResponse);
      setRecruitDetail(detailResponse.body);
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
      userImageUrl: userDetail?.imageUrl,
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
  const [a, setA] = useState("");
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
          setTime(data.time);
          setDate(data.date);
          setIsModalApproveOpen(false)
          console.log('承諾用URLを受信しました:', data.url);
          console.log(data.gameId)
          setA(data.gameId);
          console.log(RecruitDetail)
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
      gameTitle: RecruitDetail?.title,
      gameId: RecruitDetail?.gameId,
      date,
      time,
    };

    // メッセージをJSON形式でサーバーに送信
    websocket.send(JSON.stringify(messageData));

    console.log('承諾用URLを送信しました:', approvalUrl);
    window.confirm('承諾用URLを送信しました');
  };

  const handleUrlClick = async (approvalUrl) => {
    // 確認ダイアログを表示
    setIsModalApproveOpen(false);
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFinalOpen, setIsModalFinalOpen] = useState(false);
  const [isModalApproveOpen, setIsModalApproveOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  
  const handleButtonApproveClick = () => {
    setIsModalApproveOpen(true);
  };

  const onCloseRecruit = () => {
    setIsModalOpen(false);
  };

  const onFinalClose = () => {
    setIsModalOpen(false);
  };

  const onApplyRecruit = () => {
    setIsModalOpen(false);
    setIsModalFinalOpen(true);
  };

  const onApplyFinalRecruit = () => {
    setIsModalFinalOpen(false);
    sendApply();
  };

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  function Modal({ isOpen, onClose, onApply }) {
    
    if (!isOpen) return null;

    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalMsgContent}>
            <div className={styles.modalTitle}>お申込み確認</div>
            <div className={styles.modalMsg}>日付と時間を設定してください</div>
            <div className={styles.dateTimePicker}>
              <input
                type="date"
                className={styles.dateInput}
                value={date}
                onChange={handleDateChange}
              />
              <input
                type="time"
                className={styles.timeInput}
                value={time}
                onChange={handleTimeChange}
              />
            </div>
          </div>
          <button className={styles.closeButton} onClick={onCloseRecruit}>
            閉じる
          </button>
          <button className={styles.applyButton2} onClick={onApplyRecruit}>
            申し込む
          </button>
        </div>
      </div>
    );
  }

  function FinalModal({ isOpen, onClose, onApply }) {
    if (!isOpen) return null;

    const getGameName = (gameId) => {
      switch (gameId) {
        case 1:
          return 'VALORANT';
        case 2:
          return 'APEX';
        case 3:
          return 'LOL';
        default:
          return 'Unknown Game';
      }
    };

    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalMsgContent}>
            <div className={styles.modalTitle}>最終お申込み確認</div>
            <p className={styles.title}>{RecruitDetail?.title}</p>
            <p className={styles.title}>{getGameName(RecruitDetail?.gameId)}</p>
            <div className={styles.dateMsg}>日時：{date}</div>
            <div className={styles.timeMsg}>時間：{time}</div>
            <div>本当に申し込みますか？</div>
          </div>
          <button className={styles.closeButton} onClick={onFinalClose}>
            閉じる
          </button>
          <button className={styles.applyButton2} onClick={onApplyFinalRecruit}>
            申し込む
          </button>
        </div>
      </div>
    );
  }

  const [approvalUrl, setApprovalUrl] = useState('');

  function ApproveModal({ isOpen, onClose, onApply }) {
    if (!isOpen) return null;

    const getGameName = (gameId) => {
      switch (gameId) {
        case 1:
          return 'VALORANT';
        case 2:
          return 'APEX';
        case 3:
          return 'LOL';
        default:
          return 'Unknown Game';
      }
    };
    console.log(a);
    console.log(RecruitDetail?.gameId);
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalMsgContent}>
            <div className={styles.modalTitle}>最終受諾確認</div>
            <p className={styles.title}>{RecruitDetail?.title}</p>
            <p className={styles.title}>{getGameName(RecruitDetail?.gameId)}</p>
            <div className={styles.dateMsg}>日時：{date}</div>
            <div className={styles.timeMsg}>時間：{time}</div>
            <div>本当に了承しますか？</div>
          </div>
          <button className={styles.closeButton} onClick={onFinalClose}>
            閉じる
          </button>
          <button className={styles.applyButton2} onClick={handleUrlClick}>
            了承する
          </button>
        </div>
      </div>
    );
  }

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
              <button onClick={handleButtonClick} className={styles.applayButton}>
                申し込む
              </button>
            )}
            {isModalOpen && (
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onApply={sendApply}
              />
            )}
            {isModalFinalOpen && (
              <FinalModal
                isOpen={isModalFinalOpen}
                onClose={() => setIsModalFinalOpen(false)}
                onApply={sendApply}
              />
            )}
            {approvalUrl && userNumber === 2 && (
              <div onClick={handleButtonApproveClick} className={styles.applayButton2}>
                {'受諾ボタン'}
              </div>
            )}
            {isModalApproveOpen && (
              <ApproveModal
                isOpen={isModalApproveOpen}
                onClose={() => setIsModalApproveOpen(false)}
                
              />
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
