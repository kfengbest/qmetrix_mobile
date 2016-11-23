/**
 * Created by kaven on 22/11/2016.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    Button,
    Alert
} from 'react-native';

import httpreq from '../service/qm-httputil';
import _loginState from '../service/qm-login';
import LoginApp from '../pages/login/login-local';


export default class ProfileView extends Component {
    constructor (props) {
        super(props);
        console.log(props);
    }

    logout(){
        let that = this;
        fetch('https://qmetrix.autodesk.com/rest-logout/')
        .then((response) => {
            if(response.ok){
                that.props.navigator.replace({id:'login'});
            }
            else{
                Alert.alert('Logout Fail');
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <View>
                <Text style={styles.title}>Profile:{_loginState.userDisplayName}</Text>
                <Text style={styles.key}>Full Name: </Text>
                <Text style={styles.key}>EMail:{_loginState.userMail}</Text>

                <Button
                    onPress={this.logout.bind(this)}
                    title="Logout QMetrix"
                    color="#CC0000"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 22,
    },
    key: {
        color: 'black',
        fontSize: 18,
    },
});