import { Request, Response } from "express";
import { pool } from "../database";

const promisePool = pool.promise();

export const boardsController = {
    getAll: async (req: Request, res: Response) => {
        const [rows, _] = await promisePool.query(
            `SELECT * FROM boards`
        );

        if (rows.length) {
            res.json({
                data: rows
            })
        } else {
            res.status(404).json({
                state: "error"
            })
        }
    },
    getById: async (req: Request, res: Response) => {

        const { id } = req.params
        const [row, _] = await promisePool.query(
            `SELECT * FROM boards WHERE id = ${id}`
        );

        if (row.length) {
            res.json({
                data: row
            })
        } else {
            res.status(404).json({
                state: "error"
            })
        }
    },
    postBoard: async (req: Request, res: Response) => {
        const { name } = req.query
        if (name) {
            const sqlQuery = `INSERT INTO boards (id, name) VALUES (null,"${name}")`
            const [newRow, _] = await promisePool.query(sqlQuery);    
            res.status(201).json({
                data: newRow
            })
        } else {
            res.status(404).json({
                state: "error"
            })
        }
    }
}