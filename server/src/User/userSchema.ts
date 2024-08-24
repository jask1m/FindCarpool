const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "Your username is required"] },
  email: { type: String, required: [true, "Your email address is required"] },
  password: { type: String, required: [true, "Your password is required"] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);