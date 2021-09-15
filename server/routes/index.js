const router = require("express").Router();

router.use("/users", require("./user.routes"));
router.use("/todos", require("./todo.routes"));

module.exports = router;
