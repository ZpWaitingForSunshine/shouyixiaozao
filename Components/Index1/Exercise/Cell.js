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
} from 'react-native';
import Realm from 'realm'
const HTML1 = '<!DOCTYPE html><html><body>'
const HTML2 = '</body></html>'

var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
import QuestionCell from './QuestionCell'
import ModalDropdown from 'react-native-modal-dropdown'
var url = 'http://api.wevet.cn/Api/Exercise'
// import * as WeChat from 'react-native-wechat'

export default class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sum:this.props.sum,
            activePage: this.props.now - 1,//现在活跃的
            type:this.props.type,
            name:this.props.name.split('.')[1],
            idtree:this.props.idtree,
            itemArr:[],
            isRender:false,
        };
    }
    componentDidMount(){
        //先跳到某页
        this._scrollView.scrollTo({x:(this.props.now - 1)*width,y:0,animated:false}); 
        var arr = [];
        for(var i = 0; i< JSON.parse(this.props.idtree)[this.props.type].length; i++){
            arr.push('第'+(i+1)+"题")
        }
        this.setState({
            itemArr:arr,
        })
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
            </View>
        )
    }

    // scrollView内部的组件
    renderScrollItem = () => {
        // 组件数组
        var itemArr = [];
        // 遍历创建组件
        for(var i=0; i<JSON.parse(this.props.idtree)[this.props.type].length; i++){
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
                <QuestionCell
                    key={i}
                    keykey = {i}
                    style={{width:width,height:height}}
                    id={JSON.parse(this.props.idtree)[this.props.type][i]}
                    length = {JSON.parse(this.props.idtree)[this.props.type].length}>
                </QuestionCell>)
                /*return (
                    <View>
                        <Text>hello</Text>
                    </View>
                )*/
        };
    }
    isPreShow = (i) =>{
        if (i == this.state.activePage-1) {
            /*return(
                <QuestionCell
                    key={i}
                    keykey = {i}
                    style={{width:width,height:height}}
                    id={JSON.parse(this.props.idtree)[this.props.type][i]}
                    length = {JSON.parse(this.props.idtree)[this.props.type].length}>
                </QuestionCell>)*/
                return (
                    <View>
                        <Text>hello</Text>
                    </View>
                )
        };
    }
    isNextShow = (i) =>{
        if (i == this.state.activePage+1) {
            /*return(
                <QuestionCell
                    key={i}
                    keykey = {i}
                    style={{width:width,height:height}}
                    id={JSON.parse(this.props.idtree)[this.props.type][i]}
                    length = {JSON.parse(this.props.idtree)[this.props.type].length}>
                </QuestionCell>)*/
                return (
                    <View>
                        <Text>hello</Text>
                    </View>
                )
        };
    }
    // 当一帧滚动结束的时候调用
    onScrollAnimationEnd = (e) => {
        // 求出当前的页码
        var currentPage = Math.floor(e.nativeEvent.contentOffset.x / width);
        // 更新状态机
        this.setState({
            activePage: currentPage
        });

        //获取sum什么的然后写入
        console.log('当前页面'+currentPage)
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

        this.isCollections()
    }
    //渲染上面
    renderNavBar=()=>{
        let collectimg = this.state.isRender ? require('./../img/collect.png') : require('./../img/collectb.png');
        return(
            <View style={styles.navOutViewStyle}>
                <TouchableOpacity style={styles.leftViewStyle} onPress={()=>this._back()}>
                    {/*返回键*/}
                    <Image source={require('./../img/back.png')} style={styles.navImageStyle}/>
                    {/*题目*/}
                    <Text style={{color:'white', fontSize:18, fontWeight:'bold', marginLeft:15,paddingTop:5}}>{this.state.name}</Text>
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
                        <TouchableOpacity>
                            <Image source={require('./../img/share.png')} style={styles.navImageStyle}/>
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
            navigator.popToTop();
        }
    }
    // 选择题目
    selectQuestion = (idx, value) => {
        this._scrollView.scrollTo({x: idx*width});
        var a = parseInt(idx)
        this.setState(
        {
            activePage : a
        })
    }
    // 是否收藏了
    isCollections =()=>{
        console.log(JSON.parse(this.props.idtree)[this.props.type][this.state.activePage])
        AsyncStorage.getItem('phone').then(
            (result)=>{
                if(result){
                    var url = 'http://api.wevet.cn/Api/Exercise'
                    let formData = new FormData();
                    formData.append("action","isCollections");
                    formData.append("tx_id",JSON.parse(this.props.idtree)[this.props.type][this.state.activePage]);
                    formData.append("phone",result);
                    console.log(JSON.parse(this.props.idtree)[this.props.type][this.state.activePage])
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
                        console.log(error)
                    });
                }
            }
        )
    }

    addCollections = () =>{
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
                        formData.append("tx_id",JSON.parse(this.props.idtree)[this.props.type][this.state.activePage]);
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
                        formData.append("tx_id",JSON.parse(this.props.idtree)[this.props.type][this.state.activePage]);
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
});



module.exports = Cell;