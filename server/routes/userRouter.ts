import express, { Router } from "express";
import { userController } from "../controllers/user.controller";

export const userRouter: Router = express.Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getById);
userRouter.post('/signin', userController.postUser);
userRouter.post('/login', userController.postUserLogin);
userRouter.patch('/:id', userController.updatePassword);
userRouter.delete('/:id', userController.deleteUser);
