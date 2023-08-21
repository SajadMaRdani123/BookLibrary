const express = require("express");
const mongoose = require("./db");
const users = require("./routes/user");
const books = require("./routes/book");
const reviews = require("./routes/review");
const genres = require("./routes/genre");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use("/users", users);
app.use("/books", books);
app.use("/reviews", reviews);
app.use("/genres", genres);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
