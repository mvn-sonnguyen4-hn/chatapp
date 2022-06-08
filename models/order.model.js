const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  foods: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
      amount: {
        type: Number,
        required: true,
      },
      note: {
        type: String,
        default: "",
      },
    },
  ],
  status: {
    type: String,
    default: "Preparing",
  },
  address: {
    type: String,
    default: "",
  },
  phonenumber: {
    type: String,
    default: "",
  },
  method_payment:{
    type:Number,
    default:0
  },
  total_price:{
    type:Number,
    default:0
  },
  fullname:{
    type:String,
    default:''
  },
  email:{
    type:String,
    default:''
  },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  deleteAt: {
    type: Date,
    default: null,
  },
});
const Order = (module.exports = mongoose.model("Order", OrderSchema));
