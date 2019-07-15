'use strict';

const getSysHosts = require('./getSysNginxConfigs');
const getUserHosts = require('./getUserNginxConfigs');

module.exports = () => {
  return Promise
    .all([getSysHosts(), getUserHosts()])
    .then(([sys_nginx_config, user_nginx_configs]) => {
      return {
        sys_nginx_config,
        nginx_config_list: user_nginx_configs
      };
    });
};
