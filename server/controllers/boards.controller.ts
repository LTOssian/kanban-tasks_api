import { Request, Response } from "express";
import { pool } from "../database";

const promisePool = pool.promise();

export const boardsController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const [rows, fields] = await promisePool.query("SELECT * FROM boards");
            res.json({
                data: rows
            })
        } catch(err) {
            console.log(err)
        }
    },
}