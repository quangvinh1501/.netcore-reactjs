import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { deleteMenuSuccess, deleteMenuFail } from '../actions/menu.action';
import { getMenu } from '../actions/menu.action';
import axios from 'axios';
import { authHeader } from '../helpers';

function* fetchdeleteMenu({ id }) {
  try {
    const { data } = yield call(() => { 
      
      //return axios.delete(process.env.REACT_APP_API_URI + 'menus/DeleteMenu/'+id, id) 
      return axios({
        url: process.env.REACT_APP_API_URI + 'menus/DeleteMenu/'+id,
        method: 'delete',
        headers: authHeader(),
        data: id
     });
    });
    yield put(getMenu());
  } catch (e) {
    yield put(deleteMenuFail());
  }
}

function* deleteMenu() {
  yield takeEvery("DELETE_MENU_REQUESTED", fetchdeleteMenu);
}

export default deleteMenu;