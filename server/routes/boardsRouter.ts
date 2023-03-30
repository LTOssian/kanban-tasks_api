import express, { Router, Request, Response, NextFunction } from "express";
import { boardsController } from "../controllers/boards.controller";
import { columnsRouter } from "./columnsRouter";
import { boardIdRequest } from "../interfaces/interfaces";
export const boardsRouter: Router = express.Router();

boardsRouter.get("/", boardsController.getAll);

boardsRouter.get("/:id", boardsController.getById);

boardsRouter.post("/", boardsController.postBoard);

boardsRouter.put("/:id", boardsController.updateBoard);

boardsRouter.delete("/:id", boardsController.deleteBoard)

boardsRouter.use('/:boardId/tasks', columnsRouter)
boardsRouter.param('boardId', (req: boardIdRequest, res: Response, next: NextFunction, boardId) => {
    req.boardId = boardId;
    next();
})