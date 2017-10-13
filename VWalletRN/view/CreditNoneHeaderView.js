/**
 * Created by cj on 2017/9/25.
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

import PgView from './PgView';

var screenW = Dimensions.get('window').width;
var screenH = Dimensions.get('window').height;
const highestTitle = "最高可借";
const numberTitle = "￥200000";

export default class CreditNoneHeaderView extends Component {
    constructor(props){
        super(props)

        this.state={
            buttonTitle:"马上借钱",
        }
    }
    clickBorrowMoney(){
        // this.setState({
        //     buttonTitle:"借钱成功",
        // });
        this.props.navigator.push({
            component:PgView,
            title:'密码',
            backButtonTitle: 'back',
        })

    }
    render(){
        return (
            <View style={styles.mainStyle}>

                {/*<Text style={styles.titleStyle}>{title}</Text>*/}

                <Image style={styles.imageStyle}
                       source={require('../res/halfcircle.png')}
                >
                    <Text style={styles.highestStyle}>{highestTitle}</Text>
                    <Text style={styles.numberStyle}>{numberTitle}</Text>
                </Image>

                <TouchableHighlight
                    style={styles.buttonBackStyle}
                    onPress={this.clickBorrowMoney.bind(this)}
                    underlayColor='#000'
                >
                    <Text style={styles.buttonStyle}>
                        {this.state.buttonTitle}
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    mainStyle:{
        marginTop:0,
        width:screenW,
        height:screenH,
        backgroundColor:"#1ab9af",
        justifyContent:'flex-start',
        alignItems:'center',
    },
    imageStyle:{
        marginTop:35,
        width:288,
        height:155,
        alignItems:'center',
    },
    titleStyle:{
        marginTop:20,
        width:200,
        height:44,
        lineHeight:44,
        color:'#fff',
        fontSize:20,
        textAlign:'center',
    },

    highestStyle:{
        marginTop:85,
        color:'#fff',
        fontSize:15,
        textAlign:'center',
    },

    numberStyle:{
        marginTop:10,
        color:'#fff',
        fontSize:34,
        textAlign:'center',
        fontWeight:'bold',
    },

    buttonBackStyle: {
        marginTop: 20,
        width: 200,
        height: 44,
    },

    buttonStyle:{
        marginTop:0,
        width:200,
        height:44,
        lineHeight:40,
        color:'#fff',
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold',
        backgroundColor:'#ff8200',
    },
});