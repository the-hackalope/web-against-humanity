const app = require("express")();
const http = require("http").createServer(app);
const socket = require("socket.io")(http);

const { logger, expressLoggerMiddleware } = require("./logger.js");

const port = process.env.PORT || 4000;

app.use(expressLoggerMiddleware);

app.get("/", (_, res) => {
  res.send({ response: "hello humanity!" });
});

http.listen(port, () => logger.info(`WebAgainstHumanity running on *:${port}`));
