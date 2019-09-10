/**
 * @author oldj
 * @blog https://oldj.net
 */

'use strict';

const io = require('./io');
const os = require('os');
const fs = require('fs');
const path = require('path');
const version = require('../version');

module.exports = (work_path, sys_nginx_path) => {
  if (!io.isDirectory(work_path)) {
    fs.mkdirSync(work_path);
  }
  let cnt;
  if (os.type() === 'Windows_NT') {
    cnt = '';
  } else if (os.type() === 'Darwin') {
    cnt = fs.readFileSync(sys_nginx_path, 'utf-8');
  }

  let fn_data = path.join(work_path, 'nginx_data.json');
  let data = {
    list: [{
      title: 'My Nginx',
      content: '# My Nginx'
    }, {
      title: 'backup',
      content: cnt
    }],
    version: version
  };
  fs.writeFileSync(fn_data, JSON.stringify(data), 'utf-8');
};
