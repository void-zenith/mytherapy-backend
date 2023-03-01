const mysql = require("mysql");

//mysql connection
const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database:process.env.DATABASE_DB,
});

db.on("connection", (connection) => {
  console.log("DB CONNECTED");
  connection.on("error", function (err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function (err) {
    console.error(new Date(), "MySQL close", err);
  });
});

module.exports = db;
