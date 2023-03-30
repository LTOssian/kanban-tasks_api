import express, { Router, Request, Response } from "express";
import { boardsController } from "../controllers/boards.controller";

export const boardsRouter: Router = express.Router();

boardsRouter.get("/", boardsController.getAll);
