import React, { Component } from 'react';
import {  
  AppRegistry,
  PanResponder,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  Navigator,
  Modal,
  ActivityIndicator,
  Dimensions,
  Image,
  AsyncStorage,
} from 'react-native';
var url="http://api.wevet.cn/Api/Register/";
var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
import Login from './Login.js';
import Main from "../Main/Main.js";

export default class Launch extends Component {
    constructor(props) {  
        super(props);
        this.state = {
            img:'0',
            touch:'0',
            modalVisible:true,
            animating:true,
        };
    }

    componentDidMount(){
        let formData = new FormData();
        formData.append("action","getInitImage");
        // 定时: 隔2s切换到Main
        fetch(
            url,
            {
                method:'POST',
                headers:{
                },  
                body:formData,
            })  
            .then((response) => response.json())
            .then((responseData)=>{
                if(responseData.code == '99999'&&responseData.data.data){
                    imgUrl = responseData.data.data;
                    this.setState({
                        img:imgUrl,
                        touch:'1',
                    })
                    
                }
                else{
                    this.checkLogin();
                }
            })
            .catch((error)=>{
                this.checkLogin();
            });

        this.timer2 = setTimeout(()=>{
            //显示广告，直接点击可以调到登录
            this.checkLogin();
        },3000);
    }
    componentWillUnmount() {
        clearTimeout(this.timer2);
    }

    render(){
        return (
            <View style={{flex:1,backgroundColor:'#123456'}}>
                {/*遮罩*/}
                <Modal
                    animationType={"none"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {}}
                    >
                    {/*指示器*/}
                    <ActivityIndicator
                        animating={this.state.animating}
                        style={{height: height}}
                        size="large"
                    />
                </Modal>
                <TouchableWithoutFeedback onPress={()=>this.checkLogin()}>
                    <View style={{flex:1,backgroundColor:'white'}}>
                        {this.renderInitImage()}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    //  渲染初始广告图
    renderInitImage = () => {
        if(this.state.img == '0')
            return (<View></View>)
        else{
            return (<Image
                onLoadEnd = {()=>{this._setModalVisible(!this.state.modalVisible)}}
                style = {{height:height,width:width}}
                resizeMode = {'cover'}
                source={{uri:this.state.img}}
                />)
        }
    }

    // 改变modal状态
    _setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }


    // 检查token和phone记录
    checkLogin = () => {
        AsyncStorage.multiGet(['token','phone']).then(
            (result)=> {
                if (result == null) {
                    this.toLogin();
                }else{
                    token = result[0][1];
                    phone = result[1][1];
                    if(token && phone){
                        // this.__toIndex();
                        this.toMain(phone);
                        // this.toLogin();
                    }else{
                        // 去登录界面
                        this.toLogin();
                    }
                }
            }
        ).catch((error)=> {  //读取操作失败
                //没有网络就直接调到登录界面
                console.log('检查是否有token和phone失败:' + error.message);
        })
    }

    // 去登录界面
    toLogin = () => {
        const { navigator } = this.props;
        if(navigator) {
            navigator.replace({  
                name: 'Login',
                component: Login,
                params:{
                    
                }
            })
        }
    }
    // 去主页
    toMain = (phone) => {
        const { navigator } = this.props;
        if(navigator) {
            navigator.replace({  
                name: 'Register',
                component: Main,
                params:{
                    phone: phone,
                }
            })
        }
    }
}

module.exports =Launch;


