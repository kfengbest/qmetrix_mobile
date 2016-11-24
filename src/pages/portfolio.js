/**
 * Created by macking on 21/11/2016.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import PortfolioApi from '../service/qm-portfolio'

export default class Portfolio extends Component {
    constructor (props) {
        super(props);
        this.portfolios = [];
    }

    _onForward = () => {
        this.props.navigator.push({
            title: 'Scene ' + nextIndex,
        });
    };

    componentWillMount () {
        PortfolioApi.getAll().then(function (data) {
            this.portfolios = data.portfolios;
            console.log("portfolios:", this.portfolios);
        }.bind(this)).catch(function (error) {
            console.log("portfolios error:", error);
        });
    }

    render () {
        return (
            <View>
                <Text>Current Scene: { this.props.title }</Text>
                <TouchableHighlight onPress={this._onForward}>
                    <Text>Tap me to load the next scene</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
