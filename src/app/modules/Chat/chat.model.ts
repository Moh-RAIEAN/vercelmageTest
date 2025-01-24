import { model, Schema, SchemaTypes } from 'mongoose';
import { TChat } from './chat.interface';

const chatSchema = new Schema<TChat>(
  {
    chatName: {
      type: String,
      required: [true, 'chatName is required'],
    },
    users: {
      type: [
        {
          type: SchemaTypes.ObjectId,
          ref: 'User',
        },
      ],
      required: [true, 'users field is required'],
      default: [],
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    latestMessage: {
      type: SchemaTypes.ObjectId,
      ref: 'Message',
      required: [true, 'latestMessage is required'],
    },
    groupAdmin: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

const Chat = model<TChat>('Chat', chatSchema);

export default Chat;
