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
    Alert,
    TouchableOpacity,
    Platform,
    Switch,
    ScrollView
} from 'react-native';

var Dimensions = require('Dimensions');
var {width,height} = Dimensions.get('window');

export default class AnswerCell extends Component{
     constructor(props) {  
        super(props);
        this.state = {
            answera : "",
            answerb : "",
            answerc : "",
            answerd : "",
            answere : "",
            answertrue : "",
            analyze: "",
            username: "",
            typeid: 0,
            setoff: "",
            id: "",
            isRender: false,
            isOn:false,
            sourcea : require('./img/aregular.png'),
            sourceb : require('./img/bregular.png'),
            sourcec : require('./img/cregular.png'),
            sourced : require('./img/dregular.png'),
            sourcee : require('./img/eregular.png'),
        };
    }

    addDelete=()=>{
        // var parmas = "action=wrong&accesstoken=hh&phone="+this.props.username+"&tx_id="+this.props.id+"&tx_type="+this.props.typeid+"&tx_offset="+this.props.setoff+"&num=200";
        // fetch('http://api.wevet.cn/index.php/Home/ApiExercise', {
        // method: 'POST',
        // headers: {
        //    'Content-Type': 'application/x-www-form-urlencoded',
        // },
        // body: parmas
        // }).then((response) => response.json())
        //   .then((responseJson) => {
        // })
        // .catch((error) => {
        //     console.error(error);
        // }) 

    }
    boolAnswer(data){
      this.setState({isOn : true });
      if (data == this.props.answertrue) {
          switch(data)
          {
            case "A":
              this.setState({sourcea : require('./img/aright.png')});
              break;
            case "B":
              this.setState({sourceb : require('./img/bright.png')});
              break;
            case "C":
              this.setState({sourcec : require('./img/cright.png')});
              break;
            case "D":
              this.setState({sourced : require('./img/dright.png')});
              break;
            case "E":
              this.setState({sourcee : require('./img/eright.png')});
              break;
            default:
              break;
          }
      }else{
        {this.addDelete()};
        switch(data)
          {
            case "A":
              this.setState({sourcea : require('./img/aerror.png')});
              break;
            case "B":
              this.setState({sourceb : require('./img/berror.png')});
              break;
            case "C":
              this.setState({sourcec : require('./img/cerror.png')});
              break;
            case "D":
              this.setState({sourced : require('./img/derror.png')});
              break;
            case "E":
              this.setState({sourcee : require('./img/eerror.png')});
              break;
            default:
              break;
          };
          switch(this.props.answertrue)
          {
            case "A":
              this.setState({sourcea : require('./img/aright.png')});
              break;
            case "B":
              this.setState({sourceb : require('./img/bright.png')});
              break;
            case "C":
              this.setState({sourcec : require('./img/cright.png')});
              break;
            case "D":
              this.setState({sourced : require('./img/dright.png')});
              break;
            case "E":
              this.setState({sourcee : require('./img/eright.png')});
              break;
            default:
              break;
          }
      };
    }

    getAnalyze=()=>{
      if(this.state.isOn == true){
        return(
          <View style={styles.question}>
                <Text style={{fontSize:15}}
                        numberOfLines={20}>
                    {"解析：\n"+this.props.analyze}
                </Text>
          </View>
        )
      }
    }

    render() {
        return (
          <View style={{borderBottomWidth:0}}>
            <TouchableOpacity onPress={(data)=>{this.boolAnswer("A")}}>
              <View style={styles.container}>
                  {/*左边*/}
                  <Image source={this.state.sourcea} style={styles.ImageStyle}/>
                  <Text style={{marginLeft:15,fontSize:16,width:width-60}}>
                      {this.props.answera}
                  </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={(data)=>{this.boolAnswer("B")}}>
              <View style={styles.container}>
                  {/*左边*/}
                  <Image source={this.state.sourceb} style={styles.ImageStyle}/>
                  <Text style={{marginLeft:15,fontSize:16,width:width-60}}>
                      {this.props.answerb}
                  </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={(data)=>{this.boolAnswer("C")}}>
              <View style={styles.container}>
                  {/*左边*/}
                  <Image source={this.state.sourcec} style={styles.ImageStyle}/>
                  <Text style={{marginLeft:15,fontSize:16,width:width-60}}>
                      {this.props.answerc}
                  </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={(data)=>{this.boolAnswer("D")}}>
              <View style={styles.container}>
                  {/*左边*/}
                  <Image source={this.state.sourced} style={styles.ImageStyle}/>
                  <Text style={{marginLeft:15,fontSize:16,width:width-60}}>
                      {this.props.answerd}
                  </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={(data)=>{this.boolAnswer("E")}}>
              <View style={styles.container}>
                  {/*左边*/}
                  <Image source={this.state.sourcee} style={styles.ImageStyle}/>
                  <Text style={{marginLeft:15,fontSize:16,width:width-60}}>
                      {this.props.answere}
                  </Text>
              </View>
            </TouchableOpacity>
            {this.getAnalyze()}
          </View>
        );
    }

    // cell右边显示的内容
    renderRightView=()=>{
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
    }

    // cell右边显示的内容
    renderPreNum=()=>{
      // 判断
      return(
        <View style={{flexDirection:'row', alignItems:'center'}}>
            {this.rightTitle()}
        </View>
      )
    }

    rightTitle=()=>{
        if(this.props.prenum.length > 0){
            return(
                <Text style={{color:'blue', marginRight:3}}>{this.props.prenum}</Text>
            )
        }
    }
    // 点击了cell
    clickCell=(data)=>{
        // 判断处理
       if (this.props.callBackClickCell == null) return;
       // 执行回调函数
       this.props.callBackClickCell(data);
    }
}


const styles = StyleSheet.create({
    container:{
        height:Platform.OS == 'ios' ? 50: 50,
        backgroundColor:'white',
        borderBottomColor:'#dddddd',
        borderBottomWidth:1,

        flexDirection:'row',
        // 主轴的对齐方式
        //justifyContent:'space-between',
        // 垂直居中
        alignItems:'center'
    },
    ImageStyle:{
        width:Platform.OS == 'ios' ? 30: 30,
        height:Platform.OS == 'ios' ? 30: 30,
        marginLeft:10
    },
    question:{
        backgroundColor:'white'
    }
});

// 输出组件类
module.exports = AnswerCell;
