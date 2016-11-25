/**
 * Created by lvs on 22/11/2016.
 */
'use strict';

import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native'
import LoginApp from './pages/login/login-local'
import MainTabs from './maintabs'

const _navIDs = {
    login: {id: 0},
    tabsview: {id: 1}
};

export default class MainView extends Component {
    constructor (props) {
        super(props);

    }

    router (route, nav) {
        switch(route.id) {
            case _navIDs.login.id:
                return (
                    <LoginApp navigator={nav} goto={_navIDs.tabsview} />
                );
            case _navIDs.tabsview.id:
                return (
                    <MainTabs navigator={nav}/>
                );
            default:
                return (<View>
                    <Text>Oops, something went wrong, you shouldn't be here.</Text>
                </View>);
        }
    }

    render () {
        return (
            <Navigator
                initialRoute={_navIDs.login}
                /*initialRoute = {{id:3}}*/
                renderScene={this.router}
            />
        );

    }
}


