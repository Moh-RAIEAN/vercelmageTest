import { Types } from 'mongoose';

export type TMessage = {
  sender: Types.ObjectId;
  content: string;
  chat: Types.ObjectId;
};
