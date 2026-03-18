import express from "express"
import { vehicleController } from "./vehicles.controller"
import auth from "../../middleware/auth"
const router = express.Router()

router.post("/vehicles", auth("admin"), vehicleController.createVehicle)
router.get("/vehicles", vehicleController.getAll)
router.get("/vehicles/:vehicleId", vehicleController.getById)
router.put("/vehicles/:vehicleId", auth("admin"),  vehicleController.updateById)
router.delete("/vehicles/:vehicleId", vehicleController.deleteById)

export const vehicleRouter =  router