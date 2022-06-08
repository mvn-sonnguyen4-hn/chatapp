const mongoose = require("mongoose");

async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect sucess");
  } catch {
    console.log("Connect fail");
  }
}

module.exports = {
  connect,
  mongoURI: process.env.MONGO_URI,
};
