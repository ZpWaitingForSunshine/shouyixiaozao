import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  AsyncStorage,
  CustomBadgeView,
  Alert,
  Platform,
  Linking,
  Modal,
  BackAndroid,
  ToastAndroid,
} from 'react-native';

urlLogin="http://api.wevet.cn/Api/Login";
import Token from '../Common/token'
import Login from '../Launch/Login'
// import Index from '../Index/Index'
import Toast from '../Common/toast'
import DeviceInfo from 'react-native-device-info';
var url="http://api.wevet.cn/Api/Login/";
import TabNavigator from 'react-native-tab-navigator';

import Home from '../Index/Index'
import Video from '../Video/Video'
import Mine from '../User/Home'//我的模块
import News from '../News/News'//发现

// var Main = require('./Components/Main/Main');
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab:'首页'
        };
        var lastBackPressed = 0
    }
    componentDidMount() {
        this._checkLogin();
        this._checkVersion();
        // BackAndroid.addEventListener('hardwareBackPress', ()=>this.onBackAndroid());

    }

    componentWillUnmount() {
    //     BackAndroid.removeEventListener('hardwareBackPress',()=> this.onBackAndroid());
    }

    onBackAndroid = () => {
    //     if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
    //            //最近2秒内按过back键，可以退出应用。
    //           return false;
    //     }
    //     this.lastBackPressed = Date.now();
    //     ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    //     return true;
    }



    render() {
        return (
             <View style={styles.container} >  
                <TabNavigator>  
                    <TabNavigator.Item  
                        selected={this.state.selectedTab === '首页'}  
                        title="首页" 
                        titleStyle={styles.tabText}  
                        selectedTitleStyle={styles.selectedTabText}  
                        renderIcon={() => <Image style={styles.icon} source={require("./img/execbf.png")} />}  
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("./img/exec.png")} />}  
                        onPress={() => this.setState({ selectedTab: '首页' })}>
                        <Home navigator={this.props.navigator} phone={this.props.phone}/>  
                    </TabNavigator.Item>  
                    <TabNavigator.Item  
                        selected={this.state.selectedTab === '直播'}  
                        title="直播"  
                        titleStyle={styles.tabText}  
                        selectedTitleStyle={styles.selectedTabText}  
                        renderIcon={() => <Image style={styles.icon} source={require("./img/viewbf.png")} />}  
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("./img/view.png")} />}  
                        onPress={() => this.setState({ selectedTab: '直播' })}>  
                        <Video navigator={this.props.navigator}/>  
                    </TabNavigator.Item>  
                    <TabNavigator.Item  
                        selected={this.state.selectedTab === '发现'}  
                        title="发现"  
                        titleStyle={styles.tabText}  
                        selectedTitleStyle={styles.selectedTabText}  
                        renderIcon={() => <Image style={styles.icon} source={require("./img/msgbf.png")} />}  
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("./img/msg.png")} />}  
                        onPress={() => this.setState({ selectedTab: '发现' })}>  
                        <News navigator={this.props.navigator}/>  
                    </TabNavigator.Item>  
                    <TabNavigator.Item  
                        selected={this.state.selectedTab === '我的'}  
                        title="我的"  
                        titleStyle={styles.tabText}  
                        selectedTitleStyle={styles.selectedTabText}  
                        renderIcon={() => <Image style={styles.icon} source={require("./img/userbf.png")} />}  
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("./img/user.png")} />}  
                        onPress={() => this.setState({ selectedTab: '我的' })}>  
                        <Mine navigator={this.props.navigator} phone={this.props.phone}/>  
                    </TabNavigator.Item>  
                </TabNavigator>  
            </View>  
        );
    }

    //记录一下登录,
    _checkLogin=()=>{

        let formData = new FormData();
        formData.append("action","loginR");
        formData.append("mobiledevice_last",DeviceInfo.getUniqueID());
        formData.append("phone",this.props.phone);
        fetch(url,{
                method:'POST',
                headers:{
            },
                body:formData,
            })  
            .then((response) => response.json())
            .then((responseData)=>{
                if(responseData.code == 99999){
                }else{
                    this.__toLogin();
                    Toast.toastShort("更换账号和设备需要重新登录");
                }
            })
            .catch((error)=>{
                Toast.toastShort("没有网络");
            });
    }

    __toLogin=(touch)=>{//去登录页面
        const { navigator } = this.props;
        if(navigator){
            navigator.push({  
                name: 'SecondPageComponent',
                component: Login,
                params:{
                    
                }
            })
        }
    }

    //检查是否需要更新
    _checkVersion=()=>{
        let formData = new FormData();
        formData.append("action","checkVersion");
        fetch(url,{
                method:'POST',
                headers:{
            },  
                body:formData,
            })  
            .then((response) => response.json())
            .then((responseData)=>{
                var updateUrl=""
                if(responseData.data.version+0 > 1){
                    if(Platform.OS == 'ios')
                        updateUrl = responseData.data.ios;
                    else
                        updateUrl = responseData.data.android;
                    console.log(responseData.data.ios)
                    Alert.alert(
                        '更新提示',
                        responseData.data.msg,
                        [
                            {text: '升级', onPress: () => Linking.openURL(updateUrl).catch((err)=>{console.log(err);})}
                            
                        ]
                    );
                }else{

                }
            })  
            .catch((error)=>{
                console.log(error.message);
            });
    }

    // 检查是否需要更新题库

    
}

let styles = StyleSheet.create({  
    container: {  
        flex: 1  
    },  
    tabText: {  
        color: "#bfbfbf",  
        fontSize: 13  
    },  
    selectedTabText: {  
        color: "#1296db",  
        fontSize: 13
    },  
    icon: {  
        width: 20,  
        height: 20  
    }  
});  

module.exports = Main;