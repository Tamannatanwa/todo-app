

const { PrismaClient } = require('../psqlModel/generated/prisma')

const prisma = new PrismaClient();


const pgConn = async ()=>{
 try{
        const conn = await prisma.$connect()
        console.log("connected to postgres")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = pgConn;


