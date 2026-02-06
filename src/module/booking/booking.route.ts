import express from "express";
import { bookingController } from "./booking.controller";

const route = express.Router()

route.post("/bookings", bookingController.createBooking)
route.get("/bookings", bookingController.getAdminBooking)

export const bookingRouter = route;