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

import DashboardCell from './dashboardcell'

export default class DashboardsList extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['dashboard 1', 'dashboard 2', 'dashboard 3']),
    };
  }

  _renderRow(data) {
    return (
     <DashboardCell 
        dashboard={data}
     />
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    )
  }
}
