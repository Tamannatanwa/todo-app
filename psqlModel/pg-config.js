const {Client} = require('pg');

const conn = new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"1",
    database:"todo"
})

const pgConn = async ()=>{
    const res = await conn.connect()
    console.log(`connected to postgres db`)
}

module.exports = {pgConn}