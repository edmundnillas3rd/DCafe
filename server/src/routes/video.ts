import express from "express";

import { getVideos, getVideo, uploadVideo } from "../controllers/videoController";
import { uploadArray } from "../utils/multerConfig";

const router = express.Router();

// GET 
router.get("/", getVideos);
router.get("/:videoID/video-watch", getVideo);

// POST
router.post("/:userID/video-content", uploadArray, uploadVideo);

export default router;
