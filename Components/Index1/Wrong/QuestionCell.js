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


// var Main = require('./Components/Main/Main');
export default class QustionCell extends Component {
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
        var flag = 0;
        let realm = new Realm({path:"ex5.realm",schema: [Ex]});
        let exs = realm.objects('Ex');
        let result= exs.filtered('id=='+this.props.id);
        
        //如果在realm找到
        if (result[0]) {
            this.setState({
                type:result[0].type,
                title:result[0].title,
                subject:result[0].subject,
                a:result[0].a,
                b:result[0].b,
                c:result[0].c,
                d:result[0].d,
                e:result[0].e,
                answer:result[0].ans,
                analyze:result[0].analyze,
                note:result[0].note,
                last:result[0].last,
                noteedit:result[0].note==''?"添加":'查看',
            })
            realm.close()
            flag = 1;
        }else{
            realm.close()
            //如果没有这个id的题目就去json找
            for(var i = 0; i<exData['RECORDS'].length; i++){  
                console.log('找了n次')
                if(exData['RECORDS'][i].sx_id==this.props.id){//如果在json里面找到
                    this.setState({
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
                    //放到realm里面
                    let realm = new Realm({path:"ex5.realm",schema: [Ex]});
                    let exs = realm.objects('Ex');
                    realm.write(()=> {
                        realm.create('Ex', {
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
                        })
                    })
                    realm.close()
                    flag = 1;
                    break;
                }
            }
        }
        //偷偷更新
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
                    if(flag == 0){
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
                    }
                     let realm = new Realm({path:"ex5.realm",schema: [Ex]});
                    let exs = realm.objects('Ex');
                    realm.write(()=> {
                        realm.create('Ex', {
                            id: Number(this.props.id),
                            type:responseData.data.sx_type,
                            title: responseData.data.sx_title,
                            subject: responseData.data.sx_subject,
                            //选项
                            a: responseData.data.sx_answera,
                            b: responseData.data.sx_answerb,
                            c: responseData.data.sx_answerc,
                            d: responseData.data.sx_answerd,
                            e: responseData.data.sx_answere,
                            //正确答案
                            ans:responseData.data.sx_answer,
                            analyze:responseData.data.sx_analyze,
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
        // console.log(this.props.id+''+this.state.id+'输出1次')
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
                {/*解析区*/}
                {this.jiexiRender()}
            </ScrollView>
        );
    }

    boolAnswer = (data) => {
      this.saveLast(data);//保存上次的答案
      this.setState({jiexiRender : true });
      if (data == this.state.answer) {
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
      }else{
        // {this.addDelete()};
        {this.addWrong()}
        switch(data)
          {
            case "A":
              this.setState({sourcea : require('./../img/aerror.png')});
              break;
            case "B":
              this.setState({sourceb : require('./../img/berror.png')});
              break;
            case "C":
              this.setState({sourcec : require('./../img/cerror.png')});
              break;
            case "D":
              this.setState({sourced : require('./../img/derror.png')});
              break;
            case "E":
              this.setState({sourcee : require('./../img/eerror.png')});
              break;
            default:
              break;
          };
          switch(this.state.answer)
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
      };
    }

    editNote = (text) => {
        this.setState({
            note:text,
        })
    }
    saveNote = () => {
         let realm = new Realm({path:"ex5.realm",schema: [Ex]});
        let exs = realm.objects('Ex');
        realm.write(()=> {
            realm.create('Ex', {
                id: Number(this.state.id),
                note:this.state.note,
            },true)
        })
        realm.close()
    }
    // 渲染笔记
    noteRender=() =>{
        if(this.state.noteshow== false){
            return null;
        }else{
            return (
                <View style={{height:88}}>
                    <TextInput
                        style={{
                            height:88,
                            width:width-20,
                            backgroundColor:'white',
                            margin:10,
                            color:'#bfbfbf'
                        }}
                        autoFocus= {true}
                        editable = {true}
                        maxLength = {140}
                        multiline = {true}
                        placeholder= {"请输入您的笔记"}
                        value = {this.state.note}
                        onChangeText={(text) => this.editNote(text)}
                        onEndEditing = {()=>this.saveNote()}
                    />
                </View>
            )
        }
    }
    // 显示笔记
    showNote =() =>{
        this.setState({
            noteshow: !this.state.noteshow,
            noteedit:(this.state.noteedit=='添加'||this.state.noteedit=='查看')?'隐藏':'查看',
        })
    }

    saveLast=(ans)=>{
         let realm = new Realm({path:"ex5.realm",schema: [Ex]});
        let exs = realm.objects('Ex');
        realm.write(()=> {
            realm.create('Ex', {
                id: Number(this.state.id),
                last:ans,
            },true)
        })
        realm.close()
    }
    // 解析render
    jiexiRender = () => {
        if(this.state.jiexiRender)
        return (<View >
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
    }
    // 上传我的错题
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
                        console.log(error)
                    });
                }
            }
        )
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