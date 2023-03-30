import { Request, Response } from "express";
import { pool } from "../database";
import { columnIdRequest } from "../interfaces/interfaces";

const promisePool = pool.promise();

export const tasksController = {
    
}