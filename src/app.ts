import express from "express"
import { vehicleRouter } from "./module/vehicles/vehicles.route"
import createDB from "./config/db"
const app = express()

app.use(express.json());

createDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/v1", vehicleRouter)

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "route not found",
        path: req.path
    })
})

export default app;
