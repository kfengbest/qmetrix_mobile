/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import MainView from './src/qmetrix'

export default class qmetrix_mob extends Component {
    constructor (props) {
        super(props);
        // this.state = {
        //     loggedIn: false
        // };
    }

    render() {
    return (
        <MainView />
    );
  }
}

AppRegistry.registerComponent('qmetrix_mob', () => qmetrix_mob);