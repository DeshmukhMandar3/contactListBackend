const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const userExists = require("../middlewares/user.exists");
const authorization = require("../middlewares/authorization");
require("dotenv").config();
const userRouter = express.Router();

userRouter.post("/register", userExists, (req, res, next) => {
  let details = req.body;
  try {
    bcrypt.hash(
      details.password,
      +process.env.saltRounds,
      async (err, hash) => {
        if (err) {
          res.status(500).send(err);
        } else {
          details.password = hash;
          try {
            let user = new userModel(details);
            await user.save();
            res.status(201).send("User Registered Successfully");
          } catch (err) {
            res.status(500).send(err);
          }
        }
      }
    );
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.post("/login", async (req, res, next) => {
  let details = req.body;
  if (!details.email || !details.password) {
    res.status(400).send({ error: "Email id or password is missing" });
  }
  try {
    let users = await userModel.find({ email: details.email });
    if (users.length != 0) {
      let match = await bcrypt.compare(details.password, users[0].password);
      if (match) {
        let token = jwt.sign({ id: users[0]._id }, "masai");
        res.status(200).send({ token, id: users[0]._id });
      } else {
        res.status(406).send({ error: "Wrong Password!" });
      }
    } else {
      res.status(406).send({ error: "Wrong email-id!" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.get("/get/:id", authorization, async (req, res, next) => {
  let { id } = req.params;
  try {
    let user = await userModel.findById(id);
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = userRouter;
