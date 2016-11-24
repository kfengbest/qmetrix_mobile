/**
 * Created by kaven on 22/11/2016.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image
} from 'react-native';


export default class WidgetCell extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.title}>{this.props.widget}</Text>
          <Image source={require('../.././img/chart-data.png')} style={styles.widget} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#edeeee'
    },
    title: {
        fontSize:18,
        lineHeight: 50
    },
    widget: {
        width: 350,
        height: 230
    }
});