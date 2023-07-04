import { Request, Response } from "express";
import pool from "../utils/database";

export async function getUsers(req: Request, res: Response) {
  // pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
  //   if (error) {
  //     throw error;
  //   }

  //   res.status(200).json(results.rows);
  // });

  const results = await pool.query("SELECT * FROM users ORDER BY id ASC");
  res.status(200).json(results.rows);
}

export async function addUser(req: Request, res: Response) {
  const { email, firstName, lastName, password, profileUrl }: User = req.body;
  const subscribers = 0;
  const queryString = `INSERT INTO users VALUES (${email}, ${firstName}, ${lastName}, ${password}, ${profileUrl}, ${subscribers})`;
  const results = await pool.query(queryString);
}
