const userModel = require("../models/user.model");

const userExists = async (req, res, next) => {
  let details = req.body;
  try {
    const users = await userModel.find({ email: details.email });
    if (users.length == 0) {
      next();
    } else {
      res.send({ error: "User already exists kindly login" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = userExists;
