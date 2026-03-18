import express from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";

const route = express.Router()

route.post("/bookings", auth("admin", "customer"), bookingController.createBooking)
route.get("/adminbookings", auth("admin"), bookingController.getAdminBooking)
route.get("/customerbookings", auth("customer"), bookingController.getCustomerBooking)

export const bookingRouter = route;