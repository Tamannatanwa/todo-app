const express = require("express");

const router = express.Router()

const {addTodo,getAllTodo ,getTodoById ,updateTodoById ,deleteTodoById} = require("../controller/todo")

router.post("/add-task",addTodo);
router.get("/",getAllTodo)
router.get("/:id",getTodoById)
router.put("/:id",updateTodoById)
router.delete("/:id",deleteTodoById)

module.exports = router;