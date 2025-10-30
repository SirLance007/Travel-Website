import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    experienceId : String , 
    userName : String ,
    userEmail : String ,
    date : String ,
    time : String , 
    price : Number ,
    promo : String , 
    status : {type : String , default : "confirmed"}
})

export default mongoose.model("Booking" , bookingSchema);