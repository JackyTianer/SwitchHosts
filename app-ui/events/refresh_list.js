/**
 * @author oldj
 * @blog https://oldj.net
 */

'use strict';

import Agent from '../Agent';

module.exports = (app) => {
  return Agent.pact('refreshList')
    .catch(e => {
      console.log(e);
    });
};
