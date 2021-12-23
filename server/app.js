import express, { json, urlencoded } from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import routes from "./routes/routes.js";
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // TODO: Use env to pull this value
    credentials: true,
  })
);
app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

import passportConfig from "./config/passport.js";
passportConfig(passport);
app.use(passport.initialize());

app.use(routes);

export default app;
