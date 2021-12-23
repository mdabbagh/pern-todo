import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import pool from "./db.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

// The verifying secret
const SECRET = process.env.TOKEN_SECRET;

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
  algorithms: ["HS256"],
};

// app.js will pass the global passport object here, and this function will configure it
export default (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, function (jwt_payload, done) {
      // Since we are here, the JWT is valid!
      pool.query(
        'SELECT * FROM "user" WHERE user_id = $1',
        [jwt_payload.sub],
        (err, user) => {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
      );
    })
  );
};
