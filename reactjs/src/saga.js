import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { createMenuSuccess, createMenuFail, getMenuSuccess, getMenuFail, updateMenuSuccess, updateMenuFail, deleteMenuSuccess, deleteMenuFail } from './actions/menu.action';
import axios from 'axios';

function* fetchMenu() {
  try {
    const { data } = yield call(() => { return axios.get(process.env.REACT_APP_API_URI + 'menus/GetMenus') });
    yield put(getMenuSuccess(data));
  } catch (e) {
    yield put(getMenuFail());
  }
}
function* fetchcreateMenu({ data }) {
  try {
    const { menus } = yield call(() => { return axios.get(process.env.REACT_APP_API_URI + 'menus/CreateMenu', data) });
    yield put(createMenuSuccess(menus));
  } catch (e) {
    yield put(createMenuFail());
  }
}
function* fetchupdateMenu({ id, data }) {
  try {
    const { menus } = yield call(() => { return axios.get(process.env.REACT_APP_API_URI + 'menus/UpdateMenu', id, data) });
    yield put(updateMenuSuccess(id, menus));
  } catch (e) {
    yield put(updateMenuFail());
  }
}

function* fetchdeleteMenu({ id }) {
  try {
    const { menus } = yield call(() => { return axios.get(process.env.REACT_APP_API_URI + 'menus/DeleteMenu', id) });
    yield put(deleteMenuSuccess(id));
  } catch (e) {
    yield put(deleteMenuFail());
  }
}

function* getMenu() {
  yield takeEvery("GET_MENU_REQUESTED", fetchMenu);
}

function* createMenu() {
  yield takeEvery("CREATE_MENU_REQUESTED", fetchcreateMenu);
}
function* updateMenu() {
  yield takeEvery("UPDATE_MENU_REQUESTED", fetchupdateMenu);
}

function* deleteMenu() {
  yield takeEvery("DELETE_MENU_REQUESTED", fetchdeleteMenu);
}
/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
// function* getMenu() {
//     yield takeLatest("GET_MENU_REQUESTED", fetchMenu);
// }

export default getMenu;