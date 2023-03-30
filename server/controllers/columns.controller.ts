import { Request, Response } from "express";
import { pool } from "../database";

const promisePool = pool.promise();

export const columnsController = {
    getAll: async (req: Request, res: Response) => {
        const [rows, _] = await promisePool.query(
            `SELECT * FROM columns`
        );

        if (rows.length) {
            res.json({
                data: rows
            });
        } else {
            res.status(404).json({
                state: "error"
            });
        }
    },
    
}