import express, { Router, Response, NextFunction } from "express";
import { boardsController } from "../controllers/boards.controller";
import { columnsRouter } from "./columnsRouter";
import { RequestSuperSet } from "../interfaces/interfaces";
export const boardsRouter: Router = express.Router();

boardsRouter.get("/", boardsController.getAll);
boardsRouter.get("/:id", boardsController.getById);
boardsRouter.post("/", boardsController.postBoard);
boardsRouter.put("/:id", boardsController.updateBoard);
boardsRouter.delete("/:id", boardsController.deleteBoard)

boardsRouter.use('/:boardId/columns', columnsRouter)
boardsRouter.param('boardId', (req: RequestSuperSet, res: Response, next: NextFunction, boardId) => {
    req.boardId = boardId;
    next();
})