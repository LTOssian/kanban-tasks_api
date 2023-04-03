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

    async getByIdFromDB(id: number, columnId: number): Promise<TasksTable> {
        return await db
        .selectFrom('tasks')
        .selectAll()
        .where(({ and, cmpr}) => and([
            cmpr('id', '=', id),
            cmpr('tasks.column_id', '=', columnId)
        ]))
        .executeTakeFirstOrThrow()
    }

    async getStatusFromDB(columnId: number) {
        return await db.selectFrom('columns')
        .select('name')
        .where('id', '=', columnId)
        .executeTakeFirst()
    }

    async postTaskToDB(title: string, description:string, columnId: number) {
        const status = await this.getStatusFromDB(columnId)

        return await db
        .insertInto('tasks')
        .values({
            title: title,
            description: description,
            status: status?.name,
            column_id: columnId,
        })
        .executeTakeFirstOrThrow()
    }

    async updateColumnID(boardId: number, status: string) {
        return await db
        .selectFrom('columns')
        .selectAll()
        .where(({ and, cmpr}) => and([
            cmpr('name', '=', status),
            cmpr('board_id', '=', boardId)
        ]))
        .executeTakeFirstOrThrow();
    }

    async updateTaskOnDB(id: number, title: string, description: string, boardId: number, status: string) {
        const columnId = (await this.updateColumnID(boardId, status)).id
        const statusUpdated = await this.getStatusFromDB(columnId)

        return await db
        .updateTable('tasks')
        .set({
            title: title,
            description: description,
            column_id: columnId,
            status: statusUpdated?.name
        })
        .where("id", "=", id)
        .executeTakeFirstOrThrow()
    }

    async deleteTaskFromDB(id: number) {
        return await db
        .deleteFrom('tasks')
        .where('tasks.id', '=', id)
        .executeTakeFirstOrThrow()
    }
}

export const taskModel = new TaskModel();