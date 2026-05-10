

const { PrismaClient } = require('../psqlModel/generated/prisma')

const prisma = new PrismaClient();

const pgConn = async ()=>{
 try{
        const conn = await prisma.$connect()
        console.log("connected to postgres")
    }
    catch(err){
        await prisma.$disconnect()
        console.log(err)
        process.exit(1)
    }
}

module.exports = {pgConn,prisma };


