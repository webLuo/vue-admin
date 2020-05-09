import cookie from 'cookie_js'

const TOKEN = 'admin_token';
const USERNAME = "username";

export function getToken() {
  return cookie.get(TOKEN)
}

export function setToken(token) {
  return cookie.set(TOKEN, token)
}

export function removeToken() {
  return cookie.remove(TOKEN)
}

export function getUserName() {
  return cookie.get(USERNAME)
}

export function setUserName(value) {
  return cookie.set(USERNAME, value)
}

export function removeUserName() {
  return cookie.set(USERNAME)
}