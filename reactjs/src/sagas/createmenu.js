import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { createMenuFail } from '../actions/menu.action';
import { getMenu } from '../actions/menu.action';
import axios from 'axios';
import { authHeader } from '../helpers';

function* fetchcreateMenu({ _data }) {
 
  try {
    const  {data}  = yield call(() => { 
      //return axios.post(process.env.REACT_APP_API_URI + 'menus/CreateMenu', _data)
      return axios({
        url: process.env.REACT_APP_API_URI + 'menus/CreateMenu',
        method: 'post',
        headers: authHeader(),
        data: _data
     });
    });
    yield put(getMenu());
  } catch (e) {
    yield put(createMenuFail());
  }
}

function* createMenu() {
  yield takeEvery("CREATE_MENU_REQUESTED", fetchcreateMenu);
}

export default createMenu;