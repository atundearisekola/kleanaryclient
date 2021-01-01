import { stringify } from "querystring";
import { loadState, saveState } from "../Utils/localstorage";
const axios = require("axios");
var cors = require("cors");
const APP_URL = "http://https://kleanary.herokuapp.com";

cors();

export async function loginApi(data) {
  return await axios
    .post(`${APP_URL}/api/login`, stringify(data))
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export async function socialLoginApi(data) {
  return await axios
    .post(`${APP_URL}/api/social/login`, data)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export async function LogoutApi() {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    loadState().AuthReducer.access_token
  }`;
  return await axios
    .post(`${APP_URL}/api/logout`)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export async function registerApi(data) {
  return await axios
    .post(`${APP_URL}/api/register`, stringify(data))
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error;
    });
}

export async function updateApi(data) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    loadState().AuthReducer.access_token
  }`;
  console.log(data.token);
  return await axios
    .post(`${APP_URL}/api/updateuser`, stringify(data))
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export async function favApi(data) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    loadState().AuthReducer.access_token
  }`;
  console.log(data);
  return await axios
    .post(`${APP_URL}/api/updatefav`, data)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export async function authApi() {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    loadState().AuthReducer.access_token
  }`;

  return await axios
    .post(`${APP_URL}/api/auth`)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export async function receiveCountryApi() {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    loadState().AuthReducer.access_token
  }`;

  return await axios
    .get(`${APP_URL}/api/countries`)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export async function receiveStateApi(data) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    loadState().AuthReducer.access_token
  }`;
  console.log(data);
  return await axios
    .post(`${APP_URL}/api/states`, data)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export async function receiveLGAsApi(data) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    loadState().AuthReducer.access_token
  }`;
  console.log(data);
  return await axios
    .post(`${APP_URL}/api/lgas`, data)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export async function receiveKleanariesApi() {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    loadState().AuthReducer.access_token
  }`;

  return await axios
    .get(`${APP_URL}/api/kleanaryitems`)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export async function receivePerfumesApi() {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    loadState().AuthReducer.access_token
  }`;

  return await axios
    .get(`${APP_URL}/api/perfumes`)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}

export async function receiveStarchsApi() {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    loadState().AuthReducer.access_token
  }`;

  return await axios
    .get(`${APP_URL}/api/starchs`)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      return error;
    });
}
