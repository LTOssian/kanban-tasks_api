import express, { Router } from "express";
import { columnsController } from "../controllers/columns.controller";

export const columnsRouter: Router = express.Router();

columnsRouter.get("/", columnsController.getAll);