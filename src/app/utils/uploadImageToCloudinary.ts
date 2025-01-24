/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary, { UploadApiResponse } from 'cloudinary';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';
import path from 'node:path';
import AppError from '../errors/AppError';
// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = (
  file: any,
): Promise<cloudinary.UploadApiResponse> => {
  const base64Image = `data:${file?.mimetype};base64,${file?.buffer?.toString('base64')}`;
  const parsedPath = path.parse(file.originalname);
  const publicId = `${parsedPath.name}-${Date.now()}`;

  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      base64Image,
      {
        folder: 'uploads', // Folder name in Cloudinary
        public_id: publicId,
      },
      (error, data) => {
        if (error) reject(error.message);
        resolve(data as UploadApiResponse);
      },
    );
  });
};

const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
  fileFilter(req, file, callback) {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return callback(
        new AppError(StatusCodes.BAD_REQUEST, 'Invalid file type.', [
          {
            path: 'profileImg',
            message: ' Only JPEG and PNG types are allowed.',
          },
        ]),
      );
    }
    callback(null, true);
  },
});
