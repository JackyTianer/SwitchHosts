/**
 * @author oldj
 * @blog https://oldj.net
 */

'use strict';

import Agent from '../Agent';

const updated = require('./nginx_list_updated');

module.exports = (app, list, config = null) => {
  return Agent.pact('saveNginxConfigs', list)
    .then(new_list =>  updated(app, new_list, config))
    .catch(e => {
      console.log(e);
    });
};
