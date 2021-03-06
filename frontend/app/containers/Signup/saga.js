import {call, put, takeLatest} from 'redux-saga/effects'
import  * as md5 from  'md5'
import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR, v
} from './constants'
import {API_URL} from "configs";
import {push} from 'react-router-redux';
import {addToast} from "containers/Toastr/actions";
import {TOAST_SUCCESS} from "containers/Toastr/constants";

function* signupFlow(action) {
  try {
    const {email, password, username} = action;
    const response = yield call(signupApi, email, password, username);
    yield put({type: SIGNUP_SUCCESS, response});
    yield put( addToast({message: 'Registration was Successful!', toastType: TOAST_SUCCESS}));
    yield put(push('/login'));
  } catch (error) {
    yield put({type: SIGNUP_ERROR, error})
  }
}

function* signupWatcher() {
  yield takeLatest(SIGNUP_REQUESTING, signupFlow)
}

const signupUrl = `${API_URL}/signup`;

function signupApi(email, password, username) {
  let passwordHash = md5(password);
  return fetch(signupUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, passwordHash,email}),
  })
    .then(response => response.json())
    .then(json => json)
    .catch((error) => {
      throw error
    })
}

export default signupWatcher
