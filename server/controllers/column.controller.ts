import { Request, Response } from "express";
import { RequestSuperSet } from "../interfaces/interfaces";
import { columnModel } from "../models/column.model";

export const columnsController = {
    getAllByBoard: async (req: RequestSuperSet, res: Response) => {
        try {
            const rows = await columnModel.getAllByBoardFromDB(Number(req.body.boardId));
            res.json({
                data: rows
            }) 
        } catch(err) {
            res.status(500).json({
                state: "DatabaseError",
                error: err
            })
        }
    },
    getById: async (req: RequestSuperSet, res: Response) => {
        const { id } = req.params;
        try {
            const row = await columnModel.getByIdFromDB(parseInt(id, 10), Number(req.body.boardId))
            res.json({
                data: row
            });
        } catch(err) {
            res.status(500).json({
                state: "DatabaseError",
                error: err
            })
        } 
    },
    postColumn: async (req: RequestSuperSet, res: Response) => {
        const name = req.query. name as string;
        try {
            if (name) {
                await columnModel.postColumnToDB(name, Number(req.body.boardId))
                res.status(201).json();
            } else {
                res.status(404).json({
                    state: "ValidationError",
                    message: "name is required"
                })
            }
        } catch(err) {
            res.status(500).json({
                state: "DatabaseError",
                error: err
            })
        }
    },
    updateColumn: async(req: Request, res: Response) => {
        const name = req.query. name as string;
        const { id } = req.params;
        try {
            if ( name ) {
                await columnModel.updateColumnOnDB(parseInt(id,10), name);
                res.json();
            } else {
                res.status(404).json({
                    state: "ValidationError",
                    message: "name is required"
                })
            } 
        } catch(err) {
            res.status(500).json({
                state: "DatabaseError",
                error: err
            })
        }
    },
    deleteColumn: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await columnModel.deleteColumnFromDB(parseInt(id));
            res.status(204).json()
        } catch(err) {
            res.status(500).json({
                state: "DatabaseError",
                error: err
            })
        }
    }
}