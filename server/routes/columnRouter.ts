import express, { NextFunction, Router, Response } from "express";
import { columnsController } from "../controllers/column.controller";
import { RequestSuperSet } from "../interfaces/interfaces";
import { taskRouter } from "./taskRouter";

export const columnRouter: Router = express.Router();

columnRouter.get("/", columnsController.getAllByBoard);
columnRouter.get("/:id", columnsController.getById);
columnRouter.post("/", columnsController.postColumn);
columnRouter.put("/:id", columnsController.updateColumn);
columnRouter.delete("/:id", columnsController.deleteColumn);

columnRouter.use('/:columnId/tasks', taskRouter);
columnRouter.param('columnId', (req: RequestSuperSet, res: Response, next: NextFunction, columnId) => {
    req.body.columnId = columnId;
    next();
})
