/*
 * @Date: 2021-01-14 16:42:47
 * @LastEditors: 饶迈平
 * @LastEditTime: 2021-01-18 17:09:45
 * @FilePath: \mailBot\server.js
 */
const express = require("express")
const app = express();
const http = require('http')
const sendEmail = require("./util/sendEmail")
const { getWeather, getSentence } = require('./util/request');
const schedule = require("node-schedule");
const {time} = require('./util/config')
app.set('views engine', 'ejs');
app.set('views', __dirname + '/views');


// 获取数据
function getData() {
  return Promise.all([getWeather(), getSentence()])
    .then(function (res) {
      const data = {};
      const { result } = res[0].data;
      const len = result.index.length;
      data.week = result.week;
      data.weather = result.weather;
      data.detail = result.index[len - 1].detail;
      data.today = result.date;
      data.temphigh = result.temphigh;
      data.templow = result.templow;
      data.title = 'nice to meet you!';
      data.desc = '今天又是充满希望的一天';
      data.daily = res[1].data;
      data.image = '';
      return data
    })
    .catch(function (err) {
      console.log(err);
    });
}


app.get('/', function (req, response) {
  getData().then((res) => {
    let data = res;
    http.get('http://www.dmoe.cc/random.php', (res) =>{
      console.log(res.rawHeaders[res.rawHeaders.length - 1]);
     data.image = res.rawHeaders[res.rawHeaders.length - 1];
     response.render('email.ejs', data);
   })
  });
});

//每天下午5点06分发送
schedule.scheduleJob({ hour: time.hour, minute: time.minute }, function () {
  console.log("启动任务:" + new Date());
  getData().then((res) => {
    let data = res;
    http.get('http://www.dmoe.cc/random.php', (res) =>{
     data.image = res.rawHeaders[res.rawHeaders.length - 1];
     sendEmail(data)
   })
  });
});


app.listen(3000, console.log('运行中,监听 3000 端口'))
