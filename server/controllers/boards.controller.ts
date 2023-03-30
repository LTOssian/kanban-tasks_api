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
        const [rows, _] = await promisePool.query(
            `SELECT * FROM boards WHERE id = ${id}`
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
    postBoard: async (req: Request, res: Response) => {
        const { name } = req.body
        const sqlQuery = `INSERT INTO boards (name) values (${name})`

        const [rows, _] = await promisePool.query(sqlQuery);
        res.json({
            data: rows
        })
    }
}