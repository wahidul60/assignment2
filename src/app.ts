import express from "express"
import { vehicleRouter } from "./module/vehicles/vehicles.route"
import createDB from "./config/db"
import { userRouter } from "./module/user/user.route";
import { bookingRouter } from "./module/booking/booking.route";
import { authRouter } from "./module/auth/auth.router";
const app = express()

app.use(express.json());

createDB();

app.use("/api/v1/users", userRouter)
app.use("/api/v1/vehicles", vehicleRouter)
app.use("/api/v1/bookings", bookingRouter)
app.use("/api/v1/auth", authRouter)

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "route not found",
        path: req.path
    })
})

export default app;
