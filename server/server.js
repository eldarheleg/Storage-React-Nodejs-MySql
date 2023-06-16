const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
let secret = process.env.SECRET;


app.use(express.json());
//app.use(cors());

//db connect
const db = require("./models");
const Employee = db.employee
const User = db.user

app.get("/", (req, res) => {
  res.json({ message: "Welcome to your application." });
});

// Routes
const userRoutes = require('./routes/userRoutes')
app.use('/users',userRoutes)

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
  Employee.create({
    id: 1,
    firstName: "Eldar",
    lastName: "Heleg",
    adress: "putis",
    email: "eldar@gmail.com",
    start_date: Date.now(),
  });
 
  User.create({
    employeeId: 1,
    username: "admin",
    password: "admin",
    role: db.ROLES[1]
  });
}