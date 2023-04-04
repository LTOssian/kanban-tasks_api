import express, { Router} from "express";
import { subTasksController } from "../controllers/subtask.controller";
// import { RequestSuperSet } from "../interfaces/interfaces";

export const subTasksRouter: Router = express.Router();

subTasksRouter.get('/', subTasksController.getAllByTasks)
subTasksRouter.get('/:id', subTasksController.getById)
subTasksRouter.post('/', subTasksController.postSubTask)
subTasksRouter.put('/:id', subTasksController.updateSubTask)
subTasksRouter.delete('/:id', subTasksController.deleteSubTask)