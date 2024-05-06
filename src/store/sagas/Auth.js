import axios from 'axios';
import { ApiUrl } from '../config.js';
import EventBus from 'eventing-bus';
import { all, takeEvery, call, put } from 'redux-saga/effects.js';

import { setLoader, setAllowListed, setAllowListedSignups, toggleAddAllowistModal, toggleEditAllowistModal, toggleDeleteAllowistModal, setSmartContract } from '../actions/Auth.js';

/*========== Login =============*/

function* getAdmin(payload) {
  console.log('****** saga called');
  // const { error, response } = yield call(getCall, '/nft/smartContractsAdmin');
  // if (error) EventBus.publish('error', error['response']['data']['message']);
  // else if (response) yield put(setSmartContract(response['data']['body']));
};

function* login({ payload }) {
  try {
    const { error, response } = yield call(postCall, { path: '/users/loginWithAdminWallet', payload });
    if (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred during signin.';
      EventBus.publish('error', errorMessage);
    } else if (response) {
      console.log('******* response');
      yield put(signInData(response.data.body));
    }
  } catch (error) {
    console.error('Unexpected error during signin:', error);
  }
}

/*========== SMART CONTRACT FUNCTIONS =============*/
function* getSmartContract() {
  const { error, response } = yield call(getCall, '/nft/smartContractsAdmin');
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) yield put(setSmartContract(response['data']['body']));
};

/*========== ALLOW LIST FUNCTIONS =============*/
function* getAllowListed() {
  const { error, response } = yield call(getCall, '/users/getAllowListed');
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) yield put(setAllowListed(response['data']['body']));
};

function* updateAllowListed({ payload }) {
  console.log('****** payload', payload);
  if (!payload) return;
  const { error, response } = yield call(postCall, { path: `/users/allowListed`, payload });
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) {
    yield put({ type: 'GET_SMART_CONTRACT' });
    yield put({ type: 'GET_ALLOW_LISTED' });
  }
};

/*========== ALOOW LIST SIGNUPS FUNCTIONS =============*/

function* getAllowListedSignups() {
  const { error, response } = yield call(getCall, '/users/getAllowListedSignups');
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) {
    yield put(setAllowListedSignups(response['data']['body']));
  }
};

function* addNewAllowlistSignups({ payload }) {
  const { error, response } = yield call(postCall, { path: `/users/allowList`, payload });
  if (error) {
    yield put(toggleAddAllowistModal(false));
    yield put(setLoader({ message: 'Allowlist Record Updated...', status: false }));
    EventBus.publish('error', error['response']['data']['message']);
  }
  else if (response) {
    yield put({ type: 'GET_ALLOW_LISTED_SIGNUPS' });
    yield put(toggleAddAllowistModal(false));
    yield put(setLoader({ message: 'Allowlist Record Updated...', status: false }));
    EventBus.publish('success', response['data']['message']);
  }
};

function* updateAllowListedSignups({ payload }) {
  if (!payload) return;
  const { error, response } = yield call(putCall, { path: `/users/editAllowListedSignups`, payload });
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) {
    yield put({ type: 'GET_ALLOW_LISTED_SIGNUPS' });
    yield put(toggleEditAllowistModal(false));
    EventBus.publish('success', response['data']['message']);
  }
  yield put(setLoader({ message: 'Allowlist Record Updated...', status: false }));
}

function* deleteAllowListedSignups({ payload }) {
  if (!payload) return;
  const { error, response } = yield call(putCall, { path: `/users/deleteAllowListedSignups`, payload });
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) {
    yield put(toggleDeleteAllowistModal(false));
    yield put({ type: 'GET_ALLOW_LISTED_SIGNUPS' });
    EventBus.publish('success', response['data']['message']);
  }
  yield put(setLoader({ message: 'Allowlist Record Deleted...', status: false }));
}




function* actionWatcher() {
  yield takeEvery('GET_ADMIN_NONCE', getAdmin);
  yield takeEvery('LOGIN', login);

  yield takeEvery('GET_ALLOW_LISTED', getAllowListed);
  yield takeEvery('UPDATE_ALLOW_LISTED', updateAllowListed);
  yield takeEvery('GET_SMART_CONTRACT', getSmartContract);
  yield takeEvery('ADD_NEW_ALLOW_LISTED_SIGNUPS', addNewAllowlistSignups);
  yield takeEvery('GET_ALLOW_LISTED_SIGNUPS', getAllowListedSignups);
  yield takeEvery('UPDATE_ALLOW_LISTED_SIGNUPS', updateAllowListedSignups);
  yield takeEvery('DELETE_ALLOW_LISTED_SIGNUPS', deleteAllowListedSignups);
};

export default function* rootSaga() {
  yield all([actionWatcher()]);
};

function postCall({ path, payload }) {
  return axios
    .post(ApiUrl + path, payload)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish("tokenExpired");
      return { error };
    });
};

function getCall(path) {
  return axios
    .get(ApiUrl + path)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish("tokenExpired");
      return { error };
    });
};

function deleteCall(path) {
  return axios
    .delete(path)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish("tokenExpired");
      return { error };
    });
};

function putCall({ path, payload }) {
  return axios
    .put(ApiUrl + path, payload)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish("tokenExpired");
      return { error };
    });
};
