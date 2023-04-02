import { Request, Response } from "express";
import { RequestSuperSet } from "../interfaces/interfaces";
import { columnModel } from "../models/columns.model";

export const columnsController = {
    getAllByBoard: async (req: RequestSuperSet, res: Response) => {
        try {
            const rows = await columnModel.getAllByBoardFromDB(Number(req.boardId));
            if (rows.length) {
                res.json({
                    data: rows
                }) 
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
    getById: async (req: RequestSuperSet, res: Response) => {
        const { id } = req.params;
        try {
            const row = await columnModel.getByIdFromDB(parseInt(id, 10), Number(req.boardId))
            if (row.id) {
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
    postColumn: async (req: RequestSuperSet, res: Response) => {
        const name = req.query. name as string;
        try {
            if (name) {
                await columnModel.postColumnToDB(name, Number(req.boardId))
                res.status(201).json();
            }
        } catch(err) {
            res.status(404).json({
                state: "error",
                error: err
            })
        }
    },
    updateColumn: async(req: RequestSuperSet, res: Response) => {
        const name = req.query. name as string;
        const { id } = req.params;
        try {
            if ( name ) {
                await columnModel.updateColumnOnDB(parseInt(id,10), name);
                res.json();
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
    deleteColumn: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await columnModel.deleteColumnFromDB(parseInt(id));
            res.status(204).json()
        } catch(err) {
            res.status(404).json({
                state: "error",
                error: err
            })
        }
    }
}