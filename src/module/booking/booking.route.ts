import express from "express";
import { bookingController } from "./booking.controller";

const route = express.Router()

route.post("/bookings", bookingController.createBooking)
route.get("/adminbookings", bookingController.getAdminBooking)
route.get("/customerbookings", bookingController.getCustomerBooking)

export const bookingRouter = route;