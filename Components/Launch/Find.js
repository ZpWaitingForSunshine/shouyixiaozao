import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  EditView,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  Alert,
  BackAndroid,
} from 'react-native';
urlLogin="http://api.wevet.cn/Api/Login";
var url="http://api.wevet.cn/Api/Register/";
import Dimensions from 'Dimensions'
var {width,height} = Dimensions.get('window');//高度宽度
import Login from '../Login/Login'
import Toast from '../Common/toast'

var check = null;//保存一下那个验证码
var time = 60;
var flag = true;

export default class Find extends Component {
    constructor(props) {  
        super(props);
        this.state = {
            username:null,
            password:null,
            repassword:null,
            test:null,
            testtitle:'获取验证码',
        };
        
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', ()=> {
            this.__backLogin();
            return true;
        });
    }
    componentWillUnmount() {
        clearInterval(this.interval);
        flag = true
    }

     render() {
        return (
            <View style={styles.container}>
                {/*头像*/}
                <Image source={require('./Image/144.png')} style={styles.iconStyle}/>
                {/*账号和密码*/}
                <View style={{width:width*0.9}}>
                <TextInput placeholder={'请输入手机号'} 
                        style={styles.textInputStyle}
                        keyboardType="numeric"
                        underlineColorAndroid= 'transparent' 
                        maxLength ={11}
                        onChangeText={(text) => {this.setState({username : text});}}/>
                <TextInput placeholder={'请输入新密码'}
                        secureTextEntry={true}
                        password={true}  
                        style={styles.textInputStyle}
                        maxLength ={22}
                        underlineColorAndroid= 'transparent' 
                        onChangeText={(text) => {this.setState({password : text});}}/>
                <TextInput placeholder={'确认新密码'}
                        secureTextEntry={true} 
                        password={true}
                        style={styles.textInputStyle} 
                        maxLength ={22}
                        underlineColorAndroid= 'transparent' 
                        onChangeText={(text) => {this.setState({repassword : text});}}/>
                <View style={{width:width*0.9,flexDirection:'row'}}>
                    <TextInput placeholder={'请输入验证码'}
                        style={styles.textInput}
                        onChangeText={(text) => {this.setState({test : text});}}/>
                    {/** 找回密码前的竖线 */}
                            <View style={styles.verticalLine}>
                            </View>
                    {/*获取验证码*/}
                    <TouchableOpacity 
                        onPress = {() => this.__getTest()}
                        accessible = {false}>
                        <View style={styles.TestStyle}>
                            <Text >{this.state.testtitle}</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                </View>
                
                {/*注册*/}
                <TouchableOpacity onPress = {()=>this.__register()}>
                    <View style={styles.loginBtnStyle}>
                        <Text style={{color:'white'}}>重新设置密码</Text>
                    </View>
                </TouchableOpacity>
                {/*设置*/}
                <View style={styles.settingStyle}>
                    <TouchableOpacity onPress={ ()=> this.__backLogin()}>
                        <Text>返回登录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{Alert.alert('注册失败原因',"可能:1.手机号已被注册，请点击忘记密码 2.验证码错误")}}>
                        <Text>注册不了?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    //返回登录
    __backLogin(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }
    //获取验证码
    __getTest(){
        if(!this.state.username || this.state.username.length < 11){
            Toast.toastShort("请填写正确的手机号码");
            return;
        }
        //如果手机号码填写完整了，检查是否被注册
        if(this.state.username.length == 11 && flag){
            flag = false;
            this.interval=setInterval(() => {
                            this.setState({testtitle : time--});
                            if(time < 0){
                                this.setState({testtitle : "重新发送"});
                                time = 60;
                                flag = true;
                                clearInterval(this.interval);
                            }
                        },40);

            let formData = new FormData();
            formData.append("action","messageFindSend");
            formData.append("phone",this.state.username);
            fetch(url,{
                    method:'POST',
                    headers:{
                },  
                    body:formData,
                })  
                .then((response) => response.json())
                .then((responseData)=>{
                    if(responseData.code == '99999'){
                        check = responseData.data.num;
                        console.log("验证码"+check);
                        return;
                    }
                    else{
                        Toast.toastShort(responseData.message);
                        flag = true;
                            clearInterval(this.interval);
                        return;
                    }
                })  
                .catch((error)=>{
                    Toast.toastShort("网络错误");
                    flag = true;
                    clearInterval(this.interval);
                    return;
                });
        }

    }
    //注册
    __register(){
        //密码检验
        if(this.state.password != this.state.repassword){
            Toast.toastShort("密码不一致");
            return;
        }else{
            if(!this.state.password || this.state.password.length < 6){
                Toast.toastShort("密码太短，少于6位");
                return;
            }
        }

        //如果没有注册码
        if(!this.state.test){
            Toast.toastShort("请获取验证码并填写");
            return;
        }else if(this.state.test!= check){
            Toast.toastShort("验证码不一致");
            return;
        }
        //如果手机号码没有填写完整
        if(!this.state.username || this.state.username.length < 11){
            Toast.toastShort("请填写正确的手机号码");
            return;
        }
        //如果手机号码填写完整了，检查是否被注册
        if(this.state.username.length == 11){
            let formData = new FormData();
            formData.append("action","changePassword");
            formData.append("phone",this.state.username);
            formData.append("password",this.state.password);
            console.log(formData.toString());
            fetch(url,{
                    method:'POST',
                    headers:{
                },  
                    body:formData,
                })  
                .then((response) => response.json())
                .then((responseData)=>{
                    if(responseData.code == '99999'){
                        Toast.toastShort("修改成功");
                        this.__backLogin();
                        return;
                    }
                    else{
                        Toast.toastShort(responseData.message)
                        return;
                    }
                })  
                .catch((error)=>{
                    Toast.toastShort("网络错误");
                });
        }
    }
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dddddd',
        // 设置侧轴的对齐方式
        alignItems:'center'
    },

    iconStyle:{
       marginTop:50,
       marginBottom:30,
       width:80,
       height:80,
       //borderRadius:40,
       //borderWidth:2,
       borderColor:'white'
    },

    textInputStyle:{
        height:45,
        backgroundColor:'white',
        marginBottom:1,
        // 内容居中
        textAlign:'center'
    },
    textInput:{
        height:45,
        width:width*0.65,
        backgroundColor:'white',
        marginBottom:1,
        // 内容居中
        textAlign:'center'
    },

    TestStyle:{
        height:45,
        width:width*0.25,
        backgroundColor:'white',

        justifyContent:'center',
        alignItems:'center',

    },

    verticalLine: {
        backgroundColor: '#E8E8E8',
        height: 15,
        width: 0.5
    },

    loginBtnStyle:{
        height:45,
        width:width*0.9,
        backgroundColor:'#1E90FF',
        marginTop:30,
        marginBottom:20,

        justifyContent:'center',
        alignItems:'center',

        borderRadius:8
    },

    settingStyle:{
        // 设置主轴的方向
        flexDirection:'row',
        // backgroundColor:'red',

        // 主轴的对齐方式
        width:width*0.9,
        justifyContent:'space-between'
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
        left:20
    },

    otherImageStyle:{
        width:50,
        height:50,
        borderRadius:25,
        marginLeft:8
    }
});

module.exports = Find;