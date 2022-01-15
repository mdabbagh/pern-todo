import express from "express";
import passport from "passport";
import * as todoModel from "../models/todo.model.js";

var todoRouter = express.Router();

// Create todo
todoRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.rows[0].user_id;
      const { description } = req.body;

      if (description === "") {
        res.status(400).json("Description cannot be empty.");
        return;
      }

      if (!userId) {
        res.status(400).json("User must be specified.");
        return;
      }

      const newTodo = await todoModel.createTodo(userId, description);

      res.status(200).json(newTodo.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(400).json("Something went wrong adding a new todo.");
    }
  }
);

// Get all todos
todoRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.rows[0].user_id;
      const allTodos = await todoModel.getTodos(userId);

      res.status(200).json(allTodos.rows);
    } catch (err) {
      console.log(err);
      res.status(400).json("Something went wrong getting all todos.");
    }
  }
);

// Get a todo
todoRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.rows[0].user_id;
      const { id } = req.params;
      const todo = await todoModel.getTodo(id, userId);

      res.status(200).json(todo.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(400).json("Something went wrong getting todo.");
    }
  }
);

// Update a todo
todoRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.rows[0].user_id;
      const { id } = req.params;
      const { description } = req.body;

      if (description === "") {
        res.status(400).json("Description can't be empty.");
      }

      const updatedTodo = await todoModel.updateTodo(description, id, userId);

      res.status(200).json(updatedTodo.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(400).json("Something went wrong updating todo.");
    }
  }
);

// Delete a todo
todoRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.rows[0].user_id;
      const { id } = req.params;

      const deletedTodo = await todoModel.deleteTodo(id, userId);

      res.status(200).json(deletedTodo.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(400).json("Something went wrong deleting todo.");
    }
  }
);

export default todoRouter;