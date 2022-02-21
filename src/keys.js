require('dotenv').config()

console.log(process.env)

module.exports = {
    database : {
        host: process.env.DATABASE_HOST || "localhost",
        user: process.env.DATABASE_USER || "root",
        password: process.env.DATABASE_PASSWORD || "mypassword",
        database: process.env.DATABASE_NAME || "dblinks",
    }

};