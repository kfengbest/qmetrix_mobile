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
            <View style={{top:50}}>
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.key}>Full Name: </Text><Text style={styles.label}>{LoginApi.userName()}</Text>
                <Text></Text>
                <Text style={styles.key}>EMail:</Text><Text style={styles.label}>{LoginApi.userMail()}</Text>
                <Text></Text><Text></Text>
                <Button
                    onPress={this.logout.bind(this)}
                    title="Logout QMetrix"
                    color="#CC0000"
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
        textAlign:'center',
    },
    key: {
        color: 'black',
        fontSize: 18,
        left:5
    },
    label: {
        color: 'darkgray',
        fontSize: 18,
        left:5
    }

});