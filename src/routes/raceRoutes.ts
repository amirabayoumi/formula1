import express from "express";
import {
getAllRaces, getRaceResults, getAllRacesWithTime} from "../controllers/raceController";

const router = express.Router();

router
.get("/", getAllRacesWithTime).get("/:id", getRaceResults)

export default router;
