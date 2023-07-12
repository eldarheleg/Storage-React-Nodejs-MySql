const jwt = require("jsonwebtoken");


const tokenAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  //console.log(token);
  if (!token) {
    return res.status(403).send({
      message: "A token is required for authentication",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decodedTok) => {
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

  //console.log(token + "from backend");
  if (!token)
    res
      .status(401)
      .json({ message: "1 You are not authorized for this route." });

  jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
    //console.log(decodedToken);
    if (err) {
      return res
        .status(401)
        .json({ message: "2 You are not authorized for this route." });
    } else {
      console.log(decodedToken)
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
