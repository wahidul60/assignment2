import { pool } from "../config/db";

export const autReturnScheduller = async () => {
    try {
        await pool.query(`
        UPDATE Bookings 
        SET status = 'returned'
        WHERE rent_end_date < CURRENT_DATE
        AND status != 'returned'
    `);
        await pool.query(`
        UPDATE Vehicles 
        SET availability_status = 'available'
        WHERE id IN (
            SELECT vehicle_id FROM Bookings
            WHERE rent_end_date < CURRENT_DATE
        )
    `);
    } catch (err: any) {
        console.log("Auto return error", err)
    }
}