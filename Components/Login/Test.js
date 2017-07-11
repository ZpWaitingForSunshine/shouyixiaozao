import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  EditView,
} from 'react-native';

import Find from '../Video/Video'

// var Main = require('./Components/Main/Main');
export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
           
    }

    render() {
        return (
            <View style = { {top:20}}>
                  <Text>Video</Text>
            </View>
        );
    }
}
module.exports = Test;