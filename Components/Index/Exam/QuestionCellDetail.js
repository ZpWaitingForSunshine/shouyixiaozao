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
        id: 'int',
        type:'string',
        title: 'string',//小类别
        subject: 'string',//题目
        a: 'string',
        b: 'string',
        c: 'string',
        d: 'string',
        e: 'string',
        //正确答案
        ans:'string',
        analyze:'string',
        note:{type: 'string', default: ''},//备注，用json表示用户对应的解析
        last: {type: 'string', default: '无'},//添加默认值的写法
        collect:{type:'int',default:0}
    }
}
class Exam {}
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

export default class QustionCellDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            type:null,
            title:null,
            subject:null,
            a:null,
            b:null,
            c:null,
            d:null,
            e:null,
            answer:null,
            analyze:null,
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
        var i =this.state.id
        this.setState({
            // id:exData['RECORDS'][i].sx_id,
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
        })
        let realm = new Realm({path:"ex7.realm",schema: [Ex,Exam]});
        let exs = realm.objects('Ex');
        let exam = realm.objects('Exam');
        let result= exs.filtered('id=='+exData['RECORDS'][i].sx_id);
        if (result[0]) {
        }else{
            realm.write(()=> {
                realm.create('Ex',{
                    id: Number(exData['RECORDS'][i].sx_id),
                    type:exData['RECORDS'][i].sx_type,
                    title: exData['RECORDS'][i].sx_title,//小类别
                    subject: exData['RECORDS'][i].sx_subject,
                    //选项
                    a: exData['RECORDS'][i].sx_answera,
                    b: exData['RECORDS'][i].sx_answerb,
                    c: exData['RECORDS'][i].sx_answerc,
                    d: exData['RECORDS'][i].sx_answerd,
                    e: exData['RECORDS'][i].sx_answere,
                    //正确答案
                    ans:exData['RECORDS'][i].sx_answer,
                    analyze:exData['RECORDS'][i].sx_analyze,
                    note:"",//备注，用json表示用户对应的解析
                    last: "无",//添加默认值的写法
                },true)
            })
        }
        //  找已经有答案的题目
        // this.boolAnswer(this.state.answer)
        let record= exam.filtered('id=='+(this.state.id));
        if(record[0]){
            this.boolAnswer(record[0].answer1,record[0].answer2)
        }else{
            this.boolAnswer(exData['RECORDS'][i].sx_answer)
        }
        realm.close()
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
                    <TouchableOpacity>
                    <View style={styles.container}>
                        {/*左边*/}
                        <Image source={this.state.sourcea} style={styles.ImageStyle}/>
                        <Text style={{marginLeft:15,fontSize:16,width:width-60}}>
                            {this.state.a}
                        </Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style={styles.container}>
                        {/*左边*/}
                        <Image source={this.state.sourceb} style={styles.ImageStyle}/>
                        <Text style={{marginLeft:15,fontSize:16,width:width-60}}>
                            {this.state.b}
                        </Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style={styles.container}>
                        {/*左边*/}
                        <Image source={this.state.sourcec} style={styles.ImageStyle}/>
                        <Text style={{marginLeft:15,fontSize:16,width:width-60}}>
                            {this.state.c}
                        </Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style={styles.container}>
                        {/*左边*/}
                        <Image source={this.state.sourced} style={styles.ImageStyle}/>
                        <Text style={{marginLeft:15,fontSize:16,width:width-60}}>
                            {this.state.d}
                        </Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <View style={styles.container}>
                        {/*左边*/}
                        <Image source={this.state.sourcee} style={styles.ImageStyle}/>
                        <Text style={{marginLeft:15,fontSize:16,width:width-60}}>
                            {this.state.e}
                        </Text>
                    </View>
                    </TouchableOpacity>
                </View>
                <View >
                    {/*{this.noteRender()}*/}
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>解析</Text>
                            </View>
                        </View>
                        <View style={{flex: 1}}>
                            {/*<View style={styles.notebtn}>
                                <TouchableOpacity onPress={()=>this.showNote()}>
                                    <Text style={{color:'#1E90FF'}}>{this.state.noteedit}笔记</Text>
                                </TouchableOpacity>
                            </View>*/}
                        </View>
                    </View>
                    {/*<View>
                        <Text style={styles.last}>您上次选的答案是:{this.state.last}</Text>
                    </View>*/}
                    {/*具体解析*/}
                    <View style={{height:400}}>
                        <WebView
                            style={{
                                height:400,
                                width:width-10,
                                marginRight:5,
                                marginLeft:5,
                            }}
                            source = {{html:HTML1+this.state.analyze+HTML2}}>
                        </WebView>
                    </View>
                </View>
            </ScrollView>
        );
    }
    // 判断答案
    boolAnswer = (data,data1) => {
        var sourcea = this.state.sourcea
        var sourceb = this.state.sourceb
        var sourcec = this.state.sourcec
        var sourced = this.state.sourced
        var sourcee = this.state.sourcee

        switch(this.state.answer)
          {
            case "A":
              sourcea = require('./../img/aright.png')
              break;
            case "B":
              sourceb = require('./../img/bright.png')
              break;
            case "C":
              sourcec = require('./../img/cright.png')
              break;
            case "D":
              sourced = require('./../img/dright.png')
              break;
            case "E":
              sourcee = require('./../img/eright.png')
              break;
            default:
              break;
          }
        if(data != this.state.answer){
            this.addWrong()
            switch(data)
            {
                case "A":
                    sourcea = require('./../img/aerror.png')
                    break;
                case "B":
                    sourceb = require('./../img/berror.png')
                    break;
                case "C":
                    sourcec = require('./../img/cerror.png')
                    break;
                case "D":
                    sourced = require('./../img/derror.png')
                    break;
                case "E":
                    sourcee = require('./../img/eerror.png')
                    break;
                default:
                break;
            };
        }

        this.setState({
            sourcea : sourcea,
            sourceb : sourceb,
            sourcec : sourcec,
            sourced : sourced,
            sourcee : sourcee,
        })
    }
    saveLast=(ans)=>{
        let realm = new Realm({path:"ex7.realm",schema: [Ex]});
        realm.write(()=> {
            realm.create('Ex', {
                id: Number(this.state.id),
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
module.exports = QustionCellDetail;