import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Navigator,
  ActivityIndicator,
  AsyncStorage,
  Modal,
} from 'react-native';

var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
import * as Progress from 'react-native-progress';
import Update from './../../Common/updateExTree'
import AnswerView from './../Answer/AnswerView.js'
import Cell from './../../Index1/Exercise/Cell.js'
export default class QCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
           sum: this.props.sum,
           now: this.props.now,
           id:this.props.id,//id
           animating: true,
           modalVisible:false,
        };
    }

    componentDidMount(){
        AsyncStorage.getItem('eNow').then(
            (result)=> {
                this.setState({
                    now:JSON.parse(result)[this.props.id]
                })
                // AsyncStorage.clear()
            }
        ).catch((error)=> {  
            console.log('errorIndex:' + error.message);
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            sum:nextProps.sum,
        });
    }

    render() {
        return (
            <TouchableOpacity onPress={()=>{this._test()}}>
                <View style={styles.container}>
                    <View style = {styles.name}>
                        {/*科目类别*/}
                        <View style = {styles.nameTop}>
                            <Text style = {{fontSize:20,padding:0,color:'#696969'}}>{this.props.name}</Text>
                        </View>
                        {/*当前体量*/}
                        <View style = {styles.nameBottom}>
                            {/*{this._renderP()}*/}
                            <View style={styles.proback}>
                                    <Progress.Bar 
                                        height = {3}
                                        borderRadius={1}
                                        color="#00A3E8"
                                        progress={this.state.now/this.state.sum} 
                                        width={width/2}/>
                            </View>
                            <Text style={{marginLeft:20,color:'#696969'}}>{this.state.now+""}/</Text>
                            <Text style={{color:'#696969'}}>{this.state.sum+""}</Text>
                        </View>
                    </View>
                    <View style = {styles.pic}>
                        <Image style={styles.ansImg} source = {require('./../img/answer.png')}/>
                    </View>
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
                </View>
            </TouchableOpacity>
        );
    }
    //点击跳转
    _test= () => {
        var idtree = 0;
        const { navigator } = this.props;
        this.setModalVisible(true)
        AsyncStorage.getItem('idtree',(error,text)=>{
            if(text == null ){
                alert('请您联网，然后重新打开App')
            }else{
                var temp = JSON.parse(text)
                idtree = JSON.stringify(temp[this.state.id+""])

                var arr = [];
                for(var i = 0; i< temp[this.state.id+""].length; i++){
                    arr.push('第'+(i+1)+"题")
                }
                // idtree = text;
                // console.log()
                if(navigator) {
                    navigator.push({
                        name: '题目',
                        component: AnswerView,
                        // gestures: Navigator.SceneConfigs.PushFromRight.gestures,
                        gestures: null,
                        params:{
                            itemArr:arr,
                            sum:this.props.sum,
                            now: this.state.now,
                            type: this.state.id,
                            name:this.props.name,
                            idtree:idtree,
                            phone:this.props.phone,
                            setNow:(now1)=>{
                                this.setState({
                                    now:now1,
                                })
                            },
                            hide:()=>{
                                this.setModalVisible(false)
                            }
                        }
                    })
                }
            }
        });
    }


    //modal显示or隐藏
    setModalVisible=(visible)=>{
        this.setState({modalVisible: visible});
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
        height:27,
        padding:0,
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
        marginTop:width/50,
        width:width*0.5
    },

    centering:{
        top:height/2+10,
    },
});
module.exports = QCell;