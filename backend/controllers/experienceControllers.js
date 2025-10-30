import Experience from "../models/Experience.js"
import Booking from "../models/Booking.js"

export const getExperiences = async (req , res) => {
    const data = await Experience.find();
    res.json(data);
}

export const getExperienceById = async(req , res) => {
    const exp = await Experience.findById(req.params.id);
    res.json(exp);
}


export const getAvailableSlots = async (req, res) => {
    try {
        const { id } = req.params;
        const experience = await Experience.findById(id);
        
        if (!experience) {
            return res.status(404).json({ error: "Experience not found" });
        }

        // Get all bookings for this experience
        const bookings = await Booking.find({ experienceId: id });
        
        // Create a set of booked slots for quick lookup
        const bookedSlots = new Set();
        bookings.forEach(booking => {
            bookedSlots.add(`${booking.date}-${booking.time}`);
        });

        // Generate available slots for the next 7 days
        const availableSlots = [];
        const today = new Date();
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dateString = date.toISOString().split('T')[0];
            
            // Available times for each day
            const times = [
                { time: '07:00', label: '07:00 am' },
                { time: '09:00', label: '9:00 am' },
                { time: '11:00', label: '11:00 am' },
                { time: '13:00', label: '1:00 pm' }
            ];
            
            const daySlots = times.map(timeSlot => ({
                ...timeSlot,
                available: !bookedSlots.has(`${dateString}-${timeSlot.time}`)
            }));
            
            availableSlots.push({
                date: dateString,
                label: `Oct ${22 + i}`, // This should be dynamic in real app
                times: daySlots
            });
        }
        
        res.json({ slots: availableSlots });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};