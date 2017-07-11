import React, { Component } from 'react';
import {  
  AppRegistry,
  StyleSheet,
  View,
  Navigator,
  Text,
  Image,
  ScrollView,
  AsyncStorage,
  ToastAndroid,
  BackAndroid,
} from 'react-native';

var url="http://api.wevet.cn/Api/Register/";
var urlMain = "http://api.wevet.cn/Api/Main/";
import Adv from './Adv/Adv.js'
import Comedown from './Adv/Comedown.js'
import Menu from './Adv/Menu.js'
import ShousuoExam from './Exam/ShousuoExam'

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
// import QCell from './Exercise/QCell.js'
import Shousuo from './Exercise/Shousuo.js'

import Update from '../Common/updateExTree'

export default class Index extends Component {
    constructor(props) {  
        super(props);
        // console.disableYellowBox = true;
        this.state = {
            phone:this.props.phone,
            eNow:{
                "1": 1,
                "2": 1,
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
                "1": 102,
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

        var lastBackPressed = 0
    }
    componentDidMount(){
        Update.update() // 更新idtree
        this._getExercises() //
        BackAndroid.addEventListener('hardwareBackPress', ()=>this.onBackAndroid());
    }


    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress',()=> this.onBackAndroid());
    }

    onBackAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
               //最近2秒内按过back键，可以退出应用。
              return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    }
    render(){
      return (
          <View style={styles.container}>
                {/*header*/}
                <View style={styles.navBarStyle}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>执兽考试</Text>
                </View>
                {/*广告*/}
                <Adv ></Adv>
                <ScrollView>
                    {/*倒计时*/}
                    <Comedown/>
                    {/*导航*/}
                    <Menu phone = {this.props.phone}
                        navigator={this.props.navigator}/>
                    {/*题目*/}
                    <Shousuo
                        phone = {this.props.phone}
                        show = "1"
                        name = "基础科目"
                        item = {base.item1}
                        now = {this.state.eNow}
                        sum = {this.state.eSum}
                        navigator={this.props.navigator} />
                    <Shousuo
                        phone = {this.props.phone}
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
                        phone = {this.props.phone}
                        navigator={this.props.navigator}>
                    </Shousuo>
                    <ShousuoExam
                        show = "1"
                        name = "模拟考试"
                        phone = {this.props.phone}
                        navigator={this.props.navigator}>
                    </ShousuoExam>
                </ScrollView>
          </View>
      )
    }

        //获取题目的总数和当前答的题目
    _getExercises= () => {
        //获取题目多少
        AsyncStorage.multiGet(['eSum','eNow','idtree']).then(
            (result)=> {
                // console.log(result[2][1])
                
                if (result[0][1] == null || result[1][1] == null || result[2][1] == null) {
                    AsyncStorage.multiSet([['eSum',JSON.stringify(this.state.eSum)],["eNow",JSON.stringify(this.state.eNow)]]).then(
                        ()=>{   //成功的操作
                             
                        },
                    );
                }else{
                    var json = {}
                    for(var i = 1 ;i<16 ;i++){
                        json[i] = JSON.parse(result[2][1])[i].length
                    }
                    this.setState({
                        eNow:JSON.parse(result[1][1]),
                        eSum:JSON.parse(JSON.stringify(json)),
                    });
                }
            }
        ).catch((error)=> {  //读取操作失败
            //没有网络就直接调到登录界面
        })
    }
}

var styles = StyleSheet.create({
  container:{
      flex:1,
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


