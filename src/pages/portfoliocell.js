/**
 * Created by kaven on 22/11/2016.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
    "pfoitem": {
        marginTop:3,
        // marginBottom:1,
        borderLeftWidth:3,
        borderLeftColor:"#17a48a",
        backgroundColor:"#dcf9e8",
        height: 30,
        marginLeft:5,
        marginRight: 5,
        paddingLeft:2,
        paddingRight:2,
    },
    "pfoowner": {
        textAlign: "right",
        fontSize: 10,
        fontStyle: 'italic',
        color: 'blue'
    }
});

export default class PortfolioCell extends Component {

    constructor (props) {
        super(props);
        this.pfo = props.portfolio;
    }

    render () {
        return (
            <TouchableHighlight onPress={this.props.onSelected}>
                <View style={styles.pfoitem}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16,

                    }}>{this.pfo.name}</Text>
                    <Text style={styles.pfoowner}>{this.pfo.created_by}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}
