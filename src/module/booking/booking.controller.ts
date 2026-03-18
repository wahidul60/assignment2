import { Request, Response } from "express"
import { bookingService } from "./booking.service"

const createBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.createBooking(req.body)
        res.status(201).json(
            {
                "success": true,
                "message": "Bookings created successfully",
                "data": [result],
            }
        )
    } catch (err: any) {
        let statusCode = 400;

        if (err.message.includes("no vehicle found")) {
            statusCode = 404;
        }

        if (err.message.includes("This vehicle already booked")) {
            statusCode = 400;
        }
        res.status(statusCode).json({
            "success": false,
            "message": err.message
        })
    }
}

const getAdminBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.getAdminBooking()
        res.status(200).json(
            {
                "success": true,
                "message": "Bookings retrieved successfully",
                "data": result
            }
        )
    } catch (err: any) {
        res.status(500).json({
            "success": false,
            "message": err.message
        })
    }
}

const getCustomerBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.getAdminBooking()
        res.status(200).json(
            {
                "success": true,
                "message": "Bookings retrieved successfully",
                "data": result
            }
        )
    } catch (err: any) {
        res.status(500).json({
            "success": false,
            "message": err.message
        })
    }
}

export const bookingController = {
    createBooking,
    getAdminBooking,
    getCustomerBooking
}


