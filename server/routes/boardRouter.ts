import express, { Router, Response, NextFunction } from "express";
import { boardController } from "../controllers/board.controller";
import { columnsRouter } from "./columnRouter";
import { RequestSuperSet } from "../interfaces/interfaces";

export const boardsRouter: Router = express.Router();

boardsRouter.get("/", boardController.getAll);
boardsRouter.get("/:id", boardController.getById);
boardsRouter.post("/", boardController.postBoard);
boardsRouter.put("/:id", boardController.updateBoard);
boardsRouter.delete("/:id", boardController.deleteBoard)

boardsRouter.use('/:boardId/columns', columnsRouter)
boardsRouter.param('boardId', (req: RequestSuperSet, res: Response, next: NextFunction, boardId) => {
    req.body.boardId = boardId;
    next();
})