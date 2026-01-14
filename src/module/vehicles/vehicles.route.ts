import express from "express"
import { vehicleController } from "./vehicles.controller"
const router = express.Router()

router.post("/vehicles", vehicleController.createVehicle)
router.get("/vehicles", vehicleController.getAll)
router.get("/vehicles/:vehicleId", vehicleController.getById)
router.put("/vehicles/:vehicleId", vehicleController.updateById)
router.delete("/vehicles/:vehicleId", vehicleController.deleteById)


export const vehicleRouter =  router