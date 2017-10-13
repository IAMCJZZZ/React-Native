/**
 * Created by cj on 2017/10/13.
 */
import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableHighlight,
    NavigatorIOS,
} from 'react-native';

import Swipers from 'react-native-swiper'

var screenW = Dimensions.get('window').width;
var screenH = Dimensions.get('window').height;


export default class extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        return (
            <View style={styles.mainStyle}>

                <Swipers style={styles.wrapper}
                        autoplay={true}
                        autoplayTimeout={1}
                >
                    <View style={styles.slide}></View>
                    <View style={styles.slide1}></View>
                    <View style={styles.slide2}></View>
                    <View style={styles.slide3}></View>
                </Swipers>
            </View>
        );
    }
}


var styles = StyleSheet.create({
    mainStyle: {
        width: screenW,
        height: screenH,
        backgroundColor: "#1ab9af",
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    wrapper:{
        marginTop:50,
        height:250,
        backgroundColor:'white',
    },
    slide: {
        height:250,
        justifyContent: 'center',
        backgroundColor: 'blue'
    },
    slide1: {
        height:250,
        justifyContent: 'center',
        backgroundColor: 'yellow'
    },
    slide2: {
        height:250,
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    slide3: {
        height:100,
        justifyContent: 'center',
        backgroundColor: 'cyan'
    },
});