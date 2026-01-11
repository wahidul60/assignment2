import { Request, Response } from "express"
import createDB, { pool } from "../../config/db"
import { vehicleService } from "./vehicles.services";

createDB();

const createVehicle = async (req: Request, res: Response) => {  

    console.log(req.body)
    const result = await vehicleService.createVehicle(req.body)

    try {
        res.status(201).json({
            "success": true,
            "message": "Vehicle created successfully",
            "data": result.rows
        })
    } catch (err: any) {
        res.status(400).json({
            message: "not created"
        })
    }
}

const getAll = async (req: Request, res: Response) => {
    const result = await req.body;
    console.log(result)
}
export const vehicleController = {
    createVehicle, getAll
}