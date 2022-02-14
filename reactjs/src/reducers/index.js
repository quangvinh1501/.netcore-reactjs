import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import menus from './menu';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  menus,
});

export default rootReducer;