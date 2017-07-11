import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  BackAndroid,
  Navigator,
  Dimensions,
  TextInput,
  Platform,
  
} from 'react-native';

var {width, height} = Dimensions.get('window');

export default class Feedback extends Component {
    constructor(props) {  
        super(props);
        this.state = {
            username:null,
            password:null,
            phone:this.props.phone,

        };
    }
    componentDidMount(){
        BackAndroid.addEventListener('hardwareBackPress', ()=> {
            this._back();
            return true;
        });
    }
    componentWillUnmount() {
         BackAndroid.removeEventListener('hardwareBackPress',()=>{});
    }

    render() {
        return (
            <View>
                {/*header*/}
                <View style={{height:44,backgroundColor:'#1E90FF',flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{width:width/3,flexDirection:'row',alignItems:'center',paddingLeft:8,}}>
                            <TouchableOpacity onPress={()=>{this._back()}}>
                                <Image style={{height:30,width:30,}} source={require('./img/back.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    <View style={{width:width/3,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontSize:16, fontWeight:'bold'}}>反馈</Text>
                    </View>
                    <View style={{width:width/3}}>
                    </View>
                </View>

                {/*反馈*/}
                <View style={styles.container}>
                    <View style={{width:width-20,padding:10}}>
                        <TextInput placeholder={'请详细写下您的建议和感想吧～'} 
                                    style={styles.textInputStyle} 
                                    multiline={true}
                                    maxLength ={10}
                                    underlineColorAndroid= 'transparent' 
                                    onChangeText={(text) => {this.setState({username : text});}}/>
                        <TextInput placeholder={'联系方式：QQ\\微信\\邮箱\\手机'} 
                                    style={styles.textInput} 
                                    underlineColorAndroid= 'transparent' 
                                    onChangeText={(text) => {this.setState({password : text});}}/>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this._feedback()}>
                            <View style={styles.loginBtnStyle}>
                                <Text style={{color:'white'}}>提交</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    _back=()=>{
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop()
        }
    }

    _feedback=()=>{

        if(this.state.username){
            var url = 'http://api.wevet.cn/index.php/Home/ApiOther'
            let formData = new FormData();
            formData.append("action","uploadFeedback");
            formData.append("content",this.state.username);
            formData.append("contact",this.state.password);
            formData.append("phone",this.state.phone);
            fetch(url,{
                    method:'POST',
                    headers:{
                },
                    body:formData,
                })
                .then((response) => response.json())
                .then((responseData)=>{
                    if(responseData.code == 99999){
                       alert("感谢您的反馈")
                       this._back()
                    }else{
                        
                    }
                }) 
                .catch((error)=>{
                    
                })
                .done();
        }
    }



}
const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
    },
    spaceling:{
        height:20,
    },
    navBarStyle:{ // 导航条样式
        height: 44,
        backgroundColor:'#1E90FF',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
     textInputStyle:{
        height:200,
        backgroundColor:'#e8e8e8',
        marginBottom:5,
    },

    textInput:{
        height:40,
        backgroundColor:'#e8e8e8',
        marginBottom:1,
        textAlign:'justify'
    },

    containershowb:{
        height:Platform.OS == 'ios' ? 40: 30,
        backgroundColor:'white',
        borderBottomColor:'#dddddd',
        borderBottomWidth:0,

        flexDirection:'row',
        alignItems:'center',
        
    },
    containershowc:{
        height:Platform.OS == 'ios' ? 40: 30,
        backgroundColor:'white',
        borderBottomColor:'#dddddd',
        borderBottomWidth:0,

        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
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
    loginBtnStyle:{
        height:45,
        width:width*0.9,
        backgroundColor:'#1E90FF',
        marginTop:30,
        marginBottom:20,

        justifyContent:'center',
        alignItems:'center',

        borderRadius:8
    },
})

module.exports = Feedback;