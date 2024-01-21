import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { Link } from 'react-router-dom';

import { useUsers, useCurrentUser } from '@/contexts';


const Users = () => {
  const { users, updateUserFollowers } = useUsers();
  const { currentUser, setCurrentUser } = useCurrentUser();

  const followUser = async (userToFollow: { id: string; username: string; uid:unknown }) => {
    if (!currentUser || !userToFollow) return;
  
    const currentUserRef = doc(db, 'user', currentUser.id);
    const userToFollowRef = doc(db, 'user', userToFollow.id);
  
    await updateDoc(currentUserRef, {
      following: arrayUnion(userToFollow.username)
    });
    await updateDoc(userToFollowRef, {
      followers: arrayUnion(currentUser.username)
    });
  
    setCurrentUser({
      ...currentUser,
      following: currentUser.following ? [...currentUser.following, userToFollow.username] : [userToFollow.username]
    });
  
    updateUserFollowers(userToFollow.username, currentUser.username, 'follow');
  };
  
  const unfollowUser = async (userToUnfollow: { id: string; username: string; uid: unknown;}) => {
    if (!currentUser || !userToUnfollow) return;
  
    const currentUserRef = doc(db, 'user', currentUser.id);
    const userToUnfollowRef = doc(db, 'user', userToUnfollow.id);
  
    await updateDoc(currentUserRef, {
      following: arrayRemove(userToUnfollow.username)
    });
    await updateDoc(userToUnfollowRef, {
      followers: arrayRemove(currentUser.username)
    });
  
    setCurrentUser({
      ...currentUser,
      following: currentUser.following ? currentUser.following.filter((username: string) => username !== userToUnfollow.username) : []
    });
  
    updateUserFollowers(userToUnfollow.username, currentUser.username, 'unfollow');
  };
  
  const createFollowButton = (userToManage: any) => {
    let buttonText = "Takip et";
    let buttonAction = () => followUser(userToManage); // Bu kısımda userToManage'i doğru alıyor mu?
  
    if (userToManage.username === currentUser?.username) {
      buttonText = "me";
    } else if (currentUser?.following.includes(userToManage?.username)) {
      buttonText = "Takibi bırak";
      buttonAction = () => unfollowUser(userToManage); // Ve burada doğru fonksiyonu atıyor mu?
    } else if (userToManage.following?.includes(currentUser?.username)) {
      buttonText = "Sen de onu takip et";
    }
  
    return (
      <button
        disabled={userToManage.username === currentUser?.username}
        onClick={buttonAction} // onClick olayı doğru tetikleniyor mu?
        className="border-2 min-w-[100px]"
      >
        {buttonText}
      </button>
    );
  };
  
  return (
    <div className='max-w-lg mx-auto mt-12'>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='p-2 text-xl bg-green-300 w-full text-center rounded-t-xl'>All users</h2>
        {users.map((userToManage) => (
          <div key={userToManage.id} className='flex w-full justify-between p-2'>
            <Link to={`/${userToManage.username}`}><h2 className='text-lg underline'>{userToManage.username}</h2></Link>
            {createFollowButton(userToManage)}
          </div>
        ))}
        <Link className='w-full flex justify-center items-center' to="/">
          <button className="text-lg p-4 bg-pink-500 w-full rounded-b-xl">
            Back to the homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Users;
