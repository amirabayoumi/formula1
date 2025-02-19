import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";


import { Race } from "../models/RacesModel";
import { Driver } from "../models/DriverModel";
const { ValidationError } = MongooseError;
//get all race

export const getAllRaces = async (req: Request, res: Response) => {
  try {
    //if format is true
    // const { format } = req.query;
    const { format } = req.query;
    if (format === "true") {
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

    }else{
       const races = await Race.find();
    res.status(200).json(races);
    }
   
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error creating vehicle", error });
    }
  }
};


// export const getRaceResults = async (req: Request, res: Response) => {
//   try {
//     const race = await Race.findById(req.params.id);

//     const formattedResults = race?.race_results.map((result) => {
//       const position = result.position;
//       const time = position === 1
//         ? new Date(result.time).toISOString().slice(11, 19)
//         : `+${result.time / 1000}`;

//       return {
//         driverId: result.driver_id,
//         position,
//         time,
//         points: result.points,
//       };
//     });

//     res.status(200).json(formattedResults);
//   } catch (error) {
//     if (error instanceof ValidationError) {
//       res.status(400).json({ message: error.message });
//     } else {
//       res.status(500).json({ message: "Error retrieving race results", error });
//     }
//   }
// };


// //if ?format=true  make all races with time format as      const time = position === 1
// //  new Date(result.time).toISOString().slice(11, 19)
// // : `+${result.time / 1000}`;

// export const getAllRacesWithTime = async (req: Request, res: Response) => {
//   try {
//     const races = await Race.find();

// //race_result 
// const formattedRaces = races.map((race) => {
//   const formattedResults = race.race_results.map((result) => {
//     console.log(result);
//     const position = result.position;
//     const time = position === 1
//       ? new Date(result.time).toISOString().slice(11, 19)
//       : `+${result.time / 1000}`;

//     return {
//       driver_id: result._id,
//       position,
//       time,
//       points : result.points
//     };
//   });

// console.log(formattedResults);

//   return {

//     race_id: race._id,
//     round: race.round,
//     circuit_id: race.circuit_id,
//     date: race.date,
//     sprint_race: race.sprint_race,
//     fastest_lap: race.fastest_lap,
//     race_results: formattedResults,
//   };
// });


//     res.status(200).json(formattedRaces);
//   } catch (error) {
//     if (error instanceof ValidationError) {
//       res.status(400).json({ message: error.message });
//     } else {
//       res.status(500).json({ message: "something went wrong", error });
//     }
//   }
// };

export default getAllRaces; 




export const getRaces = async (req: Request, res: Response) => {
  try {
    const { format } = req.query;

    // Step 1: Fetch all races
    const races = await Race.find();

    // Step 2: Collect all unique driver_ids from all races' race_results
    const driverIds = races.flatMap((race) => race.race_results.map((result) => result.driver_id));

    // Step 3: Fetch all drivers based on the collected driver_ids
    const drivers = await Driver.find({ driver_id: { $in: driverIds } });

    // Step 4: Create a lookup map for easy access to driver details
    const driverMap = new Map();
    drivers.forEach((driver) => {
      driverMap.set(driver.driver_id, driver);
    });

    // Step 5: Merge driver details into race results for all races
    const racesWithDriverDetails = races.map((race) => {
      const raceResultsWithDriverDetails = race.race_results.map((result) => {
        const driverDetails = driverMap.get(result.driver_id);

        // Format time based on position if format is true
        const formattedTime = format === "true"
          ? result.position === 1
            ? new Date(result.time).toISOString().slice(11, 19)
            : `+${(result.time / 1000).toFixed(3)}`
          : result.time;

        return {
          ...result.toObject(),
          time: formattedTime,
          driver_id: driverDetails
            ? {
                driver_id: driverDetails.driver_id,
                name: driverDetails.name,
                team: driverDetails.team,
                nationality: driverDetails.nationality,
                flagUrl : `https://purecatamphetamine.github.io/country-flag-icons/3x2/${driverDetails.countryCode}.svg`
              }
            : null,
        };
      });

      return {
        ...race.toObject(),
        race_results: raceResultsWithDriverDetails,
      };
    });

    res.status(200).json(racesWithDriverDetails);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong", error });
    }
  }
};


