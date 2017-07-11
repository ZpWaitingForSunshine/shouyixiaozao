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
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';

var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
import Realm from 'realm'
var url = 'http://api.wevet.cn/Api/Exercise'
const HTML1 = '<!DOCTYPE html><html><body>'
const HTML2 = '</body></html>'

class Ex {}
    Ex.schema = {
        name: 'Ex',
        primaryKey: 'sx_id',
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
            collect:{type:'int',default:0} // 是否收藏
        }
    }



export default class AnswerCell extends Component {
    constructor(props) {  
        super(props);
        let realm = new Realm({path:"ex7.realm",schema: [Ex]});
        let exs = realm.objects('Ex');
        var result = exs.filtered('sx_id == '+this.props.id);
        var last = null
        if(result[0]){
            last = result[0]['last']
        }
        realm.close()


        var flag = ( JSON.stringify(this.props.map))
        this.state = {
            id: this.props.id,
            type:flag?this.props.map['sx_type']:null,
            title:flag?this.props.map['sx_title']:"加载中...(需要联网)",
            subject:flag?this.props.map['sx_subject']:null,
            a:flag?this.props.map['sx_answera']:null,
            b:flag?this.props.map['sx_answerb']:null,
            c:flag?this.props.map['sx_answerc']:null,
            d:flag?this.props.map['sx_answerd']:null,
            e:flag?this.props.map['sx_answere']:null,
            answer:flag?this.props.map['sx_answer']:null,
            analyze:flag?this.props.map['sx_analyze']:null,
            note:flag?this.props.map['note']:null,
            last:last,
            keykey:this.props.keykey,
            length:this.props.length,
            jiexiRender: false,
            modalVisible:true,
            animating:true,
            
            sourcea : require('./../img/aregular.png'),
            sourceb : require('./../img/bregular.png'),
            sourcec : require('./../img/cregular.png'),
            sourced : require('./../img/dregular.png'),
            sourcee : require('./../img/eregular.png'),

            isRender:false,
            noteshow:false,//note是否显示，有东西的时候显示没有不显示
            noteedit:'添加',
            notelength:flag?this.props.map['note'].length:0,
        };
    }

    componentDidMount(){
        var flag = ( JSON.stringify(this.props.map))
        // 偷偷更新 
        let formData = new FormData();
        formData.append("action","getQuestion");
        formData.append("id",this.props.id);
        fetch(url,{
                method:'POST',
                headers:{
            },  
                body:formData,
            })  
            .then((response) => response.json())
            .then((responseData)=>{
                if(responseData.code == '99999'){
                    if(flag){}
                    else
                        this.setState({
                            type:responseData.data.sx_type,
                            title:responseData.data.sx_title,
                            subject:responseData.data.sx_subject,
                            a:responseData.data.sx_answera,
                            b:responseData.data.sx_answerb,
                            c:responseData.data.sx_answerc,
                            d:responseData.data.sx_answerd,
                            e:responseData.data.sx_answere,
                            answer:responseData.data.sx_answer,
                            analyze:responseData.data.sx_analyze,
                        })
                    
                    // 读入数据库
                    let realm = new Realm({path:"ex7.realm",schema: [Ex]});
                    let exs = realm.objects('Ex');
                    realm.write(()=> {
                        realm.create('Ex', {
                            sx_id: Number(this.props.id),
                            sx_type:responseData.data.sx_type,
                            sx_title: responseData.data.sx_title,
                            sx_subject: responseData.data.sx_subject,
                            //选项
                            sx_answera: responseData.data.sx_answera,
                            sx_answerb: responseData.data.sx_answerb,
                            sx_answerc: responseData.data.sx_answerc,
                            sx_answerd: responseData.data.sx_answerd,
                            sx_answere: responseData.data.sx_answere,
                            //正确答案
                            sx_answer:responseData.data.sx_answer,
                            sx_analyze:responseData.data.sx_analyze,
                        },true)
                    })
                    realm.close()
            }
            else{
                console.log('请求错误')
            }
        })
        .catch((error)=>{
            console.log(error)
        });
    }

