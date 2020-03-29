const { createStore } = require("redux");
const cardsDeck = require("../data/cards");

const NEW_ROOM = "whu/NEW_ROOM";

const createRoom = identifier => ({
  type: NEW_ROOM,
  payload: identifier
});

const initialRoomState = {
  deck: {
    ...cardsDeck
  }
};

const initialState = {};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case NEW_ROOM:
      return {
        ...state,
        [payload]: {
          ...initialRoomState
        }
      };
    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

const dispatch = action => store.dispatch(action);

const currentState = () => store.getState();

module.exports = { dispatch, currentState, createRoom };
