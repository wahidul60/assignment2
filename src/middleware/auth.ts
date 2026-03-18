import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";


const auth = (...roles : string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        try {
            if (!token) {
                return res.status(500).json({ message: "Please Login" })
            }

            const decode = jwt.verify(token, config.Secret as string)as JwtPayload;
            req.user = decode ;
            console.log(req.user)
            if(roles.length && !roles.includes(decode.role as string)) {
                return res.status(500).json(
                    {
                        error : "You are not allowed for this session"
                    }
                );
            }
            next();
        } catch (err: any) {
            res.status(500).json({
                success : false,
                message : err.message
            });
        }

    }
}

export default auth;