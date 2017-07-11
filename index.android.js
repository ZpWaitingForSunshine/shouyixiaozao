import React, { Component } from 'react'
import { AppRegistry,View } from 'react-native'
import App from './Components/App';

export default class shouyixiaozao extends Component {
    render() {
        return (
             <App/>
        );
    }
}
AppRegistry.registerComponent('shouyixiaozao', () => shouyixiaozao);