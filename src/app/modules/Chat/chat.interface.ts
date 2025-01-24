import { Types } from 'mongoose';

export type TChat = {
  chatName: string;
  isGroupChat: boolean;
  users: Types.ObjectId[];
  latestMessage: Types.ObjectId;
  groupAdmin?: Types.ObjectId;
};
