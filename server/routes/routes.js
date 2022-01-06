//const router = require("express").Router();
import express from "express";
import authRouter from "./auth.routes.js";
import todoRouter from "./todo.routes.js";
import userRouter from "./user.routes.js";

export default function allRoutes(database) {
  var router = express.Router();

  const authRoutes = authRouter(database);
  const userRoutes = userRouter(database);
  const todoRoutes = todoRouter(database);

  router.use("/auth", authRoutes);
  router.use("/todos", todoRoutes);
  router.use("/users", userRoutes);

  return router;
}
