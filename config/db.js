const mongoose = require("mongoose");
const URI='mongodb+srv://son:son@cluster0.euyaw.mongodb.net/foodapp?retryWrites=true&w=majority'
async function connect() {
  try {
    mongoose.connect(URI, {
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
  mongoURI: URI,
};
