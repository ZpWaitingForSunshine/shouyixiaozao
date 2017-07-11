import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  TextInput,

} from 'react-native';


import Dimensions from 'Dimensions'
var {width,height} = Dimensions.get('window');
import Main from '../../Components/Main/Main';
import NetWorkTool from '../Common/network'
import toastShort from '../Common/toast'
import token from '../Common/token'
import DeviceInfo from 'react-native-device-info';
import Register from './Register'
import Find from './Find'

var url="http://api.wevet.cn/Api/Login/";
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone:"",
            password: "",
        };
    }
    render() {
        return (
            <View style = { styles.container }>
                <Image source = {require('./Image/init.jpg')} style = { styles.IconStyle}/>
                <View style={{width:width*0.9}}>
                    <TextInput placeholder={'请输入手机号'} 
                                style={styles.textInputStyle} 
                                keyboardType="numeric"
                                underlineColorAndroid= 'transparent' 
                                onChangeText={(text) => {this.setState({phone : text});}}/>
                    <TextInput placeholder={'请输入密码'} 
                                secureTextEntry={true} 
                                password={true} 
                                style={styles.textInputStyle} 
                                onChangeText={(text) => {this.setState({password : text});}}/>
                </View>
                 {/*登录*/}
                <TouchableOpacity onPress={()=> this.__login()}>
                    <View style={styles.loginBtnStyle}>
                        <Text style={{color:'white'}}>登录</Text>
                    </View>
                </TouchableOpacity>
                {/*其他 */}
                <View style={styles.settingStyle}>
                    <TouchableOpacity style= {{height:80}} onPress={()=>this.__Register()}>
                        <Text>注册</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress = {() => this.__Find()}>  
                    <Text>找回密码</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    __login(){//单纯的登录，改变一下这个登录的id
        let formData = new FormData();
        formData.append("action","login");
        formData.append("mobiledevice_last",DeviceInfo.getUniqueID());
        formData.append("phone",this.state.phone);
        formData.append("password",this.state.password);
        fetch(url,{
                method:'POST',
                headers:{
            },
                body:formData,
            })  
            .then((response) => response.json())
            .then((responseData)=>{
                console.log(responseData);
                if(responseData.code == '99999'){
                    // 如果成功登录成功
                    AsyncStorage.multiSet([['phone',this.state.phone],["token",DeviceInfo.getUniqueID()]]).then(
                        ()=>{   //成功的操作
                            console.log("age保存成功!");
                            toastShort.toastShort("登录成功");
                            this.__toMain();
                        },
                    );
                }
                else{
                    //登录失败
                    console.log("登录失败,token是"+DeviceInfo.getUniqueID());
                    toastShort.toastShort("账号获取密码错误，本次token是");
                }
            })  
            .catch((error)=>{
                console.log(error.message);
                toastShort.toastShort("系统错误");
            });
    }
    __toMain(){
        const { navigator } = this.props;
        if(navigator) {
            console.log("hell0");
            navigator.replace({
                name:"hello",
                component: Main,
                params:{
                    phone:"18305183026",
                    token:"sf"
                }
            })
        }
    }

    __Register(){
        const { navigator } = this.props;
        if(navigator) {
            console.log("hell0");
            navigator.push({
                component: Register,
                params:{

                }
            })
        }
    }
    __Find(){
        const { navigator } = this.props;
        if(navigator) {
            console.log("hell0");
            navigator.push({
                component: Find,
                params:{

                }
            })
        }
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#dddddd',
        alignItems:'center',
    },
    IconStyle:{
        marginTop:50,
        marginBottom:30,
        width:80,
        height:80,
        borderRadius:40,
        borderWidth:2,
        borderColor:'white',
    },
    textInputStyle:{
        height:45,
        width:width*0.9,
        backgroundColor:'white',
        marginBottom:2,
        // 内容居中
        textAlign:'center'
    },

    loginBtnStyle:{
        height:45,
        width:width*0.9,
        backgroundColor:'#1E90FF',
        marginTop:30,
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 4
    },
    settingStyle:{
        // 设置主轴的方向
        flexDirection:'row',
        // backgroundColor:'red',

        // 主轴的对齐方式
        width:width*0.9,
        justifyContent:'space-between',
        height:80
    },

    otherLoginStyle:{
        // backgroundColor:'red',

        // 设置主轴的方向
        flexDirection:'row',

        // 设置侧轴的对齐方式
        alignItems:'center',
        // 绝对定位
        position:'absolute',
        bottom:10,
        left:20,
        height:80
    },

    otherImageStyle:{
        width:50,
        height:50,
        borderRadius:25,
        marginLeft:8
    }

})
module.exports = Login;