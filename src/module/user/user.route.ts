import express from "express"
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const route = express.Router()

route.post("/signup",auth("admin"), userController.createUser)
route.get("/users",  userController.getUser)
route.put("/users/:userId", userController.updateUserById)
route.delete("/users/:userId", userController.deleteUserById)

export const userRouter = route;

