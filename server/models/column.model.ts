import { ColumnTable } from "../interfaces/interfaces";
import { db } from "../database";

class ColumnModel {
    async getAllByBoardFromDB(boardId: number): Promise<ColumnTable[]> {
        return await db
        .selectFrom('column')
        .selectAll()
        .where('board_id', '=', boardId)
        .execute()
    }

    async getByIdFromDB(id: number, boardId: number): Promise<ColumnTable> {
        return await db
        .selectFrom('column')
        .selectAll()
        .where(({ and, cmpr }) => and([
            cmpr('id', '=', id),
            cmpr('column.board_id', '=', boardId)
          ]))
        .executeTakeFirstOrThrow()
    }

    async postColumnToDB(name: string, boardId: number) {
        return await db
        .insertInto('column')
        .values({
            name: name,
            board_id: boardId
        })
        .executeTakeFirstOrThrow()
    }

    async updateColumnOnDB(id: number, name: string) {
        return await db
        .updateTable('column')
        .set({
            name: name
        })
        .where('column.id', '=', id)
        .executeTakeFirstOrThrow()
    }

    async deleteColumnFromDB(id: number) {
        return await db
        .deleteFrom('column')
        .where('column.id', '=', id)
        .executeTakeFirstOrThrow()
    }
}

export const columnModel = new ColumnModel();