/**
 * Created by kaven on 22/11/2016.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image
} from 'react-native';
import httpreq from '../service/getdata';

export default class ProfileView extends Component {
    _onPressButton() {
        console.log("You tapped the button!");
        let params = {
            full:true,
            product:'Fusion360',
            weeks:24
        };
        let result = httpreq.httpreq('api/usages/mau',params);
        console.log(result);
    }

    render() {
        return (
            <View>
                <TouchableHighlight onPress={this._onPressButton}>
                    <Image
                        source={require('../../img/myButton.png')}
                    />
                </TouchableHighlight>
            </View>
        );
    }
}

