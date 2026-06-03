const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")

//DB Connections with mongo + postgres
const conn = require("./config/conn");
const {pgConn} = require("./config/psqlConn")


// Routes - v1.0.0.1
const todoRoute  = require("./route/todo.route")
const userRoute = require("./route/user.route")
const appPurchaseRoute = require("./route/appPurchase.route")

//Error Handling
const {errorHandler ,  globalErrorHandler} = require("./middlewares/ErrorHandlingMiddleware")

const app = express()


// Common Middleware
app.use("/payment/webhook", express.raw({ type: "application/json" }));
app.use(cors())
app.use(express.json())
app.use("/todo",todoRoute)
app.use("/user",userRoute)
app.use("/payment",appPurchaseRoute)
app.use(errorHandler);



const PORT = process.env.PORT


app.listen(PORT , ()=>{
    conn()
    pgConn()
    console.log(`App is running on PORT ${PORT}`);      
})



