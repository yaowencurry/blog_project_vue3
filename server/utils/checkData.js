module.exports = {
  checkMustData: (data, name, res) => {
    if (!data) {
      res.send({ code: 500, message: '缺少' + name });
      return false
    }

    return true
  },
  checkStatus: (status = []) => {
    if (status.some(item => !item)) {
      return false
    } else {
      return true
    }
  }
}