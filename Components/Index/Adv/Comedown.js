import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  PanResponder,
} from 'react-native';

var url = "http://api.wevet.cn/Api/Main"
var {width,height} = Dimensions.get('window');//获取当前的高度和宽度

// var Main = require('./Components/Main/Main');
export default class Comedown extends Component {
    constructor(props) {  
        super(props);
        this.state = {
            lefttime:"00"
        };
    }

    componentDidMount() {
        this._getTime();
    }

    render() {
        return (  
            <View style={styles.container}>
                <Text style={styles.daojishi}>倒计时</Text>
                <View style={styles.timeshow}>
                    <View style={{marginBottom:20,}}>
                        <Text style={{color:'white', fontSize:88,fontWeight:'bold'}}> {this.state.lefttime+""} </Text>
                    </View>
                    <Text style={{color:'white', fontSize:20, position:'absolute',right:10,bottom:20 }}>天</Text>
                </View>
            </View>
        );
    }
    //统计数据，比如联系天数什么的
    _toM = ()=>{
        console.log('dada')
    }
    //获得时间
    _getTime = () => {
        //获得剩余时间
        let formData1 = new FormData();
        formData1.append("action","getExerciseTime");
        fetch(url,{
                method:'POST',
                headers:{
            },
                body:formData1,
            })  
            .then((response) => response.json())
            .then((responseData)=>{
                if(responseData.code == '99999'){
                    this.setState({lefttime: responseData.data.daysLeft});
                }else{
                }
            })
            .catch((error)=>{
        });
    }
}

const styles = StyleSheet.create({
    container: {
       backgroundColor:'#1E90FF',
       height: 161,
    },
    daojishi:{
        // backgroundColor:'#123456',
        flex:1,
        height:15,
        color:'white', 
        fontSize:15,  
        marginLeft:10, 
        marginTop:5,
    },
    timeshow: {
        // backgroundColor:'#1550F1',
        flexDirection:'row',
        // 设置主轴的对齐方式
        justifyContent:'center',
        alignItems:'center',
        padding:0
    }  
});
module.exports = Comedown;