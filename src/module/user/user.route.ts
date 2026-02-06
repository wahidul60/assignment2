import express from "express"
import { userController } from "./user.controller";

const route = express.Router()

route.post("/users", userController.createUser)
route.get("/users", userController.getUser)
route.put("/users/:userId", userController.updateUserById)
route.delete("/users/:userId", userController.deleteUserById)

export const userRouter = route;

