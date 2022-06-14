import {SERVER} from "../server";
import axios from "axios";


//get new access token by refresh token
export const refreshAccessToken = async () => {
  let value = localStorage.getItem("TOKEN")
  let refresh_token = JSON.parse(value).refresh_token
  const params = {
    grant_type: 'refresh_token',
    refresh_token
  }
  const headers = {
    'Authorization': 'Basic ' + Buffer.from(SERVER.clientId + ":" + SERVER.clientSecret).toString('base64'),
    'Content-Type': 'application/json'
  }
  var config = {
    baseURL: SERVER.auth_uri,
    method: 'post',
    url: '/oauth/token',
    headers,
    params
  };
  let response = await axios(config)
  let data = response.data
  //set new token
  localStorage.setItem("TOKEN", JSON.stringify(data))
  return data
}



//login to get access token
export const loginClient = () => {
  const authURL = `${SERVER.auth_uri}/oauth/authorize?client_id=${SERVER.clientId}&scope=${SERVER.scopes}&redirect_uri=${SERVER.callback_uri}&response_type=code`
  window.location.href = (authURL)
}

export const loginUser = () => {
  let getUrlParameter = (sParam) => {
    var sPageURL = window.location.search.substring(1)
    var sURLVariables = sPageURL.split('&')
    var sParameterName
    var i
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
    return false;
  }
  let getAccessToken = async (code) => {
    const params = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: SERVER.callback_uri
    }
    const headers = {
      'Authorization': 'Basic ' + Buffer.from(SERVER.clientId + ":" + SERVER.clientSecret).toString('base64'),
      'Content-Type': 'application/json'
    }
    var config = {
      baseURL: SERVER.auth_uri,
      method: 'post',
      url: '/oauth/token',
      headers,
      params
    };
    let response = await axios(config)
    return response.data
  }

  let authorizationCode = getUrlParameter("code")
  if (authorizationCode)
    return getAccessToken(authorizationCode)
  return false
}
