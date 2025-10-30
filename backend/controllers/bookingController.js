import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";

// added some promo codes
const PROMO_CODES = {
    SAVE10 : 0.10,
    FLAT100 : 100
}

export const createBooking = async (req , res) => {
    try{
        const {experienceId , userName , userEmail , date , time , promo } = req.body;

        // Prevent double booking 
        // if all these parameters match then we need to give another slot to the user
        const existing = await Booking.findOne({experienceId , date , time });
        if(existing) return res.status(400).json({error : "Slot already booked"});

        // If that particular user does not exist
        const experience = await Experience.findById(experienceId);
        if(!experience) return res.status(400).json({error : "Experience not found!!"})

        let price = experience.price;
        // if any promo applied and the promo is valid
        if(promo && PROMO_CODES[promo]){
            // Condition if its is percent or FLAT
            const discount = PROMO_CODES[promo] < 1 ? price*PROMO_CODES[promo] : PROMO_CODES[promo];
            price -= discount;
        }

        // booking made
        const booking = new Booking({experienceId , userName , userEmail , date , time , promo , price});
        await booking.save();
        res.json({successs : true , booking});
    }catch(err){
        res.status(500).json({error : err.message});
    }
}

export const validatePromo = (req , res) => {
    const {code} = req.body;
    if(PROMO_CODES[code]){
        res.json({valid : true , discount : PROMO_CODES[code]});
    }
    else{
        res.json({valid : false});
    }
};