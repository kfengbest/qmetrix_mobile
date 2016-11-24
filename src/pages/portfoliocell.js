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


export default class PortfolioCell extends Component {

  constructor() {
    super();
  }
  
  render() {
    return (
      <TouchableHighlight
          onPress={this.props.onSelected}
      >
        <View>
          <Text>{this.props.portfolio}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
