import { useState, useCallback } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const SignIn = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleSubmit = useCallback((e: any) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .catch((e) => alert(e))
  }, [email, password])

  return (
    <div className="max-w-md mx-auto my-12">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
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
          value="Sign In"
        />
        <Link to="/forgot-password" className="ml-auto">Forgot password?</Link>
        <Link to="/sign-up">Don't have an account? Sign Up</Link>
      </form>
    </div>
  )
}

export default SignIn