import { Request } from "express";
import { Generated, MysqlDialect } from "kysely";

export interface RequestSuperSet extends Request {
    boardId ?: string;
    columnId ?: string;
    taskId ?: string
}

export interface BoardTable {
    id: Generated<number>
    name: string
}

