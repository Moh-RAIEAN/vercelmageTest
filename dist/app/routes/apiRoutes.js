"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = require("../modules/Auth/auth.route");
const user_routes_1 = __importDefault(require("../modules/User/user.routes"));
const apiRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_routes_1.default,
    },
];
exports.default = apiRoutes;
