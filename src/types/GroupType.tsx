import { Timestamp } from "firebase/firestore";

type GroupType = {
  id: string;
  name: string;
  owner: string;
  description: string;
  members: string[];
  createdAt: Timestamp;
};

export default GroupType;