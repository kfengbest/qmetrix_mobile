/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import Qmetrix from './src/Qmetrix';

export default class qmetrix_mob extends Component {
    render() {
        return (<Qmetrix />);
    }
}

AppRegistry.registerComponent('qmetrix_mob', () => qmetrix_mob);