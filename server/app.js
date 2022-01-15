import express, { json, urlencoded } from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import router from "./routes/routes.js";
import passportConfig from "./config/passport.js";

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

passportConfig(passport);
app.use(passport.initialize());

app.use(router);

export default app;
