import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";

import User from "./models/userSchema.js";

const app = express();

app.get("/", (req, res) => {
  res.send("How are you");
});

//Connection to mongoDB
const URL = `mongodb+srv://jagdishkumawat81:againtry@cluster0.qbitqpt.mongodb.net/user-auth`;

mongoose
  .connect(URL)
  .then(() => {
    console.log("connected to mongoDb");
    app.listen(4000, () => {
      console.log("listening at Port : 4000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

//Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
//USER REGISTRATION -> POST REQUEST

app.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      throw new Error("Invalid User");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await User.save(newUser);

    return res.status(200).json({ message: "successfully saved", newUser });
  } catch (error) {
    console.log("Error - while registering the user", error);
    return res
      .status(500)
      .json({ message: "Failed to register the user", error: error.message });
  }
});
