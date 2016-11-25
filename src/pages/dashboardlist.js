/**
 * Created by kaven on 22/11/2016.
 * this is the private dashboard list
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    RefreshControl,
    ListView
} from 'react-native';

import DashboardApi from '../service/qm-dashboard'
import DashboardCell from './dashboardcell'

export default class DashboardsList extends Component {

    constructor (props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            refreshing: false,
            dataSource: ds.cloneWithRows([]),
        };
        this.reloadData();
    }

    reloadData () {
        // call rest api to fetch data.
        DashboardApi.getMine().then(function (data) {
            console.log("private dashboards:", data);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data)
            });
            this.setState({refreshing: false});
        }.bind(this)).catch((error) => {
            console.log("error in reload data:", error);
        });
    }

    onCellSelected (data) {
        console.log(data);
        this.props.nav.pop();
        this.props.eventEmitter.emit('dashboardChanged', {dashboard: data});
    }

    _renderRow (data) {
        let that = this;
        return (
            <DashboardCell
                onSelected={this.onCellSelected.bind(this, data)}
                dashboard={data}
            />
        );
    }

    _onRefresh () {
        this.setState({refreshing: true});
        DashboardApi.getMine(true).then(function (data) {
            console.log("private dashboards:", data);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data)
            });
            this.setState({refreshing: false});
        }.bind(this)).catch((error) => {
            console.log("error in reload data:", error);
        });
    }

    render () {
        let that = this;
        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                refreshControl={
                    <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                    />
                }
            />
        )
    }
}
