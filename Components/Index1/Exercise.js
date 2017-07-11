import React, { Component } from 'react';
import {
  AppRegistry,
  PanResponder,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  Modal,
  Alert,
  Button,
  Navigator,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import AnswerCell from './AnswerCell'
import Realm from 'realm'
let exData=require('../Login/Json/1.json');
var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
var jsonIdTree
export default class Exercise extends Component {
    constructor(props) {  
        super(props);
        this.state = {
           sum: this.props.sum,//类别的总量
           now: this.props.now,//现在做到的题目偏移量
           type:this.props.id,//题目的id
           animating: true,
           isRender:false,
           modalVisible:false,
           progress:0,
           idtree: this.props.idtree,

           name:this.props.name.split('.')[1],
           a:"",
           b:"",
           c:"",
           d:"",
           e:"",
           answer:"",
        };
        jsonIdTree = JSON.parse(this.props.idtree)
    }
    componentWillMount(){


        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
            onPanResponderGrant: (evt, gestureState) => {
            // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
                // console.log("开始手势操作("+gestureState.x0+","+gestureState.y0+")");
            // gestureState.{x,y}0 现在会被设置为0
            },
            onPanResponderMove: (evt, gestureState) => {
            // 最近一次的移动距离为gestureState.move{X,Y}
                
            // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                if(gestureState.dx < -40){
                    this._next()
                }
                if(gestureState.dx > 40){
                    this._front()
                }
                // console.log("最近一次的移动横距离"+gestureState.dx);
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
                console.log(evt);
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。{...this._panResponder.panHandlers}> 
                return true;
            },
            // onMoveShouldSetResponderCapture:(evt, gestureState) => {
            //     console.log("要不要劫持");
            // }
        })
     }


    componentDidMount() {
        //改写now 从asy获取,然后改，然后写
        AsyncStorage.getItem('eNow').then(
            (result)=> {
                if(result){
                    console.log(JSON.parse(result))
                    temp = JSON.parse(result);
                    temp[this.state.type] = this.state.now
                    console.log(temp);
                    AsyncStorage.setItem('eNow',JSON.stringify(temp)).then(
                        ()=>{
                        }
                    )
                    
                }
                // if (result[0][1] == null || result[1][1] == null ) {
                //     AsyncStorage.multiSet([['eSum',JSON.stringify(this.state.eSum)],["eNow",JSON.stringify(this.state.eNow)]]).then(
                //         ()=>{   //成功的操作
                //              console.log(JSON.parse(result[0][1]))
                //         },
                //     );
                // }else{
                //      this.setState({eNow:JSON.parse(result[1][1]),eSum:JSON.parse(result[0][1])});
                // }
            }
        ).catch((error)=> {  //读取操作失败
                //没有网络就直接调到登录界面
                console.log('errorIndex:' + error.message);
        })

    }
    render(){
      console.log("render先");
      return (
          <View style={styles.container}>
              <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {}}
                >
                <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)',height:height,}}>
                        <ActivityIndicator
                            animating={this.state.animating}
                            style={styles.centering}
                            size="large"
                            color='#ffffff'/>
                        

                        <TouchableOpacity onPress={() => {
                            this.setModalVisible(!this.state.modalVisible)
                            }}>
                            <Text>Hide Modal</Text>
                        </TouchableOpacity>
                </View>
              </Modal>
              {/*导航*/}
              {this.renderNavBar()}
              {/*题目内容*/}
              <ScrollView
                {...this._panResponder.panHandlers}>
                {/*<Text>{this.state.idtree}</Text>*/}
                <Text>当前的偏移量：{this.state.now}</Text>
                <Text>当前的长度：{jsonIdTree[this.state.type].length}</Text>
                <Text>题目大类别：{this.state.type}</Text>
                <Text>题目id：{jsonIdTree[this.state.type][this.state.now-1]}</Text>
                <Text>题目：</Text>
              </ScrollView>

              
              
              
              {/*题目*/}
              {/*<AnswerCell
                answertrue={'A'}
                answera={'a'}
                answerb={'b'}
                answerc={'c'}
                answerd={'d'}
                answere={'e'}
                anylze={'fenxi'}
                ></AnswerCell>*/}
              {/*<View>
                  <TouchableOpacity onPress={()=>this._toTest()}>
                    <View>
                        <Text>{this.state.type+':'+this.state.now+':'+this.state.sum}</Text>
                    </View>
                </TouchableOpacity>
              </View>*/}
              <View>
                <Text>hello</Text>
              </View>
          </View>
      )
    }
     // 导航条
    renderNavBar=()=>{
        let collectimg = this.state.isRender ? require('./img/collect.png') : require('./img/collectb.png');
        return(
            <View style={styles.navOutViewStyle}>
                <TouchableOpacity style={styles.leftViewStyle} onPress={()=>this._back()}>
                    {/*返回键*/}
                    <Image source={require('./img/back.png')} style={styles.navImageStyle}/>
                    {/*题目*/}
                    <Text style={{color:'white', fontSize:18, fontWeight:'bold', marginLeft:15,paddingTop:5}}>{this.state.name}</Text>
                </TouchableOpacity>
                <View style={styles.secmenu}>
                {/*<ModalDropdown style={styles.dropdown}
                                options={this.state.secArr}
                                onSelect={(idx, value) => this.selectQuestion(idx, value)}>
                    <Image style={styles.navImageStyle}
                            source={require('./img/menu.png')}
                    />
                </ModalDropdown>*/}
                    <View style={styles.drop}>
                        <TouchableOpacity>
                            <Image source={collectimg} style={styles.navImageStyle}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.drop}> 
                        <TouchableOpacity>
                            <Image source={collectimg} style={styles.navImageStyle}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.drop}>
                        <TouchableOpacity>
                            <Image source={require('./img/share.png')} style={styles.navImageStyle}/>
                        </TouchableOpacity>
                    </View>
                   
                </View>
            </View>
        )
    }
    // 返回按钮
    _back =()=>{
        const { navigator } = this.props;
        if(navigator) {
            navigator.popToTop();
        }
    }
    //隐藏这个visual
    setModalVisible=(visible)=>{
        this.setState({modalVisible: visible});
    }
    //next 下一题
    _next=()=>{
        var now = Number(this.state.now)+1;
        if(now >this.state.sum){
            now = 1;
        }
        console.log(now)
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: '题目',
                component: Exercise,
                gestures: null,
                params:{
                    sum: this.props.sum,//类别的总量
                    now: now,//现在做到的题目偏移量
                    id: this.state.type,//
                    idtree: this.props.idtree,
                    name:this.props.name,
                }
            })
        }else{
            console.log("没有navigatior");
        }
    }

    //front 上一题
    _front=()=>{
        var now = Number(this.state.now) - 1;
        if(now <= 0){
            now = this.state.sum;
        }
        console.log(now)
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: '题目',
                component: Exercise,
                gestures: null,
                sceneConfig: Navigator.SceneConfigs.PushFromLeft,
                params:{
                    sum: this.props.sum,//类别的总量
                    now: now,//现在做到的题目偏移量
                    id: this.state.type,//
                    idtree: this.props.idtree,
                    name:this.props.name
                }
            })
        }else{
            console.log("没有navigatior");
        }
    }

    // 从网上获取题目的id们
    _getOnline = () => {
        var url="http://api.wevet.cn/Api/Main";
        let formData = new FormData();
        formData.append("action","getIdArray");
        fetch(url,{
                method:'POST',
                headers:{
            },  
                body:formData,
            })
            .then((response) => response.json())
            .then((responseData)=>{
                if(responseData.code == '99999'){
                    imgUrl = responseData.data;
                    console.log(imgUrl);
                    this.setModalVisible(!this.state.modalVisible);
                    return JSON.stringify(imgUrl)+"";
                    
                }
                else{
                    console.log("获取失败");
                    return '0';
                }
            })  
            .catch((error)=>{
                console.log("error"+error);
                return '1';
            });
    }


    //测试
    _toTest = () => {
        console.log(this.state.id);
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: '题目',
                component: Exercise,
                gestures: null,
                params:{
                    
                }
            })
        }else{
            console.log("没有navigatior");
        }
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    dropdown:{
        width:Platform.OS == 'ios' ? 60: 50,
        height:Platform.OS == 'ios' ? 28: 24,
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
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

module.exports = Exercise;
