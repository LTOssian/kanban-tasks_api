import { Request } from "express";

export interface boardNameRequest extends Request {
    name ?: string;
}