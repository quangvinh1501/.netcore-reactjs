import { call, put, takeEvery } from 'redux-saga/effects';
import { updateMenuFail } from '../actions/menu.action';
import { getMenu } from '../actions/menu.action';
import axios from 'axios';
import { authHeader } from '../helpers';


function* fetchupdateMenu({_data }) {
  
  try {
    const  data = yield call(() => { 
      //return axios.put(process.env.REACT_APP_API_URI + 'menus/UpdateMenu/'+_data.id, _data) 

      return axios({
        url: process.env.REACT_APP_API_URI + 'menus/UpdateMenu'+_data.id,
        method: 'put',
        headers: authHeader(),
        data: _data
     });
    
    });
    yield put(getMenu());
  } catch (e) {
    yield put(updateMenuFail());
  }
}

function* updateMenu() {
  yield takeEvery("UPDATE_MENU_REQUESTED", fetchupdateMenu);
}

export default updateMenu;