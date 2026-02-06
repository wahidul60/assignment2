import { Request, Response } from "express"
import { pool } from "../../config/db"
import { userService } from "./user.service"


const createUser = async (req: Request, res: Response) => {
    try {

        const result = await userService.createUser(req.body)
        res.status(201).json(
            {
                "success": true,
                "message": "User registered successfully",
                "data": result.rows
            }
        )

    } catch (err: any) {
        res.status(500).json({
            "success": false,
            "message": err.message
        })
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUser(req.body)
        res.status(200).json({
            "success": true,
            "message": "Users retrieved successfully",
            "data": result.rows
        })
    } catch (err: any) {
        res.status(500).json({
            "success": false,
            "message": err.message
        })
    }

}

const updateUserById = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, role } = req.body
        const result = await userService.updateUserById(req.params.userId as string, name, email, phone, role)

        if (result.rows.length === 0) {
            res.status(404).json({
                "success": false,
                "message": "user not found",
            })
        } else {
            res.status(200).json({
                "success": true,
                "message": "User updated successfully",
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

const deleteUserById = async (req: Request, res: Response) => {
    try {
        const result = await userService.deleteUserById(req.params.userId as string)

        if (result.rowCount === 0) {
            res.status(404).json({
                "success": false,
                "message": "user not found",
            })
        } else {
            res.status(200).json({
                "success": true,
                "message": "User deleted successfully",
                "data": result.rowCount
            })
        }
    } catch (err: any) {
        res.status(500).json({
            "success": false,
            "message": err.message
        })
    }
}


export const userController = {
    createUser, getUser, updateUserById, deleteUserById
}


