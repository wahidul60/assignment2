import { Request, Response } from "express"
import { pool } from "../../config/db"

const createUser = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload
    const result = await pool.query(`
            INSERT INTO Users (name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, email, password, phone, role])
    return result;
}

const getUser = async (payload: Record<string, unknown>) => {
    const result = await pool.query(`
        SELECT * FROM Users;
        `)
    return result;
}

const updateUserById = async (userId : string, name: string, email: string, phone: string, role: string) => {

    const result = await pool.query(`
            UPDATE Users SET name = $1, email = $2, phone = $3, role = $4 WHERE id = $5 RETURNING *
            `, [name, email, phone, role, userId])
    return result;
} 

const deleteUserById = async (userId : string) => {
    const result = await pool.query(`
        DELETE FROM Users WHERE id = $1 RETURNING *
        `, [userId]);
    return result;
}

export const userService = {
    createUser, getUser, updateUserById, deleteUserById
}