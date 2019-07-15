import React from 'react';
import styles from './List.less';
import NginxListItem from './NginxListItem';

class NginxList extends React.Component{
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
        <NginxListItem
          data={this.props.sys_nginx_config}
          current={this.props.current}
          lang={this.props.lang}
          setCurrent={this.props.setCurrent}
          sys={true}/>
        <div ref={c => this.el_items = c} className={styles['custom-items']}>
          {this.customItems()}
        </div>
      </div>
    );
  }
}

export  default NginxList;
