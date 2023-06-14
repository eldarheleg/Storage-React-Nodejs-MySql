const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
let secret = process.env.SECRET;

app.use(express.json());
app.use(cors({ origin: "*" }));

// database conection
const db = require("./models").default.default;

// Routes
const postsRoutes = require("./routes/Posts");
app.use("/api/posts", postsRoutes);

const authRoutes = require("./routes/Auth");
app.use("/api/auth", authRoutes);

db.sequelize.sync({force: true}).then(() => {
  app.listen(3001, () => {
    console.log("aplikacija pokrenuta, drop db true");
  });
});
