/**
 * @author oldj
 * @blog http://oldj.net
 */

'use strict';

import React from 'react';
import { notification } from 'antd';
import Panel from './panel/Panel';
import Content from './content/Content';
import SudoPrompt from './frame/SudoPrompt';
import EditPrompt from './frame/EditPrompt';
import About from './about/About';
import PreferencesPrompt from './frame/PreferencesPrompt';
import Agent from './Agent';
import { reg as events_reg } from './events/index';

import styles from './App.less';

export default class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      list: [], // 用户的 hosts 列表
      nginx_config_list: [], //用户的nginx配置列表
      sys_hosts: {}, // 系统 hosts
      sys_nginx_config: {}, // 系统nginx
      current: {}, // 当前 hosts
      current_nginx_config: {}, //当前nginx配置
      lang: {}, // 语言
      just_added_id: null
    };

    this.is_dragging = false;
    console.log(this.is_dragging);
    this.loadHosts();
    this.loadNginxConfigs();

    Agent.pact('getPref')
      .then(pref => {
        return pref.user_language || 'en';
      })
      .then(l => {
        Agent.pact('getLang', l).then(lang => {
          this.setState({ lang });
        });
      });

    events_reg(this);

    Agent.on('drag_start', () => {
      this.is_dragging = true;
      console.log('drag_start');
    });

    Agent.on('drag_end', () => {
      this.is_dragging = false;
      console.log('drag_end');
    });

    Agent.on('err', e => {
      console.log(e);
      notification.error({
        message: e.title,
        description: e.content,
        duration: 10,
        style: { backgroundColor: '#fff0f0' }
      });
    });

    setInterval(() => {
      let list = this.state.list;
      if (this.is_dragging || !list || list.length === 0) return;

      console.log('checkNeedRemoteRefresh');
      Agent.pact('checkNeedRemoteRefresh', list)
        .then(list => {
          Agent.emit('refresh_end');
          if (!list) return;
          Agent.emit('list_updated', list);
        })
        .catch(e => {
          console.log(e);
        });
    }, 60 * 1000);
  }

  loadHosts() {
    Agent.pact('getHosts').then(data => {
      let state = {
        list: data.list,
        sys_hosts: data.sys_hosts
      };
      let current = this.state.current;
      state.current = data.list.find(item => item.id === current.id) ||
        data.sys_hosts;

      this.setState(state);
    });
  }

  loadNginxConfigs() {
    Agent.pact('getNginxConfigs').then(data => {
      let state = {
        nginx_config_list: data.nginx_config_list,
        sys_nginx_config: data.sys_nginx_config
      };
      let current = this.state.current_nginx_config;
      state.current_nginx_config = data.nginx_config_list.find(item => item.id === current.id) ||
        data.sys_nginx_config;
      console.log(state);
      this.setState(state);
    });
  }


  setCurrent(data, type = 'host') {
    if (type === 'host') {
      if (data.is_sys) {
        Agent.pact('getSysHosts')
          .then(_hosts => {
            console.log(_hosts);
            this.setState({
              sys_hosts: _hosts,
              current: _hosts
            });
          });
      } else {
        this.setState({
          current: data
        });
      }
    } else if (type === 'nginx') {
      if (data.is_sys) {
        Agent.pact('getSysNginxConfigs')
          .then(_config => {
            this.setState({
              sys_nginx_config: _config,
              current: _config
            });
          });
      } else {
        this.setState({
          current: data
        });
      }
    }
  }

  static isReadOnly(hosts) {
    return !hosts || hosts.is_sys || hosts.where === 'remote' ||
      hosts.where === 'group';
  }

  toSave() {
    clearTimeout(this._t);

    this._t = setTimeout(() => {
      Agent.emit('save', this.state.list, null, true);
    }, 1000);
  }

  setHostsContent(v) {
    let { current, list } = this.state;
    if (current.content === v) return; // not changed

    //current = Object.assign({}, current, {
    //  content: v || ''
    //})
    //list = list.slice(0)
    current.content = v;
    let idx = list.findIndex(i => i.id === current.id);
    if (idx !== -1) {
      list.splice(idx, 1, current);
    }

    this.setState({
      current,
      list
    }, () => {
      this.toSave();
    });
  }

  justAdd(id) {
    this.setState({
      just_added_id: id
    });
  }

  handleOndragenter(events) {
    events.preventDefault();
  }

  handleOndragover(events) {
    events.preventDefault();
  }

  handleOndrop(events) {
    events.preventDefault();
  }

  componentDidMount() {

    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        Agent.emit('esc');
      }
    }, false);

    window.addEventListener('mouseup', () => {
      Agent.emit('drag_end');
    });
  }

  render() {
    let current = this.state.current;
    return (
      <div id="app" className={`platform-${Agent.platform} ${styles.app}`} onDragEnter={this.handleOndragenter}
           onDragOver={this.handleOndragover} onDrop={this.handleOndrop}>
        <SudoPrompt lang={this.state.lang}/>
        <EditPrompt
          lang={this.state.lang}
          list={this.state.list}
          justAdd={this.justAdd.bind(this)}
        />
        <PreferencesPrompt
          lang={this.state.lang}
        />
        <Panel
          list={this.state.list}
          sys_hosts={this.state.sys_hosts}
          nginx_config_list={this.state.nginx_config_list}
          sys_nginx_config={this.state.sys_nginx_config}
          current={current}
          setCurrent={this.setCurrent.bind(this)}
          lang={this.state.lang}
          just_added_id={this.state.just_added_id}
          justAdd={this.justAdd.bind(this)}
        />
        <Content
          current={current}
          readonly={App.isReadOnly(current)}
          setHostsContent={this.setHostsContent.bind(this)}
          lang={this.state.lang}
        />
        <About lang={this.state.lang}/>
      </div>
    );
  }
}
