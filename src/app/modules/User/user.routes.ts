import { Router } from 'express';
import auth from '../../middlewares/auth';
import { UserControllers } from './user.controller';

const UserRouter: Router = Router();

UserRouter.get('/', auth(), UserControllers.getAllUsers);
UserRouter.get('/profile', auth(), UserControllers.getUserProfile);

export default UserRouter;
