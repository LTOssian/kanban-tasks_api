import express, { Router, Response, NextFunction } from "express";
import { boardController } from "../controllers/board.controller";
import { columnRouter } from "./columnRouter";
import { RequestSuperSet } from "../interfaces/interfaces";

export const boardRouter: Router = express.Router();

boardRouter.get("/", boardController.getAll);
boardRouter.get("/:id", boardController.getById);
boardRouter.post("/", boardController.postBoard);
boardRouter.put("/:id", boardController.updateBoard);
boardRouter.delete("/:id", boardController.deleteBoard)

boardRouter.use('/:boardId/columns', columnRouter)
boardRouter.param('boardId', (req: RequestSuperSet, res: Response, next: NextFunction, boardId) => {
    req.body.boardId = boardId;
    next();
})