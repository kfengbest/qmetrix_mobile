/**
 * Created by kaven on 22/11/2016.
 * this is the private dashboard list
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ListView
} from 'react-native';

import DashboardApi from '../service/qm-dashboard'
import DashboardCell from './dashboardcell'

export default class DashboardsList extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const samples = ['dashboard 1', 'dashboard 2', 'dashboard 3'];
    this.state = {
      rowData : samples,
      dataSource: ds.cloneWithRows(samples),
    };
  }

  reloadData(dashboardId) {
    // call rest api to fetch data.
    DashboardApi.getById(dashboardId).then
    let items = this.state.rowData;
    items.push(dashboardId);

    this.setState({
      rowData : items,
      dataSource: this.state.dataSource.cloneWithRows(items)
    });
  }

  onCellSelected(data){
    console.log(data);
    this.props.nav.pop();
    this.props.eventEmitter.emit('dashboardChanged', {dashboard: data});
  }

  _renderRow(data) {
    let that = this;
    return (
     <DashboardCell
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
