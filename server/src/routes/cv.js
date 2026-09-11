import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs from "fs";

router.get("/download", (req, res) => {
	const possiblePaths = [
		path.join(__dirname, "../public/cv/Resham_Kumar_Thapa_CV.pdf"),
		path.join(__dirname, "../../public/cv/Resham_Kumar_Thapa_CV.pdf"),
		path.join(__dirname, "../../../client/public/Resham_Kumar_Thapa_CV.pdf"),
	];

	const foundPath = possiblePaths.find((p) => fs.existsSync(p));
	if (foundPath) {
		return res.download(foundPath, "Resham_Kumar_Thapa_CV.pdf");
	}

	return res.status(404).json({ message: "CV not found." });
});

export default router;


