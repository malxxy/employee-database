const mysql = require('mysql2'); // require sql

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "codecode123",
    database: "employees_db"
  });


con.connect(function(err) {
    if (err) throw err;
  });

  module.exports = con;