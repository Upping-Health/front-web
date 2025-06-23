import { Timestamp } from "firebase/firestore";

export default interface DefaultEntityType {
  id: number,
  created_at: Timestamp,
  updated_at?: Timestamp,
}