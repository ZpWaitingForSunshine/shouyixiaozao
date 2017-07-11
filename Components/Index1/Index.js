import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  EditView,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
  AsyncStorage,
  Modal,
  ProgressBarAndroid,
} from 'react-native';
 
import Main from '../../Components/Main/Main';
import NetWorkTool from '../Common/network'
import toastShort from '../Common/toast'
// import CacheImage from "react-native-img-cache

var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
import Adv from './Adv'
import Comedown from './Comedown'
import Daohang from './Daohang'
import Shousuo from './Shousuo'
import ShousuoExam from './ShousuoExam'
import Update from '../Common/updateExTree'
//json 数据
let base = {
  "item1":[
    {
      "name":"1.法律法规真题",
      "id":1
    },
    {
      "name":"2.解剖真题",
      "id":2
    },
    {
      "name":"3.生理真题",
      "id":3
    },
    {
      "name":"4.生化真题",
      "id":4
    },
    {
      "name":"5.病理真题",
      "id":5
    },
    {
      "name":"6.药理真题",
      "id":6
    }
  ],
  "item2":[
    {
      "name":"7.微生物真题",
      "id":7
    },
    {
      "name":"8.传染病真题",
      "id":8
    },
    {
      "name":"9.寄生虫真题",
      "id":9
    },
    {
      "name":"10.公共卫生真题",
      "id":10
    }
  ],
  "item3":[
    {
      "name":"11.临诊真题",
      "id":11
    },
    {
      "name":"12.内科真题",
      "id":12
    },
    {
      "name":"13.外科真题",
      "id":13
    },
    {
      "name":"14.产科真题",
      "id":14
    },
    {
      "name":"15.中兽医真题",
      "id":15
    }
  ]

}

var url="http://api.wevet.cn/Api/Register/";
var urlMain = "http://api.wevet.cn/Api/Main/";
export default class Index extends Component {
    constructor(props) {  
        super(props);  
        this.state = {
            eNow:{
                "1": 1,
                "2": 2,
                "3": 1,
                "4": 1,
                "5": 1,
                "6": 1,
                "7": 1,
                "8": 1,
                "9": 1,
                "10": 1,
                "11": 1,
                "12": 1,
                "13": 1,
                "14": 1,
                "15": 1
            },//科目id
            eSum:{
                "1": 103,
                "2": 101,
                "3": 64,
                "4": 59,
                "5": 100,
                "6": 75,
                "7": 138,
                "8": 207,
                "9": 139,
                "10": 40,
                "11": 110,
                "12": 163,
                "13": 203,
                "14": 107,
                "15": 95
            },
        };
    }

    componentWillMount() {
        // this._getSumOnline();//从服务器获取当前的题目
        // Update.update();
    }
    componentDidMount(){
        // this._getExercises();//获取当前的记
    }
    render() {
        return (
            <View style = {styles.container}>
                {/*{this.renderNavBar()}*/}
                {/*<Adv navigator={this.props.navigator}
                    style = {styles.adv}>
                </Adv>*/}
                <ScrollView>
                    {/*考试倒计时，包含了学员统计*/}
                    {/*{this.renderComedown()}*/}
                    {/*<Comedown ></Comedown>*/}
                    {/*菜单*/}
                    <Daohang navigator={this.props.navigator}></Daohang>
                    {/*<CachedImage source={{ uri: "http://ubmcmm.baidustatic.com/media/v1/0f000nG8Q_eZk_emdqsn06.jpg" }} />*/}
                    {/*收缩的科目菜单*/}
                    {/*<Shousuo
                        show = "1"
                        name = "基础科目"
                        item = {base.item1}
                        now = {this.state.eNow}
                        sum = {this.state.eSum}
                        navigator={this.props.navigator}>
                    </Shousuo>
                    <Shousuo
                        show = "1"
                        name = "预防科目"
                        item = {base.item2}
                        now = {this.state.eNow}
                        sum = {this.state.eSum}
                        navigator={this.props.navigator}>
                    </Shousuo>
                    <Shousuo
                        show = "1"
                        name = "临床科目"
                        item = {base.item3}
                        now = {this.state.eNow}
                        sum = {this.state.eSum}
                        navigator={this.props.navigator}>
                    </Shousuo>
                    <ShousuoExam
                        show = "1"
                        name = "模拟考试"
                        navigator={this.props.navigator}>
                    </ShousuoExam>*/}
                </ScrollView>

            </View>
        );
    }
    
    

    __press=()=>{
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'SecondPageComponent',
                component: Adv,
                params:{

                }
            })
        }
    }
    //头部
    renderNavBar=()=>{
        return(
            <View style={styles.navBarStyle}>
                <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>执兽考试</Text>
            </View>
        )
    }
    //倒计时
    renderComedown=()=>{
        return(
            <Comedown></Comedown>
        )
    }

    //获取题目的总数和当前答的题目
    _getExercises= () => {
        //获取题目多少
        AsyncStorage.multiGet(['eSum','eNow']).then(
            (result)=> {
                if (result[0][1] == null || result[1][1] == null ) {
                    AsyncStorage.multiSet([['eSum',JSON.stringify(this.state.eSum)],["eNow",JSON.stringify(this.state.eNow)]]).then(
                        ()=>{   //成功的操作
                             console.log("成功读写")
                        },
                    );
                }else{
                    this.setState({eNow:JSON.parse(result[1][1]),eSum:JSON.parse(result[0][1])});
                }
            }
        ).catch((error)=> {  //读取操作失败
                //没有网络就直接调到登录界面
                console.log('errorIndex:' + error.message);
        })
    }

    //获取网络上的题目数量
    _getSumOnline=()=>{
        var url = "http://api.wevet.cn/Api/Main"
        let formData = new FormData();
        formData.append("action","getSum");
        fetch(url,{
            method:'POST',
            headers:{  
            // 'Content-Type':'multipart/form-data', 
        },  
            body:formData,
        })  
        .then((response) => response.json())
        .then((responseData)=>{
            if(responseData.code == '99999'){
                
                this.setState({eSum:responseData.data});
                // console.log(this.state.eSum)
            }
            else{

            }
        })  
        .catch((error)=>{
            console.log('获取网上的题目的数量和数目失败');
        });
    }
}
var styles = StyleSheet.create({
  container:{
      flex:1,
      top:20,
      marginBottom:20
  },
  adv: {
     
  },
  navBarStyle:{ // 导航条样式
        height: 44,
        backgroundColor:'#1E90FF',

        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center',

        // 设置主轴的对齐方式
        justifyContent:'space-around'
    },
})
module.exports = Index;