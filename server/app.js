const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

//路由
const articalRouter = require('./router/artical');
const commentRouter = require('./router/comment');


var app = express();
app.engine('html', require('express-art-template'));
app.use('/public/', express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




//挂在路由
app.use(articalRouter)
app.use(commentRouter)


app.get('/', (req, res) => {
  fs.readFile('./public/index.html', (err, data) => {
    if (err) throw err;
    console.log(data.toString())
    res.send(data.toString())
  })
})

app.get('*', (req, res) => {
  fs.readFile('./public/index.html', (err, data) => {
    if (err) throw err;
    console.log(data.toString())
    res.send(data.toString())
  })
})

app.listen(6300, () => {
  console.log('app is running at port 6300...');
})