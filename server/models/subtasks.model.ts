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
}

export const subTaskModel = new SubTaskModel();