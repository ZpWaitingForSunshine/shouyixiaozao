import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  WebView,
  Platform,
  BackAndroid,
  RefreshControl,
} from 'react-native';

const HTML1 = '<!DOCTYPE html><html><head><meta name=”viewport” content=”width=device-width, initial-scale=1, maximum-scale=1″></head><body>'
const HTML2 = '</body></html>'

var {width, height} = Dimensions.get('window');

export default class NewsView extends Component {
    constructor(props) {  
        super(props);
        this.state = {
            id:this.props.id,
            title: this.props.title,  // 标题
            author: this.props.author,
            time: this.props.time,
            readnum: this.props.readnum,
            sort: this.props.sort,
            content: '',
        };
    }
    componentDidMount() {
        this.fetchData()
        BackAndroid.addEventListener('hardwareBackPress', ()=> {
            this._back();
            return true;
        });
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress',()=>{});
    }

    changeTime = (time) => {
        var d = new Date();
        d.setTime(time * 1000);
        return (d.getFullYear()) + "-" + 
           (d.getMonth() + 1) + "-" +
           (d.getDate()) + " " + 
           (d.getHours()) + ":" + 
           (d.getMinutes()) + ":" + 
           (d.getSeconds());
    }

    fetchData=()=>{
        var url = 'http://api.wevet.cn/index.php/Home/ApiArticle'
        let formData = new FormData();
        formData.append("action","getContent");
        formData.append("id",this.state.id);
        fetch(url,{
                method:'POST',
                headers:{
            },
                body:formData,
            })  
            .then((response) => response.json())
            .then((responseData)=>{
                if(responseData.code == 99999){
                    this.setState({
                        content: responseData.data.content,
                    })
                }else{
                    
                }
            }) 
            .catch((error)=>{
                
            })
            .done();
    }
    
    render() {
        return (
            <View style={{flex:1,}}
                >
                {/*nav*/}
                <View style={{height:44,backgroundColor:'#1E90FF',flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{width:width/3,flexDirection:'row',alignItems:'center',paddingLeft:8,}}>
                            <TouchableOpacity onPress={()=>{this._back()}}>
                            <Image style={{height:30,width:30,}} source={require('./images/back.png')}></Image>
                        </TouchableOpacity>
                        </View>
                    <View style={{width:width/3,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontSize:16, fontWeight:'bold'}}>{this.state.sort}</Text>
                    </View>
                    <View style={{width:width/3}}>
                    </View>
                </View>
                <View>
                    <Text style={{marginLeft:8,marginTop:7,fontSize:25,color:'black'}}>{this.state.title}</Text>
                </View>
                <View style={styles.containershowb}>
                    <Text style={{marginLeft:8,fontSize:12}}>作者</Text>
                    <Text style={{marginLeft:4,fontSize:12}}>{this.props.author}</Text>
                    <Text style={{marginLeft:8,fontSize:12}}>时间</Text>
                    <Text style={{marginLeft:4,fontSize:12}}>{this.changeTime(this.props.time)}</Text>
                </View>
                {/*content*/}
                {/*<Text>{this.state.content}</Text>*/}
                <WebView
                    style={{
                        flex:1,
                        width:width-10,
                        marginRight:5,
                        marginLeft:5,
                    }}
                    source = {{html:HTML1+this.state.content+HTML2}}>
                ></WebView>
            </View>
        );
    }
    _back=()=>{
        this.props.navigator.pop();
    }
}

const styles = StyleSheet.create({
    containershowb:{
        height:Platform.OS == 'ios' ? 40: 30,
        flexDirection:'row',
        alignItems:'center', 
    },

});
module.exports = NewsView;