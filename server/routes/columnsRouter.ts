import express, { NextFunction, Router, Response } from "express";
import { columnsController } from "../controllers/columns.controller";
import { columnIdRequest } from "../interfaces/interfaces";
import { tasksRouter } from "./tasksRouter";

export const columnsRouter: Router = express.Router();

columnsRouter.get("/", columnsController.getAll);

columnsRouter.get("/:id", columnsController.getById);

columnsRouter.post("/", columnsController.postColumn);

columnsRouter.put("/:id", columnsController.updateColumn);

columnsRouter.delete("/:id", columnsController.deleteColumn);

columnsRouter.use('/:columnId/tasks', tasksRouter);
columnsRouter.param('columnId', (req: columnIdRequest, res: Response, next: NextFunction, columnId) => {
    req.columnId = columnId;
    next();
})