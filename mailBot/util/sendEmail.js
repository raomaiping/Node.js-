/*
 * @Date: 2021-01-15 15:14:33
 * @LastEditors: 饶迈平
 * @LastEditTime: 2021-01-18 16:58:35
 * @FilePath: \mailBot\util\sendEmail.js
 */
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const config = require('./config')


function sendEmail(data) {
    const template = ejs.compile(
      fs.readFileSync(path.resolve(__dirname, '../views/email.ejs'), 'utf8')
    );
  
    const html = template(data);
    let transporter = nodemailer.createTransport({
      service: 'qq', // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
      port: 25, // SMTP 端口
      secureConnection: true, // SSL安全链接
      auth: {
        //发送者的账户密码
        user: config.user, // 账户
        pass: config.pass, // smtp授权码，到邮箱设置下获取
      },
    });
  
    let mailOptions = {
      from: `米斯特饶 ${config.user}`, // 发送者昵称和地址
      to: config.receiver.join(','), // 接收者的邮箱地址
      subject: config.subject || '一封暖暖的小邮件', // 邮件主题
      // text: ``, //邮件的text
      html: html, //也可以用html发送
    };
  
    //发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('邮件发送成功 ID：', info.messageId);
    });
  }
  module.exports = sendEmail