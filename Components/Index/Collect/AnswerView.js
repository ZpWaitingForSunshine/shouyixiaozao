import React, { Component } from 'react';
import {  
  AppRegistry,
  PanResponder,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Navigator,
  ScrollView,
  Platform,
  Dimensions,
  Image,
  BackAndroid,
  AsyncStorage,
  InteractionManager,
  Alert,
} from 'react-native';

var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
import ModalDropdown from 'react-native-modal-dropdown'
import AnswerCell from './AnswerCell.js'
var url = 'http://api.wevet.cn/Api/Exercise'
import * as WeChat from 'react-native-wechat';
import Realm from 'realm'

const HTML1 = '<!DOCTYPE html><html><body>'
const HTML2 = '</body></html>'



class Ex {}
    Ex.schema = {
        name: 'Ex',
        primaryKey: 'sx_id',
        properties: {
            sx_id: 'int',
            sx_type:'string',
            sx_title: 'string',//小类别
            sx_subject: 'string',//题目
            sx_answera: 'string',
            sx_answerb: 'string',
            sx_answerc: 'string',
            sx_answerd: 'string',
            sx_answere: 'string',
            //正确答案
            sx_answer:'string',
            sx_analyze:'string',
            note:{type: 'string', default: ''},//备注，用json表示用户对应的解析
            last: {type: 'string', default: '无'},//添加默认值的写法
            collect:{type:'int',default:0} // 是否收藏
        }
    }
var E1 = require('./../../ExecJson/E1.json');
var E2 = require('./../../ExecJson/E2.json');
var E3 = require('./../../ExecJson/E3.json');
var E4 = require('./../../ExecJson/E4.json');
var E5 = require('./../../ExecJson/E5.json');
var E6 = require('./../../ExecJson/E6.json');
var E7 = require('./../../ExecJson/E7.json');
var E8 = require('./../../ExecJson/E8.json');
var E9 = require('./../../ExecJson/E9.json');
var E10 = require('./../../ExecJson/E10.json');
var E11 = require('./../../ExecJson/E11.json');
var E12 = require('./../../ExecJson/E12.json');
var E13 = require('./../../ExecJson/E13.json');
var E14 = require('./../../ExecJson/E14.json');
var E15 = require('./../../ExecJson/E15.json');
var Arr1 = E1.RECORDS;
var Arr2 = E2.RECORDS;
var Arr3 = E3.RECORDS;
var Arr4 = E4.RECORDS;
var Arr5 = E5.RECORDS;
var Arr6 = E6.RECORDS;
var Arr7 = E7.RECORDS;
var Arr8 = E8.RECORDS;
var Arr9 = E9.RECORDS;
var Arr10 = E10.RECORDS;
var Arr11 = E11.RECORDS;
var Arr12 = E12.RECORDS;
var Arr13 = E13.RECORDS;
var Arr14 = E14.RECORDS;
var Arr15 = E15.RECORDS;

var jsonAll = require('./../../ExecJson/1.json');


