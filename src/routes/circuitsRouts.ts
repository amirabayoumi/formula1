import express from "express";
import {
getAllCircuits,getCircuitByName
} from "../controllers/circuitsController";

const router = express.Router();

router
.get("/", getAllCircuits).get("/search", getCircuitByName);

export default router;
