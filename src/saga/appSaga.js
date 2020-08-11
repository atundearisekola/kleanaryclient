import { call, takeLatest, put } from "redux-saga/effects";

import {
  loginApi,
  registerApi,
  LogoutApi,
  authUserApi,
  updateApi,
  authApi,
  favApi,
  socialLoginApi,
  receiveCountryApi,
  receiveStateApi,
  receiveLGAsApi,
  receiveKleanariesApi,
  receivePerfumesApi,
  receiveStarchsApi
} from "../api/authApi";

import {
  requestApi,
  verifyStackApi,
  getPLApi,
  getDLApi,
  getLApi,
  confirmStatusApi
} from "../api/laundryApi";

import {
  REQUEST_LAUNDRY,
  SET_LOADER,
  VERIFY_STACK,
  REQUEST_PLAUNDRY,
  REQUEST_DLAUNDRY,
  REQUEST_DETAIL,
  CONFIRM_STATUS,
  getLaundry,
  geRequestD,
  loader,
  payStack,
  getPLaundry,
  getDLaundry,
  receiveConfirmStatus
} from "../actions/LaundryAction";

import {
  SET_LOGIN,
  SET_REG,
  UPDATE_USER,
  LOGOUT,
  IS_AUTH,
  SET_FAV,
  SET_AUTHLOADER,
  SET_SOCIAL,
  RECEIVE_COUNTRY,
  RECEIVE_STATE,
  RECEIVE_LGA,
  RECEIVE_KLEANARY_ITEM,
  RECEIVE_PERFUME_ITEM,
  RECEIVE_STARCH_ITEM,
  receiveLogout,
  Authentication,
  update,
  updateFav,
  CHECK_AUTH,
  refreshAuth,
  authLoader,
  receiveSocial,
  receiveCountryResult,
  receiveStateResult,
  receiveLGAResult,
  receiveKleanaryItemResult,
  receivePerfumeItemResult,
  receiveStarchItemResult,
  RECEIVE_COUNTRY_RESULT
} from "../actions/AuthAction";

function* checkAuths() {
  var user = yield call(authApi);
  yield put(refreshAuth(user));
}

export function* authWatcher() {
  yield takeLatest(CHECK_AUTH, checkAuths);
}

//////////////////////
function* loginUsers(action) {
  var user = yield call(loginApi, action.payload);
  yield put(Authentication(user));
}

export function* loginWatcher() {
  yield takeLatest(SET_LOGIN, loginUsers);
}

//////////////////////
function* socialUsers(action) {
  var user = yield call(socialLoginApi, action.payload);
  yield put(receiveSocial(user));
}

export function* socialWatcher() {
  yield takeLatest(SET_SOCIAL, socialUsers);
}
//////////////////////////////////////////////////////////
function* logout() {
  var user = yield call(LogoutApi);
  yield put(receiveLogout(user));
}

export function* logoutWatcher() {
  yield takeLatest(LOGOUT, logout);
}

////////////////////
function* regUsers(action) {
  var user = yield call(registerApi, action.payload);
  yield put(Authentication(user));
}

export function* registerWatcher() {
  yield takeLatest(SET_REG, regUsers);
}

////////////////////
function* updateUsers(action) {
  var user = yield call(updateApi, action.payload);
  yield put(update(user));
}

export function* updateWatcher() {
  yield takeLatest(UPDATE_USER, updateUsers);
}

////////////////////
function* updateFavs(action) {
  var fav = yield call(favApi, action.payload);
  yield put(updateFav(fav));
}

export function* favWatcher() {
  yield takeLatest(SET_FAV, updateFavs);
}

function* setLoader(action) {
  yield put(loader(action.payload));
}

export function* LoaderWatcher() {
  yield takeLatest(SET_LOADER, setLoader);
}

function* setAuthLoader(action) {
  yield put(authLoader(action.payload));
}

export function* AuthLoaderWatcher() {
  yield takeLatest(SET_AUTHLOADER, setAuthLoader);
}

function* request(action) {
  var data = yield call(requestApi, action.payload);
  yield put(geRequestD(data));
}

export function* requestWatcher() {
  yield takeLatest(REQUEST_LAUNDRY, request);
}

///////////////////////////////////////////////////////

function* verifyStack(action) {
  var data = yield call(verifyStackApi, action.payload);
  yield put(payStack(data));
}

export function* stackWatcher() {
  yield takeLatest(VERIFY_STACK, verifyStack);
}

///////////////////////////////////////////////////////

function* getPLaundries(action) {
  var data = yield call(getPLApi, action.payload);
  yield put(getPLaundry(data));
}

export function* pLaundryWatcher() {
  yield takeLatest(REQUEST_PLAUNDRY, getPLaundries);
}

///////////////////////////////////////////////////////

function* getDLaundries(action) {
  var data = yield call(getDLApi, action.payload);
  yield put(getDLaundry(data));
}

export function* dLaundryWatcher() {
  yield takeLatest(REQUEST_DLAUNDRY, getDLaundries);
}

///////////////////////////////////////////////////////

function* requestLaundryD(action) {
  var data = yield call(getLApi, action.payload);
  yield put(getLaundry(data));
}

export function* detailWatcher() {
  yield takeLatest(REQUEST_DETAIL, requestLaundryD);
}

///////////////////////////////////////////////////////

function* receiveCountryAsyn() {
  var data = yield call(receiveCountryApi);
  yield put(receiveCountryResult(data));
}

export function* receiveCountryWatcher() {
  yield takeLatest(RECEIVE_COUNTRY, receiveCountryAsyn);
}

///////////////////////////////////////////////////////

function* receiveStateAsyn(action) {
  var data = yield call(receiveStateApi, action.payload);
  yield put(receiveStateResult(data));
}

export function* receiveStateWatcher() {
  yield takeLatest(RECEIVE_STATE, receiveStateAsyn);
}

///////////////////////////////////////////////////////

function* receiveLGAsAsyn(action) {
  var data = yield call(receiveLGAsApi, action.payload);
  yield put(receiveLGAResult(data));
}

export function* receiveLGAWatcher() {
  yield takeLatest(RECEIVE_LGA, receiveLGAsAsyn);
}

///////////////////////////////////////////////////////

function* receiveKleanariesAsyn() {
  var data = yield call(receiveKleanariesApi);
  yield put(receiveKleanaryItemResult(data));
}

export function* receiveKleanariesWatcher() {
  yield takeLatest(RECEIVE_KLEANARY_ITEM, receiveKleanariesAsyn);
}

///////////////////////////////////////////////////////

function* receivePerfumeAsyn() {
  var data = yield call(receivePerfumesApi);
  yield put(receivePerfumeItemResult(data));
}

export function* receivePerfumeWatcher() {
  yield takeLatest(RECEIVE_PERFUME_ITEM, receivePerfumeAsyn);
}

///////////////////////////////////////////////////////

function* receiveStarchAsyn() {
  var data = yield call(receiveStarchsApi);
  yield put(receiveStarchItemResult(data));
}
export function* receiveStarchWatcher() {
  yield takeLatest(RECEIVE_STARCH_ITEM, receiveStarchAsyn);
}

function* confirmStatusAsyn(action) {
  var data = yield call(confirmStatusApi, action.payload);
  yield put(receiveConfirmStatus(data));
}
export function* confirmStatusWatcher() {
  yield takeLatest(CONFIRM_STATUS, confirmStatusAsyn);
}
