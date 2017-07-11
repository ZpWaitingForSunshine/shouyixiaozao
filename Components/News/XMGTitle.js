/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    AsyncStorage,
    ProgressViewIOS,
    ProgressBarAndroid,
    ActivityIndicator,
    ScrollView,
    BackAndroid,
    ToastAndroid,
    ListView,
    WebView
} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Tab = require('./TabView');
var EssayCell = require('./EssayCell');
var TopView = require('../Home/XMGTopView');

import TabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import {PullList} from 'react-native-pull';

/**----导入外部的组件类---**/


var Title = React.createClass({

    getInitialState(){
        return{
            aaa : "",
            bbb : false,
            ccc : false,
            ddd : false,
            get1: 10,
            get2: 10,
            get3: 10,
            nomore1: false,
            nomore2: false,
            nomore3: false,
            dataSource1: "",
            data1: "",
            dataSource2: "",
            dataSource3: ""
        }
    },


    componentWillMount(){
        {this.getpicListAsync()};
        {this.getpicListAsync1()};
        {this.getpicListAsync2()};
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    },


    componentWillUnmount() {

             BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);

    },

    onBackAndroid  ()  {

               if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {

               //最近2秒内按过back键，可以退出应用。

              return false;

            }

    this.lastBackPressed = Date.now();

    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);

    return true;

    },

    getEssay1(type , num) {
      var ds = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2});
      var html = "action=getArticle&accesstoken=hh&type="+type+"&start="+num+"&offset="+5;
      fetch('http://api.wevet.cn/index.php/Home/ApiArticle', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: html
      }).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.data.length > 0){
            for (var i = 0; i < responseJson.data.length; i++) {
              this.state.data1.push(responseJson.data[i]); 
            }; }else{
              this.setState({nomore1 : false})
            };
            if(responseJson.data.length < 5){
            this.setState({nomore1 : false})
            }     
          })       
        .catch((error) => {
          console.error(error);
      }) 
    },

    getEssay2(type , num) {
      var ds = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2});
      var html = "action=getArticle&accesstoken=hh&type="+type+"&start="+num+"&offset="+5;
      fetch('http://api.wevet.cn/index.php/Home/ApiArticle', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: html
      }).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.data.length > 0){
            for (var i = 0; i < responseJson.data.length; i++) {
              this.state.data1.push(responseJson.data[i]); 
            }; }else{
              this.setState({nomore1 : false})
            };
            if(responseJson.data.length < 5){
            this.setState({nomore1 : false})
            }     
          })       
        .catch((error) => {
          console.error(error);
      }) 
    },

    getEssay3(type , num) {
      var ds = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2});
      var html = "action=getArticle&accesstoken=hh&type="+type+"&start="+num+"&offset="+5;
      fetch('http://api.wevet.cn/index.php/Home/ApiArticle', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: html
      }).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.data.length > 0){
            for (var i = 0; i < responseJson.data.length; i++) {
              this.state.data1.push(responseJson.data[i]); 
            }; }else{
              this.setState({nomore1 : false})
            };
            if(responseJson.data.length < 5){
            this.setState({nomore1 : false})
            }     
          })       
        .catch((error) => {
          console.error(error);
      }) 
    },

    getpicListAsync() {
      var ds = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2});

      fetch('http://api.wevet.cn/index.php/Home/ApiArticle', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "action=getArticle&accesstoken=hh&type=all&start=0&offset=10"
      }).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.data.length > 0){
          this.setState({
            data1 : responseJson.data,
            bbb : true,
            dataSource1 : ds.cloneWithRows(responseJson.data)
          })};
      })
        .catch((error) => {
          console.error(error);
      }) 
    },

    getpicListAsync1() {
      var ds = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2});

      fetch('http://api.wevet.cn/index.php/Home/ApiArticle', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "action=getArticle&accesstoken=hh&type=执兽考试&start=0&offset=10"
      }).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.data.length > 0){
          this.setState({
            data2 : responseJson.data,
            ccc : true,
            dataSource2 : ds.cloneWithRows(responseJson.data)
          })};
      })
        .catch((error) => {
          console.error(error);
      }) 
    },

    getpicListAsync2() {
      var ds = new ListView.DataSource({rowHasChanged:(row1, row2) => row1 !== row2});

      fetch('http://api.wevet.cn/index.php/Home/ApiArticle', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "action=getArticle&accesstoken=hh&type=业内动态&start=0&offset=10"
      }).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.data.length > 0){
          this.setState({
            data3 : responseJson.data,
            ddd : true,
            dataSource3 : ds.cloneWithRows(responseJson.data)
          })};
      })
        .catch((error) => {
          console.error(error);
      }) 
    },

    renderRow(rowdata){
        return(
          <View style={{marginTop:2}}>
            <EssayCell 
                title={rowdata.title}
                img={rowdata.img}
                author={rowdata.author}
                time={rowdata.time}
                readnum={rowdata.times_read}
                sort={rowdata.type}
                id={rowdata.id}
                isTop={rowdata.istop}
                navigator={this.props.navigator}
            />
          </View>
        );
    },

    renderFooter1() {
      if(!this.state.nomore1) {
        return(
          <TouchableOpacity onPress={this.loadMore1.bind(this)}>
          <View style={{height: 20 , alignItems:'center',justifyContent:'center'}}>
              <Text>点击加载更多</Text> 
          </View>
          </TouchableOpacity>
          )
      }else{
      return (
          <View style={{height: 100}}>
              <ActivityIndicator />
          </View>
      );}
    },

    renderFooter2() {
      if(!this.state.nomore2) {
          return(
          <TouchableOpacity onPress={this.loadMore2.bind(this)}>
          <View style={{height: 20 , alignItems:'center',justifyContent:'center'}}>
              <Text>点击加载更多</Text> 
          </View>
          </TouchableOpacity>
          )
      }else{
      return (
          <View style={{height: 100}}>
              <ActivityIndicator />
          </View>
      );}
    },

    renderFooter3() {
      if(!this.state.nomore3) {
          return(
          <TouchableOpacity onPress={this.loadMore3.bind(this)}>
          <View style={{height: 20 , alignItems:'center',justifyContent:'center'}}>
              <Text>点击加载更多</Text> 
          </View>
          </TouchableOpacity>
          )
      }else{
      return (
          <View style={{height: 100}}>
              <ActivityIndicator />
          </View>
      );}
    },

    loadMore1() {
      this.setState({nomore1 : true});
        this.getEssay1('all' , this.state.get1);
        var num = this.state.get1 + 5;
        setTimeout(() => {
            this.setState({
                get1: num,
                dataSource1: this.state.dataSource1.cloneWithRows(this.state.data1)
            });
        }, 1500);
    },

    loadMore2(type) {
        this.getEssay2('执兽考试' , this.state.get2);
        setTimeout(() => {
            this.setState({
                get1: this.state.get2 + 5 ,
                dataSource2: this.state.dataSource2.cloneWithRows(this.state.data2)
            });
        }, 1000);
    },

    loadMore3(type) {
        this.getEssay3('业内动态' , this.state.get3);
        setTimeout(() => {
            this.setState({
                get1: this.state.get3 + 5 ,
                dataSource3: this.state.dataSource3.cloneWithRows(this.state.data3)
            });
        }, 1500);
    },

    onPullRelease1(resolve) {
    //do something
    setTimeout(() => {
            resolve();
            {this.getpicListAsync()};
            this.setState({get1 : 10});
        }, 3000);
    },

    onPullRelease2(resolve) {
    //do something
    setTimeout(() => {
            resolve();
            {this.getpicListAsync1()};
            this.setState({get2 : 10});
        }, 3000);
    },

    onPullRelease3(resolve) {
    //do something
    setTimeout(() => {
            resolve();
            {this.getpicListAsync2()};
            this.setState({get3 : 10});
        }, 3000);
    },


  topIndicatorRender(pulling, pullok, pullrelease) {
    return <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
      <ActivityIndicator size="small" color="gray" />
      {pulling ? <Text>玩命加载中...</Text> : null}
      {pullok ? <Text>玩命加载中...</Text> : null}
      {pullrelease ? <Text>玩命加载中...</Text> : null}
    </View>;
  },

  isShow(a){
    if(a){
      return(
        <PullList
              style={{}}
              onPullRelease={this.onPullRelease1} topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={60}
              dataSource={this.state.dataSource1}
              pageSize={5}
              initialListSize={5}
              renderRow={this.renderRow}
              onEndReachedThreshold={60}
              renderFooter={this.renderFooter1}
              />     
        )
    }else{
      <View style={{height: 100}}>
              <ActivityIndicator />
      </View>
    }
  },

  isShow1(a){
    if(a){
      return(

            <PullList
              style={{}}
              onPullRelease={this.onPullRelease2} topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={60}
              dataSource={this.state.dataSource2}
              pageSize={5}
              initialListSize={5}
              renderRow={this.renderRow}
              onEndReachedThreshold={60}
              renderFooter={this.renderFooter2}
              /> 
              
        )
    }else{
      <View style={{height: 100}}>
              <ActivityIndicator />
      </View>
    }
  },

  isShow2(a){
    if(a){
      return(

            <PullList
              style={{}}
              onPullRelease={this.onPullRelease3} topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={60}
              dataSource={this.state.dataSource3}
              pageSize={5}
              initialListSize={5}
              renderRow={this.renderRow}
              onEndReachedThreshold={60}
              renderFooter={this.renderFooter3}
              /> 
             
        )
    }else{
      <View style={{height: 100}}>
              <ActivityIndicator />
      </View>
    }
  },

    render() {
        return (
            <View style={styles.container}>
                {/*首页的导航条*/}
                {this.renderNavBar()}

                <TabView                    
                  renderTabBar={() => <DefaultTabBar/>}>
                  <View style={styles.category} tabLabel='综合'>
                      <TopView 
                      navigator={this.props.navigator}/>
                      {this.isShow(this.state.bbb)}
                    

                  </View>

                  <View style={styles.category} tabLabel='执兽考试'>
                    <TopView 
                    navigator={this.props.navigator}/>
                      {this.isShow1(this.state.ccc)}
                  </View>

                  <View style={styles.category} tabLabel='业内动态'>
                    <TopView 
                    navigator={this.props.navigator}/>
                      {this.isShow2(this.state.ddd)}
                  </View>

                </TabView>
                
               
            </View>
        );
    },
    
    // 首页的导航条
    renderNavBar(){
        return(
            <View style={styles.navBarStyle}>
                {/*左边*/}
                <TouchableOpacity onPress={()=>{this.pushToDetail()}}>
                  <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>文章</Text>
                </TouchableOpacity>
        
            </View>
        )
    },

    
});


const styles = StyleSheet.create({
    navBarStyle:{ // 导航条样式
        height: Platform.OS == 'ios' ? 64 : 44,
        backgroundColor:'#1E90FF',

        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center',

        // 设置主轴的对齐方式
        justifyContent:'space-around'
    },

    contentViewStyle:{
        width : width
    },

    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    category: {

        backgroundColor: '#EBEBEB',
        flex: 1
    },


    
});

// 输出组件类
module.exports = Title;
