import { createAction } from "redux-actions";
export const SET_LOGIN = "SET_LOGIN";
export const SET_REG = "SET_REG";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE = "UPDATE";
export const LOGOUT = "LOGOUT";
export const RECEIVE_LOGOUT = "RECEIVE_LOGOUT";
export const AUTH = "AUTH";
export const SET_FAV = "SET_FAV";
export const RECEIVE_FAV = "RECEIVE_FAV";
export const SET_AUTHLOADER = "SET_AUTHLOADER";
export const AUTH_LOADER = "AUTH_LOADER";
export const CHECK_AUTH = "CHECK_AUTH";
export const REFRESH_AUTH = "REFRESH_AUTH";
export const SET_SOCIAL = "SET_SOCIAL";
export const RECEIVE_SOCIAL = "RECEIVE_SOCIAL";

export const RECEIVE_COUNTRY = "RECEIVE_COUNTRY";
export const RECEIVE_COUNTRY_RESULT = "RECEIVE_COUNTRY_RESULT";
export const RECEIVE_STATE = "RECEIVE_STATE";
export const RECEIVE_STATE_RESULT = "RECEIVE_STATE_RESULT";
export const RECEIVE_LGA = "RECEIVE_LGA";
export const RECEIVE_LGA_RESULT = "RECEIVE_LGA_RESULT";
export const RECEIVE_KLEANARY_ITEM = "RECEIVE_KLEANARY_ITEM";
export const RECEIVE_KLEANARY_ITEM_RESULT = "RECEIVE_KLEANARY_ITEM_RESULT";
export const RECEIVE_PERFUME_ITEM = "RECEIVE_PERFUME_ITEM";
export const RECEIVE_PERFUME_ITEM_RESULT = "RECEIVE_PERFUME_ITEM_RESULT";
export const RECEIVE_STARCH_ITEM = "RECEIVE_STARCH_ITEM";
export const RECEIVE_STARCH_ITEM_RESULT = "RECEIVE_STARCH_ITEM_RESULT";

export const setSocial = createAction(SET_SOCIAL);
export const receiveSocial = createAction(RECEIVE_SOCIAL);
export const refreshAuth = createAction(REFRESH_AUTH);
export const checkAuth = createAction(CHECK_AUTH);
export const loginUser = createAction(SET_LOGIN);
export const regUser = createAction(SET_REG);
export const updateUser = createAction(UPDATE_USER);
export const update = createAction(UPDATE);
export const Authentication = createAction(AUTH);
export const logoutUser = createAction(LOGOUT);
export const receiveLogout = createAction(RECEIVE_LOGOUT);
export const setFav = createAction(SET_FAV);
export const updateFav = createAction(RECEIVE_FAV);
export const setAuthLoader = createAction(SET_AUTHLOADER);
export const authLoader = createAction(AUTH_LOADER);

export const receiveCountry = createAction(RECEIVE_COUNTRY);
export const receiveCountryResult = createAction(RECEIVE_COUNTRY_RESULT);
export const receiveState = createAction(RECEIVE_STATE);
export const receiveStateResult = createAction(RECEIVE_STATE_RESULT);
export const receiveLGA = createAction(RECEIVE_LGA);
export const receiveLGAResult = createAction(RECEIVE_LGA_RESULT);
export const receiveKleanaryItem = createAction(RECEIVE_KLEANARY_ITEM);
export const receiveKleanaryItemResult = createAction(
  RECEIVE_KLEANARY_ITEM_RESULT
);
export const receivePerfumeItem = createAction(RECEIVE_PERFUME_ITEM);
export const receivePerfumeItemResult = createAction(
  RECEIVE_PERFUME_ITEM_RESULT
);
export const receiveStarchItem = createAction(RECEIVE_STARCH_ITEM);
export const receiveStarchItemResult = createAction(RECEIVE_STARCH_ITEM_RESULT);
