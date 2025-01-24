/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import getConfigOption from '../../config';
import AppError from '../../errors/AppError';
import pick from '../../utils/pick';
import { uploadImageToCloudinary } from '../../utils/uploadImageToCloudinary';
import { TUser } from '../User/user.interface';
import User from '../User/user.model';
import { TAuthPayload } from './auth.interface';
import { createToken } from './auth.utils';

const createUserIntoDb = async (
  file: any,
  payload: TUser,
): Promise<Record<string, unknown>> => {
  const createUserData = pick(payload, ['name', 'email', 'password']);

  const isUserExistWithEmail = await User.findOne({ email: payload?.email });
  if (isUserExistWithEmail?._id)
    throw new AppError(StatusCodes.BAD_REQUEST, 'Validation error', [
      { path: 'email', message: 'email is already in use!' },
    ]);

  const uploadedImageFile = await uploadImageToCloudinary(file);
  createUserData.profileImg = uploadedImageFile?.secure_url;

  const createdUser = await User.create(createUserData);
  if (!createdUser)
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'can not create user, internal server error!',
    );

  const accessToken = createToken(
    { id: createdUser?._id?.toString(), email: createdUser?.email },
    getConfigOption('jwtAccessTokenSecret'),
    getConfigOption('jwtAccessTokenExpiresIn'),
  );
  return {
    ...pick(createdUser, ['_id', 'name', 'email', 'profileImg']),
    accessToken,
  };
};

const loginUser = async (
  payload: TAuthPayload,
): Promise<Record<string, unknown>> => {
  const { email, password: givenPassowrd } = payload;
  const isUserExistWithEmail = await User.findOne({ email }).select(
    '+password',
  );
  if (!isUserExistWithEmail?._id)
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials', [
      { path: 'email', message: 'user not found' },
    ]);

  const savedPassword = isUserExistWithEmail?.password;
  const isPasswordMatched = await bcrypt.compare(givenPassowrd, savedPassword);
  if (!isPasswordMatched)
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials', [
      { path: 'password', message: 'incorrect password' },
    ]);
  const jwtPayload = {
    id: isUserExistWithEmail?._id?.toString(),
    email: isUserExistWithEmail?.email,
  };

  const accessToken = createToken(
    jwtPayload,
    getConfigOption('jwtAccessTokenSecret'),
    getConfigOption('jwtAccessTokenExpiresIn'),
  );
  const refreshToken = createToken(
    jwtPayload,
    getConfigOption('jwtRegreshTokenSecret'),
    getConfigOption('jwtRefreshTokenExpiresIn'),
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const UserServices = { createUserIntoDb, loginUser };
