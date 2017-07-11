import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Navigator,
  Dimensions,
} from 'react-native';

urlLogin="http://api.wevet.cn/Api/Login";
var url="http://api.wevet.cn/Api/Login/";

import Find from './../Launch/Find'
import Login from './../Launch/Login'
import About from './About'
import Feedback from './Feedback'

// var Main = require('./Components/Main/Main');
export default class Home extends Component {
    constructor(props) {  
        super(props);
        this.state = {
            phone:this.props.phone,
        };
    }
    componentDidMount() {
           
    }

    render() {
        return (
            <View style = { {flex:1,backgroundColor:'#e8e8e8'}}>
                {/*header*/}
                <View style={styles.navBarStyle}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>个人主页</Text>
                </View>
                <View style={styles.spaceling}></View>
                <View style={styles.list1}>
                    <Text style={styles.textleft}>我的信息</Text>
                    <Text>{this.state.phone}</Text>
                </View>
                <View style={styles.spaceling}></View>
                <TouchableOpacity onPress={()=>this.toFeedback()}>
                    <View style={styles.list2}>
                        <Text style={styles.textleft} >信息反馈</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.spaceling2}></View>
                <TouchableOpacity onPress={()=>this.toAbout()}>
                    <View style={styles.list2}>
                        <Text style={styles.textleft} >关于我们</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.spaceling}></View>

                <TouchableOpacity onPress={()=>this.toFind()}>
                    <View style={styles.list2}>
                        <Text style={styles.textleft} >修改密码</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.spaceling}></View>
                <TouchableOpacity onPress={()=>this.exit()}>
                    <View style={styles.list3}>
                        <Text style={styles.textcenter} >退出登录</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    toFind=()=>{
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                component: Find,
                gestures: Navigator.SceneConfigs.PushFromRight.gestures,
                params:{

                }
            })
        }
    }

     toAbout=()=>{
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                component: About,
                gestures: Navigator.SceneConfigs.PushFromRight.gestures,
                params:{

                }
            })
        }
    }

    toFeedback=()=>{
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                component: Feedback,
                gestures: Navigator.SceneConfigs.PushFromRight.gestures,
                params:{
                    phone:this.props.phone
                }
            })
        }
    }

    exit=()=>{
        Alert.alert(
            '提示',
            '你确定要退出登录?您的部分答题信息将消除',
            [
                {text: '取消', onPress: () => {}},
                {text: '确定退出', onPress: () =>this.toLogin()},
            ],
            { cancelable: false }
            )
    }

    toLogin=()=>{
        const { navigator } = this.props;
        if(navigator) {
            navigator.replace({
                component: Login,
                params:{

                }
            })
        }
        AsyncStorage.clear();

    }
}

const styles = StyleSheet.create({
    navBarStyle:{ // 导航条样式
        height: 44,
        backgroundColor:'#1E90FF',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    list1:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white',
        paddingLeft:10,
        paddingRight:10,
        height:44,
    },
    list2:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor:'white',
        paddingLeft:10,
        paddingRight:10,
        height:44,
    },
    list3:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FF0000',
        marginLeft:10,
        marginRight:10,
        borderRadius:10,
        height:44,
    },
    
    spaceling:{
        height:20,
    },
    spaceling2:{
        height:1,
    },
    textleft:{
        color:'black',
    },
    textcenter:{
        color:'white',
    },
})
module.exports = Home;