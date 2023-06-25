const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");


// parse cookie
app.use(cookieParser());
// parse json
app.use(express.json());

//db connect
const db = require("./models/connection");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to your application." });
});

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("aplikacija pokrenuta 3001");
  });
});
