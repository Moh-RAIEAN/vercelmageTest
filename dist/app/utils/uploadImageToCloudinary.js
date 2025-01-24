"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.uploadImageToCloudinary = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const cloudinary_1 = __importDefault(require("cloudinary"));
const http_status_codes_1 = require("http-status-codes");
const multer_1 = __importDefault(require("multer"));
const node_path_1 = __importDefault(require("node:path"));
const AppError_1 = __importDefault(require("../errors/AppError"));
// Configure Cloudinary
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadImageToCloudinary = (file) => {
    var _a;
    const base64Image = `data:${file === null || file === void 0 ? void 0 : file.mimetype};base64,${(_a = file === null || file === void 0 ? void 0 : file.buffer) === null || _a === void 0 ? void 0 : _a.toString('base64')}`;
    const parsedPath = node_path_1.default.parse(file.originalname);
    const publicId = `${parsedPath.name}-${Date.now()}`;
    return new Promise((resolve, reject) => {
        cloudinary_1.default.v2.uploader.upload(base64Image, {
            folder: 'uploads', // Folder name in Cloudinary
            public_id: publicId,
        }, (error, data) => {
            if (error)
                reject(error.message);
            resolve(data);
        });
    });
};
exports.uploadImageToCloudinary = uploadImageToCloudinary;
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 3 * 1024 * 1024,
    },
    fileFilter(req, file, callback) {
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return callback(new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid file type.', [
                {
                    path: 'profileImg',
                    message: ' Only JPEG and PNG types are allowed.',
                },
            ]));
        }
        callback(null, true);
    },
});
