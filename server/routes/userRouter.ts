import express, { Response, NextFunction, Router } from "express";
import { userController } from "../controllers/user.controller";
import { RequestSuperSet } from "../interfaces/interfaces";
import { boardsRouter } from "./boardsRouter";

export const userRouter: Router = express.Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getById);
userRouter.post('/signin', userController.postUser);
userRouter.post('/login', userController.postUserLogin);
userRouter.patch('/:id', userController.updatePassword);
userRouter.delete('/:id', userController.deleteUser);

userRouter.use("/:userId/boards", boardsRouter)
userRouter.param('userId', (req: RequestSuperSet, res: Response, next: NextFunction, userId) => {
    req.body.userId = userId;
    next();
})