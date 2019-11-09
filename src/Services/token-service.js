import config from '../config'

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem('key', token)
  },
  getAuthToken() {
    return window.localStorage.getItem('key')
  },
  clearAuthToken() {
    window.localStorage.removeItem('key')
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  },
}

export default TokenService