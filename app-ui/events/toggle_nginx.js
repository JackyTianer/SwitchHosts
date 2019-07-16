/**
 * @author oldj
 * @blog https://oldj.net
 */

'use strict';

import Agent from '../Agent';

const save = require('./save_nginx');

module.exports = (app, config) => {
  config.on = !config.on;
  let lang = app.state.lang;

  return Promise.resolve()
    .then(() => {
      let list = app.state.nginx_config_list.slice(0);
      if (config.on) {
        list.map(item => {
          if (item.id !== config.id) {
            item.on = false;
          }
        });
      }

      return list;
    })
    .then(list => {
      let idx = list.findIndex(item => item.id === config.id);
      if (idx === -1) {
        list.push(Object.assign({}, config));
      } else {
        let old_config = list[idx];
        list.splice(idx, 1, Object.assign({}, old_config, config));
      }

      return save(app, list, config);
    })
    .then(() => {
      // Agent.pact('statRecord', 'switch');
      return Agent.pact('notify', 'SwitchHosts!', lang.nginx_switched);
    });

};
