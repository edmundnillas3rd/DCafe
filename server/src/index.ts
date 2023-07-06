import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";

import userRouter from "./routes/user";
import initializePassportjs from "./utils/auth";
import initializeCloudinary from "./utils/cloudinaryConfig";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const main = async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );

  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SECRET_KEY as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
      },
    })
  );

  app.use(passport.authenticate("session"));
  initializePassportjs(passport);
  initializeCloudinary();

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json("DCafe API");
  });

  app.use("/v1/auth", userRouter);

  // TODO: make work of the video route, upload video through array buffers
  // app.use("/v1/video", )

  app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
  });
};

main().catch((err) => console.error(err));
