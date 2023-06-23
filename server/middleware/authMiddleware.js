const jwt = require("jsonwebtoken");
const config = process.env;
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log(token)
  if (!token) {
    return res.status(403).send({
      message: "A token is required for authentication",
    });
  }

  jwt.verify(token, config.SECRET_KEY, (err, decodedTok) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decodedTok.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  console.log(token)
  let userID = null;
  let good = false;
  if (!token)
    res.status(401).json({ message: "1 You are not authorized for this route." });
  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    good = false;
    userID = null;
    if (err)
      return res
        .status(401)
        .json({ message: "2 You are not authorized for this route." });
    good = true;
    userID = decodedToken.id;
  });
  if (good) {
    const user = await User.findById(userID);
    //  console.log(user.role);
    if (user?.role === "ADMIN") next();
    else
      res
        .status(403)
        .json({ message: "3 You are not authorized for this route." });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
};
