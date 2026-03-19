import express from "express"
import { vehicleController } from "./vehicles.controller"
import auth from "../../middleware/auth"
const router = express.Router()

router.post("/", auth("admin"), vehicleController.createVehicle)
router.get("/", vehicleController.getAll)
router.get("/:vehicleId", vehicleController.getById)
router.put("/:vehicleId", auth("admin"),  vehicleController.updateById)
router.delete("/:vehicleId", vehicleController.deleteById)

export const vehicleRouter =  router