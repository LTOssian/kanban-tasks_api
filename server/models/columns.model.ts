import { ColumnTable } from "../interfaces/interfaces";
import { db } from "../database";

class ColumnModel {
    async getAllByBoardFromDB(board_id: number): Promise<ColumnTable[]> {
        return await db
        .selectFrom('columns')
        .selectAll()
        .where('board_id', '=', board_id)
        .execute()
    }

    async getByIdFromDB(id: number, boardId: number): Promise<ColumnTable> {
        return await db
        .selectFrom('columns')
        .selectAll()
        .where(({ and, cmpr }) => and([
            cmpr('id', '=', id),
            cmpr('columns.board_id', '=', boardId)
          ]))
        .executeTakeFirstOrThrow()
    }

    async postColumnToDB(name: string, boardId: number) {
        return await db
        .insertInto('columns')
        .values({
            name: name,
            board_id: boardId
        })
        .executeTakeFirstOrThrow()
    }

    async updateColumnOnDB(id: number, name: string) {
        return await db
        .updateTable('columns')
        .set({
            name: name
        })
        .where('columns.id', '=', id)
        .executeTakeFirstOrThrow()
    }

    async deleteColumnFromDB(id: number) {
        return await db
        .deleteFrom('columns')
        .where('columns.id', '=', id)
        .executeTakeFirstOrThrow()
    }
}

export const columnModel = new ColumnModel();