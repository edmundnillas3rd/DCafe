import passport from "passport";

export const authenticate = passport.authenticate("local", { session: false });
export const authorize = passport.authenticate("jwt", { session: false });
