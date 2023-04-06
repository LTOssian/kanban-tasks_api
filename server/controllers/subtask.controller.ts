import { Response, Request } from "express";
import { RequestSuperSet } from "../interfaces/interfaces";
import { subTaskModel } from "../models/subtask.model";

export const subTasksController = {
    getAllByTasks: async (req: RequestSuperSet, res: Response) => {
        try {
            const rows = await subTaskModel.getAllByTasksFromDB(Number(req.body.taskId));
            res.json({
                data: rows
            });
        } catch(err) {
            res.status(500).json({
                state: "DatabaseError",
                error: err
            });
        }
    },
    getById: async (req: RequestSuperSet, res: Response) => {
        const id = req.params.id;
        try {
            const row = await subTaskModel.getByIdFromDB(parseInt(id, 10), Number(req.body.taskId)); 
            res.json({
                data: row
            });
        } catch(err) {
            res.status(500).json({
                state: "DatabaseError",
                error: err
            });
        }
    },
    postSubTask: async (req: RequestSuperSet, res: Response) => {
        const title = req.query. title as string;
        if (!title.length) {
            res.status(404).json({
                state: "ValidationError",
                message: "title is required"
            });
        }
        try {
            await subTaskModel.postSubTaskToDB(title, Number(req.body.taskId));
            res.status(201).json();
        } catch(err) {
            res.status(500).json({
                state: "DatabaseError",
                error: err
            });
        }
    },
    updateSubTask: async (req: Request, res: Response) => {
        const title = req.query. title as string;
        const completed = req.query.completed ? true : false;
        const id = req.params.id;
        try {
            if(title) {
                await subTaskModel.updateSubTaskOnDB(parseInt(id, 10), title, completed, Number(req.body.taskId));
                res.json();
            } else {
                res.status(404).json({
                    state: "ValidationError",
                    message: "title is required"
                });
            }
        } catch(err) {
            res.status(500).json({
                state: "DatabaseError",
                error: err
            });
        }
    },
    deleteSubTask: async (req: RequestSuperSet, res: Response) => {
        const id = req.params.id;
        try {
            await subTaskModel.deleteSubTask(parseInt(id, 10), Number(req.body.taskId));
            res.status(204).json();
        } catch(err) {
            res.status(500).json({
                state: "DatabaseError",
                error: err
            });
        }
    }

}