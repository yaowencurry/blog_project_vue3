const express = require('express');
const db = require('../database');
const format = require('../utils/format');

const router = express.Router();

router.get('/function/articallist', (req, res) => {
  const { condition = '', status = '1' } = req.query;

  let SQL = '';
  let SQLVALUE = null;

  if (condition) {
    SQL = 'SELECT `articalid`,`title`,`ctime`,`author`,`count`,`readtimer`,`desc`,`prew` FROM artical WHERE (`title` LIKE ? OR `desc` LIKE ?) AND `status` = ? AND `articalclass` = 2 ORDER BY `ctime` DESC';
    SQLVALUE = [`%${condition}%`, `%${condition}%`, status];
  } else {
    SQL = 'SELECT `articalid`,`title`,`ctime`,`author`,`count`,`readtimer`,`desc`,`prew` FROM artical WHERE `status` = ? AND `articalclass` = 2 ORDER BY `ctime` DESC';
    SQLVALUE = [status]
  }

  db.query(SQL, SQLVALUE, (err, data) => {
    if (err) {
      console.log(err)
      res.send({ code: 500, message: '查询出错' })
    }

    res.send(data)
  })
})

router.post('/function/update', (req, res) => {
  const { articalid, title, author, readtimer, desc, comment = 0, content, count = 1000, originmarkdown, type = '1', isnew = false } = req.body;

  const ctime = format.changeDate(new Date());
  const status = isnew ? '1' : '0'
  const SQL = 'UPDATE artical SET `title` = ?,`ctime` = ?,  `author` = ?, `readtimer` = ?, `desc` = ?, `comment` = ?,`content` = ?, `count` = ?,  `originmarkdown` = ?, `type` = ?, `status` = ?, articalclass = 2 WHERE `articalid` = ?'

  db.query(SQL, [title, ctime, author, readtimer, desc, comment, content, count, originmarkdown, type, status, articalid], (err, data) => {
    if (err) {
      console.log(err);
      res.send({ code: 500, messag: '插入数据出错' })
    } else if (data.affectedRows > 0) {
      res.send({ code: 200, articalid: data.insertId })
    } else {
      res.send({ code: 500, messag: '未知错误' })
    }
  })
})

router.post('/function/addartical', (req, res) => {
  const { title, author, readtimer, desc, comment = 0, content, count = 1000, originmarkdown, type = '1' } = req.body;
  const ctime = format.changeDate(new Date());

  console.log(req.body)

  const SQL = 'INSERT INTO artical ( `title`, `ctime`, `author`, `count`, `readtimer`, `desc`, `prew`, `comment`, `content`, `originmarkdown`,`type`,`status`,articalclass ) VALUES (?,?,?,?,?,?,?,?,?,?,?,0,2)'

  db.query(SQL, [title, ctime, author, count, readtimer, desc, 0, comment, content, originmarkdown, type], (err, data) => {
    if (err) {
      console.log(err);
      res.send({ code: 500, message: '数据库插入错误' });
    }
    console.log('请求了..')
    console.log(data)
    if (data.affectedRows > 0) {
      res.send({ code: 200, articalid: data.insertId })
    }
  })
})

router.get('/function/articaldetail', (req, res) => {
  const { articalid } = req.query;
  console.log(articalid)
  const SQL = 'SELECT * FROM artical WHERE articalid = ?'
  db.query(SQL, [articalid], (err, data) => {
    if (err) {
      console.log(err);
      res.send({ code: 500, message: '查询出错', err: err });
      return
    }
    res.send({ code: 200, data: data[0] })
  })
})

module.exports = router;