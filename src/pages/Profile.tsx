import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCurrentUser, useUsers } from '@/contexts';
import UserType from '@/types/UserType';
import Posts from '@/components/post/Posts';
import AddPost from '@/components/post/AddPost';

const Profile = () => {
  const { users } = useUsers();
  const { currentUser } = useCurrentUser();
  const { username } = useParams<{ username: string }>();
  const [profileOwner, setProfileOwner] = useState<UserType | undefined>(undefined);

  // Profile bileşeni içinde

  useEffect(() => {
    // users array'indeki kullanıcı bilgileri güncellendiğinde veya URL'deki kullanıcı adı değiştiğinde çalışır
    const profileOwnerUser = users.find(user => user.username === username);
    setProfileOwner(profileOwnerUser);
  }, [users, username]);

  if (!profileOwner) {
    return <p>Loading...</p>;
  }

  return (
    <div className='max-w-3xl mx-auto py-12'>
      <Link to="/"><button className='text-md p-2 bg-green-300 h-12 mr-4'>{"Homepage"}</button></Link>
      <div className='flex flex-col p-4 text-center'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png' alt='profile' className='rounded-full w-32 h-32 mx-auto' />
        <p className='text-2xl uppercase mt-4'>{profileOwner?.name + " " + profileOwner?.surname}</p>
        <p className='text-lg text-pink-500'>{profileOwner?.email}</p>
        <div className='flex justify-center gap-8 text-center mt-4'>
          <div>
            <p className='text-xl font-bold'>{profileOwner?.followers?.length}</p>
            <h2 className='text-xl font-bold'>Takipçi</h2>
            {/*             <ul>
              {profileOwner?.followers?.map((followerUsername: string) => {
                const follower = users?.find((u) => u.username === followerUsername);
                return <li key={followerUsername}>{follower?.username || 'Unknown User'}</li>;
              })}
            </ul> */}
          </div>
          <div>
            <p className='text-xl font-bold'>{profileOwner?.following?.length}</p>
            <h2 className='text-xl font-bold'>Takip Edilen</h2>
            {/*             <ul>
              {profileOwner?.following?.map((followingUsername: string) => {
                const following = users?.find((u) => u.username === followingUsername);
                return <li key={followingUsername}>{following?.username || 'Unknown User'}</li>;
              })}
            </ul> */}
          </div>
        </div>
      </div>
      {currentUser?.username === profileOwner.username && <AddPost />}
      <Posts profileOwner={profileOwner} />
    </div>
  );
}

export default Profile;