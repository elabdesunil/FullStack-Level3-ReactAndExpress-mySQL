const express = require("express");

const app = express();

//Server
const port = 4000;

const server = app.listen(port, () => {
  console.log(
    `Port ${port} is listening =======================================>`
  );
});

const morgan = require("morgan");

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extened: true }));

app.get("/api/students", (req, res) => {
  const students = [
    { id: 1, firstName: "Captain", lastName: "fancy" },
    { id: 2, firstName: "John", lastName: "Jordan" },
    { id: 3, firstName: "James", lastName: "Harden" }
  ];
  res.json(students);
});
