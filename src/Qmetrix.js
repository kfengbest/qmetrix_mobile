/**
 * Created by macking on 22/11/2016.
 */
import React, { Component } from 'react';
import { Navigator } from 'react-native';

import MyScene from './MyScene';
import Login from './page/Login';

export default class Qmetrix extends Component {
    render() {
      return (
        <Navigator 
          initialRoute={{id:'login'}}
          renderScene={this.router}
        />
      );
    }

    router(route, nav){
      switch(route.id){
        case 'login':
          return (
            <Login />
          );
        case 'main':
          return (
            <MyScene />
          );       
        default:
          return (<View />);
      }
    }
}