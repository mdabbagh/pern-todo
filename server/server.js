const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // TODO: Use env to pull this value
    credentials: true,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

require("./config/passport")(passport);
app.use(passport.initialize());

// Imports all of the routes from ./routes/index.js
app.use(require("./routes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
