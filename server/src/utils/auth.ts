import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

import pool from "./database";

const pjs = (passport: any) => {
  passport.use(
    new LocalStrategy(async function verify(
      username: string,
      password: string,
      cb: any
    ) {
      const results = await pool.query(
        `SELECT * FROM users WHERE username = $1`,
        [username]
      );

      const match = await bcrypt.compare(password, results.rows[0].password);

      if (results.rows.length === 0 || !!!match) {
        return cb(null, false, { message: "Incorrect username or password" });
      } else {
        return cb(null, results.rows[0]);
      }
    })
  );

  passport.serializeUser(function (user: any, cb: any) {
    process.nextTick(function () {
      cb(null, { id: user?.user_id, username: user?.username });
    });
  });

  passport.deserializeUser(function (user: any, cb: any) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

export default pjs;