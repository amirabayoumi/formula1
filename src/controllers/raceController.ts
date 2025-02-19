import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

import { Race } from "../models/RacesModel";

//get all race

export const getAllRaces = async (req: Request, res: Response) => {
  try {
    const races = await Race.find();
    res.status(200).json(races);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error creating vehicle", error });
    }
  }
};


export const getRaceResults = async (req: Request, res: Response) => {
  try {
    const race = await Race.findById(req.params.id);

    const formattedResults = race?.race_results.map((result) => {
      const position = result.position;
      const time = position === 1
        ? new Date(result.time).toISOString().slice(11, 19)
        : `+${result.time / 1000}`;

      return {
        driverId: result.driver_id,
        position,
        time,
        points: result.points,
      };
    });

    res.status(200).json(formattedResults);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error retrieving race results", error });
    }
  }
};


//if ?format=true  make all races with time format as      const time = position === 1
//  new Date(result.time).toISOString().slice(11, 19)
// : `+${result.time / 1000}`;

export const getAllRacesWithTime = async (req: Request, res: Response) => {
  try {
    const races = await Race.find();

//race_result 
const formattedRaces = races.map((race) => {
  const formattedResults = race.race_results.map((result) => {
    console.log(result);
    const position = result.position;
    const time = position === 1
      ? new Date(result.time).toISOString().slice(11, 19)
      : `+${result.time / 1000}`;

    return {
      driver_id: result._id,
      position,
      time,
      points : result.points
    };
  });

console.log(formattedResults);

  return {

    race_id: race._id,
    round: race.round,
    circuit_id: race.circuit_id,
    date: race.date,
    sprint_race: race.sprint_race,
    fastest_lap: race.fastest_lap,
    race_results: formattedResults,
  };
});


    res.status(200).json(formattedRaces);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "something went wrong", error });
    }
  }
};

export default getAllRaces; 
