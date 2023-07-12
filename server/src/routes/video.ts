import express from "express";

import { getVideos, uploadVideo } from "../controllers/videoController";
import { uploadArray } from "../utils/multerConfig";

const router = express.Router();

// GET 
router.get("/", getVideos);

// POST
router.post("/:userID/video-content", uploadArray, uploadVideo);

export default router;
