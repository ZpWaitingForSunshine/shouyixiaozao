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
  ScrollView,
  ListView,
  Alert,
} from 'react-native';
import Realm from 'realm'
const HTML1 = '<!DOCTYPE html><html><body>'
const HTML2 = '</body></html>'
var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
import QuestionCellDetail from './QuestionCellDetail'
import ModalDropdown from 'react-native-modal-dropdown'
import Result from './Result'
var url = 'http://api.wevet.cn/Api/Exercise'

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

export default class ExamDetail extends Component {
    constructor(props) {
        super(props);
        var arr =[];
        var arr1 =[];// 表示做没做
        for(var i = 0 ;i<100; i++){
            arr.push(i)
            arr1.push(1)
        }
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            activePage: 0,//现在活跃的
            type:this.props.type, // 第几次考试
            name:this.props.name, // 第几次考试的name
            idtree:this.props.idtree, // idtree
            phone:'18305183026',
            time:60*60, 
            show:false,// modal
            arr:arr1,//表示已经做了1表示没做，2做了
            dataSource: ds.cloneWithRows(arr),
        };
    }
    componentDidMount(){
        // 获取phone
        AsyncStorage.getItem('phone').then(
            (result)=> {
                this.setState({
                    phone:result,
                })
            }
            ).catch((error)=> {  
                console.log('errorIndex:' + error.message);
            })

        var arr =[]
        let realm = new Realm({path:"ex5.realm",schema: [Exam]});
        let exam = realm.objects('Exam');
        for(var i = 0 ; i< 100;i++){
            var temp =0;
            let result= exam.filtered('id=='+(this.state.idtree[i]))// 找result
            if(result[0]){
                if(result[0].answer1 != result[0].answer2)
                    temp =1 
                else if(result[0].answer1 == result[0].answer2)
                temp =2
            }
            arr.push(temp)
        }
        
        this.setState({
            arr1:arr,
            show:true,
        })
        realm.close()
    }
    componentWillUnmount(){
        
    }
    render() {
        return (
             <View style={styles.container}>
                {this.renderNavBar()}
                {/*内容部分*/}
                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd = {this.onScrollAnimationEnd}
                    ref={view => this._scrollView = view}>
                    {this.renderScrollItem()}
                </ScrollView>
                {/*modal 遮罩选题*/}
                <Modal 
                    animationType='slide'  
                    transparent={false}  
                    visible={this.state.show}>
                        <View style={ {flexWrap:'wrap',flexDirection:'row',marginTop:20,justifyContent:"space-between"}}>
                            {/*{this.renderModal()}*/}
                            <ListView
                                initialListSize={100}
                                dataSource={this.state.dataSource}
                                renderRow={(rowData) => this.renderModal(rowData)}
                                contentContainerStyle={{flexDirection:'row',flexWrap:'wrap',justifyContent: 'space-around',}}
                                />
                        </View>
                </Modal>
            </View>
        )
    }

    // 显示/隐藏 modal  
    _setModalVisible() {  
        let isShow = this.state.show; 
        this.setState({  
            show:!isShow,
        });
    }
    
    // renderModal
    renderModal=(i)=>{
        var backcolor = '#bfbfbf'
        if(this.state.arr1[i]==1) backcolor = 'red'
        else if(this.state.arr1[i]==2)backcolor = 'green'
        return(
            <TouchableOpacity style={styles.modalView} onPress={()=>{this.selectQuestion(i);}} key={i}>
                <View style={[styles.modalView,{backgroundColor:backcolor}]}>
                    <Text style={styles.modalViewText}>{i+1}</Text>
                </View>
            </TouchableOpacity>)
    }
    // 选择题目
    selectQuestion = (idx) => {
        this._scrollView.scrollTo({x: idx*width});
        this._setModalVisible();
        var a = parseInt(idx)
        this.setState(
        {
            activePage : a
        })
    }
    // scrollView内部的组件
    renderScrollItem = () => {
        // 组件数组
        var itemArr = [];
        // 遍历创建组件
        for(var i=0; i< 100; i++){
            itemArr.push(
                <View 
                    style={{width:width,flex:1,height:height,}}
                    key ={i}>
                    {this.isPreShow(i)}
                    {this.isShow(i)}
                    {this.isNextShow(i)}
                </View>
            );
        }
        // 返回组件数组
        return itemArr;
    }
    isShow = (i) =>{
        if (i == this.state.activePage) {
            return(
                <QuestionCellDetail
                    key={i}
                    keykey = {i}
                    style={{width:width,height:height}}
                    id={this.props.idtree[i]} // 这是序号 0 开始
                    length = {100}
                    setArr={()=>{
                        var arr = this.state.arr
                        arr[i] = '2'
                        this.setState({
                            arr:arr
                        })
                    }}
                    >
                </QuestionCellDetail>)
        };
    }
    isPreShow = (i) =>{
        if (i == this.state.activePage-1) {
            return(
                <QuestionCellDetail
                    key={i}
                    keykey = {i}
                    style={{width:width,height:height}}
                    id={this.props.idtree[i]}
                    length = {this.props.idtree.length}
                    setArr={()=>{
                        var arr = this.state.arr
                        arr[i] = '2'
                        this.setState({
                            arr:arr
                        })
                    }}>
                </QuestionCellDetail>)
        };
    }
    isNextShow = (i) =>{
        if (i == this.state.activePage+1) {
            return(
                <QuestionCellDetail
                    key={i}
                    keykey = {i}
                    style={{width:width,height:height}}
                    id={this.props.idtree[i]}
                    length = {this.props.idtree.length}
                    setArr={()=>{
                        var arr = this.state.arr
                        arr[i] = '2'
                        this.setState({
                            arr:arr
                        })
                    }}>
                </QuestionCellDetail>)
        };
    }
    // 当一帧滚动结束的时候调用
    onScrollAnimationEnd = (e) => {
        // 求出当前的页码
        var currentPage = Math.floor(e.nativeEvent.contentOffset.x / width);
        // 更新状态机
        this.setState({
            activePage: currentPage,
        });
    }
    //渲染上面
    renderNavBar=()=>{
        let collectimg = this.state.isRender ? require('./../img/collect.png') : require('./../img/collectb.png');
        return(
            <View style={styles.navOutViewStyle}>
                <TouchableOpacity style={styles.leftViewStyle} onPress={()=>this._back()}>
                    {/*返回键*/}
                    <Image source={require('./../img/back.png')} style={styles.navImageStyle}/>
                    {/*<Text style={{color:'#ffffff',fontSize:18}}>您正在模拟测试</Text>*/}
                    {/*题目*/}
                    {/*<Text style={{color:'white', fontSize:18, fontWeight:'bold', marginLeft:15,paddingTop:5}}>退出测试</Text>*/}
                </TouchableOpacity>
                <View style={styles.secmenu}>
                    <View style={styles.drop}>
                        <TouchableOpacity onPress={()=>this._setModalVisible()}>
                            <Image source={require('./../img/menu.png')} style={styles.navImageStyle}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    //返回
    _back = () => {
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }
}
const styles = StyleSheet.create({
    container: {
       backgroundColor:'white',
    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    indicatorViewStyle:{
       // 改变主轴的方向
        flexDirection:'row',
       // 水平居中
        justifyContent:'center'
    },
    adv:{
        flex: 1, 
    },
    page: {  
       
    },
    navOutViewStyle:{
        height: Platform.OS == 'ios' ? 64 : 44,
        backgroundColor:'#1E90FF',

        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center'
    },
    idandlabel:{
        height: Platform.OS == 'ios' ? 30 : 30,
        backgroundColor:'#EAEAEA',

        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center',
        // 主轴方向居中
    },
    secmenu:{
        // 绝对定位
        flexDirection:'row',
        position:'absolute',
        right:1,
        bottom:Platform.OS == 'ios' ? 10:10
    },
    question:{
        backgroundColor:'white'
    },
    navImageStyle:{
        width:Platform.OS == 'ios' ? 28: 24,
        height:Platform.OS == 'ios' ? 28: 24,
    },
    navImageStyle1:{
        width:Platform.OS == 'ios' ? 28: 24,
        height:Platform.OS == 'ios' ? 28: 24,
    },
    dropdown:{
        alignItems:'flex-end',
        width:Platform.OS == 'ios' ? 60: 50,
        height:Platform.OS == 'ios' ? 28: 24,
        marginRight:10,
    },
    drop:{
        width:Platform.OS == 'ios' ? 30: 30,
        height:Platform.OS == 'ios' ? 28: 24,
        marginRight:10,
    },
    drop2:{
        width:Platform.OS == 'ios' ? 40: 40,
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
    loginBtnStyle:{
        height:30,
        width:width*0.3,
        backgroundColor:'#5CACEE',
        marginTop:30,
        marginBottom:20,

        justifyContent:'center',
        alignItems:'center',

        borderRadius:8
    },
    settingStyle:{
        // 设置主轴的方向
        flexDirection:'row',
        // backgroundColor:'red',

        // 主轴的对齐方式
        width:width,
        justifyContent:'space-between'
    },
    centering:{
        top:100,
    },
    modalView:{
        height:40,
        width:40,
        backgroundColor:'#123456',
        borderRadius:40,
        margin:10,
        justifyContent:"center",
        alignItems:"center",
    },
    modalViewText:{
        color:"#ffffff"
    }
});



module.exports = ExamDetail;