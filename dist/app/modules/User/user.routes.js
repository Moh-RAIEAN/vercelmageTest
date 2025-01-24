"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_controller_1 = require("./user.controller");
const UserRouter = (0, express_1.Router)();
UserRouter.get('/', (0, auth_1.default)(), user_controller_1.UserControllers.getAllUsers);
UserRouter.get('/profile', (0, auth_1.default)(), user_controller_1.UserControllers.getUserProfile);
exports.default = UserRouter;
