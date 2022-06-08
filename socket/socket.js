const io = require("socket.io")(8900, {
  cors: {
    origin: "*",
  },
});
const roomSchema = require("../models/room.model");
const messageSchema = require("../models/message.model");
let users = [];

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
    console.log('join room', room)
    socket.join(room);
  });
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", async (data) => {
    console.log(data)
    let { from, to, content } = data;
    user = getUser(from);
    try {
      if (user) {
        let room = await roomSchema.findOne({}).all("users", [from, to]);
        console.log()
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