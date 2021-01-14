const setSession = function (key, value) {
  if (value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  } else {
    sessionStorage.setItem(key, '')
  }
}

const getSession = function (key) {
  let value = JSON.parse(sessionStorage.getItem(key));

  if (value) {
    return value
  } else {
    return null
  }
}

const removeSession = function (key) {
  sessionStorage.removeItem(key)
}

export {
  setSession,
  getSession,
  removeSession
}