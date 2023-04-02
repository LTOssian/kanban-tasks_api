import { TasksTable } from "../interfaces/interfaces";
import { db } from "../database";

class TaskModel {
    async getAllByColumnFromDB (columnId: number): Promise<TasksTable[]> {
        return await db
        .selectFrom('tasks')
        .selectAll()
        .where('column_id', '=', columnId)
        .execute()
    }

    async getByIdFromDB(id: number, columnId: number, boardId: number): Promise<TasksTable> {
        return await db
        .selectFrom('tasks')
        .selectAll()
        .where(({ and, cmpr}) => and([
            cmpr('id', '=', id),
            cmpr('tasks.column_id', '=', columnId)
        ]))
        .executeTakeFirstOrThrow()
    }
}

export const taskModel = new TaskModel();