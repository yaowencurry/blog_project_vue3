const express = require('express');
const db = require('../database');
const format = require('../utils/format');

const router = express.Router();

router.get('/artical/articallist', (req, res) => {
  const { condition } = req.query;

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
  console.log(req)
  const { title, author, readtimer, desc, comment = 0, content, originmarkdown } = req.body;
  const ctime = format.changeDate(new Date());

  const SQL = 'INSERT INTO artical ( `title`, `ctime`, `author`, `count`, `readtimer`, `desc`, `prew`, `comment`, `content`, `originmarkdown` ) VALUES (?,?,?,?,?,?,?,?,?,?)'

  db.query(SQL, [title, ctime, author, readtimer, desc, 0, comment, content, originmarkdown], (err, data) => {
    if (err) {
      console.log(err);
      res.send({ code: 500, message: '数据库插入错误' });
    }
    console.log('请求了..')
    console.log(data)
    if (data.affectRows.length > 0) {
      res.send({code: 200})
    }
  })

})

module.exports = router;