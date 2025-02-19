import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

import { Team } from "../models/TeamModule";

//get all teams
export const getAllTeams = async (req: Request, res: Response) => {
    try {
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Error creating vehicle", error });
        }
    }
};

