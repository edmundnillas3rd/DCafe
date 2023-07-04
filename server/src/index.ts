import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";

import { getUsers } from "./controllers/userController";

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

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json("DCafe API");
  });
  app.get("/users", getUsers);

  app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
  });
};

main().catch((err) => console.error(err));
