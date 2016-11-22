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

var styles = require('./style.js');
const onButtonPress = () => {
    Console.debug("logout pressed!");
};

export default class LoginApp extends Component {
    constructor (props) {
        super(props);
        this.stateUser = {text: 'Autodesk Domain Account'};
        this.statePassword = {text: 'Password'};
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
                        onChangeText={(text) => this.setState({text})}
                        value={this.stateUser.text}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({text})}
                        value={this.statePassword.text}
                    />
                    <View style={styles.btn}>
                        <Button
                            onPress={onButtonPress}
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

