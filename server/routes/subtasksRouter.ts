import express, { Router} from "express";
import { subTasksController } from "../controllers/subtasks.controller";
// import { RequestSuperSet } from "../interfaces/interfaces";

export const subTasksRouter: Router = express.Router();

subTasksRouter.get('/', subTasksController.getAllByTasks)
