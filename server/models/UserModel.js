const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: [true, 'firstname is required'] },
  lastname: { type: String, required: [true, 'lastname is required'] },
  email: { type: String, required: [true, 'email is required'], unique: true },
  contact: { type: String, required: [true, 'contact is required'] },
  username: { type: String, required: [true, 'username is required'] },
  password: { type: String, required: [true, 'password is required'] },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  address: { type: String },
  city: { type: String },
  zip: { type: String },
  state: { type: String },
  country: { type: String },
}, { timestamps: true });

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;
