/**
 * Created by kaven on 22/11/2016.
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
import PortfolioCell from './portfoliocell';
import PortfolioApi from '../service/qm-portfolio';

export default class PortfoliosList extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            refreshing: false,
            dataSource: ds.cloneWithRows([]),
        };
    }

    _onRefresh() {
        this.setState({refreshing: true});
        PortfolioApi.getAll(true).then(function (data) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data)
            });
            this.setState({refreshing: false});
        }.bind(this)).catch(function (error) {
            console.log("portfolios error:", error);
        });
    }

    onCellSelected(data) {
        console.log(data);
        this.props.nav.pop();
        this.props.eventEmitter.emit('portfolioChanged', {portfolio: data});
    }

    _renderRow(data) {
        return (
            <PortfolioCell
                onSelected={this.onCellSelected.bind(this,data)}
                portfolio={data}
            />
        );
    }

    componentWillMount() {
        PortfolioApi.getAll().then(function (data) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(data)
            });
        }.bind(this)).catch(function (error) {
            console.log("portfolios error:", error);
        });
    }

    render() {
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
