import { Request, Response } from "express";
import pool from "../utils/database";

export async function uploadVideo(req: Request, res: Response) {
  const { userID } = req.params;
  const { name, uploadDate } = req.body;

  // TODO: seperate modules for video thumbnail and video buffer
  // 0: for video thumbnail
  // 1: for video buffer
  const files = req.files as Express.Multer.File[];
  const thumbnailBuffer = files[0]?.buffer;
  const videoBuffer = files[1]?.buffer;

  const likes = 0,
    dislikes = 0,
    views = 0;

  const videoValues = [
    name,
    "/thumbnail",
    "/video-url",
    uploadDate,
    userID,
    likes,
    dislikes,
    views,
  ];
  
  const results = await pool.query(
    `INSERT INTO videos (video_id, video_name, video_thumbnail_url, video_url, video_upload_date, user_id, video_likes, video_dislikes, video_views) 
     VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING (video_name)
    `,
    videoValues
  );

  if (results?.rows.length !== 0) {
    res.status(200).json(results.rows[0].video_name);
  }
}
