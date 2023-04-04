import { SubTaskTable } from "../interfaces/interfaces";
import { db } from "../database";

class SubTaskModel {
    async getAllByTasksFromDB (taskId: number): Promise<SubTaskTable[]> {
        return await db
        .selectFrom('sub_task')
        .selectAll()
        .where('task_id', '=', taskId)
        .execute()
    }

    async getByIdFromDB (id: number, taskId: number): Promise<SubTaskTable> {
        return await db
        .selectFrom('sub_task')
        .selectAll()
        .where(({and, cmpr}) => and([
            cmpr('id', '=', id),
            cmpr('sub_task.task_id', '=', taskId)
        ]))
        .executeTakeFirstOrThrow()
    }

    async postSubTaskToDB (title: string, taskId: number) {
        return await db
        .insertInto('sub_task')
        .values({
            title: title,
            complete_status: 0,
            task_id: taskId
        })
        .executeTakeFirstOrThrow()
    }

    async updateSubTaskOnDB(id: number, title: string, complete_status: boolean) {
        return await db
        .updateTable('sub_task')
        .set({
            title: title,
            complete_status: complete_status ? 1 : 0,
        })
        .where('id', '=', id)
        .executeTakeFirstOrThrow()
    }

    async deleteSubTask(id: number) {
        return await db
        .deleteFrom('sub_task')
        .where('id', '=', id)
        .executeTakeFirstOrThrow()
    }
}

export const subTaskModel = new SubTaskModel();