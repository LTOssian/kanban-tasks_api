import { Request } from "express";

export interface boardIdRequest extends Request {
    boardId ?: string;
}