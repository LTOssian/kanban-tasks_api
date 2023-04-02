import { Request, Response } from "express";
import { boardModel } from "../models/boards.model";

export const boardsController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const rows = await boardModel.getAllFromDB();
            if (rows.length) {
                res.json({
                    data: rows
                }) 
            }
        } catch(err) {
            res.status(404).json({
                state: "error",
                error: err
            })
        }
    },
    getById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const row = await boardModel.getByIdFromDB(parseInt(id, 10));
            if (row.length) {
                res.json({
                    data: row
                });
            } else {
                res.status(404).json({
                    state: "error"
                });
            }
        } catch(err) {
            res.status(404).json({
                state: "error",
                error: err
            })
        }

    },
    postBoard: async (req: Request, res: Response) => {
        const name = req.query. name as string;
        try {
            if (name) {
                const newRow = await boardModel.postBoardToDB(name)
                res.status(201).json({
                    data: newRow
                });
            }
        } catch(err) {
            res.status(404).json({
                state: "error",
                error: err
            })
        }
    },
    updateBoard: async (req: Request, res: Response) => {
        const name = req.query. name as string;
        const { id } = req.params;
        try {
            if (name) {
                const updatedRow = await boardModel.updateBoardOnDB(parseInt(id, 10), name);
                res.json({
                    data: updatedRow
                })
            } 
        } catch(err) {
            res.status(404).json({
                state: "error",
                error: err
            });
        }
    },
    deleteBoard: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const deletedRow = await boardModel.deleteBoardFromDB(parseInt(id, 10));
            res.status(204).json({
                data: deletedRow
            })
    
        } catch(err) {
            res.status(404).json({
                state: "error",
                error: err
            });
        }
    }
}