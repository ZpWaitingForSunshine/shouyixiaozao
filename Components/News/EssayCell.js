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
    ProgressViewIOS,
    ProgressBarAndroid,
    Switch
} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var TabView = require('./TabView');

var EssayCell = React.createClass({

    getDefaultProps(){
       return{
           title: '',  // 标题
           img: '',
           author: '',
           time: '',
           readnum: '',
           sort: '',
           isTop: '',
           // 回调函数
           callBackClickCell: null
       }
    },

    getInitialState(){
      return{
          isOn:false
      }
    },

    goTabView(){

      this.props.navigator.push(
           {
              component: TabView, // 要跳转的版块
              passProps :{
                  title:this.props.title, 
                  time:this.props.time, 
                  author:this.props.author, 
                  id:this.props.id, 
              }          
            }
       );

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

    isShowZD(){
      if(this.props.isTop == '1'){
        return require('./images/zhiding.png');
      }
    },


    render() {
        return (
          <View style={{borderBottomWidth:0}}>
          <TouchableOpacity onPress={this.goTabView.bind(this)}>
            <View style={styles.container}>

                {/*右边*/}
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image source={{uri: this.props.img}} style={{width:50, height:50, marginLeft:5,marginRight:10}}/>
                </View>
                {/*左边*/}
                <View>
                    <View style={{width:width*0.8}}>
                        <Text style={{marginLeft:8,marginTop:7,fontSize:13,color:'black'}}>{this.props.title}</Text>
                    </View>
                    <View style={styles.containershowa}>
                        <View style={styles.containershowb}>
                        <Text style={{marginLeft:8,fontSize:10}}>{this.props.author}</Text>
                        <Text style={{marginLeft:8,fontSize:10}}>{this.changeTime(this.props.time)}</Text>
                        </View>
                        <View style={styles.containershowc}>
                        <Image style={{width:21, height:10,marginLeft:8}} source={this.isShowZD()}/>
                        <Image style={{width:10, height:10,marginLeft:8}} source={require('./images/readnum.png')}/>
                        <Text style={{marginLeft:4,fontSize:10}}>{this.props.readnum}</Text>
                        <Image 
                            source={require('./images/type.png')} style={{width:60, height:20, marginLeft:8}}>
                            <Text style={{marginLeft:10,marginTop:3,fontSize:10,color:'white'}}>{this.props.sort}</Text>
                        </Image>
                        </View>

                    </View>
                </View>
            </View>
            </TouchableOpacity>
          </View>
        );
    },

    renderProgress(){
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
            <ProgressBarAndroid style={styles.progressView} 
                                color="#00A3E8"
                                progress={this.getNum()}
                                styleAttr='Horizontal'
                                indeterminate={false}/>
        </View>
        )
      }else{

      };

    },

    // cell右边显示的内容
    renderRightView(){
      // 判断
       if (this.props.isSwitch){ // true
           return(
              <Switch value={this.state.isOn == true} onValueChange={()=>{this.setState({isOn: !this.state.isOn})}} style={{marginRight:8}} />
           )
       }else{
           return(
             <View style={{flexDirection:'row', alignItems:'center'}}>
               <Image source={{uri: 'icon_cell_rightArrow'}} style={{width:8, height:13, marginRight:8}}/>
             </View>
           )
       }
    },

    // cell右边显示的内容
    renderPreNum(){
      // 判断
      return(
        <View style={{flexDirection:'row', alignItems:'center'}}>
            {this.rightTitle()}
        </View>
      )
    },

    rightTitle(){
        if(this.props.prenum.length > 0){
            return(
                <Text style={{color:'#D1D1D1', marginRight:3}}>{this.props.prenum}</Text>
            )
        }
    },

    // 点击了cell
    clickCell(data){
        // 判断处理
       if (this.props.callBackClickCell == null) return;
       // 执行回调函数
       this.props.callBackClickCell(data);
    }
});


const styles = StyleSheet.create({
    container:{
        height:Platform.OS == 'ios' ? 80: 60,
        backgroundColor:'white',
        borderBottomColor:'#dddddd',
        borderBottomWidth:0,

        flexDirection:'row',
        // 主轴的对齐方式
        
        // 垂直居中
        alignItems:'center'
    },
    containershowa:{
        height:Platform.OS == 'ios' ? 40: 30,
        width:width-58,
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
    containershowb:{
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
    progressView: {
    marginRight: 10,
    marginLeft: 26
    },
    proback: {
    width:width*0.6
    }
});

// 输出组件类
module.exports = EssayCell;
