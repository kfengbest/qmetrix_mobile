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
    ListView
} from 'react-native';

import DashboardApi from '../service/qm-dashboard'
import DashboardCell from './dashboardcell'

export default class DashboardsList extends Component {

    constructor (props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            rowData: [],
            dataSource: ds.cloneWithRows([]),
        };
        this.reloadData();
    }

    reloadData () {
        // call rest api to fetch data.
        DashboardApi.getMine().then(function (data) {
            console.log("private dashboards:", data);
            this.setState({
                rowData: data.dashboards,
                dataSource: this.state.dataSource.cloneWithRows(data.dashboards)
            });
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

    render () {
        let that = this;
        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
            />
        )
    }
}
