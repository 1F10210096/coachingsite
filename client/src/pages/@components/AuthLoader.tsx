import { onAuthStateChanged } from 'firebase/auth';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { userAtom } from 'src/atoms/user';
import { pagesPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import { Loading } from '../../components/Loading/Loading';

export const AuthLoader = () => {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const [isInitedAuth, dispatchIsInitedAuth] = useReducer(() => true, false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(createAuth(), async (fbUser) => {
      try {
        if (fbUser) {
          const idToken = await fbUser.getIdToken();
          await apiClient.session.$post({ body: { idToken } });
        } else {
          await apiClient.session.$delete();
          setUser(null);
        }
      } catch (error) {
        console.error('An error occurred during the auth process', error);
        // ここでエラー処理を行う
      } finally {
        dispatchIsInitedAuth();
      }
    });

    return unsubscribe;
  }, [setUser]);

  useEffect(() => {
    if (!isInitedAuth) return;

    const redirectToHome = async () => {
      if (router.pathname === pagesPath.login.$url().pathname) {
        await router.push(pagesPath.$url());
      }
    };

    if (user) {
      redirectToHome();
    }
  }, [router, isInitedAuth, user]);

  // 認証が初期化されていない場合のみローディングを表示
  if (!isInitedAuth) {
    console.log('ローディング');
    return <Loading visible={true} />;
  }

  // 認証が完了している場合、またはエラーが発生した場合の処理をここに記述
  // 例: return <>{user ? <AuthenticatedComponent /> : <UnauthenticatedComponent />}</>;
};
