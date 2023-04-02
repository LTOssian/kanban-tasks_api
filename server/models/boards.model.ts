import { BoardTable } from "../interfaces/interfaces";
import { db } from "../database";

class BoardModel {
    async getAllFromDB(): Promise<BoardTable[]> {
        return await db
        .selectFrom('boards')
        .selectAll()
        .execute()
    }

    async getByIdFromDB(id: number) {
        return await db
        .selectFrom('boards')
        .selectAll()
        .where('id', '=', id)
        .execute()
    }

    async postBoardToDB(name: string) {
        return await db
        .insertInto('boards')
        .values({
            name: name
        })
        .executeTakeFirstOrThrow()
    }
}

export const boardModel = new BoardModel(); 