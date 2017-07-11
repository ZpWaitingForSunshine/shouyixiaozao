import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  AsyncStorage,
} from 'react-native';

import Index from '../Index/Index';
import Login from './Login';
import Main from "../Main/Main";
import NetWorkTool from '../Common/network'
import toastShort from '../Common/toast'
import Token from '../Common/token'
var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
var url="http://api.wevet.cn/Api/Register/";
var urlLogin="http://api.wevet.cn/Api/Login/";
var imgUrl = "";

import Realm from 'realm'
let exData=require('./Json/1.json');
import DeviceInfo from 'react-native-device-info';

var phone = null;
var token = null;

export default class Launch extends Component {
    constructor(props) {  
        super(props);  
        this.state = {
            img:'1',
            touch:"0",
            phone:null,
            token:null,
        };
    }
    render() {
        return (
            <View>
                <TouchableWithoutFeedback onPress={this.state.touch=='0'?()=>{}:()=>this.__toLogin()}>
                    <Image source={this.state.img=='1'?require("./Image/init.jpg"):{uri:this.state.img}} 
                        style={{width: width, height: height}} />
                </TouchableWithoutFeedback>
            </View>
        )
        
    }

    // 复杂的操作:定时器\网络请求
    componentDidMount(){
        let formData = new FormData();
        formData.append("action","getInitImage");
        // 定时: 隔2s切换到Main
        this.timer=setTimeout(()=>{
            fetch(url,{
                method:'POST',
                headers:{  
                // 'Content-Type':'multipart/form-data', 
            },  
                body:formData,
            })  
            .then((response) => response.json())
            .then((responseData)=>{
                if(responseData.code == '99999'&&responseData.data.data){
                    imgUrl = responseData.data.data;
                    this.setState({img:imgUrl});
                    this.setState({touch:'1'});
                    
                    this.timer2 = setTimeout(()=>{//显示广告，直接点击可以调到登录
                        this.__toLogin();
                    },5000);
                }
                else{
                    console.log("获取失败");
                    this.__toLogin();
                }
            })  
            .catch((error)=>{
                console.log("error"+error.message);
                this.__toLogin();
            });
            
        }, 100);
    }
    //跳到登录界面
    __toLogin=()=>{
        AsyncStorage.multiGet(['token','phone']).then(
            (result)=> {
                if (result == null) {
                    console.log("没有找到token和phone");
                    this.__toLoginTab();
                }else{
                    token = result[0][1];
                    phone = result[1][1];
                    if(token && phone){
                        console.log("找到了token和phone，去主页");
                        this.__toIndex();
                    }else{
                        console.log("token和phone都有值，去登录页");
                        this.__toLoginTab();//去登录页面
                    }
                }
            }
        ).catch((error)=> {  //读取操作失败
                //没有网络就直接调到登录界面
                console.log('检查是否有token和phone失败:' + error.message);
        })

    }
    //跳到主界面
    __toIndex=(touch)=>{//去首页
        const { navigator } = this.props;
            if(navigator) {
                navigator.replace({
                    name: 'SecondPageComponent',
                    component: Main,
                    params:{
                        id:"l",
                        phone: phone,
                        token: token
                    }
            })
        }
    }

    __toLoginTab=(touch)=>{//去登录页面
        if(touch!='0'){
            const { navigator } = this.props;
                if(navigator) {
                    navigator.replace({  
                        name: 'SecondPageComponent',
                        component: Login,
                        params:{
                            
                        }
                })
            }
        }
    }
    componentWillUnmount() {
        clearTimeout(this.timer);
        clearTimeout(this.timer2);
        // AsyncStorage.clear();
    }
}
module.exports = Launch;