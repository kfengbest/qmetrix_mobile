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

import LoginApi from '../service/qm-login';



export default class ProfileView extends Component {
    constructor (props) {
        super(props);
        console.log(props);
    }

    logout(){
        LoginApi.logout().then(function(){
            this.props.navigator.replace(this.props.navigator.props.initialRoute);
        }.bind(this));
    }

    render() {
        return (
            <View>
                <Text style={styles.title}>Profile:{LoginApi.userName()}</Text>
                <Text style={styles.key}>Full Name: </Text>
                <Text style={styles.key}>EMail:{LoginApi.userMail()}</Text>

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