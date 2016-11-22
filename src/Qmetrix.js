/**
 * Created by lvs on 22/11/2016.
 */
'use strict';

import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native'
import CookieManager from 'react-native-cookies'
import LoginApp from './pages/loginapp'


export default class MainView extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loggedIn: (this.props.loginState && this.props.loginState.loggedIn) || false
        };
    }

    logout () {
        CookieManager.clearAll((err, res) => {
            console.log(err);
            console.log(res);
        });

        this.setState({
            loggedIn: false,
        });

    }

    render () {
        if(this.state.loggedIn) {
            return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>
                        You are authenticated!
                    </Text>
                    <Button title="Log-out" style={{color: 'black'}} onPress={this.logout.bind(this)}>Logout</Button>
                    <Text style={styles.welcome}>
                        Welcome to QMetrix Mobile IOS!!!
                    </Text>
                    <Text style={styles.instructions}>
                        To get started, edit index.ios.js
                    </Text>
                    <Text style={styles.instructions}>
                        Press Cmd+R to reload,{'\n'}
                        Cmd+D or shake for dev menu
                    </Text>

                </View>
            );
        }
        else {
            return (
                <LoginApp />
            );
        }

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
