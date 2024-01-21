import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, db } from '@/firebase';
import { Link } from 'react-router-dom';
import { useCurrentUser, useGroups } from '@/contexts';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';


const Groups = () => {
  const { groups, updateGroupMembers } = useGroups();
  const { currentUser } = useCurrentUser();
  const [isUserLoading] = useAuthState(auth);

  if (isUserLoading) {
    <h1>Loading...</h1>
  }
  
  const handleJoinGroup = async (groupId: string) => {
    
    const groupToJoinRef = doc(db, 'group', groupId);

    await updateDoc(groupToJoinRef, {
      members: arrayUnion(currentUser?.username)
    });

    updateGroupMembers(groupId, currentUser?.username ?? '', 'join');
  }

  const handleQuitGroup = async (groupName: string) => {
    const groupToJoinRef = doc(db, 'group', groupName);

    await updateDoc(groupToJoinRef, {
      members: arrayRemove(currentUser?.username)
    });
    updateGroupMembers(groupName, currentUser?.username ?? '', 'quit');
  }

  return (
    <div className='max-w-lg mx-auto mt-12'>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='p-2 text-xl bg-green-300 w-full text-center rounded-t-xl'>All groups</h2>
        {groups?.map((group) => (
          <div key={group.id} className='flex w-full justify-between p-2'>
            <Link to={`/groups/${group.name}`}><h2 className='text-lg underline'>{group.name}</h2></Link>
            {group.members.includes(currentUser?.username ?? '')
              ? <button onClick={() => handleQuitGroup(group.id)} className='border-2 border-black-200 pr-4 pl-4'>Quit</button>
              : <button onClick={() => handleJoinGroup(group.id)} className='border-2 border-black-200 pr-4 pl-4'>Join</button>}
          </div>
        ))}
        <Link className='w-full flex justify-center items-center' to="/">
          <button className="text-lg p-4 bg-pink-500 w-full rounded-b-xl">
            Back to the homepage
          </button>
        </Link>
        <Link className='w-full flex justify-center items-center' to="/createGroup">
          <button className="text-lg p-4 bg-blue-300 w-full rounded-xl mt-4">Create New Group</button>
        </Link>
      </div>
    </div>
  );
};

export default Groups;
