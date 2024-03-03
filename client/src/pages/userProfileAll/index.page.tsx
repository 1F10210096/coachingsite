/* eslint-disable max-lines */
import { AuditOutlined, HeartOutlined, MessageOutlined, SendOutlined } from '@ant-design/icons';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';
const Login = () => {
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
  const [newProfile, setNewProfile] = useState<string | null>('');
  const [rating, setRating] = useState<number | null>(0);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const fetchMyRecruitList = async () => {
    try {
      console.log(Id);
      const response1 = await apiClient.fetchAllMyProfile.post({ body: { Id } });
      console.log(response1.body);
      setNewName(response1.body.name);
      setNewProfile(response1.body.myProfile);
      setLookImage(response1.body.imageUrl);
      setRating(response1.body.rating);
      setImageUrl(response1.body.imageUrl || '');
    } catch (error) {
      console.error('ゲームの取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    fetchMyRecruitList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Id]);

  const calculateRateWidth = (rating: number): number => {
    console.log(rating * 20);
    return rating * 20;
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
                <Link href="/form">
                  <div className={styles.boxCon3}>お問い合わせ</div>
                </Link>
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
                <Link href="/logout">
                  <div className={styles.boxCon3}>ログアウト</div>
                </Link>
              </div>{' '}
            </div>
            <div className={styles.smallBox}>
              <div className={styles.boxTitle}>ログアウト</div>
              <div className={styles.boxCon2}>
                <Link href="/logout">
                  <div className={styles.boxCon3}>ログアウト</div>
                </Link>
              </div>{' '}
            </div>
          </div>
        </div>
        <div className={styles.loginContainer}>
          <div className={styles.container}>
            {lookImage && <img src={lookImage} className={styles.profileImage} />}
            <Link href="/userProfileChange">
              <div className={styles.nameContainer}>
                <div className={styles.name}>{newName} </div>
                <div className={styles.name2}>{'>'}</div>
              </div>
            </Link>
            <div className={styles.ratingAllContainer}>
              <div className={styles.ratingContainer}>
                <span className={styles.rate}>
                  ★★★★★
                  <span
                    className={styles.rateInner}
                    style={{
                      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                      width: `${calculateRateWidth(rating ?? 0)}px`,
                    }}
                  >
                    ★★★★★
                  </span>
                </span>
              </div>
              <div className={styles.ratingNum}>{rating}</div>
            </div>
            <div className={styles.profileContainer}>
              <div className={styles.profile}>自己紹介:</div>
              <div className={styles.profile2}>{newProfile}</div>
            </div>
            <div className={styles.menuContainer}>
              <Link href="/like">
                <div className={styles.squareContainer}>
                  {' '}
                  <div className={styles.heartContainer}>
                    <HeartOutlined
                      style={{ fontSize: '38px', color: '#8d8d8d', marginRight: '18px' }}
                    />
                  </div>
                  <div className={styles.ok}>いいね！一覧</div>
                </div>
              </Link>
              <Link href="myCoach">
                <div className={styles.squareContainer}>
                  {' '}
                  <div className={styles.heartContainer}>
                    <AuditOutlined
                      style={{ fontSize: '38px', color: '#8d8d8d', marginRight: '18px' }}
                    />
                  </div>
                  <div className={styles.ok2}>コーチ募集一覧</div>
                </div>{' '}
              </Link>
              <Link href="/myRecruit">
                <div className={styles.squareContainer}>
                  {' '}
                  <div className={styles.heartContainer}>
                    <SendOutlined
                      style={{ fontSize: '38px', color: '#8d8d8d', marginRight: '18px' }}
                    />
                  </div>
                  <div className={styles.ok3}>応募一覧</div>
                </div>{' '}
              </Link>
              <Link href="/selectDm">
                <div className={styles.squareContainer}>
                  {' '}
                  <div className={styles.heartContainer}>
                    <MessageOutlined
                      style={{ fontSize: '38px', color: '#8d8d8d', marginRight: '18px' }}
                    />
                  </div>
                  <div className={styles.ok4}>メッセージ一覧</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
