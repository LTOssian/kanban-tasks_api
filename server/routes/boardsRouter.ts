import express, { Express, Router } from "express";

export const boardsRouter: Router = express.Router();

const boardsController = require('../controllers/boards.controller');

boardsRouter.get("/", boardsController.getAll);
