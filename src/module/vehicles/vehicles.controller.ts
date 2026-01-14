import { Request, Response } from "express"
import { vehicleService } from "./vehicles.services";


const createVehicle = async (req: Request, res: Response) => {


    try {
        const result = await vehicleService.createVehicle(req.body)
        res.status(201).json({
            "success": true,
            "message": "Vehicle created successfully",
            "data": result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            message: "not created"
        })
    }
}

const getAll = async (req: Request, res: Response) => {
    try {
        const result = await vehicleService.getAll();
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

    try {
        const result = await vehicleService.getById(req.params.vehicleId as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                "success": false,
                "message": "Vehicles not found",
            })
        } else {
            res.status(200).json({
                "success": true,
                "message": "Vehicle retrieved successfully",
                "data": result.rows
            })
        }
    } catch (err: any) {
        res.status(500).json({
            "success": false,
            "message": err.message
        })
    }
}


const updateById = async (req: Request, res: Response) => {
    const { daily_rent_price, availability_status } = req.body

    try {
        const result = await vehicleService.updateById(daily_rent_price, availability_status, req.params.vehicleId as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                "success": false,
                "message": "Vehicle not found"
            })
        } else {
            res.status(200).json({
                "success": true,
                "message": "Vehicle retrieved successfully",
                "data": result.rows
            })
        }

    } catch (err: any) {
        res.status(500).json({
            "success": false,
            "message": err.message
        })
    }
}

const deleteById = async (req: Request, res: Response) => {

    try {
        const result = await vehicleService.deleteById(req.params.vehicleId as string);
        if (result.rowCount === 0) {
            res.status(404).json({
                "success": false,
                "message": "Vehicle not found"
            })
        } else {
            res.status(200).json({
                "success": true,
                "message": "Vehicle deleted successfully"
            })
        }

    } catch (err: any) {
        res.status(500).json({
            "success": false,
            "message": err.message
        })
    }
}

export const vehicleController = {
    createVehicle, getAll, getById, updateById, deleteById
}