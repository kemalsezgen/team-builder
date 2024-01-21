import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import UserType from '@/types/UserType';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

type UserContextType = {
  users: UserType[];
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
  updateUserFollowers: (userId: string, followerId: string, action: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    // 'user' koleksiyonuna bir listener ekliyoruz ve herhangi bir değişiklik olduğunda callback'i tetikliyoruz.
    const unsubscribe = onSnapshot(collection(db, 'user'), (snapshot) => {
      const usersData: UserType[] = snapshot.docs.map((doc) => ({
        ...doc.data() as UserType,
        id: doc.id,
      }));
      setUsers(usersData); // users state'ini güncelliyoruz.
    });

    // Component unmount olduğunda listener'ı temizliyoruz.
    return unsubscribe;
  }, [user]);

  // Kullanıcı takip edildiğinde veya takip bırakıldığında çağırılacak fonksiyon
  const updateUserFollowers = (userId: string, followerId: string, action: string) => {
    setUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user.id === userId) {
          return action === 'follow'
            ? { ...user, followers: [...user.followers, followerId] } // Takip edileni ekle
            : { ...user, followers: user.followers.filter(id => id !== followerId) }; // Takip bırakılanı çıkar
        } else {
          return user;
        }
      });
    });
  };

  return (
    <UserContext.Provider value={{ users, setUsers, updateUserFollowers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
