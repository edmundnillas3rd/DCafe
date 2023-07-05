import { Request, Response, NextFunction } from "express";
import pool from "../utils/database";
import bcrypt from "bcrypt";

// export async function getUsers(req: Request, res: Response) {
//   const results = await pool.query("SELECT * FROM users ORDER BY id ASC");
//   res.status(200).json(results.rows);
// }

// POST
export async function loginUser(req: Request, res: Response) {
  res.status(200).json({ message: "Successfully login " });
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
  const { email, firstName, lastName, password, profileUrl, username }: User =
    req.body;
  const subscribers = 0;

  const hashedPassword = await bcrypt.hash(password, 10);

  const values = [
    email,
    firstName,
    lastName,
    hashedPassword,
    profileUrl,
    subscribers,
    username,
  ];

  const queryString = `INSERT INTO users(email, first_name, last_name, password, profile_url, subscribers, username) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const results = await pool.query(queryString, values);
  res.status(200).json(results.rows[0]);
}
