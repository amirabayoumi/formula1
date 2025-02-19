import express from "express";
import {
getAllTeams,getDriverInTeam 
} from "../controllers/teamsController";

const router = express.Router();

router
.get("/", getDriverInTeam );

export default router;
