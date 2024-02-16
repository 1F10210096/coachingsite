/* eslint-disable max-depth */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable max-lines */
import assert from 'assert';
import type {
  Application,
  BosyuuListFrontModel,
  CommentsWithImages,
  RoomWithLatestComment,
  UserSummaryDetailModel,
} from 'commonTypesWithClient/models';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { use, useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';
import { c } from 'vitest/dist/reporters-5f784f42';

const Dm = () => {
  const [user, setUser] = useState('');
  const [comment, setComment] = useState('');
  const [userNumber, setUserNumber] = useState<number | null>(0);
  const [bosyuuId, setBosyuuId] = useState('');
  const [message, setMessage] = useState<CommentsWithImages[]>([]);
  const [RecruitDetail, setRecruitDetail] = useState<BosyuuListFrontModel | null>(null);
  const [userDetail, setUserDetail] = useState<UserSummaryDetailModel | undefined>(undefined);

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
      setUserDetail(response.body as UserSummaryDetailModel | undefined);

      if (typeof id === 'string') {
        const detailResponse = await apiClient.fetachRoomRecruitDetail.post({
          body: {
            Id: id,
          },
        });
        console.log(detailResponse);
        setRecruitDetail(detailResponse.body);
        // 応答の処理
      } else {
        // `id`が`string`型でない場合の処理
      }
      // if (response.body) {
      //   setUserDetail(response.body);
      // } else {
      //   // 適切な処理、例えばエラーを表示するなど
      // }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // idAsString に依存

  useEffect(() => {
    const auth = createAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ユーザーがログインしている場合、ユーザー情報をセット
        console.log(firebaseUser);
        setUser(firebaseUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchRoom = async () => {
    try {
      if (typeof id === 'string') {
        console.log(id);
        const response = await apiClient.fetchRoom.post({
          body: {
            Id: id,
            userId: user,
          },
        });
        console.log(response);
        setMessage(response.body);
        console.log('dadaddfffffffff');
        const response2 = await apiClient.fetchUserInfo.post({
          body: {
            Id: id,
            userId: user,
          },
        });
        console.log(response2.body);
        setUserNumber(response2.body);
      }
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    const fetchRoom = async () => {
      try {
        if (typeof id === 'string') {
          console.log(id);
          const response = await apiClient.fetchRoom.post({
            body: {
              Id: id,
              userId: user,
            },
          });
          console.log(response);
          setMessage(response.body);
          console.log('dadaddfffffffff');
          const response2 = await apiClient.fetchUserInfo.post({
            body: {
              Id: id,
              userId: user,
            },
          });
          console.log(response2.body);
          setUserNumber(response2.body);
        }
      } catch (error) {
        console.error('ゲームの取得に失敗しました:', error);
      }
    };

    if (user) {
      fetchRoom(); // コンポーネントがマウントされたときに初回で実行
      intervalId = setInterval(fetchRoom, 10000); // その後、5秒ごとに実行
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId); // コンポーネントがアンマウントされるときにインターバルをクリア
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // 依存配列に `user` を設定

  const sendMessage = async () => {
    const response = await apiClient.sendMessage.post({
      body: {
        Id: id as string,
        userId: user,
        message: comment,
      },
    });

    fetchRoom();
  };

  const [a, setA] = useState('');
  console.log(message);

  const sendApply = async () => {
    console.log(bosyuuId);
    const response = await apiClient.sendApprove.post({
      body: {
        bosyuuId: RecruitDetail?.id ?? 'defaultId',
        roomId: id as string,
        userId: user,
        date,
        time,
      },
    });

    console.log('承諾用URLを送信しました:', approvalUrl);

    // approvalUrlを使用する処理

    // WebSocketを通じてURLを送信するメッセージを作成
  };

  const handleUrlClick = async () => {
    // 確認ダイアログを表示
    const confirmResult = window.confirm('本当に承諾しますか？');

    // ユーザーが「OK」をクリックした場合のみ処理を続行
    if (confirmResult) {
      console.log(approvalUrl);
      console.log(id);
      console.log(user);
      setIsModalApproveOpen(false);

      try {
        if (
          typeof id === 'string' &&
          typeof approvalUrl === 'string' &&
          typeof bosyuuId === 'string' &&
          typeof user === 'string'
        ) {
          const response = await apiClient.recruitApprove.post({
            body: {
              Id: approvalUrl,
              bosyuuId,
              roomId: id,
              userId: user,
            },
          });
        }
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
    setIsModalFinalOpen(false);
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

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  // モーダルを閉じるコールバック関数
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function Modal({ isOpen }: { isOpen: boolean }) {
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
  const [waitApprove, setWaitApprove] = useState<Application>();
  const fetchApplay = async () => {
    try {
      console.log(id);
      const response = await apiClient.fetchApplay.post({
        body: {
          id: id as string,
        },
      });
      // set(response.body);
      console.log(response.body);
      setWaitApprove(response.body);
      setTime(response.body.time);
      setDate(response.body.date);
    } catch (error) {
      assert(error);
    }
  };
  useEffect(() => {
    fetchApplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function FinalModal({ isOpen }: { isOpen: boolean }) {
    if (!isOpen) return null;

    const getGameName = (gameId: number) => {
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
            <p className={styles.title}>
              {RecruitDetail !== null &&
                RecruitDetail?.gameId !== null &&
                getGameName(RecruitDetail.gameId)}
            </p>
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

  function ApproveModal({ isOpen }: { isOpen: boolean }) {
    if (!isOpen) return null;

    const getGameName = (gameId: number) => {
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
            <p className={styles.title}>
              {RecruitDetail !== null &&
                RecruitDetail?.gameId !== null &&
                getGameName(RecruitDetail.gameId)}
            </p>
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

  const [selectedTitle, setSelectedTitle] = useState('dmTitle3');

  // タイトルを選択する関数
  const selectTitle = (title) => {
    setSelectedTitle(title);
    fetchRoom2(title);
  };

  const [rooms, setRooms] = useState<RoomWithLatestComment[]>([]);

  const [roomId, setRoomId] = useState();
  const fetchRoom2 = async (title) => {
    try {
      console.log(selectedTitle);
      let response;
      if (title === 'dmTitle3') {
        // 'dmTitle3'が選択された場合のAPIエンドポイントを呼び出す
        response = await apiClient.fetchDm.post({
          body: {
            userId: user,
          },
        });
        setRooms(response.body);
        console.log(response.body);
      } else if (title === 'dmTitle4') {
        // 'dmTitle4'が選択された場合のAPIエンドポイントを呼び出す
        response = await apiClient.fetchDm2.post({
          // fetchDm2post が正しい関数名か確認してください
          body: {
            userId: user,
          },
        });
        setRooms(response.body);
        console.log(response.body);
      }
      // API呼び出しの結果を状態にセット
    } catch (error) {
      console.error(error); // エラーをログに記録
    }
  };
  useEffect(() => {
    fetchRoom2(selectedTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTitle, user]);

  useEffect(() => {
    setRoomId(id);
  } , [id]);
  const handleCommentClick = (roomId: string) => {
    setRoomId(roomId);
    console.log(roomId);
    router.push(`../dmRecieave?id=${roomId}`); // 適切なURLにリダイレクト
  };

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.parent}>
        <div className={styles.containerBox2} />
        <div className={styles.containerBox}>
          <div className={styles.dmTitleContainer}>
            <div className={styles.dmTitle}>生徒用メッセージ一覧</div>
            <div className={styles.dmTitle2}>
              <div
                className={`${styles.dmTitle3} ${
                  selectedTitle === 'dmTitle3' ? styles.selected : ''
                }`}
                onClick={() => selectTitle('dmTitle3')}
              >
                未応募
              </div>
              <div
                className={`${styles.dmTitle4} ${
                  selectedTitle === 'dmTitle4' ? styles.selected : ''
                }`}
                onClick={() => selectTitle('dmTitle4')}
              >
                応募済み
              </div>
            </div>
          </div>
          <div className={styles.roomList}>
            {rooms.map(
              (room) =>
                room.latestComment && ( // この行を追加して、latestCommentがnullでないことを確認
                  <div
                    key={room.latestComment.id}
                    className={`${styles.commentContainer} ${
                      roomId === room.latestComment.roomId ? styles.selectedRoom : ''
                    }`}
                    onClick={() => handleCommentClick(room.latestComment.roomId)}
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
        <div className={styles.chatContainer}>
          <div className={styles.title2}>チャット欄</div>
        </div>
        <div className={styles.messageBox}>
          <div className={styles.messageBox3}>
            {Array.isArray(message) &&
              message.map((msg, index) => (
                <div
                  key={index}
                  className={msg.userIdentity === 1 ? styles.messageLeft : styles.messageRight}
                >
                  <div className={styles.messageContainer}>
                    {msg.userIdentity === 1 ? (
                      <>
                        {msg.userImageUrl && (
                          <img src={msg.userImageUrl} alt="User" className={styles.userImage2} />
                        )}
                        <div className={styles.msgContent}>{msg.content}</div>
                      </>
                    ) : (
                      <>
                        <div className={styles.msgContent}>{msg.content}</div>
                        {msg.userImageUrl && (
                          <img src={msg.userImageUrl} alt="User" className={styles.userImage2} />
                        )}
                      </>
                    )}
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
            {isModalOpen && <Modal isOpen={isModalOpen} />}
            {isModalFinalOpen && <FinalModal isOpen={isModalFinalOpen} />}
            {waitApprove && userNumber === 2 && (
              <div onClick={handleButtonApproveClick} className={styles.applayButton2}>
                {'受諾ボタン'}
              </div>
            )}
            {isModalApproveOpen && <ApproveModal isOpen={isModalApproveOpen} />}
          </div>
        </div>
        {/* <div className={styles.profileContainer}>
          <img src={userDetail?.imageUrl} alt={userDetail?.name} className={styles.userImage} />
          <div className={styles.nameContainer}>
            <div className={styles.name}>{userDetail?.name}</div>
          </div>
          <div className={styles.ratingContainer}>
            <span className={styles.rate}>
              ★★★★★
              {userDetail?.rating && (
                <span
                  className={styles.rateInner}
                  style={{ width: `${calculateRateWidth(userDetail.rating)}px` }}
                >
                  ★★★★★
                </span>
              )}
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
        </div> */}
      </div>
    </>
  );
};

export default Dm;
