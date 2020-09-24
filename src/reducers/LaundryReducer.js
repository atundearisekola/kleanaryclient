import { handleAction, combineActions } from "redux-actions";
import {
  GET_LAUNDRY,
  GET_REQUESTD,
  LOADER,
  PAYSTACK,
  GET_PLAUNDRY,
  GET_DLAUNDRY,
  getLaundry,
  geRequestD,
  loader,
  payStack,
  getDLaundry,
  getPLaundry,
  receiveConfirmStatus,
  RECEIVE_CONFIRM_STATUS
} from "../actions/LaundryAction";
let initState = {
  loader: false,
  paymentstatus: [],
  laundries: {},
  singleLaundry: {},
  pendinglaundries: [],
  deliveredlaundries: [],
  payment_response: undefined,
  requestdetail: []
};
const LaundryReducer = handleAction(
  combineActions(
    getLaundry,
    geRequestD,
    loader,
    payStack,
    getDLaundry,
    getPLaundry,
    receiveConfirmStatus
  ),

  {
    next(state, action) {
      switch (action.type) {
        case GET_LAUNDRY:
          console.log(action.payload);
          return {
            ...state,
            singleLaundry: action.payload.data.laundry,
            loader: false
          };
          break;

        case GET_REQUESTD:
          console.log(action.payload);
          return {
            ...state,
            requestdetail: action.payload,
            loader: false
          };
          break;

        case LOADER:
          return {
            ...state,
            loader: action.payload
          };
          break;

        case PAYSTACK:
          return {
            ...state,
            payment_response: action.payload.data,
            loader: false
          };
          break;

        case GET_PLAUNDRY:
          return {
            ...state,
            pendinglaundries: action.payload,
            loader: false,
            payment_response: undefined,
            requestdetail: []
          };
          break;

        case GET_DLAUNDRY:
          return {
            ...state,
            deliveredlaundries: action.payload,
            loader: false
          };
          break;

        case RECEIVE_CONFIRM_STATUS:
          return {
            ...state,
            singleLaundry: action.payload.data.laundry,
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
        case GET_LAUNDRY:
          return {
            ...state,
            error: action.payload,
            loader: false
          };
          break;

        case GET_REQUESTD:
          return {
            ...state,
            error: action.payload,
            loader: false
          };
          break;
        case PAYSTACK:
          return {
            ...state,
            payment_response: undefined,
            loader: false
          };
          break;

        case GET_PLAUNDRY:
          return {
            ...state,
            error: action.payload,
            loader: false
          };
          break;

        case GET_DLAUNDRY:
          return {
            ...state,
            error: action.payload,
            loader: false
          };
          break;
        case RECEIVE_CONFIRM_STATUS:
          return {
            ...state,
            error: action.payload,
            loader: false
          };
          break;

        default:
          return {
            ...state,
            error: action.payload,
            loader: false
          };
          break;
      }
    }
  },
  initState
);

export default LaundryReducer;
