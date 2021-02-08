const express = require('express');
const db = require('../database');
const format = require('../utils/format');
const sendMail = require('../utils/sendMail')
const peopleInfo = require('../utils/comment')

const router = express.Router();

const BASE_API = '/comment'

const avatarBaseUrl = 'http://42.192.140.201/public/avatar/'

const API = {
  ADD: BASE_API + '/addcomment',
  LIST: BASE_API + '/list',
}

router.get(API.ADD, (req, res) => {
  const { articalid, content } = req.query;
  const ctime = format.changeDate(new Date());
  const index = parseInt(Math.random() * 10)
  const name = peopleInfo[index].name;
  const SQL = 'INSERT INTO `comment`(`articalid`,`content`, `ctime`, `name`, `avatar`) VALUES(?,?,?,?,?)'
  db.query(SQL, [articalid, content, ctime, name, avatarBaseUrl + peopleInfo[index].avatar], (err, data) => {
    if (err) {
      console.log(err);
      res.send({ code: 500, message: '服务器错误' })
      return
    }
    if (data.affectedRows > 0) {
      res.send({ code: 200, commentid: data.insertId })
      const { from, aliasName, tos, subject, msg } = {
        from: 'yw18678993843@163.com',
        aliasName: '博客里面的访客',
        tos: '18363995442@163.com',
        subject: '博客评论',
        msg: `<h4 style="text-align: center; color: red">${content}</h4>`
      }
      sendMail(from, aliasName, tos, subject, msg)
    }
  })
})

router.get(API.LIST, (req, res) => {
  const { articalid } = req.query;

  const SQL = 'SELECT `commentid`, `content`, `ctime`, `name`,`avatar`, `articalid` FROM `comment` WHERE `articalid` = ? ORDER BY `ctime` DESC'

  db.query(SQL, [articalid], (err, data) => {
    if (err) {
      console.log(err);
      res.send({ code: 500, message: '服务器错误' })
      return
    }
    res.send({ code: 200, data })
  })
})


module.exports = router