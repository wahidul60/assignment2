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

const getBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.getBooking(req.user)
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

const updateBookingStatus = async (req: Request, res: Response) => {
    const {status} = req.body
    try {
        const result = await bookingService.updateBookingStatus(req.params.bookingId as string, req.user, status)
        res.status(200).json(
            {
                "success": true,
                "message": "Bookings cancelled successfully",
                "data": result.rows[0]
            }
        )
    } catch (err: any) {
        res.status(400).json({
            "success": false,
            "message": err.message
        })
    }
}


export const bookingController = {
    createBooking,
    getBooking,
    updateBookingStatus
}


