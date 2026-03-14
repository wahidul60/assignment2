import { pool } from "../../config/db"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import config from "../../config";

const signup = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload

    const hashedPassword = await bcrypt.hash(password as string, 10)

    const result = await pool.query(`
            INSERT INTO Users (name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role`, [name, email, hashedPassword, phone, role])
    return result;
}

const signin = async (email: string, password: string) => {
    const result = await pool.query(`
        SELECT * 
            FROM Users 
            WHERE email=$1
        `, [email])

    if (result.rows.length === 0) {
        return null
    }
    const User = result.rows[0];
    const {password : pass, ...user} = User
    const match = await bcrypt.compare(password, User.password)

    if (!match) {
        return false;
    }

    const secret = config.Secret;
    const token = jwt.sign({
        name: User.name,
        email: User.email,
        role : User.role
    },
        secret, {
        expiresIn: "1h"
    })

    return { token, user}
}

export const authService = {
    signup, signin
}