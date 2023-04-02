import { Response } from "express";
import { promisePool } from "../database";
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
        const { title, description } = req.query;
        if (title) {
            const [newRow] = await promisePool.query(
                "INSERT INTO `tasks` (`title`, `description`,`column_id`) VALUES (?, ?, ?)", [title, description, req.columnId] 
            ) 
            res.json({
                data: newRow
            })
        } else {
            res.status(404).json({
                state: "error"
            })
        }
    },
    updateTask: async (req: RequestSuperSet, res: Response) => {
        const { id } = req.params;
        const { title, description, status } = req.query;
        if (title && status) {
            const [updatedRow] = await promisePool.query(
                `UPDATE tasks SET title="${title}", status="${status}", description="${description}" WHERE id = ${id} AND column_id = ${req.columnId}`
            )

            if (updatedRow['changedRows']) {
                res.json({
                    data: updatedRow
                });
            } else {
                res.status(404).json({
                    state: "error"
                });    
            }
        } else {
            res.status(404).json({
                state: "error"
            });
        }
    },
    deleteTask: async (req: RequestSuperSet, res: Response) => {
        const { id } = req.params;
        const [deletedRow] = await promisePool.query(
            `DELETE FROM tasks WHERE id=${id}`
        );
        res.status(204).json({
            data: deletedRow
        });
    },
}