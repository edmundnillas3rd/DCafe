import { Request, Response } from "express";

export async function uploadVideo(req: Request, res: Response) {
  const video = req.file?.buffer;
}
