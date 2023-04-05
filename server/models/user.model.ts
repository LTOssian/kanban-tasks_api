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
        .executeTakeFirst() as UserTable
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

    async deleteUserFromDB(userId: string, password: string): Promise<void> {
        const user = await this.getByIdFromDB(userId);

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Password does not match");
        }

        await db
        .deleteFrom('user')
        .where('id', '=', userId)
        .execute();
    }

    async patchUserFromDB(userId: string, email: string, old_password:string, new_password: string) {
        const user = await this.getByIdFromDB(userId)
        if (user.email !== email) {
            throw new Error("Wrong email or/and password");
        } 
        const match = await bcrypt.compare(old_password, user.password);
        if (!match) {
            throw new Error("Wrong email or/and password");
        }

        return await db
            .updateTable('user')
            .set({
                password: await bcrypt.hash(new_password, 8)
            })
            .where('id', '=', userId)
            .executeTakeFirstOrThrow()
    }

    async createUser(email: string, password: string) {
        return await db
        .insertInto('user')
        .values({
            email: email,
            password: await bcrypt.hash(password, 8),
            id: uuidv4(),
            data_created: new Date().toISOString()
        })
        .executeTakeFirstOrThrow()
    }



}

export const userModel = new UserModel();