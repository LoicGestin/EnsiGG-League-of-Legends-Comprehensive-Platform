import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3001", // This should match the client's URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const roomData = new Map();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (room) => {

    let actualRoom = removeColorFromRoom(room);
    console.log(`User STATE CHANGE: ${socket.id} , JOIN ROOM : ${actualRoom}`);
    socket.join(actualRoom);
    if (!roomData.has(actualRoom)) {
      roomData.set(actualRoom, {
        selectedChampionsBlue: [],
        bannedChampionsBlue: [],
        selectedChampionsRed: [],
        bannedChampionsRed: [],
        actionQueue: [
          3, 4, 3, 4, 3, 4, 1, 2, 2, 1, 1, 2, 4, 3, 4, 3, 2, 1, 1, 2,
        ],
      });
    }
    socket.emit("initial_state", roomData.get(actualRoom));
  });

  socket.on("state_change", (data, room) => {
    console.log(`User STATE CHANGE: ${socket.id}`);
    let actualRoom = removeColorFromRoom(room);
    roomData.set(actualRoom, {
      selectedChampionsBlue: data.selectedChampionsBlue,
      bannedChampionsBlue: data.bannedChampionsBlue,
      selectedChampionsRed: data.selectedChampionsRed,
      bannedChampionsRed: data.bannedChampionsRed,
      actionQueue: data.actionQueue,
    });
    io.to(actualRoom).emit("state_change", data);
  });

  socket.on("message", ({ username, message, room }) => {
    let actualRoom = removeColorFromRoom(room);
    console.log(
      `User ${username} from room: ${actualRoom} send the message ${message}`
    );
    const formattedMessage = `${username}: ${message}`;
    io.to(actualRoom).emit("message", formattedMessage);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

function removeColorFromRoom(room) {
  if (room.endsWith("_blue")) {
    return room.slice(0, -5);
  } else if (room.endsWith("_red")) {
    return room.slice(0, -4);
  }
  return room;
}

httpServer.listen(3000, () => {
  console.log("HTTP and Socket.io server is running on port 3000");
});
