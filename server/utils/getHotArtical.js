const superagent = require('superagent');

var params = {
  cate_id: "6809637767543259144",
  cursor: "0",
  id_type: 2,
  limit: 20,
  sort_type: 3
}

function getJueJinArtical (callback) {
  // 利用superagent 模块发送请求，注意请求头的设置和POST请求体数据（请求参数）
  superagent.post('https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed').send(params).set('X-Agent', 'Juejin/Web').end((err, data) => {
    if (err) {
      return console.log(err)
    }
    callback(data)
  })
}

module.exports = getJueJinArtical

// 设置定时器，规定10分钟更新一此数据
// setInterval(() => {
//   getInfo()
// }, 10 * 1000 * 60)
