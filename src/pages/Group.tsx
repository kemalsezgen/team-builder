import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGroups } from '@/contexts';
import GroupType from '@/types/GroupType';

const Group = () => {
  //const { users } = useUsers();
  const { groups } = useGroups();
  //const { currentUser } = useCurrentUser();
  const { groupName } = useParams<{ groupName: string }>();

  const [group, setGroup] = useState<GroupType | undefined>();

  useEffect(() => {
    //find group owner
    const currentGroup = groups.find(group => group.name === groupName);
    setGroup(currentGroup);
    console.log("groupName:", groupName);
    console.log("currentGroup:", currentGroup);
    console.log("group:", group);
  }, [groups, groupName]);

  if (!group) {
    return <p>Loading...</p>;
  }

  return (
    <div className='max-w-3xl mx-auto py-12'>
      <Link to="/"><button className='text-md p-2 bg-green-300 h-12 mr-4'>{"Homepage"}</button></Link>
      <div className='flex flex-col p-4 text-center'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png' alt='profile' className='rounded-full w-32 h-32 mx-auto' />
        <p className='text-2xl uppercase mt-4'>{group.name}</p>
        <p className='text-lg text-pink-500'>{group.members.length}</p>
        {group.members.map((memberUsername: string, index: number) => {
          return <p key={index} className='text-lg text-pink-500'>{memberUsername}</p>;
        })}
      </div>
    </div>
  );
}

export default Group;