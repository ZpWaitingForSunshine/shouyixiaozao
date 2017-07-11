// 错题的cell

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  EditView,
  Dimensions,
  ActivityIndicator,
  AsyncStorage,
  Platform,
  TouchableOpacity,
  Navigator,
  ScrollView,
  BackAndroid,
} from 'react-native';

var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
import Toast from './../../Common/toast'
// import Cell from './Cell'
import AnswerView from './AnswerView'
var url = 'http://api.wevet.cn/Api/Exercise'
export default class Collect extends Component {
    constructor(props) {  
        super(props);
        this.state = {
            animatedType: true,
            modalVisible: true,
            transparent: true,
            animating: true,
            idtree:[],
            phone:this.props.phone,
        };
    }
    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', ()=> {
            this._back();
            return true;
        });
        AsyncStorage.getItem('phone').then(
                (result)=>{
                    if(result){
                        let formData = new FormData();
                        formData.append("action","getAllCollections");
                        formData.append("phone",result);
                        fetch(url,{
                                method:'POST',
                                headers:{
                            },  
                                body:formData,
                            })  
                            .then((response) => response.json())
                            .then((responseData)=>{
                                if(responseData){
                                    var arr = []
                                    for(var i = 0 ;i< 15;i++){
                                        arr[i+1]=new Array()
                                    }
                                    for(var i = 0; i< responseData.data.length;i++){
                                        arr[responseData.data[i]['tx_type']].push(responseData.data[i]['tx_id'])
                                    }
                                    this.setState({
                                        idtree:arr,
                                        phone:result,
                                    })
                                }else{
                                    Toast.toastShort('获取失败')
                                }
                        })
                        .catch((error)=>{
                            Toast.toastShort('没有联网/服务器错误')
                        });
                    }
                }
            )
    }
    componentWillUnmount() {
         BackAndroid.removeEventListener('hardwareBackPress',()=>{});
    }
    render() {
        return (
            <View style={{flex : 1,}}>
                <View style={styles.navOutViewStyle}>
                        <TouchableOpacity style={styles.leftViewStyle} onPress={()=>this._back()}>
                            <Image source={require('./../img/back.png')} style={styles.navImageStyle}/>
                        </TouchableOpacity>
                        <Text style={{marginBottom:22, height:30,color:'white', fontSize:16, fontWeight:'bold',alignSelf:'center'}}>我的收藏</Text>
                </View>
                <ScrollView>
                    <TouchableOpacity onPress={()=>this.toCell('法律法规真题','1')}>
                        <View style={styles.list}>
                            <Text style={{color:'gray', marginLeft:10}}>1.法律法规真题</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.toCell('解剖真题','2')}>
                        <View style={styles.list}>
                            <Text style={{color:'gray', marginLeft:10}}>2.解剖真题</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.toCell('生理真题','3')}>
                        <View style={styles.list}>
                            <Text style={{color:'gray', marginLeft:10}}>3.生理真题</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.toCell('生化真题','4')}>
                        <View style={styles.list}>
                            <Text style={{color:'gray', marginLeft:10}}>4.生化真题</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.toCell('病理真题','5')}>
                        <View style={styles.list}>
                            <Text style={{color:'gray', marginLeft:10}}>5.病理真题</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.toCell('药理真题','6')}>
                        <View style={styles.list}>
                            <Text style={{color:'gray', marginLeft:10}}>6.药理真题</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.toCell('微生物真题','7')}>
                        <View style={styles.list}>
                            <Text style={{color:'gray', marginLeft:10}}>7.微生物真题</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.toCell('传染病真题','8')}>
                        <View style={styles.list}>
                            <Text style={{color:'gray', marginLeft:10}}>8.传染病真题</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.toCell('寄生虫真题','9')}>
                        <View style={styles.list}>
                            <Text style={{color:'gray', marginLeft:10}}>9.寄生虫真题</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.toCell('公共卫生真题','10')}>
                        <View style={styles.list}>
                            <Text style={{color:'gray', marginLeft:10}}>10.公共卫生真题真题</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.toCell('临诊真题','11')}>
                        <View style={styles.list}>
                            <Text style={{color:'gray', marginLeft:10}}>11.临诊真题</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.toCell('内科真题','12')}>
                        <View style={styles.list}>
                            <Text style={{color:'gray', marginLeft:10}}>12.内科真题</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.toCell('外科真题','13')}>
                        <View style={styles.list}>
                            <Text style={{color:'gray', marginLeft:10}}>13.外科真题</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.toCell('产科真题','14')}>
                        <View style={styles.list}>
                            <Text style={{color:'gray', marginLeft:10}}>14.产科真题</Text>
                        </View>
                    </TouchableOpacity>
                     <TouchableOpacity onPress={()=>this.toCell('中兽医真题','15')}>
                        <View style={styles.list}>
                            <Text style={{color:'gray', marginLeft:10}}>15.中兽医真题</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
    //返回
    _back = () => {
        const { navigator } = this.props;
        if(navigator) {
            navigator.popToTop();
        }
    }
    // 去题目中
    toCell=(name,type)=>{
        const { navigator } = this.props;
        var arr = [];
        for(var i = 0; i< this.state.idtree[type+""].length; i++){
            arr.push('第'+(i+1)+"题")
        }

        if(navigator && this.state.idtree[type].length > 0) {
            navigator.push({
                name: '题目',
                component: AnswerView,
                // gestures: Navigator.SceneConfigs.PushFromRight.gestures,
                gestures: null,
                params:{
                    itemArr:arr,
                    sum:this.state.idtree[type].length,
                    now: 1,
                    type: type,
                    name:this.props.name,
                    idtree:this.state.idtree[type],
                    phone:this.props.phone,
                }
            })
        }else{
            alert("没有收藏的题目或者没有联网")
        }
    }


}
const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
  list:{
    justifyContent: 'center',
    height:40,
    borderBottomColor:'#dddddd',
    borderBottomWidth:0.5,
  },
  navImageStyle:{
        width:Platform.OS == 'ios' ? 28: 24,
        height:Platform.OS == 'ios' ? 28: 24,
    },

    rightViewStyle:{
        // 绝对定位
        position:'absolute',
        right:10,
        bottom:Platform.OS == 'ios' ? 15:13
    },
    navOutViewStyle:{
        height: Platform.OS == 'ios' ? 64 : 44,
        backgroundColor:'#1E90FF',
        paddingTop:Platform.OS == 'ios' ? 20 : 30,
        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center',
        // 主轴方向居中
        justifyContent:'center'
    },

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    leftViewStyle:{
        // 绝对定位
        position:'absolute',
        left:10,
        flexDirection:'row',

        bottom:Platform.OS == 'ios' ? 10:10
    },
    quit:{
        height:Platform.OS == 'ios' ? 40: 40,
        backgroundColor:'white',
        borderBottomColor:'#dddddd',
        borderBottomWidth:0.5,
        // 垂直居中
        alignItems:'center',
        justifyContent:'center'
    }
});
module.exports = Collect;