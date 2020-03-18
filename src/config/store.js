import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer from './root-reducer.js';
import saga from './root-saga.js';

const devMode = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

if (devMode) {
  middleware.push(logger);
}

export default (preloadedState = reducer()) => {
  const store = configureStore({
    reducer,
    devTools: devMode,
    middleware,
    preloadedState,
  });
  sagaMiddleware.run(saga);
  return store;
};

