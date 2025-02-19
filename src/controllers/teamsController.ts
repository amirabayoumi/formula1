import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

import { Team } from "../models/TeamModule";
import { Driver } from "../models/DriverModel";

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



//get driver in team

export const getDriverInTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.find();
    const driverId = team.flatMap((team) =>
      team.drivers.map((driver) => driver.driver_id)
    );
    const drivers = await Driver.find({ driver_id: { $in: driverId } });
    const driverMap = new Map();
    drivers.forEach((driver) => {
      driverMap.set(driver.driver_id, driver);
    });

    const teamWithDriverDetails = team.map((team) => {
      const driversInTeam = team.drivers.map((driver) => {
        const driverDetails = driverMap.get(driver.driver_id);
        return {
          driver_id: driverDetails.driver_id,
          name: driverDetails.name,
          team: driverDetails.team,
          nationality: driverDetails.nationality,
         flagUrl : `https://purecatamphetamine.github.io/country-flag-icons/3x2/${driverDetails.countryCode}.svg`
        };
      });
      return {
        ...team.toObject(),
        drivers: driversInTeam,
      };
    });
    res.status(200).json(teamWithDriverDetails);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
