/*
 * @Date: 2021-01-15 14:48:34
 * @LastEditors: 饶迈平
 * @LastEditTime: 2021-01-15 14:49:15
 * @FilePath: \mailBot\util\http.js
 */
const axios = require('axios');

const http = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: 'APPCODE d9f66fcbde7847a68a70a2ac1be7cb9d',
  },
});

module.exports = http;
