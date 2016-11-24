/**
 * Created by kaven on 22/11/2016.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ListView
} from 'react-native';

import PortfolioCell from './portfoliocell'

export default class PortfoliosList extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['portfolio 1', 'portfolio 2', 'portfolio 3']),
    };
  }

  onCellSelected(data){
    console.log(data);
    this.props.nav.pop();
    this.props.eventEmitter.emit('portfolioChanged', {portfolio: data});
  }

  _renderRow(data) {
    let that = this;
    return (
     <PortfolioCell
        onSelected={this.onCellSelected.bind(this,data)}
        dashboard={data}
     />
    );
  }

  render() {
    let that = this;
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
      />
    )
  }
}
