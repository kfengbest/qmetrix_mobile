/**
 * Created by lvs on 22/11/2016.
 */
'use strict';

import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button,
    Navigator
} from 'react-native'
import CookieManager from 'react-native-cookies'
// import LoginApp from './pages/login/loginapp'
import LoginApp from './pages/login/login-local'
import MainTabs from './maintabs'
import LoginApi from './service/qm-login'

export default class MainView extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loggedIn: LoginApi.isLoggedIn()
        };
    }

    logout () {
        LoginApi.logout();
        this.setState({loggedIn: false});
        // CookieManager.clearAll((err, res) => {
        //     console.log(err);
        //     console.log(res);
        // });
        //
        // this.setState({
        //     loggedIn: false,
        // });

    }

  router(route, nav){
    switch(route.id){
      case 'login':
        return (
          <LoginApp navigator={nav}/>
        );
      case 'tabsview':
        return (
          <MainTabs navigator={nav}/>
        );
      default:
        return (<View />);
    }
  }

    render () {
        return (
          <Navigator 
            initialRoute={{id:'login'}}
            renderScene={this.router}
          />
        );

    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
