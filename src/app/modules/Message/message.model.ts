import { model, Schema, SchemaTypes } from 'mongoose';
import { TMessage } from './message.interface';

const messageSchema = new Schema<TMessage>(
  {
    sender: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: [true, 'sender is required'],
    },
    content: {
      type: String,
      required: [true, 'content is required'],
    },
    chat: {
      type: SchemaTypes.ObjectId,
      ref: 'Chat',
      required: [true, 'chat is required'],
    },
  },
  { timestamps: true, versionKey: false },
);

const Message = model<TMessage>('Message', messageSchema);

export default Message;
