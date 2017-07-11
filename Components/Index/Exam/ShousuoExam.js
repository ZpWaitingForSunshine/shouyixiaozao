import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

urlLogin="http://api.wevet.cn/Api/Login";
var url="http://api.wevet.cn/Api/Login/";
import ECell from './ECell'
export default class ShousuoExam extends Component {
    constructor(props) {  
        super(props);
        this.state = {
            flag:1,
            show:1,
        };
    }
    componentDidMount() {
        
    }

    render() {
        return (
            <View>
                {/*收缩*/}
                <View style={{marginTop:2}}>
                    <TouchableOpacity onPress= {()=>this._show()}>
                        <View style={{flexDirection:'row', alignItems:'center',height:40}}>
                            <Image 
                                source={this.state.show == 0?require('./../img/add.png'):require('./../img/sub.png')} 
                                style={{width:20, height:20, marginLeft:10}}/>
                            <Text style={{marginLeft:8,fontSize:20}}>{this.props.name}</Text>
                        </View>
                    </TouchableOpacity>
                    {/*具体科目*/}
                    {this._renderList()}
                </View>
            </View>
        );
    }
    //渲染科目
    _renderList = () => {
        if(this.state.flag == 1){
            var list =[];
            for(var i= 0;i < 4; i++){
                   list.push(<ECell
                            phone = {this.props.phone}
                            key ={i}
                            navigator={this.props.navigator}
                            name={'模拟卷第'+(i+1)+'套'}
                            id={i}>
                    </ECell>);
            }
            return (
                <View>
                    {list}
                </View>)
        }else{
            return null
        }
    }
    //渲染展开与否
    _show = () => {
        this.setState({
            show:1-this.state.show
        })
        this.setState({
            flag:1-this.state.flag
        })
    }
}
module.exports = ShousuoExam;