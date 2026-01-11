import { Pool } from "pg"
import config from "."
//db_config
export const pool = new Pool({
    connectionString: config.connection_str
})

const createDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Users(
        id SERIAL PRIMARY KEY, 
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password TEXT NOT NULL CHECK (LENGTH(password) >=6 ),
        phone VARCHAR(13),
        role VARCHAR(20)
        )`);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS Vehicles(
        id SERIAL PRIMARY KEY, 
        vehicle_name VARCHAR(50) NOT NULL,
        type VARCHAR(10),
        registration_number VARCHAR(50) NOT NULL UNIQUE,
        daily_rent_price NUMERIC NOT NULL CHECK(daily_rent_price>0),
        availability_status VARCHAR(15)
        )`);
    await pool.query(`CREATE TABLE IF NOT EXISTS Bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES Users(id) ON DELETE CASCADE,
        vehicle_id INT REFERENCES Vehicles(id) ON DELETE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL,
        total_price NUMERIC NOT NULL CHECK(total_price > 0),
        status VARCHAR(30) 
        )`)
}

export default createDB;