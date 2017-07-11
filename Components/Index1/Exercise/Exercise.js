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
  Animated,
  Easing,
  ScrollView,
  Platform,
} from 'react-native';

var ViewPager = require('react-native-viewpager');
var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
import Index from '../Index'
import QuestionCell from './QuestionCell'
import Cell from './Cell'

 var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
    });
var currentPage = 0
var now
var arr;
// var Main = require('./Components/Main/Main');
export default class Exercise extends Component {
    constructor(props) {  
        super(props);
        
       
        this.state = {
            sum: this.props.sum,//类别的总量
            now: this.props.now,//现在做到的题目偏移量
            type:this.props.type,//题目的id
            idtree: this.props.idtree,
            dataArr:this._initDataArr(),
            dataSource: dataSource.cloneWithPages(this._initDataArr()),
            name:this.props.name.split('.')[1],
            update:1,
        };
        now = this.props.now;
        arr = this._initDataArr();
    }
    componentDidMount() {
        
    }
    componentWillUnmount() {
        currentPage = 0
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderNavBar()}
                  <ViewPager
                    style={{ height: height,}}
                    dataSource={this.state.dataSource}
                    renderPage={this._renderPage}
                    isLoop={true}
                    
                    autoPlay={false}
                    animation = {(animatedValue, toValue, gestureState) => {
                        var num = gestureState.vx;
                        var velocity = Math.abs(num);
                        var baseDuration = 300;
                        var duration = (velocity > 1) ? 1/velocity * baseDuration : baseDuration;
                        this._changeDataArr(toValue);
                        return Animated.timing(animatedValue,
                        {
                            toValue: toValue,
                            duration: duration,
                            easing: Easing.out(Easing.exp)
                        });
                    }}/>
            </View>
        );
    }

    

    _renderPage = (data, pageID) => {
        
        return (
            <ScrollView 
                >
                <View >
                    {/*<QuestionCell
                        id={JSON.parse(this.props.idtree)[this.props.type][data-1]}
                        type={this.props.type}
                        keykey = {data}
                        length = {JSON.parse(this.props.idtree)[this.props.type].length}
                        update = {this.state.update}
                        ></QuestionCell>*/}
                    {/*<Cell
                        ii = {this.state.dataSource}
                        id={JSON.parse(this.state.idtree)[this.props.type][data-1]}
                        update = {this.state.update}
                    ></Cell>*/}
                    <Text>当前的偏移量：{data}</Text>
                    <Text>当前的页面：{pageID}</Text>
                    <Text>now：{now}</Text>
                </View>
            </ScrollView>
        );
    }
    


    //初始化arr
    _initDataArr = () => {
        // var sum = JSON.parse(this.props.idtree)[this.props.type].length;
        var sum = this.props.sum;
        var now = this.props.now;
        if(now == sum){
            return [now,1,now-1]
        }else if(now == 1 ){
            return [1,1+1,sum]
        }else return [now,now+1,now-1]
        
    }
    //改变arr
    _changeDataArr= (v) => {
        // var sum = JSON.parse(this.props.idtree)[this.props.type].length;
        var sum = this.state.sum;
        if(v == 0){//左移动
            temp = (currentPage+1)%3;//求要改变的页
            currentPage = (currentPage+2)%3;
            now = now -1 == 0?sum:now-1
            arr[temp] = now-1==0?sum:now-1
        }else if(v == 2){
            temp = (currentPage+2)%3;
            currentPage = (currentPage-2+3)%3;
            now = now==sum?1:now+1
            arr[temp] = now ==sum?1:now+1
        }
        this.setState({
            dataSource: dataSource.cloneWithPages(arr),
            dataArr:arr,
            update: 0
        })
    }

    renderNavBar=()=>{
        let collectimg = this.state.isRender ? require('../img/collect.png') : require('../img/collectb.png');
        return(
            <View style={styles.navOutViewStyle}>
                <TouchableOpacity style={styles.leftViewStyle} onPress={()=>this._back()}>
                    {/*返回键*/}
                    <Image source={require('../img/back.png')} style={styles.navImageStyle}/>
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
                            <Image source={require('../img/share.png')} style={styles.navImageStyle}/>
                        </TouchableOpacity>
                    </View>
                   
                </View>
            </View>
        )
    }

    _back = () => {
        const { navigator } = this.props;
        if(navigator) {
            navigator.popToTop();
        }
    }

    //
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        height:height,
        // backgroudColor:"#bfbfbf"
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