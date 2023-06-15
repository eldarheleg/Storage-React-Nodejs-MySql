const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
let secret = process.env.SECRET;


app.use(express.json());
//app.use(cors({ origin: "*" }));

//db connect
const db = require("./models");
const Role = db.role

app.get("/", (req, res) => {
  res.json({ message: "Welcome to your application." });
});

// Routes
// const postsRoutes = require("./routes/Posts");
// app.use("/api/posts", postsRoutes);

// const authRoutes = require("./routes/Auth");
// app.use("/api/auth", authRoutes);

db.sequelize.sync({force: true}).then(() => {
  app.listen(3001, () => {
    console.log("aplikacija pokrenuta 3001, drop db true");
    initial();
  });
}
);
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}