const nodemailer = require("nodemailer");

function sendMail (from, aliasName, tos, subject, msg) {
  const smtpTransport = nodemailer.createTransport({
    host: 'smtp.163.com',
    secureConnection: true, // use SSL
    secure: true,
    port: 465,
    auth: {
      user: from,
      pass: 'LUKCJVRIAJEVEHEI',
    }
  });

  smtpTransport.sendMail({
    //from    : '标题别名 <foobar@latelee.org>',
    from: aliasName + ' ' + '<' + from + '>',
    //'li@latelee.org, latelee@163.com',//收件人邮箱，多个邮箱地址间用英文逗号隔开
    to: tos,
    subject: subject,//邮件主题
    //text    : msg,
    html: msg
  }, function (err, res) {
    if (err) {
      console.log('error: ', err);
      return
    }
    console.log(res);
  });
}

module.exports = sendMail