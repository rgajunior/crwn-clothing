import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'
import logger from 'redux-logger';
//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware()

const middlerwares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlerwares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlerwares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);