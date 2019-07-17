const exec = require('child_process').exec;
const CMD_START = 'nginx';
const CMD_RELOAD = 'nginx -s reload';
const CMD_STOP = 'nginx -s stop';
const fixPath = require('fix-path');
fixPath();


module.exports = {
  openNginx() {
    return new Promise((resolve, reject) => {
      exec(CMD_START, (error, stdout, stderr) => {
        if (!!error) {
          exec(CMD_RELOAD, () => {
            resolve();
          });
        } else {
          resolve();
        }
      });
    });
  },
  closeNginx() {
    return new Promise((resolve) => {
      exec(CMD_STOP, () => {
        resolve();
      });
    });
  }
};
