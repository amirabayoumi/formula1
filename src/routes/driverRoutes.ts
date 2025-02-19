import express from "express";
import {
  getAllDrivers, getDriverByName, addFlagSvgToDriver
} from "../controllers/driverController";

const router = express.Router();

router
.get("/", getAllDrivers).get("/search", getDriverByName).get("/with-flag", addFlagSvgToDriver);

export default router;
