const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  let token = req.headers.authorization;
  try {
    var decoded = jwt.verify(token, "masai");
    req.body.createdBy = decoded.id;
    next();
  } catch (err) {
    res.status(500).send({ error: "Invalid Token" });
  }
};

module.exports = authorization;
