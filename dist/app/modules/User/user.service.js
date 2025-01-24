"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = __importDefault(require("./user.model"));
const getUserProfileFromDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    const user = yield user_model_1.default.findOne({ email });
    const isUserExist = user === null || user === void 0 ? void 0 : user._id;
    if (!isUserExist)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found', [
            { path: 'email', message: 'User not found' },
        ]);
    return user;
});
const getAllUsersFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = query;
    let getAllUsersQuery = {};
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
    const allUsers = yield user_model_1.default.find(getAllUsersQuery);
    if (!allUsers.length)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Users not found');
    return allUsers;
});
exports.UserServices = { getUserProfileFromDb, getAllUsersFromDb };
