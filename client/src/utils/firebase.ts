import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { getApp, getApps, initializeApp } from 'firebase/app';
import type { Auth, User } from 'firebase/auth';
import { getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_API_KEY as FirebaseOptions;

export const getFirebaseAppInstance = (): FirebaseApp => {
  if (!getApps().some((app) => app.name === 'coach')) {
    // 'coach' という名前のFirebaseアプリが存在しない場合、新たに初期化
    // 名前をFirebaseAppSettingsオブジェクトのnameプロパティにセットする
    return initializeApp(firebaseConfig, { name: 'coach' });
  } else {
    // 既に存在する場合、そのインスタンスを返す
    return getApp('coach');
  }
};

export const createAuth = (): Auth => {
  const app = getFirebaseAppInstance();
  return getAuth(app);
};
export const logout = async (): Promise<void> => {
  try {
    const auth = createAuth();
    await signOut(auth);
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

// メールとパスワードでログイン
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const auth = createAuth();
    console.log(auth, email, password);
    console.log('loginWithEmail');
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log('login error');
    throw error;
  }
};

//e
// // emailとpasswordからユーザー登録
// import type { UserCredential } from 'firebase/auth';

// export const createUser = async (
//   email: string,
//   password: string,
//   displayName: string
// ): Promise<UserCredential> => {
//   // 戻り値の型を修正
//   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//   console.log(auth);
//   const analytics = getAnalytics(getFirebaseAppInstance());
//   console.log(analytics);
//   const user = auth.currentUser;
//   if (user) {
//     await updateProfile(user, { displayName });
//   }
//   const isNotVerified = !userCredential.user.emailVerified;
//   if (isNotVerified) {
//     console.log('メールを送信しました');
//     await reSendVerifyMail(userCredential.user); // この関数の実装を確認
//   }
//   return userCredential; // 正しい型の値を返す
// };

// 確認メール送信
const reSendVerifyMail = async (user: User): Promise<void> => {
  try {
    await sendEmailVerification(user);
    return;
  } catch (error) {
    switch ((error as { code: string }).code) {
      case 'auth/too-many-requests':
        console.error('Too many requests. Try again later.');
        break;
      default:
        console.error('Failed to send verification email:', error);
    }
  }
};
