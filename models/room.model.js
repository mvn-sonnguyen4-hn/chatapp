const mongoose = require("mongoose");
const RoomSchema = mongoose.Schema({
  messages: [
    {
      message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  status: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
const Room = (module.exports = mongoose.model("Room", RoomSchema));
