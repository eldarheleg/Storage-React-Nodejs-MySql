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
  const {
    firstName,
    lastName,
    address,
    email,
    username,
    password,
    role,
    phoneNumber,
  } = req.body;
  let transactions = await db.sequelize.transaction();

  //check user existence
  const existUser = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!existUser) {
    try {
      //create employee then create user based on employee
      const newEmployee = await Employee.create(
        {
          firstName,
          lastName,
          address,
          email,
          phoneNumber,
          start_date: today,
        },
        { transaction: transactions }
      );
      const newUser = await User.create(
        {
          username: username,
          password: await bcrypt.hash(password, 10),
          role,
          employeeId: newEmployee.id,
        },
        { transaction: transactions }
      );

      //then create token for reg user
      const token = createToken({
        username: newUser.username,
        role: newUser.role,
      });

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000, // 3hrs in ms
      });

      await transactions.commit();

      res.status(201).json({
        message: "User successfully created",
        user: newUser.username,
        role: newUser.role,
         token: token,
      });
    } catch (error) {
      await transactions.rollback();
      res.status(500).json({ error: error.message });
    }
  } else {
    await transactions.rollback();
    res.status(500).json({ error: "User already exists" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(500).json({ message: "Username doesn't exist!" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(500).json({ message: "Password is not correct!" });
    }

    // Generate a JWT token
    const token = createToken({ username: user.username, role: user.role });

    //store jwt and role into cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000, // 3hrs in ms
    });

    res.status(201).json({
      message: "User successfully logged",
      employeeId: user.employeeId,
      user: user.username,
      role: user.role,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("jwt");

  res.status(201).json({ message: "Logged out successfully" });
};

exports.updatePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPass, newPass } = req.body;
  let transactions = await db.sequelize.transaction();

  const existUser = await User.findOne({
    where: {
      employeeId: id,
    },
  });

  if (!existUser) res.status(404).json({ message: "User not found" });

  try {
    const isPasswordValid = await bcrypt.compare(
      currentPass,
      existUser.password
    );

    if (!isPasswordValid) {
      res.status(502).json({ message: "Current password is not correct!" });
    } else {
      const updated = await User.update(
        {
          password: await bcrypt.hash(newPass, 10),
        },
        { where: { employeeId: id } },
        { transaction: transactions }
      );

      await transactions.commit();

      res
        .status(200)
        .json({ message: "Password updated successfully", updated });
    }
  } catch (error) {
    await transactions.rollback();
    res.status(500).json({ message: "failed to update pass" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    const users = await User.findAll();
    res.status(200).json({ employees, users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

exports.getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      res.status(200).json({ employee });
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employee" });
  }
};
