/**
 * @author oldj
 * @blog https://oldj.net
 */

'use strict';

import Agent from '../Agent';

module.exports = (app, config) => {
  let list = app.state.nginx_config_list;
  let idx = list.findIndex(item => item.id === config.id);
  if (idx === -1) {
    return;
  }

  list.splice(idx, 1);
  Agent.pact('saveNginxConfigs', list)
    .then(() => {
      app.setState({ nginx_config_list: list }, () => {
        // 选中下一个 hosts
        let next_nginx = list[idx] || list[idx - 1] || null;
        if (next_nginx) {
          app.setState({ current: next_nginx });
        }
      });
    })
    .catch(e => console.log(e));
};