var map = {}
export default class AnswerView extends Component {
    constructor(props) {  
        super(props);
        try {
            WeChat.registerApp('wx0d031e713bf741bc');//从微信开放平台申请
        } catch (e) {
            alert(e)
        }
        var arr={}
        let realm = new Realm({path:"ex7.realm",schema: [Ex]});
        let exs = realm.objects('Ex');
        var result = exs.filtered('sx_type == "'+this.props.type+'"');
        if(result[0]){// 如果realm里面有
            let temp = JSON.stringify(result)
            arr= JSON.parse(temp)
        }else{
            // 如果没有
            var json
            switch(this.props.type){
                case 1:
                    json = Arr1
                    break
                case 2:
                    json = Arr2
                    break
                case 3:
                    json = Arr3
                    break
                case 4:
                    json = Arr4
                    break
                case 5:
                    json = Arr5
                    break
                case 6:
                    json = Arr6
                    break
                case 7:
                    json = Arr7
                    break
                case 8:
                    json = Arr8
                    break
                case 9:
                    json = Arr9
                    break
                case 10:
                    json = Arr10
                    break
                case 11:
                    json = Arr11
                    break
                case 12:
                    json = Arr12
                    break
                case 13:
                    json = Arr13
                    break
                case 14:
                    json = Arr14
                    break
                case 15:
                    json = Arr15
                    break
            }
            realm.write(()=> {
                var k = 0
                for(var i = 0;i< json.length;i++)
                    realm.create('Ex', {
                        sx_id: Number(json[i].sx_id),
                        sx_type:json[i].sx_type,
                        sx_title: json[i].sx_title,//小类别
                        sx_subject: json[i].sx_subject,
                        //选项
                        sx_answera: json[i].sx_answera,
                        sx_answerb:json[i].sx_answerb,
                        sx_answerc: json[i].sx_answerc,
                        sx_answerd: json[i].sx_answerd,
                        sx_answere: json[i].sx_answere,
                        //正确答案
                        sx_answer:json[i].sx_answer+"",
                        sx_analyze:json[i].sx_analyze+"",
                        note:"",//备注，用json表示用户对应的解析
                        last: "无",//添加默认值的写法
                    })
            })
            var result1 = exs.filtered('sx_type == "'+this.props.type+'"');
            let temp = JSON.stringify(result)
            arr= JSON.parse(temp)
        }
        realm.close()
        this.state = {
            name:this.props.name,
            isRender:false,
            itemArr:this.props.itemArr,
            activePage:0,
            type:this.props.type,
            sum:this.props.sum,
            idtree:JSON.stringify(this.props.idtree),
            map:arr,
        };
    }
    componentDidMount(){
        // this.props.hide()
        //先跳到某页
        InteractionManager.runAfterInteractions(()=>{
             this._scrollView.scrollTo({x:(this.props.now - 1)*width,y:0,animated:false}); 
        })
        BackAndroid.addEventListener('hardwareBackPress', ()=> {
            this._back();
            return true;
        });
        // 获取
       this.isCollections(this.props.now-1)
    }
    componentWillUnmount() {
         BackAndroid.removeEventListener('hardwareBackPress',()=>{});
    }
    render(){
        console.log("ADFFFF")
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
            </View>
        )
    }
        // scrollView内部的组件
    renderScrollItem = () => {
        // 组件数组
        var itemArr = [];
        // 遍历创建组件
        for(var i=0; i<JSON.parse(this.state.idtree).length; i++){
            itemArr.push(
                <View 
                    style={{width:width,height:height,}}
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
            let realm = new Realm({path:"ex7.realm",schema: [Ex]});
            let exs = realm.objects('Ex');
            var result = exs.filtered('sx_id == '+JSON.parse(this.state.idtree)[i]);
            realm.close()
            return(
                <AnswerCell
                    map={JSON.parse(JSON.stringify(result))[0]}
                    key={i}
                    keykey = {i}
                    style={{width:width,height:height}}
                    id={JSON.parse(this.state.idtree)[i]}
                    length = {JSON.parse(this.state.idtree).length}>
                </AnswerCell>)
        }
        if ((i == this.state.activePage + 1)) {  
            let realm = new Realm({path:"ex7.realm",schema: [Ex]});
            let exs = realm.objects('Ex');
            var result = exs.filtered('sx_id == '+JSON.parse(this.state.idtree)[i]);
            realm.close()
            return(
                <AnswerCell
                    map={JSON.parse(JSON.stringify(result))[0]}
                    key={i}
                    keykey = {i}
                    style={{width:width,height:height}}
                    id={JSON.parse(this.state.idtree)[i]}
                    length = {JSON.parse(this.state.idtree).length}>
                </AnswerCell>)
        }
        if ((i == this.state.activePage - 1)) {
            let realm = new Realm({path:"ex7.realm",schema: [Ex]});
            let exs = realm.objects('Ex');
            var result = exs.filtered('sx_id == '+JSON.parse(this.state.idtree)[i]);
            realm.close()
            return(
                <AnswerCell
                    map={JSON.parse(JSON.stringify(result))[0]}
                    key={i}
                    keykey = {i}
                    style={{width:width,height:height}}
                    id={JSON.parse(this.state.idtree)[i]}
                    length = {JSON.parse(this.state.idtree).length}>
                </AnswerCell>)
        }
    }
    // 滑页
     onScrollAnimationEnd = (e) => {
        // 求出当前的页码
        var currentPage = Math.floor(e.nativeEvent.contentOffset.x / width);
        // // 更新状态机
        if(this.state.activePage != currentPage)
            this.setState({
                activePage: currentPage
            });

        AsyncStorage.getItem('eNow').then(
            (result)=> {
                var temp = JSON.parse(result)
                temp[this.state.type] = currentPage+1
                this.props.setNow(currentPage+1)
                AsyncStorage.setItem('eNow',JSON.stringify(temp)).then(
                )
            }
        ).catch((error)=> {
            console.log('errorIndex:' + error.message);
        })
        // this.updateQuestion()
        this.isCollections(currentPage)
    }
    // 渲染头部
    renderNavBar=()=>{
        let collectimg = this.state.isRender ? require('./../img/collect.png') : require('./../img/collectb.png');
        return(
            <View style={styles.navOutViewStyle}>
                <TouchableOpacity style={styles.leftViewStyle} onPress={()=>this._back()}>
                    {/*返回键*/}
                    <Image source={require('./../img/back.png')} style={styles.navImageStyle}/>
                    {/*题目*/}
                    <Text style={{alignSelf:"center", color:'white', fontSize:18, fontWeight:'bold',}}>{this.state.name}</Text>
                </TouchableOpacity>
                <View style={styles.secmenu}>
                    <ModalDropdown style={styles.dropdown}
                        options={this.state.itemArr}
                        onSelect={(idx, value) => this.selectQuestion(idx, value)}>
                        <Image style={styles.navImageStyle}
                            source={require('./../img/menu.png')}
                        />
                    </ModalDropdown>
                    
                    <View style={styles.drop}>
                        <TouchableOpacity onPress = {()=>this.addCollections()}>
                            <Image source={collectimg} style={styles.navImageStyle}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.drop}>
                        <TouchableOpacity onPress = {()=>this.shareAns()}>
                            <Image source={require('./../img/share.png')} style={styles.navImageStyle}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    // 返回
    _back=()=>{
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }
    addCollections=()=>{
        if(this.state.isRender){
            this.setState({
                isRender:false,
            })
            AsyncStorage.getItem('phone').then(
                (result)=>{
                    if(result){
                        var url = 'http://api.wevet.cn/Api/Exercise'
                        let formData = new FormData();
                        formData.append("action","deleteCollections");
                        formData.append("tx_id",JSON.parse(this.state.idtree)[this.state.activePage]);
                        formData.append("phone",result);
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
                            console.log(error)
                        });
                    }
                }
            )
        }else{
            this.setState({
                isRender:true,
            })
            AsyncStorage.getItem('phone').then(
                (result)=>{
                    if(result){
                        var url = 'http://api.wevet.cn/Api/Exercise'
                        let formData = new FormData();
                        formData.append("action","addCollections");
                        formData.append("tx_id",JSON.parse(this.state.idtree)[this.state.activePage]);
                        formData.append("tx_type",this.state.type);
                        formData.append("phone",result);
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
                            console.log(error)
                        });
                    }
                }
            )
        }
    }
    // selectQuestion=(idx, value)=>{}
        // 选择题目
    selectQuestion = (idx, value) => {
        this._scrollView.scrollTo({x: idx*width});
        var a = parseInt(idx)
        this.setState(
        {
            activePage : a
        })
        AsyncStorage.getItem('eNow').then(
            (result)=> {
                var temp = JSON.parse(result)
                temp[this.state.type] = a+1
                this.props.setNow(a+1)
                AsyncStorage.setItem('eNow',JSON.stringify(temp)).then(
                )
            }
        ).catch((error)=> {
            console.log('errorIndex:' + error.message);
        })
    }

    shareAns = () => {
        Alert.alert('温馨提醒','分享到：',[
            {text:'微信好友',onPress:()=>{this.shareToWY()}},
            {text:'微信朋友圈',onPress:()=>{this.shareToPYQ()}}
            ])

    }

    shareToWY = () => {
        var num = JSON.parse(this.state.idtree)[this.state.activePage]
        var http = "http://api.wevet.cn/index.php/Home/ApiExercise/shareExc/id/" + num;
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
              if (isInstalled) {
                WeChat.shareToSession({
                  title:'兽医小灶题目分享',
                  description: '分享自:兽医小灶APP',                  
                  type: 'news',
                  webpageUrl: http
                })
                .catch((error) => {
                  alert(error.message);
                });
              } else {
                alert('没有安装微信软件，请您安装微信之后再试');
              }
            });
    }

    shareToPYQ = () => {
        var num = JSON.parse(this.state.idtree)[this.state.activePage]
        var http = "http://api.wevet.cn/index.php/Home/ApiExercise/shareExc/id/" + num;
        alert(WeChat.isWXAppSupportApi())
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
              if (isInstalled) {
                WeChat.shareToTimeline({
                  title:'兽医小灶题目分享',
                  description: '分享自:兽医小灶APP',
                  type: 'news',
                  webpageUrl: http
                })
                .catch((error) => {
                    alert(error.message);
                });
              } else {
                    alert('没有安装微信软件，请您安装微信之后再试');
              }
            });
    }

    isCollections =(currentPage)=>{
        var url = 'http://api.wevet.cn/Api/Exercise'
        let formData = new FormData();
        formData.append("action","isCollections");
        formData.append("tx_id",JSON.parse(this.state.idtree)[currentPage]);
        formData.append("phone",this.props.phone);
        fetch(url,{
                method:'POST',
                headers:{
            },
                body:formData,
            })
            .then((response) => response.json())
            .then((responseData)=>{
                if(responseData.data == 1)
                    this.setState({
                        isRender:true,
                    })
                else{
                    this.setState({
                        isRender:false,
                    })
                }
        })
        .catch((error)=>{
            alert(error)
        });
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
        alignItems:'center',
        justifyContent:"center"
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
        alignSelf:"center",
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
    leftViewStyle:{
        // 绝对定位
        // backgroundColor:"#123456",
        position:'absolute',
        left:10,
        flexDirection:'row',
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
});
module.exports = AnswerView;


