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
    Switch,
    Navigator,
    Dimensions,
} from 'react-native';

var {width, height} = Dimensions.get('window');

import NewsView from './NewsView'

export default class NewsCell extends Component {
    constructor(props) {  
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,  // 标题
            img: this.props.img,
            author: this.props.author,
            time: this.props.time,
            readnum: this.props.times_read,
            sort: this.props.type,
            istop: this.props.istop,
        };
        
    }

    
    goTabView=()=>{
            const {navigator } = this.props;
            if(navigator) {
                navigator.push({
                    name:"hello",
                    component: NewsView,
                    gestures: Navigator.SceneConfigs.PushFromRight.gestures,
                    params:{
                        id:this.state.id,
                        title: this.props.title,  // 标题
                        author: this.props.author,
                        time: this.props.time,
                        readnum: this.props.times_read,
                        sort: this.props.type,
                    }
                })
            }else{
                // console.log('no navigator')
                alert('no navigator' + this.props.id)
            }

    }

    changeTime=(time)=>{
        var d = new Date();
        d.setTime(time * 1000);
        return (d.getFullYear()) + "-" + 
           (d.getMonth() + 1) + "-" +
           (d.getDate()) + " " + 
           (d.getHours()) + ":" + 
           (d.getMinutes()) + ":" + 
           (d.getSeconds());

    }

    isShowZD=()=>{
        // alert(this.state.isTop)
      if(this.state.istop == '1'){
        return require('./images/zhiding.png');
      }
    }

    render() {
        // console.log(this.state.img)
        return (
            <TouchableOpacity onPress={()=>this.goTabView()}>
                <View style={styles.container}>
                    {/*右边*/}
                    <View style={{alignItems:'center',width:width/3,justifyContent:'center',marginRight:5,}}>
                        <Image source={{uri:this.state.img}} style={{width:width /3, height:width/4,resizeMode:'stretch'}}/>
                    </View>
                    {/*左边*/}
                    <View style={styles.containershowa}>
                        {/*1标题*/}
                        <View style={{width:width/3*2-15,height:44,}}>
                            <Text numberOfLines={2}
                                style={{marginLeft:8,fontSize:18,color:'black'}}>{this.state.title}</Text>
                        </View>
                        {/*2时间作者和阅读*/}
                        <View style={styles.containershowb}>
                            {/*时间作者*/}
                            <View style={styles.containershowc}>
                                <Text style={{fontSize:10,}}>{this.state.author}</Text>
                                <Text style={{fontSize:10,}}>{this.changeTime(this.state.time)}</Text>
                            </View>
                            {/*阅读*/}

                            <View style={styles.containershowd}>
                                <Image style={{height:15,width:15}} source={require('./images/readnum.png')}/>
                                <Text style={{fontSize:10,}}>{this.state.readnum}</Text>
                            </View>
                        </View>
                        {/*3*/}
                        <View style={styles.containershowe}>
                            <View style={{width:38,height:18}}>
                                <Image style={{width:38, height:18,resizeMode:'contain'}} source={this.isShowZD()}/>
                            </View>
                            <Image 
                                source={require('./images/type.png')} style={{width:60, height:20, marginLeft:8}}>
                                <Text style={{marginLeft:15,marginTop:3,fontSize:10,color:'white',}}>{this.state.sort}</Text>
                            </Image>
                        </View>
                    </View>
                    
                </View>
            </TouchableOpacity>
        );
    }

    // 点击了cell
    clickCell=(data)=>{
        //     // 判断处理
        //    if (this.props.callBackClickCell == null) return;
        //    // 执行回调函数
        //    this.props.callBackClickCell(data);
    }
}


const styles = StyleSheet.create({
    container:{
        height:width/4 + 20,
        backgroundColor:'white',
        borderBottomColor:'#dddddd',
        borderBottomWidth:0,
        flexDirection:'row',
        paddingLeft:5,
        paddingRight:5,
        paddingTop:10,
        paddingBottom:10,
    },
    containershowa:{
        width:width/3*2-15,
        height:width/4,
        justifyContent:'space-between',
    },
    containershowb:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:8,
    },
    containershowc:{
       flexDirection:'row',
       justifyContent:'space-between',
       width:(width/3*2 - 23)*0.6,
        
    },
    containershowd:{
       flexDirection:'row',
       justifyContent:'space-between',
       width:(width/3*2 - 23)*0.2+8,
       alignItems:'center',
        
    },
    containershowe:{
       flexDirection:'row',
       justifyContent:'space-between',
       width:(width/3*2 - 15 - 8),
       alignItems:'center',
       marginLeft:8,
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
module.exports = NewsCell;
