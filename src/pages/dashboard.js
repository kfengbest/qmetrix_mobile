/**
 * Created by macking on 21/11/2016.
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import { NavigatorIOS, Text,StyleSheet } from 'react-native';

import EventEmitter from 'EventEmitter';
import WidgetList from './widgetlist'
import DashboardsList from './dashboardlist'
import PortfolioList from './portfoliolist'


export default class Dashboard extends Component {

  constructor(props){
    super(props);
    this.eventEmitter = new EventEmitter();
  }

  
  _handleRightNavigationRequest() {
    this.refs.nav.push({
      component: DashboardsList,
      title: 'My Dashboards',
      passProps: { myProp: 'My Dashboards', eventEmitter: this.eventEmitter, nav : this.refs.nav},
    });
  }
  
  _handleLeftNavigationRequest() {
    this.refs.nav.push({
      component: PortfolioList,
      title: 'Portfolios',
      passProps: { myProp: 'Portfolios', eventEmitter: this.eventEmitter, nav : this.refs.nav },
    });
  }

  render() {
    return (
      <NavigatorIOS
        ref='nav'
        style = {styles.container}
        initialRoute={{
          component: WidgetList,
          passProps: {eventEmitter: this.eventEmitter},
          title: 'Home',
          leftButtonTitle: 'Portfolio',
          onLeftButtonPress: () => this._handleLeftNavigationRequest(),
          rightButtonTitle: 'My Dashboards',
          onRightButtonPress: () => this._handleRightNavigationRequest()
        }}
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