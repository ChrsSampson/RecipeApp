const axios = require('axios');

// send a request to an api

function sendRequest (url, method = 'GET', data, noCors = false) {
  let headers = {}

  if (noCors) {
    headers = {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      "Content-Type": "application/json"
    }
  }

  return axios({
    url: url,
    method: method,
    withCredentials: false,
    data: data,
    headers: headers
  })

}

module.exports = sendRequest;