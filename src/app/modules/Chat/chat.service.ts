import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import User from '../User/user.model';
import { TChat } from './chat.interface';
import Chat from './chat.model';

const createChatIntoDb = async (payload: TChat) => {
  const user = await User.findById(payload?.users[0]);
  const isUserExist = user?._id;
  if (!isUserExist)
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found', [
      { path: 'users', message: 'user not found' },
    ]);
  const newChat = await Chat.create(payload);
  return newChat;
};

export const ChatServices = { createChatIntoDb };
