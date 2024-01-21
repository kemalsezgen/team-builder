import { Timestamp } from "firebase/firestore";

type PostType = {
  id: string;
  body: string;
  createdBy: string;
  createdAt: Timestamp;
};

export default PostType;