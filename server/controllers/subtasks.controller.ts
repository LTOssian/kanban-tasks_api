import { Request, Response } from "express";
import { pool } from "../database";
import { RequestSuperSet } from "../interfaces/interfaces";

const promisePool = pool.promise();

export const subTasksController = {

}