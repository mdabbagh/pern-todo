//const router = require("express").Router();
import express from "express";
import authRouter from "./auth.routes.js";
import todoRouter from "./todo.routes.js";
import userRouter from "./user.routes.js";
var router = express.Router();

router.use("/auth", authRouter);
router.use("/todos", todoRouter);
router.use("/users", userRouter);

export default router;
