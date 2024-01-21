import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { DocumentData } from 'firebase/firestore'; // Add DocumentData import

import PostCard from './PostCard';
import { useEffect, useState } from 'react';
import { useCurrentUser, usePosts } from '@/contexts';
import { useParams } from 'react-router-dom';
import UserType from '@/types/UserType';

interface PostsProps {
  profileOwner: UserType | null;
}

const Posts: React.FC<PostsProps> = ({ profileOwner }) => {
  const [isUserLoading] = useAuthState(auth);
  const [filteredData, setFilteredData] = useState<DocumentData[] | undefined>(); // Update type of filteredData
  const { posts } = usePosts();
  const { currentUser } = useCurrentUser();
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    if (currentUser) {
      if (profileOwner) {
        const filteredData = posts.filter(post => post.createdBy === profileOwner.username).sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
        setFilteredData(filteredData);
        return;
      } else {
        const filteredData = posts.filter(post => currentUser.following?.includes(post.createdBy) || post.createdBy === currentUser.username).sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
        setFilteredData(filteredData);
        return;
      }
    }
  }, [posts, currentUser, username]); // posts state'ini de bağımlılıklara ekleyin


  if (isUserLoading) {
    <h1>Loading...</h1>
  }

  return (
    <div>
      {currentUser && filteredData?.map((post, index) => (
        <PostCard key={index} post={post} currentUser={currentUser} />
      ))}
    </div>
  )
}


export default Posts