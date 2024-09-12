import mongoose, {Schema} from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "Your username is required"] },
  email: { type: String, required: [true, "Your email address is required"] },
  password: { type: String, required: [true, "Your password is required"] },
  createdAt: { type: Date, default: Date.now },
});

const refreshTokenSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref:'User', required: true },
  refreshToken: { type: String, required: true },
  expires: { type: Date, required: true },
});

// export all schemnas
module.exports = {
  User: mongoose.model('User', userSchema),
  RefreshToken: mongoose.model('RefreshToken', refreshTokenSchema),
};