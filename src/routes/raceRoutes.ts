import express from "express";
import {
getAllRaces, getRaces} from "../controllers/raceController";

const router = express.Router();

router
.get("/", getRaces )

export default router;
