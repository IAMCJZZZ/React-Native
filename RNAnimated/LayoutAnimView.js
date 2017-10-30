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
    LayoutAnimation,
} from 'react-native';

var screenW = Dimensions.get('window').width;
var screenH = Dimensions.get('window').height;

var anima = {
    duration: 1000,   //持续时间
    create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.scaleXY,
    },
    update: {
        type: 'linear',
    }
};

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            width: 250,
            height: 125,
            show:false,
        }
    }

    _clickStartAnimation() {

        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        // LayoutAnimation.configureNext(anima,()=>{});
        this.setState({
            show: true,
        });
    }

    render(){

        var secondMoney = this.state.show ? (
            <Image style={{width:this.state.width,height:this.state.height}}
                   source={{uri:'100.jpg'}}>
            </Image>
        ) : null;

        return (
            <View style={styles.mainStyle}>

                <Image style={{width:this.state.width,height:this.state.height}}
                       source={{uri:'100.jpg'}}>
                </Image>

                {secondMoney}

                <TouchableOpacity style={{width:200,height:50,backgroundColor:'yellow',marginTop:40}} onPress={this._clickStartAnimation.bind(this)}>
                    <Text style={{width:200,height:50,textAlign:'center',lineHeight:50}}>魔法现金</Text>
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
/*
_clickStartAnimation() {
    LayoutAnimation.configureNext({
        duration: 1000,   //持续时间
        create: {
            type: LayoutAnimation.Types.spring,
            property: LayoutAnimation.Properties.scaleXY,
        },
        update: {
            type: 'spring',
            springDamping: 0.4,
        }
    });
    this.setState({
        width: this.state.width + 40,
        height: this.state.height + 60,
        left: this.state.left + 20,
        top: this.state.top + 50,
    });
}
*/

/*
var anima = {
    duration: 1000,   //持续时间
    create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
    },
    update: {
        type: 'easeOut',
    }
};

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            width: 200,
            height: 100,
            left:100,
            top:20,
        }
    }

    _clickStartAnimation() {

        LayoutAnimation.configureNext(anima,()=>{
            this.setState({
                top: 20,
            });
        });
        this.setState({
            top: this.state.top + 200,
        });
    }

    _setTimer(){
        // 创建定时器
        this._clickStartAnimation();
        this.timer =  setInterval(this._clickStartAnimation.bind(this),1200);
    }

    render(){
        return (
            <View style={styles.mainStyle}>

                <Image style={{width:this.state.width,height:this.state.height,position:'absolute',left:this.state.left, top:this.state.top}}
                       source={{uri:'100.jpg'}}>
                </Image>

                <View style={{
                    width:240,
                    height:120,
                    position:'absolute',
                    left:80,
                    top:200,
                    backgroundColor:'red',
                }}>
                    <Text style={{color:'#FFD700',fontSize:90,lineHeight:104,width:240, textAlign:'center'}}>红包</Text>
                </View>

                <TouchableOpacity style={{width:200,height:50,backgroundColor:'yellow',marginTop:40}} onPress={this._setTimer.bind(this)}>
                    <Text style={{width:200,height:50,textAlign:'center',lineHeight:50}}>点击开始动画</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
*/