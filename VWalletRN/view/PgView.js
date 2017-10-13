/**
 * Created by cj on 2017/10/12.
 */
import React, { Component,PropTypes} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    StatusBar,
} from 'react-native';

import PasswordGesture from 'react-native-gesture-password';

var screenW = Dimensions.get('window').width;
var screenH = Dimensions.get('window').height;

export default class extends Component {

    constructor() {
        super();
        this.state = {
            password: '',
            hasSet: false,
            enterApp: false,
        };
    }

    componentDidMount() {
        StatusBar.setBarStyle(1);
    }

    /*设置密码*/
    _setPassword(password) {
        this.setState({
            password: password,
            hasSet: true,
        })
    }

    render(){
        return (
            <View style={styles.mainStyle}>

                {this.state.hasSet?<View></View>:<SetPassword
                    setPassword={(password) => this._setPassword(password)}
                    password={this.state.password}
                />}
            </View>
        );
    }
}

class SetPassword extends Component{

    static propTypes = {
        password:React.PropTypes.string.isRequired,
        setPassword:React.PropTypes.func.isRequired,
    };

    constructor (props){
        super(props);

        this.state = {
            password:this.props.password,
            message:"请设置密码",
            status:'normal',
        };
    }

    onStart() {
        // if ( this.state.password === '') {
        //     this.setState({
        //         message: '请设置密码',
        //     });
        // } else {
        //     this.setState({
        //         message: '请再次设置密码',
        //     });
        // }
    }

    onEnd(password) {
        if ( this.state.password === '' ) {//如果是第一次

            this.state.password = password;
            alert('请再次设置密码');
            this.setState({
                status: 'normal',
                message: '请再次设置密码',
            });

        } else {//如果是第二次

            if ( this.state.password === password ) {//如果两次相同
                alert('密码设置完成');
                this.setState({
                    status: 'right',
                    message: '密码设置完成',
                });
                this.props.setPassword(password);

            } else {//如果两次不同

                alert('两次设置不一样，请重新设置');
                this.setState({
                    status: 'wrong',
                    message: '两次设置不一样，请重新设置',
                });
                // 创建定时器
                this.timer =  setInterval(this.updateUI.bind(this),1000);
            }
        }
    }

    updateUI (){
        this.setState({
            status: 'normal',
            message: '两次设置不一样，请重新设置',
        });
        clearInterval(this.timer);
    }

    render() {

        return (
            <PasswordGesture
                style = {styles.setPg}
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                allowCross={true}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
            />
        );
    }
}

var styles = StyleSheet.create({
    mainStyle:{
        flex:1,
        width:screenW,
        height:screenH,
        justifyContent:'flex-start',
        alignItems:'center',
    },
    setPg:{
        width:screenW,
        height:screenH,
        backgroundColor:"#012642",
    },
});