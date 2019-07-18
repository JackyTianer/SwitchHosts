const exec = require('child_process').exec;
const CMD_START = 'nginx';
const CMD_RELOAD = 'nginx -s reload';
const CMD_STOP = 'pkill -9 nginx';
const fixPath = require('fix-path');
fixPath();


module.exports = {
  openNginx() {
    return new Promise((resolve, reject) => {
      exec(CMD_START, (error, stdout, stderr) => {
        if (!!error) {
          exec(CMD_RELOAD, (error) => {
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
      exec(CMD_STOP, (error) => {
        resolve();
      });
    });
  }
};
