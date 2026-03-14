import express from "express"
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const route = express.Router()

route.get("/",  userController.getUser)
route.put("/:userId", userController.updateUserById)
route.delete("/:userId", userController.deleteUserById)

export const userRouter = route;

