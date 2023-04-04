import { SubTasksTable } from "../interfaces/interfaces";
import { db } from "../database";

class SubTaskModel {
    async getAllByTasksFromDB (taskId: number): Promise<SubTasksTable[]> {
        return await db
        .selectFrom('sub_tasks')
        .selectAll()
        .where('task_id', '=', taskId)
        .execute()
    }

    async getByIdFromDB (id: number): Promise<SubTasksTable> {
        return await db
        .selectFrom('sub_tasks')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirstOrThrow()
    }

    async postSubTaskToDB (title: string, taskId: number) {
        return await db
        .insertInto('sub_tasks')
        .values({
            title: title,
            complete_status: 0,
            task_id: taskId
        })
        .executeTakeFirstOrThrow()
    }

    async updateSubTaskOnDB(id: number, title: string, complete_status: boolean) {
        return await db
        .updateTable('sub_tasks')
        .set({
            title: title,
            complete_status: complete_status ? 1 : 0,
        })
        .where('id', '=', id)
        .executeTakeFirstOrThrow()
    }

    async deleteSubTask(id: number) {
        return await db
        .deleteFrom('sub_tasks')
        .where('id', '=', id)
        .executeTakeFirstOrThrow()
    }
}

export const subTaskModel = new SubTaskModel();