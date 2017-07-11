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
  Linking,
  Platform,
  WebView,
  TextInput,
  ScrollView,
  AsyncStorage,
} from 'react-native';

var ViewPager = require('react-native-viewpager');
var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
var url = 'http://api.wevet.cn/Api/Exercise'
let exData=require('../../Login/Json/1.json');
import Realm from 'realm'
const HTML1 = '<!DOCTYPE html><html><body>'
const HTML2 = '</body></html>'
class Ex {}
Ex.schema = {
    name: 'Ex',
    primaryKey: 'id',
    properties: {
        sx_id: 'int',
        sx_type:'string',
        sx_title: 'string',//小类别
        sx_subject: 'string',//题目
        sx_answera: 'string',
        sx_answerb: 'string',
        sx_answerc: 'string',
        sx_answerd: 'string',
        sx_answere: 'string',
        //正确答案
        sx_answer:'string',
        sx_analyze:'string',
        note:{type: 'string', default: ''},//备注，用json表示用户对应的解析
        last: {type: 'string', default: '无'},//添加默认值的写法
        collect:{type:'int',default:0}
    }
}

class Exam{}
Exam.schema = {
    name: 'Exam',
    primaryKey: 'id',
    properties: {
        id: 'int',
        tureid:{type: 'int', default: ''},//备注，用json表示用户对应的解析
        answer1: {type: 'string', default: '1'},//添加默认值的写法
        answer2:{type:'string',default:'2'}
    }
};

