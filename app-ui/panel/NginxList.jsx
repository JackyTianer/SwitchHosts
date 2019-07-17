import { Icon } from 'antd';
import React from 'react';
import Agent from '../Agent';
import styles from './List.less';
import ListItem from './ListItem';
import NginxListItem from './NginxListItem';

class NginxList extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      isPackup: false
    };
    this.clickSysItm = this.clickSysItm.bind(this);
  }

  clickSysItm() {
    this.setState({
      isPackup: !this.state.isPackup
    });
  }

  customItems() {
    return this.props.nginx_config_list.map((item, idx) => {
      return (
        <NginxListItem
          data={item}
          idx={idx}
          lang={this.props.lang}
          current={this.props.current}
          setCurrent={this.props.setCurrent}
          key={'hosts-' + idx + Math.random()}
          show={true}
        />
      );
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles['custom-sys-item']}>
          <NginxListItem
            data={this.props.sys_nginx_config}
            current={this.props.current}
            lang={this.props.lang}
            setCurrent={this.props.setCurrent}
            sys={true}/>
          <div onClick={this.clickSysItm} className={styles['custom-sys-item_icon']}>
            {this.state.isPackup ? <Icon type="caret-up"/> : <Icon type="caret-down"/>}
          </div>
        </div>
        <div ref={c => this.el_items = c} className={styles['custom-items']}
             style={{ maxHeight: this.state.isPackup ? 0 : 'none' }}>
          {this.customItems()}
        </div>
      </div>
    );
  }
}

export default NginxList;
