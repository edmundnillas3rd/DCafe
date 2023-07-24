import { Strategy as LocalStrategy } from "passport-local";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  type StrategyOptions,
} from "passport-jwt";
import bcrypt from "bcrypt";

import pool from "./database";
import dotenv from "dotenv";

dotenv.config();

const pjs = (passport: any) => {
  const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };
  
  passport.use(
    new JwtStrategy(options, async function verify(jwt_payload, done) {
      const results = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [jwt_payload.id]
      );

      if (results.rows.length) {
        return done(null, results.rows[0]);
      } else {
        return done(null, false);
      }
    })
  );

  passport.use(
    new LocalStrategy(async function verify(
      username: string,
      password: string,
      cb: any
    ) {
      const results = await pool.query(
        "SELECT * FROM users WHERE username = $1",
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
