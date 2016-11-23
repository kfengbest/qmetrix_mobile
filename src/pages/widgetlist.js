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

import WidgetCell from './widgetcell'

export default class WidgetList extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['widget 1', 'widget 2', 'widget 3']),
    };
  }

  _renderRow(data) {
    return (
     <WidgetCell 
        widget={data}
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
