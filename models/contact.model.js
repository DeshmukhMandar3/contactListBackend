const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  createdBy: { type: String, required: true },
});

const contactModel = mongoose.model("contact", contactSchema);

module.exports = contactModel;
