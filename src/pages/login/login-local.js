/**
 * Created by lvs on 22/11/2016.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    Button,
    Image,
    View
} from 'react-native';

import LoginApi from '../../service/qm-login'

var styles = require('./style.js');

export default class LoginApp extends Component {
    constructor (props) {
        super(props);
        this.userHint = 'Autodesk Domain Account';
        this.passHint = 'Password';
        this.state = {
            loginInProgress: false,
            loginOk: false,
            loginError: "",
            user: '',
            password: ''
        }
    }

    onLoginBtnClick () {

        console.log("logout pressed!");
        this.setState({loginInProgress: true});
        LoginApi.login(this.state.user, this.state.password).then((data) => {
            if(data.isLogin) {
                console.log("login successful! welcome ", data.userDisplayName);
                this.setState({loginOk: true, loginError: "",loginInProgress: false});

                this.props.navigator.replace(this.props.goto);
            } else {
                this.setState({
                    loginOk: false,
                    loginInProgress: false,
                    loginError: "login failed! check again please"
                });
                console.log("login failed! check again please, ", data.userAccount);
            }
        }).catch((error) => {
            console.log("login error: ", error);
            this.setState({
                loginOk: false,
                loginError: "login failed! check again please",
                loginInProgress: false
            });
            console.log("login failed! check again please, ", data.userAccount);
        });
    }

    componentWillMount () {
        LoginApi.isLoggedIn().then(function (loggedIn) {
            if(loggedIn) {
                console.log("logged in, goto ", this.props.goto);
                this.props.navigator.replace(this.props.goto);
            }
        }.bind(this));
    }

    render () {
        return (
            <View style={styles.container}>
                <Image source={require('./qm-logo.png')} style={styles.logo}/>
                <View style={styles.content}>
                    <View style={styles.welcome}>
                        <Text style={styles.title}>
                            Sign In
                        </Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder={this.userHint}
                        onChangeText={(text) => this.setState({user: text})}
                        value={this.state.user}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={this.passHint}
                        password="true"
                        onChangeText={(text) => this.setState({password: text})}
                        value={this.state.password}
                    />
                    <View style={styles.btn}>
                        <Button
                            onPress={this.onLoginBtnClick.bind(this)}
                            color="#fff"
                            title="Sign in"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </View>
            </View>
        );
    }
}

