import { Request } from "express";

export interface RequestSuperSet extends Request {
    boardId ?: string;
    columnId ?: string;
    taskId ?: string
}