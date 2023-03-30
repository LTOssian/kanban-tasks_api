import { Request, Response } from "express";
import { pool } from "../database";
import { RequestSuperSet } from "../interfaces/interfaces";

const promisePool = pool.promise();

export const tasksController = {
    getAllByColumn: async (req: RequestSuperSet, res: Response) => {
        const [rows, _] = await promisePool.query(
            `SELECT t.id, t.title, t.description, t.status, COUNT(st.id) as subtasks_quantity FROM tasks t LEFT JOIN sub_tasks st ON t.id = st.task_id JOIN columns c ON t.column_id = c.id WHERE t.column_id = ${req.columnId} AND c.board_id = ${req.boardId} GROUP BY t.id`
        );
        if (rows[0]["id"] != null) {
            res.json({
                data: rows
            });
        } else {
            res.status(404).json({
                state: "error"
            });
        }
    },
    getById: async (req: RequestSuperSet, res: Response) => {
        const { id } = req.params;
        const [row, _] = await promisePool.query(
            `SELECT t.id, t.title, t.description, t.status, t.column_id from tasks t JOIN columns c ON t.column_id = c.id WHERE t.id = ${id} AND t.column_id = ${req.columnId} AND c.board_id = ${req.boardId}`
        );
        if (row.length) {
            res.json({
                data: row
            });
        } else {
            res.status(404).json({
                state: "error"
            });
        }
    },
    postTask: async (req: RequestSuperSet, res: Response) => {
        const { title, description } = req.query;
        if (title) {
            const [newRow, _] = await promisePool.query(
                `INSERT INTO tasks (title, description, column_id) VALUES ("${title}", "${description}", ${req.columnId})`
            )
            res.json({
                data: newRow
            })
        } else {
            res.status(404).json({
                state: "error"
            })
        }
    }

}