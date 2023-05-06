const express = require("express");
const contactModel = require("../models/contact.model");
const authorization = require("../middlewares/authorization");

const contactRouter = express.Router();

contactRouter.post("/add", authorization, async (req, res, next) => {
  let details = req.body;
  try {
    let contact = new contactModel(details);
    await contact.save();
    res.status(201).send("New Contact Added Successfully!");
  } catch (err) {
    res.status(500).send(err);
  }
});

contactRouter.get("/get/:id", authorization, async (req, res, next) => {
  let { id } = req.params;
  try {
    let contacts = await contactModel.find({ createdBy: id });
    res.status(200).send(contacts);
  } catch (err) {
    res.status(500).send(err);
  }
});

contactRouter.patch("/update/:id", authorization, async (req, res, next) => {
  let { id } = req.params;
  let details = req.body;
  try {
    await contactModel.findByIdAndUpdate(id, details);
    res.send("Contact updated successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

contactRouter.delete("/delete/:id", authorization, async (req, res, next) => {
  let { id } = req.params;
  try {
    await contactModel.findByIdAndDelete(id);
    res.send("Contact deleted successfully");
  } catch (err) {
    res.send(500).send(err);
  }
});

module.exports = contactRouter;
