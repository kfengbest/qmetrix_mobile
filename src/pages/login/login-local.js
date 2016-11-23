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

import MainView from '../../qmetrix'
import LoginApi from '../../service/qm-login'

var styles = require('./style.js');

export default class LoginApp extends Component {
    constructor (props) {
        super(props);
        this.userHint = 'Autodesk Domain Account';
        this.passHint = 'Password';
        this.state = {
            loginOk : false,
            user: '',
            password : ''
        }
    }

    onLoginBtnClick () {

        console.log("logout pressed!");
        LoginApi.login(this.state.user, this.state.password).then((data) => {
            if(data.isLogin) {
                console.log("login successful! welcome ", data.userDisplayName);
                this.setState({loginOk: true});

                this.props.navigator.replace({id:'tabsview'});
            } else {
                console.log("login failed! check again please, ", data.userAccount);
            }
        }).catch((error) => {
            console.log("login error: ", error);
        });

        this.props.navigator.replace({id:'tabsview'});

    }

    render () {
        if(this.state.loginOk) {
            return <MainView />
        } else {
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
                            placeholder={this.userHint}
                            onChangeText={(text) => this.setState({user:text})}
                            value={this.state.user}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={this.passHint}
                            password="true"
                            onChangeText={(text) => this.setState({password:text})}
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
}

