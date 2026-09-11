import app, { connectDB } from "./app.js";
import { getEnv } from "./utils/config.js";

const PORT = Number(getEnv("PORT", "5000"));

async function start() {
	await connectDB();
	app.listen(PORT, () => {
		console.log(`🚀 Portfolio API running on http://localhost:${PORT}`);
	});
}

start();



