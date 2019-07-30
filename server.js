const express = require("express");

const app = express();

const mysql = require("mysql");
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

//check connection is running or not, handle errors
mysqlConnection.connect(err => {
  if (!err) console.log(`DB connection succeded`);
  else
    console.log(
      `DB connection failed Error: ` + JSON.stringify(err, undefined, 2)
    );
});

app.get(`/employees`, (req, res) => {
  mysqlConnection.query("SELECT * FROM Employee", (err, rows, field) => {
    if (!err) {
      res.send(rows);
      //console.log(rows);
    } else console.log(err);
  });
});

app.get(`/employees/:id`, (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM Employee WHERE EmpID =?",
    [req.params.id],
    (err, rows, field) => {
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else console.log(err);
    }
  );
});
//Delete an item by argument
app.delete(`/employees/:id`, (req, res) => {
  mysqlConnection.query(
    "DELETE FROM Employee WHERE EmpID =?",
    [req.params.id],
    (err, rows, field) => {
      if (!err) res.send("Deleted successfully");
      else console.log(err);
    }
  );
});
//Add an new item without input EmpId
app.post("/employees", (req, res) => {
  let emp = req.body;
  console.log(emp);
  emp.EmpID = 0;

  let sql =
    "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
  CALL EmployeeAddOrEdit(@EmpID, @Name, @EmpCode, @Salary)";
  mysqlConnection.query(
    sql,
    [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
    (err, rows, field) => {
      if (!err) res.send(emp);
      else console.log(err);
    }
  );
});
//Update an item by EmpID.
app.put("/employees", (req, res) => {
  let emp = req.body;

  let sql =
    "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
  CALL EmployeeAddOrEdit(@EmpID, @Name, @EmpCode, @Salary)";
  mysqlConnection.query(
    sql,
    [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
    (err, rows, field) => {
      if (!err) res.send("Updated successfully");
      else console.log(err);
    }
  );
});

//Server
const port = 4000;

const server = app.listen(port, () => {
  console.log(
    `Port ${port} starts listening =======================================>`
  );
});

app.get("/api/students", (req, res) => {
  const students = [
    { id: 1, firstName: "Captain", lastName: "fancy" },
    { id: 2, firstName: "John", lastName: "Jordan" },
    { id: 3, firstName: "James", lastName: "Harden" }
  ];
  res.json(students);
});