    render(){
        console.log(this.props.id+''+this.state.id+'输出1次')
        return (
            <KeyboardAvoidingView behavior='position'>
            <ScrollView ref='scroll' keyboardShouldPersistTaps='always'>
                {/*题目*/}
                <View style={styles.idandlabel}>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>
                        {"("+(this.state.keykey+1)+"/"+this.state.length+")"+this.state.title}
                    </Text>
                </View>
                <View style={styles.question1}>
                    <Text style={{fontSize:20}}
                        numberOfLines={10}>
                        {"(单选题)"+this.state.subject}
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
                {/*解析区*/}
                {this.jiexiRender()}
            </ScrollView>
            </KeyboardAvoidingView>
        );
    }
    boolAnswer = (data) => {
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

        this.saveLast(data) // 
        // 获取note
        let realm = new Realm({path:"ex7.realm",schema: [Ex]});
        let exs = realm.objects('Ex');
        var result = exs.filtered('sx_id == '+this.props.id);
        var note = null
        if(result[0]){
            note = result[0]['note']
        }
        var noteshow = note.length > 0 ? true: false
        var noteedit = note.length > 0 ? '隐藏': '查看'
        realm.close()
        // 一起setState
        this.setState({
            sourcea : sourcea,
            sourceb : sourceb,
            sourcec : sourcec,
            sourced : sourced,
            sourcee : sourcee,
            jiexiRender: true,
            note: note,
            noteshow: noteshow,
        })
    }
    addWrong =()=>{
        AsyncStorage.getItem('phone').then(
            (result)=>{
                if(result){
                    var url = 'http://api.wevet.cn/Api/Exercise'
                    let formData = new FormData();
                    formData.append("action","addWrong");
                    formData.append("tx_id",this.props.id);
                    formData.append("tx_type",this.state.type);
                    formData.append("phone",result);
                    fetch(url,{
                            method:'POST',
                            headers:{
                        },  
                            body:formData,
                        })  
                        .then((response) => response.json())
                        .then((responseData)=>{
                    })
                    .catch((error)=>{
                        
                    });
                }
            }
        )
    }

    saveLast=(ans)=>{
        let realm = new Realm({path:"ex7.realm",schema: [Ex]});
        let exs = realm.objects('Ex');
        realm.write(()=> {
            realm.create('Ex', {
                sx_id: Number(this.state.id),
                last:ans,
            },true)
        })
        realm.close()
    }
    jiexiRender = () => {
        if(this.state.jiexiRender)
            return (
                <View >
                    {this.noteRender()}
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>解析</Text>
                            </View>
                        </View>
                        <View style={{flex: 1}}>
                            <View style={styles.notebtn}>
                                <TouchableOpacity onPress={()=>this.showNote()}>
                                    <Text style={{color:'#1E90FF'}}>{this.state.noteedit}笔记</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.last}>您上次选的答案是:{this.state.last}</Text>
                    </View>
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
                </View>)
        else
            return null
    }// 解析render结束

    // showNote
    showNote = () => {
        this.setState({
            noteshow: !this.state.noteshow,
            noteedit:(this.state.noteedit=='添加'||this.state.noteedit=='查看')?'隐藏':'查看',
        })
    }
    // editnote
    editNote = (text) => {
        this.setState({
            note:text,
        })
    }
    
    saveNote = () => {
        let realm = new Realm({path:"ex7.realm",schema: [Ex]});
        let exs = realm.objects('Ex');
        realm.write(()=> {
            realm.create('Ex', {
                sx_id: Number(this.state.id),
                note:this.state.note,
            },true)
        })
        realm.close()
    }
    // 渲染笔记
    noteRender=() =>{
        if(this.state.noteshow == false){
            return null;
        }else{
            return (
                <View style={{height:108}}>
                    <TextInput
                        style={{
                            height:88,
                            width:width-20,
                            backgroundColor:'white',
                            margin:10,
                            color:'#bfbfbf'
                        }}
                        autoFocus= {false}
                        editable = {true}
                        maxLength = {140}
                        multiline = {true}
                        placeholder= {"请输入您的笔记(140字)"}
                        value = {this.state.note}
                        onChangeText={(text) => {this.setState({note:text,notelength:text.length})}}
                        onEndEditing = {()=>this.saveNote()}
                    />
                    <Text style={{fontSize:10,alignSelf:'flex-end',paddingRight:10,}}>{this.state.notelength}/140</Text>
                </View>
            )
        }
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
module.exports = AnswerCell;