import express, { NextFunction, Router, Response } from "express";
import { tasksController } from "../controllers/tasks.controller";
import { RequestSuperSet } from "../interfaces/interfaces";
import { subTasksRouter } from "./subtasksRouter";

export const tasksRouter: Router = express.Router();

tasksRouter.get("/", tasksController.getAllByColumn);
tasksRouter.get("/:id", tasksController.getById);
tasksRouter.post("/", tasksController.postTask);
tasksRouter.put("/:id", tasksController.updateTask);
tasksRouter.delete("/:id", tasksController.deleteTask);
// tasksRouter.patch("/:id", tasksController.patchTask);

tasksRouter.use('/:taskId/subtasks', subTasksRouter);
tasksRouter.param('taskId', (req: RequestSuperSet, res: Response, next: NextFunction, taskId) => {
    req.body.taskId = taskId;
    next();
})