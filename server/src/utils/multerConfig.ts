import multer, { memoryStorage } from "multer";

const storage = memoryStorage();
export const upload = multer({
  storage: storage,
  limits: { fileSize: 100000 * 1024 * 5 },
}).single("upload");
