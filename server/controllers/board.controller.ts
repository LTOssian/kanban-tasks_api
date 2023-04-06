import { Request, Response } from "express";
import { boardModel } from "../models/board.model";
import { RequestSuperSet } from "../interfaces/interfaces";

export const boardController = {
    getAll: async (req: RequestSuperSet, res: Response) => {
        try {
            const rows = await boardModel.getAllFromDB(req.body.userId);
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
            const row = await boardModel.getByIdFromDB(parseInt(id, 10), req.body.userId);
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
        if (!name.length) {
            return res.status(404).json({
                state: "ValidationError",
                message: "name is required"
            })
        }

        try {
            await boardModel.postBoardToDB(name, req.body.userId)
            res.status(201).json();
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

        if (!name.length) {
            res.status(404).json({
                state: "ValidationError",
                message: "name is required"
            })
        }

        try {
            await boardModel.updateBoardOnDB(parseInt(id, 10), name, req.body.userId);
            res.json()
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
            await boardModel.deleteBoardFromDB(parseInt(id, 10), req.body.userId);
            res.status(204).json({})
        } catch(err) {
            res.status(502).json({
                state: "DatabaseError",
                error: err
            });
        }
    }
}