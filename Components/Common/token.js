import React,{
   AsyncStorage
} from 'react-native';
urlLogin="http://api.wevet.cn/Api/Login";
const tokenCheck = (token,phone) => {
    let formData = new FormData();
    formData.append("action","checkDId");
    formData.append("mobiledevice_last",token);
    formData.append("phone",phone);
    fetch(urlLogin,{
                method:'POST',
                headers:{
                // 'Content-Type':'multipart/form-data', 
            },
                body:formData,
            })
            .then((response) => response.json())
            .then((responseData)=>{
                if(responseData.code == '99999'){
                    // this.state.img = responseData.data.data;
                    console.log("token一致可以登录");
                    return 1;
                }
                else{
                     console.log("token不一致不可以登录");
                    return -1;
                }
            })  
            .catch((error)=>{
                console.log("网络错误");
                return 0;
            });
}
export default{
    tokenCheck,
}