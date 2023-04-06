import { Request, Response } from "express";
import { userModel } from "../models/user.model";

export const userController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const rows = await userModel.getAllFromDB();
            res.json({
                data: rows
            })
            
        } catch(err) {
            res.status(502).json({
                state: "DatabaseError",
                error: err
            })
        }
    },

    getById: async (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const row = await userModel.getByIdFromDB(id);
            row ? 
            res.json({
                data: row
            })
            : res.status(404).json({
                state: "error",
                error: "Not found"
            })
        } catch(err) {
            res.status(502).json({
                state: "DatabaseError",
                error: err
            })
        }
    },

    postUser: async (req: Request, res: Response) => {
        const email = req.query.email as string;
        const password = req.query.password as string;
        if (!email.length || !password.length) {
            res.status(404).json({
                state: "ValidationError",
                message: "email/password are required"
            })
        }
        try {
            await userModel.createUser(email, password);
            res.status(201).json()
        } catch(err) {
            res.status(502).json({
                state: "DatabaseError",
                error: err
            })
        }
    },

    updatePassword: async (req: Request, res: Response) => {
        const old_password = req.query.old_password as string;
        const new_password = req.query.new_password as string;
        const email = req.query.email as string;
        const id = req.params.id;
        try {
            if (email && new_password && old_password) {
                await userModel.patchUserFromDB(id, email, old_password, new_password)
                res.json()
            } else {
                res.status(404).json({
                    state: "ValidationError",
                    message: "Email / Password required"
                })
            }
        } catch(err) {
            res.status(502).json({
                state: "DatabaseError",
                error: err
            })
        }
    },

    postUserLogin: async (req: Request, res: Response) => {
        const password = req.query.password as string;
        const email = req.query.email as string;

        try {
            const user = await userModel.getByPasswordFromDB(email, password);
            res.json({
                data: user
            })
        } catch(err) {
            res.status(404).json({
                state: "ValidationError",
                error: err
            })
        }
    },

    deleteUser: async (req: Request, res: Response) => {
        const password = req.query.password as string;
        const id = req.params.id

        try {
            await userModel.deleteUserFromDB(id, password)
            res.status(204).json()
        } catch(err) {
            res.status(502).json({
                state: "DatabaseError",
                error: err
            })
        }
    }
}