import { NextFunction, Request, Response, Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/uploadImageToCloudinary';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

const AuthRoutes: Router = Router();

AuthRoutes.post(
  '/signup',
  upload.single('profileImg'),
  (req: Request, _: Response, next: NextFunction) => {
    const parsedUser = JSON.parse(req.body?.user);
    req.body = parsedUser;
    next();
  },
  validateRequest(AuthValidations.createUserValidationZodSchema),
  AuthControllers.createUser,
);
AuthRoutes.post(
  '/login',
  validateRequest(AuthValidations.loginValidationZodSchema),
  AuthControllers.loginUser,
);

export { AuthRoutes };
