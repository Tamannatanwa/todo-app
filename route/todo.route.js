const express = require("express");

const router = express.Router();

const {
  addTodo,
  getAllTodo,
  getTodoById,
  updateTodoById,
  deleteTodoById,
} = require("../controller/todo");
const { authMiddlewareJwt } = require("../middlewares/auth.middleware");

router.post("/add-task", authMiddlewareJwt, addTodo);
router.get("/", authMiddlewareJwt, getAllTodo);
router.get("/:id", authMiddlewareJwt, getTodoById);
router.put("/:id", authMiddlewareJwt, updateTodoById);
router.delete("/:id", authMiddlewareJwt, deleteTodoById);

module.exports = router;
