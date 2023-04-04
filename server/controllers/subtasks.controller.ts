import { Response, Request } from "express";
import { RequestSuperSet } from "../interfaces/interfaces";
import { subTaskModel } from "../models/subtasks.model";

export const subTasksController = {
    getAllByTasks: async (req: RequestSuperSet, res: Response) => {
        try {
            const rows = await subTaskModel.getAllByTasksFromDB(Number(req.taskId))
            res.json({
                data: rows
            })
        } catch(err) {
            res.status(404).json({
                state: "error",
                error: err
            })
        }
    },
    getById: async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const row = await subTaskModel.getByIdFromDB(parseInt(id, 10));
            res.json({
                data: row
            })
        } catch(err) {
            res.status(404).json({
                state: "error",
                error: err
            })
        }
    },
    postSubTask: async (req: RequestSuperSet, res: Response) => {
        const title = req.query. title as string;

        try {
            if (title) {
                await subTaskModel.postSubTaskToDB(title, Number(req.taskId));
                res.status(201).json();
            }
        } catch(err) {
            res.status(404).json({
                state: "error",
                error: err
            });
        }
    },
    updateSubTask: async (req: RequestSuperSet, res: Response) => {
        const title = req.query. title as string;
        const completed = req.query.completed ? true : false;
        const id = req.params.id;
        try {
            if(title) {
                await subTaskModel.updateSubTaskOnDB(parseInt(id, 10), title, completed);
                res.json();
            } else {
                res.status(404).json({
                    state: "error"
                })
            }
            
        } catch(err) {
            res.status(404).json({
                state: "error",
                error: err
            })
        }
    },
    deleteSubTask: async (req: RequestSuperSet, res: Response) => {
        const id = req.params.id
        try {
            await subTaskModel.deleteSubTask(parseInt(id, 10))
            res.status(204).json()
        } catch(err) {
            res.status(404).json({
                state: "error",
                error: err
            })
        }
    }

}