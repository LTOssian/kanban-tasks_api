import { Request } from "express";
import { Generated, MysqlDialect } from "kysely";

export interface RequestSuperSet extends Request {
    boardId ?: string;
    columnId ?: string;
    taskId ?: string;
}

export interface BoardTable {
    id: Generated<number>;
    name: string;
}

export interface ColumnTable {
    id: Generated<number>;
    name: string;
    board_id: number;
}

export interface TasksTable {
    id: Generated<number>;
    title: string;
    description: string | null;
    status: string | null;
    column_id: number;
}