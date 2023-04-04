import { Request } from "express";
import { Generated } from "kysely";

export interface RequestSuperSet extends Request {
    boardId ?: number;
    columnId ?: number;
    taskId ?: number;
}

export interface BoardTable {
    id: Generated<number> | number;
    name: string;
}

export interface ColumnTable {
    id: Generated<number> | number;
    name: string;
    board_id: number;
}

export interface TaskTable {
    id: Generated<number> | number;
    title: string;
    description: string | null;
    status: string | null;
    column_id: number;
}

export interface SubTaskTable {
    id: Generated<number> | number;
    title: string;
    complete_status: 0 | 1;
    task_id: number;
}

export interface UserTable {
    id: Generated<string> | string;
    email: string;
    password: string;
    data_created: string;
}

export interface Database {
    user: UserTable;
    board: BoardTable;
    column: ColumnTable;
    task: TaskTable;
    sub_task: SubTaskTable;
}