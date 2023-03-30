import express, { Router, Request, Response, NextFunction } from "express";
import { boardsController } from "../controllers/boards.controller";

export const boardsRouter: Router = express.Router();

boardsRouter.get("/", boardsController.getAll);

boardsRouter.get("/:id", boardsController.getById);

boardsRouter.post("/", boardsController.postBoard);

boardsRouter.put("/:id", boardsController.updateBoard);

boardsRouter.delete("/:id", boardsController.deleteBoard)