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
  ProgressBarAndroid,
  Platform,
  Navigator,
  Modal,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
import Exercise from "./Exercise"
import Update from '../Common/updateExTree'
import ExerciseNow from './Exercise/Exercise'
import Cell from './Exercise/Cell'
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
        // AsyncStorage.getItem('eNow').then(
        //     (result)=> {
        //         this.setState({
        //             now:JSON.parse(result)[this.props.id]
        //         })
        //         console.log("43"+result)
        //     }
        // ).catch((error)=> {  
        //     console.log('errorIndex:' + error.message);
        // })
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
                            {this._renderP()}
                            <Text style={{marginLeft:20,color:'#696969'}}>{this.state.now}/</Text>
                            <Text style={{color:'#696969'}}>{this.state.sum}</Text>
                        </View>
                    </View>
                    <View style = {styles.pic}>
                        <Image style={styles.ansImg} source = {require('./img/answer.png')}/>
                    </View>
                    {/*遮罩，题目入库的时候*/}
                    <Modal
                        animationType={"none"}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {}}
                        >
                        <View style={{height:height}}>
                            <ActivityIndicator
                                animating={this.state.animating}
                                style={styles.centering}
                                size="large"
                                color='#bfbfbf'/>
                        </View>
                    </Modal>
                </View>
                
            </TouchableOpacity>
        );
    }
    //点击跳转
    _test= () => {
        var idtree = 0;
        const { navigator } = this.props;

        AsyncStorage.getItem('idtree',(error,text)=>{
            if(text == null ){
            }else{
                idtree = text;
                if(navigator) {
                    navigator.push({
                        name: '题目',
                        // component: ExerciseNow,
                        component:Cell,
                        gestures: Navigator.SceneConfigs.PushFromRight.gestures,
                        params:{
                            sum:this.props.sum,
                            now: this.state.now,
                            type: this.state.id,
                            name:this.props.name,
                            idtree:idtree,
                            setNow:(now1)=>{
                                this.setState({
                                    now:now1,
                                })
                            }
                        }
                    })
                }
            }
        });
    }

    //获取这个当前的题目
    _renderP= ()=>{
        if(Platform.OS == 'ios'){
            return(
            <View style={styles.proback}>
                <ProgressViewIOS style={styles.progressView} 
                    progressTintColor="#00A3E8"
                    progress={this.state.now/this.state.sum}/>
            </View>
            )
        }else{
            return(
            <View style={styles.proback}>
                <ProgressBarAndroid
                    color="#00A3E8"
                    progress={this.state.now/this.state.sum}
                    styleAttr='Horizontal'
                    indeterminate={false}/>
            </View>
            )
        }

    }
    //渲染那个
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
        width:width*0.5
    },

    centering:{
        top:height/2+10,
    },
});
module.exports = QCell;