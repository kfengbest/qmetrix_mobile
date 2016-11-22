/**
 * Created by lvs on 22/11/2016.
 */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    WebView
} from 'react-native';
import CookieManager from 'react-native-cookies';
import MainView from '../../qmetrix';

// Change to real urls when build and deploy, go ios/Info.plist to add HTTPS exceptions for staging
const LOGIN_URL = "http://localhost:8000/login/";
const HOME_URL = "http://localhost:8000/";

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});
/**
 * the login app by using the current qmetrix login page, it basically ensure user login before proceed further
 * TODO: how to leverage the cookie exactly still yet to be figured out
 */
export default class LoginApp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loggedIn: true,
            loadedCookie: true
        };
    }

    componentWillMount () {
        CookieManager.get(HOME_URL, (cookie) => {
            let isAuthenticated;
            // If it differs, change `cookie.remember_me` to whatever the name for your persistent cookie is!!!
            if(cookie) {
                isAuthenticated = true;
            }
            else {
                isAuthenticated = false;
            }

            this.setState({
                loggedIn: isAuthenticated,
                loadedCookie: true
            });
        });
    }

    onNavigationStateChange (navState) {
        // If we get redirected back to the HOME_URL we know that we are logged in. If your backend does something different than this
        // change this line.
        if(navState.url == HOME_URL) {
            this.setState({
                loggedIn: true,
            });
        }
    }

    render () {
        // If we have completed loading the cookie choose to show Login WebView or the LoginApp component, else just show an empty View.
        if(this.state.loadedCookie) {
                return (
                    <MainView loginState={this.state}/>
                );

            if(this.state.loggedIn) {
                // redir to main view now
                return (
                    <MainView loginState={this.state}/>
                );
            }
            else {
                return (
                    <View style={[styles.container]}>
                        <WebView
                            ref={'webview'}
                            automaticallyAdjustContentInsets={false}
                            style={styles.webView}
                            source={{uri: LOGIN_URL}}
                            javaScriptEnabled={true}
                            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                            startInLoadingState={true}
                        />
                    </View>
                );
            }
        }
        else {
            // generally, shouldn't be here
            return (
                <View>
                    <Text>Login Required!
                    </Text>
                </View>
            );
        }
    }
}
