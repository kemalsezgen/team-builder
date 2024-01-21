import { Timestamp } from "firebase/firestore";

type GroupType = {
  id: string;
  name: string;
  description: string;
  admins: string[];
  members: string[];
  createdBy: string;
  createdAt: Timestamp;
};

export default GroupType;