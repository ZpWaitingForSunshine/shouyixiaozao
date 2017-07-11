import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  EditView,
  TouchableOpacity,
  Dimensions,
  ProgressViewIOS,
  Platform,
  Navigator,
  Modal,
  ActivityIndicator,
  AsyncStorage,
  Alert,
} from 'react-native';

var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
import Exam1 from './Exam';
import Realm from "realm"
import Result from './Result'

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
export default class ECell extends Component {
    constructor(props) {  
        super(props);
        var arr = []
        for(var i = 0;i<100;i++)
            arr.push(17*i+2*this.props.id);
        this.state = {
           type:this.props.id,// 这个是类别，第几套题目
           idtree:arr,
           toResult:false,
        };
    }
    componentDidMount(){
        let realm = new Realm({path:"ex7.realm",schema:[Exam]});
        let exam = realm.objects('Exam');
        for(var i =0 ;i<exam.length;i++){
            if((exam[i].id)%17 == this.state.type*2){
                this.setState({
                    toResult:true,
                })
                break;
            }
        }
        realm.close()
    }
    render() {
        return (
            <TouchableOpacity onPress ={()=>this._press()}>
                <View style={styles.container}>
                    <View style = {styles.name}>
                        {/*科目类别*/}
                        <View style = {styles.nameTop}>
                            <Text style = {{fontSize:20,padding:0,color:'#696969'}}>{this.props.name}</Text>
                        </View>
                    </View>
                    <View style = {styles.pic}>
                        <Image style={styles.ansImg} source = {require('./../img/answer.png')}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    _press=()=>{
        if(!this.state.toResult){
            this.toExam()
        }else{
            const { navigator } = this.props;
            if(navigator) {
                navigator.push({
                    name: '题目',
                    component:Result,
                    gestures: null,
                    params:{
                        phone:this.props.phone,
                        idtree:this.state.idtree,
                        timeleft:0,
                        type: this.state.type,
                    }
                })
            }
        }
    }

    toExam =()=>{
        Alert.alert(
            '温馨提示',
            '一套试卷（100题）只有一次模拟机会，半途不可停止，请确认是否继续答题',
            [
              {text: '取消', onPress: () =>{}},
              {text: '继续考试', onPress: () => this.toRealExam()},
            ]
          )
    }
    toRealExam = ()=>{
        if(this.state.idtree.length == 0){
            Alert.alert(
            '温馨提示',
            '出题错误,很少会发生此错误',
            [
              {text: '确认', onPress: () => console.log('Cancel Pressed!')}
            ]
          )
        }else{
            //跳转到exam
            const { navigator } = this.props;
            if(navigator) {
                navigator.push({
                    name: '题目',
                    component:Exam1,
                    gestures: null,
                    params:{
                        phone:this.props.phone,
                        type: this.state.type,
                        idtree:this.state.idtree,
                    }
                })
            }
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        height:50,
        flex:1,
        // marginTop:2
    },
    name:{
        width:width * 0.8 - 36,
        marginLeft:36,
        justifyContent:'center',
    },
    pic:{
        // backgroundColor:'#123131',
        width:width * 0.2,
        flexDirection:'row',
        // 主轴的对齐方式
        justifyContent:'space-around',
        // 垂直居中
        alignItems:'center'
    },
    ansImg:{
        justifyContent:'space-around',
        width: 30,
        height:30,
    },
    nameTop:{
        //  backgroundColor:"#321",
        // height:27,
        // padding:0,
        // color:'#D1D1D1',
    },
    nameBottom:{
        // backgroundColor:"#654321",
        height:20,
        flexDirection: 'row',
    },
    progressView: {
        paddingTop:20,
        marginLeft:10,
    },
    proback: {
        width:width*0.5
    },

    centering:{
        top:height/2+10,
    },
});
module.exports = ECell;