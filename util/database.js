module.exports = function() {
    this.connection = function () {
        const mysql = require("mysql")
        var conn = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        return conn
    }
}