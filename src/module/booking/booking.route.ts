import express from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";

const route = express.Router()

route.post("/", auth("admin", "customer"), bookingController.createBooking)
route.get("/", auth("admin", "customer"), bookingController.getBooking)
route.get("/:bookingId", auth("customer"), bookingController.updateBookingStatus)

export const bookingRouter = route;