import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import profileRouter from "./routes/profile.js";
import cvRouter from "./routes/cv.js";
import contactRouter from "./routes/contact.js";
import { getEnv } from "./utils/config.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
	app.use(morgan("dev"));
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/public", express.static(path.join(__dirname, "../public")));

// MongoDB Serverless Connection Cache
let isConnected = false;
export async function connectDB() {
	if (isConnected || mongoose.connection.readyState === 1) {
		return;
	}
	const MONGO_URI = getEnv("MONGO_URI", process.env.MONGO_URI);
	if (MONGO_URI) {
		try {
			await mongoose.connect(MONGO_URI, {
				serverSelectionTimeoutMS: 5000,
			});
			isConnected = true;
			console.log("[MongoDB] Connected successfully");
		} catch (err) {
			console.error("[MongoDB] Connection failed:", err.message);
		}
	}
}

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
	try {
		await connectDB();
	} catch (e) {
		// Continue without blocking
	}
	next();
});

// API Routes
app.use("/api/profile", profileRouter);
app.use("/api/cv", cvRouter);
app.use("/api/contact", contactRouter);

app.get("/api/health", (req, res) => {
	res.json({
		ok: true,
		service: "portfolio-api",
		status: "healthy",
		timestamp: new Date().toISOString()
	});
});

export default app;
