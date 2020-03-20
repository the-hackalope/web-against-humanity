const { dispatch, currentState, createRoom } = require("./state");
const { logger } = require("./logger");

const pong = user => room => socket => msg => {
  logger.info(`received ping on room ${room}`);
  socket.emit("pong");
  logger.info("emitted pong");
};

const logState = user => room => socket => () => {
  const state = currentState();
  logger.info(`inspecting state`);
  console.log(state);
};

const startGame = user => room => socket => () => {
  logger.info(`Room ${room} is starting a new game`);
  dispatch(createRoom(room));
  socket.to(room).emit("game:started");
};

const pickCard = user => room => socket => data => {
  logger.info(`User picked card`);
};

const drawCards = user => room => socket => data => {
  logger.info(`User drew cards`);
};

const routeMessages = ({ user, room, socket }) => {
  if (process.env.DEBUG) {
    user.on("hello", pong(user)(room)(socket));
    user.on("dbg:state", logState(user)(room)(socket));
  }
  user.on("game:start", startGame(user)(room)(socket));
  user.on("game:pick", pickCard(user)(room)(socket));
  user.on("game:draw", drawCards(user)(room)(socket));
};

module.exports = { routeMessages };
