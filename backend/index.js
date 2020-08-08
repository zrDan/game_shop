const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //Access to req.body info
const morgan = require("morgan");
const cors = require("cors");
const app = express();

//Settings
require("dotenv").config();
const port = process.env.PORT;

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

//Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));

//Routes
app.use("/api/videogame", require("./src/routes/videogames"));
app.use("/api/console", require("./src/routes/consoles"));
app.use("/api/auth", require("./src/routes/auth"));

//Server
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
