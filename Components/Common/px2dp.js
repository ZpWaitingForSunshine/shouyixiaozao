'use strict';

import {Dimensions}from 'react-native';

// device width/height
//const deviceWidthDp = Dimensions.get('window').width;
var {width,height} = Dimensions.get('window');//获取当前的高度和宽度
// design width/height

const px2dp = (uiheight,uiwidth)=> {
    //console.log(deviceWidthDp);
    //console.log(deviceHeightDp);
    return width * uiheight / uiwidth;
}

export  default {
    px2dp
}