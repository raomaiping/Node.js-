/*
 * @Date: 2021-01-15 15:11:24
 * @LastEditors: 饶迈平
 * @LastEditTime: 2021-01-18 17:11:01
 * @FilePath: \mailBot\util\request.js
 */
const http = require('./http');
const { city } = require('./config')
async function getWeather() {
  return http.get(
    `http://jisutqybmf.market.alicloudapi.com/weather/query?city=${encodeURIComponent(city)}`
  );
}
async function getSentence() {
  return http.get('https://chp.shadiao.app/api.php');
}

module.exports = { getWeather, getSentence };