import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import getMenu from './saga';
import rootReducer from './reducers';
const sagaMiddleware = createSagaMiddleware();
// then run the saga
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(getMenu);
export default store;
