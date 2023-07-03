import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const main = async () => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  app.listen(port, function main() {
    console.log(`Server is running at port: ${port}`);
  });
};

main().catch((err) => console.error(err));
