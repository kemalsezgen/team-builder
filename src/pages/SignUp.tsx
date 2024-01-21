import { useState, useCallback } from "react";
import { Link } from "react-router-dom";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const ref = collection(db, 'user');

const SignUp = () => {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleSubmit = useCallback((e: any) => {
    e.preventDefault();
  
    if (!email || !password || !name || !surname || !username) {
      alert("Please fill in all the fields");
      return;
    }
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        console.log("User created:", auth);
        updateProfile(auth.user, { displayName: username });
        addDoc(ref, {
          uid: auth.user?.uid,
          name: name,
          surname: surname,
          username: username,
          email: email,
          following: [],
          followers: [],
          profilePicture: "",
          createdAt: new Date(),
        });
      })
      .catch((e) => alert(e));
  }, [username, email, password, name, surname]);

  return (
    <div className="max-w-md mx-auto my-12">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
        <input
          type="text"
          placeholder="name"
          className="p-4 bg-gray-100 rounded-md"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="surname"
          className="p-4 bg-gray-100 rounded-md"
          value={surname}
          onChange={(e) => setSurname(e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="username"
          className="p-4 bg-gray-100 rounded-md"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <input
          type="email"
          placeholder="email"
          className="p-4 bg-gray-100 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="p-4 bg-gray-100 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <input
          type="submit"
          className="p-4 bg-green-400 rounded-md"
          value="Sign Up"
        />
        <Link to="/sign-in">Don't have an account? Sign In</Link>
      </form>
    </div>
  )
}

export default SignUp