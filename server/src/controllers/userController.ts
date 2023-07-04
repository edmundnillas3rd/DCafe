import { Request, Response } from "express";
import pool from "../utils/database";

export function getUsers(req: Request, res: Response) {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }

    res.status(200).json(results.rows);
  });
}
