const mysql = require('mysql');
const config = require('config');
let db;

//connect to required database
function connectDatabase() {
    if (!db) {
        db = mysql.createConnection({
            host     : config.mySQL.credentials.host,
            port: config.mySQL.credentials.port,
            database : config.mySQL.credentials.dataBase,
            user     : config.mySQL.credentials.username,
            password : config.mySQL.credentials.password,
        });

        db.connect(function(err){
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
            }
        });
    }
    return db;
}

module.exports = connectDatabase();