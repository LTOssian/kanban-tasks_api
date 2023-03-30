import express, { Router } from "express";
import { tasksController } from "../controllers/tasks.controller";

export const tasksRouter: Router = express.Router();

tasksRouter.get("/", tasksController.getAllByColumn);
tasksRouter.get("/:id", tasksController.getById);
tasksRouter.post("/", tasksController.postTask);