const jwt = require("jsonwebtoken");
const config = process.env;

const tokenAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  //console.log(token);
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
    req.username = decodedTok.username;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  const token = req.cookies.jwt;
  //console.log(token);
  if (!token)
    res
      .status(401)
      .json({ message: "1 You are not authorized for this route." });

  jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
    console.log(decodedToken.username, decodedToken.role);
    if (err) {
      return res
        .status(401)
        .json({ message: "2 You are not authorized for this route." });
    } else {
      if (decodedToken.role !== "ADMIN") {
        return res
          .status(401)
          .json({ message: "3 You are not authorized for this route." });
      } else {
        next();
      }
    }
  });
};

module.exports = {
  tokenAuth,
  isAdmin,
};
