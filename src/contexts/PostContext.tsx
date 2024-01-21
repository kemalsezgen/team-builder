import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import PostType from '@/types/PostType';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/firebase';

type PostContextType = {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'posts'));
      const querySnapshot = await getDocs(q);
      const postsType: PostType[] = querySnapshot.docs.map((doc) => ({
        ...doc.data() as PostType,
      }));
      setPosts(postsType);
    };

    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};
