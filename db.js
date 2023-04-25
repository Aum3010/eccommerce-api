const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL!");
});

module.exports = connection;
