import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

import { Driver } from "../models/DriverModel";



// get all drivers with flag and search query by name  ?search = name
// api/drivers
export const getAllDrivers = async (req: Request, res: Response) => {
  try { 
      const { search } = req.query; 
      if (search) {
          const drivers = await Driver.find({ 
            // Case-insensitive search
            givenName: { $regex: search, $options: "i" } 
          });
          const updatedDrivers = drivers.map((driver) => {
              const flagUrl = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${driver.countryCode}.svg`;
              return { driver, flagUrl };
          });
          res.status(200).json(updatedDrivers);
      } else {
          const drivers = await Driver.find();
          const updatedDrivers = drivers.map((driver) => {
              const flagUrl = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${driver.countryCode}.svg`;
              return { driver, flagUrl };
          });
          res.status(200).json(updatedDrivers);
      }
  } catch (error) {
      if (error instanceof ValidationError) {
          res.status(400).json({ message: error.message });
      } else {
          res.status(500).json({ message: "something went wrong", error });
      }
  }
};

//search filter by name ?serach = name
// api/drivers/search?search=name

// export const getDriverByName = async (req: Request, res: Response) => {
//     try {
      
      
//         res.status(200).json(drivers);
//     } catch (error) {
//         if (error instanceof ValidationError) {
//           res.status(400).json({ message: error.message });
//         } else {
//           res.status(500).json({ message: "something went wrong", error });
//         }
//       }
// }



// add flag to driver from countryCode
// api/drivers/with-flag

// export const addFlagSvgToDriver = async (req: Request, res: Response) => {
//     try {
//         const drivers = await Driver.find();
//      const updatedDrivers = drivers.map((driver) => {
//        const flagUrl = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${driver.countryCode}.svg`;
//        return { driver, flagUrl };
//      })
//         res.status(200).json(updatedDrivers);
//     } catch (error) {
//         if (error instanceof ValidationError) {
//           res.status(400).json({ message: error.message });
//         } else {
//           res.status(500).json({ message: "something went wrong", error });
//         }
//       }
// }

