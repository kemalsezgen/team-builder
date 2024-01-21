import { useCallback, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '@/firebase';
import { useCurrentUser, usePosts } from "@/contexts";
import PostType from "@/types/PostType";

const ref = collection(db, "posts");

const AddPost = () => {

  const { setPosts } = usePosts();
  const { currentUser } = useCurrentUser();
  const [isUserLoading] = useAuthState(auth);
  const [body, setBody] = useState("");

  const handleSubmit = useCallback((e: any) => {
    e.preventDefault();
    const newPost = {
      id: Math.random().toString(36).substring(7).toString(),
      body: body,
      createdBy: currentUser?.username || "",
      createdAt: Timestamp.now(),
    };
    addDoc(ref, newPost).then(() => {
      setBody(""); // Clear the body state
    });

    setPosts((prevPosts: PostType[]) => [newPost, ...prevPosts]);
  }, [body]);

  if (isUserLoading) {
    <p>Loading...</p>
  }

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="what are you working on?"
          className="bg-gray-100 p-4"
          value={body}
          onChange={(e) => setBody(e.currentTarget.value)}
        />
        <input type='submit' value="Share" className="bg-blue-300 p-4" />
      </form>
    </div>
  )
}

export default AddPost