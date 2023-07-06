import multer from "multer";
import express from "express";

import { uploadVideo } from "../controllers/videoController";
import { upload } from "../utils/multerConfig";

const router = express.Router();

// POST
router.post("/video-content", upload, uploadVideo);

export default router;
