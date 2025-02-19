import mongoose from "mongoose";



const TeamSchema = new mongoose.Schema({
    team_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    principal: {
        type: String,
        required: true,
    },
    base: {
        type: String,
        required: true,
    },
    founded_year: {
        type: Number,
        required: true,
    },
    engine: {
        type: String,
        required: true,
    },
    drivers: [
        {
           position: {
                type: Number,
                required: true,
            },
            driver_id: {
                type: String,
                required: true,
            },
            
        },
    ],
    image: {
        type: String,
     
    },
});

export const Team = mongoose.model("Team", TeamSchema);
    