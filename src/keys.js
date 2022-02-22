require('dotenv').config()

console.log(process.env)

module.exports = {
    database : {
        host: process.env.DATABASE_HOST || "us-cdbr-east-05.cleardb.net",
        user: process.env.DATABASE_USER || "bddd953942586c",
        password: process.env.DATABASE_PASSWORD || "e66a0745",
        database: process.env.DATABASE_NAME || "heroku_26c7ba1822fc4a9",
    }

};