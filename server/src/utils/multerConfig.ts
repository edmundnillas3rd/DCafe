import multer, { memoryStorage } from "multer";

const storage = memoryStorage();
export const uploadSingle = multer({
  storage: storage,
  limits: { fileSize: 100000 * 1024 * 5 },
}).single("upload");

export const uploadArray = multer({
  storage: storage,
  limits: { fileSize: 100000 * 1024 * 5}
}).array("upload-array", 2)