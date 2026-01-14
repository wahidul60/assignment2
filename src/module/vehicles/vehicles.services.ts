import { pool } from "../../config/db";

const createVehicle = async (payload: Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;

    const result = await pool.query(`INSERT INTO Vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

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

const updateById = async (daily_rent_price: string, availability_status: string, vehicleId: string) => {
    const result = await pool.query(`
        UPDATE Vehicles SET daily_rent_price = $1, availability_status = $2 WHERE id = $3 RETURNING *
        `, [daily_rent_price, availability_status, vehicleId])
    return result;
}

const deleteById = async (vehicleId: string) => {
    const result = await pool.query(`
        DELETE FROM Vehicles WHERE id = $1 RETURNING *
        `, [vehicleId])
    return result;
}


export const vehicleService = { createVehicle, getAll, getById, updateById, deleteById }
