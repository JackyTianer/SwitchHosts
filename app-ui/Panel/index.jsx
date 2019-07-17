/**
 * @author oldj
 * @blog http://oldj.net
 */

'use strict';

import React from 'react';
import Buttons from './Buttons';
import List from './List';
import styles from './index.less';
import NginxList from './NginxList';
import Agent from '../Agent';

export default class Index extends React.Component{

  handleOndragenter(events) {
    events.preventDefault();
  }

  handleOndragover(events) {
    events.preventDefault();
  }

  handleOndrop(events) {
    events.preventDefault();
    let file = events.dataTransfer.files[0];
    if (file) {
      Agent.emit('add_hosts', file.name, 'file://' + file.path);
    }
  }

  render() {
    return (
      <div id="panel" className={styles.root}>
        <div onDragEnter={this.handleOndragenter} onDragOver={this.handleOndragover}
             onDrop={this.handleOndrop}>
          <List {...this.props}/>
        </div>
        <div>
          <NginxList current={this.props.current} sys_nginx_config={this.props.sys_nginx_config}
                     nginx_config_list={this.props.nginx_config_list} lang={this.props.lang}
                     setCurrent={this.props.setCurrent}/>
        </div>
        <Buttons/>
      </div>
    );
  }
}
