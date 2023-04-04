import { BoardTable } from "../interfaces/interfaces";
import { db } from "../database";

class BoardModel {
    async getAllFromDB(): Promise<BoardTable[]> {
        return await db
        .selectFrom('board')
        .selectAll()
        .execute()
    }

    async getByIdFromDB(id: number): Promise<BoardTable[]> {
        return await db
        .selectFrom('board')
        .selectAll()
        .where('id', '=', id)
        .execute()
    }

    async postBoardToDB(name: string) {
        return await db
        .insertInto('board')
        .values({
            name: name
        })
        .executeTakeFirstOrThrow()
    }

    async updateBoardOnDB(id: number, name: string) {
        return await db
        .updateTable('board')
        .set({
            name: name
        })
        .where('board.id', '=', id)
        .executeTakeFirstOrThrow()
    }

    async deleteBoardFromDB(id: number) {
        return (await db
        .deleteFrom('board')
        .where('board.id', '=', id)
        .executeTakeFirstOrThrow()
        )
    }
}

export const boardModel = new BoardModel(); 