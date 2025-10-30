import express from "express"
import { createBooking , validatePromo } from "../controllers/bookingController.js"
const router = express.Router();

router.post("/" , createBooking);
router.post("/promo/validate" , validatePromo);

export default router;
