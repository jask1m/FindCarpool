const { User, RefreshToken } = require('./userSchema');
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from "validator";
import { validateEmail } from '../utils';
import { parseDuration } from '../utils';
import { sign } from 'crypto';

// create token with user id
const createToken = (_id: string) => {
  console.log(process.env.TOKEN_DURATION);
  return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: process.env.TOKEN_DURATION });
}

// controller function to register user
const registerUser = async (req: Request, res: Response): Promise<void> => {
  const body = req.body;

  try {
    const exists = await User.findOne({ email: body.email });
    if (exists) {
      throw Error("User already exists!");
    }

    if (!validateEmail(body.email)) {
      console.log("non sjsu email caught.");
      throw Error("Only `sjsu.edu` domains allowed!");
    }

    if (!validator.isStrongPassword(body.password)) {
      throw Error("Password is not strong enough!");
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
    const accessToken = createToken(newEntry._id as string);
    const refreshToken = jwt.sign({ login: newEntry._id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: process.env.REFRESH_DURATION });
    await RefreshToken.create({
      refreshToken,
      user: newEntry._id,
      expires: new Date(Date.now() + parseDuration(process.env.REFRESH_DURATION as string) * 1000),
    });

    // set refresh token in cookie
    const refreshDuration = parseDuration(process.env.REFRESH_DURATION as string);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: refreshDuration,
      domain: 'localhost',
    });

    res.status(201).json({
      username: newEntry.username,
      email: newEntry.email,
      accessToken,
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

    const accessToken = createToken(login._id as string);
    const refreshToken = jwt.sign({ login: login._id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: process.env.REFRESH_DURATION });
    await RefreshToken.create({
      refreshToken,
      user: login._id,
      expires: new Date(Date.now() + parseDuration(process.env.REFRESH_DURATION as string) * 1000),
    });

    // set refresh token in cookie
    const refreshDuration = parseDuration(process.env.REFRESH_DURATION as string);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: refreshDuration,
      domain: 'localhost',
    });

    res.status(200).json({
      username: login.username,
      email: login.email,
      accessToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Internal server error. Try again." });
  }
}

const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      res.status(401).json({ message: "Refresh token not found" });
      return;
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as { login: string };
    const storedToken = await RefreshToken.findOne({ refreshToken: token });
    if (!storedToken) {
      res.status(403).json({ message: "Invalid refresh token" });
      return;
    }

    // 5. Check if the token has expired
    if (storedToken.expires < new Date()) {
      await RefreshToken.deleteOne({ _id: storedToken._id });
      res.status(403).json({ message: "Refresh token has expired" });
      return;
    }

    // 6. Find the user
    const user = await User.findById(decoded.login);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const newAccessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: process.env.TOKEN_DURATION });
    console.log('token refreshed and genereated:', newAccessToken);

    // 10. Send the new access token to the client
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({ message: "Invalid refresh token" });
    } else {
      console.error('Error in refreshToken:', error);
      res.status(500).json({ message: "Internal server error during token refresh" });
    }
  }
};

const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // Remove the refresh token from the database
    await RefreshToken.deleteOne({ token: refreshToken });

    // Clear the cookie
    res.clearCookie('refreshToken');

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error('Error in logoutUser:', error);
    res.status(500).json({ message: "Internal server error during logout" });
  }
};


export { registerUser, loginUser, refreshToken, logoutUser };