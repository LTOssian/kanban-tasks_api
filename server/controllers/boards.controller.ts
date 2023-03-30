import { Request, Response } from "express"

export const boardsController = {
    getAll: (req: Request, res: Response) => {
        try {
            res.json({
                message: "Get all boards"
            })
        } catch(err) {
            console.log(err)
        }
    }
}