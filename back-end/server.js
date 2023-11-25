import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
// USER REGISTRATION -> POST REQUEST

app.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      throw new Error("Invalid User");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    return res.status(200).json({ message: "successfully saved", newUser });
  } catch (error) {
    console.log("Error - while registering the user", error);
    return res
      .status(500)
      .json({ message: "Failed to register the user", error: error.message });
  }
});

// GET REGISTERED USERS

app.get("/user", async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      throw Error("Didn't get user in DB");
    }
    res.status(201).json(users);
  } catch (error) {
    console.log("Error while getting user : ", error);
    res.status(404).json({ message: "Error while fetching user" });
  }
});

//GET LOGIN

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "Invalid Credentials!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({ error: "Invalid Credentials!" });
    }

    const token = jwt.sign({ userId: user._id }, "secret", {
      expiresIn: "1hr",
    });
    res.json({ message: "Login successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});
