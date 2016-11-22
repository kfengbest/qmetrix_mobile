/**
 * Created by macking on 21/11/2016.
 */

import React, { Component, PropTypes } from 'react';
import { NavigatorIOS, Text,StyleSheet } from 'react-native';

import WidgetList from './widgetlist'

export default class Dashboard extends Component {
  render() {
    return (
      <NavigatorIOS
        ref='nav'
        style = {styles.container}
        initialRoute={{
          component: WidgetList,
          title: 'Dashboard',
        }}
        style={{flex: 1}}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});