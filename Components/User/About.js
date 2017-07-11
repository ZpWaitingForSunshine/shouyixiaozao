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
} from 'react-native';

var {width, height} = Dimensions.get('window');

export default class About extends Component {
    constructor(props) {  
        super(props);
        this.state = {};
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
                        <Text style={{color:'white',fontSize:16, fontWeight:'bold'}}>关于我们</Text>
                    </View>
                    <View style={{width:width/3}}>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.spaceling}></View>
                    <View style={styles.spaceling}></View>
                    <View style={styles.spaceling}></View>
                    <View style={styles.spaceling}></View>
                    <Image source={require('./img/144.png')}></Image>
                    <View style={styles.spaceling}></View>
                    <View style={styles.spaceling}></View>
                    <Text>兽医小灶</Text>
                    <View style={styles.spaceling}></View>
                    <Text>V2.0.1</Text>
                    <View style={styles.spaceling}></View>
                    <Text>前往官网 www.wevet.cn 查看更多</Text><View style={styles.spaceling}></View>
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
})

module.exports = About;