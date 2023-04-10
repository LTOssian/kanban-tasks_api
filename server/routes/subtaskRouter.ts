import express, { Router} from "express";
import { subTasksController } from "../controllers/subtask.controller";
// import { RequestSuperSet } from "../interfaces/interfaces";

export const subTaskRouter: Router = express.Router();

subTaskRouter.get('/', subTasksController.getAllByTasks)
subTaskRouter.get('/:id', subTasksController.getById)
subTaskRouter.post('/', subTasksController.postSubTask)
subTaskRouter.put('/:id', subTasksController.updateSubTask)
subTaskRouter.delete('/:id', subTasksController.deleteSubTask)