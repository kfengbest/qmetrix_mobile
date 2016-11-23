/**
 * Created by macking on 21/11/2016.
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import { NavigatorIOS, Text,StyleSheet } from 'react-native';

import WidgetList from './widgetlist'
import DashboardsList from './dashboardlist'
import Portfolio from './portfolio'

export default class Dashboard extends Component {
  _handleRightNavigationRequest() {
    this.refs.nav.push({
      component: DashboardsList,
      title: 'Dashboards',
      passProps: { myProp: 'Dashboards' },
    });
  }
  
  _handleLeftNavigationRequest() {
    this.refs.nav.push({
      component: Portfolio,
      title: 'portfolios',
      passProps: { myProp: 'portfolios' },
    });
  }

  render() {
    return (
      <NavigatorIOS
        ref='nav'
        style = {styles.container}
        initialRoute={{
          component: WidgetList,
          title: 'QMetrix',
          leftButtonTitle: 'portfolio',
          onLeftButtonPress: () => this._handleLeftNavigationRequest(),
          rightButtonTitle: 'dashboard',
          onRightButtonPress: () => this._handleRightNavigationRequest()
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