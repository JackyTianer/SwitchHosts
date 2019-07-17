/**
 * @author oldj
 * @blog https://oldj.net
 */

'use strict';

const getUserNginxConfigs = require('./getUserNginxConfigs');
const getUserHosts = require('./getUserHosts');
const saveNginxConfigs = require('./saveNginxConfigs');
const saveHosts = require('./saveHosts');


module.exports = (svr) => {
  return getUserNginxConfigs()
    .then((list) => {
      return list.filter((itm) => {
        return itm.where === 'nginx';
      });
    })
    .then((list) => {
      return saveNginxConfigs(svr, list);
    })
    .then(() => {
      return getUserHosts();
    })
    .then((list) => {
      return list.filter((itm) => {
        return itm.where !== 'nginx';
      });
    })
    .then((list) => {
      return saveHosts(svr, list);
    });
};
