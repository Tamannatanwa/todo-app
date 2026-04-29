const express = require("express")
const app = express()
app.use(express.json())

const PORT = process.env.PORT

app.listen(PORT , ()=>{
    console.log(`App is running on PORT ${PORT}`);      
})