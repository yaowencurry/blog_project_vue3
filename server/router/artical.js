const express = require('express');
const db = require('../database');
const format = require('../utils/format');

const router = express.Router();

router.get('/artical/articallist', (req, res) => {
  const { condition = '' } = req.query;

  let SQL = '';

  if (condition) {
    SQL = 'SELECT `articalid`,`title`,`ctime`,`author`,`count`,`readtimer`,`desc`,`prew` FROM artical WHERE `title` LIKE ? OR `desc` LIKE ? ORDER BY `ctime` DESC';
  } else {
    SQL = 'SELECT `articalid`,`title`,`ctime`,`author`,`count`,`readtimer`,`desc`,`prew` FROM artical ORDER BY `ctime` DESC';
  }

  db.query(SQL, [`%${condition}%`, `%${condition}%`], (err, data) => {
    if (err) {
      console.log(err)
      res.send({ code: 500, message: '查询出错' })
    }

    res.send(data)
  })
})

router.post('/artical/addartical', (req, res) => {
  const { title, author, readtimer, desc, comment = 0, content, count = 1000, originmarkdown } = req.body;
  const ctime = format.changeDate(new Date());
  console.log(req.body)
  const SQL = 'INSERT INTO artical ( `title`, `ctime`, `author`, `count`, `readtimer`, `desc`, `prew`, `comment`, `content`, `originmarkdown` ) VALUES (?,?,?,?,?,?,?,?,?,?)'

  db.query(SQL, [title, ctime, author, count, readtimer, desc, 0, comment, content, originmarkdown], (err, data) => {
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

router.post('/artical/addartical')

module.exports = router;