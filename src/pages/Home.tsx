import { signOut } from 'firebase/auth';
import { useCallback } from 'react';
import Posts from '@/components/post/Posts';
import AddPost from '@/components/post/AddPost';
import { Link } from 'react-router-dom';
import { auth } from '@/firebase';
import { useCurrentUser, useUsers } from '@/contexts';


const Home = () => {
  const { users } = useUsers();
  const { currentUser } = useCurrentUser();

  const handleSignOut = useCallback(() => {
    signOut(auth)
  }, []);

  return (
    <div className='max-w-3xl mx-auto py-12'>
      <div className='flex justify-between p-4'>
        <div>
          <p className='text-2xl'>Hoşgeldin
            <Link to={`/${currentUser?.username}`}>
              <span>{" "}</span>
              <span className='underline'>{currentUser?.username}</span>
            </Link>
          </p>
          <p className='text-lg text-pink-500'>{currentUser?.email}</p>
          <div>
            <h2 className='text-xl font-bold'>Takipçilerin:</h2>
            <ul>
              {currentUser?.followers?.map((followerUsername: string) => {
                const follower = users?.find((u) => u.username === followerUsername);
                return <li key={followerUsername}>{follower?.username || 'Unknown User'}</li>;
              })}
            </ul>
          </div>

          <div>
            <h2 className='text-xl font-bold'>Takip Ettiklerin:</h2>
            <ul>
              {currentUser?.following?.map((followingUsername: string) => {
                const following = users?.find((u) => u.username === followingUsername);
                return <li key={followingUsername}>{following?.username || 'Unknown User'}</li>;
              })}
            </ul>
          </div>
        </div>
        <div>
          <Link to="/groups"><button className='text-md p-2 bg-blue-300 h-12 mr-4'>Groups</button></Link>
          <Link to="/users"><button className='text-md p-2 bg-green-300 h-12 mr-4'>All Users</button></Link>
          <Link to={`/${currentUser?.username}`}><button className='text-md p-2 bg-gray-300 h-12 mr-4'>Profile</button></Link>
          <button className='text-md p-2 bg-pink-400 h-12' onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
      <AddPost />
      <Posts profileOwner={null}/>
    </div>
  )
}

export default Home