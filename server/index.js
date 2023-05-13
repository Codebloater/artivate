import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

import connectDB from "./mongodb/connect.js";
import newsletterSchema from "./mongodb/models/Newsletter.js";
import userSchema from "./mongodb/models/User.js";

dotenv.config();
const app = express();

// Mongoose Models
const Newsletter = mongoose.model("Newsletter", newsletterSchema);
const User = mongoose.model("User", userSchema);

//Middlewares
app.use(cors());
app.use(express.json());

/// Routes

// Newsletter Route
app.post("/subscribe", (req, res) => {
  const { email } = req.body;

  const newSubscriber = new Newsletter({ email });

  newSubscriber
    .save()
    .then(() => {
      res.json({ message: "Subscription successful" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Subscription failed" });
    });
});

// FeedBack Mail Route
app.post("/feedback", async (req, res) => {
  const { subject, message } = req.body;

  // const newQuery = new FeedBack({ subject, message });

  var transponder = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: "harshpathak@unimos.tech",
    to: "harshpathak27501@gmail.com",
    subject: `Query: ${subject}`,
    text: message,
  };

  try {
    transponder.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// SignUp Route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the Password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    // Save the user to the database
    await newUser.save();
    res.json({ message: "Signup Successful" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
});

// LogIn Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    res.json({ message: "Login Successful" });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => {
      console.log(`listening to port ${process.env.PORT}...`);
    });
  } catch (error) {}
};

startServer();
