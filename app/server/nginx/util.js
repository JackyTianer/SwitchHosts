const os = require('os');
const path = require('../paths');
const log = require('electron-log');

const exec = require('child_process').exec;
const CMD_START = 'nginx';
const CMD_RELOAD = 'nginx -s reload';
const CMD_STOP = 'pkill -9 nginx';
const CMD_WINDOWS_START = `nginx -c ${path.windwos_nginx_file_path}`;
const CMD_WINDOWS_RELOAD = `nginx -c ${path.windwos_nginx_file_path} -s reload`;
const CMD_WINDOWS_STOP = ` taskkill /f /im nginx.exe`;
const fixPath = require('fix-path');
const { dialog } = require('electron');
fixPath();


module.exports = {
  openNginx() {
    return new Promise((resolve, reject) => {
      if (os.type() === 'Windows_NT') {
        exec(CMD_WINDOWS_START, (error, stdout, stderr) => {
          if (!!error) {
            exec(CMD_WINDOWS_RELOAD, (error) => {
              if (!!error) {
                log.error(error.message);
                dialog.showMessageBox({
                  title: '错误',
                  type: 'error',
                  message: `启动失败\n${error.message}`
                });
              } else {
                resolve();
              }
            });
          } else {
            resolve();
          }
        });
      } else {
        exec(CMD_START, (error, stdout, stderr) => {
          if (!!error) {
            exec(CMD_RELOAD, (error) => {
              if (!!error) {
                log.error(error.message);
                dialog.showMessageBox({
                  title: '错误',
                  type: 'error',
                  message: `启动失败\n${error.message}`
                });
              } else {
                resolve();
              }
            });
          } else {
            resolve();
          }
        });
      }
    });
  },
  closeNginx() {
    return new Promise((resolve) => {
      if (os.type() === 'Windows_NT') {
        exec(CMD_WINDOWS_STOP, (error) => {
          if (!!error) {
            dialog.showMessageBox({
              title: '错误',
              type: 'error',
              message: `关闭失败：Nginx并未成功启动`
            });
          } else {
            resolve();
          }
        });
      }
      else {
        exec(CMD_STOP, (error) => {
          if (!!error) {
            dialog.showMessageBox({
              title: '错误',
              type: 'error',
              message: `关闭失败：Nginx并未成功启动`
            });
          } else {
            resolve();
          }
        });
      }
    });
  }
};
