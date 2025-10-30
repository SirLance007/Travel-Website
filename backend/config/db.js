import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL);
		console.log("Connected to database successfully");
	} catch (error) {
		console.log("Error while connecting to database:", error);
	}
}

export {connectDB};