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
import Global from '../service/qm-global'
import DashboardApi from '../service/qm-dashboard'
import WidgetApi from '../service/qm-widget'
import WidgetCell from './widgetcell'

export default class WidgetList extends Component {

    constructor (props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.curPortfolio = null;
        this.curDashboard = null;
        this.state = {
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
        this.curPortfolio =  event.portfolio;
        this.reloadPortfolio();
    }

    handleDashboardChanged (event) {
        console.log("dashboard changed, reload widgets...", event);

        this.curDashboard = event.dashboard;
        this.reloadDashboard();
    }

    reloadPortfolio () {
        if(this.curPortfolio._id) {
            DashboardApi.getPortfolioDashboards(this.curPortfolio._id)
                        .then(function (data) {
                            console.log("portfolio dashboards:", data);
                            if(Global.isDefined(data.default)) {
                                this.curDashboard = data.default;
                            } else {
                                this.curDashboard = data.dashboards[0];
                            }
                            this.reloadDashboard();
                        }.bind(this))
                        .catch(function (error) {
                            console.log("error get portfolio dashbaords:", error);
                        });

        }

    }

    reloadDashboard () {
        if(this.curDashboard) {
            WidgetApi.getWidgetsOfDashboard(this.curDashboard._id)
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
            <WidgetCell key={data.title + data.type}
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
