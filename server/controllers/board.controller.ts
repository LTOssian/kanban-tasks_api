import { Request, Response } from "express";
import { boardModel } from "../models/board.model";

export const boardController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const rows = await boardModel.getAllFromDB();
            res.json({
                data: rows
            })
        } catch(err) {
            res.status(502).json({
                state: "DatabaseError",
                error: err
            })
        }
    },
    getById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const row = await boardModel.getByIdFromDB(parseInt(id, 10));
            res.json({
                data: row
            });
        } catch(err) {
            res.status(502).json({
                state: "DatabaseError",
                error: err
            })
        }

    },
    postBoard: async (req: Request, res: Response) => {
        const name = req.query. name as string;
        try {
            if (name) {
                await boardModel.postBoardToDB(name)
                res.status(201).json();
            } else {
                res.status(404).json({
                    state: "ValidationError",
                    message: "name is required"
                })
            }
        } catch(err) {
            res.status(502).json({
                state: "DatabaseError",
                error: err
            })
        }
    },
    updateBoard: async (req: Request, res: Response) => {
        const name = req.query. name as string;
        const { id } = req.params;
        try {
            if (name) {
                await boardModel.updateBoardOnDB(parseInt(id, 10), name);
                res.json()
            } else {
                res.status(404).json({
                    state: "ValidationError",
                    message: "name is required"
                })
            }
        } catch(err) {
            res.status(502).json({
                state: "DatabaseError",
                error: err
            });
        }
    },
    deleteBoard: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await boardModel.deleteBoardFromDB(parseInt(id, 10));
            res.status(204).json({})
        } catch(err) {
            res.status(502).json({
                state: "DatabaseError",
                error: err
            });
        }
    }
}