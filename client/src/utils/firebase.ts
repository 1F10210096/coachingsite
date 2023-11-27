import type { FirebaseOptions } from 'firebase/app';
import { getApps, initializeApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

let cachedAuth: Auth | undefined;

export const createAuth = () => {
  if (cachedAuth !== undefined) return cachedAuth;

  let app;
  if (getApps().length === 0) {
    // Firebaseアプリケーションがまだ初期化されていない場合のみ初期化する
    const firebaseConfig: FirebaseOptions =
      process.env.NEXT_PUBLIC_AUTH_EMULATOR_URL !== undefined
        ? { apiKey: 'fake-api-key', authDomain: location.hostname }
        : JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?? '{}');

    app = initializeApp(firebaseConfig);
  } else {
    // 既に初期化されているFirebaseアプリケーションを使用する
    app = getApps()[0];
  }

  const auth = getAuth(app);
  if (process.env.NEXT_PUBLIC_AUTH_EMULATOR_URL !== undefined) {
    connectAuthEmulator(auth, process.env.NEXT_PUBLIC_AUTH_EMULATOR_URL, { disableWarnings: true });
  }
  cachedAuth = auth;

  return auth;
};
