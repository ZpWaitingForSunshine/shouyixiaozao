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
  BackAndroid,
} from 'react-native';
import Realm from 'realm'
const HTML1 = '<!DOCTYPE html><html><body>'
const HTML2 = '</body></html>'
var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
// import QuestionCell from './QuestionCell'
import AnswerCell from './AnswerCellDetail'
import ModalDropdown from 'react-native-modal-dropdown'
import Result from './Result'
var url = 'http://api.wevet.cn/Api/Exercise'
var json = require('./../../ExecJson/1.json')
var jsonData = json.RECORDS

class Exam{}
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

var arr =[]; // 
var arr1 =[]; // 几率
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class ExamDetail extends Component {
    constructor(props) {
        super(props);

        
        var map = [];

        for(var i = 0 ;i<100; i++){
            arr.push(i)
            arr1.push('#bfbfbf') // 1表示没有做
            map.push(jsonData[this.props.idtree[i]])
        }
        let realm = new Realm({path:"ex7.realm",schema: [Exam]});
        let resultExam = realm.objects('Exam')
        // var resultExam = exam.filtered('id == '+this.props.type);
        if(resultExam[0]){
            for(var i = 0;i < resultExam.length;i++){
                var idtemp = resultExam[i]['id']
                if((idtemp - 2 * this.props.type)%17 == 0){
                    if(resultExam[i]['answer1'] == resultExam[i]['answer2']){
                        arr1[(resultExam[i]['id']-2*this.props.type)/17] = 'green'
                    }else if(resultExam[i]['answer1'] != '1') {
                        arr1[(resultExam[i]['id']-2*this.props.type)/17] ='red'
                    }
                }
                
            }
        }
        realm.close()
        this.state = {
            activePage: 0,//现在活跃的
            type:this.props.type,
            name:this.props.name,
            idtree:this.props.idtree, // idtree
            phone:this.props.phone,
            time:60*60,
            show:false,// modal
            arr:arr1,//表示已经做了1表示没做，2做了
            dataSource: ds.cloneWithRows(arr),
            map: map,
        };
    }

    componentDidMount(){
        BackAndroid.addEventListener('hardwareBackPress', ()=> {
            this._back();
            return true;
        });
    }

    componentWillUnmount(){
        arr =[]; // 
        arr1 =[]; // 几率
        BackAndroid.removeEventListener('hardwareBackPress',()=>{});
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
                    onRequestClose={()=>{}}
                    animationType='slide'  
                    transparent={false}  
                    visible={this.state.show}>
                        <View style={ {flexWrap:'wrap',flexDirection:'row',justifyContent:"space-between"}}>
                            <ListView
                                style={{height:height-40,width:width}}
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
        return(
            <TouchableOpacity style={styles.modalView} onPress={()=>{this.selectQuestion(i);}} key={i}>
                <View style={[styles.modalView,{backgroundColor:arr1[i]}]}>
                    <Text style={styles.modalViewText}>{i+1}</Text>
                </View>
            </TouchableOpacity>)
    }
    // 选择题目
    selectQuestion = (idx) => {
        this._scrollView.scrollTo({x: idx*width});
        var a = parseInt(idx)
        let isShow = this.state.show; 


        this.setState({
            activePage : a,
            show:!isShow,
            dataSource: ds.cloneWithRows(arr),
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
                    {this.isShow(i)}
                </View>
            );
        }
        // 返回组件数组
        return itemArr;
    }

    // 渲染三个页面
    isShow = (i) =>{
        if ((i == this.state.activePage)) {
            return(
                <AnswerCell
                    map={this.state.map[i]}
                    key={i}
                    keykey = {i}
                    style={{width:width,height:height}}
                    id={this.props.idtree[i]}
                    length = {100}>
                </AnswerCell>)
        }
        if ((i == this.state.activePage + 1)) {      
            return(
                <AnswerCell
                    map={this.state.map[i]}
                    key={i}
                    keykey = {i}
                    style={{width:width,height:height}}
                    id={this.props.idtree[i]}
                    length = {100}>
                </AnswerCell>)
        }
        if ((i == this.state.activePage - 1)) {
            return(
                <AnswerCell
                    map={this.state.map[i]}
                    key={i}
                    keykey = {i}
                    style={{width:width,height:height}}
                    id={this.props.idtree[i]}
                    length = {100}>
                </AnswerCell>)
        }
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
                    <Text style={{color:'white', fontSize:18, fontWeight:'bold', marginLeft:15,paddingTop:5}}>返回</Text>
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

    //返回
    _submit = () => {
        Alert.alert(
            '提示',
            '确认提交',
            [
                {text: '取消'},
                {text: '确认', onPress: () => (this.toResult())},
            ])
    }
    // 是否收藏了

    addCollections = () =>{
        if(this.state.isRender){
            this.setState({
                isRender:false,
            })
            var url = 'http://api.wevet.cn/Api/Exercise'
            let formData = new FormData();
            formData.append("action","deleteCollections");
            formData.append("tx_id",this.props.idtree[this.state.activePage]);
            formData.append("phone",this.state.phone);
            fetch(url,{
                    method:'POST',
                    headers:{
                },  
                    body:formData,
                })  
                .then((response) => response.json())
                .then((responseData)=>{
                    
            })
            .catch((error)=>{
                
            });
        }else{
            this.setState({
                isRender:true,
            })
            var url = 'http://api.wevet.cn/Api/Exercise'
            let formData = new FormData();
            formData.append("action","addCollections");
            formData.append("tx_id",this.state.idtree[this.state.activePage]);
            formData.append("tx_type",this.state.type);
            formData.append("phone",this.state.phone);
            fetch(url,{
                    method:'POST',
                    headers:{
                },  
                    body:formData,
                })  
                .then((response) => response.json())
                .then((responseData)=>{
                    
            })
            .catch((error)=>{
               
            });
        }
    }
    // 去结果页面
    toResult=()=>{
        this.timer && clearInterval(this.timer);
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: '题目',
                // component: ExerciseNow,
                component:Result,
                gestures: null,
                params:{
                    idtree:this.state.idtree,
                    timeleft:3600-this.state.time,
                }
            })
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
        alignSelf:'center',
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
        height:50,
        width:50,
        backgroundColor:'#123456',
        borderRadius:50,
        margin:10,
        justifyContent:"center",
        alignItems:"center",
    },
    modalViewText:{
        color:"#ffffff"
    }
});



module.exports = ExamDetail;