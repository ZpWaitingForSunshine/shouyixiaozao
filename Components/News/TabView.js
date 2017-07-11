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
    Image,
    TouchableOpacity,
    Platform,
    AsyncStorage,
    ProgressViewIOS,
    ProgressBarAndroid,
    BackAndroid,
    ToastAndroid,
    ScrollView,
    WebView
} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');


var TabView = React.createClass({

    getInitialState(){
        return{
            id : this.props.id,
            time:this.props.time, 
            bbb : false,
            aaa : ""
        }
    },

    componentWillMount(){
        {this.getpicListAsync()};
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    },


    componentWillUnmount() {

             BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);

    },

    onBackAndroid  ()  {

               if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {

               //最近2秒内按过back键，可以退出应用。

              return false;

            }

    this.lastBackPressed = Date.now();

    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);

    return true;

    },

    changeTime(time){
        var d = new Date();
        d.setTime(time * 1000);
        return (d.getFullYear()) + "-" + 
           (d.getMonth() + 1) + "-" +
           (d.getDate()) + " " + 
           (d.getHours()) + ":" + 
           (d.getMinutes()) + ":" + 
           (d.getSeconds());
        r

    },


     getpicListAsync() {
      var params = "action=getContent&accesstoken=hh&id="+this.state.id+"&time="+this.state.time;
     fetch('http://api.wevet.cn/index.php/Home/ApiArticle', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
     },
     body: params 
     }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          aaa : responseJson.data.content,
          bbb : true,
        })
      })
      .catch((error) => {
        console.error(error);
      }) 
  },

  isShow(a){
    if(a){
      return(
        <View style={{borderBottomWidth:0,flex:1}}>

            <WebView
                  style={{
                    backgroundColor: "white",
                    height: height-180,
                  }}
                  source={{html: this.state.aaa}}
                  scalesPageToFit={true}
                />
          
        </View>       
        )
    }else{
      if(Platform.OS == 'ios'){
        return(
        <View style={styles.proback}>
            <ProgressViewIOS style={styles.progressView} 
                              progressTintColor="#00A3E8"
                              progress={this.getNum()}/>
        </View>
        )
      }else if(Platform.OS == 'android'){
        return(
        <View style={styles.proback}>
            <ProgressBarAndroid color='black' styleAttr='Inverse' style={{marginTop:10}} />
        </View>
        )
      }else{

      };
    }
  },


    

    render() {
        return (
            <View style={styles.container}>
                {/*导航条*/}
                {this.renderNavBar()}

                <View>
                    <Text style={{marginLeft:8,marginTop:7,fontSize:25,color:'black'}}>{this.props.title}</Text>
                </View>

                <View style={styles.containershowb}>
                    <Text style={{marginLeft:8,fontSize:10}}>作者</Text>
                    <Text style={{marginLeft:4,fontSize:10}}>{this.props.author}</Text>
                    <Text style={{marginLeft:8,fontSize:10}}>时间</Text>
                    <Text style={{marginLeft:4,fontSize:10}}>{this.changeTime(this.props.time)}</Text>
                </View>

                <View style={{justifyContent:'center',alignItems:'center'}}>
                <View style={{backgroundColor:"#F5F5F5",marginTop:5,height:2,width:0.95*width}}/>
                </View>
                {this.isShow(this.state.bbb)}
            </View>

        );
    },

    // 导航条
    renderNavBar(){
        return(
            <View style={styles.navOutViewStyle}>
                <TouchableOpacity onPress={()=>{this.popTopHome()}} style={styles.leftViewStyle}>
                    <Image source={require('./images/back.png')} style={styles.navImageStyle}/>
                </TouchableOpacity>
                <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}></Text>
            </View>
        )
    },


    popTopHome(){
        
        this.props.navigator.pop();
    },

    
});


const styles = StyleSheet.create({

    navImageStyle:{
        width:Platform.OS == 'ios' ? 28: 24,
        height:Platform.OS == 'ios' ? 28: 24,
    },

    rightViewStyle:{
        // 绝对定位
        position:'absolute',
        right:10,
        bottom:Platform.OS == 'ios' ? 15:13
    },

    navOutViewStyle:{
        height: Platform.OS == 'ios' ? 64 : 44,
        backgroundColor:'#1E90FF',

        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center',
        // 主轴方向居中
        justifyContent:'center'
    },

    containershowb:{
        height:Platform.OS == 'ios' ? 40: 30,
        backgroundColor:'white',
        borderBottomColor:'#dddddd',
        borderBottomWidth:0,

        flexDirection:'row',
        // 主轴的对齐方式
        //justifyContent:'space-between',
        // 垂直居中
        alignItems:'center',
        
    },
    containershowc:{
        height:Platform.OS == 'ios' ? 40: 30,
        backgroundColor:'white',
        borderBottomColor:'#dddddd',
        borderBottomWidth:0,

        flexDirection:'row',
        justifyContent:'space-between',
        // 主轴的对齐方式
        //justifyContent:'space-between',
        // 垂直居中
        alignItems:'center',
        
    },

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    leftViewStyle:{
        // 绝对定位
        position:'absolute',
        left:10,
        flexDirection:'row',

        bottom:Platform.OS == 'ios' ? 10:10
    },
    quit:{
        height:Platform.OS == 'ios' ? 40: 40,
        backgroundColor:'white',
        borderBottomColor:'#dddddd',
        borderBottomWidth:0.5,
        // 垂直居中
        alignItems:'center',
        justifyContent:'center'
    }
});

// 输出组件类
module.exports = TabView;
