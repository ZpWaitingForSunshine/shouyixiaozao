import Toast from 'react-native-root-toast';

/**
 * 冒一个时间比较短的Toast
 * @param content
 */
const toastShort = (content) => {
    
    toast = Toast.show(content.toString(), {
    duration: Toast.durations.SHORT,
    position: -88,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
    
    });
    if(toast == undefined||content.toString()== '') {
        Toast.hide(toast);
    }
};

export default{
    toastShort
}