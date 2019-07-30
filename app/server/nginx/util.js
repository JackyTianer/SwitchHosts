const exec = require('child_process').exec;
const CMD_START = 'nginx';
const CMD_RELOAD = 'nginx -s reload';
const CMD_STOP = 'pkill -9 nginx';
const fixPath = require('fix-path');
const { dialog } = require('electron');
fixPath();


module.exports = {
  openNginx() {
    return new Promise((resolve, reject) => {
      exec(CMD_START, (error, stdout, stderr) => {
        if (!!error) {
          exec(CMD_RELOAD, (error) => {
            if (!!error) {
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
    });
  },
  closeNginx() {
    return new Promise((resolve) => {
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
    });
  }
};
