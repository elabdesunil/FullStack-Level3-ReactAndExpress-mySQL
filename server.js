const express = require("express");

const app = express();

const mysql = require("mysql");
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extened: true }));
const morgan = require("morgan");
app.use(morgan("dev"));

//connect to mySQL
const mysqlConnection = mysql.createConnection({
  host: "10.9.3.218",
  user: "TWStudent",
  password: "TechWorks!",
  database: "employeedb",
  multipleStatements: true
});
//check connection is working or not
mysqlConnection.connect(err => {
  if (!err) console.log(`DB connection succeded`);
  else
    console.log(
      `DB connection failed Error: ` + JSON.stringify(err, undefined, 2)
    );
});

//Server
// const port = 4000;
//
// const server = app.listen(port, () => {
//   console.log(
//     `Port ${port} is listening =======================================>`
//   );
// });
//
// app.get("/api/students", (req, res) => {
//   const students = [
//     { id: 1, firstName: "Captain", lastName: "fancy" },
//     { id: 2, firstName: "John", lastName: "Jordan" },
//     { id: 3, firstName: "James", lastName: "Harden" }
//   ];
//   res.json(students);
// });
