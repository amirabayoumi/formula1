import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
    driver_id: {
        type: String,
        required: true,
    },
    permanentNumber: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    countryCode: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    givenName: {
        type: String,
        required: true,
    },
    familyName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,        
        required: true,
    },
    image: {
        type: String,
        
    }
    }   );

export const Driver = mongoose.model("Driver", DriverSchema);
 