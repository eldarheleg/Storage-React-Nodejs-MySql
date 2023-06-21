const db = require("../models");
const config = process.env;
const User = db.user;
const Employee = db.employee;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const today = new Date();
  const { firstName, lastName, adress, email, username, password } = req.body;

  const existUser = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!existUser) {
    try {
      Employee.create({
        firstName,
        lastName,
        adress,
        email,
        start_date: today,
      });
      Employee.afterCreate(async (employee, options) => {
        await User.create({
          username,
          password: await bcrypt.hash(password, 10),
          employeeId: employee.id,
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

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Username doesn't exist!" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password is not correct!" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET_KEY
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
