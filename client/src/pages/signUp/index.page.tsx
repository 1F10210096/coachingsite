/* eslint-disable max-lines */
import { CheckOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Steps } from 'antd';
import type { FieldType } from 'aws-sdk/clients/iot';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
} from 'firebase/auth';
import Link from 'next/link';
import router from 'next/router';
import type { CSSProperties, ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import { BasicHeader } from '../@components/BasicHeader/BasicHeader';
import styles from './index.module.css';
import { BasicUnder } from '../@components/BasicUnder/BasicUnder';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();
  const [isSubmitted, setIsSubmitted] = useState(true);
  const handleRegister = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      console.log('アカウント作成開始');
      const auth = createAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('アカウント作成成功:', userCredential);
      const userId = userCredential.user.uid;
      console.log('ユーザーID:', userId);
      try {
        await sendEmailVerification(userCredential.user);
      } catch (error) {
        console.error('メールアドレスの確認メール送信に失敗:', error);
      }
      console.log('メールアドレスの確認メールを送信しました');
      setIsSubmitted(false);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!userCredential || !userCredential.user) {
        throw new Error('ユーザー情報の取得に失敗しました。');
      }
      setCurrentStep(1);
    } catch (error) {
      console.error('アカウント作成失敗:', error);
      alert(`アカウント作成失敗: ${error}`);
    }
  };

  useEffect(() => {
    const auth = createAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        // メールが検証されたことを確認
        console.log('メールが検証されました');

        // データベースにユーザー情報を保存する処理
        try {
          const response = await apiClient.createUser.post({
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            body: { userId: user.uid, userName: user.displayName || '匿名ユーザー' },
          });
          // 保存が成功したら、適切なページにリダイレクト
          alert('登録が完了しました');
          router.push(process.env.REACT_APP_REDIRECT_URL as string);
        } catch (error) {
          console.error('データベースへの保存に失敗:', error);
        }
      }
    });

    // クリーンアップ関数
    return () => unsubscribe();
  }, []);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const formStyle: CSSProperties = {
    display: 'flex',

    position: 'relative',
    flexDirection: 'column',
    right: '10px',
    top: '10px',
    maxWidth: '500px',
    margin: '0 auto',
  };
  const [currentStep, setCurrentStep] = useState(0);
  // Form.Itemのスタイルを調整するオブジェクト
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.container1}>
            <div className={styles.loginTitle}>会員登録</div>
          </div>
          <Steps
            current={currentStep}
            className={styles.customStepsContainer}
            items={[
              {
                title: 'アカウント情報入力',
                status: currentStep >= 0 ? 'finish' : 'wait',
                icon: <UserOutlined />,
              },
              {
                title: 'メール認証',
                status: currentStep >= 1 ? 'finish' : 'wait',
                icon: <MailOutlined />,
              },
              {
                title: '完了',
                status: currentStep >= 2 ? 'finish' : 'wait',
                icon: <CheckOutlined />,
              },
            ]}
          />
          <Link href="/login">
            <div className={styles.kaninn}>ログインはこちら</div>
          </Link>

          <div className={styles.containerAll}>
            {isSubmitted ? (
              <>
                <div className={styles.loginContainer1}>
                  <img src={'/icon/icon.png'} alt="User" className={styles.png} />
                  <div className={styles.title}>
                    スキルアップを、もっと身近に。一律800円でゲームの頂へ。
                  </div>
                  <div className={styles.title2}>
                    800円という手頃な価格で、ゲームのプロから直接学べるチャンスを提供します。プレイスタイルの改善、戦略の練習、または特定のゲームでのレベルアップに役立つコーチングを通じて、ゲームでの成功をサポートします。
                  </div>
                </div>
                <div className={styles.loginContainer}>
                  <div className={styles.loginCon}>
                    <div className={styles.loginC}>
                      <div className={styles.loginForm}>アカウント作成</div>
                    </div>
                    <div className={styles.loginForm2}>
                      <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={formStyle}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                      >
                        <Form.Item
                          label="Eメール等"
                          name="username"
                          rules={[{ required: true, message: 'Please input your username!' }]}
                          style={{ fontSize: '18px' }}
                        >
                          <Input
                            style={{ height: '30px', fontSize: '16px' }}
                            value={email}
                            onChange={handleEmail}
                          />{' '}
                          {/* ここでカスタムスタイルを適用 */}
                        </Form.Item>
                        <Form.Item<FieldType>
                          label="パスワード"
                          name="password"
                          rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                          <Input.Password value={email} onChange={handlePassword} />
                        </Form.Item>

                        <Form.Item<FieldType>
                          name="remember"
                          valuePropName="checked"
                          wrapperCol={{ offset: 8, span: 16 }}
                        >
                          <Checkbox className={styles.loginButton2}>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                          <Button
                            className={styles.loginButton1}
                            type="primary"
                            htmlType="submit"
                            onClick={handleRegister}
                          >
                            作成
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </div>{' '}
                </div>
              </>
            ) : (
              <div className={styles.loginContainer2}>
                <div className={styles.loginContainer3}>
                  <div className={styles.logintitle}>
                    メールアドレス受信確認用のメールを送信しました
                  </div>
                  <div className={styles.logintitle2}>
                    メールをご確認いただき、メールに記載されたURLをクリックして、登録を完了してください。
                  </div>
                </div>
                <div className={styles.loginContainer4}>
                  <div className={styles.logintitle3}>メールが届かない場合</div>
                  <div className={styles.logintitle4}>
                    1.
                    迷惑メールフォルダに振り分けられていたり、フィルターや転送の設定によって受信ボックス以外の場所に保管されていないかをご確認ください。
                  </div>
                  <div className={styles.logintitle4}>
                    2. メールアドレスが正しいかどうかをご確認ください。
                  </div>
                  <div className={styles.logintitle4}>
                    3. メールの配信に時間がかかる場合があります。数分待ってから再度お試しください。
                  </div>
                </div>{' '}
              </div>
            )}
          </div>
        </div>{' '}
        <BasicUnder />
      </div>
    </>
  );
};

export default Register;
