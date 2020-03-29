const app = require("express")();
const http = require("http").createServer(app);
const socket = require("socket.io")(http);

const { logger, expressLoggerMiddleware } = require("./logger");
const { routeMessages } = require("./messageRoutes");

const port = process.env.PORT || 4000;

app.use(expressLoggerMiddleware);

app.get("/", (_, res) => {
  res.send({ response: "hello humanity!" });
});

socket.on("connection", connectedUser => {
  logger.info("User connected to socket");
  const {
    handshake: {
      query: { room }
    }
  } = connectedUser;

  if (room) {
    connectedUser.join(room);
    logger.info(`A user joined a room: ${room}`);
  }

  routeMessages({
    user: connectedUser,
    room,
    socket
  });
});

http.listen(port, () => logger.info(`WebAgainstHumanity running on *:${port}`));
