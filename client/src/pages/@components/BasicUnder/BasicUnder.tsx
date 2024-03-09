import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { createAuth } from 'src/utils/firebase';
import styles from './BasicUnder.module.css';

export const BasicUnder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState('');
  const router = useRouter();

  useEffect(() => {
    const auth = createAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser.uid);
      }
      setIsLoading(false); // ローディングが完了したことを示す
    });
    return () => unsubscribe();
  }, []);

  const handlePrivacyClick = () => {
    if (user) {
      router.push('/privacy'); // ログインしている場合は privacy へリダイレクト
    } else {
      router.push('/login'); // ログインしていない場合は login へリダイレクト
    }
  };

  const handlePrivacyTerms = () => {
    if (user) {
      router.push('/terms'); // ログインしている場合は privacy へリダイレクト
    } else {
      router.push('/login'); // ログインしていない場合は login へリダイレクト
    }
  };


  const handleSearch = () => {
    // 検索処理をここに書く
    console.log(`検索: ${searchTerm}`);
  };

  if (isLoading) {
    return <div className={styles.loading}>ローディング中...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.con}>ゲームコーチングサイト 「GameSeed」</div>
        <div className={styles.con3}>
          <div className={styles.con2} onClick={handlePrivacyTerms}>利用規約</div>
          <div className={styles.con2} onClick={handlePrivacyClick}>プライバシーポリシー</div>
          <div className={styles.con2}>Twitter</div>
        </div>
      </div>
    </>
  );
};