import { Response } from "express";
import { RequestSuperSet } from "../interfaces/interfaces";
import { taskModel } from "../models/tasks.model";


export const tasksController = {
    getAllByColumn: async (req: RequestSuperSet, res: Response) => {
        try {
            const rows = await taskModel.getAllByColumnFromDB(Number(req.columnId));
            if (rows.length) {
                res.json({
                    data: rows
                });
            } else {
                res.status(404).json({
                    state: "error",
                });
            }
        } catch(err) {
            res.status(404).json({
                state: "error",
                error: err
            })
        }
    },
    getById: async (req: RequestSuperSet, res: Response) => {
        const { id } = req.params;
        try {
            const row = await taskModel.getByIdFromDB(parseInt(id, 10), Number(req.columnId))
            res.json({
                data: row
            });
        } catch(err) {
            res.status(404).json({
                state: "error",
                error: err
            })
        }
    },
    postTask: async (req: RequestSuperSet, res: Response) => {
        const title = req.query. title as string ;
        const description = req.query. description as string

        try {
            if (title) {
                await taskModel.postTaskToDB(title, description, Number(req.columnId))
                res.status(201).json();
            } else {
                res.status(404).json({
                    state: "error",
                })
            }
        } catch(err) {
            res.status(404).json({
                state: "error",
                error: err
            })
        }
    },
    updateTask: async (req: RequestSuperSet, res: Response) => {
        const id = req.params.id;
        const title = req.query. title as string;
        const description = req.query. description as string
        const status = req.query. status as string
        try {
            if (title) {
                await taskModel.updateTaskOnDB(parseInt(id, 10), title, description, Number(req.boardId), status)
                res.status(201).json({})
            } else {
                res.status(404).json({
                    state: "error",
                })
            }
        } catch(err) {
            res.status(404).json({
                state: "error",
                error: err
            })
        }
    },
    deleteTask: async (req: RequestSuperSet, res: Response) => {
        const { id } = req.params;
        const deletedRow = await taskModel.deleteTaskFromDB(parseInt(id, 10))
        res.status(204).json({
            data: deletedRow
        });
    },
}