import express, { Router } from "express";
import { columnsController } from "../controllers/columns.controller";

export const columnsRouter: Router = express.Router();

columnsRouter.get("/", columnsController.getAll);
columnsRouter.get("/:id", columnsController.getById);
columnsRouter.post("/", columnsController.postColumn);