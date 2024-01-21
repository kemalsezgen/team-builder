import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/firebase';
import { Link } from 'react-router-dom';
import { useGroups } from '@/contexts';


const Groups = () => {
  const { groups } = useGroups();
  const [isUserLoading] = useAuthState(auth);

  if (isUserLoading) {
    <h1>Loading...</h1>
  }

  return (
    <div className='max-w-lg mx-auto mt-12'>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='p-2 text-xl bg-green-300 w-full text-center rounded-t-xl'>All groups</h2>
        {groups?.map((group) => (
          <div key={group.id} className='flex w-full justify-between p-2'>
            <h2 className='text-lg'>{group.name}</h2>
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

export default Groups;
