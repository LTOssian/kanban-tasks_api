import { Request } from "express";

export interface boardIdRequest extends Request {
    boardId ?: string;
}
export interface columnIdRequest extends Request {
    columnId ?: string;
}