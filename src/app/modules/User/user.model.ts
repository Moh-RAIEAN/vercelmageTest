import bcrypt from 'bcrypt';
import { CallbackError, model, Schema } from 'mongoose';
import getConfigOption from '../../config';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    email: {
      type: String,
      required: [true, 'email is requred'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      select: 0,
    },
    profileImg: {
      type: String,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  const stringPassword = user.password;
  try {
    const hashedPassword = await bcrypt.hash(
      stringPassword,
      getConfigOption('bcryptSaltRounds'),
    );
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

const User = model<TUser>('User', userSchema);

export default User;
