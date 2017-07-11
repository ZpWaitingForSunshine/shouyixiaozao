import React, { Component } from 'react';
import {  
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    BackAndroid,
    Dimensions,
    FlatList,
    ActivityIndicator,
    ScrollView,
    AnimatedFlatList,
    RefreshControl,
    TouchableOpacity,
    Navigator,
    
} from 'react-native';

var start = 0
var offset = 10
// import TabView from 'react-native-scrollable-tab-view';

// var ScrollableTabView = require('react-native-scrollable-tab-view');

// import PullList from 'react-native-pull';

var {width, height} = Dimensions.get('window');

// import Tab from './TabView'
// import EssayCell from './EssayCell'
import TopView from './../Index/Adv/Adv.js'

import NewsCell from './NewsCell'


export default class List1 extends Component {
    constructor(props) {  
        super(props);
        this.state = {
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray: [],
            message:'点击加载',
            start: 0,
            flag:true,
        };
    }
    componentDidMount() {
       //请求数据
        this.fetchData(1,'all',10);
        BackAndroid.addEventListener('hardwareBackPress', ()=> {
            this._back();
            return true;
        });
    }

    componentWillUnmount() {
        start = 0
        BackAndroid.removeEventListener('hardwareBackPress',()=>{});
    }

    fetchData=(start,type,num)=>{
        var url = 'http://api.wevet.cn/index.php/Home/ApiArticle'
        let formData = new FormData();
        formData.append("action","getArticle");
        formData.append("type",'执兽考试');
        formData.append("start",start==0?0:this.state.start);
        formData.append("offset",num);
        fetch(url,{
                method:'POST',
                headers:{
            },
                body:formData,
            })  
            .then((response) => response.json())
            .then((responseData)=>{
                if(responseData.code == 99999){
                    let data = responseData.data;
                    let dataBlob = (start == 0?[]:this.state.dataArray)
                    let i = 0;
                    data.map((item)=> {
                        dataBlob.push({
                            key: item.id,
                            value: item,
                        })
                        i++;
                    });
                    this.setState({
                        //复制数据源
                        dataArray: dataBlob,
                        isLoading: false,
                        start: start == 0?10:this.state.start + 10,
                        message: i < num?"全部加载完毕":'点击加载',
                        flag: i < num?false:true,
                    });
                    data = null;
                    dataBlob = null;
                }else{
                    this.setState({
                        //复制数据源
                        isLoading: false,
                    });
                }
            }) 
            .catch((error)=>{
                this.setState({
                    //复制数据源
                    isLoading: false,
                });
            })
            .done();
    }

    //返回itemView
    renderItemView = ({item})=> {
        // console.log(item)
        return (
            <NewsCell
                id={item.value.id}
                img ={item.value.img}
                title ={item.value.title}
                author = {item.value.author}
                time = {item.value.time}
                times_read = {item.value.times_read}
                type = {item.value.type}
                istop = {item.value.istop}
                navigator={this.props.navigator}
            ></NewsCell>
        );
    }

    _header = () => {
        return <View>
        </View>;
    }
    _footer = () => {
        if(!this.state.flag)
            return <View style={{margin:10}}><Text style={{alignSelf:'center',fontSize:18}}>{this.state.message}</Text></View>;
        else{
            return <View style={{margin:10}}>
                <TouchableOpacity onPress={()=>{if(this.state.flag);this.setState({isLoading:true});this.fetchData(1,'all',10) }}>
                    <View><Text style={{alignSelf:'center',fontSize:18}}>{this.state.message}</Text></View>
                </TouchableOpacity>
            </View>
        }
    }
    _separator = () => {
        return <View style={{ height: 2, }}/>;
    }
    
    render(){
        console.log(this.state.dataArray)
      return (
        <View style={{flex:1}}>
            {/*header*/}
            <View style={{height:44,backgroundColor:'#1E90FF',flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{width:width/3,flexDirection:'row',alignItems:'center',paddingLeft:8,}}>
                        <TouchableOpacity onPress={()=>{this._back()}}>
                            <Image style={{height:30,width:30,}} source={require('./images/back.png')}></Image>
                        </TouchableOpacity>
                    </View>
                <View style={{width:width/3,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:16, fontWeight:'bold'}}>执兽考试</Text>
                </View>
                <View style={{width:width/3}}>
                </View>
            </View>
            {/*广告*/}
            <TopView/>
            <View>
                <Text></Text>
                {/*<Text></Text>*/}
            </View>
            {/*flatList*/}
            {/*{this.renderFlatList()}*/}
            <FlatList
                ref={(flatList) => this._flatList = flatList}
                ListHeaderComponent={this._header}
                ListFooterComponent={this._footer}
                ItemSeparatorComponent={this._separator}
                refreshing={this.state.isLoading}
                onRefresh={()=>this.fetchData(0,'all',10)}
                renderItem={this.renderItemView}
                onEndReachedThreshold={0.5}
                onEndReached={(info) => {
                    if(this.state.flag)
                        this.setState({
                            isLoading:true
                        })
                    this.fetchData(1,'all',10) // 0是没用的
                }}
                data={this.state.dataArray}
                >
            </FlatList>
        </View>
      )
    }

    _back=()=>{
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }
}

var styles = StyleSheet.create({
  container:{
      flex:1,
  },
  contentViewStyle:{
        width : width
    },
  category: {
        backgroundColor: '#EBEBEB',
        flex: 1
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
    menu:{
        width:width/2,
        height:width/4,
        flexDirection:'row',
        backgroundColor:'#E8E8E8',
        alignItems:'center',
        justifyContent:'space-around',
        padding:10
        
    },
    menuimage:{
        width:width/4-20,
        height:width/4-20,
    },
    menuimagedetail:{
        width:width/4-20,
        height:width/4-20,
        resizeMode:"contain",
    },
    text1:{
        fontSize:18,
        color:'#FFA500',
    },
    text2:{
        fontSize:18,
        color:'#4876FF',
    },
    centerline:{
         height:width/4,
         width:1,
         backgroundColor:'#E8E8E8',
         paddingTop:10,
         paddingBottom:10,
    },
    centerlinecontent:{
        backgroundColor:'#cccccc',
        height:width/4-20,
        width:1,
    },
    title: {
        fontSize: 15,
        color: 'blue',
    },
    content: {
        fontSize: 15,
        color: 'black',
    }
})

module.exports = List1;


