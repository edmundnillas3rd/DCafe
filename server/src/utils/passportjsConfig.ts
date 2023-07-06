import passport from "passport";

export const authenticate = passport.authenticate("local", { session: false });
