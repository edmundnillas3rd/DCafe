import { Readable } from "stream";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";

import pool from "../utils/database";

const bufferToStream = (buffer: any) => {
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
};

const getUploadResponse = async (data: any, folder: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    let response = cloudinary.uploader.upload_chunked_stream(
      {
        folder: folder,
        timeout: 1000 * 60 * 2,
        resource_type: "raw",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );

    bufferToStream(data).pipe(response);
  });
};

export async function uploadVideo(req: Request, res: Response) {
  const { userID } = req.params;
  const { name, uploadDate } = req.body;
  const files = req.files as Express.Multer.File[];

  // TODO: seperate modules for video thumbnail and video buffer
  // 0: for video thumbnail
  // 1: for video buffer
  const thumbnailBuffer = files[0]?.buffer;
  const videoBuffer = files[1]?.buffer;

  let thumbnailData = null;
  switch (files[0].mimetype) {
    case "image/png":
      thumbnailData = await sharp(thumbnailBuffer)
        .png({ quality: 20 })
        .toBuffer();
      break;
    case "image/jpeg":
      thumbnailData = await sharp(thumbnailBuffer)
        .jpeg({ quality: 20 })
        .toBuffer();
      break;
  }

  let thumbnailResponse, videoResponse;
  try {
    thumbnailResponse = await getUploadResponse(
      thumbnailData,
      "video_thumbnails"
    );
    videoResponse = await getUploadResponse(videoBuffer, "videos");
  } catch (error) {
    console.error(error);
  }
  const thumbnailUrl = thumbnailResponse?.public_id;
  const videoUrl = videoResponse?.public_id;

  const likes = 0,
    dislikes = 0,
    views = 0;

  const videoValues = [
    name,
    thumbnailUrl,
    videoUrl,
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
    res.status(200).json({ video_name: results.rows[0].video_name });
  }
}
