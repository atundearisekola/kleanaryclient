import { stringify } from "querystring";
import { loadState, saveState } from "../Utils/localstorage";
import { parse } from "date-fns/fp";
const axios = require("axios");
var cors = require("cors");

cors();
const APP_URL = "http://https://kleanary.herokuapp.com";

export async function requestApi(data) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

  console.log(data);
  return await axios
    .post(`${APP_URL}/api/requestlaundry`, data)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      console.log(error.response.status);
      console.log(error.response.data);
      return error;
    });
}

export async function verifyStackApi(data) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    loadState().AuthReducer.access_token
  }`;

  console.log(data);
  return await axios
    .post(`${APP_URL}/api/give`, data)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      console.log(error.response.status);
      console.log(error.response.data);
      return error;
    });
}

///////////////////////////////////////////////////////

export async function getPLApi() {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    loadState().AuthReducer.access_token
  }`;
  return await axios
    .get(`${APP_URL}/api/requestpl`)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

///////////////////////////////////////////////////////

export async function getDLApi() {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    loadState().AuthReducer.access_token
  }`;
  return await axios
    .get(`${APP_URL}/api/requestdl`)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

//////////////////////

export async function getLApi(data) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    loadState().AuthReducer.access_token
  }`;

  console.log(data);
  return await axios
    .post(`${APP_URL}/api/laundrydetail`, data)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export async function confirmStatusApi(data) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    loadState().AuthReducer.access_token
  }`;

  console.log(data);
  return await axios
    .post(`${APP_URL}/api/confirm-status`, data)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      console.log(error.response.status);
      console.log(error.response.data);
      return error;
    });
}
