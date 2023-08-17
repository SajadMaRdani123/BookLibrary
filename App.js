// import { createServer } from "http";
// import { rename, readFile } from "fs";
// rename("x.html", "sajad.html", function (err) {
//   if (err) throw err;
//   console.log("File Renamed!");
// });
// createServer(function (req, res) {
//   readFile("sajad.html", function (err, data) {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write(data);
//     return res.end();
//   });
// }).listen(8080);
///////////////////////////////////////
// const EventEmitter = require("events");

// const Logger = require("./logger");
// const logger = new Logger();
// logger.on("messageLogged", (arg) => {
//   console.log("listener Called", arg);
// });
// logger.log("message");
////////////////////////////////////////////////
// const http = require("http");
// const server = http
//   .createServer((req, res) => {
//     if (req.url === "/") {
//       res.write("hello World");
//     }
//   })
//   .listen(8080);

// console.log("listening on port 3000");
const express = require("express");
const app = express();
const morgan = requrie("morgan");
const helmet = require("helmet");
const logger = require("./logger");
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(helmet());
app.use(morgan("tiny"));
app.use(logger);
app.use(function (req, res, next) {
  console.log("authenticating");
  next();
});
const courses = [
  {
    id: 1,
    name: "course1",
  },
  {
    id: 2,
    name: "course2",
  },
  {
    id: 3,
    name: "course3",
  },
];
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});
app.post("/api/courses", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send("Name is required and should be minimum 3 characters");
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course)
    res.status(404).send("the course with the given id does not found");
  res.send(course);
});

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
