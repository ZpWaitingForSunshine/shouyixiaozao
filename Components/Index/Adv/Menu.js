import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
  Navigator,
  IntentAndroid,
} from 'react-native';

var {width,height} = Dimensions.get('window');//获取当前的高度和宽度

import Collect from './../Collect/Collect'
import Wrong from './../Wrong/Wrong'
import ExamOnline from './../ExamOnline/Web'
// import Web from './../Web.js'
// var Main = require('./Components/Main/Main');
export default class Menu extends Component {
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
            <View style ={styles.container}>
                <TouchableOpacity onPress={()=>this.toExamOnlie()}>
                    <View style= {styles.page}>
                        <Image style={styles.imgDao} source = {require('./../img/daohang/1156897.png')}/>
                        <Text style={styles.textS}>模考</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.toWrong()}>
                    <View style= {styles.page}> 
                        <Image style={styles.imgDao} source = {require('./../img/daohang/1156886.png')}/>
                        <Text style={styles.textS}>错题</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.toCollect()}>
                    <View style= {styles.page}>
                        <Image style={styles.imgDao} source = {require('./../img/daohang/1156909.png')}/>
                        <Text style={styles.textS}>收藏</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this._toWeixin()}}>
                    <View style= {styles.page}>
                        <Image style={styles.imgDao} source = {require('./../img/daohang/1156906.png')}/>
                        <Text style={styles.textS}>购买</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    //去微店
    _toWeixin = () => {
        var url = "https://weidian.com/item.html?itemID=2041101741&wfr=c&ifr=itemdetail"
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        })
        .catch(err => console.error('An error occurred', err));
    }

    // 去收藏
    toCollect = ()=>{
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: '题目',
                // component: ExerciseNow,
                component:Collect,
                gestures: Navigator.SceneConfigs.PushFromRight.gestures,
                params:{
                    phone:this.state.phone,
                }
            })
        }
    }

    // 去收藏
    toExamOnlie = ()=>{
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: '题目',
                // component: ExerciseNow,
                component:ExamOnline,
                gestures: Navigator.SceneConfigs.PushFromRight.gestures,
                params:{
                    phone:this.state.phone,
                    url:'http://api.wevet.cn/Api/exam'
                    // url: 'http://www.jd.com'
                }
            })
        }
    }
    // 去错题
    toWrong = () => {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: '题目',
                // component: ExerciseNow,
                component:Wrong,
                gestures: Navigator.SceneConfigs.PushFromRight.gestures,
                params:{
                    phone:this.state.phone,
                }
            })
        }
    }

    // 去错题
    toExam =()=>{
        // const { navigator } = this.props;
        // if(navigator) {
        //     navigator.push({
        //         name: '题目',
        //         // component: ExerciseNow,
        //         component:Web,
        //         gestures: null,
        //         params:{
        //              url: 'https://www.jd.com',//网页url
        //         }
        //     })
        // }
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent:'space-around',
        flexDirection:'row',
        marginTop: 6,
        marginBottom: 3,
    },
    page: {  
        width: width / 7,
        alignItems:'center',
    },
    imgDao:{
        width:width/7,
        height:width/7,
        borderRadius:width/14,

    },
    textS:{
        marginTop: 3,
        fontSize:12,
        color:"#bfbfbf"
    }
});
module.exports = Menu;