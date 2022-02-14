import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import getMenu from '../sagas/getmenu';
import updateMenu from '../sagas/updatemenu';
import deleteMenu from '../sagas/deletemenu';
import createMenu from '../sagas/createmenu';
const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        sagaMiddleware
    )
);
sagaMiddleware.run(getMenu);
sagaMiddleware.run(updateMenu);
sagaMiddleware.run(deleteMenu);
sagaMiddleware.run(createMenu);
export default store;
