import express, { NextFunction, Router, Response } from "express";
import { tasksController } from "../controllers/task.controller";
import { RequestSuperSet } from "../interfaces/interfaces";
import { subTaskRouter } from "./subtaskRouter";

export const taskRouter: Router = express.Router();

taskRouter.get("/", tasksController.getAllByColumn);
taskRouter.get("/:id", tasksController.getById);
taskRouter.post("/", tasksController.postTask);
taskRouter.put("/:id", tasksController.updateTask);
taskRouter.delete("/:id", tasksController.deleteTask);

taskRouter.use('/:taskId/subtasks', subTaskRouter);
taskRouter.param('taskId', (req: RequestSuperSet, res: Response, next: NextFunction, taskId) => {
    req.body.taskId = taskId;
    next();
})