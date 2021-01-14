const setLocalstorage = function (key, value) {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.setItem(key, '')
  }
}

const getLocalstorage = function (key) {
  let value = JSON.parse(localStorage.getItem(key));

  if (value) {
    return value
  } else {
    return null
  }
}

const removeLocalstorage = function (key) {
  localStorage.removeItem(key)
}

export {
  setLocalstorage,
  getLocalstorage,
  removeLocalstorage
}