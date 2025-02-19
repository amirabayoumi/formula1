import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

import { Circuit } from "../models/CircuitModel";

//get all circuits
//api/circuits
export const getAllCircuits = async (req: Request, res: Response) => {
    try { 
     const { search } = req.query;
       if (search) {
        const circuits = await Circuit.find({ name: search });
        res.status(200).json(circuits);
      } else {
        const circuits = await Circuit.find();
        res.status(200).json(circuits);
      }
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};


//search filter by name ?serach = name
// api/circuits/search?search=name
// export const getCircuitByName = async (req: Request, res: Response) => {
//     try {
    // const { search } = req.query;
//         const circuits = await Circuit.find({ name: search });
//         res.status(200).json(circuits);
//     } catch (error) {
//         if (error instanceof ValidationError) {
//             res.status(400).json({ message: error.message });
//         } else {
//             res.status(500).json({ message: "Internal server error" });
//         }
//     }
// }





