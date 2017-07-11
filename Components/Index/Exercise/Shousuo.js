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
var Global = require('./../../Common/Global')
import QCell from './QCell'
export default class Shousuo extends Component {
    constructor(props) {  
        super(props);
        this.state = {
            flag:1,
            show:1,//flag是展开没展开
            eNow:this.props.now,//偏移量
            eSum:this.props.sum,//[102,101,64,59,100,75,138,207,139,40,110,163,203,107,95],//科目总数
            list:this.props.item,//列表
            phone:this.props.phone,
        };
    }
    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            eSum:nextProps.sum,//[102,101,64,59,100,75,138,207,139,40,110,163,203,107,95],//科目总数
            eNow:nextProps.now,
        });
    }
    render() {
        return (
            <View>
                {/*收缩*/}
                <View style={{marginTop:2}}>
                    <TouchableOpacity onPress={()=>this._show()}>
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
            for(var i in this.props.item){
                   list.push(<QCell
                            navigator={this.props.navigator}
                            key={this.props.item[i].id}
                            sum={this.state.eSum[this.props.item[i].id]}
                            now={this.state.eNow[this.props.item[i].id]}
                            name={this.props.item[i].name}
                            phone={this.props.phone}
                            id={this.props.item[i].id}>
                    </QCell>);
                    /*list.push(<View key={this.props.item[i].id}>
                        <Text>{this.props.sum[this.props.item[i].id]+""}</Text>
                        <Text>{this.props.now[this.props.item[i].id]+""}</Text>
                        <Text>{this.props.item[i].name}</Text>
                    </View>);*/
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
module.exports = Shousuo;