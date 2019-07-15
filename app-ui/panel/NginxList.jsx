import React from 'react';
import styles from './List.less';
import NginxListItem from './NginxListItem';

class NginxList extends React.Component{
  customItems() {
    return this.props.list.map((item, idx) => {
      return (
        <NginxListItem
          data={item}
          idx={idx}
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
          sys={true}/>
        <div ref={c => this.el_items = c} className={styles['custom-items']}>
          {this.customItems()}
        </div>
      </div>
    );
  }
}

export  default NginxList;
