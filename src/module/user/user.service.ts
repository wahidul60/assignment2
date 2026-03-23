import { pool } from "../../config/db"

const getUser = async (payload: Record<string, unknown>) => {
    const result = await pool.query(`
        SELECT id, name, email, phone, role FROM Users;
        `)

    return result;
}

const updateUserById = async (userId: string, name: string, email: string, phone: string, role: string | undefined, currentUser: any) => {
    let result;

    if (currentUser.role !== "admin" && currentUser.id !== Number(userId)) {
        throw new Error("You can only update your own profile")
    }

    if (currentUser.role !== "admin" && currentUser.role != undefined) {
        throw new Error("You are not allowed to change role")
    }

    if (currentUser.role !== "admin") {
        result = await pool.query(`
                UPDATE Users SET 
                name = $1, 
                email = $2, 
                phone = $3 
                WHERE id = $4 
                RETURNING 
                id, name, email, phone, role
                `, [name, email, phone, userId])
    } else {
        result = await pool.query(`
                UPDATE Users SET name = $1, email = $2, phone = $3, role = $4 WHERE id = $5 RETURNING id, name, email, phone, role
                `, [name, email, phone, role, userId])
    }

    return result;
}

const deleteUserById = async (userId: string) => {
    const activeBookingQuery = await pool.query(`
        SELECT * FROM Bookings 
            WHERE customer_id = $1 AND status = 'booked'
        `, [userId])

    if (activeBookingQuery.rows.length > 0) {
        throw new Error("This user has active booking here")
    }

    const result = await pool.query(`
        DELETE FROM Users WHERE id = $1 RETURNING *
        `, [userId]);
    return result;
}

export const userService = {
    getUser, updateUserById, deleteUserById
}