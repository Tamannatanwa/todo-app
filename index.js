const express = require("express")
const dotenv = require("dotenv").config()
const conn = require("./config/conn");
const todoRoute  = require("./route/todo.route")
const userRoute = require("./route/user.route")
const {errorHandler ,  globalErrorHandler} = require("./middlewares/ErrorHandlingMiddleware")

const app = express()

app.use(express.json())


// Routes - v1.0.0.1
app.use("/todo",todoRoute)
app.use("/user",userRoute)


app.use(errorHandler);


// app.use(globalErrorHandler)


const PORT = process.env.PORT

app.listen(PORT , ()=>{
    conn()
    console.log(`App is running on PORT ${PORT}`);      
})