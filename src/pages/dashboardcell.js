/**
 * Created by kaven on 22/11/2016.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';


export default class DashboardCell extends Component {

  constructor() {
    super();
  }
  
  render() {
    return (
      <View>
        <Text>{this.props.dashboard}</Text>
      </View>
    )
  }
}
