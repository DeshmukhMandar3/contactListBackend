const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const userRouter = require("./routes/user.routes");
const contactRouter = require("./routes/contact.routes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.use("/contact", contactRouter);

app.get("/", (req, res, next) => {
  res.send("Home Route");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to the Database");
  } catch (err) {
    console.log("Error connecting to the Database");
  }
  console.log(`Server Started at port ${process.env.PORT}`);
});
