import { Request, Response } from "express";
import { authService } from "./auth.service";

const signup = async (req: Request, res: Response) => {
    try {

        const result = await authService.signup(req.body)
        res.status(201).json(
            {
                "success": true,
                "message": "User registered successfully",
                "data": result.rows[0]
            }
        )

    } catch (err: any) {
        res.status(500).json({
            "success": false,
            "message": err.message
        })
    }
}

const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await authService.signin(email, password)

        if(result === null){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }

        if(result === false){
            return res.status(401).json({
                success : false,
                message : "Invalid password"
            })
        }

        res.status(200).json(
            {
                "success": true,
                "message": "Login successful",
                "data": result
            }
        )
    } catch (err: any) {
        res.status(500).json({
            "success": false,
            "message": err.message
        })
    }
}

export const authController = {
    signin, signup
}