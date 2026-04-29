const express = require("express")
const dotenv = require("dotenv").config()
const conn = require("./config/conn");
const app = express()
app.use(express.json())

const PORT = process.env.PORT

app.listen(PORT , ()=>{
    conn()
    console.log(`App is running on PORT ${PORT}`);      
})