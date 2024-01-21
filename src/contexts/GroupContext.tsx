import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import GroupType from '@/types/GroupType';
import { collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

type GroupContextType = {
  groups: GroupType[];
  setGroups: React.Dispatch<React.SetStateAction<GroupType[]>>;
};

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchGroups = async () => {
      const q = query(collection(db, 'group'));
      const querySnapshot = await getDocs(q);
      const groupsData: GroupType[] = querySnapshot.docs.map((doc) => ({
        ...doc.data() as GroupType,
        id: doc.id,
      }));
      setGroups(groupsData);
    };

    fetchGroups();
  }, [user]);

  return (
    <GroupContext.Provider value={{ groups, setGroups }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error('useGroups must be used within a GroupProvider');
  }
  return context;
};
