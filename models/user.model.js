const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  first_name: {
    type: String,
    default:''
  },
  last_name: {
    type: String,
    default:''
  },
  username: {
    type: String,
    required: true,
    default:''
  },
  email: {
    type: String,
    required: true,
    default:''
  },
  password: {
    type: String,
    required: true,
    default:''
  },
  phonenumber: {
    type: Number,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  avatar_url:{
    type: String,
    default: '',
  },
  role: {
    type: Number,
    default: 1,
  },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
const User = (module.exports = mongoose.model("User", UserSchema));
