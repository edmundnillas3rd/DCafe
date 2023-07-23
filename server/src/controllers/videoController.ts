import { Readable } from "stream";
import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";

import pool from "../utils/database";
import Videos from "../lib/Videos";

const bufferToStream = (buffer: any) => {
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
};

const getUploadResponse = async (
  data: any,
  filename: string,
  folder: string,
  isVideo: boolean = false
): Promise<any> => {
  return new Promise((resolve, reject) => {
    let response = cloudinary.uploader.upload_chunked_stream(
      {
        folder: folder,
        public_id: filename,
        chunk_size: 600000000,
        timeout: 1000 * 60 * 30,
        resource_type: `${isVideo ? "video" : "image"}`,
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

  let responseValues: any;
  try {
    const thumbnailResponse = getUploadResponse(
      thumbnailData,
      files[0]?.originalname,
      `video_thumbnails/${userID}`
    );

    const videoResponse = getUploadResponse(
      videoBuffer,
      files[1]?.originalname,
      `videos/${userID}`,
      files[1].mimetype === "video/mp4"
    );

    responseValues = await Promise.all([thumbnailResponse, videoResponse]);
  } catch (error: any) {
    switch (error?.http_code) {
      case 400:
        res.status(400).json(error);
        break;
      default:
        break;
    }
  }

  const thumbnailPublicId = responseValues[0]?.public_id;
  const thumbnailUrl = responseValues[0]?.secure_url;

  const videoPublicId = responseValues[1]?.public_id;
  const videoUrl = responseValues[1]?.secure_url;

  const videoValues = [
    name,
    thumbnailUrl,
    videoUrl,
    uploadDate,
    userID,
    thumbnailPublicId,
    videoPublicId,
  ];

  const results = await pool.query(
    `
    INSERT INTO videos (video_id, video_name, video_thumbnail_url, video_url, video_upload_date, user_id, video_thumbnail_public_id, video_public_id)
    VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7)
    RETURNING (video_name)
    `,
    videoValues
  );

  if (results?.rows.length !== 0) {
    res.status(200).json(results.rows[0]);
  }
}

// TODO: site should fetch the data at root url
export async function getVideos(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (Videos.getVideos().length) {
    res.status(200).json(Videos.getVideos());
    next();
  }

  const results = await pool.query("SELECT * FROM videos");

  const videos = results.rows.map((r) => ({
    ...r,
    video_url: cloudinary.url(r.video_url),
    video_thumbnail_url: cloudinary.url(r.video_thumbnail_url),
  }));

  Videos.setVideos(videos);
  res.status(200).json(videos);
}

export async function getVideo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { videoID } = req.params;
  let result = Videos.getVideos().filter((video) => video.video_id === videoID);
  res.status(200).json(result[0]);
}
