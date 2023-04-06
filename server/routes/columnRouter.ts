import express, { NextFunction, Router, Response } from "express";
import { columnsController } from "../controllers/column.controller";
import { RequestSuperSet } from "../interfaces/interfaces";
import { tasksRouter } from "./taskRouter";

export const columnsRouter: Router = express.Router();

columnsRouter.get("/", columnsController.getAllByBoard);
columnsRouter.get("/:id", columnsController.getById);
columnsRouter.post("/", columnsController.postColumn);
columnsRouter.put("/:id", columnsController.updateColumn);
columnsRouter.delete("/:id", columnsController.deleteColumn);

columnsRouter.use('/:columnId/tasks', tasksRouter);
columnsRouter.param('columnId', (req: RequestSuperSet, res: Response, next: NextFunction, columnId) => {
    req.body.columnId = columnId;
    next();
})
