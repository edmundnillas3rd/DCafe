import express from "express";

import { uploadVideo } from "../controllers/videoController";
import { uploadArray } from "../utils/multerConfig";

const router = express.Router();

// POST
router.post("/:userID/video-content", uploadArray, uploadVideo);

export default router;
