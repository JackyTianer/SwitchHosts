/**
 * @author oldj
 * @blog https://oldj.net
 */

'use strict';

const paths = require('../paths');
const io = require('../io');

module.exports = () => {
  let fn = paths.sys_nginx_path;
  return io
    .pReadFile(fn)
    .then(cnt => {
      return {
        content: cnt
        , is_sys: true
      };
    });
};
