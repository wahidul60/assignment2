import { Request, Response } from "express"
import { vehicleService } from "./vehicles.services";


const createVehicle = async (req: Request, res: Response) => {

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
    const result = await vehicleService.getAll();
    try {
        res.status(200).json(
            {
                "success": true,
                "message": "Vehicles retrieved successfully",
                "data": result.rows
            }
        )
    } catch (err: any) {
        res.status(200).json({
            "success": true,
            "message": "No vehicles found",
            "data": []
        })
    }
}

const getById = async (req: Request, res: Response) => {
    const result = await vehicleService.getById(req.params.vehicleId as string)
    console.log(result)
    try {
        if (result.rows.length === 0) {
            res.status(200).json({
                "success": false,
                "message": "Vehicles not found",
            })
        } else {
            res.status(201).json({
                "success": true,
                "message": "Vehicle retrieved successfully",
                "data": result.rows
            })
        }
    } catch (err: any) {
        res.status(404).json({
            "success" : false,
            "message" : err.message
        })
    }
}



export const vehicleController = {
    createVehicle, getAll, getById
}