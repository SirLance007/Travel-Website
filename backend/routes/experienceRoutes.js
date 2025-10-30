import express from "express"
import {getExperiences , getExperienceById, getAvailableSlots} from "../controllers/experienceControllers.js"
const router = express.Router();

router.get("/" , getExperiences);
router.get("/:id" , getExperienceById);
router.get("/:id/slots" , getAvailableSlots);

export default router;