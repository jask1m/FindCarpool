import express, { Express, Request, Response } from 'express';
import { requireAuth } from './middleware/requireAuth';
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const userRouter = require('./User/userRoute');
const courseRouter = require('./Course/courseRoute');

const { MONGODB_URL, CLIENT_URL } = process.env;
const app = express();
const port = process.env.PORT || 4000;

const connectDB = async () => {
  try {
    if (!MONGODB_URL) {
      throw new Error("DB URL is not defined");
    }
    await mongoose.connect(MONGODB_URL);
    console.log("Successful connection to db");
  } catch (err) {
    console.log("error connecting to db: ", err);
  }
};

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

app.use(cors({
  origin: "*",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
app.use(requireAuth);
app.use('/user', userRouter);
app.use('/course', courseRouter);


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello TypeScript Express Server' });
});
