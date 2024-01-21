import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom"

const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const handleSubmit = useCallback((e: any) => {
    e.preventDefault();

    if(!email) {
      return;
    }

    sendPasswordResetEmail(auth, email)
     .then(() => {
      alert("Check your email to reset your password")
     })
     .catch((e) => alert(e))
  }, [email])

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
          type="submit"
          className="p-4 bg-green-400 rounded-md"
          value="Reset Password"
        />
        <Link to="/sign-in">Back to Sign In</Link>
      </form>
    </div>
  )
}

export default ForgotPassword