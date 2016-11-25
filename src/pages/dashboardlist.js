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

    }

    reloadData () {
        // call rest api to fetch data.
        DashboardApi.getMine().then(function (data) {
            console.log("private dashboards:", data);
            this.setState({
                refreshing: false,
                dataSource: this.state.dataSource.cloneWithRows(data.dashboards)
            });
        }.bind(this)).catch((error) => {
            console.log("error in reload data:", error);
        });
    }

    componentDidMount() {
        this.reloadData();
    }

    onCellSelected (data) {
        console.log(data);
        this.props.nav.pop();
        this.props.eventEmitter.emit('dashboardChanged', {dashboard: data});
    }

    _renderRow (data) {
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
                refreshing: false,
                dataSource: this.state.dataSource.cloneWithRows(data.dashboards)
            });
        }.bind(this)).catch((error) => {
            console.log("error in reload data:", error);
        });
    }

    render () {
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
