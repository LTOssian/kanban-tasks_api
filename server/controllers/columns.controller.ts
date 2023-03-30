import { Request, Response } from "express";
import { pool } from "../database";
import { RequestSuperSet } from "../interfaces/interfaces";

const promisePool = pool.promise();

export const columnsController = {
    getAllByBoard: async (req: RequestSuperSet, res: Response) => {
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
    postColumn: async (req: RequestSuperSet, res: Response) => {
        const { name } = req.query;
        if (name) {
            const [newRow, _] = await promisePool.query(
                `INSERT INTO columns (name, board_id) VALUES ('${name}', '${req.boardId}');`
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
    updateColumn: async(req: RequestSuperSet, res: Response) => {
        const { name } = req.query;
        const { id } = req.params;
        if ( name ) {
            const [updateRow, _] = await promisePool.query(
                `UPDATE columns SET name="${name}" WHERE id = ${id} AND board_id = ${req.boardId}`
            );
            res.json({
                data: updateRow
            });
        } else {
            res.status(404).json({
                state: "error"
            });
        }
    },
    deleteColumn: async (req: Request, res: Response) => {
        const { id } = req.params;
        const [deletedRow, _]= await promisePool.query(
            `DELETE FROM columns WHERE id=${id}`
        );
        res.status(204).json({
            data:deletedRow
        })
    }
}