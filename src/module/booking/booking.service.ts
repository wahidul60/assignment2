import { error } from "console"
import { pool } from "../../config/db"

const createBooking = async (payload: Record<string, unknown>) => {

    const { customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status } = payload
    const vehicleRes1st = await pool.query(`
        SELECT * FROM Vehicles WHERE 
            id = $1
        `, [vehicle_id])

    const vehicle = vehicleRes1st.rows[0]

    if (vehicleRes1st.rowCount === 0) {
        throw new Error("no vehicle found")
    }

    if (vehicle.availability_status !== "available") {
        throw new Error("This vehicle already booked")
    }

    const startDate = new Date(rent_start_date as string)
    const endDate = new Date(rent_end_date as string)
    const dayCountinMiliSecond = endDate.getTime() - startDate.getTime()
    const dayCount = dayCountinMiliSecond / (1000 * 60 * 60 * 24)
    const totalPrice = dayCount * vehicle.daily_rent_price

    const bookingRes = await pool.query(
        `
            INSERT INTO Bookings(
                customer_id, 
                vehicle_id, 
                rent_start_date, 
                rent_end_date, 
                total_price, 
                status
            ) VALUES (
              $1, $2, $3, $4, $5, $6
            ) 
            RETURNING *
        `,
        [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice, status || "booked"])

    const booking = bookingRes.rows[0]

    await pool.query(`
        UPDATE Vehicles 
            SET availability_status=$1 WHERE id=$2
        `, ["booked", vehicle_id])

    const customerRes = await pool.query(
        `
            SELECT 
                name, 
                email 
            FROM Users 
            WHERE id=$1
        `,
        [booking.customer_id])

    const vehicleRes = await pool.query(
        `
            SELECT 
                vehicle_name, 
                registration_number 
            FROM Vehicles 
            WHERE id = $1
        `,
        [booking.vehicle_id]
    )

    const result = {
        ...booking,
        customer: customerRes.rows[0],
        vehicle: vehicleRes.rows[0]
    }

    return result;
}

const getBooking = async (currentUser: any) => {

    if (currentUser.role === "admin") {
        const bookingRes = await pool.query(`
        SELECT 
            id,
            customer_id,
            vehicle_id,
            rent_start_date,
            rent_end_date,
            total_price,
            status
        FROM
        Bookings
        `);

        const result = [];
        const bookings = bookingRes.rows
        for (const booking of bookings) {
            const customerRes = await pool.query(
                `
                SELECT 
                    name, 
                    email 
                FROM Users 
                WHERE id=$1
            `,
                [booking.customer_id])

            const vehicleRes = await pool.query(
                `
                SELECT 
                    vehicle_name, 
                    registration_number   
                FROM Vehicles 
                WHERE id = $1
            `,
                [booking.vehicle_id]
            )

            result.push({
                ...booking,
                customer: customerRes.rows[0],
                vehicle: vehicleRes.rows[0]
            })

        }
        return result;
    } else if (currentUser.role === "customer") {
        const customerRes = await pool.query(`
            SELECT 
                id,
                vehicle_id,
                rent_start_date,
                rent_end_date,
                total_price,
                status
            FROM Bookings WHERE customer_id=$1
        `, [currentUser.id])
        const result = [];
        const bookings = customerRes.rows

        for (const booking of bookings) {

            const vehicleRes = await pool.query(
                `
            SELECT 
                vehicle_name, 
                registration_number,
                type
            FROM Vehicles 
            WHERE id = $1
        `,
                [booking.vehicle_id]
            )

            result.push({
                ...booking,
                vehicle: vehicleRes.rows[0]
            })

        }
        return result;
    }

}

const updateBookingStatus = async (bookingId: string, currentUser: any, status: string) => {

    const bookingRes = await pool.query(`
        SELECT * FROM Bookings WHERE id = $1
        `, [bookingId])

    if (bookingRes.rowCount === 0) {
        throw new Error("Booking not found")
    }

    const booking = bookingRes.rows[0];

    if (currentUser.role == "customer") {
        if (status !== "cancelled") {
            throw new Error("Customer can only cancle booking");
        }

        if (booking.customer_id !== currentUser.id) {
            throw new Error("You are not authorized");
        }

        await pool.query(`
            UPDATE Bookings SET 
                status = $1
                 WHERE 
                id = $2  
            `, [status, bookingId])


        const updateBooking = await pool.query(`
                SELECT * FROM Bookings 
                WHERE id = $1
                `, [bookingId])

        await pool.query(`
                UPDATE Vehicle SET
                availability_status = 'available'
                    `,[booking.vehicle_id])

        return updateBooking;

    } else if (currentUser.role == "admin") {

        if (status !== "returned") {
            throw new Error("Admin can only mark as returned")
        }

        await pool.query(`
            UPDATE Bookings SET 
                status = $1
                 WHERE 
                id = $2  
            `, [status, bookingId])

        await pool.query(`
                UPDATE Vehicles SET availability_status = 'available'
                    WHERE id = $1 
                `, [booking.vehicle_id])

        const result = [];

        const updateBookingRes = await pool.query(`
            SELECT * FROM Bookings 
                WHERE id = $1
            `, [bookingId])

        const vehicleRes = await pool.query(`
            SELECT availability_status 
            FROM Vehicle 
            WHERE id=$1
            `, [booking.vehicle_id])

        return result.push(
            updateBookingRes.rows[0],
            vehicleRes.rows[0]
        );
    } else {
        throw new Error("You are not allowed for update booking")
    }
}


export const bookingService = {
    createBooking, getBooking, updateBookingStatus
}




