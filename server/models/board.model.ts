import { BoardTable } from "../interfaces/interfaces";
import { db } from "../database";

class BoardModel {
    async getAllFromDB(userId: string): Promise<BoardTable[]> {
        return await db
        .selectFrom('board')
        .selectAll()
        .where('user_id', '=', userId)
        .execute()
    }

    async getByIdFromDB(id: number, userId: string): Promise<BoardTable> {
        return await db
        .selectFrom('board')
        .selectAll()
        .where(({ and, cmpr}) => and([
            cmpr('id', '=', id),
            cmpr('user_id', '=', userId)
        ]))
        .executeTakeFirst() as BoardTable
    }

    async postBoardToDB(name: string, userId: string) {
        return await db
        .insertInto('board')
        .values({
            name: name,
            user_id: userId
        })
        .executeTakeFirstOrThrow()
    }

    async updateBoardOnDB(id: number, name: string, userId: string) {
        return await db
        .updateTable('board')
        .set({
            name: name
        })
        .where(({ and, cmpr}) => and([
            cmpr('id', '=', id),
            cmpr('user_id', '=', userId)
        ]))
        .executeTakeFirstOrThrow()
    }

    async deleteBoardFromDB(id: number, userId: string) {
        return (await db
        .deleteFrom('board')
        .where(({ and, cmpr}) => and([
            cmpr('id', '=', id),
            cmpr('user_id', '=', userId)
        ]))
        .executeTakeFirstOrThrow()
        )
    }
}

export const boardModel = new BoardModel(); 