import { BoardTable } from "../interfaces/interfaces";
import { db } from "../database";

class BoardModel {
    async getAllFromDB(): Promise<BoardTable[]> {
        return await db
        .selectFrom('boards')
        .selectAll()
        .execute()
    }

    async getByIdFromDB(id: number): Promise<BoardTable[]> {
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

    async updateBoardOnDB(id: number, name: string) {
        return await db
        .updateTable('boards')
        .set({
            name: name
        })
        .where('boards.id', '=', id)
        .executeTakeFirstOrThrow()
    }

    async deleteBoardFromDB(id: number) {
        return (await db
        .deleteFrom('boards')
        .where('boards.id', '=', id)
        .executeTakeFirstOrThrow()
        )
    }
}

export const boardModel = new BoardModel(); 