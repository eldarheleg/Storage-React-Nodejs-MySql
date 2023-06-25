const db = require("../models/connection");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const maxAge = 3 * 60 * 60;
const User = db.user;
const Employee = db.employee;

const createToken = (object) => {
  return jwt.sign(object, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

exports.signup = async (req, res) => {
  const today = new Date();
  const { firstName, lastName, adress, email, username, password, role } =
    req.body;

  //check user existence
  const existUser = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!existUser) {
    try {
      //create employee then create user based on employee
      await Employee.create({
        firstName,
        lastName,
        adress,
        email,
        start_date: today,
      }).then(async (employee) => {
        User.create({
          username: username,
          password: await bcrypt.hash(password, 10),
          role,
          employeeId: employee.id,
        }).then((user) => {
          //then create token for reg user
          const token = createToken({
            username: user.username,
            role: user.role,
          });
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.status(201).json({
            message: "User successfully created",
            user: user.username,
            role: user.role,
            token: token,
          });
        });
      });
    } catch (error) {
      console.error("Error creating User:", error);
    }
  } else {
    res.json({ error: "User already exists" });
  }
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
    const token = createToken({username: user.username,role: user.role});
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000, // 3hrs in ms
    });

    res.status(201).json({
      message: "User successfully logged",
      user: user.username,
      role: user.role,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

exports.getOne = async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findByPk(username);
    const employee = await Employee.findByPk(user.employeeId);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employee" });
  }
};
