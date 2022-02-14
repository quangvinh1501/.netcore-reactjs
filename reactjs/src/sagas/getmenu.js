import { call, put, takeEvery } from 'redux-saga/effects';
import { getMenuSuccess, getMenuFail } from '../actions/menu.action';
import { authHeader } from '../helpers';
import axios from 'axios';

function* fetchMenu() {
  try {
    const { data } = yield call(() => { 
      
      //return axios.get(process.env.REACT_APP_API_URI + 'menus/GetMenus', { 'headers': authHeader() }) 
      return axios({
        url: process.env.REACT_APP_API_URI + 'menus/GetMenus',
        method: 'get',
        headers: authHeader()
     });
     
    });
    yield put(getMenuSuccess(data));
    
  } catch (e) {
    yield put(getMenuFail());
  }
}

function* getMenu() {
  yield takeEvery("GET_MENU_REQUESTED", fetchMenu);
}

export default getMenu;