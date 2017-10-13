/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    NavigatorIOS,
    TabBarIOS,
} from 'react-native';

import MainView from './view/CreditNoneHeaderView.js';
import SwiperView from './view/SwiperView';

const title = "全能借款";

export default class VWalletRN extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedIndex:0
        }
    }

    componentDidMount() {
        StatusBar.setBarStyle(1);
    }

  render() {
    return (
        <TabBarIOS
            unselectedTintColor="gray"
            tintColor="#1ab9af"
            barTintColor="black"
        >

            {/*借款*/}
            <TabBarIOS.Item title='借款'
                            icon={{uri:'a',scale: 2}}
                            onPress={()=>{
                                this.setState({
                                    selectedIndex:0
                                })
                            }}
                            selected={this.state.selectedIndex == 0}
                            // badge={1}
            >
                <NavigatorIOS initialRoute={
                    {
                        component: MainView,
                        title: title,
                    }
                }
                 style={{flex:1}}
                 barTintColor={'#1ab9af'}
                 translucent={false}
                 titleTextColor={'#fff'}
                 />
            </TabBarIOS.Item>

            {/*指南*/}
            <TabBarIOS.Item title='指南'
                            icon={{uri:'c',scale: 2}}
                            selected={this.state.selectedIndex == 1}
                            onPress={()=>{
                                this.setState({
                                    selectedIndex:1
                                })
                            }}
            >
                <NavigatorIOS initialRoute={
                    {
                        component: SwiperView,
                        title: '指南',
                    }
                }
                              style={{flex:1}}
                              barTintColor={'#1ab9af'}
                              translucent={false}
                              titleTextColor={'#fff'}
                />

            </TabBarIOS.Item>

            {/*我*/}
            <TabBarIOS.Item title='我'
                            icon={{uri:'b',scale: 2}}
                            onPress={()=>{
                                console.log('点击了我')
                                this.setState({
                                    selectedIndex:2
                                })
                            }}
                            selected={this.state.selectedIndex == 2}
            >
                <NavigatorIOS initialRoute={
                    {
                        component: View,
                        title: '我',
                    }
                }
                              style={{flex:1}}
                              barTintColor={'#1ab9af'}
                              translucent={false}
                              titleTextColor={'#fff'}
                />
            </TabBarIOS.Item>
        </TabBarIOS>
        //Navigator:
        //初始化路由（initialRoute），决定第一个界面的外观
        //配置一个跳转的场景
        //创建组件

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('VWalletRN', () => VWalletRN);
