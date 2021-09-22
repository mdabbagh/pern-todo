const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/todos", require("./todo.routes"));
router.use("/users", require("./user.routes"));

module.exports = router;
