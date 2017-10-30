/**
 * Created by cj on 2017/10/26.
 */
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

var screenW = Dimensions.get('window').width;
var screenH = Dimensions.get('window').height;

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            width: 100,
            height: 150,
        }
    }

    _clickStartAnimation() {
        var count = 0;
        while(++count<30) {
            requestAnimationFrame(() => {

                this.refs.image.setNativeProps({
                    style:{
                        width:this.state.width++,
                        height:this.state.height++,
                    }
                });
            });
        }
    }


    render(){
        return (
            <View style={styles.mainStyle}>

                <Image ref="image" style={{width:this.state.width,height:this.state.height}}
                       source={{uri:'beauty.jpg'}}>
                </Image>

                <TouchableOpacity style={{width:200,height:100}} onPress={this._clickStartAnimation.bind(this)}>
                    <Text style={{width:200,height:100,textAlign:'center',lineHeight:100}}>点击开始动画</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    mainStyle:{
        flex:1,
        width:screenW,
        backgroundColor:"#1ab9af",
        justifyContent:'center',
        alignItems:'center',
    },
});