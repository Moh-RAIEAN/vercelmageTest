"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const uploadImageToCloudinary_1 = require("../../utils/uploadImageToCloudinary");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const AuthRoutes = (0, express_1.Router)();
exports.AuthRoutes = AuthRoutes;
AuthRoutes.post('/signup', uploadImageToCloudinary_1.upload.single('profileImg'), (req, _, next) => {
    var _a;
    const parsedUser = JSON.parse((_a = req.body) === null || _a === void 0 ? void 0 : _a.user);
    req.body = parsedUser;
    next();
}, (0, validateRequest_1.default)(auth_validation_1.AuthValidations.createUserValidationZodSchema), auth_controller_1.AuthControllers.createUser);
AuthRoutes.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidations.loginValidationZodSchema), auth_controller_1.AuthControllers.loginUser);
