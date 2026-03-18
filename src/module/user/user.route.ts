import express from "express"
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const route = express.Router()

route.get("/", auth("admin"), userController.getUser)
route.put("/:userId", auth("admin", "customer"), userController.updateUserById)
route.delete("/:userId", auth("admin"), userController.deleteUserById)

export const userRouter = route;