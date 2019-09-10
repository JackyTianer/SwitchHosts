/**
 * @author oldj
 * @blog http://oldj.net
 */

'use strict';

const path = require('path');
const log = require('electron-log');

const io = require('./io');
const platform = process.platform;
const os = require('os');
const fs = require('fs');
// Windows 系统有可能不安装在 C 盘
const sys_hosts_path = platform === 'win32' ? `${process.env.windir || 'C:\\WINDOWS'}\\system32\\drivers\\etc\\hosts` : '/etc/hosts';


const home_path = io.getUserHome();
const work_path = path.join(home_path, '.SwitchHosts');
const data_path = path.join(work_path, 'data.json');
const nginx_data_path = path.join(work_path, 'nginx_data.json');
const preference_path = path.join(work_path, 'preferences.json');

const sys_nginx_path = '/usr/local/etc/nginx/nginx.conf';
const windwos_nginx_file_path = path.join(work_path, 'windows_nginx.conf');

log.error('hello');
if (!io.isDirectory(work_path) || !io.isFile(path.join(work_path, 'data.json'))
) {
  try {
    require('./initWorkPath')(work_path, sys_hosts_path);
  } catch (e) {
    log.error(e.message);
  }
}
if ((!io.isDirectory(work_path) || !io.isFile(path.join(work_path, 'nginx_data.json')))) {
  try {
    require('./initWorkPathWithNginx')(work_path, sys_nginx_path);
  } catch (e) {
    log.error(e.message);
  }
}
if (os.type() === 'Windows_NT' && (!io.isDirectory(work_path) || !io.isFile(windwos_nginx_file_path))) {
  fs.writeFileSync(windwos_nginx_file_path, '', 'utf-8');
}
module.exports = {
  home_path: home_path
  , work_path: work_path
  , data_path: data_path
  , preference_path: preference_path
  , sys_hosts_path: sys_hosts_path
  , nginx_data_path
  , sys_nginx_path
  , windwos_nginx_file_path
  // ,current_app_path: getCurrentAppPath()
};
