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
    }

}