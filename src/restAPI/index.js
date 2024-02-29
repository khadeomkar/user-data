import { apiBaseUrl } from "../constants";
import { setCookie, getCookie, removeCookie } from "../helpers/Cookie";
import axios from "axios";

// const axios = require("axios");
const processResponse = true;

const createAPICall = (name, postData, method, queryString) => {
  let headers = { "Content-Type": "application/json" };
  //Get token value from localstorage
  const token = getCookie("token");

  //Check if token is not defined and attach to query string
  if (token !== undefined) {
    headers = { ...headers, Authorization: `Bearer ${token}` };
  }
  
  return new Promise(function(resolve, reject) {
    var url = apiBaseUrl + name;
    if(queryString !== "") {
      url = url + "?" + queryString;
    }
    if (method === undefined) {
      method = "post";
    }
    axios
      .request({
        method: method,
        url: url,
        data: postData,
        headers: headers
      })
      .then(async (response) => {
        if (processResponse) {
          let body = [];
          try {
            body = response.data
          } catch (error) {
            body = response.data
          }	
          
          response.data = body;
          resolve(response);
        } else {
          resolve(response);
        }
      })

      .catch(function(err) {
        if (err && err.response) {	
          let body = [];
          try {
            body = err.response.data
          } catch (error) {
            body = err.response.data;
          }
          err.response.data = body;
          if (
            err &&
            err.response &&
            err.response.status &&
            err.response.status === 401 &&
            err.response.data &&
            err.response.data.error &&
            err.response.data.error.code &&
            err.response.data.error.code === "AUTHORIZATION_REQUIRED"
          ) {
            removeCookie("token")
            window.location.href = "/";	
          
          // check token expire or not 
          } else if(
            err &&
            err.response &&
            err.response.status &&
            err.response.status === 401 &&
            err.response.data &&
            err.response.data.error &&
            err.response.data.error.statusCode === 401
          ) {
            // if token is expired then call refresh token API
            var refreshurl = apiBaseUrl + "/refresh-token";
            const refreshToken = getCookie('refreshToken');
            const payload = {
              refreshToken: refreshToken,
              createdDttm: new Date().getTime()
            }
            axios
              .request({
                method: "POST",
                url: refreshurl,
                data: payload,
                headers: headers
              })
              .then(async (response) => {
                if(response && response.data) {
                  // store new token in to cookie
                  setCookie('token', response.data.token);

                  // call again previous API
                  let tempResult = await createAPICall(name, postData, method, queryString);
                  resolve(tempResult);
                } else {
                  reject(err.response);
                }
              })
              .catch(function(err) {
                reject(err);	
              })
          } else {
            reject(err.response);
          }	
        } else {
          reject(err);	
        }	
      });
  });
};

class API {
  request(name, postData, method, queryString = "") {
    return createAPICall(name, postData, method, queryString);
  }
}

export default API;