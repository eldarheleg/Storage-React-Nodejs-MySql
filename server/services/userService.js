const db = require("../models");
const config = process.env;
const User = db.user;
const Employee = db.employee;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const { options } = require("../routes/userRoutes");

exports.signup = async (req, res) => {
  const today = new Date();
  const { firstName, lastName, adress, email, username, password } = req.body;
  const newEmployee = Employee.create({
    firstName,
    lastName,
    adress,
    email,
    start_date: today,
  });
  // const generateUser = User.create({
  //   username,
  //   password: await bcrypt.hash(password, 10),
  // });
  const existUser = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!existUser) {
    try {
      Employee.afterCreate(async (employee, options) => {
        await User.create({
          username,
          password: await bcrypt.hash(password, 10),
          employeeId: employee.id
        });
      });
      console.log("User created successfully!");
    } catch (error) {
      console.error("Error creating User:", error);
    }
  } else {
    res.json({ error: "User already exists" });
  }
  return res.status(200).json({ message: "success" });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);
        }
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};
