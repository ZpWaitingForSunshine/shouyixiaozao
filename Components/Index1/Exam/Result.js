import React, { Component } from 'react';
import {  
  AppRegistry,
  PanResponder,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Navigator,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
import Realm from 'realm'
import ExamDeteil from './ExamDetail'

class Exam {}
Exam.schema = {
    name: 'Exam',
    primaryKey: 'id',
    properties: {
        id: 'int',
        tureid:{type: 'int', default: ''},//备注，用json表示用户对应的解析
        answer1: {type: 'string', default: '1'},//添加默认值的写法
        answer2:{type:'string',default:'2'}
    }
};


export default class Result extends Component {
    constructor(props) {  
        super(props);
        this.state = {
           score:0,
           idtree:this.props.idtree,
           timeleft:this.props.timeleft,
        };
    }
    componentDidMount(){
        let realm = new Realm({path:"ex5.realm",schema: [Exam]});
        let exam = realm.objects('Exam');
        var score = 0;

        // 计算分数
        for(var i = 0; i< 100;i++){
            let result= exam.filtered('id=='+(this.state.idtree[i]));
            if(result[0]){
                if(result[0].answer1 == result[0].answer2) score++
            }
        }
        this.setState({
            score:score
        })
        realm.close()
    }
    render(){
      return (
        <View style={styles.container}>
              {this.renderNavBar()}
              <Text style = {{margin:10,color:"#afafaf"}}>本次测试分数(截图分享到朋友圈吧)</Text>
              <View style={styles.chji}>
                    <Text style={{fontSize:128,color:'#1E90FF'}}>{this.state.score}</Text>
                    <Text style={{paddingTop:80,color:'#bfbfbf'}}>/100</Text>
              </View> 
              <Text style={{alignSelf:'center'}}>总共用时:{Math.floor(this.state.timeleft/60)}分{this.state.timeleft%60<10?'0'+this.state.timeleft%60:this.state.timeleft%60}秒</Text>
              <View style={[styles.chji,{marginTop:40}]}>
                    <Text style={{color:'#bfbfbf'}}>关注我们（微信公众号):兽医小灶</Text>
              </View>
              <Image source={require('./../img/code.png')}  style={{alignSelf:'center',height:height/4,width:height/4,marginTop:20}}></Image>
        </View>
      )
    }

    // 标题行
    renderNavBar=()=>{
        return(
            <View style={styles.navOutViewStyle}>
                <TouchableOpacity style={styles.leftViewStyle} onPress={()=>this._back()}>
                    {/*返回键*/}
                    <Image source={require('./../img/back.png')} style={styles.navImageStyle}/>
                </TouchableOpacity>
                <View style={styles.secmenu}>
                    <View style={styles.drop2}>
                        <TouchableOpacity onPress={()=>this._toResultDetail()}>
                           <Text style={{color:'#ffffff',fontSize:16}}>查看详情</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    // back to top
    _back=()=>{
        const { navigator } = this.props;
        if(navigator) {
            navigator.popToTop();
        }
    }

    _toResultDetail=()=>{
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: '题目',
                // component: ExerciseNow,
                component:ExamDeteil,
                gestures: null,
                params:{
                    idtree:this.state.idtree
                }
            })
        }
    }
}
const styles = StyleSheet.create({
    container: {
       backgroundColor:'white',
    },
    chji:{
         // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center',
        justifyContent:"center"
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    navOutViewStyle:{
        height: Platform.OS == 'ios' ? 64 : 44,
        backgroundColor:'#1E90FF',

        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center'
    },
    secmenu:{
        // 绝对定位
        flexDirection:'row',
        position:'absolute',
        right:1,
        bottom:Platform.OS == 'ios' ? 10:10
    },
    navImageStyle:{
        width:Platform.OS == 'ios' ? 28: 24,
        height:Platform.OS == 'ios' ? 28: 24,
    },
    navImageStyle1:{
        width:Platform.OS == 'ios' ? 28: 24,
        height:Platform.OS == 'ios' ? 28: 24,
    },
    drop:{
        width:Platform.OS == 'ios' ? 30: 30,
        height:Platform.OS == 'ios' ? 28: 24,
        marginRight:10,
    },
    drop2:{
        width:Platform.OS == 'ios' ? 80: 80,
        height:Platform.OS == 'ios' ? 28: 24,
        marginRight:10,
        justifyContent:'center',
    },
    drop1:{
        width:Platform.OS == 'ios' ? 70: 70,
        height:Platform.OS == 'ios' ? 28: 24,
        marginRight:10,
        justifyContent:'center',
    },
    leftViewStyle:{
        // 绝对定位
        position:'absolute',
        left:10,
        flexDirection:'row',

        bottom:Platform.OS == 'ios' ? 10:10
    },
    settingStyle:{
        // 设置主轴的方向
        flexDirection:'row',
        width:width,
        justifyContent:'space-between'
    },
    centering:{
        top:100,
    },
});
module.exports = Result;
