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
        res.status(201).json(
            {
                "success": true,
                "message": "login successful",
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