const express = require('express');
const db = require('../database');
const format = require('../utils/format');

const router = express.Router();

const BASE_API = '/comment'

const API = {
  ADD: BASE_API + '/addcomment',
  LIST: BASE_API + '/list',
}

router.get(API.ADD, (req, res) => {
  const { articalid, content } = req.query;
  const ctime = format.changeDate(new Date());
  const name = '我是一直小精灵';
  const SQL = 'INSERT INTO `comment`(`articalid`,`content`, `ctime`, `name`, `avatar`) VALUES(?,?,?,?,?)'
  db.query(SQL, [articalid, content, ctime, name, '12323123'], (err, data) => {
    if (err) {
      console.log(err);
      res.send({ code: 500, message: '服务器错误' })
      return
    }
    if (data.affectedRows > 0) {
      res.send({ code: 200, commentid: data.insertId })
    }
  })
})

router.get(API.LIST, (req, res) => {
  const { articalid } = req.query;

  const SQL = 'SELECT `commentid`, `content`, `ctime`, `name`,`avatar`, `articalid` FROM `comment` WHERE `articalid` = ?'

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