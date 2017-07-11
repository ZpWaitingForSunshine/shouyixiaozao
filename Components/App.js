import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

var Launch = require('./Launch/Launch')//包含了启动页
//import Launch from './Launch/Launch'
// var Test = require('./Launch/Launch')//包含了启动页

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Navigator
          //指定了默认的页面，也就是启动app之后会看到的第一屏，需要两个参数，name跟component
        initialRoute={{ component: Launch, params:{},index:0}}
        //initialRoute={{ component: Test, params:{},index:0}}
        //configureScene={() => Navigator.SceneConfigs.FloatFromRight}
        configureScene={(route) =>({
            ...route.sceneConfig || Navigator.SceneConfigs.PushFromRight,
            gestures: route.gestures
        })}
        renderScene={(route, navigator) => {
            return <route.component navigator={navigator} {...route.params}/>
          }
        }
      >
      </Navigator>
    );
  }//render
}

module.exports = App;