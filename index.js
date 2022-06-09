const express = require("express");
const roomSchema = require("./models/room.model");
const messageSchema = require("./models/message.model");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true,
  },
});

let users = [];
const db = require("./config/db");
db.connect();
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");
  socket.on("join", function (room) {
    socket.join(room);
  });
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", async (data) => {
    let { from, to, content } = data;
    let user = getUser(from);
    try {
      if (user) {
        let room = await roomSchema.findOne({ users: { $all: [from, to] } });
        if (!room) {
          room = await roomSchema.create({
            users: [from, to],
            messages: [],
          });
        }
        const message = await messageSchema.create({
          from: from,
          to: to,
          content,
        });
        room.messages.push({ message });
        await room.save();
      }
    } catch (err) {
      console.log(new Error(err).message);
    }
    io.to(to).emit("getMessage", {
      from,
      to,
      content,
      createAt: Date.now(),
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("App is running", PORT);
});
