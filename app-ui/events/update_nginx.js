/**
 * @author oldj
 * @blog https://oldj.net
 */

'use strict';

//import Agent from '../Agent'
//import cleanData from '../../app/server/cleanData'
const save = require('./save_nginx');

module.exports = (app, config) => {
  let list = app.state.nginx_config_list.slice(0);
  let idx = list.findIndex(item => item.id === config.id);
  if (idx === -1) {
    list.push(Object.assign({}, config));
  } else {
    let old_config = list[idx];
    list.splice(idx, 1, Object.assign({}, old_config, config));
  }

  //list = cleanData(list)
  save(app, list, config);
};
