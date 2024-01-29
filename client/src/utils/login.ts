import type { Auth, User } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { createAuth } from 'src/utils/firebase';

// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { signOut } from 'firebase/auth';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
console.log(auth);

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
// メールとパスワードでログイン
export const loginWithEmail = async (email: string, password: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    console.log(auth, email, password);
    console.log('loginWithEmail');
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // エラーハンドリング
    console.log('e4545454rror');
    throw error;
  }
};

// emailとpasswordからユーザー登録
export const createUser = async (email: string, password: string, displayName: string) => {
  const userCredencial = await createUserWithEmailAndPassword(createAuth(), email, password);
  // ユーザーの表示名を設定する
  const user = createAuth().currentUser;
  if (user) {
    await updateProfile(user, { displayName });
  }
  const isNotVerified = !userCredencial.user.emailVerified;
  if (isNotVerified) {
    console.log('メールを送信しました');
    await reSendVerifyMail(userCredencial.user);
  }
  return userCredencial;
};

//確認メール送信
const reSendVerifyMail = async (user: User) => {
  try {
    await sendEmailVerification(user);
    return;
  } catch (error) {
    switch ((error as { code: string }).code) {
      case 'auth/too-many-requests':
        // 1分以内は再送できずこのエラーになる.その時の処理.
        break;
      default:
      // その他のメール送信失敗時の処理
    }
    return;
  }
};

const handleLogout = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
    // ログアウト成功後の処理、例えばホームページにリダイレクトなど
  } catch (error) {
    console.error('ログアウトに失敗しました:', error);
    // エラーハンドリング
  }
};
function signInWithEmailAndPassword(auth: Auth, email: string, password: string) {
  throw new Error('Function not implemented.');
}
