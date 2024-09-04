import { Request, Response } from 'express';
import User from './userSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from "validator";
import { validateEmail } from '../utils';

// create token with user id
const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET as string, { expiresIn: '2h' });
}

// controller function to register user
const registerUser = async (req: Request, res: Response): Promise<void> => {
  const body = req.body;

  try {
    const exists = await User.findOne({ email: body.email });

    if (!body.username || !body.email || !body.password) {
      throw Error("Credentials not satisfied!");
    }

    if (!validateEmail(body.email)) {
      console.log("non sjsu email caught.");
      throw Error("Only SJSU email addresses are allowed!");
    }

    if (!validator.isStrongPassword(body.password)) {
      throw Error("Password is not strong enough!");
    }

    if (exists) {
      throw Error("User already exists!");
    }

    // generate salt and hash password
    // salt is a random string that is added to the password before hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = new User({
      username: body.username,
      email: body.email,
      password: hashedPassword,
    });

    const newEntry = await newUser.save();
    const token = createToken(newEntry._id as string);

    res.status(201).json({
      username: newEntry.username,
      email: newEntry.email,
      token: token,
    });
  } catch (error) {
    // Check if it's a validation error
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      // Handle internal server error
      console.log("Internal server error: ", error);
      res.status(500).json({ message: "Internal server error. User not created." });
    }
  }
}

// controller function to login user
const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const login = await User.findOne({
      email: req.body.email,
    });

    if (!login) {
      res.status(404).json({ message: "Email not found!" });
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, login.password);
    if (!validPassword) {
      res.status(400).json({ message: "Invalid password!" });
      return;
    }

    const token = createToken(login._id as string);
    console.log("Token Created: ", token);

    res.status(200).json({
      username: login.username,
      email: login.email,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error. User not logged in." });
  }
}

export { registerUser, loginUser };