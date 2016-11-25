/**
 * Created by kaven on 22/11/2016.
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
import WidgetApi from '../service/qm-widget'
import WidgetCell from './widgetcell'

export default class WidgetList extends Component {

    constructor () {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dashboardId: "",
            rowData: [],
            dataSource: ds.cloneWithRows([]),
        };
    }

    componentDidMount () {
        this.props.eventEmitter.addListener('dashboardChanged', this.handleDashboardChanged, this);
        this.props.eventEmitter.addListener('portfolioChanged', this.handlePortfolioChanged, this);

    }

    handlePortfolioChanged (event) {
        console.log("portfolio changed, load the portfolio dashboards, then load the default dashboard", event);
        this.setState({portfolio: event.portfolio});
        this.reloadPortfolio();
    }

    handleDashboardChanged (event) {
        console.log("dashboard changed, reload widgets...", event);

        this.setState({dashboardId: event.dashboard._id});
        this.reloadDashboard();
    }

    reloadPortfolio () {
        // call rest api to fetch data.
        let items = this.state.rowData;
        items.push(this.state.dashboardId);

        this.setState({
            rowData: items,
            dataSource: this.state.dataSource.cloneWithRows(items)
        });
    }

    reloadDashboard () {
        if(this.state.dashboardId) {
            WidgetApi.getWidgetsOfDashboard(this.state.dashboardId)
                        .then(function (data) {
                            console.log("dashboard widgets:", data);
                            this.setState({
                                rowData: data.widgets,
                                dataSource: this.state.dataSource.cloneWithRows(data.widgets)
                            });

                        }.bind(this))
                        .catch(function (error) {
                            console.log("error fetch dashboard content:", error);
                        });
        }
    }

    _renderRow (data) {
        return (
            <WidgetCell
                widget={data}
            />
        );
    }

    render () {
        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
            />
        )
    }
}
