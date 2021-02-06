const express = require('express');
const db = require('../database');
const format = require('../utils/format');
const getJueJinArtical = require('../utils/getHotArtical')

const router = express.Router();

router.get('/artical/articallist', (req, res) => {
  const { condition = '', status = '1', articalclass = '1' } = req.query;

  let SQL = '';
  let SQLVALUE = null;

  if (condition) {
    SQL = 'SELECT `articalid`,`title`,`ctime`,`author`,`count`,`readtimer`,`desc`,`prew` FROM artical WHERE (`title` LIKE ? OR `desc` LIKE ?) AND `status` = ? AND `articalclass` = ? ORDER BY `ctime` DESC';
    SQLVALUE = [`%${condition}%`, `%${condition}%`, status, articalclass];
  } else {
    SQL = 'SELECT `articalid`,`title`,`ctime`,`author`,`count`,`readtimer`,`desc`,`prew` FROM artical WHERE `status` = ? AND `articalclass` = ? ORDER BY `ctime` DESC';
    SQLVALUE = [status, articalclass]
  }

  db.query(SQL, SQLVALUE, (err, data) => {
    if (err) {
      console.log(err)
      res.send({ code: 500, message: '查询出错' })
    }

    res.send(data)
  })
})

router.post('/artical/update', (req, res) => {
  const { articalid, title, author, readtimer, desc, comment = 0, content, count = 1000, originmarkdown, type, status, articalclass } = req.body;
  console.log(req.body);
  const ctime = format.changeDate(new Date());

  const SQL = 'UPDATE artical SET `title` = ?, `ctime` = ?, `author` = ?, `readtimer` = ?, `desc` = ?, `comment` = ?, `content` = ?, `count` = ?,  `originmarkdown` = ?, `type` = ?, `status` = ?, `articalclass` = ? WHERE `articalid` = ?';

  db.query(SQL, [title, ctime, author, readtimer, desc, comment, content, count, originmarkdown, type, status, articalclass, articalid], (err, data) => {
    if (err) {
      console.log(err);
      res.send({ code: 500, messag: '插入数据出错' })
      return
    }
    console.log('更新文章成功...')
    console.log(data)
    res.send({ code: 200, articalid })
  })
})

router.post('/artical/addartical', (req, res) => {
  const { title, author, readtimer, desc, comment = 0, content, count = 1000, originmarkdown, type = '1', articalclass = '1', status = '0' } = req.body;
  const ctime = format.changeDate(new Date());

  console.log(req.body)

  const SQL = 'INSERT INTO artical ( `title`, `ctime`, `author`, `count`, `readtimer`, `desc`, `prew`, `comment`, `content`, `originmarkdown`,`type`,`status`,`articalclass` ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)'

  db.query(SQL, [title, ctime, author, count, readtimer, desc, 0, comment, content, originmarkdown, type, status,articalclass], (err, data) => {
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

router.get('/artical/articaldetail', (req, res) => {
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

router.get('/artical/hotlist', (req, res) => {
  getJueJinArtical((data) => {
    if (data.status === 200) {
      res.send(JSON.parse(data.text).data)
    } else {
      res.send({ code: 500, message: '数据获取失败' })
    }
  })
})

module.exports = router;