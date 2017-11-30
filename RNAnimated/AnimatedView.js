/**
 * Created by cj on 2017/11/28.
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
    Animated,//创建动画的库
    Easing,//React Native创建动画的载体
} from 'react-native';

var screenW = Dimensions.get('window').width;
var screenH = Dimensions.get('window').height;

export default class AnimatedStagger extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redValue: new Animated.Value(0),
            blueValue : new Animated.Value(0),
        };

        this.staggerAnimated = Animated.stagger(2000,
            [
                Animated.timing(
                    this.state.redValue,
                    {
                        toValue: 1,
                        duration: 5000,
                        easing: Easing.in,
                    }
                ),
                Animated.timing(
                    this.state.blueValue,
                    {
                        toValue: 1,
                        duration: 5000,
                        easing: Easing.in,
                    }
                ),
            ]
        );
    }

    _startAnimated() {
        this.staggerAnimated.start();
    }

    render(){

        const redMarginLeft = this.state.redValue.interpolate({
            inputRange: [0,1],
            outputRange: [0,200]
        });

        const blueMarginLeft = this.state.blueValue.interpolate({
            inputRange: [0,1],
            outputRange: [0,200]
        });

        return (
            <View style={styles.mainStyle}>

                {/*// 红色*/}
                <Animated.View
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor:'red',
                        marginLeft:redMarginLeft,
                    }}
                >
                </Animated.View>


                {/*// 蓝色*/}
                <Animated.View
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor:'blue',
                        marginLeft:blueMarginLeft,
                    }}
                >
                </Animated.View>

                <TouchableOpacity style={styles.touchStyle} onPress={this._startAnimated.bind(this)}>
                    <Text style={{width:200,height:100,textAlign:'center',lineHeight:100}}>点击开始动画</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class AnimatedSequence extends Component {

    constructor(props) {
        super(props);

        this.state = {
            turnRotateValue: new Animated.Value(0),
            turnShakeValue : new Animated.Value(0),
            macValue : new Animated.Value(0),
        };

        this.sequenceAnimated = Animated.sequence(
            [
                Animated.timing(
                    this.state.turnRotateValue,
                    {
                        toValue: 1,
                        duration: 5000,
                        easing: Easing.in,
                    }
                ),
                Animated.timing(
                    this.state.turnShakeValue,
                    {
                        toValue: 1,
                        duration: 500,
                        easing: Easing.in,
                        delay:300,
                    }
                ),
                Animated.spring(
                    this.state.macValue,
                    {
                        toValue: 1,
                        friction: 3,
                        tension:10,
                    }
                ),
            ]
        );
    }

    _startAnimated() {
        this.sequenceAnimated.start();
    }

    render(){

        //转盘旋转
        const turnRotateZ = this.state.turnRotateValue.interpolate({
            inputRange: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1],
            outputRange: [
                '0deg',
                '180deg',
                '360deg',
                '720deg',
                '1080deg',
                '1800deg',
                '2520deg',
                '3060deg',
                '3420deg',
                '3600deg',
                '3690deg',
            ]
        });

        //转盘震动
        const marginLeft = this.state.turnShakeValue.interpolate({
            inputRange: [0,0.2,0.4,0.6,0.8,1],
            outputRange: [0,-40,40,-40,40,0]
        });

        //MacTop
        const macTop = this.state.macValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-200,150]
        });

        return (
            <View style={styles.mainStyle}>

                {/*// 转盘*/}
                <Animated.View
                    style={{
                        width: 300,
                        height: 300,
                        marginLeft:marginLeft,
                        transform:[
                            {rotateZ:turnRotateZ}
                        ],
                    }}
                >
                    <Image ref="image" style={{width:300,height:300}}
                           source={{uri:'turntable.jpg'}}>
                    </Image>
                </Animated.View>


                {/*// mac*/}
                <Animated.View
                    style={{
                        width: 300,
                        height: 204,
                        position: 'absolute',
                        top:macTop,
                        left:screenW / 2 - 150,
                    }}
                >
                    <Image ref="image" style={{width:300,height:204}}
                           source={{uri:'macpro.png'}}>
                    </Image>
                </Animated.View>

                <TouchableOpacity style={styles.touchStyle} onPress={this._startAnimated.bind(this)}>
                    <Text style={{width:200,height:100,textAlign:'center',lineHeight:100}}>点击开始动画</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class AnimatedParallel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dogOpacityValue: new Animated.Value(1),
            dogACCValue : new Animated.Value(0)
        };

        this.parallelAnimated = Animated.sequence(
            [
                Animated.timing(
                    this.state.dogOpacityValue,
                    {
                        toValue: 1,
                        duration: 1000,
                    }
                ),
                Animated.timing(
                    this.state.dogACCValue,
                    {
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.linear,
                    }
                ),
            ],
            {
                stopTogether: false
            }
        );
    }

    _startAnimated() {
        this.state.dogOpacityValue.setValue(0);
        this.state.dogACCValue.setValue(0);
        this.parallelAnimated.start();
    }

    render(){

        //透明度
        const dogOpacity = this.state.dogOpacityValue.interpolate({
            inputRange: [0,0.2,0.4,0.6,0.8,1],
            outputRange: [0,1,0,1,0,1]
        });

        //眼镜左边
        const left = this.state.dogACCValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-120, 127]
        });

        //眼镜旋转
        const rotateZ = this.state.dogACCValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        //项链上面
        const neckTop = this.state.dogACCValue.interpolate({
            inputRange: [0, 1],
            outputRange: [350, 235]
        });

        return (
            <View style={styles.mainStyle}>

                {/*// 狗头*/}
                <Animated.View
                    style={{
                        width: 375,
                        height: 240,
                        opacity:dogOpacity,
                    }}
                >
                    <Image ref="image" style={{width:375,height:242}}
                           source={{uri:'dog.jpg'}}>
                    </Image>
                </Animated.View>

                {/*// 项链*/}
                <Animated.View
                    style={{
                        width: 250,
                        height: 100,
                        position: 'absolute',
                        top:neckTop,
                        left:93,
                    }}
                >
                    <Image ref="image" style={{width:250,height:100,resizeMode:'stretch'}}
                           source={{uri:'necklace.jpg'}}>
                    </Image>
                </Animated.View>

                <View
                    style={{
                        width: 375,
                        height: 200,
                        backgroundColor:'white',
                    }}
                />

                {/*// 眼镜*/}
                <Animated.View
                    style={{
                        width: 120,
                        height: 25,
                        position: 'absolute',
                        top:160,
                        left:left,
                        transform:[
                            {rotateZ:rotateZ}
                        ],
                    }}
                >
                    <Image ref="image" style={{width:120,height:25,resizeMode:'stretch'}}
                           source={{uri:'glasses.png'}}>
                    </Image>
                </Animated.View>

                <TouchableOpacity style={styles.touchStyle} onPress={this._startAnimated.bind(this)}>
                    <Text style={{width:200,height:100,textAlign:'center',lineHeight:100}}>点击开始动画</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class AnimatedDecay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            decayValue: new Animated.ValueXY({x:0,y:0}),
        };

        this.decayAnimated = Animated.decay(
            this.state.decayValue,
            {
                velocity: 5,       // 起始速度，必填
                deceleration: 0.95,  // 速度衰减比例，默认为0.997
            }
        );
    }

    _startAnimated() {
        this.decayAnimated.start();
    }

    render(){
        return (
            <View style={styles.mainStyle}>

                <Animated.View
                    style={{
                        width: 100,
                        height: 150,
                        transform:[
                            {translateX: this.state.decayValue.x}, // x轴移动
                            {translateY: this.state.decayValue.y}, // y轴移动
                        ]
                    }}
                >
                    <Image ref="image" style={{width:100,height:150}}
                           source={{uri:'beauty.jpg'}}>
                    </Image>
                </Animated.View>

                <TouchableOpacity style={styles.touchStyle} onPress={this._startAnimated.bind(this)}>
                    <Text style={{width:200,height:100,textAlign:'center',lineHeight:100}}>点击开始动画</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class AnimatedSpring extends Component {

    constructor(props) {
        super(props);

        this.state = {
            springValue: new Animated.Value(1),
        };

        this.springAnimated = Animated.spring(
            this.state.springValue,
            {
                toValue: 1,
                friction: 2,    //弹跳系数
            }
        );
    }

    _startAnimated() {
        this.state.springValue.setValue(0.1);
        this.springAnimated.start();
    }

    render(){
        return (
            <View style={styles.mainStyle}>

                <Animated.View
                    style={{
                        width: 282,
                        height: 51,
                        transform:[
                            {scale:this.state.springValue}
                        ]
                    }}
                >
                    <Image ref="image" style={{width:282,height:51}}
                           source={{uri:'appstore_comment_image.png'}}>
                    </Image>
                </Animated.View>

                <TouchableOpacity style={styles.touchStyle} onPress={this._startAnimated.bind(this)}>
                    <Text style={{width:200,height:100,textAlign:'center',lineHeight:100}}>点击开始动画</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class Mixture extends Component {

    constructor(props) {
        super(props);

        this.state = {
            animatedValue: new Animated.Value(0),
        }

        this.rotateAnimated = Animated.timing(
            this.state.animatedValue,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.in,
            }
        );
    }

    _startAnimated() {
        this.state.animatedValue.setValue(0);
        this.rotateAnimated.start(() => this._startAnimated());
    }

    render(){

        const rotateZ = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        const opacity = this.state.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 0]
        });

        const rotateX = this.state.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '180deg', '0deg']
        });

        const textSize = this.state.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [18, 32, 18]
        });

        const marginLeft = this.state.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 200, 0]
        });

        return (
            <View style={styles.mainStyle}>

                <Animated.View
                    style={{
                        marginTop: 10,
                        width: 100,
                        height: 100,
                        transform: [
                            {rotateZ:rotateZ},
                        ]
                    }}
                >
                    <Image style={{width:100,height:100}}
                           source={{uri:'out_loading_image.png'}}>
                    </Image>
                </Animated.View>

                <Animated.View
                    style={{
                        marginTop: 10,
                        width: 100,
                        height: 100,
                        opacity:opacity,
                        backgroundColor:'red',
                    }}
                />

                <Animated.Text
                    style={{
                        marginTop: 10,
                        width:100,
                        fontSize: 18,
                        color: 'white',
                        backgroundColor:'red',
                        transform: [
                            {rotateX:rotateX},
                        ]
                    }}
                >
                    窗外风好大，我没有穿褂。
                </Animated.Text>

                <Animated.Text
                    style={{
                        marginTop: 10,
                        height: 100,
                        lineHeight: 100,
                        fontSize: textSize,
                        color: 'red'
                    }}
                >
                    IAMCJ嘿嘿嘿
                </Animated.Text>

                <Animated.View
                    style={{
                        marginTop: 10,
                        width: 100,
                        height: 100,
                        marginLeft:marginLeft,
                        backgroundColor:'red',
                    }}
                />

                <TouchableOpacity style={styles.touchStyle} onPress={this._startAnimated.bind(this)}>
                    <Text style={{width:200,height:100,textAlign:'center',lineHeight:100}}>点击开始动画</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class Opacity extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fadeOutOpacity: new Animated.Value(1),
        };


        this.fadeOutAnimated = Animated.timing(
            this.state.fadeOutOpacity,
            {
                toValue: 0,  //透明度动画最终值
                duration: 3000,   //动画时长3000毫秒
                easing: Easing.linear,
            }
        );
    }

    _startAnimated() {
        this.fadeOutAnimated.start(() => this.state.fadeOutOpacity.setValue(1));
    }

    render(){
        return (
            <View style={styles.mainStyle}>

                 <Animated.View style={{width: 200, height: 300, opacity: this.state.fadeOutOpacity}}>
                    <Image ref="image" style={{width:200,height:300}}
                           source={{uri:'beauty.jpg'}}>
                    </Image>
                 </Animated.View>

                <TouchableOpacity style={styles.touchStyle} onPress={this._startAnimated.bind(this)}>
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
        backgroundColor:"#ffffff",
        justifyContent:'flex-start',
        alignItems:'flex-start',
        paddingTop:100,
    },
    touchStyle:{
        width:200,
        height:100,
        position:'absolute',
        bottom:0,
        left:screenW/2 - 100,
    },
});