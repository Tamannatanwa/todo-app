const express = require("express")
const dotenv = require("dotenv").config()
const conn = require("./config/conn");
const todoRoute  = require("./route/todo.route")

const app = express()

app.use(express.json())

app.use("/todo",todoRoute)

const PORT = process.env.PORT

app.listen(PORT , ()=>{
    conn()
    console.log(`App is running on PORT ${PORT}`);      
})