export default class QustionCell extends Component {
    constructor(props) {
        super(props);
        var i = this.props.id
        this.state = {
            id: this.props.id,
            type:exData['RECORDS'][i].sx_type,
            title:exData['RECORDS'][i].sx_title,
            subject:exData['RECORDS'][i].sx_subject,
            a:exData['RECORDS'][i].sx_answera,
            b:exData['RECORDS'][i].sx_answerb,
            c:exData['RECORDS'][i].sx_answerc,
            d:exData['RECORDS'][i].sx_answerd,
            e:exData['RECORDS'][i].sx_answere,
            answer:exData['RECORDS'][i].sx_answer,
            analyze:exData['RECORDS'][i].sx_analyze,
            note:null,
            last:null,
            keykey:this.props.keykey,
            length:this.props.length,
            jiexiRender:false,

            sourcea : require('./../img/aregular.png'),
            sourceb : require('./../img/bregular.png'),
            sourcec : require('./../img/cregular.png'),
            sourced : require('./../img/dregular.png'),
            sourcee : require('./../img/eregular.png'),


            isRender:false,
            noteshow:false,//note是否显示，有东西的时候显示没有不显示
            noteedit:'添加'
        };
    }
    componentDidMount(){

    }
    render(){
        return (
            <ScrollView>
                <View style={styles.idandlabel}>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>
                        {"("+(this.state.keykey+1)+"/"+this.state.length+")"+this.state.title}
                    </Text>
                </View>
                <View style={styles.question1}>
                    <Text style={{fontSize:20}}
                        numberOfLines={10}>
                        {"（单选题）"+this.state.subject}
                    </Text>
                </View>
                <View style={{borderBottomWidth:0}}>
                    <TouchableOpacity onPress = {()=>this.boolAnswer('A')}>
                    <View style={styles.container}>
                        {/*左边*/}
                        <Image source={this.state.sourcea} style={styles.ImageStyle}/>
                        <Text style={{marginLeft:15,fontSize:16,width:width-60}}>
                            {this.state.a}
                        </Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=>this.boolAnswer('B')}>
                    <View style={styles.container}>
                        {/*左边*/}
                        <Image source={this.state.sourceb} style={styles.ImageStyle}/>
                        <Text style={{marginLeft:15,fontSize:16,width:width-60}}>
                            {this.state.b}
                        </Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=>this.boolAnswer('C')}>
                    <View style={styles.container}>
                        {/*左边*/}
                        <Image source={this.state.sourcec} style={styles.ImageStyle}/>
                        <Text style={{marginLeft:15,fontSize:16,width:width-60}}>
                            {this.state.c}
                        </Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=>this.boolAnswer('D')}>
                    <View style={styles.container}>
                        {/*左边*/}
                        <Image source={this.state.sourced} style={styles.ImageStyle}/>
                        <Text style={{marginLeft:15,fontSize:16,width:width-60}}>
                            {this.state.d}
                        </Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=>this.boolAnswer('E')}>
                    <View style={styles.container}>
                        {/*左边*/}
                        <Image source={this.state.sourcee} style={styles.ImageStyle}/>
                        <Text style={{marginLeft:15,fontSize:16,width:width-60}}>
                            {this.state.e}
                        </Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    // 判断答案
    boolAnswer = (data) => {
        // this.props.setArr();    // 修改父亲组件的东西
        this.saveLast(data);    // 保存上次的答案
        this.setState({
            sourcea : require('./../img/aregular.png'),
            sourceb : require('./../img/bregular.png'),
            sourcec : require('./../img/cregular.png'),
            sourced : require('./../img/dregular.png'),
            sourcee : require('./../img/eregular.png'),
        });
        // 写数据库 
        let realm = new Realm({path:"ex7.realm",schema: [Ex,Exam]});
        let exam = realm.objects('Exam');
        realm.write(()=> {
            realm.create('Exam', {
                id: Number(this.state.id),
                tureid:Number(exData['RECORDS'][this.state.id].sx_id),
                answer1:data,
                answer2:exData['RECORDS'][this.state.id].sx_answer,
            },true)
        })
        realm.close()
        switch(data)
        {
            case "A":
                this.setState({sourcea : require('./../img/aright.png')});
                break;
            case "B":
                this.setState({sourceb : require('./../img/bright.png')});
                break;
            case "C":
                this.setState({sourcec : require('./../img/cright.png')});
                break;
            case "D":
                this.setState({sourced : require('./../img/dright.png')});
                break;
            case "E":
                this.setState({sourcee : require('./../img/eright.png')});
                break;
            default:
                break;
        }
    }
    saveLast=(ans)=>{
        let realm = new Realm({path:"ex7.realm",schema: [Ex]});
        realm.write(()=> {
            realm.create('Ex', {
                id: Number(exData['RECORDS'][this.state.id].sx_id),
                last:ans,
            },true)
        })
        realm.close()
    }

    
}
const styles = StyleSheet.create({
    container:{
        height:Platform.OS == 'ios' ? 50: 50,
        backgroundColor:'white',
        borderBottomColor:'#dddddd',
        borderBottomWidth:1,

        flexDirection:'row',
        // 主轴的对齐方式
        //justifyContent:'space-between',
        // 垂直居中
        alignItems:'center'
    },
    ImageStyle:{
        width:Platform.OS == 'ios' ? 30: 30,
        height:Platform.OS == 'ios' ? 30: 30,
        marginLeft:10
    },
    question:{
        backgroundColor:'white'
    },
    idandlabel:{
        height: Platform.OS == 'ios' ? 30 : 30,
        width:width,
        backgroundColor:'#EAEAEA',

        // 设置主轴的方向
        flexDirection:'row',
        // 垂直居中 ---> 设置侧轴的对齐方式
        alignItems:'center',
        // 主轴方向居中
    },

    question1:{
        marginTop:3,
        backgroundColor:'white',
        width:width
    },

    titleStyle:{
        fontSize:Platform.OS == 'ios' ? 14 : 12,
        color:'gray'
    },
    btn: {
        marginTop:10,
        marginLeft:10,
        width: 50,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
        // alignSelf: 'center',
        backgroundColor:'#458B00',
        borderRadius:5,
    },
    notebtn: {
        marginTop:10,
        marginLeft:10,
        height: 22,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    btnText: {
        // width:width/2,
        fontSize: 16,
        color:'#ffffff'
    },
    last:{
        marginTop:3,
        marginLeft:10,
        color:'#B0B0B0'
    }
});
module.exports = QustionCell;