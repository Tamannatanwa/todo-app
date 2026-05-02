const express = require("express")
const dotenv = require("dotenv").config()


//DB Connections with mongo + postgres
const conn = require("./config/conn");
const pgConn = require("./config/psqlConn")


// Routes - v1.0.0.1
const todoRoute  = require("./route/todo.route")
const userRoute = require("./route/user.route")

//Error Handling
const {errorHandler ,  globalErrorHandler} = require("./middlewares/ErrorHandlingMiddleware")

const app = express()


// Common Middleware
app.use(express.json())
app.use("/todo",todoRoute)
app.use("/user",userRoute)
app.use(errorHandler);


const PORT = process.env.PORT


app.listen(PORT , ()=>{
    conn()
    pgConn()
    console.log(`App is running on PORT ${PORT}`);      
})



