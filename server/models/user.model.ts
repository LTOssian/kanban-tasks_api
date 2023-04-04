import { UserTable } from "../interfaces/interfaces";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'
import { db } from "../database";

class UserModel {
    async getAllFromDB(): Promise<UserTable[]> {
        return await db
        .selectFrom('user')
        .selectAll()
        .execute()
    }

    async getByIdFromDB(userId: string): Promise<UserTable> {
        return await db
        .selectFrom('user')
        .selectAll()
        .where('id', '=', userId)
        .executeTakeFirstOrThrow()
    }

    async getByPasswordFromDB(email: string, password: string): Promise<UserTable> {
        const user = await db
        .selectFrom('user')
        .selectAll()
        .where('email', '=', email)
        .executeTakeFirstOrThrow();

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new Error("Password does not match");
        } 

        return user
    }

    async deleteUserFromDB(userId: string, password: string) {
        const user = await this.getByIdFromDB(userId);

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Password does not match");
        }

        return await db
        .deleteFrom('user')
        .where('id', '=', userId)
        .executeTakeFirstOrThrow();
    }

    async patchUserFromDB(userId: string, email: string, old_password:string, new_password: string) {
        
        const user = await this.getByPasswordFromDB(email, old_password)
        
        if (user.id !== userId) {
            throw new Error("Wrong email or/and password");
        } 

        return await db
            .updateTable('user')
            .set({
                password: await bcrypt.hash(new_password, 8)
            })
            .executeTakeFirstOrThrow()
    }

    async createUser(email: string, password: string) {
        return await db
        .insertInto('user')
        .values({
            email: email,
            password: await bcrypt.hash(password, 8),
            id: uuidv4(),
            data_created: Date.now().toLocaleString()
        })
        .executeTakeFirstOrThrow()
    }



}

export const userModel = new UserModel();