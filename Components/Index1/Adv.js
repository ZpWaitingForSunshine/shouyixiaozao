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
  Linking
} from 'react-native';
import Swiper from 'react-native-swiper';
var ViewPager = require('react-native-viewpager');
var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
var url = "http://api.wevet.cn/Api/Main";

const dataArr = [require('./img/1.jpg'),require('./img/2.jpg')];
var dataSource = new ViewPager.DataSource({
        pageHasChanged: (p1, p2) => p1 !== p2,
    });
export default class Adv extends Component {
  constructor(props) {  
    super(props); 
    var dataUrl =[];
    dataUrl.push({url:'http://www.baidu.com'});
    dataUrl.push({url:'http://www.baidu.com'});
    this.state = {
        dataSource: dataSource.cloneWithPages(dataArr),//图片
        dataUrl:dataUrl,//导航图片的指引
    }
  }
  componentDidMount() {
      //获得广告
    let formData = new FormData();
    formData.append("action","getAdv");
    fetch(url,{
            method:'POST',
            headers:{
        },  
            body:formData,
        })  
        .then((response) => response.json())
        .then((responseData)=>{
            if(responseData.code == '99999'){
                // console.log(responseData.data);
                newData = [];
                newNav = [];
                for(var i in responseData.data){
                    newData.push({url:responseData.data[i].url});
                    newNav.push({url:responseData.data[i].web});
                }
                this.setState({dataSource:dataSource.cloneWithPages(newData)});
                this.setState({dataUrl:newNav});
            }
            else{
            }
        })  
        .catch((error)=>{
            console.log("error"+error)
        });
  }
  render(){
    return (
        <View style={styles.container}>
                <ViewPager
                    style={{ height: 150 }}
                    dataSource={this.state.dataSource}
                    renderPage={this._renderPage}
                    isLoop={true}
                    autoPlay={true}/>
        </View>
    )
  }

  _test = ()=>{
      
  }
  //去广告
   _toAdv = (pageID)=>{
        Linking.openURL(this.state.dataUrl[pageID].url)  
            .catch((err)=>{
                console.log('An error occurred', err);  
            }); 
    }

  _renderPage=(data, pageID)=> {
        return (
            <TouchableOpacity 
                onPress={()=>{this._toAdv(pageID)}}
                style={styles.adv}>
                <Image
                    source={data}
                    style={styles.page}/>
            </TouchableOpacity>
            
        );
    }
    

    
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121212',
        height:width / 960 *150,
    },
    adv:{
        height:width / 960 *150, 
        flex: 1,  
    },
    page: {  
       
        // height: 50,  
        // width: width,
        resizeMode: 'stretch',
        height:width / 960 *150, 
        width:width,
    }  
});


module.exports = Adv;