import { Timestamp } from "firebase/firestore";

type UserType = {
  id: string;
  uid: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  following: string[];
  followers: string[];
  profilePicture: string;
  createdAt: Timestamp;
};

export default UserType;