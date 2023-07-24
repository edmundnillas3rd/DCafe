import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import pool from "../utils/database";

dotenv.config();

// export async function getUsers(req: Request, res: Response) {
//   const results = await pool.query("SELECT * FROM users ORDER BY id ASC");
//   res.status(200).json(results.rows);
// }

interface IUser extends User {
  user_id: string;
}

// POST
export async function loginUser(req: Request, res: Response) {
  const user: IUser = req.user as IUser;
  const token = jwt.sign(
    { id: user?.user_id as string },
    process.env.JWT_SECRET as string
  );
  res.status(200).json({ message: "Successfully login", token });
}

export async function logoutUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.logout(function (err) {
    if (err) return next(err);

    res.status(200).json({ message: "Successfully logout" });
  });
}

export async function signupUser(req: Request, res: Response) {
  const { username, firstName, lastName, email, password, profileUrl }: User =
    req.body;
  const subscribers = 0;

  const hashedPassword = await bcrypt.hash(password, 10);

  const values = [
    username,
    firstName,
    lastName,
    email,
    hashedPassword,
    subscribers,
    profileUrl,
  ];

  const queryString = `INSERT INTO users(user_id, username, first_name, last_name, email, password, subscribers, profile_url) VALUES(gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const results = await pool.query(queryString, values);
  res.status(200).json(results.rows[0]);
}
