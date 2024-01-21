import { useCurrentUser, useGroups } from "@/contexts";
import { db } from "@/firebase";
import { Timestamp, addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";

const ref = collection(db, "group");

const CreateGroupModal = () => {

  const { setGroups } = useGroups();
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  //const [isModalVisible, setIsModalVisible] = useState(false);
  const { currentUser } = useCurrentUser();
  const [error, setError] = useState("");


  const handleSubmit = useCallback(async (e: any) => {
    e.preventDefault();

    if (!groupName || !groupDescription) {
      return;
    }

    const groupNameQuery = query(ref, where("name", "==", groupName));
    const groupNameSnapshot = await getDocs(groupNameQuery);
    if (!groupNameSnapshot.empty) {
      setError("Bu grup adı zaten kullanılıyor. Lütfen başka bir grup adı ile tekrar deneyin.");
      return;
    }

    const newGroup = {
      id: Math.random().toString(36).substring(7).toString(),
      name: groupName,
      description: groupDescription,
      admins: [currentUser?.username || ""],
      members: [currentUser?.username || ""],
      createdBy: currentUser?.username || "",
      createdAt: Timestamp.now(),
    };

    addDoc(ref, newGroup).then(() => {
      setGroupName("");
      setGroupDescription("");
      alert("New group succesfully created.")
    }).catch((error) => {
      alert(error.message);
    });

    setGroups((prevGroups) => [...prevGroups, newGroup]);

  }, [groupName, groupDescription])

  return (
    <div className="max-w-md mx-auto my-12">
      <Link to="/groups"><button className='text-md p-2 bg-blue-300 h-12 mr-4'>Groups</button></Link>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
        <input
          type="text"
          placeholder="group name"
          className="p-4 bg-gray-100 rounded-md"
          value={groupName}
          onChange={(e) => setGroupName(e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="group description"
          className="p-4 bg-gray-100 rounded-md"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.currentTarget.value)}
        />
        <input
          type="submit"
          className="p-4 bg-green-400 rounded-md"
          value="Create"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  )
}

export default CreateGroupModal;