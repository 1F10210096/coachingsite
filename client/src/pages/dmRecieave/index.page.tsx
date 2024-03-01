/* eslint-disable react-hooks/exhaustive-deps */
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
import type { SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';

const Dm = () => {
  const [user, setUser] = useState('');
  const [comment, setComment] = useState('');
  const [userNumber, setUserNumber] = useState<number | null>(0);
  const [bosyuuId, setBosyuuId] = useState('');
  const [message, setMessage] = useState<CommentsWithImages[]>([]);
  const [RecruitDetail, setRecruitDetail] = useState<BosyuuListFrontModel | null>(null);
  const [userDetail, setUserDetail] = useState<UserSummaryDetailModel | undefined>(undefined);

  const router = useRouter();
  const id = String(router.query.id);
  const title = String(router.query.title);
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

  useEffect(() => {
    // URLからtitleクエリパラメータを取得
    const title = String(router.query.title);

    // titleがundefinedまたはnullでない場合のみ、setSelectedTitleを実行
    if (title) {
      setSelectedTitle(title);
    }
  }, []);

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
      // intervalId = setInterval(fetchRoom, 10000); // その後、5秒ごとに実行
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
            <div className={styles.modalTitle2}>お申込み確認</div>
            <div className={styles.check}>*注意事項</div>
            <div className={styles.checkBox}>以下の参加条件をご確認ください：</div>
            <div className={styles.participationConditions}>
              <div className={styles.participationConditionsTitle}>
                - 年齢制限: 参加者は12歳以上である必要があります。
              </div>
              <div className={styles.participationConditionsTitle}>
                - 経験要件: 基本的な操作方法を理解していることが推奨されます。
              </div>
              <div className={styles.participationConditionsTitle}>
                - 技術要件:
                高速インターネット接続と、最低限のハードウェア仕様を満たしたコンピューターが必要です。
              </div>
              <div className={styles.participationConditionsTitle}>
                - 保護者の同意: 18歳未満の方は、保護者の同意を得て申し込みを行う必要があります。
              </div>
            </div>
            <div className={styles.modalRiyou}>利用規約</div>
            <div className={styles.modalContent2}>
              本利用規約（以下、「本規約」といいます。）は、当社が提供するコーチングサイト及び関連する全てのサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。本サービスを利用する全ての利用者（以下、「ユーザー」といいます。）は、本規約に同意したものとみなされます。
              1. 適用
              本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されます。 2.
              利用登録
              ユーザーは、本サービスの利用にあたって、真実かつ正確な情報を提供するものとします。
              登録情報に変更があった場合、ユーザーは直ちにその内容を更新するものとします。 3.
              ユーザーIDおよびパスワードの管理
              ユーザーは、自己のユーザーIDおよびパスワードの管理について全責任を負うものとします。
              ユーザーIDおよびパスワードの盗用または第三者による使用等の不正使用に対して、当社は一切の責任を負いません。
              4. 禁止事項 ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
              法令または公序良俗に違反する行為 犯罪行為に関連する行為
              当社、本サービスの他のユーザー、または第三者の権利を侵害する行為
              その他、当社が不適切と判断する行為 5. 本サービスの提供の停止等
              当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
              本サービスにかかわるコンピューターシステムの保守を定期的にまたは緊急に行う場合
              地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
              その他、当社が本サービスの提供が困難と判断した場合 6. 著作権
              本サービスに含まれる全ての著作物に関する権利は、当社または当社にその利用を許諾している権利者に帰属しています。
              ユーザーは、当社の書面による事前の承諾なく、これらの著作物を複製、送信、改変、削除することはできません。
              7. 免責事項 当社は、本サービスの不断の提供を保証するものではありません。
              当社は、本サービスの利用から生じたいかなる損害についても、責任を負わないものとします。
              8. 契約の変更 当社は、必要に応じて本規約の内容を変更することができるものとします。
              本規約の変更後、本サービスの利用を続けた場合、変更後の規約に同意したものとみなされます。
              9. 通知または連絡
              ユーザーと当社との間の通知または連絡は、当社の定める方法により行うものとします。 10.
              準拠法・裁判管轄 本規約の解釈にあたっては、の法律を準拠法とします。
              本サービスに関連して生じた紛争については、日本の東京地方裁判所を専属的な裁判管轄とします。
            </div>
            {/* <div className={styles.modalMsg}>日付と時間を設定してください</div> */}
            {/* <div className={styles.dateTimePicker}>
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
            </div> */}
          </div>{' '}
          <div className={styles.modalCon2}>
            <div className={styles.tag}>
              <div className={styles.tagtitle}> 情報を入力してください </div>{' '}
            </div>
            <div className={styles.timeInputNote}>
              <div className={styles.timeInputNotetitle}>時間を選択する際の注意事項:</div>
              <ul className={styles.timeContainer}>
                <li>選択できる時間は、毎日9:00〜23:00の間です。</li>
                <li>予約は24時間前までに行ってください。</li>
                <li>指定した時間には5分前にはオンラインで準備を完了させてください。</li>
              </ul>
            </div>
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
          <button className={styles.applyButton5} onClick={onApplyRecruit}>
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
        <div className={styles.modalContent5}>
          <div className={styles.modalMsgContent2}>
            <div className={styles.modalTitle2}>最終お申込み確認</div>
            <div className={styles.modalTitle3}>お申込み内容</div>
            <div className={styles.modalContainer4}>
              <div className={styles.modalTf}>
                <div className={styles.title54}>ゲームタイトル</div>
                <p className={styles.title34}>
                  {RecruitDetail !== null &&
                    RecruitDetail?.gameId !== null &&
                    getGameName(RecruitDetail.gameId)}
                </p>
              </div>
              <div className={styles.modalTf}>
                <div className={styles.title54}>タイトル</div>
                <p className={styles.title34}>{RecruitDetail?.title}</p>
              </div>
              <div className={styles.modalTf}>
                <div className={styles.title54}>詳細情報</div>
                <p className={styles.title34}>{RecruitDetail?.description}</p>
              </div>

              <div className={styles.modalTf}>
                <div className={styles.title54}>スケジュール</div>
                <p className={styles.title34}>{RecruitDetail?.suchedule}</p>
              </div>
            </div>{' '}
            <div className={styles.title4}>
              <div className={styles.title3}> 時間を確認してください</div>
              <div className={styles.dateMsg}>日付：{date}</div>
              <div className={styles.timeMsg}>時間：{time}</div>
            </div>
          </div>
          <button className={styles.closeButton66} onClick={onFinalClose}>
            閉じる
          </button>
          <button className={styles.applyButton66} onClick={onApplyFinalRecruit}>
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
          <div className={styles.modalTitle}>最終受諾確認</div>
          <div className={styles.modalTitle2}>
            <div className={styles.title54}>詳細情報</div>
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
          <button className={styles.applyButton5} onClick={handleUrlClick}>
            了承する
          </button>
        </div>
      </div>
    );
  }

  const [selectedTitle, setSelectedTitle] = useState('dmTitle3');

  // タイトルを選択する関数
  const selectTitle = (title: SetStateAction<string>) => {
    setSelectedTitle(title);
    fetchRoom2(title);
  };

  const [rooms, setRooms] = useState<RoomWithLatestComment[]>([]);

  const [roomId, setRoomId] = useState('');
  const fetchRoom2 = async (title: SetStateAction<string>) => {
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
  }, [id]);
  const handleCommentClick = (roomId: string) => {
    setRoomId(roomId);
    console.log(roomId);
    router.push(`../dmRecieave?id=${roomId}&title=${selectedTitle}`); // 適切なURLにリダイレクト
  };

  return (
    <>
      <div className={styles.parent}>
        <BasicHeader user={user} />
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
            {rooms.map((room) => (
              <div
                key={room.latestComment?.id ?? 'fallback-key'}
                onClick={() => handleCommentClick(room.latestComment?.roomId ?? '')}
                className={`${styles.commentContainer} ${
                  roomId === room.latestComment?.roomId ? styles.selectedRoom : ''
                }`}
              >
                {room.commentUser && (
                  <>
                    <img
                      src={room.commentUser.imageUrl || ''}
                      alt="User"
                      className={styles.userImage}
                    />
                    <div className={styles.userContainer}>
                      <div className={styles.userName}>{room.commentUser.name}</div>
                      <div className={styles.comment}>{room.latestComment?.content}</div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.title2}>チャット欄</div>
        </div>
        <div className={styles.messageBox}>
          <div className={styles.messageBox3}>
            <div className={styles.overflow}>
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
                            <div className={styles.userImageContainer}>
                              <img
                                src={msg.userImageUrl}
                                alt="User"
                                className={styles.userImage2}
                              />
                            </div>
                          )}
                          <div className={styles.msgContent}>{msg.content}</div>
                        </>
                      ) : (
                        <>
                          <div className={styles.msgContent3}>
                            <div className={styles.msgContent2}>
                              <div className={styles.msgContent}>{msg.content}</div>
                              {msg.userImageUrl && (
                                <img
                                  src={msg.userImageUrl}
                                  alt="User"
                                  className={styles.userImage2}
                                />
                              )}
                            </div>{' '}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>{' '}
          </div>
          <div className={styles.mess}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.messageInput}
            />
            <button onClick={sendMessage} className={styles.sendButton1}>
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
            {userNumber === 3 && (
              <button disabled className={styles.appliedButton}>
                申し込み済み
              </button>
            )}
            {userNumber === 4 && (
              <button disabled className={styles.appliedButton1}>
                了承済み
              </button>
            )}
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
