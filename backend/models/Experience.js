import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    title : String,
    location : String,
    image : String,
    price : Number, 
    description : String,
    slots : [{
        data : String ,
        times : [
            {
                time : String , available : Boolean
            }
        ]
    }]
});

export default mongoose.model("Experience" , experienceSchema);