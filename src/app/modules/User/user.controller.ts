import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const getUserProfile = catchAsync(async (req, res) => {
  const user = req.user;
  const userProfile = await UserServices.getUserProfileFromDb(user);
  sendResponse(res, {
    message: 'User profile is retrived successfully',
    data: userProfile,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const query = req.query;
  const allUsers = await UserServices.getAllUsersFromDb(query);
  sendResponse(res, { message: 'Users retirved successfully', data: allUsers });
});

export const UserControllers = { getUserProfile, getAllUsers };
