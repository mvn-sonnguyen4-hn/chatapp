const mongoose = require("mongoose");
const FoodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  url_img: {
    type: String,
    required: true,
  },
  avaiable: {
    type: Number,
    required: false,
    default:0
  },
  decription: {
    type: String,
    required: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required:true
  },
  status: { type: String, default: "processing" },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
const Food = (module.exports = mongoose.model("Food", FoodSchema));
