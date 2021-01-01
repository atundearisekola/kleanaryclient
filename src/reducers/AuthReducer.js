import { handleAction, combineActions } from "redux-actions";
import {
  SET_LOGIN,
  SET_REG,
  UPDATE_USER,
  UPDATE,
  RECEIVE_LOGOUT,
  AUTH,
  RECEIVE_FAV,
  AUTH_LOADER,
  REFRESH_AUTH,
  RECEIVE_SOCIAL,
  RECEIVE_COUNTRY_RESULT,
  RECEIVE_STATE_RESULT,
  RECEIVE_LGA_RESULT,
  RECEIVE_KLEANARY_ITEM_RESULT,
  RECEIVE_PERFUME_ITEM_RESULT,
  RECEIVE_STARCH_ITEM_RESULT,
  refreshAuth,
  Authentication,
  receiveLogout,
  updateFav,
  update,
  authLoader,
  receiveSocial,
  receiveCountryResult,
  receiveStateResult,
  receiveLGAResult,
  receiveKleanaryItemResult,
  receivePerfumeItemResult,
  receiveStarchItemResult
} from "../actions/AuthAction";

var defaultState = {
  isAuthenticated: false,
  user: {},
  error: [],
  data: [],
  response: "",
  access_token: [],
  loader: false,
  starchlist: [],
  perfumelist: [],
  klist: [],
  refresh: [],
  lgas: [],
  states: [],
  countries: []
};
const AuthReducer = handleAction(
  combineActions(
    Authentication,
    receiveLogout,
    update,
    updateFav,
    authLoader,
    refreshAuth,
    receiveSocial,
    receiveCountryResult,
    receiveStateResult,
    receiveLGAResult,
    receiveKleanaryItemResult,
    receivePerfumeItemResult,
    receiveStarchItemResult
  ),

  {
    next(state, action) {
      switch (action.type) {
        case REFRESH_AUTH:
          console.log(action.payload);
          return {
            ...state,
            user: action.payload.data.user,
            isAuthenticated: true,
            loader: false
          };
          break;

        case AUTH:
          return {
            ...state,
            isAuthenticated: true,
            user: action.payload.data.user,
            access_token: action.payload.data.token,

            loader: false
          };
          break;
        case RECEIVE_SOCIAL:
          return {
            ...state,
            isAuthenticated: true,
            user: action.payload.data.user,
            access_token: action.payload.data.token,

            loader: false
          };
          break;
        case RECEIVE_LOGOUT:
          localStorage.removeItem("state");
          return {
            ...state,
            isAuthenticated: false,
            user: {},
            response: "",
            access_token: ""
          };
          break;

        case UPDATE:
          return {
            ...state,
            user: action.payload.data.user,
            loader: false
          };
          break;
        case RECEIVE_FAV:
          return {
            ...state,
            user: action.payload.data.user,
            loader: false
          };
          break;

        case AUTH_LOADER:
          return {
            ...state,
            loader: action.payload
          };
          break;

        case RECEIVE_COUNTRY_RESULT:
          return {
            ...state,
            countries: action.payload.data.countries,
            loader: false
          };
          break;

        case RECEIVE_STATE_RESULT:
          return {
            ...state,
            states: action.payload.data.states.data,
            loader: false
          };
          break;

        case RECEIVE_LGA_RESULT:
          return {
            ...state,
            lgas: action.payload.data.LGAs.data,
            loader: false
          };
          break;

        case RECEIVE_KLEANARY_ITEM_RESULT:
          return {
            ...state,
            klist: action.payload.data.kleanaryItems,
            loader: false
          };
          break;
        case RECEIVE_PERFUME_ITEM_RESULT:
          return {
            ...state,
            perfumelist: action.payload.data.perfItems,
            loader: false
          };
          break;
        case RECEIVE_STARCH_ITEM_RESULT:
          return {
            ...state,
            starchlist: action.payload.data.starchItems,
            loader: false
          };
          break;

        default:
          return state;
          break;
      }
    },
    throw(state, action) {
      switch (action.type) {
        case AUTH:
          return {
            ...state,
            isAuthenticated: true,
            error: action.payload,
            loader: false
          };
          break;
        case RECEIVE_SOCIAL:
          return {
            ...state,
            isAuthenticated: false,
            error: action.payload,
            loader: false
          };
          break;
        case RECEIVE_LOGOUT:
          return {
            ...state,
            error: action.payload,

            isAuthenticated: false,
            user: {},
            response: "",
            access_token: ""
          };
          break;

        case UPDATE:
          return {
            ...state,
            response: action.payload,
            loader: false
          };
          break;
        case RECEIVE_FAV:
          return {
            ...state,
            error: action.payload,
            loader: false
          };
          break;

        case REFRESH_AUTH:
          console.log(action.payload);
          return {
            ...state,
            refresh: action.payload,
            isAuthenticated: true,

            loader: false
          };
          break;

        case RECEIVE_COUNTRY_RESULT:
          return {
            ...state,
            error: action.payload,
            loader: false
          };
          break;

        case RECEIVE_STATE_RESULT:
          return {
            ...state,
            error: action.payload,
            loader: false
          };
          break;

        case RECEIVE_LGA_RESULT:
          return {
            ...state,
            error: action.payload,
            loader: false
          };
          break;

        case RECEIVE_KLEANARY_ITEM_RESULT:
          return {
            ...state,
            error: action.payload,
            loader: false
          };
          break;
        case RECEIVE_PERFUME_ITEM_RESULT:
          return {
            ...state,
            error: action.payload,
            loader: false
          };
          break;
        case RECEIVE_STARCH_ITEM_RESULT:
          return {
            ...state,
            error: action.payload,
            loader: false
          };
          break;

        default:
          return state;
          break;
      }
    }
  },
  defaultState
);

export default AuthReducer;
