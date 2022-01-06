// Imports all of the routes from ./routes/index.js
import database from "./config/db.js";
import makeApp from "./app.js";

const app = makeApp(database);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
