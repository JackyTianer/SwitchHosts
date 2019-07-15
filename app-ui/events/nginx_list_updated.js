/**
 * @author oldj
 * @blog https://oldj.net
 */

'use strict';

import Agent from '../Agent';

module.exports = (app, new_list, config = null) => {
  let state = { nginx_config_list: new_list };
  return Promise.resolve()
    .then(() => {
      let current = app.state.current;
      if (current && current.is_sys) {
        return Agent.pact('getSysNginxConfigs')
          .then(sys_config => {
            state.sys_nginx_config = sys_config;
            state.current = sys_config;
          });

      } else if (config) {
        state.current = config;

      } else if (current) {
        let c = new_list.find(i => i.id === current.id);
        if (c) {
          state.current = c;
        }
      }
    })
    .then(() => {
      app.setState(state, () => {
        if (config) {
          Agent.emit('select', config.id);
        }
      });
    });
};
