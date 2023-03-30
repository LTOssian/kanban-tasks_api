import { Request, Response } from "express";
import { pool } from "../database";
import { boardIdRequest } from "../interfaces/interfaces";

const promisePool = pool.promise();

export const columnsController = {
    getAll: async (req: boardIdRequest, res: Response) => {
        const [rows, _] = await promisePool.query(
            `SELECT c.name, c.id, c.board_id, COUNT(t.id) as tasks_quantity FROM columns c LEFT JOIN tasks t ON c.id = t.column_id WHERE c.board_id = ${req.boardId} GROUP BY c.id;`
        );
        if (rows[0]["id"] != null) {
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
    },
    postColumn: async (req: boardIdRequest, res: Response) => {
        const { status } = req.query;
        if (status) {
            const [newRow, _] = await promisePool.query(
                `INSERT INTO columns (id, name, board_id) VALUES (NULL, '${status}', '${req.boardId}');`
            );
            res.status(201).json({
                data: newRow
            });
        } else {
            res.status(404).json({
                state: "error"
            });
        }
    },
}