import { Request, Response } from "express";
import pool from "../utils/database";

export async function getUsers(req: Request, res: Response) {
  const results = await pool.query("SELECT * FROM users ORDER BY id ASC");
  res.status(200).json(results.rows);
}

export async function addUser(req: Request, res: Response) {
  const { email, firstName, lastName, password, profileUrl }: User = req.body;
  const subscribers = 0;

  const values = [
    email,
    firstName,
    lastName,
    password,
    profileUrl,
    subscribers,
  ];

  const queryString = `INSERT INTO users(email, first_name, last_name, password, profile_url, subscribers) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
  const results = await pool.query(queryString, values);
  res.status(200).json(results.rows[0]);
}
