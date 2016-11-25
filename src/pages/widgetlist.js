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
    const samples = ['widget 1', 'widget 2', 'widget 3'];
    this.state = {
      dashboardId : "dashboard1",
      rowData : samples,
      dataSource: ds.cloneWithRows(samples),
    };
  }

  componentDidMount() {
    this.props.eventEmitter.addListener('dashboardChanged', this.handleDashboardChanged, this);
      this.props.eventEmitter.addListener('portfolioChanged', this.handlePortfolioChanged, this);

      this.reloadData();
  }

    handlePortfolioChanged(event){
        console.log("portfolio changed, reload widgets...");
        console.log(event);

        this.setState({portfolio: event.portfolio});
        this.reloadData();
    }

  handleDashboardChanged(event){
    console.log("dashboard changed, reload widgets...", event);

    this.setState({dashboardId: event.dashboard});
    this.reloadData();
  }

  reloadData() {
    // call rest api to fetch data.
    let items = this.state.rowData;
    items.push(this.state.dashboardId);

    this.setState({
      rowData : items,
      dataSource: this.state.dataSource.cloneWithRows(items)
    });
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
