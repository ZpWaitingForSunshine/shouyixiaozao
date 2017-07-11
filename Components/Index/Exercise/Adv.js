import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import ViewPager from 'react-native-viewpager';
var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
var url = "http://api.wevet.cn/Api/Main";
// const BANNER_IMGS = [];  
var dataSource = new ViewPager.DataSource({
    pageHasChanged: (p1, p2) => p1 !== p2,
});
const BANNER_IMGS = [];
export default class Adv extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        dataSource: dataSource.cloneWithPages(BANNER_IMGS),
        dataUrl:""
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
                newData = [];
                newNav = [];
                for(var i in responseData.data){
                    newData.push({url:responseData.data[i].url});
                    newNav.push({url:responseData.data[i].web});
                }
                this.setState({
                    dataSource:dataSource.cloneWithPages(newData),
                    dataUrl:newNav,
                });
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
                    style={{ height: width / 960 *150}}
                    dataSource={this.state.dataSource}
                    renderPage={this._renderPage}
                    isLoop={true}
                    autoPlay={true}/>
        </View>
    )
  }

  _renderPage=(data, pageID) => {
        return (
            <TouchableOpacity 
                onPress={()=>{this._toAdv(pageID)}}
                style={styles.adv}>
                <Image
                    source={{uri: ''+data.url}}
                    style={styles.page}/>
            </TouchableOpacity>
        );  
    }

    //去广告
   _toAdv = (pageID)=>{
        Linking.openURL(this.state.dataUrl[pageID].url)  
            .catch((err)=>{
                console.log('An error occurred', err);  
            }); 
    }
}

const styles = StyleSheet.create({
    container: {
        height:width / 960 *150,
        width:width,
    },
    adv:{
        height:width / 960 *150,
        width:width,
    },
    page: {
        resizeMode: 'stretch',
        height:width / 960 *150, 
        width:width,
    }  
});


module.exports = Adv;