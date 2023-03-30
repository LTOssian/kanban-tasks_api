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
    getById: async (req: Request, res: Response) => {
        const { id } = req.params;
        const [row, _] = await promisePool.query(
            ` select c.*, count(t.id) as number_of_tasks from columns c join tasks t on c.id = t.column_id WHERE c.id = ${id}`
        );
        if (id == row[0]["id"]) {
            res.json({
                data: row
            })    
        } else {
            res.status(404).json({
                state: "error"
            });
        }
    }
}