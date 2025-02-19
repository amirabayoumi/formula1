import mongoose from "mongoose";





const RaceSchema = new mongoose.Schema({
    round: {
        type: Number,
        required: true,
    },
    circuit_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Circuit",
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    sprint_race: {
        type: Boolean,
        required: true,
    },
    fastest_lap: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
        required: true,
    },
    race_results: {
        type: [
            {
                position: {
                    type: Number,
                    required: true,
                },
                driver_id: {
                    type: String,
      
                    required: true,
                },
                time: {
                    type: Number,
                    required: true,
                },
                points: {
                    type: Number,
                    required: true,
                },
            },
        ],
        required: true,
    },
})


export const Race= mongoose.model("Race", RaceSchema);