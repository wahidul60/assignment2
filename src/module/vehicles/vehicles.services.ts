import { pool } from "../../config/db";

const createVehicle = async (payload: Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;

    const result = await pool.query(`
        INSERT INTO Vehicles(
            vehicle_name, 
            type, 
            registration_number, 
            daily_rent_price, 
            availability_status
            ) VALUES (
                $1, $2, $3, $4, $5
             ) RETURNING *
              `, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

    return result;
}

const getAll = async () => {
    const result = await pool.query(`SELECT * FROM Vehicles`)
    return result;
}

const getById = async (vehicleId: string) => {
    const result = pool.query(`SELECT * FROM Vehicles WHERE id = $1`, [vehicleId]);
    return result;
}

const updateById = async (payload: Record<string, unknown>, vehicleId: string) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload
    const result = await pool.query(`
        UPDATE Vehicles SET 
            daily_rent_price = $1, 
            availability_status = $2, 
            vehicle_name = $3, 
            type = $4, 
            registration_number = $5 
                WHERE id = $6 
                RETURNING *
        `, [daily_rent_price, availability_status, vehicle_name, type, registration_number, vehicleId])
    return result;
}

const deleteById = async (vehicleId: string) => {
    const ActiveBookingCheck = await pool.query(`
        SELECT * FROM Bookings WHERE 
            vehicle_id = $1 AND status = 'booked'
        `, [vehicleId])

    if (ActiveBookingCheck.rows.length > 0) {
        throw new Error("This vehicles has active booking. can't deleted")
    };

    const result = await pool.query(`
        DELETE FROM Vehicles WHERE 
            id = $1 
            RETURNING *
        `, [vehicleId])
    return result;
}


export const vehicleService = { createVehicle, getAll, getById, updateById, deleteById }
