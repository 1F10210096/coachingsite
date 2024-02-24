/* eslint-disable max-lines */
/* eslint-disable complexity */
import { RubyOutlined, SendOutlined, TrophyOutlined, ZoomInOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import assert from 'assert';
import { onAuthStateChanged } from 'firebase/auth';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import { gameList,game } from 'src/utils/gameList';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css'; // スタイルシートのパスを適切に設定
import styles2 from './index2.module.css';
const YourComponent = () => {
  const [step, setStep] = useState(1); // ステップの状態
  const [selectedGame, setSelectedGame] = useState<GameKey | undefined>();
  // ジェネリック型を使って初期化
  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);
  const [selectedMyRanks, setSelectedMyRanks] = useState<string>('');

  type GameKey = keyof typeof games;
  const games = gameList;

  const gamer = game;

  const stepTitles = ['ゲーム選択', '詳細設定', '注意事項やタグ', '募集作成'];

  const [user, setUser] = useState<string>('');

  useEffect(() => {
    const auth = createAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ユーザーがログインしている場合、ユーザー情報をセット
        console.log(firebaseUser);
        setUser(firebaseUser.uid);
      } else {
        // ユーザーがログアウトしている場合
        setUser('');
      }
    });

    // コンポーネントがアンマウントされる際に購読を解除
    return () => unsubscribe();
  }, []);

  const [selectedGameIndex, setSelectedGameIndex] = useState<number>(0);

  const [selectedMyRankIndex, setSelectedMyRankIndex] = useState<number>(0);
  const handleGameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const gameName = event.target.value;
    if (gamer.includes(gameName)) {
      setSelectedGame(gameName as GameKey);
    }

    // ゲームの名前からインデックスを見つける
    const gameIndex = Object.keys(games).indexOf(gameName) + 1; // インデックスは0から始まるので、1を足す
    if (gamer.includes(event.target.value)) {
      setSelectedGame(event.target.value as GameKey);
    }

    // インデックスを保存する
    setSelectedGameIndex(gameIndex);

    // ランクの選択をリセット
    setSelectedRanks([]);
  };

  const handleMyRankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRank = event.target.value;

    // 現在選択されているゲームのランク配列を取得
    const currentGameRanks = selectedGame ? games[selectedGame] : undefined;

    if (currentGameRanks) {
      const rankIndex = currentGameRanks.indexOf(selectedRank); // インデックスは0から始まるので、1を足す
      setSelectedMyRanks(event.target.value);
      setSelectedMyRankIndex(rankIndex);
    } else {
      // currentGameRanks が undefined の場合の処理
      // 例えば、エラーメッセージを表示する、何もしない、デフォルト値を設定するなど
    }
  };
  const [selectedRanksIndex, setSelectedRanksIndex] = useState<number[]>([]);

  const handleRankChange = (rank: string) => {
    const ranksArray = selectedGame ? games[selectedGame] : undefined;

    // ランクの名前からインデックスを見つけます。
    const rankIndex = ranksArray?.indexOf(rank);

    // 選択されたランクの名前に基づいて状態を更新します。
    setSelectedRanks((prevRanks) =>
      prevRanks.includes(rank) ? prevRanks.filter((r) => r !== rank) : [...prevRanks, rank]
    );

    // 選択されたランクのインデックスに基づいて別の状態を更新します。
    // rankIndex が undefined の場合は処理を行わない
    if (typeof rankIndex === 'number') {
      setSelectedRanksIndex((prevRanksIndex) =>
        prevRanksIndex.includes(rankIndex)
          ? prevRanksIndex.filter((index) => index !== rankIndex)
          : [...prevRanksIndex, rankIndex]
      );
    }
  };

  const handleNextStep = () => {
    // 次のステップに進むためのロジック
    // 例えば、すべての選択が完了していることを確認するなど

    console.log(acheavement);

    setStep(step + 1);
  };

  const handleBackStep = () => {
    // 次のステップに進むためのロジック
    // 例えば、すべての選択が完了していることを確認するなど

    console.log(acheavement);

    setStep(step - 1);
  };

  const totalSteps = 4; // 総ステップ数

  const [title, setTitle] = useState(''); // React の state hook

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value); // 入力された値を state にセット
  };

  const [description, setDescription] = useState(''); // React の state hook

  const handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value); // 入力された値を state にセット
  };

  const [lessonType, setLessonType] = useState(''); // React の state hook

  const handleChangeLessonType = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLessonType(event.target.value); // 入力された値を state にセット
  };

  const [acheavement, setAcheavement] = useState(''); // React の state hook

  const handleAcheavement = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAcheavement(event.target.value); // 入力された値を state にセット
  };

  const [notes, setNotes] = useState('');
  const handleNotes = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value); // 入力された値を state にセット
  };

  const [suchedule, setSuchedule] = useState('');
  const handleSuchedule = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSuchedule(event.target.value); // 入力された値を state にセット
  };

  const tags = ['初心者歓迎', '上級者歓迎', 'スパルタ指導', '仲良くワイワイ']; // 例としてのタグリスト

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(acheavement);
    try {
      const coachData = {
        user,
        title,
        selectedGameIndex,
        selectedMyRankIndex,
        selectedRanks,
        selectedTags,
        acheavement,
        description,
        suchedule,
        notes,
        // その他必要なデータ
      };
      console.log(coachData);
      console.log(selectedMyRanks);
      const unknownRanks = selectedMyRanks as unknown;
      const unknownGame = unknownRanks as number;
      console.log(lessonType);
      const response = await apiClient.createBosyuu.post({
        body: {
          user,
          title,
          selectedGameIndex,
          selectedMyRankIndex,
          lessonType,
          selectedRanksIndex,
          selectedTags,
          acheavement,
          description,
          suchedule,
          notes,
        },
      });
      assert('募集作成が完了しました');
      router.push('http://localhost:3000/');
    } catch (error) {
      assert(error);
    }
  };
  const getStatus = (index: number, currentStep: number): 'wait' | 'process' | 'finish' => {
    if (currentStep - 1 === index) {
      return 'process';
    } else if (currentStep - 1 > index) {
      return 'finish';
    } else {
      return 'wait';
    }
  };
  return (
    <>
      <div className={styles.allContainer}>
        <BasicHeader user={user} />
        <div className={styles.container2}>
          <div className={styles.container1}>
            <div className={styles.loginTitle}>コーチング募集作成</div>
            <Steps current={step - 1} className={styles.customStepsContainer}>
              {stepTitles
                .map((title, index) => ({
                  title,
                  status: getStatus(index, step), // ここで関数を呼び出し
                  icon:
                    index === 0 ? (
                      <RubyOutlined />
                    ) : index === 1 ? (
                      <TrophyOutlined />
                    ) : index === 2 ? (
                      <ZoomInOutlined />
                    ) : (
                      <SendOutlined />
                    ),
                }))
                .map((item) => (
                  <Steps.Step key={item.title} {...item} />
                ))}
            </Steps>
          </div>{' '}
          <div className={styles.aside} />
          {step === 1 && (
            <>
              <div className={styles.as}>
                <div className={styles.vertical}>
                  <label className={styles.mail}>
                    対象ゲーム
                    <span className={styles.required}>
                      <span className={styles.mail2}>必須</span>
                    </span>
                  </label>
                  <select
                    id="game-select"
                    value={selectedGame}
                    onChange={handleGameChange}
                    className={styles.select}
                  >
                    <option value="" className={styles.mail}>
                      ゲームを選択してください
                    </option>
                    {Object.keys(games).map((game) => (
                      <option key={game} value={game}>
                        {game}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.vertical}>
                  <label className={styles.myRank}>
                    自分のランク
                    <span className={styles.required}>
                      <span className={styles.mail2}>必須</span>
                    </span>
                  </label>
                  <select
                    id="rank-select"
                    value={selectedMyRanks}
                    onChange={handleMyRankChange}
                    className={styles.select2}
                    disabled={!selectedGame}
                  >
                    <option value="">自分のランクを選択してください</option>
                    {selectedGame && Object.prototype.hasOwnProperty.call(games, selectedGame) ? (
                      games[selectedGame].map((rank) => (
                        <option key={rank} value={rank}>
                          {rank}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled />
                    )}
                  </select>
                </div>

                {selectedGame && games[selectedGame].length > 0 ? (
                  <div>
                    {' '}
                    <div className={styles.vertical}>
                      <label htmlFor="rank-select" className={styles.subjectRank}>
                        対象ランク
                        <span className={styles.required}>
                          <span className={styles.mail2}>必須</span>
                        </span>
                      </label>
                      <div className={styles.pick}>
                        {games[selectedGame].map((rank) => (
                          <div key={rank} className={styles.rankItem}>
                            <input
                              type="checkbox"
                              id={rank}
                              name={rank}
                              checked={selectedRanks.includes(rank)}
                              onChange={() => handleRankChange(rank)}
                              className={styles.pick}
                            />
                            <label htmlFor={rank} className={styles.rankName}>
                              {rank}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>{' '}
                  </div>
                ) : (
                  <div className={styles.noPick} />
                )}

                <button onClick={handleNextStep} className={styles.next}>
                  次へ
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className={styles.aside1} />
              <div className={styles.as1}>
                <div className={styles.vertical}>
                  <div className={styles.title}>
                    募集タイトル{' '}
                    <span className={styles.required}>
                      <span className={styles.mail2}>必須</span>
                    </span>
                  </div>{' '}
                  <textarea
                    placeholder="タイトルを入力してください"
                    onChange={handleChange} // ユーザーの入力を処理する関数
                    className={styles.input} // スタイリングのためのCSSクラス
                  />
                </div>
                <div className={styles.description}>
                  募集内容{' '}
                  <span className={styles.required}>
                    <span className={styles.mail2}>必須</span>
                  </span>
                </div>
                <textarea
                  placeholder="募集内容を入力してください"
                  onChange={handleChangeDescription} // ユーザーの入力を処理する関数
                  className={styles.inputDescription} // スタイリングのためのCSSクラス
                />
                <div className={styles.description}>
                  レッスン形式{' '}
                  <span className={styles.required}>
                    <span className={styles.mail2}>必須</span>
                  </span>
                </div>
                <textarea
                  placeholder="レッスン形式を入力してください"
                  onChange={handleChangeLessonType} // ユーザーの入力を処理する関数
                  className={styles.inputDescription} // スタイリングのためのCSSクラス
                />
                <div className={styles.acheavement}>
                  実績{' '}
                  <span className={styles.required}>
                    <span className={styles.mail2}>必須</span>
                  </span>
                </div>
                <textarea
                  placeholder="実績を入力してください"
                  onChange={handleAcheavement} // ユーザーの入力を処理する関数
                  className={styles.inputAcheavement} // スタイリングのためのCSSクラス
                />
                <div className={styles.yoko}>
                  <button onClick={handleBackStep} className={styles.next2}>
                    戻る
                  </button>
                  <button onClick={handleNextStep} className={styles.next4}>
                    次へ
                  </button>
                </div>{' '}
              </div>
            </>
          )}
          {step === 3 && (
            <div className={styles.as3}>
              <div className={styles.title}>
                スケジュール{' '}
                <span className={styles.required}>
                  <span className={styles.mail2}>必須</span>
                </span>
              </div>
              <textarea
                placeholder="スケジュールを入力してください"
                onChange={handleSuchedule} // ユーザーの入力を処理する関数
                className={styles.input} // スタイリングのためのCSSクラス
              />
              <div className={styles.notes}>
                注意事項{' '}
                <span className={styles.required}>
                  <span className={styles.mail2}>必須</span>
                </span>
              </div>
              <textarea
                placeholder="注意事項を入力してください"
                onChange={handleNotes} // ユーザーの入力を処理する関数
                className={styles.inputNotes} // スタイリングのためのCSSクラス
              />
              <div className={styles.notes}>
                タグを設定入力してください{' '}
                <span className={styles.required}>
                  <span className={styles.mail2}>必須</span>
                </span>
                {tags.map((tag) => (
                  <div key={tag} className={styles.tagItem}>
                    <input
                      type="checkbox"
                      id={tag}
                      name={tag}
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagChange(tag)}
                      className={styles.pick}
                    />
                    <label htmlFor={tag}>{tag}</label>
                  </div>
                ))}
              </div>
              <div className={styles.yoko1}>
                <button onClick={handleBackStep} className={styles.next2}>
                  戻る
                </button>
                <button onClick={handleNextStep} className={styles.next4}>
                  次へ
                </button>
              </div>{' '}
            </div>
          )}
          {step === 4 && (
            <div className={styles.as}>
              <div className={styles2.allContainer}>
                <div className={styles2.title}>入力内容はこの通りでいいですか？</div>
                <div className={styles2.subTitleContainer}>
                  <div className={styles2.subTitle}>ゲーム名</div>
                  <div className={styles2.content}>{selectedGame}</div>
                  <div className={styles2.subTitle}>自分のランク</div>
                  <div className={styles2.content}>{selectedMyRanks}</div>
                  <div className={styles2.subTitle}>対象ランク</div>
                  <div className={styles2.content}>{selectedRanks}</div>
                  <div className={styles2.subTitle}>募集タイトル</div>
                  <div className={styles2.content}>{title}</div>
                  <div className={styles2.subTitle}>募集内容</div>
                  <div className={styles2.content}>{description}</div>
                  <div className={styles2.subTitle}>レッスン形式</div>
                  <div className={styles2.content}>{lessonType}</div>
                  <div className={styles2.subTitle}>実績</div>
                  <div className={styles2.content}>{acheavement}</div>
                  <div className={styles2.subTitle}>スケジュール</div>
                  <div className={styles2.content}>{suchedule}</div>
                  <div className={styles2.subTitle}>注意事項</div>
                  <div className={styles2.content}>{notes}</div>
                  <div className={styles2.subTitle}>タグ</div>
                  <div className={styles2.content}>{selectedTags}</div>
                </div>
                <div className={styles.yoko2}>
                  <button onClick={handleBackStep} className={styles.next2}>
                    戻る
                  </button>
                  <button className={styles2.next3} onClick={handleSubmit}>
                    登録
                  </button>
                </div>{' '}
              </div>
            </div>
          )}
        </div>{' '}
      </div>
    </>
  );
};

export default YourComponent;
