import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import UserType from '@/types/UserType';
import { collection, getDocs, query } from 'firebase/firestore';
import { db, auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

type CurrentUserContextType = {
  currentUser: UserType | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const q = query(collection(db, 'user'));
      const querySnapshot = await getDocs(q);
      const usersData: UserType[] = querySnapshot.docs.map((doc) => ({
        ...doc.data() as UserType,
        id: doc.id,
      }));

      const currentUserData = usersData.find((u: UserType) => u.uid === user?.uid);
      setCurrentUser(currentUserData || null);
    };

    fetchCurrentUser();
  }, [user]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (context === undefined) {
    throw new Error('useCurrentUser must be used within a CurrentUserProvider');
  }
  return context;
};