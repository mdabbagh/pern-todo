const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "testing123",
  host: "localhost",
  database: "perntodo",
});

module.exports = pool;
