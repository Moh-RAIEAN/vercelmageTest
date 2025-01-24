import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import User from './user.model';

const getUserProfileFromDb = async (userData: JwtPayload) => {
  const { email } = userData;
  const user = await User.findOne({ email });
  const isUserExist = user?._id;
  if (!isUserExist)
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found', [
      { path: 'email', message: 'User not found' },
    ]);
  return user;
};

const getAllUsersFromDb = async (query: Record<string, unknown>) => {
  const { search } = query;
  let getAllUsersQuery: Record<string, unknown> = {};
  if (search)
    getAllUsersQuery = {
      $or: [
        {
          userName: { $regex: search, $options: 'i' },
        },
        {
          email: { $regex: search, $options: 'i' },
        },
      ],
    };
  const allUsers = await User.find(getAllUsersQuery);
  if (!allUsers.length)
    throw new AppError(StatusCodes.NOT_FOUND, 'Users not found');
  return allUsers;
};

export const UserServices = { getUserProfileFromDb, getAllUsersFromDb };
